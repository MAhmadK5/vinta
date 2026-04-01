import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Import the Provider! Adjust path if needed (e.g., "@/context/CartContext" or "../context/CartContext")
import { CartProvider } from "../context/CartContext"; 

import FloatingElements from "../components/FloatingElements";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VINTA | Premium Bags",
  description: "Graphite black streetwear bags.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FloatingElements />
        {/* 2. Wrap children in the Provider */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}