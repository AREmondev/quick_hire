import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { handleApiError } from "@/lib/utils";
import type {
  ProfileInput,
  ExperienceInput,
  EducationInput,
  ProjectInput,
} from "@/lib/validations/profile";
import type {
  Profile,
  GetMyProfileResponse,
  UpdateProfileResponse,
  UploadResumeResponse,
  DeleteResumeResponse,
  Experience,
  Education,
  Project,
} from "./types";

/**
 * Get current authenticated user's profile
 */
export async function getMyProfile(): Promise<Profile> {
  try {
    const res = await apiClient.get<GetMyProfileResponse>(
      API_ENDPOINTS.PROFILES.ME,
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Update general profile info
 */
export async function updateMyProfile(
  payload: Partial<ProfileInput>,
): Promise<Profile> {
  try {
    const res = await apiClient.put<UpdateProfileResponse>(
      API_ENDPOINTS.PROFILES.ME,
      payload,
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Update basic info separately
 */
export async function updateBasicInfo(
  payload: Partial<ProfileInput>,
): Promise<Profile> {
  try {
    const res = await apiClient.put<UpdateProfileResponse>(
      API_ENDPOINTS.PROFILES.BASIC_INFO,
      payload,
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Update summary separately
 */
export async function updateSummary(summary: string): Promise<Profile> {
  try {
    const res = await apiClient.put<UpdateProfileResponse>(
      API_ENDPOINTS.PROFILES.SUMMARY,
      { summary },
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Update skills separately
 */
export async function updateSkills(payload: {
  skills?: string[];
  technicalSkills?: string[];
  tools?: string[];
}): Promise<Profile> {
  try {
    const res = await apiClient.put<UpdateProfileResponse>(
      API_ENDPOINTS.PROFILES.SKILLS,
      payload,
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Add a skill
 */
export async function addSkill(payload: {
  type: "skills" | "technicalSkills" | "tools";
  skill: string;
}): Promise<Profile> {
  try {
    const res = await apiClient.post<UpdateProfileResponse>(
      API_ENDPOINTS.PROFILES.SKILLS,
      payload,
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Remove a skill
 */
export async function removeSkill(
  type: string,
  skill: string,
): Promise<Profile> {
  try {
    const res = await apiClient.delete<UpdateProfileResponse>(
      API_ENDPOINTS.PROFILES.REMOVE_SKILL(type, skill),
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Experience CRUD
 */
export async function addExperience(
  data: ExperienceInput,
): Promise<Experience> {
  try {
    const res = await apiClient.post<{ data: Experience }>(
      API_ENDPOINTS.PROFILES.EXPERIENCES,
      data,
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateExperience(
  id: string,
  data: ExperienceInput,
): Promise<Experience> {
  try {
    const res = await apiClient.put<{ data: Experience }>(
      API_ENDPOINTS.PROFILES.EXPERIENCE_DETAIL(id),
      data,
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteExperience(id: string): Promise<void> {
  try {
    await apiClient.delete(API_ENDPOINTS.PROFILES.EXPERIENCE_DETAIL(id));
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Education CRUD
 */
export async function addEducation(data: EducationInput): Promise<Education> {
  try {
    const res = await apiClient.post<{ data: Education }>(
      API_ENDPOINTS.PROFILES.EDUCATION,
      data,
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateEducation(
  id: string,
  data: EducationInput,
): Promise<Education> {
  try {
    const res = await apiClient.put<{ data: Education }>(
      API_ENDPOINTS.PROFILES.EDUCATION_DETAIL(id),
      data,
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteEducation(id: string): Promise<void> {
  try {
    await apiClient.delete(API_ENDPOINTS.PROFILES.EDUCATION_DETAIL(id));
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Project CRUD
 */
export async function addProject(data: ProjectInput): Promise<Project> {
  try {
    const res = await apiClient.post<{ data: Project }>(
      API_ENDPOINTS.PROFILES.PROJECTS,
      data,
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateProject(
  id: string,
  data: ProjectInput,
): Promise<Project> {
  try {
    const res = await apiClient.put<{ data: Project }>(
      API_ENDPOINTS.PROFILES.PROJECT_DETAIL(id),
      data,
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteProject(id: string): Promise<void> {
  try {
    await apiClient.delete(API_ENDPOINTS.PROFILES.PROJECT_DETAIL(id));
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Delete current user's profile
 */
export async function deleteMyProfile(): Promise<void> {
  try {
    await apiClient.delete(API_ENDPOINTS.PROFILES.ME);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Upload resume file (PDF or Word)
 */
export async function uploadMyResume(file: File): Promise<Profile> {
  try {
    const form = new FormData();
    form.append("file", file);
    const res = await apiClient.post<UploadResumeResponse>(
      API_ENDPOINTS.PROFILES.RESUME,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Remove resume from profile
 */
export async function deleteMyResume(): Promise<Profile> {
  try {
    const res = await apiClient.delete<DeleteResumeResponse>(
      API_ENDPOINTS.PROFILES.RESUME,
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}
