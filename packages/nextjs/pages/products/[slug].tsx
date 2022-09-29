import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { BlockContent } from "../../components/BlockContent";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";
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
import { SlicingOptions } from "components/ProductPage/SlicingOptions";
import { ProductVariant, ProductVariantSelector } from "components/ProductPage/ProductVariantSelector";
import { H6 } from "components/Typography/H6";
import { Product } from "components/Product";
import { CategoryPageProduct, Images, Slug } from "utils/groqTypes";

const ProductPage: NextPage = () => {
  const { query } = useRouter();
  const [{ data }] = useGetProductAndRecommendationsQuery({
    variables: {
      slug: query.slug as string,
    },
  });
  const { updateCart, cartItems } = useCart();

  const product = data?.allProduct[0];
  const [selectedVariant, setSelectedVariant] = useState<Maybe<ProductVariant> | undefined>(() =>
    (product?.variants || []).find((v) => {
      console.log(v);

      return v?.slug?.current && v.slug.current === query.variant;
    })
  );
  const [selectedSlicing, setSelectedSlicing] = useState<string>("");
  const [quantity, setQuantity] = useState("1");

  console.log(selectedVariant);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product?.variants?.[0]);
    }
  }, [product]);

  const onVariantChange = (id?: string) => {
    const productVariant = product?.variants?.find((variant) => variant?.id === id);

    setSelectedVariant(productVariant);
  };

  const onAddToCart = () => {
    if (selectedVariant?.id) {
      // If the item is already in the cart allow user to click add to cart multiple times
      const existingCartItem = cartItems.find((item) => item.id === selectedVariant.id);

      updateCart(selectedVariant?.id, existingCartItem ? existingCartItem.qty + Number(quantity) : Number(quantity));
    }
  };

  return (
    <>
      <PageHead title={product?.name || "Product details"} description={`Product details page for ${product?.name}.`} />
      <div className="border-b-2 border-b-blue">
        <div className="container mb-8 sm:my-8">
          <div className="grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-none items-center">
            <div>{selectedVariant?.images && <ImageCarousel productImages={selectedVariant?.images} />}</div>
            <div className=" text-blue">
              <h4 className="text-h4 font-medium mb-2">{product?.name}</h4>

              <Price msrp={selectedVariant?.msrp} price={selectedVariant?.price} />

              <BlockContent
                value={selectedVariant?.descriptionRaw}
                className="text-body-reg text-blue font-medium my-8"
              />

              <hr className="border-t border-t-blue my-5" />
              <ProductVariantSelector
                variants={product?.variants}
                selectedVariant={selectedVariant}
                onVariantChange={onVariantChange}
              />

              <hr className="border-t border-t-blue my-5" />
              <SlicingOptions
                options={selectedVariant?.slicingOption}
                onChange={setSelectedSlicing}
                selectedSlicing={selectedSlicing}
              />

              <hr className="border-t border-t-blue my-5" />
              <QuantityInput quantity={quantity} onAddToCart={onAddToCart} onQuantityChange={setQuantity} />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 flex flex-col items-center sm:items-start sm:flex-row justify-between">
        <H6>Related Products</H6>
        <div className="flex flex-col items-center mt-4 sm:mt-0 sm:flex-row gap-5">
          {data?.recommendations.map((product) => (
            <div key={product._id} className="w-[350px]">
              <Product
                // TODO: make the interface for Product more generic so it can take result from GQL also
                item={
                  {
                    _id: product._id ?? "",
                    imageAlt: product.images?.[0]?.name ?? "",
                    images: product.images?.[0]?.images as Images,
                    msrp: product.variants?.[0]?.msrp ?? 0,
                    name: product.name ?? "",
                    price: product.variants?.[0]?.price ?? 0,
                    slug: product.slug as Slug,
                  } as CategoryPageProduct
                }
              />
            </div>
          ))}
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
