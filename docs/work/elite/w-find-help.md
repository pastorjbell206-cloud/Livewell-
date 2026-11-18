# Find Help: voice pass (w-find-help)

Branch `elite/w-find-help`, from `b2e655e6`. Not pushed. 2026-11-18.

## What changed

Only the care-page data changed: the 40 files in `client/public/needs/` and the
generated `client/public/needs/index.json`. No `.ts` or `.tsx` file was touched
(`client/src/lib/needs.ts` holds no prose that needed work). 234 small text
edits in all: 70 from the audit, 153 from the sweep, 11 follow-up fixes to
joins and lengths, plus 17 notes in the `slots` lists (the places kept for James's own
words) that pointed at a sentence this pass cut.

Nothing that points a reader to help was touched. Counted per page before and
after: every mention of 988, 911, hotline, SAMHSA, RAINN, doctor, counselor,
police, authorities and "advice" is the same number it was. The "I'm a pastor,
not a physician, and nothing here is medical advice" lines all stand.

No fact, name, number, date, quotation or Scripture reference was changed. No
title, slug, link or id was renamed. The one search title changed is the doubt
page's (`seoTitle`), which the audit asked for. Three step headings changed
wording on the audit's word or to drop "honest" (they are shown, not used as
ids).

### The audit's 73 findings

- 70 applied to the care pages. Most as written. A few were reworded where the
  audit's replacement made a new repeated line (three pages would have ended a
  sentence ", and I understand why"; four would have said "isn't foolish").
- 3 search descriptions had to be longer than the audit's text, because the
  validator wants 120 to 160 characters. They still carry no biography.
- 1 not applied: the last sentence of the family-devotions answer on
  indoctrination ("I came to faith from atheism, so I take this objection
  seriously..."). The page's own note asks James to confirm, change or cut
  that sentence. It waits for him.
- 2 not applied: both are in `client/src/pages/Help.tsx`, which is page code
  and outside this unit's files ("Honest help, Scripture in context..." in the
  search description, and "the honest self-checks").

### The sweep

- **The pastor confession.** The formula "I'm a pastor, and I'm inside this /
  can't write this from outside it" now stands on two pages, church-hurt and
  pastors, where the failure is a pastor's own. Ten other pages keep a
  first-person pastor sentence, each a different sentence saying something
  specific (grief: "we're trained to have a word ready, and it usually comes
  too soon"; anger; deconstructing; loneliness; money; parenting; infertility;
  refer-to-counselor; the Freud paragraph on curious; the answer to a burned
  out pastor on work-burnout). Everywhere else the surrounding "we" does the
  work.
- **"I came to faith from atheism, so I won't..."** stays on curious, doubt,
  suffering, trust-the-bible, new-believer, grief, money, one answer on
  parenting ("so I won't tell you any door is closed"), and the
  family-devotions sentence that waits for James. Cut on fourteen others
  and in three search descriptions.
- **Five sons.** Stays on fatherless, parenting, suffering, job-loss, doubt,
  infertility, fear-of-the-future and work-burnout. Cut where it only closed
  the helping section with "I'd rather they..." or "I'm convinced...".
- **"The usual explanations each hold something true."** Was on 33 pages. Now
  on five, in five different wordings (fear-of-the-future, grief, suffering,
  is-it-a-sin, infertility). Where the next sentence said "The medical one
  says", it now says "The medical explanation says".
