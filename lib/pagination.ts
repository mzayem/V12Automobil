export type PaginationRangeItem = number | "ellipsis";

/**
 * Builds a windowed list of page numbers with ellipsis gaps, always
 * including the first and last page (e.g. 1, …, 4, 5, 6, …, 20).
 */
export function getPaginationRange(
  currentPage: number,
  lastPage: number,
  siblingCount = 1,
): PaginationRangeItem[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (lastPage <= totalPageNumbers) {
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, lastPage);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < lastPage - 1;

  const range: PaginationRangeItem[] = [1];

  if (showLeftEllipsis) range.push("ellipsis");

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== lastPage) range.push(i);
  }

  if (showRightEllipsis) range.push("ellipsis");

  range.push(lastPage);

  return range;
}
