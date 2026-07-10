# PRD: My Walden Pond

## Daily Review Web App for *The Cure at Walden Pond*

## 1. Product Overview

**Product name:** My Walden Pond  
**Product type:** Mobile-first web app  
**Purpose:** Help users learn and apply the lessons from *The Cure at Walden Pond* through daily micro-lessons, theme-based review, low-friction reflection, nature practices, and weekly insight summaries.

The app should feel like a quiet digital retreat: a calm pond inside the browser. It should not feel like a productivity dashboard, exam app, or heavy journal.

The book's central idea is that modern people can recover humanity by returning to simplicity, nature, deliberate living, imagination, and soulful attention. The app turns that idea into a daily practice.

---

## 2. Core Product Promise

The user should be able to open the app and complete a meaningful daily review in **3 to 7 minutes**.

Each session should help the user answer:

1. **What is my Walden Pond today?**
2. **What part of my life feels too mechanical?**
3. **What small natural thing can bring me back to myself?**

The user should not be forced to write long journal entries. Reflection should be possible through **tap-based choices**, sliders, and optional notes.

---

## 3. MVP Scope

Build a static, local-first web app.

### Must-have MVP features

1. Daily lesson card
2. 50 chapter-inspired review modules
3. 7 theme groups
4. Tap-based reflection options
5. Three sliders
6. Nature practice
7. Local journal saving using `localStorage`
8. Past entries screen
9. Weekly Walden Map
10. Markdown export
11. Mobile-first responsive design

### Do not build yet

- User login
- Cloud database
- AI companion
- Payments
- Social sharing
- Full book reader
- Long copyrighted book excerpts

---

## 4. Tech Stack

Use:

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **LocalStorage**
- **Lucide React icons**
- **No backend for MVP**

The app must run locally with:

```bash
npm install
npm run dev
```

---

## 5. App Structure

Recommended routes:

```txt
/
  Today page

/themes
  Theme library

/themes/[themeId]
  Theme detail page

/entries
  Past reflection entries

/map
  Weekly Walden Map

/settings
  Export, reset data, app info
```

Recommended folder structure:

```txt
src/
  app/
    page.tsx
    themes/page.tsx
    themes/[themeId]/page.tsx
    entries/page.tsx
    map/page.tsx
    settings/page.tsx

  components/
    AppShell.tsx
    BottomNav.tsx
    DailyLessonCard.tsx
    ReflectionOptions.tsx
    ReflectionSliders.tsx
    NaturePractice.tsx
    WeeklyMap.tsx
    EntryCard.tsx
    ThemeCard.tsx
    ProgressRing.tsx

  data/
    chapters.ts
    themes.ts
    options.ts

  lib/
    storage.ts
    weeklyReview.ts
    exportMarkdown.ts
    date.ts

  types/
    index.ts
```

---

## 6. Visual Design Direction

### Mood

Quiet, natural, reflective, warm, bookish.

### Design keywords

- Pond
- Paper
- Morning light
- Moss
- Wood
- Ink
- Field notes
- Soft ripples

### Color palette

Use Tailwind custom colors:

```ts
colors: {
  pond: {
    50: "#eef7f2",
    100: "#d9ecdf",
    500: "#2f6f57",
    700: "#1f4d3d",
    900: "#133026"
  },
  paper: "#fbf7ef",
  ink: "#26312d",
  mist: "#e7ece8",
  sunlight: "#e9c46a"
}
```

### UI rules

- Mobile-first
- Large readable text
- Rounded cards
- Soft shadows
- Warm paper background
- Minimal charts
- No harsh black
- No neon
- No aggressive gamification
- Gentle progress indicators only

---

## 7. Core User Flow

### Daily Path Flow

1. User opens app
2. Home shows today's chapter card
3. User reads short lesson
4. User chooses one learning takeaway
5. User selects today's Walden Pond
6. User selects mechanical life area
7. User selects natural anchor
8. User adjusts three sliders
9. User marks nature practice as done or saved
10. User optionally writes one sentence
11. User saves entry
12. App shows a soft completion message

