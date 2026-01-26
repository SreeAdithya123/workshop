import * as React from "react";
import { cn } from "@/lib/utils";

// Start minimal Button implementation since we don't have radix installed actually, 
// using standard HTML button properties instead of Slot for now to reduce dependencies if user can't install things.
// Wait, I put radix in slot in the import but I didn't add it to package.json.
// I'll stick to a simpler button without Slot for now to avoid dependency hell if they are manual.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";

        const variants = {
            primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
            ghost: "hover:bg-accent/10 hover:text-accent",
            outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/5",
            link: "text-primary underline-offset-4 hover:underline",
        };

        const sizes = {
            default: "h-11 px-6 py-2",
            sm: "h-9 rounded-full px-4 text-xs",
            lg: "h-14 rounded-full px-10 text-base font-semibold",
            icon: "h-10 w-10",
        };

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
