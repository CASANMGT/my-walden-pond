"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppShell";
import { DailyLessonCard } from "@/components/DailyLessonCard";
import { WeeklyMapPreview } from "@/components/WeeklyMapPreview";
import { WhatsNewBanner } from "@/components/WhatsNewBanner";
import { getChapterByNumber } from "@/data/chapters";
import { getEntries, getEntryForDate, getProgress } from "@/lib/storage";
import { computeWeeklySummary } from "@/lib/weeklyReview";
import { formatDisplayDate, toDateKey } from "@/lib/date";

export default function TodayPage() {
  const [mounted, setMounted] = useState(false);
  const [chapterNum, setChapterNum] = useState(1);
  const [streak, setStreak] = useState(0);
  const [hasReviewToday, setHasReviewToday] = useState(false);
  const [todayEntryId, setTodayEntryId] = useState<string | null>(null);
  const [reflectionCount, setReflectionCount] = useState(0);
  const [showWeeklyPreview, setShowWeeklyPreview] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(() =>
    computeWeeklySummary([])
  );

  useEffect(() => {
    const progress = getProgress();
    const entries = getEntries();
    const today = toDateKey();
    const todayEntry = getEntryForDate(today);
    setChapterNum(progress.currentChapterNumber || 1);
    setHasReviewToday(!!todayEntry);
    setTodayEntryId(todayEntry?.id ?? null);
    setReflectionCount(entries.length);
    setWeeklySummary(computeWeeklySummary(entries));
    setShowWeeklyPreview(entries.length >= 2);
    const dates = new Set(entries.map((e) => e.date));
    let s = 0;
    const d = new Date();
    while (dates.has(toDateKey(d))) {
      s++;
      d.setDate(d.getDate() - 1);
    }
    setStreak(s);
    setMounted(true);
  }, []);

  const chapter = getChapterByNumber(chapterNum) ?? getChapterByNumber(1)!;

  if (!mounted) {
    return (
      <>
        <AppHeader />
        <div className="flex h-64 items-center justify-center text-sm text-ink/40">
          Loading your pond...
        </div>
      </>
    );
  }

  return (
    <>
      <AppHeader />
      <WhatsNewBanner />
      <p className="px-4 pt-2 text-xs text-ink/50">{formatDisplayDate()}</p>
      <DailyLessonCard
        chapter={chapter}
        reflectionCount={reflectionCount}
        streak={streak}
        hasReviewToday={hasReviewToday}
        todayEntryId={todayEntryId}
      />
      {showWeeklyPreview && (
        <div className="px-4 pb-6">
          <WeeklyMapPreview summary={weeklySummary} />
        </div>
      )}
    </>
  );
}
