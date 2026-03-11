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

export interface IdeasResponse {
  data: Idea[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export async function fetchIdeas(
  page: number,
  limit: number
): Promise<IdeasResponse> {
  const res = await fetch(
    `/api/public-ideas/display?page=${page}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("UNAUTHORIZED");
    }

    throw new Error("FAILED_TO_FETCH_IDEAS");
  }

  return res.json();
}