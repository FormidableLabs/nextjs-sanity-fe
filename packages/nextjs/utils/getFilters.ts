import { q } from "groqd";
import { runQuery } from "./sanityClient";

/**
 * Note that the `count(*[_type=="product"][references(^._id)]) > 0` ensures category is only returned
 *   if at least one product is in the category (e.g., no empty categories)
 * This is a nice feature, but you pay a perf penalty for it. Trade-offs 🤷‍
 *  (since we've got a strong caching strategy, this penalty is minimized)
 */
const getFilterForType = (type: string, parentType: string) =>
  runQuery(
    q("*")
      .filter("_type == $type")
      .filter("count(*[_type==$parentType][references(^._id)]) > 0")
      .grab$({
        name: q.string(),
        slug: q.slug("slug"),
      }),
    { type, parentType }
  );

/**
 * Fetches categories for filters.
 */
export const getCategoryFilters = () => getFilterForType("category", "product");

/**
 * Fetches "styles".
 * Similar trade-off as above.
 */
export const getStyleFilters = () => getFilterForType("style", "variant");

/**
 * Fetches flavours.
 * Similar trade-off as above.
 */
export const getFlavourFilters = () => getFilterForType("flavour", "variant");
