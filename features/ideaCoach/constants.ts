/* =========================================
   IDEA COACH — DEVELOPER CONSTANTS
   Single source of truth (DEEP)
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

/* ---------- TECH STACKS BY PROJECT TYPE (EXPANDED) ---------- */
export const stacksByType: Record<ProjectType, string[]> = {
  "Web App": [
    "Next.js",
    "React",
    "Vue",
    "Svelte",
    "Astro",
    "Remix",
    "Node.js",
    "Bun",
    "Django",
    "Rails",
    "GraphQL",
    "tRPC",
    "Tailwind CSS",
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
    "Bash",
    "Zsh",
    "Deno",
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
    "Rust",
    "Go",
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
    "Vector DBs",
  ],

  "Open Source Project": [
    "TypeScript",
    "JavaScript",
    "Go",
    "Rust",
    "Python",
    "Monorepos",
  ],
};

/* ---------- DIFFICULTY LEVELS ---------- */
export const levels = ["Beginner", "Intermediate", "Advanced"] as const;
export type DifficultyLevel = (typeof levels)[number];

/* ---------- DEVELOPER INTERESTS / DOMAINS (EXPANDED) ---------- */
export const interests = [
  // Core engineering
  "System Design",
  "Backend Architecture",
  "Frontend Architecture",
  "Performance Optimization",
  "Scalability",
  "Distributed Systems",

  // Databases & state
  "SQL Databases",
  "NoSQL Databases",
  "Redis & Caching",
  "Search Engines",
  "Data Modeling",

  // Backend internals
  "Authentication & Authorization",
  "API Design",
  "Webhooks & Events",
  "Rate Limiting",
  "Background Jobs & Queues",

  // Infra & ops
  "DevOps",
  "CI/CD",
  "Docker & Containers",
  "Kubernetes",
  "Cloud Infrastructure",
  "Serverless",
  "Observability & Monitoring",

  // Messaging & async
  "Event-Driven Systems",
  "Kafka & Message Brokers",
  "Streaming Systems",

  // Developer experience
  "Developer Productivity",
  "Code Quality",
  "Refactoring",
  "Testing & QA",
  "Debugging",
  "Tooling",

  // Security
  "Web Security",
  "API Security",
  "Secrets Management",

  // AI & modern systems
  "AI Engineering",
  "LLM Apps",
  "MLOps",
  "Vector Databases",
  "Data Pipelines",

  // Product-focused (still dev-centric)
  "SaaS Engineering",
  "Startup Engineering",
  "Internal Tools",
  "Open Source",
] as const;

export type DeveloperInterest = (typeof interests)[number];

/* ---------- SUB QUESTIONS (THIS IS THE POWER) ---------- */
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
