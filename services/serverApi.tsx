import apiClient from "@/lib/axios";
import { Category, Company, Job } from "./types";
const url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
export async function getCompanies(): Promise<Company[]> {
  // /api/1v / admin / companies;
  try {
    const res = await fetch(`${url}/api/v1/admin/companies`);
    const body: { success: true; data: Company[] } = await res.json();
    console.log(body);
    return body.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${url}/api/v1/admin/categories`);
    const body: { success: true; data: Category[] } = await res.json();
    return body.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getJobs({
  featured = true,
}: {
  featured?: boolean;
}): Promise<{
  items: Job[];
}> {
  try {
    const res = await fetch(`${url}/api/v1/jobs?featured=${featured}`);
    const body: { success: true; data: { items: Job[] } } = await res.json();
    return body.data;
  } catch (error) {
    console.log(error);
    return { items: [] };
  }
}

export async function getJobDetails({ slug }: { slug: string }): Promise<Job> {
  try {
    const res = await apiClient.get(`${url}/api/v1/jobs/${slug}`);
    console.log(res.data);
    const body: { success: true; data: Job } = res.data;

    return body.data;
  } catch (error) {
    console.log(error);
    return {} as Job;
  }
}
