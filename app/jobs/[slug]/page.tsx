import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/constants";
import { Text } from "@/components/ui/Text";
import { Badge, OutlineBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ALL_JOBS, categoryColors } from "@/lib/jobs";

function formatSalary(min: number, max: number, currency: string) {
  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}k` : `${n}`;
  return `$${fmt(min)} – $${fmt(max)} / year`;
}

export async function generateStaticParams() {
  return ALL_JOBS.map((j) => ({ slug: j.slug }));
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = ALL_JOBS.find((j) => j.slug === slug);

  if (!job) {
    return (
      <main className="container pt-36 pb-20">
        <Text variant="h2">Job not found</Text>
        <Link href="/jobs">
          <Button className="mt-6">Browse Jobs</Button>
        </Link>
      </main>
    );
  }

  const coreDetails = [
    { label: "Salary", value: formatSalary(job.salary_min, job.salary_max, job.salary_currency) },
    { label: "Job Type", value: job.job_type },
    { label: "Experience", value: job.experience_level },
    { label: "Location", value: job.location },
    { label: "Posted", value: `${job.posted_days_ago} days ago` },
    { label: "Deadline", value: job.deadline },
    { label: "Applicants", value: `${job.applicants} applied` },
  ];

  // Related jobs (same category, exclude current)
  const related = ALL_JOBS.filter((j) => j.id !== job.id && j.category.some((c) => job.category.includes(c))).slice(0, 3);

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
            <span className="text-neutral-100">{job.job_title}</span>
          </div>
        </div>
      </div>

      {/* Company hero banner */}
      <div className="bg-white border-b border-border">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 border border-border bg-light-gray flex items-center justify-center shrink-0 overflow-hidden">
                <Image
                  src={job.company_logo}
                  alt={`${job.company_name} logo`}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <Text variant="h2" className="text-neutral-100">{job.job_title}</Text>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Text className="text-neutral-60 font-semibold" variant="body_md">{job.company_name}</Text>
                  <span className="text-neutral-60">•</span>
                  <Text className="text-neutral-60" variant="body_sm">{job.location}</Text>
                  <span className="text-neutral-60">•</span>
                  <Text className="text-neutral-60" variant="body_sm">Posted {job.posted_days_ago} days ago</Text>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.is_remote && <OutlineBadge label="Remote" color="#26A4FF" />}
                  <OutlineBadge label={job.job_type} color="#56CDAD" />
                  <OutlineBadge label={job.experience_level} color="#FFB836" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Save icon */}
              <button className="w-12 h-12 border border-border bg-white flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-neutral-60">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              {/* Share icon */}
              <button className="w-12 h-12 border border-border bg-white flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-neutral-60">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
              <Link href="apply">
                <Button className="h-12 px-8">Apply Now</Button>
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border">
            <div className="flex flex-col gap-1">
              <Text variant="body_sm" className="text-neutral-60">Salary Range</Text>
              <Text variant="body_md" className="font-semibold text-neutral-100">
                {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
              </Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text variant="body_sm" className="text-neutral-60">Applicants</Text>
              <Text variant="body_md" className="font-semibold text-neutral-100">{job.applicants} people applied</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text variant="body_sm" className="text-neutral-60">Deadline</Text>
              <Text variant="body_md" className="font-semibold text-neutral-100">{job.deadline}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text variant="body_sm" className="text-neutral-60">Categories</Text>
              <div className="flex gap-2 flex-wrap">
                {job.category.map((cat) => (
                  <Badge key={cat} label={cat} color={categoryColors[cat] || "#4640DE"} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: job details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <section className="p-8 bg-white border border-border">
              <Text className="mb-4 text-neutral-100" variant="title_lg">About the Role</Text>
              <Text className="text-neutral-60 leading-7" variant="body_md">{job.description}</Text>
            </section>

            <section className="p-8 bg-white border border-border">
              <Text className="mb-4 text-neutral-100" variant="title_lg">Responsibilities</Text>
              <ul className="flex flex-col gap-3">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#4640DE" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <Text className="text-neutral-60 leading-6" variant="body_md">{item}</Text>
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-8 bg-white border border-border">
              <Text className="mb-4 text-neutral-100" variant="title_lg">Requirements</Text>
              <ul className="flex flex-col gap-3">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-green/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#56CDAD" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <Text className="text-neutral-60 leading-6" variant="body_md">{item}</Text>
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-8 bg-white border border-border">
              <Text className="mb-4 text-neutral-100" variant="title_lg">Benefits & Perks</Text>
              <div className="flex flex-wrap gap-3">
                {job.benefits.map((b) => (
                  <Badge key={b} label={b} color="#4640DE" />
                ))}
              </div>
            </section>

            {/* Related jobs */}
            {related.length > 0 && (
              <section>
                <Text className="mb-4 text-neutral-100" variant="title_lg">Similar Jobs</Text>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map((rj) => (
                    <Link key={rj.id} href={`/jobs/${rj.slug}`} className="group block">
                      <div className="p-5 bg-white border border-border hover:border-primary hover:shadow-sm transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <Image src={rj.company_logo} alt={rj.company_name} width={32} height={32} className="object-contain" />
                          <Text variant="body_sm" className="text-neutral-60 font-semibold">{rj.company_name}</Text>
                        </div>
                        <Text variant="body_md" className="font-semibold text-neutral-100 group-hover:text-primary transition-colors">{rj.job_title}</Text>
                        <Text variant="body_sm" className="text-neutral-60 mt-1">{rj.location}</Text>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {rj.category.slice(0, 2).map((cat) => (
                            <Badge key={cat} label={cat} color={categoryColors[cat] || "#4640DE"} />
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-[98px] flex flex-col gap-5">
              {/* Apply card */}
              <div className="p-6 bg-white border border-border">
                <Text className="mb-4 text-neutral-100" variant="title_lg">Apply for this job</Text>
                <div className="flex flex-col divide-y divide-border">
                  {coreDetails.map((row) => (
                    <div key={row.label} className="py-3 flex items-start justify-between gap-4">
                      <Text className="text-neutral-60 shrink-0" variant="body_sm">{row.label}</Text>
                      <Text className="text-neutral-100 text-right font-medium" variant="body_sm">{row.value}</Text>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <Link href="apply" className="w-full">
                    <Button className="w-full h-[50px]">Apply Now</Button>
                  </Link>
                  <button className="w-full h-[50px] border border-primary text-primary font-semibold text-[15px] hover:bg-primary hover:text-white transition-colors">
                    Save Job
                  </button>
                </div>
              </div>

              {/* Company card */}
              <div className="p-6 bg-white border border-border">
                <Text className="mb-4 text-neutral-100" variant="title_lg">About {job.company_name}</Text>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 border border-border flex items-center justify-center bg-light-gray overflow-hidden">
                    <Image src={job.company_logo} alt={job.company_name} width={32} height={32} className="object-contain" />
                  </div>
                  <div>
                    <Text variant="body_md" className="font-semibold text-neutral-100">{job.company_name}</Text>
                    <Text variant="body_sm" className="text-neutral-60">{job.location}</Text>
                  </div>
                </div>
                <Text variant="body_sm" className="text-neutral-60 leading-6">
                  {job.company_name} is a leading company in its space, known for building world-class products and fostering a culture of innovation.
                </Text>
                <button className="mt-4 w-full h-10 border border-border text-neutral-80 text-[14px] font-semibold hover:border-primary hover:text-primary transition-colors">
                  View Company Profile
                </button>
              </div>

              {/* Share */}
              <div className="p-6 bg-white border border-border">
                <Text className="mb-4 text-neutral-100" variant="title_lg">Share this job</Text>
                <div className="flex gap-3">
                  {["LinkedIn", "Twitter", "Email"].map((platform) => (
                    <button
                      key={platform}
                      className="flex-1 h-9 border border-border text-neutral-60 text-[13px] font-semibold hover:border-primary hover:text-primary transition-colors"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky apply bar */}
      <div className="fixed inset-x-0 bottom-0 lg:hidden bg-white border-t border-border p-4 z-50">
        <div className="container flex gap-3">
          <Link href="apply" className="flex-1">
            <Button className="w-full">Apply Now</Button>
          </Link>
          <button className="h-[50px] px-4 border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
            Save
          </button>
        </div>
      </div>
    </main>
  );
}
