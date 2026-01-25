import { getGeminiModel } from "@/lib/gemini";
import { ProjectSchema } from "../schemas/project.schema";
import { normalizeProject } from "../normalizers/project.normalizer";
import { buildProjectPrompt } from "./prompts";

const MAX_RETRIES = 1;

interface GenerateProjectInput {
  projectType: string;
  techStack: string;
  difficulty: string;
  interest: string;
  customProblem?: string;
}

export async function generateProject(input: GenerateProjectInput) {
  const model = await getGeminiModel();
  const prompt = buildProjectPrompt(input);

  let attempt = 0;
  let result;

  while (attempt <= MAX_RETRIES) {
    try {
      result = await model.generateContent(prompt);
      break;
    } catch (err: any) {
      attempt++;
      if (err?.status === 429 && attempt <= MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 500));
        continue;
      }
      throw err;
    }
  }

  if (!result) throw new Error("AI returned no result");

  const text = result.response.text();
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("Invalid AI response format");
  }

  const raw = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
  const normalized = normalizeProject(raw);

  return ProjectSchema.parse(normalized);
}
