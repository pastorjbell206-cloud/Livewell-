# Audit 2.3 — Microcopy & UX Writing

**Scope:** button labels, placeholders, errors, empty states, loading text, confirmations, tool instructions, aria-labels across `client/src`.
**Register bar (CLAUDE.md):** warm and plain, a pastor at a table. Errors tell the user what to do. Empty states guide. No robotic system-speak, no false promises — "Never fabricate" is the trust contract, and it applies to a toast as much as to an essay.

**Verdict up front:** the long-form surfaces are in strong shape — `EbookThankYou`, `RuleOfLife`, `ScriptureMemory`, the `SavedItems` empty state, and the newer admin toasts are already in register. The failures cluster in one place: **confirmations that promise emails the system never sends**, plus a handful of raw-error passthroughs and a silent lead-magnet dead-end. Those are trust failures wearing microcopy's clothes.

**Flagged instances: 34** (5 Critical, 9 High, 13 Medium, 7 Low).

---

## Critical — confirmations that aren't true

The subscribe path (`subscribers.subscribe`, `server/routers.ts:483-488` → `addSubscriber`, `server/db.ts:530-535`) **only inserts a DB row**. It sends nothing. `/api/contact` (`api/index.ts:2351-2383`) **only writes to `contact_messages`**. It emails no one. Every string below promises an inbox that will stay empty.

### C1. Ten landing pages have fake subscribe forms
`handleSubmit` sets `submitted=true` and calls **no API at all** — the email is discarded, then the page says the inbox lie. (The header comment in `NewsletterSignup.tsx:4-5` claims "All other (fake) forms in the codebase have been replaced" — these ten were missed.)

- `client/src/pages/landing/Grief.tsx:18-21` (copy at `:99`)
- `client/src/pages/landing/FaithCrisis.tsx:18-21` (`:99`)
- `client/src/pages/landing/PastoralBurnout.tsx:18-21` (`:99`)
- `client/src/pages/landing/ParentingStruggles.tsx` (`:98-99`)
- `client/src/pages/landing/MarriageCrisis.tsx` (`:98-99`)
- `client/src/pages/landing/ChurchHistory.tsx:98-101` (`:218`)
- `client/src/pages/landing/ChurchHurt.tsx:77-80` (`:195`)
- `client/src/pages/landing/Deconstruction.tsx:73-76` (`:202`)
- `client/src/pages/landing/HonestQuestions.tsx:77-80` (`:189`)
- `client/src/pages/landing/PostChristian.tsx:147-152` (`:246`)

> Current: `Thank you. Check your inbox.`

Fix is mechanical first (swap the hand-rolled form for `<NewsletterSignup />` or the real mutation), then the copy:

> Replacement: `You're on the list. The next essay comes to you — one a week, no noise.`

**Effort:** ~1 hr (one component swap × 10 files). **Exposure:** every paid/social landing funnel.

### C2. LeadMagnetLanding — silent dead-end AND a double false promise
`client/src/pages/LeadMagnetLanding.tsx:155` posts to `/api/lead-magnets/signup` — a REST route that exists in **neither runtime** (dev exposes only the tRPC procedure `leadMagnets.signup`; `api/index.ts` has no lead-magnet route at all). The fetch 404s, `response.ok` is false, and lines 149-170 have **no error branch**: the button un-spins and nothing happens. If it ever did succeed, the success screen lies twice —

> `LeadMagnetLanding.tsx:183` — `It's On Its Way`
> `LeadMagnetLanding.tsx:185` — `Check your email.`
> `LeadMagnetLanding.tsx:188` — `We've sent {magnet.title} to {email}.`

— because the procedure (`server/routers/lead-magnets.ts:29-64`) records the signup and notifies the owner; it never emails the guide.

> Replacement (success screen, honest version): `Your guide is ready.` / `Download it below — and watch your inbox; a short series of follow-up notes is coming.` *(only keep the second clause once a sequence actually sends)* — with a direct download button on the page.
> Replacement (new error branch): `That didn't go through. Try once more — or email us at Pastorjbell206@gmail.com and we'll send the guide directly.`

**Effort:** half a day (endpoint fix in both runtimes + copy). **Exposure:** the entire `/free/*` lead-magnet funnel is currently non-functional.

