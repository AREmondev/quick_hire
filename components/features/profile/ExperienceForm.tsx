"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema, type ExperienceInput } from "@/lib/validations";
import { FormInput } from "@/components/features/profile/FormComponents";
import { Button } from "@/components/ui/Button";

interface ExperienceFormProps {
  onSubmit: (data: ExperienceInput) => void;
  defaultValues?: ExperienceInput;
  isLoading?: boolean;
}

export function ExperienceForm({
  onSubmit,
  defaultValues,
  isLoading,
}: ExperienceFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ExperienceInput>({
    resolver: zodResolver(experienceSchema),
    defaultValues: defaultValues || {
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      bullets: [{ description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bullets",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Company"
          placeholder="Company name"
          {...register("company")}
          error={errors.company?.message}
        />
        <FormInput
          label="Role / Title"
          placeholder="Job title"
          {...register("role")}
          error={errors.role?.message}
        />
        <FormInput
          label="Location"
          placeholder="City, Country"
          {...register("location")}
          error={errors.location?.message}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label="Start Date"
            placeholder="Jan 2023"
            {...register("startDate")}
            error={errors.startDate?.message}
          />
          <FormInput
            label="End Date"
            placeholder="Present"
            {...register("endDate")}
            error={errors.endDate?.message}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[13px] font-semibold text-neutral-80 uppercase tracking-wide">
          Key Achievements / Bullets
        </label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <FormInput
              label=""
              placeholder={`Achievement #${index + 1}`}
              {...register(`bullets.${index}.description`)}
              error={errors.bullets?.[index]?.description?.message}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => remove(index)}
              className="h-11 w-11 shrink-0 bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              ×
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ description: "" })}
          className="text-sm border border-border hover:bg-light-gray transition-colors"
        >
          + Add Bullet
        </Button>
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          {defaultValues ? "Save Changes" : "Add Experience"}
        </Button>
      </div>
    </form>
  );
}
