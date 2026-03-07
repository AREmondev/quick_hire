"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { getApplication, updateApplication } from "@/lib/applications";
import { ALL_JOBS } from "@/lib/jobs";

const TIMELINE = [
  {
    key: "assessment_pending",
    label: "Application Started",
    description: "You started the application process and selected your resume source.",
    icon: "📝",
    alwaysDone: true,
  },
  {
    key: "assessment_completed",
    label: "Assessment Completed",
    description: "You completed the skills assessment for this position.",
    icon: "✅",
    alwaysDone: false,
  },
  {
    key: "submitted",
    label: "Application Submitted",
    description: "Your full application has been submitted to the hiring team.",
    icon: "🚀",
    alwaysDone: false,
  },
  {
    key: "under_review",
    label: "Under Review",
    description: "The hiring team is reviewing your application and assessment results.",
    icon: "👀",
    alwaysDone: false,
  },
  {
    key: "decision",
    label: "Decision",
    description: "A hiring decision will be communicated to you via email.",
    icon: "🎯",
    alwaysDone: false,
  },
];

const STATUS_ORDER = [
  "assessment_pending",
  "assessment_completed",
  "submitted",
  "under_review",
  "decision",
];

export default function ApplicationStatusPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [app, setApp] = useState(() => getApplication(params.id));
  const [submitting, setSubmitting] = useState(false);

  if (!app) {
    return (
      <main className="min-h-screen bg-light-gray pt-[78px]">
        <div className="container py-20">
          <div className="max-w-md mx-auto bg-white border border-border p-12 text-center">
            <div className="text-5xl mb-4">😕</div>
            <Text variant="title_lg" className="text-neutral-100 mb-2">Application Not Found</Text>
            <Text variant="body_md" className="text-neutral-60 mb-6">
              This application doesn&apos;t exist or may have been removed.
            </Text>
            <Link href="/applications">
              <Button>Back to Applications</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const job = ALL_JOBS.find((j) => j.slug === app.jobSlug);
  const currentStatusIdx = STATUS_ORDER.indexOf(app.status);

  const submitApplication = async () => {
    setSubmitting(true);
    const updated = updateApplication(app.id, { status: "submitted" });
    setApp(updated);
    setTimeout(() => setSubmitting(false), 500);
  };

  const scorePercent = app.assessment?.total
    ? Math.round((app.assessment.score / app.assessment.total) * 100)
    : null;

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <main className="min-h-screen bg-light-gray pt-[78px]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-[14px] text-neutral-60">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>›</span>
            <Link href="/applications" className="hover:text-primary transition-colors">Applications</Link>
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
                {job ? (
                  <Image src={job.company_logo} alt={job.company_name} width={44} height={44} className="object-contain" />
                ) : (
                  <div className="w-8 h-8 bg-neutral-20 flex items-center justify-center text-neutral-60 text-[20px] font-bold">
                    {app.jobSlug.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <Text variant="h2" className="text-neutral-100">
                  {job ? job.job_title : app.jobSlug}
                </Text>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {job && (
                    <Text variant="body_md" className="text-neutral-60 font-semibold">{job.company_name}</Text>
                  )}
                  {job && <div className="w-1 h-1 rounded-full bg-neutral-60" />}
                  <Text variant="body_sm" className="text-neutral-60">
                    Applied on {formatDate(app.createdAt)}
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              {job && (
                <Link href={`/jobs/${job.slug}`}>
                  <button className="h-10 px-6 border border-border text-neutral-60 text-[14px] font-semibold hover:border-primary hover:text-primary transition-colors">
                    View Job
                  </button>
                </Link>
              )}
              {app.status === "assessment_completed" && (
                <Button
                  onClick={submitApplication}
                  disabled={submitting}
                  className="h-10 px-6 disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main: timeline */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Timeline */}
            <div className="bg-white border border-border p-8">
              <Text variant="title_lg" className="text-neutral-100 mb-6">Application Timeline</Text>
              <div className="flex flex-col gap-0">
                {TIMELINE.map((step, idx) => {
                  const stepIdx = STATUS_ORDER.indexOf(step.key);
                  const isDone = step.alwaysDone || currentStatusIdx >= stepIdx;
                  const isCurrent = currentStatusIdx === stepIdx;
                  const isFuture = !isDone;
                  return (
                    <div key={step.key} className="flex gap-5">
                      {/* Left: indicator line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-[18px] border-2 transition-all ${isDone
                              ? "border-primary bg-primary/10"
                              : isCurrent
                                ? "border-primary bg-white"
                                : "border-neutral-20 bg-white"
                            }`}
                        >
                          {isDone ? step.icon : <div className="w-2 h-2 rounded-full bg-neutral-20" />}
                        </div>
                        {idx < TIMELINE.length - 1 && (
                          <div className={`w-px flex-1 min-h-8 my-1 ${isDone ? "bg-primary/30" : "bg-neutral-20"}`} />
                        )}
                      </div>

                      {/* Right: content */}
                      <div className={`pb-6 pt-1 flex-1 ${idx === TIMELINE.length - 1 ? "pb-0" : ""}`}>
                        <div className="flex items-center gap-3 mb-1">
                          <Text
                            variant="body_md"
                            className={`font-semibold ${isDone ? "text-neutral-100" : "text-neutral-60"}`}
                          >
                            {step.label}
                          </Text>
                          {isCurrent && (
                            <span className="px-2 py-0.5 bg-primary text-white text-[11px] font-bold">CURRENT</span>
                          )}
                          {isDone && !isCurrent && (
                            <span className="px-2 py-0.5 bg-accent-green/10 text-accent-green text-[11px] font-bold">DONE</span>
                          )}
                        </div>
                        <Text variant="body_sm" className={isDone ? "text-neutral-60" : "text-neutral-60/50"}>
                          {step.description}
                        </Text>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assessment results if available */}
            {app.assessment && (
              <div className="bg-white border border-border p-8">
                <Text variant="title_lg" className="text-neutral-100 mb-6">Assessment Results</Text>
                {app.assessment.total > 0 && (
                  <div className="flex items-center gap-6 mb-6 p-5 bg-light-gray">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="text-[48px] font-bold leading-none"
                        style={{ color: (scorePercent || 0) >= 70 ? "#56CDAD" : (scorePercent || 0) >= 40 ? "#FFB836" : "#FF6550" }}
                      >
                        {scorePercent}%
                      </div>
                      <Text variant="body_sm" className="text-neutral-60">Score</Text>
                    </div>
                    <div className="flex-1">
                      <Text variant="body_md" className="text-neutral-80 mb-2">
                        {app.assessment.score} out of {app.assessment.total} multiple choice questions correct
                      </Text>
                      <div className="h-3 bg-neutral-20 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${scorePercent}%`,
                            backgroundColor: (scorePercent || 0) >= 70 ? "#56CDAD" : (scorePercent || 0) >= 40 ? "#FFB836" : "#FF6550",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Answers summary */}
                <div className="flex flex-col gap-3">
                  {Object.entries(app.assessment.answers).map(([qid, answer]) => (
                    <div key={qid} className="p-4 border border-border bg-light-gray">
                      <Text variant="body_sm" className="text-neutral-60 mb-1 uppercase tracking-wide text-[11px] font-bold">{qid}</Text>
                      <Text variant="body_md" className="text-neutral-100">
                        {answer.length > 200 ? answer.slice(0, 200) + "..." : answer}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 flex flex-col gap-5">
            {/* Quick details */}
            <div className="bg-white border border-border p-6">
              <Text variant="title_lg" className="text-neutral-100 mb-4">Application Details</Text>
              <div className="flex flex-col divide-y divide-border">
                {[
                  { label: "Application ID", value: app.id.slice(0, 20) + "..." },
                  { label: "Status", value: app.status.replace(/_/g, " ") },
                  { label: "Resume Source", value: app.resumeSource === "pdf" ? "PDF Upload" : "Profile Data" },
                  { label: "Applied On", value: new Date(app.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) },
                  ...(job ? [{ label: "Company", value: job.company_name }, { label: "Location", value: job.location }] : []),
                ].map((item) => (
                  <div key={item.label} className="py-3 flex items-start justify-between gap-4">
                    <Text variant="body_sm" className="text-neutral-60 shrink-0">{item.label}</Text>
                    <Text variant="body_sm" className="text-neutral-100 text-right font-medium capitalize">{item.value}</Text>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-primary/5 border border-primary/20 p-6">
              <Text variant="body_md" className="text-primary font-semibold mb-3">💡 What happens next?</Text>
              <div className="flex flex-col gap-2">
                {[
                  app.status === "assessment_pending" && "Complete your skills assessment to move forward.",
                  app.status === "assessment_completed" && "Submit your application to send it to the hiring team.",
                  app.status === "submitted" && "The hiring team is reviewing your application.",
                ].filter(Boolean).map((tip, i) => (
                  <Text key={i} variant="body_sm" className="text-neutral-80">• {tip}</Text>
                ))}
                <Text variant="body_sm" className="text-neutral-80">• Make sure your profile information is up to date.</Text>
                <Text variant="body_sm" className="text-neutral-80">• Keep an eye on your email for updates.</Text>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white border border-border p-6 flex flex-col gap-3">
              <Link href="/applications" className="w-full">
                <button className="w-full h-10 border border-border text-neutral-60 text-[14px] font-semibold hover:border-primary hover:text-primary transition-colors">
                  ← All Applications
                </button>
              </Link>
              <Link href="/jobs">
                <button className="w-full h-10 border border-border text-neutral-60 text-[14px] font-semibold hover:border-primary hover:text-primary transition-colors">
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
