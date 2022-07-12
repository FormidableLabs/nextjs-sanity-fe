import client from "@sanity/client";

const sanityOptions = {
  dataset: "production",
  apiVersion: "2021-10-21",
  token: process.env.SANITY_READ_TOKEN,
};

export const sanityClient = client({
  ...sanityOptions,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: false,
});
