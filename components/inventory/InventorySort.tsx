"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEFAULT_INVENTORY_SORT,
  INVENTORY_SORT_OPTIONS,
} from "@/lib/inventory-filters";

const items = INVENTORY_SORT_OPTIONS.map((option) => ({
  label: option.label,
  value: option.value,
}));

export default function InventorySort({ sort }: { sort?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    params.delete("page");
    router.push(`/inventory?${params.toString()}`);
  };

  return (
    <Select
      items={items}
      value={sort ?? DEFAULT_INVENTORY_SORT}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-52">
        <SelectValue placeholder="Sort by" />
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
