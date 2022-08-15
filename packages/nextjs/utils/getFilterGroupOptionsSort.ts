import { FILTER_SIZE_ORDER } from "constants/filters";

/**
 * Returns a callback function to sort filter group options
 * @param type filter group option type
 * @returns callback function to use with Array.sort
 */
export const getFilterGroupOptionsSort = (type: string) => (a: string, b: string) => {
  switch (type) {
    // Sorts available sizes by position in predefined array
    case "sizes": {
      const aIndex = FILTER_SIZE_ORDER.indexOf(a);
      const bIndex = FILTER_SIZE_ORDER.indexOf(b);

      // Neither found, keep order
      if (aIndex === -1 && bIndex === -1) {
        return 0;
      }

      // a not found, b first
      if (aIndex === -1) {
        return 1;
      }

      // b not found, a first
      if (bIndex === -1) {
        return -1;
      }

      // Both found,
      return aIndex < bIndex ? -1 : 1;
    }
    case "natural":
    default:
      return a.localeCompare(b, "en", { numeric: true });
  }
};
