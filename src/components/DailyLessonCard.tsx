import type { ChapterModule } from "@/types";
import { BookOpen, Leaf, Sun } from "lucide-react";
import Link from "next/link";
import { PondIllustration } from "./PondIllustration";
import { LessonChecklist, QuoteBlock } from "./QuoteBlock";

type Props = {
  chapter: ChapterModule;
  dayNumber: number;
  streak: number;
  hasReviewToday: boolean;
};

export function DailyLessonCard({
  chapter,
  dayNumber,
  streak,
  hasReviewToday,
}: Props) {
  return (
    <div className="animate-fade-up space-y-6 px-4 pt-5">
      <div className="text-center">
        <p className="section-label">Today&apos;s Walden</p>
        <p className="mt-1 font-serif text-2xl text-pond-900">Today&apos;s Walden</p>
        <p className="mt-0.5 text-sm text-ink/50">{dayNumber} days at the pond</p>
      </div>

      <article className="card-elevated animate-fade-up stagger-1 overflow-hidden rounded-3xl">
        <div className="flex justify-center px-6 pt-6 pb-2">
          <PondIllustration variant="circle" />
        </div>

        <div className="space-y-5 px-5 pb-5">
          <div className="flex items-center justify-center gap-2 text-moss">
            <Sun className="h-3.5 w-3.5 text-sunlight" strokeWidth={2} />
            <span className="section-label">Daily Lesson</span>
          </div>

          <div className="text-center">
            <p className="text-xs font-medium tracking-wide text-ink/45">
              CHAPTER {chapter.chapterNumber}
            </p>
            <h1 className="mt-1 font-serif text-2xl leading-tight text-pond-900">
              {chapter.chapterTitle}
            </h1>
            <p className="mt-1.5 text-sm italic text-moss">
              Theme: {chapter.themeName}
            </p>
          </div>

          <QuoteBlock quote={chapter.coreLesson} />

          <LessonChecklist items={chapter.learningOptions.slice(0, 3)} />

          {streak > 0 && (
            <div className="rounded-xl bg-mist/50 px-4 py-3">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-ink/50">Daily Streak</span>
                <span className="font-medium text-pond-700">{streak} Days</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/80">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pond-500 to-sunlight transition-all"
                  style={{ width: `${Math.min(streak * 8, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </article>

      <div className="animate-fade-up stagger-2 space-y-3 pb-6">
        <Link href={`/review?chapter=${chapter.chapterNumber}`} className="btn-primary">
          <Leaf className="h-4 w-4" />
          {hasReviewToday ? "Review Again" : "Begin Today's Review"}
        </Link>
        <Link href="/themes" className="btn-secondary">
          <BookOpen className="h-4 w-4" />
          Browse by Theme
        </Link>
        <Link
          href="/chapters"
          className="flex w-full items-center justify-center py-2 text-sm text-moss transition hover:text-pond-700"
        >
          View all 50 chapters
        </Link>
      </div>
    </div>
  );
}
