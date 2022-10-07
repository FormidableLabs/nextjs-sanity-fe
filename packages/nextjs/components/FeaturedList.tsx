import * as React from "react";
import classNames from "classnames";
import { Card, CardProps } from "components/Card";
import { GetProductsAndCategoriesQuery } from "utils/generated/graphql";

type Props = {
  items?: GetProductsAndCategoriesQuery["allProduct"] | GetProductsAndCategoriesQuery["allCategory"];
};

export const FeaturedList = ({ items }: Props) => {
  if (!items) return null;

  const N = Math.min(items.length, 3);

  return (
    <ul
      className={classNames("grid", "grid-cols-1", "gap-9", {
        "sm:grid-cols-[1fr_2px_1fr_2px_1fr]": N === 3,
        "sm:grid-cols-[1fr_2px_1fr]": N === 2,
      })}
    >
      {items.map((item, i) => {
        let props: CardProps;

        if (item.__typename === "Product") {
          props = {
            to: {
              pathname: `/products/${item.slug?.current}`,
              query: {
                variant: item.variants?.[0]?.slug?.current,
              },
            },
            title: item.name ?? "",
            price: item.variants?.[0]?.price ?? 0,
            imageProps: {
              src: item.variants?.[0]?.images?.[0]?.images ?? "",
              alt: item.variants?.[0]?.images?.[0]?.name ?? "",
              containerClassName: "aspect-square",
            },
          };
        } else if (item.__typename === "Category") {
          props = {
            to: {
              pathname: `/products`,
              query: {
                category: item.slug?.current,
              },
            },
            title: item.name ?? "",
            subTitle: item.description ?? "",
            imageProps: {
              src: item.images?.[0]?.images ?? "",
              alt: item.images?.[0]?.name ?? "",
              containerClassName: "aspect-[16/10]",
            },
          };
        } else {
          // Unexpected type
          return null;
        }

        return (
          <React.Fragment key={item._id}>
            <li>
              <Card {...props} />
            </li>
            {i % N < N - 1 && <li className="invisible sm:visible w-full border-r-2 border-r-primary"></li>}
          </React.Fragment>
        );
      })}
    </ul>
  );
};
