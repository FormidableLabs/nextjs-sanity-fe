import client from "@sanity/client";

const sanityOptions = {
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  apiVersion: "2021-10-21",
};

export const sanityClient = client({
  ...sanityOptions,
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  useCdn: true,
});
