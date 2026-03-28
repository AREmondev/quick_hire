import { Text } from "@/components/ui/Text";

export interface Step {
  label: string;
  active: boolean;
  done: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
}

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="flex items-center gap-0 mb-10 max-w-xl mx-auto">
      {steps.map((step, idx) => (
        <div key={step.label} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-[14px] font-bold transition-colors ${
                step.done
                  ? "bg-accent-green border-accent-green text-white"
                  : step.active
                    ? "bg-primary border-primary text-white"
                    : "border-neutral-20 text-neutral-60"
              }`}
            >
              {step.done ? "✓" : idx + 1}
            </div>
            <Text
              variant="body_sm"
              className={
                step.active
                  ? "text-primary font-semibold"
                  : step.done
                    ? "text-accent-green font-semibold"
                    : "text-neutral-60"
              }
            >
              {step.label}
            </Text>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`flex-1 h-px mx-1 mt-[-20px] ${
                step.done ? "bg-accent-green" : "bg-neutral-20"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
