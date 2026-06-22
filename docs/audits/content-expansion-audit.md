# LiveWell Content Expansion & Editorial Consistency Audit

> Status: plan of record. No content has been rewritten. The standing rule
> governs everything below: do not make LiveWell bigger by making it thinner.
> Make it larger by making it deeper.

## Headline finding

The site is not thin. It holds roughly **340 structured JSON content files**
plus **161+ database articles**. The family material specifically is already
deep: `client/public/articles/marriage-and-family.json` alone holds five essays
of **9,000–12,000 words each** (covenant vs. contract, what fatherhood
requires, raising children in the faith, protecting marriage from work,
forgiveness in marriage), with eight marriage guides and eight parenting guides
behind it.

The real problem is **consistency and connection, not volume.** Three findings
drive the whole plan:

1. **Three taxonomies are live at once.** A six-pillar V2 system, the legacy
   five-pillar system, and a 13-track layer all coexist. A fourth scheme would
   deepen the confusion. Consolidate onto what exists; do not invent more.
2. **The deepest family content is disconnected.** `Marriage.tsx` hardcodes six
   featured slugs that do not match the rich essays in
   `client/public/articles/marriage-and-family.json`, which are consumed by no
   page. The landing pages point readers away from the strongest writing.
3. **"Family as a major pillar" is already structurally true** — it is Pillar 6,
   `Living Well After Christendom`, holding the entire Formation movement against
   five Diagnosis pillars. It is not missing. It is under-surfaced and
   under-connected.

> Caveat on database claims: live DB article state is inferred from in-repo
> exports (`client/public/article-library.json`,
> `dist/public/admin-article-bodies.json`, `scripts/seed-all-content.sql`). The
> live database may differ. File-based counts are exact.

## The three live taxonomies

- **PILLARS_V2** (`client/src/lib/taxonomy.ts`) — the newest spine, powers
  `/pillars`. Diagnosis movement: `capture-by-the-right`, `capture-by-the-left`,
  `reading-scripture-past-our-politics`, `after-christendom-pillar`,
  `the-pastoral-angle`. Formation movement: `living-well-after-christendom`
  (sub-themes: `marriage-covenant, fatherhood, parenting, family-household,
  friendship-community, vocation-work, practices`).
- **Legacy five-pillar** (`client/src/lib/subPathways.ts`) — Theological Depth,
  Prophetic Justice, Prophetic Disruption, Leadership Formation, Integrated Life.
  Still referenced by `pillarForPost` via `LEGACY_TO_V2`.
- **13 tracks** (`taxonomy.ts`) — after-christendom, politics, american-church,
  prophetic-justice, theology, pastoral-ministry, doubt, marriage, parenting,
  manhood, womanhood, finances, devotionals.

