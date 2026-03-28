"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Text } from "@/components/ui/Text";
import { useCandidateApplicationQuery } from "@/hooks/applications";
import { submitCandidateApplication } from "@/services/applications";
import { ProgressSteps } from "@/components/features/jobs/ProgressSteps";
import { AssessmentHeader } from "@/components/features/jobs/AssessmentHeader";
import { AssessmentQuestionItem } from "@/components/features/jobs/AssessmentQuestionItem";
import { AssessmentFooter } from "@/components/features/jobs/AssessmentFooter";
import { usePublicJobQuery } from "@/hooks/jobs";
import { AssessmentQuestion } from "@/services/types";

interface AssessmentPageProps {
  params: Promise<{ slug: string }>;
}

export default function AssessmentPage({ params }: AssessmentPageProps) {
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

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const questions = job?.assessment?.questions || [];
  const [steps, setSteps] = useState<
    {
      label: string;
      active: boolean;
      done: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (!job) return;

    if (job.assessment) {
      setSteps([
        { label: "Resume Selection", active: false, done: true },
        { label: "Skills Assessment", active: true, done: false },
        { label: "Submit Application", active: false, done: false },
      ]);
    } else {
      // This case shouldn't really happen if redirected correctly,
      // but let's keep it consistent.
      setSteps([
        { label: "Resume Selection", active: false, done: true },
        { label: "Submit Application", active: true, done: false },
      ]);
    }
  }, [job]);

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isComplete =
    questions.length > 0 &&
    questions.every((q) => answers[q.id] && answers[q.id].trim().length > 0);

  const handleSubmit = async () => {
    if (!applicationId || !session?.accessToken) return;
    setLoading(true);
    try {
      const formattedAnswers = {
        answers: Object.entries(answers).map(([question_id, answer]) => ({
          question_id,
          answer,
        })),
      };
      await submitCandidateApplication(
        applicationId,
        session.accessToken,
        formattedAnswers,
      );
      router.push(`/jobs/${slug}/submit?applicationId=${applicationId}`);
    } catch (error) {
      console.error("Failed to submit application:", error);
    } finally {
      setLoading(false);
    }
  };

  if (jobLoading || appLoading) {
    return (
      <main className="min-h-screen bg-light-gray pt-[120px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <Text variant="body_lg" className="text-neutral-60">
            Loading assessment...
          </Text>
        </div>
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
            <span className="text-neutral-100 font-medium">Assessment</span>
          </div>
        </div>
      </div>

      <div className="container py-12 max-w-4xl mx-auto">
        <ProgressSteps steps={steps} />

        <AssessmentHeader currentStep={2} totalSteps={3} jobTitle={job.title} />

        {questions.map((q, idx) => (
          <AssessmentQuestionItem
            key={q.id}
            question={q}
            index={idx}
            answer={answers[q.id] || ""}
            onAnswerChange={handleAnswerChange}
          />
        ))}

        <AssessmentFooter
          onSubmit={handleSubmit}
          loading={loading}
          isComplete={isComplete}
          cancelHref={`/jobs/${slug}/apply`}
        />
      </div>
    </main>
  );
}
