import { GetServerSideProps, NextPage } from "next";

import { GetAllFilteredProducts, getFilteredPaginatedQuery } from "utils/generated/graphql";
import { ProductSort } from "components/ProductSort";
import { ProductFilters } from "components/ProductFilters";
import { Pagination } from "components/Pagination";
import { Product } from "components/Product";
import { getPaginationFromQuery } from "utils/getPaginationFromQuery";
import { AllProductsPageResult, CategoryPageProduct } from "utils/groqTypes";
import { getFiltersFromQuery } from "utils/getFiltersFromQuery";
import { getOrderingFromQuery } from "utils/getOrderingFromQuery";

interface ProductsPageProps {
  products: CategoryPageProduct[];
  productsCount: number;
  pageSize: number;
  pageCount: number;
  currentPage?: number;
}

const ProductsPage: NextPage<ProductsPageProps> = ({ products, pageCount, currentPage }) => {
  return (
    <div className="h-full mb-4">
      <h1 className="text-2xl font-bold m-4">All products</h1>
      <div className="flex px-4 h-full">
        <div className="min-w-[350px]">
          <ProductSort />
          <hr className="slate-700 my-4" />
          <ProductFilters />
        </div>
        <div className="flex flex-auto flex-col">
          <div className="flex-1 flex flex-wrap">
            {products && products.length ? (
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

export const getServerSideProps: GetServerSideProps = async ({ query, ...ctx }) => {
  // Sort/ordering.
  const order = getOrderingFromQuery(query);
  // Filters.
  const filters = getFiltersFromQuery(query);
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
      products,
      productsCount,
      pageCount,
      pageSize,
      currentPage,
    },
  };
};

export default ProductsPage;
