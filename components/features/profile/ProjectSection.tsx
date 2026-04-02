import { UseFormRegister, FieldErrors, FieldArrayWithId } from "react-hook-form";
import { ProfileInput } from "@/lib/validations";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { FormInput, SectionCard } from "./FormComponents";

interface ProjectSectionProps {
  register: UseFormRegister<ProfileInput>;
  errors: FieldErrors<ProfileInput>;
  fields: FieldArrayWithId<ProfileInput, "projects">[];
  append: (value: any) => void;
  remove: (index: number) => void;
}

export function ProjectSection({
  register,
  errors,
  fields,
  append,
  remove,
}: ProjectSectionProps) {
  const addProject = () => {
    append({
      name: "",
      description: "",
      link: "",
      tech: [],
    });
  };

  return (
    <SectionCard
      title="Projects"
      action={
        <Button
          onClick={addProject}
          type="button"
          className="h-9 px-5 text-[13px]"
        >
          + Add Project
        </Button>
      }
    >
      {fields.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-neutral-20">
          <Text variant="body_md" className="text-neutral-60 text-center mb-3">
            No projects added yet.
          </Text>
          <Button onClick={addProject} type="button">
            Add Your First Project
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
                Project {i + 1}
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormInput
                  label="Project Name"
                  placeholder="e.g. E-commerce Platform"
                  {...register(`projects.${i}.name`)}
                  error={errors.projects?.[i]?.name?.message}
                />
                <FormInput
                  label="Link"
                  placeholder="https://github.com/..."
                  {...register(`projects.${i}.link`)}
                  error={errors.projects?.[i]?.link?.message}
                />
              </div>
              <FormInput
                label="Description"
                placeholder="Briefly describe what you built..."
                {...register(`projects.${i}.description`)}
                error={errors.projects?.[i]?.description?.message}
              />
              {/* Tech stack could be handled similarly to skills if needed */}
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
