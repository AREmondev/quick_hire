import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { handleApiError } from "@/lib/utils";
import type {
  Profile,
  GetMyProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UploadResumeResponse,
  DeleteResumeResponse,
} from "./types";

/**
 * Get current authenticated user's profile
 */
export async function getMyProfile(): Promise<Profile> {
  try {
    const res = await apiClient.get<GetMyProfileResponse>(API_ENDPOINTS.PROFILES.ME);
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Update or create the current user's profile
 */
export async function updateMyProfile(
  payload: UpdateProfileRequest,
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
