"use client";

import { AlertTriangle, RefreshCcw, X } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  onDismiss,
}: ErrorStateProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">
      <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-red-600" />

      <div className="flex-1 space-y-1">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-red-700">{message}</p>

        {(onRetry || onDismiss) && (
          <div className="mt-3 flex gap-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 text-sm font-medium text-red-700 hover:underline"
              >
                <RefreshCcw className="h-4 w-4" />
                Try again
              </button>
            )}

            {onDismiss && (
              <button
                onClick={onDismiss}
                className="inline-flex items-center gap-2 text-sm font-medium text-red-700 hover:underline"
              >
                <X className="h-4 w-4" />
                Dismiss
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
