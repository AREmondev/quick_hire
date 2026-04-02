import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProfileInput } from "@/lib/validations";
import { Text } from "@/components/ui/Text";
import { FormTextArea, SectionCard } from "./FormComponents";

interface SummarySectionProps {
  register: UseFormRegister<ProfileInput>;
  errors: FieldErrors<ProfileInput>;
}

export function SummarySection({ register, errors }: SummarySectionProps) {
  return (
    <SectionCard title="Professional Summary">
      <FormTextArea
        label="Summary"
        placeholder="Write a compelling 2-4 sentence summary highlighting your experience, key skills, and career goals..."
        {...register("summary")}
        error={errors.summary?.message}
        className="min-h-40"
      />
      <div className="mt-4 p-4 bg-primary/5 border border-primary/20">
        <Text variant="body_sm" className="text-primary font-semibold mb-1">
          💡 Tips for a great summary
        </Text>
        <Text variant="body_sm" className="text-neutral-60">
          Start with your years of experience, mention your key areas of
          expertise, and end with what you&apos;re looking for next.
        </Text>
      </div>
    </SectionCard>
  );
}
