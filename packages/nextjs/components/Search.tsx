import { useCombobox } from "downshift";
import groq from "groq";
import { useCallback, useEffect, useState } from "react";
import { sanityClient } from "utils/sanityClient";
import debounce from "lodash.debounce";
import { ProductSearch } from "utils/groqTypes/ProductSearch";
import Link from "next/link";
import { Image } from "./Image";
import { Input } from "./Input";

const SEARCH_QUERY = groq`*[_type == 'product']
| score(
  name match $query || boost(name match $query + "*", 0.5)
)
[_score > 0][0...5] {
  _id,
  name,
  slug,
  'image':images[0]->images,
  'imageAlt': images[0]->name
}
`;

export const Search: React.FC = () => {
  const [products, setProducts] = useState<ProductSearch[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const performSearch = useCallback(
    debounce(async (searchTerm?: string) => {
      if (searchTerm) {
        setError(false);
        try {
          const response = await sanityClient.fetch(SEARCH_QUERY, {
            query: searchTerm.trim(),
          });

          setProducts(response);
        } catch (error) {
          setProducts([]);
          setError(true);
        } finally {
          setLoading(false);
        }
      } else {
        setProducts([]);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    setLoading(true);
    performSearch(inputValue);
  }, [inputValue, performSearch]);

  const { isOpen, getInputProps, getComboboxProps, getMenuProps, closeMenu } = useCombobox({
    onInputValueChange({ inputValue: input }) {
      setInputValue(input ?? "");
      if (input === "") {
        closeMenu();
      }
    },
    items: products,
    itemToString: (item) => (item ? item.name : ""),
    inputValue,
    menuId: "search-menu",
  });

  const clearSearch = useCallback(() => {
    setInputValue("");
    closeMenu();
  }, [closeMenu]);

  return (
    <div className="mr-4 hidden sm:hidden">
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
        className={`absolute w-72 bg-yellow mt-2 border rounded z-10 p-5 ${!isOpen ? "hidden" : ""}`}
      >
        {isOpen && products.length ? (
          products.map((product) => (
            <li key={product._id} className="border-b last:border-b-0 py-2 last:pb-0 first:pt-0">
              <Link href={`/products/${product.slug.current}`}>
                <a className="flex items-center" onClick={clearSearch}>
                  <Image className="rounded" src={product.image} width={50} height={50} alt={product.imageAlt} />
                  <span className="text-lg ml-4">{product.name}</span>
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
