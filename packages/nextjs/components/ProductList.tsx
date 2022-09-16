import { Card } from "components/Card";
import { GetProductsAndCategoriesQuery } from "utils/generated/graphql";

type Props = {
  items?: GetProductsAndCategoriesQuery["allProduct"];
};

export const ProductList = ({ items }: Props) => {
  if (!items) return null;

  return (
    <ul className="grid grid-cols-3 m-9">
      {items.map((product, i) => (
        <li key={product._id} className="border-r-2 border-r-blue last:border-r-0 flex justify-center">
          <Card
            key={product._id}
            to={`/products/${product.slug?.current}`}
            title={product.name ?? ""}
            price={product.variants?.[0]?.price ?? ""}
            className="w-[430px]"
            imageProps={{
              src: product.variants?.[0]?.images?.[0]?.images ?? "",
              alt: product.variants?.[0]?.images?.[0]?.name ?? "",
            }}
          />
        </li>
      ))}
    </ul>
  );
};
