# Learning and formation review

Lens: learning scientist and theological educator. Does the site actually teach and form (symptom, cause, wisdom)? How does it sequence material and build paths? Does it ask for retrieval and reflection? How does it scaffold a beginner differently from a pastor? How are doctrine and history taught? Would a reader grow over twelve weeks here?

Read: `CLAUDE.md` (the brand contract, the Formation Standard, the Scholarship Standard, the audience ranking), `docs/work/design/critique/INVENTORY.md`, every `-phone-first.png` in `docs/work/design/shots/current/`, and full-page phone and desktop shots (sliced into strips so the text could be read) for `/`, `/study`, `/study/bible`, `/study/bible/john/1`, `/writing`, `/writing/strongman-theology`, `/theology/history`, `/theology/history/the-apostolic-age`, `/resources/creeds/nicene-creed`, `/resources/context/honor-shame-vs-guilt`, `/tools`, `/tools/test-the-case`, `/tools/which-lens`, `/tools/deep-bible`, `/family/tonight`, `/resources`, `/help` and `/search?q=grace`. To confirm what the screens could not show, I read: the John 1 note data (`client/public/bible/notes/john/1.json`), `client/src/pages/study-bible/ChapterNotes.tsx`, `client/src/pages/StudyBibleStory.tsx` and `client/public/bible/story.json`, the plan data (`client/public/plans/skeptic.json`, `new-believer.json`), `client/src/lib/skepticTrack.ts`, `client/src/lib/shelf.json`, `client/src/pages/history/HistoryEssay.tsx` and the era essay data, `client/src/pages/tools/TestTheCase.tsx`, `client/src/pages/TheologyQuiz.tsx` with the quiz procedures in `api/index.ts`, and the search sources in `client/src/lib/catalog.ts` and `client/src/lib/siteSearch.ts`.

Capture caveats that bear on this lens: every page was a cold first visit with empty browser storage, so the site's progress features (Mark as read, "Continue the story", plan weeks walked, My Library) appear in their empty state; I judged them from the code as well as the screens. Interactive tools were photographed in their opening state only. `search.global` was stubbed to null.

Other panel reports overlap at the edges: `ia.md` covers the menu, duplication and search as structure (its C2 to C5 and M8). I cross-reference those rather than repeat them; the findings below are about what a learner experiences and what would make him grow.

## Verdict

LiveWell already owns the raw material of a serious school. It has notes on all 1,189 chapters, with Observe, Interpret and Apply questions written for each one. It has 22 church-history essays, phrase-by-phrase notes on the creeds, 29 eight-week plans that each set a weekly practice and a reflection, a 72-week family devotion cycle tied to a 76-question catechism, and an argument tool (Test the Case) that already teaches the way a good tutor does. What it lacks is a teacher. Nothing on the site tells a reader what to learn first, second and twelfth. Nothing asks an adult to recall anything a week later. The paths that do exist (the Story path, the skeptic and new-believer plans, the Family year) are buried at the foot of a chapter or filed under crisis care. And the subject the home page promises first, following Jesus in post-Christian America, has one essay on its shelf and no course at all.

Run the twelve-week test. A curious adult arrives on a Monday and comes back once a week. By week twelve he has read a few dozen chapters, starting from Genesis 1, the Study Bible's only "Start here." He has opened none of the thirteen collapsed note sections and answered no question. He has met Nicaea, the Trinity and the American church as unconnected pages under three different menus. He is better informed. He is not formed. His children, doing the Tuesday devotion at the table, are formed: they read, talk, ask, do, recite one catechism answer a week, and tick "We did this tonight." The children's room is the only part of the site built on how people actually learn.

The redesign should give the adults the same: one spine, a weekly rhythm, a question before reading and a question after, and the history and doctrine wired into the passage in front of them. All of it should be done in the site's own register, a ruled notebook rather than a game.

## Findings, page by page

### Critical

#### C1. `/`, `/study`, `/study/bible`: a catalogue where a course should be (the twelve-week test fails)

