import * as React from "react";
import classNames from "classnames";
import { Cart, CartContent } from "../cart";
import { MobileHeaderItems } from "./MobileHeaderItems";
import { NAV_ITEMS } from "./NavItems";
import { MobileNavMenu } from "./MobileNavMenu";
import { DesktopNavItem } from "./DesktopNavItem";
import { Logo } from "./Logo";

type HeaderProps = {
  ProductListLink: JSX.Element;
  LinkElement?: React.ElementType;
  currentRoute: string;
};

export const Header = ({
  currentRoute,
  LinkElement,
  ProductListLink,
  children,
}: React.PropsWithChildren<HeaderProps>) => {
  const Link = LinkElement || "a";
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const onMobileNavClick = () => setIsNavOpen((prev) => !prev);
  const onMobileNavClose = () => setIsNavOpen(false);

  React.useEffect(() => {
    document.body.classList[isNavOpen ? "add" : "remove"]("overflow-hidden");
  }, [isNavOpen]);

  return (
    <header className={classNames("sticky top-0 z-10 flex flex-col", isNavOpen && "h-screen")}>
      <nav className="h-[66px] sm:h-[110px] border-b-2 border-b-primary bg-secondary shadow transition-all text-primary">
        <div className="h-full container flex items-center justify-between px-6">
          <div className="flex items-center">
            <Link href="/" onClick={onMobileNavClose}>
              <Logo className="w-24" />
            </Link>
            <ul className="ml-8 hidden sm:flex sm:flex-1">
              {/* Desktop Nav */}
              {NAV_ITEMS.map(({ href, label }) => (
                <DesktopNavItem
                  as={LinkElement}
                  isActive={currentRoute === href}
                  key={`${href}-${label}`}
                  href={href}
                  label={label}
                />
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            {children}
            <Cart onMobileNavClose={onMobileNavClose}>
              <CartContent ProductListLink={ProductListLink} />
            </Cart>
            <MobileNavMenu navOpen={isNavOpen} onMobileNavClick={onMobileNavClick} />
          </div>
        </div>
      </nav>
      <MobileHeaderItems as={LinkElement} currentRoute={currentRoute} navOpen={isNavOpen} onClick={onMobileNavClose} />
    </header>
  );
};
