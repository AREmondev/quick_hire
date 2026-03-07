"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { listApplications, Application } from "@/lib/applications";
import { ALL_JOBS } from "@/lib/jobs";

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  draft: { label: "Draft", color: "#7C8493", bg: "#7C849310", dot: "#7C8493" },
  assessment_pending: { label: "Assessment Pending", color: "#FFB836", bg: "#FFB83610", dot: "#FFB836" },
  assessment_completed: { label: "Assessment Completed", color: "#26A4FF", bg: "#26A4FF10", dot: "#26A4FF" },
  submitted: { label: "Submitted", color: "#56CDAD", bg: "#56CDAD10", dot: "#56CDAD" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] || statusConfig.draft;
  return (
    <div
      className="flex items-center gap-2 h-7 px-3 text-[12px] font-semibold"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
      {cfg.label}
    </div>
  );
}

type FilterStatus = "all" | Application["status"];

export default function ApplicationsPage() {
  const [apps] = useState(() => listApplications());
  const [filter, setFilter] = useState<FilterStatus>("all");

  const filtered = filter === "all" ? apps : apps.filter((a) => a.status === filter);

  const counts = {
    all: apps.length,
    draft: apps.filter((a) => a.status === "draft").length,
    assessment_pending: apps.filter((a) => a.status === "assessment_pending").length,
    assessment_completed: apps.filter((a) => a.status === "assessment_completed").length,
    submitted: apps.filter((a) => a.status === "submitted").length,
  };

  const FILTERS: { key: FilterStatus; label: string }[] = [
    { key: "all", label: "All" },
    { key: "submitted", label: "Submitted" },
    { key: "assessment_completed", label: "Assessment Done" },
    { key: "assessment_pending", label: "Pending" },
    { key: "draft", label: "Draft" },
  ];

  return (
    <main className="min-h-screen bg-light-gray pt-[78px]">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container py-10">
          <Text variant="h2" fontFamily="clash" className="text-neutral-100">
            My <span className="text-primary">Applications</span>
          </Text>
          <Text variant="body_lg" className="text-neutral-60 mt-2">
            Track and manage all your job applications in one place.
          </Text>
        </div>
      </div>

      <div className="container py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Applied", value: apps.length, color: "#4640DE" },
            { label: "Submitted", value: counts.submitted, color: "#56CDAD" },
            { label: "In Assessment", value: counts.assessment_pending + counts.assessment_completed, color: "#26A4FF" },
            { label: "Drafts", value: counts.draft, color: "#FFB836" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-border p-6">
              <Text variant="body_sm" className="text-neutral-60 mb-2">{stat.label}</Text>
              <div className="flex items-end gap-2">
                <span className="text-[36px] font-bold leading-none" style={{ color: stat.color }}>
                  {stat.value}
                </span>
                <Text variant="body_sm" className="text-neutral-60 mb-1">positions</Text>
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`h-10 px-5 text-[14px] font-semibold transition-colors flex items-center gap-2 ${filter === f.key
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-neutral-60 hover:border-primary hover:text-primary"
                }`}
            >
              {f.label}
              <span className={`text-[12px] px-2 py-0.5 rounded-full ${filter === f.key ? "bg-white/20 text-white" : "bg-neutral-20 text-neutral-60"}`}>
                {counts[f.key] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border border-border p-20 text-center">
            <div className="text-6xl mb-4">📋</div>
            <Text variant="title_lg" className="text-neutral-100 mb-2">
              {filter === "all" ? "No applications yet" : `No ${FILTERS.find(f => f.key === filter)?.label.toLowerCase()} applications`}
            </Text>
            <Text variant="body_md" className="text-neutral-60 mb-6">
              Start by browsing available jobs and applying to positions that interest you.
            </Text>
            <Link href="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((a) => {
              const job = ALL_JOBS.find((j) => j.slug === a.jobSlug);
              return (
                <div
                  key={a.id}
                  className="bg-white border border-border p-6 flex flex-col md:flex-row md:items-center gap-4 hover:border-neutral-60/40 transition-colors"
                >
                  {/* Company logo */}
                  <div className="w-14 h-14 border border-border flex items-center justify-center bg-light-gray shrink-0 overflow-hidden">
                    {job ? (
                      <Image src={job.company_logo} alt={job.company_name} width={40} height={40} className="object-contain" />
                    ) : (
                      <div className="w-8 h-8 bg-neutral-20 flex items-center justify-center text-neutral-60 text-[16px] font-bold">
                        {a.jobSlug.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Job info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <Text variant="body_lg" className="font-semibold text-neutral-100 truncate">
                        {job ? job.job_title : a.jobSlug}
                      </Text>
                      <StatusBadge status={a.status} />
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {job && (
                        <Text variant="body_sm" className="text-neutral-60 font-semibold">{job.company_name}</Text>
                      )}
                      {job && <div className="w-1 h-1 rounded-full bg-neutral-60" />}
                      <Text variant="body_sm" className="text-neutral-60">
                        Applied {new Date(a.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </Text>
                      <div className="w-1 h-1 rounded-full bg-neutral-60" />
                      <Text variant="body_sm" className="text-neutral-60">
                        Resume: <span className="capitalize font-medium text-neutral-80">{a.resumeSource === "pdf" ? "PDF Upload" : "Profile Data"}</span>
                      </Text>
                    </div>
                    {a.assessment && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full bg-accent-blue" />
                        <Text variant="body_sm" className="text-neutral-60">
                          Assessment score:{" "}
                          <span className="font-semibold text-neutral-100">
                            {a.assessment.score}/{a.assessment.total}
                          </span>
                        </Text>
                      </div>
                    )}
                  </div>

                  {/* Right actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    {job && (
                      <Link href={`/jobs/${job.slug}`}>
                        <button className="h-9 px-4 border border-border text-neutral-60 text-[13px] font-semibold hover:border-primary hover:text-primary transition-colors">
                          View Job
                        </button>
                      </Link>
                    )}
                    <Link href={`/applications/${a.id}`}>
                      <Button className="h-9 px-5 text-[13px]">View Status</Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
