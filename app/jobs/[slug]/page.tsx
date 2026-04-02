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
import { MobileApplyActions } from "@/components/features/jobs/JobInterection";

interface JobDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { slug } = await params;
  let job: Job | null = null;
  try {
    job = await serverFetch<Job>(API_ENDPOINTS.JOBS.PUBLIC_DETAIL(slug), {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
  } catch (error) {
    console.error("Failed to fetch job details:", error);
  }

  if (!job || !job.id) {
    return (
      <main className="container pt-36 pb-20 text-center">
        <div className="text-6xl mb-6">🔍</div>
        <Text variant="h2" className="text-neutral-100 mb-2">
          Job not found or connection issue
        </Text>
        <Text
          variant="body_lg"
          className="text-neutral-60 mb-8 max-w-md mx-auto"
        >
          We couldn't retrieve the details for this job. This might be due to a
          temporary connection issue with our servers.
        </Text>
        <div className="flex items-center justify-center gap-4">
          <Link href="/jobs">
            <Button variant="transparent">Browse All Jobs</Button>
          </Link>
          <Link href={`/jobs/${slug}`}>
            <Button>Try Again</Button>
          </Link>
        </div>
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
      <MobileApplyActions
        slug={slug}
        id={job.id}
        isSaved={job.isSaved || false}
        isApplied={job.isApplied || false}
        applicationId={job.applicationId || undefined}
      />
    </main>
  );
}
