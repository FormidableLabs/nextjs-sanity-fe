import type { ImageProps, ImageLoaderProps } from "next/legacy/image";
import * as React from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import NextImage from "next/legacy/image";
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

  if (!props.src) return null;

  return (
    <NextImage
      loader={(p) => sanityLoader(props.src, p)}
      {...props}
      src={imageBuilder.image(props?.src).url()?.toString().replace(baseURL, "") ?? ""}
    />
  );
};
