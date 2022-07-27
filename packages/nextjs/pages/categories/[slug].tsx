import groq from "groq";
import Link from "next/link";
import { Fragment } from "react";

import { Price } from "../../components/Price";
import { CategoryPageCategory, CategoryPageProduct, CategoryPageResult } from "../../utils/groqTypes";
import { imageBuilder, sanityClient } from "../../utils/sanityClient";

import type { NextPage } from "next";

interface Props {
  products: CategoryPageProduct[];
  category: CategoryPageCategory;
}

const CategoryPage: NextPage<Props> = ({ products, category }) => {
  return (
    <div className="h-full mb-4">
      <h1 className="text-2xl font-bold m-4">{category.name}</h1>
      <div className="flex px-4 h-full">
        <div className="min-w-[350px]">
          <h2>Filters</h2>
        </div>
        <div className="flex-1 flex flex-wrap">
          {products.map((product) => {
            const img = imageBuilder.image(product.images).width(300).quality(100).auto("format").url()?.toString();

            return (
              <Fragment key={product._id}>
                <div className="w-26 h-fit">
                  <Link href={`/products/${product.slug.current}`}>
                    <a>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="rounded shadow" src={img} alt={product.imageAlt} />
                    </a>
                  </Link>

                  <Link href={`/products/${product.slug.current}`}>
                    <a className="flex justify-between mt-4">
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <Price msrp={product.msrp} price={product.price} />
                    </a>
                  </Link>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

CategoryPage.getInitialProps = async ({ query }) => {
  const { slug } = query;

  const result: CategoryPageResult = await sanityClient.fetch(
    groq`{
      'products': *[_type == "product" && $slug in categories[]->slug.current] {
        ...,
        'imageAlt': images[0]->name,
        'images': images[0]->images,
        'msrp': variants[0]->msrp,
        'price': variants[0]->price,
        'variants': variants[]->{
          ...,
          'size': size->name
        }
      },
      'category': *[_type == "category" && slug.current == $slug][0] {
        name
      }
    }`,
    {
      slug,
    }
  );

  return result;
};
