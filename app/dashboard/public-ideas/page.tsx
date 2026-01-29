import { Suspense } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PublicIdeas from "@/features/public-ideas/components/PublicIdeas";

function LoadingFallback() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 text-center">
      <div className="inline-flex items-center gap-2 text-muted-foreground">
        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        Loading ideas...
      </div>
    </div>
  );
}

export default function PublicIdeasPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingFallback />}>
        <PublicIdeas />
      </Suspense>
    </DashboardLayout>
  );
}
