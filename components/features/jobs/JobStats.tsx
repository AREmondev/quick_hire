import { Badge } from "@/components/ui/Badge";
import { Text } from "@/components/ui/Text";
import { formatSalary } from "@/lib/utils";
import { categoryColors } from "@/lib/jobs";
import { Job } from "@/services/types";

interface JobStatsProps {
  job: Job;
}

export function JobStats({ job }: JobStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border">
      <div className="flex flex-col gap-1">
        <Text variant="body_sm" className="text-neutral-60">
          Salary Range
        </Text>
        <Text variant="body_md" className="font-semibold text-neutral-100">
          {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <Text variant="body_sm" className="text-neutral-60">
          Applicants
        </Text>
        <Text variant="body_md" className="font-semibold text-neutral-100">
          {job.applicationsCount || 0} people applied
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <Text variant="body_sm" className="text-neutral-60">
          Deadline
        </Text>
        <Text variant="body_md" className="font-semibold text-neutral-100">
          {job.deadline ? new Date(job.deadline).toLocaleDateString() : "N/A"}
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        <Text variant="body_sm" className="text-neutral-60">
          Categories
        </Text>
        <div className="flex gap-2 flex-wrap">
          {job.categories.map((cat) => (
            <Badge
              key={cat.slug}
              label={cat.name || "Category"}
              color={categoryColors[cat.slug] || "#4640DE"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
