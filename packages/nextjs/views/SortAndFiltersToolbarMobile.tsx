import { Button } from "ui";
import React from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { ProductSort } from "components/ProductSort";
import { useGetFiltersCount } from "utils/getFiltersCount";

interface SortAndFiltersToolbarMobileProps {
  onFiltersClick?: React.MouseEventHandler;
}

export const SortAndFiltersToolbarMobile: React.FC<SortAndFiltersToolbarMobileProps> = ({ onFiltersClick }) => {
  const total = useGetFiltersCount();

  return (
    <div className="my-6 mb-8 w-full inline-flex items-end justify-between md:hidden">
      <ProductSort showTitle as="select" selectClassName="w-40 mr-1" />

      <Button
        title="Open filters"
        type="button"
        variant="primary"
        leftIcon={<MdOutlineFilterList className="w-5 h-5" />}
        onClick={onFiltersClick}
      >
        Filters {total > 0 ? `(${total})` : ""}
      </Button>
    </div>
  );
};
