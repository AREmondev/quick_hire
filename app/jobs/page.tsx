"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { usePublicJobsQuery } from "@/hooks/jobs";
import { useDebounce } from "@/hooks/useDebounce";
import { JobFilters } from "@/components/features/jobs/JobFilters";
import { JobGrid } from "@/components/features/jobs/JobGrid";
import { JobPagination } from "@/components/features/jobs/JobPagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Category, ExperienceLevel, JobType } from "@/services/types";
import Loading from "@/components/ui/Loading";
import { BsFilter } from "react-icons/bs";

const SORT_OPTIONS = [
  { label: "Newest", value: "postedAt:desc" },
  { label: "Oldest", value: "postedAt:asc" },
  { label: "Salary (High to Low)", value: "salaryMax:desc" },
  { label: "Salary (Low to High)", value: "salaryMin:asc" },
];

function JobsPageContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("query") || "";
  const initialLocation = searchParams.get("location") || "";

  const [search, setSearch] = useState(initialSearch);
  const [query, setQuery] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 200000]);
  const [sortBy, setSortBy] = useState<string | undefined>("postedAt:desc");
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setQuery(debouncedSearch);
    setPage(1);
  }, [debouncedSearch]);

  // Update initial state when URL params change
  useEffect(() => {
    const q = searchParams.get("query") || "";
    const l = searchParams.get("location") || "";
    if (q !== query) {
      setSearch(q);
      setQuery(q);
    }
    if (l !== location) {
      setLocation(l);
    }
  }, [searchParams]);

  const { data, isLoading, isError } = usePublicJobsQuery({
    page,
    pageSize: 9,
    query,
    location,
    type: selectedTypes,
    experience: selectedLevels,
    category: selectedCategories,
    remote: remoteOnly,
    featured,
    salaryMin: salaryRange[0],
    salaryMax: salaryRange[1],
    sort: sortBy,
  });

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedLevels([]);
    setRemoteOnly(false);
    setFeatured(false);
    setSearch("");
    setQuery("");
    setLocation("");
    setSalaryRange([0, 200000]);
    setSortBy("postedAt:desc");
    setPage(1);
  };
  console.log("isLoading", isLoading);
  if (isLoading) {
    return (
      <main className="min-h-screen bg-light-gray pt-[78px]">
        <Loading variant="section" text="Searching for jobs..." />
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-light-gray pt-[78px] pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-border">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Text
                variant="h2"
                fontFamily="clash"
                className="text-neutral-100"
              >
                Find your <span className="text-primary">dream job</span>
              </Text>
              <Text variant="body_lg" className="text-neutral-60 mt-2 max-w-xl">
                Browse through thousands of job opportunities from top companies
                and startups around the world.
              </Text>
            </div>
            <div className="flex flex-col gap-2 min-w-[200px]">
              <label className="text-[12px] font-bold text-neutral-80 uppercase tracking-wider">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="h-11 border border-border bg-white px-4 text-[14px] focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            variant="white"
            onClick={() => setShowMobileFilters(true)}
            className="w-full flex items-center justify-center gap-2 border border-border"
          >
            <BsFilter size={20} />
            Filters
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <JobFilters
            showMobile={showMobileFilters}
            onCloseMobile={() => setShowMobileFilters(false)}
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedLevels={selectedLevels}
            setSelectedLevels={setSelectedLevels}
            remoteOnly={remoteOnly}
            setRemoteOnly={setRemoteOnly}
            featured={featured}
            setFeatured={setFeatured}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
            clearAll={clearAll}
            setPage={setPage}
          />

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Text variant="title_lg" className="text-neutral-100">
                  All Jobs
                </Text>
                <span className="px-2 py-0.5 bg-neutral-20 text-neutral-60 text-[12px] font-bold">
                  {data?.total || 0}
                </span>
              </div>
              <Text variant="body_sm" className="text-neutral-60">
                Showing {data?.items.length || 0} of {data?.total || 0} results
              </Text>
            </div>

            {data?.items && data.items.length > 0 ? (
              <JobGrid
                jobs={data?.items || []}
                isLoading={isLoading}
                isError={isError}
              />
            ) : (
              <EmptyState onClearFilters={clearAll} />
            )}

            <JobPagination
              page={page}
              pageCount={data?.pageCount || 0}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={<Loading variant="full" text="Initializing jobs portal..." />}
    >
      <JobsPageContent />
    </Suspense>
  );
}
