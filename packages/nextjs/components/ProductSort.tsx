import { ChangeEvent, useId } from "react";
import { SortType, SORT_QUERY_PARAM, SORT_OPTIONS, SORT_OPTIONS_ARRAY } from "../constants/sorting";
import { useRouterQueryParams } from "../utils/useRouterQueryParams";

export const ProductSort: React.FC = () => {
  const { replace, clear, query } = useRouterQueryParams();
  const selectId = useId();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    switch (SORT_OPTIONS[value].type) {
      case SortType.Natural: {
        replace(SORT_QUERY_PARAM, value);
        break;
      }
      case SortType.Default:
      default:
        clear(SORT_QUERY_PARAM);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <label htmlFor={selectId}>Sort by:</label>
      <select id={selectId} onChange={handleChange}>
        {SORT_OPTIONS_ARRAY.map(({ value, label, type }) => {
          const selected = query[SORT_QUERY_PARAM] ? query[SORT_QUERY_PARAM] === value : type === SortType.Default;
          return (
            <option key={value} value={value} selected={selected}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
