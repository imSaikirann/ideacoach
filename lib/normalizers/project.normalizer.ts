export function normalizeProject(raw: any) {
  // Ensure all arrays are actually arrays and filter out invalid entries
  const ensureStringArray = (value: any): string[] => {
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  };

  // Ensure object has required structure
  const ensureUpgradePaths = (value: any) => {
    if (!value || typeof value !== "object") {
      return { beginner: [], intermediate: [], advanced: [] };
    }
    return {
      beginner: ensureStringArray(value.beginner),
      intermediate: ensureStringArray(value.intermediate),
      advanced: ensureStringArray(value.advanced),
    };
  };

  const ensureInterviewAngle = (value: any) => {
    if (!value || typeof value !== "object") {
      return { explain: "", tradeoffs: [], improvements: [] };
    }
    return {
      explain: typeof value.explain === "string" ? value.explain.trim() : "",
      tradeoffs: ensureStringArray(value.tradeoffs),
      improvements: ensureStringArray(value.improvements),
    };
  };

  return {
    title: typeof raw.title === "string" && raw.title.trim() ? raw.title.trim() : "Untitled Project",
    oneLiner: typeof raw.oneLiner === "string" ? raw.oneLiner.trim() : "",
    problemSolved: typeof raw.problemSolved === "string" ? raw.problemSolved.trim() : "",
    mustHaveFeatures: ensureStringArray(raw.mustHaveFeatures),
    whyItFitsYou: ensureStringArray(raw.whyItFitsYou),
    upgradePaths: ensureUpgradePaths(raw.upgradePaths),
    commonMistakes: ensureStringArray(raw.commonMistakes),
    interviewAngle: ensureInterviewAngle(raw.interviewAngle),
    firstThingsToGoogle: ensureStringArray(raw.firstThingsToGoogle),
  };
}
