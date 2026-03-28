import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { textVariants } from "./Text";

export const buttonVariants = cva(
  "inline-flex  items-center justify-center whitespace-nowrap font-poppins text-sm font-semibold transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-primary !text-white h-[50px] px-6",
        transparent: "!text-primary bg-transparent text-black",
        white: "bg-white !text-primary h-[50px] px-6",
      },
    },

    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends
    ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          buttonVariants({ variant }),
          textVariants({
            variant: "button",
          }),
          disabled && "opacity-70 cursor-not-allowed",
          className,
          isLoading && "opacity-70 cursor-not-allowed",
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
