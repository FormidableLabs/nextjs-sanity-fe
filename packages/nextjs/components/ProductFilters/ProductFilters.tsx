import type { FilterGroup as FilterGroupType } from "constants/filters";
import { FilterGroup } from "./FilterGroup";

type ProductFilterProps = {
  filterGroups: FilterGroupType[];
};

export const ProductFilters: React.FC<ProductFilterProps> = ({ filterGroups }) => (
  <div className="flex flex-col gap-y-4">
    <h2>Filters</h2>
    {filterGroups.map((group) => (
      <FilterGroup key={group.value} group={group} />
    ))}
  </div>
);
