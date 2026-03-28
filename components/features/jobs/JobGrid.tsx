import { motion } from "framer-motion";
import { Text } from "@/components/ui/Text";
import JobCard from "@/components/features/JobCard";
import { Job } from "@/services/types";

interface JobGridProps {
  jobs: Job[];
  isLoading: boolean;
  isError: boolean;
}

export function JobGrid({ jobs, isLoading, isError }: JobGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[280px] bg-white border border-border animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center bg-white border border-border">
        <Text variant="h2" className="text-neutral-100 mb-2">
          Oops!
        </Text>
        <Text variant="body_lg" className="text-neutral-60">
          Something went wrong while fetching jobs. Please try again.
        </Text>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="py-20 text-center bg-white border border-border">
        <div className="text-5xl mb-4">🔍</div>
        <Text variant="h2" className="text-neutral-100 mb-2">
          No jobs found
        </Text>
        <Text variant="body_lg" className="text-neutral-60">
          Try adjusting your filters to find what you&apos;re looking for.
        </Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {jobs.map((job, idx) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          <JobCard job={job} />
        </motion.div>
      ))}
    </div>
  );
}
