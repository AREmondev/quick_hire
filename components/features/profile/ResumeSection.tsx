import { Profile } from "@/services/types";
import { Text } from "@/components/ui/Text";
import { useRef } from "react";
import { SectionCardWithFooter } from "./FormComponents";

interface ResumeSectionProps {
  profile: Profile;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export function ResumeSection({
  profile,
  onUpload,
  onRemove,
}: ResumeSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <SectionCardWithFooter title="Upload PDF Resume">
      <div className="flex flex-col gap-5">
        {profile.resume ? (
          <div className="flex items-center gap-4 p-5 border border-accent-green/30 bg-accent-green/5">
            <div className="w-10 h-10 bg-accent-green/10 flex items-center justify-center text-[20px]">
              📄
            </div>
            <div className="flex-1 min-w-0">
              <Text
                variant="body_md"
                className="font-semibold text-neutral-100 truncate"
              >
                {profile.resume.fileName}
              </Text>
              <Text variant="body_sm" className="text-neutral-60">
                PDF Resume • Uploaded at{" "}
                {new Date(profile.resume.uploadedAt).toLocaleDateString()}
              </Text>
            </div>
            <div className="flex gap-2">
              <a
                href={profile.resume.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-4 border border-border text-neutral-60 text-[13px] font-semibold hover:border-primary hover:text-primary transition-colors flex items-center"
              >
                Preview
              </a>
              <button
                onClick={onRemove}
                className="h-9 px-4 border border-accent-red text-accent-red text-[13px] font-semibold hover:bg-accent-red hover:text-white transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 flex flex-col items-center border-dashed border-neutral-20 hover:border-primary p-12 text-center cursor-pointer transition-colors group"
          >
            <div className="text-4xl mb-3">📎</div>
            <Text
              variant="body_lg"
              className="font-semibold text-cneter text-neutral-100 mb-1"
            >
              Click to upload your PDF resume
            </Text>
            <Text variant="body_sm" className="text-neutral-60 text-cneter">
              PDF format • Max 10MB
            </Text>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </SectionCardWithFooter>
  );
}
