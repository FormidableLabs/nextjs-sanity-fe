import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const pageSelectedClass = "border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium";
const pageClass = "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium";

type PaginationProps = {
    pageCount: number; 
    baseUrl?: string;
    currentPage?: number;
    onPageChange?: (page: number) => void;
}

export const Pagination = ({ onPageChange, pageCount = 1, currentPage = 1, baseUrl = "#" }: PaginationProps) => {
    const totalPages = Array.from({length: pageCount}, (_item, index) => index + 1);

    const handlePageChanged = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
        if (onPageChange) {
            e.preventDefault();
            onPageChange(page);
        }
    };

    const prevUrl = currentPage <= 2 ? baseUrl : `${baseUrl}?page=${currentPage - 1}`;
    const nextUrl = currentPage >= pageCount ? baseUrl : `${baseUrl}?page=${currentPage + 1}`;

    return (
        <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
            <div className="-mt-px w-0 flex-1 flex">
            {
                currentPage > 1 ? (
                <a
                    href={prevUrl}
                    className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                    <FaChevronLeft className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    Previous
                </a>
                ) : (
                    <span className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                        <FaChevronLeft className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Previous
                    </span>
                )
            }
            </div>
            <div className="hidden md:-mt-px md:flex">
            {
                totalPages.map((page) => (
                    <a key={`page-${page}`}
                        onClick={(e) => handlePageChanged(e, page)}
                        href={`${baseUrl}${page === 1 ? "" : `?page=${page}`}`}
                        className={page == currentPage ? pageSelectedClass : pageClass}
                        aria-current={page === currentPage ? "page" : "false"}
                    >
                        {page}
                    </a>
                ))
            }
            
            </div>
            <div className="-mt-px w-0 flex-1 flex justify-end">
            {
                currentPage < pageCount ? (
                    <a
                        href={nextUrl}
                        className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    >
                        Next
                        <FaChevronRight className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </a>
                ) : (
                    <span className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                        Next
                        <FaChevronRight className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                )
            }
            </div>
        </nav>
    )
}
