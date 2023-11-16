import * as React from "react";
import Head from "next/head";
import { Footer } from "shared-ui";
import { Header } from "./Header/Header";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Formidable Boulangerie</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};
