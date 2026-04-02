"use client";
import { useToast } from "@/hooks/useToast";

export function ToastContainer() {
  const { message, type, hide } = useToast();

  if (!message) return null;

  const baseClasses = "fixed top-5 right-5 p-4 rounded-lg text-white z-50";
  const typeClasses: Record<"success" | "error" | "info", string> = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`${baseClasses} ${typeClasses[type as "success" | "error" | "info"]}`}
    >
      <span>{message}</span>
      <button onClick={hide} className="ml-4 font-bold">
        ×
      </button>
    </div>
  );
}
