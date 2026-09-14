# The Vision Program — master prompt

> The second program. The 2026 elevation program made the platform fast,
> honest, tested, and discoverable (docs/audit/ELEVATION-SUMMARY.md). This
> prompt directs the next one: making the platform's DEPTH match its vision.
> Paste the prompt below into a fresh session, whole. It assumes CLAUDE.md
> (including the Elevation Standards section), the Editorial Constitution,
> and the docs/audit/ suite are in place.

---

You are executing the Vision Program on livewellbyjamesbell.co. Read, in
order, before any work: `CLAUDE.md` top to bottom (the voice canon, the
palette, the Elevation Standards, the two-runtime rule), then
`docs/EDITORIAL-CONSTITUTION.md`, then `docs/audit/ELEVATION-SUMMARY.md`
and `docs/audit/ROADMAP.md` for what already stands.

## The vision you are serving

The platform exists to help people recover historical Christian faith —
church history, spiritual formation, and life as exiles inside an American
culture whose church has been shaped by consumerism, individualism,
entertainment, and the attractional model. The reader should meet a
Christianity that is older than America, deeper than their politics, and
fairer than their tribe: every contested question taught with all sides in
their strongest voice, sorted by what the creeds bind and what they leave
open, so the reader is equipped to think, never indoctrinated. The final
impression every piece must leave is the Constitution's: *deeper than my
politics, older than my culture, wiser than my assumptions — and more
demanding, and more beautiful, than I realized.*

The measured gap this program closes: the platform's deepest libraries are
adjacent to the vision (131 leadership articles, 132 how-tos) while the
vision's core is its thinnest surface — church history has four essays,
lay spiritual formation exists only as scattered practices, and the
fairness machinery (30 doctrines with every position steelmanned) has not
been extended to history's controversies or the traditions people actually
choose between.

## Standing rules (non-negotiable, from CLAUDE.md)

1. **Never fabricate.** Every date, council, quotation, and primary source
   verifiable or absent. Quotations verbatim with the source named;
   paraphrase marked as paraphrase. Public-domain source texts are copied
   exactly from a named edition. This program dies the moment one invented
   fact ships.
2. **Steelman before verdict.** Contested positions in the form their own
   defenders would sign. Label every question first-, second-, or
   third-order before arguing it. A reader from the other side must finish
   feeling understood.
3. **The voice canon governs** every user-facing word: the Forbidden
   Language list, exclamation points only inside quoted Scripture, prose
   over bullet sludge, endings that leave weight. Run the Revision Pass on
   every piece.
4. **The engineering standards hold**: tokens not hex; SEOMeta literals on
   every new page (the prerender reads them); the shared helpers for
   clipboard/storage/fetch; the smoke net and full suite green before any
   push; one commit per roadmap item with honest messages; API changes in
   both runtimes; content libraries rebuilt through their index scripts
   and validators.
5. **Work the gates.** Quick items in order without asking; anything
   structural gets a written plan and waits for approval; anything
   stateful, destructive, or schema-touching stops for the owner. Verify
   before "done" — watched runs, never assumed.

## Phase 1 — The Church History curriculum (the flagship)

Build `/theology/history` from four essays into the spine of the platform.

1.1 **The eras spine.** Eight era hubs, each a serious long-form essay
with its own reading list: Apostolic & Persecuted (30–313) · Councils &
Creeds (313–590) · The Long Middle (590–1517) · Reformation & Its Wars
(1517–1648) · Awakenings & Enlightenment (1648–1800) · The American
Experiment (1800–1950) · The Attractional Era (1950–2010) · After
Christendom (2010–). The last three eras carry the platform's distinct
argument: how the American church acquired its consumer, individualist,
entertainment, and attractional lenses — told as history with named
movements, dates, and primary quotations, not as polemic. Self-implication
throughout; the Formation Standard applies (symptom → cause → wisdom).

1.2 **Councils, creeds, heresies.** For each ecumenical council: what
question forced it, the position that lost (stated so its holders would
recognize it), the definition that emerged, and what it protects. Link
each to the existing creeds library (grow it from 10 documents toward the
full confessional shelf, each with plain-language notes).

1.3 **The primary-source reader.** A guided-reading library of
public-domain texts — Didache, Ignatius, Athanasius, Augustine selections,
Benedict's Rule excerpts, Luther, Calvin, Wesley, Edwards — each with a
short introduction, marginal notes in the platform's voice, and honest
provenance (edition and translator named). Content-as-data JSON with an
index builder and validator like the existing libraries.

1.4 **The interactive timeline tool** (`/tools/church-history-timeline`):
eras, councils, persons, and turning points on one navigable line, every
node linking into the curriculum. Build it registered in /tools, smoke-net
covered, with SEOMeta literals.

