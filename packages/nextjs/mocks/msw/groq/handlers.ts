import { sanityClient } from "utils/sanityClient";

import { getMockData } from '../db/mock-db';
import { createGroqHandler } from "./create-groq-handler";

const config = sanityClient.config();
// @ts-expect-error cdnUrl is not defined but it's there:
const SANITY_GROQ_URL = `${config.cdnUrl}/data/query/${config.dataset}`;

export const groqHandlers = [
  createGroqHandler(SANITY_GROQ_URL, () => {
    return getAllMockData();
  }),
];

/**
 * Returns a "flattened" view of all our mock data.
 */
function getAllMockData() {
  const data = getMockData();
  const allData = Array.from(flattenObjects(data));
  return allData;
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
