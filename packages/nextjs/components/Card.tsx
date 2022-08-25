import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";

import { Image } from "./Image";

interface Props {
  children: React.ReactNode;
  to: string;
  className?: string;
  imageProps: {
    src: SanityImageSource;
    alt: string;
  };
}

export const Card: React.FC<Props> = ({ to, children, imageProps, className = "" }) => {
  return (
    <Link href={to}>
      <a className={`hover:shadow-lg border flex flex-col items-center justify-center ${className}`}>
        <Image width={400} height={400} src={imageProps.src} alt={imageProps.alt} />
        <h2 className="text-xl font-bold my-2">{children}</h2>
      </a>
    </Link>
  );
};
