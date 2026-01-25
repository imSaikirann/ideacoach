import { DifficultyLevel, ProjectType } from "@/features/ideaCoach/constants";

export function buildWhyItFitsYou(input: {
  techStack: string[];
  difficulty: DifficultyLevel;
  interest: string;
}) {
  return [
    `Uses your chosen stack: ${input.techStack.join(", ")}`,
    `Matches your ${input.difficulty} experience level`,
    `Directly explores ${input.interest}`,
    `Balanced between learning and real-world usefulness`,
  ];
}

export function buildUpgradePaths() {
  return {
    beginner: [
      "Core CRUD functionality",
      "Basic authentication",
      "Single database schema",
    ],
    intermediate: [
      "Role-based access control",
      "Caching and pagination",
      "Background jobs",
    ],
    advanced: [
      "Event-driven architecture",
      "Horizontal scaling",
      "Monitoring and observability",
    ],
  };
}

export function commonMistakesByType(type: ProjectType): string[] {
  const map: Record<ProjectType, string[]> = {
    "Web App": [
      "Overbuilding auth too early",
      "Ignoring loading & error states",
      "No mobile responsiveness",
    ],
    "API / Backend": [
      "No rate limiting",
      "Tight coupling",
      "Missing idempotency",
    ],
    "AI Tool": [
      "No prompt versioning",
      "Ignoring latency & cost",
      "Blind trust in outputs",
    ],
    // fallback
    "CLI Tool": ["Poor error messages", "No help command"],
    "Mobile App": ["Ignoring offline state"],
    "Browser Extension": ["No permission scoping"],
    "Desktop App": ["Heavy bundles"],
    "Microservice": ["Chatty services"],
    "Internal Tool": ["No access control"],
    "Dev Tool / Library": ["Poor docs"],
    "Automation Script": ["Hardcoded configs"],
    "Open Source Project": ["No contribution guide"],
  };

  return map[type] ?? [];
}

export function buildSearchQueries(stack: string[]) {
  return [
    `${stack[0]} authentication best practices`,
    "database indexing strategies",
    "rate limiting patterns",
  ];
}
