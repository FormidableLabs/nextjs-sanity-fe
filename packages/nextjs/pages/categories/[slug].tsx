import type { GetServerSideProps, NextPage } from "next";

import groq from "groq";
import { Pagination } from "components/Pagination";
import { Product } from "components/Product";
import { ProductFilters } from "components/ProductFilters";
import { ProductSort } from "components/ProductSort";
import { FilterGroup, STATIC_FILTER_GROUPS } from "constants/filters";
import { SORT_QUERY_PARAM, SORT_OPTIONS } from "constants/sorting";
import { getPaginationOffsets } from "utils/getPaginationOffsets";
import {
  CategoryPageCategory,
  CategoryPageProduct,
  CategoryPageResult,
  CategoryPageProductResult,
} from "utils/groqTypes";
import { generateDynamicFilterGroups } from "utils/generateDynamicFilterGroups";
import { isSlug } from "utils/isSlug";
import { sanityClient } from "utils/sanityClient";
import { setCachingHeaders } from "utils/setCachingHeaders";

interface Props {
  products: CategoryPageProduct[];
  category: CategoryPageCategory;
  filterGroups: FilterGroup[];
  productsCount: number;
  pageSize: number;
  pageCount: number;
  currentPage?: number;
}

const CategoryPage: NextPage<Props> = ({ category, filterGroups, products, pageCount, currentPage }) => {
  return (
    <div className="h-full mb-4">
      <h1 className="text-2xl font-bold m-4">{category.name}</h1>
      <div className="flex px-4 h-full">
        <div className="min-w-[200px]">
          <ProductSort />
          <hr className="slate-700 my-4" />
          <ProductFilters filterGroups={filterGroups} />
        </div>
        <div className="flex flex-auto flex-col">
          <div className="flex-1 flex flex-wrap">
            {products.length ? (
              products.map((product) => <Product key={product._id} item={product} />)
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="text-center text-gray-500">No products found</div>
              </div>
            )}
          </div>
          <div className="py-10">
            <Pagination pageCount={pageCount} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug, [SORT_QUERY_PARAM]: sortValue } = ctx.query;
  const { res } = ctx;

  if (isSlug(slug)) {
    setCachingHeaders(res, [slug]);
  }

  // Pagination
  const queryPage = Math.abs((ctx.query.page as unknown as number) ?? 0);
  // Products per page.
  const pageSize = Math.abs(process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE);

  const offsets = getPaginationOffsets(queryPage);

  const queryOptions = {
    slug,
    ...offsets,
  };

  // Sort/ordering
  let ordering = "| order(_createdAt)";
  if (sortValue) {
    // If sort is string[], use first item
    // (e.g. User modified url, wouldn't happen normally)
    const sortType = Array.isArray(sortValue) ? sortValue[0] : sortValue;
    const sortOption = SORT_OPTIONS[sortType];
    if (sortOption?.ordering) {
      ordering = `| order(${sortOption.ordering})`;
    }
  }

  // Get category page data
  const categoryPageResult: CategoryPageResult = await sanityClient.fetch(
    groq`{
      'category': *[_type == "category" && slug.current == $slug][0] {
        name,
        description,
        slug,
        variantFilters,
      },
    }`,
    queryOptions
  );
  const { category } = categoryPageResult;

  // Generate dynamic filter groups
  const dynamicFilterGroups = await generateDynamicFilterGroups(category);
  // Append dynamic and static filter groups
  const filterGroups = [...dynamicFilterGroups, ...STATIC_FILTER_GROUPS];

  // Filters
  const activeFilterGroups = filterGroups.reduce((acc: string[][], { value: groupValue, options }) => {
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
        return [...acc, [filterOption.filter]];
      }
    } else {
      // Check query value validity
      const validOptions = options.filter(({ value: optionValue }) => queryValue.includes(optionValue));
      if (validOptions.length) {
        return [...acc, validOptions.map(({ filter }) => filter)];
      }
    }

    return acc;
  }, []);

  /**
   * Creates OR statements for filters of each group
   * e.g. if MD and XL filters are active, filter would check for (MD || XL)
   *  */
  const constructedGroups = activeFilterGroups.reduce((acc: string[], currGroup: string[]) => {
    if (currGroup.length) {
      const joinedStr = currGroup.map((filter) => `(${filter})`).join(" || ");
      const constructedGroup = currGroup.length > 1 ? `(${joinedStr})` : joinedStr;
      return [...acc, constructedGroup];
    }
    return acc;
  }, []);

  /**
   * Creates AND statement of filter groups
   * e.g. given (MD || XL) and (on sale), constructed filter would check for ((MD || XL) && (on sale))
   *  */
  const constructedFilters = constructedGroups.length ? `&& (${constructedGroups.join(" && ")})` : "";

  const productResult: CategoryPageProductResult = await sanityClient.fetch(
    groq`{
      'products': *[_type == "product" && $slug in categories[]->slug.current ${constructedFilters}] {
        ...,
        'imageAlt': images[0]->name,
        'images': images[0]->images,
        'msrp': variants | order(price asc)[0]->msrp,
        'price': variants | order(price asc)[0]->price,
        'variants': variants[]->{
          ...,
          'size': size->name
        }
      } ${ordering} [$offsetPage...$limit],
      'productsCount': count(*[_type == "product" && $slug in categories[]->slug.current ${constructedFilters}]),
    }`,
    queryOptions
  );

  const { products, productsCount } = productResult;
  const pageCount = Math.ceil(productsCount / pageSize);
  const currentPage = queryPage > 0 ? queryPage : 1;

  /**
   * Handles redirect for pagination and filter conflicts
   *
   * Scenario: If user is on the third page and then enables
   * a filter that only returns two pages worth of products,
   * redirect them to the last page/pageCount
   */
  if (pageCount > 0 && currentPage > pageCount) {
    const destination = ctx.resolvedUrl.replace(`page=${currentPage}`, `page=${pageCount}`);
    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
  }

  return {
    props: {
      category,
      filterGroups,
      products,
      productsCount,
      pageCount,
      pageSize,
      currentPage,
    },
  };
};
