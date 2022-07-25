import { PortableText, PortableTextProps } from "@portabletext/react";

type Props = PortableTextProps;

export const BlockContent: React.FC<Props> = (props) => {
  return (
    <div className="prose">
      <PortableText {...props} />
    </div>
  );
};