**Where.** Home's "Where to begin" offers three equal doors: Study the Bible, Read the essays, The books. `/study` lists seventeen destinations at equal weight, from "Notes on all 1,189 chapters" to "The witnesses who would not be captured." `/study/bible` adds four more doors and 66 book cards of identical size.

**What is wrong.** Every learning page is a shelf, and none is a syllabus. A reader has to pass three different "start heres" before he reaches a verse: the menu's "Start here: study the Bible" goes to `/study`, which says "Start with the Study Bible," whose first card says "START HERE The Story of the Bible," and that is a path through all 1,189 chapters (see M2). No page says "this week, do this; next week, this." No page estimates a sitting's length. Nothing interleaves the Bible, doctrine, history and the post-Christian question that the home page says belong together.

**Why it costs the reader.** A novice cannot sequence a field he does not yet know. Choosing well from seventeen doors takes the very expertise he came to get. The pastor will browse happily. The skeptic and the seeker, the first and fourth audiences, open two pages and leave. Without a sequence there is also no interleaving, and interleaving is the site's whole claim: that theology carries the weight of a Tuesday. The Formation Standard asks every serious piece to move from symptom to cause to wisdom. The study area as a whole stops at cause. It is a reference library, and a reference library informs without forming.

**The world-class version.** Look at a BibleProject Classroom course, or a Coursera syllabus rendered with the dignity of a book's table of contents. Make one page called "Twelve Weeks" (or "The Course") with a sitting of thirty to forty minutes each week. Each sitting holds a passage set in the Study Bible, the era essay that passage belongs to, the creed line it grounds, one essay that carries it into 2026, one question to write an answer to, and one recall question from last week. Offer the same twelve weeks at three depths (see M7). Home's first study door becomes "Begin the twelve weeks." For a returning reader it becomes "Week 4: Exile and the empire" (see M9). Nearly everything this needs already exists in the repo. What is missing is the order.

#### C2. `/resources` ("Help in a hard season") and `/plans`: the two best curricula on the site are filed as crisis care

**Where.** On `/resources`, under the heading "Help in a hard season," between the chips "Grief" and "A marriage under strain," sit "The curious skeptic" and "The new believer." Home, `/study` and `/writing` link to neither.

**What is wrong.** "Eight Weeks of Reading Like an Adult" (`client/public/plans/skeptic.json`) is a carefully sequenced course for the reader the site ranks first. Week 1 reads Mark as literature. Week 2 puts the Bible in its real world. Week 3 puts "the violence and the slavery, on the table" through the hard questions in the Deuteronomy 20 and Exodus 21 notes. Week 4 asks whether the Gospels got Jesus right. Week 5 takes on miracles and Hume. Week 7 sets the Apostles' Creed against the caricature. Week 8 ends on 1 Corinthians 15. "Eight Weeks of Beginnings" does the same for a new believer: what just happened, Mark a chapter a day, the Lord's Prayer, a church and baptism, the old self, doubt, telling one friend, and a rule small enough to keep. A `reading-the-bible` plan sits in the same folder. Each plan already has exactly the structure the Study section lacks: focus, why, practice, read, tool, reflection, and a progress record ("3 of 8 weeks walked" in My Library).

**Why it costs the reader.** The placement tells the skeptic his questions are a pathology, filed beside addiction and grief. The new believer, the person most in need of a first step, never finds the on-ramp built for him. And the site's best scaffold is invisible to the people the Study section is failing.

**The world-class version.** Alpha puts its course for the curious at the front door, and YouVersion files its plans by stage as well as by need. Put a three-way choice at the top of the study entry, worded the way `/help` already words its router: "I'm not sure I believe this" leads to the skeptic eight weeks, "I'm new to the faith" leads to Beginnings, and "I've read it for years" leads to the twelve-week spine at the deeper setting. Keep the care plans under Find Help, where they belong.

#### C3. Home H1 and `/writing` "After Christendom": the site's thesis has no course

**Where.** The home H1 is "Learning to follow Jesus — and live well — in post-Christian America." On `/writing`, the section "After Christendom" holds one essay ("When the Church Married Empire"). "The Rise of the Nones" answers with "James is revising this essay." Of the 678 rows in the static library, five carry the `after-christendom` pillar. The era essay "After Christendom" ("The era the reader is standing in") lives inside `/theology/history` and is not linked from the essay shelf.

