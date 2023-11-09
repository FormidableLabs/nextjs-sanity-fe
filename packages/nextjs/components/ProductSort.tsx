import * as React from "react";
import { useRouterQueryParams } from "utils/useRouterQueryParams";
import { ProductSort as BaseProductSort, ProductSortProps as BaseProps } from "shared-ui";

type ProductSortProps = Pick<BaseProps, "as" | "showTitle" | "title" | "selectClassName">;

export const ProductSort: React.FC<ProductSortProps> = (props) => {
  const { replace, clear, query } = useRouterQueryParams();
  return <BaseProductSort {...props} onClear={clear} onReplace={replace} query={query} />;
};
