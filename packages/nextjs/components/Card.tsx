import * as React from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link, { LinkProps } from "next/link";

import { Image } from "./Image";
import classNames from "classnames";
import { currencyFormatter } from "utils/currencyFormatter";

export interface CardProps {
  title: string;
  price?: number;
  subTitle?: string;
  to: LinkProps["href"];
  className?: string;
  imageProps: {
    src: SanityImageSource;
    alt: string;
    containerClassName?: string;
  };
}

export const Card = ({
  to,
  subTitle,
  title,
  price,
  imageProps: { containerClassName, ...imageProps },
  className = "",
}: CardProps) => {
  return (
    <Link href={to}>
      <a className={`flex flex-col justify-center text-primary group w-full ${className}`}>
        <span
          className={classNames(
            "rounded-xl group-hover:shadow-lg transition transition-shadow duration-150 overflow-hidden relative",
            containerClassName
          )}
        >
          <Image layout="fill" src={imageProps.src} alt={imageProps.alt} objectFit="cover" objectPosition="center" />
        </span>
        <h2 className="text-h5 font-medium mt-4 mb-1">{title}</h2>
        {price && <span className="text-eyebrow font-bold">{currencyFormatter.format(price)}</span>}
        {subTitle && <span className="text-eyebrow">{subTitle}</span>}
      </a>
    </Link>
  );
};
