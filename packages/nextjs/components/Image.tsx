import type { ImageProps, ImageLoaderProps } from "next/image";
import * as React from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import NextImage from "next/image";
import { imageBuilder } from "utils/sanityClient";

interface Props extends Omit<ImageProps, "src"> {
  src: SanityImageSource;
}

const sanityLoader = (sanitySrc: SanityImageSource, { width, quality }: ImageLoaderProps) => {
  const url = imageBuilder
    .image(sanitySrc)
    .width(width)
    .quality(quality || 100)
    .auto("format")
    .url();

  return url;
};

export const Image = (props: Props) => {
  const baseURL = "https://cdn.sanity.io/images/";
  const { className, ...rest } = props;

  if (!props.src) return null;

  return (
    <NextImage
      loader={(p) => sanityLoader(props.src, p)}
      {...rest}
      src={imageBuilder.image(props?.src).url()?.toString().replace(baseURL, "") ?? ""}
      className={`${className} max-w-full`}
    />
  );
};
