export type ProductImage = {
  __typename?: "ProductImage" | undefined;
  name?: string | null | undefined;
  images?:
    | {
        __typename?: "Image" | undefined;
        asset?:
          | {
              __typename?: "SanityImageAsset" | undefined;
              _id?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

// ProductImage with defined "images" property
export type FilteredProductImage = Omit<ProductImage, "images"> & {
  images: NonNullable<ProductImage["images"]>;
};

export type ImageCarouselProps = {
  productImages: (ProductImage | null)[];
};

export type RenderControlProps = {
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (index: number) => void;
  slideCount: number;
  currentSlide: number;
};
