import Link from "next/link";
import { FiShoppingCart, FiLoader } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

type CartProps = {
  onMobileNavClose: () => void;
  isFetchingCartItems: boolean;
  cartTotal: number;
};

export const Cart = ({ cartTotal, onMobileNavClose, isFetchingCartItems }: CartProps) => (
  <Link href="/cart">
    <a className="flex items-center text-blue text-body-reg gap-1" onClick={onMobileNavClose}>
      <span className="hidden sm:block">Cart</span>
      <AnimatePresence mode="popLayout">
        {isFetchingCartItems ? (
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
            <span>{cartTotal}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  </Link>
);
