import type { Metadata } from "next";
import PageHeading from "@/components/ui/PageHeading";
import WhySellSection from "@/components/sell/WhySellSection";
import SellCarForm from "@/components/sell/SellCarForm";

export const metadata: Metadata = {
  title: "Sell Your Car | V12 Automobil",
  description:
    "Enquire with us to get a bespoke valuation for your vehicle. No-obligation valuations, no hidden fees, flexible selling options.",
};

export default function SellYourCarPage() {
  return (
    <>
      <PageHeading
        eyebrow="Sell Your Car"
        title="Sell Your Car to V12 Automobil"
        intro="Enquire with us to get a bespoke valuation for your vehicle."
        bgSrc="/images/large_range_rover.jpg"
      />

      <WhySellSection />

      <SellCarForm />
    </>
  );
}
