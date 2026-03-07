"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { getResumePdf } from "@/lib/idb";
import { createApplication } from "@/lib/applications";
import { useEffect, useState } from "react";
import { ALL_JOBS } from "@/lib/jobs";

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [hasPdf, setHasPdf] = useState(false);
  const [source, setSource] = useState<"profile" | "pdf">("profile");
  const [loading, setLoading] = useState(false);

  const job = ALL_JOBS.find((j) => j.slug === params.slug);

  useEffect(() => {
    (async () => {
      const rec = await getResumePdf();
      setHasPdf(!!rec);
    })();
  }, []);

  const onContinue = async () => {
    setLoading(true);
    const app = createApplication(params.slug, source);
    router.push(`/jobs/${params.slug}/assessment?appId=${encodeURIComponent(app.id)}`);
  };

  const steps = [
    { label: "Select Resume", active: true, done: false },
    { label: "Assessment", active: false, done: false },
    { label: "Confirmation", active: false, done: false },
  ];

  return (
    <main className="min-h-screen bg-light-gray pt-[78px]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-[14px] text-neutral-60">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>›</span>
            <Link href="/jobs" className="hover:text-primary transition-colors">Jobs</Link>
            <span>›</span>
            {job && (
              <>
                <Link href={`/jobs/${job.slug}`} className="hover:text-primary transition-colors">
                  {job.job_title}
                </Link>
                <span>›</span>
              </>
            )}
            <span className="text-neutral-100">Apply</span>
          </div>
        </div>
      </div>

      <div className="container py-10">
        {/* Progress steps */}
        <div className="flex items-center gap-0 mb-10 max-w-xl mx-auto">
          {steps.map((step, idx) => (
            <div key={step.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-[14px] font-bold transition-colors ${step.active
                      ? "bg-primary border-primary text-white"
                      : "border-neutral-20 text-neutral-60"
                    }`}
                >
                  {step.done ? "✓" : idx + 1}
                </div>
                <Text variant="body_sm" className={step.active ? "text-primary font-semibold" : "text-neutral-60"}>
                  {step.label}
                </Text>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-px bg-neutral-20 mx-1 mt-[-20px]" />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Job info */}
          {job && (
            <div className="bg-white border border-border p-6 flex items-center gap-4 mb-6">
              <div className="w-14 h-14 border border-border flex items-center justify-center bg-light-gray shrink-0 overflow-hidden">
                <Image src={job.company_logo} alt={job.company_name} width={40} height={40} className="object-contain" />
              </div>
              <div>
                <Text variant="title_lg" className="text-neutral-100">{job.job_title}</Text>
                <div className="flex items-center gap-2 mt-1">
                  <Text variant="body_sm" className="text-neutral-60">{job.company_name}</Text>
                  <div className="w-1 h-1 rounded-full bg-neutral-60" />
                  <Text variant="body_sm" className="text-neutral-60">{job.location}</Text>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white border border-border p-8">
            <Text variant="title_lg" className="text-neutral-100 mb-2">Select Resume Source</Text>
            <Text variant="body_md" className="text-neutral-60 mb-6">
              Choose how you want to submit your resume for this application.
            </Text>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {/* Profile option */}
              <button
                onClick={() => setSource("profile")}
                className={`p-6 border-2 bg-white text-left transition-all group ${source === "profile" ? "border-primary" : "border-border hover:border-neutral-60/50"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${source === "profile" ? "bg-primary/10" : "bg-light-gray"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={source === "profile" ? "#4640DE" : "#7C8493"} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Text variant="body_lg" className="font-semibold text-neutral-100">Use Profile Data</Text>
                      {source === "profile" && (
                        <span className="px-2 py-0.5 bg-primary text-white text-[12px] font-bold">Selected</span>
                      )}
                    </div>
                    <Text variant="body_md" className="text-neutral-60">
                      Automatically generate an ATS-friendly resume from your saved profile information including skills, experience, and education.
                    </Text>
                  </div>
                </div>
              </button>

              {/* PDF option */}
              <button
                onClick={() => hasPdf && setSource("pdf")}
                disabled={!hasPdf}
                className={`p-6 border-2 bg-white text-left transition-all ${!hasPdf
                    ? "opacity-50 cursor-not-allowed border-border"
                    : source === "pdf"
                      ? "border-primary"
                      : "border-border hover:border-neutral-60/50 cursor-pointer"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${source === "pdf" ? "bg-primary/10" : "bg-light-gray"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={source === "pdf" ? "#4640DE" : "#7C8493"} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Text variant="body_lg" className="font-semibold text-neutral-100">Use Uploaded PDF</Text>
                      {source === "pdf" && (
                        <span className="px-2 py-0.5 bg-primary text-white text-[12px] font-bold">Selected</span>
                      )}
                      {!hasPdf && (
                        <span className="px-2 py-0.5 bg-neutral-20 text-neutral-60 text-[12px] font-semibold">No file found</span>
                      )}
                    </div>
                    <Text variant="body_md" className="text-neutral-60">
                      Use the PDF resume you previously uploaded to your profile.
                    </Text>
                    {!hasPdf && (
                      <Text variant="body_sm" className="text-accent-blue mt-2">
                        <Link href="/profile" className="hover:underline">
                          Upload a PDF resume in your Profile →
                        </Link>
                      </Text>
                    )}
                  </div>
                </div>
              </button>
            </div>

            {/* Info banner */}
            <div className="flex gap-3 p-4 bg-primary/5 border border-primary/20 mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#4640DE" className="shrink-0 mt-0.5" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <Text variant="body_sm" className="text-neutral-80">
                After selecting your resume source, you&apos;ll complete a short assessment to verify your skills before your application is submitted.
              </Text>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={onContinue}
                disabled={loading}
                className="h-[50px] px-8 disabled:opacity-60"
              >
                {loading ? "Proceeding..." : "Continue to Assessment →"}
              </Button>
              <Link href={`/jobs/${params.slug}`}>
                <button className="text-neutral-60 hover:text-neutral-100 text-[15px] font-semibold transition-colors">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
