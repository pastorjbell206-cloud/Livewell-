# Voice pass: main site pages (w-site-pages)

Branch `elite/w-site-pages`, from `b2e655e6`. Not pushed. Copy strings only: no layout, logic, styling, title, slug or address was changed, and no SEOMeta title or description.

## What changed

82 copy edits in 12 files. The audit (`docs/work/voice-audit/library-site-pages.json`) listed 93 findings. 65 were applied (some in different words from the audit's, and a few merged into one edit), the remaining edits came from reading each page as a stranger would, and 28 findings were skipped for the reasons below.

| File | Edits |
|---|---|
| `client/src/pages/ToolsHub.tsx` | 22 |
| `client/src/pages/About.tsx` | 15 |
| `client/src/pages/Family.tsx` | 9 |
| `client/src/pages/Resources.tsx` | 8 |
| `client/src/pages/Believe.tsx` | 6 |
| `client/src/pages/WhenGodBlessAmerica.tsx` | 6 |
| `client/src/pages/TheMonsterInTheMirror.tsx` | 4 |
| `client/src/lib/positioning.ts` | 4 |
| `client/src/pages/Study.tsx` | 3 |
| `client/src/pages/Speaking.tsx` | 3 |
| `client/src/pages/Home.tsx` | 1 |
| `client/src/pages/Books.tsx` | 1 |

Read and left as they are, because nothing in them needed fixing: `EmailSignup.tsx` (/subscribe), `Contact.tsx`, `Topics.tsx`, `Start.tsx`, `Connect.tsx`.

## Counts, before and after

Counted by regular expression over the 17 files of this library, with code comments stripped.

| Pattern | Before | After | What is left |
|---|---|---|---|
| Em-dash | 38 | 9 | 2 in the home headline (James's), 3 in the printed chapter titles of *When God Bless America*, 2 in SEOMeta strings (frozen), 1 in structured data, 1 in an unused constant |
| honest / honestly | 18 | 4 | "find the argument honest" (About), "honest questions" (Books), "an honest cross-examination" (Believe), "honest answers" in the meta description, where it names the Honest Answers library |
| actually | 18 | 3 | "an actual person sitting across from me" (his story, untouched) and two chapter or tool titles |
| real, as an adjective | 11 | 3 | "at real cost" (Study), "then real help" (the marriage card's safety line, untouched), "real questions" in James's home introduction |
| Tuesday | 6 | 3 | "a Tuesday afternoon" (About), "last Tuesday's argument" (About), the Pastor's Letter title |
| Uncontracted "is not", "does not", "do not", "cannot" and the like | 29 | 11 | His story section, the "How the writing works" block (waits for James), two book-page hooks |
| Contractions | 11 | 49 | |
| "carry weight" and its cousins | 5 | 2 | Both in unused constants |
| "verdict" | 1 | 1 | The About heading that waits for James |

## Ten before and after examples

1. Believe, second paragraph. Before: "He does not flinch and he does not flatter. Every objection gets its strongest form before it gets an answer. The atheists are quoted at their most formidable, not their most convenient. This is apologetics written from inside the doubt, by a man who once stood outside the faith and walked away — until the evidence walked after him." After: "Every objection is stated the way the people who hold it would state it, and the atheists are quoted at their strongest. The book was written by a man who was an atheist before he was a Christian and still remembers how the objections sound from that side."
2. Tools, Test the Case. Before: "At every step you can push back with the objection you actually hold and get the honest answer, including what it does not prove. Argued with, not preached at. No altar call." After: "At every step you can push back with the objection you hold and see the answer, including what the argument does not prove. Nobody asks you for a decision at the end."
3. Family, the dark band. Before: "The faith is handed down on purpose, at the table, or it is not handed down at all." After: "The faith gets handed down on purpose, usually at a table, by the people a child lives with."
4. Family, parenting intro. Before: "The work no one applauds, done where no congregation watches. Scripture for the real moments, plus writing and tools for the long obedience of raising children who can carry weight." After: "Most of parenting happens where nobody sees it. Here is Scripture for the hard moments, plus writing and tools for the long work of raising children."
5. When God Bless America, first paragraph. Before: "In a time of political panic, rising tribalism, and growing confusion inside the church, many believers have quietly begun to place their practical trust in power, policy, and national strength rather than in Christ. The language of faith remains. The rituals remain. The worship remains. But the heart has moved." After: "Many believers have quietly begun to place their practical trust in power, policy, and national strength rather than in Christ. The language of faith is still there, and so are the rituals and the worship, but the heart has moved."
6. About, "The heart behind it". Before: "For the pastor who is quietly running on empty. For the husband and wife still keeping a promise they are no longer sure they understand. For the skeptic who keeps reading the words of a faith they have not decided to trust." After: "It's for the pastor who is quietly running on empty, for the husband and wife still keeping a promise they're no longer sure they understand, and for the skeptic who keeps reading the words of a faith they haven't decided to trust."
7. About, closing. Before: "You may still be deciding whether to trust the voice. That is the right instinct, and you should keep it. The writing will either carry weight for you or it will not, and I would rather you find that out for yourself than be talked into it. Begin where you actually are." After: "You may still be deciding whether to trust me. That's the right instinct, and you should keep it. The writing will either hold up for you or it won't, and I'd rather you find that out for yourself than be talked into it."
8. Resources, tools lede. Before: "Built to be used on a Tuesday, not admired on a Sunday." After: "Things to use during the week."
9. Tools, rule of life. Before: "A rule of life is not a performance contract. It is a trellis. Choose sustainable practices ... a pattern you can actually keep on an ordinary week." After: "A rule of life is a trellis, something to grow along. Choose practices ... a pattern you can keep on an ordinary week."
10. Pastors' newsletter pitch (`positioning.ts`). Before: "Written for pastors carrying the weight. One essay, one sermon-prep idea, one resource. From inside the room where the work actually happens." After: "For pastors. Each letter has an essay, a sermon-prep idea, and a resource, written by a pastor in the middle of the same work."

Two places where the audit's wording was not used. The marriage intro on /family became "Your family stands on your marriage. Here is writing to read and a self-check to take." because the audit's version said "stands on" twice. The heading over the chapter list of *When God Bless America* became "The chapters", because the audit's "What's in the book" would have sat directly under the label "What's Inside".

## Skipped, and why

- **Text no longer there (21 findings, 17 skipped).** A later build already removed or rewrote these: the Subscribe form title, hero paragraph and search description (3); the Tools headline, its search description and the old Misused Verses title (3); the /family cards for the catechism, "Why we believe" and its intro (3); the About title, year counts, book counts, PCN paragraph and old search description (8); the author bio in `site.ts` and on Believe (2); the Home newsletter line and the book pages' newsletter line (2). Four of the 21 were still fixed in the words that stand there now: two About paragraphs, the Home newsletter line, and the Tools standfirst that inherited the old headline's words.
- **Outside the files this pass may edit (3 findings).** Two book blurbs in `client/src/lib/bookShelf.ts` (shown on /books and the home page; each still has an em-dash, and one a "Not a case for... A case for..." pair) and one line in `client/src/components/SegmentedSignup.tsx` ("I want depth, not slogans.").
- **Frozen by the brief (1 finding).** The SEOMeta description of *When God Bless America* keeps its em-dash, as does the SEOMeta title of *The Monster in the Mirror*.
- **Wait for James (4 findings).** See the list below.
- **Layout, not copy (1 finding).** The audit asks for the pull quote on /family ("The household is the first church a child ever attends.") to be removed. Removing a block is a layout change, so it stays.
- **Held by a test (1 finding).** The /family heading "Disciple your whole family, in one place." is asserted by `client/src/pages/family/table.test.tsx`, and it is a page title, so it stays.
- **No longer fits (1 finding).** The Home door for Books says "The books James wrote himself." The audit wanted "I", to match a first-person hero the home page no longer has.

Also left alone on purpose: James's story on /about ("My story in my own words"), his home introduction and "why" paragraph in `positioning.ts`, the printed chapter titles of the books, "Three books. Every word mine." on /books, the opening and closing lines of the three book pitches (one turn each, at the hinge), and every line that points to help (the marriage card's "safety first, then real help", the Find Help lines, the crisis notes on /contact and /connect).

## Waiting for James

1. The home headline's two long dashes. Left exactly as he chose it.
2. About, "How the writing works". The third heading, "It ends on a verdict, not a recap", and the second, "The writer is inside it", read like the style guide. If he wrote them, they only need contracting; if not, they need his own sentences. The whole three-item block was left untouched so it stays in one register.
3. Believe, the large line: "He came to faith from atheism. He did not arrive by feeling his way there." His biography is doing the selling here. The audit's suggestion is "James Bell came to faith from atheism, and he got there by argument more than by feeling."
4. Speaking, church consulting ends "A network of pastors who have been through the same." That points at the Pastors Connection Network, which he asked to keep off the site. Keep, reword, or drop.
5. Speaking still offers "Writing and ghostwriting" on a site whose Books page says "Every word mine."
6. The /family pull quote: remove it, or give it a sentence of his own.
7. The two book blurbs in `bookShelf.ts` and the sign-up line in `SegmentedSignup.tsx` need the same fixes from whoever owns those files.
8. Four unused constants in `positioning.ts` (`PRIMARY_HEADLINE`, `PRIMARY_KICKER`, `PRIMARY_SUBHEAD`, `PRIMARY_SUBHEAD_SHORT`) still carry the old voice. Nothing renders them. They can be deleted in a code pass.

## Checks run

All in this worktree, after the last edit:

- `pnpm check`: passed.
- `pnpm test`: 125 files passed, 7 skipped; 1,424 tests passed, 73 skipped (the skips need a database).
- `validate-no-emdash`, `validate-grow-voice`, `validate-content-integrity`: clean. Note that the dash gate does not scan page components, so the em-dash count above comes from grep.
- `validate-design`, `validate-links`, `validate-grow-links`, `validate-family`, `validate-catalogue`: clean.
- `build-search-index --check`: up to date (the tool descriptions do not feed it).

Not done: no build, and the pages were not looked at in a browser. No JSON file was touched.
