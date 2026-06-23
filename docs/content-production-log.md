# Content Production Log

> The living list of everything being written or expanded for LiveWell. One row
> per essay. This is the tracker; the drafts live in `docs/drafts/` and
> `content/drafts/`. Status updates as work lands.

## The depth standard (the bar)
Set by the flagship, **The Right Side of History Is Not the Right Side of
Scripture** (~3,100 words). A long-form essay at this bar has:
- a historical arc traced to its **root** with specific dates (not the proximate cause);
- **5–7 load-bearing named scholars** from the witness roster (Augustine, Taylor, Newbigin, Bellah, MacIntyre, Niebuhr, Brueggemann, Bonhoeffer, Wright, Butterfield…), never decorative;
- a heavier theological middle (real exegesis, 4–6 Scripture refs woven in);
- the structural moves intact ("Not X. Y.", short verdicts, self-implication);
- an ending that leaves weight;
- a clean pass through the `publish-md` voice check;
- a `> [PERSONAL STORY — James to supply]` placeholder anywhere a true private scene belongs (never fabricated).

## Status legend
- **EXPANDED** — developed to the ~3,000-word flagship bar.
- **EXPANDING** — agent in flight, widening now.
- **SHORT DRAFT** — first draft exists (~1,400–1,600 words), not yet expanded.
- **PLANNED** — in the library, not yet drafted.
- **PUBLISHED** — live on the site (requires the DB step).

---

## Pillar 1 — Capture by the Left  (ALL EXPANDED to the flagship bar ✓)
| Essay | slug | Words | Status |
|---|---|---:|---|
| The Right Side of History Is Not the Right Side of Scripture | right-side-of-history | 3,130 | **EXPANDED** ✓ |
| When Justice Becomes a Gospel of Its Own | when-justice-becomes-a-gospel | 3,736 | **EXPANDED** ✓ |
| The Sin We Stopped Naming | the-sin-we-stopped-naming | 3,701 | **EXPANDED** ✓ |
| Affirmation Is Not Love | affirmation-is-not-love | 3,335 | **EXPANDED** ✓ |
| Deconstruction Without Reconstruction Is Demolition | deconstruction-without-reconstruction | 3,474 | **EXPANDED** ✓ |
| Cheap Grace Has a Left Hand Too | cheap-grace-left-hand | 3,291 | **EXPANDED** ✓ |
| The Authority We Traded for Authenticity | authority-we-traded-for-authenticity | 3,518 | **EXPANDED** ✓ |
| The Conscience We Outsourced to the Party | conscience-outsourced-to-party | 3,531 | **EXPANDED** ✓ |

_All eight pass the publish-md voice gate (the "authentic"/"authenticity" warnings in two are expected — it's the concept being critiqued). Each carries one optional `[PERSONAL STORY]` placeholder. Scholar citations + dates are listed per essay in the review and need James's fact-check._

## Pillar 2 — Capture by the Right  (drafts pending — see content-library.md)
| Essay | slug | Status |
|---|---|---|
| The Flag in the Sanctuary: How It Got There | the-flag-in-the-sanctuary | PLANNED |
| Two Kingdoms, One Pledge | two-kingdoms-one-pledge | PLANNED |
| The Persecution We Invented | the-persecution-we-invented | PLANNED |
| Strongman Theology | strongman-theology | PLANNED |
| Nostalgia Is Not the Kingdom | nostalgia-is-not-the-kingdom | PLANNED |
| The Third Temptation | the-third-temptation | PLANNED |
| Six Verses We Memorized, Sixty We Skipped | six-verses-we-memorized | PLANNED |
| When the Pulpit Became a Precinct | when-the-pulpit-became-a-precinct | PLANNED |

## The "struggling" flows — first drafts complete (37), awaiting expansion + James's truth
All **SHORT DRAFT**, in `content/drafts/`. Each carries a `[PERSONAL STORY]` placeholder.

**Marriage (11)** — `content/drafts/marriage/`
when-marriage-becomes-a-mirror · the-covenant-you-didnt-understand · fighting-fair-is-not-enough · what-silence-costs-a-marriage · forgiveness-without-pretending · when-you-married-someone-you-no-longer-recognize · the-slow-drift-that-ends-marriages · the-resentment-in-your-marriage · what-the-bible-says-about-submission · emotional-labor-in-marriage · protecting-marriage-in-ministry

**Parenting (11)** — `content/drafts/parenting/`
the-weight-of-what-you-model · raising-kids-who-think · when-your-child-asks-a-question · the-father-wound-and-the-god-question · discipline-without-domination · the-pastors-kids-are-watching · how-to-talk-kids-faith-doubt · teenager-losing-faith · family-devotions-authentic · raising-sons-manhood · teaching-kids-about-doubt

**Faith Crisis (5)** — `content/drafts/faith-crisis/`
when-fear-rewrites-theology · when-god-doesnt-make-sense · what-if-we-are-wrong · dark-night-god-feels-absent · constantines-bargain

**Grief (5)** — `content/drafts/grief/`
when-god-is-silent-and-the-room-is-empty · the-theology-of-saturday · what-psalms-teach-about-anger-at-god · suffering-without-explanation · the-weight-that-stays

**Pastoral Burnout (5)** — `content/drafts/pastoral-burnout/`  *(why-pastors-quit slug collides with existing full-31 — reconcile before publish)*
the-pastor-nobody-checks-on · when-the-calling-costs-more · burnout-is-not-a-badge · the-loneliest-room-in-the-church · why-pastors-quit

## Later pillars (from content-library.md) — PLANNED
- **Reading Scripture Past Our Politics** — the 5 "lens" essays (Six Lenses…, Proof-Texting…, What the Original Audience Heard, The Whole Counsel, Reading in Community).
- **The Church After Christendom** — the arc essays around the imported series (Christendom: A 1,700-Year Story…, Exile Is Not the End, Witness Without Power, etc.).
- **The Pastoral Angle** — bridge essays (Pastoring a Congregation Captured by a Cable Network, The Last Nonpartisan in the Room, etc.).

---

## In flight right now
- Nothing in flight. Capture by the Left is fully expanded (8/8).
- Next up (on your go): Capture by the Right (8 to draft), then expand the 37 struggling-flow drafts to the bar, then the later pillars.

## Tallies
- Long-form at the bar: **8** (all of Capture by the Left)
- Short drafts complete: **37** (struggling/topic flows)
- Planned: Capture-Right (8) + later pillars (~15)

## Publishing note
Nothing here is live. Going live requires the `DATABASE_URL` step: each file
publishes with `pnpm publish:md <file> --draft`, then flips to live as James
approves it. The `why-pastors-quit` slug collision must be resolved first.
