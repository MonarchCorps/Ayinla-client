// cookie-utils.ts
import { CONFIGS } from "@/config";

const tokenName = CONFIGS.STORAGE_NAME.token;
const authName = CONFIGS.STORAGE_NAME.auth;

// Universal cookie helper (works in both environments)
export const getCookie = (name: string): string | null => {
    // Check if we're on the client side
    if (typeof document !== 'undefined') {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? decodeURIComponent(match[2]) : null;
    }
    // We're on the server side - cannot access document.cookie
    return null;
};

export const setCookie = (name: string, value: string, expiresAt?: string) => {
    // Only set cookies on the client side
    if (typeof document !== 'undefined') {
        const expires = expiresAt ? `; expires=${new Date(expiresAt).toUTCString()}` : "";
        document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
    }
};

export const removeCookie = (name: string) => {
    if (typeof document !== 'undefined') {
        document.cookie = `${name}=; Max-Age=0; path=/`;
    }
};

// Auth token functions (client-side only)
export function getAuthToken(): string | null {
    return getCookie(tokenName);
}

export function setAuthToken({
    token,
    token_expires_at,
}: {
    token: string;
    token_expires_at: string;
}): void {
    setCookie(tokenName, token, token_expires_at);
}

export function isTokenExpired(): boolean {
    return !getAuthToken();
}

export function removeAuthToken(): void {
    removeCookie(tokenName);
}

export function removeAuthData(): void {
    removeAuthToken();
    if (typeof window !== 'undefined') {
        localStorage.removeItem(authName);
    }
}