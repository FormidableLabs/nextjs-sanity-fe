import type { ImageCarouselProps } from "./types";
import Carousel from "nuka-carousel";
import { ImageCarouselDots } from "./ImageCarouselDots";
import { ImageCarouselNext } from "./ImageCarouselNext";
import { ImageCarouselPrev } from "./ImageCarouselPrev";
import { Image } from "../Image";

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const innerNode = images.map((image) => (
    <Image key={image.images.asset._id} width={400} height={400} src={image?.images ?? ""} alt={image?.name ?? ""} />
  ));

  return (
    <div className="text-cyan-800">
      {images.length > 1 ? (
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
