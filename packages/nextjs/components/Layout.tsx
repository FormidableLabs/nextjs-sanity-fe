import Head from "next/head";
import React from "react";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Formidable Boulangerie</title>
      </Head>
      <Header />
      <main className="w-full">{children}</main>
      <Footer />
    </>
  );
};
