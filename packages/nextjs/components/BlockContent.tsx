import { PortableText, PortableTextProps } from "@portabletext/react";

type Props = PortableTextProps & {
  className?: string;
};

export const BlockContent: React.FC<Props> = ({ className = "", ...props }) => {
  return (
    <div className={`prose ${className}`}>
      <PortableText {...props} />
    </div>
  );
};
