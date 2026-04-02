import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyProfile,
  updateMyProfile,
  updateBasicInfo,
  updateSummary,
  updateSkills,
  addSkill,
  removeSkill,
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation,
  addProject,
  updateProject,
  deleteProject,
  uploadMyResume,
  deleteMyResume,
  deleteMyProfile,
} from "@/services/profile";
import type {
  ProfileInput,
  ExperienceInput,
  EducationInput,
  ProjectInput,
} from "@/lib/validations/profile";

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
 * Hook to update the entire profile or general parts
 */
export function useUpdateProfileMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<ProfileInput>) => updateMyProfile(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}

/**
 * Hook to update basic info separately
 */
export function useUpdateBasicInfoMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<ProfileInput>) => updateBasicInfo(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}

/**
 * Hook to update summary separately
 */
export function useUpdateSummaryMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (summary: string) => updateSummary(summary),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}

/**
 * Hook to update skills separately
 */
export function useUpdateSkillsMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      skills?: string[];
      technicalSkills?: string[];
      tools?: string[];
    }) => updateSkills(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}

/**
 * Hook to add a skill
 */
export function useAddSkillMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { type: "skills" | "technicalSkills" | "tools"; skill: string }) => 
      addSkill(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}

/**
 * Hook to remove a skill
 */
export function useRemoveSkillMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ type, skill }: { type: string; skill: string }) =>
      removeSkill(type, skill),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}

/**
 * Experiences Mutations
 */
export function useAddExperienceMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ExperienceInput) => addExperience(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}

export function useUpdateExperienceMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ExperienceInput }) =>
      updateExperience(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}

export function useDeleteExperienceMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteExperience(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}

/**
 * Education Mutations
 */
export function useAddEducationMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: EducationInput) => addEducation(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}

export function useUpdateEducationMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EducationInput }) =>
      updateEducation(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}

export function useDeleteEducationMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEducation(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}

/**
 * Projects Mutations
 */
export function useAddProjectMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ProjectInput) => addProject(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}

export function useUpdateProjectMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProjectInput }) =>
      updateProject(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}

export function useDeleteProjectMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}

/**
 * Resume Mutations
 */
export function useUploadResumeMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadMyResume(file),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}

export function useDeleteResumeMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteMyResume,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}

/**
 * Hook to delete current user's profile
 */
export function useDeleteProfileMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteMyProfile,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile", "me"] }),
  });
}
