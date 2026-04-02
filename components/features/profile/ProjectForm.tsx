"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectInput } from "@/lib/validations";
import { FormInput, FormTextArea } from "@/components/features/profile/FormComponents";
import { Button } from "@/components/ui/Button";

interface ProjectFormProps {
  onSubmit: (data: ProjectInput) => void;
  defaultValues?: ProjectInput;
  isLoading?: boolean;
}

export function ProjectForm({
  onSubmit,
  defaultValues,
  isLoading,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      link: "",
      tech: [],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Project Name"
          placeholder="e.g. E-commerce Platform"
          {...register("name")}
          error={errors.name?.message}
        />
        <FormInput
          label="Link"
          placeholder="https://github.com/..."
          {...register("link")}
          error={errors.link?.message}
        />
      </div>
      <FormTextArea
        label="Description"
        placeholder="Briefly describe what you built..."
        {...register("description")}
        error={errors.description?.message}
      />
      {/* Tech stack could be handled with a TagInput component if needed */}
      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          {defaultValues ? "Save Changes" : "Add Project"}
        </Button>
      </div>
    </form>
  );
}
