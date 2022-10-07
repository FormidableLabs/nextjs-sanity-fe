import * as React from "react";
import Head from "next/head";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";

export const Layout = ({ children }: React.PropsWithChildren) => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const onMobileNavClick = () => setIsNavOpen((prev) => !prev);
  const onMobileNavClose = () => setIsNavOpen(false);

  React.useEffect(() => {
    document?.body?.classList?.[isNavOpen ? "add" : "remove"]?.("overflow-hidden");
  }, [isNavOpen]);

  return (
    <>
      <Head>
        <title>Formidable Boulangerie</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header isNavOpen={isNavOpen} onMobileNavClick={onMobileNavClick} onMobileNavClose={onMobileNavClose} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};
