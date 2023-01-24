import { ProductImage } from "utils/groqTypes/ProductList";

export type ImageCarouselProps = {
  productImages: ProductImage[];
};

export type RenderControlProps = {
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (index: number) => void;
  slideCount: number;
  currentSlide: number;
};
