import { ParsedUrlQuery } from "querystring";
import { FilterGroupParams, getFilterGroups } from "utils/filters";

export const getFiltersFromQuery = (
  query: ParsedUrlQuery,
  { flavourFilters, styleFilters, categoryFilters }: FilterGroupParams = {}
) => {
  // Filters
  const filterGroups = getFilterGroups({ flavourFilters, styleFilters, categoryFilters }).reduce(
    (acc: string[][], { value: groupValue, options }) => {
      const queryValue = query[groupValue];
      if (!queryValue) {
        // No filter query param
        return acc;
      }

      const queryValueIsString = typeof queryValue === "string" && !Array.isArray(queryValue);
      if (queryValueIsString) {
        const filterOption = options.find(({ value }) => value === queryValue);
        // Check query value validity
        if (filterOption) {
          return [...acc, [filterOption.filter]];
        }
      } else {
        // Check query value validity
        const validOptions = options.filter(({ value: optionValue }) => queryValue.includes(optionValue));
        if (validOptions.length) {
          return [...acc, validOptions.map(({ filter }) => filter)];
        }
      }

      return acc;
    },
    []
  );

  /**
   * Creates OR statements for filters of each group
   * e.g. if MD and XL filters are active, filter would check for (MD || XL)
   *  */
  const constructedGroups = filterGroups.reduce((acc: string[], currGroup: string[]) => {
    if (currGroup.length) {
      const joinedStr = currGroup.join(" || ");
      return [...acc, joinedStr];
    }
    return acc;
  }, []);

  /**
   * Creates AND statement of filter groups
   * e.g. given (MD || XL) and (on sale), constructed filter would check for ((MD || XL) && (on sale))
   *  */
  return constructedGroups.length ? `${constructedGroups.join("][")}` : "";
};
