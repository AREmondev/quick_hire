import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/serverApi";
import { getExperienceLevels, getJobTypes } from "@/services/public";
import { BsX } from "react-icons/bs";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resources",
];

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

interface JobFiltersProps {
  showMobile?: boolean;
  onCloseMobile?: () => void;
  search: string;
  setSearch: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (v: string[]) => void;
  selectedTypes: string[];
  setSelectedTypes: (v: string[]) => void;
  selectedLevels: string[];
  setSelectedLevels: (v: string[]) => void;
  remoteOnly: boolean;
  setRemoteOnly: (v: boolean) => void;
  featured: boolean;
  setFeatured: (v: boolean) => void;
  salaryRange: [number, number];
  setSalaryRange: (v: [number, number]) => void;
  clearAll: () => void;
  setPage: (v: number) => void;
}

export function JobFilters({
  showMobile,
  onCloseMobile,
  search,
  setSearch,
  location,
  setLocation,
  selectedCategories,
  setSelectedCategories,
  selectedTypes,
  setSelectedTypes,
  selectedLevels,
  setSelectedLevels,
  remoteOnly,
  setRemoteOnly,
  featured,
  setFeatured,
  salaryRange,
  setSalaryRange,
  clearAll,
  setPage,
}: JobFiltersProps) {
  const toggleFilter = (
    arr: string[],
    setArr: (a: string[]) => void,
    val: string,
  ) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
    setPage(1);
  };

  const [ctg, setCtg] = useState<{ id: string; name: string }[]>([]);
  const [jobTypes, setJobTypes] = useState<{ id: string; name: string }[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<
    { id: string; name: string }[]
  >([]);

  const fetchCtg = async () => {
    const categories = await getCategories();
    setCtg(categories.map((v) => ({ id: v.id, name: v.name })));
  };

  const fetchJobTypes = async () => {
    const jobTypes = await getJobTypes();
    setJobTypes(jobTypes.map((v) => ({ id: v._id, name: v.name })));
  };

  const fetchExperienceLevels = async () => {
    const experienceLevels = await getExperienceLevels();
    console.log("experienceLevels", experienceLevels);
    setExperienceLevels(
      experienceLevels.map((v) => ({ id: v._id, name: v.name })),
    );
  };

  useEffect(() => {
    fetchCtg();
    fetchJobTypes();
    fetchExperienceLevels();
  }, []);

  // console.log(ctg);
  // console.log(jobTypes);
  // console.log(experienceLevels);

  return (
    <>
      {/* Mobile Overlay */}
      {showMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Filters Container */}
      <aside
        className={cn(
          "w-full lg:w-[300px] shrink-0",
          // Mobile styles
          "fixed inset-y-0 left-0 bg-white z-[70] p-6 overflow-y-auto transition-transform duration-300 lg:static lg:p-0 lg:bg-transparent lg:z-auto lg:translate-x-0",
          showMobile ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Text variant="title_lg" className="font-bold text-neutral-100">
              Filters
            </Text>
            <div className="flex items-center gap-4">
              <button
                onClick={clearAll}
                className="text-[13px] text-primary font-semibold hover:underline"
              >
                Clear All
              </button>
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-2 hover:bg-neutral-20 transition-colors"
              >
                <BsX size={24} />
              </button>
            </div>
          </div>

          {/* Search & Location */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-neutral-80 uppercase tracking-wider">
                Search Job
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Job title or keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-11 border border-border bg-white px-4 pr-10 text-[14px] focus:outline-none focus:border-primary transition-colors"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-40">
                  <svg
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
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-neutral-80 uppercase tracking-wider">
                Location
              </label>
              <input
                type="text"
                placeholder="City, Country..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 border border-border bg-white px-4 text-[14px] focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <Text variant="body_md" className="font-bold text-neutral-100">
              Categories
            </Text>
            <div className="flex flex-col gap-2.5">
              {ctg.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() =>
                      toggleFilter(
                        selectedCategories,
                        setSelectedCategories,
                        cat.id,
                      )
                    }
                    className="w-5 h-5 border-2 border-border rounded-none checked:bg-primary checked:border-primary cursor-pointer accent-primary"
                  />
                  <span
                    className={`text-[14px] transition-colors ${
                      selectedCategories.includes(cat.id)
                        ? "text-neutral-100 font-medium"
                        : "text-neutral-60 group-hover:text-neutral-100"
                    }`}
                  >
                    {cat.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div className="flex flex-col gap-3">
            <Text variant="body_md" className="font-bold text-neutral-100">
              Job Type
            </Text>
            <div className="flex flex-col gap-2.5">
              {jobTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type.id)}
                    onChange={() =>
                      toggleFilter(selectedTypes, setSelectedTypes, type.id)
                    }
                    className="w-5 h-5 border-2 border-border rounded-none checked:bg-primary checked:border-primary cursor-pointer accent-primary"
                  />
                  <span
                    className={`text-[14px] transition-colors ${
                      selectedTypes.includes(type.id)
                        ? "text-neutral-100 font-medium"
                        : "text-neutral-60 group-hover:text-neutral-100"
                    }`}
                  >
                    {type.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="flex flex-col gap-3">
            <Text variant="body_md" className="font-bold text-neutral-100">
              Experience Level
            </Text>
            <div className="flex flex-col gap-2.5">
              {experienceLevels.map((level) => (
                <label
                  key={level.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(level.id)}
                    onChange={() =>
                      toggleFilter(selectedLevels, setSelectedLevels, level.id)
                    }
                    className="w-5 h-5 border-2 border-border rounded-none checked:bg-primary checked:border-primary cursor-pointer accent-primary"
                  />
                  <span
                    className={`text-[14px] transition-colors ${
                      selectedLevels.includes(level.id)
                        ? "text-neutral-100 font-medium"
                        : "text-neutral-60 group-hover:text-neutral-100"
                    }`}
                  >
                    {level.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div className="flex flex-col gap-5">
            <Text variant="body_md" className="font-bold text-neutral-100">
              Salary Range
            </Text>
            <div className="px-2">
              <Slider
                range
                min={0}
                max={200000}
                step={5000}
                value={salaryRange}
                onChange={(v) => {
                  setSalaryRange(v as [number, number]);
                  setPage(1);
                }}
                trackStyle={[{ backgroundColor: "#4640DE", height: 6 }]}
                handleStyle={[
                  {
                    borderColor: "#4640DE",
                    height: 20,
                    width: 20,
                    marginTop: -7,
                    backgroundColor: "#fff",
                    opacity: 1,
                    boxShadow: "none",
                  },
                  {
                    borderColor: "#4640DE",
                    height: 20,
                    width: 20,
                    marginTop: -7,
                    backgroundColor: "#fff",
                    opacity: 1,
                    boxShadow: "none",
                  },
                ]}
                railStyle={{ backgroundColor: "#E9EBF0", height: 6 }}
              />
            </div>
            <div className="flex items-center justify-between text-[14px] text-neutral-100 font-medium">
              <span>${salaryRange[0].toLocaleString()}</span>
              <span>${salaryRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Other Filters */}
          <div className="flex flex-col gap-3">
            <Text variant="body_md" className="font-bold text-neutral-100">
              Other
            </Text>
            <div className="flex flex-col gap-2.5">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={() => {
                    setRemoteOnly(!remoteOnly);
                    setPage(1);
                  }}
                  className="w-5 h-5 border-2 border-border rounded-none checked:bg-primary checked:border-primary cursor-pointer accent-primary"
                />
                <span className="text-[14px] text-neutral-60 group-hover:text-neutral-100">
                  Remote Only
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={() => {
                    setFeatured(!featured);
                    setPage(1);
                  }}
                  className="w-5 h-5 border-2 border-border rounded-none checked:bg-primary checked:border-primary cursor-pointer accent-primary"
                />
                <span className="text-[14px] text-neutral-60 group-hover:text-neutral-100">
                  Featured Only
                </span>
              </label>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
