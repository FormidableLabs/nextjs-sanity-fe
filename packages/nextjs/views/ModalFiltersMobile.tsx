import { Button } from "components/Button";
import { Modal } from "components/Modal";
import { ProductFilters } from "components/ProductFilters/ProductFilters";
import React from "react";
import { CategoryFilterItem, FlavourFilterItem, StyleFilterItem } from "utils/groqTypes/ProductList";

interface ModalFiltersMobileProps {
  isOpen: boolean;
  categoryFilters: CategoryFilterItem[];
  flavourFilters: FlavourFilterItem[];
  styleFilters: StyleFilterItem[];
  onClose: (value: boolean) => void;
}

export const ModalFiltersMobile: React.FC<ModalFiltersMobileProps> = ({
  isOpen,
  flavourFilters,
  styleFilters,
  categoryFilters,
  onClose,
}) => {
  return (
    <Modal className="w-full h-full min-h-[844px]" isOpen={isOpen} onClose={onClose}>
      <div className="w-full flex flex-col p-5 pt-10">
        <ProductFilters flavourFilters={flavourFilters} styleFilters={styleFilters} categoryFilters={categoryFilters} />
      </div>

      <div className="sticky bottom-6 w-full">
        <div className="mx-0 px-4 py-4">
          <Button
            type="button"
            variant="primary"
            className="w-full rounded-2xl font-semibold justify-center"
            onClick={() => onClose(false)}
          >
            View results
          </Button>
        </div>
      </div>
    </Modal>
  );
};
