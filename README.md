# LiveWell by James Bell

The writing and resource platform of James C. Bell — pastor, author of 25 books, founder of the Pastors Connection Network. Production site: [livewellbyjamesbell.co](https://www.livewellbyjamesbell.co).

> American Christianity has domesticated Jesus. This is an attempt to recover what we've lost.

## What this repo is

A React + tRPC application deployed on Vercel that hosts:

- 880+ essays on faith, pastoral ministry, marriage, justice, and the Christian life
- A theology positioning quiz
- Reading paths for pastors, leaders, families, and seekers
- Resources, kits, and books store
- Lead magnets and an email list
- An admin surface for moderation, notifications, and content management

## Architecture

- **Client**: React + Vite + Wouter routing + TailwindCSS, in `client/`
- **Server**: Vercel serverless function in `api/index.ts` with self-contained DB access (mysql2), tRPC routers in `server/`, OAuth, and admin seed endpoints
- **Database**: MySQL via Drizzle ORM, schema in `drizzle/` and `shared/`
- **Hosting**: Vercel project `livewell-tn9v`, domain `livewellbyjamesbell.co` (apex 308 → `www.livewellbyjamesbell.co`)
- **Build**: `pnpm run build` produces `dist/public` for static assets; serverless runtime serves the API

## Local development

```
pnpm install
pnpm run dev
```

Required environment variables (set in Vercel for production, in `.env.local` for dev):

- `DATABASE_URL` — MySQL connection string
- `JWT_SECRET` — used by both auth and admin seed endpoints
- `NODE_ENV`

Optional, for full feature parity (not required to boot):

- `MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID` — email capture
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` — paid resources and books
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET` — file uploads
- `SESSION_SECRET` — cookie sessions

## Deployment

Push to `main` triggers an automatic Vercel deploy. Branch deploys are previewed on PRs.

To verify a deploy:

```
curl https://www.livewellbyjamesbell.co/api/health
```

## Repository status

This repo (`Livewell-`) is the canonical source of truth as of April 2026. The lowercase `livewell` repository was an incomplete migration attempt; relevant improvements have been cherry-picked here and the lowercase repo will be archived.

## Voice and editorial standards

All content on this site follows a specific editorial voice. See `docs/VOICE.md` (forthcoming) for the full guide. Short version: prophetic and direct, pastoral and warm, intellectually curious, vulnerable. Name the problem, reframe with theological depth, end with costly hope. No platitudes, no therapy-speak, no AI-style padding.
