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

function buildHref(page: number) {
  return page <= 1 ? "/inventory" : `/inventory?page=${page}`;
}

export default function InventoryPagination({
  currentPage,
  lastPage,
}: {
  currentPage: number;
  lastPage: number;
}) {
  if (lastPage <= 1) return null;

  const range = getPaginationRange(currentPage, lastPage);

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
