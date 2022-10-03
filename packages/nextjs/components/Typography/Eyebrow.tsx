import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Eyebrow = ({ children, className = "" }: Props) => {
  return <div className={`font-jeanLuc font-bold text-eyebrow text-primary ${className}`}>{children}</div>;
};
