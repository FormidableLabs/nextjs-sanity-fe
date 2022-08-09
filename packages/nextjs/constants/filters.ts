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
      { value: "xs", label: "XS", filter: "'XS' in variants[]->size->name" },
      { value: "sm", label: "SM", filter: "'SM' in variants[]->size->name" },
      { value: "md", label: "MD", filter: "'MD' in variants[]->size->name" },
      { value: "lg", label: "LG", filter: "'LG' in variants[]->size->name" },
      { value: "xl", label: "XL", filter: "'XL' in variants[]->size->name" },
    ],
  },
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
