import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio/metadata";
import { Studio } from "./studio";

export default function StudioPage() {
  return <Studio />;
}

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Formidable Boulangerie - Sanity Studio",
  description: "Integrated Sanity Studio dashboard for Formidable Boulangerie",
  viewport: `${studioMetadata.viewport}, interactive-widget=resizes-content`,
};
