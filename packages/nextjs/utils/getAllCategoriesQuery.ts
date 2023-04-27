import { q } from "groqd";
import { runQuery } from "./sanityClient";
import { sanityImageSelection } from "./sanityImage";

export const categorySelection = {
  _id: q.string(),
  _type: q.string(),
  name: q.string(),
  description: q.string(),
  slug: q.object({ current: q.string() }),
  images: q("images").filter().deref().grab({
    name: q.string().optional(),
    description: q.string().nullable().optional(),
    images: sanityImageSelection(),
  }),
};

export const getAllCategories = () => runQuery(q("*").filterByType("category").grab$(categorySelection));