**Decision pending (owner's call):** which becomes the single spine. Options on
the table:
- *Six-pillar V2 (recommended):* keep the live system, retire the legacy
  five-pillar, demote tracks to filters. No article re-tagging beyond what
  `pillarForPost` already resolves.
- *A clean five-pillar editorial scheme:* requires remapping every article's
  `pillar` field.

Until this is decided, the mechanical surfacing work below is true under any
spine and can proceed.

## 1. Content Balance Report

| Pillar (V2) | Backing content | Depth | Verdict |
|---|---|---|---|
| Capture by the Right | `nation/` (7), Christian Nationalism study guide (20k+), disruption essays | Very rich | Strong |
| Capture by the Left | `justice/`, `disruption/` curricula | Rich | Strong |
| Reading Scripture Past Our Politics | `context/` (32 guides), `theology/` (48 doctrines, ~5.8k avg) | Very rich | Strongest |
| After Christendom | DB essays + `history/` (4) + `creeds/` (10) | Rich | Strong |
| The Pastoral Angle | `leadership/` (100 articles + 6 formation), Pastoral Health study guide | Very rich | Strongest |
| Living Well After Christendom | `articles/marriage-and-family.json` (5), `marriage-guides.json` (8), `parenting-guides.json` (8), `family/` devotions (77), catechism (52), reading plans (4) | Rich source, poorly surfaced | **Gap is wiring, not words** |

The five Diagnosis pillars are rich and connected. The one Formation pillar is
rich and orphaned.

## 2. Editorial Gap Report

- **Taxonomy debt (highest severity):** until one spine wins, every consistency
  fix fights the other two systems.
- **Orphaned depth:** `client/public/articles/*.json` (marriage, parenting,
  fatherhood long-form) has no renderer. Either it was never published to the
  DB, or it was published under different slugs and the source files are now
  dead. Resolve before any new writing.
- **Landing-page drift:** `Marriage.tsx` and `Parenting.tsx` hardcode featured
  slugs and reading-path counts that no longer map to real content.
- **Missing surfaces:** no `/manhood` or `/womanhood` page exists, though both
  are defined tracks with written descriptions. `/fatherhood` exists only as one
  article slug.
- **Pillar 6 has no front door** equal to `/theology`.

## 3. Expansion Priority List (deepen, in order)

1. **Reconnect the orphaned family essays** — confirm DB state; publish or
   re-point. No new words.
2. **Fix `Marriage.tsx` / `Parenting.tsx` featured lists** to surface the real
   deepest pieces.
3. **Build a Pillar 6 landing page** matching the gravity of `/theology`.
4. **Add `/manhood` and `/womanhood` landing pages** from existing track copy +
   `leadership/formation/men-women-and-the-office.json` as the spine.
5. **Only then** commission genuinely new long-form for confirmed thin spots.

## 4. New Article Plan (candidates, after surfacing)

- **"What Is the Family For?"** — the missing keystone for Pillar 6 (3,000–5,000
  words). Everything else hangs off it.
- **"How Screens Catechize Children"** — standalone formation argument.
- **"Masculinity Without Machismo"** + a womanhood counterpart — to anchor the
  two new landing pages.

Not to be drafted until the surfacing pass confirms no duplication.

## 5. Image Direction Plan

One visual grammar site-wide, matching the existing `og` generator: natural
light, human, rural, non-staged. Per-pillar default so nothing ships imageless.

- Diagnosis pillars: historic church architectural detail, worn pew, rural road
  at dusk.
- Formation / family: parent and child from behind in natural light, quiet table
  after a meal, child's shoes at an entryway.
- Banned globally: staged smiling families, open-Bible-with-coffee, flags, hands
  reaching toward sunlight, AI-abstract graphics.

## 6. Internal Linking Plan

Link across movements, not within them. One "Read next" pair per essay:
cultural-Christianity → Pillar 6 formation; Christian nationalism →
`theology/church` ecclesiology; `/plans/deconstruction` → reconstruction in the
formation pillar; parenting → spiritual-formation doctrine.

## 7. 90-Day Publishing Plan (surfacing-first)

- **Weeks 1–3:** taxonomy decision + reconnect orphaned family content. Zero new
  prose.
- **Weeks 4–6:** Pillar 6 landing page; fix marriage/parenting landings; add
  manhood/womanhood pages.
- **Weeks 7–10:** keystone "What Is the Family For?" + one screens/formation
  essay.
- **Weeks 11–13:** internal-linking pass across all five movements +
  image-direction backfill.

## Implementation status (Weeks 1–3)

- **Orphaned family content reconnected.** The 21 essays in
  `client/public/articles/{marriage-and-family,marriage-guides,parenting-guides}.json`
  (~36,000 words) are now generated as published `posts` rows by
  `scripts/build-family-posts-seed.mjs`, written into `scripts/seed-all-content.sql`
  between the `family posts` markers. Regenerate after editing the source JSON:
  `node scripts/build-family-posts-seed.mjs`.
- **Go-live step (manual, on infra with DB access):** run
  `DATABASE_URL=… npm run db:seed`. The seeder uses `INSERT IGNORE`, so it is safe
  to re-run. Until it runs against the production database, the new featured links
  below resolve only once the posts exist.
- **Landing pages re-pointed.** `Marriage.tsx` and `Parenting.tsx` now feature the
  rich, on-topic essays (covenant, communication, conflict, forgiveness, money;
  faith formation, fatherhood, discipline, screens, doubt, prayer) instead of the
  previous dead slugs.

## Voice guardrails (binding on all rewrites)

Calm, declarative, diagnostic, pastoral. Build by accumulation. No em-dash, no
prose semicolon, no exclamation. No forbidden words (delve, leverage, unlock,
transformative, navigate, tapestry, foster, unpack, landscape, nuanced,
multifaceted, authentic, journey, holistic). Steelman before challenge.
Diagnose before denounce. Turn the reader inward, not only outward. The result
must read like James Bell took more time, not like another writer replaced him.
