import { useMutation, useQueryClient } from "@tanstack/react-query";

interface GenerateIdeaInput {
  projectType: string;
  techStack: string;
  difficulty: string;
  interest: string;
  customProblem?: string;
}

export function useGenerateIdea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: GenerateIdeaInput) => {
      const res = await fetch("/api/generate-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to generate idea");
      }

      return data;
    },

    // 🔥 Refresh credits after success
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credits"] });
    },
  });
}
