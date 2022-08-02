import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import NextImage from "next/image";

import { imageBuilder } from "../utils/sanityClient";

import type { ImageProps, ImageLoaderProps } from "next/image";

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

export const Image: React.FC<Props> = (props) => {
  const baseURL = "https://cdn.sanity.io/images/";

  return (
    <NextImage
      loader={(p) => sanityLoader(props.src, p)}
      {...props}
      src={imageBuilder.image(props?.src).url()?.toString().replace(baseURL, "") ?? ""}
    />
  );
};
