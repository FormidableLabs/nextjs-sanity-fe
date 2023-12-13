"use client";

import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FadeInOut } from "shared-ui";

const AnimatedProductDetail = ({ children }: React.PropsWithChildren) => {
  const query = useSearchParams();
  const variant = query?.get("variant");

  return (
    <AnimatePresence initial={false} mode="wait">
      <React.Fragment key={`${query?.get("slug")}:${variant}`}>
        <FadeInOut>{children}</FadeInOut>
      </React.Fragment>
    </AnimatePresence>
  );
};

export default AnimatedProductDetail;
