import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Text } from "./Text";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "./Icon";

export const linkButtonVariants = cva("cursor-pointer ", {
  variants: {
    variant: {
      default: "text-[16px]  flex flex-col items-center justify-center gap-2.5",
      white:
        "text-[16px]  flex flex-col items-center justify-center gap-2.5 text-white ",
      // link: "bg-transparent text-black underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface LinkButtonProps
  extends
    ComponentPropsWithoutRef<"button">,
    VariantProps<typeof linkButtonVariants> {}

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(linkButtonVariants({ variant }), className)}
        {...props}
      >
        <div className="flex items-center gap-3">
          <Text className="font-semibold  line-clamp-1" variant={"body-sm"}>
            {props.children}
          </Text>
          <Icon icon={faArrowRight} className="text-[16px]" />
        </div>
        <div
          className={cn(
            "h-px w-full ",
            variant === "white" ? "bg-white" : "bg-black",
          )}
        ></div>
      </button>
    );
  },
);

LinkButton.displayName = "LinkButton";
