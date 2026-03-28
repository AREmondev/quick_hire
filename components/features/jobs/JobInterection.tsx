"use client";
import { Button } from "@/components/ui/Button";
import { useSavedJobMutation, useUnSavedJobMutation } from "@/hooks/jobs";
import Link from "next/link";
import React, { useState } from "react";

const JobInterection = ({
  slug,
  id,
  isSaved,
  isApplied,
  applicationId,
}: {
  slug: string;
  id: string;
  isSaved: boolean;
  isApplied?: boolean;
  applicationId?: string;
}) => {
  const [isSavedBookmarks, setIsSavedBookmarks] = useState(isSaved);
  const saveJob = useSavedJobMutation(id);
  const unSaveJob = useUnSavedJobMutation(id);
  const toggleSaved = async () => {
    try {
      if (isSavedBookmarks) {
        await unSaveJob.mutateAsync();
        setIsSavedBookmarks(false);
      } else {
        await saveJob.mutateAsync();
        setIsSavedBookmarks(true);
      }
    } catch (error) {
      console.error("Failed to toggle save status:", error);
    }
  };
  return (
    <div className="flex items-center gap-3 shrink-0">
      <button
        onClick={async () => await toggleSaved()}
        className="w-12 h-12 border border-border bg-white flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-neutral-60"
      >
        {isSavedBookmarks ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#4640DE"
            viewBox="0 0 24 24"
            stroke="none"
          >
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        )}
      </button>
      <button className="w-12 h-12 border border-border bg-white flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-neutral-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </button>
      {isApplied ? (
        <Link href={`/applications/${applicationId}`}>
          <Button className="h-12 px-8 bg-green-500 hover:bg-green-600 border-none">
            View Application
          </Button>
        </Link>
      ) : (
        <Link href={`/jobs/${slug}/apply`}>
          <Button className="h-12 px-8">Apply Now</Button>
        </Link>
      )}
    </div>
  );
};

export default JobInterection;
