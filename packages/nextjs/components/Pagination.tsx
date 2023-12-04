import * as React from "react";
import { Pagination as BasePagination } from "shared-ui";
import Link from "next/link";
import classNames from "classnames";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
  pageCount: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
};

export const Pagination = ({ onPageChange, pageCount = 1, currentPage = 1 }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChanged = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    if (onPageChange) {
      e.preventDefault();
      onPageChange(page);
    }
  };

  return (
    <BasePagination
      pageCount={pageCount}
      NextPreviousLink={Link}
      currentPage={currentPage}
      currentHref={pathname ?? ""}
      search={searchParams?.toString() ?? ""}
      renderPaginationLink={({ page, href }) => (
        <Link key={`page-${page}`} href={href} passHref legacyBehavior>
          <a
            onClick={(e) => handlePageChanged(e, page)}
            className={classNames(
              "border rounded w-10 aspect-square flex items-center justify-center",
              page === currentPage ? "border-primary" : "border-[transparent]"
            )}
            aria-current={page === currentPage ? "page" : "false"}
          >
            {page}
          </a>
        </Link>
      )}
    />
  );
};
