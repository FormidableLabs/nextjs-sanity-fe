import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import classNames from "classnames";

import { GetAllFilteredVariants, getFilteredPaginatedQuery } from "utils/getFilteredPaginatedQuery";
import { getCategoryFilters, getFlavourFilters, getStyleFilters } from "utils/getFilters";
import { getPaginationFromQuery } from "utils/getPaginationFromQuery";
import { getFiltersFromQuery } from "utils/getFiltersFromQuery";
import { getOrderingFromQuery } from "utils/getOrderingFromQuery";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { SanityType } from "utils/consts";
import { pluralize } from "utils/pluralize";
import {
  CategoryFilterItem,
  FlavourFilterItem,
  PLPVariant,
  PLPVariantList,
  StyleFilterItem,
} from "utils/groqTypes/ProductList";

import { PageHead } from "components/PageHead";
import { WeDontSellBreadBanner } from "components/WeDontSellBreadBanner";
import { ProductSort } from "components/ProductSort";
import { ProductFilters } from "components/ProductFilters/ProductFilters";
import { Product } from "components/Product";
import { H6 } from "components/Typography/H6";
import { Pagination } from "components/Pagination";
import { FadeInOut } from "components/FadeInOut";

interface ProductsPageProps {
  variants: PLPVariant[];
  itemCount: number;
  pageSize: number;
  pageCount: number;
  currentPage?: number;
  categoryFilters: CategoryFilterItem[];
  flavourFilters: FlavourFilterItem[];
  styleFilters: StyleFilterItem[];
}

const ProductsPage: NextPage<ProductsPageProps> = ({
  variants,
  pageCount,
  currentPage,
  categoryFilters,
  flavourFilters,
  styleFilters,
}) => {
  const productNames = pluralize(variants.map((prod) => prod.name));
  const { query } = useRouter();

  return (
    <>
      <PageHead
        title="Products"
        description={`Formidable Boulangerie product listing page, featuring ${productNames}.`}
      />
      <div>
        <WeDontSellBreadBanner />
        <div className="py-9 container">
          <h1 className="text-h1 text-primary mb-9">Products</h1>
          <div className="flex gap-9 flex-col md:flex-row">
            <div className="w-full md:w-72 order-2 md:order-1 flex flex-col gap-9">
              <ProductSort />
              <ProductFilters
                flavourFilters={flavourFilters}
                styleFilters={styleFilters}
                categoryFilters={categoryFilters}
              />
            </div>

            <div className="flex-1 order-1 md:order-2">
              <AnimatePresence mode="wait">
                {variants.length > 0 && (
                  <FadeInOut
                    className={classNames(
                      "w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-9 mb-9",
                      +(query?.page || 1) > 1 && "grid-rows-2"
                    )}
                    key={productNames}
                  >
                    {variants.map((variant) => (
                      <Product key={variant._id} item={variant} />
                    ))}
                    {/* Add padder items when on page > 1 so pagination bar isn't moving around */}
                    {+(query?.page || 1) > 1 &&
                      Array.from({ length: 6 - variants.length })
                        .fill(undefined)
                        .map((_, i) => <div key={i} className="invisible" />)}
                  </FadeInOut>
                )}

                {variants.length === 0 && (
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <H6 className="text-center">No products found</H6>
                  </div>
                )}
              </AnimatePresence>
              {variants.length > 0 && <Pagination key="pagination" pageCount={pageCount} currentPage={currentPage} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = (async ({ query, res, resolvedUrl }) => {
  setCachingHeaders(res, [
    SanityType.Product,
    SanityType.ProductImage,
    SanityType.Style,
    SanityType.Flavour,
    SanityType.Variant,
  ]);

  // Sort/ordering.
  const order = getOrderingFromQuery(query);

  // Fetch size filters from sanity
  const categoryFilters = await getCategoryFilters();
  const flavourFilters = await getFlavourFilters();
  const styleFilters = await getStyleFilters();

  // Filters.
  const filters = getFiltersFromQuery(query, { flavourFilters, styleFilters, categoryFilters });
  // Pagination data.
  const pagination = getPaginationFromQuery(query);

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
    const redirect: GetServerSidePropsResult<unknown> = {
      redirect: {
        destination,
        permanent: false,
      },
    };
    return redirect as never; // Exclude this return type from the return signature
  }

  return {
    props: {
      categoryFilters,
      flavourFilters,
      styleFilters,
      variants,
      itemCount,
      pageCount,
      pageSize,
      currentPage,
    },
  };
}) satisfies GetServerSideProps<ProductsPageProps>;

export default ProductsPage;
