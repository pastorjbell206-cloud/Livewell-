# Audit 1.10 — Analytics & Instrumentation

> You can't improve what you don't measure. This audit inventories every
> instrument the platform has today (with file:line evidence), measures it
> against the platform's own definition of success (CLAUDE.md, "What Success
> Looks Like": essays finished, reading paths completed, skeptics returning,
> pastors sharing, books bought), and defines a minimal, privacy-respecting
> plan to close the gap.

**Date:** 2026-07-01
**Verdict up front:** The site currently measures **nothing**. Two analytics
packages are installed and never mounted. A server-side analytics router
exists, is called by no client code, stores events in an in-memory array, and
returns `Math.random()` for bounce rate and time-on-page. Book purchases are
written as `pending` and never confirmed — there is no Stripe webhook. The
owner's dashboard shows three numbers, all of them content inventory counts.
For a platform whose success is defined behaviorally (finished, returned,
shared, bought), there is not one behavioral signal being recorded.

---

## 1. What exists (inventory)

### 1.1 Client-side analytics

**Installed, never mounted.** `@vercel/analytics@^2.0.1` and
`@vercel/speed-insights@^2.0.0` are dependencies
(`/home/user/Livewell-/package.json:65,67`), but neither `<Analytics />` nor
`<SpeedInsights />` is rendered anywhere. `client/src/main.tsx` (read in full,
lines 1–65) mounts only the tRPC/Query providers and `<App />`; a repo-wide
grep for `vercel/analytics`, `vercel/speed`, `<Analytics`, `<SpeedInsights`
returns zero hits in any `.tsx/.ts/.html/.js/.mjs` file. The packages are dead
weight in `node_modules`; **no pageviews, no uniques, no Core Web Vitals are
being captured**.

What they *would* capture if mounted: Vercel Web Analytics records pageviews
and approximate unique visitors **cookielessly** (visitors are identified by a
short-lived server-side hash of incoming request attributes, not a client
identifier — no cookie, no localStorage, no cross-site tracking, generally no
consent banner required). Speed Insights records real-user Core Web Vitals
(LCP, CLS, INP, TTFB) per route, also without cookies.

**No third-party trackers.** Greps for `plausible`, `posthog`, `fathom`,
`gtag`, `google-analytics` across `client/src` and `client/index.html` return
nothing. `client/index.html` contains no analytics `<script>`. The site is
clean — which is the right starting posture, but currently it is clean *and
blind*.

**One custom event, dispatched into the void.** The newsletter components
dispatch a browser `CustomEvent("newsletter_signup")`:
- `client/src/components/SegmentedSignup.tsx:80-88` — dispatches
  `newsletter_signup` with `{ audience, email }` and stashes the audience
  segment in `localStorage` (`livewell:audience`).
- `client/src/components/NewsletterSignup.tsx:57` — dispatches
  `newsletter_signup` with `{ source }`.

Nothing anywhere adds an event listener for `newsletter_signup` (grep: only
the two dispatch sites match). The event is a hook for an analytics layer that
was never built. Note also that `SegmentedSignup` puts the **email address**
in the event detail — if a generic analytics listener is ever attached, that
becomes accidental PII capture; the segment is the useful part, not the email.

**No `track(` calls.** The only `track` matches in `client/src` are the
taxonomy helpers `pillarToTrack`/`resolveTrack`
(`client/src/lib/taxonomy.ts:208,215`) — content routing, not analytics.

### 1.2 Server-side: the analyticsRouter (dead code with fabricated numbers)

`server/analytics-router.ts` (mounted at `server/routers.ts:53` as
`analytics:`) exposes six procedures: `trackView`, `trackConversion` (types:
`email_signup | lead_magnet_download | book_purchase | reading_path_start`),
`getMetrics`, `getTrending`, `getConversionFunnel`, `getReferrals`
(`server/analytics-router.ts:14-79`). Three problems, in ascending severity:

1. **No caller.** Grep for `trpc.analytics` across `client/src`: zero matches.
   No client code has ever invoked it. Consistently, it is absent from
   `api/index.ts` and `KNOWN_PROD_GAPS` is empty
   (`server/api-parity.test.ts:36-42`) — the parity test only tracks
   client-invoked procedures, and this one is invoked by nobody.
