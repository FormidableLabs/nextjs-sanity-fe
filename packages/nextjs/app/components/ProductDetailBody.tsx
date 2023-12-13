import * as React from "react";

import { BlockContent, Price } from "../ui/shared-ui";

import { ImageCarousel } from "app/components/ImageCarousel";
import { StyleOptions } from "components/ProductPage/StyleOptions";
import { ProductVariantSelector } from "components/ProductPage/ProductVariantSelector";
import { ProductDetail, ProductDetailVariants } from "utils/groqTypes/ProductDetail";
import QuantityInput from "./QuantityInput";

export const ProductDetailBody = ({
  variant,
  product,
}: {
  product?: ProductDetail;
  variant?: ProductDetailVariants[number];
}) => {
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
          <ProductVariantSelector variants={product?.variants ?? []} selectedVariant={variant} />

          {variant?.style?.length && (
            <React.Fragment>
              <hr className="border-t border-t-primary my-5" />
              <StyleOptions variant={variant} />
            </React.Fragment>
          )}

          <hr className="border-t border-t-primary my-5" />
          <QuantityInput variant={variant} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailBody;
