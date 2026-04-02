import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useUpdateProfileMutation } from "@/hooks/profile";
import { useToast } from "@/hooks/useToast";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SectionCardWithFooter as SectionCard } from "./FormComponents";
import { EducationForm } from "./EducationForm";
import type { ProfileInput, EducationInput } from "@/lib/validations";

export function EducationSection() {
  const { control, getValues, setValue } = useFormContext<ProfileInput>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "education",
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

  const onSave = async (data: EducationInput) => {
    const currentEducation = getValues("education") || [];
    let newEducation;

    if (editingIndex !== null) {
      newEducation = currentEducation.map((edu, i) =>
        i === editingIndex ? data : edu,
      );
    } else {
      newEducation = [...currentEducation, data];
    }

    try {
      await mutation.mutateAsync({ education: newEducation } as any);
      setValue("education", newEducation, { shouldDirty: true });
      show("Education saved successfully!", "success");
      closeModal();
    } catch (error) {
      show("Failed to save education.", "error");
    }
  };

  const onDelete = async (index: number) => {
    const newEducation = fields.filter((_, i) => i !== index);
    try {
      await mutation.mutateAsync({ education: newEducation } as any);
      remove(index);
      show("Education deleted successfully!", "success");
    } catch (error) {
      show("Failed to delete education.", "error");
    }
  };

  return (
    <>
      <SectionCard
        title="Education"
        action={
          <Button
            onClick={() => openModal()}
            type="button"
            className="h-9 px-5 text-[13px]"
          >
            + Add Education
          </Button>
        }
      >
        {fields.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-neutral-20">
            <Text
              variant="body_md"
              className="text-neutral-60 text-center mb-3"
            >
              No education history added yet.
            </Text>
            <Button onClick={() => openModal()} type="button">
              Add Your First Education
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
                  <Text className="font-semibold">{field.institution}</Text>
                  <Text variant="body_sm" className="text-neutral-60">
                    {field.degree} • {field.startDate} -{" "}
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
        title={editingIndex !== null ? "Edit Education" : "Add Education"}
      >
        <EducationForm
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
