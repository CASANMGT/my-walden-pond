export function formatDisplayDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function toDateKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function getDayNumber(entriesCount: number): number {
  return entriesCount + 1;
}

export function getEntriesFromLastDays(
  entries: { date: string }[],
  days = 7
): { date: string }[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffKey = toDateKey(cutoff);
  return entries.filter((e) => e.date >= cutoffKey);
}
