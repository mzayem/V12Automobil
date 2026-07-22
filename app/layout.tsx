import type { Metadata } from "next";
import { Bebas_Neue, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import NextTopLoader from "nextjs-toploader";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={cn(
        bebasNeue.variable,
        geistMono.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="overflow-x-hidden bg-night text-bianco antialiased">
        <main>
          <NextTopLoader color="#CE2B37" showSpinner={false} />
          <TooltipProvider>{children}</TooltipProvider>
        </main>
      </body>
    </html>
  );
}
