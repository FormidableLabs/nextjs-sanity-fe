import { sanityClient } from "./sanityClient";
import groq from "groq";
import { StyleFilterItem } from "./groqTypes/ProductList";

/**
 * Fetches "styles".
 * Note that the `count(*[_type=="variant" && references(^._id)]) > 0` ensures filter is only present
 *   if attached to at least one variant.
 * This is nice, but you pay a perf penalty for it. Trade-offs 🤷‍
 */
export const getStyleFilters = (categorySlug = ""): Promise<StyleFilterItem[]> =>
  sanityClient.fetch(groq`
  	*[_type == "style" && count(*[_type=="variant" && references(^._id)]) > 0] {
  		name,
  		'slug': slug.current,
		}`);
