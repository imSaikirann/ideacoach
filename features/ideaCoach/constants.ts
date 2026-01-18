/* =========================================
   IDEA COACH — DEVELOPER CONSTANTS
   Single source of truth
========================================= */

/* ---------- PROJECT TYPES ---------- */
export const projectTypes = [
  "Web App",
  "Mobile App",
  "API / Backend",
  "CLI Tool",
  "Browser Extension",
  "Desktop App",
  "Microservice",
  "Internal Tool",
  "Dev Tool / Library",
  "Automation Script",
  "AI Tool",
  "Open Source Project",
] as const;

export type ProjectType = (typeof projectTypes)[number];

/* ---------- TECH STACKS BY PROJECT TYPE ---------- */
export const stacksByType: Record<ProjectType, string[]> = {
  "Web App": [
    "Next.js",
    "React",
    "Vue",
    "Svelte",
    "Astro",
    "Remix",
    "Node.js",
    "Django",
    "Rails",
  ],

  "Mobile App": [
    "React Native",
    "Expo",
    "Flutter",
    "Swift",
    "Kotlin",
  ],

  "API / Backend": [
    "Node.js",
    "NestJS",
    "Express",
    "FastAPI",
    "Django REST",
    "Go",
    "Rust",
    "Spring Boot",
  ],

  "CLI Tool": [
    "Node.js",
    "Python",
    "Go",
    "Rust",
    "Bash",
    "Zsh",
  ],

  "Browser Extension": [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
    "Plasmo",
  ],

  "Desktop App": [
    "Electron",
    "Tauri",
    "Flutter",
    "Swift",
    "C# (.NET)",
    "Python",
  ],

  "Microservice": [
    "Node.js",
    "Go",
    "Rust",
    "Java",
    "gRPC",
  ],

  "Internal Tool": [
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Prisma",
  ],

  "Dev Tool / Library": [
    "TypeScript",
    "JavaScript",
    "Rust",
    "Go",
    "Python",
  ],

  "Automation Script": [
    "Python",
    "Node.js",
    "Bash",
    "PowerShell",
  ],

  "AI Tool": [
    "Python",
    "Node.js",
    "LangChain",
    "OpenAI API",
    "Hugging Face",
  ],

  "Open Source Project": [
    "TypeScript",
    "JavaScript",
    "Go",
    "Rust",
    "Python",
  ],
};

/* ---------- DIFFICULTY LEVELS ---------- */
export const levels = ["Beginner", "Intermediate", "Advanced"] as const;
export type DifficultyLevel = (typeof levels)[number];

/* ---------- DEVELOPER INTERESTS / DOMAINS ---------- */
export const interests = [
  // Core engineering
  "System Design",
  "Backend Architecture",
  "Frontend Architecture",
  "Performance Optimization",
  "Scalability",
  "Distributed Systems",

  // Developer experience
  "Developer Productivity",
  "Code Quality",
  "Refactoring",
  "Testing & QA",
  "Debugging",
  "Tooling",

  // Infra & ops
  "DevOps",
  "CI/CD",
  "Docker & Containers",
  "Kubernetes",
  "Cloud Infrastructure",
  "Observability & Monitoring",

  // Data & backend
  "Databases",
  "Caching",
  "Search Systems",
  "Event-Driven Systems",

  // Security
  "Authentication & Authorization",
  "Web Security",
  "API Security",

  // AI & modern systems
  "AI Engineering",
  "LLM Apps",
  "MLOps",
  "Data Pipelines",

  // Product-focused (still dev-centric)
  "SaaS Engineering",
  "Startup Engineering",
  "Internal Tools",
  "Open Source",
] as const;

export type DeveloperInterest = (typeof interests)[number];
