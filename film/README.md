# film/

Narrated films for LiveWell, made the way the Gather Church films were made.

Two scripts are here. James approved a first version built from his books' own sentences on 2026-11-26, then asked the same day for freer scripts ("I want you to have liberty to write the scripts"), so both were written fresh. He has not yet read the fresh versions:

- `trust-the-bible/` : "Can you trust the Bible?", for /books/the-reliability-of-scripture
- `whose-kingdom/` : "Whose kingdom?", for /books/a-higher-allegiance

Six more, written the same day and not yet read by James:

- `you-are-that-man/` : "You are that man" (2 Samuel 12), for /books/blind-spots
- `one-story/` : "One story" (the whole Bible), for /study
- `the-verse-next-door/` : "Read the verse next door" (Philippians 4:13), for /study/how-to-study
- `mark-in-a-minute/` : "Mark in a minute", for /tracks/mark
- `the-oldest-report/` : "The oldest report" (1 Corinthians 15), for /skeptics
- `how-long/` : "How long?" (Psalm 13), for /studyguides/lament

In each folder: `script.json` (chapters, kickers, music levels, lines), `facts.md` (every fact in the script and where to check it) and `narration.txt` (the lines in order, one blank line between them, to paste into ElevenLabs as one take).

## How a film is made (the tools are here now)

Copied from the Gather Church films on 2026-11-26 and adapted to LiveWell's look. Run everything from the repo root. One-time setup: `cd film && npm install --cache /private/tmp/npm-cache-film` (installs `playwright-core`, which drives the Chrome already on the Mac).

1. `film/<name>/script.json`: `title`, `note`, `gap` (seconds of quiet between chapters, 1.0 here), `chapters` with `id`, `kicker`, `level` (music, 0 to 1) and `lines`. Optional `scripture` and, on the last chapter, `titleCard`.
2. One ElevenLabs take of `narration.txt` saved as `film/<name>/audio/full.mp3` (Brian, Eleven v4, Stability 0.10, Similarity 0.09).
3. `FILM_DIR=film/<name> python3 film/tools/build-audio.py` cuts the take at its pauses and writes `timeline.json` and `audio/narration.wav`. Check each line runs at roughly 2 to 4 words a second.
4. `film/<name>/film.html` loads `film/lib/engine.js` (page, colours, fonts, kicker, captions, opening title, closing card, export) and draws its own picture in one `Film.make(...)` call. Open it with `?t=42` to freeze on a second.
5. `FILM_DIR=film/<name> node film/tools/sheet.mjs` makes `film/shots/<name>/sheet.png`. Look at it; fix labels that touch and scenes that sit empty. `still.mjs` exports one frame exactly as the render will.
6. `FILM_DIR=film/<name> node film/tools/make-music.mjs` then `FILM_DIR=film/<name> python3 film/tools/mix.py` write `audio/soundtrack.wav`. The music is code (`tools/music.html`), so there is nothing to license. `MUSIC_CALM` (default 0.6) keeps it quieter than Gather's.
7. `FILM_DIR=film/<name> node film/tools/render.mjs <scratch frames folder>` (1920x1080, 60 a second), then `swift film/tools/encode.swift <frames> 60 film/<name>/audio/soundtrack.wav film/out/<name>.mp4 1.6`.
Steps 6 and 7 in one go: `film/tools/build.sh <name> <scratch folder>`.
8. `FILM_DIR=film/<name> node film/tools/poster.mjs <second> film/out/<name>-poster.jpg`.

Audio, frames, stills and finished MP4s are not committed (`.gitignore`). Finished films live in `film/out/`. `film/STATUS.md` tracks every film.

Before recording, check the text typed into ElevenLabs against `narration.txt`: the character count must match and the first word must be whole.

Nothing here is served by the site. A finished film goes on a page only when James says yes.