**What is wrong.** The site never defines the term it leads with, never teaches how we got here as a connected story, and never puts the biblical frame (exile) beside the history. The pieces exist but are scattered. The era essays "The Constantinian Turn," "The American Experiment," "The Attractional Era" and "After Christendom" are in history. Daniel ("Faithfulness when the empire demands your worship") is in the Deep Bible tool. 1 Peter, written to "scattered believers in Asia Minor who were suffering as outsiders for the name of Christ," is in the Study Bible. Which Lens Has You? is in tools. The honor-and-shame guide is in context.

**Why it costs the reader.** A reader who came for the headline cannot learn it. A concept that is never named and bounded cannot be recalled, tested or applied to a room the site never mentioned, which is the fourth question of the Formation Test. He gets four essays on Christian nationalism instead (the Faith and Power section). They are good, but they are one symptom, not the condition.

**The world-class version.** Treat it the way BibleProject treats a theme (one framing piece, then the passages, then the history) or the way an Oxford Very Short Introduction treats a subject. Build six sittings from what already exists:

1. What "post-Christian" means and does not mean, including a steelman of "America was never Christian."
2. How we got here: the four era essays above, read in order.
3. The biblical frame of exile, using Jeremiah 29, Daniel 1 to 6 and 1 Peter in the Study Bible.
4. The lenses we read through: Which Lens Has You?
5. How the early church lived without power: the Apostolic Age and Martyrs essays.
6. A rule of life for this place: the Rule of Life Builder.

Each sitting ends with one question. (`ia.md` C2 finds that this subject has no home; this finding is that it has no lesson plan.)

#### C4. Every adult study page: nothing ever asks the reader to remember anything

**Where.** Chapter pages, era essays, the creed, the context guides and the essays.

**What is wrong.** None of these pages asks a recall question. None says "last time you read...". Nothing returns to a passage a week later. The only memory devices for adults sit off to the side: Scripture Memory (40 verses, its own tool, not linked from any chapter) and the Family catechism, which reaches adults only through the "Remember" block of a children's devotion. "Mark John 1 as read" records exposure, not learning. The one instrument called a quiz does not test knowledge at all (M3).

**Why it costs the reader.** Retrieval practice and spacing are the two most robust findings in the science of learning. Roediger and Karpicke (2006) showed that taking a test improves long-term retention more than restudying. Cepeda and colleagues (2006) reviewed the spacing effect across hundreds of studies. Brown, Roediger and McDaniel's *Make It Stick* (2014) puts both into plain language. Reading without retrieval also produces the fluency illusion: the page felt clear, so the reader believes he knows it. Twelve weeks of unretrieved reading leaves a reader who remembers the feeling of having understood Nicaea and cannot say what homoousios answered.

**The world-class version.** The New City Catechism app pairs every question with an answer, a short commentary, a prayer and a memorize mode. Anki spaces review. Both should be borrowed in the site's own register: no scores and no streak flames, just a quiet question in the margin. At the top of a chapter, ask one "Before you read" question from the chapter last marked read ("Last time: what three things did John the Baptist say he was not?"), answered privately with a tap to reveal. At the foot of each era essay, add three "Can you say it back?" prompts. On the creed, add a line-by-line memorize mode using the first-letter technique the Scripture Memory tool already has. `/family`'s "Remember" block is the pattern. Adults need their own.

Note the line the brand draws: the Formation Standard forbids "the clean application turn (the four-step takeaway box)." Recall prompts and open questions are not takeaway boxes. A takeaway box tells the reader what to think. A recall prompt asks him to find out whether he did.

### Major

#### M1. `/study/bible/john/1`: the study method is upside down

**Where.** The chapter page is 11,264px tall at phone width, 13.3 screens. Under the text sit fourteen note sections. Only "Where we are in the story" is open. The other thirteen are collapsed: the historical setting, the world behind the text, how the chapter is built, what it teaches, key Greek words, verse by verse, what it shows of Christ, how it has been read, the text and translations, two hard questions, for teaching and preaching, and questions for study or a group.

