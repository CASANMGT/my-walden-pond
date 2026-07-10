"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppShell";
import { WeeklyMap } from "@/components/WeeklyMap";
import { getEntries } from "@/lib/storage";
import { computeWeeklySummary } from "@/lib/weeklyReview";
import type { WeeklySummary } from "@/types";

const emptySummary: WeeklySummary = {
  reviewCount: 0,
  mostCommonTheme: null,
  mostCommonMechanical: null,
  mostCommonAnchor: null,
  avgMechanical: 0,
  avgNature: 0,
  avgMargin: 0,
  suggestedPractice: "Begin tomorrow with five minutes of stillness before the day rushes in.",
  days: [],
};

export default function MapPage() {
  const [summary, setSummary] = useState<WeeklySummary>(emptySummary);

  useEffect(() => {
    const entries = getEntries();
    setSummary(computeWeeklySummary(entries));
  }, []);

  return (
    <>
      <AppHeader title="Weekly Walden Map" />
      <WeeklyMap summary={summary} />
    </>
  );
}
