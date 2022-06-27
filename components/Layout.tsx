import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto">{children}</main>
      <Footer />
    </div>
  );
};
