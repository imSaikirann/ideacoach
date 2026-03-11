import { useQuery } from "@tanstack/react-query";
import { fetchIdeas } from "../services/ideas";

export function useIdeas(page: number, limit: number) {
  return useQuery({
    queryKey: ["ideas", page, limit],
    queryFn: () => fetchIdeas(page, limit),
    staleTime: 1000 * 60 * 2,

    retry: (failureCount, error: any) => {
      if (error?.message === "UNAUTHORIZED") return false;
      return failureCount < 2;
    },
  });
}