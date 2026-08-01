import type { Metadata } from "next";
import PageHeading from "@/components/ui/PageHeading";
import WarrantyBenefits from "@/components/services/WarrantyBenefits";
import CtaBand from "@/components/services/CtaBand";

export const metadata: Metadata = {
  title: "Warranty | V12 Automobil",
  description:
    "The most comprehensive and advanced warranty cover available, protecting your investment against unexpected issues and high repair costs.",
};

export default function WarrantyPage() {
  return (
    <>
      <PageHeading
        eyebrow="Services"
        bgSrc="/images/large_range_rover_black.jpg"
        title="Benefits of a Platinum Warranty"
        intro="The most comprehensive and advanced warranty cover available, protecting your investment against unexpected issues and high repair costs."
      />

      <WarrantyBenefits />

      <CtaBand
        heading="Want to add Platinum Warranty to your car?"
        copy="Speak to our team about cover options and pricing."
      />
    </>
  );
}
