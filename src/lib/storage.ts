import type { ProgressState, ReflectionEntry } from "@/types";

const ENTRIES_KEY = "my-walden-pond-entries";
const PROGRESS_KEY = "my-walden-pond-progress";

const defaultProgress: ProgressState = {
  currentChapterNumber: 1,
  completedChapterNumbers: [],
  favoriteChapterNumbers: [],
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function getEntries(): ReflectionEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(ENTRIES_KEY);
    return raw ? (JSON.parse(raw) as ReflectionEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveEntry(entry: ReflectionEntry): void {
  const entries = getEntries();
  entries.unshift(entry);
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  updateProgressAfterSave(entry);
}

export function deleteEntry(id: string): void {
  const entries = getEntries().filter((e) => e.id !== id);
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

export function getEntryForDate(date: string): ReflectionEntry | undefined {
  return getEntries().find((e) => e.date === date);
}

export function getEntryById(id: string): ReflectionEntry | undefined {
  return getEntries().find((e) => e.id === id);
}

export function getProgress(): ProgressState {
  if (!isBrowser()) return defaultProgress;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? { ...defaultProgress, ...JSON.parse(raw) } : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: ProgressState): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function updateProgressAfterSave(entry: ReflectionEntry): void {
  const progress = getProgress();
  const completed = new Set(progress.completedChapterNumbers);
  completed.add(entry.chapterNumber);
  const nextChapter = Math.min(entry.chapterNumber + 1, 50);
  saveProgress({
    ...progress,
    currentChapterNumber: Math.max(progress.currentChapterNumber, nextChapter),
    completedChapterNumbers: Array.from(completed).sort((a, b) => a - b),
    lastReviewDate: entry.date,
  });
}

export function resetAllData(): void {
  localStorage.removeItem(ENTRIES_KEY);
  localStorage.removeItem(PROGRESS_KEY);
}

export function getCompletedChaptersForTheme(themeId: string): number[] {
  const progress = getProgress();
  return progress.completedChapterNumbers;
}
