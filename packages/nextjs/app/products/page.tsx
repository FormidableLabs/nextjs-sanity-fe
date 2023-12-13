import { redirect } from "next/navigation";
import { getOrderingFromQuery } from "../migration/getOrderingFromQuery";
import { getAllFilteredVariants } from "utils/getFilteredPaginatedQuery";
import { getCategoryFilters, getFlavourFilters, getStyleFilters } from "utils/getFilters";
import { getFiltersFromQuery } from "utils/getFiltersFromQuery";
import { getPaginationFromQuery } from "utils/getPaginationFromQuery";
import { pluralize } from "utils/pluralize";
import { Metadata } from "next";
import ProductsList from "app/components/ProductsList";

// See: https://nextjs.org/docs/app/api-reference/file-conventions/page
type RouteSearchParams = { [key: string]: string | string[] | undefined };

const getData = async ({ searchParams }: { searchParams: RouteSearchParams }) => {
  // Sort/ordering.
  const order = getOrderingFromQuery(searchParams);

  // Fetch size filters from sanity
  const categoryFilters = await getCategoryFilters();
  const flavourFilters = await getFlavourFilters();
  const styleFilters = await getStyleFilters();

  // Filters.
  const filters = getFiltersFromQuery(searchParams, { flavourFilters, styleFilters, categoryFilters });
  // Pagination data.
  const pagination = getPaginationFromQuery(searchParams);
  const result = await getAllFilteredVariants(filters, order, pagination);

  const { variants, itemCount } = result;
  const { currentPage, pageSize } = pagination;
  const pageCount = Math.ceil(itemCount / pageSize);

  /**
   * Scenario: If user is on the third page and then enables
   * a filter that only returns two pages worth of products,
   * redirect them to the last page/pageCount
   */

  return {
    categoryFilters,
    flavourFilters,
    styleFilters,
    variants,
    itemCount,
    pageCount,
    pageSize,
    currentPage,
  };
};

type Props = {
  searchParams: RouteSearchParams;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const data = await getData({ searchParams });
  const productNames = pluralize(data.variants.map((prod) => prod.name));

  return {
    title: "Products",
    description: `Formidable Boulangerie product listing page, featuring ${productNames}.`,
  };
}

export default async function Page({ searchParams }: Props) {
  const data = await getData({ searchParams });

  if (data.pageCount > 0 && data.currentPage > data.pageCount) {
    const newParams = new URLSearchParams({ ...searchParams, page: data.pageCount.toString() });
    return redirect(`/products?${newParams.toString()}`);
  }

  return <ProductsList {...data} />;
}
