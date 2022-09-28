import { GetServerSideProps, NextPage } from "next";

import { GetAllFilteredProducts, getFilteredPaginatedQuery } from "utils/getFilteredPaginatedQuery";
import { ProductSort } from "components/ProductSort";
import { ProductFilters } from "components/ProductFilters";
import { Pagination } from "components/Pagination";
import { Product } from "components/Product";
import { getPaginationFromQuery } from "utils/getPaginationFromQuery";
import { AllProductsPageResult, CategoryPageProduct } from "utils/groqTypes";
import { getFiltersFromQuery } from "utils/getFiltersFromQuery";
import { getOrderingFromQuery } from "utils/getOrderingFromQuery";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { getSizeFilters } from "utils/getSizeFilters";
import { SanityType } from "utils/consts";
import { WeDontSellBreadBanner } from "../../components/WeDontSellBreadBanner";

interface ProductsPageProps {
  products: CategoryPageProduct[];
  productsCount: number;
  pageSize: number;
  pageCount: number;
  currentPage?: number;
  sizeFilters: string[];
}

const ProductsPage: NextPage<ProductsPageProps> = ({ products, pageCount, currentPage, sizeFilters }) => {
  return (
    <div>
      <WeDontSellBreadBanner />
      <main className="py-9 container">
        <h1 className="text-h1 text-blue mb-9">Products</h1>
        <div className="flex gap-9 flex-col md:flex-row">
          <div className="w-full md:w-72 order-2 md:order-1 flex flex-col gap-9">
            <ProductSort />
            <ProductFilters sizeFilters={sizeFilters} />
          </div>

          <div className="flex-1 order-1 md:order-2">
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-9 mb-9">
              {products && products.length ? (
                products.map((product) => <Product key={product._id} item={product} />)
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center">
                  <div className="text-center text-gray-500">No products found</div>
                </div>
              )}
            </div>
            <Pagination pageCount={pageCount} currentPage={currentPage} />
          </div>
        </div>
      </main>
    </div>
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
