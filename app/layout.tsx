import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppProviders from "@/components/AppProviders";
import { IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";

export const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Idea Coach",
  description: "Think better. Build better.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plex.variable}>
      <head>
        {/* ✅ Umami Analytics */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="c852ecdf-64a6-4ca8-8ab3-36131b25fc13"
          strategy="afterInteractive"
        />
      </head>

      <body className="font-sans antialiased bg-background text-foreground">
        <AppProviders>
          <Navbar />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
