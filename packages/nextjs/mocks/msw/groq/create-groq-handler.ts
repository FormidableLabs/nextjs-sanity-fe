import type { Dataset } from "./create-dataset";
import { rest } from "msw";
import * as groqJs from "groq-js";

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

const INEFFICIENT_QUERY_THRESHOLD = 5_000;

export async function executeQuery(dataset: Dataset, query: string, params: Record<string, string>): Promise<unknown> {
  const parsed = groqJs.parse(query, { params });
  const streamResult = await groqJs.evaluate(parsed, { dataset, params });
  const start = Date.now();
  const result = await streamResult.get();
  const elapsed = Date.now() - start;
  if (elapsed >= INEFFICIENT_QUERY_THRESHOLD) {
    // Issue a warning!
    console.warn(`
      [groq-handler] WARNING: this query took ${elapsed} ms to mock execute.
      This usually indicates an inefficient query, and you should consider improving it.
      ${query.includes("&&") ? "Instead of using [a && b], consider using [a][b] instead!" : ""}
      Inefficient query: \n${query}
    `);
  }
  return result;
}
