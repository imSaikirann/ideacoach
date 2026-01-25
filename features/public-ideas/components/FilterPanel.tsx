"use client";

import React from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterPanelProps {
  difficulties: string[];
  categories: string[];
  selectedDifficulty: string;
  selectedCategory: string;
  onDifficultyChange: (difficulty: string) => void;
  onCategoryChange: (category: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export function FilterPanel({
  difficulties,
  categories,
  selectedDifficulty,
  selectedCategory,
  onDifficultyChange,
  onCategoryChange,
  onClear,
  hasActiveFilters,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mb-6">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-card hover:bg-card/80 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              {[selectedDifficulty !== "All" ? 1 : 0, selectedCategory !== "All" ? 1 : 0].reduce((a, b) => a + b, 0)}
            </span>
          )}
          {isOpen ? (
            <ChevronUp className="w-4 h-4 ml-auto" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-auto" />
          )}
        </button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 rounded-xl border bg-card space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Difficulty Filter */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Difficulty Level
            </label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => onDifficultyChange(difficulty)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDifficulty === difficulty
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
