import * as React from "react";
import classNames from "classnames";
import { MobileHeaderItems } from "./MobileHeaderItems";
import { useMobileNav } from "../MobileNav/MobileNavContext";

type HeaderProps = {
  LinkElement?: React.ElementType;
  currentRoute: string;
};

export const Header = ({ currentRoute, LinkElement, children }: React.PropsWithChildren<HeaderProps>) => {
  const { isNavOpen, onMobileNavClose } = useMobileNav();

  React.useEffect(() => {
    document.body.classList[isNavOpen ? "add" : "remove"]("overflow-hidden");
  }, [isNavOpen]);

  return (
    <header className={classNames("sticky top-0 z-10 flex flex-col", isNavOpen && "h-screen")}>
      <nav className="h-[66px] sm:h-[110px] border-b-2 border-b-primary bg-secondary shadow transition-all text-primary">
        <div className="h-full container flex items-center justify-between px-6">{children}</div>
      </nav>
      <MobileHeaderItems as={LinkElement} currentRoute={currentRoute} navOpen={isNavOpen} onClick={onMobileNavClose} />
    </header>
  );
};
