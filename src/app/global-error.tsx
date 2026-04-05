"use client";

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="id">
            <body style={{ margin: 0, fontFamily: "sans-serif", background: "#1A1614", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
                <div style={{ textAlign: "center", padding: "2rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Terjadi Kesalahan</h1>
                    <p style={{ color: "#7B7263", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
                        Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
                    </p>
                    <button
                        onClick={() => reset()}
                        style={{ background: "#B03A2E", color: "#fff", border: "none", padding: "0.75rem 2rem", borderRadius: "0.75rem", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}
                    >
                        Coba Lagi
                    </button>
                </div>
            </body>
        </html>
    );
}
