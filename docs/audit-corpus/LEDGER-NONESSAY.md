# The Non-Essay Ledger — Pass 1 (extended)

> Pass 1 of the Level-Up Commission (`docs/CORPUS-DEPTH-AUDIT.md`), extending the
> essay ledger (`LEDGER.md`) to the surfaces the first corpus audit never scored:
> the study guides, context guides, creeds, and the theology library. Scored by
> depth-for-form and, above all, by **evenness** — is any piece thin relative to
> its own surface's bar?
>
> Method: total word count per source file (all human-readable string fields),
> ranked worst-first per surface, flagged thin at under 45% of the surface median.

## The one-line finding

**The non-essay corpus is uniformly deep and even. There is no seam.** Every
surface is internally consistent; the only short files are short *by form* (a
creed is a short text) or are structural, not content (a section intro, a paths
config). No remediation is warranted — flattening a complete piece to hit a
number would violate the commission's own scope.

## The surfaces

| Surface | Files | Median words | Range | Genuinely thin |
| :--- | ---: | ---: | :--- | ---: |
| Study guides | 62 | ~24,800 | 17,873 – 27,979 | 0 |
| Context guides | 31 | ~1,085 | 1,020 – 1,207 | 0 |
| Creeds & confessions | 10 | ~1,397 | 746 – 3,377 | 0 |
| Theology library | 50 | ~4,177 | — | 0 (5 flags, all structural) |

## Notes per surface

**Study guides** — remarkably even: every one of the 62 is a full 18k–28k-word
leader's toolkit. The "thinnest" (Where Your Treasure Is, 17.9k) is still longer
than most published booklets. Nothing to do.

**Context guides** — the tightest surface on the site (1,020–1,207 words). Each
is a focused background brief and they are near-identical in weight by design.
Nothing to do.

**Creeds** — the two short files (Apostles' Creed 746w, Heidelberg Q1 798w) are
short because the creed text itself is short; the notes around them are complete.
Length here is set by the source document, not by effort. Nothing to do.

**Theology library** — the 50 files are 31 six-step doctrines (median ~4,177w,
all deep) plus 19 reference/index/support files. The five files flagged thin are
all in the second group — `biblical-theology-nt-ot` (a section wrapper:
intro/methods/closingNote), `paths` (a config), `how-to-use-this-section` (a
navigational helper), `biblical-theology-storyline` (structured data), and one
index — none are doctrine content. The real doctrines carry no thin outlier.

## Where the thinness actually was

The corpus audit was right about *where* the problem lived: the **essays**, not
these libraries. That front is closing from both ends — 27 of the highest-value
stubs rewritten as full 2,100–2,650-word essays (every citation verified), and
~129 more released by repairing the publish bridge that had been silently
failing (`scripts/publish-articles-build.mjs`, Pass 2a). The reference libraries
audited here never had the disease.

## Pass 3 (evenness) — provisional

With the essay stubs remediated, a reader moving between an essay, a study guide,
a doctrine, and a context guide meets the same weight at each door. The evenness
test is met for the non-essay corpus now; it will be fully met for essays once
the bridge fill is confirmed live in production.
