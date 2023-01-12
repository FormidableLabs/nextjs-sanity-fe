import type { FilterGroup as FilterGroupType } from "utils/filters";
import * as React from "react";
import { ChangeEvent } from "react";
import { useRouterQueryParams } from "utils/useRouterQueryParams";
import { Checkbox } from "components/Checkbox";

type FilterGroupProps = {
  group: FilterGroupType;
};

export const FilterGroup: React.FC<FilterGroupProps> = ({ group }) => {
  const { value: groupValue, label: groupLabel, options } = group;

  const { query, add, remove } = useRouterQueryParams();

  const queryValue = query[groupValue];
  const queryValueIsString = typeof queryValue === "string" || queryValue instanceof String;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value: optionValue } = e.target;
    const queryFunc = checked ? add : remove;
    queryFunc(groupValue, optionValue);
  };

  if (!options?.length) {
    return null;
  }

  return (
    <fieldset>
      <legend className="text-h5 text-primary mb-2">{groupLabel}</legend>
      <ul>
        {options.map(({ value: optionValue, label: optionLabel }) => {
          const isChecked =
            !!queryValue && // Value exists
            ((queryValueIsString && queryValue === optionValue) || // Single value matches option
              (!queryValueIsString && queryValue.includes(optionValue))); // Multiple values includes option

          return (
            <li key={optionValue}>
              <Checkbox
                label={optionLabel}
                name={optionLabel}
                value={optionValue}
                checked={isChecked}
                onChange={handleChange}
              />
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};
