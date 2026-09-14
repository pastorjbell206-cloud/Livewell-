# The Total Voice Audit

> A standing order for auditing every word on livewellbyjamesbell.co against
> James Bell's voice. Not a sample. Not a representative slice. Every unit,
> with a recorded verdict, or the audit is unfinished.
>
> Standard: `docs/VOICE-JAMES-BELL.md`. Spine: `scripts/voice-audit-manifest.mjs`.

---

## Why this prompt exists

Every previous audit of this corpus drifted, and none of them drifted because
someone was lazy. They drifted because five hundred thousand words do not fit
in one sitting. A reviewer reads thirty interesting essays, learns the pattern,
writes a confident summary of "the corpus," and the three hundred pieces nobody
opened disappear into that summary without a single false sentence being
written. The older prompt in this repository even authorizes it: twelve essays
"audited in full," everything else a "sweep," repairs capped at "the worst ten."
That is how three hundred essays go unread while the report says the corpus was
audited.

So this prompt is built around one assumption: you will not remember what you
skipped, and neither will anyone reading your report. The ledger remembers. The
verification gate refuses to call the work finished while a single unit is
still pending. Everything else here is editorial judgment, and judgment is the
part you are actually for.

## The corpus, counted

Run `node scripts/voice-audit-manifest.mjs --init` before anything else. As of
this writing it enumerates **648 units**:

| Kind | Count | What it is |
|---|---|---|
| `essay` | 222 | Published posts of 200+ words — **534,508 words** of prose |
| `stub` | 128 | Published posts under 200 words (see "The stub problem") |
| `page` | 271 | Page components carrying reader-facing prose |
| `book` | 21 | Book records and their descriptions |
| `library` | 6 | Content-as-data JSON the long-form tools read from |

Essay prose lives in `client/src/data/content-data.json` under `body`. It is
all local. You do not need the database, and you have no excuse for reading a
summary of an essay instead of the essay.

## The standard

Read `docs/VOICE-JAMES-BELL.md` in full before the first verdict. It is James's
own statement of the voice and it governs every judgment you make.

Two things about it matter more than the rest, because they are where the
corpus will fail:

**The mature register replaces the older one.** Much of this corpus was written
against `CLAUDE.md`, which prescribes "Not X. Y." ground-clearing, Short-Long-
Short rhythm, and hard-period verdicts as the signature gait. The voice standard
now ranks developed paragraphs above fragment stacks and puts repeated
antithesis, anaphora, and "not this but that" on the avoid list once their work
is done. Expect to find essays that are *correct against the old rules and wrong
against the current voice*. Those are not passes. Mark them `revise` and say so
plainly: the piece is stacking fragments where it should be building an argument.

**Fair before sharp.** The voice diagnoses rather than denounces, describes an
opponent in the form its own defenders would recognize, and turns the mirror
inward before it turns outward. An essay that lands its verdict on a group the
writer has exempted himself from has failed the standard no matter how well the
sentences move.

## The completeness discipline

This is the part that is not negotiable.

1. **Initialize.** `node scripts/voice-audit-manifest.mjs --init`. Safe to
   re-run; it adds new units and preserves verdicts already recorded.
2. **Draw a batch.** `node scripts/voice-audit-manifest.mjs --next 10`. It
   returns the hardest work first: longest essays before short ones, prose
   before stubs. Do not choose your own batch. Choosing is how the interesting
   pieces get read three times and the dull ones never once.
3. **Audit every unit in the batch, one at a time, reading the actual text.**
   Not the title, not the excerpt, not your memory of a similar piece.
4. **Record a verdict for each** in `docs/audit-voice/ledger.json` before
   drawing the next batch. Set `status`, `verdict`, `notes`, `auditedAt`.
5. **Repeat until `--next` reports nothing pending.**
6. **Gate.** `node scripts/voice-audit-manifest.mjs --verify` exits non-zero
   while anything is pending, and prints what remains by kind.

You may not report the audit complete until `--verify` exits zero. If you run
out of context, out of budget, or out of session, that is expected and fine —
the ledger is the memory, and the next session resumes at step 2. What you may
not do is summarize the remainder. An unread essay has no verdict, and a
confident sentence about "the rest of the corpus" is the exact failure this
document exists to prevent.

### Statuses

| Status | Meaning |
|---|---|
| `pass` | In voice. Ships as it stands. |
| `revise` | Real work underneath, wrong register or a fixable failure. Name the failure and the sentences that carry it. |
| `rewrite` | The thinking is sound but the prose has to be rebuilt. |
| `cut` | Leaving it up costs more trust than taking it down. Say why. |
| `written` | A stub replaced with a real piece. |
| `removed` | Unpublished or deleted, with the reason recorded. |

## What you do to a single essay

For each essay, read it whole, then answer these in the ledger `notes`. Keep it
short — three or four sentences of real diagnosis beat a page of scoring.

1. **Thesis.** State the argument in one sentence. If you cannot, that is the
   first finding.
2. **Architecture.** Does it accumulate — familiar account, what is true in it,
   the distinction that changes things, the strongest opposing case, then the
   theological turn? Or does it assert and move on?