### C3. EmailResults — "Results sent" when nothing is sent to the user
`client/src/components/EmailResults.tsx` (used on tool results pages) posts the results to `/api/contact`, which files them as an admin contact message. The user's inbox gets nothing.

> `EmailResults.tsx:105` — `Enter your email and we will send you a copy of your results.`
> `EmailResults.tsx:91` — `Results sent. Check your inbox.`

> Replacement (until real sending exists): retitle the block `Keep your results` and lead with the print/copy path: `These results live only on this page. Print them or copy them before you go — or leave your email and James will follow up.` Success line: `Got it. We'll follow up by email.`

**Effort:** 1 hr copy, or wire actual sending. **Exposure:** every assessment completion.

### C4. NewsletterSignup — a confirmation email that doesn't exist
> `client/src/components/NewsletterSignup.tsx:35-36` — `title: "Subscribed", message: "Check your inbox for a confirmation."`

No confirmation email is sent anywhere in the stack.

> Replacement: `title: "You're on the list", message: "One serious essay a week. The next one comes to you."`

**Effort:** 5 min. **Exposure:** the main signup component, sitewide (footer, inline, minimal).

### C5. SampleChapterForm — "on the way" with no sender
When `sampleUrl` is absent the toast promises delivery that has no delivery mechanism:

> `client/src/components/SampleChapterForm.tsx:40-42` — `title: "Sample chapter on the way", message: "Check your inbox in the next few minutes."`

> Replacement (until sending exists): only render the form when `sampleUrl` is known (the reveal path at `:72-127` is honest and good), or: `title: "Request received", message: "We'll send the chapter to your inbox shortly — it comes from a person, not a robot, so give it a little time."` *(only if someone actually will)*.

**Effort:** 30 min. **Exposure:** book funnel pages.

---

## High

### H1. Raw `error.message` shown to readers (3 sites)
tRPC/Zod errors surface verbatim — a reader can see `[ { "code": "invalid_string" ... } ]`-style text or DB messages.

> `NewsletterSignup.tsx:44` — `message: error.message || "Please try again later."`
> `SampleChapterForm.tsx:61` — `message: err.message || "Please try again later."`
> `BuyEbookButton.tsx:84` — `setError(data?.error || "Checkout is unavailable right now.")`

> Replacement (all three): drop the passthrough. `That didn't go through. Check the email address and try once more.` For checkout keep the existing constant — `Checkout is unavailable right now.` — which already pairs with the excellent "Email us and we'll send it directly" fallback at `:117-122`.

**Effort:** 15 min.

### H2. Suspense PageFallback — a bare spinner, no words, hardcoded color
> `client/src/App.tsx:281-287` — spinner div only; `border-gray-900` (hardcoded, off-token; invisible-ish in dark mode). With route-splitting on a slow connection this is the **first thing a new reader sees**, for seconds, with no text.

> Replacement: add `<p>Loading the page…</p>` in `var(--ink-muted)` / `var(--B)`, spinner border from tokens.

**Effort:** 15 min. **Exposure:** every lazy route transition, i.e., everyone.

### H3. Footer newsletter button: "Go" / "…"
> `NewsletterSignup.tsx:121` — `{subscribe.isPending ? "…" : "Go"}`

"Go" is deadwood; a lone ellipsis while pending reads as a freeze.

> Replacement: `{subscribe.isPending ? "Subscribing…" : "Subscribe"}` (matches the other two variants at `:168` and `:243`).

**Effort:** 5 min.

### H4. GatedDownload — "Send it" doesn't send; "We send the toolkit" isn't true
> `client/src/components/GatedDownload.tsx:89` — button `Send it`
> `GatedDownload.tsx:92` — `Free. We send the toolkit and the occasional letter. Unsubscribe anytime.`

The file opens immediately in a new tab (`:45`); nothing is emailed.

> Replacement: button `Get the download`; note: `Free. The download opens right away; the occasional letter follows. Unsubscribe anytime.`

**Effort:** 10 min.

### H5. Search empty state names an exit it doesn't offer
> `client/src/pages/Search.tsx:335-336` — `No results found for "{query}"` / `Try different keywords or browse our content`

