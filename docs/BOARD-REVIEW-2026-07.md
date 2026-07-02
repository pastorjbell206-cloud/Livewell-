# Board Review — July 2026

> The nine-expert board convened by `docs/BOARD-REVIEW-PROMPT.md`, run against
> the platform as it stands after the site-elevation program (PR #298 merged,
> QW-22 enforced, elite content waves 1–9 live). Written from the evidence in
> `docs/audit/` — the 19 audits, `ROADMAP.md`, `RESULTS.md` — not from
> impressions.

---

## 1. The board

1. **Editorial Director** — guards depth and voice; the Keller/Brueggemann/Peterson lineage.
2. **Author-Platform Strategist** — owned audience, catalog, funnels.
3. **Skeptic-Audience Editor** — one test: met, or handled?
4. **Spiritual-Formation Theologian** — symptom → cause → wisdom; owns the pathway.
5. **Conversion Copywriter / Funnel Architect** — the ethics and mechanics of the ask.
6. **SEO & Answer-Engine Strategist** — topical authority, structured data, being cited.
7. **Product / UX Designer** — the serious book in a quiet room.
8. **Pastoral-Care & Ethics Advisor** — crisis pages, guardrails, reader safety.
9. **Network / Distribution Lead** — the PCN as the highest-yield channel.

---

## 2. Stage 1 — independent audits

**Editorial Director.**
1. The platform's reference spine is thinner than its essay spine: `/theology/questions`, `/theology/compare`, and the glossary carry real weight, but there is no systematic-theology shelf, no biblical-theology arc, and church history at `/theology/history` covers eras, not the whole story. The essays argue; the library that would let a reader *check* the arguments is missing. (This is the gap the owner has just commissioned closed.)
2. `/writing` treats a 900-word note and a 4,000-word cornerstone identically; the catalog needs editorial tiers (cornerstones surfaced as such) or the depth is invisible at the shelf.
3. The weekly essay has no weekly reader: nothing leaves the building on a schedule. Depth without cadence reads as an archive, not a publication.

**Author-Platform Strategist.**
1. The subscriber list is collected honestly into the database (`subscribers.subscribe`) and then *nothing happens* — no sender exists anywhere in the stack (audits 09/10; roadmap LT-4). Every other investment leaks without a return path. This is the platform's missing organ.
2. Substack holds the actual newsletter audience; the platform does not own its primary channel. The header now honestly points to `/subscribe`, which feeds a list that cannot be mailed.
3. Twenty-one ebooks with working funnels and no catalog-level cross-sell logic beyond `KeepReadingBook`: a buyer of one book is never systematically introduced to the shelf.

**Skeptic-Audience Editor.**
1. The skeptic path (`/skeptic-track`, *Born Again From Atheism*, the hard questions) is genuinely strong — the rarest thing on this board's desk. But it is buried: "Start here if you're a skeptic" is one underlined line on the homepage; the hardest reader deserves a first-class door.
2. `/theology/questions` must never resolve too fast. As the library expands (per the commission), every hard question needs the strongest unbeliever quoted fairly, or the skeptic smells the thumb on the scale.
3. The compare-views surface is the single best trust artifact for this reader — "they show me the other side's best case" — and it covers too few doctrines to prove the habit.

**Spiritual-Formation Theologian.**
1. Reading paths exist; completion does not. Nothing marks a path finished or hands the reader the next one — formation needs sequence, and sequence needs memory (the persistence layer from HS-5 now makes this cheap).
2. The Table curriculum and the family-devotion library are the two most *formative* assets on the site and neither appears in the discipleship pathway's main flow.
3. The assessments now remember answers (HS-5) but still end at results; results should end at a practice, not a score.

