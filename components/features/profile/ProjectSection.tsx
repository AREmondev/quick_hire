import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "@/hooks/profile";
import { useToast } from "@/hooks/useToast";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { SectionCardWithFooter as SectionCard } from "./FormComponents";
import { ProjectForm } from "./ProjectForm";
import type { ProfileInput, ProjectInput } from "@/lib/validations";

export function ProjectSection() {
  const { control, getValues, setValue } = useFormContext<ProfileInput>();
  const { fields, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const addMutation = useAddProjectMutation();
  const updateMutation = useUpdateProjectMutation();
  const deleteMutation = useDeleteProjectMutation();
  const { show } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const openModal = (index: number | null = null) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const onSave = async (data: ProjectInput) => {
    try {
      if (editingIndex !== null) {
        const projectId = fields[editingIndex]?._id;
        if (!projectId) throw new Error("Project ID not found");

        await updateMutation.mutateAsync({ id: projectId, data });
        const currentProjects = getValues("projects") || [];
        setValue(
          "projects",
          currentProjects.map((proj, i) => (i === editingIndex ? data : proj)),
          { shouldDirty: true },
        );
        show("Project updated successfully!", "success");
      } else {
        const result = await addMutation.mutateAsync(data);
        const currentProjects = getValues("projects") || [];
        setValue("projects", [...currentProjects, result as any], {
          shouldDirty: true,
        });
        show("Project added successfully!", "success");
      }
      closeModal();
    } catch (error: any) {
      show(error.message || "Failed to save project.", "error");
    }
  };

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
  };

  const confirmDelete = async () => {
    if (deleteIndex === null) return;

    const projectId = fields[deleteIndex]?._id;
    if (!projectId) {
      setDeleteIndex(null);
      return;
    }

    try {
      await deleteMutation.mutateAsync(projectId);
      remove(deleteIndex);
      show("Project deleted successfully!", "success");
    } catch (error: any) {
      show(error.message || "Failed to delete project.", "error");
    } finally {
      setDeleteIndex(null);
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
                  {field.link && (
                    <Text variant="body_sm" className="text-primary">
                      {field.link}
                    </Text>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(index)}
                    className="p-2 rounded-md text-neutral-60 hover:text-neutral-90 hover:bg-neutral-10 transition-colors"
                    aria-label="Edit experience"
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
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(index)}
                    disabled={deleteMutation.isPending}
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
          isLoading={addMutation.isPending || updateMutation.isPending}
        />
      </Modal>

      <ConfirmationModal
        isOpen={deleteIndex !== null}
        onClose={() => setDeleteIndex(null)}
        onConfirm={confirmDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
