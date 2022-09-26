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
      <div className="h-screen flex flex-col">
        <div className="w-full fixed z-10 bg-yellow">
          <Header />
        </div>
        <div className="w-full sm:pt-[142px] pt-[98px]">
          <main className="w-full">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};
