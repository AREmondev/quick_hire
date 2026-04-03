import { Badge, OutlineBadge } from "@/components/ui/Badge";
import LinkButton from "@/components/ui/LinkButton";
import { Text } from "@/components/ui/Text";
import { IMAGES } from "@/lib/constants";
import { categoryColors } from "@/lib/jobs";
import { calculateDaysAgo } from "@/lib/utils";
import { getJobs } from "@/services/serverApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LatestJobs = async () => {
  const jobs = await getJobs({ featured: true });
  console.log("featured", jobs);
  return (
    <section className="w-full relative overflow-hidden pt-18 pb-20 bg-light-gray">
      <div className="container">
        <div className="flex flex-col gap-6 sm:gap-12">
          <div className="flex flex-wrap items-end gap-10 justify-between">
            <Text variant={"h2"} fontFamily={"clash"}>
              Latest <span className="text-accent-blue">jobs</span>
            </Text>
            <LinkButton className="hidden sm:block" href="/jobs">
              Show all jobs df
            </LinkButton>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-4 gap-x-8">
            {jobs.items.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.slug}`}
                className="group block"
              >
                <div className="bg-white px-6 py-5 flex items-start gap-5 border border-border hover:border-primary hover:shadow-sm transition-all">
                  <div className="w-12 h-12 border border-border flex items-center justify-center bg-light-gray shrink-0 overflow-hidden">
                    <Image
                      src={job.company?.logoUrl || ""}
                      alt={job.company?.name || ""}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <Text
                      variant={"body_lg"}
                      className="font-semibold text-neutral-100 group-hover:text-primary transition-colors truncate"
                    >
                      {job.title || ""}
                    </Text>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Text variant={"body_sm"} className="text-neutral-60">
                        {job.company?.name || ""}
                      </Text>
                      <div className="h-1 w-1 rounded-full bg-neutral-80"></div>
                      <Text variant={"body_sm"} className="text-neutral-60">
                        {job.location}
                      </Text>
                      <div className="h-1 w-1 rounded-full bg-neutral-80"></div>
                      <Text variant={"body_sm"} className="text-neutral-60">
                        {calculateDaysAgo(job?.postedAt || "") == "0"
                          ? "Today"
                          : `${calculateDaysAgo(job?.postedAt || "")} days ago`}
                      </Text>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        label={job.jobType.name}
                        color={job.isRemote ? "#26A4FF" : "#4640DE"}
                      />
                      <div className="h-[28px] w-px bg-neutral-20"></div>
                      {job.categories.slice(0, 2).map((categoryId) => (
                        <OutlineBadge
                          key={categoryId.slug}
                          label={categoryId.name}
                          color={categoryColors[categoryId.slug] || "#4640DE"}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 text-right hidden sm:block">
                    <Text
                      variant="body_sm"
                      className="text-neutral-60 font-semibold"
                    >
                      ${(job.salaryMin / 1000).toFixed(0)}k–$
                      {(job.salaryMax / 1000).toFixed(0)}k
                    </Text>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <LinkButton className="block sm:hidden" href="/jobs">
            Show all jobs
          </LinkButton>
        </div>
      </div>
      <div className="absolute hidden md:block right-0 z-1 w-[480px] bottom-0 md:top-0 md:w-[900px]">
        <Image
          src={IMAGES.HERO_PATTERN}
          alt="hero pattern"
          width={900}
          height={800}
          priority
        />
      </div>
    </section>
  );
};

export default LatestJobs;
