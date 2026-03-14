import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-xl shadow-sm border border-gray-100",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
}

export function CardHeader({
    className,
    title,
    description,
    children,
    ...props
}: CardHeaderProps) {
    return (
        <div className={cn("px-6 py-4 border-b border-gray-100", className)} {...props}>
            <h3 className="text-lg font-semibold text-[#1A1A1A]">{title}</h3>
            {description && (
                <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            )}
            {children}
        </div>
    );
}

export function CardContent({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("px-6 py-4", className)} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "px-6 py-4 border-t border-gray-100 flex items-center gap-3",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
