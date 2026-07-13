# Corpus Depth Audit & Remediation — the Level-Up Commission

> The owner's commission for corpus evenness: find every thin or cheesy piece,
> measure it against the platform's best work, and level it up — lengthened by
> real depth, never by padding.
>
> **Stand on what already ran.** The Corpus Audit (`docs/CORPUS-AUDIT-PROMPT.md`,
> outputs in `docs/audit-corpus/`) has scored the 313 published essays: the
> rubric is `audit-corpus/RUBRIC.md`, the scores are `audit-corpus/LEDGER.md`,
> and the headline finding is the ledger's one-line verdict — the long-form
> writing is SOLID-to-FLAGSHIP, while **~154 essay URLs are catalog stubs under
> 600 characters** (now suppressed from listings and the sitemap by
> `client/src/lib/essayQuality.ts`). Do not re-derive that work. This commission
> extends the audit to the surfaces it never covered, and drives the
> remediation the ledger only diagnosed.
>
> Run it against a capable model, in waves. Every wave obeys `CLAUDE.md`,
> `docs/EDITORIAL-CONSTITUTION.md`, and `docs/ELEVATION-COMMISSION.md`.

---

```text
COMMISSION: AUDIT THE WHOLE CORPUS, THEN LEVEL IT UP
Written by James Bell. The platform is only as deep as its shallowest page.

ROLE
You are two people working in sequence, and neither gets to skip the other. First
an unsparing editorial auditor who reads every piece I have published and tells me
the truth about it — which pages carry weight and which ones are thin, cheesy, or
padded. Then the writer who takes the thin ones and makes them as deep as the best
ones, without inventing a single thing. Do not flatter the corpus. A kind audit
that leaves a shallow page shallow has failed me.

WHY THIS MATTERS (read before you touch anything)
The platform's product is depth. Not reach, not volume, not a big library. Depth.
And depth is destroyed by unevenness. A reader who finishes one essay that reached
the full historical arc, steelmanned the other side, and landed a verdict — and
then clicks a second one that stops at a symptom and closes with a platitude —
does not think "one was weaker." He thinks the whole thing is unreliable, and he
leaves. One thin page taxes every deep page around it. The skeptic I write toward
is exactly the reader who notices. So the standard is not "make it longer." The
standard is: no page on this site should embarrass the best page on this site.

WHAT ALREADY RAN (do not repeat it — extend it)
The essay corpus has been audited. Use its instruments as-is:
- The scoring instrument is docs/audit-corpus/RUBRIC.md (twelve pass/fail
  checks; FLAGSHIP / SOLID / REVISE / CUT tiers). Do not invent a new rubric.
- The scores are docs/audit-corpus/LEDGER.md; per-piece reports for the twelve
  distribution leads are in docs/audit-corpus/tier1/.
- Its finding: the genuine long-form essays hold the bar; ~154 essay URLs are
  stubs — a 20–60 word abstract published at a real URL with no essay behind
  it. A stub guard (client/src/lib/essayQuality.ts, MIN_ESSAY_CHARS = 600)
  hides those from listings, rails, and the sitemap until they carry a real
  body. Remediation un-hides a piece automatically the moment it becomes real.

WHAT "THIN" AND "CHEESY" MEAN, SO YOU CANNOT WAVE IT THROUGH
Set the bar at my strongest existing work — the deepened nation essays, the
worked theology doctrines, the FLAGSHIP tier of the ledger — and measure
everything against it.

A page is THIN when it stops at the symptom and never reaches the cause or the
wisdom underneath; when it starts at the proximate cause instead of the full
historical arc; when it names no scholar, no date, no real study where the claim
needs one; when it asserts a contested position without steelmanning the other
side in the form its own defenders would sign; when it proof-texts a verse instead
of reading it in context; when it ends on a summary or an application step instead
of a verdict; or when it is simply too short to have done any of this — a few
hundred words where the subject demanded a few thousand.

A page is CHEESY when it could have been written by any competent Christian blogger
— the flat, forbidden-word, therapy-speak sentence that passes every filter and
dies on the page; the clean four-step application turn; the comfortable closing;
the platitude that relieves the reader instead of forming him; the tribe-flattering
line that makes one side cheer. If you cannot hear the difference between a
sentence only a man who came to faith from atheism, was raised without a father,
and is raising five sons could have written, and a sentence anyone could have
written, you are not ready to audit this.

THE CORPUS YOU MUST COVER (leave nothing out)
The essays are scored; the rest of the corpus is not. Extend the same rubric,
adapted per form, to every remaining surface:
- The Table — every home-discipleship study, and the disciple-making
  curriculum and discipleship pathway end to end.
- The study guides (all of them), the context guides, the creeds and their
  notes, the church-history and biblical-theology libraries, the theology
  doctrines and hard questions and passage notes.
- The books read free on the site (client/public/books/*) — chapter by
  chapter, not by manifest.
- The nation / disruption / justice libraries beyond the pieces tier one read.
- Between-pillar balance: a pillar that is all thin pages is its own failure,
  even if no single page fails alone.
Content lives as data — JSON libraries with generated manifests and CI
validators. Know that pattern before you edit: change the source, rerun the
matching index builder (scripts/build-*-index.mjs) and the validator, rerun
pnpm pdfs if the piece feeds a PDF — or you have broken the shelf while
polishing a book.

THE TASK (this is large on purpose — do not shortcut it)
Work in three passes and show the work of each.

PASS 1 — EXTEND THE LEDGER. Score every not-yet-audited surface above with the
existing rubric (adapted per form: a study guide is judged as a study guide, a
doctrine as a doctrine). Append the results to the ledger, worst first, each row
naming the piece, its tier, and the one sentence that says what is wrong with it.
Do not fix anything yet. I want the true shape of the problem before the cure.

PASS 2 — THE REMEDIATION. Two fronts, worst first:
(a) The ~154 essay stubs. Each one is a title and a promise with no essay behind
it. Write the essay the title promised — full length, full depth, house voice —
or, where the title was never a real idea, recommend cutting the URL instead of
padding a void. Crossing MIN_ESSAY_CHARS is a side effect, never the goal; the
goal is a piece indistinguishable in depth from the SOLID tier.
(b) Every piece the extended ledger tiers REVISE or CUT. Lengthen only by adding
real depth: the history it skipped, the scholar it never named, the steelman it
never built, the verse read in its context, the third movement from cause to
wisdom it never reached. Cut the cheese: every forbidden word, every platitude,
every clean application turn, replaced with the harder true thing.

PASS 3 — THE EVENNESS CHECK. Read the leveled corpus as one body. Is any pillar
still lighter than the others? Any surface — the Table, a study guide set, a
library — still reading thinner than the rest? Name what remains and level it too.
The job is not done when the worst pages are better. It is done when a reader
cannot find the seam between what was always deep and what you deepened.

HOW TO REASON
Show the extended ledger before you touch a page; diagnosis before cure. Set the
bar at my best work and hold every page to it, not to its own low neighbors. When
you lengthen, say what depth you added and where it came from — never "expanded
for length." Prefer the true, uncomfortable read of a page over the flattering
one; if a piece is thin because the idea under it was thin, say so and either
give it a real idea or recommend cutting it, rather than padding a void.

SCOPE (the fences — obey them exactly)
Do not touch the voice, the palette, the type, or the six-pillar taxonomy; they
are settled. NEVER lengthen a page by inventing a citation, a statistic, a
quotation, a date, or a scholar — that is the one unforgivable act here, and it
is tempting precisely when you are trying to make a thin page sound deep. Real
and verifiable, or it stays out, and the page gets its depth from argument
instead. Do not pad with filler or break an argument into bullet sludge to fill
space — that is cheese wearing the costume of depth. Do not flatten a genuinely
short piece that is complete at its length just to hit a number; length serves
the subject, not the reverse. Keep the content-as-data discipline (index
builders, validators, PDFs). Preserve what already works — expand and deepen; do
not rewrite a strong passage to prove you were here. Ship in waves, each wave
verified (validators watched green) before the next.

THE STANDARD OF DONE
The ledger covers every piece on every surface, not a sample. Every stub is a
real essay or a removed URL. Every REVISE/CUT piece has been brought to the bar,
and you can name the real depth you added to each. No forbidden language
survives; every exclamation point sits inside quoted Scripture; every citation
is real. The validators are green and you watched them run. And the last test,
read the whole corpus as the skeptic I write toward: can he still find the thin
page — the one that would make him doubt all the others? If he can, it is not
done.

THE CHARGE
Make the shallowest page on this site deep enough that a skeptic could open any
door and find the same weight behind it. Not longer for the sake of longer.
Deeper, until the length is the natural size of a thing that finally said
everything it owed the reader. Level it up until there is no seam.
```
