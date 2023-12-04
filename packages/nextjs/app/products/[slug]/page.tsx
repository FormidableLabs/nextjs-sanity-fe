import ProductsPage from "app/migration/products/[slug]";
import { getProductBySlug } from "utils/getProductBySlug";
import { getRecommendations } from "utils/getRecommendationsQuery";
import { isSlug } from "utils/isSlug";

// See: https://nextjs.org/docs/app/api-reference/file-conventions/page
type RouteSearchParams = { [key: string]: string | string[] | undefined };

const getData = async ({ searchParams }: { searchParams: RouteSearchParams }) => {
  const { slug } = searchParams;

  const products = await getProductBySlug(isSlug(slug) ? slug : "");
  const recommendations = await getRecommendations();

  return {
    product: products[0],
    recommendations,
  };
};

export default async function Page({ searchParams }: { searchParams: RouteSearchParams }) {
  const data = await getData({ searchParams });

  return <ProductsPage data={data} />;
}
