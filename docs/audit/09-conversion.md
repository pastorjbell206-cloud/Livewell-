# 09 — Conversion & Engagement Path

> Site-elevation audit 1.9: visitor → subscriber → paid (book buyer / future
> member). Read-only; verified on commit `7469073` (branch `site-elevation`,
> 2026-07-01). Line numbers cited were checked on this commit.
>
> Governing constraint (owner's, and the constitution's): every recommendation
> here is **pastoral and honest** — no dark patterns, no manipulation, no
> manufactured urgency. The endings "leave weight, they do not press for a
> decision." That constraint turns out to be the sharpest audit instrument in
> this file: the biggest conversion problems on this site are not missing
> pop-ups. They are **promises the machinery does not keep**. A reader who is
> told "check your inbox" and finds nothing there has been handled, not met —
> and that is both the trust failure and the conversion failure, in one.

---

## 0. The one-paragraph verdict

The reading experience is genuinely strong and the asks are placed with real
restraint — value first, one invitation, no pressure. But the pipe behind the
forms is broken in three distinct ways: (1) the canonical `/subscribe` page is
a **fake form** that shows success and records nothing; (2) four separate
surfaces promise an email ("confirmation," "sample chapter," "your results,"
"your guide + a five-email series") that **no system ever sends** — there is no
mailer wired anywhere; (3) the site's own subscriber table is a dead end — the
real newsletter lives on Substack, and only one of the ~14 signup surfaces
actually hands the reader to Substack. Meanwhile the paid path works
end-to-end (Stripe → thank-you → gated PDF) but the relationship **ends at the
download**: no email captured, no receipt follow-up, no next step. And nothing
is measured: `@vercel/analytics` is in `package.json` but imported nowhere,
and the two custom conversion events the components dispatch have zero
listeners.

---

## 1. Journey one — the first-time reader

### 1a. Lands on `/` (`client/src/pages/Home.tsx`)

