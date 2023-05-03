"use client";
import * as React from "react";
import { RootProviders } from "../root-providers";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,400,300&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width" />
        <title>This is a test layout</title>
      </head>
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
