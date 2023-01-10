import * as React from "react";
import { useCombobox } from "downshift";
import groq from "groq";
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import Link from "next/link";

import { sanityClient } from "utils/sanityClient";
import { ProductSearch } from "utils/groqTypes/ProductSearch";
import { Image } from "./Image";
import { Input } from "./Input";

const SEARCH_QUERY = groq`*[_type == 'variant']
| score(
  name match $query || boost(name match $query + "*", 0.5)
)
[_score > 0][0...5] {
  _id,
  name,
  slug,
  'image':images[0]->images,
  'imageAlt': images[0]->name,
  'productSlug': *[_type == "product" && references(^._id)][0].slug.current
}
`;

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
          const response = await sanityClient.fetch(SEARCH_QUERY, {
            query: searchTerm.trim(),
          });

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
    }, 1000)
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
              <Link href={{ pathname: `/products/${variant.productSlug}`, query: { variant: variant.slug.current } }}>
                <a className="flex items-center" onClick={clearSearch}>
                  <Image className="rounded" src={variant.image} width={50} height={50} alt={variant.imageAlt} />
                  <span className="text-body-reg font-medium text-primary ml-4">{variant.name}</span>
                </a>
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
