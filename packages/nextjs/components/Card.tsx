import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";

import { Image } from "./Image";

interface Props {
  title: string;
  price?: string | number;
  subTitle?: string;
  to: string;
  className?: string;
  imageProps: {
    src: SanityImageSource;
    alt: string;
  };
}

export const Card: React.FC<Props> = ({ to, subTitle, title, price, imageProps, className = "" }) => {
  return (
    <Link href={to}>
      <a className={`flex flex-col justify-center text-blue ${className}`}>
        <Image className="rounded-2xl" width={400} height={400} src={imageProps.src} alt={imageProps.alt} />
        <h2 className="text-h6 mt-4 mb-1">{title}</h2>
        {price && <span className="text-eyebrow font-bold">${price}</span>}
        {subTitle && <span className="text-eyebrow">{subTitle}</span>}
      </a>
    </Link>
  );
};
