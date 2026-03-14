"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Flame, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BRAND } from "@/lib/constants";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // JavaScript smooth scroll — intercept anchor clicks
    const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const el = document.getElementById(href.slice(1));
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
            scrolled
                ? "bg-white/95 backdrop-blur-lg border-b border-stone-100 shadow-sm py-3"
                : "bg-transparent py-5"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                        scrolled ? "bg-[#B03A2E]" : "bg-white/15 border border-white/20"
                    )}>
                        <Flame className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <span className={cn(
                        "text-[17px] font-bold tracking-tight transition-colors duration-300",
                        scrolled ? "text-[#1A1614]" : "text-white"
                    )}>
                        {BRAND.name}
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => smoothScroll(e, link.href)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer",
                                scrolled
                                    ? "text-stone-500 hover:text-[#1A1614] hover:bg-stone-100"
                                    : "text-white/60 hover:text-white hover:bg-white/10"
                            )}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA + Login */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/login"
                        className={cn(
                            "flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-xl transition-all duration-200",
                            scrolled
                                ? "text-stone-500 hover:text-[#1A1614] hover:bg-stone-100"
                                : "text-white/50 hover:text-white hover:bg-white/10"
                        )}
                    >
                        <LogIn className="w-3.5 h-3.5" />
                        Login Admin
                    </Link>
                    <a
                        href="#kontak"
                        onClick={(e) => smoothScroll(e, "#kontak")}
                        className={cn(
                            "text-[13px] font-semibold px-5 py-2 rounded-xl border transition-all duration-200 cursor-pointer",
                            scrolled
                                ? "border-[#B03A2E] text-[#B03A2E] hover:bg-[#B03A2E] hover:text-white"
                                : "border-white/30 text-white/80 hover:border-white hover:text-white hover:bg-white/10"
                        )}
                    >
                        Hubungi Kami
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className={cn(
                        "md:hidden p-2 rounded-lg transition-colors",
                        scrolled ? "text-[#1A1614] hover:bg-stone-100" : "text-white hover:bg-white/10"
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
                open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                    {NAV_LINKS.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="px-4 py-3 rounded-xl text-[14px] text-stone-600 hover:text-[#B03A2E] hover:bg-red-50 transition-colors font-medium cursor-pointer"
                            onClick={(e) => { smoothScroll(e, link.href); setOpen(false); }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        href="/login"
                        className="px-4 py-3 rounded-xl text-[14px] text-stone-400 hover:text-[#1A1614] hover:bg-stone-50 transition-colors font-medium flex items-center gap-2"
                        onClick={() => setOpen(false)}
                    >
                        <LogIn className="w-3.5 h-3.5" />
                        Login Admin
                    </Link>
                    <div className="pt-2">
                        <a
                            href="#kontak"
                            className="block text-center bg-[#B03A2E] hover:bg-[#922B21] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
                            onClick={(e) => { smoothScroll(e, "#kontak"); setOpen(false); }}
                        >
                            Hubungi Kami
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
