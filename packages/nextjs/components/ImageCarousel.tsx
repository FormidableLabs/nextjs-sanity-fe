import { ProductImage } from "utils/groqTypes/ProductList";
import * as React from "react";
import { Image } from "components/Image";
import { ImageCarousel as BaseImageCarousel } from "shared-ui";

export type ImageCarouselProps = {
  productImages: ProductImage[];
  imagePriority?: boolean;
};

export const ImageCarousel = ({ productImages, imagePriority }: ImageCarouselProps) => {
  return (
    <BaseImageCarousel>
      {productImages?.map((image) => (
        <Image
          className="rounded-2xl aspect-square w-full"
          fill
          priority={imagePriority}
          key={image?._key}
          src={image ?? ""}
          alt={image?.name ?? ""}
        />
      ))}
    </BaseImageCarousel>
  );
};
