import { rest } from "msw";
import * as groqJs from "groq-js";

/**
 * Returns a MSW handler for GROQ queries
 * @param url - The URL of the GROQ server to capture
 * @param getDataset - Any object.  It will be recursively searched for all nested objects that match the GROQ query.
 */
export function createGroqHandler(url: string, getDataset: () => object) {
  return rest.get(url, async (req, res, ctx) => {
    // Parse the parameters:
    const { query, ...searchParams } = Object.fromEntries(req.url.searchParams.entries());
    const params = parseParams(searchParams);

    // Grab all data:
    const rawData = getDataset();
    const dataset = Array.from(flattenObjects(rawData));

    // Evaluate the query;
    const parsed = groqJs.parse(query, { params });
    const streamResult = await groqJs.evaluate(parsed, { dataset, params });
    const result = await streamResult.get();

    // Return the result:
    const body = { result };
    return res(ctx.json(body));
  });
}

/**
 * Converts from { $param: "5" } to { param: 5 }
 */
function parseParams(searchParams: object) {
  return Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => {
      if (key.startsWith("$")) key = key.substring(1);
      if (!Number.isNaN(value)) value = Number(value);
      return [key, value];
    })
  );
}

/**
 * Recursively finds all nested objects
 */
function flattenObjects(obj: object, results = new Set<object>()) {
  if (results.has(obj)) {
    // We've already traversed this object
    return results;
  }

  results.add(obj);

  Object.values(obj).forEach((child) => {
    if (child && typeof child === "object") {
      flattenObjects(child, results);
    }
  });

  return results;
}
