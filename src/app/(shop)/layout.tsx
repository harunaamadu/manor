import type { Metadata } from "next";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Browse fashion and tech products on Aurion including clothing, shoes, accessories, gadgets, and wearable devices.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}