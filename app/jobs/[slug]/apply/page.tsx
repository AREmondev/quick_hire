"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Text } from "@/components/ui/Text";
import { useMyProfileQuery } from "@/hooks/profile";
import { createApplicationForJob } from "@/services/applications";
import { ProgressSteps } from "@/components/features/jobs/ProgressSteps";
import { ApplyJobSummary } from "@/components/features/jobs/ApplyJobSummary";
import { InfoBanner } from "@/components/features/jobs/InfoBanner";
import { ResumeSourceSelection } from "@/components/features/jobs/ResumeSourceSelection";
import { ApplyActions } from "@/components/features/jobs/ApplyActions";
import { usePublicJobQuery } from "@/hooks/jobs";

interface ApplyPageProps {
  params: Promise<{ slug: string }>;
}

export default function ApplyPage({ params }: ApplyPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const { data: session } = useSession();

  const { data: job, isLoading: jobLoading } = usePublicJobQuery(slug);
  const { data: profile, isLoading: profileLoading } = useMyProfileQuery();

  const [resumeSource, setResumeSource] = useState<"profile" | "pdf">(
    "profile",
  );
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<
    { label: string; active: boolean; done: boolean }[]
  >([]);

  useEffect(() => {
    if (!job) return;

    if (job.assessment) {
      setSteps([
        { label: "Resume Selection", active: true, done: false },
        { label: "Skills Assessment", active: false, done: false },
        { label: "Submit Application", active: false, done: false },
      ]);
    } else {
      setSteps([
        { label: "Resume Selection", active: true, done: false },
        { label: "Submit Application", active: false, done: false },
      ]);
    }
  }, [job]);

  const handleContinue = async () => {
    if (!job?.id || !session?.accessToken) return;
    setLoading(true);
    try {
      const app = await createApplicationForJob(
        job.id,
        {
          resumeSource,
          resumeId: resumeSource === "pdf" ? profile?.resume?.id : null,
        },
        session.accessToken,
      );

      if (app?.id) {
        if (job.assessment) {
          router.push(`/jobs/${slug}/assessment?applicationId=${app.id}`);
        } else {
          router.push(`/jobs/${slug}/submit?applicationId=${app.id}`);
        }
      }
    } catch (error) {
      console.error("Failed to create application:", error);
    } finally {
      setLoading(false);
    }
  };

  if (jobLoading || profileLoading) {
    return (
      <main className="min-h-screen bg-light-gray pt-[120px] flex items-center justify-center">
        <Text variant="body_lg" className="text-neutral-60">
          Loading...
        </Text>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-light-gray pt-[120px] flex items-center justify-center">
        <Text variant="h2" className="text-neutral-100">
          Job not found
        </Text>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-light-gray pt-[78px] pb-20">
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
            <Link
              href={`/jobs/${slug}`}
              className="hover:text-primary transition-colors"
            >
              {job.title}
            </Link>
            <span>›</span>
            <span className="text-neutral-100 font-medium">Apply</span>
          </div>
        </div>
      </div>

      <div className="container py-12 max-w-4xl mx-auto">
        <ProgressSteps steps={steps} />

        <div className="bg-white border border-border p-8 md:p-12 shadow-sm">
          <Text variant="h2" className="text-neutral-100 mb-2">
            Resume Selection
          </Text>
          <Text variant="body_md" className="text-neutral-60 mb-8">
            Choose how you would like to present your professional experience to
            the hiring team.
          </Text>

          <ApplyJobSummary job={job} />

          <InfoBanner />

          <ResumeSourceSelection
            source={resumeSource}
            setSource={setResumeSource}
            hasPdf={!!profile?.resume}
          />

          <ApplyActions
            onContinue={handleContinue}
            loading={loading}
            isApplied={job.isApplied || false}
            isAssessment={!!job.assessment}
            cancelHref={`/jobs/${slug}`}
          />
        </div>
      </div>
    </main>
  );
}
