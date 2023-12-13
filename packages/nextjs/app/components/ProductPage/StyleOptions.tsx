"use client";

import * as React from "react";
import { H6, Pill } from "shared-ui";
import { ProductDetailVariants } from "utils/groqTypes/ProductDetail";

interface Props {
  variant?: ProductDetailVariants[number];
}

export const StyleOptions = ({ variant }: Props) => {
  const options = variant?.style;
  const [selectedStyle, setSelectedStyle] = React.useState(variant?.style?.[0]?.name || "");

  return (
    <div className="flex items-center justify-between">
      <H6>Style</H6>
      <div className="flex gap-2">
        {options?.map((option) => (
          <Pill
            key={option?._id}
            selected={selectedStyle === option?.name}
            onClick={() => setSelectedStyle(option?.name ?? "")}
          >
            {option?.name}
          </Pill>
        ))}
      </div>
    </div>
  );
};
