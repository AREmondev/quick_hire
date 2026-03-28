"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Text, textVariants } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

const LOCATIONS = [
  "Florence, Italy",
  "Rome, Italy",
  "Milan, Italy",
  "Venice, Italy",
  "Naples, Italy",
  "Paris, France",
  "Berlin, Germany",
  "London, UK",
  "New York, USA",
  "Tokyo, Japan",
  "Rajshahi, Bangladesh",
  "Dhaka, Bangladesh",
];

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="11.7666"
      cy="11.7664"
      r="8.98856"
      stroke="#25324B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.0183 18.4849L21.5423 21.9997"
      stroke="#25324B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5 10.5005C14.5 9.11924 13.3808 8 12.0005 8C10.6192 8 9.5 9.11924 9.5 10.5005C9.5 11.8808 10.6192 13 12.0005 13C13.3808 13 14.5 11.8808 14.5 10.5005Z"
      stroke="#25324B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9995 21C10.801 21 4.5 15.8984 4.5 10.5633C4.5 6.38664 7.8571 3 11.9995 3C16.1419 3 19.5 6.38664 19.5 10.5633C19.5 15.8984 13.198 21 11.9995 21Z"
      stroke="#25324B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={cn("transition-transform duration-200", open && "rotate-180")}
  >
    <path
      d="M12.6666 5.6665L7.99992 10.3332L3.33325 5.6665"
      stroke="#7C8493"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function JobSearchBar() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredLocations = useMemo(
    () =>
      LOCATIONS.filter((loc) =>
        loc.toLowerCase().includes(location.toLowerCase()),
      ),
    [location],
  );

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (title) params.set("query", title);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  }, [router, title, location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-4 z-[100]">
      <div className="flex flex-col md:flex-row items-center p-2 md:p-4 bg-white max-w-[857px] shadow-sm">
        {/* Job title */}
        <div className="flex items-center flex-1 gap-4 px-4 h-[57px] w-full border-b md:border-b-0 md:border-r border-border">
          <span className="shrink-0">
            <SearchIcon />
          </span>
          <input
            placeholder="Job title or keyword"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className={cn(
              textVariants({
                variant: "body_sm",
              }),
              "outline-none focus:outline-none focus-visible:outline-none! focus:border-transparent flex-auto h-full flex items-center bg-transparent",
            )}
          />
        </div>

        {/* Location - Searchable Select */}
        <div
          ref={dropdownRef}
          className="flex items-center flex-1 gap-4 px-4 h-[57px] w-full relative"
        >
          <span className="shrink-0">
            <LocationIcon />
          </span>

          <div className="flex h-full w-full items-center relative">
            <input
              placeholder="City, Country"
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className={cn(
                textVariants({
                  variant: "body_sm",
                }),
                "outline-none focus-visible:outline-none! h-full flex-auto bg-transparent",
              )}
            />
            <span className="cursor-pointer p-1" onClick={() => setOpen(!open)}>
              <ChevronIcon open={open} />
            </span>

            {/* Dropdown */}
            {open && filteredLocations.length > 0 && (
              <div className="absolute top-full left-[-40px] md:left-0 mt-2 w-[calc(100%+40px)] md:w-full bg-white border border-border rounded-md shadow-lg z-[110] max-h-[250px] overflow-y-auto">
                {filteredLocations.map((loc) => (
                  <div
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setOpen(false);
                    }}
                    className="px-4 py-3 cursor-pointer hover:bg-light-gray transition-colors text-[14px] text-neutral-80"
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search button */}
        <Button
          onClick={handleSearch}
          className="h-[57px] px-8 w-full md:w-auto mt-2 md:mt-0"
        >
          Search my job
        </Button>
      </div>
      <Text variant="body_sm" className="text-black hidden md:block">
        Popular :{" "}
        <span className="font-medium">
          UI Designer, UX Researcher, Android, Admin
        </span>
      </Text>
    </div>
  );
}
