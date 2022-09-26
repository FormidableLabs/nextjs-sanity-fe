import { ReactNode } from "react";

export const H3 = ({ children }: { children: ReactNode }) => {
  return <h3 className="font-medium text-h3 text-blue">{children}</h3>;
};
