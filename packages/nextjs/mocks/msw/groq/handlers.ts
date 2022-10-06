import { sanityClient } from "utils/sanityClient";
import { getMockData } from "mocks/msw/db/db";
import { mswGroqHandler } from "mocks/msw/utils/groq-handler";

const config = sanityClient.config();
// @ts-expect-error cdnUrl is not defined but it's there:
const SANITY_GROQ_URL = `${config.cdnUrl}/data/query/${config.dataset}`;

export const groqHandlers = [
  mswGroqHandler(SANITY_GROQ_URL, () => {
    return getAllMockData();
  }),
];

/**
 * Returns a "flattened" view of all our mock data.
 */
function getAllMockData() {
  const data = getMockData();
  const allData = flatten(data);
  return allData;
}

/**
 * Recursively finds all nested objects
 */
function flatten(obj: object): object[] {
  const flatChildren = Object.values(obj)
    .filter((child) => child && typeof child === "object")
    .flatMap((child) => flatten(child));
  return Array.isArray(obj) ? flatChildren : [obj, ...flatChildren];
}
