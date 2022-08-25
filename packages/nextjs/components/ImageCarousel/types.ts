import { GetProductQuery, GetProductsAndCategoriesQuery } from "../../utils/generated/graphql";

export type ProductImage = GetProductQuery["allProduct"][0]["images"];

// ProductImage with defined "images" property
export type FilteredProductImage = Omit<GetProductQuery["allProduct"][0], "images"> & {
  images:
    | NonNullable<NonNullable<NonNullable<ProductImage>[0]>["images"]>
    | NonNullable<NonNullable<NonNullable<GetProductsAndCategoriesQuery["allProductImage"]>[0]>["images"]>;
};
export type ImageCarouselProps = {
  productImages: ProductImage;
};

export type RenderControlProps = {
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (index: number) => void;
  slideCount: number;
  currentSlide: number;
};
