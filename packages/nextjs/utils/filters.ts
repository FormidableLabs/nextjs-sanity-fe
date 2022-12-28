import { CategoryFilterItem, FlavourFilterItem, StyleFilterItem } from "./groqTypes/ProductList";
import groq from "groq";

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
  categoryFilters?: CategoryFilterItem[];
  flavourFilters?: FlavourFilterItem[];
  styleFilters?: StyleFilterItem[];
}

export const getFilterGroups = ({
  categoryFilters = [],
  flavourFilters = [],
  styleFilters = [],
}: FilterGroupParams = {}): FilterGroup[] => {
  return [
    {
      value: "category",
      label: "Category",
      options: categoryFilters.map((cat) => ({
        value: cat.slug,
        label: cat.name,
        filter: groq`'${cat.slug}' in *[_type == "product"][references(^._id)][].categories[]->slug.current`,
      })),
    },
    {
      value: "flavour",
      label: "Flavour",
      options: flavourFilters.map((flavour) => ({
        value: flavour.slug,
        label: flavour.name,
        filter: groq`'${flavour.slug}' in flavour[]->slug.current`,
      })),
    },
    {
      value: "style",
      label: "Style",
      options: styleFilters.map((style) => ({
        value: style.slug,
        label: style.name,
        filter: groq`'${style.slug}' in style[]->slug.current`,
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
