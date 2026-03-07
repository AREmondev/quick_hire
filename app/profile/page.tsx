"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import {
  loadProfile,
  saveProfile,
  Profile,
  Experience,
  Education,
  Project,
} from "@/lib/profile";
import { deleteResumePdf, getResumePdf, saveResumePdf } from "@/lib/idb";

// ---------- internal UI components ----------

const FormInput = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-semibold text-neutral-80 uppercase tracking-wide">{label}</label>
    <input
      {...props}
      className={[
        "h-11 w-full border border-border bg-white px-4 text-neutral-100 text-[15px]",
        "placeholder:text-neutral-60 focus:outline-none focus:border-primary transition-colors",
        props.className || "",
      ].join(" ")}
    />
  </div>
);

const FormTextArea = ({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-semibold text-neutral-80 uppercase tracking-wide">{label}</label>
    <textarea
      {...props}
      className={[
        "min-h-28 w-full border border-border bg-white p-4 text-neutral-100 text-[15px]",
        "placeholder:text-neutral-60 focus:outline-none focus:border-primary transition-colors resize-none",
        props.className || "",
      ].join(" ")}
    />
  </div>
);

const SectionCard = ({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <div className="bg-white border border-border">
    <div className="px-8 py-5 border-b border-border flex items-center justify-between">
      <Text variant="title_lg" className="text-neutral-100">{title}</Text>
      {action}
    </div>
    <div className="p-8">{children}</div>
  </div>
);

const TagInput = ({
  label,
  tags,
  placeholder,
  onAdd,
  onRemove,
}: {
  label: string;
  tags: string[];
  placeholder: string;
  onAdd: (val: string) => void;
  onRemove: (val: string) => void;
}) => {
  const [input, setInput] = useState("");
  const handleAdd = () => {
    const v = input.trim();
    if (!v) return;
    onAdd(v);
    setInput("");
  };
  return (
    <div className="flex flex-col gap-3">
      <label className="text-[13px] font-semibold text-neutral-80 uppercase tracking-wide">{label}</label>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAdd(); } }}
          placeholder={placeholder}
          className="flex-1 h-11 border border-border bg-white px-4 text-neutral-100 text-[15px] placeholder:text-neutral-60 focus:outline-none focus:border-primary transition-colors"
        />
        <Button onClick={handleAdd} type="button" className="h-11 px-5">Add</Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onRemove(tag)}
              type="button"
              className="flex items-center gap-2 pl-3 pr-2 h-8 border border-border bg-light-gray text-neutral-80 text-[13px] font-medium hover:border-accent-red hover:text-accent-red transition-colors group"
            >
              {tag}
              <span className="text-neutral-60 group-hover:text-accent-red transition-colors">×</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ---------- Sidebar nav tabs ----------
