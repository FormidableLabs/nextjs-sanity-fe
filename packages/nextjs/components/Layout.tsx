import Head from "next/head";
import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Formidable Boulangerie</title>
      </Head>
      <div className="h-screen flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto w-full">{children}</main>
        <Footer />
      </div>
    </>
  );
};
