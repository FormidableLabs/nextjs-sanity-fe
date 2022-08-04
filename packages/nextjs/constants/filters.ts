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

export const FILTER_GROUPS: Record<string, FilterGroup> = {
  size: {
    value: "size",
    label: "Size",
    options: [
      { value: "xs", label: "XS", filter: "" },
      { value: "sm", label: "SM", filter: "" },
      { value: "md", label: "MD", filter: "" },
      { value: "lg", label: "LG", filter: "" },
      { value: "xl", label: "XL", filter: "" },
    ],
  },
  promotion: {
    value: "promotion",
    label: "Promotion",
    options: [{ value: "sale", label: "Sale", filter: "" }],
  },
};

export const FILTER_GROUPS_ARRAY = Object.values(FILTER_GROUPS);
