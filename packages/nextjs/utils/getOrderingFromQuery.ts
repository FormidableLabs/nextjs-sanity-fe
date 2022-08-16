import { SORT_OPTIONS, SORT_QUERY_PARAM } from "constants/sorting";
import { ParsedUrlQuery } from "querystring";

export const getOrderingFromQuery = (query: ParsedUrlQuery) => {
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

  return ordering;
}