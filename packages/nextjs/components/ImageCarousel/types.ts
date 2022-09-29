import { GetProductAndRecommendationsQuery, GetProductsAndCategoriesQuery } from "../../utils/generated/graphql";

export type ProductVariantImage = NonNullable<
  NonNullable<GetProductAndRecommendationsQuery["allProduct"][0]["variants"]>[0]
>["images"];

// ProductImage with defined "images" property
export type FilteredProductImage = Omit<GetProductAndRecommendationsQuery["allProduct"][0], "images"> & {
  images:
    | NonNullable<NonNullable<NonNullable<ProductVariantImage>[0]>["images"]>
    | NonNullable<NonNullable<NonNullable<GetProductsAndCategoriesQuery["allProductImage"]>[0]>["images"]>;
};
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
