import * as React from "react";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";

import { CartProvider } from "../components/CartContext";
import { Layout } from "../components/Layout";

import "../styles/global.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <AnimatePresence initial={false} mode="wait" onExitComplete={onExitComplete}>
          <PageWrapper key={router.route}>
            <Component {...pageProps} />
          </PageWrapper>
        </AnimatePresence>
      </Layout>
    </CartProvider>
  );
}

const PageWrapper = ({ children }: React.PropsWithChildren<{}>) => {
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

const onExitComplete = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default MyApp;
