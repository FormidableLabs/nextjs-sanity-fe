import { Card } from "components/Card";
import { GetCategoriesQuery, GetProductsAndCategoriesQuery } from "utils/generated/graphql";

type CategoryListProps = {
  items?: GetCategoriesQuery["allCategory"] | GetProductsAndCategoriesQuery["allCategory"];
};

export const CategoryList = ({ items }: CategoryListProps) => {
  if (!items) return null;

  return (
    <ul className="flex justify-evenly flex-wrap">
      {items.map((category) => (
        <li key={category._id}>
          <Card
            to={`/categories/${category.slug?.current}`}
            imageProps={{
              src: category.images?.[0]?.images ?? "",
              alt: category.images?.[0]?.name ?? "",
            }}
            title={category.name ?? ""}
          />
        </li>
      ))}
    </ul>
  );
};
