import type { GetServerSideProps, NextPage } from "next";
import { getPaginationFromQuery } from "utils/getPaginationFromQuery";
import { CategoryPageCategory, CategoryPageProduct, CategoryPageResult } from "utils/groqTypes";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { isSlug } from "utils/isSlug";
import { getOrderingFromQuery } from "utils/getOrderingFromQuery";
import { getFiltersFromQuery } from "utils/getFiltersFromQuery";
import { GetFilteredCategoryProducts, getFilteredPaginatedQuery } from "utils/getFilteredPaginatedQuery";
import { getSizeFilters } from "utils/getSizeFilters";
import { SanityType } from "utils/consts";
import { PLPLayout } from "../../components/PLPLayout";
import { PageHead } from "../../components/PageHead";
import { pluralize } from "../../utils/pluralize";

interface Props {
  products: CategoryPageProduct[];
  category: CategoryPageCategory;
  productsCount: number;
  pageSize: number;
  pageCount: number;
  currentPage?: number;
  sizeFilters: string[];
}

const CategoryPage: NextPage<Props> = ({ category, products, sizeFilters, pageCount, currentPage }) => {
  const productNames = pluralize(products.map((prod) => prod.name));

  return (
    <>
      <PageHead
        title={category.name}
        description={`Products for category ${category.name}, including ${productNames}.`}
      />
      <PLPLayout
        title={category.name}
        pageCount={pageCount}
        currentPage={currentPage}
        products={products}
        sizeFilters={sizeFilters}
        disablePagination
      />
    </>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async ({ query, ...ctx }) => {
  const { slug } = query;
  const { res } = ctx;

  if (isSlug(slug)) {
    setCachingHeaders(res, [
      `${SanityType.Category}_${slug}`,
      SanityType.Product,
      SanityType.ProductImage,
      SanityType.Variant,
    ]);
  }

  // Sort/ordering.
  const order = getOrderingFromQuery(query);
  // Fetch size filters from sanity
  const sizeFilters = await getSizeFilters(slug as string);

  // Filters.
  const filters = getFiltersFromQuery(query, { sizeFilters });

  // Pagination data.
  const pagination = getPaginationFromQuery(query);

  const result = await getFilteredPaginatedQuery<CategoryPageResult>(GetFilteredCategoryProducts(filters, order), {
    slug,
    ...pagination,
  });

  const { category, products, productsCount } = result;
  const { currentPage, pageSize } = pagination;
  const pageCount = Math.ceil(productsCount / pageSize);

  /**
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
      sizeFilters,
      category,
      products,
      productsCount,
      pageCount,
      pageSize,
      currentPage,
    },
  };
};