"Browse our content" is not a link — the reader is told to go somewhere with no door.

> Replacement: `Nothing here for "{query}".` / `Try another word — or start in the` [`essays`](/writing) `or the` [`tools`](/tools)`.`

**Effort:** 20 min.

### H6. ErrorBoundary — system-speak at the worst moment
> `client/src/components/ErrorBoundary.tsx:34` — `An unexpected error occurred.`
> `ErrorBoundary.tsx:53` — `Reload Page`

> Replacement: `Something broke on our side — not yours.` / `Reload the page. If it keeps happening, email Pastorjbell206@gmail.com and we'll fix it.` Button: `Reload the page`.

**Effort:** 15 min.

### H7. "Learn More" — generic deadwood on a book CTA
> `client/src/pages/landing/PostChristian.tsx:265` — `Learn More`

The one truly dead label found sitewide (plus placeholder `Your email` at `:249`, off-pattern).

> Replacement: `See the book →`; placeholder `your@email.com`.

**Effort:** 5 min.

### H8. Ebook price/label divergence between the two buy buttons
> `client/src/components/BuyEbookButton.tsx:45` — `Buy the eBook — $9.99`
> `client/src/components/StripeBuyButton.tsx:22` — `Get the ebook — $8.99`
> `client/src/pages/Books.tsx:148…593` — `Get the ebook` (×17)

Two default prices a dollar apart and three casings (`eBook`/`ebook`). If both defaults ever render for the same title, the site quotes two prices.

> Replacement: standardize on **"Get the ebook — $X.XX"** (lowercase "ebook", per the dominant Books.tsx usage) and verify the real price against Stripe config before shipping either default.

**Effort:** 30 min + a price check with the author.

### H9. Bare "Not found" as an entire error state on JSON-library pages
> `client/src/pages/studyguides/StudyGuide.tsx:111`, `pages/life/LifeDomain.tsx:62`, `pages/history/HistoryEssay.tsx:44`, `pages/leadership/FormationTopic.tsx:76`, `pages/leadership/LeadershipArticle.tsx:60`, `pages/plans/CarePlan.tsx:102` — on a 404 the H1 renders literally `Not found` with no sentence and no way onward.

Compare the good pattern already in the codebase: `TableStudy.tsx:71` — `That study is not set yet.`; `BookReader.tsx:44` — `That book is not here yet.`; `HowToArticle.tsx:58` — `That guide was not found. Browse the full library.` (with link).

> Replacement (per page type): `That guide is not here yet.` + one line: `It may have moved. Start from the` [`library`](/…)`.`

**Effort:** 1 hr across 6 files.

---

## Medium

### M1. Ellipsis inconsistency — `...` vs `…`
The site voice uses the true ellipsis almost everywhere; these use three dots:
> `EmailResults.tsx:168` — `Sending...` · `CommandPalette.tsx:138` — `Search essays, books, tools, pages...` · `CommandPalette.tsx:183` — `Searching...` · `ShoppingCart.tsx:145` — `Processing...` · `pages/TheologyQuiz.tsx:54` — `Loading your quiz...` · `WorkWithJames.tsx:131` — `Sending...` · `Search.tsx:328,339` — `Searching...` · `admin/NotificationsAdmin.tsx:52` — `Loading notifications...` · `AdminCommentsPanel.tsx:72` / `AdminTestimonialsPanel.tsx:75` · `AdminSyncPanel.tsx:232,280,306`

> Replacement: `…` throughout. **Effort:** 20 min, mechanical.

### M2. Placeholder inconsistency
Standard is `your@email.com` (NewsletterSignup, SegmentedSignup, SampleChapterForm, GatedDownload). Off-pattern:
> `EmailResults.tsx:118` — `you@example.com` · `landing/PostChristian.tsx:249` — `Your email`

> Replacement: `your@email.com` everywhere. **Effort:** 5 min.

