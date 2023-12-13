import type { GetCategoriesQuery, GetProductsAndCategoriesQuery } from "utils/groqTypes/ProductList";
import { Card } from "app/components/Card";

type CategoryListProps = {
  items?: GetCategoriesQuery["categories"] | GetProductsAndCategoriesQuery["categories"];
};

export const CategoryList = ({ items }: CategoryListProps) => {
  if (!items) return <div>No categories to show 🤷‍♂️</div>;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9">
      {items.map((category, index) => (
        <li key={category._id}>
          <Card
            to={{
              pathname: "/products",
              query: {
                category: category.slug,
              },
            }}
            imageProps={{
              priority: index === 0,
              src: category.images?.[0]?.images ?? "",
              alt: category.images?.[0]?.name ?? "",
              sizes: "(max-width: 768px) 100vw, 50vw",
              containerClassName: "aspect-[16/10]",
            }}
            title={category.name ?? ""}
            subTitle={category.description ?? ""}
          />
        </li>
      ))}
    </ul>
  );
};
