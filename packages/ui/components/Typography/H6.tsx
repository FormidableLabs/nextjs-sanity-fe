import * as React from "react";
import classNames from "classnames";

export const H6 = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => {
  return <h6 className={classNames("font-medium text-h6 text-primary", className)}>{children}</h6>;
};
