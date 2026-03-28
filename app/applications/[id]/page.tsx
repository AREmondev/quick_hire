"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import {
  useCandidateApplicationQuery,
  useSubmitApplicationMutation,
} from "@/hooks/applications";
import { ProfileSnapshotView } from "@/components/features/applications/ProfileSnapshotView";
import { ApplicationStatus } from "@/services/types";
import { useRouter } from "next/navigation";

const TIMELINE: {
  key: ApplicationStatus | "decision";
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    key: "assessment_pending",
    label: "Application Started",
    description:
      "You started the application process and selected your resume source.",
    icon: "📝",
  },
  {
    key: "assessment_completed",
    label: "Assessment Completed",
    description: "You completed the skills assessment for this position.",
    icon: "✅",
  },
  {
    key: "submitted",
    label: "Application Submitted",
    description: "Your full application has been submitted to the hiring team.",
    icon: "🚀",
  },
  {
    key: "under_review",
    label: "Under Review",
    description:
      "The hiring team is reviewing your application and assessment results.",
    icon: "👀",
  },
  {
    key: "interview",
    label: "Interviewing",
    description: "You have been invited for an interview.",
    icon: "🤝",
  },
  {
    key: "decision",
    label: "Decision",
    description: "A hiring decision has been made for your application.",
    icon: "🎯",
  },
];

const STATUS_ORDER: (ApplicationStatus | "decision")[] = [
  "draft",
  "assessment_pending",
  "assessment_completed",
  "submitted",
  "under_review",
  "interview",
  "offer",
  "hired",
  "rejected",
];

