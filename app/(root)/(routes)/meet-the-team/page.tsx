import type { Metadata } from "next";
import PageHeading from "@/components/ui/PageHeading";
import StatsSection from "@/components/home/StatsSection";
import TeamSection from "@/components/about/TeamSection";
import TabStrip from "@/components/about/TabStrip";

export const metadata: Metadata = {
  title: "Meet the Team | V12 Automobil",
};

export default function MeetTheTeamPage() {
  return (
    <>
      <PageHeading
        bgSrc="/images/large_porsche_911_turbo.jpg"
        eyebrow="We Are"
        title="More Than Just Cars"
        intro="V12 Automobil is a specialist dealer with an uncompromising passion for the machines that defined an era. Every car we present has been driven, assessed, and approved by people who genuinely care."
      />
      <StatsSection />
      <TabStrip active="Meet the Team" />
      <TeamSection />
    </>
  );
}
