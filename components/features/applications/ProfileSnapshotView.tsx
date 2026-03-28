import { Text } from "@/components/ui/Text";
import { Profile } from "@/services/types";
import { Badge } from "@/components/ui/Badge";

interface ProfileSnapshotViewProps {
  profile: Profile;
}

export function ProfileSnapshotView({ profile }: ProfileSnapshotViewProps) {
  return (
    <div className="bg-white border border-border p-8 flex flex-col gap-8">
      <div>
        <Text variant="title_lg" className="text-neutral-100 mb-4">
          Profile Snapshot
        </Text>
        <Text variant="body_md" className="text-neutral-60 leading-7">
          {profile.summary || "No summary provided."}
        </Text>
      </div>

      {/* Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Text variant="body_md" className="font-bold text-neutral-100 mb-3">
            Technical Skills
          </Text>
          <div className="flex flex-wrap gap-2">
            {profile.technicalSkills?.map((skill) => (
              <Badge key={skill} label={skill} color="#4640DE" />
            ))}
          </div>
        </div>
        <div>
          <Text variant="body_md" className="font-bold text-neutral-100 mb-3">
            Tools
          </Text>
          <div className="flex flex-wrap gap-2">
            {profile.tools?.map((tool) => (
              <Badge key={tool} label={tool} color="#56CDAD" />
            ))}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div>
        <Text variant="body_md" className="font-bold text-neutral-100 mb-4">
          Work Experience
        </Text>
        <div className="flex flex-col gap-6">
          {profile.experiences?.map((exp, idx) => (
            <div key={idx} className="border-l-2 border-primary/20 pl-4">
              <Text variant="body_lg" className="font-semibold text-neutral-100">
                {exp.role}
              </Text>
              <Text variant="body_md" className="text-primary font-medium">
                {exp.company}
              </Text>
              <Text variant="body_sm" className="text-neutral-60 mb-2">
                {exp.startDate} - {exp.endDate || "Present"} | {exp.location}
              </Text>
              <ul className="list-disc list-inside flex flex-col gap-1">
                {exp.bullets?.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-neutral-60 text-[14px]">
                    {bullet.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <Text variant="body_md" className="font-bold text-neutral-100 mb-4">
          Education
        </Text>
        <div className="flex flex-col gap-4">
          {profile.education?.map((edu, idx) => (
            <div key={idx}>
              <Text variant="body_md" className="font-semibold text-neutral-100">
                {edu.degree}
              </Text>
              <Text variant="body_sm" className="text-neutral-60">
                {edu.institution} | {edu.startDate} - {edu.endDate}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <Text variant="body_md" className="font-bold text-neutral-100 mb-4">
          Projects
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.projects?.map((project, idx) => (
            <div key={idx} className="p-4 border border-border bg-light-gray">
              <Text variant="body_md" className="font-semibold text-neutral-100">
                {project.name}
              </Text>
              <Text variant="body_sm" className="text-neutral-60 mb-2 truncate">
                {project.link}
              </Text>
              <Text variant="body_sm" className="text-neutral-60 line-clamp-2">
                {project.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
