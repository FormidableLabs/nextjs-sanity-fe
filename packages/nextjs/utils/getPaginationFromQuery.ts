import { ParsedUrlQuery } from "querystring";

export type GetPaginationResponse = {
  /**
   * Elements per page
   */
  pageSize: number;
  /**
   * Current page number
   */
  currentPage: number;
  /**
   * Offset for query
   */
  offsetPage: number;
  limit: number;
};

const PAGINATION_PAGE_SIZE = 6;

/**
 *
 * @param queryPage          Current page
 * @param paginationPageSize Items per page, defaults to 6
 * @returns object
 */
export const getPaginationOffsets = (queryPage: number, paginationPageSize?: number): GetPaginationResponse => {
  // Items per page.
  const pageSize = paginationPageSize ?? Math.abs(PAGINATION_PAGE_SIZE);

  /**
   * Pagesize = 10
   *
   * Page 1 => 0...limit
   * Page 2 => 10...limit
   */
  const offsetPage = Math.abs(queryPage > 1 ? (queryPage - 1) * pageSize : 0);

  /**
   * Pagesize = 10
   *
   * Page 1 => offsetPage...10
   * Page 2 => offsetPage...20
   */
  const limit = Math.abs(queryPage > 1 ? pageSize * queryPage : pageSize);

  return {
    pageSize,
    currentPage: queryPage > 0 ? queryPage : 1,
    offsetPage,
    limit,
  };
};

export const getPaginationFromQuery = (query: ParsedUrlQuery, paginationPageSize?: number): GetPaginationResponse => {
  // Pagination
  const queryPage = Math.abs((query.page as unknown as number) ?? 0);

  return getPaginationOffsets(queryPage, paginationPageSize);
};
