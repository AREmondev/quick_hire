"use client";
import { useState } from "react";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { useMyProfileQuery } from "@/hooks/profile";
import { Button } from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";

export default function ResumePage() {
  const { data: p, isLoading } = useMyProfileQuery();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-light-gray pt-[78px]">
        <Loading variant="section" text="Generating your resume preview..." />
      </main>
    );
  }

  if (!p) {
    return (
      <main className="min-h-screen bg-light-gray pt-[78px]">
        <div className="container py-20">
          <div className="max-w-md mx-auto bg-white border border-border p-12 text-center">
            <div className="text-5xl mb-4">📋</div>
            <Text variant="title_lg" className="text-neutral-100 mb-2">
              Profile not found
            </Text>
            <Link href="/profile">
              <Button>Go to Profile</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const hasContent =
    p.name ||
    p.summary ||
    p.experiences.length > 0 ||
    p.education.length > 0 ||
    p.skills.length > 0 ||
    p.projects.length > 0;

  return (
    <main className="min-h-screen bg-light-gray pt-[78px]">
      {/* Header bar */}
      <div className="bg-white border-b border-border print:hidden">
        <div className="container py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <button className="h-9 px-4 border border-border text-neutral-60 text-[13px] font-semibold hover:border-primary hover:text-primary transition-colors">
                ← Edit Profile
              </button>
            </Link>
            <Text variant="title_lg" className="text-neutral-100">
              Resume Preview
            </Text>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="h-[50px] px-8 bg-primary text-white font-semibold text-[15px] hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2v-5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {!hasContent ? (
        <div className="container py-20">
          <div className="max-w-md mx-auto bg-white border border-border p-12 text-center print:hidden">
            <div className="text-5xl mb-4">📋</div>
            <Text variant="title_lg" className="text-neutral-100 mb-2">
              Your profile is empty
            </Text>
            <Text variant="body_md" className="text-neutral-60 mb-6">
              Fill in your profile details to generate a professional resume.
            </Text>
            <Link href="/profile">
              <Button>Complete Your Profile</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="container py-10 print:py-0 print:max-w-none print:px-0">
          {/* A4 resume paper */}
          <div
            className="mx-auto bg-white shadow-lg print:shadow-none print:m-0 print:w-full"
            style={{ maxWidth: "210mm" }}
          >
            {/* Header */}
            <div className="px-10 pt-10 pb-6 border-b-2 border-primary/20 print:px-8 print:pt-8">
              <h1 className="font-epilogue text-[28px] font-bold text-neutral-100 leading-tight print:text-[24px]">
                {p.name || "Your Name"}
              </h1>
              {p.title && (
                <p className="font-epilogue text-[16px] text-primary font-semibold mt-1 print:text-[14px]">
                  {p.title}
                </p>
              )}
              {/* Contact line */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                {[
                  p.location ? { icon: "📍", val: p.location } : null,
                  p.email ? { icon: "✉", val: p.email } : null,
                  p.phone ? { icon: "📱", val: p.phone } : null,
                ]
                  .filter((item): item is { icon: string; val: string } =>
                    Boolean(item),
                  )
                  .map((item) => (
                    <span
                      key={item.val}
                      className="flex items-center gap-1 text-[13px] text-neutral-60 print:text-[11px]"
                    >
                      <span>{item.icon}</span>
                      <span>{item.val}</span>
                    </span>
                  ))}
              </div>
              {/* Links */}
              {[p.github, p.linkedin, p.portfolio, p.website].filter(Boolean)
                .length > 0 && (
                <div className="flex flex-wrap gap-x-4 mt-2">
                  {[p.github, p.linkedin, p.portfolio, p.website]
                    .filter(Boolean)
                    .map((link) => (
                      <a
                        key={link}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-primary hover:underline print:text-[11px]"
                      >
                        {link}
                      </a>
                    ))}
                </div>
              )}
            </div>

            <div className="px-10 pb-10 print:px-8 print:pb-8">
              {/* Summary */}
              {p.summary && (
                <section className="mt-6">
                  <ResumeSection title="PROFILE SUMMARY" />
                  <p className="text-[14px] text-neutral-80 leading-6 print:text-[12px] print:leading-5">
                    {p.summary}
                  </p>
                </section>
              )}

              {/* Skills */}
              {(p.skills.length > 0 ||
                (p.technicalSkills && p.technicalSkills.length > 0) ||
                (p.tools && p.tools.length > 0)) && (
                <section className="mt-6">
                  <ResumeSection title="SKILLS" />
                  <div className="flex flex-col gap-2">
                    {p.technicalSkills && p.technicalSkills.length > 0 && (
                      <div className="text-[14px] print:text-[12px]">
                        <span className="font-bold text-neutral-100">
                          Technical:
                        </span>{" "}
                        <span className="text-neutral-80">
                          {p.technicalSkills.join(" • ")}
                        </span>
                      </div>
                    )}
                    {p.tools && p.tools.length > 0 && (
                      <div className="text-[14px] print:text-[12px]">
                        <span className="font-bold text-neutral-100">
                          Tools:
                        </span>{" "}
                        <span className="text-neutral-80">
                          {p.tools.join(" • ")}
                        </span>
                      </div>
                    )}
                    {p.skills.length > 0 && (
                      <div className="text-[14px] print:text-[12px]">
                        <span className="font-bold text-neutral-100">
                          Soft Skills:
                        </span>{" "}
                        <span className="text-neutral-80">
                          {p.skills.join(" • ")}
                        </span>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Experience */}
              {p.experiences.length > 0 && (
                <section className="mt-6">
                  <ResumeSection title="WORK EXPERIENCE" />
                  <div className="flex flex-col gap-5">
                    {p.experiences.map((exp, i) => (
                      <div key={i}>
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <div>
                            <p className="font-bold text-[15px] text-neutral-100 print:text-[13px]">
                              {exp.company}
                            </p>
                            <p className="font-semibold text-[14px] text-primary print:text-[12px]">
                              {exp.role}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[13px] text-neutral-60 print:text-[11px]">
                              {exp.location}
                            </p>
                            <p className="text-[13px] text-neutral-60 print:text-[11px]">
                              {exp.startDate}
                              {exp.endDate ? ` – ${exp.endDate}` : ""}
                            </p>
                          </div>
                        </div>
                        {exp.bullets.filter((b) => b.description).length >
                          0 && (
                          <ul className="mt-2 ml-4 flex flex-col gap-1">
                            {exp.bullets
                              .filter((b) => b.description)
                              .map((b, bi) => (
                                <li
                                  key={bi}
                                  className="flex items-start gap-2 text-[13px] text-neutral-80 leading-5 print:text-[11px]"
                                >
                                  <span className="text-primary mt-0.5 shrink-0">
                                    ▪
                                  </span>
                                  {b.description}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {p.education.length > 0 && (
                <section className="mt-6">
                  <ResumeSection title="EDUCATION" />
                  <div className="flex flex-col gap-4">
                    {p.education.map((ed, i) => (
                      <div
                        key={i}
                        className="flex items-start justify-between gap-4"
                      >
                        <div>
                          <p className="font-bold text-[15px] text-neutral-100 print:text-[13px]">
                            {ed.institution}
                          </p>
                          {ed.degree && (
                            <p className="text-[14px] text-neutral-80 print:text-[12px]">
                              {ed.degree}
                            </p>
                          )}
                          {ed.details && (
                            <p className="text-[13px] text-neutral-60 mt-0.5 print:text-[11px]">
                              {ed.details}
                            </p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[13px] text-neutral-60 print:text-[11px]">
                            {ed.startDate}
                            {ed.endDate ? ` – ${ed.endDate}` : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {p.projects.length > 0 && (
                <section className="mt-6">
                  <ResumeSection title="PROJECTS" />
                  <div className="flex flex-col gap-4">
                    {p.projects.map((pr, i) => (
                      <div key={i}>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-bold text-[15px] text-neutral-100 print:text-[13px]">
                            {pr.name}
                          </p>
                          {pr.link && (
                            <a
                              href={pr.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[13px] text-primary hover:underline print:text-[11px]"
                            >
                              {pr.link}
                            </a>
                          )}
                        </div>
                        {pr.description && (
                          <p className="text-[13px] text-neutral-80 leading-5 print:text-[11px]">
                            {pr.description}
                          </p>
                        )}
                        {pr.tech.length > 0 && (
                          <p className="text-[12px] text-neutral-60 mt-1 print:text-[10px]">
                            {pr.tech.join(" • ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Tip box under resume */}
          <div className="mx-auto mt-6 max-w-[210mm] print:hidden">
            <div className="bg-white border border-border p-5 flex items-start gap-4">
              <div className="text-2xl">💡</div>
              <div>
                <Text
                  variant="body_md"
                  className="font-semibold text-neutral-100 mb-1"
                >
                  Looks good?
                </Text>
                <Text variant="body_sm" className="text-neutral-60">
                  Use the <strong>Download PDF</strong> button above to save
                  your resume. For ATS optimization, make sure all sections are
                  filled in your{" "}
                  <Link
                    href="/profile"
                    className="text-primary hover:underline"
                  >
                    Profile page
                  </Link>
                  .
                </Text>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ResumeSection({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <h2 className="text-[11px] font-extrabold tracking-[0.15em] text-primary uppercase print:text-[10px]">
        {title}
      </h2>
      <div className="flex-1 h-px bg-primary/20" />
    </div>
  );
}
