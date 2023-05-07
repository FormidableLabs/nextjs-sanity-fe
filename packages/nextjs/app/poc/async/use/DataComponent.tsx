import { use, useMemo } from "react";
import { fetchSlowData } from "../common/fetchSlowData";

export function DataComponent() {
  const data = use(
    useMemo(async () => {
      return fetchSlowData({});
    }, [])
  );
  return <p>{data}</p>;
}
