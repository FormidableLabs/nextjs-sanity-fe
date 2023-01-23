import { SanityImageCrop, SanityImageHotspot } from "@sanity/image-url/lib/types/types";
import { SanityImageAsset, CategoryImage, Variant } from "utils/generated/graphql";

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

export type ProductImage = {
  _key?: string;
  _type?: string;
  asset?: SanityImageAsset;
  crop?: SanityImageCrop;
  description?: string;
  hotspot?: SanityImageHotspot;
  name?: string;
};

export type Product = {
  _id?: string;
  _key?: string;
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

export type GetProductsAndCategoriesQuery = {
  categories: Category[];
  products: Product[];
};
