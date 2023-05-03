"use client";

import * as React from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { usePathname, useParams, useRouter } from "next/navigation";
import { RouterContext } from "next/dist/shared/lib/router-context";

import { CartProvider } from "components/CartContext";
import { Layout } from "components/Layout";
import "styles/global.css";
import { FadeInOut } from "components/FadeInOut";

// if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   require("mocks/msw/msw-enable");
// }

export function RootProviders({ children }: React.PropsWithChildren) {
  const route = usePathname();
  return (
    <NextRouterAdapter>
      <MotionConfig reducedMotion="user">
        <CartProvider>
          <Layout>
            <AnimatePresence initial={false} mode="wait">
              <FadeInOut key={route}>{children}</FadeInOut>
            </AnimatePresence>
          </Layout>
        </CartProvider>
      </MotionConfig>
    </NextRouterAdapter>
  );
}

function NextRouterAdapter({ children }: React.PropsWithChildren) {
  const router = {
    ...useRouter(),
    pathname: usePathname()!,
    query: useParams()!,
    isLocaleDomain: false,
  };
  // @ts-expect-error - Ignore this mock
  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
}
