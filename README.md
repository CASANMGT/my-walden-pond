# My Walden Pond

A mobile-first daily reflection web app inspired by *The Cure at Walden Pond* by Thomas Moore.

Quiet, natural, and local-first — complete a meaningful daily review in 3–7 minutes.

## Features

- **Today's Walden** — daily chapter lesson with original summaries
- **Daily Review** — tap-based choices, sliders, nature practice, optional note
- **50 chapters** across 7 themes from the book
- **Entries** — browse and search saved reflections
- **Weekly Walden Map** — patterns, scores, and gentle guidance
- **Markdown export** — your data stays on your device
- **No backend** — everything saved in `localStorage`

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Lucide React icons

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click Deploy

Or use the CLI:

```bash
npm i -g vercel
vercel
```

## Deploy to GitHub

```bash
git init
git add .
git commit -m "Initial commit: My Walden Pond MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-walden-pond.git
git push -u origin main
```

## Copyright

This app uses original summaries and reflection prompts. It does not reproduce the full book. Chapter titles are used for personal study purposes only.

---

*"Simplify, simplify."* — Henry David Thoreau
