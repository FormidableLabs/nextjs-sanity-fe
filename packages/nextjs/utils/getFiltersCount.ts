import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import type { FilterGroup } from "./filters";
import { getFilterGroups } from "./filters";

export const getFiltersCount = (query: ReadonlyURLSearchParams | null) => {
  const filters = getFilterGroups();

  const total = filters.reduce((acc: number, { label, value }: FilterGroup) => {
    const selectedFilters = query?.get(value);
    const elements = selectedFilters?.length ?? 0;

    // if a single element is selected, type would be a string instead of an array.
    const totalFilters = typeof selectedFilters === "string" ? (elements > 0 ? 1 : 0) : elements;

    return (acc = acc + totalFilters);
  }, 0);

  return total;
};

export const useGetFiltersCount = () => {
  const query = useSearchParams();
  return getFiltersCount(query);
};
