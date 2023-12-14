import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import type { FilterGroup } from "./filters";
import { getFilterGroups } from "./filters";

export const getFiltersCount = (query: ReadonlyURLSearchParams | null) => {
  const filters = getFilterGroups();

  const total = filters.reduce((acc: number, { value }: FilterGroup) => {
    const selectedFilters = query?.getAll(value);
    const totalFilters = selectedFilters?.length ?? 0;

    return (acc = acc + totalFilters);
  }, 0);

  return total;
};

export const useGetFiltersCount = () => {
  const query = useSearchParams();
  return getFiltersCount(query);
};
