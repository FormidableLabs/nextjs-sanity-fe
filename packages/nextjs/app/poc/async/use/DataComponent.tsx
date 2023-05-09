import { use, cache } from "react";
// @ts-expect-error -- No types
import memoize from "lodash.memoize";
import { fetchSlowData } from "../common/fetchSlowData";

const fetchSlowDataCache: typeof fetchSlowData =
  typeof window === "undefined" ? memoize(fetchSlowData) : cache(fetchSlowData);

export function DataComponent() {
  const data = use(fetchSlowDataCache({}));
  return <p>{data}</p>;
}
