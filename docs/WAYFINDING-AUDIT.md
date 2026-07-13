# Wayfinding & Usefulness Audit

> Board output for the standing prompt in this file's companion
> (`docs/PROMPTS`: the Wayfinding & Usefulness Elevation prompt). The tension
> held throughout: **simpler to move through without losing depth.** A fix
> that deletes depth fails; depth that buries the reader fails. Ground truth
> is the real stack — React 19 + Vite + wouter + tRPC, JSON content model,
> bone/charcoal/mustard brand ("a serious book in a quiet room").

## 1. The wayfinding map — eight visitors, traced

How the current site treats a first-time visitor with each intent, from the
homepage. ✂ marks where the path breaks.

| Visitor | Path today | Where it breaks |
|---|---|---|
| **Doubting Christian** | Hero "Find your track" → /start quiz, or nav "Theological Depth ▾" | ✂ Nothing on the first screen says *doubt* in their words. "Theological Depth" is our filing label, not their search. The doubt essays (18 strong, question-titled) are reachable only through taxonomy. |
| **Skeptic / ex-atheist** | Small tertiary hero link "Or start here if you're a skeptic" | Path exists and is good (/skeptic-track) — but it is the *third* link in the hero, easy to miss. Distribution traffic will arrive mid-site, where no skeptic-specific "keep going" rail exists (see §7). |
| **Marriage in trouble** | Nav → Write & Read ▾ → Marriage, or footer | ✂ Two clicks through menus a hurting person will not browse. Crisis-adjacent intent deserves a door, not a dropdown row. |
| **Parent** | Nav → /family via Everyday-Life-ish grouping, footer "Parenting" | Same pattern: findable, not offered. |
| **Tired pastor** | Nav "For Pastors ▾" → PCN | Best-served intent (dedicated group) — but the door says "For Pastors," not "you're tired"; the care content (loneliness, burnout) is one more layer down. |
| **Wants to disciple someone** | "The Table" top-level in header ✓ | Works — the model to copy. |
| **Has a hard question** | /faq exists; "Questions people ask" lives in the *footer's* Libraries & Tools | ✂ The single most search-shaped surface on the site is footer-only. |
| **Brand new** | Hero "Find your track" → /start ✓ | Works. |

**The fix shipped with this audit:** the homepage doors section is now eight
**intent doors in the reader's own words** ("I'm doubting my faith," "My
marriage is struggling," "I'm a pastor, and I'm tired"…), each routed to the
existing surface that serves it. Recognition over recall. The taxonomy still
lives below (Five Pillars section) and in the nav — the depth lost nothing.

## 2. Density + flow map

Density (from the corpus audit) crossed with a second axis: does the page
**FLOW** (guides a reader) or **DUMP** (presents a wall)?

| Surface | Density | Flow | Prescription |
|---|---|---|---|
| Home | DENSE | FLOWS (now) | Intent doors shipped; keep vision card and pillar spine. |
| /writing index | DENSE | **DUMPS** | 150+ cards behind filters. Add a hub spine: one line of purpose → "Start with these three" → full grid behind the fold. |
| /theology hub | DENSE | **DUMPS** (improved by relief bands) | Six stacked grids. Apply the "start with three → see all" spine per section. |
| /historic-faith | DENSE | FLOWS | The model hub — sectioned, paced, relief-blocked. Copy its shape. |
| /table | DENSE | FLOWS | On-ramp callout + 18 studies. Good. |
| /justice, /disruption (PropheticHub) | DENSE | MIXED | Strong spine; long tail of cards needs the see-all fold. |
| /leadership hub | DENSE | **DUMPS** | Deepest library on the site, least guided. Needs "If you're new, start here" row: Servant Leadership → Handbook → Library. |
| /faq | THIN spine | DUMPS | Exists but not question-first enough; see §4 — this becomes the Answers hub. |
| /marriage, /parenting, /family | DENSE | FLOWS | Keep. |
| Essay pages | DENSE | MIXED | 2,000+ words with no map. §6 kit. |
| ~150 stub URLs | BARE → handled | — | Hidden by length guard; 129 redirected; 27 commissioned (6 written). |

## 3. The intent layer (shipped)

`Home.tsx` DOORS: eight doors, reader-worded, all targets verified live routes
(`/start`, `/theology/questions`, `/skeptic-track`, `/marriage`, `/family`,
`/pastors`, `/table`, `/faq`). Copy is UI register (not Bell-voice prose):
specific promise, no hype, no forbidden language, hard periods. Grid reuses
the existing card pattern — zero new tokens.

