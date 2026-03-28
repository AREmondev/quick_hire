import { Profile, Education } from "@/services/types";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { FormInput, FormTextArea, SectionCard } from "./FormComponents";

interface EducationSectionProps {
  profile: Profile;
  setProfile: (p: Profile) => void;
}

export function EducationSection({ profile, setProfile }: EducationSectionProps) {
  const addEducation = () => {
    const e: Education = {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      details: "",
    };
    setProfile({ ...profile, education: [...profile.education, e] });
  };
  const updateEducation = (i: number, patch: Partial<Education>) => {
    const arr = [...profile.education];
    arr[i] = { ...arr[i], ...patch };
    setProfile({ ...profile, education: arr });
  };
  const removeEducation = (i: number) =>
    setProfile({
      ...profile,
      education: profile.education.filter((_, idx) => idx !== i),
    });

  return (
    <SectionCard
      title="Education"
      action={
        <Button
          onClick={addEducation}
          type="button"
          className="h-9 px-5 text-[13px]"
        >
          + Add Education
        </Button>
      }
    >
      {profile.education.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-neutral-20">
          <Text variant="body_md" className="text-neutral-60 mb-3">
            No education records added yet.
          </Text>
          <Button onClick={addEducation} type="button">
            Add Education
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {profile.education.map((ed, i) => (
            <div
              key={i}
              className="border border-border p-6 relative"
            >
              <button
                onClick={() => removeEducation(i)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-neutral-60 hover:text-accent-red transition-colors border border-border hover:border-accent-red"
                type="button"
              >
                ×
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Institution"
                  placeholder="University / College name"
                  value={ed.institution}
                  onChange={(e) =>
                    updateEducation(i, {
                      institution: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Degree / Field"
                  placeholder="e.g. B.Sc. Computer Science"
                  value={ed.degree}
                  onChange={(e) =>
                    updateEducation(i, { degree: e.target.value })
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormInput
                    label="Start Date"
                    placeholder="Sep 2019"
                    value={ed.startDate}
                    onChange={(e) =>
                      updateEducation(i, {
                        startDate: e.target.value,
                      })
                    }
                  />
                  <FormInput
                    label="End Date"
                    placeholder="Jun 2023"
                    value={ed.endDate}
                    onChange={(e) =>
                      updateEducation(i, { endDate: e.target.value })
                    }
                  />
                </div>
                <FormTextArea
                  label="Details"
                  placeholder="GPA, honors, relevant coursework..."
                  value={ed.details || ""}
                  onChange={(e) =>
                    updateEducation(i, { details: e.target.value })
                  }
                  className="md:col-span-1"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
