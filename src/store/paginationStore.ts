import type { PaginationStore, TableType } from "@/types/Pagination";

import { create } from "zustand";

export const paginationStore = create<PaginationStore>((set, get) => ({
    states: {},
    setPagination: (key, pagination) =>
        set(state => ({
            states: {
                ...state.states,
                [key]: pagination,
            },
        })),
    getPagination: key => get().states[key] || {
        pageIndex: 0,
        pageSize: 5,
    },
    getPageAndLimit: (key) => {
        const { pageIndex, pageSize } = get().states[key] || {
            pageIndex: 0,
            pageSize: 5,
        };
        return {
            page: pageIndex + 1,
            limit: pageSize,
        };
    },
}));

export default function usePagination(key: TableType) {
    const {
        getPagination,
        setPagination,
        getPageAndLimit,
    } = paginationStore();

    const { pageIndex, pageSize } = getPagination(key);
    const { page, limit } = getPageAndLimit(key);

    const setPageIndex = (index: number) =>
        setPagination(key, { pageIndex: index, pageSize });

    const setPageSize = (size: number) =>
        setPagination(key, { pageIndex: 0, pageSize: size });

    return {
        pageIndex,
        pageSize,
        page,
        limit,
        setPageIndex,
        setPageSize,
    };
}
