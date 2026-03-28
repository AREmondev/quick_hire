import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
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
