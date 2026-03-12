"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Sparkles,
  ArrowRight,
  X,
  Code2,
  Zap,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIdeas } from "../hooks/useIdeas";
import { IdeaDetailModal } from "./IdeaDetailModal";
import { Pagination } from "./Pagination";
import type { Idea } from "../services/ideas";
import BackButton from "@/components/common/back-button";
import Loading from "@/components/common/Loading";

const ITEMS_PER_PAGE = 9;

export default function PublicIdeas() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useIdeas(currentPage, ITEMS_PER_PAGE);

  const publicIdeas = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  // Show PUBLIC ideas + user's own ideas
  const visibleIdeas = useMemo(() => {
    return publicIdeas.filter(
      (idea) => idea.visibility === "PUBLIC" || idea.isOwn
    );
  }, [publicIdeas]);

  const filteredIdeas = useMemo(() => {
    return visibleIdeas.filter((idea) => {
      const stackArray: string[] = Array.isArray(idea.stack)
        ? idea.stack
        : Array.isArray(idea.techStack)
        ? idea.techStack
        : typeof idea.techStack === "string"
        ? idea.techStack.split(", ").filter(Boolean)
        : [];

      const matchesSearch =
        searchQuery === "" ||
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (idea.problem || idea.problemStatement || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        stackArray.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesDifficulty =
        selectedDifficulty === "All" || idea.difficulty === selectedDifficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [visibleIdeas, searchQuery, selectedDifficulty]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDifficulty]);

  // Auto-open modal if ideaId is in URL
  useEffect(() => {
    const ideaId = searchParams.get("ideaId");
    if (!ideaId || !publicIdeas.length) return;

    const match = publicIdeas.find((idea) => idea.id === ideaId);
    if (match) {
      setSelectedIdea(match);
      setIsModalOpen(true);
    }
  }, [searchParams, publicIdeas]);

  if (isLoading) {
    return (
     <Loading/>
    );
  }

  if (isError) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-destructive">
          Failed to load ideas. Please try again.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 sm:py-16 mt-10">
      <BackButton />

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Community Ideas
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Explore Project Ideas
        </h1>

        <p className="text-muted-foreground">
          Discover what other developers are building
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-8 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search ideas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-10 rounded-lg border bg-background text-sm focus:border-primary/50 outline-none transition-colors"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        {/* Difficulty filter */}
        <div className="flex justify-center gap-2">
          {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedDifficulty(level)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedDifficulty === level
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredIdeas.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIdeas.map((idea) => {
              const stackArray: string[] = Array.isArray(idea.stack)
                ? idea.stack
                : Array.isArray(idea.techStack)
                ? idea.techStack
                : [];

              return (
                <button
                  key={idea.id}
                  onClick={() => {
                    setSelectedIdea(idea);
                    setIsModalOpen(true);
                  }}
                  className="text-left p-4 rounded-xl border bg-card border-primary/10 cursor-pointer hover:border-primary/15 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold line-clamp-1">{idea.title}</h3>

                    {idea.isOwn && idea.visibility === "PRIVATE" && (
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {idea.problem || idea.problemStatement || "No description"}
                  </p>

                  {stackArray.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {stackArray.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded bg-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-2">
                      {idea.difficulty && (
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {idea.difficulty}
                        </span>
                      )}
                      {idea.projectType && (
                        <span className="flex items-center gap-1">
                          <Code2 className="w-3 h-3" />
                          {idea.projectType}
                        </span>
                      )}
                    </div>

                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No ideas found</p>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedDifficulty("All");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      <IdeaDetailModal
        idea={selectedIdea}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedIdea(null);
        }}
      />
    </section>
  );
}