export function CreditsSkeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="h-9 w-9 rounded-lg bg-muted" />
      <div className="space-y-1">
        <div className="h-3 w-24 rounded bg-muted" />
        <div className="h-4 w-16 rounded bg-muted" />
      </div>
    </div>
  );
}
