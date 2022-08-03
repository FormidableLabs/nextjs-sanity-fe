export type FilterOption = {
  id: number | string;
  name: string;
  label: string;
};

export type FiltersGroupItem = {
  id: number | string;
  name: string;
  label: string;
  options: FilterOption[];
};
