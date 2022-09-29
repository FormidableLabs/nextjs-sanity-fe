import { Card } from "components/Card";
import { GetCategoriesQuery, GetProductsAndCategoriesQuery } from "utils/generated/graphql";

type CategoryListProps = {
  items?: GetCategoriesQuery["allCategory"] | GetProductsAndCategoriesQuery["allCategory"];
};

export const CategoryList = ({ items }: CategoryListProps) => {
  if (!items) return <div>No categories to show 🤷‍♂️</div>;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9">
      {items.map((category) => (
        <li key={category._id}>
          <Card
            to={{
              pathname: "/products",
              query: {
                category: category.slug?.current,
              },
            }}
            imageProps={{
              src: category.images?.[0]?.images ?? "",
              alt: category.images?.[0]?.name ?? "",
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
