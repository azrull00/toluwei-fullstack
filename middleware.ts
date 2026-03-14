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

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("session")?.value;

    // ── Protect /admin routes ───────────────────────────────────────────────────
    if (pathname.startsWith("/admin")) {
        if (!token || !(await verifyToken(token))) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("from", pathname); // preserve intended destination
            const response = NextResponse.redirect(loginUrl);
            if (token) response.cookies.delete("session"); // clear expired/invalid token
            return response;
        }
    }

    // ── Redirect logged-in users away from /login ───────────────────────────────
    if (pathname === "/login") {
        if (token && (await verifyToken(token))) {
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
    ],
};
