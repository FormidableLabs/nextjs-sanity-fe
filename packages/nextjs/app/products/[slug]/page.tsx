import { Product } from "app/components/Product";
import ProductsPage from "app/components/ProductDetailBody";
import { Breadcrumbs } from "components/Breadcrumbs";
import { AnimatePresence } from "../../ui/framer";
import { Metadata } from "next";
import React from "react";
import { H6, FadeInOut } from "../../ui/shared-ui";
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
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getData(params.slug);

  return {
    title: data.product?.name || "Product details",
    description: `Product details page for ${data.product?.name}.`,
  };
}

export default async function Page({ params, searchParams }: Props) {
  const data = await getData(params.slug);
  const product = data?.product;
  const variant = searchParams.variant;

  const selectedVariant =
    (product?.variants || []).find((v) => v?.slug && v.slug === variant) || product?.variants?.[0];

  return (
    <React.Fragment>
      <div className="container my-4">
        <Breadcrumbs />
      </div>
      <div className="flex flex-col gap-6 py-6">
        <AnimatePresence initial={false} mode="wait">
          <React.Fragment key={`${params.slug}:${variant}`}>
            <FadeInOut>
              <ProductsPage product={product} variant={selectedVariant} />
            </FadeInOut>
          </React.Fragment>
        </AnimatePresence>

        <div className="border-t-2 border-primary" />

        <div className="container grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <H6 className="col-span-2 md:col-span-1">Related Products</H6>
          {data?.recommendations?.slice(0, 3).map((prod) => {
            const variant = prod.variants?.[0];
            const image = variant?.images?.[0];
            if (!variant || !image) return null;

            return (
              <div key={prod._id} className="w-full">
                <Product
                  item={{
                    ...variant,
                    productSlug: prod.slug || "",
                    images: image,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