1.5 **Grow the Theology Quiz's history dimension** and wire the era hubs
into reading paths and the six-pillar taxonomy (file essays via
`pillar-assignments.ts`, never by editing taxonomy).

## Phase 2 — The Formation library (spiritual formation for the layperson)

2.1 **The practices.** A `/formation` library for the classic disciplines
— lectio divina, the examen, fasting, silence and solitude, sabbath,
fixed-hour prayer, catechesis, rule of life, confession, hospitality,
generosity. Each entry: what it is; where it comes from (the actual
history, with sources); how the traditions differ on it (fairly); how a
beginner starts this week; the ditches on both sides. No therapeutic
framing — formation as the church has practiced it, offered to a reader
the attractional era never taught.

2.2 **Deepen the Rule of Life tool** into the library's practicum: choose
practices from the library, sized to a season; persistence and revision
already exist from HS-5. Connect the Whole-Life Assessment's results page
to specific practices, not just essays.

2.3 **Expand family formation.** Grow Family Devotions from the current
weeks toward the full church year (the liturgical calendar as a formation
tool for households), with age-banded questions and the catechism woven
in; expand the Table studies (currently two) into a real library of
household discipleship studies.

2.4 **A catechesis track**: a guided path through a historic catechism
(public domain — Heidelberg or Westminster Shorter, or both, compared
fairly) with the platform's notes, week by week, persisted like the plans.

## Phase 3 — The Fairness engine (teach all sides, everywhere)

3.1 **Extend the doctrine machinery to history's controversies**: icons
and images, church and empire, the crusades, the Reformation's fractures,
revivalism vs. formation, the fundamentalist–modernist split. Same
apparatus as the 30 doctrines: every position at full strength, the order
of the question labeled, where the author lands stated with the strongest
objection he has not answered.

3.2 **Grow the tradition comparisons** from six pairs to the questions
people actually search: add Pentecostal/charismatic, Anglican, Orthodoxy
vs. Protestantism, Rome vs. the Reformation on justification — each
comparison written so both traditions would sign their own description.

3.3 **Build "Argue the Other Side"** (audit 17, T6): the steelman trainer.
The reader picks a contested question, writes the best case for the
position they reject, and the tool coaches them against the canonical
steelman. The platform's pedagogy made into an instrument.

3.4 **Build the Objection Index** (audit 17, T1): the skeptic's front
door — the strongest objections to Christianity, each stated at full
strength before any response, cross-linked to the FAQ and doctrines.

## Phase 4 — Bible study with the whole church

4.1 **The commentary layer.** Integrate public-domain commentary into
PassageContext and the Deep Bible Companion so any passage can be read
with voices across the centuries — a father, a Reformer, a Puritan, a
modern conservative and a modern critical note where they differ, each
verbatim, sourced, and labeled. "Read Scripture with the whole church,
not just this decade" becomes the platform's Bible-study signature.

4.2 **Original-language help**, public domain: key terms per passage
(the mishpat/tsedaqah treatment generalized), transliteration, gloss, and
where translations differ and why.

4.3 **Reading plans through history**: read the Gospels with the fathers;
the Psalms with the monastics; Romans with the Reformers — plan
infrastructure already exists (`/plans/*`), persistence already exists.

## Phase 5 — Discoverability and the platform surface

5.1 **Nothing built may be hidden.** Add a Library door to the header that
exposes every collection (history, creeds, formation, wisdom, context,
how-tos, study guides, primary sources); Wisdom for All of Life joins the
navigation; every tool is registered in /tools (currently 25 of ~52); the
tools hub gets the editorial regrouping already specced as HS-14.

5.2 **Homepage doors by reader condition** (HS-8): the exile, the
deconstructing, the family, the pastor, the skeptic — each door leading
into the curriculum, not just an essay.

5.3 **The app question, answered without a native app**: finish the PWA
decision (LT-7) so the site installs, reads offline, and keeps saved work
— the reading-app experience without an app store.

5.4 **Email as formation** (LT-4, owner-gated on ESP choice): the honest
sequence rewrite, then formation tracks — the catechesis path and the
practices delivered weekly.

## Execution discipline

Work one phase at a time, one item at a time, in the order above unless
the owner reorders. For each item: plan (for anything structural, show it
and wait), build, verify (gates + smoke net + validators + a hand-drive of
any new flow), commit with an honest message naming this prompt's phase,
push. Content items additionally pass the Revision Pass and the
no-fabrication check — every citation verified against a named source
before commit. After each phase: a short written report (what shipped,
what was measured, what remains), then stop at the gate for the next.

The test for the whole program is the Constitution's final impression,
applied to the platform itself: a reader who spends an hour here should
leave convinced that Christianity is deeper than their politics, older
than their culture, wiser than their assumptions — and that this site
will tell them the truth even when the truth is against its own side.
