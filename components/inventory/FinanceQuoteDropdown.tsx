"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VehiclePrices } from "@/public/type";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-muted/70">{label}</span>
      <span className="font-bold text-bianco">{value}</span>
    </div>
  );
}

export default function FinanceQuoteDropdown({
  monthly,
}: {
  monthly: VehiclePrices["monthly"];
}) {
  const [open, setOpen] = useState(false);
  const example = monthly.examples?.[0];

  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        disabled={!example}
        className="group flex items-center gap-1.5 font-serif text-sm text-muted transition-colors hover:text-rosso disabled:pointer-events-none"
      >
        From £{Math.round(monthly.amount).toLocaleString()} / month
        {example && (
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform duration-300",
              open && "rotate-180 text-rosso",
            )}
          />
        )}
      </button>

      {example && (
        <div
          className={cn(
            "grid transition-all duration-300 ease-out",
            open
              ? "mt-3 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="divide-y divide-white/10 rounded-lg border border-white/10 bg-white/5 px-4 font-serif text-sm">
              <Row
                label="Cash Price"
                value={`£${example.cash_price.toLocaleString()}`}
              />
              <Row
                label="Deposit"
                value={`£${example.deposit.toLocaleString()}`}
              />
              <Row
                label="Monthly Payment"
                value={`£${example.monthly_payment.toLocaleString()}`}
              />
              <Row label="Term" value={`${example.term} months`} />
              <Row
                label="Final Payment"
                value={`£${example.final_payment.toLocaleString()}`}
              />
              <Row
                label="Total Amount Payable"
                value={`£${example.total_amount_payable.toLocaleString()}`}
              />
              <Row
                label="Representative APR"
                value={`${example.representative_apr}%`}
              />
              <Row label="Fixed Rate" value={`${example.fixed_rate}%`} />
              <Row
                label="Annual Mileage"
                value={`${example.annual_mileage.toLocaleString()} mi`}
              />
            </div>
            <p className="mt-2 font-serif text-xs text-muted/70">
              Representative example — subject to status and eligibility.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
