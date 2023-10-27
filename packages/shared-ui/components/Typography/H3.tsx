import * as React from "react";

export const H3 = ({ children }: React.PropsWithChildren) => {
  return <h3 className="font-medium text-h3 text-primary">{children}</h3>;
};
