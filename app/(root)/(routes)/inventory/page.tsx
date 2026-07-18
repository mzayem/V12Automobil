import type { Metadata } from "next";
import PageHeading from "@/components/ui/PageHeading";
import StockCard from "@/components/ui/StockCard";
import { NEW_STOCK } from "@/lib/data";

export const metadata: Metadata = {
  title: "Inventory | V12 Automobil",
};

export default function InventoryPage() {
  return (
    <>
      <PageHeading
        eyebrow="Current Stock"
        title="Cars For Sale"
        intro="Every car in our collection has been driven, assessed, and approved before it earns its place here."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {NEW_STOCK.map((car) => (
            <StockCard key={car.slug} car={car} />
          ))}
        </div>
      </section>
    </>
  );
}
