"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function SpecRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="font-serif text-sm text-muted uppercase tracking-wide">
        {label}
      </dt>
      <dd className="text-sm text-bianco">{value}</dd>
    </div>
  );
}

export default function SpecAccordionGroup({
  title,
  rows,
  defaultOpen = false,
}: {
  title: string;
  rows: { label: string; value?: string | number | null }[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const visible = rows.filter(
    (r) => r.value !== undefined && r.value !== null && r.value !== "",
  );
  if (visible.length === 0) return null;

  return (
    <div className="border border-white/10 rounded-lg">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-rosso">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-rosso transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <dl className="divide-y divide-white/10 border-t border-white/10 px-5">
            {visible.map((r) => (
              <SpecRow key={r.label} label={r.label} value={r.value} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
