import { useQuery } from "@tanstack/react-query";

export function useCredits() {
  return useQuery({
    queryKey: ["credits"],
    queryFn: async () => {
      const res = await fetch("/api/ideas/credits");
      if (!res.ok) {
        throw new Error("Failed to fetch credits");
      }

      return res.json() as Promise<{
        plan: "FREE" | "PRO";
        creditsLeft: number;
        creditsPerMonth: number;
        resetsAt: string;
      }>;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes - credits don't change that often
    gcTime: 1000 * 60 * 10, // 10 minutes - keep in cache
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
    refetchOnReconnect: false, // Don't refetch on reconnect
  });
}
