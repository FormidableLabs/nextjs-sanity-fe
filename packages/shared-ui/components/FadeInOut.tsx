import * as React from "react";
import { motion } from "framer-motion";

export const FadeInOut = ({
  children,
  className,
  layoutId,
}: React.PropsWithChildren<{ className?: string; layoutId?: string }>) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0.7, transition: { duration: 0.2 } }}
      className={className}
      layoutId={layoutId}
    >
      {children}
    </motion.div>
  );
};
