"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import type { FacetOption, PriceBounds } from "@/lib/inventory-filters";

function formatPrice(value: number) {
  return `£${value.toLocaleString()}`;
}

export default function InventoryFilters({
  makes,
  bodyStyles,
  selectedMakes,
  selectedBodyStyles,
  query,
  priceBounds,
  selectedMinPrice,
  selectedMaxPrice,
  resultCount,
  children,
}: {
  makes: FacetOption[];
  bodyStyles: FacetOption[];
  selectedMakes: string[];
  selectedBodyStyles: string[];
  query: string;
  priceBounds: PriceBounds;
  selectedMinPrice?: number;
  selectedMaxPrice?: number;
  resultCount: number;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Search input and price range both mirror the server-driven searchParams
  // (query / selectedMinPrice / selectedMaxPrice), which change on every
  // navigation. Rather than useEffect + setState (which causes an extra
  // render pass), we detect the prop change during render and reset the
  // local state immediately — the pattern React docs recommend for
  // "adjusting state when a prop changes".
  const [search, setSearch] = useState(query);
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setSearch(query);
  }

  const initialMin = selectedMinPrice ?? priceBounds.min;
  const initialMax = selectedMaxPrice ?? priceBounds.max;
  const [priceRange, setPriceRange] = useState<number[]>([
    initialMin,
    initialMax,
  ]);
  const [prevRangeKey, setPrevRangeKey] = useState(
    `${initialMin}-${initialMax}`,
  );
  const rangeKey = `${initialMin}-${initialMax}`;
  if (rangeKey !== prevRangeKey) {
    setPrevRangeKey(rangeKey);
    setPriceRange([initialMin, initialMax]);
  }

  const pushParams = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    params.delete("page");
    router.push(
      `/inventory${params.toString() ? `?${params.toString()}` : ""}`,
    );
  };

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed === query.trim()) return;

    const timeout = setTimeout(() => {
      pushParams((params) => {
        if (trimmed) params.set("q", trimmed);
        else params.delete("q");
      });
    }, 400);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const toggleValue = (
    key: "make" | "body",
    value: string,
    active: string[],
  ) => {
    pushParams((params) => {
      const next = active.includes(value)
        ? active.filter((v) => v !== value)
        : [...active, value];
      if (next.length) params.set(key, next.join(","));
      else params.delete(key);
    });
  };

  const handlePriceCommitted = (value: number[]) => {
    pushParams((params) => {
      const [nextMin, nextMax] = value;
      if (nextMin > priceBounds.min) params.set("minPrice", String(nextMin));
      else params.delete("minPrice");
      if (nextMax < priceBounds.max) params.set("maxPrice", String(nextMax));
      else params.delete("maxPrice");
    });
  };

  const hasActiveFilters =
    selectedMakes.length > 0 ||
    selectedBodyStyles.length > 0 ||
    query.trim().length > 0 ||
    selectedMinPrice != null ||
    selectedMaxPrice != null;

  const filterFields = (
    <div className="space-y-8 py-1 pr-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search make or model..."
          className="h-10 border-white/15 bg-white/5 pl-9 text-bianco placeholder:text-muted/70"
        />
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => router.push("/inventory")}
          className="flex items-center gap-1.5 font-serif text-xs text-rosso transition-colors hover:text-bianco"
        >
          <X className="size-3.5" />
          Clear all filters
        </button>
      )}

      {priceBounds.max > priceBounds.min && (
        <div>
          <h3 className="font-display mb-4 text-sm uppercase tracking-widest text-bianco">
            Price Range
          </h3>
          <Slider
            min={priceBounds.min}
            max={priceBounds.max}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as number[])}
            onValueCommitted={(value) =>
              handlePriceCommitted(value as number[])
            }
            className="mt-2"
          />
          <div className="mt-3 flex items-center justify-between font-serif text-xs text-muted">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      )}

      <FilterGroup
        title="Search by Manufacturer"
        options={makes}
        selected={selectedMakes}
        onToggle={(value) => toggleValue("make", value, selectedMakes)}
      />

      <FilterGroup
        title="Search by Bodystyle"
        options={bodyStyles}
        selected={selectedBodyStyles}
        onToggle={(value) => toggleValue("body", value, selectedBodyStyles)}
      />
    </div>
  );

  return (
    <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-start px-6 pb-24",
          open ? "md:gap-8" : "md:gap-0",
        )}
      >
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-r-lg border border-l-0 border-white/15 bg-night px-2.5 py-5 text-bianco transition-colors hover:border-rosso hover:text-rosso md:flex"
          >
            <Search className="size-4" />
            <span className="[writing-mode:vertical-rl] font-display text-xs uppercase tracking-widest">
              Filter Stock
            </span>
          </button>
        )}

        <aside
          className={cn(
            "sticky top-28 hidden h-[calc(100vh-8rem)] shrink-0 self-start overflow-hidden transition-[width,opacity] duration-300 ease-in-out md:block",
            open ? "w-72 opacity-100" : "w-0 opacity-0",
          )}
        >
          <div className="flex h-full w-72 flex-col p-4  bg-white/5 border rounded-4xl border-white/10 backdrop-blur-sm">
            <div className="mb-3 flex shrink-0 items-center justify-between">
              <h2 className="font-display text-sm uppercase tracking-widest text-bianco">
                Filter Stock
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Hide filters"
                className="flex size-7 items-center justify-center rounded-md border border-white/15 text-muted transition-colors hover:border-rosso hover:text-rosso"
              >
                <ChevronLeft className="size-4" />
              </button>
            </div>

            <ScrollArea className="min-h-0 flex-1">{filterFields}</ScrollArea>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <DrawerTrigger className="mb-6 flex w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-3 font-display text-sm uppercase tracking-widest text-bianco transition-colors hover:border-rosso hover:text-rosso md:hidden">
            <SlidersHorizontal className="size-4" />
            Filter Stock
            {hasActiveFilters && (
              <span className="size-1.5 rounded-full bg-rosso" />
            )}
          </DrawerTrigger>

          <div
            className={cn(
              "grid gap-10 sm:grid-cols-2",
              open ? "md:grid-cols-2" : "md:grid-cols-3",
            )}
          >
            {children}
          </div>
        </div>
      </div>

      <DrawerContent className="bg-night">
        <DrawerHeader className="flex-row items-center justify-between border-b border-white/10">
          <DrawerTitle className="font-display text-sm uppercase tracking-widest text-bianco">
            Filter Stock
          </DrawerTitle>
          <DrawerClose
            aria-label="Close filters"
            className="flex size-7 items-center justify-center rounded-md border border-white/15 text-muted transition-colors hover:border-rosso hover:text-rosso"
          >
            <X className="size-4" />
          </DrawerClose>
        </DrawerHeader>

        <ScrollArea className="min-h-0 flex-1 px-4">{filterFields}</ScrollArea>

        <DrawerFooter className="border-t border-white/10 pt-4">
          <DrawerClose className="flex w-full items-center justify-center rounded-md bg-rosso px-4 py-3 font-display text-sm uppercase tracking-widest text-bianco transition-colors hover:bg-rosso/90">
            Show {resultCount} {resultCount === 1 ? "Result" : "Results"}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: FacetOption[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  if (!options.length) return null;

  return (
    <div>
      <h3 className="font-display mb-4 text-sm uppercase tracking-widest text-bianco">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {options.map((option) => (
          <li key={option.value}>
            <label className="flex cursor-pointer items-center gap-2.5 font-serif text-sm text-muted transition-colors hover:text-bianco">
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
                className="size-4 shrink-0 rounded border-white/20 bg-transparent accent-rosso"
              />
              {option.value}{" "}
              <span className="text-muted/60">({option.count})</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
