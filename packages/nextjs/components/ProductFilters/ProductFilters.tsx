import * as React from "react";
import { FilterGroup } from "./FilterGroup";
import { getFilterGroups } from "constants/filters";
import { CategoryFilterItem, FlavourFilterItem, StyleFilterItem } from "../../utils/groqTypes/ProductList";

interface Props {
  categoryFilters: CategoryFilterItem[];
  flavourFilters: FlavourFilterItem[];
  styleFilters: StyleFilterItem[];
}

export const ProductFilters = ({ flavourFilters, styleFilters, categoryFilters }: Props) => (
  <div className="flex flex-col gap-y-4">
    <h4 className="text-h4 text-blue">Filters</h4>
    <div className="flex flex-col gap-y-4">
      {getFilterGroups({ flavourFilters, styleFilters, categoryFilters }).map((group) => (
        <FilterGroup key={group.value} group={group} />
      ))}
    </div>
  </div>
);
