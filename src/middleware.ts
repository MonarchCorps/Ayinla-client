import { NextRequest, NextResponse } from "next/server";
import { CONFIGS } from "./config";

const EXPIRATION_MINUTES = 3;
const TOKEN_NAME = CONFIGS.STORAGE_NAME.token;

// Route patterns to protect or time-check
const PROTECTED_ROUTES = ["/listing/:slug/book", "/listing/own", "/booking/history"];
const SENT_ROUTES = ["/listing/:slug/book/sent"];

// Check if user is logged in by cookie
function isAuthenticated(req: NextRequest) {
    return Boolean(req.cookies.get(TOKEN_NAME)?.value);
}

// Convert Next.js dynamic routes (:slug) to RegExp
function matchesPattern(path: string, pattern: string) {
    const regex = new RegExp(
        "^" + pattern.replace(/:[^/]+/g, "[^/]+") + "(?:/.*)?$"
    );
    return regex.test(path);
}

// Remove existing middleware params to avoid duplicates
function cleanSearch(search: string) {
    const params = new URLSearchParams(search);
    ["from", "ts", "src"].forEach((key) => params.delete(key));
    const result = params.toString();
    return result ? `?${result}` : "";
}

// Build a fresh redirect URL with timestamp and flags
function buildRedirectUrl(path: string, search: string) {
    const cleanedSearch = cleanSearch(search);
    const delimiter = cleanedSearch ? "&" : "?";
    const timestamp = Date.now();
    return `${path}${cleanedSearch}${delimiter}from=middleware&ts=${timestamp}&src=unauth`;
}

export function middleware(req: NextRequest) {
    const { pathname, search, origin, searchParams } = req.nextUrl;

    // 1) SENT ROUTES: ensure timestamp is present and within expiration
    if (SENT_ROUTES.some((pattern) => matchesPattern(pathname, pattern))) {
        const ts = searchParams.get("ts");
        const elapsedMins = ts ? (Date.now() - Number(ts)) / 1000 / 60 : Infinity;
        if (!ts || isNaN(Number(ts)) || elapsedMins > EXPIRATION_MINUTES) {
            return NextResponse.redirect(`${origin}/listing/all`);
        }
    }

    // 2) PROTECTED ROUTES: require authentication
    if (
        PROTECTED_ROUTES.some((pattern) => matchesPattern(pathname, pattern)) &&
        !isAuthenticated(req)
    ) {
        const redirectTo = encodeURIComponent(buildRedirectUrl(pathname, search));
        return NextResponse.redirect(
            `${origin}/sign-in?redirectTo=${redirectTo}`
        );
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Apply middleware to both protected and sent routes
export const config = {
    matcher: [
        "/listing/:slug/book",
        "/listing/:slug/book/sent",
        "/listing/own",
        "/booking/history",
    ],
};
