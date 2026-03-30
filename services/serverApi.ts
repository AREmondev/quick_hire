import apiClient from "@/lib/axios";
import { Category, Company, Job } from "./types";

const url =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.BACKEND_URL ||
  "http://localhost:4000";

/**
 * Helper for server-side fetches with timeout, retries, and error handling
 */
async function fetchWithTimeout(
  resource: string,
  options: RequestInit & { timeout?: number; retries?: number } = {},
) {
  const { timeout = 5000, retries = 2 } = options;

  let lastError: any;

  for (let i = 0; i <= retries; i++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      if (i > 0) console.log(`[API] Retry ${i}/${retries}: ${resource}`);
      else console.log(`[API] Fetching: ${resource}`);

      const response = await fetch(resource, {
        ...options,
        signal: controller.signal,
        next: { revalidate: 60 },
      });

      clearTimeout(id);
      return response;
    } catch (error: any) {
      clearTimeout(id);
      lastError = error;

      if (error.name === "AbortError") {
        console.warn(
          `[API Timeout] ${resource} exceeded ${timeout}ms (Attempt ${i + 1}/${retries + 1})`,
        );
      } else {
        console.error(
          `[API Connection Error] ${resource}: ${error.message} (Attempt ${i + 1}/${retries + 1})`,
        );
      }

      // If it's the last retry, don't wait, just throw
      if (i < retries) {
        // Exponential backoff: wait 500ms, then 1000ms...
        await new Promise((resolve) =>
          setTimeout(resolve, 500 * Math.pow(2, i)),
        );
      }
    }
  }

  throw (
    lastError ||
    new Error(`Failed to fetch ${resource} after ${retries} retries`)
  );
}

export async function getCompanies(): Promise<Company[]> {
  try {
    const res = await fetchWithTimeout(`${url}/api/v1/admin/companies`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const body: { success: true; data: Company[] } = await res.json();
    return body.data || [];
  } catch (error) {
    console.error("[API Error] getCompanies:", error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetchWithTimeout(`${url}/api/v1/admin/categories`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const body: { success: true; data: Category[] } = await res.json();
    return body.data || [];
  } catch (error) {
    console.error("[API Error] getCategories:", error);
    return [];
  }
}

export async function getJobs({
  featured = true,
}: {
  featured?: boolean;
} = {}): Promise<{
  items: Job[];
}> {
  try {
    const res = await fetchWithTimeout(
      `${url}/api/v1/jobs?featured=${featured}`,
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const body: { success: true; data: { items: Job[] } } = await res.json();
    return body.data || { items: [] };
  } catch (error) {
    console.error("[API Error] getJobs:", error);
    return { items: [] };
  }
}

