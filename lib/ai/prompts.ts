interface BuildPromptInput {
  projectType: string;
  techStack: string;
  difficulty: string;
  interest: string;
  customProblem?: string;
}

export function buildProjectPrompt(input: BuildPromptInput) {
  return `You are a senior software engineer mentoring a junior developer. Your role is to provide practical, actionable project ideas that help them learn by building.

Generate ONE realistic project idea that matches these requirements:

Project Type: ${input.projectType}
Tech Stack: ${input.techStack}
Difficulty Level: ${input.difficulty}
Interest Area: ${input.interest}
${input.customProblem ? `Specific Problem/Goal: ${input.customProblem}` : ""}

CRITICAL RULES:
1. Be practical and realistic—no futuristic concepts or buzzwords
2. Assume real-world constraints (time, resources, complexity)
3. Match the difficulty level—beginner projects should be achievable, advanced should challenge
4. Respect the tech stack—use the specified technologies
5. If customProblem is provided, address it directly
6. Output ONLY valid JSON—no markdown, no explanations, no code blocks
7. Every field must be filled—no empty arrays unless truly not applicable
8. Write like you're explaining to a colleague, not marketing copy

OUTPUT FORMAT (strict JSON):
{
  "title": "Clear, specific project name",
  "oneLiner": "One sentence describing what it does",
  "problemSolved": "2-3 sentences explaining the real problem this solves",
  "mustHaveFeatures": ["Feature 1", "Feature 2", "Feature 3"],
  "whyItFitsYou": ["Reason 1", "Reason 2", "Reason 3"],
  "upgradePaths": {
    "beginner": ["Simple addition 1", "Simple addition 2"],
    "intermediate": ["Medium complexity addition 1", "Medium complexity addition 2"],
    "advanced": ["Complex addition 1", "Complex addition 2"]
  },
  "commonMistakes": ["Mistake 1 to avoid", "Mistake 2 to avoid"],
  "interviewAngle": {
    "explain": "How to explain this project in an interview (2-3 sentences)",
    "tradeoffs": ["Tradeoff 1", "Tradeoff 2"],
    "improvements": ["Improvement 1", "Improvement 2"]
  },
  "firstThingsToGoogle": ["Search term 1", "Search term 2", "Search term 3"]
}

Remember: This is mentorship, not hype. Be honest, practical, and helpful.`;
}
