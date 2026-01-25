export interface Idea {
  id: string;
  title: string;
  problem?: string;
  problemStatement?: string | null;
  features: string[];
  difficulty: string;
  techStack?: string | string[];
  stack?: string[];
  projectType?: string;
  interest?: string;
  time?: string;
  category?: string;
  createdAt: string;
  author?: string;
  visibility?: "PUBLIC" | "PRIVATE";
  isOwn?: boolean;
}

export async function fetchIdeas(): Promise<Idea[]> {
  const res = await fetch("/api/public-ideas/display", {
    method: "GET",
    credentials: "include", // important for auth
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("UNAUTHORIZED");
    }
    throw new Error("FAILED_TO_FETCH_IDEAS");
  }

  return res.json();
}
