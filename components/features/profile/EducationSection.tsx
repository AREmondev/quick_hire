import { UseFormRegister, FieldErrors, FieldArrayWithId } from "react-hook-form";
import { ProfileInput } from "@/lib/validations";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { FormInput, SectionCard } from "./FormComponents";

interface EducationSectionProps {
  register: UseFormRegister<ProfileInput>;
  errors: FieldErrors<ProfileInput>;
  fields: FieldArrayWithId<ProfileInput, "education">[];
  append: (value: any) => void;
  remove: (index: number) => void;
}

export function EducationSection({
  register,
  errors,
  fields,
  append,
  remove,
}: EducationSectionProps) {
  const addEducation = () => {
    append({
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      details: "",
    });
  };

  return (
    <SectionCard
      title="Education"
      action={
        <Button
          onClick={addEducation}
          type="button"
          className="h-9 px-5 text-[13px]"
        >
          + Add Education
        </Button>
      }
    >
      {fields.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-neutral-20">
          <Text variant="body_md" className="text-neutral-60 text-center mb-3">
            No education history added yet.
          </Text>
          <Button onClick={addEducation} type="button">
            Add Your First Education
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {fields.map((field, i) => (
            <div key={field.id} className="border border-border p-6 relative">
              <button
                onClick={() => remove(i)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-neutral-60 hover:text-accent-red transition-colors border border-border hover:border-accent-red"
                type="button"
              >
                ×
              </button>
              <Text
                variant="body_sm"
                className="text-primary font-bold uppercase tracking-wide mb-4"
              >
                Education {i + 1}
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormInput
                  label="Institution"
                  placeholder="University name"
                  {...register(`education.${i}.institution`)}
                  error={errors.education?.[i]?.institution?.message}
                />
                <FormInput
                  label="Degree"
                  placeholder="e.g. Bachelor of Science"
                  {...register(`education.${i}.degree`)}
                  error={errors.education?.[i]?.degree?.message}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormInput
                    label="Start Date"
                    placeholder="2018"
                    {...register(`education.${i}.startDate`)}
                    error={errors.education?.[i]?.startDate?.message}
                  />
                  <FormInput
                    label="End Date"
                    placeholder="2022"
                    {...register(`education.${i}.endDate`)}
                    error={errors.education?.[i]?.endDate?.message}
                  />
                </div>
              </div>
              <FormInput
                label="Details / Achievements"
                placeholder="Major in Computer Science, GPA 3.8..."
                {...register(`education.${i}.details`)}
                error={errors.education?.[i]?.details?.message}
              />
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
