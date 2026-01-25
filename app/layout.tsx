import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppProviders from "@/components/AppProviders";
import {  Inter } from "next/font/google";
import Script from "next/script";
import { Lora } from "next/font/google";




export const plex = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-bgro",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora", 
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
  <html lang="en" className={` ${plex.variable} ${lora.variable}`}>

      <head>
  
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="c852ecdf-64a6-4ca8-8ab3-36131b25fc13"
          strategy="afterInteractive"
        />
      </head>

      <body className="font-inter antialiased bg-background text-foreground">
        <AppProviders>
          <Navbar />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
