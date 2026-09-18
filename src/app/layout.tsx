import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "material-symbols/outlined.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMEShield — Cybersecurity Awareness Training for Nigerian SMEs",
  description: "A Bilingual, Adaptive Cybersecurity Awareness Training and Self-Assessment Platform for Nigerian SMEs. Available in English and Nigerian Pidgin.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${newsreader.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
