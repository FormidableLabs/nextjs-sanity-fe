import { useCombobox } from "downshift";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { Input } from "../Input";
import debounce from "lodash.debounce";

type State<ItemType> = {
  items: ItemType[];
  inputValue: string;
  loading: boolean;
  error: Error | null;
};

type Action<ItemType> =
  | { type: "updating"; inputValue: string }
  | { type: "success"; results: ItemType[] }
  | { type: "clear" }
  | { type: "failure"; error: Error };

const getDefaultState = <ItemType,>(): State<ItemType> => ({ items: [], error: null, loading: false, inputValue: "" });

const createSearchReducer =
  <ItemType,>() =>
  (state: State<ItemType>, action: Action<ItemType>): State<ItemType> => {
    switch (action.type) {
      case "updating":
        return { ...state, inputValue: action.inputValue, loading: true, error: null };
      case "success":
        return { ...state, items: action.results, error: null, loading: false };
      case "failure":
        return { ...state, items: [], error: action.error, loading: false };
      case "clear":
        return getDefaultState();
    }
  };

type Props<ItemType> = {
  onSearch: (input?: string) => Promise<ItemType[]>;
  itemToString: (item: ItemType | null) => string;
  renderItem: (item: ItemType, clearSearch: () => void) => JSX.Element;
  getKey: (item: ItemType) => string;
};

export const Search = <ItemType,>({ onSearch, itemToString, renderItem, getKey }: Props<ItemType>) => {
  const [{ items, inputValue, loading, error }, dispatch] = useReducer(
    createSearchReducer<ItemType>(),
    getDefaultState<ItemType>()
  );

  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchTerm?: string) => {
        if (searchTerm) {
          try {
            const results = await onSearch(searchTerm);
            dispatch({ type: "success", results });
          } catch (error) {
            dispatch({ type: "failure", error: error as Error });
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
      debouncedSearch(input);

      if (input === "") {
        closeMenu();
      }
    },
    items,
    itemToString,
    inputValue,
    menuId: "search-menu",
  });

  useEffect(() => {
    return () => {
      return debouncedSearch.cancel();
    };
  }, [onSearch]);

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
        {isOpen && items.length ? (
          items.map((item) => (
            <li key={getKey(item)} className="border-b last:border-b-0 border-primary py-2 last:pb-0 first:pt-0">
              {renderItem(item, clearSearch)}
            </li>
          ))
        ) : (
          <li>{loading ? "Loading..." : error ? "Oops! Something went wrong!" : "No Products Found"}</li>
        )}
      </ul>
    </div>
  );
};
