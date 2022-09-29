export interface PLPVariant {
  _id: string;
  name: string;
  msrp: number;
  price: number;
  images: Asset[];
  imageAlt: string;
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
