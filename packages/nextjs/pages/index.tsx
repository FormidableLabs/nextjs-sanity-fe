import * as React from "react";
import { GetServerSideProps, NextPage } from "next";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import NextImage from "next/legacy/image";

import { setCachingHeaders } from "utils/setCachingHeaders";
import { localImageLoader } from "utils/localImageLoader";
import { SanityType } from "utils/consts";
import { Categories, getCategories } from "utils/getCategoriesQuery";
import { ProductRecommendations, getProductRecommendations } from "utils/getProductRecommendationsQuery";

import featuredImg from "assets/featured-story.jpg";
import { Button } from "components/Button";
import { FeaturedList } from "components/FeaturedList";
import { FeaturedQuote } from "components/FeaturedQuote";
import { Image } from "components/Image";
import { PageHead } from "components/PageHead";

interface PageProps {
  data?: {
    productRecommendations: ProductRecommendations;
    categories: Categories;
  };
}

const Home: NextPage<PageProps> = ({ data }) => {
  return (
    <>
      <PageHead
        title="Home"
        description="Formidable Boulangerie home page. A showcase of Next.js, Sanity CMS, and Fastly CDN."
      />
      <section className="container">
        <div className="flex justify-between items-center py-9">
          <div className="max-w-[600px]">
            <h1 className="text-primary text-h1">Formidable breads for your daily life.</h1>
            <Link href="/products" legacyBehavior>
              <Button as="a" variant="secondary" className="inline-flex items-center mt-6">
                <FiArrowRight size={24} className="mr-2" /> Show now
              </Button>
            </Link>
          </div>

          {data?.productRecommendations && data?.productRecommendations.length > 0 && (
            <span className="hidden sm:block">
              <Image
                width={600}
                height={600}
                className="rounded-2xl"
                src={data?.productRecommendations[0].images?.[0] ?? ""}
                alt={data?.productRecommendations[0].name ?? ""}
              />
            </span>
          )}
        </div>
      </section>

      <TitleBanner>Our bestsellers</TitleBanner>
      <section className="container py-9 flex flex-col gap-9">
        <FeaturedList items={data?.productRecommendations} />
        <Link href="/products" legacyBehavior>
          <Button as="a" variant="primary" className="w-full inline-block text-center">
            Show all breads
          </Button>
        </Link>
      </section>

      <FeaturedQuote />

      <TitleBanner>Top categories</TitleBanner>
      <section className="container py-9">
        <FeaturedList items={data?.categories.slice(0, 3)} />
      </section>

      <section className="py-9 bg-primary w-full">
        <div className="container flex flex-col sm:flex-row gap-9 items-center">
          <div className="w-full sm:max-w-[320px] md:max-w-[586px]">
            <NextImage
              src={featuredImg}
              loader={localImageLoader}
              layout="intrinsic"
              alt="featured image"
              className="rounded-full overflow-hidden aspect-square"
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
};

const TitleBanner = ({ children }: React.PropsWithChildren) => (
  <div className="border-y-2 border-y-primary py-6">
    <h4 className="text-h4 text-primary container">{children}</h4>
  </div>
);

export const getServerSideProps = (async ({ res }) => {
  setCachingHeaders(res, [SanityType.Category, SanityType.CategoryImage]);

  const categories = await getCategories();
  const productRecommendations = await getProductRecommendations();

  return {
    props: {
      data: {
        productRecommendations,
        categories,
      },
    },
  };
}) satisfies GetServerSideProps<PageProps>;

export default Home;
