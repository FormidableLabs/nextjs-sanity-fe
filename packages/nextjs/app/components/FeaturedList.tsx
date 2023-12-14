import type { Categories, Products } from "utils/groqTypes/ProductList";
import * as React from "react";
import classNames from "classnames";
import { Card, CardProps } from "app/components/Card";

type Props = {
  items?: Products | Categories;
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
          props = {
            to: {
              pathname: `/products/${item.slug}`,
              query: {
                variant: item.variants?.[0]?.slug,
              },
            },
            title: item.name ?? "",
            price: item.variants?.[0]?.price ?? 0,
            imageProps: {
              src: item.variants?.[0]?.images?.[0] ?? "",
              alt: item.variants?.[0]?.name ?? "",
              containerClassName: "aspect-square",
              sizes: "(max-width: 768px) 100vw, 33vw",
            },
          };
        } else if (item._type === "category") {
          if (item.images && "images" in item.images[0]) {
            props = {
              to: {
                pathname: `/products`,
                query: {
                  category: item.slug,
                },
              },
              title: item.name ?? "",
              subTitle: (item.description as string) ?? "",
              imageProps: {
                src: item.images?.[0]?.images ?? "",
                alt: item.images?.[0]?.name ?? "",
                containerClassName: "aspect-[16/10]",
                sizes: "(max-width: 768px) 100vw, 33vw",
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
