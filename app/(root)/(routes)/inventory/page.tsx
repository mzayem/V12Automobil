import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import PageHeading from "@/components/ui/PageHeading";
import StockCard from "@/components/ui/StockCard";
import { getStocks } from "@/actions/get-stocks";
import PerPageSelect from "@/components/inventory/PerPageSelect";
import InventoryPagination from "@/components/inventory/InventoryPagination";
import {
  INVENTORY_PER_PAGE_COOKIE,
  INVENTORY_PER_PAGE_OPTIONS,
  DEFAULT_INVENTORY_PER_PAGE,
} from "@/lib/inventory-per-page";

export const metadata: Metadata = {
  title: "Inventory | V12 Automobil",
};

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const cookieStore = await cookies();

  const cookiePerPage = Number(
    cookieStore.get(INVENTORY_PER_PAGE_COOKIE)?.value,
  );
  const perPage = INVENTORY_PER_PAGE_OPTIONS.includes(
    cookiePerPage as (typeof INVENTORY_PER_PAGE_OPTIONS)[number],
  )
    ? cookiePerPage
    : DEFAULT_INVENTORY_PER_PAGE;

  const pageNo = Number(page) || 1;

  const stock = await getStocks({ pageNo, pageSize: perPage });

  if (pageNo > stock.meta.last_page && stock.meta.last_page > 0) {
    redirect(
      stock.meta.last_page > 1
        ? `/inventory?page=${stock.meta.last_page}`
        : "/inventory",
    );
  }

  return (
    <>
      <PageHeading
        eyebrow="Current Stock"
        title="Cars For Sale"
        intro="Every car in our collection has been driven, assessed, and approved before it earns its place here."
      />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <p className="text-md text-neutral-200">
          Showing {stock.meta.from} to {stock.meta.to} of {stock.meta.total}{" "}
          results
        </p>
        <PerPageSelect perPage={perPage} />
      </div>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {stock.data.map((car) => (
            <StockCard key={car.id} car={car} />
          ))}
        </div>
      </section>
      <InventoryPagination
        currentPage={stock.meta.current_page}
        lastPage={stock.meta.last_page}
      />
    </>
  );
}
