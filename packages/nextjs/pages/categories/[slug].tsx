import type { GetServerSideProps, NextPage } from "next";

import groq from "groq";
import { Pagination } from "components/Pagination";
import { Product } from "components/Product";
import { ProductFilters } from "components/ProductFilters";
import { ProductSort } from "components/ProductSort";
import { FilterGroup } from "constants/filters";
import { getCategoryFilterGroups } from "utils/getCategoryFilterGroups";
import { getFiltersFromQuery } from "utils/getFiltersFromQuery";
import { getOrderingFromQuery } from "utils/getOrderingFromQuery";
import { getPaginationFromQuery } from "utils/getPaginationFromQuery";
import {
  CategoryPageCategory,
  CategoryPageProduct,
  CategoryPageResult,
  CategoryPageProductResult,
} from "utils/groqTypes";
import { isSlug } from "utils/isSlug";
import { sanityClient } from "utils/sanityClient";
import { setCachingHeaders } from "utils/setCachingHeaders";

import { GetFilteredCategoryProducts, getFilteredPaginatedQuery } from "utils/getFilteredPaginatedQuery";

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
        <div className="min-w-[350px]">
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

export const getServerSideProps: GetServerSideProps = async ({ query, ...ctx }) => {
  const { slug } = query;
  const { res } = ctx;

  if (isSlug(slug)) {
    setCachingHeaders(res, [slug]);
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
    { slug }
  );
  const { category } = categoryPageResult;

  // Sort/ordering.
  const order = getOrderingFromQuery(query);
  // Filters.
  const filterGroups = await getCategoryFilterGroups(category);
  const filters = await getFiltersFromQuery(query, filterGroups);
  // Pagination data.
  const pagination = getPaginationFromQuery(query);

  const result = await getFilteredPaginatedQuery<CategoryPageProductResult>(
    GetFilteredCategoryProducts(filters, order),
    {
      slug,
      ...pagination,
    }
  );

  const { products, productsCount } = result;
  const { currentPage, pageSize } = pagination;
  const pageCount = Math.ceil(productsCount / pageSize);

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
