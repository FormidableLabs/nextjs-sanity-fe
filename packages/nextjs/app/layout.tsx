import { Footer, MobileNavProvider } from "./ui/shared-ui";
import "./global.css";
import { Header } from "components/Header/Header";
import { Metadata } from "next";
import { CartProvider } from "components/CartContext";
import { AnimatePresence, MotionConfig } from "./ui/framer";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export const viewport = {
  width: "device-width",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
