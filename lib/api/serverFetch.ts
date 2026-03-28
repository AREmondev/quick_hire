import { getServerSession } from "next-auth/next";
import { authConfig } from "@/lib/auth/options";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export async function serverFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const session = await getServerSession(authConfig);
  console.log("Session", session);
  const accessToken = session?.accessToken;
  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const url = path.startsWith("http") ? path : `${BACKEND_URL}${path}`;

  const response = await fetch(url, {
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
