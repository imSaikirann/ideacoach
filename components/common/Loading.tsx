export default function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-foreground" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}