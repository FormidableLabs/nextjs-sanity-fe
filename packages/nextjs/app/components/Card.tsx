import * as React from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link, { LinkProps } from "next/link";
import { Image } from "../../components/Image";
import { Card as BaseCard } from "../ui/shared-ui";

export interface CardProps {
  title: string;
  price?: number;
  subTitle?: string;
  to: LinkProps["href"];
  className?: string;
  imageProps: {
    src: SanityImageSource;
    alt: string;
    priority?: boolean;
    sizes?: string;
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
      price={price}
      imageContainerClass={containerClassName}
      as={Link}
      href={to}
      className={className}
    >
      <Image
        fill
        src={imageProps.src}
        alt={imageProps.alt}
        sizes={imageProps.sizes}
        priority={imageProps.priority}
        className="object-cover object-center"
      />
    </BaseCard>
  );
};
