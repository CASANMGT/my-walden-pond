export type ReleaseNote = {
  version: string;
  date: string;
  title: string;
  added: string[];
  changed?: string[];
};

export const releases: ReleaseNote[] = [
  {
    version: "1.2.0",
    date: "2026-07-10",
    title: "Onboarding, journal editing & weekly preview",
    added: [
      "3-screen welcome onboarding for first-time visitors",
      "One review per day with view-today and review-again options",
      "Weekly map preview card on Today after 2 reflections",
      "Edit reflections — scores, answers, notes, and practice",
      "Delete reflections from the journal list",
      "Modern problem hooks on chapters and outcomes on themes",
    ],
  },
  {
    version: "1.1.1",
    date: "2026-07-10",
    title: "In-app version & release notes",
    added: [
      "About & Version page with full release history",
      "What's new banner when the app updates",
      "Version badge in menu and settings",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-07-10",
    title: "Lessons, offline mode & reminders",
    added: [
      "All 50 chapters with explanations and life-application steps",
      "Entry detail page with per-entry Markdown export",
      "Side menu and daily reminder notifications",
      "Offline-first PWA — works without internet after first load",
      "Visual refresh with pond illustrations and quote cards",
    ],
    changed: [
      "Navigation: Today, Lessons, Journal, Themes, Profile",
      "Journal entries open to a full detail view",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-07-10",
    title: "First pond",
    added: [
      "Daily lesson and 6-step review flow",
      "Seven themes and weekly Walden Map",
      "Local journal with Markdown export",
      "Mobile-first design",
    ],
  },
];

export function getLatestRelease(): ReleaseNote {
  return releases[0];
}

export function getRelease(version: string): ReleaseNote | undefined {
  return releases.find((r) => r.version === version);
}
