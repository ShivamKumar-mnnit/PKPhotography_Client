import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PK Photography - Professional Wedding, Event & Portrait Photography Services",
  description: "PK Photography offers high-quality professional photography services for weddings, portraits, events, and more. Capture your special moments with stunning visuals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#ffffff] overflow-y-scroll overflow-x-hidden`}
      >
        {/* <StarsCanvas /> */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
