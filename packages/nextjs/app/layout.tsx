import { Footer, MobileNavProvider } from "shared-ui";
import "./global.css";
import { Header } from "app/components/Header/Header";
import { Metadata } from "next";
import { CartProvider } from "app/components/CartContext";
import { AnimatePresence, MotionConfig } from "./ui/framer";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Formidable Boulangerie",
};

export const viewport = {
  width: "device-width",
};

const cabinetFont = localFont({
  src: [
    {
      path: "../assets/fonts/cabinetgrotesk/cabinetgrotesk-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/cabinetgrotesk/cabinetgrotesk-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/cabinetgrotesk/cabinetgrotesk-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/cabinetgrotesk/cabinetgrotesk-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cabinet",
});

const jeanLuc = localFont({
  src: [
    {
      path: "../assets/fonts/jeanluc/jeanlucweb-bold.woff",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../assets/fonts/jeanluc/jeanlucweb-thin.woff",
      weight: "normal",
      style: "normal",
    },
  ],
  variable: "--font-jeanLuc",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cabinetFont.variable} ${jeanLuc.variable}`}>
      <body>
        <MotionConfig reducedMotion="user">
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <MobileNavProvider>
                <Header />
              </MobileNavProvider>
              <main className="flex-1">
                <AnimatePresence initial={false} mode="wait">
                  {children}
                </AnimatePresence>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
