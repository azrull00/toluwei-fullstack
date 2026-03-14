import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
    {
        variants: {
            variant: {
                primary:
                    "bg-[#C0392B] text-white hover:bg-[#A93226] focus:ring-[#C0392B]",
                secondary:
                    "bg-[#2C3E50] text-white hover:bg-[#1a252f] focus:ring-[#2C3E50]",
                outline:
                    "border-2 border-[#C0392B] text-[#C0392B] hover:bg-[#C0392B] hover:text-white focus:ring-[#C0392B]",
                ghost:
                    "text-[#C0392B] hover:bg-[#C0392B]/10 focus:ring-[#C0392B]",
                danger:
                    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
            },
            size: {
                sm: "text-sm px-3 py-1.5",
                md: "text-base px-5 py-2.5",
                lg: "text-lg px-7 py-3.5",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

export function Button({
    className,
    variant,
    size,
    isLoading,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(buttonVariants({ variant, size }), className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {children}
        </button>
    );
}
