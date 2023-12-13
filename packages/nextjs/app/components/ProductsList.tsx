import * as React from "react";
import { AnimatePresence } from "../ui/framer";

import { H6, WeDontSellBreadBanner } from "../ui/shared-ui";
import { CategoryFilterItem, FlavourFilterItem, PLPVariant, StyleFilterItem } from "utils/groqTypes/ProductList";

import { ProductFilters } from "app/components/ProductFilters/ProductFilters";
import { Product } from "app/components/Product";
import { Pagination } from "app/components/Pagination";
import { Breadcrumbs } from "app/components/Breadcrumbs";
import { SortAndFiltersToolbarMobile } from "app/components/SortAndFiltersToolbarMobile";
import { ProductSort } from "app/components/ProductSort";
import PaginationFade from "./PaginationFade";

interface ProductListProps {
  variants: PLPVariant[];
  itemCount: number;
  pageSize: number;
  pageCount: number;
  currentPage?: number;
  categoryFilters: CategoryFilterItem[];
  flavourFilters: FlavourFilterItem[];
  styleFilters: StyleFilterItem[];
}

const ProductList = ({
  variants,
  pageCount,
  currentPage,
  categoryFilters,
  flavourFilters,
  styleFilters,
}: ProductListProps) => {
  return (
    <>
      <div>
        <WeDontSellBreadBanner />
        <div className="py-9 container">
          <h1 className="text-h1 text-primary mb-9">Products</h1>
          <section className="flex gap-9 flex-col md:flex-row">
            <div className="hidden w-full md:w-72 order-2 md:order-1 md:flex flex-col gap-9">
              <ProductSort showTitle />
              <ProductFilters
                flavourFilters={flavourFilters}
                styleFilters={styleFilters}
                categoryFilters={categoryFilters}
              />
            </div>

            <div className="flex-1 order-1 md:order-2">
              <div className="mb-4">
                <Breadcrumbs />
              </div>

              {/**
               *
               * Product Sort (select) and product filters (mobile only).
               * See Modal component below
               *
               */}
              <SortAndFiltersToolbarMobile />

              <AnimatePresence mode="wait">
                {variants.length > 0 && (
                  <PaginationFade variants={variants}>
                    {variants.map((variant, index) => (
                      <Product key={variant._id} item={variant} priorityImage={index === 0} />
                    ))}
                  </PaginationFade>
                )}

                {variants.length === 0 && (
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <H6 className="text-center">No products found</H6>
                  </div>
                )}
              </AnimatePresence>
              {variants.length > 0 && <Pagination key="pagination" pageCount={pageCount} currentPage={currentPage} />}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductList;
