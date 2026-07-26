import type { Metadata } from "next";
import PageHeading from "@/components/ui/PageHeading";
import TabStrip from "@/components/about/TabStrip";
import WhyV12Section from "@/components/about/WhyV12Section";

export const metadata: Metadata = {
  title: "Why V12 Automobil | V12 Automobil",
};

export default function WhyV12AutomobilPage() {
  return (
    <>
      <PageHeading
        eyebrow="Why V12"
        title="Why V12 Automobil?"
        intro="The difference isn't just in the cars we sell — it's in how we sell them."
      />
      <TabStrip active="Why V12 Automobil" />
      <WhyV12Section />
    </>
  );
}
