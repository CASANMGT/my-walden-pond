export type ChapterModule = {
  chapterNumber: number;
  chapterTitle: string;
  themeId: string;
  themeName: string;
  coreLesson: string;
  bookInsight: string;
  modernProblem: string;
  dailyQuestion: string;
  learningOptions: string[];
  waldenOptions: string[];
  mechanicalOptions: string[];
  natureOptions: string[];
  practice: string;
  mantra: string;
  rescueTags: string[];
  explanation: string;
  lifeImplementation: string;
  implementationSteps: string[];
};

export type ReflectionEntry = {
  id: string;
  date: string;
  chapterNumber: number;
  chapterTitle: string;
  themeId: string;
  themeName: string;
  learningTakeaway: string;
  waldenPondToday: string;
  mechanicalArea: string;
  naturalAnchor: string;
  mechanicalScore: number;
  natureScore: number;
  marginScore: number;
  practiceCompleted: boolean;
  optionalNote?: string;
  createdAt: string;
};

export type Theme = {
  id: string;
  name: string;
  coreQuestion: string;
  description: string;
  outcome: string;
  chapterNumbers: number[];
};

export type ProgressState = {
  currentChapterNumber: number;
  completedChapterNumbers: number[];
  favoriteChapterNumbers: number[];
  lastReviewDate?: string;
};

export type ReviewStep =
  | "lesson"
  | "learning"
  | "walden"
  | "mechanical"
  | "nature"
  | "sliders"
  | "practice"
  | "complete";

export type WeeklySummary = {
  reviewCount: number;
  mostCommonTheme: string | null;
  mostCommonMechanical: string | null;
  mostCommonAnchor: string | null;
  avgMechanical: number;
  avgNature: number;
  avgMargin: number;
  suggestedPractice: string;
  days: { date: string; themeName: string }[];
};

export type ReminderSettings = {
  enabled: boolean;
  time: string;
  lastNotifiedDate?: string;
};
