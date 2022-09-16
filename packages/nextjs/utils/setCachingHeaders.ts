import { ServerResponse } from "http";

/**
 * sets appropriate caching response header, along with an optional set of surrogate keys
 * note: when running `next dev`, these headers are overwritten to prevent local caching
 * @param res - ServerResponse object
 * @param keys - array of keys to add to the Surrogate-Key response header
 */
export const setCachingHeaders = (res: ServerResponse, keys?: string[]): void => {
  res.setHeader("Cache-Control", "public, max-age=0");
  res.setHeader("Surrogate-Control", "max-age=604800, stale-while-revalidate=120000, stale-if-error=600000");
  if (keys && keys.length > 0) {
    res.setHeader("Surrogate-Key", keys.join(" "));
  }
};
