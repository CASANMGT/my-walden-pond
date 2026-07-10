import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Theme } from "@/types";
import { ThemeIcon } from "./ThemeIcon";

type Props = {
  theme: Theme;
  completedCount: number;
};

export function ThemeCard({ theme, completedCount }: Props) {
  const pct = Math.round((completedCount / theme.chapterNumbers.length) * 100);

  return (
    <Link
      href={`/themes/${theme.id}`}
      className="card-elevated group flex items-center gap-4 rounded-2xl p-4 transition hover:border-pond-500/30"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pond-50 to-mist text-pond-700">
        <ThemeIcon themeId={theme.id} className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-base text-pond-900">{theme.name}</h3>
        <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-ink/55">
          {theme.coreQuestion}
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-mist">
            <div
              className="h-full rounded-full bg-pond-500 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="shrink-0 text-[10px] text-moss">
            {completedCount}/{theme.chapterNumbers.length}
          </span>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-ink/25 transition group-hover:text-pond-500" />
    </Link>
  );
}
