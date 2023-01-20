import groq from "groq";
import { sanityClient } from "./sanityClient";

export function GetAllFilteredVariants(filters = "", order = "") {
  return groq`
  {
    'productVariants': *[_type == "product"]${filters} {
      _id, name,
      "msrp": productVariants[0].msrp,
      "price": productVariants[0].price,
      'productSlug': slug.current,
      'imageAlt': name,
      "images": images[0],
    } ${order} [$offsetPage...$limit],
    'itemCount': count(*[_type == "product"]${filters}),
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
