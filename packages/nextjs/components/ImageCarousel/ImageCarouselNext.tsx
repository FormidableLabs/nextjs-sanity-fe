import type { RenderControlProps } from "./types";

import { HiOutlineArrowCircleRight } from "react-icons/hi";

export const ImageCarouselNext = ({ nextSlide, slideCount, currentSlide }: RenderControlProps) => (
  <button
    type="button"
    onClick={nextSlide}
    aria-label="Go to next slide"
    disabled={currentSlide === slideCount - 1}
    className="p-4 disabled:opacity-70"
  >
    <HiOutlineArrowCircleRight className="w-6 h-auto" />
  </button>
);
