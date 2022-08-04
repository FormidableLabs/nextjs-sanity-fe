import { Card } from "components/Card";
import { GetCategoriesQuery } from "utils/generated/graphql";

type CategoryListProps = {
  items?: GetCategoriesQuery["allCategory"]
};

export const CategoryList = ({ items }: CategoryListProps) => {
    if (!items) return null;

    return (
      <ul className="flex justify-evenly">
        {items.map((category) => (
          <li key={category._id}>
            <Card
              to={`/categories/${category.slug?.current}`}
              imageProps={{
                src: category.images?.[0]?.images ?? "",
                alt: category.images?.[0]?.name ?? "",
              }}
            >
              {category.name}
            </Card>
          </li>
        ))}
      </ul>
    )
}