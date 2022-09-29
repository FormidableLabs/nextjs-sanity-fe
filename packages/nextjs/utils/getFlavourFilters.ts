import { sanityClient } from "./sanityClient";
import groq from "groq";
import { FlavourFilterItem } from "./groqTypes/ProductList";

/**
 * Fetches flavours.
 * Note that the `count(*[_type=="variant" && references(^._id)]) > 0` ensures filter is only present
 *   if attached to at least one variant.
 * This is nice, but you pay a perf penalty for it. Trade-offs 🤷‍
 */
export const getFlavourFilters = (categorySlug = ""): Promise<FlavourFilterItem[]> =>
  sanityClient.fetch(groq`
  	*[_type == "flavour" && count(*[_type=="variant" && references(^._id)]) > 0] {
  		name,
  		'slug': slug.current,
		}`);
