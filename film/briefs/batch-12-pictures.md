# Brief: the moving picture for ONE batch 12 film (about 4.5 minutes)

You are drawing `film/<slug>/film.html` for one LiveWell film. Repo: /Users/pasto/Livewell-film (git worktree, branch film/narrated-pilots). Do not commit, push or switch branches. Write only `film/<slug>/film.html` (and the contact-sheet output the tool makes under film/shots/).

## Read first
- `film/PROMPT.md`, sections "How to make each film" (Look, Motion, Words on screen, Ending) and "Rules that matter most". James wrote it.
- `film/lib/engine.js` (the drawing engine: `Film.make`, `el`, `txt`, `S(id,k)`/`E(id,k)` for when line k of chapter id starts/ends, `op`, `draw`, `move`, `ease`, colours INK, BONE, WARM, MUTED, STONE, MUSTARD, LINE).
- Two finished films in the same family, as your models: `film/grace/film.html` and `film/faith/film.html`. Match their structure, line weights, colours, captions and title card exactly.
- Your film's `film/<slug>/script.json` (chapters, kickers, lines, scripture) and `film/<slug>/timeline.json` (when each line is spoken; already built from the recorded voice). The film is about 4.5 minutes: 11 chapters.

## What the picture must do
- One picture per chapter that teaches the chapter's idea, with something moving in every second, slow and smooth; each scene grows out of the one before rather than cutting. Show the turns in the argument visually (objection, what is true in it, the evidence, the reply, the honest limits): e.g. a scale that tips and settles, a chain of links, a timeline that fills, two columns weighed, a question mark that a picture answers but does not erase.
- The "Pause here and ask yourself" lines: hold the picture still and let a single mustard question mark or an open space sit for the length of that line. That is the interactive moment; don't crowd it.
- Scripture chapters show the verse large with "REFERENCE · BEREAN STANDARD BIBLE" (the `verse()` helper in grace/film.html), timed to when it is spoken.
- Names and dates (Leibniz 1714, Mackie 1955, Galileo 1633 ...) may appear as small labels or on a timeline, in the Inter label style, never stronger than the voice says (no "PROVED", "DEBUNKED").
- End with the title card from script.json (closing line, then "LiveWell by James Bell"), as in grace/film.html.

## Hard rules (James's, and from earlier reviews)
- God and Christ are never drawn. God may be shown only as light (a mustard wash at opacity 0.12 or less) or by absence. Jesus, where needed, is one upright mustard bar. Nothing in threes standing for God. The cross is bare.
- No faces, and nothing that reads as a face: no two circles side by side, no dot inside an oval or circle, no ring of dots, no pair of seals or round shapes like eyes. People are plain ink dots, all alike.
- No photos, no AI images, flat shapes only, LiveWell colours only. Mustard is an accent, under about 8 percent of the frame.
- Suffering, death and violence are named by the voice, never shown: no blood, flames on bodies, graves with bodies, wounds. A fire may be a few mustard flame shapes far from any dot. Animals are not shown suffering.
- Nothing that blames the Jewish people. No modern nation, party or person drawn.
- Labels must not overstate. Nothing drawn across a scroll or Scripture text.
- No exclamation marks, no em dashes in any on-screen text.

## Check your work
Run from the repo root: `FILM_DIR=film/<slug> node film/tools/sheet.mjs` (one still every 2.4 s, saved to film/shots/<slug>/sheet.png; it prints errors). Then Read the sheet image and look for: errors, blank stretches, overlapping text, captions colliding with drawings, anything that reads as a face, anything breaking the rules above. Fix and re-run until clean. For a closer look at a moment use `FILM_DIR=film/<slug> node film/tools/sheet.mjs 12.5,40,77` (comma list of seconds).

## Report back (short)
The concept of each chapter's picture in one line each, the sheet's error count, and anything you were unsure about (especially anything that might read as a face or as drawing God).