Completion message example:

> Saved. Your pond is still here.

---

## 8. Home Page Requirements

The home page should show:

- App title: **My Walden Pond**
- Today's date
- Current chapter number out of 50
- Chapter title
- Theme label
- Core lesson
- Button: **Begin Today's Review**
- Secondary button: **Browse by Theme**
- Tiny progress indicator

Example hero copy:

```txt
Today's Walden

Chapter 12
A Broad Margin to My Life

Theme: Simplicity and Soul

Core lesson:
Rest is not wasted time. It is where the soul grows.
```

---

## 9. Daily Lesson Card

Each chapter card should contain:

| Field | Description |
|---|---|
| chapterNumber | Number from 1 to 50 |
| chapterTitle | Chapter title |
| theme | One of 7 themes |
| coreLesson | One-sentence lesson |
| bookInsight | Short original explanation |
| modernProblem | What modern life problem it addresses |
| dailyQuestion | One reflection question |
| learningOptions | Tap-based takeaway options |
| waldenOptions | Options for "my Walden Pond today" |
| mechanicalOptions | Options for "life feels mechanical" |
| natureOptions | Options for "natural thing that brings me back" |
| practice | One small nature or simplicity practice |
| mantra | One short phrase |

---

## 10. Data Model

### ChapterModule

```ts
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
};
```

### ReflectionEntry

```ts
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
```

### Theme

```ts
export type Theme = {
  id: string;
  name: string;
  coreQuestion: string;
  description: string;
  outcome: string;
  chapterNumbers: number[];
};
```

---

## 11. Theme Groups

Create 7 themes.

### 1. Nature as Medicine

**Core question:** Where is the living world trying to speak to me?

Related chapters:

- Blue Angels
- The Sacred Swamp
- The Civilized Apple Tree
- Walden in Eden
- The Cold Blood of the Gods
- Our Cousins the Cats
- Every Town Needs a Park
- The Poetry of Fish
- A Rich and Fertile Mystery
- A Fine Effluence

### 2. Simplicity and Soul

**Core question:** What can I remove so my soul has room?

Related chapters:

- Inorganic and Lumpish
- A Broad Margin to My Life
- The Sacred Art of Farming
- Organic Earth
- Soul Sculpting
- What Makes Me Rich

### 3. Living Deliberately

**Core question:** What is life asking me to choose today?

Related chapters:

- Fluttering
- The Sound of the Rooster
- Be Cold and Hungry
- My Own Sacraments
- Slight Impulses
- On Tiptoe
- The Walden Pond Society

### 4. Authenticity and Selfhood

**Core question:** Where am I becoming a copy instead of a person?

Related chapters:

- A Dose of Myself
- Dipped Toast
- Clodhopper that I Am
- Not Spiritual, But Natural
- Room for Thought

### 5. Imagination and the Sacred

**Core question:** What deeper meaning is hidden inside ordinary life?

Related chapters:

- Etherealized by a Mountain
- Consult Your Genius
- The Eyelids of the Day
- Dried Fungus
- A Respectable Distance
- My Inner Eastward Mountain
- Somewhere Between Me and Them

### 6. Work, Society, and Resistance

**Core question:** Where has society trained me to live against my soul?

Related chapters:

- The Apple Tree Building
- Filibustering Toward Heaven
- The Philosophy of Wood
- The Mouth of a Reptile
- A Village a University
- The Beasts Spoke

### 7. Friendship, Time, and Inner Weather

**Core question:** What is time, rupture, beauty, or emotion teaching me?

Related chapters:

- Accidents
- The Hoary Bloom
- The Heavens Withdraw
- I Am Stone
- Lapse of Time
- The Music of the World

---

## 12. Reflection Options

The app should provide default option chips.

### Walden Pond options

```ts
[
  "Quiet walk",
  "Balcony",
  "Tree",
  "Church or prayer corner",
  "Phone-free meal",
  "Reading chair",
  "Morning light",
  "Moment of silence",
  "Park bench",
  "Cup of tea",
  "Custom"
]
```

