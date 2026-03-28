import { getCategories } from "@/services/serverApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useCategoriesQuery(token?: string | null) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    enabled: !!token,
  });
}
