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
    mutationFn: async ({ project, selections, visibility = "PUBLIC" }: SaveIdeaInput) => {
      // Map the new project format to the database schema
      const ideaData = {
        title: project.projectName || project.title || "Untitled Project",
        problemSolved: project.description || project.problemStatement || project.problemSolved || "",
        features: project.technicalFocus || project.features || [],
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
      // Invalidate public ideas query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });
}
