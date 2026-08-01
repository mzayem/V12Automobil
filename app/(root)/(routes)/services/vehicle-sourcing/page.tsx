import type { Metadata } from "next";
import PageHeading from "@/components/ui/PageHeading";
import VehicleSourcingBenefits from "@/components/services/VehicleSourcingBenefits";
import VehicleSourcingForm from "@/components/services/VehicleSourcingForm";

export const metadata: Metadata = {
  title: "Source Your Supercar | Luxury Car Sourcing | V12 Automobil",
  description:
    "We specialise in sourcing luxury and high-performance vehicles, using our wide network to find the perfect car that matches your needs.",
};

export default function VehicleSourcingPage() {
  return (
    <>
      <PageHeading
        eyebrow="Services"
        title="Let Us Source Your Next Car"
        intro="We specialise in sourcing luxury and high-performance vehicles, using our wide network to find the perfect car that matches your needs."
        bgSrc="/images/large_porsche_911_turbo.jpg"
        ctaLabel="Source Vehicle"
        ctaHref="#form"
      />

      <VehicleSourcingBenefits />
      <VehicleSourcingForm />
    </>
  );
}
