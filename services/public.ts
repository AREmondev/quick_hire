import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Category, ExperienceLevel, JobType } from "@/services/types";



export async function getExperienceLevels(): Promise<ExperienceLevel[]> {
  const res = await apiClient.get(API_ENDPOINTS.PUBLIC.EXPERIENCE_LEVELS);
  return res.data.data;
}

export async function getJobTypes(): Promise<JobType[]> {
  const res = await apiClient.get(API_ENDPOINTS.PUBLIC.JOB_TYPES);
  return res.data.data;
}
