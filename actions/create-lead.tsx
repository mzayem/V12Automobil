"use server";

const BASE_URL = process.env.DEALERKIT_BASE_URL!;
const DEALER_ID = process.env.DEALERKIT_ID!;
const TOKEN = process.env.DEALERKIT_TOKEN!;

import { CreateLeadPayload, LeadResponse } from "@/public/type";

export async function createLead(
  payload: CreateLeadPayload,
): Promise<LeadResponse> {
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
    throw new Error(
      `DealerKit API Error (${response.status}): ${response.statusText}`,
    );
  }

  return response.json() as Promise<LeadResponse>;
}
