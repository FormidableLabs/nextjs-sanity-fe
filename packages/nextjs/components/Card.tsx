import * as React from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link, { LinkProps } from "next/link";
import { Image } from "./Image";
import { Card as BaseCard } from "shared-ui";

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
    <BaseCard
      title={title}
      subTitle={subTitle}
      to={to.toString()}
      price={price}
      className={className}
      imageContainerClass={containerClassName}
      Link={Link}
    >
      <Image layout="fill" src={imageProps.src} alt={imageProps.alt} objectFit="cover" objectPosition="center" />
    </BaseCard>
  );
};
