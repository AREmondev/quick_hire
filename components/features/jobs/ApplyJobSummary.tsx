import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { Job } from "@/services/types";

interface ApplyJobSummaryProps {
  job: Job;
}

export function ApplyJobSummary({ job }: ApplyJobSummaryProps) {
  return (
    <div className="bg-white border border-border p-6 flex items-center gap-4 mb-6">
      <div className="w-14 h-14 border border-border flex items-center justify-center bg-light-gray shrink-0 overflow-hidden">
        {job.company?.logoUrl && (
          <Image
            src={job.company.logoUrl}
            alt={job.company.name || "Company logo"}
            width={40}
            height={40}
            className="object-contain"
          />
        )}
      </div>
      <div>
        <Text variant="title_lg" className="text-neutral-100">
          {job.title}
        </Text>
        <div className="flex items-center gap-2 mt-1">
          <Text variant="body_sm" className="text-neutral-60">
            {job.company?.name}
          </Text>
          <div className="w-1 h-1 rounded-full bg-neutral-60" />
          <Text variant="body_sm" className="text-neutral-60">
            {job.location}
          </Text>
        </div>
      </div>
    </div>
  );
}
