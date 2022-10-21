import { CategoryFilterItem, FlavourFilterItem, StyleFilterItem } from "./groqTypes/ProductList";
import { sanityClient } from "./sanityClient";
import groq from "groq";

/**
 * Fetches categories for filters.
 * Note that the `count(*[_type=="product" && references(^._id)]) > 0` ensures category is only returned
 *   if at least one product is in the category (e.g., no empty categories)
 * This is a nice feature, but you pay a perf penalty for it. Trade-offs 🤷‍
 * 	(since we've got a strong caching strategy, this penalty is minimized)
 */
export const getCategoryFilters = (categorySlug = ""): Promise<CategoryFilterItem[]> =>
  sanityClient.fetch(groq`
  	*[_type == "category" && count(*[_type=="product" && references(^._id)]) > 0] {
  		name,
  		'slug': slug.current,
		}`);

/**
 * Fetches "styles".
 * Similar trade-off as above.
 */
export const getStyleFilters = (categorySlug = ""): Promise<StyleFilterItem[]> =>
  sanityClient.fetch(groq`
  	*[_type == "style" && count(*[_type=="variant" && references(^._id)]) > 0] {
  		name,
  		'slug': slug.current,
		}`);

/**
 * Fetches flavours.
 * Similar trade-off as above.
 */
export const getFlavourFilters = (categorySlug = ""): Promise<FlavourFilterItem[]> =>
  sanityClient.fetch(groq`
  	*[_type == "flavour" && count(*[_type=="variant" && references(^._id)]) > 0] {
  		name,
  		'slug': slug.current,
		}`);
