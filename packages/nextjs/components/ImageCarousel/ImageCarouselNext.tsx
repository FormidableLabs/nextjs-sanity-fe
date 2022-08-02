import type { RenderControlProps } from "./types";

export const ImageCarouselNext = ({ nextSlide, slideCount, currentSlide }: RenderControlProps) => (
  <button
    type="button"
    onClick={nextSlide}
    aria-label="Go to next slide"
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
