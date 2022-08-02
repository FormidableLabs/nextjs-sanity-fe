import type { FiltersGroup } from "./types";

import { ChangeEvent } from "react";
import { useRouter } from "next/router";

type ProductFiltersProps = {
  filtersData?: FiltersGroup[];
};

const DUMMY_DATA = [
  {
    id: 1,
    name: "promotion",
    label: "Shop by Promotion",
    options: [
      { id: 1, name: "sale", label: "Sale" },
      { id: 2, name: "bogo", label: "BOGO" },
    ],
  },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({ filtersData = DUMMY_DATA }) => {
  const router = useRouter();

  const handleChange = (group: string, option: string) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.checked) {
      router.replace({
        query: { ...router.query, [group]: option },
      });
    } else {
      // Remove
      //   params;
    }
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
                  const queryIsString = typeof query === "string" || query instanceof String;

                  const isChecked =
                    !!query &&
                    ((queryIsString && query === optionName) || (!queryIsString && query.includes(optionName)));

                  return (
                    <li key={optionId}>
                      <label>
                        <input type="checkbox" checked={isChecked} onChange={handleChange(groupName, optionName)} />
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
