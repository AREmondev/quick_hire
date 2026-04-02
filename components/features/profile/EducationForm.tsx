"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationSchema, type EducationInput } from "@/lib/validations";
import { FormInput, FormTextArea } from "@/components/features/profile/FormComponents";
import { Button } from "@/components/ui/Button";

interface EducationFormProps {
  onSubmit: (data: EducationInput) => void;
  defaultValues?: EducationInput;
  isLoading?: boolean;
}

export function EducationForm({
  onSubmit,
  defaultValues,
  isLoading,
}: EducationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationInput>({
    resolver: zodResolver(educationSchema),
    defaultValues: defaultValues || {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      details: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Institution"
          placeholder="University name"
          {...register("institution")}
          error={errors.institution?.message}
        />
        <FormInput
          label="Degree"
          placeholder="e.g. Bachelor of Science"
          {...register("degree")}
          error={errors.degree?.message}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label="Start Date"
            placeholder="2018"
            {...register("startDate")}
            error={errors.startDate?.message}
          />
          <FormInput
            label="End Date"
            placeholder="2022"
            {...register("endDate")}
            error={errors.endDate?.message}
          />
        </div>
      </div>
      <FormTextArea
        label="Details / Achievements"
        placeholder="Major in Computer Science, GPA 3.8..."
        {...register("details")}
        error={errors.details?.message}
      />
      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          {defaultValues ? "Save Changes" : "Add Education"}
        </Button>
      </div>
    </form>
  );
}
