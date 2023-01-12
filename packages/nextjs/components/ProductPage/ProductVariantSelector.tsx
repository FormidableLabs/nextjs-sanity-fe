import * as React from "react";
import { useMemo } from "react";
import { Select } from "components/Select";
import { H6 } from "components/Typography/H6";
import { GetProductAndRecommendationsQuery } from "utils/generated/graphql";

export type ProductVariants = GetProductAndRecommendationsQuery["allProduct"][0]["variants"];
export type ProductVariant = NonNullable<ProductVariants>[0];

interface Props {
  variants: ProductVariants;
  selectedVariant?: ProductVariant;
  onVariantChange: (slug?: string) => void;
}

export const ProductVariantSelector = ({ variants, selectedVariant, onVariantChange }: Props) => {
  const options = useMemo(
    () =>
      variants?.map((variant) => ({
        title: variant?.name ?? "",
        value: variant?.slug?.current ?? "",
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
            value: selectedVariant?.slug?.current ?? "",
          }}
          onChange={(o) => onVariantChange(o?.value)}
        />
      )}
    </div>
  );
};
