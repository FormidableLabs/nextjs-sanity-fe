import { SORT_OPTIONS, SORT_OPTIONS_ARRAY, SORT_QUERY_PARAM, SortType } from "../constants/sorting";
import { useRouterQueryParams } from "../utils/useRouterQueryParams";
import { Pill } from "./Pill";

export const ProductSort: React.FC = () => {
  const { replace, clear, query } = useRouterQueryParams();
  const defaultSortValue = SORT_OPTIONS_ARRAY.find(({ type }) => type === SortType.Default)?.value;

  const handleChange = (value: string) => {
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
    <div className="flex flex-col gap-4">
      <h4 className="text-h4 text-blue">Sort by</h4>
      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS_ARRAY.map(({ value, label }) => (
          <Pill
            key={value}
            onClick={() => handleChange(value)}
            selected={value === (query[SORT_QUERY_PARAM] || defaultSortValue)}
          >
            {label}
          </Pill>
        ))}
      </div>
    </div>
  );
};
