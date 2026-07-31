"use server";

import { ValuationResponse, ValuationRequest } from "@/public/type";
import { readDealerKitError, DealerKitResult } from "@/lib/dealerkit-error";

const BASE_URL = process.env.DEALERKIT_BASE_URL!;
const DEALER_ID = process.env.DEALERKIT_ID!;
const TOKEN = process.env.DEALERKIT_TOKEN!;

export async function getValuations(
  payload: ValuationRequest,
): Promise<DealerKitResult<ValuationResponse>> {
  const url = `${BASE_URL}/valuations?dealer_id=${DEALER_ID}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    return readDealerKitError(response);
  }

  const data = (await response.json()) as ValuationResponse;
  return { ok: true, data };
}
