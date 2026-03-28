import { Profile } from "@/services/types";
import { TagInput, SectionCard } from "./FormComponents";

interface SkillsSectionProps {
  profile: Profile;
  setProfile: (p: Profile) => void;
}

export function SkillsSection({ profile, setProfile }: SkillsSectionProps) {
  const addSkill = (v: string) => {
    if (!profile.skills.includes(v))
      setProfile({ ...profile, skills: [...profile.skills, v] });
  };
  const removeSkill = (v: string) =>
    setProfile({ ...profile, skills: profile.skills.filter((s) => s !== v) });

  const addTech = (v: string) => {
    const arr = profile.technicalSkills || [];
    if (!arr.includes(v))
      setProfile({ ...profile, technicalSkills: [...arr, v] });
  };
  const removeTech = (v: string) =>
    setProfile({
      ...profile,
      technicalSkills: (profile.technicalSkills || []).filter((s) => s !== v),
    });

  const addTool = (v: string) => {
    const arr = profile.tools || [];
    if (!arr.includes(v)) setProfile({ ...profile, tools: [...arr, v] });
  };
  const removeTool = (v: string) =>
    setProfile({
      ...profile,
      tools: (profile.tools || []).filter((s) => s !== v),
    });

  return (
    <>
      <SectionCard title="Soft Skills">
        <TagInput
          label="Add Skill"
          tags={profile.skills}
          placeholder="e.g. Leadership, Communication"
          onAdd={addSkill}
          onRemove={removeSkill}
        />
      </SectionCard>
      <SectionCard title="Technical Skills">
        <TagInput
          label="Add Technical Skill"
          tags={profile.technicalSkills || []}
          placeholder="e.g. React, TypeScript, GraphQL"
          onAdd={addTech}
          onRemove={removeTech}
        />
      </SectionCard>
      <SectionCard title="Tools & Software">
        <TagInput
          label="Add Tool"
          tags={profile.tools || []}
          placeholder="e.g. Figma, VS Code, Docker"
          onAdd={addTool}
          onRemove={removeTool}
        />
      </SectionCard>
    </>
  );
}
