import { ProductImage } from "utils/groqTypes/ProductList";
import * as React from "react";
import { Image } from "components/Image";
import { ImageCarousel as BaseImageCarousel } from "shared-ui";

export type ImageCarouselProps = {
  productImages: ProductImage[];
};

export const ImageCarousel = ({ productImages }: ImageCarouselProps) => {
  return (
    <BaseImageCarousel>
      {productImages?.map((image) => (
        <Image
          className="rounded-2xl aspect-square w-full"
          layout="fill"
          key={image?.name}
          src={image ?? ""}
          alt={image?.name ?? ""}
        />
      ))}
    </BaseImageCarousel>
  );
};
