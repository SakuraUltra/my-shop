import AnnouncementBar from "@/components/home/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Your Brand — Minimal Fashion & Accessories",
    template: "%s | Your Brand",
  },
  description:
    "Discover curated fashion and accessories. Free shipping on orders over $49.",
  keywords: [
    "fashion",
    "accessories",
    "minimal",
    "clothing",
    "watches",
    "bags",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://my-shop-seven-iota.vercel.app",
    siteName: "Your Brand",
    title: "Your Brand — Minimal Fashion & Accessories",
    description:
      "Discover curated fashion and accessories. Free shipping on orders over $49.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Brand — Minimal Fashion & Accessories",
    description: "Discover curated fashion and accessories.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AnnouncementBar />
          <Navbar />
          {children}
          <Footer />
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
