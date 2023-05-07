import * as React from "react";

export default function RootLayout({ children }: React.PropsWithChildren) {
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
        <main>{children}</main>
      </body>
    </html>
  );
}
