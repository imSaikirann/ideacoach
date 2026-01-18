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
      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-neutral-900 text-white font-semibold text-base sm:text-lg border-2 border-neutral-900 transition-all group-hover:scale-110">
        {step}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
          {title}
        </h3>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
