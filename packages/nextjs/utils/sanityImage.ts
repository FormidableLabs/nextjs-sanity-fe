import { q, sanityImage } from "groqd";

export const sanityImagesSelection = (): any =>
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
    ? q("images").filter().deref()
    : sanityImage("images", { isList: true, withCrop: true, withHotspot: true });

export const sanityImageSelection = (): any =>
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled" ? q("images").deref() : sanityImage("images");
