# Family devotions: voice pass

Branch `elite/w-family-devotions`, from `b2e655e6`. Not pushed.

## What changed

Three files were edited: `client/public/family-devotions.json` (12 devotions), `client/public/family-devotions-2.json` (60 devotions) and `client/public/family-seasonal.json` (Advent, Holy Week, Thanksgiving). 288 text fields changed. No id, title, theme, passage, passage text, link or catechism answer was touched. `family-catechism.json` was not opened for editing.

The work came in three passes.

1. **The audit's fixes.** The audit lists 80 findings. 59 of them are in these three files and are about text; all 59 are applied, most as the audit worded them and a few reworded (listed below). 18 are in the catechism and 3 ask for new titles; those are skipped and listed for James.
2. **Contractions.** The spoken prose (Big Idea, reflection, questions, activity, prayer, the grown-ups line) now contracts the way a parent talks: 484 contractions where there were none. Left as they stood: every passage text, every quotation inside quotation marks, words of God or Jesus retold without quotation marks ("I have seen, I have heard, I have come down", "it is finished", "I am making everything new"), and the address to God in prayers ("you are good", "you have given me"). About 25 full forms were kept on purpose where the sentence leans on the word ("God does not waste our pain", "Jesus did not stay dead", "He was not").
3. **The sweep.** 124 further small edits: a second or third "is not X. It is Y." pair in one devotion cut or reworded so that no devotion carries more than one; slogan closers cut; fragment stacks joined into the sentence they belong to; announced turns removed ("God told him something better", "And the secret is", "And the reason is simple", "Let today feel heavy"); filler words cut ("actually", "really", "single", "honest" vouching for itself); missing hyphens restored. Three devotions (courage, kindness, the-incarnation) now run as one paragraph because the cuts left a paragraph too short to stand alone. Four second paragraphs that opened "The verse ..." now name the writer already named in that devotion's questions (James, Paul, Micah).

Nothing was added except two lines the audit asked for: the path to help in loving-your-enemies, and the Matthew 28:19 activity that replaces the apple in the-trinity. Both are flagged for James below.

## Counts (by grep over the editable fields of the three files)

| Pattern | Before | After |
|---|---|---|
| Contractions | 0 | 484 |
| "cannot" | 45 | 0 |
| "do / does / did not" | 139 | 12 |
| "is / are / was / were not" | 111 | 15 |
| Two-sentence "not ... It is ..." pairs (loose pattern, overcounts) | 77 | 40 |
| "actually" | 34 | 5 |
| "really" | 33 | 26 |
| "just" | 80 | 67 |
| "single" | 12 | 2 |
| "honest / honestly" | 16 | 9 |
| "the last word" | 4 | 2 |
| "on purpose" | 14 | 12 |
| Sentences of one to three words | 125 | 105 |
| Em-dashes | 0 | 0 |
| Words | 25,740 | 24,756 |

The audit's figures (115 pairs, 35,000 words) include the catechism, which this pass did not touch. Of the 40 pairs the loose pattern still finds, about 30 are real, one per devotion at most, each at the point the devotion turns on. The uncontracted negatives that remain are the kept ones and the prayers' address to God.

## Ten before and after

1. **fear-and-anxiety, reflection.** Before: "Trust is not the absence of fear. Trust is what you do with your hands while your heart is still pounding." After: "You can trust God while your heart is still pounding."
2. **why-we-pray, reflection.** Before: "You do not need fancy language. You do not need to sound holy. The shortest, most honest prayer is better than a long one you do not mean." After: "You don't need fancy language, and you don't need to sound holy. A short prayer you mean is better than a long one you don't."
3. **serving-others, reflection.** Before: "He says greatness is measured by how many people you help, not how many help you. Serving is not losing. It is the most like Jesus a person can be." After: "He says the one who wants to be great must be the one who serves. Nobody is more like Jesus than the person doing the serving."
4. **courage, reflection.** Before: "God told him something better. He said I will be with you. That is the reason for the courage. Not that the danger was gone, but that Joshua was not facing it alone." After: "He said I will be with you. That's the reason for the courage. The danger was still there, and Joshua wasn't facing it alone."
5. **heaven, reflection.** Before: "But that is not the picture the Bible gives. It gives us a world where every sad thing is undone. No more crying. No more goodbyes. No more of the things that break our hearts here." After: "The Bible gives us a world where every sad thing is undone. There's no more crying, no more goodbyes, no more of the things that break our hearts here."
6. **the-good-shepherd, reflection.** Before: "Most shepherds run when the wolf comes." After: "The hired hand runs when the wolf comes." (John 10:12-13.)
7. **the-second-coming, reflection.** Before: "History is not just spinning in circles or fading into nothing. It is heading somewhere, toward a day when Jesus returns and every wrong thing gets put right. The last word does not belong to sadness or death. It belongs to him." After: "History is heading somewhere, toward a day when Jesus returns and every wrong thing gets put right."
8. **the-prodigal-son, reflection.** Before: "Not arms crossed. Arms open, running." After: "His arms are not crossed. They're open, and He is running."
9. **holyWeek day 8 (Easter), reflection.** Before: "And because he lives, the worst thing is never the last thing." After: "And because he lives, death will not keep anyone who belongs to him." (The old line is usually credited to Frederick Buechner and ran without his name.)
10. **advent day 7, reflection.** Before: "The promise is not that the dark is fake. The promise is that a light is coming into it, and the dark has never once been able to put it out." After: "The promise is that a light is coming into the dark, and the dark has never once been able to put it out."

