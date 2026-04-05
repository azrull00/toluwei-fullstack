import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

// ⚠️ DO NOT import from @/lib/auth here!
// auth.ts imports `cookies` from next/headers which crashes Edge Runtime.
// Keep verifySession inlined here for middleware use.

const SECRET = new TextEncoder().encode(
    process.env.NEXTAUTH_SECRET ?? "toluwei-dev-secret-change-in-production"
);

async function verifyToken(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, SECRET);
        return true;
    } catch {
        return false;
    }
}

// Public routes that ADMIN users should be blocked from accessing
// (they must logout first via /admin before accessing public pages)
const PUBLIC_ROUTES_BLOCKED_FOR_ADMIN = ["/", "/katalog"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("session")?.value;
    const isAuthenticated = token ? await verifyToken(token) : false;

    // ── Protect /admin routes ───────────────────────────────────────────────────
    if (pathname.startsWith("/admin")) {
        if (!isAuthenticated) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("from", pathname);
            const response = NextResponse.redirect(loginUrl);
            if (token) response.cookies.delete("session"); // clear expired/invalid token
            return response;
        }
    }

    // ── Redirect logged-in users away from /login ────────────────────────────
    if (pathname === "/login") {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    // ── Block admin users from accessing public pages ────────────────────────
    // Admin must logout first — direct navigation to / or /katalog is blocked
    if (PUBLIC_ROUTES_BLOCKED_FOR_ADMIN.includes(pathname)) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin",
        "/admin/:path*",
        "/login",
        "/",          // block admin from home
        "/katalog",   // block admin from katalog
    ],
};
