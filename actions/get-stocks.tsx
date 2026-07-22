"use server";

const BASE_URL = process.env.DEALERKIT_BASE_URL!;
const DEALER_ID = process.env.DEALERKIT_ID!;
const TOKEN = process.env.DEALERKIT_TOKEN!;

import { DealerKitResponse } from "@/public/type";

interface StockPageProps {
  pageNo?: number;
  pageSize?: number;
}

export async function getStocks({
  pageNo = 1,
  pageSize = 12,
}: StockPageProps = {}): Promise<DealerKitResponse> {
  const url = `${BASE_URL}/stock?page=${pageNo}&per_page=${pageSize}&dealer_id=${DEALER_ID}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },

    // Next.js cache
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(
      `DealerKit API Error (${response.status}): ${response.statusText}`,
    );
  }

  return response.json() as Promise<DealerKitResponse>;
}
