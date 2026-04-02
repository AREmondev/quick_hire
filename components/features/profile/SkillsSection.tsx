import { useFormContext } from "react-hook-form";
import { useUpdateProfileMutation } from "@/hooks/profile";
import { useToast } from "@/hooks/useToast";
import { ProfileInput } from "@/lib/validations";
import {
  TagInput,
  SectionCardWithFooter as SectionCard,
} from "./FormComponents";

export function SkillsSection() {
  const { setValue, watch } = useFormContext<ProfileInput>();
  const mutation = useUpdateProfileMutation();
  const { show } = useToast();

  const skills = watch("skills") || [];
  const technicalSkills = watch("technicalSkills") || [];
  const tools = watch("tools") || [];

  const handleUpdate = async (field: keyof ProfileInput, value: string[]) => {
    try {
      await mutation.mutateAsync({ [field]: value } as any);
      setValue(field, value, { shouldDirty: true });
      show("Skills updated successfully!", "success");
    } catch (error) {
      show("Failed to update skills.", "error");
    }
  };

  const addSkill = (v: string) => {
    if (!skills.includes(v)) {
      handleUpdate("skills", [...skills, v]);
    }
  };
  const removeSkill = (v: string) => {
    handleUpdate(
      "skills",
      skills.filter((s) => s !== v),
    );
  };

  const addTech = (v: string) => {
    if (!technicalSkills.includes(v)) {
      handleUpdate("technicalSkills", [...technicalSkills, v]);
    }
  };
  const removeTech = (v: string) => {
    handleUpdate(
      "technicalSkills",
      technicalSkills.filter((s) => s !== v),
    );
  };

  const addTool = (v: string) => {
    if (!tools.includes(v)) {
      handleUpdate("tools", [...tools, v]);
    }
  };
  const removeTool = (v: string) => {
    handleUpdate(
      "tools",
      tools.filter((s) => s !== v),
    );
  };

  return (
    <>
      <SectionCard title="Soft Skills">
        <TagInput
          label="Add Skill"
          tags={skills}
          placeholder="e.g. Leadership, Communication"
          onAdd={addSkill}
          onRemove={removeSkill}
          isLoading={mutation.isPending}
        />
      </SectionCard>
      <SectionCard title="Technical Skills">
        <TagInput
          label="Add Technical Skill"
          tags={technicalSkills}
          placeholder="e.g. React, TypeScript, GraphQL"
          onAdd={addTech}
          onRemove={removeTech}
          isLoading={mutation.isPending}
        />
      </SectionCard>
      <SectionCard title="Tools & Software">
        <TagInput
          label="Add Tool"
          tags={tools}
          placeholder="e.g. Figma, VS Code, Docker"
          onAdd={addTool}
          onRemove={removeTool}
          isLoading={mutation.isPending}
        />
      </SectionCard>
    </>
  );
}
