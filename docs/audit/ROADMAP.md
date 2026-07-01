# ROADMAP — Site-Elevation Master Plan

> **What this is.** The single execution roadmap synthesized from the 18 site-elevation audits
> (`00-architecture-map` through `17-tool-ideas`, all dated 2026-07-01, branch `site-elevation`).
> Every finding that survives deduplication appears exactly once below, with its source audits,
> affected files, effort, and impact. **The baseline it starts from** (`00-baseline.md`, commit
> `3967e61`): Lighthouse mobile perf **67–84** (worst: `/babylon` at 67, LCP 4,273 ms), Speed Index
> 19–21 s on every page, **1 serious axe violation** (color-contrast ×14 nodes — raw mustard on
> light surfaces, systemic), **17.9 MB JS in 627 chunks** (67 MB dist), **0 client tests / 0%
> measured coverage**, and **analytics installed but unmounted — the site measures nothing**.
> **Definition of done:** re-run the exact `00-baseline.md` method (same Lighthouse/axe/build/test
> commands, same 5 pages) and write the deltas to `docs/audit/RESULTS.md`. This roadmap governs all
> execution that follows; it is worked item by item, in the Recommended Sequence at the end.

**Standing constraints on every item** (from CLAUDE.md; restated once, assumed below):
any API change lands in **both runtimes** (`server/*` and `api/index.ts`) or in `KNOWN_PROD_GAPS`;
all copy passes the voice canon and the Revision Pass; conversion work is invitation, never
pressure — no dark patterns; crisis-facing pages keep a path to real help visible; design changes
go through `:root` tokens in `client/src/index.css`, never hardcoded hex; verify with `pnpm check`
+ `pnpm test` and look at the page before calling anything done.

---

## SECTION 1 — QUICK WINS (high impact, low effort; hours each; ranked by impact)

### QW-1 · Mount Vercel Analytics + Speed Insights
Add `<Analytics />` and `<SpeedInsights />` to `client/src/main.tsx` — both packages are already in
`package.json` (lines 65, 67) and imported nowhere. Cookieless, no consent banner needed.
**Source:** 10 (rec #1), 09 (M6), 06 (Low 15). **Files:** `client/src/main.tsx`, `package.json`.
**Effort:** XS (~10 lines). **Impact:** the platform currently records zero behavioral signals;
every week unmounted is unrecoverable data, and no later item on this roadmap is measurable without it.

### QW-2 · Wire the ten fake landing-page forms + replace the fake `/subscribe` form
Swap the hand-rolled `handleSubmit` (sets `submitted=true`, calls no API) on all ten
`landing/*.tsx` pages for the real `<NewsletterSignup />` / subscribe mutation; replace the
`/subscribe` page body (`EmailSignup.tsx:40-42` — "Backend not wired yet — show success") with
`SegmentedSignup` (the one honest mechanic) or a redirect. Preserve the page's existing copy where
possible (audit 11 rated it strong).
**Source:** 13 (C1), 09 (C2), 12. **Files:** `client/src/pages/landing/{Grief,FaithCrisis,PastoralBurnout,ParentingStruggles,MarriageCrisis,ChurchHistory,ChurchHurt,Deconstruction,HonestQuestions,PostChristian}.tsx`,
`client/src/pages/EmailSignup.tsx`. **Effort:** S (~2 h). **Impact:** every paid/social landing
funnel currently discards the reader's email and then lies about it — the trust contract is the product.

### QW-3 · Truthful-confirmation copy sweep (kill every inbox promise no system keeps)
No mailer exists anywhere in the stack; change every string to say only what actually happens:
`NewsletterSignup.tsx:36` ("Check your inbox for a confirmation"), `SampleChapterForm.tsx:38-44`
(reveal the sample inline via the existing `sampleUrl` path instead — `BookDetail.tsx:227-231`
passes `sampleUrl={null}`), `EmailResults.tsx:91,105` (retitle "Keep your results", lead with
print/copy), `Membership.tsx:108` ("Watch your inbox"), `GatedDownload.tsx:89-92` ("Send it" →
"Get the download"). Inbox language returns only after LT-4 ships a real sender.
**Source:** 09 (C1), 13 (C3–C5, H4), 14 (C3), 15 (Critical 3). **Files:** `client/src/components/{NewsletterSignup,SampleChapterForm,EmailResults,GatedDownload}.tsx`, `client/src/pages/Membership.tsx`, `client/src/pages/BookDetail.tsx`.
**Effort:** S (2–3 h, copy passes the voice canon). **Impact:** four surfaces break a promise in
the reader's first minute; the sharpest trust failure the audits found.

### QW-4 · Take down the lead-magnet funnel; quarantine the fabricated sequences
Redirect `/lead-magnets/:magnetId` to `/resources`; delete the fabricated five-star testimonials
(`LeadMagnetLanding.tsx:71-90`), "Thousands have already downloaded" (`:357`), and the false
success screen (`:184-192`); quarantine `server/email-sequences.ts` (invented stats at 110-114,
invented testimonials at 76-80, fake discounts at 114/246) so it can never be wired live as
written. The endpoint it posts to exists in neither runtime — the funnel has never worked.
**Source:** 09 (C3), 12 (Critical ×2), 13 (C2), 10 (§1.4). **Files:** `client/src/pages/LeadMagnetLanding.tsx`, `client/src/App.tsx` (route), `vercel.json` (redirect), `server/email-sequences.ts`.
**Effort:** S (takedown; honest rebuild is deferred). **Impact:** live fabricated authority — the
one trap CLAUDE.md calls brand-fatal — on a conversion surface.

### QW-5 · Source or delete the unattributed crisis-landing statistics
Six landing pages open with large-type stats ("57% of grieving adults…", "7 out of 10 couples…")
with no source on page or in code; several are untraceable to any study. Verify each against a
real citation (Barna, Pew) with on-page attribution, or delete the stat boxes — the pages stand
without them.
**Source:** 11 (C-1), 12 (High). **Files:** `client/src/pages/landing/{PastoralBurnout,Grief,FaithCrisis,MarriageCrisis,ParentingStruggles}.tsx:47-52`, `landing/Deconstruction.tsx:106-111`.
**Effort:** S (verify-or-cut, ~1 h + checking). **Impact:** invented-looking numbers on crisis
pages, on a platform whose stated unforgivable act is fabricated authority.

### QW-6 · Crisis-care help blocks where the care standard requires them
Port the `ChurchHurt.tsx:170-186` external-resources block (988 Lifeline, GRACE, RAINN) to
`/grief`, `/pastoral-burnout`, `/faith-crisis`; add a domestic-violence/abuse off-ramp screen with
hotline to the Conflict Guide (covers Trust Repair and Intimacy with no danger screen); add a
counselor/crisis block to Emotional Health's bottom two result tiers (PastorBurnout's 988 tel:
link at :1266 is the in-repo model).
**Source:** 11 (H-1), 12 (High), 14 (C1, C2). **Files:** `client/src/pages/landing/{Grief,PastoralBurnout,FaithCrisis}.tsx`, `client/src/pages/tools/ConflictGuide.tsx`, `client/src/pages/tools/EmotionalHealth.tsx`.
**Effort:** S (an afternoon). **Impact:** the constitution's "keep a path to real help visible" is
currently unmet on the highest-risk pages (bereavement + suicidality exposure).

### QW-7 · Fix mustard-on-light contrast + the failing focus ring
Swap `var(--gold)` → `var(--goldlt)` at `ToolsHub.tsx:256` and `var(--mustard)` →
`var(--mustard-text)` at `LifeAudit.tsx:677`, `PastorBurnout.tsx:682`, `MarriageAssessment.tsx:496`
(clears all 14 axe-confirmed nodes); replace the global `:focus-visible` ring (2.09–2.38:1) with a
two-tone ring in `client/src/brand-override.css:42-46` and consolidate the duplicate at
`index.css:114`; then a judged sweep of the ~656 inline `color: var(--mustard|--gold)` uses on
light surfaces. Scope the `transition: all` that fades the ring in (`LifeAudit` rating buttons).
Both fix tokens already exist and are theme-aware.
**Source:** 03 (H1, H2, M3), 08 (§3), 04 (§5 adjacent). **Files:** `client/src/pages/ToolsHub.tsx`, `client/src/pages/tools/{LifeAudit,PastorBurnout,MarriageAssessment}.tsx`, `client/src/brand-override.css`, `client/src/index.css`.
**Effort:** S (45 min for the confirmed sites; 2–4 h sweep). **Impact:** clears the baseline's only
serious axe rule (1 serious ×14 nodes) and the systemic SC 1.4.11 failure, inside the token system.

