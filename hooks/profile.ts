import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
  uploadMyResume,
  deleteMyResume,
} from "@/services/profile";
import type { UpdateProfileRequest } from "@/services/types";

/**
 * Hook to fetch the current authenticated user's profile
 */
export function useMyProfileQuery() {
  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: getMyProfile,
  });
}

/**
 * Hook to update or create the current user's profile
 */
export function useUpdateProfileMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfileRequest) => updateMyProfile(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}

/**
 * Hook to delete current user's profile
 */
export function useDeleteProfileMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteMyProfile,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}

/**
 * Hook to upload a resume file
 */
export function useUploadResumeMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadMyResume(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}

/**
 * Hook to remove resume from profile
 */
export function useDeleteResumeMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteMyResume,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}
