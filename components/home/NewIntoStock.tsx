import Link from "next/link";
import StockCard from "@/components/ui/StockCard";
import { NEW_STOCK } from "@/lib/data";

export default function NewIntoStock() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <h2 className="heading-display mb-12 text-center text-3xl text-bianco sm:text-4xl">
        New Into Stock
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {NEW_STOCK.map((car) => (
          <StockCard key={car.slug} car={car} />
        ))}
      </div>

      {/* Pagination */}
      <nav aria-label="Stock pages" className="mt-14 flex items-center gap-3">
        <span
          aria-current="page"
          className="flex h-10 w-10 items-center justify-center bg-rosso font-display text-sm text-white"
        >
          1
        </span>
        <Link
          href="/inventory?page=2"
          className="flex h-10 w-10 items-center justify-center border border-rosso font-display text-sm text-rosso transition-colors hover:bg-rosso hover:text-white"
        >
          2
        </Link>
        <Link
          href="/inventory?page=2"
          aria-label="Next page"
          className="flex h-10 w-10 items-center justify-center border border-rosso text-rosso transition-colors hover:bg-rosso hover:text-white"
        >
          →
        </Link>
      </nav>
    </section>
  );
}
