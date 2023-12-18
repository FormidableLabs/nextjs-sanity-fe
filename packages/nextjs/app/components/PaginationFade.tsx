"use client";

import classNames from "classnames";
import { FadeInOut } from "shared-ui";
import { useSearchParams } from "next/navigation";
import { pluralize } from "utils/pluralize";
import { PLPVariant } from "utils/groqTypes/ProductList";

type Props = {
  variants: PLPVariant[];
};

const PaginationFade = ({ children, variants }: React.PropsWithChildren<Props>) => {
  const query = useSearchParams();
  const productNames = pluralize(variants.map((prod) => prod.name));

  return (
    <FadeInOut
      className={classNames(
        "w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-9 mb-9",
        +(query?.get("page") || 1) > 1 && "grid-rows-2"
      )}
      key={productNames}
    >
      {children}
      {/* Add padder items when on page > 1 so pagination bar isn't moving around */}
      {+(query?.get("page") || 1) > 1 &&
        Array.from({ length: 6 - variants.length })
          .fill(undefined)
          .map((_, i) => <div key={i} className="invisible" />)}
    </FadeInOut>
  );
};

export default PaginationFade;
