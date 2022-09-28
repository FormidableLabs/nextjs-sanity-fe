import Link from "next/link";
import React, { useState } from "react";
import { Cart } from "./Cart";
import { useCart } from "../CartContext";
import { Search } from "../Search";
import { MobileHeaderItems } from "./MobileHeaderItems";
import { NAV_ITEMS } from "./NavItems";
import { MobileNavMenu } from "./MobileNavMenu";
import { DesktopNavItem } from "./DesktopNavItem";

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartTotal, isFetchingCartItems } = useCart();

  const onMobileNavClick = () => setNavOpen((prev) => !prev);
  const onMobileNavClose = () => setNavOpen(false);

  return (
    <>
      <nav className="h-[66px] sm:h-[110px] border-b-2 border-b-blue bg-yellow shadow transition-all sticky top-0 z-10">
        <div className="h-full container flex items-center justify-between px-6">
          <div className="flex items-center">
            <Link href="/">
              <a onClick={onMobileNavClose}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Logo.svg" alt="Formidable Boulangerie" className="h-10" />
              </a>
            </Link>
            <ul className="ml-8 hidden sm:flex sm:flex-1">
              {/* Desktop Nav */}
              {NAV_ITEMS.map(({ href, label }) => (
                <DesktopNavItem key={`${href}-${label}`} href={href} label={label} />
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <Search />
            <Cart
              cartTotal={cartTotal}
              onMobileNavClose={onMobileNavClose}
              isFetchingCartItems={isFetchingCartItems}
              openCart={() => setIsCartOpen(true)}
              isCartOpen={isCartOpen}
              onCartClose={() => setIsCartOpen(false)}
            />
            <MobileNavMenu navOpen={navOpen} onMobileNavClick={onMobileNavClick} />
          </div>
        </div>
      </nav>
      <MobileHeaderItems navOpen={navOpen} onMobileNavClose={onMobileNavClose} />
    </>
  );
};