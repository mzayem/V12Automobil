import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "V12 Automobil | Specialist Classic & Prestige Cars",
  description:
    "Specialist classic and prestige cars. Carefully selected, personally assessed, passionately sold.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${bebasNeue.variable} ${cormorant.variable}`}
    >
      <body className="bg-night text-bianco antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
