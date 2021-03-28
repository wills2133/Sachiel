export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    data: T;
    pagination: Pagination;

    constructor(data: T, pagination: Pagination) {
        this.data = data;
        this.pagination = pagination;
    }
}

export class PagingParams {
    pageNumber = 1;
    pageSize = 5;

    constructor(pageNumberr = 1, pageSize = 5) {
        this.pageNumber = pageNumberr;
        this.pageSize = pageSize;
    }
}