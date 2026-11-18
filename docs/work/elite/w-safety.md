# w-safety: the missing help lines

Branch `elite/w-safety`, from `b2e655e6`. Not pushed. Safety only; no general voice editing.

Wording and numbers are the site's own: "in the US, call or text 988 for the Suicide and Crisis Lifeline" (the essay brief and `CrisisNote.tsx`), "Abuse by a church leader should be reported to the authorities" (the essay brief), "If a child may be at risk, report it to the police" and "In immediate danger, call 911" (the Find Help pages), and the National Domestic Violence Hotline, 1-800-799-7233 or text START to 88788 (`client/src/data/crisis-resources.json`). No new number was written.

## 1. The eight study guides the audit named (32 text edits)

Counts by grep, before and after:

| Guide | 988 before | 988 after | reporting line before | after | DV hotline before | after |
|---|---|---|---|---|---|---|
| grief | 0 | 3 | | | | |
| lament | 0 | 2 | | | | |
| suffering | 0 | 6 | | | | |
| aging-and-legacy | 0 | 3 | | | | |
| anxiety | 0 | 3 | | | | |
| deconstruction | | | 0 | 6 | | |
| the-church | | | 0 | 4 | | |
| marriage | | | | | 0 | 4 (and 911 three times) |

Where each line went (file `client/public/studyguides/<slug>.json`, field):

- grief: `leaderPrimer`; `faq[8].a`; `facilitatorScript.close`.
- lament: `leaderPrimer` (new sentences after "denial with a chorus"); `facilitatorScript.close`.
- anxiety: `leaderPrimer`; `facilitatorScript.close`; `faq[7].a`.
- suffering: `summary`; `leaderPrimer`; `faq[1].a`; `facilitatorScript.open`; `sessions[4].caseStudy`; `sessions[4].goingDeeper`.
- aging-and-legacy: `leaderPrimer`; `faq[9].a`; `facilitatorScript.open`.
- deconstruction: `sessions[2].teaching`; `sessions[2].practice`; `leaderPrimer` (also the child line); `faq[2].a`; `facilitatorScript.close`.
- the-church: `sessions[4].teaching`; `faq[3].a`; `sessions[4].objections[1].response`; `sessions[4].discussion[3].behind`.
- marriage: `faq[1].a` (hotline number, and 911); `leaderPrimer`; `summary`; `facilitatorScript.open`.

`client/public/studyguides/index.json` was rebuilt (two blurbs changed with the summaries).

## 2. The sweep across the libraries

Every JSON library under `client/public` (study guides, plans, topics, family, Find Help, history, how-tos, life, wisdom, context, theology, justice, disruption, nation, creeds, pathways, essays, workbooks) and the data files for Honest Answers, sermon series and discussion guides were searched for self-harm, wish-to-die, abuse and violence-at-home wording, and each hit was checked for a path to help in the same page. Plans (29), Find Help (40), topics and the family files already had one everywhere. History, theology, context and the justice pages only speak of these things as history or argument and were left alone.

Where a page spoke to a reader or a room and had no path, I did not edit another writer's text. I used the mechanism the site already has: `client/src/data/sensitive-pages.json`, which makes the page (and the study guide PDF) show the help block with numbers from `crisis-resources.json`.

- Study guides added to the list (12): aging-and-legacy, the-church, heaven-and-hell, identity, the-image-of-god, sermon-on-the-mount, prayer, the-lords-prayer, the-psalms, fatherhood, gratitude, fruit-of-the-spirit. Before: 18 of 68 guides showed the block. After: 30.
- Extra lines by subject (abuse, sexual assault) added for: deconstruction, doubt, the-church, identity, the-image-of-god, sermon-on-the-mount, prayer, the-lords-prayer, the-psalms, fatherhood.
- Life pages: sex-and-the-body added (21 to 22), with the abuse and sexual-assault lines.
- Wisdom topics: self-pity, difficult-family, submitting-to-leaders added.
- How-to guides: the block did not exist on `/how-tos/<slug>`. `HowToArticle.tsx` now renders the compact block for 22 guides named in a new `howtos` map (0 before, 22 after): the grief, depression, dark night, lament, diagnosis, dying, loneliness, breakup, anxiety and chronic pain guides, and seven on marriage, anger and hard family where abuse is named. `needs.test.ts` checks every slug exists.
- Honest Answers: five answers now end with a line to the matching Find Help page ("If you're living this right now: Find Help, ..."), through `answerCompanions.ts`: both anxiety answers, divorce and remarriage, suffering, and "can life mean anything without God". This closes the audit's note that a reader with an anxiety disorder who lands on the worry answer gets no help line. A test pins each link to a real page and its real title.

## 3. The Find Help pages

What I did, plainly. I searched all 40 pages, every reader-facing field, for four things and read every hit in context (170 hits): specifics of self-harm (59 hits), wish-to-die wording (83), a diagnosis laid on the reader (1), and self-blame or hopeless beliefs (27). I read all 40 prayers in full, and the closing lines of every first-screen answer on the 16 high-sensitivity pages.

