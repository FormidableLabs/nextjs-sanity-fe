import ProductsPage from "app/migration/products/[slug]";
import { Metadata } from "next";
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

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getData(params.slug);

  return {
    title: data.product?.name || "Product details",
    description: `Product details page for ${data.product?.name}.`,
  };
}

export default async function Page({ params }: Props) {
  const data = await getData(params.slug);

  return <ProductsPage data={data} />;
}
