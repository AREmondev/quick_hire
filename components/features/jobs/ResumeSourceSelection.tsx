import Link from "next/link";
import { Text } from "@/components/ui/Text";

interface ResumeSourceSelectionProps {
  source: "profile" | "pdf";
  setSource: (source: "profile" | "pdf") => void;
  hasPdf: boolean;
}

export function ResumeSourceSelection({
  source,
  setSource,
  hasPdf,
}: ResumeSourceSelectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4 mb-8">
      {/* Profile option */}
      <button
        onClick={() => setSource("profile")}
        className={`p-6 border-2 bg-white text-left transition-all group ${
          source === "profile"
            ? "border-primary"
            : "border-border hover:border-neutral-60/50"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 flex items-center justify-center shrink-0 ${
              source === "profile" ? "bg-primary/10" : "bg-light-gray"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke={source === "profile" ? "#4640DE" : "#7C8493"}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <Text variant="body_lg" className="font-semibold text-neutral-100">
                Use Profile Data
              </Text>
              {source === "profile" && (
                <span className="px-2 py-0.5 bg-primary text-white text-[12px] font-bold">
                  Selected
                </span>
              )}
            </div>
            <Text variant="body_md" className="text-neutral-60">
              Automatically generate an ATS-friendly resume from your saved
              profile information including skills, experience, and education.
            </Text>
          </div>
        </div>
      </button>

      {/* PDF option */}
      <button
        onClick={() => hasPdf && setSource("pdf")}
        disabled={!hasPdf}
        className={`p-6 border-2 bg-white text-left transition-all ${
          !hasPdf
            ? "opacity-50 cursor-not-allowed border-border"
            : source === "pdf"
              ? "border-primary"
              : "border-border hover:border-neutral-60/50 cursor-pointer"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 flex items-center justify-center shrink-0 ${
              source === "pdf" ? "bg-primary/10" : "bg-light-gray"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke={source === "pdf" ? "#4640DE" : "#7C8493"}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <Text variant="body_lg" className="font-semibold text-neutral-100">
                Use Uploaded PDF
              </Text>
              {source === "pdf" && (
                <span className="px-2 py-0.5 bg-primary text-white text-[12px] font-bold">
                  Selected
                </span>
              )}
              {!hasPdf && (
                <span className="px-2 py-0.5 bg-neutral-20 text-neutral-60 text-[12px] font-semibold">
                  No file found
                </span>
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
  );
}
