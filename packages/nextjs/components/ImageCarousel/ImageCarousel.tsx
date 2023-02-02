import type { ImageCarouselProps } from "./types";
import * as React from "react";
import Carousel from "nuka-carousel";
import { Image } from "components/Image";
import { ImageCarouselDots } from "./ImageCarouselDots";
import { ImageCarouselNext } from "./ImageCarouselNext";
import { ImageCarouselPrev } from "./ImageCarouselPrev";

export const ImageCarousel = ({ productImages }: ImageCarouselProps) => {
  const innerNode = productImages?.map((image) => {
    return (
      <Image
        className="rounded-2xl aspect-square w-full"
        layout="fill"
        key={image?._key}
        src={image ?? ""}
        alt={image?.name ?? ""}
      />
    );
  });

  return (
    <div className="text-primary relative w-full aspect-square">
      {productImages?.length && productImages?.length > 1 ? (
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