### QW-8 · Cache-Control headers (the site currently has none)
Add a headers block to `vercel.json`: `/assets/(.*)` → `public, max-age=31536000, immutable`
(filenames are content-hashed); book covers/PDFs → `max-age=86400, stale-while-revalidate=604800`;
content JSON → `max-age=300, stale-while-revalidate=86400`. Verify live response headers after deploy.
**Source:** 01 (#2). **Files:** `vercel.json:8-20`. **Effort:** S (1–2 h). **Impact:** every repeat
visit currently revalidates every chunk (`max-age=0, must-revalidate`); the cheapest field-data
(CrUX) win in the entire audit set.

### QW-9 · Delete `cache: "no-store"` from ~85 content fetches
Remove the option (default HTTP caching + QW-8's CDN headers take over) — e.g.
`PassageContext.tsx:127-128` re-downloads the 676 kB `theology/passage-notes.json` on every visit,
`Babylon.tsx:23` refetches the flagship sample every view, `WisdomFinder.tsx:55` pulls 645 kB
up-front; the whole `leadership/`, `theology/`, `prophetic/`, `life/`, `studyguides/` fetch family
follows the pattern. (Centralizing into `fetchJson` happens in HS-4; this is the mechanical strip.)
**Source:** 01 (#3), 14 (M4), 15 (Medium 25). **Files:** ~85 call sites across `client/src/pages/**` (grep `cache: "no-store"`).
**Effort:** S–M (2–4 h, mechanical). **Impact:** full-body re-downloads of every content JSON and
book sample, every visit, for every reader — pure waste.

### QW-10 · SEO plumbing: robots, sitemap ±120 routes, trailing slash, stale artifacts
Four config-level fixes in one PR: (a) `Allow: /api/og` above the `Disallow: /api` in
`client/public/robots.txt:7` — the site currently blocks its own OG images from Facebook's scraper
(the primary channel); (b) extend `scripts/generate-sitemap.mjs` with the ~120 missing indexable
routes — all 16 FAQ/compare pages, all 11 crisis landers, ~25 missing tools, the 9 `/books/*`
funnels (+ `/alone-in-a-crowded-church`), the hubs — and make the DB-failure fallback fail loudly
instead of silently shipping an essay-less sitemap (`:257-262`); (c) add `"trailingSlash": false`
to `vercel.json`; (d) regenerate or gitignore the stale checked-in `client/public/sitemap.xml`
(still lists the 301'd `/after-christendom`).
**Source:** 02 (#1, #3, #9, #10, #11), 16 (#8), 05 (§5). **Files:** `client/public/robots.txt`, `scripts/generate-sitemap.mjs`, `vercel.json`, `client/public/sitemap.xml`.
**Effort:** S (half-day). **Impact:** the pages built specifically to win search (FAQ/compare,
crisis, diagnostics) are invisible to Google today; Lighthouse SEO 100 is masking a discovery hole.

### QW-11 · Money-path error states (thank-you + buy button)
`EbookThankYou.tsx`: add a third state distinguishing network failure from "not paid" (a flaky
connection right after a charge currently shows "We couldn't confirm a purchase", `:33-36`) with a
Try-again button; replace the bare `<a href>` download (`:42,:71`) with a fetch → `res.ok` → blob
download so a paid buyer can never land on raw JSON errors. `BuyEbookButton.tsx`: generic copy for
5xx instead of raw Stripe error strings (`:84`; server leaks `String(e?.message)` at
`api/index.ts:2608`), `#9b1c1c` → `var(--alert)` (`:116`), 15 s fetch timeout (`:69`).
**Source:** 15 (Critical 1, 2; Medium 21), 13 (H1), 06 (Low 11). **Files:** `client/src/components/EbookThankYou.tsx`, `client/src/components/BuyEbookButton.tsx`, `api/index.ts:2608,2626-2634`.
**Effort:** M (half-day). **Impact:** the two worst possible outcomes on the revenue path — money
taken with the product undelivered, and a false "no purchase" after payment.

### QW-12 · Dead "See Results" gates ×5 + the latent burnout reverse-score bug
In all five wizard assessments the final button is enabled by the *current section* answered while
the click requires *all* answered — jumping via the progress dots produces an enabled button that
silently no-ops. One-line fix each: `disabled={isLastCategory ? !allAnswered : !canProceed}`
(Marriage `:674`, Financial `:684`, LifeAudit `:857`, ChurchHealth `:764`, PastorBurnout `:862`).
Fix PastorBurnout's reverse-scoring of unanswered items (`:388-389` scores a skipped reverse item
as 6 = healthy) in the same PR — it is masked only by the gate being fixed.
**Source:** 15 (Critical 7, Medium 24). **Files:** `client/src/pages/tools/{MarriageAssessment,FinancialHealth,LifeAudit,ChurchHealth,PastorBurnout}.tsx`.
**Effort:** S. **Impact:** a frozen payoff moment on the site's heaviest tools; a mental-health
instrument that could under-report burnout.

### QW-13 · Entry-diagnostic repairs (race, dead personalization, mojibake)
`StartHereDiagnostic.tsx:295-316`: `if (transitioning) return;` + clamp `setStep` — double-clicking
the last question currently white-screens or soft-locks the flagship entry. `StartHereQuiz.tsx`:
staged key fallback at `:104-109` (today ~4 of ~96 answer combinations personalize; the pastor path
is dead code), fix the mojibake "Read â" arrow (`:266`), wire or remove the dead "See My Path"
button (`:211-230`), fix the `<Link><button>` nesting (`:285-289`). (HS-9 may supersede the /start
work — see Conflicts.)
**Source:** 15 (Critical 4, 6; Medium 22), 12 (High), 14 (C4). **Files:** `client/src/pages/StartHereDiagnostic.tsx`, `client/src/pages/StartHereQuiz.tsx`.
**Effort:** S. **Impact:** the most-linked entry point on the site (nav + footer) is functionally
broken for nearly everyone.

### QW-14 · ServiceBuilder cross-slug save clobber (the one data-corruption bug)
Reset `data`/`st` at the top of the slug effect and gate the save effect on the loaded slug
(`ServiceBuilder.tsx:27-41`) — opening the wedding builder currently overwrites the saved funeral
service instantly, permanently if the second fetch fails. Validate the saved-state shape before
`setSt` (`:30,:34`).
**Source:** 15 (Critical 5). **Files:** `client/src/pages/leadership/ServiceBuilder.tsx`.
**Effort:** M (half-day incl. verification). **Impact:** destroys a pastor's saved funeral/wedding
work — the audits' only true data-corruption bug.

### QW-15 · Dead-link sweep in tool results and diagnostics
Replace every `/writing?category=…` link (a param `Writing.tsx:73-83` never parses — all land on
the unfiltered index) with real params or named essay slugs: MarriageAssessment `:1046-1192`,
PastorBurnout `:1624-1674`, LifeAudit `:1309-1461`, ChurchHealth (6× identical URL),
FinancialHealth; point BibleStudy's 12 "Companion Reading" links (`:37-288`) and EmotionalHealth's
four phantom article links at real essays; fix `/diagnostic`'s four dead result slugs.
**Source:** 09 (H2), 14 (H4), 16 (#2), 15 (Medium 26). **Files:** `client/src/pages/tools/{MarriageAssessment,PastorBurnout,LifeAudit,ChurchHealth,FinancialHealth,EmotionalHealth,BibleStudy}.tsx`, `client/src/pages/Diagnostic.tsx`.
**Effort:** S. **Impact:** every serious assessment currently releases the reader into a broken
next step; the tool→essay chain looks wired and is not.

### QW-16 · Revive the built-and-orphaned essay→tool funnel
Import `ArticleNextSteps` (complete per-tool copy, `SLUG_TOOL_RULES`, pillar fallbacks — zero
importers today) into `ArticleDetail.tsx`, rendering the "Related Tool" card above
`KeepReadingBook` (`:732`); fix its stale `/quiz` href → `/tools/theology-quiz`.
**Source:** 16 (#1), 00 (§3 dead components). **Files:** `client/src/components/ArticleNextSteps.tsx`, `client/src/pages/ArticleDetail.tsx`.
**Effort:** S (the component and mapping already exist). **Impact:** 161+ essays — the traffic
surface — each gain a matched tool exit; the highest-odds tool-discovery change available.

### QW-17 · Tool→book bridge (the first tool→revenue links on the site)
One sentence + link on four result/exit screens: Marriage Assessment → `/covenant`; Pastor Burnout
→ `/the-loneliness-of-the-pastor` (+ `/healwell`); Rule of Life Builder → `/rule-of-life` (the
same-named book it never mentions); Deep Bible Companion → `/how-to-read-the-bible` (persistent
footer card — it has no results screen). Invitation register, never pressure.
**Source:** 16 (#3), 14 (M2). **Files:** `client/src/pages/tools/{MarriageAssessment,PastorBurnout,RuleOfLife,DeepBibleCompanion}.tsx`.
**Effort:** S. **Impact:** zero tool→book links exist today; the trust surface and the revenue
surface never touch.

### QW-18 · Widen `KeepReadingBook` to the full catalog
Extend the `BOOKS` map + routing rules (`KeepReadingBook.tsx:22-53`) from 5 titles to the full
catalog, with slug-level overrides so the hard-issues essays route to their matching books
(deconstruction essay → *The Deconstruction of Faith*, not *Babylon*). Data-only change in one component.
**Source:** 09 (H3), 11 (M-5), 16 (§4). **Files:** `client/src/components/KeepReadingBook.tsx`.
**Effort:** S–M (data work). **Impact:** 16 of 21+ books currently receive no essay traffic from
the site's best-designed conversion surface.

### QW-19 · Tool-wiring corrections on hubs and crisis pages
`/pastoral-burnout` NEXT STEP → `/tools/pastor-burnout` (currently sends readers to
emotional-health while a purpose-built 1,682-line burnout diagnostic exists); `/faith-crisis` →
theology-quiz or `/start` (currently generic bible-study); add a "Tools for parents" block to
`Parenting.tsx` (copy the `Family.tsx:262-274` pattern) and one instrument CTA to `Doubt.tsx`
(currently zero); point or relabel Home's "Find the tools" CTA (`Home.tsx:48` promises tools,
delivers `/resources`).
**Source:** 16 (#4, #7, #9). **Files:** `client/src/pages/landing/{PastoralBurnout,FaithCrisis}.tsx`, `client/src/pages/{Parenting,Doubt,Home}.tsx`.
**Effort:** S. **Impact:** the burnout page bypassing the burnout tool is the single worst
wiring miss; /doubt serves audience #2 with no instrument.

### QW-20 · Register the orphan tools; fix hub copy lies
Add `/tools/bible-says` (the best verse tool in the estate), `/tools/quotes`, `/tools/glossary` to
the `ToolsHub.tsx` registry (renaming per audit 16 §5: "Misused Verses — What the Bible Actually
Says", "Quote Library"); make `/tools/saved` always visible; add the Formation Inventory card to
`LeadershipHub.tsx` (the flagship is missing from its own hub); delete the stale "More tools coming
soon — Sermon outline builder…" CTA (`ToolsHub.tsx:284-289` — it already lists that tool); reconcile
Theology Quiz "Twenty questions" (hub) vs "10 questions" (tool).
**Source:** 14 (H1, L1), 16 (#5, #6, #10), 05, 00 (§4). **Files:** `client/src/pages/ToolsHub.tsx`, `client/src/pages/leadership/LeadershipHub.tsx` (via `lib/leadership.ts`).
**Effort:** S. **Impact:** closes a standing Decision-Log violation; the estate's best assets are
currently reachable only by typing URLs.

### QW-21 · Mobile touch-target and input-size sweep
Grow the 10×10 px progress-dot buttons to ≥24 px hit areas (visual dot unchanged) in
`LifeAudit.tsx:641-663` + `MarriageAssessment.tsx:465-482`; set 16 px on the three inputs that
trigger iOS zoom-on-focus (`SegmentedSignup.tsx:291` — the homepage's primary capture,
`Writing.tsx:438`, `SermonWorkbench.tsx:97` ×7 textareas); raise the 12 px ebook buy links
(`Books.tsx:537,564,593` — the revenue click) and footer links to ≥14 px with padding to ~44 px
boxes + 44 px theme toggle (`Footer.tsx:6,27,107,114-116`); eyebrow token 11 px → 12 px
(`index.css:370`, also closes the CLAUDE.md 0.75rem contract drift); nav byline 9 px → 11–12 px
(`MinimalNav.tsx:409`).
**Source:** 04 (#2–#8). **Files:** as listed. **Effort:** S–M (a day of one-liners).
**Impact:** the worst controls on the site sit inside the two self-assessments people take on
phones; the buy link is the smallest tap target on `/books`.

### QW-22 · Security config batch: SEED_KEY, enforce CSP, frozen lockfile
(a) Set a dedicated `SEED_KEY` in Vercel and replace the `SEED_KEY || JWT_SECRET || ""` fallback at
`api/index.ts:89` with a hard fail — today one leaked `JWT_SECRET` unlocks both session forgery and
every seed/DB-inventory endpoint. (b) Rename `Content-Security-Policy-Report-Only` →
`Content-Security-Policy` (`vercel.json:17`; the policy already matches what the site loads —
verify Stripe/fonts/YouTube after). (c) Delete `package-lock.json`; change the Vercel install to
`pnpm install --frozen-lockfile` (`vercel.json:4`) so deploys resolve the committed tree.
**Source:** 06 (High 1, High 3, Medium 4), 00 (§1). **Files:** `api/index.ts:89`, `vercel.json:4,17`, `package-lock.json`, Vercel env.
**Effort:** S (~1 h + a verification deploy). **Impact:** the audit's top-ranked latent admin
bypass, an unenforced CSP, and a supply-chain reproducibility gap — all config-level.

### QW-23 · Rate limiting on login and the public write endpoints
Add a limiter (`@upstash/ratelimit` or Vercel's built-in; needs one env-backed store) — strict on
`/api/auth/login` (`api/index.ts:2036`; single admin password, unlimited attempts today), looser on
`/api/subscribe` (`:719`), `/api/pcn/signup` (`:738`), `/api/contact` (`:2351`). Both runtimes.
**Source:** 06 (High 2, Medium 6). **Files:** `api/index.ts`, `server/_core/*` (dev mirror), env.
**Effort:** M (half-day; store provisioning). **Impact:** the highest-value endpoint has zero
brute-force protection; deferred in the prior security audit and still open.

### QW-24 · Contact/results dead-letter fix
`/api/contact` only inserts into `contact_messages`; no admin UI reads the table and nothing emails
the owner — submissions (including EmailResults payloads from the assessments) are silently lost.
Forward new rows to the owner's email (or add a minimal admin reader), and stop returning
`{ok:true}` when the insert failed (`api/index.ts:2377-2378`) so the client's existing error state
fires. Both runtimes; remove the `!` from "Message received. Thank you!" (`:2378`) while there.
**Source:** 06 (Medium 7), 09 (§1c), 15 (Critical 3 server half), 13 (M7). **Files:** `api/index.ts:2351-2382`, `server/routers.ts` contact path, `client/src/components/EmailResults.tsx`.
**Effort:** M (half-day). **Impact:** the brand promises a person reads that inbox; today no one can.

### QW-25 · Point the header Subscribe at the owned list; mount the footer signup
The header Subscribe button routes to `/substack` (an external list) while the homepage panel feeds
the site's own list — point it at the segmented signup surface (`MinimalNav.tsx:604-623`), and
mount the already-built `footer` variant of `NewsletterSignup` in `Footer.tsx` (today: outbound
text links only, no form on ~200 Layout pages).
**Source:** 05 (#5), 09 (M3, C4-adjacent). **Files:** `client/src/components/MinimalNav.tsx`, `client/src/components/Footer.tsx`, `client/src/components/NewsletterSignup.tsx`.
**Effort:** S. **Impact:** three subscribe surfaces currently compete, and the header sends readers
to the one list the platform does not own.

### QW-26 · Voice kill-list + microcopy register batch
Fix the 12 mechanical canon hits (nuanced ×2, transformative ×2, leverage ×2, navigating, journey,
"do the work" verdict on `BibleAndHomosexuality.tsx:69`, "showing up" `DiscipleMaking.tsx:106`,
"Copied!" `ToolActions.tsx:95`, "Check back soon!" `ReadingPathDetail.tsx:149`) using audit 12's
in-register rewrites; the ellipsis (`...`→`…`) and placeholder (`your@email.com`) sweeps; "Learn
More" → "See the book →" (`PostChristian.tsx:265`); extract the canonical author bio to one
constant and fix `WhenGodBlessAmerica.tsx:109,151`; rewrite the Theology Quiz intro/results lines
and the four product-sheet ToolsHub blurbs; add "about N minutes" to each diagnostic's hero.
**Source:** 12 (all mechanical + Medium), 13 (M1, M2, M5, M11, H3, H7), 11 (M-3, M-4). **Files:** per audit 12 §1 tables, `client/src/pages/ToolsHub.tsx`, `client/src/lib/positioning.ts`.
**Effort:** S (half-day; every rewrite passes the Revision Pass). **Impact:** the borrowed voices
evicted from an otherwise clean estate; 33 catalogued violations cleared.

### QW-27 · Error/empty/loading-state batch
Linked search empty state (`Search.tsx:335` names an exit with no door); pastoral ErrorBoundary copy
(`ErrorBoundary.tsx:34,53`); drop the three raw `error.message` passthroughs
(`NewsletterSignup.tsx:44`, `SampleChapterForm.tsx:61`, `BuyEbookButton.tsx:84` — overlaps QW-11);
give `PageFallback` words + tokens (`App.tsx:281-287`); replace the six bare "Not found" H1s on
JSON-library pages with the `HowToArticle.tsx:58` pattern; guard the "All 0 books" flash
(`Books.tsx:733`) and swap bare `Loading…` strings for cream-warm skeleton bands (`Writing.tsx:609`,
`Home.tsx:493`).
**Source:** 13 (H1, H2, H5, H6, H9, L2), 08 (#4). **Files:** as listed + `client/src/pages/{studyguides/StudyGuide,life/LifeDomain,history/HistoryEssay,leadership/FormationTopic,leadership/LeadershipArticle,plans/CarePlan}.tsx`.
**Effort:** S (2–3 h). **Impact:** "a serious book in a quiet room" does not say `Loading…` over a
naked spinner; failure states currently strand readers.

### QW-28 · Docs truth pass (the docs that actively lie)
Fix `design-system.md`'s three wrong brand hexes and phantom token names (or demote/regenerate it
from `:root` — it claims an authority CLAUDE.md assigns to `index.css`); refresh `ARCHITECTURE.md`
counts (api/index.ts 2,691 not ~2,040; 260 routes); reconcile CLAUDE.md's five-vs-six-pillar
contradiction (Decision Log vs `taxonomy.ts` PILLARS_V2); make `docs/VOICE.md` defer to CLAUDE.md
or retire it; delete the fictional `SiteStructuredData` comment in `client/index.html:44-46`.
**Source:** 07 (§8, R5), 08 (#2), 12 (canon note), 02 (#12), 00 (§6). **Files:** `design-system.md`, `docs/ARCHITECTURE.md`, `CLAUDE.md`, `docs/VOICE.md`, `client/index.html`.
**Effort:** S (hours). **Impact:** in a repo maintained largely by AI sessions, a doc with wrong
brand hexes repaints the brand wrong; every future session starts from these premises.

### QW-29 · Repo hygiene and exposure: dependencies, debug plugin, admin JSON off the public dist
Remove the five unused packages (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`, `date-fns`,
`tw-animate-css`, `vite-plugin-manus-runtime`, `@types/google.maps`); move `mammoth`/`@types/xml2js`
to devDeps; bump `drizzle-orm` and `vitest` — this alone deletes the fast-xml-parser high-severity
subtree (prod audit 60 vulns → mostly noise gone). Make `@builder.io/vite-plugin-jsx-loc` dev-only
(`vite.config.ts:11` — 10,613 `data-loc` attrs ship to prod today). Move `admin-article-bodies.json`
(4.3 MB, 247 draft bodies with unverified `[cite]` stubs at a public URL) and `article-library.json`
(1.1 MB) behind the authed admin API — both runtimes.
**Source:** 06 (Medium 9, Low 10), 01 (#8, #10), 00 (§5, §6). **Files:** `package.json`, `vite.config.ts`, `client/public/admin-article-bodies.json`, `client/public/article-library.json`, `api/index.ts`, `client/src/pages/{AdminPublishContent,AdminLoadDrafts}.tsx`.
**Effort:** S–M (half-day + parity check). **Impact:** kills most of the scary dependency-audit
numbers, ~550 kB of dist bloat, and a public leak of pre-publication prose the publish guard
specifically blocks.

### QW-30 · Image pipeline: WebP covers + intrinsic dimensions
Batch-convert the 16 book-cover JPGs over 200 kB to WebP/AVIF at 2× display size via a small script
in the existing `scripts/` pipeline (−2.5–3 MB across catalog surfaces); add `width`/`height` to
`BookCover.tsx:35-43` and the nine pages with unsized `<img>` tags (latent CLS; measured CLS is
0.000 today — keep it there).
**Source:** 01 (#9, #13). **Files:** `client/public/books/*.jpg`, new `scripts/` entry, `client/src/components/BookCover.tsx`, nine pages per 01 §3.
**Effort:** S (2–3 h). **Impact:** the only heavy rasters on the site; protects the perfect CLS baseline.

---

## SECTION 2 — HIGH-IMPACT STRUCTURAL (worth real effort; days each; ranked by impact)

### HS-1 · Replace streamdown with one shared `<Markdown>` (react-markdown + remark-gfm)
Build one wrapper component (both deps are already installed as streamdown's own), swap the 21
import sites (most already funnel through `client/src/lib/prose.tsx:11,50`), and visually diff one
article and one book sample. Streamdown statically drags shiki + KaTeX into a 263 kB-gz shared
chunk paid on all 68 markdown routes, plus ~14 MB of grammar/mermaid/cytoscape chunks in dist —
to render trusted prose with no code, math, or diagrams.
**Source:** 01 (#1 — Critical), 00 (§5), 04 (§2), 06 (§1 dep subtree). **Files:** `client/src/lib/prose.tsx`, `ArticleDetail.tsx:14`, 12× `pages/books/*`, `BookReader.tsx`, `HowToArticle.tsx`, `WholeBibleSermons.tsx`, `ServantLeadershipHandbook.tsx`, `FormationGuides.tsx`, `AdminAbout.tsx`, `package.json`.
**Effort:** M (1 day incl. visual verification). **Impact:** the single biggest CWV lever —
baseline `/babylon` perf 67 / LCP 4,273 ms / TBT 178 ms is this chunk; est. LCP → ~2.6–2.9 s,
dist 17.9 MB → ~4 MB, 627 → ~180 chunks, build warning gone.

### HS-2 · First-paint wave: fonts, nav manifest, query defaults, shell, chunk diet
Five coordinated changes that decouple first paint from third parties and the API:
(a) self-host subsetted woff2 for Cormorant Garamond + Inter with `@font-face`, preload, and
metric-compatible fallbacks — also removes the Google-Fonts IP leak (GDPR); (b) emit `navIndex`
counts as a build-time manifest (the `scripts/build-*-index.mjs` pattern; a static fallback map
already exists in `MinimalNav.tsx:190-193`) so the header stops blocking on a tRPC round trip;
(c) QueryClient defaults in `main.tsx:12` — `retry: 1`, `staleTime: 5m`,
`refetchOnWindowFocus: false` (the 3-retry storm is the dominant cause of lab SI 19–21 s);
(d) static brand shell in `client/index.html` + a nav-band/skeleton Suspense fallback +
`startTransition` navigations (the throttled mobile run shows blank cream for ~13 s, then an
unbranded spinner to ~20 s on deep links); (e) eager-chunk diet — lazy-load `Writing`/`Books`
(~85 kB of taxonomy data ride along today), fix `manualChunks` so react-dom lands in a stable
vendor chunk, lazy-mount CommandPalette on first ⌘K.
**Source:** 01 (#4, #5, #6, #7 + §1a–1d), 04 (#1), 06 (Medium 5), 13 (H2), 07 (#10). **Files:** `client/index.html`, `client/src/index.css`, `client/src/main.tsx`, `client/src/App.tsx:12-15,281-287`, `client/src/components/{MinimalNav,CommandPalette}.tsx`, `vite.config.ts:148-155`, new `scripts/build-nav-index.mjs`.
**Effort:** M–L (2–3 days). **Impact:** baseline FCP 2.4 s → ~1.5 s and Speed Index 19–21 s → low
single digits across all 260 routes; eager payload ~196 → ~130 kB gz.

### HS-3 · Client test harness: money-path contracts + route smoke (R1)
Add a vitest jsdom project for `client/**` with @testing-library and fetch/tRPC stubs; contract
tests for `BuyEbookButton` (200 redirect / 503 email fallback / 500 error) and `EbookThankYou`
(paid / unpaid / network — the network case fails today and QW-11 makes it pass); a render-smoke
loop over the ~260-route table in `App.tsx` asserting no throw and non-empty main content.
**Source:** 07 (R1, #2), 00 (§8 — 0 client tests). **Files:** `vitest.config.ts`, new `client/src/**/*.test.tsx`, `package.json`.
**Effort:** L (2–3 days). **Impact:** baseline is 0 client tests over 243 pages / 52 tools /
the checkout path; this is the prerequisite that makes LT-1/LT-2 (and every consolidation) safe.

### HS-4 · The three shared hardening helpers + silent-failure sweep (R4 + Part H)
(a) `copyToClipboard(text): Promise<boolean>` modeled on QuoteLibrary's gold standard — fixes ~16
false-"Copied"/throwing sites across 13 files; (b) the fetch error+retry pattern (error state +
retry nonce + back-link) applied to the 8+ infinite-"Loading…" loaders — the four leadership JSON
engines, IllustrationLibrary, TheologyDiagnostic, WisdomFinder, PassageContext's local data
(currently blames the user's valid input), and TheologyQuiz's two tRPC queries via
`isError`/`refetch`; (c) `readStoredJSON<T>(key, validate)` / `writeStoredJSON` modeled verbatim on
`FormationInventory.tsx:237-255` — retires ~12 shape-crash sites (useFavorites white-screens ×4
pages, SavedItems "NaN items", VisitationTracker/DecisionLog/MeetingBuilder/BudgetCalculator
"$NaN"/blank pages over pastoral data, ScriptureMemory bogus counts, useFormationTracker Dashboard
crash) and surfaces the 11 silent `setItem` failures ("Couldn't save to this browser" line).
Fold in 07's `fetchJson<T>(url, schema?)` + `<LoadFailed retry>` sweep of the 50 silent
`.catch(() => {})` sites — same seam, one PR series.
**Source:** 15 (Part H; High 8–13, Medium 17–18), 07 (R4, #4, #5, #6). **Files:** new `client/src/lib/{clipboard,fetch-json,storage}.ts`; call-site lists in 15 Part G/H and 07 §3.
**Effort:** L (2–3 days). **Impact:** failures become visible, recoverable, and consistent across
~50 surfaces; every future page inherits the right behavior by default.

### HS-5 · Persistence + revise-from-results for the long instruments
Using HS-4's storage helper: guarded localStorage for the six self-assessments (12–24 answers lost
on refresh today — the site's longest sessions are the only unpersisted ones), LeaderAssessment +
ProfileSurvey (up to 90 answers), and RuleOfLife's composed rule; sessionStorage mirrors for the
four entry diagnostics; a non-destructive "Change my answers" on every results screen (full-reset
is the only path today); named multi-instance saves for the single-slot pastoral tools
(SermonWorkbench, GuidedWorkflow — two counseled couples currently overwrite each other,
ServiceBuilder, MeetingBuilder) and export for VisitationTracker/DecisionLog (pastoral-care and
benevolence records currently trapped in one browser).
**Source:** 15 (High 15–16, Medium 19–20, 23; Part D), 14 (H2, H3, H6), 07 (#6). **Files:** `client/src/pages/tools/*` (six assessments), `client/src/pages/leadership/{LeaderAssessment,ProfileSurvey,GuidedWorkflow,ServiceBuilder,SermonWorkbench,MeetingBuilder,VisitationTracker,DecisionLog}.tsx`, `client/src/pages/{Diagnostic,StartHereQuiz,StartHereDiagnostic,TheologyQuiz}.tsx`.
**Effort:** L (2–3 days after HS-4). **Impact:** refresh amnesia is the default across the estate;
the highest-effort user sessions on the site are the most fragile.

### HS-6 · Prerender heads for every static route
Extend `scripts/prerender-heads.mjs` beyond its 13 hand-listed pages + 6 library types with a
route-manifest pass (title/description/canonical/OG per route) and the 4 manifest sources the
sitemap knows but the prerender doesn't (`/studyguides/:slug`, `/table/:slug`, `/how-tos/:slug`,
`/read/:slug`). Today ~150 URLs — all FAQ/compare, crisis landers, funnels, tools, hubs — serve the
*homepage* head to every non-JS consumer (social scrapers, Bing, answer engines) and unfurl as
duplicate homepages.
**Source:** 02 (#4, §1.4). **Files:** `scripts/prerender-heads.mjs`, possibly a route-meta manifest module.
**Effort:** M (1–2 days). **Impact:** turns ~150 duplicate-homepage signatures into distinct pages
for every crawler and every shared link; full body prerender stays deferred (LT-6).

### HS-7 · Internal-link mesh: open the sealed islands
Build a `/faq` index page and link it from the footer ("Questions people ask" column) and
`/theology/questions`; link all 11 crisis landers from `/help` (today it links exactly 2); link the
6 compare pages from `/theology/compare` (which, despite the name, links none) and the FAQ index;
add inbound links from the relevant essays/hubs. The 16 FAQ/compare pages currently have zero
inbound links from outside their own directories — in neither the sitemap (fixed by QW-10) nor the
link graph.
**Source:** 02 (#2, #5), 05 (#3), 16. **Files:** new `client/src/pages/FaqIndex.tsx` + route, `client/src/components/Footer.tsx`, `client/src/pages/Help.tsx`, `client/src/pages/TheologyCompare.tsx` (+ `App.tsx`).
**Effort:** S–M (1 day). **Impact:** activates 27 purpose-built audience-catching pages that
Google and site visitors currently cannot reach.

### HS-8 · Homepage doors by reader condition + commerce/tools presence
Rewrite the four mission doors (`Home.tsx:35-64`) to the ranked audiences' conditions — "I'm
skeptical" → `/skeptic-track`, "My faith has questions" → `/doubt`, "Life is heavy right now" →
`/help`, "I lead a church" → `/leadership` — and add a books row and a tools moment to the homepage
body. Today audiences #1 and #2 have no door, the skeptic link is a low-contrast tertiary, tools
have zero homepage presence, and a book purchase is 3 clicks deep with no scent. Copy passes the
voice canon; doors are honest wayfinding, not persuasion.
**Source:** 05 (#2, §3), 09 (§1a), 16 (#9). **Files:** `client/src/pages/Home.tsx`, `client/src/lib/positioning.ts`.
**Effort:** M (1–2 days incl. copy). **Impact:** every first-time visitor; the ranked-audience
strategy is currently inverted at the front door.

### HS-9 · One front door: make `/start-here` canonical (owner-confirmed)
301 `/start` → `/start-here` (vercel.json + SPA), swap the nav (`MinimalNav.tsx:162`) and footer
(`Footer.tsx:53`) links, add segmented email capture to the StartHereDiagnostic results screen (the
pattern lives on the orphaned `/diagnostic`), and cross-point `/diagnostic` from the results. Three
overlapping onboarding quizzes exist; the broken one owns the URL, the nav, and the homepage CTA
while the excellent one is linked only from an orphaned dashboard. Owner confirms the winner before
the 301 lands (audits 05/11/14 all converge on StartHereDiagnostic).
**Source:** 05 (#4), 11 (H-3), 14 (C4, §4 item 12), 15 (Part B). **Files:** `vercel.json`, `client/src/App.tsx`, `client/src/components/{MinimalNav,Footer}.tsx`, `client/src/pages/StartHereDiagnostic.tsx`.
**Effort:** S–M (1 day). **Impact:** the most-linked entry point on the site becomes the best one
instead of the broken one. (See Conflict #1 — QW-13 repairs `/start` in the interim.)

### HS-10 · Signup unification on the Substack-completion pattern
Fold `NewsletterSignup` (11 placements) and the sample/waitlist forms onto the `SegmentedSignup`
mechanic: record the local row, then open the prefilled Substack confirm inside the click gesture
with the truthful "one more step" panel — today only 1 of ~8 signup surfaces results in a person
actually receiving essays. Pass `source` through both runtimes (prod REST `/api/subscribe` already
accepts it; add it to the tRPC `subscribers.subscribe` input in `server/routers.ts:483` and
`api/index.ts:2178`); stop swallowing subscribe DB errors (`api/index.ts:2183-2186`); remove the
email address from the CustomEvent payload. The `segment` column is schema-gated — see Deferred.
**Source:** 09 (C4, M1, M2), 10 (#5), 13. **Files:** `client/src/components/{NewsletterSignup,SegmentedSignup,SampleChapterForm}.tsx`, `server/routers.ts`, `api/index.ts` (both runtimes — parity test).
**Effort:** M (2 days). **Impact:** the single largest subscriber-count lever in audit 09; one
mechanic, one copy voice, one promise — kept.

### HS-11 · Record purchases + give the buyer a next step
Add the Stripe webhook (`checkout.session.completed`) using the already-written-but-dead
verification helper (`server/stripe-service.ts:160-168`): flip `book_purchases.status` to
`succeeded`, insert a row for `/api/checkout` ebook sales (currently recorded nowhere), capture
`customer_details.email`. On the paid thank-you state, add one quiet paragraph — the weekly letter
+ "essays that extend this book" links (invitation, not upsell). Delete the placeholder-priced
`BooksStore` checkout path ("Book One/Two/Three" $14.99–16.99 at `api/index.ts:1867-1902` — a
live-wire wired to real money). Both runtimes; webhook secret env.
**Source:** 09 (H1, H4-part), 10 (#2), 06 (Medium 8). **Files:** `api/index.ts`, `server/stripe-service.ts`, `client/src/components/EbookThankYou.tsx`, `client/src/pages/BooksStore.tsx`, `vercel.json`/env.
**Effort:** M (2 days). **Impact:** every sale currently reads `pending` forever and the
relationship ends at the download — the warmest reader the platform has is released in silence.

### HS-12 · Dark-mode repair + user-visible hex tokenization
Fix the broken dark theme (recommended over pulling the toggle; owner may choose otherwise): add an
on-dark text token so `charcoal`+`bone` sections keep light type when `--bone` inverts (the
homepage hero is near-black-on-near-black today), add the `html.dark .nav-wrap` override
(`index.css:135` is hardcoded rgba), and sweep every dark section incl. `Books.tsx`'s
`--ink`-as-background rows. In the same pass, tokenize the user-visible hex hotspots:
`DeepBibleCompanion.tsx` (73 hexes — dead to theming), `QuoteLibrary.tsx` (41), `StartHereQuiz.tsx`
(16 off-palette category colors), `Footer.tsx:7,19`, `BookRecommendations.tsx:36,61`,
`ArticleCard.tsx:31`, `EmailResults.tsx:128-129`, `BudgetCalculator` `#b4541f`, `TheologyQuiz`
off-token styling.
**Source:** 08 (#1, #5), 14 (L2), 15 (#44), 13 (L3, L6), 00 (§3). **Files:** `client/src/index.css`, pages/components as listed.
**Effort:** M–L (2–3 days). **Impact:** dark mode is "the one place the site currently looks
careless"; the hex pages will break any future brand change.

### HS-13 · Shared `<Button>` and `<Eyebrow>` primitives for the public site
Build the two components against the (QW-28-corrected) spec and migrate the public pages: collapses
~15 button padding recipes, the 2px/3px radius split, 14–16 px size wobble, and the ten
letterSpacing values on eyebrow labels (contract: Inter 0.75rem/500/0.18em; even the Home kicker is
off-spec today). Migrate highest-traffic surfaces first; long-tail migration can trail.
**Source:** 08 (#3, §4.1, §4.3). **Files:** new `client/src/components/ui`-adjacent primitives; call sites across `client/src/pages/**`.
**Effort:** M (2–3 days for the primitives + the top 30 pages). **Impact:** the most *visible*
consistency win per hour; every page currently re-derives the design from memory.

### HS-14 · Tools-hub regroup + card-wall editorial grouping
Replace the flat 26-card grid with audit 16's five need-based groups ("Find out where you stand" /
"Go deeper in Scripture" / "Build a rhythm you can keep" / "For your household" / "For pastors &
leaders"), a "Not sure where to start?" router line → `/help`, hub-vs-tool labels, the ten §7.2
value-prop lines, and a rewritten hero (H1 "Tools for the Work of Ministry" loses the seeker);
apply the same editorial-grouping treatment to `/leadership`'s ~50-card wall and batch `/books`'
14 identical rows (fixing the consecutive-dark `--ink`/`--charcoal` runs while in there).
**Source:** 16 (§7.1, §7.2, #5), 08 (#7), 14 (L1). **Files:** `client/src/pages/ToolsHub.tsx`, `client/src/pages/leadership/LeadershipHub.tsx`, `client/src/pages/Books.tsx`.
**Effort:** M (2 days). **Impact:** the site's most differentiated asset reads as directory
software; grouping is what the estate's 26 good descriptions can't do alone.

### HS-15 · Pastor-channel and conversion-page copy (the hoarded distinctives)
Anchor the PCN cluster in its founder: across five pastor pages PCN is named 20+ times and James
Bell zero — add the origin paragraph (15 years, founder, *The Loneliness of the Pastor*) to
`/pastors` and the cluster; write `/living-well`'s missing opening argument; replace
`/work-with-james`'s services list with the pitch only Bell can make; give `/membership` its
"why this room exists" paragraph; replace `/substack`'s three boilerplate benefit cards; one-line
author anchors on `/doubt` (the ex-atheist page without the ex-atheist), `/exile`, `/wisdom`,
`/roadmap`; vary the ×12 books-catalog closer and the ×10 verbatim bio. Copy only — the pastor-page
*consolidation* (deleting routes) is owner-gated (see Deferred).
**Source:** 11 (H-2, H-4, H-5, M-1, M-2, M-6, M-7), 12. **Files:** `client/src/pages/{Pastors,ForPastors,ForLeaders,PastorsResourceWall,LivingWell,WorkWithJames,Membership,Substack,Doubt,Exile,Wisdom,RoadMap,Books}.tsx`.
**Effort:** M (2–3 days of writing; every piece passes the Revision Pass). **Impact:** the
platform's highest-yield channel argues "you shouldn't lead alone" without the one fact that makes
it different; conversion pages are missing the only seller the platform has.

---

## SECTION 3 — LONG-TERM (bigger bets, sequenced later; ranked by impact)

### LT-1 · Book-funnel + FAQ/compare template consolidation (R2)
One parameterized `BookFunnel` component + a per-book data module (unifying the two buy flows
behind one prop) replacing ~48 near-identical files (~85% duplicate); then the same move for the 10
FAQ pages (~76% identical) and 6 comparison pages (~65–70%). All URLs survive via parameterized
routes — no user-facing route is deleted. A new book becomes one data entry instead of 7 hand-edits
across 2 runtimes.
**Source:** 07 (§1, R2), 00 (§2), 09 (H4). **Files:** `client/src/pages/books/*`, 11 root funnels, `client/src/pages/faq/*`, `client/src/pages/comparisons/*`, `client/src/App.tsx`, new data modules.
**Effort:** L (3–5 days, after HS-3). **Impact:** deletes ~4,700 lines / 64 files; SEO/a11y/CRO
fixes land on all 24 funnels at once instead of one template family in three.

### LT-2 · Assessment JSON-engine migration (R3)
Generalize the proven 108-line `LeaderAssessment` engine (inverted items, per-category bands and
recommendations, persistence from HS-5) and migrate the six hardcoded assessment clones (~7,930
lines — the repo already contains `burnout.json` *and* a 1,681-line `PastorBurnout.tsx` of the same
instrument) onto JSON, with a `validate-assessments.mjs` CI gate so voice rules finally cover
verdict prose. Existing URLs preserved via a slug map.
**Source:** 07 (§2, R3), 14 (§1a). **Files:** `client/src/pages/leadership/LeaderAssessment.tsx` (engine), `client/src/pages/tools/{PastorBurnout,LifeAudit,ChurchHealth,MarriageAssessment,FinancialHealth,EmotionalHealth}.tsx` → `client/public/` JSON, new `scripts/validate-assessments.mjs`.
**Effort:** L (4–6 days, after HS-3/HS-4/HS-5). **Impact:** the single biggest content-velocity
unlock — new assessments become content, not code; scoring becomes unit-testable.

### LT-3 · First-party event pipe + `/admin/measures` dashboard (schema-gated)
The 14-event anonymous schema from audit 10 (`article_finished`, `reading_path_completed`,
`tool_completed`, `subscribe{source,segment}`, `checkout_started`, `purchase`, bucketed
`search_performed`, …): one `events` table (**schema change — owner sign-off**), a `POST /api/event`
REST handler in both runtimes, a `track()` helper with the crisis-route guard (aggregate pageviews
only on `/grief`, `/doubt`, etc. — no behavioral events), and the eight-number weekly dashboard.
Delete `server/analytics-service.ts`'s `Math.random()` bounce rate and the uncalled
`analyticsRouter` — fabricated metrics behind a public procedure.
**Source:** 10 (#3, #4, #6, §3–§6), 09 (M6). **Files:** `drizzle/schema.ts` (owner), `api/index.ts`, `server/*`, new `client/src/lib/track.ts`, new `client/src/pages/AdminMeasures.tsx`, delete `server/analytics-service.ts`.
**Effort:** L. **Impact:** makes the platform's own success definition (essays finished, paths
completed, books bought) visible for the first time; QW-1 covers pageviews/CWV until this lands.

### LT-4 · Real transactional email + honest sequence rewrite (ESP decision-gated)
Owner decides the sender (Substack for the letter is already the real newsletter; one transactional
provider for receipts/samples/results — the Mailchimp code is uncalled with placeholder creds and a
`noreply@livewell.com` reply-to on a domain the platform doesn't own). Then: wire the sends that
QW-3's copy stopped promising (sample chapters, assessment results, welcome), and rewrite the
sequence content from scratch under the voice/integrity standard — the existing
`server/email-sequences.ts` is unshippable as written (QW-4 quarantined it).
**Source:** 09 (C1b, C4), 10 (#7, #9), 13. **Files:** `server/mailchimp.ts` or replacement, `api/index.ts`, `server/email-sequences.ts` (rewrite), copy call-backs to QW-3 sites.
**Effort:** L. **Impact:** the inbox-promise copy can only return once this exists; unlocks
sample-by-email, results-by-email, and the retake reminders audits 14/17 want.

### LT-5 · Type-scale and spacing/radius/shadow token normalization
Implement the `--text-*` scale (documented in design-system.md, never built), collapse the ~40 hero
`clamp()` recipes to 2–3 and chip at the 154 distinct font sizes headings-first; normalize
`"2px"` → `var(--radius-sm)` (167 sites), fold the 10 raw shadow recipes into the 2 tokens, migrate
`"80px 24px"` sections (×91) to `--s-*`. Incremental, mechanical, low regression risk after HS-13.
**Source:** 08 (#6, #9, §1.1, §2.1). **Files:** `client/src/index.css`, sweep across `client/src/pages/**`.
**Effort:** L (incremental). **Impact:** the system under the brand — the look currently holds only
because one voice wrote most of it.

### LT-6 · Body prerender / SSG re-evaluation (evidence-gated)
After QW-10 + HS-6 have been live 6–8 weeks, read Search Console coverage. Only if the
rendered-vs-crawled gap persists, extend prerendering to visible body HTML for the static page
types (FAQ/compare/crisis/funnels). Explicitly not a framework migration (Decision Log).
**Source:** 02 (§7 closing), 00. **Files:** `scripts/prerender-heads.mjs` successor.
**Effort:** L. **Impact:** contingent; the head-prerender + JSON-LD articleBody already covers the
essays, which matter most.

### LT-7 · Dead-weight pruning ritual + PWA decision
One deliberate pass: delete the 6 dead components (5 shadowed by ArticleDetail local copies —
except `ArticleNextSteps`, revived in QW-16 — plus `ShoppingCart`), the 38 unused `ui/` primitives,
the stale duplicate `server/routers/stripe.ts`, the orphan `StartHere.tsx` (or resurrect as
`/blind-spots` — owner), and archive the ~90 unwired one-shot scripts; remove `VitePWA` + the
self-destroying `sw.js`/`registerSW.js` remnant (or deliberately re-enable a real SW now that QW-8
makes stale deploys impossible — decide, don't drift); add an `engines` field pinning Node.
**Source:** 00 (§3, §5, §6, §9-5), 01 (#11), 04 (#10), 11 (L-4). **Files:** `client/src/components/*`, `client/src/components/ui/*`, `scripts/*`, `vite.config.ts`, `package.json`, `server/routers/stripe.ts`.
**Effort:** M–L (spread out). **Impact:** none of it breaks the site; all of it taxes every future
change and misleads every future contributor.

### LT-8 · Durable purchase infrastructure
After HS-11 records sales: replace the raw Stripe `session_id` as a no-expiry, unlimited-use
download bearer with short-lived signed tokens bound to session + slug; add a durable re-download
path (the thank-you page currently promises "your download link stays active" on Stripe's memory);
per-book thank-you lines; consider explicit `Cache-Control: private, no-store` on authed JSON and
the shorter admin session TTL from the security audit's open list.
**Source:** 06 (Low 12, 13, 14), 09 (Low), 11 (§5). **Files:** `api/index.ts` download/token paths, `client/src/components/EbookThankYou.tsx`.
**Effort:** M–L. **Impact:** closes the residual money-path leaks once purchases are recorded;
low urgency at $9.99 price points, real at scale.

---

## SECTION 4 — RECOMMENDED SEQUENCE (waves; each a coherent 1–3-PR unit)

1. **Wave 1 — Truth, care, and the lights on:** QW-1, QW-2, QW-3, QW-4, QW-5, QW-6.
   Copy/config only, near-zero regression risk, and it stops the active trust bleeding while
   turning on measurement so every later wave is attributable.
2. **Wave 2 — Caching, contrast, and SEO plumbing:** QW-7, QW-8, QW-9, QW-10, QW-22.
   All config/token-level; clears the serious axe finding, gives the site a caching layer, and
   makes the hidden 120 pages discoverable. Verify live headers + a fresh axe pass.
3. **Wave 3 — Money-path and tool criticals:** QW-11, QW-12, QW-13, QW-14, QW-15, QW-23, QW-24.
   The seven Critical hardening findings from audit 15 plus the server-side dead-letter and
   rate limits. Touches both runtimes (QW-23, QW-24) — run `api-parity.test.ts`.
4. **Wave 4 — Funnel wiring:** QW-16, QW-17, QW-18, QW-19, QW-20, QW-25.
   Essay→tool→book chain connected end to end; orphans registered; owned list first. Measurable
   because Wave 1 shipped.
5. **Wave 5 — The performance rebuild:** HS-1, HS-2, QW-29, QW-30.
   Streamdown out, first paint decoupled, dist slimmed. Re-run the Lighthouse half of the
   baseline method immediately after and record interim deltas.
6. **Wave 6 — Safety net, then hardening:** HS-3 first, then HS-4, HS-5.
   The harness lands before the helper sweeps so every mechanical change is smoke-covered.
7. **Wave 7 — SEO structure and IA:** HS-6, HS-7, HS-8, HS-9, HS-14.
   Prerendered heads + link mesh + the new front doors ship together so crawlers and readers meet
   the same coherent site. HS-9 needs the owner's confirmation first.
8. **Wave 8 — Conversion machinery:** HS-10, HS-11.
   Signup unification and purchase recording; both two-runtime; both measurable against Wave 1's
   instrumentation.
9. **Wave 9 — Design system and copy depth:** HS-12, HS-13, HS-15, QW-21, QW-26, QW-27, QW-28.
   Dark mode, primitives, the distinctives pass, and the polish batches — after the contrast
   tokens (Wave 2) and before LT-5.
10. **Wave 10 — The long bets, in order:** LT-1 → LT-2 (both after Wave 6's harness);
    LT-3 and LT-4 when the owner signs off on the schema and ESP decisions; LT-5/LT-7 opportunistic;
    LT-6 and LT-8 evidence-gated. **Close by re-running the full `00-baseline.md` method and
    writing `RESULTS.md`.**

---

## SECTION 5 — DEPENDENCIES (X before Y)

- **QW-1 (analytics) before Waves 4/7/8** and before any conversion change is judged — improvement
  must be measurable, or the experiment is a guess.
- **QW-3 (truthful copy) before HS-10** — unification builds on mechanics that already tell the truth;
  and **LT-4 before any inbox-promise copy returns.**
- **QW-7 (contrast tokens) before HS-12/HS-13/LT-5** — design polish inherits correct tokens, not the
  other way around.
- **QW-8 (immutable assets) before LT-7's PWA re-enable option** — a real service worker is only safe
  once stale deploys are impossible.
- **QW-10 (sitemap) + HS-6 (prerender) before LT-6 and before any new SEO content bets** — fix
  discovery, measure Search Console 6–8 weeks, then decide.
- **QW-22 (SEED_KEY) before any new admin/seed endpoint work.**
- **HS-3 (harness) before LT-1 and LT-2** — the consolidations touch revenue pages; the route-smoke
  loop is what makes deleting ~12,000 lines safe.
- **HS-4 (shared `copyToClipboard`) before any per-tool clipboard fix** — do not fix the ~16 broken
  copy sites piecemeal; **HS-4 (`readStoredJSON`) before HS-5** — persistence lands on the guarded
  helper; **HS-4 (fetch retry) before LT-2** — the engine inherits the error pattern.
- **HS-5 before LT-2** — engine-level persistence is specified as part of the migration; landing it
  first de-risks the port.
- **HS-11 (webhook) before LT-8 (durable downloads) and before LT-3's server-side `purchase` event.**
- **QW-13's `/start` repairs vs HS-9** — if the owner approves HS-9 quickly, skip QW-13's
  StartHereQuiz portion (the page 301s away); the StartHereDiagnostic race fix is needed either way.
- **QW-20/HS-14 ordering** — register the orphans (QW-20) first; the regroup (HS-14) assumes the
  full inventory is on the hub.
- **Two-runtime parity** — QW-23, QW-24, QW-29, HS-10, HS-11, LT-3 all touch the API: implement in
  `server/*` and `api/index.ts` together and keep `api-parity.test.ts` green.

---

## SECTION 6 — NOT DOING / DEFERRED (owner-gated; raised by audits, not executed here)

- **Schema changes** — the `events` table (LT-3), a `segment` column on `subscribers` (HS-10 notes
  it), a quiz-results table (14 M3), and reconciling the drizzle-vs-prod `subscribers` drift
  (`drizzle/schema.ts:159-166` lacks `name`/`source` that prod SQL writes — 10 §1.3). Each needs the
  author's sign-off and a migration plan before `pnpm db:push` runs.
- **Two-runtime unification** — the 2,691-line `api/index.ts` vs `server/*` split (00 §9-1, 07 #3).
  Structural, sliceable, and the single biggest velocity tax; but it is a re-architecture the owner
  scopes, not a roadmap item to absorb.
- **Tool cuts/merges that retire user-facing routes** — the five-verse-tool consolidation onto
  Wisdom Finder's engine, Life Audit → Whole-Life Assessment, the twin glossaries, Bible Study →
  Deep Bible, the church-health 18q/55q and burnout 24q/15q twins, Decision Log → Meeting Builder,
  Scripture Memory cut-or-rebuild, `/diagnostic` fold (14 §4's 52→40 plan). QW-20's registrations
  and cross-pointers proceed; deletions and 301s of tool routes wait for the owner.
- **Pastor-cluster page retirements** — folding `/resources-for-pastors` and merging
  `/for-leaders`/`/for-pastors` (05 §4, 11 §4). HS-15 fixes the copy; removing pages is the owner's IA call.
- **New tools from audit 17** (T1–T10, incl. the skeptic-facing Objection Index and the Political
  Captivity Mirror). Real gap, good designs — but they follow estate consolidation and the owner's
  pick, not precede it.
- **Editorial/canon decisions surfaced by audits:** the NIV-vs-ESV translation policy across the
  verse tools (12, 14 M1); the Cormorant body text on book pages — document the exception or revert
  (08 §1.4); the taxonomy spine — one system instead of three (05 #1) is a strategy decision that
  precedes any migration of chips/filters/footer; membership "first 100 founding members" counting
  before Stripe goes live (09 Low); dark mode fix-vs-pull if the owner prefers removal (HS-12
  assumes fix).
- **Full SSG/Next.js migration** — ruled out by the Decision Log; LT-6 is the bounded re-evaluation.
- **Paid Vercel custom-events plan** — declined; LT-3's first-party pipe covers events (audit 10's
  option B).

---

## SECTION 7 — CONFLICTS FOUND BETWEEN AUDITS (flagged, not resolved)

1. **`/start`: repair vs delete.** 15-tool-hardening prescribes verbatim fixes to StartHereQuiz's
   personalization logic (staged key fallback); 14-tools says "Delete it; 301 `/start` →
   `/start-here`" (05 and 11 concur). Roadmap carries both (QW-13 repair, HS-9 consolidation) —
   if HS-9 is approved fast, QW-13's /start portion is wasted work. Owner picks the order.
2. **EmailResults end-state.** 13-microcopy keeps it as an honest "Keep your results / James will
   follow up" block; 09-conversion replaces it with a subscribe + matching-book card; 15 wants
   truthful copy now and a real transactional send later. QW-3 does the shared first step
   (truthful copy); the destination (repair vs replace vs LT-4 send) needs one decision.
3. **Custom-event transport.** 09 (M6) routes the existing CustomEvents through Vercel
   `track()`; 10 explicitly rejects Vercel for events (paid-plan caps) and specifies a first-party
   REST→MySQL pipe. Roadmap follows 10 (LT-3), with QW-1 covering pageviews — flagged because 09's
   cheaper path is tempting and was deliberately not taken.
4. **Baseline chunk labels.** 01 §0 corrects 00-baseline: the 862 kB `index-*` chunk is the *shared
   markdown* chunk (lazy, 68 routes), not the eager shell; the true eager payload is ~196 kB gz.
   The closing re-baseline must use 01's corrected method or the deltas will mislead.
5. **Funnel count drift.** 00 says 21 funnel pairs; 11 counts 24 live product pages; 02 uses 21.
   LT-1's data module is where the canonical inventory gets settled.
6. **`/subscribe` page.** 11 rates its copy strong; 09/13 require replacing the page because the
   form is fake. QW-2 wires the mechanics — how much of the existing copy survives is an editorial call.
7. **PWA/service worker.** 01 offers remove-or-re-enable as equally valid; 04 leans remove. LT-7
   forces the decision either way — the current self-destroying-SW-plus-dead-config state is the
   one option both audits reject.
8. **VOICE.md vs CLAUDE.md.** 12 found `docs/VOICE.md` ranks "thoughtful Christians" first where
   CLAUDE.md ranks skeptics first — an intra-canon contradiction QW-28 repairs, but the owner
   should bless which ranking is true before the doc is rewritten.
