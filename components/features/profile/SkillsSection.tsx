import { useFormContext } from "react-hook-form";
import {
  useUpdateSkillsMutation,
  useAddSkillMutation,
  useRemoveSkillMutation,
} from "@/hooks/profile";
import { useToast } from "@/hooks/useToast";
import { ProfileInput } from "@/lib/validations";
import {
  TagInput,
  SectionCardWithFooter as SectionCard,
} from "./FormComponents";

export function SkillsSection() {
  const { setValue, watch } = useFormContext<ProfileInput>();

  const softSkillsAdd = useAddSkillMutation();
  const softSkillsRemove = useRemoveSkillMutation();

  const techSkillsAdd = useAddSkillMutation();
  const techSkillsRemove = useRemoveSkillMutation();

  const toolsAdd = useAddSkillMutation();
  const toolsRemove = useRemoveSkillMutation();

  const { show } = useToast();

  const skills = watch("skills") || [];
  const technicalSkills = watch("technicalSkills") || [];
  const tools = watch("tools") || [];

  const handleAddSoftSkill = async (value: string) => {
    try {
      await softSkillsAdd.mutateAsync({ type: "skills", skill: value });
      setValue("skills", [...skills, value], { shouldDirty: true });
      show("Soft skill added successfully!", "success");
    } catch (error) {
      show("Failed to add soft skill.", "error");
    }
  };

  const handleRemoveSoftSkill = async (value: string) => {
    try {
      await softSkillsRemove.mutateAsync({ type: "skills", skill: value });
      setValue(
        "skills",
        skills.filter((t) => t !== value),
        { shouldDirty: true },
      );
      show("Soft skill removed successfully!", "success");
    } catch (error) {
      show("Failed to remove soft skill.", "error");
    }
  };

  const handleAddTechSkill = async (value: string) => {
    try {
      await techSkillsAdd.mutateAsync({
        type: "technicalSkills",
        skill: value,
      });
      setValue("technicalSkills", [...technicalSkills, value], {
        shouldDirty: true,
      });
      show("Technical skill added successfully!", "success");
    } catch (error) {
      show("Failed to add technical skill.", "error");
    }
  };

  const handleRemoveTechSkill = async (value: string) => {
    try {
      await techSkillsRemove.mutateAsync({
        type: "technicalSkills",
        skill: value,
      });
      setValue(
        "technicalSkills",
        technicalSkills.filter((t) => t !== value),
        { shouldDirty: true },
      );
      show("Technical skill removed successfully!", "success");
    } catch (error) {
      show("Failed to remove technical skill.", "error");
    }
  };

  const handleAddTool = async (value: string) => {
    try {
      await toolsAdd.mutateAsync({ type: "tools", skill: value });
      setValue("tools", [...tools, value], { shouldDirty: true });
      show("Tool added successfully!", "success");
    } catch (error) {
      show("Failed to add tool.", "error");
    }
  };

  const handleRemoveTool = async (value: string) => {
    try {
      await toolsRemove.mutateAsync({ type: "tools", skill: value });
      setValue(
        "tools",
        tools.filter((t) => t !== value),
        { shouldDirty: true },
      );
      show("Tool removed successfully!", "success");
    } catch (error) {
      show("Failed to remove tool.", "error");
    }
  };

  return (
    <>
      <SectionCard title="Soft Skills">
        <TagInput
          label="Add Skill"
          tags={skills}
          placeholder="e.g. Leadership, Communication"
          onAdd={handleAddSoftSkill}
          onRemove={handleRemoveSoftSkill}
          isLoading={softSkillsAdd.isPending || softSkillsRemove.isPending}
        />
      </SectionCard>
      <SectionCard title="Technical Skills">
        <TagInput
          label="Add Technical Skill"
          tags={technicalSkills}
          placeholder="e.g. React, TypeScript, GraphQL"
          onAdd={handleAddTechSkill}
          onRemove={handleRemoveTechSkill}
          isLoading={techSkillsAdd.isPending || techSkillsRemove.isPending}
        />
      </SectionCard>
      <SectionCard title="Tools & Software">
        <TagInput
          label="Add Tool"
          tags={tools}
          placeholder="e.g. Figma, VS Code, Docker"
          onAdd={handleAddTool}
          onRemove={handleRemoveTool}
          isLoading={toolsAdd.isPending || toolsRemove.isPending}
        />
      </SectionCard>
    </>
  );
}
