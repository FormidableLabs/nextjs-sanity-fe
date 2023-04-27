import * as React from "react";
import { useMemo } from "react";
import { Select } from "components/Select";
import { H6 } from "components/Typography/H6";
import { Variant } from "utils/groqTypes/ProductList";

interface Props {
  variants: Variant[];
  selectedVariant?: Variant;
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
