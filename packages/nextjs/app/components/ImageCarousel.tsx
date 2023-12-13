import { ProductImage } from "utils/groqTypes/ProductList";
import * as React from "react";
import { Image } from "components/Image";
import { ImageCarousel as BaseImageCarousel } from "../ui/shared-ui";

export type ImageCarouselProps = {
  productImages: ProductImage[];
  imagePriority?: boolean;
  sizes?: string;
};

export const ImageCarousel = ({ productImages, imagePriority, sizes }: ImageCarouselProps) => {
  return (
    <BaseImageCarousel>
      {productImages?.map((image) => (
        <Image
          className="rounded-2xl aspect-square w-full"
          fill
          priority={imagePriority}
          sizes={sizes}
          key={image?._key}
          src={image ?? ""}
          alt={image?.name ?? ""}
        />
      ))}
    </BaseImageCarousel>
  );
};
