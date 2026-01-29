/* =========================================
   IDEA COACH — DEVELOPER CONSTANTS
   Single source of truth (CLEAN & COMPLETE)
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
/* (Cleaned: no missing stacks, no nonsense combos) */
export const stacksByType: Record<ProjectType, string[]> = {
  "Web App": [
    "Next.js",
    "React",
    "Vue",
    "Svelte",
    "Astro",
    "Remix",
    "Tailwind CSS",
    "Node.js",
    "Django",
    "Rails",
    "GraphQL",
    "tRPC",
  ],

  "Mobile App": [
    "React Native",
    "Expo",
    "Flutter",
    "Swift",
    "Kotlin",
    "Capacitor",
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
    "GraphQL",
    "gRPC",
    "tRPC",
  ],

  "CLI Tool": [
    "Node.js",
    "Python",
    "Go",
    "Rust",
    "Deno",
    "Bun",
    "Bash",
  ],

  "Browser Extension": [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
    "Plasmo",
    "WebExtensions API",
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
    "Spring Boot",
    "gRPC",
    "Kafka",
    "RabbitMQ",
  ],

  "Internal Tool": [
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Redis",
    "tRPC",
  ],

  "Dev Tool / Library": [
    "TypeScript",
    "JavaScript",
    "Go",
    "Rust",
    "Python",
    "AST Tooling",
    "Compiler APIs",
  ],

  "Automation Script": [
    "Python",
    "Node.js",
    "Bash",
    "PowerShell",
    "GitHub Actions",
  ],

  "AI Tool": [
    "Python",
    "Node.js",
    "LangChain",
    "OpenAI API",
    "Hugging Face",
    "Vector Databases",
    "RAG Pipelines",
  ],

  "Open Source Project": [
    "TypeScript",
    "JavaScript",
    "Python",
    "Go",
    "Rust",
    "Monorepos",
    "CI/CD",
  ],
};

/* ---------- DIFFICULTY LEVELS ---------- */
export const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export type DifficultyLevel = (typeof levels)[number];

/* ---------- DEVELOPER INTERESTS / DOMAINS ---------- */
export const developerInterests = [
  "Frontend Architecture",
  "Backend Architecture",
  "System Design",
  "Scalability",
  "Distributed Systems",
  "Authentication & Authorization",
  "API Design",
  "API Security",
  "Performance Optimization",
  "Web Security",
  "SaaS Engineering",
  "Startup Engineering",
  "Developer Productivity",
  "Tooling",
  "Code Quality",
  "Refactoring",
  "Testing & QA",
  "Rate Limiting",
  "Background Jobs & Queues",
  "Event-Driven Systems",
  "Kafka & Message Brokers",
  "Observability & Monitoring",
  "Internal Tools",
  "Data Modeling",
  "Open Source",
  "Automation",
  "CI/CD",
  "AI Engineering",
  "LLM Apps",
  "Vector Databases",
  "Data Pipelines",
  "MLOps",
] as const;

export type DeveloperInterest = (typeof developerInterests)[number];

/* ---------- INTERESTS BY PROJECT TYPE ---------- */
export const interests: Record<ProjectType, DeveloperInterest[]> = {
  "Web App": [
    "Frontend Architecture",
    "Backend Architecture",
    "Authentication & Authorization",
    "API Design",
    "Performance Optimization",
    "Web Security",
    "SaaS Engineering",
    "Startup Engineering",
  ],

  "Mobile App": [
    "Frontend Architecture",
    "Performance Optimization",
    "Authentication & Authorization",
    "API Design",
    "Startup Engineering",
  ],

  "API / Backend": [
    "Backend Architecture",
    "System Design",
    "Scalability",
    "Distributed Systems",
    "Authentication & Authorization",
    "API Security",
    "Rate Limiting",
    "Background Jobs & Queues",
  ],

  "CLI Tool": [
    "Developer Productivity",
    "Tooling",
    "Code Quality",
    "Refactoring",
    "Testing & QA",
  ],

  "Browser Extension": [
    "Frontend Architecture",
    "Web Security",
    "Authentication & Authorization",
    "API Design",
  ],

  "Desktop App": [
    "Frontend Architecture",
    "Backend Architecture",
    "Performance Optimization",
  ],

  "Microservice": [
    "System Design",
    "Distributed Systems",
    "Scalability",
    "Event-Driven Systems",
    "Kafka & Message Brokers",
    "Observability & Monitoring",
  ],

  "Internal Tool": [
    "Developer Productivity",
    "Internal Tools",
    "Authentication & Authorization",
    "API Design",
    "Data Modeling",
  ],

  "Dev Tool / Library": [
    "Developer Productivity",
    "Tooling",
    "Code Quality",
    "Refactoring",
    "Testing & QA",
    "Open Source",
  ],

  "Automation Script": [
    "Automation",
    "Developer Productivity",
    "CI/CD",
  ],

  "AI Tool": [
    "AI Engineering",
    "LLM Apps",
    "Vector Databases",
    "Data Pipelines",
    "MLOps",
  ],

  "Open Source Project": [
    "Open Source",
    "Code Quality",
    "Testing & QA",
    "CI/CD",
    "Developer Productivity",
  ],
};

/* ---------- SUB QUESTIONS ---------- */
export const subQuestions = {
  scale: [
    "Solo developer",
    "Small team (2–5)",
    "Startup scale",
    "Enterprise scale",
  ],

  timeCommitment: [
    "Weekend project",
    "1–2 weeks",
    "1 month",
    "Long-term / production",
  ],

  infraLevel: [
    "Local only",
    "Cloud hosted",
    "Distributed",
    "High availability",
  ],

  dataComplexity: [
    "Simple CRUD",
    "Relational data",
    "High read/write load",
    "Event-driven / streaming",
  ],

  learningGoal: [
    "Learn fundamentals",
    "Improve architecture skills",
    "Practice system design",
    "Build portfolio project",
    "Prepare for interviews",
  ],
} as const;

export type SubQuestionCategory = keyof typeof subQuestions;
export type SubQuestionOption =
  (typeof subQuestions)[SubQuestionCategory][number];

/* ---------- GENERATION MESSAGES ---------- */
export const generationMessages = [
  "Analyzing your inputs…",
  "Understanding your goals and constraints…",
  "Matching tech stack to learning outcomes…",
  "Generating project ideas…",
  "Refining ideas for real-world use…",
] as const;
