
export type TableType = "booking" | "history"

export type Pagination = {
    pageIndex: number;
    pageSize: number;
};

export type PaginationStore = {
    states: Record<string, Pagination>;
    setPagination: (key: TableType, pagination: Pagination) => void;
    getPagination: (key: TableType) => Pagination;
    getPageAndLimit: (key: TableType) => {
        page: number;
        limit: number;
    };
};
