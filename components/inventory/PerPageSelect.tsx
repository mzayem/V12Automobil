"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setInventoryPerPage } from "@/actions/set-inventory-per-page";
import { INVENTORY_PER_PAGE_OPTIONS } from "@/lib/inventory-per-page";

const items = INVENTORY_PER_PAGE_OPTIONS.map((n) => ({
  label: `${n} per page`,
  value: String(n),
}));

export default function PerPageSelect({ perPage }: { perPage: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      items={items}
      value={String(perPage)}
      disabled={isPending}
      onValueChange={(value) => {
        startTransition(() => {
          setInventoryPerPage(Number(value));
        });
      }}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Items per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
