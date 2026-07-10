import type { Theme } from "@/types";

export const themes: Theme[] = [
  {
    id: "nature-medicine",
    name: "Nature as Medicine",
    coreQuestion: "Where is the living world trying to speak to me?",
    description:
      "Nature is not background scenery. It can heal loneliness, restore wonder, and return us to ourselves.",
    outcome: "You learn to receive the living world as teacher and companion.",
    chapterNumbers: [1, 6, 11, 14, 16, 18, 32, 33, 38, 41, 50],
  },
  {
    id: "simplicity-soul",
    name: "Simplicity and Soul",
    coreQuestion: "What can I remove so my soul has room?",
    description:
      "Simplicity is not deprivation. It is making space for what the soul actually needs.",
    outcome: "You discover that less can make room for depth.",
    chapterNumbers: [4, 12, 13, 29, 42, 47],
  },
  {
    id: "living-deliberately",
    name: "Living Deliberately",
    coreQuestion: "What is life asking me to choose today?",
    description:
      "Deliberate living means choosing with attention rather than drifting on habit.",
    outcome: "You practice small choices that align with your true life.",
    chapterNumbers: [2, 5, 15, 34, 43, 44, 46],
  },
  {
    id: "authenticity-selfhood",
    name: "Authenticity and Selfhood",
    coreQuestion: "Where am I becoming a copy instead of a person?",
    description:
      "Authenticity is returning to your own nature rather than performing someone else's.",
    outcome: "You reclaim the person you are beneath the performance.",
    chapterNumbers: [7, 10, 17, 39, 40],
  },
  {
    id: "imagination-sacred",
    name: "Imagination and the Sacred",
    coreQuestion: "What deeper meaning is hidden inside ordinary life?",
    description:
      "Imagination opens the sacred in the everyday — mountains within, mystery near.",
    outcome: "You learn to see through the azure veil of ordinary things.",
    chapterNumbers: [3, 9, 20, 26, 28, 31, 35, 49],
  },
  {
    id: "work-society",
    name: "Work, Society, and Resistance",
    coreQuestion: "Where has society trained me to live against my soul?",
    description:
      "Resistance is not rebellion for its own sake — it is protecting the human scale of life.",
    outcome: "You notice where systems diminish you and choose differently.",
    chapterNumbers: [19, 25, 30, 36, 37, 45, 48],
  },
  {
    id: "friendship-time",
    name: "Friendship, Time, and Inner Weather",
    coreQuestion: "What is time, rupture, beauty, or emotion teaching me?",
    description:
      "Inner weather shifts like seasons. Friendship and time teach presence and patience.",
    outcome: "You learn to live with time rather than against it.",
    chapterNumbers: [8, 21, 22, 23, 24, 27],
  },
];

export function getThemeById(id: string): Theme | undefined {
  return themes.find((t) => t.id === id);
}