2. **No persistence.** `server/analytics-service.ts:31-33` — `// In-memory
   storage for demo (would use database in production)`. Two module-level
   arrays. Every dev-server restart erases everything; in a serverless
   function it would erase per invocation.
3. **Fabricated metrics.** `server/analytics-service.ts:61-65` —
   `avgTimeOnPage = Math.floor(Math.random() * 5 + 3)` and
   `bounceRate = Math.floor(Math.random() * 20 + 30)`, both returned as if
   measured. For a platform whose one unforgivable act is invented data
   (CLAUDE.md, "Fabricated authority"), an API that returns random numbers as
   engagement metrics should not survive this audit — delete or replace it.

**Reading progress is visual only.** `client/src/components/ReadingProgressBar.tsx:6-16`
and `client/src/components/ArticleProgress.tsx:24-43` compute scroll
percentage in a `useEffect` and render a mustard bar — nothing is recorded,
sent, or stored. The irony: the single most important metric this platform
could own (did the reader *finish* the essay?) is already being computed on
every article page, then thrown away on unmount.

**Search queries are not logged.** `server/search-router.ts` (procedures
`global`, `articles`, `resources`; consumed at
`client/src/pages/Search.tsx:135-145`) performs the search and returns; no
insert, no log. The owner cannot see what readers are looking for or failing
to find.

**Quiz results are not stored.** `server/quiz-router.ts:14-23` is deliberately
stateless — `getQuestions` returns the bank, `getRecommendations` scores the
answers and returns recommendations. No result, profile, or even a completion
count is persisted. The Whole Life Assessment and the leadership tools keep
their state in `localStorage` only (e.g.
`client/src/pages/life/WholeLifeAssessment.tsx`,
`client/src/hooks/useFormationTracker.ts:151`) — right for privacy, but it
means "tool completed" is invisible to the owner.

### 1.3 What IS actually recorded (the three real instruments)

1. **Subscribers, with source.** Prod REST endpoint `/api/subscribe`
   (`api/index.ts:719-736`) inserts email, optional name, and a **`source`
   string** (`api/index.ts:724,728`) into `subscribers`. This is the one
   attribution field that exists today. Caveats: (a) the tRPC path
   `subscribers.subscribe` (`server/routers.ts:483-487`) takes email only —
   `SegmentedSignup.tsx:78` calls it without the audience segment, so the
   segment the reader just told us lives only in `localStorage` and a dead
   CustomEvent; (b) **schema drift** — `drizzle/schema.ts:159-166` defines
   `subscribers` with no `name` or `source` column, while the prod SQL writes
   both; the Drizzle schema is not the truth of the prod table. (c) The real
   newsletter is a Substack handoff (`SegmentedSignup.tsx:60-63,94-100`) —
   the local table is a best-effort shadow copy.
2. **Lead-magnet signups.** `server/routers/lead-magnets.ts:29-64` persists
   `{ publicId, email, magnetId }` to `leadMagnetSignups` and fires
   `notifyOwner`; `getStats` (lines 66-100) aggregates counts by magnet. This
   is the only purpose-built conversion instrument in the codebase — and no
   client code calls `trpc.leadMagnets.*` (grep: zero matches in
   `client/src`). The live gated-download flow (`GatedDownload.tsx:35`) posts
   to `/api/subscribe` instead, so `getStats` aggregates a table nothing
   writes to. Also: `signup` returns "Check your email for your guide!"
   (line 62) but no email is ever sent — see 1.4.
3. **Book purchases (half-recorded).** See 1.5.

### 1.4 Email instrumentation

- **Mailchimp** (`server/mailchimp.ts`) has subscribe/unsubscribe/send-campaign/
  list-stats functions with a placeholder-key guard (lines 3, 27-30). Nothing
  in `server/` or `api/` calls `subscribeToMailchimp` or `sendEmailCampaign`
  (grep: definitions and tests only). `getListStats` (lines 139-166) could
  surface subscriber/unsubscribe counts — it is called by nothing. Mailchimp's
  native open/click tracking is therefore *available in Mailchimp's dashboard
  if campaigns are ever sent through it*, but no send path exists and nothing
  is surfaced in-app. Note `reply_to: "noreply@livewell.com"` (line 109) — a
  domain the platform does not own (canonical is livewellbyjamesbell.co).
