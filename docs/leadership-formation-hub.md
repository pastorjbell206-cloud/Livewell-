# Leadership Formation — The Definitive Hub

The build specification, data contracts, tool suite, production roadmap, and style guide.
Governing conviction: **formation before function**. This hub forms shepherds, not CEOs.

---

## 1. Information architecture

```
/leadership                          The hub (existing): tools, articles, sermon series
/leadership/formation                Deep formation index — the eight-part topics by pillar
/leadership/formation/:slug          A deep topic (fixed eight-part method, schema below)
/leadership/inventory                The Leadership Formation Inventory (flagship diagnostic)
/leadership/library                  The article library (existing, 131+ articles)
/leadership/sermon-series            Sermon series library (existing, PDFs attached)
/leadership/assessment/:slug         Existing lighter assessments
+ existing: /leadership/team, sermon-prep, illustrations, meeting, visitation,
  governance, budget, decision-log, before-you-post, workflows, services, surveys
```

Cross-linking rules: every deep topic ends with the Inventory CTA; conviction
topics cross-link the Theology comparison tool (/theology/compare) since a
leadership conviction is also a doctrine; power/justice topics cross-link
Prophetic Justice and Prophetic Disruption pillar pages.

### The five content pillars

| # | Pillar | What it holds |
|---|--------|---------------|
| 0 | Orientation | Formation before function. The triage taxonomy. The CEO danger. The author's lens stated openly. |
| 1 | The Interior Life | Character qualifications, calling, hidden life, ego, identity, integrity, rest and burnout, emotional health, family, the temptations of power, money, and sex. |
| 2 | Leading People | Servant leadership, non-domineering authority, staff, multiplying leaders, mentoring, conflict, criticism and betrayal, congregational anxiety systems, communication, accountability. |
| 3 | Leading the Institution | Polity (4 views), men and women in leadership (2 views), vision and change without manipulation, revitalization, discernment, organizational health, money and transparency, abuse-prevention governance, culture. |
| 4 | The Arc of a Leadership Life | Entering a call, first years, growth/plateau/decline/crisis, the second half, transitions, succession, finishing, stepping down, life after the role. |

---

## 2. The data schema (structurally enforced)

Deep topics live as JSON at `client/public/leadership/formation/<slug>.json`.
The fixed eight-part order IS the schema — a topic that skips a part will not validate.

```jsonc
{
  "slug": "...",
  "title": "...",
  "subtitle": "SEO meta description",
  "pillar": "Orientation | The Interior Life | Leading People | Leading the Institution | The Arc of a Leadership Life",
  "triage": "command | conviction | wisdom",
  "parts": [
    { "id": "real-question",       "title": "...", "body": "..." },
    { "id": "why-it-matters",      "title": "...", "body": "..." },
    { "id": "biblical-foundation", "title": "...", "body": "..." },
    { "id": "historical-witness",  "title": "...", "body": "..." },
    { "id": "traditions-debates",  "title": "...", "body": "intro",
      "views": [{ "name": "...", "body": "steelmanned, in its own voice" }] },
    { "id": "scholarship",         "title": "...", "body": "intro",
      "christian": [{ "source": "", "author": "", "note": "" }],
      "secular":   [{ "source": "", "author": "", "whatItGetsRight": "", "testedAgainstScripture": "" }] },
    { "id": "formation",           "title": "...", "body": "..." },
    { "id": "practice",            "title": "...", "body": "intro",
      "stages": [{ "stage": "First-time volunteer | Emerging leader | Staff and senior leaders | ...", "steps": ["..."] }] }
  ]
}
```

### What the validator enforces (`scripts/validate-formation.mjs`, CI-gateable)

1. **Character before competence**: the part order is fixed; `formation` always
   precedes `practice`, the interior parts always precede the functional ones.
2. **Secular wisdom is never absorbed uncritically**: every entry in
   `scholarship.secular` must carry a non-empty `testedAgainstScripture`.
3. **Equal-weight steelmanning**: `triage: "conviction"` requires >= 2 views with
   word counts within 35% of each other. A reader must not be able to detect the
   author's position.
4. **Triage taxonomy**: every topic declares `command`, `conviction`, or `wisdom`,
   rendered as a badge so readers always know which they are reading.
5. House content rules (no em/en dashes, semicolons, exclamation marks, double
   quotes in values, forbidden-word list).

Pipeline: `node scripts/validate-formation.mjs && node scripts/build-formation-index.mjs`

---

## 3. The tool suite

### Built now
- **The Leadership Formation Inventory** (`/leadership/inventory`) — flagship.
  41 statements, character bank first (5 domains x 5) and weighted 0.65 vs
  capacity (4 domains x 4) at 0.35. Results render character first; the two
  lowest character domains become "Where formation starts" with a pastoral
  reading, practices, and matched reading. Retakeable: history in localStorage
  with per-domain deltas, because the point is formation over time, not a score.
