import ProductsPage from "app/migration/products/[slug]";
import { getProductBySlug } from "utils/getProductBySlug";
import { getRecommendations } from "utils/getRecommendationsQuery";
import { isSlug } from "utils/isSlug";

const getData = async (slug: string) => {
  const products = await getProductBySlug(isSlug(slug) ? slug : "");
  const recommendations = await getRecommendations();

  return {
    product: products[0],
    recommendations,
  };
};

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  return <ProductsPage data={data} />;
}
