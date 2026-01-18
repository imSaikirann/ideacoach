import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/SessionProvider";
import { IBM_Plex_Sans } from "next/font/google";

/* ✅ IBM Plex Sans — primary UI font */
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
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
