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
      <a className={`flex flex-col justify-center text-blue group ${className}`}>
        <span className="rounded-xl group-hover:shadow-lg transition transition-shadow duration-150 overflow-hidden">
          <Image
            layout="responsive"
            width={imageProps.width ?? 500}
            height={imageProps.height ?? 500}
            src={imageProps.src}
            alt={imageProps.alt}
            objectFit="cover"
          />
        </span>
        <h2 className="text-h5 font-medium mt-4 mb-1">{title}</h2>
        {price && <span className="text-eyebrow font-bold">${price}</span>}
        {subTitle && <span className="text-eyebrow">{subTitle}</span>}
      </a>
    </Link>
  );
};
