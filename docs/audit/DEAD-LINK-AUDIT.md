# Dead-Link Audit — hub pages linking to unpublished essays

> Produced by a codebase-wide scan of every hardcoded `/writing/:slug` link
> (literal and slug-array) in `client/src`, checked against the authoritative
> corpus: `content/static-library.generated.json` (the static essay library that
> resolves at `/writing/:slug`) plus the DB posts merged into it. A slug absent
> from that list resolves only if it is a seeded DB row.
>
> **Headline:** ~124 hub-page links point to `/writing/` essays that are not in
> the published corpus. They split into two classes that need different fixes,
> and the right fix is an editorial/deploy decision — this doc lays out the
> options rather than guessing.
>
> The 17 *literal* `/writing/…` links in the codebase are all live. The problem
> is entirely in slug-array grids (`FEATURED_ARTICLES`, tier lists, comparison
> "related reading") that were authored ahead of the content.

## The two classes

### Class A — seed-pending (60 links, 1 page)

Every one of these is a **Post-Christian series** article. They exist with
**full bodies** in `api/post-christian-articles.json`, and `api/index.ts` has a
one-shot admin endpoint (`/api/admin/seed-post-christian`) that inserts them as
posts. They resolve at `/writing/:slug` **only if that seed has been run in
production** — which cannot be observed from the repo.

| Page | Links | Backing content | Fix |
|---|--|---|---|
| `landing/PostChristian.tsx` | 60 | `api/post-christian-articles.json` (full bodies) | **Run the seed in prod** (stateful — owner authorizes), or repoint the grid to what is live. |

If the intent is to publish these, the links are already correct and only the
seed is missing. If not, the grid should be repointed or pruned.

### Class B — truly dead (64 links, 10 pages)

These slugs have **no backing content anywhere in the repo** — no JSON body, no
static-library entry, no DB seed set. They are links written toward essays that
do not exist.

| Page | Dead links | Nature | Real destination available? |
|---|--|---|---|
| `landing/ChurchHistory.tsx` | 15 | Church-history topic grid | Mostly **no** — of the whole set only `the-reformation-and-its-consequences` maps to a real `/theology/history` essay (`the-reformation`). The rest have no per-essay home. |
| `pages/HonestQuestions.tsx` (landing) | 8 | Apologetics question grid | **Partly** — 5 map to real pages (see below); the rest have none. |
| `pages/SkepticTrack.tsx` | 7 | The skeptic track's **own** seven essays | **No** — the flagship "seven essays in argument order" path is entirely dead. Needs the essays written, or the track rebuilt around what exists. |
| `pages/StartHereQuiz.tsx` | 6 | Quiz-result essays | **No** — result destinations don't exist. |
| `comparisons/BaptistVsMethodist.tsx` | 5 | Church-history "related reading" | **No** per-essay home. |
| `comparisons/CatholicVsProtestant.tsx` | 5 | " | **No** |
| `comparisons/EvangelicalVsMainline.tsx` | 5 | " | **No** |
| `comparisons/LiturgicalVsContemporary.tsx` | 5 | " | **No** |
| `comparisons/CalvinismVsArminianism.tsx` | 4 | " | **No** |
| `comparisons/OrthodoxVsCatholic.tsx` | 4 | " | **No** |

The six comparison pages plus ChurchHistory all draw from the **same dead
church-history topic set** (`the-great-schism`, `the-reformation-and-its-consequences`,
`the-orthodox-way`, `the-rise-and-fall-of-christendom`, `the-evangelical-movement`,
`the-mainline-protestant-collapse`, `the-age-of-revivals`, …). Fixing that one
set fixes ~43 links at once.

## The verified-safe repoints (ready to apply on request)

These are the only Class-B links with a **confirmed, topically-correct live
destination**. Every target below was checked against the route table and corpus:

**`HonestQuestions.tsx`**
- `is-god-real` → `/faq/does-god-exist`
- `is-the-bible-reliable` → `/faq/is-the-bible-historically-accurate`
- `is-hell-real` → `/faq/what-do-christians-believe-about-hell`
- `has-science-disproved-god` → `/faq/can-science-and-faith-coexist`
- `why-does-god-allow-suffering` → `/writing/if-god-is-good-why-suffering`

The remaining HonestQuestions cards (`does-christianity-oppress-women`,
`what-about-other-religions`, `what-about-the-violence-in-the-old-testament`,
`why-is-the-church-so-hypocritical`, `can-i-doubt-and-still-have-faith`) have no
live essay or FAQ page — they need one written, or the card removed.

For the ~43 church-history links there is no per-essay target; the honest options
are (a) point each card at the `/theology/history` library hub (lossy but not a
404), (b) write the essays, or (c) prune the grids to the essays that exist.

## Recommended decision path

1. **Class A (Post-Christian, 60):** confirm whether the prod seed has run. If
   yes, the links are already correct — nothing to change. If no and you intend
   to publish, run the seed. If you don't intend to publish, repoint the grid.
2. **Class B, verified-safe (HonestQuestions, 5):** apply the repoints above —
   pure win, kills five 404s with correct destinations.
3. **Class B, church-history (~43):** decide write-vs-hub-vs-prune once; it
   applies across ChurchHistory + all six comparison pages uniformly.
4. **Class B, SkepticTrack (7) + StartHereQuiz (6):** these are flagship
   entry paths pointing at essays that were never written — the highest-value
   content gap to close, and a content decision, not a link fix.

## Method note

Prior "verification" of PostChristian in the depth sweep confirmed the *page
matched its data file* — not that the data file's articles were published posts.
That gap is exactly Class A. The literal-link scan is clean; the exposure is
entirely in slug arrays authored ahead of the content.
