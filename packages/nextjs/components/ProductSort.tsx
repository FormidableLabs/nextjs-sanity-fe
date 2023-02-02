import * as React from "react";
import { PAGE_QUERY_PARAM, SORT_OPTIONS, SORT_OPTIONS_ARRAY, SORT_QUERY_PARAM, SortType } from "utils/sorting";
import { useRouterQueryParams } from "utils/useRouterQueryParams";
import { Pill } from "./Pill";
import { Select } from "./Select";

type ProductSortProps = {
  as?: "select" | "pills";
  showTitle?: boolean;
  title?: string;
  selectClassName?: string;
};

export const ProductSort: React.FC<ProductSortProps> = ({
  as = "pills",
  showTitle = true,
  title = "Sort by",
  selectClassName = "",
}) => {
  const { replace, clear, query } = useRouterQueryParams();
  const defaultSortValue = SORT_OPTIONS_ARRAY.find(({ type }) => type === SortType.Default)?.value;

  const handleChange = (value: string) => {
    switch (SORT_OPTIONS[value].type) {
      case SortType.Natural: {
        replace({ [SORT_QUERY_PARAM]: value, [PAGE_QUERY_PARAM]: "1" });
        break;
      }
      case SortType.Default:
      default:
        clear(SORT_QUERY_PARAM);
    }
  };

  // Display as SELECT element.
  if (as === "select") {
    const elements = SORT_OPTIONS_ARRAY.map((item) => {
      return {
        title: item.label,
        value: item.value,
      };
    });

    const selectedItem = elements.find((item) => item.value === (query[SORT_QUERY_PARAM] || defaultSortValue));

    return (
      <div>
        {showTitle && <h4 className="text-h4 text-primary mb-1">{title}</h4>}
        <Select
          label=""
          placeholder={title}
          selectedItem={selectedItem}
          options={elements}
          className={selectClassName}
          onChange={(item) => handleChange(item?.value ?? "")}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {showTitle && <h4 className="text-h4 text-primary">{title}</h4>}
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
