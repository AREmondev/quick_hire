import { getServerSession } from "next-auth/next";
import { authConfig } from "@/lib/auth/options";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.BACKEND_URL ||
  "http://localhost:4000";

/**
 * Enhanced fetch with timeout and retries for server-side stability
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit & { timeout?: number; retries?: number } = {},
) {
  const { timeout = 8000, retries = 2, ...fetchOptions } = options;
  let lastError: any;

  for (let i = 0; i <= retries; i++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      if (i > 0) console.log(`[ServerFetch] Retry ${i}/${retries}: ${url}`);
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    } catch (error: any) {
      clearTimeout(id);
      lastError = error;
      if (error.name === "AbortError") {
        console.warn(`[ServerFetch Timeout] ${url} (> ${timeout}ms) attempt ${i + 1}`);
      } else {
        console.error(`[ServerFetch Error] ${url}: ${error.message} attempt ${i + 1}`);
      }
      if (i < retries) {
        await new Promise((resolve) => setTimeout(resolve, 500 * Math.pow(2, i)));
      }
    }
  }
  throw lastError;
}

export async function serverFetch<T>(
  path: string,
  options: RequestInit & { timeout?: number; retries?: number } = {},
): Promise<T> {
  const session = await getServerSession(authConfig);
  const accessToken = session?.accessToken;
  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const url = path.startsWith("http") ? path : `${BACKEND_URL}${path}`;

  const response = await fetchWithRetry(url, {
    cache: "no-store",
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API request failed with status ${response.status}`,
    );
  }

  const result = await response.json();
  return result.data as T;
}
