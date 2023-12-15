"use client";

import { FadeInOut } from "shared-ui";

// TODO: exit animations currently do not work in next app router
export default function Template({ children }: { children: React.ReactNode }) {
  return <FadeInOut>{children}</FadeInOut>;
}
