import * as React from "react";
import { PortableText, PortableTextProps } from "@portabletext/react";

type Props = PortableTextProps & {
  className?: string;
};

export const BlockContent = ({ className = "", ...props }: React.PropsWithChildren<Props>) => {
  return (
    <div className={`prose ${className}`}>
      <PortableText {...props} />
    </div>
  );
};