**Conversion Copywriter.**
1. The membership page falls back to a waitlist with no stated offer. Before any checkout push: name what a member receives. An ask without an offer is noise.
2. Post-purchase is a dead end: the thank-you pages deliver the PDF and stop. One quiet line — "the next book in this vein" — is honest and absent.
3. The one place capture belongs and is missing: end-of-essay, after value was delivered. Never on crisis pages (agreeing with #8 before she says it).

**SEO & Answer-Engine Strategist.**
1. The commissioned reference library is the topical-authority play of the decade for this domain — *if* every entry is a real page with its own head, schema, and internal links, not a JS-rendered island. HS-6's prerender covers 619 routes; the new library must ride the same rail.
2. Hard questions are natural Q&A schema; compare-views are natural comparison schema; neither carries structured data yet.
3. Three pages sit at SEO 92 (RESULTS.md) for missing per-page descriptions post-prerender — a one-day sweep.

**Product / UX Designer.**
1. Performance and accessibility are now elite (2.1 s Speed Index, 0 axe violations); the risk has inverted — the new library must not arrive as walls of unshaped text. It needs the article-body type system and the reading-time honesty the essays have.
2. Site search does not index the glossary, questions, or compare surfaces; a reader who searches "justification" finds essays but not the definition.
3. The dark-mode reading experience on long chapters is the room most readers will actually sit in at night; it deserves one deliberate QA pass on the new library formats.

**Pastoral-Care & Ethics Advisor.**
1. Crisis pages now carry real-help paths (QW-6) — hold that line as the library grows: doctrine-of-suffering entries will attract readers in acute grief; every such entry needs the same visible door to help.
2. The contested-doctrine protocol (steelman, classify the order, name the landing, leave second-order open) is written in CLAUDE.md; the expansion must enforce it *structurally* — a validator, not a vibe.
3. No fabricated authority, ever: a reference library multiplies citation surface a hundredfold; the citation-integrity discipline from elite waves 6–8 must govern every new entry (paraphrase-with-attribution over quotation; verifiable or gone).

**Network / Distribution Lead.**
1. The PCN is thousands of pastors and the site's pastor surface is deep — but nothing is *packaged for handing on*. A per-essay congregation pack (print PDF + discussion questions) turns every pastor into distribution, at zero reach-chasing cost.
2. The leadership manuals PDF pipeline already exists (`scripts/build-pdfs.mjs`); the reference library should ship print editions for the pastor's study from day one.
3. The weekly send (when it exists) needs a pastor edition — same essay, plus "how to preach it."

---

## 3. Stage 2 — disagreements, steelmanned and resolved

**Copywriter vs. Skeptic Editor + Ethics (capture pressure).** The Copywriter's
case: honest capture at the moment of delivered value is service, and the
platform under-asks to the point of self-harm. The Editor's case: this
readership's trust is the entire asset; one manipulative-feeling ask on a doubt
page costs more than a thousand addresses. *Resolution:* capture lives at
end-of-essay and post-purchase only; never on crisis routes (`/grief`,
`/faith-crisis`, `/pastoral-burnout`, the suffering entries); no exit intents,
no timed modals, ever. The north star decides: a reader who feels handled is a
reader lost to the mission, not just the list.

**Strategist vs. Network Lead (leave Substack?).** The Strategist: the platform
must own its channel; Substack is a rented room. The Network Lead: Substack's
recommendation graph is free distribution the platform cannot replicate on day
one. *Resolution:* the database list becomes the home (ESP + weekly send);
Substack continues as a syndication mirror, not the home. Own the asset, keep
the borrowed reach until it is outgrown.

**SEO Strategist vs. Editorial Director (programmatic scale).** The Strategist
wants hundreds of entries fast; the Director hears "thin content" and reaches
for a red pen. *Resolution:* the reference library is built at full editorial
depth or not at all — but its *architecture* (entry schema, steelman blocks,
cross-links, validators) is programmatic so depth scales without drift. Volume
is a by-product of the method, never the target.

**Formation Theologian vs. Editorial Director (paths vs. essays).** More
curricula, or more cornerstones? *Resolution:* no conflict at the atom level —
paths assemble existing atoms. The marginal investment goes to sequencing and
completion memory, which is engineering, not editorial dilution.

---

## 4. Stage 3 — the roadmap (ranked by leverage)

1. **Own the return path** — ESP decision + weekly essay send from the DB list; Substack becomes a mirror. *Readers:* all four. *Depth effect:* cadence turns the archive into a publication; return visits are the depth metric. *Effort:* M. *First step:* owner picks the ESP (LT-4 decision); wire one transactional template. *PCN:* the pastor edition rides the same send.
2. **The Theological Reference Library** — systematic theology, biblical theology, church history completed; hard questions and compare-views expanded; PassageContext to full-canon coverage — one entry schema, steelman-enforcing validator, prerendered pages, article-body type. *Readers:* skeptic, doubter, pastor. *Depth effect:* the platform becomes checkable — the trust artifact. *Effort:* L (waves). *First step:* the inventory + architecture already underway. *PCN:* print editions via the existing PDF pipeline.
3. **Congregation packs** — per-cornerstone print PDF + discussion questions. *Reader:* pastor. *Effort:* M. *First step:* template one pack from an existing cornerstone. *PCN:* this *is* the PCN play.
4. **Depth telemetry** — finished-essay rate, path completion, return readers (privacy-light, Vercel Analytics events). *Effort:* S–M. *First step:* define the three events; instrument ArticleDetail.
5. **The membership offer** — name it before selling it (early library access + quarterly print is the board's candidate). *Effort:* S to define, M to ship. *First step:* one page of copy the Ethics Advisor signs.
6. **The skeptic front door** — `/skeptic-track` into the header's Start-here flow; *Born Again From Atheism* as its spine. *Effort:* S. *First step:* one nav line + hub placement.
7. **Path completion memory** — HS-5 storage marks path progress; "next essay" surfaced on return. *Effort:* M.
8. **Search over the reference layer** — glossary/questions/compare/library entries into Search.tsx. *Effort:* M.
9. **Catalog cross-sell honesty** — post-purchase "next book"; KeepReadingBook coverage audit to all 21+. *Effort:* S.
10. **SEO 92 sweep + reference schema** — per-page descriptions; Q&A and comparison structured data. *Effort:* S.
11. **Pillar-4 parity** (constitution mandate) — family/household library continues to parity with the other pillars. *Effort:* L, ongoing waves.
12. **Reference print editions** — the library through `build-pdfs.mjs` for the pastor's study. *Effort:* M, after #2's first wave.

---

## 5. Stage 4 — the one thing

**Stand up the owned weekly send (roadmap #1).**

The strongest objection comes from the Editorial Director: *depth first — the
commissioned library is the mission's own artifact, and email is plumbing.* The
answer: the depth engine is already running — nine elite waves shipped while
this board sat, and the library program starts today regardless; it does not
need the founder's only scarce resource, which is the 30-day window of
attention. What no wave can fix is that the platform currently collects
addresses honestly and returns nothing to them. That is not merely a growth
gap; it is a quiet trust debt to the exact readers the mission names — and
trust is the only currency this platform runs on. Thirty days buys: an ESP
chosen, the DB list connected, one weekly essay template in the house voice,
and the first send. Every initiative above it on this list compounds the moment
it exists; none of them compound without it.

The library makes the platform worth returning to. The send is how anyone
returns. Do the send.
