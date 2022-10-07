export enum SortType {
  Default = "DEFAULT", // no sort
  Natural = "NATURAL", // sorts alphanumerical
}

export type SortOption = {
  value: string;
  label: string;
  type: SortType;
  ordering: string;
};

export const SORT_QUERY_PARAM = "sort";

export const PAGE_QUERY_PARAM = "page";

export const SORT_OPTIONS: Record<string, SortOption> = {
  default: {
    value: "default",
    label: "Default",
    type: SortType.Default,
    ordering: "_id asc", // Default query sorting
  },
  "a-z": {
    value: "a-z",
    label: "A - Z",
    type: SortType.Natural,
    ordering: "name asc",
  },
  "z-a": {
    value: "z-a",
    label: "Z - A",
    type: SortType.Natural,
    ordering: "name desc",
  },
  lowest: {
    value: "lowest",
    label: "Lowest Price",
    type: SortType.Natural,
    ordering: "price asc",
  },
  highest: {
    value: "highest",
    label: "Highest Price",
    type: SortType.Natural,
    ordering: "price desc",
  },
};

export const SORT_OPTIONS_ARRAY = Object.values(SORT_OPTIONS);
