# The Fable 5 Depth Board — a world-class board of experts for LiveWell

> A companion to `docs/FABLE5-MASTER-PROMPT.md`. Where the master prompt runs a
> single well-scoped session, this one convenes a standing **board of experts**
> to do the thing one prompt always skimps on: **read every piece of content and
> every tool, score its depth, and lift every shallow one to the standard of the
> deepest.** Paste the block into a Claude Code session (model: Fable 5) at the
> repo root. Keep the fenced block copy-paste clean.

## Why this exists

A normal prompt asked to "improve the site" surveys the surface and deepens a
few things it happened to read closely. The result is exactly the unevenness you
noticed — some pages and tools are deep, others thin. This prompt removes the
skim by **fanning out one expert reader per surface** (every tool, every content
library, every hub page), scoring each against a shared rubric, and then
rewriting the shallow ones. Nothing gets a glance; everything gets read.

---

```
ultracode

Convene a standing, world-class advisory board for LiveWell by James Bell
(livewellbyjamesbell.co) — the theological writing platform of a working
pastor — and work in this repository. Your job this session is to make every
piece of content and every tool on the site EQUALLY DEEP: audit all of it,
find the shallow ones, and lift them to the standard of the deepest. Depth is
the product here. Uneven depth is the defect.

THE BOARD (each is a lens you must actually apply, not name-drop):
- The Theologian — is the claim true, orthodox, and charitable to the other
  side? Steelman before verdict; creeds as the floor; no fabricated citation.
- The Editor (Keller/Brueggemann/Peterson lineage) — does the prose land, in
  James's voice, with the Forbidden Language at zero and verdicts that leave
  weight?
- The Author / Book-builder — does long-form cohere as an argument, not a pile
  of sections? Does every essay reach symptom → cause → wisdom?
- The Scholar-Researcher — are the sources real, primary, dated, specific?
  Named ideas (the immanent frame, expressive individualism), not decoration.
- The SEO / Answer-Engine strategist — is it findable, structured (schema),
  internally linked, and legible to search and LLMs? Depth that no one finds
  is wasted.
- The UX / Information-Architect — can a reader get from any surface to the
  next right thing? Is each tool self-explaining and complete?
- The Product / Instrument designer — does each tool actually DO its job to a
  professional standard, or is it a stub with three inputs?
- The Brand / Art director — palette, typography, restraint, the "serious
  book in a quiet room" feel (see docs/IMAGE-AND-DESIGN-DIRECTION.md).
- The Accessibility & Performance engineer — landmarks, labels, contrast, fast
  first paint, no regressions.
- The Pastoral-Care & Ethics counsel — the crisis-facing pages keep a path to
  help; law/money/medicine carry "not professional advice"; never manipulate.

READ ORDER (before the first edit): CLAUDE.md → docs/EDITORIAL-CONSTITUTION.md
→ docs/IMAGE-AND-DESIGN-DIRECTION.md → the source of truth the task touches.
CLAUDE.md overrides you; never fabricate a quote, date, scholar, study, or
verse; keep the palette in :root tokens; API changes need BOTH runtimes.

THE DEPTH RUBRIC (score every surface 1–5 on each; a surface is "shallow" if
it scores ≤2 on any axis, and every shallow surface must be lifted to ≥4):
1. Substance — does it teach a real idea, or gesture at one? Word count is a
   symptom, not the goal: depth is ideas per surface, sourced and earned.
2. Movement — symptom → cause → wisdom. Does it stop at a tip, or form the
   reader so they can apply it to a room the page never named?
3. Scholarship — real, specific, primary citations; named concepts; dates.
4. Voice — James's register, Forbidden Language at zero, a verdict that lands.
5. Completeness — a tool actually works end to end; a page answers the whole
   question, with next steps; a library has enough entries to be worth opening.
6. Findability — title/description as string literals for SEO, structured data
   where it applies, internal links in and out, searchable terms present.

METHOD — the anti-skim protocol (this is the point):
1. INVENTORY everything first. Enumerate, with no sampling:
   - every tool in client/src/pages/tools/ (~26),
   - every content-as-data library in client/public/*.json and
     client/src/data/,
   - every hub/landing/pillar page,
   - the essay + book corpus (spot-audit by pillar; the libraries have
     validators — respect them).
   Write the full list to a scratch file so nothing falls off.
2. FAN OUT one subagent per surface (or small batch) to READ IT IN FULL and
   score it against the rubric. No surface is judged from its filename. Collect
   every score into one table, ranked shallowest-first. Log what you did NOT
   get to — silence is not coverage.
3. TRIAGE with the board: which shallow surfaces matter most (traffic, the
   money paths, the crisis pages, the pillars)? Deepen in that order.
4. DEEPEN each shallow surface to ≥4 on every axis:
   - Content pages/essays: lengthen with real substance — history, named
     scholarship, the fuller argument, the third (wisdom) movement — in James's
     voice, verified, never padded. Add internal links and structured data.
   - Tools: make them genuinely complete — more/better questions, real
     result logic, Scripture and article links, save/print, a disclaimer where
     law/money/medicine apply. A tool should feel like a professional
     instrument, not a demo.
   - Libraries: grow thin libraries to a worth-opening size; rerun the matching
     build-*-index.mjs and any validator; rerun pnpm pdfs if it feeds a PDF.
5. MAKE IT SEARCHABLE: SEOMeta title/description literals, JSON-LD via the
   existing schema helpers, internal links, plain-language terms a person would
   actually type. Depth no one finds does not count.

GUARDRAILS: smallest change that solves it; no incidental churn; never soften a
claim to fill space; every added citation verifiable or gone; a thoughtful
skeptic must finish more thoughtful, humble, and rooted — not handled.

VERIFY WITH YOUR EYES: after user-facing changes, pnpm build, serve
dist/public with an SPA fallback, and screenshot the deepened surfaces at
desktop and ~390px, light and dark. Run pnpm check, pnpm test, and the content
validators. Report the rubric table (before/after scores), what shipped, and
what you did NOT reach. Ship as focused draft PRs — one coherent batch each,
with the score table and screenshots in the body. Never merge without the
owner's word.

DELIVERABLE THIS SESSION:
1. The full inventory + rubric scores (the shallow list, ranked).
2. The deepest N shallow surfaces actually deepened and verified.
3. A short plan for the rest, so the next session continues the sweep.

Begin with the inventory. Do not deepen anything until the whole surface is
scored — otherwise you will skim again, which is the exact problem we are
solving.
```

---

## How to use it (you don't need to be technical)

1. Open a Claude Code session on this repo, set the model to **Fable 5**, paste
   the whole block, send.
2. It will first produce an **inventory and a score table** — every tool and
   content surface, ranked by how shallow it is. That table is the map of what's
   thin, which answers your "some are deep, some are shallow" directly.
3. It then deepens the shallowest, highest-value surfaces and opens draft PRs
   with before/after depth scores and screenshots. You review and merge.
4. Because the corpus is large, it runs as a **sweep**: each session deepens a
   batch and hands the next session the remaining list. Run it a few times and
   the whole site levels up to one depth.

## What it fixes, in your words

- *"Fable doesn't read through all the content and tools."* → The anti-skim
  protocol forces a full inventory and one reader per surface before any edit.
- *"Some are deep, some are shallow — deepen the shallow ones."* → The rubric
  scores each; anything ≤2 on any axis is rewritten to ≥4.
- *"Lengthen them, make them very deep and searchable."* → The deepen step adds
  real substance (not padding) plus SEO, structured data, and internal links.
- *"Improve every aspect — I don't know what to ask for."* → The board supplies
  the ten expert lenses so you don't have to name them.
