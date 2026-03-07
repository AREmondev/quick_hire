"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { updateApplication } from "@/lib/applications";
import { getAssessmentForJob, AssessmentQuestion } from "@/lib/assessments";

export default function AssessmentPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const appId = sp.get("appId") || "";
  const slug = sp.get("job") || "default";
  const questions: AssessmentQuestion[] = getAssessmentForJob(slug);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).filter((k) => (answers[k] || "").trim().length > 0).length;
  const progress = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  const canSubmit = useMemo(() => {
    return questions.every((q) => (answers[q.id] || "").trim().length > 0);
  }, [answers, questions]);

  const onSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    const score = questions.reduce((acc, q) => {
      if (q.type === "mcq") {
        return acc + (answers[q.id] === q.answer ? 1 : 0);
      }
      return acc;
    }, 0);
    updateApplication(appId, {
      assessment: {
        score,
        total: questions.filter((q) => q.type === "mcq").length,
        answers,
      },
      status: "assessment_completed",
    });
    setTimeout(() => router.push(`/applications/${encodeURIComponent(appId)}`), 800);
  };

  const steps = [
    { label: "Select Resume", active: false, done: true },
    { label: "Assessment", active: true, done: false },
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
            <span className="text-neutral-100">Assessment</span>
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
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-[14px] font-bold transition-colors ${step.done
                      ? "bg-accent-green border-accent-green text-white"
                      : step.active
                        ? "bg-primary border-primary text-white"
                        : "border-neutral-20 text-neutral-60"
                    }`}
                >
                  {step.done ? "✓" : idx + 1}
                </div>
                <Text variant="body_sm" className={step.active ? "text-primary font-semibold" : step.done ? "text-accent-green font-semibold" : "text-neutral-60"}>
                  {step.label}
                </Text>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-px mx-1 mt-[-20px] ${step.done ? "bg-accent-green" : "bg-neutral-20"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Header card */}
          <div className="bg-white border border-border p-8 mb-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <Text variant="title_lg" className="text-neutral-100 mb-1">Skills Assessment</Text>
                <Text variant="body_md" className="text-neutral-60">
                  Complete all {questions.length} questions to submit your application. Take your time to give thoughtful answers.
                </Text>
              </div>
              <div className="shrink-0 text-right">
                <Text variant="body_sm" className="text-neutral-60 mb-1">{answeredCount}/{questions.length} completed</Text>
                <div className="w-32 h-2 bg-neutral-20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="flex flex-col gap-5">
            {questions.map((q, idx) => {
              const isAnswered = (answers[q.id] || "").trim().length > 0;
              return (
                <div
                  key={q.id}
                  className={`bg-white border p-8 transition-all ${isAnswered ? "border-accent-green/40" : "border-border"}`}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 transition-colors ${isAnswered ? "bg-accent-green text-white" : "bg-primary/10 text-primary"
                        }`}
                    >
                      {isAnswered ? "✓" : idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={`px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${q.type === "mcq"
                              ? "bg-accent-blue/10 text-accent-blue"
                              : q.type === "code"
                                ? "bg-accent-red/10 text-accent-red"
                                : "bg-accent-yellow/10 text-accent-yellow"
                            }`}
                        >
                          {q.type === "mcq" ? "Multiple Choice" : q.type === "code" ? "Code Challenge" : "Written Answer"}
                        </span>
                      </div>
                      <Text variant="body_lg" className="font-semibold text-neutral-100">
                        {q.prompt}
                      </Text>
                    </div>
                  </div>

                  {/* MCQ */}
                  {q.type === "mcq" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-12">
                      {q.options.map((opt) => (
                        <label
                          key={opt}
                          className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${answers[q.id] === opt
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-neutral-60/50 bg-white"
                            }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${answers[q.id] === opt ? "border-primary" : "border-neutral-60/40"}`}>
                            {answers[q.id] === opt && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <input
                            type="radio"
                            name={q.id}
                            value={opt}
                            checked={answers[q.id] === opt}
                            onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                            className="sr-only"
                          />
                          <Text variant="body_md" className="text-neutral-80">{opt}</Text>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Text answer */}
                  {q.type === "text" && (
                    <div className="ml-12">
                      <textarea
                        placeholder={q.placeholder || "Write your answer here..."}
                        value={answers[q.id] || ""}
                        onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                        className="w-full min-h-32 border border-border bg-light-gray p-4 text-neutral-100 placeholder:text-neutral-60 focus:outline-none focus:border-primary transition-colors text-[15px] leading-6 resize-none"
                      />
                      {q.minWords && (
                        <Text variant="body_sm" className="text-neutral-60 mt-1">
                          Minimum {q.minWords} words. Current: {(answers[q.id] || "").split(/\s+/).filter(Boolean).length} words
                        </Text>
                      )}
                    </div>
                  )}

                  {/* Code */}
                  {q.type === "code" && (
                    <div className="ml-12">
                      <div className="bg-neutral-100 px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-accent-red" />
                          <div className="w-3 h-3 rounded-full bg-accent-yellow" />
                          <div className="w-3 h-3 rounded-full bg-accent-green" />
                        </div>
                        <Text variant="body_sm" className="text-neutral-60 ml-2">{q.language || "code"}</Text>
                      </div>
                      <textarea
                        className="w-full min-h-48 bg-neutral-100/95 p-4 text-accent-green font-mono text-[14px] leading-6 focus:outline-none focus:ring-1 focus:ring-primary resize-none border-0"
                        placeholder={q.starter || "// Write your solution here"}
                        value={answers[q.id] || q.starter || ""}
                        onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                        spellCheck={false}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit */}
          <div className="mt-8 bg-white border border-border p-8 flex items-center justify-between">
            <div>
              <Text variant="body_md" className="text-neutral-100 font-semibold">
                {canSubmit ? "All questions answered! Ready to submit." : `${questions.length - answeredCount} question${questions.length - answeredCount !== 1 ? "s" : ""} remaining`}
              </Text>
              <Text variant="body_sm" className="text-neutral-60 mt-0.5">
                Your answers will be saved and reviewed by the hiring team.
              </Text>
            </div>
            <Button
              onClick={onSubmit}
              disabled={!canSubmit || submitted}
              className={`h-[50px] px-8 disabled:opacity-60 transition-all ${submitted ? "bg-accent-green border-accent-green" : ""}`}
            >
              {submitted ? "Submitting... ✓" : "Submit Assessment"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