Above the fold: charcoal hero, headline, two CTAs ("Read the essays,"
"Find your track"), a tertiary skeptic link, and a vision card (`Home.tsx:106–325`).
**No subscribe ask above the fold — correct for this brand.** Then four
mission doors (`:327–438`), then six curated flagship essays (`:440–562`),
and only *then* the first subscribe ask — `SegmentedSignup` on charcoal
(`:564–578`), followed by the five pillars. Value is demonstrated before the
ask; the ask is one panel, honestly worded ("One essay a week. Pick your
track."). As a sequence this is exemplary. The problem is what happens after
submit (see §3).

### 1b. Lands on an essay via search (`client/src/pages/ArticleDetail.tsx`)

The post-essay sequence, in order:

1. Reader actions — save / share / cite / audience share (`ArticleDetail.tsx:706–729`). Quiet, useful, no ask.
2. **`KeepReadingBook`** — the essay-to-book card, matched by pillar/track (`:731–732`, component at `client/src/components/KeepReadingBook.tsx:55–66`). Dark section, cover, honest blurb, "Read the book →". This is the best-designed conversion surface on the site.
3. **One** `NewsletterSignup` inline card (`:734–744`) with the strongest copy on the site: *"Theology that meets the actual Tuesday afternoon… No spam, ever."*
4. Related essays, author bio.

Sequence, position, and copy are all right. Two leaks: the newsletter promise
is broken downstream (§3), and `KeepReadingBook` maps every essay to only
**5 of the 21 books** (`KeepReadingBook.tsx:22–53`) — 16 funnels, including
every `/books/`-prefixed hard-issues title, receive no essay traffic from this
mechanism.

### 1c. Lands on a tool

Read end-to-end: `tools/MarriageAssessment.tsx` and `tools/PastorBurnout.tsx`.

After the marriage score the reader gets: Print / Retake buttons, an
`EmailResults` box, and a "NEXT STEP" card → `/writing?category=marriage`
(`MarriageAssessment.tsx`, results tail). Two problems:

- **The next-step link is broken.** `Writing.tsx:73–83` parses `track`,
  `pillar`, `subTheme`, `audience`, `format`, `q`, `sub`, `series` — there is
  no `category` param. The reader lands on the unfiltered index of 161 essays.
  Same bug in `PastorBurnout.tsx:1625` (`/writing?category=pastoral-ministry`).
- **`EmailResults` makes a false promise.** "Enter your email and we will send
  you a copy of your results" (`client/src/components/EmailResults.tsx:105`)
  posts to `/api/contact` (`:18–27`), which only inserts a row into
  `contact_messages` (`api/index.ts:2351–2382`). **No email is ever sent to
  anyone.** The reader sees "Results sent. Check your inbox." and finds
  nothing. Six major tools ship this: MarriageAssessment, FinancialHealth,
  EmotionalHealth, LifeAudit, ChurchHealth, PastorBurnout.
- Neither assessment points at the obviously matching paid next step
  (Covenant / Marriage in Ministry for marriage; The Loneliness of the Pastor
  for burnout). The person the site just helped diagnose a real problem is
  released with a broken link and a phantom email.

---

## 2. Journey two — subscribe mechanics

### 2a. The inventory (how many different subscribe surfaces exist)

| # | Surface | File | Backend it hits | Reaches the actual newsletter (Substack)? |
|---|---------|------|-----------------|--------------------------------------------|
| 1 | `NewsletterSignup` (inline/footer/minimal), 11 placements | `components/NewsletterSignup.tsx` | `trpc subscribers.subscribe` → DB row only | **No** |
| 2 | `SegmentedSignup` (Home + panel uses) | `components/SegmentedSignup.tsx` | DB row (best-effort) **+ opens Substack subscribe tab** | **Yes** — the only one |
| 3 | `SampleChapterForm` (every `/books/:slug`) | `components/SampleChapterForm.tsx` | `trpc subscribers.subscribe` → DB row only | No — and promises a PDF that never sends |
| 4 | `GatedDownload` (study guides, `/diagnostic`) | `components/GatedDownload.tsx` | REST `/api/subscribe` → DB row (with `source`) | No — but the file opens immediately, so the core promise is kept |
| 5 | `/subscribe` page (8 "email sequences") | `pages/EmailSignup.tsx` | **Nothing — fake** (`:40–42`: "Backend not wired yet — show success") | No |
| 6 | `/lead-magnets/:id` (5 magnets) | `pages/LeadMagnetLanding.tsx` | `fetch("/api/lead-magnets/signup")` — **endpoint exists in neither runtime** | No |
| 7 | Membership waitlist (×2 forms) | `pages/Membership.tsx:21–33,189–196` | REST `/api/subscribe` (`source: membership-waitlist`) | No |
| 8 | Footer | `components/Footer.tsx:27,100` | Plain outbound Substack links — no form at all | Link only |

Eight mechanisms, five different copy voices, **one** that completes a real
newsletter subscription. This is scattered, not coherent — and the scatter is
invisible to the owner because nothing is measured.

### 2b. Steps to "subscribed," and what actually happens

The dominant path (`NewsletterSignup`): one field, one click — friction is
excellent. Then:

- **Prod** (`api/index.ts:2178–2188`): `INSERT INTO subscribers … ON DUPLICATE KEY UPDATE`, errors swallowed (`catch { /* ignore */ }`), always returns ok. The success toast can fire when nothing was saved.
- **Dev** (`server/routers.ts:482–489`): `addSubscriber(email)` — same shape.
- **No confirmation email. No double opt-in. No welcome sequence. No Mailchimp call** — `server/mailchimp.ts` exports `subscribeToMailchimp` / `sendEmailCampaign` and has **zero callers** anywhere in `server/` or `api/`.
- The toast says **"Check your inbox for a confirmation."** (`NewsletterSignup.tsx:36`). Nothing arrives. First promise to a new reader; broken in the first minute.
- The `source` attribution prop (`NewsletterSignup.tsx:19,53–62`) is never sent to the server — the mutation input is `{ email }` only, and the `newsletter_signup` CustomEvent it dispatches has **no listener in the codebase** (repo-wide grep: dispatch sites only).

`SegmentedSignup` is the honest exception: it records a best-effort row, then
opens the real Substack subscribe page inside the click gesture, replaces the
form with a truthful "One more step — confirm in the Substack tab" panel with
a manual fallback link (`SegmentedSignup.tsx:94–168`). This is the correct
pattern. Two defects even here: the header comment claims the audience choice
"is stored as the audience_type on the subscriber row" (`:8–10`) — it is not;
`subscribe.mutate({ email })` (`:78`) sends email only, and the segment lives
in `localStorage` + a listener-less event. And the description promises "a
different lead essay depending on who you are" — no per-segment sequence
exists anywhere to honor that (§2c).

### 2c. The "5 sequences × 5 emails" and the second, contradictory set

- `server/email-sequences.ts` defines 5 sequences × 5 emails for the 5 lead
  magnets. Its **only importer is its own test** (`email-sequences.test.ts`).
  No scheduler, no sender, no queue. Dead code.
- Worse, its copy violates nearly every rule the platform lives by: emoji
  subject lines ("📊", "🔥"), exclamation points outside Scripture,
  "journey"/"transformation" language, **manufactured urgency** ("Get 30% Off
  when you buy the bundle this week", `:114`; "35% off this week only",
  `:246`), **fabricated statistics** ("40% improvement in team satisfaction",
  `:110–113`), **invented testimonials** ("Sarah, Church Planter" et al.,
  `:76–80`), and an invented "community of 5,000+ leaders" (`:136`, `:402`).
  If these ever *were* wired to a sender as-is, they would be the single
  largest brand-integrity incident on the platform. That they are dead is the
  only mercy.
- Separately, `client/src/data/email-sequences.ts` defines **eight different**
  sequences (story-of-christianity, skeptics-path, church-reckoning, …) that
  the `/subscribe` page advertises — backed by nothing (§2d). Two inventories
  of email sequences, zero emails ever sent.

### 2d. `/subscribe` — the canonical route is a fake form

`pages/EmailSignup.tsx:35–46`: on submit, `await new Promise(r =>
setTimeout(r, 800)); setSubmitted(true);` with the comment **"Backend not
wired yet — show success."** Name and email are collected, an 800 ms spinner
plays, success is displayed, and nothing is recorded anywhere. The
`NewsletterSignup` header comment ("All other (fake) forms in the codebase
have been replaced," `NewsletterSignup.tsx:3–5`) is false as long as this
page ships. Mitigating fact: no page links to `/subscribe` (repo-wide grep —
zero inbound `href="/subscribe"`), so only direct/bookmarked traffic hits it.
It is still live on the canonical route a subscriber would guess.

---

## 3. Journey three — the paid path

### 3a. Essay → book → purchase (traced through `/babylon` end to end)

`pages/books/Babylon.tsx`:

- **Value clear?** Yes — the pitch (`:76–91`) is the house voice at its best; the founder's credibility line is earned, not decorated.
- **Sample gated or free?** **Free and ungated** (`:93–98`, fetched from `/books/babylon-sample.md`). Generosity before the ask — right call, and consistent with the constitution.
- **Price visible before click?** Yes: "Buy the eBook — $9.99" is the button label itself (`BuyEbookButton.tsx:45`), plus "PDF · instant download · secure checkout by Stripe" (`Babylon.tsx:68–70`). Schema.org offer carries the price too.
- **Checkout** (`api/index.ts:2587–2611`): Stripe Checkout session, success → `/{slug}/thank-you?session_id=…`, cancel → back to the book page. Clean.
- **Stripe not configured?** `BuyEbookButton.tsx:81–103`: a 503 degrades to "Request your copy by email →" (mailto to the owner) with the honest line "Card checkout opens soon." **This is the most pastoral piece of failure-handling in the codebase.** Genuine errors get an email fallback too (`:115–123`).
- **Thank-you** (`components/EbookThankYou.tsx`): verifies the paid session via `/api/download?check=1`, streams the PDF only to a paid session, keeps a "trouble downloading? email us" path visible. Unpaid/missing states are honest, not accusatory.

### 3b. Where the paid path leaks

1. **The relationship ends at the download.** The funnel checkout captures no
   email into the site's own tables (`ebookCheckout`, `api/index.ts:2587–2611`
   — metadata is `{ slug }` only; no `book_purchases` insert, no `subscribers`
   insert), there is **no Stripe webhook anywhere** (repo grep: zero), and no
   post-purchase email exists. `EbookThankYou`'s paid state (`:62–76`) offers
   exactly one action: "Download the PDF." A person who just paid $9.99 —
   the warmest reader the platform has — is given no invitation to the weekly
   essay, no pointer to the essays that extend the book, no other title.
   Stripe's own receipt (if enabled in the dashboard) is the only artifact.
2. **A buyer cannot be contacted about the book they bought** (errata, a new
   edition, the sequel) because the sale was never recorded on this side.
3. **Two-and-a-half coexisting buy paths.** `BuyEbookButton` (`/api/checkout`,
   15 funnels) vs `StripeBuyButton` (direct Stripe Payment Links, 8 of the
   `/books/`-prefixed hard-issues funnels + `HardIssuesSeries`) vs a legacy
   `stripe.createCheckoutSession` used by `BooksStore.tsx:18` with
   **hardcoded placeholder pricing** — "Book One/Two/Three", $14.99/$16.99/$12.99
   (`api/index.ts:1867–1902`). `/books-store` 301s to `/books` server-side
   (`vercel.json`), but the SPA route still exists for client-side navigation.
   A placeholder catalog wired to real money is a live-wire even if nothing
   currently links to it.
4. **`/books` catalog vs. `/books/:slug` detail split.** The catalog's cards
   link to the 21 standalone funnels (`Books.tsx:123+`), while the DB-driven
   `BookDetail` pages (reached from other surfaces) run a *different*
   conversion mechanic — `SampleChapterForm` with `sampleUrl={null}`
   (`BookDetail.tsx:227–231`), which makes the emailed-chapter promise no
   system keeps (§2b). Two book pages per book, two mechanics, one of them
   dishonest by accident.

### 3c. Membership (`/membership`, `pages/Membership.tsx`)

The Decision Log's config-driven fallback **works and reads as intentional,
not broken**: `stripe.membershipEnabled` exists in both runtimes
(`api/index.ts:1814`), and when checkout is off the form becomes "Join the
waitlist" with the plainly honest "The room opens soon. The waitlist gets
first access — and the founding rate" (`Membership.tsx:110–128`). The page is
the ethical high-water mark of the site: it removed AI-fabricated
testimonials and says so in the replacement section ("No paid testimonials.
No invented quotes." `:139–156`), and its cancel-anytime answer refuses
retention friction (`:164`). Two blemishes: "You are on the list. **Watch
your inbox.**" (`:108`) — another inbox promise with no mailer behind it; and
the "first 100 members lock in the founding rate" claim (`:105`) is currently
unfalsifiable because nothing counts members — keep the offer, but be ready
to honor it precisely.

---

## 4. Journey four — the lead magnets (the worst surface on the site)

`/lead-magnets/:magnetId` (`pages/LeadMagnetLanding.tsx`) fails on every axis
at once:

- **The form does nothing, everywhere.** It POSTs to
  `/api/lead-magnets/signup` (`:155`). That REST path exists in **neither**
  runtime: prod `api/index.ts` has no `lead-magnets` route (grep: zero), and
  dev exposes the logic only as a tRPC procedure
  (`server/routers/lead-magnets.ts`), not REST. `response.ok` is false, no
  error state is rendered — the reader clicks "Get Instant Access," the
  button flickers "Sending...", and nothing happens at all.
- **Even the dev tRPC path keeps no promises.** `lead-magnets.ts:56–63`
  notifies the owner and returns "Check your email for your guide!" — no
  guide is emailed, no PDF exists to email, and the 5-email series (§2c) never
  sends.
- **Fabricated social proof.** Three invented reviewers with names, roles and
  five-star ratings (`LeadMagnetLanding.tsx:71–90`) — the exact "fabricated
  authority" trap CLAUDE.md calls the one that ends trust — plus "Thousands
  have already downloaded this guide" (`:357`), unverifiable and almost
  certainly false given the endpoint has never worked.
- **The success screen doubles down**: "We've sent {title} to {email}… A
  short email series will follow" (`:184–192`) — none of it true.
- **And no one can find it anyway.** Zero inbound links site-wide (grep:
  `App.tsx` route + the two lead-magnet files only). The only references are
  inside the dead server email sequences.

This surface predates the platform's voice and integrity standards and was
never finished. It should not be fixed incrementally; it should be taken
down or rebuilt honestly (see Findings).

---

## 5. Journey five — tools as on-ramp

- **Collect email:** 6 assessment tools via the broken `EmailResults` (§1c);
  study guides + `/diagnostic` via `GatedDownload` (works, records
  `source`); `/books/:slug` via `SampleChapterForm` (broken promise). The
  Theology Quiz — the only API-backed tool and a natural segmenter — collects
  nothing and ends without an invitation.
- **Feed the 5 email sequences:** none. Nothing feeds them; they send nothing.
- **Save-your-results bridge:** none. `/tools/saved`
  (`pages/tools/SavedItems.tsx`) is `localStorage` only — device-bound, no
  account, no email bridge, and unregistered on the `/tools` hub, so the
  reader's "collection" evaporates with a cleared browser and forms no
  relationship. `ToolsHub.tsx` itself contains zero subscribe presence (grep:
  no signup component).
- The structural irony: the tools are the site's best top-of-funnel asset
  (52 of them, several better than anything comparable), and the funnel
  treats them as terminal pages.

---

## 6. Measurement (deferred to the analytics audit, but the conversion facts)

- `@vercel/analytics` ^2.0.1 sits in `package.json:65` and is **imported
  nowhere** in the client (repo grep: zero) — so even pageviews depend on
  whatever Vercel injects at the platform level, and no custom events exist.
- The components *try*: `newsletter_signup` (`NewsletterSignup.tsx:53–62`,
  `SegmentedSignup.tsx:81–92`) and `sample_chapter_request`
  (`SampleChapterForm.tsx:45–55`) are dispatched as CustomEvents — with **no
  listener anywhere**. Attribution is dispatched into the void.
- Untracked key steps: subscribe attempts/successes per surface, Substack
  handoff completion, sample requests, buy-button clicks, checkout
  success/cancel, thank-you download, waitlist joins, tool completions.
  Effectively the entire funnel is dark. The owner cannot currently know that
  §2d and §4 are broken from any dashboard — only from reading the code, as
  this audit did.

---

## 7. Findings, ranked

Severity = likely impact on subscribers/revenue *and* on trust (this platform
has said trust is the product). Effort: S < 1 day, M = days, L = week+.

### Critical

| # | Leak | Where | What the reader experiences | The honest fix | Effort |
|---|------|-------|------------------------------|----------------|--------|
| C1 | **Broken inbox promises across every real form.** No mailer exists, yet four surfaces promise email: "Check your inbox for a confirmation" (`NewsletterSignup.tsx:36`); "Sample chapter on the way. Check your inbox in the next few minutes" (`SampleChapterForm.tsx:38–44`, guaranteed by `BookDetail.tsx:230` passing `sampleUrl={null}`); "we will send you a copy of your results" (`EmailResults.tsx:105`, posts to a contact table, `api/index.ts:2351–2382`); "Watch your inbox" (`Membership.tsx:108`) | Site-wide | Subscribes/requests in good faith; nothing ever arrives; concludes the site is broken or careless | Two-part: (a) **today**, change every string to say only what actually happens ("You're on the list. Essays arrive via the weekly letter." / reveal the sample PDF inline instead of promising email — `SampleChapterForm` already supports `sampleUrl`, and free samples exist as `/books/*-sample.md`); (b) then wire one real transactional sender (Substack for the letter; a single provider for receipts/samples) before any inbox language returns | S (copy) + M (mailer) |
| C2 | **`/subscribe` is a fake form** — success shown, nothing recorded (`EmailSignup.tsx:40–42`), advertising 8 email sequences that don't exist (`client/src/data/email-sequences.ts`) | `/subscribe` | Enters name+email, sees success, is never heard from | Replace the page body with `SegmentedSignup` (the one honest mechanic) until sequences are real; or 302 `/subscribe` → Substack subscribe. Do not ship a form that lies, even to zero-link traffic — it is the route a subscriber guesses | S |
| C3 | **The lead-magnet funnel is broken, dishonest, and orphaned**: endpoint missing in both runtimes (`LeadMagnetLanding.tsx:155` → nothing), fabricated testimonials (`:71–90`), "Thousands have already downloaded" (`:357`), false success screen (`:184–192`); dead 25-email backend full of fake stats, fake quotes, and fake discounts (`server/email-sequences.ts:76–80,110–114,246`) | `/lead-magnets/:id` + `server/email-sequences.ts` | Click "Get Instant Access" → nothing; if it ever worked, the fabrications would do worse | Take the routes down now (redirect to `/resources`); delete or quarantine the fabricated copy so it can never be wired live by accident. Rebuild later, if at all, as honest gated PDFs on the proven `GatedDownload` pattern — which already keeps its promise by opening the file immediately | S (takedown) / L (honest rebuild) |
| C4 | **The subscriber table is a dead letter office.** 11 `NewsletterSignup` placements + sample forms + waitlist write rows no system ever mails; the real newsletter is Substack; only `SegmentedSignup` completes a Substack subscription | All signup surfaces except SegmentedSignup | "Subscribes," then never receives a single essay | Pick one truth and align everything to it: make **Substack handoff the universal completion step** (fold `NewsletterSignup` onto the `SegmentedSignup` pattern: record row → open prefilled Substack confirm), keeping the local row for the owner's own list. One mechanic, one copy voice, one promise — kept | M |

### High

| # | Leak | Where | Experience | Honest fix | Effort |
|---|------|-------|------------|------------|--------|
| H1 | **Purchase ends the relationship.** No webhook, no email capture, no post-purchase step; funnel checkout stores nothing (`api/index.ts:2587–2611`); thank-you offers only the download (`EbookThankYou.tsx:62–76`) | All 15 `/api/checkout` funnels | Pays $9.99, downloads, vanishes | On the paid thank-you state: one quiet paragraph — "The weekly letter continues what this book starts" + the `SegmentedSignup`/Substack link, and "Essays that extend this book" links. Add a Stripe webhook (or extend the existing `check` call, which already retrieves the session and could read `customer_details.email`) to record the sale + email. An invitation to a buyer is service, not pressure | M |
| H2 | **Assessment tools dead-end at a broken link and a phantom email.** `?category=` is not a param `Writing.tsx:73–83` parses; `EmailResults` is C1; no tool points at its matching book/plan | 6 major tools (e.g. `MarriageAssessment.tsx` results tail; `PastorBurnout.tsx:1625`) | Finishes a serious self-assessment; every next step fails or misleads | Fix links to real params (`/writing?track=…`); replace `EmailResults` with an honest subscribe ("Get the weekly letter — essays on exactly this" + Substack handoff); add the topically matching book card (the `KeepReadingBook` pattern, reused). After a hard diagnosis, a specific, relevant next step is pastoral care, not upselling | M |
| H3 | **16 of 21 books receive no essay traffic** — `KeepReadingBook` maps to only 5 titles (`KeepReadingBook.tsx:22–53`); the hard-issues funnels (homosexuality, transgender identity, CRT, deconstruction…) are unreachable from the essays that raise those exact questions | Essay → book funnel | Reader finishes an essay on deconstruction; is offered *Babylon* instead of *The Deconstruction of Faith* | Extend the `BOOKS` map + routing rules to cover the catalog (slug-level overrides for the hard-issues essays). Data-only change inside one component | S–M |
| H4 | **Two book pages per book with contradictory mechanics** (`/books` cards → 21 funnels; DB `BookDetail` pages run the broken sample form), plus a third, placeholder-priced checkout reachable in the SPA (`BooksStore.tsx:18` → `api/index.ts:1867–1902`, "Book One" $14.99) | Books estate | Inconsistent pages, and a latent path that could charge real money for placeholder titles | Make the funnel page the single canonical page per book (redirect `BookDetail` slugs that have funnels); delete the `BooksStore` page + the placeholder `stripe.createCheckoutSession` case (the server-side 301 already treats it as dead) | M |

### Medium

| # | Leak | Where | Fix | Effort |
|---|------|-------|-----|--------|
| M1 | Segment captured but discarded: `SegmentedSignup` never sends `audience` to the server (`:78` vs. the claim at `:8–10`); `NewsletterSignup`'s `source` prop likewise dropped (mutation input is `{email}` only) | Signup attribution | Add optional `source`/`audience` fields to `subscribers.subscribe` in **both** runtimes (`server/routers.ts:483`, `api/index.ts:2178`; prod's REST `/api/subscribe` already accepts `source` — mirror that) | S |
| M2 | Prod subscribe swallows DB errors and returns ok (`api/index.ts:2183–2186`) → success toast on silent failure | `/api` | Return the failure; let the form show the honest error state it already has | S |
| M3 | Footer has no signup — outbound Substack text links only (`Footer.tsx:27,100`); the built `footer` variant of `NewsletterSignup` has no user. ~200 Layout pages have no persistent quiet invitation | Site-wide | Mount the footer variant (with C4's Substack completion) in `Footer.tsx` — one calm, always-available door | S |
| M4 | `/tools/saved` is device-bound localStorage with no email bridge, and unregistered on the hub (`ToolsHub.tsx`) | Tools | Register it on the hub; add "email me my collection" only after a real mailer exists (C1b) — until then, the export-to-clipboard it has is the honest ceiling | S |
| M5 | No double opt-in / no confirmation on the first-party list (nothing sends one) | List hygiene | Resolved by C4: Substack's own confirm becomes the double opt-in | — |
| M6 | Zero conversion telemetry: analytics package unmounted, custom events listener-less (§6) | Measurement | Mount `@vercel/analytics`; add a 10-line listener translating the existing CustomEvents into `track()` calls; add events at buy-click / checkout-success / download. Counting is not manipulation | S |

### Low

- `EmailResults.tsx:128` hardcodes `background: "#FFFFFF"` — token-rule violation on a conversion surface (`var(--card)`).
- `ToolActions` "Start Over" does `window.location.reload()` (`ToolActions.tsx:38`) — loses scroll/state more brutally than a state reset; minor abandonment risk.
- Membership "first 100 founding members" (`Membership.tsx:105`) — fine as an offer, but nothing counts members yet; ensure it is honored precisely when Stripe goes live.
- `EbookThankYou` says "Keep this page bookmarked; your download link stays active" (`:68`) — true only as long as Stripe retains the session; consider a durable re-download path once purchases are recorded (H1).

---

## 8. What is already right (protect these)

- **Value before the ask, everywhere it matters**: free ungated samples on the funnels, six flagship essays before the homepage signup, one newsletter card per essay — never two.
- **`BuyEbookButton`'s degradation** to "request your copy by email" instead of a dead error (`BuyEbookButton.tsx:92–103`) — the page is never a dead end and never pretends.
- **The membership page's honesty**: fake testimonials removed and replaced with a section that says so; "cancel anytime, no retention sequence" stated as policy (`Membership.tsx:139–156,164`).
- **`SegmentedSignup`'s truthful handoff** ("One more step — confirm in the Substack tab") — the template for C4.
- **Price always visible before click**; no fake scarcity, no countdowns, no exit-intent traps anywhere in the live UI. The site's restraint is real. The failures are of *follow-through*, not of ethics in the visible design — with the single exception of the lead-magnet surface, which must go.

---

## 9. The changes most likely to turn a reader into a subscriber without cheapening the relationship

1. **Keep every promise or stop making it (C1 + C2 + C3).** One day of copy
   changes and takedowns: truthful toasts, reveal the sample inline, replace
   the fake `/subscribe` body, remove the lead-magnet routes and the
   fabricated copy behind them. This converts nobody by itself — it stops the
   quiet bleeding of the only asset the constitution says matters. Everything
   else builds on a site that does not lie.
2. **Make Substack the one completion step for every signup (C4 + M3).**
   Fold all forms onto the `SegmentedSignup` pattern — local row for the
   owner, Substack confirm for the reader — and mount the footer variant
   site-wide. This is the single largest subscriber-count lever: today,
   perhaps one in eight signup surfaces results in a person actually
   receiving the essays they asked for.
3. **Give the buyer and the assessment-taker a real next step (H1 + H2).**
   On the paid thank-you: one quiet invitation to the weekly letter and the
   essays that extend the book. After a marriage or burnout score: a working
   filtered link, an honest subscribe, and the one matching book. These are
   the two warmest moments on the site, and both currently end in silence or
   a broken link.
4. **Let every essay find its book (H3).** Extend `KeepReadingBook` to the
   full catalog so the deconstruction essay sells the deconstruction book.
   Small data change inside one component; direct revenue effect across 161
   essays.
5. **Turn the lights on (M6).** Mount analytics, listen to the events the
   components already dispatch, and count the five steps of the funnel.
   Measurement is not manipulation — it is how the owner would have known
   about items 1–4 without an audit.

The through-line: this platform does not need persuasion techniques. It needs
its machinery to be as honest as its prose. A reader who is told the truth at
every step — and actually receives what they were promised — is the
subscriber this platform says it wants.
