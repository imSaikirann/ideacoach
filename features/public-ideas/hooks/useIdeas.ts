import { useQuery } from "@tanstack/react-query";
import { fetchIdeas } from "../services/ideas";

export function useIdeas() {
  return useQuery({
    queryKey: ["ideas"],
    queryFn: fetchIdeas,
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: (failureCount, error: any) => {
      // don't retry if user is not logged in
      if (error?.message === "UNAUTHORIZED") return false;
      return failureCount < 2;
    },
  });
}
