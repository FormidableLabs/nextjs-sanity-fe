import { SanityAsset, SanityImageCrop, SanityImageHotspot } from "@sanity/image-url/lib/types/types";

export interface PLPVariant {
  _id: string;
  slug: string;
  name: string;
  msrp: number;
  price: number;
  images: Asset[];
  imageAlt: string;
  productSlug: string;
}

export interface PLPVariantList {
  variants: PLPVariant[];
  itemCount: number;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Slug {
  _type: string;
  current: string;
}

export interface FlavourFilterItem {
  name: string;
  slug: string;
}

export interface StyleFilterItem {
  name: string;
  slug: string;
}

export interface CategoryFilterItem {
  name: string;
  slug: string;
}

export type Flavour = {
  _id?: string;
  _type?: string;
  name?: string;
  slug?: Slug;
};

export type Style = {
  _id?: string;
  _type?: string;
  name?: string;
  slug?: Slug;
};

export type Image = {
  _type?: string;
  asset?: SanityAsset;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
};

export type ProductImage = {
  _type?: string;
  asset?: SanityAsset;
  crop?: SanityImageCrop;
  description?: string;
  hotspot?: SanityImageHotspot;
  name?: string;
};

export type CategoryImage = Document & {
  _id?: string;
  _type?: string;
  description?: string;
  images?: Image;
  name?: string;
};

export type Product = {
  _id?: string;
  _type?: string;
  categories?: Category[];
  descriptionRaw?: JSON;
  images?: ProductImage[];
  name?: string;
  slug?: Slug;
  variants?: Variant[];
};

export type Category = {
  _id?: string;
  _type?: string;
  name?: string;
  description?: string;
  slug?: Slug;
  images?: CategoryImage[];
};

export type Variant = {
  _id?: string;
  _type?: string;
  descriptionRaw?: JSON;
  flavour?: Flavour[];
  images?: ProductImage[];
  msrp?: number;
  name?: string;
  price?: number;
  slug?: Slug;
  style?: Style[];
};

export type GetProductsAndCategoriesQuery = {
  categories: Category[];
  products: Product[];
};

export interface PageProps {
  data?: {
    products: GetProductsAndCategoriesQuery["products"];
    categories: GetProductsAndCategoriesQuery["categories"];
  };
}
