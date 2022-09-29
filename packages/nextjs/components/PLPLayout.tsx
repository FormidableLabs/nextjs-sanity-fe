import * as React from "react";
import { WeDontSellBreadBanner } from "./WeDontSellBreadBanner";
import { ProductSort } from "./ProductSort";
import { ProductFilters } from "./ProductFilters";
import { Product } from "./Product";
import { Pagination } from "./Pagination";
import { CategoryFilterItem, FlavourFilterItem, PLPVariant, StyleFilterItem } from "../utils/groqTypes/ProductList";

type PLPLayoutProps = {
  title: string;
  variants: PLPVariant[];
  pageCount: number;
  currentPage?: number;
  categoryFilters: CategoryFilterItem[];
  flavourFilters: FlavourFilterItem[];
  styleFilters: StyleFilterItem[];
  disablePagination?: boolean;
};

export const PLPLayout = ({
  title,
  categoryFilters,
  flavourFilters,
  styleFilters,
  variants,
  pageCount,
  currentPage,
  disablePagination,
}: PLPLayoutProps) => {
  return (
    <div>
      <WeDontSellBreadBanner />
      <div className="py-9 container">
        <h1 className="text-h1 text-blue mb-9">{title}</h1>
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
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-9 mb-9">
              {variants && variants.length ? (
                variants.map((variant) => <Product key={variant._id} item={variant} />)
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center">
                  <div className="text-center text-gray-500">No products found</div>
                </div>
              )}
            </div>
            {!disablePagination && <Pagination pageCount={pageCount} currentPage={currentPage} />}
          </div>
        </div>
      </div>
    </div>
  );
};
