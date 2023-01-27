import * as React from "react";
import classNames from "classnames";
import { Card, CardProps } from "components/Card";
import { ProductRecommendation } from "utils/getProductRecommendationsQuery";
import { Category } from "utils/getCategoriesQuery";

type Props = {
  items?: Category[] | ProductRecommendation[];
};

export const FeaturedList = ({ items }: Props) => {
  if (!items) return null;

  const N = Math.min(items.length, 3);
  let props: CardProps;

  return (
    <ul
      className={classNames("grid", "grid-cols-1", "gap-9", {
        "sm:grid-cols-[1fr_2px_1fr_2px_1fr]": N === 3,
        "sm:grid-cols-[1fr_2px_1fr]": N === 2,
      })}
    >
      {items.map((item, i) => {
        if (item._type === "product" && "variants" in item) {
          const data = item as ProductRecommendation;
          props = {
            to: {
              pathname: `/products/${data.slug?.current}`,
              query: {
                variant: data.variants?.[0]?.slug?.current,
              },
            },
            title: data.name ?? "",
            price: data.variants?.[0]?.price ?? 0,
            imageProps: {
              src: data.variants?.[0]?.images?.[0] ?? "",
              alt: data.variants?.[0]?.name ?? "",
              containerClassName: "aspect-square",
            },
          };
        } else if (item._type === "category") {
          if (item.images && "images" in item.images[0]) {
            const data = item as Category;
            props = {
              to: {
                pathname: `/products`,
                query: {
                  category: data.slug?.current,
                },
              },
              title: data.name ?? "",
              subTitle: (data.description as string) ?? "",
              imageProps: {
                src: data.images?.[0]?.images ?? "",
                alt: data.images?.[0]?.name ?? "",
                containerClassName: "aspect-[16/10]",
              },
            };
          }
        } else {
          // Unexpected type
          return null;
        }

        return (
          <React.Fragment key={item._id}>
            <li data-testid="featured-list-item">
              <Card {...props} />
            </li>
            {i % N < N - 1 && <li className="invisible sm:visible w-full border-r-2 border-r-primary"></li>}
          </React.Fragment>
        );
      })}
    </ul>
  );
};