### Mechanical area options

```ts
[
  "Work",
  "Money",
  "Phone",
  "Sleep worry",
  "Health worry",
  "Business metrics",
  "Relationship",
  "Creativity",
  "Prayer without presence",
  "News",
  "Custom"
]
```

### Natural anchor options

```ts
[
  "Tree",
  "Rain",
  "Bird",
  "Water",
  "Wind",
  "Sky",
  "Sunlight",
  "Soil",
  "Flower",
  "Pet",
  "Cloud",
  "Custom"
]
```

When user selects **Custom**, show a small input field.

---

## 13. Sliders

Daily review must include three sliders from 1 to 5.

```txt
How mechanical do I feel today?
1 = not mechanical
5 = very mechanical

How connected to nature do I feel today?
1 = disconnected
5 = deeply connected

How much inner margin do I have today?
1 = no space
5 = spacious
```

Use simple labels. Avoid medical or diagnostic language.

---

## 14. Weekly Walden Map

Create a weekly review based on saved entries from the last 7 days.

Show:

- Number of reviews completed
- Most common theme
- Most common mechanical area
- Most common natural anchor
- Average mechanical score
- Average nature score
- Average margin score
- Suggested next practice

Example:

```txt
Your Week at the Pond

You completed 5 reviews.

Most common theme:
Simplicity and Soul

Most mechanical area:
Business metrics

Most healing natural anchor:
Morning light

Average scores:
Mechanical feeling: 4.2
Nature connection: 2.4
Inner margin: 2.0

Suggested next practice:
Begin tomorrow with morning light before checking your phone.
```

Suggestion logic:

```ts
if mechanicalArea === "Business metrics":
  suggest "Spend 10 minutes outside before checking numbers."

if mechanicalArea === "Phone":
  suggest "Keep the first 15 minutes of the morning screen-free."

if mechanicalArea === "Sleep worry":
  suggest "Sit near dim light and name one natural thing before bed."

if naturalAnchor === "Morning light":
  suggest "Return to morning light for three days in a row."
```

---

## 15. Local Storage

Use the key:

```ts
"my-walden-pond-entries"
```

Store an array of `ReflectionEntry`.

Also store user progress:

```ts
"my-walden-pond-progress"
```

Progress model:

```ts
export type ProgressState = {
  currentChapterNumber: number;
  completedChapterNumbers: number[];
  favoriteChapterNumbers: number[];
  lastReviewDate?: string;
};
```

---

## 16. Markdown Export

Settings page should include button:

**Export My Reflections**

The export should generate a `.md` file.

Markdown format:

```md
# My Walden Pond Reflections

## 2026-07-10

Chapter 12: A Broad Margin to My Life  
Theme: Simplicity and Soul

Learning takeaway: Make room for silence  
My Walden Pond today: Morning light  
Mechanical area: Business metrics  
Natural anchor: Tree  

Scores:
- Mechanical feeling: 4/5
- Nature connection: 2/5
- Inner margin: 1/5

Practice completed: Yes

Note:
I checked numbers too early today.
```

---

## 17. Theme Library Page

The `/themes` page should show 7 cards.

Each card includes:

- Theme name
- Core question
- Short description
- Number of related chapters
- Progress count

Example:

```txt
Nature as Medicine

Where is the living world trying to speak to me?

Nature is not background scenery. It can heal loneliness, restore wonder, and return us to ourselves.

10 chapters
3 completed
```

---

## 18. Theme Detail Page

The `/themes/[themeId]` page should show:

- Theme name
- Description
- Core question
- User outcome
- Related chapter list
- Completion status for each chapter
- Button: **Start this theme**

Clicking a chapter should open that chapter in daily review mode.

---

## 19. Entries Page

The `/entries` page should show saved reflections.

Each entry card includes:

- Date
- Chapter title
- Theme
- Walden Pond answer
- Mechanical area
- Natural anchor
- Scores
- Optional note

Allow user to delete an entry.

