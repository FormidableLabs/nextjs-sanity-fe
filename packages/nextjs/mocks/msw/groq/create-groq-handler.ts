import { rest } from "msw";
import * as groqJs from "groq-js";
import type { Dataset } from "./create-dataset";

/**
 * Returns a MSW handler for GROQ queries
 * @param url - The URL of the GROQ server to capture
 * @param getDataset - An array of flattened dataset objects.
 */
export function createGroqHandler(url: string, getDataset: () => Dataset) {
  return rest.get(url, async (req, res, ctx) => {
    // Parse the parameters:
    const { query, ...searchParams } = Object.fromEntries(req.url.searchParams.entries());
    const params = parseParams(searchParams);
    const rawData = getDataset();

    const result = await executeQuery(rawData, query, params);
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

export async function executeQuery(dataset: Dataset, query: string, params: Record<string, string>) {
  const parsed = groqJs.parse(query, { params });
  const streamResult = await groqJs.evaluate(parsed, { dataset, params });
  const result = await streamResult.get();
  return result;
}
