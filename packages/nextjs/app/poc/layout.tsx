import * as React from "react";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <title>This is a test layout</title>
      </head>
      <body>
        <nav>This comes from the test layout</nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
