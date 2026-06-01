# The Writing Kit

This folder holds the editorial scaffolding for everything in the elite plan:
the 30 lede essays, the 25 everyday-life essays, the 7 cornerstone books, and
the 10 lead magnets. Three of the highest-leverage essays are written in full
as voice exemplars; the rest are detailed outlines you (or the Anthropic
skills) fill in.

## How to use this folder

Each essay outline carries enough scaffolding that you can sit down on a
Saturday and write the essay in 3–4 hours without facing a blank page. The
outline includes:

- **Title + slug** — final, ready to publish
- **Track + audience** — already mapped to the taxonomy in `lib/taxonomy.ts`
- **Positioning sentence** — what this essay is *for*
- **Argument outline** — 5–10 beats in argument order
- **Opening sketch** — the first 2–3 sentences in voice
- **Key moves** — the "Not X. Y." verdicts and the self-implication
- **Closing weight** — the line the reader carries out
- **Sources** — scholars and works that anchor the argument

## Voice rules (from CLAUDE.md — these are non-negotiable)

**Forbidden words:** delve, leverage, unlock, transformative, navigate,
tapestry, foster (verb), unpack, landscape, nuanced, multifaceted,
authentic, holistic. *Journey* as metaphor. *Blessed* as adjective.

**Forbidden phrases:** "in today's world," "now more than ever," "here's
the thing," "I want to be real with you," "God's got this,"
"gospel-centered" (without earning it), "authentic community," "hold
space," "your truth," "do the work," "your feelings are valid," "lean
into," "showing up."

**Structural moves to use:**
- *Not X. Y.* — ground-clearing with a hard period
- Short-Long-Short rhythm
- Building triplet only when the three are equally weighted
- Self-implication: the writer is always inside the indictment
- Verdicts not summaries
- Endings that leave weight, never resolve it

**Anchors** named throughout (as structural witnesses): Tim Keller (architecture),
Walter Brueggemann (prophetic imagination), Eugene Peterson (pastoral texture),
Dietrich Bonhoeffer (willingness to name the thing at cost). Plus: Lesslie
Newbigin, James K.A. Smith, Charles Taylor, Robert Bellah, Jonathan Haidt,
James Davison Hunter, Tom Holland, Mark Noll, Stanley Hauerwas, William
Cavanaugh, Marilynne Robinson, David Bentley Hart.

## File index

### Full-length voice exemplars (ready to ship; review and edit, then publish)

- [full-01-the-god-who-doesnt-bless-america.md](full-01-the-god-who-doesnt-bless-america.md) — After Christendom flagship
- [full-02-your-marriage-will-get-worse-before-it-gets-better.md](full-02-your-marriage-will-get-worse-before-it-gets-better.md) — Marriage, deep-theology-for-everyday-life
- [full-03-what-five-sons-taught-me-about-god-the-father.md](full-03-what-five-sons-taught-me-about-god-the-father.md) — Parenting + manhood crossover

### Essay outlines

| Track | File | Essays |
|---|---|---:|
| After Christendom (lede) | [essays-after-christendom.md](essays-after-christendom.md) | 10 |
| Politics & the Cross | [essays-politics.md](essays-politics.md) | 6 |
| American Church | [essays-american-church.md](essays-american-church.md) | 4 |
| Skeptic Track | [essays-skeptic.md](essays-skeptic.md) | 7 |
| Pastoring | [essays-pastoring.md](essays-pastoring.md) | 3 |
| Marriage | [essays-marriage.md](essays-marriage.md) | 5 |
| Parenting | [essays-parenting.md](essays-parenting.md) | 5 |
| Money & Calling | [essays-finances.md](essays-finances.md) | 5 |
| Manhood | [essays-manhood.md](essays-manhood.md) | 5 |
| Womanhood | [essays-womanhood.md](essays-womanhood.md) | 5 |

### Books

- [books-canon.md](books-canon.md) — the 7 books that define the brand, in publish order, each with chapter outline + opening of chapter 1

### Lead magnets

- [magnets.md](magnets.md) — the 10 email-capture downloads, in ship order

## Publishing flow

These markdown drafts are scaffolding. The actual publishing pipeline expects
`.docx` (see `scripts/publish-docx.ts`) or runs via the surveyor +
`publish-from-plan.mjs`. Three options for getting these to the site:

1. **Paste into Word, edit, save as .docx, run `pnpm publish:docx`** — the
   path that works today.
2. **Edit in markdown, paste into the `/admin → New Post` textarea** — the
   path that works in the admin UI.
3. **Build `publish-md.ts`** — a small extension to the publish pipeline
   that handles markdown with frontmatter directly. ~50 lines. Recommended
   if you'll write in markdown long-term.

Either way, the slug in the frontmatter is the canonical slug and will be
used everywhere the essay is referenced (reading paths, related articles,
internal links). Don't change slugs after publish without setting up 301
redirects.

## The Tuesday-morning discipline

Per the elite strategy doc: one essay every Tuesday morning, ranked in
priority order (After Christendom first, then Politics, then the rest).
30 weeks to ship the lede arc + secondary tracks. 12 weeks of everyday-life
essays after. The cadence builds the platform.
