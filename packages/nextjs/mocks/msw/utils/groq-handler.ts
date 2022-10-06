import { rest } from "msw";
import * as groqJs from "groq-js";

/**
 * Returns a MSW handler for GROQ queries
 * @param url
 * @param getDataset
 */
export function mswGroqHandler(url: string, getDataset: () => unknown[]) {
  return rest.get(url, async (req, res, ctx) => {
    // Parse the parameters:
    const { query, ...searchParams } = Object.fromEntries(req.url.searchParams.entries());
    const params = parseParams(searchParams);
    const parsed = groqJs.parse(query, { params });

    // Evaluate the query;
    const dataset = getDataset();
    const result = await groqJs.evaluate(parsed, { dataset, params });

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
