import { stacksByType } from "../constants";
import { StepLayout } from "./StepLayout";
import { Chip } from "./Chip";
import { Button } from "@/components/ui/button";

export function StackStep({ projectType, value, onChange, onBack, onNext }: any) {
  const stacksList = projectType && stacksByType[projectType] 
    ? stacksByType[projectType] 
    : [];

  return (
    <StepLayout
      title="Choose your stack"
      subtitle={`Stacks suitable for ${projectType}`}
      currentStep={2}
      totalSteps={4}
      footer={
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold flex-1 transition-all" onClick={onBack}>Back</Button>
          <Button  className="rounded-lg bg-neutral-700 px-4 py-2 font-semibold text-white hover:bg-neutral-800  transition-colors" disabled={!value.length} onClick={onNext}>
            Continue
          </Button>
        </div>
      }
    >
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
        {stacksList.map((s) => (
          <Chip
            key={s}
            active={value.includes(s)}
            onClick={() =>
              onChange(
                value.includes(s)
                  ? value.filter((x: string) => x !== s)
                  : [...value, s]
              )
            }
          >
            {s}
          </Chip>
        ))}
      </div>
    </StepLayout>
  );
}
