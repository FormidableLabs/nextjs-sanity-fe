import category from "./category";
import categoryImage from "./categoryImage";
import description from "./description";
import product from "./product";
import variant from "./variant";
import flavour from "./flavour";
import style from "./style";
import productImage from "./productImage";
import siteSettings from "./siteSettings";

// Then import schema types from any plugins that might expose them
// Then we give our schema to the builder and provide the result to Sanity
export default [
  /* Your types here! */
  category,
  categoryImage,
  description,
  flavour,
  product,
  productImage,
  siteSettings,
  style,
  variant,
];

// Export just the types of all docs:
export type DocumentTypes = {
  category: typeof category;
  categoryImage: typeof categoryImage;
  description: typeof description;
  flavour: typeof flavour;
  product: typeof product;
  productImage: typeof productImage;
  siteSettings: typeof siteSettings;
  style: typeof style;
  variant: typeof variant;
};
