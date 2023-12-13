"use client"; // TODO: move down the tree

import * as React from "react";
import Link from "next/link";
import { Button, useCart, Header as BaseHeader, useMobileNav } from "shared-ui";
import { Search } from "app/components/Search";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "shared-ui";
import { DesktopNavItem } from "shared-ui";
import { Cart } from "shared-ui";
import { CartContent } from "shared-ui";
import { Logo } from "shared-ui";
import { MobileNavMenu } from "shared-ui";

export const Header = () => {
  const { toggleCartOpen } = useCart();
  const pathname = usePathname() || "";
  const { onMobileNavClose } = useMobileNav();

  return (
    <BaseHeader LinkElement={Link} currentRoute={pathname}>
      <div className="flex items-center">
        <Link href="/" onClick={onMobileNavClose}>
          <Logo className="w-24" />
        </Link>
        <ul className="ml-8 hidden sm:flex sm:flex-1">
          {/* Desktop Nav */}
          {NAV_ITEMS.map(({ href, label }) => (
            <DesktopNavItem as={Link} isActive={pathname === href} key={`${href}-${label}`} href={href} label={label} />
          ))}
        </ul>
      </div>
      <div className="flex items-center">
        <Search />
        <Cart onMobileNavClose={onMobileNavClose}>
          <CartContent
            ProductListLink={
              <Link href="/products" passHref legacyBehavior>
                <Button as="a" variant="secondary" onClick={() => toggleCartOpen(false)}>
                  View Products
                </Button>
              </Link>
            }
          />
        </Cart>
        <MobileNavMenu />
      </div>
    </BaseHeader>
  );
};
