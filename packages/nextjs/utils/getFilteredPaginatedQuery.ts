import { q, sanityImage, TypeFromSelection } from "groqd";
import { runQuery } from "./sanityClient";
import { GetPaginationResponse } from "./getPaginationFromQuery";

const variantSelection = {
  _id: q.string(),
  name: q.string(),
  msrp: q.number(),
  price: q.number(),
  slug: q.slug("slug"),
  images: sanityImage("images").filter().slice(0),
  productSlug: q("*")
    .filterByType("product")
    .filter("references(^._id)")
    .slice(0)
    .grabOne("slug.current", q.string().nullable()),
};

export const getAllFilteredVariants = (
  filters = "",
  order: `${string} ${"asc" | "desc"}`,
  pagination: GetPaginationResponse
) =>
  runQuery(
    q("").grab({
      variants: q("*")
        .filterByType("variant")
        .filter(filters)
        .grab(variantSelection)
        .order(order)
        .slice(pagination.offsetPage, pagination.limit - 1),
      itemCount: [`count(*[_type == "variant"][${filters}])`, q.number()],
    })
  );

export type FilteredPaginatedQuery = { itemCount: number; variants: TypeFromSelection<typeof variantSelection>[] };
