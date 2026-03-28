import { Button } from "@/components/ui/Button";

interface JobPaginationProps {
  page: number;
  pageCount: number;
  setPage: (p: number) => void;
}

export function JobPagination({
  page,
  pageCount,
  setPage,
}: JobPaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <Button
        variant="white"
        className="h-10 px-4 border border-border text-neutral-60 hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <div className="flex items-center gap-1">
        {[...Array(pageCount)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-10 h-10 flex items-center justify-center text-[14px] font-semibold transition-colors ${
              page === i + 1
                ? "bg-primary text-white"
                : "text-neutral-60 hover:bg-light-gray"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <Button
        variant="white"
        className="h-10 px-4 border border-border text-neutral-60 hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPage(page + 1)}
        disabled={page === pageCount}
      >
        Next
      </Button>
    </div>
  );
}
