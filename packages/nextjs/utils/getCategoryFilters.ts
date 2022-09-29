import { sanityClient } from "./sanityClient";
import groq from "groq";
import { FlavourFilterItem } from "./groqTypes/ProductList";

/**
 * Fetches flavours.
 * Note that the `count(*[_type=="product" && references(^._id)]) > 0` ensures filter is only present
 *   if attached to at least one product.
 * This is nice, but you pay a perf penalty for it. Trade-offs 🤷‍
 */
export const getCategoryFilters = (categorySlug = ""): Promise<FlavourFilterItem[]> =>
  sanityClient.fetch(groq`
  	*[_type == "category" && count(*[_type=="product" && references(^._id)]) > 0] {
  		name,
  		'slug': slug.current,
		}`);
