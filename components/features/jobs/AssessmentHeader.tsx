import { Text } from "@/components/ui/Text";

interface AssessmentHeaderProps {
  currentStep: number;
  totalSteps: number;
  jobTitle: string;
}

export function AssessmentHeader({
  currentStep,
  totalSteps,
  jobTitle,
}: AssessmentHeaderProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white border border-border p-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Text variant="h2" className="text-neutral-100 mb-1">
            Skills Assessment
          </Text>
          <Text variant="body_md" className="text-neutral-60">
            Applying for <span className="text-neutral-100 font-semibold">{jobTitle}</span>
          </Text>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Text variant="body_sm" className="text-neutral-60 font-medium">
            Step {currentStep} of {totalSteps}
          </Text>
          <div className="w-48 h-2 bg-neutral-20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