## Where I departed from the audit's wording

- fear-and-anxiety: the fragment stack ("A dark room. A test. ...") became a sentence with "It might be ..." in place of a colon list.
- the-trinity activity: the audit's "how many names he says" read oddly aloud; it now says "notice that he says name and not names".
- the-incarnation: beyond the two audit cuts, "Because he did not want to save us from a distance. He wanted to come close enough to be held." became "Because he wanted to come close." Both phrases are stamps the audit lists as repeating across the library.
- advent day 12: the audit asked for "He isn't fragile"; it reads "He's not fragile."
- the-cross: after "Nobody forced the cross on Jesus." the next sentence opens "He saw" so the name is not said twice.

## Skipped, and why

- **18 catechism findings** (Q2, Q3, Q16, Q24, Q33, Q34, Q35, Q43, Q49 twice, Q51, Q52, Q58, Q62, Q64, Q66 twice, Q68). The catechism is outside this pass and its wording changes only on James's word.
- **3 title changes** (jealousy-and-comparison, worship, the-miracles-of-jesus). Titles are frozen for this pass.
- **Seasonal passage retellings** (`passageText` in the seasonal file). They are paraphrase, but the audit says never to edit them and the validator treats them as their own field.
- **The mould itself** (two paragraphs, everyday picture, then the verse). Three devotions were merged to one paragraph and a handful of openers varied; anything more means rewriting, which is James's to do or to approve.
- **Capital pronouns for God.** The first forty-odd devotions write He/Him; the rest write he/him. Left as found; James picks one.
- **PDFs.** `pnpm pdfs` was not rerun (heavy, binary output). The devotion cards in `client/public/downloads/` still carry the old wording until it is.

## Gates

Seen passing in this worktree: the three files parse; `validate-family`; `build-family-year --check`; `build-family-index --check` (after a rebuild); `validate-no-emdash`; `validate-grow-voice`; `validate-content-integrity`; `build-search-index --check` (after a rebuild, since the search index carries the Big Ideas); `build-topics-index --check`; the family, Advent and search tests (12 files, 139 tests). No `.ts` or `.tsx` file changed (the year map regenerated identical), so `pnpm check` was not run. The full test suite and the build were not run.

## For James

1. **A new line in loving-your-enemies.** "...and if someone is hurting you, tell a grown-up you trust." It is the only sentence of new content in the devotions. The audit asked for it so a bullied child is not left with only "love your enemies".
2. **The Trinity activity.** The apple (skin, fruit, seeds) is gone, because the catechism's own Q76 warns against neat pictures of the Trinity. The family now reads Matthew 28:19 and counts the persons and the one name. Say so if you want the apple back.
3. **Good Friday.** "Let today feel heavy. It was." was cut as a stage direction. It may be a line you want; one word restores it.
4. **Easter.** The closing line is now "death will not keep anyone who belongs to him." If you would rather keep the Buechner line with his name on it, that is your call.
5. **Contractions.** Your Substack brief says "contractions light"; the voice statement prefers them where prose is spoken. These pages are read aloud to children, so they now contract. Say so if you want the family pages kept formal.
6. **Four or five devotions in your own words.** The audit's point stands: Thanksgiving week sounds like a father at a table and the rest does not yet. Editing removed the machine habits; it cannot supply what you say when one of the boys is afraid of the dark. No memory was invented.
7. **Catechism.** The 18 findings above wait for you, with the audit's larger questions (Part 5 re-asking eight questions, the baptism and Supper wording, Q34 and Q43).
8. **Three titles** the audit would change: "The Thief of Glad", "What You Are Made Of", "A Glimpse of the Mender".
9. **He or he** for God, across the library.
10. **Paths to help in the seasonal file.** Thanksgiving days 4 and 6 and Advent day 7 have no grown-ups link because the seasonal file has no such field. That is a data and page change, not a wording change.
