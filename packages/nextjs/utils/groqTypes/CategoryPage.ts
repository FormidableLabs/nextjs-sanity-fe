import { Product } from "./Product";

export interface CategoryPageResult {
  category: CategoryPageCategory;
  products: Product[];
  productsCount: number;
}

export interface CategoryPageCategory {
  name: string;
}
