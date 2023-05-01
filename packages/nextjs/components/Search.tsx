import * as React from "react";
import { useCombobox } from "downshift";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import debounce from "lodash.debounce";
import Link from "next/link";
import { q, sanityImage, TypeFromSelection } from "groqd";
import { runQuery } from "utils/sanityClient";
import { Image } from "./Image";
import { Input } from "./Input";

type State = {
  results: ProductSearch[];
  inputValue: string;
  loading: boolean;
  error: boolean;
};

type Action =
  | { type: "updating"; inputValue: string }
  | { type: "success"; results: ProductSearch[] }
  | { type: "clear" }
  | { type: "failure" };

type ProductSearch = TypeFromSelection<typeof searchSelection>;

const searchSelection = {
  _id: q.string(),
  name: q.string(),
  slug: q.slug("slug"),
  image: sanityImage("images", { isList: true }).slice(0),
  productSlug: q("*").filter('_type == "product" && references(^._id)').slice(0).grabOne$("slug.current", q.string()),
};

const searchQuery = (query: string) =>
  runQuery(
    q("*")
      .filterByType("variant")
      .filter(`name match $query + "*"`)
      .order("_score desc")
      .slice(0, 5)
      .grab$(searchSelection),
    { query }
  );

const defaultState: State = { results: [], error: false, loading: false, inputValue: "" };

const searchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "updating":
      return { ...state, inputValue: action.inputValue, loading: true, error: false };
    case "success":
      return { ...state, results: action.results, error: false, loading: false };
    case "failure":
      return { ...state, results: [], error: true, loading: false };
    case "clear":
      return defaultState;
  }
};

export const Search: React.FC = () => {
  const [{ results, inputValue, loading, error }, dispatch] = useReducer(searchReducer, defaultState);

  const performSearch = useMemo(
    () =>
      debounce(async (searchTerm?: string) => {
        if (searchTerm) {
          try {
            dispatch({ type: "success", results: await searchQuery(searchTerm.trim()) });
          } catch (error) {
            dispatch({ type: "failure" });
          }
        } else {
          dispatch({ type: "clear" });
        }
      }, 500),
    []
  );

  const { isOpen, getInputProps, getComboboxProps, getMenuProps, closeMenu } = useCombobox({
    onInputValueChange({ inputValue: input }) {
      dispatch({ type: "updating", inputValue: input || "" });
      performSearch(input);

      if (input === "") {
        closeMenu();
      }
    },
    items: results,
    itemToString: (item) => (item ? item.name : ""),
    inputValue,
    menuId: "search-menu",
  });

  useEffect(() => {
    return () => {
      return performSearch.cancel();
    };
  }, [performSearch]);

  const clearSearch = useCallback(() => {
    dispatch({ type: "clear" });
    closeMenu();
  }, [closeMenu]);

  return (
    <div className="mr-4 hidden lg:block">
      <div {...getComboboxProps()}>
        <Input
          {...getInputProps({
            type: "search",
            id: "search",
            placeholder: "Search for products",
            "aria-labelledby": "search-label",
          })}
        />
      </div>
      <ul
        {...getMenuProps({
          "aria-labelledby": "search-label",
        })}
        className={`absolute w-72 bg-secondary mt-2 border border-primary rounded z-10 p-5 ${!isOpen ? "hidden" : ""}`}
      >
        {isOpen && results.length ? (
          results.map((variant) => (
            <li key={variant._id} className="border-b last:border-b-0 py-2 last:pb-0 first:pt-0">
              <Link
                href={{ pathname: `/products/${variant.productSlug}`, query: { variant: variant.slug } }}
                className="flex items-center"
                onClick={clearSearch}
              >
                <Image className="rounded" src={variant.image} width={50} height={50} alt={variant.slug} />
                <span className="text-body-reg font-medium text-primary ml-4">{variant.name}</span>
              </Link>
            </li>
          ))
        ) : (
          <li>{loading ? "Loading..." : error ? "Oops! Something went wrong!" : "No Products Found"}</li>
        )}
      </ul>
    </div>
  );
};
