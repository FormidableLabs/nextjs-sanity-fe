import * as React from "react";
import { FilterGroup } from "./FilterGroup";
import { getFilterGroups } from "constants/filters";
import { FlavourFilterItem, StyleFilterItem } from "../../utils/groqTypes/ProductList";

interface Props {
  flavourFilters: FlavourFilterItem[];
  styleFilters: StyleFilterItem[];
}

export const ProductFilters = ({ flavourFilters, styleFilters }: Props) => (
  <div className="flex flex-col gap-y-4">
    <h4 className="text-h4 text-blue">Filters</h4>
    <div className="flex flex-col gap-y-4">
      {getFilterGroups({ flavourFilters, styleFilters }).map((group) => (
        <FilterGroup key={group.value} group={group} />
      ))}
    </div>
  </div>
);
