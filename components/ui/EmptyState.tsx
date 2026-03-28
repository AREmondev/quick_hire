"use client";

import { Button } from "./Button";
import { Text } from "./Text";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onClearFilters?: () => void;
}

export function EmptyState({
  title = "No jobs found",
  description = "Try adjusting your filters to find what you're looking for.",
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="text-center bg-white border border-border p-12">
      <div className="mb-4 text-5xl">😕</div>
      <Text variant="title_lg" className="text-neutral-100 mb-2">
        {title}
      </Text>
      <Text variant="body_md" className="text-neutral-60 mb-6">
        {description}
      </Text>
      {onClearFilters && (
        <Button onClick={onClearFilters}>Clear Filters</Button>
      )}
    </div>
  );
}