import * as React from "react";
import { FilterGroup } from "./FilterGroup";
import { getFilterGroups } from "constants/filters";
import { FlavourFilterItem } from "../../utils/groqTypes/ProductList";

interface Props {
  flavourFilters: FlavourFilterItem[];
}

export const ProductFilters = ({ flavourFilters }: Props) => (
  <div className="flex flex-col gap-y-4">
    <h4 className="text-h4 text-blue">Filters</h4>
    <div className="flex flex-col gap-y-4">
      {getFilterGroups({ flavourFilters }).map((group) => (
        <FilterGroup key={group.value} group={group} />
      ))}
    </div>
  </div>
);
