import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(
    process.env.NEXTAUTH_SECRET ?? "toluwei-dev-secret-change-in-production"
);

export interface SessionPayload extends JWTPayload {
    userId: string;
    email: string;
    name: string;
    role: string;
}

export async function createSession(
    payload: Omit<SessionPayload, "iat" | "exp">
): Promise<string> {
    return new SignJWT(payload as JWTPayload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(SECRET);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload as SessionPayload;
    } catch {
        return null;
    }
}

/** Call from Server Components to get current session */
export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return null;
    return verifySession(token);
}
