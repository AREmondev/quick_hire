"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Text } from "@/components/ui/Text";
import { useCandidateApplicationQuery } from "@/hooks/applications";
import { submitApplication } from "@/services/applications";
import { ProgressSteps } from "@/components/features/jobs/ProgressSteps";
import { usePublicJobQuery } from "@/hooks/jobs";
import { BsCheckCircle } from "react-icons/bs";
import Loading from "@/components/ui/Loading";

interface SubmitPageProps {
  params: Promise<{ slug: string }>;
}

export default function SubmitPage({ params }: SubmitPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("applicationId");
  const { data: session } = useSession();

  const { data: job, isLoading: jobLoading } = usePublicJobQuery(slug);
  const { data: application, isLoading: appLoading } =
    useCandidateApplicationQuery(
      applicationId || "",
      session?.accessToken || "",
    );

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [steps, setSteps] = useState<
    { label: string; active: boolean; done: boolean }[]
  >([]);

  useEffect(() => {
    if (!job) return;

    if (job.assessment) {
      setSteps([
        { label: "Resume Selection", active: false, done: true },
        { label: "Skills Assessment", active: false, done: true },
        { label: "Submit Application", active: true, done: false },
      ]);
    } else {
      setSteps([
        { label: "Resume Selection", active: false, done: true },
        { label: "Submit Application", active: true, done: false },
      ]);
    }
  }, [job]);

  const handleSubmit = async () => {
    if (!applicationId || !session?.accessToken) return;
    setLoading(true);
    try {
      await submitApplication(applicationId);
      setSubmitted(true);

      // Update steps to show completion
      if (job?.assessment) {
        setSteps([
          { label: "Resume Selection", active: false, done: true },
          { label: "Skills Assessment", active: false, done: true },
          { label: "Submit Application", active: false, done: true },
        ]);
      } else {
        setSteps([
          { label: "Resume Selection", active: false, done: true },
          { label: "Submit Application", active: false, done: true },
        ]);
      }
    } catch (error) {
      console.error("Failed to submit application:", error);
    } finally {
      setLoading(false);
    }
  };

  if (jobLoading || appLoading) {
    return (
      <main className="min-h-screen bg-light-gray pt-[120px]">
        <Loading variant="section" text="Preparing your application..." />
      </main>
    );
  }

  if (!job || !application) {
    return (
      <main className="min-h-screen bg-light-gray pt-[120px] flex items-center justify-center">
        <Text variant="h2" className="text-neutral-100">
          Not found
        </Text>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-light-gray pt-[78px] pb-20">
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
            <span className="text-neutral-100 font-medium">Submit</span>
          </div>
        </div>
      </div>

      <div className="container py-12 max-w-4xl mx-auto">
        <ProgressSteps steps={steps} />

        <div className="bg-white border border-border p-8 md:p-12 shadow-sm text-center">
          {submitted ? (
            <div className="flex flex-col items-center py-8">
              <div className="w-20 h-20 bg-accent-green/10 rounded-full flex items-center justify-center mb-6">
                <BsCheckCircle className="w-10 h-10 text-accent-green" />
              </div>
              <Text variant="h2" className="text-neutral-100 mb-4">
                Application Submitted!
              </Text>
              <Text
                variant="body_lg"
                className="text-neutral-60 mb-8 max-w-md mx-auto"
              >
                Thank you for applying to {job.company?.name}. We have received
                your application and will review it shortly.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/applications"
                  className="bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
                >
                  View My Applications
                </Link>
                <Link
                  href="/jobs"
                  className="bg-white border border-border text-neutral-100 px-8 py-3 rounded-md font-medium hover:bg-light-gray transition-colors"
                >
                  Browse More Jobs
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-8">
              <Text variant="h2" className="text-neutral-100 text-center mb-4">
                Final Review
              </Text>
              <Text
                variant="body_lg"
                className="text-neutral-60 text-center  mb-8 max-w-md mx-auto"
              >
                You're almost there! Please click the button below to finalize
                and submit your application for the {job.title} position.
              </Text>

              <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-primary text-white py-4 rounded-md font-bold text-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
                <Link
                  href={`/jobs/${slug}/apply`}
                  className="text-neutral-60 hover:text-primary transition-colors text-sm font-medium"
                >
                  Go back and edit
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