**Next iteration (not shipped):** per-door *curated path pages* (3–5 pieces in
reading order with a one-line frame) instead of routing to hubs. Effort:
half-day per door + one Creative Brief each for the frame paragraph.

## 4. The Answers architecture (spec — the next build)

One hub, `/answers`, where **each H2 is the reader's actual query**, answered
in three tight paragraphs that ladder: short answer → the essay → the book.
Fifteen launch questions, all already answered by strong corpus essays:

1. Did the resurrection actually happen? → `did-the-resurrection-happen` → *The Reliability of Scripture*
2. Why would anyone trust the Bible? → `why-trust-the-bible` → *The Reliability of Scripture*
3. If God is good, why is there so much suffering? → `if-god-is-good-why-suffering` → *Prayer in the Dark*
4. What if Christianity is wrong? → `what-if-we-are-wrong` → *Born Again From Atheism*
5. Was Jesus just a good teacher? → `was-jesus-just-a-good-teacher` → *The Scandal of the Cross*
6. Do I have to choose between faith and science? → `faith-and-science` → *Born Again From Atheism*
7. Is it okay to be angry at God? → `what-psalms-teach-about-anger-at-god` → *Prayer in the Dark*
8. Can you be a Christian without going to church? → `can-you-be-a-christian-alone` → *The Body You Left*
9. What if I'm done with church but not with Jesus? → `done-with-church-not-jesus` → *The Body You Left*
10. What happens after you deconstruct your faith? → `deconstruction-without-reconstruction` → *Faith After Deconstruction*
11. How can God be three and one? → `the-trinity-plainly` → *Why Not What*
12. Is the gospel political? → `conscience-outsourced-to-party` → *When God Bless America…*
13. What does the Bible say about money? → money-track essays → *Where Your Treasure Is*
14. What does the Bible actually say about anxiety? → anxiety essays → *Consider the Birds*
15. When your teenager says they don't believe → `teenager-losing-faith` → *Raising Believers*

Metadata pattern (Fable 5 owns): title = the question verbatim (<65 chars);
meta 150–155 chars, first clause answers, second invites; slug = kebab
question; JSON-LD `FAQPage` on the hub + `Article` per essay; every answer
cross-links two sibling questions. The three-paragraph answers themselves are
**Bell-voice prose → Creative Briefs** (15 briefs, one per question) — the
strategy model does not write them.

## 5. Header vs footer — resolved posture

Footer = the complete map (keep). Header = curated and shallow (already
trimmed to `primary` links + The Table top-level). Remaining spec:
- Add one **featured column** to the two heaviest dropdowns (The Pillars,
  Libraries & Tools): 2 "most-read" items with one-line descriptions, sourced
  from a small committed list (no API call, first-paint safe). Effort: half-day.
- Leave the rest alone. The header has been reworked twice this cycle;
  stability is itself a UX feature.

## 6. The reading-experience kit (spec)

For essays over ~1,400 words, an orientation header inside `ArticleDetail`:
- **Reading time** (exists in data) + **"The one thing"** — a single-sentence
  thesis line (Bell-voice → per-essay brief, or derived from excerpt).
- **Key-points rail / table of contents** from the essay's H2s, anchor-linked,
  sticky on desktop, collapsed on mobile.
- Depth untouched; the wall gets a door and windows. Effort: multi-day
  (component + H2 anchor pass); no prose changes required to launch with
  TOC-only.

## 7. No dead ends — the audit

- Essay pages: end well (KeepReadingBook + related + signup). ✓
- **/skeptic-track completion**: no skeptic-specific next step at the end of
  doubt essays — build the "You don't believe this? Read this next" rail
  (Next-Ten #7). ✂
- **/faq answers**: answer text ends without laddering to essays. ✂ (§4 fixes.)
- **Assessment results** (Whole-Life, Formation): offer "change my answers"
  but weak forward routing into content. ✂ — route results to matching
  pillars/tools.
- **/pillars**: lists six pillars, no "start with this one if…" guidance. ✂
- Book thank-you pages: ✓ (download + next book).

## Board recommendations — unasked, needed

1. **Ship the door-path pages before heavy promotion.** The intent doors now
   promise "built for exactly that." Two targets (/faq, /theology/questions)
   are the weakest surfaces on the list. Build §4 next so the promise holds
   end-to-end. Priority: critical.
2. **Add a "most-read" strip to /writing** above the filter wall — six curated
   flagships (the corpus audit's list). One afternoon, converts the site's
   biggest DUMP into a guided entry. Priority: high.
3. **Watch the doors.** Once depth-analytics (Next-Ten #4) lands, instrument
   door-clicks; the door nobody opens is mislabeled, and the label — not the
   destination — is what to change. Priority: high, dependent on #4.
