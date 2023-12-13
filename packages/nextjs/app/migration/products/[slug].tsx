"use client";

import * as React from "react";
import { useState } from "react";
import { NextPage } from "next";
import { AnimatePresence } from "framer-motion";

import { H6, FadeInOut, BlockContent, Price, QuantityInput, useCart } from "../../ui/shared-ui";
import { getRecommendations } from "utils/getRecommendationsQuery";

import { ImageCarousel } from "components/ImageCarousel";
import { StyleOptions } from "components/ProductPage/StyleOptions";
import { ProductVariantSelector } from "components/ProductPage/ProductVariantSelector";
import { Product } from "app/components/Product";
import { Breadcrumbs } from "components/Breadcrumbs";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductDetail, ProductDetailVariants } from "utils/groqTypes/ProductDetail";

interface PageProps {
  data?: {
    product: ProductDetail;
    recommendations: Awaited<ReturnType<typeof getRecommendations>>;
  };
}

const ProductPage: NextPage<PageProps> = ({ data }) => {
  const query = useSearchParams();
  const product = data?.product;
  const variant = query?.get("variant");

  const selectedVariant =
    (product?.variants || []).find((v) => v?.slug && v.slug === variant) || product?.variants?.[0];

  return (
    <React.Fragment>
      <div className="container my-4">
        <Breadcrumbs />
      </div>
      <div className="flex flex-col gap-6 py-6">
        <AnimatePresence initial={false} mode="wait">
          <React.Fragment key={`${query?.get("slug")}:${variant}`}>
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
};

const PageBody = ({ variant, product }: { product?: ProductDetail; variant?: ProductDetailVariants[number] }) => {
  const { replace } = useRouter();
  const { updateCart, cartItems } = useCart();

  const setSelectedVariant = React.useCallback(
    (slug: string) => {
      replace(`${window.location.pathname}?variant=${slug}`);
    },
    [replace]
  );

  const [selectedStyle, setSelectedStyle] = useState<string>(() => variant?.style?.[0]?.name || "");
  const [quantity, setQuantity] = useState("1");

  const onVariantChange = (slug?: string) => {
    if (slug) setSelectedVariant(slug);
  };

  const onAddToCart = () => {
    if (variant?._id) {
      // If the item is already in the cart allow user to click add to cart multiple times
      const existingCartItem = cartItems.find((item) => item._id === variant._id);

      updateCart({
        _id: variant._id,
        name: variant.name,
        price: variant.price,
        quantity: existingCartItem ? existingCartItem.quantity + Number(quantity) : Number(quantity),
      });
    }
  };

  return (
    <div className="container">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:row-span-2 order-2 md:order-1">
          {variant?.images && <ImageCarousel sizes="(max-width: 768px) 100vw, 50vw" productImages={variant?.images} />}
        </div>
        <div className="text-primary order-1 md:order-2 self-end">
          <h4 className="text-h4 font-medium mb-2">{product?.name}</h4>
          <Price msrp={variant?.msrp} price={variant?.price} />
        </div>

        <div className="text-primary order-3">
          {variant?.description ? (
            <BlockContent value={variant?.description} className="text-body-reg text-primary font-medium" />
          ) : null}
          <hr className="border-t border-t-primary my-5" />
          <ProductVariantSelector
            variants={product?.variants ?? []}
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

export default ProductPage;
