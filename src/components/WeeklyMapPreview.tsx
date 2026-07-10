import Link from "next/link";
import { ChevronRight, Map } from "lucide-react";
import type { WeeklySummary } from "@/types";

type Props = {
  summary: WeeklySummary;
};

export function WeeklyMapPreview({ summary }: Props) {
  if (summary.reviewCount === 0) return null;

  return (
    <Link
      href="/map"
      className="card-elevated block rounded-2xl p-4 transition hover:border-pond-500/20"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pond-50 to-mist text-pond-700">
          <Map className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="section-label">This week at the pond</p>
          <p className="mt-0.5 font-serif text-base text-pond-900">
            {summary.reviewCount} reflection{summary.reviewCount !== 1 ? "s" : ""} this week
          </p>
          {summary.mostCommonTheme && (
            <p className="mt-1 truncate text-xs text-ink/55">
              Most visited theme: {summary.mostCommonTheme}
            </p>
          )}
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink/50">
            {summary.suggestedPractice}
          </p>
        </div>
        <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-ink/25" />
      </div>
    </Link>
  );
}
