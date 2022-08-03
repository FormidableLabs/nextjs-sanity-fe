import type { FiltersGroupItem } from "./types";
import { FiltersGroup } from "./FiltersGroup";

type ProductFiltersProps = {
  filtersData?: FiltersGroupItem[];
};

const DUMMY_DATA = [
  {
    id: 1,
    name: "size",
    label: "Size",
    options: [
      { id: 1, name: "xs", label: "XS" },
      { id: 2, name: "sm", label: "SM" },
      { id: 3, name: "md", label: "MD" },
      { id: 4, name: "lg", label: "LG" },
      { id: 5, name: "xl", label: "XL" },
    ],
  },
  {
    id: 2,
    name: "promotion",
    label: "Promotion",
    options: [
      { id: 1, name: "sale", label: "Sale" },
      { id: 2, name: "bogo", label: "BOGO" },
      { id: 3, name: "2day", label: "Free 2-day Shipping" },
    ],
  },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({ filtersData = DUMMY_DATA }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <h2>Filters</h2>
      {filtersData.map((group) => (
        <FiltersGroup key={group.id} group={group} />
      ))}
    </div>
  );
};
