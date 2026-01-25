import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  oneLiner: z.string(),
  problemSolved: z.string(),

  mustHaveFeatures: z.array(z.string()),

  // 🔥 RARE FEATURES (LIMITED & SAFE)
  whyItFitsYou: z.array(z.string()),
  upgradePaths: z.object({
    beginner: z.array(z.string()),
    intermediate: z.array(z.string()),
    advanced: z.array(z.string()),
  }),
  commonMistakes: z.array(z.string()),
  interviewAngle: z.object({
    explain: z.string(),
    tradeoffs: z.array(z.string()),
    improvements: z.array(z.string()),
  }),
  firstThingsToGoogle: z.array(z.string()),
});

export type Project = z.infer<typeof ProjectSchema>;
