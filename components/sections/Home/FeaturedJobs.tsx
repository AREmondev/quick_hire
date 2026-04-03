import JobCard from "@/components/features/JobCard";
import { Badge } from "@/components/ui/Badge";
import LinkButton from "@/components/ui/LinkButton";
import { Text } from "@/components/ui/Text";
import { categoryColors } from "@/lib/jobs";
import { getJobs } from "@/services/serverApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturedJobs = async () => {
  const jobs = await getJobs({ featured: true });
  console.log("featured", jobs);
  return (
    <section className="w-full overflow-hidden py-18">
      <div className="container">
        <div className="flex flex-col gap-6 sm:gap-12">
          <div className="flex flex-wrap items-end gap-10 justify-between">
            <Text variant={"h2"} fontFamily={"clash"}>
              Featured <span className="text-accent-blue">jobs</span>
            </Text>
            <LinkButton className="hidden sm:flex" href="/jobs">
              Show all jobs
            </LinkButton>
          </div>
          <div className="flex -mx-4 px-4 overflow-x-auto pb-4 sm:pb-0 sm:mx-0 sm:px-0 sm:overflow-visible snap-x snap-mandatory scrollbar-hide flex-nowrap sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {jobs?.items.map((job, index) => (
              <div key={index} className="min-w-[300px] sm:min-w-0 snap-center">
                <JobCard job={job} />
              </div>
            ))}
          </div>
          <LinkButton className="flex sm:hidden" href="/jobs">
            Show all jobs
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
