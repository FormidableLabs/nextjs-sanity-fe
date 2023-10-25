import * as React from "react";

interface Props {
  className?: string;
}

export const Eyebrow = ({ children, className = "" }: React.PropsWithChildren<Props>) => {
  return <div className={`font-jeanLuc font-bold text-eyebrow text-primary ${className}`}>{children}</div>;
};
