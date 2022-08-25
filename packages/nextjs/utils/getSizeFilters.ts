// This file is specifically used for getting size filters but it can be evolved for more filters
import groq from "groq";
import { sanityClient } from "./sanityClient";

/**
 *
 * @param slug - Optional category slug, if not provided, all products will be used
 * @returns de-duped filters for products either in a category or for all products
 */
export const getSizeFilters = async (slug = ""): Promise<string[]> => {
  const res: [string[]] = await sanityClient.fetch(
    groq`
      *[_type == "product" ${slug ? "&& $slug in categories[]->slug.current" : ""}] {
        'size': variants[]->size->name
      }.size
    `,
    {
      slug,
    }
  );

  // Removes duplicate entries from sizeFilters.
  const dedupedFilters = new Set<string>();
  res.forEach((f) => f.forEach((v) => dedupedFilters.add(v)));
  return Array.from(dedupedFilters);
};
