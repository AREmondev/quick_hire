import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPublicJobs,
  getPublicJob,
  getAdminJobs,
  type JobsListParams,
  createJob,
  updateJob,
  deleteJob,
  publishJob,
  unpublishJob,
  savedJob,
  unSavedJob,
} from "@/services/jobs";
import { Job } from "@/services/types";

export function usePublicJobsQuery(params?: JobsListParams) {
  return useQuery({
    queryKey: ["jobs", "public", params],
    queryFn: () => getPublicJobs(params),
  });
}

export function usePublicJobQuery(slug: string) {
  return useQuery({
    queryKey: ["jobs", "public", slug],
    queryFn: () => getPublicJob(slug),
    enabled: !!slug,
  });
}

export function useAdminJobsQuery(token?: string | null) {
  return useQuery({
    queryKey: ["jobs", "admin"],
    queryFn: () => getAdminJobs(),
    enabled: !!token,
  });
}

export function useCreateJobMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Job>) => createJob(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs", "admin"] }),
  });
}

export function useUpdateJobMutation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Job>) => updateJob(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs", "admin"] });
      qc.invalidateQueries({ queryKey: ["jobs", id] });
    },
  });
}

export function useDeleteJobMutation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => deleteJob(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs", "admin"] }),
  });
}

export function usePublishJobMutation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => publishJob(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs", "admin"] }),
  });
}

export function useUnpublishJobMutation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => unpublishJob(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs", "admin"] }),
  });
}

export function useSavedJobMutation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => savedJob(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs", "public"] }),
  });
}

export function useUnSavedJobMutation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => unSavedJob(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs", "public"] }),
  });
}
