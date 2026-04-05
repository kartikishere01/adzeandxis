import type { Metadata } from "next";
import { Cormorant_Garamond, Barlow, Barlow_Condensed } from "next/font/google";
import SmoothScroller from "@/components/SmoothScroller";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const fontCormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const fontBarlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const fontBarlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adzeandaxis.com"),
  title: "Adze & Axis | Architecture & Interior Studio",
  description: "Adze & Axis is a full-service architecture, interior design, and construction studio — designing and building spaces that work as beautifully as they look.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Adze & Axis | Architecture & Interior Studio",
    description: "Adze & Axis is a full-service architecture, interior design, and construction studio — designing and building spaces that work as beautifully as they look.",
    url: "https://www.adzeandaxis.com",
    siteName: "Adze & Axis",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adze & Axis | Architecture & Interior Studio",
    description: "Adze & Axis is a full-service architecture, interior design, and construction studio — designing and building spaces that work as beautifully as they look.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontCormorant.variable} ${fontBarlow.variable} ${fontBarlowCondensed.variable} antialiased`}
    >
      <body>
        <SmoothScroller />
        <Header />
        {children}
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </body>
    </html>
  );
}
