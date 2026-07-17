# Recovery, Backup & Incident Runbook (L9)

> Gap-closing program, Prompt L9 — the #1 gap L0 named: a revenue-bearing,
> content-rich site with no documented way to back up, roll back, or pull a piece
> down. This is the proportionate runbook for a small operation, plus the fix for
> the emergency-unpublish bug the audit uncovered.

## The finding this wave FIXED: emergency unpublish was broken

**Before:** the admin "Unpublish (never delete)" action set `published=false`,
which removed a piece from listings and search — but the URL resolver
(`trpcGetPost` in prod, `getPostBySlug` in dev) queried by slug **with no
`published` filter**, so the essay stayed **fully readable at `/writing/:slug`**.
On a platform that writes on abuse, politics, and pastoral crisis, the takedown
button was a false comfort: a piece pulled for legal or pastoral reasons was
still one link away.

**Fixed this wave (both runtimes):** an unpublished post now 404s at its direct
URL, and prod no longer falls through to the static library for a taken-down
slug (which would have resurfaced the copy). Verified: tsc clean both runtimes,
api-parity 2/2, server suite 232 passed. **Caveat (launch-gate finding):** the
404 covers the *dynamic* resolver; the build-time prerendered static HTML for
the slug keeps serving the full text until the next deploy — see step 3 of the
procedure below.

**The takedown is now complete** (both levers shipped):
- **DB essays** — the admin `published=false` (above), honored at the URL and in
  listings/search.
- **Static-only essays** — a committed `TAKEN_DOWN` slug blocklist in
  `api/index.ts`, honored by `mergeWithStatic` (drops it from listings) and
  `staticBySlugOrId` (404s the URL). Empty by default (no-op); it only ever
  removes content, and the static library is prod-only so there is no dev
  parity to mirror.

### Emergency-unpublish procedure (both levers)
To hard-pull an essay, belt and suspenders:
1. If it has a DB row: Admin → Content → the essay → **Unpublish** (404s the
   dynamic URL, drops from listings/search).
2. Add its slug to the `TAKEN_DOWN` set in `api/index.ts` and deploy — this pulls
   it from the static-served listings and URL regardless of DB state, and is the
   *only* lever for a static-only essay.
3. **Redeploy — not optional.** The build bakes each essay's FULL TEXT into a
   prerendered static file (`scripts/prerender-heads.mjs` →
   `dist/public/writing/<slug>/index.html`), and Vercel serves that static file
   until the next deploy. A DB unpublish alone leaves the complete essay
   readable in the raw HTML (and to crawlers). Step 2's deploy covers this; if
   you only did step 1, trigger a redeploy anyway (an empty commit or the
   Vercel "Redeploy" button both work — the DB-driven prerender skips
   unpublished rows at build time).
4. Purge the CDN cache for that path if immediacy matters.

For a safety/legal emergency, do step 2 first (one commit + deploy pulls it
everywhere, including the prerendered file) and review after. **No takedown is
complete until a deploy has run after it.**

Known P2 residue: `scripts/generate-sitemap.mjs` merges the static library
without consulting `TAKEN_DOWN`, so a taken-down static slug stays listed in
sitemap.xml (the URL 404s once deployed). Fix path: extract the blocklist to a
shared file both consume.

## Backup surfaces

| Surface | Backup today | Gap |
| :--- | :--- | :--- |
| Code + content-as-data | Git / GitHub (full history) | VERIFIED — the essays, libraries, redirects all live in git |
| Static essay library | committed `content/static-library.generated.json` | VERIFIED — 584 essays survive a total DB loss |
| MySQL (DB) — posts, subscribers, settings | **HUMAN-ONLY — unconfirmed** | the one real gap; see below |
| Media (covers, headshots) | git (`client/public`) | VERIFIED |
| Redirects | `vercel.json` in git | VERIFIED |
| Env vars | Vercel dashboard | inventory the *names* in git; values are HUMAN-ONLY |

**The DB is the exposure.** Subscribers and any admin-edited post bodies live only
in MySQL. Confirm the provider's automated backup (frequency, retention, who holds
restore access) and set an RPO/RTO you can live with. Do not call the DB backed
up until a restore has been tested — a backup no one has restored is a hope.

## Rollback

- **Instant, code:** Vercel keeps every prior production deploy. Promote the last
  good one from the dashboard (or `vercel rollback`) — seconds, no rebuild. This
  is the first move for any bad deploy.
- **Source:** `git revert` the offending commit and push; CI redeploys.
- **Content:** an admin content mistake is reverted in the admin or by re-running
  the publish bridge from the committed static library (fill-only, never
  destructive).

## Monitoring (largely ABSENT — recommend)

Present: Vercel build/deploy status, Vercel Analytics, the CI gate chain.
Absent, and worth adding (each needs a named owner and a real destination):
uptime check on the core routes; broken-link / 404 trend; form + newsletter
submission-failure alert; TLS-certificate expiry; a post-deploy smoke check of a
handful of routes. Start with uptime + the newsletter-failure alert; the rest can
follow.

## Incident runbooks (detect → contain → restore → verify)

- **Site down:** check Vercel status → if a bad deploy, roll back instantly →
  verify core routes → note cause.
- **Bad deploy (renders, but wrong):** roll back, then fix forward on a branch.
- **Form / newsletter failing:** check the provider + `DATABASE_URL`; the signup
  is best-effort by design (the Substack handoff still works), so contain by
  confirming the handoff, then fix the write path.
- **Wrong or sensitive content published:** the emergency-unpublish procedure
  above; purge cache; if it is a safety/legal matter, pull first and review after.
- **Credential compromise suspected:** rotate the affected secret in Vercel,
  redeploy, audit access. Never commit secrets; this runbook names none.
- **Provider outage (Vercel / MySQL / Mailchimp / Stripe):** the site degrades
  gracefully (static library serves essays without the DB); wait out or fail over
  per that provider's status.

## What remains human / owner
Confirm the DB backup + run one restore drill; name the alert owners; decide the
`TAKEN_DOWN` blocklist + listing-merge exclusion (the residual takedown work).
