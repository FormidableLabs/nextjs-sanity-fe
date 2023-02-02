import { ProductImages } from "utils/getProductBySlug";

export type ImageCarouselProps = {
  productImages: ProductImages;
};

export type RenderControlProps = {
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (index: number) => void;
  slideCount: number;
  currentSlide: number;
};
