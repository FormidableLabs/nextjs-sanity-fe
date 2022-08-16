export interface CategoryPageResult {
  category: CategoryPageCategory;
}

export interface CategoryPageAllProductVariantsResult {
  products: { variants: string[] }[];
}

export interface CategoryPageProductResult {
  products: CategoryPageProduct[];
  productsCount: number;
}

export interface AllProductsPageResult {
  products: CategoryPageProduct[];
  productsCount: number;
}

export interface CategoryPageCategory {
  description: string;
  name: string;
  slug: Slug;
  variantFilters: VariantFilter[];
}

export interface CategoryPageProduct {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  categories: Reference[];
  description: string;
  imageAlt: string;
  images: Images;
  msrp: number;
  name: string;
  price: number;
  slug: Slug;
  variants: Variant[];
}

export interface Reference {
  _key: string;
  _ref: string;
  _type: string;
}

export interface Images {
  _type: string;
  asset: Asset;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Slug {
  _type: string;
  current: string;
}

export interface Variant {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  description: string;
  id: string;
  images: Reference[];
  msrp: number;
  name: string;
  price: number;
  size: string;
}

export interface VariantFilter {
  _key: string;
  _type: string;
  label: string;
  type: string;
  value: string;
  variantsMap: string;
}
