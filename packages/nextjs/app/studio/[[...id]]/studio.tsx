"use client";

import { NextStudio } from "next-sanity/studio";
import sanityConfig from "sanity-studio/sanity.config";

// @ts-expect-error -- something weird about the plugin types not matching
export const Studio = () => <NextStudio config={sanityConfig} />;
