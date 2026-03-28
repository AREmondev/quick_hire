import type { Application, PaginatedResponse, ApiSuccess } from "./types";
import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export async function getCandidateApplications(
  page: number = 1,
  pageSize: number = 20,
): Promise<PaginatedResponse<Application>> {
  const res = await apiClient.get<ApiSuccess<PaginatedResponse<Application>>>(
    API_ENDPOINTS.APPLICATIONS.LIST,
    {
      params: { page, pageSize },
    },
  );
  return res.data.data;
}

export async function getCandidateApplication(
  id: string,
): Promise<Application> {
  const res = await apiClient.get<ApiSuccess<Application>>(
    API_ENDPOINTS.APPLICATIONS.DETAIL(id),
  );
  return res.data.data;
}

export async function submitCandidateApplication(
  id: string,
  payload: { answers: { question_id: string; answer: string }[] },
): Promise<Application> {
  const res = await apiClient.post<ApiSuccess<Application>>(
    API_ENDPOINTS.APPLICATIONS.ANSWER(id),
    payload,
  );
  return res.data.data;
}

export async function submitApplication(id: string): Promise<Application> {
  const res = await apiClient.post<ApiSuccess<Application>>(
    API_ENDPOINTS.APPLICATIONS.SUBMIT(id),
    {},
  );
  return res.data.data;
}

export async function createApplicationForJob(
  jobId: string,
  payload: { resumeSource: "profile" | "pdf"; resumeId?: string | null },
): Promise<Application> {
  const res = await apiClient.post<ApiSuccess<Application>>(
    API_ENDPOINTS.JOBS.APPLY(jobId),
    payload,
  );
  return res.data.data;
}
