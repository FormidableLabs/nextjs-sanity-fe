export type FilterOption = {
  value: string;
  label: string;
  filter: string;
};

export type FilterGroup = {
  value: string;
  label: string;
  options: FilterOption[];
};

export const FILTER_GROUPS: FilterGroup[] = [
  {
    value: "size",
    label: "Size",
    options: [
      { value: "xs", label: "XS", filter: "xs" },
      { value: "sm", label: "SM", filter: "sm" },
      { value: "md", label: "MD", filter: "md" },
      { value: "lg", label: "LG", filter: "lg" },
      { value: "xl", label: "XL", filter: "xl" },
    ],
  },
  {
    value: "promotion",
    label: "Promotion",
    options: [{ value: "sale", label: "Sale", filter: "sale" }],
  },
];
