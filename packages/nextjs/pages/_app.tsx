import * as React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

import { CartProvider } from "../components/CartContext";
import { Layout } from "../components/Layout";
import "../styles/global.css";
import { PageTransitionWrapper } from "../components/PageTransitionWrapper";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <MotionConfig reducedMotion="user">
        <CartProvider>
          <Layout>
            <AnimatePresence initial={false} mode="wait">
              <PageTransitionWrapper key={router.route}>
                <Component {...pageProps} />
              </PageTransitionWrapper>
            </AnimatePresence>
          </Layout>
        </CartProvider>
      </MotionConfig>
    </>
  );
}

export default MyApp;
