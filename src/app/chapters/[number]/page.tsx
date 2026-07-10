"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Leaf,
  Lightbulb,
  ListChecks,
  Sun,
} from "lucide-react";
import { getChapterByNumber } from "@/data/chapters";
import { getProgress } from "@/lib/storage";
import { PondIllustration } from "@/components/PondIllustration";
import { LessonChecklist, QuoteBlock } from "@/components/QuoteBlock";
import { ThemeIcon } from "@/components/ThemeIcon";

export default function ChapterDetailPage() {
  const params = useParams();
  const num = Number(params.number);
  const chapter = getChapterByNumber(num);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (chapter) {
      setCompleted(
        getProgress().completedChapterNumbers.includes(chapter.chapterNumber)
      );
    }
  }, [chapter]);

  if (!chapter) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-ink/60">Chapter not found.</p>
        <Link href="/chapters" className="mt-4 inline-block text-pond-700 underline">
          Back to lessons
        </Link>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-mist/70 bg-paper/92 px-4 py-3 backdrop-blur-lg">
        <Link
          href="/chapters"
          className="flex items-center gap-2 text-sm text-ink/55"
        >
          <ArrowLeft className="h-4 w-4" />
          All Lessons
        </Link>
      </header>

      <article className="animate-fade-up space-y-6 px-4 py-5">
        <div className="card-elevated overflow-hidden rounded-3xl">
          <PondIllustration variant="banner" className="rounded-none" />

          <div className="space-y-5 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="h-3.5 w-3.5 text-sunlight" />
                <span className="section-label">Chapter {chapter.chapterNumber}</span>
              </div>
              {completed && (
                <span className="flex items-center gap-1 rounded-full bg-pond-50 px-2 py-0.5 text-xs text-pond-700">
                  <Check className="h-3 w-3" />
                  Reviewed
                </span>
              )}
            </div>

            <div>
              <h1 className="font-serif text-2xl leading-tight text-pond-900">
                {chapter.chapterTitle}
              </h1>
              <Link
                href={`/themes/${chapter.themeId}`}
                className="mt-2 inline-flex items-center gap-1.5 text-sm italic text-moss hover:underline"
              >
                <ThemeIcon themeId={chapter.themeId} className="h-3.5 w-3.5" />
                {chapter.themeName}
              </Link>
            </div>

            <QuoteBlock quote={chapter.coreLesson} />
            <LessonChecklist items={chapter.learningOptions.slice(0, 3)} />
          </div>
        </div>

        <section className="card-elevated animate-fade-up stagger-1 rounded-2xl p-5">
          <div className="mb-3 flex items-center gap-2 text-moss">
            <Lightbulb className="h-4 w-4 text-sunlight" strokeWidth={1.5} />
            <h2 className="section-label">Explanation</h2>
          </div>
          <p className="text-sm leading-[1.75] text-ink/80">{chapter.explanation}</p>
          <p className="mt-4 border-t border-mist/80 pt-4 text-sm leading-[1.75] text-ink/65 italic">
            {chapter.bookInsight}
          </p>
        </section>

        <section className="animate-fade-up stagger-2 rounded-2xl border border-pond-700/10 bg-gradient-to-br from-pond-50/80 to-mist/40 p-5">
          <div className="mb-3 flex items-center gap-2 text-pond-700">
            <Leaf className="h-4 w-4" strokeWidth={1.5} />
            <h2 className="section-label text-pond-700">How to Live This Lesson</h2>
          </div>
          <p className="text-sm leading-[1.75] text-ink/80">
            {chapter.lifeImplementation}
          </p>
        </section>

        <section className="card-elevated animate-fade-up stagger-3 rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2 text-moss">
            <ListChecks className="h-4 w-4" strokeWidth={1.5} />
            <h2 className="section-label">Practical Steps</h2>
          </div>
          <ol className="space-y-3">
            {chapter.implementationSteps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-ink/80">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pond-700 font-serif text-xs text-white">
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="quote-card animate-fade-up stagger-4">
          <p className="section-label relative z-10 pl-6">Reflection Prompt</p>
          <p className="relative z-10 mt-2 pl-6 font-serif text-lg leading-relaxed text-pond-900">
            {chapter.dailyQuestion}
          </p>
          <p className="relative z-10 mt-3 pl-6 text-xs text-moss">
            Mantra — {chapter.mantra}
          </p>
        </section>

        <div className="animate-fade-up stagger-4 space-y-3 pb-6">
          <Link
            href={`/review?chapter=${chapter.chapterNumber}`}
            className="btn-primary"
          >
            <Leaf className="h-4 w-4" />
            Begin Daily Review
          </Link>
          {chapter.chapterNumber < 50 && (
            <Link
              href={`/chapters/${chapter.chapterNumber + 1}`}
              className="btn-secondary"
            >
              Next Chapter
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </article>
    </>
  );
}
