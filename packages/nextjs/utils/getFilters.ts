import { q } from "groqd";
import { sanityClient } from "./sanityClient";

/**
 * Fetches categories for filters.
 * Note that the `count(*[_type=="product"][references(^._id)]) > 0` ensures category is only returned
 *   if at least one product is in the category (e.g., no empty categories)
 * This is a nice feature, but you pay a perf penalty for it. Trade-offs 🤷‍
 * 	(since we've got a strong caching strategy, this penalty is minimized)
 */
const { query: categoryFiltersQuery, schema: categoryFiltersQuerySchema } = q("*")
  .filter('_type == "category"][count(*[_type=="product"][references(^._id)]) > 0')
  .grab({
    name: q.string(),
    slug: ["slug.current", q.string()],
  });

export const getCategoryFilters = async () => {
  const response = categoryFiltersQuerySchema.parse(await sanityClient.fetch(categoryFiltersQuery));
  return response;
};

/**
 * Fetches "styles".
 * Similar trade-off as above.
 */
const { query: styleFiltersQuery, schema: styleFiltersQuerySchema } = q("*")
  .filter('_type == "style"][count(*[_type=="variant"][references(^._id)]) > 0')
  .grab({
    name: q.string(),
    slug: ["slug.current", q.string()],
  });

export const getStyleFilters = async () => {
  const response = styleFiltersQuerySchema.parse(await sanityClient.fetch(styleFiltersQuery));
  return response;
};

/**
 * Fetches flavours.
 * Similar trade-off as above.
 */
const { query: flavourFiltersQuery, schema: flavourFiltersQuerySchema } = q("*")
  .filter('_type == "flavour"][count(*[_type=="variant"][references(^._id)]) > 0')
  .grab({
    name: q.string(),
    slug: ["slug.current", q.string()],
  });

export const getFlavourFilters = async () => {
  const response = flavourFiltersQuerySchema.parse(await sanityClient.fetch(flavourFiltersQuery));
  return response;
};
