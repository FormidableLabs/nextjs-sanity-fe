import { TypeFromSelection } from "groqd";
import { categorySelection, getAllCategories } from "../getAllCategoriesQuery";
import { getAllProducts, productSelection } from "../getAllProductsQuery";

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

export type Slug = string;

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

type NullableArrayType<T, K extends keyof T> = Exclude<T[K], null>;

export type Flavour = NullableArrayType<Product["variants"][number], "flavour">[number];
export type Style = NullableArrayType<Product["variants"][number], "style">[number];

export type Image = Category["images"][number]["images"];
export type ProductContentBlock = Product["description"][number];
export type ProductImage = Product["images"][number] & { name?: string };

export type CategoryImage = {
  _id: string;
  _type: string;
  description: string;
  images: Image;
  name: string;
};

export type Category = TypeFromSelection<typeof categorySelection>;
export type Categories = Awaited<ReturnType<typeof getAllCategories>>;

export type Product = TypeFromSelection<typeof productSelection>;
export type Products = Awaited<ReturnType<typeof getAllProducts>>;

export type Variant = Product["variants"][number];

export type GetProductsAndCategoriesQuery = {
  categories: Category[];
  products: Product[];
};

export type GetCategoriesQuery = {
  categories: Category[];
};

export interface PageProps {
  data?: {
    products: GetProductsAndCategoriesQuery["products"];
    categories: GetProductsAndCategoriesQuery["categories"];
  };
}
