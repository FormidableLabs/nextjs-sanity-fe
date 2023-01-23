import client from "@sanity/client";

const sanityOptions = {
  dataset: "production",
  apiVersion: "2021-10-21",
};

export const sanityClient = client({
  ...sanityOptions,
  projectId: "5bsv02jj",
  useCdn: false,
});
