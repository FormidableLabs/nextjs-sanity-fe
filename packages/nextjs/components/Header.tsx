import Link from "next/link";
import React from "react";
import { MdShoppingCart } from "react-icons/md";

import { useCart } from "./CartContext";

export const Header = () => {
  const { cart } = useCart();

  return (
    <div className="h-20 flex items-center justify-between bg-white px-6 border-b shadow">
      <h2 className="text-2xl font-bold">
        <Link href="/">
          <a>NextJs Ecom</a>
        </Link>
      </h2>
      <Link href="/cart">
        <a className="flex items-center">
          <MdShoppingCart size={30} /> <span className="text-gray-600 text-xl">{Object.keys(cart).length}</span>
        </a>
      </Link>
    </div>
  );
};
