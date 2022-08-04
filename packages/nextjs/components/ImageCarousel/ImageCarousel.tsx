import type { FilteredProductImage, ImageCarouselProps } from "./types";

import Carousel from "nuka-carousel";
import { ImageCarouselDots } from "./ImageCarouselDots";
import { ImageCarouselNext } from "./ImageCarouselNext";
import { ImageCarouselPrev } from "./ImageCarouselPrev";
import { Image } from "../Image";

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ productImages }) => {
  // Ensures array elements are defined and have defined "images" property
  const filteredProductImages = productImages.filter((image) => image && image.images) as FilteredProductImage[];

  const innerNode = filteredProductImages.map(({ images, name }) => (
    <Image key={images?.asset?._id} width={400} height={400} src={images} alt={name ?? ""} />
  ));

  return (
    <div className="text-cyan-800">
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
