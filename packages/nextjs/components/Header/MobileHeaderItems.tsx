import { NAV_ITEMS } from "./NavItems";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
type MobileHeaderItemsProps = {
  navOpen: boolean;
  onMobileNavClose: () => void;
};

export const MobileHeaderItems = ({ navOpen, onMobileNavClose }: MobileHeaderItemsProps) => {
  const router = useRouter();

  return (
    <ul
      className={classNames("flex", "flex-col", "sm:hidden", "bg-secondary", "text-primary", "transition-all", {
        "h-screen": navOpen === true,
        "max-h-0": navOpen === false,
      })}
    >
      {navOpen &&
        NAV_ITEMS?.map(({ label, href }) => {
          return (
            <li
              key={href}
              className={classNames("border-b border-b-primary text-h5 py-4 px-3", {
                "font-bold": router.pathname === href,
              })}
            >
              <Link href={href}>
                <a onClick={onMobileNavClose}>{label}</a>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};
