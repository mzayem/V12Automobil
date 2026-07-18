import type { Metadata } from "next";
import PageHeading from "@/components/ui/PageHeading";
import StatsSection from "@/components/home/StatsSection";

export const metadata: Metadata = {
  title: "About Us | V12 Automobil",
};

export default function AboutUsPage() {
  return (
    <>
      <PageHeading
        eyebrow="We Are"
        title="More Than Just Cars"
        intro="V12 Automobil is a specialist dealer with an uncompromising passion for the machines that defined an era. Every car we present has been driven, assessed, and approved by people who genuinely care."
      />
      <StatsSection />
    </>
  );
}
