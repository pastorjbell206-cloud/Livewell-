# Voice Audit — The Free Library (49 Books)

**Date:** 2026-07-28 · **Requested by:** James Bell · **Scope:** every book in the
free reading library (`client/public/books/`, served at `/read/:slug`)

James's question, verbatim: *"A lot of them sound very AI, and don't sound like
me."* This audit answers it book by book, with quoted evidence, so the decision
about what stays under his byline is made from facts rather than unease.

## How it was run

**Tier 1 — mechanical scan** (all 49 books, every chapter): the CLAUDE.md
forbidden-language lists, therapy-speak, signposting, hedges, AI-register
phrases, exclamation points, sentence-rhythm statistics, and the positive
markers only Bell supplies (Fenton, five sons, the atheism, PCN). Full data:
`book-voice-scan.json` (session scratchpad).

**Tier 2 — judgment pass** (all 49 books): seven independent readers, each
holding the full voice canon, read per book: the blurb, every chapter title,
chapter 1 in full, a middle chapter in full, every chapter's verdict field, and
a third chapter where the first two disagreed. Each verdict is supported by
verbatim quotes under a strict no-fabrication rule. The decisive test, from
CLAUDE.md: *could any competent Christian blogger have written this?*

Tier 2 outranks Tier 1 everywhere they disagree. The scan finds banned words;
it cannot detect the real failure mode, which is competent-generic prose with
clean mechanics. Several of the strongest books had the worst scan scores
(their essays legitimately discuss "showing up" at church or quote sources
containing flagged words), and one of the weakest had a clean scan.

## The result in one paragraph

**Every one of the 22 authored books passed.** All twenty-two, most at high
confidence — the biography is load-bearing, the self-implication is real, the
verdicts land, and the readers repeatedly concluded "only this man writes this
sentence." The problem James smelled is real, but it lives almost entirely in
the 27 machine-compiled **essay volumes**: 15 pass, 9 are borderline, and 3
fail outright as competent-generic survey writing that any Christian blogger
could have produced. The failing content is not book-shaped — it is the survey
and explainer *essays* those volumes hoovered up, and those same essays also
live individually on the site.

| | PASS | BORDERLINE | FAIL |
|---|---:|---:|---:|
| Authored books (22) | **22** | 0 | 0 |
| Essay volumes (27) | 15 | 9 | 3 |
| **Total (49)** | **37** | **9** | **3** |

## The verdict table

Scan score is Tier 1 only (higher = more mechanical tells); the verdict column
is the judgment pass and is the one that governs.

### Fails — should not carry the byline as-is

| Title | Slug | Type | Verdict | Confidence | Scan |
|---|---|---|---|---|---:|
| The Great Truths | `essays-core-doctrine` | essay volume | **FAIL** | medium | 30 |
| When Faith Falls Apart | `essays-deconstruction-church-hurt` | essay volume | **FAIL** | high | 28.1 |
| Hard Questions About God | `essays-hard-questions` | essay volume | **FAIL** | medium | 20.2 |

### Borderline — genuine Bell essays interleaved with generic survey chapters

| Title | Slug | Type | Verdict | Confidence | Scan |
|---|---|---|---|---|---:|
| After Christendom | `essays-after-christendom` | essay volume | **BORDERLINE** | medium | 39.6 |
| The Story You Were Born Into | `essays-church-history` | essay volume | **BORDERLINE** | medium | 35.5 |
| What the Church Won't Say | `essays-church-reckonings` | essay volume | **BORDERLINE** | medium | 8.9 |
| Honest Doubt | `essays-faith-and-doubt` | essay volume | **BORDERLINE** | medium | 15.3 |
| Fighting Fair | `essays-marriage-communication-conflict` | essay volume | **BORDERLINE** | medium | 14.5 |
| The Long Marriage | `essays-marriage-money-seasons` | essay volume | **BORDERLINE** | medium | 20.8 |
| Naked and Unashamed | `essays-marriage-sex-intimacy` | essay volume | **BORDERLINE** | high | 35.6 |
| How to Pray When You Don't Feel Like It | `essays-on-prayer` | essay volume | **BORDERLINE** | medium | 13.9 |
| Faith at Work | `essays-work-and-vocation` | essay volume | **BORDERLINE** | high | 34.3 |

### Passes

| Title | Slug | Type | Verdict | Confidence | Scan |
|---|---|---|---|---|---:|
| Born Again From Atheism | `born-again-from-atheism` | authored book | **PASS** | high | 3.3 |
| Character Before Competence | `character-before-competence` | authored book | **PASS** | high | 22.7 |
| Come to the Table | `come-to-the-table` | authored book | **PASS** | high | 4.3 |
| Common Grace | `common-grace` | authored book | **PASS** | high | 10.3 |
| The Weight of the Collar | `dangerous-calling` | authored book | **PASS** | high | 3.5 |
| Deep Roots | `deep-roots` | authored book | **PASS** | high | 12 |
| Fearfully Made | `earthen-vessels` | authored book | **PASS** | high | 18.2 |
| The Whole Story | `essays-biblical-theology` | essay volume | **PASS** | high | 15.5 |
| God and Country | `essays-christian-nationalism` | essay volume | **PASS** | high | 11.4 |
| When Justice Sleeps | `essays-justice-and-the-poor` | essay volume | **PASS** | high | 6.8 |
| The Man Who Stays | `essays-manhood` | essay volume | **PASS** | high | 20.4 |
| What Marriage Actually Is | `essays-marriage-covenant-roles` | essay volume | **PASS** | high | 27.4 |
| After the Affair | `essays-marriage-crisis-repair` | essay volume | **PASS** | medium | 25.4 |
| God and Money | `essays-money-stewardship` | essay volume | **PASS** | medium | 25.7 |
| Parenting by Season | `essays-parenting-ages-stages` | essay volume | **PASS** | high | 11.8 |
| Discipline That Forms the Heart | `essays-parenting-discipline-character` | essay volume | **PASS** | medium | 2.6 |
| When Parenting Gets Hard | `essays-parenting-hard-places` | essay volume | **PASS** | medium | 13.6 |
| Preaching and Leading | `essays-preaching-and-leading` | essay volume | **PASS** | high | 10.8 |
| The Most Segregated Hour | `essays-race-and-the-church` | essay volume | **PASS** | high | 18.7 |
| Handing On the Faith | `essays-raising-kids-in-faith` | essay volume | **PASS** | high | 9.1 |
| On Sabbath | `essays-rest-and-sabbath` | essay volume | **PASS** | medium | 23.9 |
| More Than a Role | `essays-womanhood` | essay volume | **PASS** | high | 9.4 |
| Faithful in Exile | `faithful-in-exile` | authored book | **PASS** | high | 7 |
| Mishpat | `mishpat` | authored book | **PASS** | high | 6 |
| Necessary Words | `necessary-words` | authored book | **PASS** | high | 8 |
| One Body, Many Churches | `one-body-many-churches` | authored book | **PASS** | high | 5 |
| Preach the Word | `preach-the-word` | authored book | **PASS** | high | 4.9 |
| Sent Into the City | `sent-into-the-city` | authored book | **PASS** | high | 13.8 |
| The Captive Church | `the-captive-church` | authored book | **PASS** | high | 7.4 |
| The First Flock | `the-first-flock` | authored book | **PASS** | high | 3.7 |
| The God Who Is Not Nice | `the-god-who-is-not-nice` | authored book | **PASS** | high | 6.9 |
| The Hidden Life of a Pastor | `the-hidden-life-of-a-pastor` | authored book | **PASS** | high | 2.9 |
| The Pruning | `the-pruning` | authored book | **PASS** | high | 7.3 |
| The Undershepherd | `the-undershepherd` | authored book | **PASS** | high | 8.3 |
| The Undivided Life | `the-undivided-life` | authored book | **PASS** | high | 27.1 |
| The Unfinished Church | `the-unfinished-church` | authored book | **PASS** | high | 4 |
| To the Ends of the Earth | `to-the-ends-of-the-earth` | authored book | **PASS** | high | 6.1 |

## Confirm or kill — biographical claims that need James's own answer

These are first-person claims found in the books that the audit could not
verify. Under the platform's own standard, fabricated autobiography is the one
unforgivable failure — each of these needs a yes or a no from James, and any
"no" comes out of the text immediately regardless of the book's verdict.

1. **A child who left the faith** — `essays-parenting-ages-stages` ch. 6 says,
   first-person: "I know what it is to watch a child I raised in the church
   move toward a life without it." **This is the most serious item in the
   audit.** If it is not true of one of his sons, it is invented autobiography
   inside an otherwise passing book.
2. **The grandfather at the grapevines** — `the-pruning` ch. 1 builds its
   governing image on a remembered grandfather, with dialect. Not in the known
   biography; confirm he existed.
