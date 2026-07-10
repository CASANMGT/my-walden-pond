"use client";

import { useEffect, useMemo, useState } from "react";
import { AppHeader } from "@/components/AppShell";
import { ChapterListItem } from "@/components/ChapterListItem";
import { PondIllustration } from "@/components/PondIllustration";
import { chapters } from "@/data/chapters";
import { getProgress } from "@/lib/storage";

export default function ChaptersPage() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setCompleted(getProgress().completedChapterNumbers);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return chapters;
    const q = query.toLowerCase();
    return chapters.filter(
      (c) =>
        c.chapterTitle.toLowerCase().includes(q) ||
        c.themeName.toLowerCase().includes(q) ||
        String(c.chapterNumber).includes(q)
    );
  }, [query]);

  return (
    <>
      <AppHeader title="Lessons" />
      <div className="animate-fade-up space-y-5 px-4 pt-4 pb-4">
        <div className="card-elevated overflow-hidden rounded-3xl">
          <PondIllustration variant="banner" className="h-32 rounded-none" />
          <div className="p-5 text-center">
            <p className="section-label">The Book Journey</p>
            <h1 className="mt-1 font-serif text-2xl text-pond-900">All 50 Chapters</h1>
            <p className="mt-2 text-sm leading-relaxed text-ink/55">
              Read each lesson, understand the idea, and learn how to live it.
            </p>
          </div>
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chapters..."
          className="w-full rounded-2xl border border-mist bg-white/80 px-4 py-3.5 text-sm shadow-sm outline-none transition focus:border-pond-500/50 focus:ring-2 focus:ring-pond-500/10"
        />

        <p className="text-xs text-ink/40">
          {filtered.length} chapter{filtered.length !== 1 ? "s" : ""} ·{" "}
          {completed.length} reviewed
        </p>

        <div className="space-y-2.5">
          {filtered.map((chapter, i) => (
            <div
              key={chapter.chapterNumber}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i * 0.02, 0.3)}s` }}
            >
              <ChapterListItem
                chapter={chapter}
                completed={completed.includes(chapter.chapterNumber)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
