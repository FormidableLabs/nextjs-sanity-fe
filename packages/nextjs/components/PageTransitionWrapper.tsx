import * as React from "react";
import { motion } from "framer-motion";

export const PageTransitionWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
      exit={{ opacity: 0.7, y: 10, transition: { duration: 0.15 } }}
    >
      {children}
    </motion.main>
  );
};
