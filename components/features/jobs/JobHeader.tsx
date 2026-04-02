import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/constants";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { OutlineBadge } from "@/components/ui/Badge";
import { calculateDaysAgo } from "@/lib/utils";
import { Job } from "@/services/types";
import { JobInterection } from "./JobInterection";

interface JobHeaderProps {
  job: Job;
}

export function JobHeader({ job }: JobHeaderProps) {
  return (
    <div className="bg-white border-b border-border">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 border border-border bg-light-gray flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                src={job.company?.logoUrl || IMAGES.COMPANY_LOGO_1}
                alt={`${job.company?.name || "Company Name"} logo`}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <div>
              <Text variant="h2" className="text-neutral-100">
                {job.title || "Job Title"}
              </Text>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Text
                  className="text-neutral-60 font-semibold"
                  variant="body_md"
                >
                  {job.company?.name || "Company Name"}
                </Text>
                <Text className="text-neutral-60" variant="body_sm">
                  |
                </Text>
                <Text className="text-neutral-60" variant="body_sm">
                  {job.location}
                </Text>
                <Text className="text-neutral-60" variant="body_sm">
                  |
                </Text>
                <Text className="text-neutral-60" variant="body_sm">
                  Posted {calculateDaysAgo(job.postedAt || "")} days ago
                </Text>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {job.isRemote && <OutlineBadge label="Remote" color="#26A4FF" />}
            <OutlineBadge label={job.jobType.name} color="#56CDAD" />
            <OutlineBadge label={job.experienceLevel.name} color="#FFB836" />
          </div>
          <JobInterection
            isSaved={job.isSaved || false}
            slug={job.slug || ""}
            id={job.id || ""}
            isApplied={job.isApplied}
            applicationId={job.applicationId}
          />
        </div>
      </div>
    </div>
  );
}
