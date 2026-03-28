import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ApplyActionsProps {
  onContinue: () => void;
  loading: boolean;
  cancelHref: string;
  isAssessment: boolean;
  isApplied: boolean;
}

export function ApplyActions({
  onContinue,
  loading,
  cancelHref,
  isAssessment,
  isApplied,
}: ApplyActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
      <Link href={cancelHref}>
        <button className="text-neutral-60 font-semibold hover:text-neutral-100 transition-colors">
          Cancel application
        </button>
      </Link>
      <Button
        onClick={onContinue}
        disabled={loading || isApplied}
        className="w-full sm:w-auto h-12 px-10 text-[15px]"
      >
        {loading
          ? "Proceeding..."
          : isAssessment
            ? "Continue to Assessment →"
            : isApplied
              ? "Application Submitted"
              : "Continue to Submit →"}
      </Button>
    </div>
  );
}
