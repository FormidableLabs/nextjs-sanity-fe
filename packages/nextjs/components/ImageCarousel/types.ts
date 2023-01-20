import { GetProductAndRecommendationsQuery } from "utils/generated/graphql";

export type ProductVariantImage = NonNullable<
  NonNullable<GetProductAndRecommendationsQuery["allProduct"][0]["productVariants"]>[0]
>["images"];

export type ImageCarouselProps = {
  productImages: ProductVariantImage;
};

export type RenderControlProps = {
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (index: number) => void;
  slideCount: number;
  currentSlide: number;
};
