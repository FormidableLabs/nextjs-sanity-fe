import client from "@sanity/client";
import sanityImage from "@sanity/image-url";
import { makeSafeQueryRunner } from "groqd";

const sanityOptions = {
  dataset: "production",
  apiVersion: "2021-10-21",
};

export const sanityClient = client({
  ...sanityOptions,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: true,
});

export const imageBuilder = sanityImage(sanityClient);

export const nonCDNClient = client({
  ...sanityOptions,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
});

export const runQuery = makeSafeQueryRunner((query, params: Record<string, unknown> = {}) => {
  return nonCDNClient.fetch(query, params);
});
