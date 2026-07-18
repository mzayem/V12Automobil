import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import NewIntoStock from "@/components/home/NewIntoStock";
import SellCarForm from "@/components/home/SellCarForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <StatsSection />
      <NewIntoStock />
      <SellCarForm />
    </>
  );
}
