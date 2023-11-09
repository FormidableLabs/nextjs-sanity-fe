import React from "react";
import Carousel from "nuka-carousel";
import { ImageCarouselDots } from "./ImageCarouselDots";
import { ImageCarouselNext } from "./ImageCarouselNext";
import { ImageCarouselPrev } from "./ImageCarouselPrev";

export const ImageCarousel = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="text-primary relative w-full aspect-square">
      {React.Children.count(children) > 1 ? (
        <Carousel
          animation="fade"
          dragging={false}
          renderBottomCenterControls={ImageCarouselDots}
          renderCenterLeftControls={ImageCarouselPrev}
          renderCenterRightControls={ImageCarouselNext}
        >
          {children}
        </Carousel>
      ) : (
        children
      )}
    </div>
  );
};
