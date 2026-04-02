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

      <div className=" flex flex-col gap-3 ">
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
              className="flex-1 min-h-11!"
            />

            <button
              onClick={() => remove(index)}
              // disabled={deleteMutation.isPending}
              className="p-2 rounded-md text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              aria-label="Delete experience"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ description: "" })}
          className="text-sm border max-w-fit border-border transition-colors"
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
