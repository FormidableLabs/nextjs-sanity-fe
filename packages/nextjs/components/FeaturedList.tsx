import classNames from "classnames";
import { Card, CardProps } from "components/Card";
import { GetProductsAndCategoriesQuery } from "utils/generated/graphql";

type Props = {
  items?: GetProductsAndCategoriesQuery["allProduct"] | GetProductsAndCategoriesQuery["allCategory"];
};

export const FeaturedList = ({ items }: Props) => {
  if (!items) return null;

  return (
    <ul
      className={classNames("grid", "m-9", "grid-cols-1", "gap-4", "sm:gap-0", {
        "sm:grid-cols-3": items.length >= 3,
        "sm:grid-cols-2": items.length === 2,
      })}
    >
      {items.map((item) => {
        let props: CardProps;

        if (item.__typename === "Product") {
          props = {
            to: `/products/${item.slug?.current}`,
            title: item.name ?? "",
            price: item.variants?.[0]?.price ?? "",
            imageProps: {
              src: item.variants?.[0]?.images?.[0]?.images ?? "",
              alt: item.variants?.[0]?.images?.[0]?.name ?? "",
            },
          };
        } else if (item.__typename === "Category") {
          props = {
            to: `/products/${item.slug?.current}`,
            title: item.name ?? "",
            subTitle: item.description ?? "",
            imageProps: {
              src: item.images?.[0]?.images ?? "",
              alt: item.images?.[0]?.name ?? "",
              width: 600,
              height: 600,
            },
          };
        } else {
          // Unexpected type
          return null;
        }

        return (
          <li key={item._id} className="sm:border-r-2 border-r-blue last:border-r-0 flex justify-center">
            <Card {...props} />
          </li>
        );
      })}
    </ul>
  );
};
