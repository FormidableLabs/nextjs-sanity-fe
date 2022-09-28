import { FilterGroup } from "./FilterGroup";
import { getFilterGroups } from "constants/filters";

interface Props {
  sizeFilters: string[];
}

export const ProductFilters: React.FC<Props> = ({ sizeFilters }) => (
  <div className="flex flex-col gap-y-4">
    <h4 className="text-h4 text-blue">Filters</h4>
    <div className="flex flex-col gap-y-4">
      {getFilterGroups({ sizeFilters }).map((group) => (
        <FilterGroup key={group.value} group={group} />
      ))}
    </div>
  </div>
);
