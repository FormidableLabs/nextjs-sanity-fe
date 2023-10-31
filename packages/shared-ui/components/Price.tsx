import * as React from "react";
import { Eyebrow } from "./Typography";
import { currencyFormatter } from "../utils/currencyFormatter";

interface Props {
  msrp?: number | null;
  price?: number | null;
}

export const Price: React.FC<Props> = ({ msrp, price }) => {
  if (price !== msrp) {
    return (
      <span className="flex gap-x-2">
        <Eyebrow className="text-red line-through">{currencyFormatter.format(msrp ?? 0)}</Eyebrow>
        <Eyebrow className="">{currencyFormatter.format(price ?? 0)}</Eyebrow>
      </span>
    );
  }

  return <Eyebrow className="">{currencyFormatter.format(price ?? 0)}</Eyebrow>;
};
