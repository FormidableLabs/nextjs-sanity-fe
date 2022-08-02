export type ImageCarouselProps = {
  images: any[];
};

export type RenderControlProps = {
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (index: number) => void;
  slideCount: number;
  currentSlide: number;
};
