import CategoriesPage from "app/migration/categories";
import { getAllCategories } from "utils/getAllCategoriesQuery";
import { isString, pluralize } from "utils/pluralize";

const getData = async () => {
  const categories = await getAllCategories();
  const categoryNames = pluralize((categories || []).map((cat) => cat.name).filter(isString));

  return {
    categories,
    categoryNames,
  };
};

export default async function Page() {
  const data = await getData();

  return <CategoriesPage {...data} />;
}