import * as React from "react";
import { WeDontSellBreadBanner } from "./WeDontSellBreadBanner";
import { ProductSort } from "./ProductSort";
import { ProductFilters } from "./ProductFilters";
import { Product } from "./Product";
import { Pagination } from "./Pagination";
import { CategoryFilterItem, FlavourFilterItem, PLPVariant, StyleFilterItem } from "../utils/groqTypes/ProductList";
import { H6 } from "./Typography/H6";

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
            {variants && variants.length ? (
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-9 mb-9">
                {variants.map((variant) => (
                  <Product key={variant._id} item={variant} />
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center">
                <H6 className="text-center">No products found</H6>
              </div>
            )}
            {!disablePagination && variants.length > 0 && (
              <Pagination pageCount={pageCount} currentPage={currentPage} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
