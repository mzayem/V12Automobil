"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { INVENTORY_PER_PAGE_COOKIE } from "@/lib/inventory-per-page";

export async function setInventoryPerPage(perPage: number) {
  const cookieStore = await cookies();

  cookieStore.set(INVENTORY_PER_PAGE_COOKIE, String(perPage), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  // Page size changed, so the previous page number may no longer be valid —
  // send the user back to the first page of the new listing.
  redirect("/inventory");
}
