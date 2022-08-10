import type { RenderControlProps } from "./types";

export const ImageCarouselDots = ({ goToSlide, slideCount, currentSlide }: RenderControlProps) => (
  <div className="flex gap-2 py-4">
    {Array.from(Array(slideCount).keys()).map((index) => {
      const opacity = index === currentSlide ? "" : "opacity-70";
      return (
        <button
          key={index}
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
