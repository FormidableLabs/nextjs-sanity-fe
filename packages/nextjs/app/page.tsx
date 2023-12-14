import { Metadata } from "next";
import { getAllCategories } from "utils/getAllCategoriesQuery";
import { getRecommendations } from "utils/getRecommendationsQuery";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

import { Button, FeaturedQuote } from "./ui/shared-ui";

import featuredImg from "assets/featured-story.jpg";
import { FeaturedList } from "app/components/FeaturedList";
import { Image } from "app/components/Image";
import LocalImage from "app/components/LocalImage";

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

  return (
    <>
      <section className="container">
        <div className="flex justify-between items-center py-9">
          <div className="max-w-[600px]">
            <h1 className="text-primary text-h1">Formidable breads for your daily life.</h1>
            <Button as={Link} href="/products" variant="secondary" className="inline-flex items-center mt-6">
              <FiArrowRight size={24} className="mr-2" /> Show now
            </Button>
          </div>

          <span className="hidden sm:block">
            <Image
              width={600}
              height={600}
              className="rounded-2xl aspect-square"
              src={data?.products[0].images?.[0] ?? ""}
              alt={data?.products[0].name ?? ""}
            />
          </span>
        </div>
      </section>

      <TitleBanner>Our bestsellers</TitleBanner>
      <section className="container py-9 flex flex-col gap-9">
        <FeaturedList items={data?.products} />
        <Button as={Link} href="/products" variant="primary" className="w-full inline-block text-center">
          Show all breads
        </Button>
      </section>

      <FeaturedQuote />

      <TitleBanner>Top categories</TitleBanner>
      <section className="container py-9">
        <FeaturedList items={data?.categories.slice(0, 3)} />
      </section>

      <section className="py-9 bg-primary w-full">
        <div className="container flex flex-col sm:flex-row gap-9 items-center">
          <div className="w-full sm:max-w-[320px] md:max-w-[586px]">
            <LocalImage
              src={featuredImg}
              alt="featured image"
              className="rounded-full overflow-hidden aspect-square max-w-full h-auto"
            />
          </div>
          <div className="flex-1 text-secondary">
            <h6 className="text-h6 font-jeanLuc font-bold">Stories</h6>
            <h2 className="text-h2">Formidable Baker: Felicity Tai</h2>
            <Button as="a" variant="tertiary" className="inline-flex items-center mt-6">
              <FiArrowRight size={24} className="mr-2" /> Show now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

const TitleBanner = ({ children }: React.PropsWithChildren) => (
  <div className="border-y-2 border-y-primary py-6">
    <h4 className="text-h4 text-primary container">{children}</h4>
  </div>
);
