interface ObjectPage {
    limitPage: number;
    currentPage: number;
    skipPage?: number; 
    totalPage?: number; 
}

interface PaginatedResult extends ObjectPage {
    skipPage: number;
    totalPage: number;
}

export const paginationHelper = (
    query: Record<string, any>,
    countRecord: number,
    objectPage: ObjectPage
): PaginatedResult => {

    if (query.page) {
        objectPage.currentPage = parseInt(query.page);
    }

    if (query.limit) {
        objectPage.limitPage = parseInt(query.limit);
    }

    objectPage.skipPage = (objectPage.currentPage - 1) * objectPage.limitPage;
    objectPage.totalPage = Math.ceil(countRecord / objectPage.limitPage);

    return objectPage as PaginatedResult;
}