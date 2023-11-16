import classNames from "classnames";
import { NAV_ITEMS } from "./NavItems";
import { PolymorphicComponentProps } from "../../utils";

type BaseProps = {
  navOpen: boolean;
  currentRoute: string;
};

type MobileHeaderItemsProps<AsComponent extends React.ElementType> = PolymorphicComponentProps<AsComponent, BaseProps>;

export const MobileHeaderItems = <T extends React.ElementType>({
  as,
  currentRoute,
  navOpen,
  ...linkProps
}: MobileHeaderItemsProps<T>) => {
  const Link = as || "a";

  return (
    <ul className="flex-1 flex flex-col sm:hidden bg-secondary text-primary transition-all">
      {navOpen &&
        NAV_ITEMS?.map(({ label, href }) => {
          return (
            <li
              key={href}
              className={classNames("border-b border-b-primary text-h5 py-4 px-3", {
                "font-bold": currentRoute === href,
              })}
            >
              <Link {...linkProps}>{label}</Link>
            </li>
          );
        })}
    </ul>
  );
};
