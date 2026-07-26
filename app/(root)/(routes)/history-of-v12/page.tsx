import type { Metadata } from "next";
import PageHeading from "@/components/ui/PageHeading";
import TabStrip from "@/components/about/TabStrip";
import HistorySection from "@/components/about/HistorySection";

export const metadata: Metadata = {
  title: "Our History | V12 Automobil",
};

export default function HistoryOfV12Page() {
  return (
    <>
      <PageHeading
        eyebrow="Our Story"
        title="The History of V12 Automobil"
        intro="Every dealership has a story. Ours starts with one person's passion for cars that refused to be ordinary."
      />
      <TabStrip active="Our History" />
      <HistorySection />
    </>
  );
}
