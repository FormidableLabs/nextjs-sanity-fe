import Link from "next/link";
import React from "react";
import { MdShoppingCart } from "react-icons/md";

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
  {
    href: "/blogs",
    label: "Blogs",
  },
];

export const Header = () => {
  const { cartTotal } = useCart();

  return (
    <div className="h-20 flex items-center justify-between bg-white px-6 border-b shadow">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold">
          <Link href="/">
            <a>NextJs Ecom</a>
          </Link>
        </h2>
        <nav className="ml-8">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link href={href} key={label}>
              <a className="text-gray-600 text-xl hover:text-gray-900 mr-2">{label}</a>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center">
        <Search />
        <Link href="/cart">
          <a className="flex items-center">
            <MdShoppingCart size={30} /> <span className="text-gray-600 text-xl">{cartTotal}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};
