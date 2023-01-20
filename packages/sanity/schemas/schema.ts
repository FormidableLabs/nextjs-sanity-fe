import schemaTypes from "all:part:@sanity/base/schema-type";
import createSchema from "part:@sanity/base/schema-creator";

import category from "./category";
import categoryImage from "./categoryImage";
import description from "./description";
import product from "./product";
import variant from "./variant";
import flavour from "./flavour";
import style from "./style";
import productImage from "./productImage";

// Then import schema types from any plugins that might expose them
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    categoryImage,
    category,
    product,
    productImage,
    variant,
    description,
    flavour,
    style,
  ]),
});