**What is wrong.** The chapter's best teaching device comes last. Its Observe, Interpret and Apply questions are in the fourteenth section, collapsed, after "For teaching and preaching." They are excellent: "List every title given to Jesus in this chapter and who gives it. Which one does Jesus give himself?"; "Verse 18 says no one has ever seen God, yet the Son has made him known. How does this answer Moses' request in Exodus 33:18?" The "This chapter at a glance" outline (1–5 The Word in the beginning, 6–8 John, a witness to the Light, through 43–51 Philip and Nathanael) is the best advance organizer on the page, but it renders only in the desktop side panel (`OutlinePanel`). On a phone, where most readers are, it is absent. The page has nowhere to write an answer, so its only act is "Mark John 1 as read." A beginner who does not know what "How it has been read" means will not open it, so the notes stay unread.

**Why it costs the reader.** Questions asked before reading direct attention and improve what is learned from the text. This is the pretesting effect (Richland, Kornell and Kao, 2009). Writing an answer beats recognizing one, which is the generation effect. An outline given before a long text lets a novice hold its parts. The page has all three resources and serves none of them at the moment they would work.

**The world-class version.** Logos Bible Software's study workflows walk observe, interpret and apply in order, with the reader's own notes saved beside the passage. Precept's inductive method does the same on paper. ESV.org sets notes beside the text instead of below it. On a phone, the order should be:

1. The summary.
2. The outline, as "John 1 in eight movements."
3. The three Observe questions, as "Read with these in mind."
4. The text.
5. The Interpret and Apply questions, each with a private notes field kept on the device (as the Worry Journal already does).
6. The notes, opened according to the reader's depth setting (M7).

"Mark as read" becomes "I've answered these," which is something worth recording.

#### M2. `/study/bible` "Start here" to `/study/bible/story`: the first lesson is Genesis 1 of 1,189, unpaced, against James's own plans

**Where.** The Story of the Bible's call to action reads "Start at the beginning" and opens Genesis 1. Its counter reads "x of 1,189 chapters read in this browser." The path runs through eleven acts (`client/public/bible/story.json`).

**What is wrong.** The path has no pace and no finish line a person could plan around: at one chapter a day it takes three and a quarter years. A first-time reader following it reaches Leviticus around week ten. Meanwhile both of the site's own beginner plans, the skeptic's and the new believer's, start with Mark. Two halves of the same site teach two contradictory first steps.

**Why it costs the reader.** Goals that are close and concrete sustain effort, and goals that are distant and vague do not. The "Before this in the story / Next in the story" links at the foot of each chapter are a real achievement, a canonical story order with a memory. But they are attached to a task too large to begin.

**The world-class version.** YouVersion plans and BibleProject's Read Scripture plan give a fixed pace, a day count and an end date. M'Cheyne's calendar gives a daily shape. Offer three entries on the Story page:

- "The Gospel first": Mark, 16 days, matching the plans.
- "The story in twelve weeks": the key chapters of each act, about seven a week. This is the Bible strand of C1's spine.
- "Every chapter": all 1,189, about three years at one a day, or a year at three or four a day.

#### M3. `/tools/theology-quiz`: the only "quiz" tests disposition, not knowledge

**Where.** `/tools` lists it under Scripture and Theology: "Ten questions across doctrine, church history, and the biblical storyline. About four minutes. Find out where your foundations are solid and where the gaps are."

**What is wrong.** The ten questions (`THEOLOGY_QUIZ_QUESTIONS` in `api/index.ts`) are opinion items with no right answers. Examples: "How do you approach biblical interpretation?" and "How should the church engage politics?", whose options include "Partner with one political movement." Each answer is scored into the retired three-pillar taxonomy (Theological Depth, Prophetic Disruption, Integrated Life) and reported as "/30." The options use "authentic" three times ("Finding authentic Christian community," "Freedom to live authentically," "Community and authentic relationships"), and that word is on the forbidden list. The recommendations filter essays on those legacy pillar labels. The static library no longer uses those labels (its pillar values are `theology`, `doubt`, `american-church` and so on), and the results are not checked against the 15-essay public shelf. So the "Recommended Reading For You" list is either empty or points at essays that may be off the shelf. I could not verify which in production.

