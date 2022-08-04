import groq from "groq";
import Link from "next/link";
import { Fragment } from "react";

import { Image } from "../../components/Image";
import { Price } from "../../components/Price";
import { ProductFilters } from "../../components/ProductFilters";
import { ProductSort } from "../../components/ProductSort";
import { FilterGroup, FILTER_GROUPS } from "../../constants/filters";
import { SORT_QUERY_PARAM, SORT_OPTIONS } from "../../constants/sorting";
import { CategoryPageCategory, CategoryPageProduct, CategoryPageResult } from "../../utils/groqTypes";
import { sanityClient } from "../../utils/sanityClient";

import type { GetServerSideProps, NextPage } from "next";

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
          <ProductSort />
          <hr className="slate-700 my-4" />
          <ProductFilters />
        </div>
        <div className="flex-1 flex flex-wrap">
          {products.map((product) => {
            return (
              <Fragment key={product._id}>
                <div className="w-26 h-fit">
                  <Link href={`/products/${product.slug.current}`}>
                    <a>
                      <Image
                        width={300}
                        height={300}
                        className="rounded shadow"
                        src={product.images}
                        alt={product.imageAlt}
                      />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug, [SORT_QUERY_PARAM]: sortValue } = ctx.query;

  // Sort/ordering
  let ordering = "";
  if (sortValue) {
    // If sort is string[], use first item
    // (e.g. User modified url, wouldn't happen normally)
    const sortType = Array.isArray(sortValue) ? sortValue[0] : sortValue;
    const sortOption = SORT_OPTIONS[sortType];
    ordering = sortOption?.ordering ? `| order(${sortOption.ordering})` : "";
  }

  // Filters
  const filters = FILTER_GROUPS.reduce((acc: string[], { value: groupValue, options }: FilterGroup) => {
    const queryValue = ctx.query[groupValue];
    if (!queryValue) {
      // No filter query param
      return acc;
    }

    const queryValueIsString = typeof queryValue === "string" || queryValue instanceof String;
    if (queryValueIsString) {
      const filterOption = options.find(({ value }) => value === queryValue);
      // Check query value validity
      if (filterOption) {
        return [...acc, filterOption.filter];
      }
    } else {
      // Check query value validity
      const validOptions = options.filter(({ value: optionValue }) => queryValue.includes(optionValue));
      if (validOptions.length) {
        return [...acc, ...validOptions.map(({ filter }) => filter)];
      }
    }

    return acc;
  }, []);

  console.log("filters!!", filters);

  const result: CategoryPageResult = await sanityClient.fetch(
    groq`{
      'products': *[_type == "product" && $slug in categories[]->slug.current] {
        ...,
        'imageAlt': images[0]->name,
        'images': images[0]->images,
        'msrp': variants[0]->msrp,
        'price': variants | order(price asc)[0]->price,
        'variants': variants[]->{
          ...,
          'size': size->name
        }
      } ${ordering},
      'category': *[_type == "category" && slug.current == $slug][0] {
        name
      }
    }`,
    {
      slug,
    }
  );

  return { props: result };
};
