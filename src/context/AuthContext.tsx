"use client";

import { createContext, useEffect, useState } from "react";
import { getAuthToken, removeAuthData, setAuthToken } from "@/utils/token";
import { AuthContextType, AuthType } from "@/types/Auth";
import { CONFIGS } from "@/config";

const authName = CONFIGS.STORAGE_NAME.auth;

const AuthContext = createContext<AuthContextType>({
    auth: null,
    setAuth: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuthState] = useState<AuthType | null>(null);

    useEffect(() => {
        try {
            // Auto-login only if token exists
            const token = getAuthToken();
            const storedAuth = localStorage.getItem(authName);
            if (token && storedAuth) {
                const parsedAuth = JSON.parse(storedAuth);
                setAuthState(parsedAuth);
            } else {
                removeAuthData();
            }
        } catch {
            removeAuthData();
        }
    }, []);

    const setAuth = (
        newAuth: AuthType,
        persist: boolean,
        authToken: {
            token: string;
            token_expires_at: string;
        }
    ): void => {
        setAuthState(newAuth);
        setAuthToken(authToken);

        if (persist) {
            localStorage.setItem(authName, JSON.stringify(newAuth));
        } else {
            localStorage.removeItem(authName);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
