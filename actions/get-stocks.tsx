"use server";

const BASE_URL = process.env.DEALERKIT_BASE_URL!;
const DEALER_ID = process.env.DEALERKIT_ID!;
const TOKEN = process.env.DEALERKIT_TOKEN!;

import { DealerKitVehicle, StockList } from "@/public/type";

interface StocksProps {
  pageNo?: number;
  pageSize?: number;
}

export async function getStocks({
  pageNo = 1,
  pageSize = 12,
}: StocksProps = {}): Promise<StockList> {
  const url = `${BASE_URL}/stock?page=${pageNo}&per_page=${pageSize}&dealer_id=${DEALER_ID}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },

    next: {
      revalidate: 0,
    },
  });

  if (!response.ok) {
    throw new Error(
      `DealerKit API Error (${response.status}): ${response.statusText}`,
    );
  }

  return response.json() as Promise<StockList>;
}

// DealerKit has no filter/sort query params, so the inventory listing page
// filters, sorts and paginates in-memory — which means it needs the whole
// stock list up front rather than one page at a time.
export async function getAllStock(): Promise<DealerKitVehicle[]> {
  const pageSize = 100;
  let page = 1;
  const all: DealerKitVehicle[] = [];

  while (true) {
    const url = `${BASE_URL}/stock?page=${page}&per_page=${pageSize}&dealer_id=${DEALER_ID}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      throw new Error(
        `DealerKit API Error (${response.status}): ${response.statusText}`,
      );
    }

    const json = (await response.json()) as StockList;
    all.push(...json.data);

    if (json.meta.current_page >= json.meta.last_page) break;
    page++;
  }

  return all;
}
