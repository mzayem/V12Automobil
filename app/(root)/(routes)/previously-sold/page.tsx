import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/ui/PageHeading";
import SoldSection from "@/components/about/SoldSection";

export const metadata: Metadata = {
  title: "Previously Sold | V12 Automobil",
};

export default function PreviouslySoldPage() {
  return (
    <>
      <nav className="pt-10 text-center font-serif text-xs text-muted">
        <Link href="/inventory" className="transition-colors hover:text-rosso">
          Cars For Sale
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-bianco">Previously Sold</span>
      </nav>
      <PageHeading
        eyebrow="Previously Sold"
        title="Cars That Found Their Next Home"
        intro="Every car sold is a story finished well. A look back at some of the vehicles V12 Automobil has sourced, assessed, and passed on to their new owners."
      />
      <SoldSection />
    </>
  );
}
