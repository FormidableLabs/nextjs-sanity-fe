"use client";

import React from "react";
import { ModalFiltersMobile } from "views/ModalFiltersMobile";
import { useDeviceSize } from "utils/useDeviceSize";
import { CategoryFilterItem, FlavourFilterItem, StyleFilterItem } from "utils/groqTypes/ProductList";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialValues = {
  handleOpenModal: noop,
  handleCloseModal: noop,
  isModalOpen: false,
};

const ModalFiltersContext = React.createContext(initialValues);

export const useModalFilters = () => {
  const context = React.useContext(ModalFiltersContext);

  if (!context) {
    throw new Error("useModalFilters must be used within a ModalFiltersContext.Provider");
  }

  return context;
};

type Props = {
  categoryFilters: CategoryFilterItem[];
  flavourFilters: FlavourFilterItem[];
  styleFilters: StyleFilterItem[];
};

const ModalFiltersProvider = ({
  children,
  categoryFilters,
  flavourFilters,
  styleFilters,
}: React.PropsWithChildren<Props>) => {
  const { isSm } = useDeviceSize();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  React.useEffect(() => {
    // If modal is open and the window size changes to tablet/desktop viewport,
    // then closes the modal
    if (!isSm) {
      setIsModalOpen(false);
    }
  }, [isSm]);

  const value = React.useMemo(
    () => ({
      handleOpenModal,
      handleCloseModal,
      isModalOpen,
    }),
    [handleCloseModal, handleOpenModal, isModalOpen]
  );

  return (
    <ModalFiltersContext.Provider value={value}>
      {children}
      {/* Modal UI for filters (mobile only) */}
      <ModalFiltersMobile
        flavourFilters={flavourFilters}
        styleFilters={styleFilters}
        categoryFilters={categoryFilters}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </ModalFiltersContext.Provider>
  );
};

export default ModalFiltersProvider;
