import { Profile, Experience } from "@/services/types";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { FormInput, SectionCard } from "./FormComponents";

interface ExperienceSectionProps {
  profile: Profile;
  setProfile: (p: Profile) => void;
}

export function ExperienceSection({
  profile,
  setProfile,
}: ExperienceSectionProps) {
  const addExperience = () => {
    const e: Experience = {
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      bullets: [{ description: "" }],
    };
    setProfile({ ...profile, experiences: [...profile.experiences, e] });
  };
  const updateExperience = (i: number, patch: Partial<Experience>) => {
    const arr = [...profile.experiences];
    arr[i] = { ...arr[i], ...patch };
    setProfile({ ...profile, experiences: arr });
  };
  const removeExperience = (i: number) =>
    setProfile({
      ...profile,
      experiences: profile.experiences.filter((_, idx) => idx !== i),
    });

  return (
    <SectionCard
      title="Work Experience"
      action={
        <Button
          onClick={addExperience}
          type="button"
          className="h-9 px-5 text-[13px]"
        >
          + Add Experience
        </Button>
      }
    >
      {profile.experiences.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-neutral-20">
          <Text variant="body_md" className="text-neutral-60 text-center mb-3">
            No work experience added yet.
          </Text>
          <Button onClick={addExperience} type="button">
            Add Your First Experience
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {profile.experiences.map((exp, i) => (
            <div key={i} className="border border-border p-6 relative">
              <button
                onClick={() => removeExperience(i)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-neutral-60 hover:text-accent-red transition-colors border border-border hover:border-accent-red"
                type="button"
              >
                ×
              </button>
              <Text
                variant="body_sm"
                className="text-primary font-bold uppercase tracking-wide mb-4"
              >
                Position {i + 1}
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormInput
                  label="Company"
                  placeholder="Company name"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(i, { company: e.target.value })
                  }
                />
                <FormInput
                  label="Role / Title"
                  placeholder="Job title"
                  value={exp.role}
                  onChange={(e) =>
                    updateExperience(i, { role: e.target.value })
                  }
                />
                <FormInput
                  label="Location"
                  placeholder="City, Country"
                  value={exp.location}
                  onChange={(e) =>
                    updateExperience(i, { location: e.target.value })
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormInput
                    label="Start Date"
                    placeholder="Jan 2023"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(i, {
                        startDate: e.target.value,
                      })
                    }
                  />
                  <FormInput
                    label="End Date"
                    placeholder="Present"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(i, { endDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-neutral-80 uppercase tracking-wide">
                  Key Achievements / Bullets
                </label>
                {exp.bullets.map((b, bi) => (
                  <div key={bi} className="flex gap-2">
                    <input
                      placeholder={`Achievement ${bi + 1}...`}
                      value={b.description}
                      onChange={(e) => {
                        const next = [...exp.bullets];
                        next[bi] = { description: e.target.value };
                        updateExperience(i, { bullets: next });
                      }}
                      className="flex-1 h-11 border border-border bg-white px-4 text-neutral-100 text-[15px] placeholder:text-neutral-60 focus:outline-none focus:border-primary transition-colors"
                    />
                    {exp.bullets.length > 1 && (
                      <button
                        onClick={() =>
                          updateExperience(i, {
                            bullets: exp.bullets.filter((_, idx) => idx !== bi),
                          })
                        }
                        type="button"
                        className="w-11 h-11 border border-border text-neutral-60 hover:text-accent-red hover:border-accent-red transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() =>
                    updateExperience(i, {
                      bullets: [...exp.bullets, { description: "" }],
                    })
                  }
                  type="button"
                  className="self-start h-9 px-4 border border-dashed border-neutral-60/40 text-neutral-60 text-[13px] font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  + Add Bullet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
