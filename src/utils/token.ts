import { CONFIGS } from "@/config";
import { UserType } from "@/types/Auth";

const tokenName = CONFIGS.STORAGE_NAME.token;
const authName = CONFIGS.STORAGE_NAME.auth

export function isTokenExpired(): boolean {
    try {
        const storedData = localStorage.getItem(tokenName);
        if (!storedData)
            return true;

        const { token, token_expires_at } = JSON.parse(storedData);

        if (!token || !token_expires_at)
            return true;

        const expiresAt = new Date(token_expires_at).getTime();
        const now = Date.now();

        return expiresAt < now;
    }
    catch {
        return true;
    }
}

/**
 * 
 * 
 * 
 */

export function getAuthToken(): string | null {
    try {
        const storedData = localStorage.getItem(tokenName);
        return storedData ? JSON.parse(storedData).token : null;
    }
    catch {
        return null;
    }
}

/**
 * 
 * 
 * 
 * 
 * 
 */

export function setAuthToken({
    token,
    token_expires_at,
}: {
    token: string;
    token_expires_at: string;
}): void {
    localStorage.setItem(
        tokenName,
        JSON.stringify({
            token,
            token_expires_at,
        }),
    );
}

/**
 * 
 * 
 * 
 * 
 * 
 */

export function removeAuthToken(): void {
    localStorage.removeItem(tokenName);
}

export function removeAuthData(): void {
    removeAuthToken();
    localStorage.removeItem(authName);
}
