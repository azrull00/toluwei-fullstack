"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";
import type { ActionResult } from "@/types";

export async function loginAction(
    _prev: ActionResult | null,
    formData: FormData
): Promise<ActionResult> {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return { success: false, error: "Email dan password wajib diisi." };
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return { success: false, error: "Email atau password salah." };

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return { success: false, error: "Email atau password salah." };

        const token = await createSession({
            userId: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        const cookieStore = await cookies();
        cookieStore.set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
    } catch (e) {
        console.error("[loginAction]", e);
        return { success: false, error: "Terjadi kesalahan saat login. Coba lagi." };
    }

    redirect("/admin");
}

export async function logoutAction(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    redirect("/login");
}
