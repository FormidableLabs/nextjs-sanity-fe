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

export interface FilterGroupParams {
  sizeFilters?: string[];
}

export const getFilterGroups = ({ sizeFilters = [] }: FilterGroupParams = {}): FilterGroup[] => {
  return [
    {
      value: "size",
      label: "Size",
      options: sizeFilters.map((size) => ({
        value: size,
        label: size,
        filter: `'${size}' in variants[]->size->name`,
      })),
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
};
