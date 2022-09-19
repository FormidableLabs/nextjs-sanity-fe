import "../styles/global.css";

import { CartProvider } from "../components/CartContext";
import { Layout } from "../components/Layout";

import type { AppProps, NextWebVitalsMetric } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

/**
 * A NextJs built-in function which allows for logging of the web-vitals
 * more info: https://nextjs.org/docs/advanced-features/measuring-performance
 * Web Vitals: https://web.dev/vitals/
 * @param metric
 */
export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

export default MyApp;
