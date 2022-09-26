import { NAV_ITEMS } from "./NavItems";
import classNames from "classnames";
import Link from "next/link";
type MobileHeaderItemsProps = {
  navOpen: boolean;
  onMobileNavClose: () => void;
};

export const MobileHeaderItems = ({ navOpen, onMobileNavClose }: MobileHeaderItemsProps) => {
  return (
    <ul
      className={classNames("flex", "flex-col", "sm:hidden", "bg-yellow", "text-blue", "transition-all", {
        "h-screen": navOpen === true,
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
  );
};
