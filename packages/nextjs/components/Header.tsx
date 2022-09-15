import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";

import { useCart } from "./CartContext";
import { Search } from "./Search";

const NAV_ITEMS = [
  {
    href: "/products",
    label: "Products",
  },
  {
    href: "/categories",
    label: "Categories",
  },
];

export const Header = () => {
  const { cartTotal } = useCart();

  return (
    <div className="h-28 flex items-center justify-between px-6 border-b shadow">
      <div className="flex items-center">
        <Link href="/">
          <a>
            <img src="/Logo.svg" alt="Formidable Boulangerie" className="h-10" />
          </a>
        </Link>
        <nav className="ml-8">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link href={href} key={label}>
              <a className="text-blue text-body-reg mr-4 last:mr-0">{label}</a>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center">
        <Search />
        <Link href="/cart">
          <a className="flex items-center text-blue text-body-reg">
            <span>Cart</span>
            <FiShoppingCart size={24} className="mx-2" />
            <span>{cartTotal}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};
