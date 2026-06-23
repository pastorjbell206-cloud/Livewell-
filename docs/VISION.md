# LiveWell — Vision & Strategy

> The strategic layer for LiveWell by James Bell. It nests **under**
> `docs/EDITORIAL-CONSTITUTION.md` (the governing mission) and sits **above**
> `docs/WORLD-CLASS-BRIEF.md` (execution) and `CLAUDE.md` (voice + engineering
> contract). The constitution says *why* we publish; this doc says *what kind of
> platform* serves that mission and *in what order* we build it. When strategy is
> unclear, settle it here; when it touches mission, defer to the constitution.

---

## Rule zero — the voice never changes

James Bell's writing style, tone, and voice are **not on the table.** Ever.

Every recommendation in this document improves the *platform around the writing*
— the funnel, the structure, the discovery, the measurement — and touches the
*prose* never. The voice rules in `CLAUDE.md` (the forbidden-word kill-list, the
structural moves, the voice-audit tests, the content validators) exist for one
purpose: **to protect Bell's voice from AI drift** — to catch the moment an
assistant starts sounding generic and force it back to him. They are a fence
around the style, not a hand on it.

No future agent may "improve," "soften," "modernize," or "optimize" the writing
voice. The writing is the product. We build the house; we do not touch the words
inside it.

---

## The vision in one line

LiveWell is not a blog. It is an **institution for reconstruction** — the place a
Christian, a skeptic, or a pastor comes to recognize the lenses they never knew
they wore, and walks out with a faith older and deeper than their politics. The
product is the **corpus**: hundreds of essays and a shelf of books, five pillars,
one question. Depth is the strategy; reach is downstream of it.

---

## Audience & funnel

LiveWell is the **hub** — the home, the archive, the destination. It is not one
channel among many; it is where the others point.

```
   Facebook (45,000+ following)  ──┐
                                   ├──▶   LiveWell (the hub / archive)  ──▶  owned email
   Substack (large following)    ──┘                                          relationship
```

- **LiveWell — the hub.** The full corpus lives here, connected and discoverable.
  Every other surface exists to bring people home to it.
- **Facebook (45,000+) — top of funnel.** The existing audience and the widest
  reach. Short-form posts in the short-form voice that earn the click back to the
  hub.
- **Substack — the relationship.** The newsletter and the owned audience. The
  long-form letter that turns a reader into a regular.
- **Pastors / PCN — a secondary segment, not the spine.** Pastors matter and the
  network has real distribution, but the platform is built reader-first. Pastor
  features (workspace, cohorts, per-user accounts) are a *later* phase serving a
  *secondary* audience — not a first move.

**The growth engine is therefore the Facebook + Substack → LiveWell loop**, and
the single most valuable conversion is reader → **owned email subscriber**, which
no algorithm can take away.

---

## Strategic priorities (in order)

### Tier 1 — Foundations (build on these first)

1. **One taxonomy spine.** The site currently runs three overlapping systems (the
   editorial five pillars, the code's six-pillar `PILLARS_V2`, and a legacy
   13-track layer). A reader, a crawler, and any AI assistant all need one map.
   Reconcile to the **five editorial pillars** as the public spine, sub-themes
   beneath, and retire the rest. Everything downstream compounds on this. It is
   voice-neutral — it changes filing and navigation, not a single word of prose.

2. **The Facebook + Substack → LiveWell funnel.** Make every Facebook post and
   every Substack issue drive cleanly to the hub, and make converting a visitor
   into an owned email subscriber effortless and dignified (no pop-up theatrics).
   This is the growth engine. The email list is the asset; the website is the
   archive; social is the reach.

### Tier 2 — Turn the corpus into a system

3. **Connect the corpus.** Hundreds of essays filed but not connected is a card
   catalog, not a library. Add semantic, "related-by-argument" reading so a
   finished essay hands the reader the pieces that actually advance the same
   argument — plus the relevant book chapter and study guide. The large corpus is
   a moat almost no Christian writer has; connection is what activates it.

4. **"Ask the corpus."** A retrieval experience that answers a reader's question
   **only from Bell's own published writing, quoting his existing words with
   citations back to the essays.** It surfaces what he already wrote; it never
   generates new prose in an imitation voice. This is ideal for the skeptic who
   wants to interrogate before they trust — and it makes LiveWell the source that
   answer-engines cite. (`llms.txt` already exists; this extends the same logic.)

5. **The value ladder, made explicit.** Free essay → email → book → membership.
   Decide what membership actually *gives* before wiring more payments. For this
   audience it should not be a paywall on articles; it should be access to depth —
   study guides, reading-path curricula as guided courses, early manuscripts, the
   archive. Define the ladder, then let Stripe follow (test mode first; live only
   on explicit go-ahead).

### Tier 3 — Make it measurable and make it last

6. **Measure depth, not vanity.** The constitution defines success as readers
   becoming more thoughtful and rooted; today there is no instrument for it.
   Track, privacy-respectingly, what matches that definition: long-read
   completion, return-reader rate, reading-path completion, email reply/open
   quality, "saved for later." Metrics that would embarrass a clickbait site and
   flatter this one.

7. **Durability.** A decade of writing and a shelf of books deserve archival
   integrity: corpus export, content versioning, and backups that have actually
   been restored from. The institution should outlive the stack it runs on.

8. **Pastor segment (later).** When the reader-first platform is humming, build
   the secondary pastor layer: real per-user accounts and the team/cohort
   workspace (which today exists only in the dev runtime, not production). This is
   deliberately *after* Tiers 1–2, because pastors are a secondary audience.

---

## First three moves

1. **Settle the taxonomy** (Tier 1, #1) — everything compounds on it.
2. **Tighten the Facebook + Substack → LiveWell → email funnel** (Tier 1, #2) —
   the growth engine for the primary audience.
3. **Define the membership value ladder** (Tier 2, #5) — before any further
   Stripe work.

The rest is sequencing.

---

## How this nests

| Document | Governs | Sits |
|----------|---------|------|
| `docs/EDITORIAL-CONSTITUTION.md` | Mission — why we publish | Above all |
| `docs/VISION.md` (this file) | Strategy — what platform serves the mission, in what order | Under the constitution |
| `docs/WORLD-CLASS-BRIEF.md` | Execution — engineering, SEO, a11y, perf, content phases | Under this vision |
| `CLAUDE.md` | Voice + engineering contract; the binding mechanics | Enforced throughout |
