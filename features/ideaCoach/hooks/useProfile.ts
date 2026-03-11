import { useQuery } from "@tanstack/react-query";

type Credits = {
  id: string;
  userId: string;
  plan: "FREE" | "PRO";
  credits: number;
  monthlyLimit: number;
  resetsAt: string;
  createdAt: string;
  updatedAt: string;
};

type ProfileResponse = {
  name: string;
  email: string;
  image: string;
  credits: Credits;
};

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<ProfileResponse> => {
      const res = await fetch("/api/users/profile");

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }

      return res.json();
    },

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}