import { GetServerSideProps, NextPage } from "next";

import { GetAllFilteredVariants, getFilteredPaginatedQuery } from "utils/getFilteredPaginatedQuery";
import { getPaginationFromQuery } from "utils/getPaginationFromQuery";
import { getFiltersFromQuery } from "utils/getFiltersFromQuery";
import { getOrderingFromQuery } from "utils/getOrderingFromQuery";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { getSizeFilters } from "utils/getSizeFilters";
import { SanityType } from "utils/consts";
import { PLPLayout } from "../../components/PLPLayout";
import { PageHead } from "../../components/PageHead";
import * as React from "react";
import { pluralize } from "../../utils/pluralize";
import { FlavourFilterItem, PLPVariant, PLPVariantList, StyleFilterItem } from "../../utils/groqTypes/ProductList";
import { getFlavourFilters } from "../../utils/getFlavourFilters";
import { getStyleFilters } from "../../utils/getStyleFilters";

interface ProductsPageProps {
  variants: PLPVariant[];
  itemCount: number;
  pageSize: number;
  pageCount: number;
  currentPage?: number;
  flavourFilters: FlavourFilterItem[];
  styleFilters: StyleFilterItem[];
}

const ProductsPage: NextPage<ProductsPageProps> = ({
  variants,
  pageCount,
  currentPage,
  flavourFilters,
  styleFilters,
}) => {
  const productNames = pluralize(variants.map((prod) => prod.name));

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
        variants={variants}
        flavourFilters={flavourFilters}
        styleFilters={styleFilters}
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

  const flavourFilters = await getFlavourFilters();
  const styleFilters = await getStyleFilters();

  // Filters.
  const filters = getFiltersFromQuery(query, { flavourFilters, styleFilters });
  // Pagination data.
  const pagination = getPaginationFromQuery(query);

  console.log(filters);

  const result = await getFilteredPaginatedQuery<PLPVariantList>(GetAllFilteredVariants(filters, order), pagination);

  const { variants, itemCount } = result;
  const { currentPage, pageSize } = pagination;
  const pageCount = Math.ceil(itemCount / pageSize);

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
      flavourFilters,
      styleFilters,
      variants,
      itemCount,
      pageCount,
      pageSize,
      currentPage,
    },
  };
};

export default ProductsPage;
