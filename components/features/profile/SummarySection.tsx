import { useFormContext } from "react-hook-form";
import { ProfileInput } from "@/lib/validations";
import { Text } from "@/components/ui/Text";
import { FormTextArea, SectionCardWithFooter } from "./FormComponents";
import { Button } from "@/components/ui/Button";
import { useUpdateSummaryMutation } from "@/hooks/profile";
import { useToast } from "@/hooks/useToast";

export function SummarySection() {
  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
  } = useFormContext<ProfileInput>();

  const updateSummaryMutation = useUpdateSummaryMutation();
  const { show } = useToast();

  const isDirty = !!dirtyFields.summary;

  const onSave = async (data: ProfileInput) => {
    try {
      await updateSummaryMutation.mutateAsync(data.summary || "");
      show("Professional summary updated successfully.", "success");
    } catch (error: any) {
      show(error.message || "Failed to update summary.", "error");
    }
  };

  return (
    <SectionCardWithFooter
      title="Professional Summary"
      footer={
        isDirty && (
          <Button
            onClick={handleSubmit(onSave)}
            isLoading={updateSummaryMutation.isPending}
          >
            Save Summary
          </Button>
        )
      }
    >
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
    </SectionCardWithFooter>
  );
}
