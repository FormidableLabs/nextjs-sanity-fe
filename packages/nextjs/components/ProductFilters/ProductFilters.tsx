import { FilterGroup } from "./FilterGroup";
import { getFilterGroups } from "constants/filters";

interface Props {
  sizeFilters: string[];
}

export const ProductFilters: React.FC<Props> = ({ sizeFilters }) => (
  <div className="flex flex-col gap-y-4">
    <h2>Filters</h2>
    {getFilterGroups({ sizeFilters }).map((group) => (
      <FilterGroup key={group.value} group={group} />
    ))}
  </div>
);
