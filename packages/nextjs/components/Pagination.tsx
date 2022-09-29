import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import classNames from "classnames";
import { motion } from "framer-motion";

type PaginationProps = {
  pageCount: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
};

export const Pagination = ({ onPageChange, pageCount = 1, currentPage = 1 }: PaginationProps) => {
  const router = useRouter();
  const { page: _page, ...otherQuery } = router.query;
  const baseUrlObj = {
    pathname: router.pathname,
    query: otherQuery,
  };
  const getUrlObjWithPage = (pageNum: number) => ({
    ...baseUrlObj,
    query: { ...baseUrlObj.query, page: pageNum.toString() },
  });

  const totalPages = Array.from({ length: pageCount }, (_item, index) => index + 1);

  const handlePageChanged = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    if (onPageChange) {
      e.preventDefault();
      onPageChange(page);
    }
  };

  const prevUrlObj = currentPage <= 2 ? baseUrlObj : getUrlObjWithPage(currentPage - 1);
  const nextUrlObj = currentPage >= pageCount ? baseUrlObj : getUrlObjWithPage(currentPage + 1);

  return (
    <motion.nav className="flex items-center justify-between text-blue" layoutId="pagination-nav">
      <MaybeDisabledLink
        urlObject={prevUrlObj}
        isDisabled={currentPage <= 1}
        className="inline-flex items-center gap-2 leading-none"
      >
        <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
        Previous
      </MaybeDisabledLink>
      <div className="flex gap-x-1">
        {totalPages.map((page) => (
          <Link key={`page-${page}`} href={page === 1 ? baseUrlObj : getUrlObjWithPage(page)} passHref>
            <a
              onClick={(e) => handlePageChanged(e, page)}
              className={classNames(
                "border rounded w-10 aspect-square flex items-center justify-center",
                page === currentPage ? "border-blue" : "border-[transparent]"
              )}
              aria-current={page === currentPage ? "page" : "false"}
            >
              {page}
            </a>
          </Link>
        ))}
      </div>
      <MaybeDisabledLink
        urlObject={nextUrlObj}
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
  urlObject,
  className,
  children,
}: React.PropsWithChildren<{
  isDisabled?: boolean;
  className?: string;
  urlObject: any;
}>) => {
  if (!isDisabled) {
    return (
      <Link href={urlObject} className={className} passHref>
        <a className={className}>{children}</a>
      </Link>
    );
  }

  return (
    <span aria-disabled className={classNames(className, "opacity-60")}>
      {children}
    </span>
  );
};