- **Rulebook words.** "Indictment", "at full strength", "a page that denied it
  wouldn't deserve your trust", "deserves a fair hearing": gone. "Verdict" cut
  where it only meant "this says nothing about your worth"; kept where a
  judgment is really in view (anger, cant-forgive, divorce, God's verdict on
  Job's friends).
- **"Honest."** Cut where it vouched for the page or was filler ("small,
  honest steps", "the honest answer", "if we're honest", "honest prayer").
  Kept where it is an instruction that matters ("Be honest about drinking and
  medication") or the actual subject (the doubt page's paragraph on honesty).
- **Two-beat closers and "isn't X. It's Y."** Thirteen merged into one plain
  sentence on the pages that leaned on them most.
- **Contractions.** The grief page had the fewest; nine plain ones added. Its
  weight-bearing lines ("your tears are not unbelief") were left alone.

## Counts (by search, prose fields only)

| Pattern | Before | After |
|---|---|---|
| honest / honestly / honesty | 182 (40 pages) | 114 (36 pages) |
| "I'm a pastor" in any form, with the advice disclaimers and page links | 44 (31 pages) | 24 (16 pages) |
| the pastor confession itself | 36 pages | 12 pages, 2 with the formula |
| indictment | 7 | 0 |
| atheism (includes search phrases a reader might type) | 30 (23 pages) | 12 (9 pages) |
| five sons | 17 (17 pages) | 8 (8 pages) |
| verdict | 44 (21 pages) | 20 (11 pages) |
| "usual / common explanations each hold something true" | 33 pages | 5 pages |
| "The usual explanation for X is" as an opener | 10 pages | 2 pages |
| at full strength | 2 | 0 |
| "wouldn't deserve your trust" | 2 | 0 |
| "Underneath it all is" | 6 | 3 |
| "harder and better" | 3 | 2 |
| "and then wondered why" | 4 | 2 |
| "I'm convinced" | 4 | 0 |
| "isn't X. It's Y." across two sentences | 42 | 30 |
| failure of faith | 17 | 15 |
| em-dash | 1 (inside quoted Scripture) | 1 |
| steelman, this platform, Bell, in other words, ultimately, at its core | 0 | 0 |

The audit counted "honest" 164 times; this search also counts "honesty" and
the search fields, so it starts at 182.

## Ten before and after

1. doubt, why this is so hard.
   Before: "I'm a pastor, and this indictment includes me. We have too often met a teenager's honest question with a verse and a warning"
   After: "We have too often met a teenager's question with a verse and a warning"
2. work-burnout, why this is so hard.
   Before: "Those of us who work for churches can make overwork sound like devotion, since our work is about God, and I'm a pastor, so I'm not pointing at this from outside it."
   After: "Those of us who work for churches can make overwork sound like devotion, since our work is about God."
3. money, why this is so hard.
   Before: "I'm a pastor now, and I'm not standing outside this. It's easier to take an offering than to ask a family how they're doing with the rent."
   After: "I'm a pastor now, and it's easier to take an offering than to ask a family how they're doing with the rent."
4. anxiety, first screen.
   Before: "Anxiety is not a verdict on your faith. It's a weight on body and soul together... and it deserves real care"
   After: "Anxiety doesn't mean your faith is weak. It's a weight on body and soul together... and it needs real care"
5. marriage, what's going on.
   Before: "The usual explanations each hold part of the truth. A counselor may say you're stuck in a pattern"
   After: "A counselor may say you're stuck in a pattern"
6. curious, why this is so hard (after Hume is stated).
   Before: "That is the objection at full strength, and much of it is right."
   After: "Much of that is right."
7. doubt, search description.
   Before: "Honest help from a pastor who came to faith from atheism: what doubt is, what it isn't, and what to do next."
   After: "What doubt is, what it isn't, what Scripture says to people who doubt, and what to do next."
8. new-believer, what's going on.
   Before: "some churches do press people at emotional moments; a page that denied it wouldn't deserve your trust."
   After: "some churches do press people at emotional moments."
9. dating, helping someone.
   Before: "I have five sons, and I'd rather they bring this question to me than hide it from me, which means I have to listen before I lecture."
   After: "If you'd rather your child bring this question to you than hide it, you'll have to listen before you lecture."
10. cant-forgive, helping someone.
    Before: "Your job isn't to produce forgiveness in them. It's to stay, to help them get safe if they need to"
    After: "You can't produce forgiveness in them. Your job is to stay, to help them get safe if they need to"

## Checks run (all watched)

- `node scripts/validate-needs.mjs`: clean, 40 pages.
- `node scripts/validate-needs.mjs --drafts`: clean, 2 drafts (not edited).
- `node scripts/build-needs-index.mjs`: rebuilt; the validator's drift check passes.
- `node scripts/validate-no-emdash.mjs`, `validate-grow-voice.mjs`, `validate-content-integrity.mjs`: clean.
- `validate-grow-links`, `validate-links`, `validate-topics`, `build-topics-index --check`, `validate-catalogue`, `build-search-index --check`: clean.
- All 41 JSON files parse.
- Vitest: `CarePage.test.tsx`, `start.test.tsx`, `help-printables.test.ts`, `scripture-ref.test.ts` pass (229 tests, 1 skipped).
- Not run: `pnpm check` (no `.ts` or `.tsx` file changed), the full test suite, the build, and no page was looked at in a browser. The text renders through the same component as before.

Three sections fell under the validator's minimum length after cuts and were
put right without padding: is-it-a-sin (the helping sentence reworded at its
old length), infertility (the opener kept), trust-the-bible (one intro
sentence reworded).

## Skipped, and why

- The two findings in `Help.tsx`: outside this unit's files.
- The two crisis drafts in `docs/grow/drafts/` (suicidal-thoughts,
  unsafe-at-home): they wait for James's approval of their tone and are not
  rendered, so they were validated and not edited. Each still has one
  "I'm a pastor, so I write this from inside that failure" sentence, and
  suicidal-thoughts has the "common explanations" opener.
- "Tell one person" (32 uses) and "ask plainly whether they're thinking about
  suicide" (about a dozen): they repeat, but they are the safety instruction.
  Left alone.
- The first-screen skeleton shared by all 40 answers ("You... Maybe... You
  don't have to settle it tonight. Tonight... If this has turned into thoughts
  of ending your life, call or text 988"). The audit's three small fixes are
  in; changing the shape on 40 crisis-facing first screens is a rewrite, not
  an edit.
- Straight versus curly quotation marks around Scripture (17 pages one way,
  23 the other): housekeeping, and the validator reads both.
- The `reviewed.notes` field on each page describes an earlier review and was
  not updated.
- Not read line by line: like the audit, this pass worked by search with the
  context of every hit, and reread every edited paragraph. The doubt page was
  read end to end after editing, with the long sections of purpose and
  work-burnout. The Scripture readings, questions and prayers of the other
  pages have not had a full read by anyone.

## Waiting for James

- Every page has marked places for two or three sentences of his own, and all
  are empty. That is still the only thing that would make these pages sound
  like no one else.
- The family-devotions sentence above: confirm, change or cut.
- Where the three facts about him should appear. This pass followed the
  audit's list. The pages that still say "I came to faith from atheism", name
  his five sons, or speak as a pastor in the first person are listed above; he
  may want fewer.
- The fatherless page keeps "I was raised without a father, and I have five
  sons, so I'm not writing this from the outside." It is the one page where
  that sentence is the point. His call whether it stays in those words.
- Three pages answer "faith is just a comfort story" the same way (grief,
  diagnosis, anxiety). If he would say something different to a dying skeptic
  than to a grieving one, the diagnosis page is where it goes.
- The pages quote the Berean Standard Bible, not the ESV. That was a recorded
  choice; it is his to confirm.
- The two crisis drafts still wait on his reading.
