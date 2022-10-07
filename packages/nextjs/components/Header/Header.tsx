import * as React from "react";
import Link from "next/link";
import { Cart } from "./Cart";
import { useCart } from "../CartContext";
import { Search } from "../Search";
import { MobileHeaderItems } from "./MobileHeaderItems";
import { NAV_ITEMS } from "./NavItems";
import { MobileNavMenu } from "./MobileNavMenu";
import { DesktopNavItem } from "./DesktopNavItem";
import { Logo } from "./Logo";
import classNames from "classnames";

type HeaderProps = {
  isNavOpen: boolean;
  onMobileNavClick: () => void;
  onMobileNavClose: () => void;
};

export const Header = ({ isNavOpen, onMobileNavClose, onMobileNavClick }: HeaderProps) => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const { cartTotal, isFetchingCartItems } = useCart();

  return (
    <div className={classNames("sticky top-0 z-10 flex flex-col", isNavOpen && "h-screen")}>
      <nav className="h-[66px] sm:h-[110px] border-b-2 border-b-primary bg-secondary shadow transition-all text-primary">
        <div className="h-full container flex items-center justify-between px-6">
          <div className="flex items-center">
            <Link href="/">
              <a onClick={onMobileNavClose}>
                <Logo className="w-24" />
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
            <MobileNavMenu navOpen={isNavOpen} onMobileNavClick={onMobileNavClick} />
          </div>
        </div>
      </nav>
      <MobileHeaderItems navOpen={isNavOpen} onMobileNavClose={onMobileNavClose} />
    </div>
  );
};
