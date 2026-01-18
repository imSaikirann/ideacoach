export default function HowItWorksItem({
  step,
  title,
  description,
  index,
}: {
  step: string;
  title: string;
  description: string;
  index?: number;
}) {
  return (
    <div className="flex flex-col gap-6 group">
      {/* Step number */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-primary text-primary-foreground font-semibold text-base sm:text-lg transition-all group-hover:bg-primary/90">
        {step}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
          {title}
        </h3>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
