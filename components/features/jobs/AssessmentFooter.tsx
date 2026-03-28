import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

interface AssessmentFooterProps {
  onSubmit: () => void;
  loading: boolean;
  isComplete: boolean;
  cancelHref: string;
}

export function AssessmentFooter({
  onSubmit,
  loading,
  isComplete,
  cancelHref,
}: AssessmentFooterProps) {
  return (
    <div className="bg-white border border-border p-8 mt-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <Text variant="title_lg" className="text-neutral-100 mb-1">
            Submit Assessment
          </Text>
          <Text variant="body_md" className="text-neutral-60">
            Once submitted, you cannot change your answers.
          </Text>
        </div>
        <div className="flex items-center gap-4">
          <Link href={cancelHref}>
            <button className="text-neutral-60 font-semibold hover:text-neutral-100 transition-colors">
              Cancel
            </button>
          </Link>
          <Button
            onClick={onSubmit}
            disabled={loading || !isComplete}
            className="h-12 px-10 text-[15px] shadow-lg shadow-primary/20"
          >
            {loading ? "Submitting..." : "Continue to Submit →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
