import type { AuthUser } from "./types";
import apiClient, { publicApiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "./endpoints";
import { handleApiError } from "@/lib/utils";

export async function login(
  email: string,
  password: string,
): Promise<AuthUser> {
  try {
    const res = await publicApiClient.post<{ success: true; data: AuthUser }>(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password },
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function register(
  email: string,
  password: string,
  name: string,
  role: "candidate" | "employer" | "admin" = "employer",
  companyId?: string,
): Promise<AuthUser> {
  try {
    const res = await publicApiClient.post<{ success: true; data: AuthUser }>(
      API_ENDPOINTS.AUTH.REGISTER,
      { email, password, name, role, companyId },
    );
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function refreshTokens(refreshToken: string) {
  try {
    const res = await publicApiClient.post<{
      success: true;
      data: {
        accessToken: string;
        refreshToken?: string;
      };
    }>(API_ENDPOINTS.AUTH.REFRESH_TOKENS, {
      refreshToken: refreshToken,
    });
    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function logout() {
  try {
    const res = await apiClient.post<{ success: true }>(
      API_ENDPOINTS.AUTH.LOGOUT,
    );
    return res.data.success;
  } catch (error) {
    return handleApiError(error);
  }
}
