import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import type { FilterGroup } from "./filters";
import { getFilterGroups } from "./filters";

export const getFiltersCount = (query: ParsedUrlQuery) => {
  const filters = getFilterGroups();

  const total = filters.reduce((acc: number, { label, value }: FilterGroup) => {
    const selectedFilters = query[value];
    const elements = selectedFilters?.length ?? 0;

    // if a single element is selected, type would be a string instead of an array.
    const totalFilters = typeof selectedFilters === "string" ? (elements > 0 ? 1 : 0) : elements;

    return (acc = acc + totalFilters);
  }, 0);

  return total;
}

export const useGetFiltersCount = () => {
  const router = useRouter();
  
  return getFiltersCount(router.query);
};
