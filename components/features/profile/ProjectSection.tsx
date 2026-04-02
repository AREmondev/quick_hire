import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useUpdateProfileMutation } from "@/hooks/profile";
import { useToast } from "@/hooks/useToast";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SectionCardWithFooter as SectionCard } from "./FormComponents";
import { ProjectForm } from "./ProjectForm";
import type { ProfileInput, ProjectInput } from "@/lib/validations";

export function ProjectSection() {
  const { control, getValues, setValue } = useFormContext<ProfileInput>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "projects",
  });

  const mutation = useUpdateProfileMutation();
  const { show } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const openModal = (index: number | null = null) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const onSave = async (data: ProjectInput) => {
    const currentProjects = getValues("projects") || [];
    let newProjects;

    if (editingIndex !== null) {
      newProjects = currentProjects.map((proj, i) =>
        i === editingIndex ? data : proj,
      );
    } else {
      newProjects = [...currentProjects, data];
    }

    try {
      await mutation.mutateAsync({ projects: newProjects } as any);
      setValue("projects", newProjects, { shouldDirty: true });
      show("Project saved successfully!", "success");
      closeModal();
    } catch (error) {
      show("Failed to save project.", "error");
    }
  };

  const onDelete = async (index: number) => {
    const newProjects = fields.filter((_, i) => i !== index);
    try {
      await mutation.mutateAsync({ projects: newProjects } as any);
      remove(index);
      show("Project deleted successfully!", "success");
    } catch (error) {
      show("Failed to delete project.", "error");
    }
  };

  return (
    <>
      <SectionCard
        title="Projects"
        action={
          <Button
            onClick={() => openModal()}
            type="button"
            className="h-9 px-5 text-[13px]"
          >
            + Add Project
          </Button>
        }
      >
        {fields.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-neutral-20">
            <Text
              variant="body_md"
              className="text-neutral-60 text-center mb-3"
            >
              No projects added yet.
            </Text>
            <Button onClick={() => openModal()} type="button">
              Add Your First Project
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-border p-4 flex justify-between items-center"
              >
                <div>
                  <Text className="font-semibold">{field.name}</Text>
                  <Text variant="body_sm" className="text-neutral-60">
                    {field.description}
                  </Text>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="border border-border"
                    onClick={() => openModal(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="border border-red-500 text-red-500"
                    onClick={() => onDelete(index)}
                    isLoading={mutation.isPending}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingIndex !== null ? "Edit Project" : "Add Project"}
      >
        <ProjectForm
          onSubmit={onSave}
          defaultValues={
            editingIndex !== null ? fields[editingIndex] : undefined
          }
          isLoading={mutation.isPending}
        />
      </Modal>
    </>
  );
}
