import { FlavourFilterItem } from "../utils/groqTypes/ProductList";

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
  flavourFilters?: FlavourFilterItem[];
}

export const getFilterGroups = ({ flavourFilters = [] }: FilterGroupParams = {}): FilterGroup[] => {
  return [
    {
      value: "flavour",
      label: "Flavour",
      options: flavourFilters.map((flavour) => ({
        value: flavour.name,
        label: flavour.name,
        filter: `'${flavour.name}' in flavour[]->name`,
      })),
    },
    {
      value: "promotion",
      label: "Promotion",
      options: [
        {
          value: "sale",
          label: "Sale",
          filter: "msrp > price",
        },
      ],
    },
  ];
};
