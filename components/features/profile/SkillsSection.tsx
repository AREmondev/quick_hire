import { UseFormSetValue } from "react-hook-form";
import { ProfileInput } from "@/lib/validations";
import { TagInput, SectionCard } from "./FormComponents";

interface SkillsSectionProps {
  setValue: UseFormSetValue<ProfileInput>;
  skills: string[];
  technicalSkills: string[];
  tools: string[];
}

export function SkillsSection({
  setValue,
  skills,
  technicalSkills,
  tools,
}: SkillsSectionProps) {
  const addSkill = (v: string) => {
    if (!skills.includes(v)) {
      setValue("skills", [...skills, v], { shouldDirty: true });
    }
  };
  const removeSkill = (v: string) => {
    setValue(
      "skills",
      skills.filter((s) => s !== v),
      { shouldDirty: true },
    );
  };

  const addTech = (v: string) => {
    if (!technicalSkills.includes(v)) {
      setValue("technicalSkills", [...technicalSkills, v], {
        shouldDirty: true,
      });
    }
  };
  const removeTech = (v: string) => {
    setValue(
      "technicalSkills",
      technicalSkills.filter((s) => s !== v),
      { shouldDirty: true },
    );
  };

  const addTool = (v: string) => {
    if (!tools.includes(v)) {
      setValue("tools", [...tools, v], { shouldDirty: true });
    }
  };
  const removeTool = (v: string) => {
    setValue(
      "tools",
      tools.filter((s) => s !== v),
      { shouldDirty: true },
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
        />
      </SectionCard>
      <SectionCard title="Technical Skills">
        <TagInput
          label="Add Technical Skill"
          tags={technicalSkills}
          placeholder="e.g. React, TypeScript, GraphQL"
          onAdd={addTech}
          onRemove={removeTech}
        />
      </SectionCard>
      <SectionCard title="Tools & Software">
        <TagInput
          label="Add Tool"
          tags={tools}
          placeholder="e.g. Figma, VS Code, Docker"
          onAdd={addTool}
          onRemove={removeTool}
        />
      </SectionCard>
    </>
  );
}
