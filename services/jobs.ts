import type { Job, ApiSuccess } from "./types";
import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export type JobsListParams = {
  page?: number;
  pageSize?: number;
  query?: string;
  location?: string;
  type?: string[];
  experience?: string[];
  category?: string[];
  remote?: boolean;
  featured?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  sort?: string;
};

export async function getPublicJobs(params?: JobsListParams) {
  const res = await apiClient.get<
    ApiSuccess<{
      items: Job[];
      page: number;
      pageSize: number;
      total: number;
      pageCount: number;
    }>
  >(API_ENDPOINTS.JOBS.PUBLIC_LIST, {
    params: {
      page: params?.page ?? 1,
      pageSize: params?.pageSize ?? 20,
      ...(params?.query && { query: params.query }),
      ...(params?.location && { location: params.location }),
      ...(params?.type && params.type.length > 0 && { type: params.type }),
      ...(params?.experience &&
        params.experience.length > 0 && { experience: params.experience }),
      ...(params?.category &&
        params.category.length > 0 && { category: params.category }),
      ...(params?.remote && { remote: params.remote }),
      ...(params?.featured && { featured: params.featured }),
      ...(params?.salaryMin && { salaryMin: params.salaryMin }),
      ...(params?.salaryMax && { salaryMax: params.salaryMax }),
      ...(params?.sort && { sort: params.sort }),
    },
  });
  return res.data.data;
}

export async function getPublicJob(slug: string) {
  const res = await apiClient.get<ApiSuccess<Job>>(
    API_ENDPOINTS.JOBS.PUBLIC_DETAIL(slug),
  );
  return res.data.data;
}

export async function getAdminJobs() {
  const res = await apiClient.get<ApiSuccess<Job[]>>(
    API_ENDPOINTS.JOBS.ADMIN_LIST,
  );
  return res.data.data;
}

export async function createJob(payload: Partial<Job>) {
  const res = await apiClient.post<ApiSuccess<Job>>(
    API_ENDPOINTS.JOBS.ADMIN_CREATE,
    payload,
  );
  return res.data.data;
}

export async function updateJob(id: string, payload: Partial<Job>) {
  const res = await apiClient.patch<ApiSuccess<Job>>(
    API_ENDPOINTS.JOBS.ADMIN_DETAIL(id),
    payload,
  );
  return res.data.data;
}

export async function deleteJob(id: string) {
  await apiClient.delete(API_ENDPOINTS.JOBS.ADMIN_DETAIL(id));
}

export async function publishJob(id: string) {
  const res = await apiClient.post<ApiSuccess<Job>>(
    API_ENDPOINTS.JOBS.ADMIN_PUBLISH(id),
    {},
  );
  return res.data.data;
}

export async function unpublishJob(id: string) {
  const res = await apiClient.post<ApiSuccess<Job>>(
    API_ENDPOINTS.JOBS.ADMIN_UNPUBLISH(id),
    {},
  );
  return res.data.data;
}

export async function savedJob(id: string) {
  const res = await apiClient.post<ApiSuccess<Job>>(
    API_ENDPOINTS.JOBS.SAVE(id),
  );
  return res.data.data;
}

export async function unSavedJob(id: string) {
  const res = await apiClient.delete<ApiSuccess<Job>>(
    API_ENDPOINTS.JOBS.SAVE(id),
  );
  return res.data.data;
}
