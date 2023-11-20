import classNames from "classnames";
import { PolymorphicComponentProps } from "../../utils";

type BaseProps = {
  label: string;
  href: string;
  isActive: boolean;
};

type DesktopNavItemProps<AsComponent extends React.ElementType> = PolymorphicComponentProps<AsComponent, BaseProps>;

export const DesktopNavItem = <T extends React.ElementType>({
  as,
  label,
  isActive,
  ...linkProps
}: React.PropsWithChildren<DesktopNavItemProps<T>>) => {
  const Component = as || "a";

  return (
    <li
      key={label}
      className={classNames(
        "text-primary text-body-reg mr-1 last:mr-0 py-1 px-4 rounded-2xl relative border-2 transition transition-colors duration-300",
        isActive ? "border-primary" : "border-[transparent]"
      )}
    >
      <Component {...linkProps}>{label}</Component>
    </li>
  );
};
