export interface EstimatedTime {
  days: string;
  dailyEffort: string;
}

export interface Project {
  // Canonical schema fields
  title: string;
  oneLiner: string;
  problemSolved: string;
  mustHaveFeatures: string[];
  whyItFitsYou: string[];
  upgradePaths: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  commonMistakes: string[];
  interviewAngle: {
    explain: string;
    tradeoffs: string[];
    improvements: string[];
  };
  firstThingsToGoogle: string[];
  
  // Metadata
  savedIdeaId?: string;
  
  // Legacy fields (for backward compatibility)
  projectName?: string;
  description?: string;
  learningObjectives?: string[];
  technicalFocus?: string[];
  starterCodeExamples?: string[];
  stretchGoals?: string[];
  problemStatement?: string;
  features?: string[];
  whatYouWillLearn?: string[];
  estimatedTime?: EstimatedTime;
  projectSteps?: string[];
  designTradeoffs?: string[];
}

export interface UserSelections {
  projectType: string;
  techStack: string[];
  difficulty: string;
  interest: string;
  customProblem?: string;
}

export interface ProjectResultProps {
  project: Project;
  selections: UserSelections;
  onBack: () => void;
  onGenerateAnother: () => void;
  isGenerating?: boolean;
   creditsLeft: number;
  creditsPerMonth: number;
  
}

export interface ProjectResultFooterProps {
  isSaved: boolean;
  cooldown: number;
  isGenerating: boolean;
  onBack: () => void;
  onGenerateAnother: () => void;
  onSave?: () => void;
  isSaving?: boolean;
  creditsLeft: number;
  creditsPerMonth: number;
}


export interface StackStepProps {
  projectType: string;
  value: string[];
  onChange: (value: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}


export type SaveIdeaAlertProps = {
  isOpen: boolean;
  projectTitle: string;
  onSave: (visibility: "PUBLIC" | "PRIVATE") => void;
  onSkip: () => void;
};

export interface ProjectTypeStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  creditsLeft?: number;
  creditsPerMonth?: number;
  loading:boolean
}



export interface ProjectTradeoffsProps {
  tradeoffs: string[];
  revealed: boolean;
}

export interface ProjectTitleProps {
  title: string;
  subtitle: string;
  revealed: boolean;
}



export interface ProjectTimeProps {
  estimatedTime: string;
  revealed: boolean;
}


export interface ProjectStatsProps {
  features: number;
  skills: number;
  revealed: boolean;
}

export interface ProjectSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  revealed: boolean;
}

export interface ProjectRoadmapProps {
  roadmap: string[];
  revealed: boolean;
}

export interface ProjectProblemStatementProps {
  problemStatement: string;
  revealed: boolean;
}

export interface UserSelections {
  projectType: string;
  techStack: string[];
  difficulty: string;
  interest: string;
}

export interface ProjectPreferencesProps {
  selections: UserSelections;
  revealed: boolean;
}

export interface ProjectLearningProps {
  skills: string[];
  revealed: boolean;
}


export interface ProjectFeaturesProps {
  features: string[];
  revealed: boolean;
}

export interface ProjectCreditsHeaderProps {
  creditsLeft: number;
  creditsPerMonth: number;
}

export interface PreferenceItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export interface InterestStepProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}


export interface DifficultyStepProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}


export interface CustomProblemStepProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onGenerate: () => void;
  maxLength?: number;
  loading?: boolean;
  creditsLeft?: number;
  creditsPerMonth?: number;
}

export interface ChipProps {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}