import { Metadata } from "next";
import HomePage from "./migration/home-page";
import { getAllCategories } from "utils/getAllCategoriesQuery";
import { getRecommendations } from "utils/getRecommendationsQuery";

export const metadata: Metadata = {
  title: "Home – Formidable Boulangerie",
  description: "Formidable Boulangerie home page. A showcase of Next.js, Sanity CMS, and Fastly CDN.",
  openGraph: {
    title: "Home – Formidable Boulangerie",
    description: "Formidable Boulangerie home page. A showcase of Next.js, Sanity CMS, and Fastly CDN.",
  },
};

async function getData() {
  const categories = await getAllCategories();
  const products = await getRecommendations();

  return {
    products,
    categories,
  };
}

export default async function Page() {
  const data = await getData();
  return <HomePage data={data} />;
}
