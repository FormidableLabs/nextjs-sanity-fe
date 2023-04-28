import * as React from "react";
import { useCombobox } from "downshift";
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import Link from "next/link";
import { q, sanityImage, TypeFromSelection } from "groqd";
import { runQuery } from "utils/sanityClient";
import { Image } from "./Image";
import { Input } from "./Input";

const searchSelection = {
  _id: q.string(),
  name: q.string(),
  slug: q.slug("slug"),
  image: sanityImage("images", { isList: true }).slice(0),
  productSlug: q("*").filter('_type == "product" && references(^._id)').slice(0).grabOne$("slug.current", q.string()),
};

type ProductSearch = TypeFromSelection<typeof searchSelection>;

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

export const Search: React.FC = () => {
  const [variants, setVariants] = useState<ProductSearch[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const performSearch = useRef(
    debounce(async (searchTerm?: string) => {
      if (searchTerm) {
        setError(false);
        try {
          const response = await searchQuery(searchTerm.trim());
          setVariants(response);
        } catch (error) {
          setVariants([]);
          setError(true);
        } finally {
          setLoading(false);
        }
      } else {
        setVariants([]);
      }
    }, 500)
  );

  useEffect(() => {
    setLoading(true);
    performSearch.current(inputValue);
  }, [inputValue, performSearch]);

  const { isOpen, getInputProps, getComboboxProps, getMenuProps, closeMenu } = useCombobox({
    onInputValueChange({ inputValue: input }) {
      setInputValue(input ?? "");
      if (input === "") {
        closeMenu();
      }
    },
    items: variants,
    itemToString: (item) => (item ? item.name : ""),
    inputValue,
    menuId: "search-menu",
  });

  const clearSearch = useCallback(() => {
    setInputValue("");
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
        {isOpen && variants.length ? (
          variants.map((variant) => (
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
