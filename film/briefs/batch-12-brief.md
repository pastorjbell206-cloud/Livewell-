# Brief for one batch 12 film script (3 to 4 minutes)

James Bell (LiveWell by James Bell, livewellbyjamesbell.co) asked on 2026-11-26 for films across the site's hard questions, "3 to 4 minutes long ... intellectual and academic and detailed, but also very creative and interactional". You are writing ONE film script. Repo: /Users/pasto/Livewell-film (a git worktree on branch film/narrated-pilots). Do not commit, push, switch branches, or edit any file except the two you are told to write.

## Read first
- /Users/pasto/Livewell-film/film/PROMPT.md (James's rules for the films; the "Rules that matter most" section binds you).
- /Users/pasto/Livewell-film/film/batches/batch_11.py (the exact format: `write(slug, title, page, chapters, NOTE)`; each chapter has id, kicker, level (music 0.2 to 0.8), lines, optional scripture S(ref, text, spoken), and the last chapter has titleCard [closing line, END]).
- /Users/pasto/Livewell-film/film/tools/write-script.py (it checks every Scripture quote word for word against the Berean Standard Bible in client/public/bible/text/, bans em dashes, en dashes and these words: delve, journey, transformational, unpack, navigate, leverage, tapestry, robust, nuanced; no exclamation marks outside a quoted verse that has one).
- /Users/pasto/Livewell-film/film/who-god-is/facts.md (the facts.md format).

## Sources: these and nothing else
Your sources are listed in your task. They are: the old Bible Explorer film (client/public/explorer/films/<slug>.json, use its "older" captions and its differ/care notes) with its rows in docs/work/elite/explorer-ledger.md; one or more live hard-question pages (client/public/questions/<area>/<page>.json) whose sources were checked in the record file named in the page's "record" field (docs/work/elite/apol-pilot/...); and the Honest Answer entries named, in client/src/data/answers.ts.
- Every claim, name, date, number and quotation of a scholar must be in one of those sources. If a sentence you want isn't supported there, leave it out. Never invent a quote, statistic, date, scholar, story, or anything about James.
- Scripture: BSB only, copied from client/public/bible/text/<book>/<chapter>.json, never from memory.
- Where Christians differ, name the views fairly and take no side. Where an objection is strong, give it at its strongest first (the pages' own "objection at its strongest" and "what is true in it" sections), then the evidence, then the strongest reply and an answer, then what remains unresolved. Honest limits are part of the film.
- Care lines: if the old film has care lines (pointing to Find Help), do not rewrite them and do not put them in the narration; they stay on the page. Suffering and death are named, never described in detail.

## The script
- Length: 560 to 680 words of narration (write-script.py prints the estimate; aim for 200 to 240 seconds). 8 to 11 chapters.
- Audience: a thoughtful teenager or skeptical adult. Academic and detailed (real names, dates, arguments, as the sources give them) but in plain spoken words, contractions, short sentences. One clear idea per chapter, each growing out of the last. A closing line worth remembering, on the titleCard.
- Creative and interactive: include, in 2 or 3 chapters, a moment that turns to the viewer: "Pause here and ask yourself...", or a fair question to weigh before the answer comes. Keep it light, never manipulative, no altar call.
- Kickers: short (2 to 6 words). Lines: each line is one caption, at most about 40 words.
- Slug and page: keep the old film's slug, and page "/study/explorer/watch/<slug>".
- NOTE: one sentence naming the sources used.

## Write exactly two files
1. /Users/pasto/Livewell-film/film/batches/b12_<slug-with-underscores>.py: same header as batch_11.py (import write-script, S, END = "LiveWell by James Bell"), a docstring naming the sources, and one write(...) call.
2. /Users/pasto/Livewell-film/film/<slug>/facts.md: every factual claim in the script (names, dates, numbers, quotations, historical statements) with the exact source file and section it comes from, and every Scripture quotation with whether it is spoken or shown.
Then run `cd /Users/pasto/Livewell-film && python3 film/batches/b12_<slug>.py` and fix anything it rejects until it passes. Note: it also writes film/<slug>/script.json and narration.txt; that's expected.

## Report back (short)
The word count and seconds it printed, the chapter kickers in order, any sentence you wanted but cut for lack of a source, the hard names a voice might mispronounce, and anything in the sources that looked wrong or contradicted another source.
