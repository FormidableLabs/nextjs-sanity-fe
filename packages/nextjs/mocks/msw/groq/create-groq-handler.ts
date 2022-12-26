import { rest } from "msw";
import * as groqJs from "groq-js";
import type { Dataset } from "./create-dataset";

/**
 * Note, this cache is never cleaned up, so it will accumulate in size during development.
 */
const cache = new Map<string, unknown>();

/**
 * Returns a MSW handler for GROQ queries
 * @param url - The URL of the GROQ server to capture
 * @param getDataset - An array of flattened dataset objects.
 */
export function createGroqHandler(url: string, getDataset: () => Dataset | Promise<Dataset>) {
  return rest.get(url, async (req, res, ctx) => {
    // Parse the parameters:
    const { query, ...searchParams } = Object.fromEntries(req.url.searchParams.entries());
    const params = parseParams(searchParams);

    const dataset = await getDataset();

    // Don't worry ... even though this stringify looks large, it only takes like 1ms
    const cacheKey = JSON.stringify([dataset, query, params]);
    const cached = cache.get(cacheKey);

    let result: unknown;
    if (cached) {
      result = cached;
    } else {
      result = await executeQuery(dataset, query, params);

      cache.set(cacheKey, result);
    }

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

export async function executeQuery(dataset: Dataset, query: string, params: Record<string, string>): Promise<unknown> {
  const parsed = groqJs.parse(query, { params });
  const streamResult = await groqJs.evaluate(parsed, { dataset, params });
  const result = await streamResult.get();
  return result;
}
