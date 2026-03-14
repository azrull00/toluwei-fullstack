"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface AnimateOnScrollProps {
    children: ReactNode;
    animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in";
    delay?: 0 | 100 | 200 | 300 | 400 | 500 | 600;
    className?: string;
    threshold?: number;
}

const animationClass = {
    "fade-up": "animate-fade-up",
    "fade-in": "animate-fade-in",
    "slide-left": "animate-slide-left",
    "slide-right": "animate-slide-right",
    "scale-in": "animate-scale-in",
} as const;

const delayClass = {
    0: "",
    100: "delay-100",
    200: "delay-200",
    300: "delay-300",
    400: "delay-400",
    500: "delay-500",
    600: "delay-600",
} as const;

/**
 * Wraps content in a div that plays a CSS animation when scrolled into view.
 * Uses IntersectionObserver — zero JS animation library dependency.
 */
export function AnimateOnScroll({
    children,
    animation = "fade-up",
    delay = 0,
    className = "",
    threshold = 0.15,
}: AnimateOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.remove("will-animate");
                    el.classList.add(animationClass[animation]);
                    if (delay) el.classList.add(delayClass[delay]);
                    observer.unobserve(el);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [animation, delay, threshold]);

    return (
        <div ref={ref} className={`will-animate ${className}`}>
            {children}
        </div>
    );
}
