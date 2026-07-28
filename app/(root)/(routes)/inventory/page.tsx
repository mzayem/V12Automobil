import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import PageHeading from "@/components/ui/PageHeading";
import StockCard from "@/components/ui/StockCard";
import { getAllStock } from "@/actions/get-stocks";
import PerPageSelect from "@/components/inventory/PerPageSelect";
import InventorySort from "@/components/inventory/InventorySort";
import InventoryFilters from "@/components/inventory/InventoryFilters";
import InventoryPagination from "@/components/inventory/InventoryPagination";
import {
  INVENTORY_PER_PAGE_COOKIE,
  INVENTORY_PER_PAGE_OPTIONS,
  DEFAULT_INVENTORY_PER_PAGE,
} from "@/lib/inventory-per-page";
import {
  filterStock,
  sortStock,
  getMakeFacets,
  getBodyStyleFacets,
  getPriceBounds,
  parseListParam,
} from "@/lib/inventory-filters";

export const metadata: Metadata = {
  title: "Inventory | V12 Automobil",
};

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    make?: string;
    body?: string;
    q?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();

  const cookiePerPage = Number(
    cookieStore.get(INVENTORY_PER_PAGE_COOKIE)?.value,
  );
  const perPage = INVENTORY_PER_PAGE_OPTIONS.includes(
    cookiePerPage as (typeof INVENTORY_PER_PAGE_OPTIONS)[number],
  )
    ? cookiePerPage
    : DEFAULT_INVENTORY_PER_PAGE;

  const allStock = await getAllStock();

  const makes = getMakeFacets(allStock);
  const bodyStyles = getBodyStyleFacets(allStock);
  const priceBounds = getPriceBounds(allStock);

  const selectedMakes = parseListParam(params.make);
  const selectedBodyStyles = parseListParam(params.body);
  const query = params.q?.trim() ?? "";
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  const filtered = filterStock(allStock, {
    makes: selectedMakes,
    bodyStyles: selectedBodyStyles,
    query,
    minPrice,
    maxPrice,
  });
  const sorted = sortStock(filtered, params.sort);

  const total = sorted.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const requestedPage = Number(params.page) || 1;

  if (requestedPage > lastPage && total > 0) {
    const params2 = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (key !== "page" && value) params2.set(key, String(value));
    }
    if (lastPage > 1) params2.set("page", String(lastPage));
    const qs = params2.toString();
    redirect(qs ? `/inventory?${qs}` : "/inventory");
  }

  const pageNo = Math.min(Math.max(requestedPage, 1), lastPage);
  const start = (pageNo - 1) * perPage;
  const pageItems = sorted.slice(start, start + perPage);

  return (
    <>
      <PageHeading
        eyebrow="Current Stock"
        title="Cars For Sale"
        intro="Every car in our collection has been driven, assessed, and approved before it earns its place here."
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-md text-neutral-200">
          {total > 0
            ? `Showing ${start + 1} to ${Math.min(start + perPage, total)} of ${total} results`
            : "No vehicles match your filters"}
        </p>
        <div className="flex flex-wrap gap-3">
          <InventorySort sort={params.sort} />
          <PerPageSelect perPage={perPage} />
        </div>
      </div>
      <InventoryFilters
        makes={makes}
        bodyStyles={bodyStyles}
        selectedMakes={selectedMakes}
        selectedBodyStyles={selectedBodyStyles}
        query={query}
        priceBounds={priceBounds}
        selectedMinPrice={minPrice}
        selectedMaxPrice={maxPrice}
        resultCount={total}
      >
        {pageItems.map((car) => (
          <StockCard key={car.id} car={car} />
        ))}
      </InventoryFilters>
      <InventoryPagination
        currentPage={pageNo}
        lastPage={lastPage}
        searchParams={params}
      />
    </>
  );
}