Result: nothing to fix. No page names a method. Every wish-to-die sentence is followed by 988 in the same sentence or the next. The pages ask ("are you having thoughts of ending your life?") and do not tell the reader what they have. Where a self-destructive belief is named it is answered ("that thought comes from the pain, and it lies to you about how much you're needed"). No Find Help file was changed.

What I did not do: I did not read the FAQ answers, the Scripture reading notes, the "this week" steps and the "more help" bodies of all 40 pages word for word. Those fields were covered by the searches above, not by a full read. A full read of those four fields (about 100,000 words) is still owed.

## Ten before and after

1. grief `leaderPrimer`. Before: "get that person to real help that same day, because a counselor is not a defeat of this study." After: "get that person to real help that same day (in the US, call or text 988 for the Suicide and Crisis Lifeline), because a counselor is not a defeat of this study."
2. grief `facilitatorScript.close`. Added: "And if your grief has ever turned toward not wanting to live, tell me tonight, or call or text 988, the Suicide and Crisis Lifeline, at any hour."
3. lament `leaderPrimer`. Added after the warning not to force a hopeful ending: "One thing is different. If anyone's grief turns toward not wanting to live, that is not one more lament to sit with. Stay with them and get them to real help that same day (in the US, call or text 988 for the Suicide and Crisis Lifeline)."
4. anxiety `faq[7].a`. Added: "And if the dread has turned toward not wanting to live, do not wait for an appointment: in the US, call or text 988 for the Suicide and Crisis Lifeline."
5. suffering `leaderPrimer`. Before: "a crisis line you can name and hand over." After: "a crisis line you can name and hand over (in the US, call or text 988 for the Suicide and Crisis Lifeline)."
6. aging-and-legacy `faq[9].a`. Before: "a pastor, a counselor, a crisis line, a person who will sit with you tonight." After: "a pastor, a counselor, a crisis line (in the US, call or text 988 for the Suicide and Crisis Lifeline), a person who will sit with you tonight."
7. deconstruction `sessions[2].teaching`. Before: "getting that help is not a detour from faith, it is wisdom." After: "getting that help is not a detour from faith, it is wisdom. Abuse by a church leader should also be reported to the authorities, and that is not a detour from faith either."
8. deconstruction `leaderPrimer`. Added: "Abuse by a church leader should be reported to the authorities. If a child may be at risk, report it to the police."
9. the-church `sessions[4].teaching`. Before: "Get to safety. Hear that clearly before you hear anything else." After: "Get to safety. Abuse by a church leader should be reported to the authorities. Hear that clearly before you hear anything else."
10. marriage `faq[1].a`. Before: "a counselor, a domestic violence hotline, a pastor trained to handle it". After: "a counselor, the National Domestic Violence Hotline (1-800-799-7233, or text START to 88788), a pastor trained to handle it". The answer now ends "In immediate danger, call 911."

## Skipped, and why

- The audit's other study-guide and Find Help findings (the pastor stamp, the atheism stamp, "the usual explanations", "verdict", "honest"): general voice work, owned by another writer. Not touched.
- Study Bible notes on Judges 16 (hard question on Samson's death), Numbers 11 (`questions[1]`, Moses asking to die) and Jonah 4 (summary): the audit says they give no help line. Outside my files. The model is the last sentence of the hard question in `client/public/bible/notes/1-kings/19.json`.
- New 988 sentences were written without contractions ("do not wait") to match the paragraphs they sit in. When those guides get their contractions pass, these should go with them.
- gratitude says "the study keeps a path to help visible" and named no line; it now shows the help block, but its text still names no number.
- Study guide PDFs are built, not committed; they pick up the new list at the next `pnpm pdfs`.

## For James

- grief and lament give the leader first-person lines to say as their own ("I have stood at gravesides..."). The new 988 sentences in the scripts are also in the leader's voice ("tell me tonight"). That is deliberate, but it is your call.
- marriage is about abuse at home, not by a church leader, so it got the hotline and 911, not the reporting line. Say if you want a line about the police there too.
- The help block now shows on 30 of 68 study guides. If that feels like too many, the list is one file.

## Checks run (all seen passing)

`validate-studyguides` (68 guides, 0 failures), study guide index rebuilt with no drift left, `validate-needs`, `validate-life`, `validate-no-emdash`, `validate-grow-voice`, `validate-content-integrity`, search index `--check`, `pnpm check`, eslint on the three touched source files, and vitest for `needs.test.ts`, `answerCompanions.test.ts`, `CrisisBlock.test.tsx`, `WisdomTopic.test.tsx`, the route smoke net and the help pages. Not run: the full `pnpm test`, `pnpm build`, `pnpm pdfs`, and no page was looked at in a browser.
