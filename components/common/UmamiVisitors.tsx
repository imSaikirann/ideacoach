export function UmamiVisitors() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Visitors:</span>
      <iframe
        src="https://cloud.umami.is/share/sxiXDgri8m6ulaNe?view=stats"
        className="h-6 w-24 border-0"
        loading="lazy"
      />
    </div>
  );
}
