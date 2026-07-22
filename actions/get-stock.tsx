"use server";

const BASE_URL = process.env.DEALERKIT_BASE_URL!;
const DEALER_ID = process.env.DEALERKIT_ID!;
const TOKEN = process.env.DEALERKIT_TOKEN!;

import { Stock } from "@/public/type";

export async function getStock(id: string): Promise<Stock> {
  if (!id) {
    throw new Error("Stock ID is required");
  }

  const url = `${BASE_URL}/stock/${id}?dealer_id=${DEALER_ID}`;
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

  return response.json() as Promise<Stock>;
}