export default function ApplicationDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();

  const {
    data: app,
    isLoading,
    isError,
  } = useCandidateApplicationQuery(params.id, session?.accessToken);
  const submitApp = useSubmitApplicationMutation(app?.id || "");
  const router = useRouter();
  if (isLoading) {
    return (
      <main className="min-h-screen bg-light-gray pt-[120px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <Text variant="body_lg" className="text-neutral-60">
            Loading application details...
          </Text>
        </div>
      </main>
    );
  }

  if (isError || !app) {
    return (
      <main className="min-h-screen bg-light-gray pt-[78px]">
        <div className="container py-20">
          <div className="max-w-md mx-auto bg-white border border-border p-12 text-center">
            <div className="text-5xl mb-4">😕</div>
            <Text variant="title_lg" className="text-neutral-100 mb-2">
              Application Not Found
            </Text>
            <Text variant="body_md" className="text-neutral-60 mb-6">
              This application doesn&apos;t exist or you don&apos;t have access
              to it.
            </Text>
            <Link href="/applications">
              <Button>Back to Applications</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentStatusIdx = STATUS_ORDER.indexOf(app.status);

  const handleNextStep = async () => {
    if (app.status === "draft") {
      router.push(`/jobs/${app.jobSlug}/submit?applicationId=${app.id}`);
    } else if (app.status === "assessment_pending") {
      router.push(`/jobs/${app.jobSlug}/assessment?applicationId=${app.id}`);
    } else if (app.status === "assessment_completed") {
      try {
        await submitApp.mutateAsync();
        alert("Application submitted successfully!");
      } catch (error) {
        console.error("Failed to submit application:", error);
        alert("Failed to submit application. Please try again.");
      }
    } else if (app.status === "draft") {
      router.push(`/jobs/${app.jobSlug}/apply`);
    }
  };

  const scorePercent = app.assessment?.total
    ? Math.round((app.assessment.score / app.assessment.total) * 100)
    : null;

  const filteredTimeline = TIMELINE.filter((step) => {
    if (step.key === "assessment_completed") {
      return !!app.job?.assessment;
    }
    return true;
  });

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
            <Link
              href="/applications"
              className="hover:text-primary transition-colors"
            >
              Applications
            </Link>
            <span>›</span>
            <span className="text-neutral-100">Status</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 border border-border flex items-center justify-center bg-light-gray shrink-0 overflow-hidden">
                {app.companyLogo ? (
                  <Image
                    src={app.companyLogo}
                    alt={app.companyName || "Company logo"}
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 bg-neutral-20 flex items-center justify-center text-neutral-60 text-[20px] font-bold">
                    {app.jobTitle?.charAt(0).toUpperCase() || "J"}
                  </div>
                )}
              </div>
              <div>
                <Text variant="h2" className="text-neutral-100">
                  {app.jobTitle}
                </Text>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Text
                    variant="body_md"
                    className="text-neutral-60 font-semibold"
                  >
                    {app.companyName}
                  </Text>
                  <div className="w-1 h-1 rounded-full bg-neutral-60" />
                  <Text variant="body_sm" className="text-neutral-60">
                    Applied on{" "}
                    {new Date(app.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              {app.jobSlug && (
                <Link href={`/jobs/${app.jobSlug}`}>
                  <button className="h-10 px-6 border border-border text-neutral-60 text-[14px] font-semibold hover:border-primary hover:text-primary transition-colors">
                    View Job
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Timeline */}
            <div className="bg-white border border-border p-8">
              <Text variant="title_lg" className="text-neutral-100 mb-6">
                Application Timeline
              </Text>
              <div className="flex flex-col">
                {filteredTimeline.map((step, idx) => {
                  const stepIdx = STATUS_ORDER.indexOf(
                    step.key as ApplicationStatus,
                  );
                  const isDone = currentStatusIdx >= stepIdx || stepIdx === -1;
                  const isCurrent = app.status === step.key;

                  return (
                    <div key={step.key} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-[18px] border-2 transition-all ${
                            isDone
                              ? "border-primary bg-primary/10"
                              : "border-neutral-20 bg-white"
                          }`}
                        >
                          {isDone ? (
                            step.icon
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-neutral-20" />
                          )}
                        </div>
                        {idx < filteredTimeline.length - 1 && (
                          <div
                            className={`w-px flex-1 min-h-[40px] my-1 ${isDone ? "bg-primary/30" : "bg-neutral-20"}`}
                          />
                        )}
                      </div>
                      <div
                        className={`pb-8 flex-1 ${idx === filteredTimeline.length - 1 ? "pb-0" : ""}`}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <Text
                            variant="body_md"
                            className={`font-semibold ${isDone ? "text-neutral-100" : "text-neutral-60"}`}
                          >
                            {step.label}
                          </Text>
                          {isCurrent && (
                            <span className="px-2 py-0.5 bg-primary text-white text-[11px] font-bold">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <Text variant="body_sm" className="text-neutral-60">
                          {step.description}
                        </Text>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assessment Results */}
            {app.assessment && (
              <div className="bg-white border border-border p-8">
                <Text variant="title_lg" className="text-neutral-100 mb-6">
                  Assessment Results
                </Text>
                <div className="flex items-center gap-6 mb-8 p-6 bg-light-gray border border-border">
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-[48px] font-bold text-primary leading-none">
                      {scorePercent}%
                    </div>
                    <Text variant="body_sm" className="text-neutral-60">
                      Score
                    </Text>
                  </div>
                  <div className="flex-1">
                    <Text variant="body_md" className="text-neutral-80 mb-2">
                      You answered {app.assessment.score} out of{" "}
                      {app.assessment.total} questions.
                    </Text>
                    <div className="h-2.5 bg-neutral-20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-1000"
                        style={{ width: `${scorePercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Text
                    variant="body_md"
                    className="font-bold text-neutral-100"
                  >
                    Your Answers
                  </Text>
                  {Object.entries(app.assessment.answers).map(
                    ([question, answer]) => (
                      <div
                        key={question}
                        className="p-5 border border-border bg-white shadow-sm"
                      >
                        <Text
                          variant="body_sm"
                          className="text-primary font-bold uppercase tracking-wider mb-2 text-[11px]"
                        >
                          Question
                        </Text>
                        <Text
                          variant="body_md"
                          className="text-neutral-100 font-semibold mb-4"
                        >
                          {question}
                        </Text>
                        <Text
                          variant="body_sm"
                          className="text-neutral-40 font-bold uppercase tracking-wider mb-2 text-[11px]"
                        >
                          Your Answer
                        </Text>
                        <div className="p-4 bg-light-gray border border-border text-neutral-80 text-[14px] leading-relaxed whitespace-pre-wrap">
                          {answer as string}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Profile Snapshot */}
            {app.profileSnapshot && (
              <ProfileSnapshotView profile={app.profileSnapshot} />
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            {/* Next Step Card */}
            {(app.status === "assessment_pending" ||
              app.status === "assessment_completed") && (
              <div className="bg-primary/5 border border-primary/20 p-6">
                <Text variant="title_lg" className="text-primary mb-2">
                  Next Step Required
                </Text>
                <Text variant="body_sm" className="text-neutral-60 mb-6">
                  {app.status === "assessment_pending" &&
                    "Please complete the skills assessment to proceed with your application."}
                  {app.status === "assessment_completed" &&
                    "Your assessment is done! Submit your application now for the hiring team to review."}
                </Text>
                <Button
                  onClick={handleNextStep}
                  isLoading={submitApp.isPending}
                  className="w-full h-12 shadow-lg shadow-primary/20"
                >
                  {app.status === "assessment_pending" && "Take Assessment"}
                  {app.status === "assessment_completed" &&
                    "Submit Application"}
                </Button>
              </div>
            )}

            <div className="bg-white border border-border p-6">
              <Text variant="title_lg" className="text-neutral-100 mb-4">
                Application Summary
              </Text>
              <div className="flex flex-col divide-y divide-border">
                {[
                  { label: "Status", value: app.status.replace(/_/g, " ") },
                  {
                    label: "Resume Source",
                    value:
                      app.resumeSource === "pdf"
                        ? "PDF Upload"
                        : "Profile Data",
                  },
                  {
                    label: "Applied On",
                    value: new Date(app.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }),
                  },
                  {
                    label: "Location",
                    value: app.job?.location || "Remote",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="py-3 flex items-start justify-between gap-4"
                  >
                    <Text
                      variant="body_sm"
                      className="text-neutral-60 shrink-0"
                    >
                      {item.label}
                    </Text>
                    <Text
                      variant="body_sm"
                      className="text-neutral-100 text-right font-medium capitalize"
                    >
                      {item.value}
                    </Text>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-border p-6 flex flex-col gap-3">
              <Link href="/applications" className="w-full">
                <button className="w-full h-11 border border-border text-neutral-60 text-[14px] font-semibold hover:border-primary hover:text-primary transition-colors">
                  ← All Applications
                </button>
              </Link>
              <Link href="/jobs" className="w-full">
                <button className="w-full h-11 border border-border text-neutral-60 text-[14px] font-semibold hover:border-primary hover:text-primary transition-colors">
                  Browse More Jobs
                </button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
