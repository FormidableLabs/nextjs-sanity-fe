import { Select } from "components/Select";
import { H6 } from "components/Typography/H6";
import { useMemo } from "react";
import { GetProductAndRecommendationsQuery } from "utils/generated/graphql";

export type ProductVariants = GetProductAndRecommendationsQuery["allProduct"][0]["variants"];
export type ProductVariant = NonNullable<ProductVariants>[0];

interface Props {
  variants: ProductVariants;
  selectedVariant?: ProductVariant;
  onVariantChange: (id?: string) => void;
}

export const ProductVariantSelector: React.FC<Props> = ({ variants, selectedVariant, onVariantChange }) => {
  const options = useMemo(
    () =>
      variants?.map((variant) => ({
        title: variant?.name ?? "",
        value: variant?.id ?? "",
      })),
    [variants]
  );

  if (!options?.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <H6>Variant</H6>
      {options.length <= 1 ? (
        <H6>{selectedVariant?.name}</H6>
      ) : (
        <Select
          options={options}
          placeholder="Select a flavour"
          defaultSelectedItem={{
            title: selectedVariant?.name ?? "",
            value: selectedVariant?.id ?? "",
          }}
          onChange={(o) => onVariantChange(o?.value)}
        />
      )}
    </div>
  );
};
