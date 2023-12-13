"use client";

import React from "react";

type CartContext = {
  isNavOpen: boolean;
  onMobileNavClick: () => void;
  onMobileNavClose: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialContext: CartContext = {
  isNavOpen: false,
  onMobileNavClick: noop,
  onMobileNavClose: noop,
};

const MobileNavContext = React.createContext(initialContext);

export const useMobileNav = () => {
  const context = React.useContext(MobileNavContext);

  if (!context) {
    throw new Error("useMobileNav must be used within a MobileNavContext.Provider");
  }

  return context;
};

export const MobileNavProvider = ({ children }: React.PropsWithChildren) => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const onMobileNavClose = () => setIsNavOpen(false);
  const onMobileNavClick = () => setIsNavOpen((prev) => !prev);

  return (
    <MobileNavContext.Provider
      value={{
        isNavOpen,
        onMobileNavClick,
        onMobileNavClose,
      }}
    >
      {children}
    </MobileNavContext.Provider>
  );
};
