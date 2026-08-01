import type { Metadata } from "next";
import PageHeading from "@/components/ui/PageHeading";
import ServiceOfferings from "@/components/services/ServiceOfferings";
import AdditionalServices from "@/components/services/AdditionalServices";
import ServicesTestimonial from "@/components/services/ServicesTestimonial";
import CtaBand from "@/components/services/CtaBand";

export const metadata: Metadata = {
  title: "Premium Car Services | V12 Automobil",
  description:
    "Tailored finance solutions, bespoke body styling, advanced tracking options and luxury vehicle storage — whether you're looking to customise, protect, or finance your supercar, we've got you covered.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeading
        eyebrow="Services"
        title="Premium Car Services"
        intro="Tailored finance solutions, bespoke body styling, advanced tracking options and luxury vehicle storage — whether you're looking to customise, protect, or finance your supercar, we've got you covered."
        bgSrc="/images/large_purple_car_detail.jpg"
      />

      <ServiceOfferings />
      <AdditionalServices />
      <ServicesTestimonial />
      <CtaBand />
    </>
  );
}
