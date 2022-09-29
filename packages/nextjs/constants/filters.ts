import { FlavourFilterItem, StyleFilterItem } from "../utils/groqTypes/ProductList";

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
  styleFilters?: StyleFilterItem[];
}

export const getFilterGroups = ({ flavourFilters = [], styleFilters = [] }: FilterGroupParams = {}): FilterGroup[] => {
  return [
    {
      value: "flavour",
      label: "Flavour",
      options: flavourFilters.map((flavour) => ({
        value: flavour.slug,
        label: flavour.name,
        filter: `'${flavour.slug}' in flavour[]->slug.current`,
      })),
    },
    {
      value: "style",
      label: "Style",
      options: styleFilters.map((style) => ({
        value: style.slug,
        label: style.name,
        filter: `'${style.slug}' in style[]->slug.current`,
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
