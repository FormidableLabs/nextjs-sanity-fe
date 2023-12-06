import { ImageLoader } from "next/image";

// Note: The ?width query param doesn't actually do anything, but Next.js expects you to use it.
//   Adding it in here as a reminder that you _should_ use it in the case of custom loaders.
export const localImageLoader: ImageLoader = ({ src, width }) => `${src}?width=${width}`;
