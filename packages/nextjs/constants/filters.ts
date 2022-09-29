import { CategoryFilterItem, FlavourFilterItem, StyleFilterItem } from "../utils/groqTypes/ProductList";

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

/**
 * *[_type == "variant" && $slug in *[_type == "product" && references(^._id)][].categories[]->slug.current ] {
 *   name
 * }
 */

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
        filter: `'${cat.slug}' in *[_type == "product" && references(^._id)][].categories[]->slug.current`,
      })),
    },
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
