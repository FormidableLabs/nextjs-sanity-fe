import { ReactNode } from "react";

export const H6 = ({ children }: { children: ReactNode }) => {
  return <h3 className="font-medium text-h6 text-blue">{children}</h3>;
};
