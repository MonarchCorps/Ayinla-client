"use client";

import {
    createContext,
    useContext,
    ReactNode,
    useState
} from "react";

export type KeyName = "all-listings"

type PaginationState = {
    currentPage: number;
    totalPages: number;
};

type PaginationContextType = {
    getPagination: (key: string) => PaginationState | undefined;
    setPagination: (key: string, state: PaginationState) => void;
};

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export function PaginationProvider({ children }: { children: ReactNode }) {
    const [paginationMap, setPaginationMap] = useState<Record<string, PaginationState>>({});

    function getPagination(key: string) {
        return paginationMap[key];
    }

    function setPagination(key: string, state: PaginationState) {
        setPaginationMap((prev) => ({ ...prev, [key]: state }));
    }

    return (
        <PaginationContext.Provider value={{ getPagination, setPagination }}>
            {children}
        </PaginationContext.Provider>
    );
}

export function usePagination(key: KeyName) {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error("usePagination must be used within a PaginationProvider");
    }
    const { getPagination, setPagination } = context;

    const pagination = getPagination(key) || { currentPage: 1, totalPages: 1 };

    function updatePagination(state: Partial<PaginationState>) {
        setPagination(key, { ...pagination, ...state });
    }

    return {
        currentPage: pagination.currentPage,
        totalPages: pagination.totalPages,
        setCurrentPage: (page: number) => updatePagination({ currentPage: page }),
        setTotalPages: (total: number) => updatePagination({ totalPages: total }),
    };
}
