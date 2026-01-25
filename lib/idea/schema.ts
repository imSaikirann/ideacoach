export type GeneratedIdea = {
  coreIdea: {
    title: string;
    oneLiner: string;
    problemSolved: string;
  };

  whyItFitsYou: string[];

  projectScope: {
    scale: string;
    timeCommitment: string;
    infraLevel: string;
    dataComplexity: string;
  };

  features: {
    mustHave: string[];
    niceToHave: string[];
  };

  upgradePaths: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };

  commonMistakes: string[];

  interviewAngle: {
    explainInInterview: string;
    tradeoffs: string[];
    improvements: string[];
  };

  firstThingsToGoogle: string[];
};
