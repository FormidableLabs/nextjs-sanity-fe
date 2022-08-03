import { ChangeEvent, useId } from "react";
import { SortType, SortOption } from "./types";
import { useRouterQueryParams } from "../../utils/useRouterQuery";

type ProductSortProps = {
  sortOptions?: SortOption[];
};

const DUMMY_DATA: SortOption[] = [
  {
    id: 0,
    name: "default",
    label: "Default",
    type: SortType.Default,
  },
  {
    id: 1,
    name: "a-z",
    label: "A - Z",
    type: SortType.Natural,
  },
  {
    id: 2,
    name: "z-a",
    label: "Z - A",
    type: SortType.Natural,
  },
  {
    id: 3,
    name: "lowest",
    label: "Lowest Price",
    type: SortType.Natural,
  },
  {
    id: 4,
    name: "highest",
    label: "Highest Price",
    type: SortType.Natural,
  },
];

const SORT_QUERY_PARAM_KEY = "sort";

export const ProductSort: React.FC<ProductSortProps> = ({ sortOptions = DUMMY_DATA }) => {
  const { replace, clear } = useRouterQueryParams();
  const selectId = useId();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const optionIndex = Number(e.target.value);

    switch (sortOptions[optionIndex].type) {
      case SortType.Default:
        clear(SORT_QUERY_PARAM_KEY);
        break;
      case SortType.Natural: {
        const { name } = sortOptions[optionIndex];
        replace(SORT_QUERY_PARAM_KEY, name);
        break;
      }
      default:
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <label htmlFor={selectId}>Sort by:</label>
      <select id={selectId} onChange={handleChange}>
        {sortOptions.map(({ id, label }, index) => (
          <option key={id} value={index}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
