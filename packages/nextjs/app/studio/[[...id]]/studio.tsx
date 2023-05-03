"use client";

import { NextStudio } from "next-sanity/studio";
import sanityConfig from "sanity-studio/sanity.config";

export const Studio = () => <NextStudio config={sanityConfig} />;
