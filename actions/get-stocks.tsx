"use server";

const BASE_URL = process.env.DEALERKIT_BASE_URL!;
const DEALER_ID = process.env.DEALERKIT_ID!;
const TOKEN = process.env.DEALERKIT_TOKEN!;

import { DealerKitResponse } from "@/public/type";

export async function getStocks(): Promise<DealerKitResponse> {
  const response = await fetch(`${BASE_URL}/stock?dealer_id=${DEALER_ID}`, {
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
