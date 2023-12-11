"use client";

import { NextPage } from "next";

import { WeDontSellBreadBanner } from "shared-ui";

import { CategoryList } from "components/CategoryList";
import { Breadcrumbs } from "components/Breadcrumbs";
import { Category } from "utils/groqTypes/ProductList";

interface PageProps {
  categories: Category[];
  categoryNames: string;
}

const CategoriesPage: NextPage<PageProps> = ({ categories }) => {
  return (
    <div>
      <WeDontSellBreadBanner />
      <div className="container py-9 text-primary flex flex-col gap-9">
        <h1 className="text-h1">Categories</h1>
        <div className="my-2">
          <Breadcrumbs />
        </div>
        <CategoryList items={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
