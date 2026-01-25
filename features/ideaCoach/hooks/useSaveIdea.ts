import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project } from "../types";
import type { UserSelections } from "../types";

interface SaveIdeaInput {
  project: Project;
  selections: UserSelections;
  visibility?: "PRIVATE" | "PUBLIC";
}

export function useSaveIdea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ project, selections, visibility = "PRIVATE" }: SaveIdeaInput) => {
      // Map canonical schema to database format
      const ideaData = {
        savedIdeaId: project.savedIdeaId, // Pass saved ID if exists to update instead of create
        title: project.title || project.projectName || "Untitled Project",
        problemSolved: project.problemSolved || project.oneLiner || project.description || "",
        features: project.mustHaveFeatures || project.features || project.technicalFocus || [],
        projectType: selections.projectType || "",
        techStack: Array.isArray(selections.techStack) 
          ? selections.techStack.join(", ") 
          : (selections.techStack || ""),
        difficulty: selections.difficulty || "",
        interest: selections.interest || "",
        visibility: visibility,
      };

      const res = await fetch("/api/ideas/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ideaData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to save idea");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });
}
