import React from "react";
import Link from "next/link";

type BreadcrumbItemProps = React.PropsWithChildren & {
  href: string;
  isLast?: boolean;
};

export const BreadcrumbItem = ({ children, href, isLast = false }: BreadcrumbItemProps) => {
  if (isLast) {
    return <div className="flex flex-row items-center">{children}</div>;
  }

  return <Link href={href} className="flex flex-row items-center">{children}</Link>;
};
