# Brief for each rewrite

This is given to whoever rewrites an essay, human or agent. The task message
names the essay to write, the essays merged into it, and the substance to
reach for.

## Before writing

1. Read `docs/rewrites/STANDARD.md` in full. It is the bar, the integrity
   rules, the mechanics, the title rules and the file format.
2. Read `docs/VOICE-JAMES-BELL.md`. It governs the voice.
3. Read the "Forbidden Language", "Scholarship Standard" and "Orthodoxy
   Guardrails" sections of `CLAUDE.md`.
4. Study two models of the target depth, printed with the command below:
   `the-end-of-home-field-advantage` and `how-american-christianity-became-american`.
5. Read every source essay named in the task in full. Source bodies are in the
   committed library:
   `git show HEAD:content/static-library.generated.json > /tmp/lib.json && node -e 'const l=require("/tmp/lib.json");console.log(l.find(r=>r.slug===process.argv[1])?.body)' SLUG`
   (Use `/tmp/lib-<your-slug>.json` as the path so parallel writers don't collide.)
6. If the task names archive books, read their relevant chapters for ideas
   only. Their first-person stories are not verified and must never be carried
   over.

## Writing

- Write exactly one file, `content/rewrites/pending/<kept-slug>.md`, in the
  format in STANDARD.md. It moves up to `content/rewrites/` only after the
  integrity review. Touch nothing else. Don't run git or the build scripts.
- 3,000 to 4,500 words of body in four to seven `##` sections (never `###`: the page title is the h1, so sections must be h2).
- Keep what is true and strong in the source, and cut what is invented,
  clichéd or thin. Don't pad. Depth comes from the history, the named
  witnesses, the distinctions and Scripture read in context, not from length.
- Paraphrase with attribution whenever you are not certain of a quotation's
  exact words. Leave out anything you're unsure of, and note it in `review:`.
- Carry no first-person line about James beyond the allowed facts and what the
  source essay already said.

## Before finishing

- Count the body's words.
- Search for the em-dash (—) and the forbidden words. There must be none.
- Every Scripture quotation is ESV with its reference.
- No exclamation points outside Scripture quotations.
- The title is 65 characters or fewer. The meta description is 140 to 155.
- `sources:` lists at least five works, each as Author, Title (Year).

## Report back (under 150 words)

Title, word count, works cited, what went into `review:`, and what was cut
for uncertainty.
