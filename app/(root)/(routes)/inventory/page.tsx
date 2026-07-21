import type { Metadata } from "next";
import PageHeading from "@/components/ui/PageHeading";
import StockCard from "@/components/ui/StockCard";
import { getStocks } from "@/actions/get-stocks";

export const metadata: Metadata = {
  title: "Inventory | V12 Automobil",
};

export default async function InventoryPage() {
  const stock = await getStocks();
  return (
    <>
      <PageHeading
        eyebrow="Current Stock"
        title="Cars For Sale"
        intro="Every car in our collection has been driven, assessed, and approved before it earns its place here."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {stock.data.map((car) => (
            <StockCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </>
  );
}