- **The 5 email sequences** (`server/email-sequences.ts:18` —
  `EMAIL_SEQUENCES`, 5 sequences × 5 emails, verified by
  `server/email-sequences.test.ts:6-14`) are **templates with no send
  engine**: `getEmailSequence` (line 684) is exercised only by tests. Nothing
  schedules, sends, or instruments them. Adjacent finding for the content
  audit: the templates violate the voice contract (emoji + exclamation in
  subject lines, e.g. line 23 "Your Leadership Audit is ready! 📊") and
  include testimonials from named people — "Sarah, Church Planter", "Michael,
  Senior Pastor" (`server/email-sequences.ts:76-80`) — that appear invented.
  If they are not real, that is the fabricated-authority trap; these must not
  ship as written.
- **The actual newsletter is Substack** (per `SegmentedSignup.tsx:60-63` and
  CLAUDE.md). Substack provides its own open/subscriber stats off-platform.
  Do not rebuild that; read it there.

### 1.5 Commerce instrumentation

- **`book_purchases` table** (`drizzle/schema.ts:206-217`): bookId,
  stripePaymentIntentId, customerEmail, customerName, amountCents,
  `status: pending|succeeded|failed`, sessionId, timestamps.
- **Written at checkout creation only.** `api/index.ts:1895-1900` inserts a
  row with `status='pending'` when `stripe.createCheckoutSession` runs. Grep
  for `webhook` in `api/index.ts`: **zero matches**. Nothing ever flips
  `pending` → `succeeded`. The purchase table is a record of *intent to buy*,
  not of purchases. (The ebook flow does verify payment — but only at download
  time, per-session: `ebookDownload`, `api/index.ts:2612-2636`.)
- **The second checkout path records nothing.** `ebookCheckout`
  (`api/index.ts:2587-2610`) creates a Stripe session with `metadata: { slug }`
  and writes no DB row at all. Sales through `/api/checkout` are visible only
  inside Stripe's own dashboard.
- **No attribution.** Neither checkout captures referrer, landing page, the
  essay or tool that led to the sale, or the subscriber source. The question
  "which essay sells books?" is unanswerable with what is recorded. (Also
  suspect: `BOOK_PRICES` hardcodes ids 1–3 as "Book One/Two/Three",
  `api/index.ts:1870-1874` — placeholder data on the money path.)

### 1.6 What the owner actually sees today

`client/src/pages/AdminDashboard.tsx:9-21` runs exactly three queries —
`posts.listAll`, `resources.listAll`, `books.listAll` — and renders three
counts: **Writing Posts, Resources, Books**. That is the entire measured view
of the platform: inventory, not audience. The rest of the dashboard is content
operations (seed, dedupe, apostrophe repair). Subscribers are visible only as
a raw list on a separate page (`client/src/pages/AdminSubscribers.tsx:8`,
`trpc.subscribers.list`). No views, no reads, no finishes, no funnel, no
revenue, no trend, anywhere.

---

## 2. The gap, stated against the platform's own success definition

CLAUDE.md defines success as: *a reader who came back; a long essay finished,
not bounced; a reading path completed; a skeptic who returns; a pastor who
handed it to their congregation; a book bought.* Instrument coverage today:

| Success signal (CLAUDE.md) | Instrumented? | Evidence |
|---|---|---|
| Essay finished, not bounced | No — scroll % computed then discarded | `ArticleProgress.tsx:24-43` |
| Reading path completed | No — enum exists in dead router, never fired | `analytics-router.ts:40` |
| Reader who came back | No — no pageview layer at all | `main.tsx` (no Analytics mount) |
| Skeptic who returns | No — no visits, no segment persisted server-side | `SegmentedSignup.tsx:78,88` |
| Pastor who shared it | No | — |
| Book bought | Half — `pending` rows never confirmed | `api/index.ts:1895-1900`, no webhook |
| Email that argues back | Partially — contact form → Pastorjbell206@gmail.com | out of scope, works |
| Subscribers (with source) | Yes — the one working instrument | `api/index.ts:719-736` |
| Lead magnet pull by promise | Built but unwired | `routers/lead-magnets.ts:66-100` |

Depth-over-reach cuts both ways: it forbids surveillance, and it also means
pageviews alone are the *wrong* metric even when they exist. The site needs a
small number of depth signals, not a big number of shallow ones.

---

## 3. What SHOULD be measured — the event schema

