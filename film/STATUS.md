# Film status

One row per film. "Approved" is James's word only.

| Slug | Script written | Facts checked | Recorded | Built | Sent to James | Approved |
|---|---|---|---|---|---|---|
| trust-the-bible | yes | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 (pilot) | good to build from (James, 2026-11-26); not yet approved for the site |
| whose-kingdom | yes | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 (pilot) | good to build from (James, 2026-11-26); not yet approved for the site |
| you-are-that-man | yes | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| one-story | yes | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| the-verse-next-door | yes | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| mark-in-a-minute | yes | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| the-oldest-report | yes (safer wording used for the flagged sentence) | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| how-long | yes | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| bible-two-minutes | yes (rebuilt from the old film) | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| bible-in-a-minute | yes (rebuilt from the old film) | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| sixty-six-books | yes (rebuilt from the old film) | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| book-genesis | yes (rebuilt from the old film) | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| book-exodus | yes (rebuilt from the old film) | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| book-leviticus | yes (rebuilt from the old film) | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| book-numbers | yes (rebuilt from the old film) | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| book-deuteronomy | yes (rebuilt from the old film) | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| book-joshua | yes (rebuilt from the old film) | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |
| book-judges | yes (rebuilt from the old film) | 2026-11-26 | 2026-11-26 | 2026-11-26 | 2026-11-26 | |

Step 3, the 83 existing Bible Explorer films (`client/public/explorer/films/`): batch 1 of five is above (the three story films, Genesis, Exodus). Batch 2 is Leviticus, Numbers, Deuteronomy, Joshua and Judges. 73 remain: 29 books in Bible order, then beliefs, questions, ideas, verses, stories. Each batch's scripts are written by a file in `film/batches/`.

ElevenLabs characters used: trust-the-bible 1,128; whose-kingdom 929; you-are-that-man 860; one-story 974; the-verse-next-door 706; mark-in-a-minute 892; the-oldest-report 977; how-long 714. Total 7,180. Batch 1 of the rebuilds: bible-two-minutes 2,042; bible-in-a-minute 1,078; sixty-six-books 1,390; book-genesis 1,795; book-exodus 1,729 (8,034). Running total 15,214. Batch 2: book-leviticus 2,119; book-numbers 1,957; book-deuteronomy 1,981; book-joshua 1,743; book-judges 1,845 (9,645). Running total 24,859.

## On the site

Live since 2026-11-26 (James: "make the ones that you've already created go live"), merged as pull request 646: the eight new films and batch 1 (13 films). Video files are in the Vercel Blob store `livewell-films`; the list of live films is `LIVE` in `scripts/build-narrated-films.mjs`. Batch 2 is built and not yet on the site.
