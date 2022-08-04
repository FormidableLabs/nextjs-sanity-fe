import type { RenderControlProps } from "./types";

import { HiOutlineArrowCircleLeft } from "react-icons/hi";

export const ImageCarouselPrev = ({ previousSlide, currentSlide }: RenderControlProps) => (
  <button
    type="button"
    onClick={previousSlide}
    aria-label="Go to previous slide"
    disabled={currentSlide === 0}
    className="p-4 disabled:opacity-70"
  >
    <HiOutlineArrowCircleLeft className="w-6 h-auto" />
  </button>
);
