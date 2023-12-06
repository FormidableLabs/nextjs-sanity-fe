import { TypeFromSelection } from "groqd";
import { productBySlugSelection } from "utils/getProductBySlug";
import { NullableArrayType } from "./ProductList";

export type ProductDetail = TypeFromSelection<typeof productBySlugSelection>;
export type ProductDetailVariants = ProductDetail["variants"];
export type Style = NullableArrayType<ProductDetailVariants[number], "style">[number];
