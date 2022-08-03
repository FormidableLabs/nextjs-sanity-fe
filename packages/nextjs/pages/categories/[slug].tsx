import groq from "groq";
import { CategoryPageCategory, CategoryPageProduct, CategoryPageResult } from "utils/groqTypes";
import { sanityClient } from "utils/sanityClient";

import type { GetServerSideProps, NextPage } from "next";
import { Product } from "components/Product";
import { Pagination } from "components/Pagination";
import { useRouter } from "next/router";
import { getPaginationOffsets } from "utils/getPaginationOffsets";

interface Props {
  products: CategoryPageProduct[];
  category: CategoryPageCategory;
  productsCount: number;
  pageSize: number;
  pageCount: number;
  currentPage?: number;
};

const CategoryPage: NextPage<Props> = ({
  category,
  products,
  pageCount,
  currentPage,
}) => {
  const router = useRouter();
  const baseUrl = router.asPath.split("?")[0];
  
  return (
    <div className="h-full mb-4">
      <h1 className="text-2xl font-bold m-4">{category.name}</h1>
      <div className="flex px-4 h-full">
        <div className="min-w-[350px]">
          <h2>Filters</h2>
        </div>
        <div className="flex flex-auto flex-col">
          <div className="flex-1 flex flex-wrap">
            {products.map((product) => <Product key={product._id} item={product} />)}
          </div>
          <div className="py-10">
            <Pagination baseUrl={baseUrl} pageCount={pageCount} currentPage={currentPage} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.query;
  const queryPage = Math.abs(ctx.query.page as unknown as number ?? 0);
  // Products per page.
  const pageSize = Math.abs(process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE);

  const offsets = getPaginationOffsets(queryPage);

  const queryOptions = {
    slug,
    ...offsets,
  };

  const result: CategoryPageResult = await sanityClient.fetch(
    groq`{
      'products': *[_type == "product" && $slug in categories[]->slug.current] | order(_createdAt) [$offsetPage...$limit] {
        ...,
        'imageAlt': images[0]->name,
        'images': images[0]->images,
        'msrp': variants[0]->msrp,
        'price': variants[0]->price,
        'variants': variants[]->{
          ...,
          'size': size->name
        }
      },
      'productsCount': count(*[_type == "product" && $slug in categories[]->slug.current]),
      'category': *[_type == "category" && slug.current == $slug][0] {
        name
      }
    }`,
    queryOptions
  );

  const { category, products, productsCount } = result;
  const pageCount = Math.ceil(productsCount / pageSize);

  return { 
    props: {
      category,
      products,
      productsCount,
      pageCount,
      pageSize,
      currentPage: queryPage > 0 ? queryPage : 1,
    },
  };
};
