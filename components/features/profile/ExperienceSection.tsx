import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useUpdateProfileMutation } from "@/hooks/profile";
import { useToast } from "@/hooks/useToast";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SectionCardWithFooter as SectionCard } from "./FormComponents";
import { ExperienceForm } from "./ExperienceForm";
import type { ProfileInput, ExperienceInput } from "@/lib/validations";

export function ExperienceSection() {
  const { control, getValues, setValue } = useFormContext<ProfileInput>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "experiences",
  });

  const mutation = useUpdateProfileMutation();
  const toast = useToast();

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

  const onSave = async (data: ExperienceInput) => {
    const currentExperiences = getValues("experiences") || [];
    let newExperiences;

    if (editingIndex !== null) {
      newExperiences = currentExperiences.map((exp, i) =>
        i === editingIndex ? data : exp,
      );
    } else {
      newExperiences = [...currentExperiences, data];
    }

    try {
      await mutation.mutateAsync({ experiences: newExperiences } as any);
      setValue("experiences", newExperiences, { shouldDirty: true });
      toast.show("Experience saved successfully!", "success");
      closeModal();
    } catch (error) {
      toast.show("Failed to save experience.", "error");
    }
  };

  const onDelete = async (index: number) => {
    const newExperiences = fields.filter((_, i) => i !== index);
    try {
      await mutation.mutateAsync({ experiences: newExperiences } as any);
      remove(index);
      toast.show("Experience deleted successfully!", "success");
    } catch (error) {
      toast.show("Failed to delete experience.", "error");
    }
  };

  return (
    <>
      <SectionCard
        title="Work Experience"
        action={
          <Button
            onClick={() => openModal()}
            type="button"
            className="h-9 px-5 text-[13px]"
          >
            + Add Experience
          </Button>
        }
      >
        {fields.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-neutral-20">
            <Text
              variant="body_md"
              className="text-neutral-60 text-center mb-3"
            >
              No work experience added yet.
            </Text>
            <Button onClick={() => openModal()} type="button">
              Add Your First Experience
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
                  <Text className="font-semibold">{field.role}</Text>
                  <Text variant="body_sm" className="text-neutral-60">
                    {field.company} • {field.startDate} -{" "}
                    {field.endDate || "Present"}
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
        title={editingIndex !== null ? "Edit Experience" : "Add Experience"}
      >
        <ExperienceForm
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
