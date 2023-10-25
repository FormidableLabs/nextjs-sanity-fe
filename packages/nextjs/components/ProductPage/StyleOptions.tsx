import * as React from "react";
import { H6 } from "shared-ui";
import { Pill } from "components/Pill";
import { Style } from "utils/groqTypes/ProductList";

interface Props {
  options: Style[];
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
