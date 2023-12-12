import { Breadcrumbs } from "components/Breadcrumbs";
import { CategoryList } from "components/CategoryList";
import { Metadata } from "next";
import { WeDontSellBreadBanner } from "../ui/shared-ui";
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

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();

  return {
    title: "Categories",
    description: `Product categories, including ${data.categoryNames}.`,
  };
}

export default async function Page() {
  const data = await getData();

  return (
    <div>
      <WeDontSellBreadBanner />
      <div className="container py-9 text-primary flex flex-col gap-9">
        <h1 className="text-h1">Categories</h1>
        <div className="my-2">
          <Breadcrumbs />
        </div>
        <CategoryList items={data.categories} />
      </div>
    </div>
  );
}
