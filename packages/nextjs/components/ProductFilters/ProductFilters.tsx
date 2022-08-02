import type { FiltersGroup } from "./types";

import { ChangeEvent } from "react";
import { useRouter } from "next/router";

type ProductFiltersProps = {
  filtersData?: FiltersGroup[];
};

const isString = (el: any) => {
  return typeof el === "string" || el instanceof String;
};

const DUMMY_DATA = [
  {
    id: 1,
    name: "promotion",
    label: "Promotion",
    options: [
      { id: 1, name: "sale", label: "Sale" },
      { id: 2, name: "bogo", label: "BOGO" },
      { id: 3, name: "2day", label: "Free 2-day Shipping" },
    ],
  },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({ filtersData = DUMMY_DATA }) => {
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, group: string, option: string) => {
    const currentValue = router.query[group];

    if (e?.target?.checked) {
      // Add option to query params
      if (currentValue) {
        if (isString(currentValue)) {
          // Single existing, create and append to array
          router.query[group] = [currentValue as string, option];
        } else {
          // Multiple options, append to array
          (router.query[group] as string[]).push(option);
        }
      } else {
        // No existing options, sdd single option
        router.query[group] = option;
      }
    } else {
      // Remove option from query params
      if (currentValue) {
        if (isString(currentValue)) {
          // Single option, remove group and option
          delete router.query[group];
        } else {
          // Multiple options, only remove option
          router.query[group] = (router.query[group] as string[]).filter((value) => value !== option);
        }
      }
    }

    router.replace({ query: router.query });
  };

  return (
    <div>
      <h2>Filters</h2>
      <div>
        {filtersData.map(({ id: groupId, name: groupName, label: groupLabel, options }) => (
          <div key={groupId}>
            <h3>{groupLabel}</h3>
            {options?.length && (
              <ul>
                {options.map(({ id: optionId, name: optionName, label: optionLabel }) => {
                  const query = router.query?.[groupName];
                  const queryIsString = isString(query);

                  const isChecked =
                    !!query && // Value exists
                    ((queryIsString && query === optionName) || // Single value matching option
                      (!queryIsString && query.includes(optionName))); // Multiple values including option

                  return (
                    <li key={optionId}>
                      <label>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            handleChange(e, groupName, optionName);
                          }}
                        />
                        <span>{optionLabel}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