### M3. Admin toast register is split down the middle
The newer toasts are exactly right — `AdminDeduplicate.tsx:55` `Couldn't retire the duplicates — it's safe to try again.`; `AdminPublishContent.tsx:96` `{updated} done; {stragglers} kept stalling — click Publish once more to finish them.` The older ones are robotic:
> `AdminResourceEditor.tsx:60` — `Failed to save resource` · `AdminBookEditor.tsx:64` — `Failed to save book` · `AdminPostEditor.tsx:66` — `Failed to save post` · `AdminBooks.tsx:52,65,99` — `Failed to delete book` / `Failed to update book` / `Failed to update order` · `AdminResources.tsx:101,114,145` — `Failed to delete resource` / `Failed to update resource` / `Bulk action failed` · `AdminSubscribers.tsx:25` — `Failed to remove subscriber` · `AdminPosts.tsx:298,311,324,343,365` · `AdminAbout.tsx:39` · `AdminSettings.tsx:41` — `Failed to save settings`

> Replacement pattern: `Couldn't save — nothing was lost. Try again.` / `Couldn't delete it — try again.` **Effort:** 1 hr.

### M4. Admin validation toasts
> `AdminResourceEditor.tsx:46`, `AdminBookEditor.tsx:50` — `Title is required` · `AdminPostEditor.tsx:52` — `Title, slug, and body are required`

Serviceable, but the register fix is cheap: > `Add a title before saving.` / `A post needs a title, a slug, and a body before it can save.` **Effort:** 10 min.

### M5. Tool intros never say how long it takes
`TheologyQuiz` (`pages/TheologyQuiz.tsx:79-81`) says "10 questions"; `LifeAudit` (`tools/LifeAudit.tsx:574-587`) says "Twenty-four questions across eight areas"; `MarriageAssessment` (`tools/MarriageAssessment.tsx:397-410`) says "Fifteen statements across five areas" — all good counts, **none gives minutes**. A non-technical reader deciding whether to start wants both.

> Replacement (append one clause each): `…Ten questions, about three minutes.` / `…Twenty-four questions, about ten minutes, eight areas of your life.` **Effort:** 15 min.

### M6. AdminPosts raw error leak
> `AdminPosts.tsx:783` — `Couldn't load your posts. {postsQuery.error?.message ?? ""}`

Admin-only, so tolerable — but a DB connection string in an error would render here. > Replacement: `Couldn't load your posts — check the connection and refresh.` **Effort:** 5 min.

### M7. `api/index.ts:2378` — `Message received. Thank you!`
Server-side success string with an exclamation point (forbidden outside quoted Scripture). Currently unread by any client, but it will leak into the first client that renders it. > Replacement: `Message received. Thank you.` **Effort:** 2 min.

### M8. WorkWithJames contact form
Good bones (real endpoint, labels, required marks, honest error at `:134` — `Something went wrong. Please try again or email directly.`). Flags: `:116` `Select a topic...` (dots; use `Choose a topic…`), and `:98-101` success panel uses hardcoded greens `#D1FAE5`/`#065F46` (off-token). Error could name the address: > `That didn't send. Try again, or email Pastorjbell206@gmail.com directly.` **Effort:** 15 min.

### M9. SegmentedSignup silent local failure is fine — but the success toast depends on a popup
`SegmentedSignup.tsx:102-106` — `Confirm your subscription in the Substack tab we just opened.` If the popup was blocked, the toast points at a tab that doesn't exist. The inline panel (`:146-147` "If it did not open, finish here.") already covers it — the toast should too: > `One more step — confirm on Substack. If no tab opened, use the button below.` **Effort:** 10 min.

### M10. Writing filter empty state
> `Writing.tsx:622` — `No essays match. Try a different filter.`

In register, but leaves the reader to hunt for the reset. > Replacement: `No essays match. Clear the filter and the whole shelf comes back.` (and make "Clear the filter" the action). **Effort:** 15 min.

### M11. TheologyQuiz results line
> `pages/TheologyQuiz.tsx:161` — `Here's what your answers reveal about your theological inclinations.`

"Here's" is on the forbidden-adjacent signpost list ("here's the thing") and "theological inclinations" is clinical. > Replacement: `Your answers point somewhere. Start reading there.` **Effort:** 5 min.

### M12. ShoppingCart close button — icon-only, no aria-label
> `ShoppingCart.tsx:88` — X icon button with no `aria-label`. > Add `aria-label="Close cart"`. **Effort:** 2 min.

