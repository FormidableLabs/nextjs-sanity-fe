import * as React from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";

import { Image } from "./Image";

export interface CardProps {
  title: string;
  price?: string | number;
  subTitle?: string;
  to: string;
  className?: string;
  imageProps: {
    src: SanityImageSource;
    alt: string;
    width?: number;
    height?: number;
  };
}

export const Card: React.FC<CardProps> = ({ to, subTitle, title, price, imageProps, className = "" }) => {
  return (
    <Link href={to}>
      <a className={`flex flex-col justify-center text-blue ${className}`}>
        <Image
          className="rounded-2xl"
          width={imageProps.width ?? 400}
          height={imageProps.height ?? 400}
          src={imageProps.src}
          alt={imageProps.alt}
        />
        <h2 className="text-h5 font-medium mt-4 mb-1">{title}</h2>
        {price && <span className="text-eyebrow font-bold">${price}</span>}
        {subTitle && <span className="text-eyebrow">{subTitle}</span>}
      </a>
    </Link>
  );
};
