import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Extracts a readable error message from an API error response.
 * Handles the format: error.response.data.error.message
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Check if the backend response has the expected structure
    if (error.response?.data?.error?.message) {
      return error.response.data.error.message;
    }
    // Fallback for Axios errors without the specific structure
    return error.response?.data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred. Please try again.";
};

/**
 * Throws a formatted error from an API response
 */
export const handleApiError = (error: unknown): never => {
  const message = getErrorMessage(error);
  throw new Error(message);
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
};

export const calculateDaysAgo = (dateTimestamp: string) => {
  console.log("dateTimestamp", dateTimestamp);
  if (!dateTimestamp) return "N/A";
  const date = new Date(dateTimestamp);
  const today = new Date();
  const diffTime = today.getTime() - date.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays}`;
};

export const formatSalary = (min: number, max: number, currency: string) => {
  const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(0)}k` : `${n}`);
  return `$${fmt(min)} – $${fmt(max)} / year`;
};
