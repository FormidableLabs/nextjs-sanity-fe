import { FilterGroup } from "./FilterGroup";
import { FILTER_GROUPS_ARRAY } from "../../constants/filters";

export const ProductFilters: React.FC = () => (
  <div className="flex flex-col gap-y-4">
    <h2>Filters</h2>
    {FILTER_GROUPS_ARRAY.map((group) => (
      <FilterGroup key={group.value} group={group} />
    ))}
  </div>
);
