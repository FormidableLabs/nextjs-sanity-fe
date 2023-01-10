import type { FilteredProductImage, ImageCarouselProps } from "./types";
import * as React from "react";
import Carousel from "nuka-carousel";
import { Image } from "components/Image";
import { ImageCarouselDots } from "./ImageCarouselDots";
import { ImageCarouselNext } from "./ImageCarouselNext";
import { ImageCarouselPrev } from "./ImageCarouselPrev";

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ productImages }) => {
  // Ensures array elements are defined and have defined "images" property
  const filteredProductImages =
    (productImages?.filter((image) => image && image.images) as FilteredProductImage[]) || [];

  const innerNode = filteredProductImages.map(({ images, name }) => (
    <Image
      className="rounded-2xl aspect-square w-full"
      layout="fill"
      key={images?.asset?._id}
      src={images}
      alt={name ?? ""}
    />
  ));

  return (
    <div className="text-primary relative w-full aspect-square">
      {filteredProductImages?.length > 1 ? (
        <Carousel
          animation="fade"
          dragging={false}
          renderBottomCenterControls={ImageCarouselDots}
          renderCenterLeftControls={ImageCarouselPrev}
          renderCenterRightControls={ImageCarouselNext}
        >
          {innerNode}
        </Carousel>
      ) : (
        innerNode
      )}
    </div>
  );
};
