import { StepLayout } from "./StepLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useTypewriter } from "../../../hooks/useTypewriter";

interface Project {
  title: string;
  problemSolved?: string;
  whyThisProject?: string;
  features?: string[];
  skillsProved?: string[];
}

interface ProjectResultProps {
  project: Project;
}

export function ProjectResult({ project }: ProjectResultProps) {
  const whyText = useTypewriter(project.whyThisProject ?? "");
  const subtitleText = useTypewriter(
    project.problemSolved ?? "A project tailored to your inputs."
  );

  return (
    <StepLayout
      title="Here’s your project idea"
      subtitle={subtitleText}
    footer={
  <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
    {/* Secondary action */}
    <Button
      variant="outline"
      className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold"
    >
      Back
    </Button>

    {/* Primary action */}
    <Button
      className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold group"
    >
      Start this project
      <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
    </Button>
  </div>
}

    >
      {/* Result Card */}
      <div className="rounded-2xl border border-[#2A1F1F] bg-[#1A1818] p-6 sm:p-8 md:p-10 space-y-10">
        
        {/* Project title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E5E5E5] tracking-tight">
          {project.title}
        </h2>

        {/* WHY */}
        {project.whyThisProject && (
          <Section
            icon={<Sparkles className="w-5 h-5 text-[#A0A0A0]" />}
            title="Why this project"
          >
            <p className="text-[#E5E5E5] leading-relaxed text-base sm:text-lg">
              {whyText}
              <Cursor />
            </p>
          </Section>
        )}

        {/* FEATURES */}
        {project.features && project.features.length > 0 && (
          <Section
            icon={<CheckCircle2 className="w-5 h-5 text-[#A0A0A0]" />}
            title="What you'll build"
          >
            <BulletList items={project.features} />
          </Section>
        )}

        {/* SKILLS */}
        {project.skillsProved && project.skillsProved.length > 0 && (
          <Section
            icon={<CheckCircle2 className="w-5 h-5 text-[#A0A0A0]" />}
            title="Skills this proves"
          >
            <BulletList items={project.skillsProved} />
          </Section>
        )}
      </div>
    </StepLayout>
  );
}

/* ---------- helpers ---------- */

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-lg sm:text-xl font-semibold text-[#E5E5E5]">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#541212] flex-shrink-0" />
          <span className="text-[#E5E5E5] text-base sm:text-lg leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- typing cursor ---------- */

function Cursor() {
  return (
    <span className="inline-block w-[2px] h-[1em] bg-[#541212] ml-1 animate-pulse" />
  );
}
