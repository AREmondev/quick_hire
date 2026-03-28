import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";
import { Job } from "@/services/types";

interface JobContentProps {
  job: Job;
}

export function JobContent({ job }: JobContentProps) {
  return (
    <div className="lg:col-span-2 flex flex-col gap-6">
      <section className="p-8 bg-white border border-border">
        <Text className="mb-4 text-neutral-100" variant="title_lg">
          About the Role
        </Text>
        <Text className="text-neutral-60 leading-7" variant="body_md">
          {job.description}
        </Text>
      </section>

      <section className="p-8 bg-white border border-border">
        <Text className="mb-4 text-neutral-100" variant="title_lg">
          Responsibilities
        </Text>
        <ul className="flex flex-col gap-3">
          {job.responsibilities.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#4640DE"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <Text className="text-neutral-60 leading-6" variant="body_md">
                {item}
              </Text>
            </li>
          ))}
        </ul>
      </section>

      <section className="p-8 bg-white border border-border">
        <Text className="mb-4 text-neutral-100" variant="title_lg">
          Requirements
        </Text>
        <ul className="flex flex-col gap-3">
          {job.requirements.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent-green/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#56CDAD"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <Text className="text-neutral-60 leading-6" variant="body_md">
                {item}
              </Text>
            </li>
          ))}
        </ul>
      </section>

      <section className="p-8 bg-white border border-border">
        <Text className="mb-4 text-neutral-100" variant="title_lg">
          Benefits & Perks
        </Text>
        <div className="flex flex-wrap gap-3">
          {job.benefits.map((b) => (
            <Badge key={b} label={b} color="#4640DE" />
          ))}
        </div>
      </section>
    </div>
  );
}
