import client from "@sanity/client";
import sanityImage from "@sanity/image-url";

const sanityOptions = {
  dataset: "production",
  apiVersion: "2021-10-21",
};

export const sanityClientCdn = client({
  ...sanityOptions,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: true,
});

export const imageBuilder = sanityImage(sanityClientCdn);