**Why it costs the reader.** The one tool named as an assessment teaches nothing, tells the reader nothing true about his knowledge, and sorts him into a tribe-shaped bucket. That is the "certainty trade" and "flattery loop" the Formation Standard refuses.

**The world-class version.** Khan Academy's course challenge is the model: a short set of questions with real answers, each wrong answer pointing to the exact page that teaches it. Write twelve questions keyed to the twelve-week spine. For example: "What single Greek word did Nicaea use against Arius, and what does it claim?"; "Which act of the story is the exile?"; "What did a first-century reader hear in 'Jesus is Lord'?" Offer them at week 0 and week 12, so the reader sees his own growth. Retire the current quiz, or rename it honestly as a "Where are you drawn?" reflection and rebuild it on the current shelf.

#### M4. Doctrine (`/study/bible/doctrines`, `/theology/doctrine/*`, the two glossaries, the catechism, `/resources/creeds/nicene-creed`): taught in five places, sequenced in none

**Where.** A learner meets the Trinity as:

- the Study Bible doctrine "The Trinity" (one of 62);
- `/theology/doctrine/god-and-trinity`, which `/theology/history` links as "See where the creeds came from";
- the "What Is the Trinity? One God in Three Persons" card under John 1;
- the Nicene Creed's notes;
- a catechism question;
- the devotion "Three And Yet One."

`/search?q=grace` returns "Grace and Works," then patronage, then "How Do You Discipline Children With Grace?" The catechism's "What is grace?" comes sixth. Neither a Study Bible doctrine study nor a glossary entry appears, because neither is in the search index (`ia.md` C3 and C4).

**What is wrong.** No page sequences doctrine, and nothing marks a doctrine's order. `CLAUDE.md`'s own Scholarship Standard sorts doctrines into first-order (creedal), second-order (divides faithful churches) and third-order (open). That sorting is the most useful thing a beginner could be taught about doctrine, and it is visible nowhere.

The creed page, the natural spine, splits attention. The creed's text sits in one panel and its notes about 1,500px further down, so a reader meeting "being of one substance with the Father" has to scroll away to learn what it answers. Its only link forward is 1 Corinthians 15:3–4. It does not link to the era essay "The Great Councils," to Arius among "The heresies · 10," or to the Trinity doctrine study, and it has no way to memorize it.

**Why it costs the reader.** Separating a text from its explanation forces the reader to hold one while hunting for the other. This is the split-attention effect from cognitive load research (Chandler and Sweller). With five unconnected treatments, nothing is ever consolidated in one place where it can be learned and recalled.

**The world-class version.** Two models fit. J. I. Packer's *Affirming the Apostles' Creed* and the Heidelberg Catechism both use the creed as the spine of the doctrine course. Genius-style line annotations put the note directly under the tapped phrase. Make each article of the creed a unit page that gathers, in this order:

1. the catechism answer;
2. the key passages, opened in the Study Bible;
3. the council or heresy that forced the words, with the era essay and the timeline;
4. the strongest objection;
5. one recall question.

Label every doctrine study with its order: "creedal," "divides churches," or "open." Put the doctrine studies and the glossary into the search index first.

#### M5. `/theology/history` and `/theology/history/the-apostolic-age`: the history reads well and teaches poorly

**Where.** The era essay page has three links in its main area, and all three go back to the hub ("CHURCH HISTORY," "← All of Church History," "Church History").

**What is wrong.**

