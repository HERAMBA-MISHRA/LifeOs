# Paced

**Paced — Your Progress, Organised.**

A full-featured personal productivity dashboard built with React + Vite. Track your habits, todos, goals, journal, and weekly reviews — all in one beautifully designed dark-mode app.

## Features

- 📔 **Journal** — Daily entries with PIN lock security
- ✅ **Todos** — Tasks with priority levels and filtering
- 🔁 **Habits** — Weekly habit tracker with streaks
- 🎯 **Goals** — Progress tracking with milestones
- 📊 **Analytics** — Visual progress breakdowns
- 🗓️ **Weekly Review** — AI-powered weekly summaries
- 🤖 **AI Coach** — Claude-powered personalized coaching
- 🔒 **Authentication** — Secure login via Clerk

## Getting Started

1. Clone this repository
2. Run `npm install`
3. Create a `.env.local` file with your keys:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   ANTHROPIC_API_KEY=sk-ant-...
   ```
4. Run `npm run dev`

## Deployment

Configured for Vercel via `vercel.json`. The `/api/ai` serverless function handles all AI calls server-side, keeping your API keys secure.

## Build

```bash
npm run build
```
