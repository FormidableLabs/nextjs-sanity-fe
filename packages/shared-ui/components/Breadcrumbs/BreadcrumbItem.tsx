import React from "react";
import { PolymorphicComponentProps } from "../../utils/polymorphicComponent";

type BaseProps = {
  isLast?: boolean;
};

type BreadcrumbItemProps<AsComponent extends React.ElementType> = PolymorphicComponentProps<AsComponent, BaseProps>;

export const BreadcrumbItem = <T extends React.ElementType>({
  as,
  children,
  isLast = false,
  ...linkProps
}: React.PropsWithChildren<BreadcrumbItemProps<T>>) => {
  const Component = as || "a";
  if (isLast) {
    return <div className="flex flex-row items-center">{children}</div>;
  }

  return (
    <Component {...linkProps} className="flex flex-row items-center">
      {children}
    </Component>
  );
};
