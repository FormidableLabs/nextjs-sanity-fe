import groq from "groq";
import { sanityClient } from "./sanityClient";

export function GetAllFilteredVariants(filters = "", order = "") {
  return groq`
  {
    'variants': *[_type == "variant"]${filters} {
      _id, name, msrp, price,
      'slug': slug.current,
      'imageAlt': name,
      'images': images,
      'productSlug': *[_type == "product"][references(^._id)][0].slug.current
    } ${order} [$offsetPage...$limit],
    'itemCount': count(*[_type == "variant"]${filters}),
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