### M13. Assessment first-run: results are device-local and nobody says so
`WholeLifeAssessment.tsx` / `FormationInventory.tsx` store history in localStorage and only speak of it after run two (`:399` / `:458`). One honest line on the results screen earns trust: > `Your results stay on this device. Nothing was sent anywhere.` (The closing lines at `WholeLifeAssessment.tsx:630` and `FormationInventory.tsx:678` already say this beautifully — surface it at the top of results too.) **Effort:** 10 min.

---

## Low

- **L1.** `CommandPalette.tsx:138` placeholder ends in `...` (covered by M1) — otherwise the palette copy (`Nothing found for "{query}"`, `⌘K to open · Esc to close`) is good.
- **L2.** Bare `Loading…` on ~15 JSON-library pages vs. the textured `Loading the studies…` / `Loading the book…` pattern. The textured form is the house style; align when touched. (`TheologyBiblical.tsx:174,207,233`, `LeadershipLibrary.tsx:61`, `PropheticGlossary.tsx:66`, etc.)
- **L3.** `AdminCommentsPanel.tsx:72` / `AdminTestimonialsPanel.tsx:75` — hardcoded `#6B7280` on loading text (token rule, not copy).
- **L4.** `ToolActions.tsx:82,95,108` — `Print` / `Share`→`Copied!` / `Start Over`: labels fine; `Copied!` carries an exclamation — use `Copied`. (`SavedItems.tsx:77` already does `Copied to Clipboard` correctly.)
- **L5.** `ShoppingCart.tsx:96` — `Your cart is empty` dead-ends; add `Browse the books →` link.
- **L6.** `EmailResults.tsx:129` — input background hardcoded `#FFFFFF` (should be `var(--card)`; token rule).
- **L7.** `AdminBooks.tsx:173` `Failed to load books.` / `AdminResources.tsx:341` `Failed to load resources.` — both have Retry buttons (good); soften wording per M3 pattern when touched.

---

## What is already right (leave alone)

- **EbookThankYou** (`components/EbookThankYou.tsx:80-97`): `We couldn't confirm a purchase… give it a moment and refresh — or email us and we'll send your file directly.` The best error on the site — states what happened, what to do, and keeps a human door open.
- **BuyEbookButton** coming-soon degrade (`:92-102`): `Card checkout opens soon. Until then, email and we'll send your copy directly.` Honest, no dead end.
- **SavedItems empty state** (`tools/SavedItems.tsx:86-99`): `Nothing saved yet.` / `Use the tools to find verses and prayers worth keeping.` + Browse Tools button. Model empty state.
- **RuleOfLife empty state** (`tools/RuleOfLife.tsx:225-227`): `A short rule kept beats a long rule abandoned.`
- **ScriptureMemory feedback** (`tools/ScriptureMemory.tsx:974-976`): `Well done. The word is taking root.` / `Not quite. Keep working at it.`
- **AdminSubscribers empty state** (`AdminSubscribers.tsx:82`): `No subscribers yet. The signup form on the site feeds this list.` — explains the system, not just the absence.
- **Newer admin toasts** (Deduplicate, PublishContent, LoadDrafts, SetupNavigation) — the register the rest of the admin should be brought up to.
- Six tool intros are human and jargon-free; SermonOutline's pastoral vocabulary ("Big idea", "fallen-condition focus") is right for its audience; nav labels ("Previous", "Next Section", "See Results") are consistent across all assessments; no "Submit"/"OK" deadwood found anywhere outside the flags above.

---

## Fix order

| Rank | Items | Why | Effort |
|---|---|---|---|
| 1 | C1-C5 | False confirmations on live funnels — trust contract, lost leads | ~1 day |
| 2 | H1, H2, H5, H6 | Raw errors + the wordless 20-second spinner + dead-end search | ~2 hrs |
| 3 | H3, H4, H7, H8, H9 | Deadwood labels, price divergence, bare "Not found" | ~2 hrs |
| 4 | M1-M13 | Consistency sweep (ellipses, placeholders, admin register, tool timing) | ~3 hrs |
| 5 | L1-L7 | Opportunistic, when files are touched | — |

*Nothing in this audit was changed in code. Every replacement above still needs the Revision Pass before shipping — read it aloud first.*