- **Deep topic renderer + index** with triage badges and steelman view cards.
- Existing and adjacent: burnout self-check, team workspace, meeting builder,
  decision log, governance library, budget calculator, sermon workbench,
  assessments, surveys (all under /leadership/*).

### Specified next (priority order)
1. **Calling discernment guide** — multi-step walkthrough: internal desire
   (1 Tim 3:1), character fit (the qualifications as a mirror, not a ladder),
   external confirmation (who who knows you affirms this), the church's call
   (no self-appointed shepherds), provision and timing. Each step: Scripture,
   honest questions, a journal field (localStorage), and a "wait well" path —
   the tool must be able to say "not yet" warmly.
2. **Polity comparison tool** — same UX as /theology/compare: pick 2 of the 4
   polities; rows = structure, strongest texts, historical record, characteristic
   failure mode, what it protects. Data from church-government.json views so
   content stays single-sourced.
3. **Conflict navigation walkthrough** — decision tree: Is this sin against you
   (Matthew 18 path), a wisdom disagreement (Acts 15 path), an offense to
   absorb (Proverbs 19:11 path), or abuse (the safeguards path — never send a
   victim back through "go privately first")? Each terminal node: steps,
   Scripture, and when to bring in outside help. The abuse branch routes to
   governance safeguards, not reconciliation pressure.
4. **Rule of life builder** — construct a personal rule across prayer, rest,
   relationships, work, accountability; by season and role; export as PDF via
   the existing build-pdfs pipeline pattern; review dates.
5. **Stage-aware reading-path engine** — extends /discipleship's tracker
   pattern: volunteer → emerging → staff → senior → finishing; sequences deep
   topics, library articles, and tools per stage with progress.
6. Emotional/relational health assessment; team & board health assessment
   (multi-rater via shareable scoring sheet); mentorship guide; corporate
   discernment framework; succession planner; annotated library (extend the
   deep topics' scholarship blocks into a browsable shelf); case-study library
   (anonymized dilemmas worked through the eight parts); Socratic companion
   (question sequences per topic — no AI dependency required: curated question
   trees in JSON, same architecture as everything else).

---

## 4. Content production roadmap

Wave 1 (done): schema + validator + renderer + index; flagship topic
"The Hidden Temptations of Power" (Pillar 1, command); "Church Government"
(Pillar 3, conviction, 4 views); "Men, Women, and the Office" (Pillar 3,
conviction, 2 views); the Formation Inventory.

Wave 2 — Pillar 1 core (the interior life is the hub's heart): the character
qualifications read closely; calling; the hidden life and rule of life; identity
not rooted in role; burnout and the theology of rest; the leader's marriage and
family; money and sex safeguards (companion to power). Plus Pillar 0 orientation
essay.

Wave 3 — Pillar 2: servant leadership vs the slogan; authority without
domineering; staff (hiring, shepherding, releasing); multiplying leaders;
conflict (with the walkthrough tool); criticism and betrayal; Friedman's anxiety
systems tested against Scripture; accountability structures.

Wave 4 — Pillar 3 remainder: vision and change without manipulation;
revitalization; corporate discernment; money and transparency; abuse-prevention
governance (cross-checked with Langberg); culture-building.

Wave 5 — Pillar 4: the whole arc, entering to finishing; succession; stepping
down; what a leader becomes after the role.

Each wave: write topics as JSON → validate → build index → cross-link → extend
the sitemap manifest list (generate-sitemap.mjs already reads manifests; add the
formation manifest to its sources).

---

## 5. Style guide (the hub's voice)

- **Register**: rigorous enough for a seminary, warm enough for an exhausted
  pastor at midnight. Plain, serious, pastoral. Never shaming — the reader may
  be wounded; the hub forms and heals.
- **Bell patterns**: short declaratives; "Not X. Y." with hard periods;
  short-long-short rhythm; verdicts, not summaries; endings that leave weight;
  self-implication — the writer has led, failed, and stayed, and says so in
  first person.
- **Honesty rules**: name the failures of every tradition including the
  author's own; tell church history's sins plainly (Calvin and Servetus, the
  cover-ups); never name living individuals as negative examples — name
  patterns.
- **Steelman rules**: each contested view written in its own advocate's voice,
  strongest texts handled exegetically, length parity enforced; if a reader can
  tell the author's position, the page has failed.
- **Secular sources**: always the pair — what it gets right, where its
  anthropology contradicts the gospel. Never sneer at it; never baptize it.
- **Mechanics**: no em/en dashes, no semicolons, no exclamation marks, no
  double quotes inside values; forbidden words per CLAUDE.md; every term
  defined on first use; Scripture quoted from public-domain text or paraphrase.
- **Triage discipline**: commands are preached; convictions are steelmanned;
  wisdom matters are offered, never imposed.
