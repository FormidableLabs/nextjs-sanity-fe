import { GetServerSideProps, NextPage } from "next";

import { GetAllFilteredProducts, getFilteredPaginatedQuery } from "utils/getFilteredPaginatedQuery";
import { getPaginationFromQuery } from "utils/getPaginationFromQuery";
import { AllProductsPageResult, CategoryPageProduct } from "utils/groqTypes";
import { getFiltersFromQuery } from "utils/getFiltersFromQuery";
import { getOrderingFromQuery } from "utils/getOrderingFromQuery";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { getSizeFilters } from "utils/getSizeFilters";
import { SanityType } from "utils/consts";
import { PLPLayout } from "../../components/PLPLayout";
import { PageHead } from "../../components/PageHead";
import * as React from "react";
import { pluralize } from "../../utils/pluralize";

interface ProductsPageProps {
  products: CategoryPageProduct[];
  productsCount: number;
  pageSize: number;
  pageCount: number;
  currentPage?: number;
  sizeFilters: string[];
}

const ProductsPage: NextPage<ProductsPageProps> = ({ products, pageCount, currentPage, sizeFilters }) => {
  const productNames = pluralize(products.map((prod) => prod.name));

  return (
    <>
      <PageHead
        title="Products"
        description={`Formidable Boulangerie product listing page, featuring ${productNames}.`}
      />
      <PLPLayout
        title="Products"
        pageCount={pageCount}
        currentPage={currentPage}
        products={products}
        sizeFilters={sizeFilters}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async ({ query, res, resolvedUrl }) => {
  setCachingHeaders(res, [SanityType.Product, SanityType.ProductImage, SanityType.Size, SanityType.Variant]);

  // Sort/ordering.
  const order = getOrderingFromQuery(query);

  // Fetch size filters from sanity
  const sizeFilters = await getSizeFilters();

  // Filters.
  const filters = getFiltersFromQuery(query, { sizeFilters });
  // Pagination data.
  const pagination = getPaginationFromQuery(query);

  const result = await getFilteredPaginatedQuery<AllProductsPageResult>(
    GetAllFilteredProducts(filters, order),
    pagination
  );

  const { products, productsCount } = result;
  const { currentPage, pageSize } = pagination;

  const pageCount = Math.ceil(productsCount / pageSize);

  /**
   * Scenario: If user is on the third page and then enables
   * a filter that only returns two pages worth of products,
   * redirect them to the last page/pageCount
   */
  if (pageCount > 0 && currentPage > pageCount) {
    const destination = resolvedUrl.replace(`page=${currentPage}`, `page=${pageCount}`);
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
      products,
      productsCount,
      pageCount,
      pageSize,
      currentPage,
    },
  };
};

export default ProductsPage;