const SIDEBAR_TABS = [
  { id: "basic", label: "Basic Info" },
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(() => loadProfile());
  const [activeTab, setActiveTab] = useState("basic");
  const [saved, setSaved] = useState(false);
  const [resumeMeta, setResumeMeta] = useState<{ name: string; url: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const rec = await getResumePdf();
        if (rec) {
          const url = URL.createObjectURL(rec.blob);
          setResumeMeta({ name: rec.name, url });
          window.addEventListener("beforeunload", () => URL.revokeObjectURL(url), { once: true });
        }
      } catch { /* ignore */ }
    })();
  }, []);

  const canSave = useMemo(() => profile.name && profile.title && profile.email, [profile]);

  const save = () => {
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Skills helpers
  const addSkill = (v: string) => {
    if (!profile.skills.includes(v)) setProfile({ ...profile, skills: [...profile.skills, v] });
  };
  const removeSkill = (v: string) => setProfile({ ...profile, skills: profile.skills.filter((s) => s !== v) });

  const addTech = (v: string) => {
    const arr = profile.technicalSkills || [];
    if (!arr.includes(v)) setProfile({ ...profile, technicalSkills: [...arr, v] });
  };
  const removeTech = (v: string) => setProfile({ ...profile, technicalSkills: (profile.technicalSkills || []).filter((s) => s !== v) });

  const addTool = (v: string) => {
    const arr = profile.tools || [];
    if (!arr.includes(v)) setProfile({ ...profile, tools: [...arr, v] });
  };
  const removeTool = (v: string) => setProfile({ ...profile, tools: (profile.tools || []).filter((s) => s !== v) });

  // Experience helpers
  const addExperience = () => {
    const e: Experience = { company: "", role: "", location: "", startDate: "", endDate: "", bullets: [""] };
    setProfile({ ...profile, experiences: [...profile.experiences, e] });
  };
  const updateExperience = (i: number, patch: Partial<Experience>) => {
    const arr = [...profile.experiences];
    arr[i] = { ...arr[i], ...patch };
    setProfile({ ...profile, experiences: arr });
  };
  const removeExperience = (i: number) =>
    setProfile({ ...profile, experiences: profile.experiences.filter((_, idx) => idx !== i) });

  // Education helpers
  const addEducation = () => {
    const e: Education = { institution: "", degree: "", startDate: "", endDate: "", details: "" };
    setProfile({ ...profile, education: [...profile.education, e] });
  };
  const updateEducation = (i: number, patch: Partial<Education>) => {
    const arr = [...profile.education];
    arr[i] = { ...arr[i], ...patch };
    setProfile({ ...profile, education: arr });
  };
  const removeEducation = (i: number) =>
    setProfile({ ...profile, education: profile.education.filter((_, idx) => idx !== i) });

  // Projects helpers
  const addProject = () => {
    const p: Project = { name: "", link: "", description: "", tech: [] };
    setProfile({ ...profile, projects: [...profile.projects, p] });
  };
  const updateProject = (i: number, patch: Partial<Project>) => {
    const arr = [...profile.projects];
    arr[i] = { ...arr[i], ...patch };
    setProfile({ ...profile, projects: arr });
  };
  const removeProject = (i: number) =>
    setProfile({ ...profile, projects: profile.projects.filter((_, idx) => idx !== i) });

  // Resume helpers
  const onUploadResume = async (file?: File | null) => {
    if (!file || file.type !== "application/pdf") return;
    await saveResumePdf(file);
    const rec = await getResumePdf();
    if (rec) {
      const url = URL.createObjectURL(rec.blob);
      setResumeMeta({ name: rec.name, url });
    }
  };
  const onRemoveResume = async () => {
    await deleteResumePdf();
    if (resumeMeta?.url) URL.revokeObjectURL(resumeMeta.url);
    setResumeMeta(null);
  };

  const buildResumeHtml = (p: Profile) => {
    const primary = "#4640DE";
    const neutral60 = "#7C8493";
    const neutral100 = "#25324B";
    const section = (title: string) =>
      `<h2 style="color:${primary}; margin: 16px 0 8px; font-size: 18px; font-weight: 700;">${title}</h2>`;
    const line = (s: string) =>
      `<p style="margin: 2px 0; font-size: 12px; color:${neutral100}">${s}</p>`;

    const edu = p.education
      .map((e) => `${line(`${e.institution}${e.degree ? " | " + e.degree : ""}`)}${line(`${e.startDate}${e.endDate ? " - " + e.endDate : ""}`)}${e.details ? line(e.details) : ""}`)
      .join("");

    const tech =
      (p.technicalSkills?.length
        ? `<p style="font-size: 12px;"><span style="font-weight:700;">Technical: </span>${p.technicalSkills.join(", ")}</p>`
        : "") +
      (p.tools?.length
        ? `<p style="font-size: 12px;"><span style="font-weight:700;">Tools: </span>${p.tools.join(", ")}</p>`
        : "") ||
      (p.skills.length ? `<p style="font-size: 12px;">${p.skills.join(", ")}</p>` : "");

    const exp = p.experiences
      .map((e) => {
        const bullets = e.bullets
          .filter(Boolean)
          .map((b) => `<li style="margin: 0 0 6px 0; font-size: 12px; color:${neutral100};">${b}</li>`)
          .join("");
        return `<div style="margin-bottom: 10px;"><div style="display:flex; justify-content:space-between; gap:16px;"><div><p style="margin:0; font-size: 14px; color:${neutral100}; font-weight: 600;">${e.company}</p><p style="margin:0; font-size: 12px; color:${neutral100}; font-weight: 600;">${e.role}</p></div><div style="text-align:right;"><p style="margin:0; font-size: 12px; color:${neutral60}; font-style: italic;">${e.location}</p><p style="margin:0; font-size: 12px; color:${neutral60}; font-style: italic;">${e.startDate}${e.endDate ? " - " + e.endDate : ""}</p></div></div><ul style="margin: 6px 0 0 18px; padding: 0;">${bullets}</ul></div>`;
      })
      .join("");

    const links = [p.github, p.linkedin, p.portfolio, p.website]
      .filter(Boolean)
      .map((l) => `<a href="${l}" style="color:${primary}; text-decoration: none;" target="_blank">${l}</a>`)
      .join(" | ");

    return `<!doctype html><html><head><meta charset="utf-8"/><title>Resume - ${p.name || "Candidate"}</title><style>@page{size:A4;margin:18mm}body{font-family:system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:${neutral100}}.header h1{margin:0;font-size:24px;font-weight:700}.header p{margin:2px 0;font-size:12px;color:${neutral60}}</style></head><body><div class="header" style="border-bottom:1px solid ${neutral60}33;padding-bottom:8px;"><h1>${p.name || "Your Name"}</h1><p>${p.title || ""}</p><p>${p.location || ""} • ${p.email || ""} • ${p.phone || ""}</p><p>${links}</p></div>${p.summary ? `${section("Profile")}${line(p.summary)}` : ""}${p.education.length ? `${section("EDUCATION")}<div>${edu}</div>` : ""}${tech ? `${section("SKILLS")}<div style="font-size:12px;color:${neutral100};">${tech}</div>` : ""}${p.experiences.length ? `${section("EXPERIENCE")}<div>${exp}</div>` : ""}</body></html>`;
  };

  const printResume = () => {
    const html = buildResumeHtml(profile);
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
    const done = () => { w.focus(); w.print(); };
    if (w.document.readyState === "complete") done();
    else w.onload = done;
  };

  // Profile completeness
  const fields = [profile.name, profile.title, profile.email, profile.phone, profile.summary, profile.location];
  const filled = fields.filter(Boolean).length;
  const completeness = Math.round((filled / fields.length) * 100);

  return (
    <main className="min-h-screen bg-light-gray pt-[78px]">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container py-8">
          <div className="flex items-center justify-between gap-6">
            <div>
              <Text variant="h2" fontFamily="clash" className="text-neutral-100">
                My <span className="text-primary">Profile</span>
              </Text>
              <Text variant="body_md" className="text-neutral-60 mt-1">
                Build your professional profile to apply for jobs faster.
              </Text>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/resume">
                <button className="h-[50px] px-6 border border-border text-neutral-60 font-semibold text-[15px] hover:border-primary hover:text-primary transition-colors">
                  Preview Resume
                </button>
              </Link>
              <Button
                onClick={save}
                disabled={!canSave}
                className={`h-[50px] px-8 disabled:opacity-60 transition-all ${saved ? "bg-accent-green" : ""}`}
              >
                {saved ? "Saved! ✓" : "Save Profile"}
              </Button>
            </div>
          </div>

          {/* Completeness bar */}
          <div className="mt-6 flex items-center gap-4">
            <Text variant="body_sm" className="text-neutral-60 shrink-0">Profile {completeness}% complete</Text>
            <div className="flex-1 h-2 bg-neutral-20 rounded-full overflow-hidden max-w-xs">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${completeness}%`,
                  backgroundColor: completeness >= 80 ? "#56CDAD" : completeness >= 50 ? "#FFB836" : "#4640DE",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar nav */}
          <aside className="w-full lg:w-[220px] shrink-0">
            <div className="bg-white border border-border sticky top-[98px]">
              {SIDEBAR_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-5 py-3.5 text-left font-semibold text-[14px] transition-colors border-l-2 ${activeTab === tab.id
                      ? "border-primary text-primary bg-primary/5"
                      : "border-transparent text-neutral-60 hover:text-neutral-100 hover:bg-light-gray"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* BASIC INFO */}
            {activeTab === "basic" && (
              <SectionCard title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput label="Full Name *" placeholder="e.g. John Doe" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                  <FormInput label="Professional Title *" placeholder="e.g. Senior Frontend Engineer" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
                  <FormInput label="Email *" type="email" placeholder="john@example.com" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                  <FormInput label="Phone" placeholder="+1 234 567 8900" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                  <FormInput label="Location" placeholder="e.g. San Francisco, CA" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
                  <FormInput label="Website" placeholder="https://yoursite.com" value={profile.website || ""} onChange={(e) => setProfile({ ...profile, website: e.target.value })} />
                  <FormInput label="GitHub" placeholder="https://github.com/username" value={profile.github || ""} onChange={(e) => setProfile({ ...profile, github: e.target.value })} />
                  <FormInput label="LinkedIn" placeholder="https://linkedin.com/in/username" value={profile.linkedin || ""} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} />
                  <FormInput label="Portfolio" placeholder="https://portfolio.com" value={profile.portfolio || ""} onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })} />
                </div>
              </SectionCard>
            )}

            {/* SUMMARY */}
            {activeTab === "summary" && (
              <SectionCard title="Professional Summary">
                <FormTextArea
                  label="Summary"
                  placeholder="Write a compelling 2-4 sentence summary highlighting your experience, key skills, and career goals..."
                  value={profile.summary}
                  onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                  className="min-h-40"
                />
                <div className="mt-4 p-4 bg-primary/5 border border-primary/20">
                  <Text variant="body_sm" className="text-primary font-semibold mb-1">💡 Tips for a great summary</Text>
                  <Text variant="body_sm" className="text-neutral-60">Start with your years of experience, mention your key areas of expertise, and end with what you&apos;re looking for next.</Text>
                </div>
              </SectionCard>
            )}

            {/* SKILLS */}
            {activeTab === "skills" && (
              <>
                <SectionCard title="Soft Skills">
                  <TagInput label="Add Skill" tags={profile.skills} placeholder="e.g. Leadership, Communication" onAdd={addSkill} onRemove={removeSkill} />
                </SectionCard>
                <SectionCard title="Technical Skills">
                  <TagInput label="Add Technical Skill" tags={profile.technicalSkills || []} placeholder="e.g. React, TypeScript, GraphQL" onAdd={addTech} onRemove={removeTech} />
                </SectionCard>
                <SectionCard title="Tools & Software">
                  <TagInput label="Add Tool" tags={profile.tools || []} placeholder="e.g. Figma, VS Code, Docker" onAdd={addTool} onRemove={removeTool} />
                </SectionCard>
              </>
            )}

            {/* EXPERIENCE */}
            {activeTab === "experience" && (
              <SectionCard
                title="Work Experience"
                action={
                  <Button onClick={addExperience} type="button" className="h-9 px-5 text-[13px]">
                    + Add Experience
                  </Button>
                }
              >
                {profile.experiences.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed border-neutral-20">
                    <Text variant="body_md" className="text-neutral-60 mb-3">No work experience added yet.</Text>
                    <Button onClick={addExperience} type="button">Add Your First Experience</Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8">
                    {profile.experiences.map((exp, i) => (
                      <div key={i} className="border border-border p-6 relative">
                        <button
                          onClick={() => removeExperience(i)}
                          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-neutral-60 hover:text-accent-red transition-colors border border-border hover:border-accent-red"
                          type="button"
                        >
                          ×
                        </button>
                        <Text variant="body_sm" className="text-primary font-bold uppercase tracking-wide mb-4">Position {i + 1}</Text>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <FormInput label="Company" placeholder="Company name" value={exp.company} onChange={(e) => updateExperience(i, { company: e.target.value })} />
                          <FormInput label="Role / Title" placeholder="Job title" value={exp.role} onChange={(e) => updateExperience(i, { role: e.target.value })} />
                          <FormInput label="Location" placeholder="City, Country" value={exp.location} onChange={(e) => updateExperience(i, { location: e.target.value })} />
                          <div className="grid grid-cols-2 gap-3">
                            <FormInput label="Start Date" placeholder="Jan 2023" value={exp.startDate} onChange={(e) => updateExperience(i, { startDate: e.target.value })} />
                            <FormInput label="End Date" placeholder="Present" value={exp.endDate} onChange={(e) => updateExperience(i, { endDate: e.target.value })} />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[13px] font-semibold text-neutral-80 uppercase tracking-wide">Key Achievements / Bullets</label>
                          {exp.bullets.map((b, bi) => (
                            <div key={bi} className="flex gap-2">
                              <input
                                placeholder={`Achievement ${bi + 1}...`}
                                value={b}
                                onChange={(e) => {
                                  const next = [...exp.bullets];
                                  next[bi] = e.target.value;
                                  updateExperience(i, { bullets: next });
                                }}
                                className="flex-1 h-11 border border-border bg-white px-4 text-neutral-100 text-[15px] placeholder:text-neutral-60 focus:outline-none focus:border-primary transition-colors"
                              />
                              {exp.bullets.length > 1 && (
                                <button
                                  onClick={() => updateExperience(i, { bullets: exp.bullets.filter((_, idx) => idx !== bi) })}
                                  type="button"
                                  className="w-11 h-11 border border-border text-neutral-60 hover:text-accent-red hover:border-accent-red transition-colors"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            onClick={() => updateExperience(i, { bullets: [...exp.bullets, ""] })}
                            type="button"
                            className="self-start h-9 px-4 border border-dashed border-neutral-60/40 text-neutral-60 text-[13px] font-semibold hover:border-primary hover:text-primary transition-colors"
                          >
                            + Add Bullet
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>
            )}

            {/* EDUCATION */}
            {activeTab === "education" && (
              <SectionCard
                title="Education"
                action={
                  <Button onClick={addEducation} type="button" className="h-9 px-5 text-[13px]">
                    + Add Education
                  </Button>
                }
              >
                {profile.education.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed border-neutral-20">
                    <Text variant="body_md" className="text-neutral-60 mb-3">No education records added yet.</Text>
                    <Button onClick={addEducation} type="button">Add Education</Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {profile.education.map((ed, i) => (
                      <div key={i} className="border border-border p-6 relative">
                        <button
                          onClick={() => removeEducation(i)}
                          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-neutral-60 hover:text-accent-red transition-colors border border-border hover:border-accent-red"
                          type="button"
                        >
                          ×
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormInput label="Institution" placeholder="University / College name" value={ed.institution} onChange={(e) => updateEducation(i, { institution: e.target.value })} />
                          <FormInput label="Degree / Field" placeholder="e.g. B.Sc. Computer Science" value={ed.degree} onChange={(e) => updateEducation(i, { degree: e.target.value })} />
                          <div className="grid grid-cols-2 gap-3">
                            <FormInput label="Start Date" placeholder="Sep 2019" value={ed.startDate} onChange={(e) => updateEducation(i, { startDate: e.target.value })} />
                            <FormInput label="End Date" placeholder="Jun 2023" value={ed.endDate} onChange={(e) => updateEducation(i, { endDate: e.target.value })} />
                          </div>
                          <FormTextArea label="Details" placeholder="GPA, honors, relevant coursework..." value={ed.details || ""} onChange={(e) => updateEducation(i, { details: e.target.value })} className="md:col-span-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>
            )}

            {/* PROJECTS */}
            {activeTab === "projects" && (
              <SectionCard
                title="Projects"
                action={
                  <Button onClick={addProject} type="button" className="h-9 px-5 text-[13px]">
                    + Add Project
                  </Button>
                }
              >
                {profile.projects.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed border-neutral-20">
                    <Text variant="body_md" className="text-neutral-60 mb-3">No projects added yet.</Text>
                    <Button onClick={addProject} type="button">Add Your First Project</Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {profile.projects.map((pr, i) => (
                      <div key={i} className="border border-border p-6 relative">
                        <button
                          onClick={() => removeProject(i)}
                          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-neutral-60 hover:text-accent-red transition-colors border border-border hover:border-accent-red"
                          type="button"
                        >
                          ×
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormInput label="Project Name" placeholder="e.g. E-commerce Platform" value={pr.name} onChange={(e) => updateProject(i, { name: e.target.value })} />
                          <FormInput label="Live Link / Repo URL" placeholder="https://github.com/..." value={pr.link || ""} onChange={(e) => updateProject(i, { link: e.target.value })} />
                          <FormTextArea label="Description" placeholder="What does it do? What problem does it solve?" value={pr.description} onChange={(e) => updateProject(i, { description: e.target.value })} className="md:col-span-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>
            )}

            {/* RESUME */}
            {activeTab === "resume" && (
              <>
                <SectionCard title="Upload PDF Resume">
                  <div className="flex flex-col gap-5">
                    {resumeMeta ? (
                      <div className="flex items-center gap-4 p-5 border border-accent-green/30 bg-accent-green/5">
                        <div className="w-10 h-10 bg-accent-green/10 flex items-center justify-center text-[20px]">📄</div>
                        <div className="flex-1 min-w-0">
                          <Text variant="body_md" className="font-semibold text-neutral-100 truncate">{resumeMeta.name}</Text>
                          <Text variant="body_sm" className="text-neutral-60">PDF Resume • Stored locally</Text>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={resumeMeta.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-9 px-4 border border-border text-neutral-60 text-[13px] font-semibold hover:border-primary hover:text-primary transition-colors flex items-center"
                          >
                            Preview
                          </a>
                          <button
                            onClick={onRemoveResume}
                            className="h-9 px-4 border border-accent-red text-accent-red text-[13px] font-semibold hover:bg-accent-red hover:text-white transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-neutral-20 hover:border-primary p-12 text-center cursor-pointer transition-colors group"
                      >
                        <div className="text-4xl mb-3">📎</div>
                        <Text variant="body_lg" className="font-semibold text-neutral-100 mb-1">Click to upload your PDF resume</Text>
                        <Text variant="body_sm" className="text-neutral-60">PDF format • Stored locally in browser</Text>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => onUploadResume(e.target.files?.[0])}
                    />
                  </div>
                </SectionCard>

                <SectionCard title="Generate Resume from Profile">
                  <div className="flex flex-col gap-4">
                    <Text variant="body_md" className="text-neutral-60">
                      Automatically generate a professional resume PDF from your profile data including experience, education, skills, and projects.
                    </Text>
                    <div className="flex gap-3">
                      <Button onClick={printResume} type="button" className="h-[50px] px-8">
                        Generate & Download PDF
                      </Button>
                      <Link href="/resume">
                        <button className="h-[50px] px-6 border border-border text-neutral-60 font-semibold text-[15px] hover:border-primary hover:text-primary transition-colors">
                          Preview Resume
                        </button>
                      </Link>
                    </div>
                    <div className="p-4 bg-neutral-20/30 border border-border">
                      <Text variant="body_sm" className="text-neutral-60">
                        💡 The generated resume uses an ATS-friendly format. Make sure your profile is complete with all sections filled in for the best results.
                      </Text>
                    </div>
                  </div>
                </SectionCard>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
