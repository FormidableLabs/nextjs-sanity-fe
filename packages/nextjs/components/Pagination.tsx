import Link from "next/link";
import { useRouter } from "next/router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const pageSelectedClass =
  "border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium";
const pageClass =
  "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium";

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
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        {currentPage > 1 ? (
          <Link href={prevUrlObj} passHref>
            <a className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              <FaChevronLeft className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Previous
            </a>
          </Link>
        ) : (
          <span className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
            <FaChevronLeft className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Previous
          </span>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {totalPages.map((page) => (
          <Link key={`page-${page}`} href={page === 1 ? baseUrlObj : getUrlObjWithPage(page)} passHref>
            <a
              onClick={(e) => handlePageChanged(e, page)}
              className={page == currentPage ? pageSelectedClass : pageClass}
              aria-current={page === currentPage ? "page" : "false"}
            >
              {page}
            </a>
          </Link>
        ))}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        {currentPage < pageCount ? (
          <Link href={nextUrlObj} passHref>
            <a className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Next
              <FaChevronRight className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </a>
          </Link>
        ) : (
          <span className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Next
            <FaChevronRight className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        )}
      </div>
    </nav>
  );
};
