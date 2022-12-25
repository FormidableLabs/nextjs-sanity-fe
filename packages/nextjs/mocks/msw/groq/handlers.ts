import { sanityClient } from "utils/sanityClient";
import { getMockData } from "../db/mock-data";
import { createGroqHandler } from "./create-groq-handler";
import { createDataset } from "./create-dataset";

const config = sanityClient.config();
// @ts-expect-error cdnUrl is not defined but it's there:
const SANITY_GROQ_URL = `${config.cdnUrl}/data/query/${config.dataset}`;

export const groqHandlers = [
  createGroqHandler(SANITY_GROQ_URL, async () => {
    return createDataset([await getMockData()]);
  }),
];
