import Link from "next/link";
import { Text } from "@/components/ui/Text";

interface ProfileHeaderProps {
  completeness: number;
}

export function ProfileHeader({ completeness }: ProfileHeaderProps) {
  return (
    <div className="bg-white border-b border-border">
      <div className="container py-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <Text
              variant="h2"
              fontFamily="clash"
              className="text-neutral-100"
            >
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
          </div>
        </div>

        {/* Completeness bar */}
        <div className="mt-6 flex items-center gap-4">
          <Text variant="body_sm" className="text-neutral-60 shrink-0">
            Profile {completeness}% complete
          </Text>
          <div className="flex-1 h-2 bg-neutral-20 rounded-full overflow-hidden max-w-xs">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${completeness}%`,
                backgroundColor:
                  completeness >= 80
                    ? "#56CDAD"
                    : completeness >= 50
                    ? "#FFB836"
                    : "#4640DE",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
