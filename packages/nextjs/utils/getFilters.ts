import { FlavourFilterItem, StyleFilterItem } from "./groqTypes/ProductList";
import { sanityClient } from "./sanityClient";
import groq from "groq";

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
