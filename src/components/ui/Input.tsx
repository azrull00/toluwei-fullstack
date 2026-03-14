import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, id, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm font-medium text-[#1A1A1A]"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={id}
                    className={cn(
                        "px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-[#1A1A1A]",
                        "placeholder:text-gray-400 text-sm",
                        "transition-all duration-150",
                        "focus:outline-none focus:ring-2 focus:ring-[#C0392B] focus:border-transparent",
                        error && "border-red-500 focus:ring-red-500",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-xs text-red-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="text-xs text-gray-500">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
