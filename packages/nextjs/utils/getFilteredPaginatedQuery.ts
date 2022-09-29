import groq from "groq";
import { sanityClient } from "./sanityClient";

// TODO: Delete this
export function GetAllFilteredProducts(filters = "", order = "") {
  return groq`{
      'products': *[_type == "product" ${filters}] {
        ...,
        'imageAlt': images[0]->name,
        'images': images[0]->images,
        'msrp': variants | order(price asc)[0]->msrp,
        'price': variants | order(price asc)[0]->price,
        'variants': variants[]->{
          ...,
          'size': size->name
        }
      } ${order} [$offsetPage...$limit],
      'productsCount': count(*[_type == "product" ${filters}]),
    }`;
}

export function GetAllFilteredVariants(filters = "", order = "") {
  return groq`
  {
    'variants': *[_type == "variant" ${filters}] {
      _id, name, msrp, price,
      'slug': slug.current,
      'imageAlt': images[0]->name,
      'images': images[0]->images,
      'productSlug': *[_type == "product" && references(^._id)][0].slug.current
    } ${order} [$offsetPage...$limit],
    'itemCount': count(*[_type == "variant" ${filters}]),
  }`;
}

export const getFilteredPaginatedQuery = async <T>(
  query: string,
  queryOptions: {
    offsetPage: number;
    limit: number;
    [key: string]: any;
  }
): Promise<T> => {
  return await sanityClient.fetch(query, queryOptions);
};
