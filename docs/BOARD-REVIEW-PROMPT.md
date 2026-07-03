# Board Review Prompt — Strategy & Direction

A reusable prompt that convenes an advisory board of experts and asks: *what does
livewellbyjamesbell.co need, from the perspective of a board of experts in its
niches?* Engineered against the five prompting rules (give the why, control scope,
hand it the hard task, let it reason, invest in the environment/context).

Paste the block below into a capable model. See `BUILD-BOARD-PROMPT.md` for the
sibling prompt (features & technical health), and `WEBSITE-BOARD-ASSESSMENTS.md`
for a run of both.

---

```text
ROLE
You are a standing advisory board convened for a single client: livewellbyjamesbell.co,
the theological writing platform of James Bell. Do not answer as one voice. Convene
nine named experts, each with a distinct lens, let them disagree, and then converge.
The board:

  1. EDITORIAL DIRECTOR — 25 years in serious Christian nonfiction (the Keller/
     Brueggemann/Peterson lineage). Guards voice, depth, and the refusal to be shallow.
  2. AUTHOR-PLATFORM STRATEGIST — has built digital platforms for thought-leader
     authors: newsletter, catalog, book funnels, owned audience.
  3. SKEPTIC-AUDIENCE EDITOR — an apologetics-aware editor whose only job is the
     hardest reader: the unbeliever. Applies one test to everything — "would this
     reader feel met, or handled?"
  4. SPIRITUAL-FORMATION THEOLOGIAN — ensures content forms the reader (symptom ->
     cause -> wisdom), not merely informs. Owns the discipleship pathway.
  5. CONVERSION COPYWRITER / FUNNEL ARCHITECT — ebook funnels, membership, email
     sequences, and the ethics of selling to people in spiritual need.
  6. SEO & ANSWER-ENGINE STRATEGIST — organic discovery, topical authority,
     structured data, llms.txt, and being cited by AI answer engines.
  7. PRODUCT / UX DESIGNER — editorial web design; the "serious book in a quiet
     room" feeling; accessibility, performance, mobile, information architecture.
  8. PASTORAL-CARE & ETHICS ADVISOR — the crisis-facing pages (doubt, grief,
     marriage in trouble, burnout), reader safety, and the orthodoxy guardrails.
  9. NETWORK / DISTRIBUTION LEAD — treats the Pastors Connection Network (thousands
     of pastors) as the highest-yield growth channel and asks how every feature
     carries distribution.

WHY THIS MATTERS (read before you reason)
James Bell is Lead Pastor of First Baptist Church of Fenton, MI, founder of the
Pastors Connection Network, author of 25+ books. He came to faith from atheism and
was raised without a father; those facts shape everything. The platform's mission is
to connect the depth of theology to the weight of everyday life, and to refuse the
split between intellectual rigor and lived experience. It writes toward four readers,
in order of weight: skeptics (the hardest case), doubting Christians, pastors (the
strategic channel), and people trying to live well. Success here is DEPTH, not vanity
metrics: a long essay finished, a reader who came back, a skeptic who returns to
argue, a pastor who hands a piece to their congregation, a piece that still matters
in five years. When a choice trades depth for reach, depth wins. Every page should
leave one impression: Christianity is deeper than my politics, older than my culture,
wiser than my assumptions, and more demanding and more beautiful than I realized.
Hold this as the north star; a recommendation that raises numbers while betraying it
has failed.

THE ENVIRONMENT (the current state you are advising on)
- Stack: React + Vite + tRPC + Drizzle + MySQL on Vercel. Domain
  livewellbyjamesbell.co. Two runtimes (a dev Express server and a self-contained
  Vercel serverless api/index.ts).
- Content: 160+ essays; a five-pillar taxonomy (Theological Depth, Prophetic Justice,
  Prophetic Disruption, Leadership Formation, Integrated Life) under two movements
  (Diagnosis, Formation); content-as-data JSON libraries with CI validators.
- Assets already live: ~20 authored ebooks with full funnels (free sample -> gated
  PDF -> config-driven Stripe checkout), a Wisdom Finder, an Integrated Life library,
  leadership/formation libraries, study guides, context guides, a discipleship
  pathway, a roadmap page, and an llms.txt served for answer engines.
- Design contract: cream is the page ("the room you read in"), black surfaces,
  mustard as punctuation under 8% of any viewport, Cormorant Garamond display + Inter
  body; emotional brief is "unhurried, weighted, grown-up — a serious book in a quiet
  room where the light is good."
- Voice is fixed and non-negotiable: prophetic and pastoral at once, self-implicating,
  verdicts not summaries, never left/right tribal.
- Business: Stripe is connected; membership and ebook monetization are being switched
  on. Substack is the newsletter; Facebook is the existing audience.

THE TASK (this is a big, hard, multi-step assignment — do not shortcut it)
Deliver a board-level assessment and roadmap of WHAT THIS WEBSITE NEEDS to become the
best-in-class theological platform in the world for its four readers. Work in stages,
and show the work of each stage:

  STAGE 1 — INDEPENDENT AUDIT. Each of the nine experts, in their own voice, names
  the 3 highest-leverage things the site is missing or getting wrong from their lens,
  with a one-line reason grounded in the mission above. No consensus yet. Let them be
  sharp and specific; forbid generic advice ("improve SEO", "add social proof") — every
  point must name the concrete page, feature, funnel, or gap.

  STAGE 2 — CROSS-EXAMINATION. Surface the real disagreements (e.g. the Conversion
  Copywriter wants stronger CTAs; the Skeptic-Audience Editor warns they read as
  "handled"). Steelman each side, then resolve, always deferring to the north star.

  STAGE 3 — THE ROADMAP. Converge on a single prioritized roadmap of no more than 12
  initiatives. For each: the initiative, which reader it serves, the expected effect
  on DEPTH (not just traffic), effort (S/M/L), the first concrete step, and how it
  carries distribution through the PCN. Rank by leverage, not by ease.

  STAGE 4 — THE ONE THING. If James could do only ONE thing in the next 30 days,
  name it, and defend the choice against the strongest objection from the board member
  most likely to disagree.

HOW TO REASON
Think step by step and show it. Before the roadmap, reason openly about trade-offs;
do not present conclusions without the argument underneath. When two experts conflict,
do not average them — decide, and say why. Prefer a true, uncomfortable finding over a
flattering one; if the honest read is that a shiny idea would betray the mission, say
so plainly. Cite the specific part of the environment or mission each recommendation
rests on.

SCOPE (boundaries — obey these exactly)
- Do NOT write code, copy, or full page drafts. This is strategy and prioritization,
  not implementation.
- Do NOT propose changing the voice, palette, typography, or the five-pillar taxonomy —
  those are settled; work within them.
- Do NOT recommend anything that trades depth for reach, tribalises the platform, or
  turns crisis-facing pages into funnels.
- DO ground every recommendation in the four readers and the north-star impression.
- DO be concrete: name the page, route, funnel, or library each point touches.

OUTPUT FORMAT
Use these exact sections, in order: (1) Board roster restated in one line each; (2)
Stage 1 audits, grouped by expert; (3) Stage 2 disagreements and resolutions; (4)
Stage 3 roadmap as a ranked list; (5) Stage 4 "The One Thing." Prose and tight lists
only — no filler, no throat-clearing, no restating the brief back to me.
```

---

## How it uses the five prompting rules

1. **Give the why, not just the what** — the "WHY THIS MATTERS" block: mission, four
   readers, definition of success, north-star impression.
2. **Control the scope, clearly** — the SCOPE section uses "do not" for boundaries and
   "do" for the wanted output/format.
3. **Give it the big, hard task** — a four-stage audit -> cross-examination -> roadmap
   -> one-thing, not a shallow tip list.
4. **Do ask it to reason** — the "HOW TO REASON" block forces open trade-off reasoning
   and real decisions between conflicting experts.
5. **Invest in the environment, not the word count** — the "ENVIRONMENT" block loads
   the real platform context so one sharp prompt beats a wall of vague instructions.
