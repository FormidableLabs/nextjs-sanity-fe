import * as React from "react";
import { useMemo } from "react";
import { H6, Select } from "shared-ui";
import { ProductDetailVariants } from "utils/groqTypes/ProductDetail";

interface Props {
  variants: ProductDetailVariants;
  selectedVariant?: ProductDetailVariants[number];
  onVariantChange: (slug?: string) => void;
}

export const ProductVariantSelector = ({ variants, selectedVariant, onVariantChange }: Props) => {
  const options = useMemo(
    () =>
      variants?.map((variant) => ({
        title: variant?.name ?? "",
        value: variant?.slug ?? "",
      })),
    [variants]
  );

  if (!options?.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <H6>Type</H6>
      {options.length <= 1 ? (
        <H6>{selectedVariant?.name}</H6>
      ) : (
        <Select
          options={options}
          placeholder="Select a flavour"
          selectedItem={{
            title: selectedVariant?.name ?? "",
            value: selectedVariant?.slug ?? "",
          }}
          onChange={(o) => onVariantChange(o?.value)}
        />
      )}
    </div>
  );
};
