export interface PLPVariant {
  id: string;
  slug: string;
  name: string;
  msrp: number;
  price: number;
  images: Asset[];
  imageAlt: string;
  productSlug: string;
}

export interface PLPVariantList {
  productVariants: PLPVariant[];
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
