import { FILTER_GROUPS } from "constants/filters";
import { SORT_OPTIONS, SORT_QUERY_PARAM } from "constants/sorting";
import { ParsedUrlQuery } from "querystring";

export const getFiltersFromQuery = (query: ParsedUrlQuery) => {
    const { [SORT_QUERY_PARAM]: sortValue } = query;

  // Sort/ordering
  let ordering = "| order(_createdAt)";
  if (sortValue) {
    // If sort is string[], use first item
    // (e.g. User modified url, wouldn't happen normally)
    const sortType = Array.isArray(sortValue) ? sortValue[0] : sortValue;
    const sortOption = SORT_OPTIONS[sortType];
    if (sortOption?.ordering) {
      ordering = `| order(${sortOption.ordering})`;
    }
  }

  // Filters
  const filterGroups = FILTER_GROUPS.reduce((acc: string[][], { value: groupValue, options }) => {
    const queryValue = query[groupValue];
    if (!queryValue) {
      // No filter query param
      return acc;
    }

    const queryValueIsString = typeof queryValue === "string" || queryValue instanceof String;
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
  }, []);

  /**
   * Creates OR statements for filters of each group
   * e.g. if MD and XL filters are active, filter would check for (MD || XL)
   *  */
  const constructedGroups = filterGroups.reduce((acc: string[], currGroup: string[]) => {
    if (currGroup.length) {
      const joinedStr = currGroup.map((filter) => `(${filter})`).join(" || ");
      const constructedGroup = currGroup.length > 1 ? `(${joinedStr})` : joinedStr;
      return [...acc, constructedGroup];
    }
    return acc;
  }, []);

  /**
   * Creates AND statement of filter groups
   * e.g. given (MD || XL) and (on sale), constructed filter would check for ((MD || XL) && (on sale))
   *  */
  return constructedGroups.length ? `&& (${constructedGroups.join(" && ")})` : "";   
}