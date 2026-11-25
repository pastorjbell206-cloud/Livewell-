# Facts unit (2026-11-19)

The full record of each item is in `facts-ledger.md`. This note lists what changed and what was run.

## What changed

- Polycarp's answer and the line about his bones now use the Ante-Nicene Fathers wording (1885). The site's history source cards already print that text, and CI checks it. It is used in `apostolic-and-persecuted` and in the live essay `the-first-christians-died-for-this`, along with that essay's seed and static-library mirrors.
- Wesley's first open-air sermon now goes to about three thousand people at the edge of Bristol, as his Journal says, not to the Kingswood colliers.
- Hearst's "puff Graham" is now "is said to have sent".
- Nagel is quoted in his own words in the argument case.
- Kepler's unsourced line is replaced with what the site says of him elsewhere.
- The money answer no longer claims Jesus spoke of money more than of heaven and hell.
- The City of God is thirteen years everywhere (413 to 426). Nicaea to Constantinople is "fifty-six years" in three essays and on the creed page.
- The Thirty Years' War is "about a fifth, by Peter H. Wilson's estimate, and older reckonings ran to a third" in all three essays.
- The Fundamentals is "close to three million copies", by the sponsors' own count, in both essays.
- These were checked and left as they were: Christian Smith, Luther's first thesis, the Rule of Benedict, Lincoln, Dawkins, Turing, Volf, and the study-guide quotations of Bonhoeffer, Lewis, Heschel and Brueggemann.
- The flagship essay's NIV verses were not changed, because the essay lives only in the database. The ESV wording for each verse is in the ledger, item 18.

## Gates (all watched)

- All 36 content-gate commands in ci.yml exited 0, and `verify-sources` reports 30 excerpts found.
- `build-history-index` and `build-creeds-index` were rebuilt with no change.
- `pnpm check` passed.
- ESLint on `answers.ts`, `argumentCases.ts`, `sermon-series.ts` and `api/static-library.generated.ts` was clean.
- `pnpm test`: 146 files passed and 7 were skipped; 1653 tests passed.
- `pnpm build`, `sitemap`, `prerender` (3028 routes) and `audit:canonicals` (0 failures) all passed.
- Four changed pages were looked at with `serve-like-vercel` at 390 px: the money answer, apostolic-and-persecuted, the-great-councils and reformation-and-its-wars. The new sentences were present on all four. Screenshots are in `/home/user/elite-shots/facts/`.

## Not done

- `build-static-library.mjs` was not rerun. It rewrote 6,624 lines of the generated files, which had drifted from their sources, so the same two replacements were made by hand in both mirrors instead.
- Some retired pages repeat these claims and were not changed: `what-the-bible-says-about-money`, `faith-and-science`, and `content/archive/`.

## For James

- The flagship essay's Scripture needs either the ESV verses pasted in or "(NIV)" named after each one. Either change goes through the admin.
- The live Polycarp essay says "He was eighty-six". The ancient figure may count his years as a Christian rather than his age.
