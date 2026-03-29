import { cn } from "@/lib/utils";
import { Text } from "./Text";

export interface LoadingProps {
  className?: string;
  variant?: "full" | "section" | "inline";
  text?: string;
}

export function Loading({
  className,
  variant = "section",
  text = "Loading...",
}: LoadingProps) {
  const containerClasses = cn(
    "flex flex-col items-center justify-center gap-4",
    variant === "full" && "fixed inset-0 bg-white/80 backdrop-blur-sm z-50",
    variant === "section" && "min-h-[400px] w-full",
    variant === "inline" && "min-h-0 py-4",
    className,
  );

  return (
    <div className={containerClasses}>
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        
        {/* Inner Branding (optional, maybe a small dot or logo) */}
        <div className="absolute w-2 h-2 rounded-full bg-primary animate-pulse" />
      </div>
      
      {text && (
        <Text
          variant="body_md"
          className="text-neutral-60 font-medium animate-pulse"
        >
          {text}
        </Text>
      )}
    </div>
  );
}

export default Loading;
