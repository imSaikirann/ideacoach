export interface Idea {
  time: string;
  category: string;
  stack: any;
  problem: any;
  id: string;
  title: string;
  problemStatement: string | null;
  features: string[];
  difficulty: string;
  techStack: string;
  interest: string;
  createdAt: string;
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
