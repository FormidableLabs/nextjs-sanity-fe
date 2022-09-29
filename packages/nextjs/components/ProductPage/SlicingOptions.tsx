import { Pill } from "components/Pill";
import { H6 } from "components/Typography/H6";
import { GetProductAndRecommendationsQuery } from "utils/generated/graphql";

interface Props {
  options: NonNullable<NonNullable<GetProductAndRecommendationsQuery["allProduct"][0]["variants"]>[0]>["slicingOption"];
  selectedSlicing?: string;
  onChange: (slicing: string) => void;
}

export const SlicingOptions: React.FC<Props> = ({ options, selectedSlicing, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <H6>Slicing option</H6>
      <div className="flex gap-2">
        {options?.map((option) => (
          <Pill
            key={option?._id}
            selected={selectedSlicing === option?._id}
            onClick={() => onChange(option?._id ?? "")}
          >
            {option?.name}
          </Pill>
        ))}
      </div>
    </div>
  );
};
