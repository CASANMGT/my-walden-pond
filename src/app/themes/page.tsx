"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppShell";
import { PondIllustration } from "@/components/PondIllustration";
import { ThemeCard } from "@/components/ThemeCard";
import { themes } from "@/data/themes";
import { getProgress } from "@/lib/storage";

export default function ThemesPage() {
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    setCompleted(getProgress().completedChapterNumbers);
  }, []);

  return (
    <>
      <AppHeader title="Theme Library" />
      <div className="animate-fade-up space-y-5 px-4 pt-4 pb-4">
        <div className="card-elevated overflow-hidden rounded-3xl">
          <PondIllustration variant="banner" className="h-28 rounded-none" />
          <div className="p-5">
            <p className="section-label">Timeless themes</p>
            <p className="mt-1 font-serif text-xl text-pond-900">Seven paths through the book</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/55">
              Explore chapters grouped by the soul questions they address.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {themes.map((theme) => {
            const count = theme.chapterNumbers.filter((n) =>
              completed.includes(n)
            ).length;
            return (
              <ThemeCard key={theme.id} theme={theme} completedCount={count} />
            );
          })}
        </div>
      </div>
    </>
  );
}
