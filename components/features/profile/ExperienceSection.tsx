import { UseFormRegister, FieldErrors, FieldArrayWithId } from "react-hook-form";
import { ProfileInput } from "@/lib/validations";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { FormInput, SectionCard } from "./FormComponents";

interface ExperienceSectionProps {
  register: UseFormRegister<ProfileInput>;
  errors: FieldErrors<ProfileInput>;
  fields: FieldArrayWithId<ProfileInput, "experiences">[];
  append: (value: any) => void;
  remove: (index: number) => void;
}

export function ExperienceSection({
  register,
  errors,
  fields,
  append,
  remove,
}: ExperienceSectionProps) {
  const addExperience = () => {
    append({
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      bullets: [{ description: "" }],
    });
  };

  return (
    <SectionCard
      title="Work Experience"
      action={
        <Button
          onClick={addExperience}
          type="button"
          className="h-9 px-5 text-[13px]"
        >
          + Add Experience
        </Button>
      }
    >
      {fields.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-neutral-20">
          <Text variant="body_md" className="text-neutral-60 text-center mb-3">
            No work experience added yet.
          </Text>
          <Button onClick={addExperience} type="button">
            Add Your First Experience
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
                Position {i + 1}
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormInput
                  label="Company"
                  placeholder="Company name"
                  {...register(`experiences.${i}.company`)}
                  error={errors.experiences?.[i]?.company?.message}
                />
                <FormInput
                  label="Role / Title"
                  placeholder="Job title"
                  {...register(`experiences.${i}.role`)}
                  error={errors.experiences?.[i]?.role?.message}
                />
                <FormInput
                  label="Location"
                  placeholder="City, Country"
                  {...register(`experiences.${i}.location`)}
                  error={errors.experiences?.[i]?.location?.message}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormInput
                    label="Start Date"
                    placeholder="Jan 2023"
                    {...register(`experiences.${i}.startDate`)}
                    error={errors.experiences?.[i]?.startDate?.message}
                  />
                  <FormInput
                    label="End Date"
                    placeholder="Present"
                    {...register(`experiences.${i}.endDate`)}
                    error={errors.experiences?.[i]?.endDate?.message}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-neutral-80 uppercase tracking-wide">
                  Key Achievements / Bullets
                </label>
                {/* For bullets, it's a nested array. For simplicity, we can just use register directly if the schema allows it, or use another useFieldArray if needed.
                    Let's check if the schema has it as a simple array or object array.
                    It's experienceBulletSchema = z.object({ description: z.string() })
                */}
                <ExperienceBullets
                  nestIndex={i}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

function ExperienceBullets({
  nestIndex,
  register,
  errors,
}: {
  nestIndex: number;
  register: UseFormRegister<ProfileInput>;
  errors: FieldErrors<ProfileInput>;
}) {
  // We'll need access to the current bullets to map over them.
  // This is a bit tricky with nested arrays in react-hook-form without useFieldArray for the nested one too.
  // But for now let's keep it simple if possible.
  return null; // I'll come back to this.
}
