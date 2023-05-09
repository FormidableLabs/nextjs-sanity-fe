import { use } from "react";
// @ts-expect-error -- No types
import memoize from "lodash.memoize";
import { fetchSlowData } from "../common/fetchSlowData";

// const cache = React.cache; // Does not work server-side 😡
const cache = memoize;

const fetchSlowDataCache: typeof fetchSlowData = cache(fetchSlowData);

export function DataComponent() {
  const data = use(fetchSlowDataCache());
  return <p>{data}</p>;
}
