import * as React from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";

import { Image } from "./Image";
import classNames from "classnames";

export interface CardProps {
  title: string;
  price?: string | number;
  subTitle?: string;
  to: string;
  className?: string;
  imageProps: {
    src: SanityImageSource;
    alt: string;
    containerClassName?: string;
  };
}

export const Card: React.FC<CardProps> = ({
  to,
  subTitle,
  title,
  price,
  imageProps: { containerClassName, ...imageProps },
  className = "",
}) => {
  return (
    <Link href={to}>
      <a className={`flex flex-col justify-center text-blue group w-full ${className}`}>
        <span
          className={classNames(
            "rounded-xl group-hover:shadow-lg transition transition-shadow duration-150 overflow-hidden relative",
            containerClassName
          )}
        >
          <Image layout="fill" src={imageProps.src} alt={imageProps.alt} objectFit="cover" objectPosition="center" />
        </span>
        <h2 className="text-h5 font-medium mt-4 mb-1">{title}</h2>
        {price && <span className="text-eyebrow font-bold">${price}</span>}
        {subTitle && <span className="text-eyebrow">{subTitle}</span>}
      </a>
    </Link>
  );
};
