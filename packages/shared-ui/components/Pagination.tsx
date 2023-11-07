import * as React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import classNames from "classnames";
import { motion } from "framer-motion";

type PaginationProps = {
  pageCount: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  NextPreviousLink: React.ElementType;
  renderPaginationLink: ({ page, href }: { page: number; href: string }) => JSX.Element;
};

export const Pagination = ({
  pageCount = 1,
  currentPage = 1,
  renderPaginationLink,
  NextPreviousLink,
}: PaginationProps) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const getUrlWithPage = (pageNum: number) => {
    params.set("page", pageNum.toString());
    return `${url.pathname}?${params}`;
  };

  const totalPages = Array.from({ length: pageCount }, (_item, index) => index + 1);

  const prevUrl = currentPage <= 2 ? url.toString() : getUrlWithPage(currentPage - 1);
  const nextUrl = currentPage >= pageCount ? url.toString() : getUrlWithPage(currentPage + 1);

  return (
    <motion.nav className="flex items-center justify-between text-primary" layoutId="pagination-nav">
      <MaybeDisabledLink
        href={prevUrl}
        as={NextPreviousLink}
        isDisabled={currentPage <= 1}
        className="inline-flex items-center gap-2 leading-none"
      >
        <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
        Previous
      </MaybeDisabledLink>
      <div className="flex gap-x-1">
        {totalPages.map((page) =>
          renderPaginationLink({ page, href: page === 1 ? url.toString() : getUrlWithPage(page) })
        )}
      </div>
      <MaybeDisabledLink
        as={NextPreviousLink}
        href={nextUrl}
        isDisabled={currentPage >= pageCount}
        className="inline-flex items-center gap-2 leading-none"
      >
        Next
        <FaChevronRight className="h-5 w-5" aria-hidden="true" />
      </MaybeDisabledLink>
    </motion.nav>
  );
};

const MaybeDisabledLink = ({
  isDisabled,
  href,
  className,
  children,
  as = "a",
}: React.PropsWithChildren<{
  isDisabled?: boolean;
  className?: string;
  href: string;
  as?: React.ElementType;
}>) => {
  if (!isDisabled) {
    const Link = as;
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <span aria-disabled className={classNames(className, "opacity-60")}>
      {children}
    </span>
  );
};
