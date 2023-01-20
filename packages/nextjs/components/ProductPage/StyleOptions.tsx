import * as React from "react";
import { Pill } from "components/Pill";
import { H6 } from "components/Typography/H6";
import { GetProductAndRecommendationsQuery } from "utils/generated/graphql";

interface Props {
  options: NonNullable<NonNullable<GetProductAndRecommendationsQuery["allProduct"][0]["productVariants"]>[0]>["style"];
  selectedStyle?: string;
  onChange: (slicing: string) => void;
}

export const StyleOptions = ({ options, selectedStyle, onChange }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <H6>Style</H6>
      <div className="flex gap-2">
        {options?.map((option) => (
          <Pill
            key={option?._id}
            selected={selectedStyle === option?.name}
            onClick={() => onChange(option?.name ?? "")}
          >
            {option?.name}
          </Pill>
        ))}
      </div>
    </div>
  );
};