3. **His father's death and funeral** — `essays-parenting-hard-places` ch. 2:
   "My father died, and I made a decision… that my sons would see me cry."
   Confirm the timeline (absent father, funeral in Bell's adulthood).
4. **"The woman who taught me the catechism"** — `the-unfinished-church` ch. 1.
   Sits oddly against an adult conversion from atheism in a Baptist context.
5. **Years at Fenton** — `the-unfinished-church` names "fifteen years" at First
   Baptist; James says twelve. One of these is wrong.
6. **"The Reformed tradition I stand in"** — `sent-into-the-city` ch. 1.
   Confirm this is how he self-identifies.
7. **Congregation size** — `essays-preaching-and-leading` ch. 1 says "three
   hundred people"; `common-grace` ch. 12 says half the men in town work the
   auto-plant third shift. Confirm both.

## Production defects (voice-neutral, fixable without him)

- **Paid-reader bug:** `the-god-who-is-not-nice` ch. 7 says "I told you in the
  first chapter about a man in my congregation" — chapter 1 contains no such
  story. This book is currently on the paid shelf.
- **Duplicate chapter titles:** `essays-money-stewardship` chs. 13 and 14 are
  both titled "What the Bible Actually Says About Money" (different bodies).
- **Near-duplicate chapters:** `essays-hard-questions` chs. 2/3;
  `essays-raising-kids-in-faith` chs. 8/9; `essays-marriage-money-seasons`
  chs. 4/5 and 8/9; `essays-marriage-communication-conflict` chs. 1/2, 3/4, 5/6.
- **Reused passage:** the sons/phones opening appears nearly verbatim in both
  `the-captive-church` ch. 5 and `essays-deconstruction-church-hurt` ch. 1.
- **Garbled sentences:** "The blaise Pascal I keep returning to said it"
  (`essays-faith-and-doubt` ch. 22); "the late thoughtful writer scholars
  associated with the group Christians for Biblical Equality"
  (`essays-manhood` ch. 1).
- **Style-guide leakage into reader-facing prose**, corpus-wide: "Steel-man the
  critic fully." (`essays-church-history` ch. 11, `deep-roots` ch. 8, others);
  "The Constitution I write under requires…" (`essays-marriage-covenant-roles`
  ch. 4); "only because the thinking actually produces three"
  (`essays-on-prayer` ch. 3). The house method talking about itself in print.
- **Unattributed borrowed ideas** (scholarship-standard violations): Dane
  Ortlund's *Gentle and Lowly* framing (`essays-on-prayer` ch. 11); Kenda
  Creasy Dean's *Almost Christian* thesis (`the-god-who-is-not-nice` ch. 7);
  Keller's fully-known/truly-loved and van der Kolk's title phrase
  (`essays-marriage-sex-intimacy`); Rodney Stark's plague-nursing argument as
  "the historians noticed" (`the-unfinished-church` ch. 9).
- **Citation errors:** Wolterstorff called "the Old Testament scholar"
  (`mishpat` ch. 1 — he is a philosopher); Berger's secularization prediction
  dated 1960 (`essays-faith-and-doubt` ch. 1 — the famous version is 1968);
  Friedman's *A Failure of Nerve* dated 1999 in one chapter and 2007 in others
  (`essays-preaching-and-leading`); decorative works-cited entries never used
  in the text (Peterson in `essays-work-and-vocation` ch. 6, Jennings/DeYmaz in
  `essays-race-and-the-church` ch. 1, Keller in `essays-money-stewardship`).
- **Unmarked non-ESV Scripture** (house rule is ESV by default, translation
  named when it does work): KJV throughout `necessary-words`,
  `preach-the-word`, and `the-unfinished-church`; NIV throughout
  `the-hidden-life-of-a-pastor`; NIV wording in `to-the-ends-of-the-earth`
  ch. 1, `essays-money-stewardship` ch. 11, `essays-church-reckonings` ch. 5.
- **Register break:** `essays-hard-questions` repeatedly addresses a youth
  audience ("tell a trusted adult") on a platform aimed at adult skeptics.
- **Guardrail tension:** `essays-deconstruction-church-hurt` ch. 7 recommends
  Brian McLaren and Peter Enns with none of the platform's usual framing.
- **Title collision (already flagged in the shelf discussion):** the
  `dangerous-calling` slug duplicates Paul David Tripp's 2012 title; the
  displayed title "The Weight of the Collar" avoids it, the URL does not — and
  "collar" is borrowed vestment imagery for a Baptist.

## What I recommend

1. **Keep all 22 authored books live.** They passed unanimously, they are the
   depth of the platform, and pulling them would remove the very material that
   proves the byline. Apply the production fixes above.
2. **Pull the 3 failing volumes now** (`essays-hard-questions`,
   `essays-core-doctrine`, `essays-deconstruction-church-hurt`): move the JSON
   out of `client/public/books/` into a private drafts folder, remove the
   index entries, 301 their `/read/` URLs to `/writing`.
3. **Pull the 9 borderline volumes to drafts too**, given James's stated
   discomfort — each hides genuine Bell essays inside generic survey chapters,
   and the honest fix is per-chapter triage in his own hand, offline. (The
   alternative — keep them live while rewriting — is defensible only if the
   discomfort can wait.)
4. **Then the deeper cut:** the failing chapters are *essays that also live
   individually on the site*. The same triage list should drive a follow-up
   pass over the standalone essay libraries — that is where the AI register
   actually lives. Pulling the volumes treats the symptom; the essays are the
   cause.
5. **Answer the seven confirm-or-kill items** — item 1 before anything else.

Nothing in this report has been acted on. No book has been pulled, no text
edited. The evidence for every verdict follows.

---

# Per-book findings

## Fails

### The Great Truths

SLUG: essays-core-doctrine
VERDICT: FAIL
CONFIDENCE: medium
RATIONALE: The dominant register is the evenhanded encyclopedia survey — denominational history, positions mapped, nobody implicated, endings that summarize rather than land — and most of it could run under any competent Christian educator's byline. Ch10 explicitly refuses to name where the author lands on a contested doctrine, violating the platform's own standard. A minority of chapters (ch8, ch3, ch14) are genuinely Bell, which is why this is salvageable by triage rather than a full rewrite.
EVIDENCE:
- [ch1: A Guide to Every Major Denomination] "not a ranking, not a recommendation, but a map of the landscape, drawn with as much fairness as a single author can manage" — forbidden word plus pure survey framing; "landscape" appears 3x and the chapter closes on "to navigate their own tradition."
- [ch10: What Christians Actually Believe About Hell] "This is not an argument for any single position. It is a map of the terrain." — mimics the "Not X. Y." shape while refusing the verdict; the author never lands, contra his own contested-doctrine rule.
- [ch8: The Trinity Is Not Optional] "That is functional unitarianism. It is the practical worship of a single solitary power, whatever I say in the creed." — real self-implication and a real verdict; this chapter is Bell.
NOTES: Ch1 statistics (644M Pentecostals, ~85M Anglicans, ~70M Assemblies of God, ~13M SBC, Smyth/Amsterdam 1609, Outler coining the Quadrilateral) all check out; Stott's "I find the concept intolerable" (1988, with David Edwards) is a real quote. No fabrication found — the failure is register, not facts. First-person biography appears nowhere in sampled text except ch8's confession.

---

### When Faith Falls Apart

SLUG: essays-deconstruction-church-hurt
VERDICT: FAIL
CONFIDENCE: high
RATIONALE: The book is two different products stitched together. The six long essays (ch2, 3, 6, 7, 8, 9 — roughly three quarters of the word count) are sectioned survey articles with taxonomies, enumerated principles ("First, it prioritizes safety… Second… Third… Fourth…"), resource directories, and no self-implication — competent reference writing any Christian journalist could produce, with multiple forbidden words. The short essays (ch1, 4, 5, 10–12) are genuine Bell, but they cannot carry the byline for the rest as-is.
EVIDENCE:
- [ch1: Consumerism Is a Spiritual Formation] "I have preached against the mall on Sunday and shopped my way through Monday's anxiety, and the gap between those two days is the size of my actual discipleship." — real Bell: self-implication with a verdict inside it
- [ch7: Religious Trauma Is Real] "For those who are navigating religious trauma, the path forward typically involves several elements, and it is worth naming them plainly" — forbidden "navigating" plus resource-guide register; the chapter also contains "transformative" and "companionship on the journey"
- [ch2: Deconstruction Is Not Destruction] "people who can hold space for doubt without panicking" — therapy-speak from the forbidden list
- [ch8: Spiritual Abuse: How Good Theology Gets Weaponized] "We must then trace its patterns, examine its most prominent case studies, and, most critically, identify the theological distortions that enable it" — outline-announcing signposting; the writer stands entirely outside the indictment
NOTES: Citations check out (Winell's 2011 RTS piece in Cognitive Behaviour Therapy Today, Hassan's BITE model, van der Kolk 2014, Harris 1997, Mars Hill/Driscoll and IBLP/Gothard timelines, Trevor Project conversion-therapy suicide figure — verify 2022 vs 2020 survey year). Ch7 recommends Brian McLaren and Peter Enns without the platform's usual framing — an Orthodoxy Guardrails tension worth an editorial look. Ch1's sons/phones opening is reused nearly verbatim in The Captive Church ch5.

---

### Hard Questions About God

SLUG: essays-hard-questions
VERDICT: FAIL
CONFIDENCE: medium
RATIONALE: Both fully read chapters are competent stock apologetics any skilled Christian writer could produce — the Hume-circle rebuttal with Lewis's falling-cup move, Keller's all-paths-up-the-mountain rebuttal with the drowning-rescue analogy — with zero biography and zero self-implication from a man whose conversion from atheism is the platform's signature credential. Worse, roughly a quarter of the endings shift into a youth-curriculum register ("tell a trusted adult") foreign to a platform positioned toward intelligent adult skeptics, and the compilation contains near-duplicate essays. Some individual endings show real craft, but the dominant mode fails the decisive test.
EVIDENCE:
- [ch12: Isn't Jesus Just One Way Among Many?] "Now let me show you why the all paths up the same mountain idea, as genuinely kind as it sounds, does not actually hold together when you look closely" — explicit "let me show you" signposting plus Keller's most-recycled move
- [ch13: It Is Okay to Doubt: What to Do With Your Questions] "tell a trusted adult that part out loud too, directly, because that is not a faith problem you can read your way out of in a library" — youth register under an adult-platform byline
- [ch4: Did the Resurrection Actually Happen?] "And find one adult who will not flinch when you push hard on it, and push on it out loud, to their face." — same misregister
- [ch6: Hasn't the Church Done Terrible Things?] "The hypocrisy of Christians is real. It is also, oddly, a backhanded testimony to the height of the thing they failed to reach." — redeeming: a genuine weighted landing exists in places
NOTES: Chapters 2 and 3 are near-duplicates ("Can You Actually Trust the Bible?" / "Can You Trust the Bible?"); chapters 8, 21, 22 triple-cover suffering/evil and 1/14 double-cover miracles — bulk compilation without curation. Citations themselves are real (Hume, N.T. Wright, Keller *The Reason for God*, Rebecca McLaughlin — who does write for younger readers, confirming the register).

---

## Borderline

### After Christendom

SLUG: essays-after-christendom
VERDICT: BORDERLINE
CONFIDENCE: medium
RATIONALE: The book is two registers stapled together. Chapters 1, 3, and 6 carry real Bell — primary-source dates (Pliny 10.96, Decius 250, Diocletian 303), the five sons, self-implication, landing verdicts — but they announce their own method in the reader-facing prose ("steel-man," "Here is the reversal," "Trace the cost"), the editorial constitution's internal vocabulary leaking through as signposting. The other half (ch. 5, 7, 8, 9 sampled via ch. 8 body and all endings) is competent data journalism with the writer outside the indictment and comfortable resolving endings.
EVIDENCE:
- [ch6: The Early Church Under Rome: Faith Without Power] "They had no power. They had a tomb that would not stay shut. It was enough to outlast Rome." — a true Bell verdict, evidence-then-landing
- [ch1: Christendom Is Ending. Christianity Is Not.] "I have five sons, and the world that will hand them their assumptions is not the world that handed me mine, where a closed store on Sunday still meant something." — real self-implication with his biography
- [ch6: The Early Church Under Rome: Faith Without Power] "Now steel-man the empire, because Rome was not a cartoon villain and the persecution was not always blind cruelty." — the style guide's jargon announced in the prose; forbidden signposting
- [ch9: Why Young Adults Aren't Coming Back] "it will find that the generation it thought it had lost was waiting for it all along." — comfortable resolving closing, not a weighted ending
NOTES: Ch. 8 statistics need verification (Gallup 73%→68% 2006–2022; Pew 78%→63% 2007–2021; PRRI 61% in 2023; Packard & Hope *Church Refugees* 2015 is real; the Barna "five drivers" list should be checked against actual Barna publications). Primary citations in ch. 1/6 (Tertullian Apology 39 and 50, Eusebius EH 5.1, Edict of Thessalonica 380, Newbigin's 1974 return) all check out. Several chapters end in "### Works Cited" bibliographies, which likely inflated the mechanical scan score.

---

### The Story You Were Born Into

SLUG: essays-church-history
VERDICT: BORDERLINE
CONFIDENCE: medium
RATIONALE: A split book: roughly five short essays (chs 3, 5, 10, 11, 12) carry genuine Bell — steelmans, self-implication, hard-period verdicts — while the majority (chs 1, 2, 6, 7, 9, 13–18) are competent encyclopedia-register surveys any well-read Christian writer could produce, with comfortable closings and forbidden-language hits. The survey chapters explain; only the short essays land.
EVIDENCE:
- [ch8: The Anabaptist Option] "needs to hear, and needs to hear now more than ever." — forbidden phrase, in the chapter's final sentence
- [ch1: Catholic, Orthodox, Protestant] "the full scope of what Christianity has been, and what it is still trying to become." — uplift-resolved closing; no self-implication anywhere in the chapter
- [ch18: What the Reformation Actually Changed] "it is, in many ways, the central question of Western Christianity." — the hedge Bell's own revision pass hunts, as the book's last line
- [ch11: The Crusades: What Actually Happened] "We did this. Some version of we keeps doing it." — real Bell: self-implication after a full steelman of Hitchens; ch12's "Not how hot it burned. What it grew." is likewise genuine
NOTES: "Transformative" (ch17) and "journey of transformation" (ch13) are further forbidden hits. Ch11 contains the bare imperative "Steel-man the critic fully." — a prompt/method artifact published as prose (recurs across the corpus). Citations checked are real (Hitchens 2007, Madden 2005, Tyerman 2006, Winthrop's Arbella quote, Half-Way Covenant 1662, Carl Henry's Uneasy Conscience).

---

### What the Church Won't Say

SLUG: essays-church-reckonings
VERDICT: BORDERLINE
CONFIDENCE: medium
RATIONALE: The two short essays (chs 2, 8) are genuine Bell — steelmanned, self-implicating, weighted endings — but the long topical chapters (1, 4, 5, 6, 7, 9) are well-researched investigative-explainer journalism in which the writer stands outside the indictment ("the church" did it; almost no "I" or "we"), with clean application turns and some comfortable closings. Precisely on this book's subject, the canon demands self-implication first, and most chapters never do it.
EVIDENCE:
- [ch1: How the Church Handles Mental Health (Badly)] "Then it must take positive steps. Train pastoral staff in mental health first aid." — the clean application turn the canon forbids
- [ch1: How the Church Handles Mental Health (Badly)] "That is not a compromise of faith. It is faith doing what faith is for." — Bell-shaped mechanics, comfortable resolution
- [ch8: Why the Prophets Made Everyone Uncomfortable] "I know it. I have a congregation, and I do not love the voice that comes in and unsettles them." — the real thing: steelman of Amaziah plus self-implication ("That is why the word is for me first.")
- [ch5: The Sexual Abuse Crisis] "Those are the only two options. There is no third way." — a true verdict ending on an otherwise outside-pointing chapter
NOTES: Facts check out and are specific (Matthew Warren 2013; Globe Spotlight Jan 2002; PA grand jury ~1,000 victims/300 priests; Guidepost/SBC 2022; Christa Brown; Hybels; RZIM; Gothard; BJU firing its investigator). Ch5's millstone quotation uses NIV phrasing ("causes one of these little ones to stumble") in an ESV-default house. Works Cited (Brueggemann 1986, Heschel 1962, Stringfellow 1973, Thurman 1949, Kapic 2017, Curt Thompson 2015) are all real.

---

### Honest Doubt

SLUG: essays-faith-and-doubt
VERDICT: BORDERLINE
CONFIDENCE: medium
RATIONALE: A genuinely split book: the long anchor essays (ch1, ch13 — both read in full) are competent explainer prose with section-scheme structures, zero self-implication, and forbidden words, while the short devotional chapters and many doubt-situation endings are unmistakably Bell — first-person atheism, his sons, verdicts that land. Salvageable by rewriting or cutting the survey essays; the personal material should not be thrown out with them.
EVIDENCE:
- [ch1: Christianity After Christendom] "the mustard seed, the leaven in the dough, the treasure hidden in a field. Small, hidden, transformative." — forbidden word planted in the closing crescendo of the opening essay.
- [ch13: Reconstructing Faith: What Comes After Deconstruction] "A spiritual director is a companion on the spiritual journey" — journey-as-metaphor (4x in this chapter, plus "navigate"); the whole essay explains without ever implicating the writer.
- [ch22: When Apologetics Isn't Enough] "But here is the thing the apologetics culture rarely admits." — forbidden phrase in an otherwise strong first-person chapter.
- [ch19: The Verse You Have Read a Hundred Times] "I was reciting. I was not believing. The two can look identical from the outside." — Bell at full strength; verdict "The verse is not tired. You are. Read it again."
NOTES: Ch1 dates Peter Berger's secularization prediction "In 1960" — the famous prediction was a 1968 NYT interview; chase this. Ch22 contains a broken editing artifact: "The blaise Pascal I keep returning to said it" (lowercase, garbled syntax). Ch14's ending references his sons ("my sons grew up knowing him not as a subject we covered but as a Person we lived with") — biographically consistent. Ricoeur, Plantinga (2000), Rodney Stark, and When Helping Hurts are all real.

---

### Fighting Fair

SLUG: essays-marriage-communication-conflict
VERDICT: BORDERLINE
CONFIDENCE: medium
RATIONALE: The strongest of the three essay compilations but still split: ch1 is a Gottman explainer any competent Christian writer could produce, while ch7 and ch11 are unmistakably Bell (the fatherlessness-and-apology material in ch11 is the best passage in the marriage books). Duplicate topic pairs (ch1/2, 3/4, 5/6) and scattered forbidden language mark the same assembly pipeline; endings land more often than book 2's but several still resolve into comfort or application.
EVIDENCE:
- [ch11: What Your Kids Learn From How You Fight] "I grew up without a father in the house, which meant I never once saw a man apologize to a woman" — biography doing structural work, not decoration
- [ch7: Gratitude When Nothing Has Changed] "Nothing has changed. He has not either. Give thanks in it." — a true Bell verdict ending
- [ch11: What Your Kids Learn From How You Fight] "Here is the thing I got most wrong for years." — forbidden phrase, verbatim
- [ch6: Forgiveness in Marriage: What It Is and What It Isn't] "The journey is not linear." — forbidden word plus stock AI cadence; ch1 ends "The brain is plastic. The heart is redeemable." — a resolving comfort close
NOTES: Gottman figures in ch1 (93.6 percent prediction accuracy, 5:1 ratio, 86/33 percent bid response) and Sue Johnson's demon dialogues are real and correctly named. Ch6 correctly attributes the four stages (hurt, hate, healing, coming together) to Lewis Smedes. Also "navigating" (ch12) and "do/done the work" (ch9, ch13).

---

### The Long Marriage

SLUG: essays-marriage-money-seasons
VERDICT: BORDERLINE
CONFIDENCE: medium
RATIONALE: Competent Christian counseling content — parent typologies, research summaries, pull-quote aphorisms — with real Bell anchors patched in (fatherlessness in ch1, five sons in ch4, his and his wife's money histories in ch9). Endings mostly resolve warmly rather than leave weight, near-duplicate chapters (ch4/ch5, ch8/ch9) betray bulk assembly, and ch1 ends on a dangling antecedent that reads like an editing seam. Salvageable with a voice rewrite; the spine of lived material is genuinely his.
EVIDENCE:
- [ch1: In-Laws, Boundaries, and Leaving and Cleaving] "The leaving was complicated, because I had less to leave than most." — fatherlessness made load-bearing; only this man writes this sentence
- [ch4: Marriage After Children: Rediscovering Each Other] "My wife needed a partner. She got a provider." — real confession with a hard period
- [ch1: In-Laws, Boundaries, and Leaving and Cleaving] "The intrusive parent inserts themselves into the marriage's decisions" — start of a five-type taxonomy (intrusive/enmeshed/critical/dependent/triangulating), advice-article architecture, not Bell
- [ch1: In-Laws, Boundaries, and Leaving and Cleaving] "He will. He always does. But the wisdom comes to those who ask for it" — closing lines whose antecedent sits three paragraphs back; an assembly seam
NOTES: Forbidden hits: "couples who have done the work" (ch1, therapy sense), "navigate" (ch6, ch7). Gottman's 67 percent satisfaction-decline figure (ch4) and Bowen's undifferentiation (ch1) are real. Duplicate topic pairs suggest two generations of content merged without deduplication.

---

### Naked and Unashamed

SLUG: essays-marriage-sex-intimacy
VERDICT: BORDERLINE
CONFIDENCE: high
RATIONALE: The two fully-read chapters are competent-generic — ch1 builds on the fully-known/fully-loved idea (Keller's signature, unattributed) and ch5 is a section-headed advice essay with no "I" anywhere, a four-step application turn, and a forbidden-language hit. But real Bell surfaces in ch2's Origen-to-Augustine arc and ch8's fatherless-father confession, and several endings land true verdicts. Salvageable with a voice pass; not publishable as-is under the byline standard.
EVIDENCE:
- [ch5: The Sexless Marriage Nobody Talks About] "The willingness to keep showing up, to keep having the hard conversation, to keep reaching across the distance, that willingness is the covenant in action." — forbidden therapy-speak ("showing up") in summary register
- [ch5: The Sexless Marriage Nobody Talks About] "Anyone who offers you five steps is selling something." — immediately followed by "The first is naming… The second is curiosity… The third is professional help… The fourth is patience," the clean application turn the house forbids, self-contradicting the disclaimer
- [ch3: Intimacy in a Christian Marriage] "Most couples are not under-skilled. They are under-known." — a genuine Bell verdict
- [ch8: How to Talk to Your Kids About Sex and Identity] "I did not have a father to do this for me, and I have felt the hole where that instruction should have been" — the biography doing real work
NOTES: "The body keeps score" (ch5) is van der Kolk's book title used unattributed. "Researchers define it clinically, fewer than ten sexual encounters per year" (ch5) is the real sociological definition but unnamed. Ch1 leans on Keller's fully-known/truly-loved without naming him — against the no-secondhand-authority rule.

---

### How to Pray When You Don't Feel Like It

SLUG: essays-on-prayer
VERDICT: BORDERLINE
CONFIDENCE: medium
RATIONALE: Fifteen of seventeen chapters are 300–500-word second-person devotionals with a uniform two-line aphorism closer — canon-compliant, often well-landed, but a register any strong devotional writer could produce; the biographical and historical specificity that makes Bell Bell is concentrated in the two long essays (ch3, ch6). The closers are better than mill-grade, which is why this is borderline rather than fail. Salvageable by threading his particulars into the short pieces.
EVIDENCE:
- [ch3: Prayer When You Do Not Feel Like It] "the ceiling as blank as it was when I was an atheist" — the long essay carries his actual biography
- [ch11: The Prayer of a Tired Person] "You are too tired to pray well. He is gentle enough that well was never the point." — above-average landing line, but detachable from any particular author
- [ch3: Prayer When You Do Not Feel Like It] "Concretely, this means three things, and only because the thinking actually produces three" — the CLAUDE.md triplet rule spoken aloud in the prose; style-guide leakage
- [ch11: The Prayer of a Tired Person] "This is the one place in the Gospels where Jesus tells us directly what his heart is like" — Dane Ortlund's signature *Gentle and Lowly* (2020) framing, used without attribution
NOTES: Fact-check the Ortlund borrowing (attribution or rephrase). Romans 8:26 in ch3 is lightly trimmed (drops "Likewise") while presented as quotation. Peterson (*Answering God*, 1989), Willard (1988), Augustine citations real.

---

### Faith at Work

SLUG: essays-work-and-vocation
VERDICT: BORDERLINE
CONFIDENCE: high
RATIONALE: A split corpus. Chapters 1, 4, and much of 9 are competent-generic explainers — tidy two-model taxonomies, "not X but Y" symmetry as a tic, forbidden vocabulary, no biography, no self-implication — that any competent Christian blogger could have written. Chapters 6 and 11 are genuinely Bell (fatherless-son self-implication, Weber and Sayers cited with the ideas named, verdicts that land), so the book is salvageable with a voice rewrite of the weak chapters rather than a discard.
EVIDENCE:
- [ch1: Bivocational Ministry] "it has fostered a passive laity" — forbidden word ("foster") inside a chapter with zero self-implication from a man who pastors for a living.
- [ch1: Bivocational Ministry] "Here is the crucial point: Paul knew he had the right to be supported by the churches." — signposting, the explaining register rather than the landing one.
- [ch4: Faith at Work When Nobody Shares It] "It is the person who has developed the judgment to navigate complexity without losing their moral center." — forbidden "navigate" in a classic AI construction; the chapter also has a section header "Navigating Ethical Conflicts" and "the most authentic communication of faith."
- [ch6: Rest, Ambition, and the Idol of Success] "That lesson does not leave when you become a Christian. It just learns to quote Scripture." — real Bell: the fatherless-boy wound made structural, writer inside the indictment.
NOTES: Ch6 Works Cited lists Peterson's The Contemplative Pastor though Peterson never appears in the chapter body (decorative citation). Weber 1905 and Sayers 1942 are real and correctly used. Ch4 opens on an unsourced "90,000 hours at work over a lifetime" statistic. Ch9 contains "transformative" (forbidden). All chapter verdict fields are null in this compilation.

---

## Passes

### Born Again From Atheism

SLUG: born-again-from-atheism
VERDICT: PASS
CONFIDENCE: high
RATIONALE: The strongest book in the batch and safe to sell: the first-person account is specific, biographically consistent (fatherlessness, Russell at nineteen, Fenton, five sons in the blurb), and it does the thing no generic writer does — steelmans his own former atheism so thoroughly the skeptic cannot claim he was handled, refuses the lightning-bolt conversion cliché, and ends without an altar call. The Luke 15 reading in ch7 (the son never reaches the hired-servant clause) is a real textual observation, quoted verbatim ESV. Nothing found that would embarrass a paying reader.
EVIDENCE:
- [ch1: The Man I Have to Introduce First] "That is too easy, and it insults the arguments, and it insults the boy. But it would also be a lie to leave it out." — the wound-versus-argument distinction handled with a precision that is the book's signature.
- [ch7: The Crossing] "A conviction rests. A holdout grips." — four words carrying the whole chapter.
- [ch7: The Crossing] "I did not find God. I want that sentence on the record in a book with my name on it. I ran out of ways to avoid being found" — the verdict of the entire memoir.
- [ch12: To the Man on the Other Side] "I am going to tell you what I did. I stopped explaining the music." — an ending that leaves weight and presses no decision, exactly the skeptic standard.
NOTES: Lewis's "most dejected and reluctant convert in all England" is real (Surprised by Joy) and is offered as marked paraphrase; Luke 15:20 is verbatim ESV; the v.19-vs-v.21 hired-servant observation holds in the ESV text (a few manuscripts include the clause in v.21 — trivially defensible as written). Otto and Russell are used with ideas, not as name-drops. No invented citations found.

---

### Character Before Competence

SLUG: character-before-competence
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Self-implication is structural, not decorative — the book states its own rule ("The indictment in these pages includes the man writing them") and keeps it in every sampled chapter. The chapter verdicts are true verdicts, short and final, and endings leave weight instead of resolving. The mechanical scan score of 22.7 is a false alarm.
EVIDENCE:
- [ch1: Almost All Character] "and I told myself I was being strategic. I was being lazy. Competence is easy to measure and character is not, and we measure what is easy and call it discernment." — the writer inside the indictment, with a landed verdict.
- [ch1: Almost All Character] verdict field: "God screens the man. We screen the resume." — eight words, hard period, distinctively his.
- [ch3: The Exhaustion No One Sees] "You will not have seen it. That was the design. And the design was the sin." — an ending that leaves weight, not comfort.
- [ch6: No One Good Enough to Be Trusted Alone] "It feels like leadership. It is usually impatience and pride wearing leadership's clothes." — first-person confession preceding the verdict.
NOTES: Greenleaf's 1970 "The Servant as Leader" essay and Willard's renovation-of-the-heart material are cited accurately and tested against Scripture per the platform's method. No suspect claims. No specific biography (Fenton, sons) in sampled text, but the self-implication is concrete enough to carry it.

---

### Come to the Table

SLUG: come-to-the-table
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Short chapters with no wasted weight — the furniture-reading of the Gospels is a genuinely distinctive lens, self-implication is present ("I ran that machine myself... I called the growth of the crowd the growth of the church"), and the exegesis is careful enough to refuse over-claiming ("I do not want to build more on this passage than it will bear"). Verdicts are true verdicts and endings land without resolving into comfort. Less biographical density than *Faithful in Exile*, but the voice is unmistakably the platform's.
EVIDENCE:
- [ch1: The Method Nobody Copied] "They could not attack his doctrine, so they attacked his dinner guests." — a landing, not an explanation
- [ch7: The Road to Emmaus Ends at a Table] "The road instructed them. The table introduced them. Both mattered. Only one opened their eyes." — the short-long-short rhythm executed
- [ch7: The Road to Emmaus Ends at a Table] "He has not changed his address." — ending that leaves weight
- [ch1: The Method Nobody Copied] "I ran that machine myself. For years I measured my church the way the culture taught me to measure it, by the size of the crowd on Sunday" — self-implication
NOTES: Luke 24 details (Cleopas, seven miles, "eyes were kept," guest-becomes-host) all accurate; "glutton and a drunkard" is Matthew 11:19/Luke 7:34. No suspect citations.

---

### Common Grace

SLUG: common-grace
VERDICT: PASS
CONFIDENCE: high
RATIONALE: The atheist past is structural, not decorative ("You cannot really be angry at someone you are sure does not exist"), self-implication is explicit and repeated, and scholarship is specific and correct (Kuyper's every-square-inch with the 1901 premiership, Calvin's Institutes on despising truth as insulting the Spirit, honestly flagged as paraphrase). Pastor-facing register fits the PCN channel. A few chapter-level verdict fields are poster-clean chiasms, but the bodies underneath earn them.
EVIDENCE:
- [ch1: The Field Was Already His] "I am not pointing at other people here. I am telling on myself." — the canon move, verbatim posture
- [ch1: The Field Was Already His] "That is not love. That is tolerance with its teeth showing." — a verdict only this voice lands
- [ch12: The Book That Wrecked Me] "The customs agent never gets moved by the painting in the suitcase. He is too busy checking it for drugs." — original metaphor, not stock
NOTES: Ch12 deliberately refuses to name the novel (reason given in-text; defensible but unverifiable). "The third-shift line at the auto plant where half the men in my town work" — geographically plausible for Fenton/Flint, worth a founder confirm.

---

### The Weight of the Collar

SLUG: dangerous-calling
VERDICT: PASS
CONFIDENCE: high
RATIONALE: The strongest book in the batch — the atheist-convert biography is the engine of both sampled chapters (the "cold voice" of doubt that "learned to go quiet and wait"), self-implication is relentless ("I'm not standing outside this telling you about other men. I'm in it"), and the patristic witnesses (Chrysostom fleeing ordination, Augustine weeping at Hippo, Gregory's "art of arts") are real and precisely used. Every verdict field lands hard, and the ch1 ending is a model of weight left unresolved.
EVIDENCE:
- [ch1: The Weight Nobody Warned You About] "I came carrying nothing but the shock of having been wrong about God my whole life." — a sentence only this particular convert writes.
- [ch13: Doubt in the Pulpit] "It did not die at my conversion, the way I'd assumed it would. It learned to go quiet and wait." — the atheism biography doing theological work, not garnish.
- [ch1: The Weight Nobody Warned You About] "Don't pick it up yet. Just look." — ending that refuses resolution; the reader carries the weight out.
NOTES: Chrysostom's six books (On the Priesthood) and his flight from ordination, Augustine's forced ordination at Hippo (391), Gregory's Pastoral Rule c. 590, and Bonhoeffer's "bids him come and die" are all real. The Spurgeon line ("he'd rather they sold their pulpits than entered them carelessly," 1870s London) reads as paraphrase and should be checked against Lectures to My Students. Two brand notes: the slug "dangerous-calling" duplicates the title of Paul David Tripp's well-known 2012 book on the same subject (the displayed title "The Weight of the Collar" avoids it, the URL does not), and "collar" is borrowed vestment imagery for a Baptist pastor who would not wear one.

---

### Deep Roots

SLUG: deep-roots
VERDICT: PASS
CONFIDENCE: high
RATIONALE: This is the canon executed whole: full historical arc (Priene inscription ~9 BC via N.T. Wright, Wittenberg 1517, Trent steelmanned in its strongest voice), self-implication at the hinge of both sampled chapters, and verdict fields that are varied, final, and self-indicting. No chapter I sampled could have come from a generic hand.
EVIDENCE:
- [ch1: The War Is Over] "I have preached the ladder." — the writer inside the indictment before pointing anywhere
- [ch8: How Is a Person Made Right] "I preach sola fide and live, much of the week, by sola me." — self-implication only this register produces
- [ch8: How Is a Person Made Right] "People do not burn at the stake over administrative corruption." — ground-clearing opening, pushes past the proximate cause
NOTES: Ch8 contains the bare imperative "Steel-man the Catholic objection." — same method-seam as the other books; here it is at least framed by "the thing this book keeps trying to do." Citations real (McGrath on justification history, Priene inscription, Luther's confessor and holy stairs). Blurb reuses CLAUDE.md positioning language nearly verbatim ("written from inside the room where people fall apart") — house copy, not plagiarism, but self-referential.

---

### Fearfully Made

SLUG: earthen-vessels
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Persona-anchored from the first sentence (atheist conversion, used structurally, not as decoration) with sustained self-implication ("I learned the lie too") and scholars cited with the idea named (Irenaeus, Gloria Dei vivens homo, ~180; Bonhoeffer's "only a suffering God can help," 1944, Flossenbürg). Verdict fields are true 3–8-word verdicts and endings leave weight. Only this particular man writes chapter 1.
EVIDENCE:
- [ch1: The Lie We Were Handed] "I came to faith out of atheism, and I want to tell you what I expected to find when I crossed over." — biography load-bearing, not ornamental
- [ch1: The Lie We Were Handed] "We were taught to hate the gift and call it holiness. It is time to repent of that." — verdict ending, writer inside it
- [ch11: The Weight of Suffering] "I have been the friend who explained." — self-implication at the exact point the canon demands it
NOTES: Ch11 has near-duplicate sentences in adjacent paragraphs ("God put the scream(ing) in his own songbook..." twice; "He can take it/the yelling; he took the cross" twice) — an unedited-draft artifact worth a copyedit. Verdict fields are formally repetitive (~14 of 18 use the same "Not X. Y." inversion), edging toward the tic the canon warns about. Scripture refs checked are correct; nephesh/soma-sema scholarship accurate.

---

### The Whole Story

SLUG: essays-biblical-theology
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Both sampled chapters could not have come from a generic blogger: ch5 steelmans Schweitzer at full strength before answering him, carries Ladd, Brueggemann, Newbigin, Wright, and Augustine with their actual ideas named, and puts the writer inside the indictment. Endings are verdicts that leave weight, not summaries, and the scan found zero forbidden-language hits across all eight chapters.
EVIDENCE:
- [ch5: What Is the Kingdom of God] "I am the weed in the field. The empire I most need overthrown is the one I administer in my own chest." — self-implication at the argument's hinge, not as garnish.
- [ch5: What Is the Kingdom of God] "The king has come. The throne is no longer empty. What will you do with the fact that it was never yours." — ending that leaves weight on the reader.
- [ch1: What Is Biblical Theology?] "You have been reading it in pieces. It was always one story. It was always his." — short-long-short rhythm closing on a verdict.
NOTES: Vos "taught this discipline at Princeton Seminary for nearly four decades" is accurate (1893–1932). All Works Cited entries (Ladd 1959/1974, Schweitzer 1906, Brueggemann 1978, Newbigin 1989, Wright 1996, Augustine c. 426, Cullmann 1951) are real books correctly matched to their claims; Newbigin's "congregation as the hermeneutic of the gospel" is his genuine line.

---

### God and Country

SLUG: essays-christian-nationalism
VERDICT: PASS
CONFIDENCE: high
RATIONALE: This is the canon executed in full: steelman stated at strength before any verdict, specific dates doing the arguing (1892, 1954, 1956, 1925), scholars cited with the idea named (Bellah's civil religion, Niebuhr's demonic loyalty, Whitehead/Perry's fusion), and the writer inside the indictment in both fully-read chapters. Endings leave weight — ch1 refuses to resolve whether he will move the flags. Only ch8's ending drifts into academic summary.
EVIDENCE:
- [ch1: Flags in the Sanctuary] "I am not the prophet clearing the temple. I am the priest who has grown used to the second altar and tells himself it is only cloth." — self-implication only this man could write.
- [ch1: Flags in the Sanctuary] "I have not moved the flags yet. Writing this is the beginning of moving them, or it is one more way of not." — an ending that leaves genuine weight.
- [ch6: What Christian Nationalism Is and What It Is Not] "It is patriotism that has stopped being able to repent." — verdict after evidence; the chapter also plants his conversion ("after I came up out of atheism, was already fused with the flag").
- [ch8: When Politics Replaced Theology] "The path forward requires not less engagement but a fundamentally different kind, one rooted in the full breadth of the biblical tradition" — the one summary-register ending in the book; ch8 (the longest chapter) reads a register flatter than the rest.
- [ch9 ending] "The kingdom is not of this world. He told us plainly. We keep voting otherwise." — among the best verdicts in the batch.
NOTES: All checkable dates verified (Pledge written 1892, "under God" added 1954, "In God We Trust" motto 1956, Scopes 1925). All citations real (Bellah Daedalus 1967, Whitehead/Perry 2020, Du Mez 2020, Balmer Politico 2014, Marsden, Noll). John 18:36 quoted verbatim ESV.

---

### When Justice Sleeps

SLUG: essays-justice-and-the-poor
VERDICT: PASS
CONFIDENCE: high
RATIONALE: The strongest essay compilation: every chapter sampled runs the full Bell architecture — steelman, reversal, law-before-grace, self-implicating verdict — and every ending I checked leaves weight, most in the first person. The scholarship is not decoration: it debunks the fake Needle's Eye gate legend rather than repeating it, and names ideas with their scholars.
EVIDENCE:
- [ch1: Charity Is Not Justice] "I am not the generous man in this story. I am the man who reaped to the edge and called the leftovers charity." — self-implication at the verdict
- [ch9: The Eye of the Needle] "The gate moved from the wall of Jerusalem into our hermeneutics. We still build it. We just build it out of exegesis now." — reversal only this register produces; the gate legend correctly called "a fabrication"
- [ch4: Individual Sin and Systemic Sin] "Not who did this. We did this. And the field is still wrong." — textbook Bell ending
NOTES: Citations verified real: Niebuhr, Moral Man and Immoral Society (1932); C.J.H. Wright, Old Testament Ethics (2004); Chrysostom, On Wealth and Poverty (Roth trans.); Keller, Counterfeit Gods (2009); Wesley's "gain/save/give all you can." Mishpat/chesed and gleaning-law exegesis accurate. Ch1 has the recurring "Let me steel-man the case... against my own argument" seam, here integrated.

---

### The Man Who Stays

SLUG: essays-manhood
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Biographically consistent and load-bearing (five sons, fatherless childhood, adult conversion from atheism), with the fatherhood essays reading as this particular man's material — endings refuse resolution and the writer stays inside every indictment. Steelmanning in ch1 is even-handed and lands Bell as broadly egalitarian, consistent with the marriage book. One garbled citation sentence and three women-focused essays misfiled into a manhood collection are editorial defects, not voice failures.
EVIDENCE:
- [ch2: Fatherhood Without a Father: Breaking the Cycle] "The real verdict comes when my sons father their sons, and I may not be here for it." — an ending that leaves weight instead of victory
- [ch18: Women and Anger: The Emotion They Weren't Allowed to Have] "I taught the lie for years without knowing it was one. That is the part I cannot take back. The least I can do now is stop." — self-implication as the close
- [ch1: Biblical Womanhood Beyond the Debate] "the late thoughtful writer scholars associated with the group Christians for Biblical Equality" — broken syntax mid-citation; reads as a generation/editing artifact and needs fixing
NOTES: Christian Smith, *Soul Searching* (2005), real. "The late... Tim Keller" correct as of 2026. Filing issue: "Biblical Womanhood," "Female Friendship," and "Women and Anger" sit inside a book sold as *The Man Who Stays*.

---

### What Marriage Actually Is

SLUG: essays-marriage-covenant-roles
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Full historical arc (agrarian household → industrial disassembly → no-fault divorce, California 1969) with real named scholarship where the idea travels with the name (Lasch's haven, Hauerwas's "you always marry the wrong person," the kephale debate with Grudem vs. Fee/Payne/Kroeger). Steelman is genuine, the author names where he lands plus the objection he has not answered, and endings leave weight ("the ones that matter rarely do" resolve). The mechanical scan-score of 27.4 is a false positive; no forbidden language found.
EVIDENCE:
- [ch1: Covenant vs. Contract: What Marriage Actually Is] "A love that cannot leave is not love. It is hostage-keeping with good lighting." — a steelman line no devotional mill produces
- [ch1: Covenant vs. Contract: What Marriage Actually Is] "The old captivity was the inability to leave. The new captivity is the inability to stay." — verdict after evidence, not summary
- [ch4: Marriage Submission Revisited: A Woman's Perspective] "We handed men half a sentence and called it the will of God." — self-implicating close that leaves weight
- [ch4: Marriage Submission Revisited: A Woman's Perspective] "The Constitution I write under requires that I name where I stand" — the platform's rulebook speaking aloud inside book prose; a generation-under-instructions fingerprint worth editing out
NOTES: Berry's *Sex, Economy, Freedom and Community* cited as Pantheon 1992 (commonly dated 1993 — verify). Hauerwas Christian Century April 19, 1978 citation is real and correct. Ch4 is titled "A Woman's Perspective" under a male byline — the text discloses it ("though I am a man writing it") but the title over-promises.

---

### After the Affair

SLUG: essays-marriage-crisis-repair
VERDICT: PASS
CONFIDENCE: medium
RATIONALE: The intro chapter is unmistakably his — pastor inside the indictment, specific texture, verdicts on hard periods — and most endings leave weight rather than resolve. Middle chapters lean on standard recovery-literature material (codependency, children of addicts) that a competent writer could assemble, but the framing and verdict sentences are voiced; crisis care is handled per the house standard. One chapter closes in devotional stock.
EVIDENCE:
- [ch1: When the Worst Has Happened] "a Bible verse swung like a splint and a quiet pressure to make it look fine by Sunday" — specificity no generic blogger produces; the surrounding "we" is the church self-implicated
- [ch11: When Divorce Is the Faithful Option] "that God is not ashamed of them. Even if the church is." — ending lands on indictment, leaves weight
- [ch7: Marriage and Mental Health] "We have been silent too long. The silence has not protected anyone. It has only made the carrying lonelier." — self-implicating close
- [ch12: When Your Spouse Doesn't Share Your Faith] "Stay. Love. Pray. And leave the results to the One who started the work" — the one comfortable, stock-devotional closing; flag for a voice pass
NOTES: Ch6 claims "Every addicted spouse I have counseled has told a version of the same story" — plausible pastoral experience, unverifiable. Two literal uses of "showing up" (step-parent attending games) sit near therapy-speak but read literal. Malachi 2:16 and Psalm 34:18 verbatim ESV with references.

---

### God and Money

SLUG: essays-money-stewardship
VERDICT: PASS
CONFIDENCE: medium
RATIONALE: Specificity and self-implication are pervasive: the fatherless financial fear in ch1, a pastor confessing his own bad stewardship preaching in ch11, "myself included" in the wealth chapters. Weber and Berry are cited with the ideas named, and multiple endings are true verdicts. Some chapters (2, 7, 12) drift to competent-generic with comfortable closings, which keeps confidence at medium.
EVIDENCE:
- [ch1: A Christian View of Personal Finance] "When you grow up watching a household do math at the kitchen table that does not work, money stops being neutral very early." — biography with texture, not gesture
- [ch1: A Christian View of Personal Finance] "Not a tool. A master, asking for your soul." — canon verdict ending
- [ch11: Tithing: Command, Principle, or Guilt Trip?] "I have preached the ten percent as though it fell from heaven with a decimal point already attached. It did not." — the writer inside the indictment
- [ch2: Contentment vs. Ambition] "This gives the ambitious Christian a test they can apply to their own striving in any given season. Who benefits if I succeed?" — application-turn machinery, the book's generic floor
NOTES: PRODUCTION BUG: chapters 13 and 14 share the identical title "What the Bible Actually Says About Money" with different bodies. Ch11 quotes Matthew 23, Malachi 3, and 2 Corinthians 9:7 in NIV wording ("spices," "floodgates of heaven") unmarked, against the ESV-default rule; ch1 tags ESV. Keller's Counterfeit Gods appears in ch1's works cited but is never used in the text. Chapters 14 and 16 end with ebook cross-sell links to /where-your-treasure-is.

---

### Parenting by Season

SLUG: essays-parenting-ages-stages
VERDICT: PASS
CONFIDENCE: high
RATIONALE: This is the five-sons book only Bell could write — "I have crossed this wilderness five times" — with confession of specific parenting failures in both sampled chapters and the secular developmental account (Piaget/Erikson) deliberately taken "under Scripture, not beside it," exactly per the platform's scholarship standard. Endings land as verdicts; the ch4 "journey" and "showing up" hits are surface blemishes on authentic prose, not evidence of a different author.
EVIDENCE:
- [ch4: Middle School] "I have crossed this wilderness five times. It never got easier, only more familiar." — biography exact and structural.
- [ch1: Parenting by Season] "I have pushed a young son to perform a faith he was years from being able to own" — self-implication with particulars, not "a man in my church once."
- [ch4: Middle School] "The desert is not a failure of the journey. The desert is the journey." — forbidden journey-as-metaphor, twice, plus one "keep showing up"; needs a scrub.
- [ch6: When Your Child Leaves the Faith] "I write this not from a safe distance but from inside the room." — the confessional posture that carries the hardest chapter.
NOTES: FACT-CHECK REQUIRED — ch6 claims first-person: "I know what it is to watch a child I raised in the church move toward a life without it," i.e., that one of Bell's own children has moved away from the faith. That must be verified with Bell before this stays in print; if untrue it is fabricated autobiography, the one unforgivable failure. Erikson's identity/moratorium material in ch4 is real; ch1 alludes to Piaget/Erikson without naming them (ideas kept, names cut — canon-consistent).

---

### Discipline That Forms the Heart

SLUG: essays-parenting-discipline-character
VERDICT: PASS
CONFIDENCE: medium
RATIONALE: Ch7 is the batch's best single essay opening — a specific, self-indicting anecdote (ninety minutes each way, four nights a week, dinners in the car) driven to a genuine verdict — and ch1's "you are in trouble and you are mine" carries the father-of-five voice. The short closing chapters thin out toward well-made devotional register, and there are small mechanical slips a voice pass should catch, but the spine is his.
EVIDENCE:
- [ch7: Sports, Activities, and the Idol of the Well-Rounded Child] "We escaped Pharaoh and rebuilt his brickyard in our own minivans, and we hung a trophy over it, and called the whole thing love." — full-arc verdict, self-implicated
- [ch1: Discipline That Forms the Heart, Not Just the Behavior] "you are in trouble and you are mine, both things are true, and the second one is permanent" — a sentence a father actually says, not a blogger
- [ch1: Discipline That Forms the Heart, Not Just the Behavior] "we should steel-man it before we set it aside" — editorial jargon leaking into reader-facing prose
- [ch9: The Discipline of the Ordinary Tuesday] "show up for the person who has stopped being interesting to love" — brushes the forbidden "showing up"; used literally, but flag it
NOTES: Ch7's "every serious study says" (family dinner) is an unnamed-studies hedge; either cite or soften. Ch1 runs a First/Second/Third/Fourth application sequence that flirts with the clean application turn, though it stays in prose.

---

### When Parenting Gets Hard

SLUG: essays-parenting-hard-places
VERDICT: PASS
CONFIDENCE: medium
RATIONALE: Ch1 (adoption) is the generic weak spot — warm, unnamed-witness, pull-quote-padded, and honest about a topic he has not lived. But the book's spine is unmistakably Bell: five sons and no daughters confessed at the top of ch8, atheism inside ch11 and ch13, the fatherless wound as ch9's center, a son who called him a hypocrite in ch14. Endings mostly refuse false comfort ("I cannot promise you your child comes home"). Needs a forbidden-word scrub, not a rewrite.
EVIDENCE:
- [ch9: Single Parenting and the Myth of the Complete Family] "When I was told that God was a father, the metaphor that was meant to comfort me instead named my wound." — a line only this biography produces
- [ch4: Homeschool, Public, Private] "I have five sons, which over the years has meant navigating this decision more than once" — forbidden word "navigate" (again as "navigated" in ch6)
- [ch1: Adoption Theology] "This requires the adoptive parent to have done their own inner work" — therapy-speak in the batch's most generic chapter
- [ch14: When Your Teenager Calls You a Hypocrite] "My son called me a hypocrite, and he was right, and it was one of the best things that ever happened to our relationship" — self-implication with a named cost
NOTES: 13 of 14 chapters run ~12.5k characters — production-uniformity tell. Ch2 opens "My father died, and I made a decision… that my sons would see me cry" and reconciles it in-text with the fatherless childhood (absent father, funeral in adulthood) — a fact-checker should confirm that timeline with Bell. Ch9 also has "as blessed as any love" (forbidden adjective use).

---

### Preaching and Leading

SLUG: essays-preaching-and-leading
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Consistently Bell across both sampled chapters and all twenty endings: self-implication before indictment, steelmans given full weight, data handled with unusual honesty (ch18 flags the disputed sampling of the survey it cites), and every essay closes on a genuine 3-to-8-word verdict rather than a summary. The recurring template beats ("law before grace," "now the reversal") show a production method, but the method is executed in his voice.
EVIDENCE:
- [ch1: Depression in the Pulpit: A Pastor's Mental Health] "I was raised without a father, and I had spent my life proving I could carry things alone, and depression is the bill that comes due for a man who has never let anyone carry him." — biography as diagnosis; no generic writer produces this
- [ch18: Why Gen Z Is Coming Back to Church] "Do not give them comfort. Give them Christ." — verdict ending that leaves weight
- [ch13: The Difference Between a Sermon and a Talk] "A talk you survive. A sermon survives you." — the Bell verdict form, exact
- [ch18: Why Gen Z Is Coming Back to Church] "That finding was later disputed over its sampling, so it is best held as a question worth asking rather than a settled trend" — scholarship integrity in-line
NOTES: Citations verified real: Spurgeon's Lectures to My Students depression passage, Lifeway 2014 mental-illness study (~one quarter of pastors), Nouwen 1972, Barth's Time interview (May 31, 1963), Bible Society's 2025 Quiet Revival, Pew RLS. Ch1's "three hundred people" congregation figure is an unverifiable biographical claim. Ch20 cites Friedman's A Failure of Nerve as 1999 while other chapters use 2007 — inconsistent edition dating.

---

### The Most Segregated Hour

SLUG: essays-race-and-the-church
VERDICT: PASS
CONFIDENCE: high
RATIONALE: The strongest essay compilation in the batch: full historical arc (1844–45 denominational splits, balconies, 1930s redlining), verified citations with the ideas named (Emerson & Smith's 80% threshold, Tisby, Thurman's grandmother, Perkins's three R's), and self-implication exactly per canon ("as a white pastor I stand inside it"). Endings leave weight rather than resolve. Only this man's platform would print "a plantation with better music."
EVIDENCE:
- [ch6: The Most Segregated Hour] "Martin Luther King Jr. said it, and we have been quoting him ever since as if quoting him were the same as repenting." — self-indicting opening, not lament recital
- [ch6: The Most Segregated Hour] "The wall is down in heaven and standing in our sanctuaries, and the hands holding it up are our own." — ending that leaves weight
- [ch1: Building the Multiethnic Church Without Faking It] "A faster church that contradicts the cross is not a success. It is a well-attended denial." — verdict after steelmanning the homogeneous unit principle
- [ch4: The Black Church] "It is, in many ways, its most faithful expression." — the one hedge ("in many ways") the house style says to delete
NOTES: All named sources check out (Divided by Faith 2000, Color of Compromise 2019, Jesus and the Disinherited 1949, Let Justice Roll Down 1976; the seven in Acts 6 do all bear Greek names). Ch1's works cited lists Jennings and DeYmaz without in-text use — citation padding.

---

### Handing On the Faith

SLUG: essays-raising-kids-in-faith
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Scholars carry ideas, not decoration (James K.A. Smith's cultural liturgies argued in full, Peterson's Sabbath, Eat This Book cited), the sons appear in specific rooms (bedtime in the dark), and ch7 is built on the sharpest self-implication in the batch — a convert who gained faith by questioning confessing he forbade his children the same questions. Endings are verdicts that leave weight, not recaps.
EVIDENCE:
- [ch1: Family Rhythms] "The repetition is the teacher. The rhythm is the catechism." — Bell rhythm, idea earned
- [ch7: Raising Kids Who Question] "I gained my faith by questioning and then tried to give my children a faith that skipped the questioning." — biography turned against the writer himself
- [ch8: Teaching Kids to Pray (Not Perform)] "The clumsy true one is the one God is in. I taught them the other kind first. I am trying, late, to teach them this one." — ending that leaves weight
NOTES: Chapters 8 and 9 substantially overlap in topic (two teaching-kids-to-pray essays); ch6 duplicates the parenting book's screens territory. "The research on family dinners is almost embarrassing in its consistency" (ch1) — real literature, unnamed. Chapters 10–11 are sub-2k devotional shorts, a format break from the rest.

---

### On Sabbath

SLUG: essays-rest-and-sabbath
VERDICT: PASS
CONFIDENCE: medium
RATIONALE: The anchor essays are unmistakably Bell — ch17 opens from his atheism, steelmans the skeptic's "rest is for people who can afford it" objection before answering, and carries Heschel, Brueggemann, Pieper, and E.P. Thompson with the ideas named; ch1's Greek-verb argument lands rather than explains. The many short devotional chapters are thinner and canon-shaped rather than canon-deep, and two of them lean on the forbidden "showing up," which keeps confidence at medium.
EVIDENCE:
- [ch17: What the Sabbath Is and Why You Need It] "I came to faith from atheism. I came in arguing." — biography load-bearing, not decorative.
- [ch1: Cast Your Anxiety on God] "The most important word in the most quoted verse about anxiety is a verb of violence, and we have turned it into a verb of feeling." — an opening only this register produces; the epiripsantes/Luke 19:35 exegesis is real.
- [ch4: Rest Is Not a Reward] "Stop trying to earn what was already given. Sit down. The work will keep. God rested, and He was not even tired." — self-implicated ("I keep getting this backward") and a verdict that lands.
- [ch10: The Habit That Outlasts the Feeling] "You show up to God on the flat gray Tuesday not because you feel His presence but because showing up is simply what you do" — forbidden therapy-speak phrase carrying the chapter's thesis; ch19 repeats it.
NOTES: Heschel 1951 (palace in time), Brueggemann 2014 (Pharaoh/brick economy), Pieper 1948, and Thompson 1967 (Past and Present 38) are all real and accurately deployed. "Showing up" appears three times (ch10 x2, ch19) and needs a scrub. Ch1 has "Here is the part nobody tells you" signposting.

---

### More Than a Role

SLUG: essays-womanhood
VERDICT: PASS
CONFIDENCE: high
RATIONALE: A male pastor writing on womanhood is high-risk material, and these essays clear it by self-implication rather than distance — he indicts his own silence in purity-culture rooms and his own unequal treatment of women's doubt ("I have been part of the machinery"). The historical arc is real and specific (Irenaeus ~180, Tertullian's caro salutis est cardo, purity culture dated mid-90s–2000s, Taylor's cross-pressure, Keller's antibodies line quoted verbatim and correctly), and endings leave weight. The scan score of 9.4 undersold nothing; this is among the strongest prose in the batch.
EVIDENCE:
- [ch1: Body Image, Purity Culture, and Healing] "I did not teach them, but I stood in rooms where they were taught and said nothing, and my silence was its own kind of teaching." — the writer inside the indictment
- [ch7: Women and Doubt: The Questions They Weren't Allowed to Ask] "It came through who got invited to the theology discussion and who was thanked for bringing the casserole." — specificity no template produces
- [ch7: Women and Doubt: The Questions They Weren't Allowed to Ask] "It was not your faith that failed. It was our courage." — weighted, self-implicating verdict
- [ch5: The Proverbs 31 Woman They Turned Into a Checklist] "Let me be the one who finally does. Eshet chayil. You mighty thing. Well done." — the one comfortable-blessing closing; a deliberate pastoral choice but softer than the canon's endings
NOTES: Keller's "A faith without some doubts is like a human body without any antibodies in it" is a real verbatim quote from *The Reason for God* (2008). Tertullian's caro salutis est cardo is real (De resurrectione carnis). Tape/gum/rose object lessons are documented purity-culture artifacts. Job 42:7, Mark 9:24, Matthew 28:17 all accurately handled.

---

### Faithful in Exile

SLUG: faithful-in-exile
VERDICT: PASS
CONFIDENCE: high
RATIONALE: The strongest book in the batch — the biography is not decoration but the argument's engine: fatherlessness explains the young atheist's refusal of the capital-F Father, the atheism explains why he never held the Christendom map, First Baptist and the PCN ("the Network") appear organically, and the sons carry the generational stakes. Self-implication runs to confession depth ("Do I want these people to follow Christ, or do I want them to defer to me?"), composites are declared, and verdicts land hard after evidence. Endings leave weight without panic or false comfort.
EVIDENCE:
- [ch1: The Map We Were Handed Is Wrong] "I wanted nothing from him because I'd learned early that fathers leave." — biography doing causal theological work; only this man writes this
- [ch9: The Pastor Without Borrowed Power] "We built ministries on borrowed authority and called it a calling. We measured ourselves by clout and named the clout anointing. I did this." — the canon's "We did this. I did this." executed exactly
- [ch2 verdict] "The day the empire stopped killing us, it started owning us." — verdict, not summary
- [ch15 verdict] "We have wept over insults and trembled at the thought of inconvenience, and we have not yet been asked to suffer anything that would have made the early church look up." — self-implicating and weighted
NOTES: Diner pastor is explicitly "a composite of a dozen real men" — honest. 1 Peter 1:1 "elect exiles of the dispersion" is verbatim ESV; Jeremiah 29:5-7, Mark 10:42-43, 1 Corinthians 2:1-5 all accurate; Taylor's immanent frame correctly rendered. Ch. 1 says "I'll talk more about what that did to me later in this book" — verify the promise is kept in an unsampled chapter. "Myself at nineteen" is a specific age claim worth a biographical check.

---

### Mishpat

SLUG: mishpat
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Prophetic-and-pastoral in the exact configured ratio: both political tribes indicted with the same instrument and the same grief (ch1 names the conservative and progressive temptations as twin thefts), self-implication from the pulpit, and verdict fields that are the strongest in the batch. Endings leave weight without exception in the sampled set.
EVIDENCE:
- [ch1: The Word at the Gate] "We did this. I have done it from a pulpit, preaching righteousness as if it meant only the soul scrubbed clean" — the canonical self-implication move, verbatim shape.
- [ch1: The Word at the Gate] "Not a theory. A widow. Not later. At the gate." — an ending of pure Bell rhythm.
- [ch4: The Economy God Commanded] verdict field: "Charity keeps the gate. Justice asks who built it." — could not have come from a devotional mill.
- [ch6: The Wall Torn Down] "He killed the hostility. We keep resurrecting it. The wall is down. We just keep standing where it used to be." — verdict after evidence, we-not-they.
NOTES: One mislabel to fix: ch1 calls Nicholas Wolterstorff "The Old Testament scholar" — he is a philosopher (Yale); the idea attributed to him (justice read through Greek eyes as inner harmony vs. Hebrew right-relationship) is genuinely his, but the label is wrong. Ephesians 2:14 quoted verbatim ESV. King's "most segregated hour" line handled accurately ("put the line into the air," not claimed as origination).

---

### Necessary Words

SLUG: necessary-words
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Relentlessly self-implicated — the confessional anecdotes carry particulars and real cost (the small-group leader he waited a year on, the staff-member fight he escalated), and the biography is explicit and correct (atheism, fatherlessness, and how fatherlessness built the conflict-avoider). Verdict fields are true aphoristic verdicts and endings carry weight, though several close on imperative sends ("Say it." "Start it.") that resolve slightly more than his best endings do. Two production notes below, neither a voice failure.
EVIDENCE:
- [ch1: The Sin of the Kind Coward] "I came to faith out of atheism as a grown man, and I was raised without a father in the house." — the biography stated plainly and put to work, not decoration.
- [ch1: The Sin of the Kind Coward] verdict field: "Silence is not mercy. It is abandonment with good manners." — the book's thesis as a Bell verdict.
- [ch1: The Sin of the Kind Coward] "I was not patient. I was afraid, and I had given my fear a nicer name." — confession with a named cost (two people left the church).
- [ch9: The Non-Anxious Presence] "The lesson was brutal and clarifying: I cannot bring to a conversation a calm I do not actually possess." — Friedman's idea named, tested, then taken past Friedman to the gospel, per the platform's method.
NOTES: Scripture is quoted in KJV throughout (Proverbs 27:6, Proverbs 29:25, John 14:27, Isaiah 26:3) with no translation marked — house standard is ESV by default; flag for an edit decision. Frequent "Let me tell you / Let me get concrete / here's what makes this" signposting is a tic an edit pass should thin. Bonhoeffer hanged at Flossenbürg April 1945 — correct. Friedman's "non-anxious presence" — correctly his.

---

### One Body, Many Churches

SLUG: one-body-many-churches
VERDICT: PASS
CONFIDENCE: high
RATIONALE: The most biographically anchored book in the batch — FBC Fenton named, PCN's founding told as repentance rather than strategy, the atheist years and the fatherless childhood both made load-bearing for why unity is his wound — and the canonical self-implication move appears verbatim. Deductions are stylistic, not authorial: chapters run long with some redundancy seams, and several verdict fields drift toward semicolon-joined summaries rather than short verdicts.
EVIDENCE:
- [ch1: The Prayer He Prayed Last] "The divisions of the church kept me an atheist longer than any book by any skeptic ever did." — only this man's testimony produces this argument
- [ch1: The Prayer He Prayed Last] "We did this. I did this." — the canon's signature move, used honestly after evidence
- [ch15: The Pastor Across Town] "I did not build it because I had figured something out. I built it because I got tired of being the competitive man I have just described" — PCN origin as confession
- [ch4: The Body and Its Parts] "A church that wants every member to be identical does not want a body; it wants a corpse." — verdict field with real teeth
NOTES: Cyprian (mid-third century), Ignatius of Antioch's unity letters en route to martyrdom, and Bonhoeffer's Life Together "dream of community" material are all real and offered as paraphrase. Ch15's rival-pastor coffee anecdote is nameless but carries particulars; ch1's deathbed framing claims "I have sat at enough deathbeds now" — consistent with a ~12-year pastorate.

---

### Preach the Word

SLUG: preach-the-word
VERDICT: PASS
CONFIDENCE: high
RATIONALE: The first-sermon confession, PCN mentoring, five sons, and "I am inside this indictment. I have preached myself." make this unmistakably the platform's man; ch10's critique of performed humility even implicates its own self-implication, the most Bell-like move available. Citations are real with the idea named (Stott's bridge, Lloyd-Jones's "theology coming through a man who is on fire," Augustine's *On Christian Doctrine* Book 4). Endings land on judgment, not comfort.
EVIDENCE:
- [ch1: The Command Beneath the Office] "I am ashamed to tell you that I barely thought about the text at all until I had already decided what I wanted the night to feel like." — confession with particulars, not posture
- [ch10: Against the Performance of the Self] "it reveals that even my repentance can be conscripted into the service of my reputation" — self-implication turned on itself
- [ch1: The Command Beneath the Office] "I charge thee therefore before God, and the Lord Jesus Christ, who shall judge the quick and the dead" — KJV quoted without naming the translation; house standard is ESV-by-default
NOTES: Scripture in this book runs KJV unlabeled (2 Tim 4:1–3; the 1 Cor 2 paraphrase in KJV diction) — a consistency slip against the ESV-default rule, though plausible for a Baptist pastor quoting from memory. Spurgeon "trembled lest he preach himself" is offered as paraphrase, not verbatim — acceptable but unverifiable as stated.

---

### Sent Into the City

SLUG: sent-into-the-city
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Both sampled chapters keep the writer inside the indictment with concrete particulars ("I built the program. I named the coordinator. I printed the brochure") and the atheism biography surfaces with texture; composites are honestly declared rather than passed off as fact. Newbigin's hermeneutic-of-the-gospel and Luther's milkmaid are cited with the idea, and the endings leave weight. The main blemish is a verdict-aphorism formula ("A church that will not X has not Y") repeated across roughly a third of the 23 chapters, plus sermonic signposting ("Let me get practical").
EVIDENCE:
- [ch1: The God Who Sends] "We took the fire of a sending God and we put it behind glass, where it could warm up the lobby and burn nobody." — a sentence no generic blogger writes
- [ch12: Sent Into Your Work] "I preached the second message for years without meaning to. The structure preached it for me." — self-implicating verdict
- [ch19 verdict] "A church that will not pray for its city by name has not yet decided to love it." — one instance of the repeating verdict mold; fine alone, a tic at scale
NOTES: Ch. 1 claims "The Reformed tradition I stand in" — verify against Bell's actual theological self-identification (he pastors First Baptist of Fenton; Reformed Baptist is possible but this is a checkable biographical claim). Luther "God milks the cows through the milkmaid" and Newbigin "the congregation is the hermeneutic of the gospel" are both real; Matthew 28:19 participle grammar is correct. Ch. 1 anecdote ("a man in my church, I will not give you details") is anonymized but textured; ch. 12's nurse is explicitly flagged as "a composite of a dozen good men and women" — the anti-fabrication discipline done right.

---

### The Captive Church

SLUG: the-captive-church
VERDICT: PASS
CONFIDENCE: high
RATIONALE: This is the platform's own DNA — the wilderness temptation carried through Constantine, 1933, and the reader's own election season, with the writer inside the indictment from the first chapter and both tribes cut with the same instrument (ch8's one-standard test is Amos, correctly used). Every verdict field is a true verdict that leaves weight; paraphrased Scripture is explicitly marked as paraphrase; zero forbidden-language hits.
EVIDENCE:
- [ch1: The Temptation in the Wilderness] "I came to faith out of atheism into a Christianity already fused with a flag, and the first thing the fusion taught me was that the kingdom advances when our side wins." — atheism-to-faith biography bearing the argument's weight
- [ch3: The Church and the Empire] "The empire stopped killing the church and started something worse. It married her." — verdict field, and it lands
- [ch5: Cultural Captivity] "I am not standing on the shore pointing at the swimmers. I am wet." — self-implication as structure, not gesture
NOTES: Ch5 opens with the sons/phones/father's-absence passage recycled nearly verbatim from When Faith Falls Apart ch1 ("My sons can tell the difference between two phones I cannot see a difference between") — his move, but stamped twice across the library; a reader who buys both books will notice. Smith's cultural liturgies and Taylor's immanent frame are named as ideas, correctly.

---

### The First Flock

SLUG: the-first-flock
VERDICT: PASS
CONFIDENCE: high
RATIONALE: The most credible book in the batch and the one only this man could write: the atheist-outsider origin is deployed as an argument ("I noticed it as a stranger before I ever suffered it as a shepherd"), the pastoral self-implication is constant and costly, and all 17 verdict fields are true verdicts. It even refuses, on stated principle, to use his wife's story — a specificity-of-restraint no generic writer performs.
EVIDENCE:
- [ch1: The Man You Are Consuming] "You are not loving your pastor. You are spending him." — the book's verdict, stated plainly after evidence
- [ch1: The Man You Are Consuming] "congratulating myself on the very exhaustion that was, in plain fact, a sin against my wife" — self-implication with real cost
- [ch4: The Woman Who Married a Man and Got a Movement] "a hostage with a casserole" — a line with a fingerprint
- [ch4: The Woman Who Married a Man and Got a Movement] "I will not tell my wife's story. It is hers, not mine" — biographical restraint consistent with the man
NOTES: "Through the network and across the years" (ch4) reads as a PCN reference — consistent with biography. Baxter (Kidderminster, "take heed to yourselves," dying-man-to-dying-men) and Peterson (pastors as shopkeepers) are real and cited with the idea named. 2 Cor 12:15 and 1 Cor 12:21 verbatim with references. No fabrication detected.

---

### The God Who Is Not Nice

SLUG: the-god-who-is-not-nice
VERDICT: PASS
CONFIDENCE: high
RATIONALE: The best prose in the batch and the fullest realization of the canon: the atheist-witness material could come from no one else, the pastor-who-preached-the-nice-god confession runs through every chapter, all twelve verdict fields are 3–10-word verdicts that leave weight, and every dated citation checks out (Otto 1917, Tozer 1961, Rieff 1966, Smith & Denton 2005). Safe to sell — after one continuity repair.
EVIDENCE:
- [ch1: The God We Would Prefer] "People do not abandon their honest conclusions for a scented candle." — the skeptic-credibility argument only a converted atheist can make
- [ch7: What the Small God Costs] "He is an amputation that we have learned to call a graduation" — verdict-grade compression
- [ch11: The Pastor Who Preached Him] verdict field: "The rooms were full. That was the problem." — canon-perfect
- [ch7: What the Small God Costs] "I told you in the first chapter about a man in my congregation" — FALSE cross-reference: ch1 contains no such story; the grieving-father account first appears here
NOTES: PAID-READER FLAG: the broken ch1 cross-reference above (ch11 refers back to the same man consistently with ch7, so the fix is rewording ch7's claim, not adding to ch1). Ch7's MTD "they did not rebel, they completed it" echoes Kenda Creasy Dean's Almost Christian thesis unattributed. Ch6's "the only person in the Gospels he ever addressed by that name" (Daughter, Mark 5:34) is defensible but worth a verify.

---

### The Hidden Life of a Pastor

SLUG: the-hidden-life-of-a-pastor
VERDICT: PASS
CONFIDENCE: high
RATIONALE: The strongest book in the batch and the lowest scan score, deservedly: sustained self-implication ("I am writing this from inside the struggle, not above it"), biography converted into mechanism rather than anecdote, and specific, painful detail no content mill invents — the son who stopped bringing his father things. Every verdict field is a weight-leaving verdict; forbidden scan is clean (the only "Foster" is Richard Foster).
EVIDENCE:
- [ch1: The Two Lives of a Pastor] "Add to that a boyhood without a father, and you get a man who learned early that you earn your standing. You make yourself useful. You become necessary, because necessary people do not get left." — fatherlessness wired to the approval engine; unmistakably this man
- [ch9: The Home That the Ministry Forgot] "watching one of my sons stop bringing me things, stop telling me about his day, stop showing me what he had made" — the particular, costly detail generic writing never risks
- [ch9: The Home That the Ministry Forgot] "He asked Abraham to put the knife down" — Genesis 22 turned into a verdict on ministry idolatry
- [ch11 verdict field] "Burnout is the body telling the truth the soul has been refusing to say." — verdict, not summary
NOTES: Scripture throughout is quoted in NIV wording without naming the translation (Mark 1:35 "went off to a solitary place"; 1 Timothy 3:2 "faithful to his wife"; Mark 8:36 "forfeit their soul") — the platform standard is ESV by default, so this book breaks the house Scripture rule even though the quotes themselves are accurate NIV. Peterson's "shopkeepers" and Bonhoeffer's alone/community warning are real.

---

### The Pruning

SLUG: the-pruning
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Strongest book in the batch. The grandfather-at-the-grapevines anecdote has dialect and particulars, the numbers are real (nones ~6% to ~30%, Putnam, Brueggemann on exile, 587 BC), the self-implication is the literal canon move, and the seventeen verdict fields are true verdicts ("We do not get the spring. We get the staying."). Endings hold the reader in the uncertain middle rather than resolving it.
EVIDENCE:
- [ch1: The Knife and the Grave] "He said, \"If I don't cut 'em, they spend everything on leaves.\"" — a remembered voice with texture, the opposite of a generic anecdote
- [ch1: The Knife and the Grave] "We did this to ourselves. I did this." — the CLAUDE.md self-implication pattern, executed
- [ch9: The Sin of Nostalgia] "They remembered the menu and forgot the whips." — a 3–8 word verdict after evidence
- [ch9: The Sin of Nostalgia] "It is nostalgia for my own significance, dressed up as concern for the kingdom." — writer inside the indictment
NOTES: The grandfather is a biographical particular not in the known bio (plausible for a fatherless childhood; confirm with Bell). Ch1 has light drafting redundancy — the grandfather and the "imagination dies first" material are each introduced twice.

---

### The Undershepherd

SLUG: the-undershepherd
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Fully in register: the atheist-outsider origin does structural work in ch1 (the latecomer who cannot mistake the host's house for his own), ch14 runs on the raised-without-a-father and five-sons biography with brutal self-implication, and Gregory the Great (c. 590), Calvin, and Peterson are carried with their ideas named. All nineteen verdict fields are hard, 3–15-word judgments that leave weight — none resolves comfortably.
EVIDENCE:
- [ch1: The Borrowed Staff] "I was a latecomer to a table I had spent years mocking from the outside" — the atheism biography made into the book's governing argument about ownership.
- [ch14: The House Before the Flock] "The church got the shepherd. My house got the absence." — self-implication naming his own failure, not other men's.
- [ch1: The Borrowed Staff] "And one day, He is going to ask for it back." — ending that leaves weight; matched by the verdict field "You hold a staff you did not carve, over sheep you did not buy."
NOTES: Gregory the Great's reluctant elevation ~590 and Pastoral Rule, Augustine's forced ordination, Calvin's ministers-as-instruments, and Peterson's anti-management theme are all real and accurately characterized. Single "journey" hit (ch8) is near-literal Psalm 23 valley-walk usage. The "pastor forced out after two decades" anecdote is unnamed but textured; harmless.

---

### The Undivided Life

SLUG: the-undivided-life
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Both sampled chapters put the writer inside the indictment with his actual biography doing causal work — atheism in ch. 1, fatherlessness in ch. 7 — and scholars are cited with the idea named (Bellah's private vocabulary, Taylor's buffered self, Heschel's palace in time, Kuyper's square inch, Brueggemann's Sabbath resistance). Chapter verdicts land as verdicts, not summaries, and endings leave weight. The scan score of 27.1 is a false positive.
EVIDENCE:
- [ch7: The Refusal to Rest] "A man raised without a father learns early that he must produce his own worth, that no one will hand him a name, and that wound does not heal because you got saved. It just learns to speak Christian." — only this man's biography produces this sentence
- [ch1: The Man in the Boxes] "I have been that man. I came to faith from atheism, which means I arrived with the convert's certainty that everything had changed" — self-implication before diagnosis
- [ch1 verdict] "Jesus does not want a room in your life. He bought the house." — verdict, not summary
- [ch7: The Refusal to Rest] "You decide in advance, because you will never feel like it in the moment" — the "How to Stop" section drifts toward an application turn; minor
NOTES: Kuyper 1880 "not one square inch" (Free University inaugural), Bellah 1985 *Habits of the Heart*, Heschel *The Sabbath*, Brueggemann *Sabbath as Resistance*, Leviticus 25:21 three-years-produce — all real. Nothing smells invented.

---

### The Unfinished Church

SLUG: the-unfinished-church
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Named ground (First Baptist in Fenton, fifteen years), confessions with real cost (the man he let walk out, offering numbers beside the roof estimate, rewriting other people's prayers in his head), Augustine's dates exact (410 sack, died 430 under Vandal siege), and the political chapter holds the both-sides guardrail while implicating the writer first. Verdict fields run longer than the 3–8-word canon but still land as verdicts.
EVIDENCE:
- [ch1: A Building Still Rising] "There was a man in this church I let walk out the door because I was too proud to make the first phone call" — specific, costly self-implication
- [ch9: A Kingdom Not of This World] "We had let the kingdom of God get small enough to fit inside a yard sign." — verdict from a scene with texture (two communicants red-faced in his own lobby)
- [ch5: The Sin of Nostalgia] verdict field: "Nostalgia is unbelief wearing the costume of reverence." — canon verdict
- [ch1: A Building Still Rising] "The woman who taught me the catechism is gone." — sits oddly against a settled-atheist adult conversion (and a Baptist context); verify
NOTES: Scripture repeatedly quoted in unmarked KJV ("the building fitly framed together groweth," "then would my servants fight," "Get thee hence, Satan") against the ESV-default rule — reads as deliberate archaic register but should be marked or standardized. Ch9's plague-nursing growth argument is Rodney Stark's (Rise of Christianity), unnamed — "the historians noticed" is the vague-authority pattern the scholarship standard forbids. All 17 chapters run ~19–22k characters, a production-uniformity tell.

---

### To the Ends of the Earth

SLUG: to-the-ends-of-the-earth
VERDICT: PASS
CONFIDENCE: high
RATIONALE: Deeply specific to this man: Fenton, Michigan named twice, the Pastors Connection Network named as his founding ("taught me this slowly and at my own expense"), five sons invoked where the cost of sending stops being theoretical, and the canon's signature "We did this. I did this." appears verbatim. Ch5 dismantles the short-term mission trip with a steelman, self-indictment, and verdicts that cost the reader something; endings leave weight throughout.
EVIDENCE:
- [ch1: The Last Words Were a Map] "We did this. I did this. I built a church that could go for years measuring its health by its parking lot" — the exact canonical self-implication move, aimed at his own congregation.
- [ch6: Partnership Is Not Patronage] "The Pastors Connection Network, which I founded, taught me this slowly and at my own expense" — organizational biography carrying the argument.
- [ch5: The Trip That Humbled Me] verdict field: "If your mission trip changed you more than it changed them, stop pretending you went to give." — a verdict, not a summary.
NOTES: John 9:25 is quoted in ch1 as "One thing I do know. I was blind but now I see!" — that is NIV wording (ESV reads "though I was blind, now I see"), and the translation is not named; platform default is ESV with translation named when it does work. Ch14's "The mission has a church" reworks a circulating missional formulation (Newbigin/Moltmann/Bosch lineage) without attribution — defensible as common coin, worth an editorial look. Newbigin's biography (four decades in South India, 1970s return to England) is accurate.

---

*Method note: seven parallel readers (batches assigned round-robin by scan
rank), each instructed to quote only verbatim text and to lower confidence
rather than invent evidence. Tier 1 scanner and full per-book metrics live in
the session scratchpad (`book-voice-scan.mjs`, `book-voice-scan.json`);
promote the scanner to `scripts/` if this audit is to be re-run after
rewrites.*
