import * as React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { AnimatePresence, MotionConfig } from "framer-motion";

import { CartProvider } from "../components/CartContext";
import { Layout } from "../components/Layout";
import "../styles/global.css";
import { FadeInOut } from "../components/FadeInOut";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("mocks/msw/msw-enable");
}

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
              <FadeInOut key={router.route}>
                <Component {...pageProps} />
              </FadeInOut>
            </AnimatePresence>
          </Layout>
        </CartProvider>
      </MotionConfig>
    </>
  );
}

export default MyApp;