3. **Register.** Full paragraphs and full thoughts, or a stack of fragments
   wearing the voice's clothes? Count the one-sentence paragraphs. Count the
   "Not X. Y." constructions. Count the em-dashes. Where the tic outnumbers the
   hinge, mark `revise`.
4. **Fairness.** Is the opposing position given in a form its defenders would
   sign? Is there a caricature standing in for an argument?
5. **Self-implication.** Where does the writer enter the indictment? If the
   piece points only outward, name the paragraph where he should have come in.
6. **Sources and Scripture.** Every quote, date, scholar, study, council, and
   verse: real, accurate, and doing work — or decoration. **Flag anything you
   cannot verify. Never repair a citation by inventing one.** This is the one
   failure that poisons everything around it.
7. **The ending.** Does it carry weight, pass through repentance or mercy where
   the subject warrants it, and refuse generic hope attached to an unresolved
   diagnosis? Or does it recap?
8. **The machine test.** Read three paragraphs aloud. Predictable transitions,
   perfect symmetry, stock turns ("Here's the truth," "In today's world," "now
   more than ever"), a closing question added for engagement — any of these and
   the piece is not in voice, however clean it looks.

## The stub problem

One hundred twenty-eight published posts are under 200 words, and they are not
short essays. They are placeholders describing an essay that was never written.
A representative one, live on the site right now, reads in full:

> From the PCN Articles Library: Success in ministry creates a peculiar kind of
> isolation. This article addresses the loneliness of visible success.

That is a promissory note with a byline. A reader who arrives from a search
result is told an article exists and then handed a description of it. No voice
audit can fix this, because there is no prose to audit, and marking it `pass`
would be false.

Every stub gets one of three verdicts, and the decision is James's, not yours —
put your recommendation in `notes` and hold the batch if you need a ruling:

- **`written`** — the subject is worth an essay, so write one to standard.
- **`removed`** — unpublish. The topic does not warrant a piece, and a
  placeholder is worse than an absence.
- **`cut`** — merge the subject into an existing essay that already covers it.

Whatever the ruling, none of the 128 may remain live as they are. A site whose
integrity claim is "never fabricate" cannot publish 128 articles that do not
exist.

## Pages, books, and libraries

The same standard applies to prose a reader actually reads: hero copy, section
introductions, tool descriptions, book blurbs, the crisis-facing pages.

Two cautions specific to these surfaces. **Crisis pages** — doubt, grief,
marriage in trouble, pastoral burnout — carry weight the essays do not. Validate
the feeling, never the despair; keep a path to real help visible; do not
diagnose a reader with a condition they never named. Voice work here must not
sand off the care. And **the pillar field has drifted**: `Pastoral Ministry`
(33) sits beside `pastoral-ministry` (10), `theology` (51) beside
`Theological Depth` (17) and `Faith & Theology` (8). Record it where you see it.
Do not fix the taxonomy inside a voice pass; that is a separate change with its
own blast radius.

## What you may never do

- **Never fabricate.** Not a quotation, a date, a study, a scholar, an
  anecdote, or a verse. If a citation cannot be verified, it comes out and the
  sentence is rewritten around the hole. Inventing one to make a paragraph land
  is the single unforgivable act here, and it is worse than the weak paragraph
  it fixes.
- **Never invent biography.** James came to faith from atheism, was raised
  without a father, has five sons, and pastors First Baptist Church of Fenton.
  Those are the facts you have. Do not extend them into a story that sounds
  right.
- **Never mark a unit audited that you did not read.**
- **Never report coverage you did not verify** with `--verify`.
- **Never rewrite a piece into blandness to make it pass.** The goal is his
  voice, not a safe voice. A rewrite that removes the offense along with the
  fragments has failed.

## Reporting

Write to `docs/audit-voice/`. Keep the ledger authoritative and the prose
short.

- **`ledger.json`** — the record. Every unit, every verdict.
- **`findings.md`** — what the corpus actually does when this writer is tired.
  Name the three or four recurring failures with real examples and slugs, so
  the next hundred pieces avoid them at the desk instead of the audit. This is
  the most useful thing you will produce; it is worth more than the individual
  verdicts.
- **`decisions.md`** — every place you needed James's ruling and what he
  decided: stub dispositions, contested essays, anything where the register
  question was genuinely open.

Report honestly at the end of every session, whether or not the work is done:
units audited this session, units remaining, and what `--verify` said. If the
corpus is not finished, say the number. Do not round it into a feeling.

## Definition of done

The audit is complete when `node scripts/voice-audit-manifest.mjs --verify`
exits zero, every stub has been written, removed, or merged, `findings.md`
names the recurring failures with examples, and every citation flagged as
unverifiable has been removed or confirmed.

One last test, and it is the one that matters. Take ten essays at random from
the `pass` pile and read them end to end, in order, as the skeptic this
platform writes toward — intelligent, injured, allergic to being handled. If
that reader finishes any of them feeling managed rather than met, or hears four
different writers wearing the same name, the audit is not finished regardless
of what the ledger says.
