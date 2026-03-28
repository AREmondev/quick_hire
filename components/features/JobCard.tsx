import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Text } from "../ui/Text";
import { Badge } from "../ui/Badge";
import { categoryColors } from "@/lib/jobs";
import { Job, JobType } from "@/services/types";

function formatSalary(min: number, max: number, currency: string) {
  const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(0)}k` : `${n}`);
  return `${fmt(min)}–${fmt(max)} ${currency}`;
}
const JobCard = ({ job }: { job: Job }) => {
  return (
    <Link
      key={job.slug}
      href={`/jobs/${job.slug}`}
      className="group block h-full"
    >
      <div className="bg-white p-6 border border-[#D6DDEB] flex flex-col gap-4 h-full transition-all hover:border-primary hover:shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="w-12 h-12 border border-[#D6DDEB] flex items-center justify-center bg-light-gray overflow-hidden">
            <Image
              src={job.company?.logoUrl || ""}
              alt={job.company?.name || ""}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-1">
            {" "}
            <div className="h-[26px] px-3 border border-primary flex items-center justify-center text-primary text-[13px] font-semibold">
              {job.jobType.name}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <Text
            variant={"body_lg"}
            className="font-semibold line-clamp-1 text-neutral-100 group-hover:text-primary transition-colors"
          >
            {job.title}
          </Text>
          <div className="flex items-center gap-2">
            <Text variant={"body_sm"} className="text-neutral-60">
              {job.company?.name || ""}
            </Text>
            <div className="h-1 w-1 rounded-full bg-neutral-80"></div>
            <Text variant={"body_sm"} className="text-neutral-60">
              {job.location}
            </Text>
          </div>
        </div>
        <Text
          variant={"body_sm"}
          fontFamily={"inter"}
          className="line-clamp-2 text-neutral-60 flex-1"
        >
          {job.description}
        </Text>
        <div className="flex items-center flex-wrap gap-2 ">
          {job.categories.slice(0, 2).map((category, index) => (
            <Badge
              key={index}
              label={category.name}
              color={categoryColors[category.name] || "#4640DE"}
            />
          ))}
        </div>
        <div className="flex flex-col justify-between">
          <Text variant="body_sm" className="text-neutral-80 font-semibold">
            {formatSalary(
              job.salaryMin,
              job.salaryMax,
              job.salaryCurrency || "",
            )}{" "}
            / yr
          </Text>
          <Text variant="body_sm" className="text-neutral-60">
            {job.applicationsCount} total applicants
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
