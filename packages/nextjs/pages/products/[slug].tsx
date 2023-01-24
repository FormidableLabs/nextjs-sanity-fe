import type { GetProductsAndCategoriesQuery, Product as ProductType, Variant } from "utils/groqTypes/ProductList";
import * as React from "react";
import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

import { setCachingHeaders } from "utils/setCachingHeaders";
import { isSlug } from "utils/isSlug";
import { SanityType } from "utils/consts";
import { getRecommendations } from "utils/getRecommendationsQuery";
import { getProductBySlug } from "utils/getProductBySlug";

import { BlockContent } from "components/BlockContent";
import { ImageCarousel } from "components/ImageCarousel";
import { useCart } from "components/CartContext";
import { PageHead } from "components/PageHead";
import { Price } from "components/Price";
import { QuantityInput } from "components/ProductPage/QuantityInput";
import { StyleOptions } from "components/ProductPage/StyleOptions";
import { ProductVariantSelector } from "components/ProductPage/ProductVariantSelector";
import { H6 } from "components/Typography/H6";
import { Product } from "components/Product";
import { FadeInOut } from "components/FadeInOut";
import { Breadcrumbs } from "components/Breadcrumbs";

interface PageProps {
  data?: {
    products: GetProductsAndCategoriesQuery["products"];
    recommendations: GetProductsAndCategoriesQuery["products"];
  };
}

const ProductPage: NextPage<PageProps> = ({ data }) => {
  const { query } = useRouter();

  const product = data?.products[0];
  const selectedVariant =
    (product?.variants || []).find((v) => v?.slug?.current && v.slug.current === query.variant) ||
    product?.variants?.[0];

  return (
    <React.Fragment>
      <PageHead title={product?.name || "Product details"} description={`Product details page for ${product?.name}.`} />
      <div className="container my-4">
        <Breadcrumbs />
      </div>
      <div className="flex flex-col gap-6 py-6">
        <AnimatePresence initial={false} mode="wait">
          <React.Fragment key={`${query.slug}:${query.variant}`}>
            <FadeInOut>
              <PageBody product={product} variant={selectedVariant} />
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
                  // TODO: make the interface for Product more generic so it can take result from GQL also
                  item={{
                    _id: variant._id ?? "",
                    slug: variant?.slug?.current || "",
                    productSlug: prod.slug?.current || "",
                    imageAlt: variant.name ?? "",
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    images: image,
                    msrp: variant.msrp ?? 0,
                    name: variant.name ?? "",
                    price: variant.price ?? 0,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

const PageBody = ({ variant, product }: { product?: ProductType; variant?: Variant }) => {
  const { replace } = useRouter();
  const { updateCart, cartItems } = useCart();

  const setSelectedVariant = React.useCallback((slug: string) => {
    replace({
      pathname: window.location.pathname,
      query: {
        variant: slug,
      },
    }).catch(() => null);
  }, []);

  const [selectedStyle, setSelectedStyle] = useState<string>(() => variant?.style?.[0]?.name || "");
  const [quantity, setQuantity] = useState("1");

  const onVariantChange = (slug?: string) => {
    if (slug) setSelectedVariant(slug);
  };

  const onAddToCart = () => {
    if (variant?._id) {
      // If the item is already in the cart allow user to click add to cart multiple times
      const existingCartItem = cartItems.find((item) => item._id === variant._id);

      updateCart(variant?._id, existingCartItem ? existingCartItem.qty + Number(quantity) : Number(quantity));
    }
  };

  return (
    <div className="container">
      <div className="grid md:grid-cols-2 md:grid-rows-none md:items-baseline gap-6">
        <div className="md:row-span-2 order-2 md:order-1">
          {variant?.images && <ImageCarousel productImages={variant?.images} />}
        </div>
        <div className="text-primary order-1 md:order-2">
          <h4 className="text-h4 font-medium mb-2">{product?.name}</h4>
          <Price msrp={variant?.msrp} price={variant?.price} />
        </div>

        <div className="text-primary order-3">
          <BlockContent value={variant?.descriptionRaw} className="text-body-reg text-primary font-medium" />
          <hr className="border-t border-t-primary my-5" />
          <ProductVariantSelector
            variants={product?.variants}
            selectedVariant={variant}
            onVariantChange={onVariantChange}
          />

          {variant?.style?.length && (
            <React.Fragment>
              <hr className="border-t border-t-primary my-5" />
              <StyleOptions options={variant?.style} onChange={setSelectedStyle} selectedStyle={selectedStyle} />
            </React.Fragment>
          )}

          <hr className="border-t border-t-primary my-5" />
          <QuantityInput quantity={quantity} onAddToCart={onAddToCart} onQuantityChange={setQuantity} />
        </div>
      </div>
    </div>
  );
};

// type PDPProduct = GetProductAndRecommendationsQuery["allProduct"][number];
// type PDPVariant = NonNullable<GetProductAndRecommendationsQuery["allProduct"][number]["variants"]>[number];

export const getServerSideProps = (async ({ res, query }) => {
  const { slug } = query;

  const cacheKeys = [] as string[];
  if (isSlug(slug)) {
    cacheKeys.push(`${SanityType.Product}_${slug}`);
  }

  const products = await getProductBySlug(isSlug(slug) ? slug : "");
  const recommendations = await getRecommendations();

  // Extract variant slugs to add to cache keys, in case any of those change.
  const variantSlugs: string[] = (products[0]?.variants?.map((v: any) => v?.slug?.current) || []).filter(Boolean);
  cacheKeys.push(...variantSlugs.map((s) => `${SanityType.Variant}_${s}`));
  setCachingHeaders(res, cacheKeys);

  return {
    props: {
      data: {
        products,
        recommendations,
      },
    },
  };
}) satisfies GetServerSideProps;

export default ProductPage;