---

## 20. Settings Page

Settings page includes:

- Export markdown
- Reset all data
- App description
- Copyright note

Reset must require confirmation:

```txt
Are you sure you want to delete all saved reflections? This cannot be undone.
```

---

## 21. Content Requirements

Create a `chapters.ts` file with all 50 chapter modules.

Each module should use **original wording**, not long excerpts from the book.

Example chapter module:

```ts
{
  chapterNumber: 12,
  chapterTitle: "A Broad Margin to My Life",
  themeId: "simplicity-soul",
  themeName: "Simplicity and Soul",
  coreLesson: "Rest is not wasted time.",
  bookInsight: "Moore reflects on Thoreau's broad margin as sacred leisure, a space where the soul can grow beyond productivity.",
  modernProblem: "We confuse busyness with meaning and worth.",
  dailyQuestion: "Where am I confusing busyness with meaning?",
  learningOptions: [
    "Slow down",
    "Make room for silence",
    "Stop proving myself",
    "Let rest become sacred"
  ],
  waldenOptions: [
    "Quiet walk",
    "Reading chair",
    "Morning light",
    "Phone-free meal"
  ],
  mechanicalOptions: [
    "Work",
    "Phone",
    "Business metrics",
    "Sleep worry"
  ],
  natureOptions: [
    "Morning light",
    "Tree",
    "Wind",
    "Sky"
  ],
  practice: "Sit for 10 minutes without phone, book, or agenda.",
  mantra: "Empty space is not empty.",
  rescueTags: [
    "overworked",
    "too busy",
    "disconnected"
  ]
}
```

For chapters where full detail is not yet available, create thoughtful original placeholder lessons based on the chapter title and theme. Do not fabricate quotes.

---

## 22. Copyright Rules

This app must not reproduce the full book.

Allowed:

- Chapter titles
- Original summaries
- Original reflection prompts
- Short thematic explanations
- User's personal notes

Avoid:

- Full chapters
- Long excerpts
- Scanned pages
- "Read full book inside app"
- Long direct quotations

Position the app as:

```txt
A personal study and daily reflection companion inspired by The Cure at Walden Pond.
```

---

## 23. Acceptance Criteria

The MVP is complete when:

1. App runs locally with `npm run dev`
2. User can complete a daily review
3. Review can be saved without typing
4. Saved review appears in Entries page
5. Weekly Walden Map updates based on saved entries
6. Theme library displays all 7 themes
7. Theme detail pages show related chapters
8. Markdown export works
9. Reset data works
10. App is usable on mobile screen width
11. No backend is required
12. No full copyrighted text is included

---

## 24. UX Writing Tone

Use calm, simple, reflective language.

Good examples:

```txt
Begin today's review
Saved. Your pond is still here.
Choose one thing that brings you back.
Where did life feel mechanical today?
What natural thing can steady you?
```

Avoid:

```txt
Crush your goals
Maximize your mindfulness
Unlock productivity
Optimize your soul
Daily performance score
```

---

## 25. Cursor Build Prompt

Paste this into Cursor after adding the PRD:

```txt
Build the MVP described in PRD.md.

Use Next.js, TypeScript, Tailwind CSS, localStorage, and Lucide React icons.

Create a mobile-first web app called My Walden Pond.

Implement:
1. Today page with daily chapter lesson and review flow
2. Tap-based reflection options
3. Three sliders
4. Save entry to localStorage
5. Entries page
6. Theme library page
7. Theme detail pages
8. Weekly Walden Map page
9. Settings page with markdown export and reset data

Use original chapter summaries and prompts. Do not include long book excerpts.

Make the design calm, warm, natural, and minimal using pond green, paper ivory, mist gray, and charcoal text.

Use clean reusable components and TypeScript types.
```

---

## 26. Final Product Loop

The core loop is:

```txt
Learn -> Choose -> Notice -> Practice -> Save -> Review
```

That is the heart of the app.

Not another dashboard.  
Not another journal burden.  
A small daily pond where the user remembers they are still human.
