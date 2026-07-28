import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import StockCarousel from "@/components/home/StockCarousel";
import SellCarForm from "@/components/home/SellCarForm";
import { getAllStock } from "@/actions/get-stocks";
import { sortStock } from "@/lib/inventory-filters";

export default async function HomePage() {
  const stock = await getAllStock();
  const sorted = sortStock(stock, "latest");
  return (
    <>
      <Hero />
      <AboutSection />
      <StatsSection />
      <StockCarousel stock={sorted.slice(0, 12)} />
      <SellCarForm />
    </>
  );
}
