export type FilterOption = {
  id: number | string;
  name: string;
  label: string;
};

export type FiltersGroup = {
  id: number | string;
  name: string;
  label: string;
  options: FilterOption[];
};