- **The era essay stops dead.** A series that is chronological by definition has no "Next: The Age of the Martyrs." The key figures (Clement of Rome, Ignatius of Antioch, Polycarp of Smyrna, Paul of Tarsus) are plain text, though the hub's "The people · 36" has entries for Ignatius and Polycarp. Acts is not linked to the Study Bible. The essay rests on four primary texts: Clement's letter to Corinth, Ignatius's letters from the road, the account of Polycarp's death "written by his own church," and Tacitus. None is excerpted on the page. There is no question at the end. (The essay's own last lines are a model verdict: "We are the ones who came late. We should learn from how they waited.")
- **The hub runs two series together.** "22 essays, from Pentecost to the present" is really a fourteen-essay series and an eight-essay series that cover the same ground. "The Apostolic and Sub-Apostolic Age, c. AD 30-150" sits beside "The Apostolic and Persecuted Church, AD 30–313," and the timeline's "Read this era" lists both, with no reading order.
- **The "everything on this" list teaches the wrong category.** Under "Everything on this: Church history, 42 pieces in all," the "READ 35" list opens with "How Should Christians Think About Sickness and Health?" and "How Do You Date Wisely and Choose a Spouse?" These were matched because the guides cite church history.
- **The timeline has no scale.** It is a text accordion, so a reader cannot see that roughly twelve hundred years separate Nicaea from Wittenberg, or where "you are here" falls.

**Why it costs the reader.** History is learned as a connected sequence of causes, and every one of these choices breaks the sequence. A primary source is what turns a story about Ignatius into a meeting with him, and the Constitution's Scholarship Standard ("Primary text, or marked as a tradition's reading") points the same way.

**The world-class version.** Smarthistory and Khan Academy's history units give each era page previous and next links, a short primary-source excerpt with a guiding question, linked people, and a scaled timeline that highlights the current era. Choose one series as the course; the eight-part Ancient to After Christendom set is the right length for the twelve weeks. File the fourteen deeper essays as "Go deeper" under each era. Draw the timeline to scale, with a "you are here" mark on After Christendom. That one image teaches the post-Christian thesis better than a paragraph can.

#### M6. `/writing/strongman-theology`: the essay forms, then lets go of the reader

**Where.** "Why a Frightened Church Wants a King": 11 minutes, 17,452px on a phone, 26 links, none of them to the Study Bible or to church history.

**What is wrong.** The essay itself does what the Formation Standard asks. Its symptom is fear ("fear does not do arithmetic"). Its cause is the royal consciousness (Brueggemann) and the frightened group (Niebuhr). Its wisdom is "We already have a King, and he is not like the other nations." And it implicates the writer ("I do not get to stand outside this, because the church I belong to is the church praying the prayer.").

But it quotes 1 Samuel 8:5, 8:11–18 and 8:19–20 as plain text, though the Study Bible has notes on 1 Samuel 8 and the site has a verse sheet (`VerseRef`) already wired into devotions and context guides. It invokes the German Christians and Bonhoeffer, while the era essay "The Modern Church and the Global Shift" has sections titled "Barmen and the German Failure" and "Bonhoeffer." There is no link between them. The end matter is Send, Save, Print, Cite, a book promotion, Find Help, four more essays, a subscribe box and a biography. It offers no question to carry out of the room.

**Why it costs the reader.** Learning transfers when a claim is connected to the evidence that would let the reader test it. Testing is exactly what the skeptic demands, and the site is built for the skeptic. As it stands the essay is an end point when it should be a way in.

**The world-class version.** Use the tap-to-open references that ESV.org's reader uses, which this site already has. Every Scripture reference in an essay opens the passage in a sheet, with "Read 1 Samuel 8 with the notes." The end block, "Test this yourself," follows the formation arc in three steps: the passage (1 Samuel 8 in the Study Bible), the history (Barmen, 1934, in the era essay), and one question, such as "What am I afraid of losing, and what have I been willing to trade to keep it?" That is a question, not a takeaway box.

#### M7. `/study`, `/study/bible`, `/study/bible/john/1`: one register for the beginner and the pastor

**Where.** `/study` and `/study/bible` both promise to serve readers "whether you have never opened it or have read it for years."

**What is wrong.** Every reader then gets the same page. The beginner meets a Reading/Greek toggle and thirteen headings in seminary vocabulary ("How it has been read," "The text and translations"). The pastor's apparatus ("For teaching and preaching," the group questions, the passage guide) is collapsed at the bottom with everything else. No doctrine study, guide or era essay carries a depth marker. The pastor is the site's strategic channel, and his "can I hand this to my people" read has no printable leader's sheet for a chapter.

**Why it costs the reader.** What helps a novice burdens an expert, and what helps an expert loses a novice. This is the expertise-reversal effect. Serving both from one undifferentiated page under-serves both.

**The world-class version.** The ESV Reader's Bible and the ESV Study Bible are the same text set for two jobs, and Logos does the same with layouts for each task. Add a three-position depth switch, remembered on the device:

- **Reading:** summary, outline, the story note, three questions.
- **Studying:** adds history, culture, structure, key words, the hard questions.
- **Teaching:** adds the teaching notes and the group questions, and offers a one-page leader's sheet to print.

The group study guides already do "a leader's guide with timing and the answer behind every question." Bring that to the chapters.

#### M8. `/writing`, `/skeptic-track`, `/tools/test-the-case`: the skeptic has a fine instrument and no sequence

**Where.** `/writing` shows five sections. `shelf.json` defines an eighth, "Doubt and Hard Questions" ("Room for the skeptic and the doubting Christian, with the strongest objections stated first"), but none of its essays is public, so it does not appear. The Skeptic's Track (`/skeptic-track`, seven stops) is suppressed across the site, because `SKEPTIC_TRACK_LIVE` is false: three stops are pending rewrites and four are not on the shelf. Test the Case is the sixth of 36 cards on `/tools`.

**What is wrong.** Test the Case teaches the way a tutor does. It moves one step at a time ("Move 1 of 5"), invites the reader to push back with the objection he actually holds, and states the limits of each move ("What this move does not settle: ... It does not yet show they were right."). But the reader is not led to it. On a phone, its ten-case menu sits between the introduction and Move 1. When he finishes, "Where the case ends" sends him to "Read the Doubt and Faith essays" at `/writing?track=doubt`. That track maps to the Doubt section, which today has no public essay. I did not render that state, so I cannot say whether he sees an empty shelf or a fallback.

**Why it costs the reader.** The audience the site writes toward has the best single learning instrument on the site and nowhere to go before or after it.

**The world-class version.** Alpha is the model again: a sequence for the curious, offered at the front. Kialo shows how to treat objections as a tree the reader can walk. From home: "I don't believe this. Show me your best case." That leads to Test the Case, then the skeptic eight weeks (C2), and the Skeptic's Track ships with the stops that exist, letting Test the Case stand for the resurrection stop until its essay returns. On a phone, open on Move 1 and put the other cases below.

#### M9. `/` and `/my-library`: adults have no "this week," and progress is invisible until earned

**Where.** `/family`'s first screen is "Tonight at the table: Strong Enough To Be Gentle ... Week 44 of the year [Start] [Read it first]" and "This week: The catechism · Question 44, What is sanctification? Learn it together." Home's first screen for an adult is a biography.

**What is wrong.** The site already keeps an adult's progress: chapters marked read, a "Continue the story" link on `/study/bible`, plan weeks walked, self-check history, and "Pick up where you left off" on My Library. But each appears only on the page where it was recorded, and only after the reader has acted. A returning adult on home sees nothing about where he is.

**Why it costs the reader.** Cadence is what carries a learner from week 2 to week 12. A visible next step, set at a fixed weekly time, beats any amount of good content he has to go looking for.

**The world-class version.** YouVersion's "Today" for an active plan, written in the register of `/family`. For a returning reader, home opens on a "This week" card: the next sitting of his path, last week's recall question, and the essay of the week. For a new reader, home opens on a three-way router. `/help` already has the pattern ("Where are you? Start from where you actually are. I'm carrying something / I want to grow / I'm helping someone / I'm leading a group"), but it lives only on the crisis hub.

### Minor

#### m1. `/search?q=grace`: results in browsing order, not learning order

The first screen shows a topical guide, a context guide and a parenting guide. A learner searching a doctrine word needs a definition first, then the doctrine study, the key passage (Ephesians 2:8–9) and the catechism answer, and only then the applications. Results for a doctrine term should open with a definition card that draws on the glossary and the catechism answer, as Logos's Factbook does for a topic. This depends on the index fix in `ia.md` C3.

#### m2. `/tools/deep-bible` and the other passage tools: four instruments for one job, with the "Flagship" label on the smallest

"FLAGSHIP TOOL: Deep Bible Study Companion" covers 20 books. The Study Bible covers all 66 books and 1,189 chapters. The Bible Study Guide covers 12 books, and the Passage Context Tool quotes the World English Bible where the Study Bible uses the Berean Standard Bible. A learner cannot tell which one is the real instrument, so he learns none of them well. Name one flagship (the Study Bible) and file the rest as its views. `ia.md` C4 covers the structural duplication.

#### m3. `/resources/context/honor-shame-vs-guilt`: a model guide one exercise short

It ends on a real question ("Whose verdict do you actually live before? We already know, most days, and it is rarely God's.") and keeps its own limits in view ("A Lens, Not a Master Key"). What it lacks is the step that turns a lens into a skill: "Now read Luke 14:7–11 with the lens," with the passage opened inline and two questions. One worked exercise per guide would make the forty-odd guides into practice rather than reading.

#### m4. `/study/bible/john/1` "Go deeper on LiveWell": related by keyword, not by next step

The first card under John 1 is "Baptism and Communion: A Bible Study on the Sacraments," and then come the creeds, "Why Follow Jesus," creation and providence, the Trinity, and Eutychianism. That is a reasonable cloud of related material, but it is not a next step. Lead with the one link that continues the learning: the passage guide already linked above the cards, or the doctrine the chapter grounds ("John 1:1–18 is where the church learned to say 'the Word was God': read the Trinity study").

#### m5. `/subscribe`: a sequence hiding in the sign-up

The form already asks "where you're standing (skeptic, doubter, pastor, or seeker)" and promises that "the first one is chosen for you." Extend the promise into a twelve-email sequence for each stance, mirroring the site's paths, with one sitting a week. A weekly email is the most dependable cadence most adults will ever keep. This one would teach in order instead of only publishing.

#### m6. `/study/bible` and `/help/reading-the-bible`: "how to read the Bible" taught in three places

The Study Bible's "New to the Bible? Guides and Tools" (24 guides), the care page "Where do I start reading the Bible?" under Find Help, and the `reading-the-bible` eight-week plan each teach the first skill separately. Make one of them the first week of the beginner path and point the other two at it.

## What to keep

- **The family devotion loop** (`/family/tonight`). Read, Talk, Ask, Do, Remember, Pray. A catechism question for the week in the Remember block, a physical practice in Do ("passing it carefully from person to person"), "We did this tonight," and Before and Next links. This is the site's best learning design and the template the adult study area should be rebuilt on.
- **The Observe, Interpret and Apply questions written for every chapter** (`client/public/bible/notes/*`). Keep every word. Move them (M1).
- **"Where we are in the story,"** open by default on each chapter. Keep the story path's "Before this in the story / Next in the story," "Mark as read," and "Continue the story." The machinery for a course is already here.
- **Test the Case.** One move at a time, push back with your own objection, "What this move does not settle," and "No decision is required here, and none is being asked." This is how the skeptic should be taught everywhere.
- **The eight-week plan structure** (focus, why, practice, read, tool, reflection) and the skeptic plan in particular ("Eight Weeks of Reading Like an Adult"). Promote it. Do not rewrite it.
- **The phrase-level creed notes.** "The single iota was the whole gospel." "Grace does not start over. It holds." Keep them; place them beside the words they explain.
- **The context guides' discipline.** "A Lens, Not a Master Key," endings that ask rather than resolve, and real source lists (deSilva, Georges, Bailey, Richards and O'Brien). The same goes for the era essays' bibliographies (González, Chadwick, MacCulloch, Shelley).
- **The era essays' prose and verdicts.** "We are the ones who came late. We should learn from how they waited."
- **The hard questions inside the chapter notes** ("A hard question (1 of 2)"). The skeptic plan already routes through them; they are the bridge between Bible study and apologetics.
- **The group study guides' leader's guide** with timing and the answer behind every question. This is the right scaffold for the pastor, and it should reach the chapters (M7).
- **`/writing`'s "Start with these" 1, 2, 3.** A numbered start is the beginning of a sequence. Extend the idea across the site.
- **Device-only progress with no account.** It is the right privacy stance for a site that writes toward skeptics. Keep it, and show it to the reader (M9).
