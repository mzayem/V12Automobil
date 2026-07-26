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
      <PageHeading
        eyebrow="Previously Sold"
        title="Cars That Found Their Next Home"
        intro="Every car sold is a story finished well. A look back at some of the vehicles V12 Automobil has sourced, assessed, and passed on to their new owners."
      />
      <SoldSection />
    </>
  );
}
