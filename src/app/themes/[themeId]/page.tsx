"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, ChevronRight, Target } from "lucide-react";
import { PondIllustration } from "@/components/PondIllustration";
import { DetailHeader } from "@/components/DetailHeader";
import { AppHeader } from "@/components/AppShell";
import { ThemeIcon } from "@/components/ThemeIcon";
import { getThemeById, themes } from "@/data/themes";
import { getChapterByNumber } from "@/data/chapters";
import { getProgress } from "@/lib/storage";

export default function ThemeDetailPage() {
  const params = useParams();
  const themeId = params.themeId as string;
  const theme = getThemeById(themeId);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    setCompleted(getProgress().completedChapterNumbers);
  }, []);

  if (!theme) {
    return (
      <>
        <AppHeader />
        <p className="p-4 text-ink/60">Theme not found.</p>
      </>
    );
  }

  const completedInTheme = theme.chapterNumbers.filter((n) =>
    completed.includes(n)
  ).length;
  const nextChapter = theme.chapterNumbers.find((n) => !completed.includes(n));
  const themeIndex = themes.findIndex((t) => t.id === themeId) + 1;

  return (
    <>
      <DetailHeader backHref="/themes" backLabel="Themes" center={`Theme ${themeIndex}`} />

      <div className="card-elevated mx-4 mt-4 overflow-hidden rounded-3xl">
        <PondIllustration variant="banner" className="h-28 rounded-none" />
        <div className="p-5">
          <div className="mb-2 flex items-center gap-2 text-moss">
            <ThemeIcon themeId={theme.id} />
            <span className="section-label">Theme</span>
          </div>
          <h1 className="font-serif text-2xl text-pond-900">
            {themeIndex}. {theme.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            {theme.description}
          </p>
        </div>
      </div>

      <div className="space-y-6 px-4 py-6">
        <div className="quote-card">
          <p className="section-label relative z-10 pl-6">Core question</p>
          <p className="relative z-10 mt-1 pl-6 font-serif text-lg leading-relaxed text-pond-900">
            {theme.coreQuestion}
          </p>
        </div>

        <div className="card-elevated rounded-2xl p-5">
          <div className="mb-2 flex items-center gap-2 text-pond-700">
            <Target className="h-4 w-4" strokeWidth={1.5} />
            <h2 className="section-label text-pond-700">What you&apos;ll discover</h2>
          </div>
          <p className="text-sm leading-relaxed text-ink/75">{theme.outcome}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-moss">
            Your progress
          </p>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist">
              <div
                className="h-full rounded-full bg-pond-500"
                style={{
                  width: `${(completedInTheme / theme.chapterNumbers.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs text-ink/50">
              {completedInTheme} of {theme.chapterNumbers.length}
            </span>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-lg text-pond-900">Related chapters</h2>
          <ul className="mt-3 space-y-2">
            {theme.chapterNumbers.map((num) => {
              const ch = getChapterByNumber(num);
              if (!ch) return null;
              const done = completed.includes(num);
              return (
                <li key={num}>
                  <Link
                    href={`/review?chapter=${num}`}
                    className="card-elevated flex items-center gap-3 rounded-xl p-3 transition hover:border-pond-500/30"
                  >
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        done ? "bg-pond-700 text-white" : "border border-mist"
                      }`}
                    >
                      {done && <Check className="h-3.5 w-3.5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-ink/50">Chapter {num}</p>
                      <p className="truncate text-sm font-medium text-ink/90">
                        {ch.chapterTitle}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-ink/30" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {nextChapter && (
          <Link
            href={`/review?chapter=${nextChapter}`}
            className="btn-primary"
          >
            Start This Theme
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </>
  );
}