Fourteen events. Every one is anonymous (no user id, no email, no cookie, no
fingerprint — properties are content identifiers and coarse buckets only),
fired once per page-load, and aggregate-first: the unit of analysis is the
essay/tool/book, never the person.

| # | Event | Properties | The question it answers |
|---|-------|------------|--------------------------|
| 1 | `article_read_75pct` | `slug`, `pillar` | Did the essay hold them past the midpoint? (fire once when `ArticleProgress` crosses 75) |
| 2 | `article_finished` | `slug`, `pillar` | The core depth metric: finished, not bounced (fire once at ≥95% with ≥60s dwell, so a scroll-to-bottom skim doesn't count) |
| 3 | `keep_reading_clicked` | `book`, `essay` | Does the essay→book bridge work? (`KeepReadingBook.tsx` is already the click site) |
| 4 | `reading_path_step` | `path`, `step`, `of` | Where do paths lose people? |
| 5 | `reading_path_completed` | `path` | Formation product completed — a headline success signal |
| 6 | `tool_started` | `tool` | Top of the tool funnel |
| 7 | `tool_completed` | `tool` | Which tools actually get finished (result stays in localStorage; only the *fact* of completion is sent) |
| 8 | `quiz_completed` | `profile` (result bucket only, never the answers) | Is the theology quiz converting attention into direction? |
| 9 | `subscribe` | `source` (page/module), `segment` (skeptic/christian/pastor/seeker) | Which doors bring which readers — extends the existing `/api/subscribe` source field; segment finally persisted instead of dying in localStorage |
| 10 | `lead_magnet_signup` | `magnet` | Which promise pulls (wire the client to the existing `leadMagnetSignups` table instead of the generic subscribe) |
| 11 | `sample_read` | `book` | Book-page intent before money is involved |
| 12 | `checkout_started` | `book`, `source_path` (the page the buy button was on) | Purchase attribution finally possible |
| 13 | `purchase` | `book`, `amount_cents` | Confirmed money — requires the Stripe webhook (see rec #2); fired server-side, not from the client |
| 14 | `search_performed` | `has_results` (boolean), `results_count` (bucketed: 0 / 1–5 / 6+) — **never the query text** | Zero-result searches = content gaps, without logging what a grieving person typed |

Pastor sharing (the PCN channel) is covered without a person-level event:
`subscribe{segment:pastor}` + pageviews on `/for-pastors` + a
`pastor_resource_downloaded {resource}` variant of #10 on the
for-pastors download surfaces. Fifteen events would be the ceiling; resist
adding more — every added event is a future argument about what it means.

## 4. What NOT to track, and why

- **Crisis pages** — `/doubt`, `/faith-crisis`, `/marriage-crisis`, `/grief`
  (`client/src/App.tsx:372,504-506`), plus burnout/care surfaces
  (`plans/CarePlan.tsx`): **aggregate pageviews only** (the Vercel layer
  counts them like any route — that is fine and useful: the owner should know
  grief traffic doubled). **No behavioral events** on these routes: no scroll
  depth, no dwell, no tool events, no per-page subscribe source. A person
  reading `/grief` at 2am is owed the dignity of not being a funnel. If they
  subscribe from a crisis page, record `source: "crisis"` (one coarse bucket),
  never the specific page — an email joined to "was on the marriage-crisis
  page" is a sensitive inference sitting in a MySQL table.
- **Search query text** — never stored (event #14 carries counts only). Search
  on this site will include queries like "is my marriage over"; a query log is
  a diary the reader didn't consent to keep.
- **Quiz/assessment answers and results joined to identity** — the Whole Life
  Assessment and Formation Inventory stay in `localStorage` (as they already
  do); only anonymous completion counts leave the device. Never store an
  email next to an assessment result.
- **No session replay, heatmaps, fingerprinting, or cross-site pixels** (no
  Meta pixel despite Facebook being the main audience channel — link-level
  UTM on posts is enough).
- **Reader-level reading history** — do not build "user X read essays A, B, C."
  The platform has no reader accounts; keep it that way in the analytics too.
  Aggregate per-essay counters answer every question in §6 without a person
  table.

## 5. Implementation shape — recommendation: two thin layers, no third party

Three candidates were weighed:

| Option | Cost | Privacy | Two-runtime fit | Verdict |
|---|---|---|---|---|
| **A. Vercel Analytics (+ Speed Insights) for pageviews/CWV** | Already paid for in the deploy platform; packages already installed. Custom events, however, require a paid Vercel plan and are capped per month | Cookieless by design; no consent banner | Zero API surface — script only | **Adopt for pageviews/uniques/CWV** (mount what's already in package.json) |
| **B. First-party events → MySQL via one REST endpoint** | $0; DB already exists | Best possible: first-party, anonymous, we write the retention policy | One handler in `api/index.ts` + one Express route in dev — the `/api/subscribe` pattern (`api/index.ts:672`) already proves this shape; **deliberately REST, not tRPC**, so there is no per-procedure parity ceremony | **Adopt for the 14 events** |
| C. Plausible (or Fathom) | ~$9–19/mo forever | Good (cookieless) | Script only | Redundant once A exists; its custom events would put depth data in a third party's hands for a fee. **Skip** — revisit only if Vercel's analytics allowance becomes a problem |

**Why not the existing `analyticsRouter`?** It is the right idea in the wrong
place: tRPC procedures must be hand-mirrored into `api/index.ts` (the parity
trap), it has no storage, and its computed metrics are random numbers. Replace
it: keep the router name if convenient for admin *reads*, but the ingest path
should be a single `POST /api/event` REST handler implemented once per runtime,
validating `{event, props}` against a whitelist of the 14 names, inserting into
one `events` table (`id, event, propsJson, path, createdAt` — note: no IP, no
UA, no session id). Client side, one tiny `track(event, props)` helper in
`client/src/lib/` using `navigator.sendBeacon` with a route guard that
silently drops behavioral events on the crisis-route list. Delete
`server/analytics-service.ts`'s in-memory arrays and `Math.random()` metrics
outright.

**Data hygiene:** cron-less pruning is fine — a `DELETE FROM events WHERE
createdAt < NOW() - INTERVAL 13 MONTH` in the ingest handler once per ~1000
inserts keeps thirteen months (year-over-year comparison) and nothing more.

## 6. What a healthy dashboard shows — one page, eight numbers, read weekly

A single `/admin/measures` page (light workspace, `.admin-scope`), each number
with its 4-week trend beside it. Eight numbers, each tied to a decision:

| # | Number | Why it matters | Decision it drives |
|---|--------|----------------|--------------------|
| 1 | **Essay finish rate** (article_finished ÷ essay pageviews, sitewide) | The platform's own definition of success is "a long essay finished, not bounced" | Whether the writing is holding readers; if a redesign or length change moved it |
| 2 | **Top 5 essays by finishes** (not views) | Views measure the headline; finishes measure the essay | What to write more of; what to feature on the homepage and hand to PCN |
| 3 | **Returning-visitor share** (from Vercel Analytics) | "A skeptic who returns to interrogate further" — the hardest audience, visible only as return visits | Whether the site earns a second visit; whether the newsletter/Facebook loop is working |
| 4 | **New subscribers this week, by segment and source** | The only owned audience; segment shows *who* is coming (skeptic vs pastor vs seeker) | Where to place signup modules; which audience the next essay serves |
| 5 | **Reading-path steps + completions** | Paths are the formation product; completion is rare and precious | Which paths to prune, reorder, or promote |
| 6 | **Book funnel: sample_read → checkout_started → purchases** (confirmed, post-webhook) | Money, with the leak located — intent vs completion | Fix the book page, the price, or the checkout, depending on where the funnel narrows |
| 7 | **Pastor channel: /for-pastors views + pastor-resource downloads + pastor-segment subscribes** | PCN is the highest-yield growth channel (CLAUDE.md, Strategic Reminders) | How much to invest in pastor-facing features and PCN distribution this month |
| 8 | **Zero-result searches (count)** | Readers telling the owner, anonymously, what is missing | The next essay or the next redirect — content gaps named by demand |

Deliberately absent: raw pageviews as a headline (reach is downstream of
depth), bounce rate (meaningless for essays without the finish rate), and
anything per-person.

---

## 7. Recommendations, ranked by decision value

| Rank | Recommendation | Value | Effort | Detail |
|---|---|---|---|---|
| 1 | **Mount `<Analytics />` + `<SpeedInsights />` in `main.tsx`** | **Critical** — from zero data to pageviews, uniques, referrers, CWV | Trivial (~10 lines; packages at `package.json:65,67` are already installed) | Cookieless, no consent banner. Do this today; every week unmounted is a week of unrecoverable data |
| 2 | **Add the Stripe webhook** (`checkout.session.completed` → flip `book_purchases.status` to `succeeded`; insert a row for `/api/checkout` ebook sales too) | **Critical** — the money data is wrong today: every sale reads `pending` forever (`api/index.ts:1895-1900`, no webhook handler exists) | Small–medium (one REST route in `api/index.ts` + signature verification + dev-Express mirror) | Also fires the server-side `purchase` event (#13) with `source_path` from session metadata — attribution starts here |
| 3 | **Build the first-party event pipe**: `events` table, `POST /api/event` (both runtimes), `track()` helper with crisis-route guard, wire events 1–12 & 14 | **High** — this is where "essays finished" and "paths completed" become visible; the platform's actual success metrics | Medium (schema + 2 handlers + 1 helper + ~10 call sites; `ArticleProgress.tsx` already computes the scroll %) | Whitelist event names server-side; no IP/UA/session stored |
| 4 | **Delete or replace `server/analytics-service.ts`** (in-memory arrays, `Math.random()` bounce rate/time-on-page, `analytics-service.ts:61-65`) and the uncalled `analyticsRouter` | **High** — fabricated metrics sitting behind a public procedure contradict the platform's integrity contract | Small (it has zero callers; grep confirms) | If admin reads are wanted, re-point `getTrending`/`getConversionFunnel` at the real `events` table |
| 5 | **Persist the subscriber segment + fix the schema drift**: pass `audience` through `subscribers.subscribe` / `/api/subscribe`, add `name`/`source`/`segment` to `drizzle/schema.ts:159-166` to match what prod SQL already writes (`api/index.ts:728`) | **High** — the reader states their segment (`SegmentedSignup.tsx:55`) and it currently dies in localStorage and a CustomEvent nothing hears (`SegmentedSignup.tsx:83`, `NewsletterSignup.tsx:57`); dashboard #4 depends on it | Small | Also remove the email address from the CustomEvent detail, or remove the dead event entirely |
| 6 | **Build the `/admin/measures` page** (§6, eight numbers + trends) on the events/subscribers/purchases tables; add Substack stats as a manual weekly glance, not an integration | **Medium** (value arrives only after #1–3 have a few weeks of data) | Medium | Keep it one page; resist the chart farm |
| 7 | **Wire lead magnets to their own instrument**: point `GatedDownload.tsx:35` (or the magnet pages) at `leadMagnets.signup` so `leadMagnetSignups` + `getStats` (`routers/lead-magnets.ts:66-100`) measure which promise pulls — and either build the send for the promised email or change the copy that promises one (`routers/lead-magnets.ts:62`) | **Medium** — a purpose-built table nothing writes to; plus a literal broken promise to the reader | Small (client wiring) / larger if the email send is built | The sequences themselves (`email-sequences.ts`) need a voice/integrity rewrite before any send engine exists — the testimonials at lines 76-80 must be verified real or cut |
| 8 | **Zero-result search counter** (event #14) | **Medium** — cheapest possible editorial research | Small | Counts only; never store query text |
| 9 | Mailchimp open/click integration or in-app campaign stats | **Low** — the newsletter actually lives on Substack (`SegmentedSignup.tsx:60-63`); Mailchimp code is uncalled with placeholder creds (`mailchimp.ts:3,27`) | — | Decide the ESP question first (Substack vs Mailchimp); don't instrument a channel that isn't the channel. Fix `noreply@livewell.com` (`mailchimp.ts:109`) if Mailchimp is ever kept |
| 10 | Plausible/GA/PostHog | **Low / decline** | — | Redundant after #1+#3; adds cost and a third party to a platform whose privacy posture is currently perfect by accident — make it perfect on purpose instead |

## 8. What this audit did not verify

Static analysis only: no dev server was run, no Vercel dashboard inspected (it
may show *deployment-level* request counts even without the packages mounted —
that is not web analytics), no Stripe or Substack dashboards checked, no live
DB queried. Vercel plan limits on custom events were not confirmed against the
account's actual plan; verify before choosing option A for events (the
recommendation deliberately routes events through option B regardless).
