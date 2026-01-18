import { projectTypes } from "../constants";
import { StepLayout } from "./StepLayout";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";

export function ProjectTypeStep({ value, onChange, onNext }: any) {
  return (
    <StepLayout
      title="Choose project type"
      subtitle="What type of project do you want to build?"
      currentStep={1}
      totalSteps={4}
      footer={
        <Button className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold transition-all" disabled={!value} onClick={onNext}>
          Continue
        </Button>
      }
    >
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
        {projectTypes.map((type) => (
          <Chip key={type} active={value === type} onClick={() => onChange(type)}>
            {type}
          </Chip>
        ))}
      </div>
    </StepLayout>
  );
}
