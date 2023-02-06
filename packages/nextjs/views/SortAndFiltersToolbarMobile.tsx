import { Button } from "components/Button";
import { ProductSort } from "components/ProductSort";
import React from "react";
import { MdOutlineFilterList } from "react-icons/md";

interface SortAndFiltersToolbarMobileProps {
  onFiltersClick?: React.MouseEventHandler;
}

export const SortAndFiltersToolbarMobile: React.FC<SortAndFiltersToolbarMobileProps> = ({ onFiltersClick }) => {
  return (
    <div className="my-6 mb-8 w-full inline-flex items-end justify-between md:hidden">
      <ProductSort showTitle as="select" selectClassName="w-44 mr-2" />

      <Button
        title="Open filters"
        type="button"
        variant="primary"
        leftIcon={<MdOutlineFilterList className="w-5 h-5" />}
        onClick={onFiltersClick}
      >
        Filters
      </Button>
    </div>
  );
};
