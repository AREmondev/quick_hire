import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Job } from "@/services/types";
import { JobHeader } from "@/components/features/jobs/JobHeader";
import { JobStats } from "@/components/features/jobs/JobStats";
import { JobContent } from "@/components/features/jobs/JobContent";
import { JobSidebar } from "@/components/features/jobs/JobSidebar";
import { serverFetch } from "@/lib/api/serverFetch";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

interface JobDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { slug } = await params;
  let job: Job | null = null;
  try {
    job = await serverFetch<Job>(API_ENDPOINTS.JOBS.PUBLIC_DETAIL(slug));
  } catch (error) {
    console.error("Failed to fetch job details:", error);
  }

  if (!job || !job.id) {
    return (
      <main className="container pt-36 pb-20">
        <Text variant="h2">Job not found</Text>
        <Link href="/jobs">
          <Button className="mt-6">Browse Jobs</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-light-gray pt-[78px]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-[14px] text-neutral-60">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link href="/jobs" className="hover:text-primary transition-colors">
              Jobs
            </Link>
            <span>›</span>
            <span className="text-neutral-100">{job.title || "Job Title"}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-border">
        <div className="container py-8">
          <JobHeader job={job} />
          <JobStats job={job} />
        </div>
      </div>

      {/* Body */}
      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <JobContent job={job} />
          <JobSidebar job={job} />
        </div>
      </div>

      {/* Mobile sticky apply bar */}
      <div className="fixed inset-x-0 bottom-0 lg:hidden bg-white border-t border-border p-4 z-50">
        <div className="container flex gap-3">
          {job.isApplied ? (
            <Link href={`/applications/${job.applicationId}`} className="flex-1">
              <Button className="w-full bg-green-500 hover:bg-green-600 border-none">
                View Application
              </Button>
            </Link>
          ) : (
            <Link href={`/jobs/${job.slug}/apply`} className="flex-1">
              <Button className="w-full">Apply Now</Button>
            </Link>
          )}
          <button className="h-[50px] px-4 border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
            Save
          </button>
        </div>
      </div>
    </main>
  );
}
