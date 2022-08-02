import Carousel from "nuka-carousel";

import { Image } from "./Image";

type ProductImagesProps = {
  images: any[];
};

type RenderControlProps = {
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (index: number) => void;
  slideCount: number;
  currentSlide: number;
};

export const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const innerNode = images.map((image) => (
    <Image key={image.images.asset._id} width={400} height={400} src={image?.images ?? ""} alt={image?.name ?? ""} />
  ));

  // Returns single image
  if (images.length === 1) {
    return <div>{innerNode}</div>;
  }

  const renderPrev = ({ previousSlide, currentSlide }: RenderControlProps) => (
    <button
      type="button"
      onClick={previousSlide}
      aria-label="Previous slide"
      disabled={currentSlide === 0}
      className="p-4 disabled:opacity-70"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
        />
      </svg>
    </button>
  );

  const renderNext = ({ nextSlide, slideCount, currentSlide }: RenderControlProps) => (
    <button
      type="button"
      onClick={nextSlide}
      aria-label="Next slide"
      disabled={currentSlide === slideCount - 1}
      className="p-4 disabled:opacity-70"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );

  const renderDots = ({ goToSlide, currentSlide }: RenderControlProps) => (
    <div className="flex gap-2 py-4">
      {images.map(({ image }, index) => {
        const opacity = index === currentSlide ? "" : "opacity-70";
        return (
          <button
            key={image?.images?.asset?._id}
            type="button"
            onClick={() => {
              goToSlide(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
            className={`block w-2 h-2 rounded-full bg-current ${opacity} hover:opacity-100`}
          />
        );
      })}
    </div>
  );

  return (
    <div className="text-cyan-800">
      <Carousel
        animation="fade"
        dragging={false}
        renderBottomCenterControls={renderDots}
        renderCenterLeftControls={renderPrev}
        renderCenterRightControls={renderNext}
      >
        {innerNode}
      </Carousel>
    </div>
  );
};
