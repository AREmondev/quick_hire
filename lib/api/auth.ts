import type { AuthUser } from "./types";
import apiClient, { publicApiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "./endpoints";

export async function login(
  email: string,
  password: string,
): Promise<AuthUser> {
  console.log("email", email);
  console.log("password", password);
  try {
    const res = await publicApiClient.post<{ success: true; data: AuthUser }>(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password },
    );
    console.log("res", res);
    return res.data.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function register(
  email: string,
  password: string,
  name: string,
  role: "candidate" | "employer" | "admin" = "employer",
  companyId?: string,
): Promise<AuthUser> {
  const res = await publicApiClient.post<{ success: true; data: AuthUser }>(
    API_ENDPOINTS.AUTH.REGISTER,
    { email, password, name, role, companyId },
  );
  return res.data.data;
}

export async function refreshTokens(refreshToken: string) {
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
}

export async function logout() {
  const res = await apiClient.post<{ success: true }>(
    API_ENDPOINTS.AUTH.LOGOUT,
  );
  return res.data.success;
}
