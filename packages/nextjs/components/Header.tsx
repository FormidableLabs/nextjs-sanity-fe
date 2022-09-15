import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { MdClose } from "react-icons/md";

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
  const [navOpen, setNavOpen] = useState(false);
  const { cartTotal } = useCart();

  const onMobileNavClick = () => setNavOpen((prev) => !prev);

  const onMobileNavClose = () => setNavOpen(false);

  return (
    <>
      <nav className="h-16 sm:h-28 flex items-center justify-between px-6 border-b border-b-blue shadow transition-all">
        <div className="flex items-center">
          <Link href="/">
            <a onClick={onMobileNavClose}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Logo.svg" alt="Formidable Boulangerie" className="h-10" />
            </a>
          </Link>
          <ul className="ml-8 hidden sm:flex">
            {/* Desktop Nav */}
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={label} className="text-blue text-body-reg mr-4 last:mr-0">
                <Link href={href}>
                  <a>{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center">
          <Search />
          <Link href="/cart">
            <a className="flex items-center text-blue text-body-reg" onClick={onMobileNavClose}>
              <span className="hidden sm:hidden">Cart</span>
              <FiShoppingCart size={24} className="mx-2" />
              <span>{cartTotal}</span>
            </a>
          </Link>

          {/* Mobile Nav */}
          <div className="sm:hidden">
            <button
              type="button"
              className="flex ml-4 text-blue"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={onMobileNavClick}
            >
              <span className="sr-only">Open Main Menu</span>
              {navOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      <ul
        className={classNames("flex", "flex-col", "sm:hidden", "bg-yellow", "text-blue", "transition-all", {
          "h-full": navOpen === true,
          "max-h-0": navOpen === false,
        })}
      >
        {navOpen &&
          NAV_ITEMS?.map(({ label, href }) => {
            return (
              <li key={href} className={`border-b border-b-blue text-h4 py-4 px-3`}>
                <Link href={href}>
                  <a className="text-xl" onClick={onMobileNavClose}>
                    {label}
                  </a>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};
