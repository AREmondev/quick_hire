import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/constants";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Job } from "@/services/types";
import { formatSalary, formatDate } from "@/lib/utils";

interface JobSidebarProps {
  job: Job;
}

export function JobSidebar({ job }: JobSidebarProps) {
  const coreDetails = [
    {
      label: "Salary",
      value: formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency),
    },
    { label: "Job Type", value: job.jobType.name },
    { label: "Experience", value: job.experienceLevel.name },
    { label: "Location", value: job.location },
    {
      label: "Posted",
      value: `${job.postedAt ? formatDate(job.postedAt) : "N/A"}`,
    },
    {
      label: "Deadline",
      value: `${job.deadline ? formatDate(job.deadline) : "N/A"}`,
    },
    { label: "Applicants", value: `${job.applicationsCount || 0} applied` },
  ];

  return (
    <aside className="lg:col-span-1">
      <div className="lg:sticky lg:top-[98px] flex flex-col gap-5">
        {/* Apply card */}
        <div className="p-6 bg-white border border-border">
          <Text className="mb-4 text-neutral-100" variant="title_lg">
            Apply for this job
          </Text>
          <div className="flex flex-col divide-y divide-border">
            {coreDetails.map((row) => (
              <div
                key={row.label}
                className="py-3 flex items-start justify-between gap-4"
              >
                <Text className="text-neutral-60 shrink-0" variant="body_sm">
                  {row.label}
                </Text>
                <Text
                  className="text-neutral-100 text-right font-medium"
                  variant="body_sm"
                >
                  {row.value}
                </Text>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3">
            {job.isApplied ? (
              <Link
                href={`/applications/${job.applicationId}`}
                className="w-full"
              >
                <Button className="w-full h-[50px] bg-green-500 hover:bg-green-600 border-none">
                  View Application
                </Button>
              </Link>
            ) : (
              <Link href={`/jobs/${job.slug}/apply`} className="w-full">
                <Button className="w-full h-[50px]">Apply Now</Button>
              </Link>
            )}
            {/* <button className="w-full h-[50px] border border-primary text-primary font-semibold text-[15px] hover:bg-primary hover:text-white transition-colors">
              Save Job
            </button> */}
          </div>
        </div>

        {/* Company card */}
        <div className="p-6 bg-white border border-border">
          <Text className="mb-4 text-neutral-100" variant="title_lg">
            About {job.company?.name || "Company Name"}
          </Text>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 border border-border flex items-center justify-center bg-light-gray overflow-hidden">
              <Image
                src={job.company?.logoUrl || IMAGES.COMPANY_LOGO_1}
                alt={job.company?.name || "Company Name"}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <Text
                variant="body_md"
                className="font-semibold text-neutral-100"
              >
                {job.company?.name || "Company Name"}
              </Text>
              <Text variant="body_sm" className="text-neutral-60">
                {job.location}
              </Text>
            </div>
          </div>
          <Text variant="body_sm" className="text-neutral-60 leading-6">
            {job.company?.description || "Company Description"}
          </Text>
          <button className="mt-4 w-full h-10 border border-border text-neutral-80 text-[14px] font-semibold hover:border-primary hover:text-primary transition-colors">
            View Company Profile
          </button>
        </div>

        {/* Share */}
        <div className="p-6 bg-white border border-border">
          <Text className="mb-4 text-neutral-100" variant="title_lg">
            Share this job
          </Text>
          <div className="flex gap-3">
            {["LinkedIn", "Twitter", "Email"].map((platform) => (
              <button
                key={platform}
                className="flex-1 h-9 border border-border text-neutral-60 text-[13px] font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
