"use client";

import { ChevronRight, Leaf } from "lucide-react";

type Props = {
  practice: string;
  completed: boolean;
  onToggle: (completed: boolean) => void;
};

export function NaturePractice({ practice, completed, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(!completed)}
      className={`w-full rounded-xl border p-4 text-left transition ${
        completed
          ? "border-pond-500/40 bg-pond-50"
          : "border-mist bg-white/50 hover:border-pond-500/20"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-pond-500" strokeWidth={1.5} />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-moss">
              Today&apos;s Nature Practice
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink/80">{practice}</p>
            {completed && (
              <p className="mt-2 text-xs text-pond-700">Marked as done</p>
            )}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-ink/30" />
      </div>
    </button>
  );
}
