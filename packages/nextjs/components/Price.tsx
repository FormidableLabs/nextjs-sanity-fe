import * as React from "react";
import { Eyebrow } from "components/Typography/Eyebrow";

interface Props {
  msrp?: number | null;
  price?: number | null;
}

export const Price: React.FC<Props> = ({ msrp, price }) => {
  if (price !== msrp) {
    return (
      <span className="flex gap-x-2">
        <Eyebrow className="text-red line-through">${msrp ?? 0}</Eyebrow>
        <Eyebrow className="">${price ?? 0}</Eyebrow>
      </span>
    );
  }

  return <Eyebrow className="">${price ?? 0}</Eyebrow>;
};
