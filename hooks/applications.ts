import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   getCandidateApplications,
//   getCandidateApplication,
//   submitCandidateApplication,
//   createApplicationForJob,
// } from "@/lib/services/PublicApplications";
import {
  createApplicationForJob,
  getCandidateApplication,
  getCandidateApplications,
  submitApplication,
} from "@/services/applications";

export function useCandidateApplicationsQuery(
  token?: string | null,
  page: number = 1,
  pageSize: number = 20,
) {
  return useQuery({
    queryKey: ["applications", "candidate", page, pageSize],
    queryFn: () => getCandidateApplications(page, pageSize),
    enabled: !!token,
  });
}

export function useCandidateApplicationQuery(
  id: string,
  token?: string | null,
) {
  return useQuery({
    queryKey: ["applications", "candidate", id],
    queryFn: () => getCandidateApplication(id),
    enabled: !!token && !!id,
  });
}

export function useSubmitApplicationMutation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => submitApplication(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["applications", "candidate"] });
      qc.invalidateQueries({ queryKey: ["applications", "candidate", id] });
    },
  });
}

export function useCreateApplicationMutation(jobId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      resumeSource: "profile" | "pdf";
      resumeId?: string | null;
    }) => createApplicationForJob(jobId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["applications", "candidate"] });
    },
  });
}
