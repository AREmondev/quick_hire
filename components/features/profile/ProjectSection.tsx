import { Profile, Project } from "@/services/types";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { FormInput, FormTextArea, SectionCard } from "./FormComponents";

interface ProjectSectionProps {
  profile: Profile;
  setProfile: (p: Profile) => void;
}

export function ProjectSection({ profile, setProfile }: ProjectSectionProps) {
  const addProject = () => {
    const p: Project = { name: "", link: "", description: "", tech: [] };
    setProfile({ ...profile, projects: [...profile.projects, p] });
  };
  const updateProject = (i: number, patch: Partial<Project>) => {
    const arr = [...profile.projects];
    arr[i] = { ...arr[i], ...patch };
    setProfile({ ...profile, projects: arr });
  };
  const removeProject = (i: number) =>
    setProfile({
      ...profile,
      projects: profile.projects.filter((_, idx) => idx !== i),
    });

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
      {profile.projects.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-neutral-20">
          <Text variant="body_md" className="text-neutral-60 text-center mb-3">
            No projects added yet.
          </Text>
          <Button onClick={addProject} type="button">
            Add Your First Project
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {profile.projects.map((pr, i) => (
            <div key={i} className="border border-border p-6 relative">
              <button
                onClick={() => removeProject(i)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-neutral-60 hover:text-accent-red transition-colors border border-border hover:border-accent-red"
                type="button"
              >
                ×
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Project Name"
                  placeholder="e.g. E-commerce Platform"
                  value={pr.name}
                  onChange={(e) => updateProject(i, { name: e.target.value })}
                />
                <FormInput
                  label="Live Link / Repo URL"
                  placeholder="https://github.com/..."
                  value={pr.link || ""}
                  onChange={(e) => updateProject(i, { link: e.target.value })}
                />
                <FormTextArea
                  label="Description"
                  placeholder="What does it do? What problem does it solve?"
                  value={pr.description}
                  onChange={(e) =>
                    updateProject(i, { description: e.target.value })
                  }
                  className="md:col-span-2"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
