import { DealerKitVehicle } from "@/public/type";

export const DEFAULT_INVENTORY_SORT = "latest" as const;

export const INVENTORY_SORT_OPTIONS = [
  { value: "latest", label: "Latest Arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "make-asc", label: "Make: A-Z" },
  { value: "make-desc", label: "Make: Z-A" },
  { value: "mileage-asc", label: "Mileage: Low to High" },
  { value: "mileage-desc", label: "Mileage: High to Low" },
] as const;

export type InventorySort = (typeof INVENTORY_SORT_OPTIONS)[number]["value"];

const SORT_VALUES = INVENTORY_SORT_OPTIONS.map((option) => option.value);

export function isInventorySort(value?: string): value is InventorySort {
  return !!value && (SORT_VALUES as string[]).includes(value);
}

/** Splits a comma-separated search param into a clean list of values. */
export function parseListParam(value?: string): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export type FacetOption = { value: string; count: number };

function facetCounts(values: string[]): FacetOption[] {
  const counts = new Map<string, number>();
  for (const value of values) {
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value));
}

export function getMakeFacets(stock: DealerKitVehicle[]): FacetOption[] {
  return facetCounts(stock.map((car) => car.vehicle.manufacturer));
}

export function getBodyStyleFacets(stock: DealerKitVehicle[]): FacetOption[] {
  return facetCounts(stock.map((car) => car.vehicle.body_type));
}

export type PriceBounds = { min: number; max: number };

export function getPriceBounds(stock: DealerKitVehicle[]): PriceBounds {
  if (!stock.length) return { min: 0, max: 0 };

  const prices = stock.map((car) => car.prices.cash.amount);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}

export function filterStock(
  stock: DealerKitVehicle[],
  {
    makes,
    bodyStyles,
    query,
    minPrice,
    maxPrice,
  }: {
    makes: string[];
    bodyStyles: string[];
    query: string;
    minPrice?: number;
    maxPrice?: number;
  },
): DealerKitVehicle[] {
  const q = query.trim().toLowerCase();

  return stock.filter((car) => {
    if (makes.length && !makes.includes(car.vehicle.manufacturer)) {
      return false;
    }
    if (bodyStyles.length && !bodyStyles.includes(car.vehicle.body_type)) {
      return false;
    }
    const price = car.prices.cash.amount;
    if (minPrice != null && price < minPrice) return false;
    if (maxPrice != null && price > maxPrice) return false;
    if (q) {
      const haystack =
        `${car.vehicle.manufacturer} ${car.vehicle.model} ${car.vehicle.derivative}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function sortStock(
  stock: DealerKitVehicle[],
  sort?: string,
): DealerKitVehicle[] {
  const resolved = isInventorySort(sort) ? sort : DEFAULT_INVENTORY_SORT;
  const sorted = [...stock];

  switch (resolved) {
    case "price-asc":
      return sorted.sort((a, b) => a.prices.cash.amount - b.prices.cash.amount);
    case "price-desc":
      return sorted.sort((a, b) => b.prices.cash.amount - a.prices.cash.amount);
    case "make-asc":
      return sorted.sort((a, b) =>
        a.vehicle.manufacturer.localeCompare(b.vehicle.manufacturer),
      );
    case "make-desc":
      return sorted.sort((a, b) =>
        b.vehicle.manufacturer.localeCompare(a.vehicle.manufacturer),
      );
    case "mileage-asc":
      return sorted.sort((a, b) => a.vehicle.mileage - b.vehicle.mileage);
    case "mileage-desc":
      return sorted.sort((a, b) => b.vehicle.mileage - a.vehicle.mileage);
    case "latest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.meta.created_at).getTime() -
          new Date(a.meta.created_at).getTime(),
      );
  }
}
