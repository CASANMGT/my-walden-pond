import type { ReflectionEntry, WeeklySummary } from "@/types";
import { getEntriesFromLastDays } from "./date";

function mode(values: string[]): string | null {
  if (!values.length) return null;
  const counts = new Map<string, number>();
  for (const v of values) {
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  let best: string | null = null;
  let bestCount = 0;
  for (const [k, c] of counts) {
    if (c > bestCount) {
      best = k;
      bestCount = c;
    }
  }
  return best;
}

function avg(nums: number[]): number {
  if (!nums.length) return 0;
  return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10;
}

export function suggestPractice(
  mechanical: string | null,
  anchor: string | null
): string {
  if (mechanical === "Business metrics") {
    return "Spend ten minutes outside before checking numbers.";
  }
  if (mechanical === "Phone") {
    return "Keep the first fifteen minutes of the morning screen-free.";
  }
  if (mechanical === "Sleep worry") {
    return "Sit near dim light and name one natural thing before bed.";
  }
  if (mechanical === "Work") {
    return "Take a slow walk between tasks tomorrow.";
  }
  if (anchor === "Morning light") {
    return "Return to morning light for three days in a row.";
  }
  if (anchor === "Tree") {
    return "Stand near a tree for five minutes without your phone.";
  }
  if (anchor === "Water") {
    return "Let water — rain, a cup, a pond — steady you once today.";
  }
  return "Begin tomorrow with five minutes of stillness before the day rushes in.";
}

export function computeWeeklySummary(entries: ReflectionEntry[]): WeeklySummary {
  const recent = getEntriesFromLastDays(entries, 7) as ReflectionEntry[];
  const weekEntries = recent.filter((e) =>
    entries.some((full) => full.id === (e as ReflectionEntry).id)
  );
  const week = entries.filter((e) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    return e.date >= cutoff.toISOString().slice(0, 10);
  });

  const mostCommonMechanical = mode(week.map((e) => e.mechanicalArea));
  const mostCommonAnchor = mode(week.map((e) => e.naturalAnchor));

  return {
    reviewCount: week.length,
    mostCommonTheme: mode(week.map((e) => e.themeName)),
    mostCommonMechanical,
    mostCommonAnchor,
    avgMechanical: avg(week.map((e) => e.mechanicalScore)),
    avgNature: avg(week.map((e) => e.natureScore)),
    avgMargin: avg(week.map((e) => e.marginScore)),
    suggestedPractice: suggestPractice(mostCommonMechanical, mostCommonAnchor),
    days: week.map((e) => ({ date: e.date, themeName: e.themeName })),
  };
}
