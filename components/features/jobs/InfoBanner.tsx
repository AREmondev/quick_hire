import { Text } from "@/components/ui/Text";

export function InfoBanner() {
  return (
    <div className="flex gap-3 p-4 bg-primary/5 border border-primary/20 mb-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#4640DE"
        className="shrink-0 mt-0.5"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <Text variant="body_sm" className="text-neutral-80">
        After selecting your resume source, you&apos;ll complete a short
        assessment to verify your skills before your application is submitted.
      </Text>
    </div>
  );
}
