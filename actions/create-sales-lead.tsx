"use server";

const BASE_URL = process.env.DEALERKIT_BASE_URL!;
const DEALER_ID = process.env.DEALERKIT_ID!;
const TOKEN = process.env.DEALERKIT_TOKEN!;

import { CreateSaleLeadPayload, LeadResponse } from "@/public/type";
import { readDealerKitError, DealerKitResult } from "@/lib/dealerkit-error";

export async function createSalesLead(
  payload: CreateSaleLeadPayload,
): Promise<DealerKitResult<LeadResponse>> {
  const url = `${BASE_URL}/leads?dealer_id=${DEALER_ID}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return readDealerKitError(response);
  }

  const data = (await response.json()) as LeadResponse;
  return { ok: true, data };
}
