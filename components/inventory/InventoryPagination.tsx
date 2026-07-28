import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationRange } from "@/lib/pagination";

export default function InventoryPagination({
  currentPage,
  lastPage,
  searchParams = {},
}: {
  currentPage: number;
  lastPage: number;
  searchParams?: Record<string, string | undefined>;
}) {
  if (lastPage <= 1) return null;

  const range = getPaginationRange(currentPage, lastPage);

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (key !== "page" && value) params.set(key, value);
    }
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `/inventory?${qs}` : "/inventory";
  };

  return (
    <Pagination className="pb-24">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={buildHref(currentPage - 1)} />
          </PaginationItem>
        )}

        {range.map((item, i) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href={buildHref(item)}
                isActive={item === currentPage}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {currentPage < lastPage && (
          <PaginationItem>
            <PaginationNext href={buildHref(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
