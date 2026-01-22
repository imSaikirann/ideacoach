import UmamiAnalytics from "@/components/common/UmamiVisitors";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          {/* Left / Center */}
          <p className="text-sm text-muted-foreground">
            IdeaCoach · Built by{" "}
            <span className="font-medium text-foreground">
              Sai Kiran
            </span>
          </p>

          {/* Right */}
          <UmamiAnalytics />
        </div>
      </div>
    </footer>
  );
}
