"use client";

import type { Categories, Products } from "utils/groqTypes/ProductList";
import * as React from "react";
import { NextPage } from "next";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import NextImage from "next/image";

import { Button, FeaturedQuote } from "../ui/shared-ui";
import { localImageLoader } from "utils/localImageLoader";

import featuredImg from "assets/featured-story.jpg";
import { FeaturedList } from "components/FeaturedList";
import { Image } from "components/Image";

interface PageProps {
  data?: {
    products: Products;
    categories: Categories;
  };
}

const Home: NextPage<PageProps> = ({ data }) => {
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
            <NextImage
              src={featuredImg}
              loader={localImageLoader}
              alt="featured image"
              className="rounded-full overflow-hidden aspect-square"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
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

export default Home;
