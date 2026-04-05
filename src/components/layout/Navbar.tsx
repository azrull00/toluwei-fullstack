"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Flame, LogIn, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BRAND } from "@/lib/constants";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const isHome = pathname === "/";

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        fn(); // run on mount
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    // Smooth scroll — only apply on home page for anchor links
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            if (isHome) {
                e.preventDefault();
                const el = document.getElementById(href.slice(1));
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            // On non-home pages, anchor links will navigate to root (handled by href)
        }
    };

    // Resolve the effective href for nav links
    const resolveHref = (href: string) => {
        if (href === "#home") return "/"; // Beranda always goes to root
        if (href.startsWith("#") && !isHome) return `/${href}`;
        return href;
    };

    // Force scrolled style on non-home pages
    const isScrolledStyle = scrolled || !isHome;

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
            isScrolledStyle
                ? "bg-white/95 backdrop-blur-lg border-b border-stone-100 shadow-sm py-3"
                : "bg-transparent py-5"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                    <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                        isScrolledStyle ? "bg-[#B03A2E]" : "bg-white/15 border border-white/20"
                    )}>
                        <Flame className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <span className={cn(
                        "text-[17px] font-bold tracking-tight transition-colors duration-300",
                        isScrolledStyle ? "text-[#1A1614]" : "text-white"
                    )}>
                        {BRAND.name}
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map(link => {
                        const isKatalog = link.href === "/katalog";
                        const isActive = pathname === link.href;
                        return (
                            <a
                                key={link.href}
                                href={resolveHref(link.href)}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={cn(
                                    "relative px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5",
                                    isActive
                                        ? isScrolledStyle
                                            ? "text-[#B03A2E] bg-red-50"
                                            : "text-white bg-white/15"
                                        : isScrolledStyle
                                            ? "text-stone-500 hover:text-[#1A1614] hover:bg-stone-100"
                                            : "text-white/60 hover:text-white hover:bg-white/10",
                                    isKatalog && isScrolledStyle && !isActive && "border border-stone-200 hover:border-stone-400"
                                )}
                            >
                                {isKatalog && <BookOpen className="w-3.5 h-3.5" />}
                                {link.label}
                                {isActive && (
                                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#B03A2E] rounded-full" />
                                )}
                            </a>
                        );
                    })}
                </nav>

                {/* CTA + Login */}
                <div className="hidden md:flex items-center gap-3 shrink-0">
                    <Link
                        href="/login"
                        className={cn(
                            "flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-xl transition-all duration-200",
                            isScrolledStyle
                                ? "text-stone-500 hover:text-[#1A1614] hover:bg-stone-100"
                                : "text-white/50 hover:text-white hover:bg-white/10"
                        )}
                    >
                        <LogIn className="w-3.5 h-3.5" />
                        Login Admin
                    </Link>
                    <Link
                        href="/katalog"
                        className={cn(
                            "text-[13px] font-semibold px-5 py-2 rounded-xl border transition-all duration-200",
                            isScrolledStyle
                                ? "border-[#B03A2E] text-[#B03A2E] hover:bg-[#B03A2E] hover:text-white"
                                : "border-white/30 text-white/80 hover:border-white hover:text-white hover:bg-white/10"
                        )}
                    >
                        Lihat Katalog
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    className={cn(
                        "md:hidden p-2 rounded-lg transition-colors",
                        isScrolledStyle ? "text-[#1A1614] hover:bg-stone-100" : "text-white hover:bg-white/10"
                    )}
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile dropdown */}
            <div className={cn(
                "md:hidden bg-white border-t border-stone-100 overflow-hidden transition-all duration-300",
                open ? "max-h-screen opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
            )}>
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                    {NAV_LINKS.map(link => {
                        const isKatalog = link.href === "/katalog";
                        const isActive = pathname === link.href;
                        return (
                            <a
                                key={link.href}
                                href={resolveHref(link.href)}
                                className={cn(
                                    "px-4 py-3 rounded-xl text-[14px] transition-colors font-medium cursor-pointer flex items-center gap-2.5",
                                    isActive
                                        ? "text-[#B03A2E] bg-red-50 font-semibold"
                                        : "text-stone-600 hover:text-[#B03A2E] hover:bg-red-50",
                                    isKatalog && !isActive && "border border-stone-100"
                                )}
                                onClick={(e) => {
                                    handleNavClick(e, link.href);
                                    setOpen(false);
                                }}
                            >
                                {isKatalog && <BookOpen className="w-4 h-4" />}
                                {link.label}
                                {isKatalog && (
                                    <span className="ml-auto text-[11px] bg-[#B03A2E]/10 text-[#B03A2E] px-2 py-0.5 rounded-full font-semibold">
                                        Baru
                                    </span>
                                )}
                            </a>
                        );
                    })}
                    <Link
                        href="/login"
                        className="px-4 py-3 rounded-xl text-[14px] text-stone-400 hover:text-[#1A1614] hover:bg-stone-50 transition-colors font-medium flex items-center gap-2"
                        onClick={() => setOpen(false)}
                    >
                        <LogIn className="w-3.5 h-3.5" />
                        Login Admin
                    </Link>
                    <div className="pt-2">
                        <Link
                            href="/katalog"
                            className="block text-center bg-[#B03A2E] hover:bg-[#922B21] text-white font-semibold text-sm px-5 py-3.5 rounded-xl transition-colors cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            Lihat Katalog Produk
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
