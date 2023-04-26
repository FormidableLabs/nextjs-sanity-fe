import { q } from "groqd";
import { runQuery } from "./sanityClient";
import { productSelection } from "./getAllProductsQuery";

export type Recommendations = Awaited<ReturnType<typeof getRecommendations>>;
export const getRecommendations = () =>
  runQuery(q("*").filterByType("product").order("_updatedAt asc").slice(0, 2).grab$(productSelection));
