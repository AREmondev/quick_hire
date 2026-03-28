import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "@/lib/services/categories";
import type { Category } from "@/lib/api/types";

export function useCategoriesQuery(token?: string | null) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(token || ""),
    enabled: !!token,
  });
}

export function useCreateCategoryMutation(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string; color?: string }) =>
      createCategory(payload, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useDeleteCategoryMutation(id: string, token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => deleteCategory(id, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}
