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

export const FILTER_SIZE_ORDER = ["XS", "SM", "MD", "LG", "XL"];

export const STATIC_FILTER_GROUPS: FilterGroup[] = [
  {
    value: "promotion",
    label: "Promotion",
    options: [
      {
        value: "sale",
        label: "Sale",
        filter: "variants | order(price asc)[0]->msrp > variants | order(price asc)[0]->price",
      },
    ],
  },
];
