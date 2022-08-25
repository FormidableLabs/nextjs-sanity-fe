import { Card } from "components/Card";
import { GetProductsAndCategoriesQuery } from "utils/generated/graphql";

type Props = {
  items?: GetProductsAndCategoriesQuery["allProduct"];
};

export const ProductList = ({ items }: Props) => {
  if (!items) return null;

  return (
    <ul className="flex justify-evenly flex-wrap">
      {items.map((product) => (
        <li key={product._id}>
          <Card
            to={`/products/${product.slug?.current}`}
            imageProps={{
              src: product.variants?.[0]?.images?.[0]?.images ?? "",
              alt: product.variants?.[0]?.images?.[0]?.name ?? "",
            }}
          >
            {product.name}
          </Card>
        </li>
      ))}
    </ul>
  );
};
