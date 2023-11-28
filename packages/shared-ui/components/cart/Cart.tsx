import * as React from "react";
import { FiShoppingCart, FiLoader } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";

type CartProps = {
  onMobileNavClose: () => void;
};

export const Cart = ({ onMobileNavClose, children }: React.PropsWithChildren<CartProps>) => {
  const { isCartOpen, cartPopupRef, toggleCartOpen, isLoading, totalQuantity } = useCart();

  React.useEffect(() => {
    if (!isCartOpen) return;

    // Click outside
    const handleClick = (evt: MouseEvent) => {
      const hit = evt.target;
      if (!(hit instanceof Node && hit instanceof Element)) return;

      if (hit.closest(".cart-popup") !== cartPopupRef?.current) {
        toggleCartOpen(false);
      }
    };
    window.addEventListener("click", handleClick);

    // Esc-key
    const handleKeyup = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") toggleCartOpen(false);
    };
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [isCartOpen]);

  return (
    <div className="relative">
      <button
        className="flex items-center text-primary text-body-reg gap-1"
        onClick={(e) => {
          e.stopPropagation();
          onMobileNavClose();
          toggleCartOpen(true);
        }}
        data-testid="cart"
      >
        <span className="sr-only">Cart</span>
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <motion.div key="loader" exit={{ opacity: 0, scale: 0.4 }}>
              <FiLoader size={20} className="motion-safe:animate-[spin_2s_ease-in-out_infinite]" />
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              className="flex items-center"
              initial={{ scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
            >
              <FiShoppingCart size={24} className="mx-2" />
              <span>{totalQuantity}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            ref={cartPopupRef}
            className="cart-popup fixed inset-0 sm:absolute bg-secondary sm:top-10 sm:right-0 sm:left-[inherit] sm:bottom-[inherit] sm:w-[400px] sm:max-h-[calc(100vh-100px)] sm:shadow-lg sm:rounded sm:border border-primary flex cursor-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
