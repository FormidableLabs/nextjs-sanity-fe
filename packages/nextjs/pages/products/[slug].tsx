import * as React from "react";
import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";

import { BlockContent } from "../../components/BlockContent";
import { ImageCarousel } from "../../components/ImageCarousel";
import { useCart } from "../../components/CartContext";
import {
  GetProductAndRecommendationsDocument,
  Maybe,
  useGetProductAndRecommendationsQuery,
} from "../../utils/generated/graphql";
import { initializeUrql, urqlOptions, withUrqlOptions } from "../../utils/urql";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { isSlug } from "utils/isSlug";
import { SanityType } from "utils/consts";
import { PageHead } from "../../components/PageHead";

import { Price } from "components/Price";
import { QuantityInput } from "components/ProductPage/QuantityInput";
import { StyleOptions } from "components/ProductPage/StyleOptions";
import { ProductVariant, ProductVariantSelector } from "components/ProductPage/ProductVariantSelector";
import { H6 } from "components/Typography/H6";
import { Product } from "components/Product";
import { FadeInOut } from "../../components/FadeInOut";

const ProductPage: NextPage = () => {
  const { query } = useRouter();

  return (
    <FadeInOut key={`${query.slug}:${query.variant}`}>
      <PageBody />
    </FadeInOut>
  );
};

const PageBody = () => {
  const { query, replace } = useRouter();
  const [{ data }] = useGetProductAndRecommendationsQuery({
    variables: {
      slug: query.slug as string,
    },
  });
  const { updateCart, cartItems } = useCart();

  const product = data?.allProduct[0];
  const [selectedVariant, setSelectedVariant] = useState<Maybe<ProductVariant> | undefined>(
    () =>
      (product?.variants || []).find((v) => v?.slug?.current && v.slug.current === query.variant) ||
      product?.variants?.[0]
  );
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [quantity, setQuantity] = useState("1");

  useEffect(() => {
    if (product) {
      setSelectedVariant(
        (product?.variants || []).find((v) => v?.slug?.current && v.slug.current === query.variant) ||
          product?.variants?.[0]
      );
    }
  }, [product]);

  const onVariantChange = (id?: string) => {
    const productVariant = product?.variants?.find((variant) => variant?.id === id);

    setSelectedVariant(productVariant);
  };

  // When selected variant changes, update variantId in query params
  useEffect(() => {
    if (selectedVariant) {
      replace({
        pathname: window.location.pathname,
        query: {
          variant: selectedVariant.slug?.current,
        },
      }).catch(() => null);
    }
  }, [selectedVariant]);

  const onAddToCart = () => {
    if (selectedVariant?._id) {
      // If the item is already in the cart allow user to click add to cart multiple times
      const existingCartItem = cartItems.find((item) => item._id === selectedVariant._id);

      updateCart(selectedVariant?._id, existingCartItem ? existingCartItem.qty + Number(quantity) : Number(quantity));
    }
  };

  return (
    <>
      <PageHead title={product?.name || "Product details"} description={`Product details page for ${product?.name}.`} />
      <div className="flex flex-col gap-6 py-6">
        <div>
          <div className="container">
            <div className="grid md:grid-cols-2 md:grid-rows-none md:items-baseline gap-6">
              <div className="md:row-span-2 order-2 md:order-1">
                {selectedVariant?.images && <ImageCarousel productImages={selectedVariant?.images} />}
              </div>
              <div className="text-blue order-1 md:order-2">
                <h4 className="text-h4 font-medium mb-2">{product?.name}</h4>
                <Price msrp={selectedVariant?.msrp} price={selectedVariant?.price} />
              </div>

              <div className="text-blue order-3">
                <BlockContent value={selectedVariant?.descriptionRaw} className="text-body-reg text-blue font-medium" />
                <hr className="border-t border-t-blue my-5" />
                <ProductVariantSelector
                  variants={product?.variants}
                  selectedVariant={selectedVariant}
                  onVariantChange={onVariantChange}
                />

                {selectedVariant?.style?.length && (
                  <React.Fragment>
                    <hr className="border-t border-t-blue my-5" />
                    <StyleOptions
                      options={selectedVariant?.style}
                      onChange={setSelectedStyle}
                      selectedStyle={selectedStyle}
                    />
                  </React.Fragment>
                )}

                <hr className="border-t border-t-blue my-5" />
                <QuantityInput quantity={quantity} onAddToCart={onAddToCart} onQuantityChange={setQuantity} />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-blue" />

        <div className="container grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <H6 className="col-span-2 md:col-span-1">Related Products</H6>
          {data?.recommendations.slice(0, 3).map((product) => {
            const variant = product.variants?.[0];
            const image = variant?.images?.[0]?.images;
            if (!variant || !image) return null;

            return (
              <div key={product._id} className="w-full">
                <Product
                  // TODO: make the interface for Product more generic so it can take result from GQL also
                  item={{
                    _id: variant._id ?? "",
                    slug: variant?.slug?.current || "",
                    productSlug: product.slug?.current || "",
                    imageAlt: variant.images?.[0]?.name ?? "",
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  const { client, ssrCache } = initializeUrql();
  const { slug } = query;

  if (isSlug(slug)) {
    setCachingHeaders(res, [`${SanityType.Product}_${slug}`, SanityType.ProductImage, SanityType.Variant]);
  }

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(GetProductAndRecommendationsDocument, { slug }).toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient(() => ({ ...urqlOptions }), withUrqlOptions)(ProductPage);
