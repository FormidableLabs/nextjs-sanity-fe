import * as React from "react";
import { Links } from "./async/common/links";

export default async function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <title>Test layout</title>
        <style>
          {`
          html {
            color: white;
            background: #333;
          }
        `}
        </style>
      </head>
      <body>
        <nav>
          <Links />
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
