import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

type CartProps = {
  onMobileNavClose: () => void;
  cartTotal: number;
};

export const Cart = ({ cartTotal, onMobileNavClose }: CartProps) => (
  <Link href="/cart">
    <a className="flex items-center text-blue text-body-reg" onClick={onMobileNavClose}>
      <span className="hidden sm:block">Cart</span>
      <FiShoppingCart size={24} className="mx-2" />
      <span>{cartTotal}</span>
    </a>
  </Link>
);
