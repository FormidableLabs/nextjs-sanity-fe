type GetPaginationOffsetsResponse = {
    offsetPage: number;
    limit: number;
};

/**
 * 
 * @param queryPage          Current page
 * @param paginationPageSize Items per page, defaults to env var NEXT_PUBLIC_PAGINATION_PAGE_SIZE
 * @returns object 
 */
export const getPaginationOffsets = (queryPage: number,  paginationPageSize?: number): GetPaginationOffsetsResponse => {
    // Items per page.
    const pageSize = paginationPageSize ?? Math.abs(process.env.NEXT_PUBLIC_PAGINATION_PAGE_SIZE);

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
        offsetPage,
        limit,
    };
};