"use client";

import { Button } from "shared-ui";
import React from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { ProductSort } from "app/components/ProductSort";
import { useGetFiltersCount } from "utils/getFiltersCount";
import { useModalFilters } from "app/components/ModalFiltersProvider";

export const SortAndFiltersToolbarMobile: React.FC = () => {
  const total = useGetFiltersCount();
  const { handleOpenModal } = useModalFilters();

  return (
    <div className="my-6 mb-8 w-full inline-flex items-end justify-between md:hidden">
      <ProductSort showTitle as="select" selectClassName="w-40 mr-1" />

      <Button
        title="Open filters"
        type="button"
        variant="primary"
        leftIcon={<MdOutlineFilterList className="w-5 h-5" />}
        onClick={handleOpenModal}
      >
        Filters {total > 0 ? `(${total})` : ""}
      </Button>
    </div>
  );
};
