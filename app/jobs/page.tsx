"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { Badge, OutlineBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ALL_JOBS, categoryColors, CATEGORIES } from "@/lib/jobs";

const JOB_TYPES = [
  "Full Time",
  "Part Time",
  "Remote",
  "Contract",
  "Internship",
];
const EXPERIENCE_LEVELS = [
  "Entry Level",
  "Mid Level",
  "Senior",
  "Lead",
  "Director",
];

function formatSalary(min: number, max: number, currency: string) {
  const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(0)}k` : `${n}`);
  return `${fmt(min)}–${fmt(max)} ${currency}`;
}

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "salary" | "applicants">(
    "recent",
  );
  const [page, setPage] = useState(1);
  const PER_PAGE = 9;

  const toggleFilter = (
    arr: string[],
    setArr: (a: string[]) => void,
    val: string,
  ) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = [...ALL_JOBS];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.job_title.toLowerCase().includes(q) ||
          j.company_name.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.category.some((c) => c.toLowerCase().includes(q)),
      );
    }
    if (selectedCategories.length) {
      result = result.filter((j) =>
        j.category.some((c) => selectedCategories.includes(c)),
      );
    }
    if (selectedTypes.length) {
      result = result.filter((j) => selectedTypes.includes(j.job_type));
    }
    if (selectedLevels.length) {
      result = result.filter((j) =>
        selectedLevels.includes(j.experience_level),
      );
    }
    if (remoteOnly) {
      result = result.filter((j) => j.is_remote);
    }
    if (sortBy === "recent")
      result.sort((a, b) => a.posted_days_ago - b.posted_days_ago);
    if (sortBy === "salary") result.sort((a, b) => b.salary_max - a.salary_max);
    if (sortBy === "applicants")
      result.sort((a, b) => b.applicants - a.applicants);
    return result;
  }, [
    search,
    selectedCategories,
    selectedTypes,
    selectedLevels,
    remoteOnly,
    sortBy,
  ]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedLevels([]);
    setRemoteOnly(false);
    setSearch("");
    setPage(1);
  };

  const activeCount =
    selectedCategories.length +
    selectedTypes.length +
    selectedLevels.length +
    (remoteOnly ? 1 : 0);

  return (
    <main className="min-h-screen bg-light-gray pt-[78px]">
      {/* Page header */}
      <div className="bg-white border-b border-border">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
            <div>
              <Text
                variant="h2"
                fontFamily="clash"
                className="text-neutral-100"
              >
                Find Your <span className="text-primary">Dream Job</span>
              </Text>
              <Text variant="body_lg" className="text-neutral-60 mt-2">
                {filtered.length} positions available right now
              </Text>
            </div>
            {/* Search */}
            <div className="flex gap-3 w-full md:max-w-md">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-60"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search jobs, companies..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-12 pl-10 pr-4 border border-border bg-white text-neutral-100 placeholder:text-neutral-60 focus:outline-none focus:border-primary transition-colors text-[15px]"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="h-12 px-4 border border-border bg-white text-neutral-100 focus:outline-none focus:border-primary text-[15px] cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="salary">Highest Salary</option>
                <option value="applicants">Most Applied</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-[280px] shrink-0">
            <div className="bg-white border border-border p-6 sticky top-[98px]">
              <div className="flex items-center justify-between mb-5">
                <Text variant="title_lg" className="text-neutral-100">
                  Filters
                </Text>
                {activeCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-primary text-[14px] font-semibold hover:underline"
                  >
                    Clear all ({activeCount})
                  </button>
                )}
              </div>

              {/* Remote toggle */}
              <div className="flex items-center justify-between py-4 border-t border-border">
                <Text
                  variant="body_md"
                  className="font-semibold text-neutral-100"
                >
                  Remote Only
                </Text>
                <button
                  onClick={() => {
                    setRemoteOnly(!remoteOnly);
                    setPage(1);
                  }}
                  className={`w-11 h-6 rounded-full transition-colors relative ${remoteOnly ? "bg-primary" : "bg-neutral-20"}`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${remoteOnly ? "left-6" : "left-1"}`}
                  />
                </button>
              </div>

              {/* Category filter */}
              <div className="py-4 border-t border-border">
                <Text
                  variant="body_md"
                  className="font-semibold text-neutral-100 mb-3"
                >
                  Category
                </Text>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <label
                      key={cat.name}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.name)}
                        onChange={() =>
                          toggleFilter(
                            selectedCategories,
                            setSelectedCategories,
                            cat.name,
                          )
                        }
                        className="w-4 h-4 accent-primary cursor-pointer"
                      />
                      <span className="flex-1 text-neutral-80 group-hover:text-neutral-100 text-[15px] transition-colors">
                        {cat.name}
                      </span>
                      <span className="text-neutral-60 text-[13px]">
                        {cat.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type filter */}
              <div className="py-4 border-t border-border">
                <Text
                  variant="body_md"
                  className="font-semibold text-neutral-100 mb-3"
                >
                  Job Type
                </Text>
                <div className="flex flex-col gap-2">
                  {JOB_TYPES.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() =>
                          toggleFilter(selectedTypes, setSelectedTypes, type)
                        }
                        className="w-4 h-4 accent-primary cursor-pointer"
                      />
                      <span className="flex-1 text-neutral-80 group-hover:text-neutral-100 text-[15px] transition-colors">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience level filter */}
              <div className="py-4 border-t border-border">
                <Text
                  variant="body_md"
                  className="font-semibold text-neutral-100 mb-3"
                >
                  Experience Level
                </Text>
                <div className="flex flex-col gap-2">
                  {EXPERIENCE_LEVELS.map((lvl) => (
                    <label
                      key={lvl}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLevels.includes(lvl)}
                        onChange={() =>
                          toggleFilter(selectedLevels, setSelectedLevels, lvl)
                        }
                        className="w-4 h-4 accent-primary cursor-pointer"
                      />
                      <span className="flex-1 text-neutral-80 group-hover:text-neutral-100 text-[15px] transition-colors">
                        {lvl}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Job listings */}
          <div className="flex-1">
            {paginated.length === 0 ? (
              <div className="bg-white border border-border p-16 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <Text variant="title_lg" className="text-neutral-100 mb-2">
                  No jobs found
                </Text>
                <Text variant="body_md" className="text-neutral-60">
                  Try adjusting your filters or search query.
                </Text>
                <Button className="mt-6" onClick={clearAll}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginated.map((job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.slug}`}
                      className="group block"
                    >
                      <div className="bg-white border border-border p-6 flex flex-col gap-4 h-full transition-all hover:border-primary hover:shadow-md">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-12 h-12 border border-border flex items-center justify-center bg-light-gray shrink-0 overflow-hidden">
                            <Image
                              src={job.company_logo}
                              alt={job.company_name}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <div className="h-[26px] px-3 border border-primary flex items-center text-primary text-[13px] font-semibold">
                              {job.job_type}
                            </div>
                            {job.is_remote && (
                              <div className="h-[22px] px-2 bg-accent-blue/10 flex items-center text-accent-blue text-[12px] font-semibold">
                                Remote
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Title + company */}
                        <div>
                          <Text
                            variant="body_lg"
                            className="font-semibold text-neutral-100 group-hover:text-primary transition-colors"
                          >
                            {job.job_title}
                          </Text>
                          <div className="flex items-center gap-2 mt-1">
                            <Text variant="body_sm" className="text-neutral-60">
                              {job.company_name}
                            </Text>
                            <div className="w-1 h-1 rounded-full bg-neutral-60" />
                            <Text variant="body_sm" className="text-neutral-60">
                              {job.location}
                            </Text>
                          </div>
                        </div>

                        {/* Description */}
                        <Text
                          variant="body_sm"
                          className="text-neutral-60 line-clamp-3 leading-6 flex-1"
                        >
                          {job.description}
                        </Text>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex flex-wrap gap-1.5">
                            {job.category.slice(0, 2).map((cat) => (
                              <Badge
                                key={cat}
                                label={cat}
                                color={categoryColors[cat] || "#4640DE"}
                              />
                            ))}
                          </div>
                          <Text
                            variant="body_sm"
                            className="text-neutral-60 shrink-0"
                          >
                            {job.posted_days_ago === 0
                              ? "Today"
                              : `${job.posted_days_ago}d ago`}
                          </Text>
                        </div>

                        {/* Salary */}
                        <div className="flex items-center justify-between">
                          <Text
                            variant="body_sm"
                            className="text-neutral-80 font-semibold"
                          >
                            {formatSalary(
                              job.salary_min,
                              job.salary_max,
                              job.salary_currency,
                            )}{" "}
                            / yr
                          </Text>
                          <Text variant="body_sm" className="text-neutral-60">
                            {job.applicants} applicants
                          </Text>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="w-10 h-10 border border-border flex items-center justify-center text-neutral-60 disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
                    >
                      ‹
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`w-10 h-10 border flex items-center justify-center text-[14px] font-semibold transition-colors ${
                            page === p
                              ? "bg-primary text-white border-primary"
                              : "border-border text-neutral-60 hover:border-primary hover:text-primary"
                          }`}
                        >
                          {p}
                        </button>
                      ),
                    )}
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="w-10 h-10 border border-border flex items-center justify-center text-neutral-60 disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
