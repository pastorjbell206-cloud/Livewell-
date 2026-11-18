# C. Learning UX: how the best learning products teach, check, return and show progress, and what LiveWell should take

Prepared 2026-10-27 for the design research cluster "learning-ux," answering
James's brief ("the most organized, well-designed website that helps people to
study the Bible, to understand doctrine, to understand what a post-Christian
world is in America, and how to live it ... interactive, with things that draw
people's attention ... a useful tool for people to study and learn and grow").

**Where this sits.** `docs/work/plan/benchmark.md` placed the faith products
at the level of audience and strategy. The A-wave reports in this folder
(`A-courses-learning.md`, `A-SYNTHESIS.md` and their siblings) already argued
for the story's map with "you are here," doors at the joints of a plan, your
answer before ours, retrieval questions with no score, a closing rite instead
of a certificate, a private memorization drill, and room mode for leaders.
MASTER-PLAN 7.2 already gives each history session a myth check before reading
and a tap-to-reveal *Check yourself* after it. This file does not repeat those.
It looks at the products outside the faith world that are best at the craft of
learning, and asks five narrower questions they answer better than anyone:

1. What happens **before** the reader is told (prediction, the problem first)?
2. What happens **at the moment of a check** (the reason behind the answer, a
   hint before the answer, how a wrong answer is met)?
3. What happens **after the reader leaves the page** (spaced return, the
   question carried into the week, the kept line that comes back)?
4. How is **what the reader has kept** shown without turning it into a score?
5. When is an **interactive model** worth building, and how is it shaped?

**Method and limits.** Page fetches fail in this sandbox. I used 43 web
searches aimed at help centers, documentation, release notes, research papers,
the authors' own working notes, and reviews; and I read the source of five
open-source products cloned into
`/tmp/claude-0/-home-user-Livewell-/fa8a8758-d28a-5c2d-826b-343823c61028/scratchpad/design-src/`:
Andy Matuschak's **Orbit** (`andymatuschak_orbit`, the platform behind the
mnemonic medium), Nicky Case's **The Evolution of Trust** (`ncase_trust`),
Khan Academy's exercise renderer **Perseus** (`Khan_perseus`), Anki's UI
strings and scheduler states (`ankitects_anki`, sparse), and **Mathigon**'s
textbook content (`mathigon_textbooks`). Where the code showed a UI string or a
number, it is quoted from the file. Brilliant, Duolingo, Readwise, Coursera,
MasterClass and Blinkist are closed, and nothing of theirs was seen except
through documentation and reviews; section 6 lists what stayed out of reach. I
also read the LiveWell files each pattern lands on (listed in section 7).
Company figures and third-party numbers are planning notes, not for the site
(MASTER-PLAN section 2).

---

## 0. The short verdict

The learning products split cleanly in two, and the split is the whole lesson
for LiveWell.

One family is built to **bring you back**: Duolingo (more than 600 experiments
on its streak, by its retention lead's account; a notification system tuned by
a bandit algorithm to lift daily active users by half a percent), Brilliant's
streaks, Streak Charges and leagues, Readwise's streak with merchandise at one
month and one year, Khan Academy's mastery levels and points. These mechanics
work on attendance. Their own users and reviewers say, consistently, that the
mechanics "have taken over the learning."

The other family is built to **make you keep what you met**: Quantum Country
and Orbit (questions written by the authors into the text, then returned to
the reader at five days and at growing intervals after), Execute Program (four
fixed returns: two days, a week, three weeks, two months), Readwise's
resurfacing of your own highlights, Anki's honest end of a sitting ("You have
finished this deck for now"), Khan's six-question review of older skills, and
the explorable explanations of Bret Victor, Nicky Case and Bartosz
Ciechanowski, where the reader bets on an outcome before the model runs and
then plays with the model herself. This family is quieter, has no counters on
people, and is backed by the strongest findings in learning research:
retrieval, spacing, and the pretesting effect.

LiveWell's rules already forbid the first family. Almost nothing in LiveWell
yet does what the second family does best, which is **the part after the
page**. Every LiveWell check (the planned myth checks, *Check yourself*, the
catechism, Scripture Memory) happens once, on the page, and is then forgotten,
because nothing ever asks again. The single most valuable thing this cluster
found is a small, private, spaced return: a handful of the reader's own
questions that come back on the device after about five days, two weeks, five
weeks and three months, answered with "I had it," "Not yet," or "Skip," with
the reason under every answer and an honest end to every sitting. Around it
sit a dozen smaller moves: a guess before each reveal, the why under every
answer, words and people that open where the reader meets them, a question
carried into the week, a source read alone, the argument said back in a form
its author would sign, and three explorables where the idea really is a
mechanism. None needs an account, a streak, or a notification.

There is one repair in the repo: `/tools/scripture-memory` marks a verse
"memorized" once and for all and shows a percentage. Both are wrong by the
evidence (memory decays) and by the master plan ("68% complete" is forbidden).
Pattern 5 fixes it.

---

## 1. What LiveWell already has on this ground

So every pattern lands on something real:

- **Scripture Memory** (`client/src/pages/tools/ScriptureMemory.tsx`, 1,057
  lines): 40 verses in 8 categories; four modes (`"full" | "firstLetter" |
  "fillBlank" | "recall"`, line 16); a one-way "memorized" toggle stored under
  `livewell-scripture-memorized` (line 201); a "{n} of {total} memorized"
  counter, a percentage (`Math.round((memorizedCount / totalVerses) * 100)`,
  line 402), and per-category progress bars (lines 418 to 528). The page's own
  description ends "Track your progress."
- **Device memory**: `lib/storage.ts` (guarded reads and writes),
  `lib/readProgress.ts` (`livewell-read-essays`, a capped list of opened essay
  slugs), `lib/library.ts` (`livewell-library-v1`, saved pages for My Library
  at `/my-library`), `lib/myProgress.ts` (reads every tool's key for "Pick up
  where you left off"; nothing leaves the device).
- **Reminders the reader adds himself**: `lib/calendar.ts` (`buildIcs`,
  `openIcs`, `googleCalendarUrl`).
- **Telemetry** with stable event names and nothing personal:
  `lib/telemetry.ts` (`track`, `trackEssayComplete`), governed by MASTER-PLAN
  9.9.
- **A glossary**: `/theology/glossary` (`pages/TheologyGlossary.tsx`) reads
  `client/public/theology/theology-glossary.json`, 114 terms, each with a
  one-line `short`, a `definition`, `seeAlso` and a `doctrine` link. Today it
  is only a page; no essay or note links into it.
- **Planned and relevant**: `MythCheck`, `CheckYourself`, `Disclosure` and
  `SourceCard` (U32, the history session template); the registry of people,
  events, councils and verified source excerpts (U30, U07); creeds with a
  memorize mode (U44); context guides that reveal "what we hear / what the
  first readers heard" (U45); the 2027 story plan (U28); the essay foot fixed
  in MASTER-PLAN 6.2 ("To think about, or talk about" first).

---

## 2. The products

Each entry: who it serves; how it is organized; the signature features and
the interaction behind them; what is known of its look; how it holds attention;
what is excellent and stealable; what is weak.

### 2.1 Brilliant

**Who.** Adults and students learning mathematics, science and computer
science; an auto-renewing subscription, STEM only (third-party review).

**Organization.** "Bite-size lessons that build problem solving skills one
concept at a time" (App Store listing). The course and path structure beyond
that was not described in anything I could reach.

**Signature features.**
- *The problem before the procedure.* Brilliant's own page on how it teaches
  says it "often poses a question before showing a method," so the learner's
  first attempt gives the explanation a purpose and surfaces what the learner
  already understands. The same page insists this is "guided discovery," not
  unguided guessing: questions, feedback and direct instruction are sequenced
  together. Its help page contrasts this with Khan Academy, where students
  watch an explanation and then practice.
- *The simplest useful case first.* Each section "begins with the simplest
  useful case, and increases the complexity as the learner's understanding
  grows."
- *Feedback while the reasoning is still warm,* so the learner can revise
  rather than simply be marked wrong.
- *"Why?" on every interaction.* A Google Play reviewer singles out "an
  excellent 'Why?' feature on every interaction": even when the answer is
  right, the learner can open the reasoning.
- No video; "everything is interactive." Brilliant cites an outside study for
  a "6x more effective" claim; not verified.

**Look.** Unseen beyond "visual, interactive lessons." A screen-by-screen
recording exists on Screens Design but could not be viewed.

**Habit.** A streak, extended by completing three problems or a full lesson in
a day; Streak Charges, held two at a time, protect it (Brilliant help pages).
Leagues.

**Stealable.** The question before the explanation; the reason available under
every answer, including right ones; the simplest useful case first.

**Weak.** Reviewers call the leagues and streaks unnecessary and
"Duolingo-style." One six-month user found lessons that lacked enough
explanation to continue and questions with wrong answers or no single right
answer, and judged it better for refreshing what was learned elsewhere. An
interactive check is only as good as the question under it (pattern 10).

### 2.2 Khan Academy (with Perseus and Khanmigo)

**Who.** School students, their teachers and parents, and adult learners, in
mathematics above all.

**Organization.** A course page lists its units, with each unit's lessons
under the unit name and a progress indicator per unit. A unit page shows the
mastery points available and, under Practice, each skill's progress from
Familiar to Proficient to Mastered. A **Course Challenge** card at the bottom
of the course samples skills from the whole course. After an exercise, quiz,
unit test or challenge, a card says how many skills moved up or down and may
recommend lessons based on the questions missed. Khan says it recently
redesigned these pages around an overview of a course's skills (help center).

**Signature features.**
- *Mastery levels.* Not started; Attempted (under 70% on an exercise);
  Familiar (70 to 99%); Proficient (100%); Mastered (already Proficient, then
  correct on a mixed-skill assessment). Mixed-skill assessments can move a
  skill up or down, so a skill once "Mastered" can fall back (help center).
- *Mastery Challenges.* A review of older skills: six questions covering three
  skills; both right moves a skill up, both wrong moves it down; one challenge
  per 12 hours; mathematics only (help center).
- *Graduated hints* (Perseus, open source). The strings in
  `packages/perseus/src/strings.ts`: "Hint #%(pos)s," "Get another hint,"
  "Show solution," "Check," "Correct!," "Keep trying," "Try again.", and
  targeted feedback such as "Check your units." and "Check your signs." The
  learner asks for help one step at a time, and the last step is the worked
  solution.
- *Khanmigo,* an AI tutor built on the Socratic method that asks guiding
  questions instead of giving answers; Sal Khan's TED demo described letting
  the AI "think before it speaks" (secondary). A critical write-up reports Khan
  himself compared it to "a shy student who won't raise their hand," and that
  learners with strong metacognitive skills did well while others met
  frustration and reduced engagement (secondhand; treat with caution).

**Habit.** Mastery points and levels; course percentage mastered.

**Stealable.** The capped review of older material (six questions, three
skills, at most twice a day); the course page that lists every lesson under its
unit, so the whole is always visible; the graduated hint that ends in the
worked answer rather than in a dead end; the after-card that points from a
missed question back to the lesson that teaches it.

**Weak for LiveWell.** Every one of the progress devices is a grade of a
person: levels, percentages, points. On a site about formation they would
grade a reader's faith. The Socratic tutor shows the cost of withholding: the
learners who most need help are the ones a withholding design frustrates.

### 2.3 Duolingo, and its critics

**Who.** Mass-market language learners.

**Organization.** In 2022 a linear learning path replaced the old skill tree
(one news article; a forum thread of hundreds of comments complained of lost
progress and lost choice; the sourcing is weak).

**Signature features.**
- *The streak,* described by the head of its retention team on Lenny's
  Podcast (summaries) as the company's "most impactful feature," with more
  than 600 experiments run on it in four years. Streak freezes insure the
  streak and are bought with in-app currency (a third-party analysis calls
  them a monetization mechanic). The best-documented winning test was a copy
  change from "continue" to "commit to my goal." A later write-up reports that
  asking a new user to choose a streak goal improved retention even though the
  chosen value was never stored or used: the act of choosing made the
  commitment. Other experiments: home-screen widgets that change mood when a
  lesson is skipped, special streak app icons, "Perfect Streak Week," and an
  84-day streak celebration with an animated flame.
- *Half-life regression* (Settles and Meeder, ACL 2016): a model of each
  word's "half-life" in a learner's memory, used to choose what to practice.
  It cut recall-prediction error by more than 45% against baselines and raised
  daily engagement 12% in an operational study; Duolingo's blog reports a 9.5%
  retention increase for practice sessions.
- *Notifications tuned by a bandit* (Yancey and Settles, KDD 2020): a
  "Recovering Difference Softmax" algorithm choosing among reminder templates,
  each with eligibility rules, for a 0.5% lift in total daily active users and
  2% in new-user retention; before it, templates were drawn at random.

**The critics.** A 2026 review analysis (commercial) finds the most cited
complaint is that the mechanics have taken over the learning; users describe
stress over broken streaks and "passive-aggressive notifications"; The
Decision Lab's "streak creep" argues gamification saps the intrinsic enjoyment
of the activity, and notes pages of "Duolingo burnout" threads. In April 2025
the CEO's "AI-first" memo drew such a backlash that the company took down its
TikTok and Instagram posts; he later said "I did not give enough context."

**Stealable.** Only the honest core: a model of forgetting used to decide what
comes back and when. Everything else is the clearest map of what LiveWell must
not build, because every piece of it is engineered for the daily return of the
user rather than the formation of the person.

### 2.4 Readwise and Readwise Reader

**Who.** Heavy readers who highlight books and articles and want to keep what
they marked.

**Organization.** *Readwise*: a Daily Review, Themed Reviews, a Dashboard,
and Frequency Tuning (Account, Configure Reviews). *Reader*: Home, Library and
Feed; saved items land in an Inbox and are triaged to Later and Archive, with a
Shortlist variant (third-party descriptions; Readwise's CLI documentation
lists the locations new, later, shortlist, archive, feed).

**Signature features.**
- *Resurfacing your own highlights.* Readwise's documentation describes "a
  decaying algorithm based on a recall probability half-life rather than a
  date-based algorithm as found in Anki." Initial half-lives are 7 days
  ("Mastery soon"), 14 days ("Later") and 28 days ("Someday"); a highlight
  whose recall probability decays to 50% or lower becomes a candidate in the
  latter half of the Daily Review. The docs admit the algorithm "is admittedly
  a bit of a black box" next to Anki or SuperMemo.
- *Frequency Tuning:* the reader decides how often a document or a source type
  comes back.
- *Mastery:* turning a highlight into a flashcard (keyboard M); the card
  formats were not described in anything I reached.
- *Themed Reviews:* sets built from any combination of books, articles, notes
  and tags, delivered on chosen weekdays or once a month; an experimental
  "Themed Connections" batch arrives on Saturdays.
- *The iOS widget* shows the first review highlight with a prompt until the
  Daily Review is done, then a random highlight that rotates every five
  minutes; audio reviews count as done when the end is reached.
- *Export:* a Markdown template (ten variables) and an official plugin that
  writes highlights into the reader's own notes.
- *Ghostreader* in Reader: AI summaries and key points (low-quality source).

**Habit.** A stats page shows the days a review was or was not completed; a
missed review in the past seven days can be "recovered" so it counts toward
the streak; Readwise announced branded merchandise for one-month and one-year
streaks (changelog).

**Stealable.** The reader's own kept lines coming back to him at widening
gaps; themed sets he builds; his control over how often a source returns;
export, so what he kept is his.

**Weak.** The streak and its merchandise; the inbox model, which turns reading
into a queue to clear; AI summaries standing in for the text.

### 2.5 Anki and spaced repetition

**Who.** Medical students, language learners, anyone who must remember a great
deal; open source.

**Organization.** Decks of cards. The study screen shows a question and "Show
Answer," then four grades: "Again," "Hard," "Good," "Easy"
(`ftl/core/studying.ftl`). When the day's cards are done: "Congratulations! You
have finished this deck for now." (`scheduling.ftl`).

**Signature features.**
- *The scheduler states its trade-off in plain words.* The FSRS setting
  "desired retention" defaults to 90%, and the tooltip
  (`deck-config.ftl`, line 424) reads: "By default, Anki schedules cards so
  that you have a 90% chance of remembering them when they come up for review
  again. If you increase this value, Anki will show cards more frequently to
  increase the chances of you remembering them. If you decrease the value,
  Anki will show cards less frequently, and you will forget more of them. Be
  conservative when adjusting this - higher values will greatly increase your
  workload, and lower values can be demoralizing when you forget a lot of
  material."
- *An honest end.* A session finishes; the app says so.
- Michael Nielsen's essay *Augmenting Long-term Memory* (2018) is the best
  argument for the practice: Anki "makes memory a choice, rather than a
  haphazard event, to be left to chance"; cards as atomic as possible; one big
  deck; a rule of thumb that anything likely to save five minutes later is
  worth a card; reading a hard paper by making cards as you go.

**Weak.** Writing cards is the hard part (Matuschak: "writing good spaced
repetition memory prompts is hard"). Backlogs: when the daily count outruns
the time available, a pile grows that "feels impossible to clear" (vendor
blogs), and "ease hell," where intervals stall, still bites some decks under
FSRS (Anki forums, 2024 and 2025). One forum adviser notes that a card ten days
overdue is not much harder than one due today, which argues for never showing
a backlog at all. Four self-grades ask the learner to judge himself more finely
than he can.

### 2.6 Quantum Country and Orbit: the mnemonic medium

**Who.** Readers of *Quantum Computing for the Very Curious* (Andy Matuschak
and Michael Nielsen), and authors who want to embed the same kind of prompts
in their own texts (Orbit).

**How it works.** The essay looks like an ordinary essay, but every few hundred
words it breaks for a few review questions, 112 in all; a few days later an
email invites the reader to review again, and again at growing intervals (the
authors' essay, via a Goodreads repost; Balaji Srinivasan's description).

**What the Orbit code shows** (`andymatuschak_orbit/packages`):
- Three outcomes, not four: `Remembered`, `Forgotten`, `Skipped`
  (`core/src/event.ts`).
- The first review comes **five days** after the reading; each remembered
  review multiplies the interval by **2.3** (`initialReviewInterval: 1000 * 60
  * 60 * 24 * 5, // five days`, `intervalGrowthFactor: 2.3`,
  `core/src/schedulers/spacedRepetitionScheduler.ts`). Five days, then about
  eleven, then about a month, then two and a half months.
- A forgotten prompt is put back at the end of the same sitting ("Refill queue
  with items to retry if we're at the end," `app/src/reviewSession/ReviewSession.tsx`).
- The embedded banner's copy (`app/src/embedded/EmbeddedBanner.tsx`): "Quickly
  review what you just read." (or "Quick review:" on narrow screens), then
  "Review session: 3 prompts," "2 prompts left," and "Review complete."
- The buttons (`ui/src/components/ReviewButtonBar.tsx`): "Show Answer," then
  "Forgotten" and "Remembered" (on very narrow screens "Needs Work" and
  "Succeeded"), and "Skip."
- *The starburst* (`ui/src/components/ReviewStarburst.tsx`, `Starburst.tsx`):
  each prompt in the sitting is one ray, and a ray's length is set by that
  prompt's current interval, that is, by how long the reader has held it.
  Prompts still pending in the sitting are drawn in a secondary color. It
  pictures what has been kept as time held, not as a score.

**What the authors say it achieved.** Matuschak's working notes grade the
evidence: strong that review sessions produce durable memory, moderate and
emerging on the rest, none yet that it generalizes beyond Quantum Country. In
the first half of 2019, 29% of readers who finished the in-text review finished
the one-month level; by early 2020 several hundred readers had demonstrated a
month or more of retention. A 2022 letter reports that just five questions
account for more than a quarter of the cases where a reader's retention stayed
under a month after five repetitions, and thirteen for half. His notes also
warn that review sessions become boring and detached without a steady supply
of new prompts, and that very data-dense texts need a different design; one
note is titled "The mnemonic medium works well for linear primers in
established fields."

**The ideas around it.**
- *Why books don't work* (Matuschak): books and lectures share an unexamined
  "transmissionist" model of learning; readers who absorb a book are the ones
  who think about it actively, summarize and synthesize. (Bernoff's rebuttal
  calls the essay "a bit off-target.")
- *How to write good prompts* (December 2020): a prompt should be precise
  about what it asks, produce a consistent answer each time, and aim at what
  matters rather than what is easy to remember; good prompts approach an idea
  from several angles.
- *Salience prompts:* prompts "designed not so much to assure recall but rather
  to cause you to think certain thoughts when situations or mental states
  arise." He suspects retrieval helps here and says ordinary spaced-repetition
  scheduling is "probably all wrong" for them.
- *Timeful texts:* books have no direct means of speaking to a reader over
  weeks and months; texts could be written to be met "on dozens of occasions
  over the following weeks and months." His example is the Aro meditation
  course, whose emails "spiral back" to earlier ideas after a few weeks.

**Stealable.** Questions written by the author into the text at the moments
that matter; the five-day first return; three outcomes including Skip; the
forgotten prompt retried at the end of the sitting; the plain banner copy; time
held as the only measure; questions that aim at what the reader will notice,
not only what he will recall.

**Weak.** It needs an account and an email channel; reviews grow stale without
new prompts; it suits primers of settled fact better than arguments, which is
a warning against putting prompts inside James's essays.

### 2.7 Andy Matuschak's evergreen notes and his notes site

**What.** A method of notes that are atomic (one idea), concept-oriented
(organized by idea rather than by book, because per-book notes produce "no
accumulation") and densely linked; a secondary source says he titles them as
claims rather than topics. His public site opens a linked note **in a new
column beside the current one**, so the reader can see where he has been; a
developer who copied the design for Obsidian says it inspired the "Sliding
Panes" plugin, later folded into Obsidian's core as stacked tabs.

**Stealable.** Following a link without losing the page it came from: the trail
stays on screen. For LiveWell's registry (Nicaea, then Athanasius, then
Arius), that is the difference between a reference work and a maze.

**Weak.** A personal-notes method, not a reader's product; a dense web with no
front door is hard for a newcomer.

### 2.8 Explorable explanations

**Bret Victor, *Explorable Explanations* (March 10, 2011).** Text as "an
environment to think in." Three methods: *reactive documents* (the reader
changes an assumption in the prose and sees the consequences; his Tangle
library lets authors put adjustable variables in a paragraph), *explorable
examples*, and *contextual information*. Wikipedia separates explorables from
standalone widgets because they steer attention to specific phenomena. The
criticism, collected by Red Blob Games: they are costly to build, often serve
readers who already understand, and do not scale.

**Nicky Case, *The Evolution of Trust*** (public domain; source read).
Based on Robert Axelrod's *The Evolution of Cooperation* (1984), with Putnam's
*Bowling Alone* and Henrich's *The Secret of Our Success* credited in the
notes. Its structure (`js/slides/`, `words.html`):
- Nine chapters plus credits: Intro, One-Off, Iterated, Tournament, Evolution,
  Distrust, Noise, Sandbox, Conclusion.
- It **opens on a historical event**, not on the theory: "During World War I,
  peace broke out. It was Christmas 1914 on the Western Front."
- The reader **plays first**: one round of the game, then repeated rounds.
- Before the tournament the reader **places a bet** on which character will
  win ("Who do you think will get the highest total ..."), and the result
  answers the bet: "Congrats, you placed your bet on the right horse." or
  "(Apologies to your bet, [CHAR].)" Later chapters ask further predictions
  with correct and incorrect replies (`noise_evo_2_2_correct`, `_incorrect`).
- A reminder of who is who is always one tap away ("forgot_whos_who").
- The **sandbox** comes last: once the reader understands, he gets the controls.
- The **footnotes** (`notes/notes.md`) are a second, lighter voice that credits
  every source, explains naming choices ("Copycat" instead of "Tit For Tat" so
  readers would not bet on a name they already knew), and corrects a magazine's
  misreading of a paper.
- Case's working definition, quoted by Red Blob Games: something that "teaches
  something" and is "more interactive than a boring ol' quiz with only one
  right answer." His *Parable of the Polygons* shows how small biases produce
  segregation.

**Bartosz Ciechanowski, *Mechanical Watch* (2022).** A long article built of
interactive 3D models and animations of the movement, mainspring and
escapement; 665 points on one Hacker News thread, where a commenter compared it
to David Macaulay's *The Way Things Work*, another noted the Patreon link sits
at the very bottom of the site rather than in a pop-up, and a reader built a
physical exploded model because of it. His process was not reachable.

**Red Blob Games (Amit Patel).** Starts a tutorial from one interactive
diagram; warns that turning a static diagram interactive lets readers change
inputs while the page computes the outputs, so "they don't get to run the
algorithm themselves"; says he does not think interactivity helps with many
problems and uses it only on some pages; everything free, no signup, no ads.

**Distill, *Research Debt* (Olah and Carter, 2017).** Explanation as real work:
"interpretive labor" is the energy spent explaining against the energy needed
to understand; research debt is the pile of missing interpretive labor;
distillation joins deep understanding, empathy and design; "it's entirely
possible to build paths and staircases into these mountains."

**Stealable.** A real event first; the reader acts before he is told; a bet
before the reveal; the model handed over at the end; sources in a footnote
voice; one diagram where the idea is a mechanism, and none where it is not.

**Weak.** Cost. A great explorable takes months; a mediocre one is a widget.

### 2.9 Added: Mathigon

**Who.** Students aged 12 to 18; "part textbook and part virtual personal
tutor" (README); acquired by Amplify in 2021.

**What the content source shows** (`mathigon_textbooks/content`):
- Chapters are written in Markdown split into **steps** by `---`; *Circles and
  Pi* has 76. A step may declare `> goals:` that must be met before the next
  step appears, and inline elements appear `{.reveal(when="blank-0")}` once a
  blank is filled; *Circles* has 48 fill-in blanks `[[ ... ]]`.
- **Glossary and biography links** in the prose: 401 `gloss:` links and 81
  `bio:` links across the chapters; `shared/bios.yaml` stores each person's
  born and died years and a short biography, `shared/glossary.yaml` each term.
- The tutor's lines (`shared/hints.yaml`): "Welcome to Mathigon! I'm Archie,
  your personal tutor." "Our content is divided into small steps. You have to
  complete the activities to reveal what's next." "We will save all your
  progress, so you can come back later and continue right where you left off."
  Thirteen rotating praise lines with emoji ("Impressive! :trophy:", "Superb!
  :star:") and four for wrong answers ("Are you sure about that?
  :thinking-face:").
- Each chapter carries a color, a level, a trailer video and a `next` chapter.

**Stealable.** Terms and people that open in place, written into the prose by
the author; small steps; the reader's place remembered.

**Weak.** The locked step ("You have to complete the activities to reveal
what's next") and the praise-with-emoji are exactly the tone LiveWell must
refuse: they treat an adult as a child to be coaxed.

### 2.10 Added: Execute Program

**What** (Gary Bernhardt; via its own spaced-repetition page and Matuschak's
notes on it). Interactive programming lessons of a few minutes, prose mixed
with live problems. Each lesson's reviewable items (five in one regular
expressions lesson) come back after the lesson on **four fixed delays: two
days, one week, three weeks, two months**. Lessons open only after their
prerequisites have been read and recently reviewed, so later lessons can
assume solid recall. Missed review answers carry no penalty unless the learner
gives up.

**Stealable.** A fixed ladder of four returns is enough; no adaptive algorithm
is needed for a reader's handful of questions. The review items are authored
with the lesson, not made by the reader.

**Weak.** The lock. LiveWell has no prerequisites strong enough to justify
withholding a session from an adult.

### 2.11 Coursera

**Who.** Learners taking university and company courses, often for a
certificate.

**Organization and checks.** Weekly modules; the guidance attributed to
Coursera separates *formative* checks (in-video quizzes, practice quizzes)
from *summative* ones (graded quizzes, peer review), and recommends listing a
module's concrete learning objectives at its start. In-video quizzes stop the
lecture for a question answerable "in about 10 seconds" if the learner was
paying attention, about one per eight to ten minutes of video; they record no
grade and do not have to be answered to keep watching (Vanderbilt guide). In a
Stanford study of a Coursera machine learning course, 74% of viewers who began
a video attempted its in-video quiz, and some sought back to the preceding
section to answer it. Deadlines can be reset from the course page; some
learners report losing quiz answers after a reset (forums).

**Stealable.** The small check that interrupts but never blocks, and sends the
learner back into the material to answer it.

**Weak.** Deadlines, grades and certificates; an institution's apparatus that
low completion rates (A-courses-learning, 2.15) show does not hold people.

### 2.12 MasterClass

**Who.** Adults buying time with a famous practitioner.

**Organization.** A class of about 20 lessons averaging 10 minutes; a
downloadable guide or workbook for each class; *Sessions*, a 30-day structured
curriculum in sections with projects, peer feedback, teaching assistants and a
community; on web and phone, not on TV apps (reviews; MasterClass help center).

**What reviewers say.** Superb production (multiple camera angles, a
professional kitchen, "splendid photography in a magnificent setting"); the
workbooks vary from thorough to "truly intense homework" (Neil Gaiman's) and
are "the bridge between passive watching and active learning, but only if you
actually complete the exercises"; the platform is about inspiration rather
than skill, with "no quizzes, no interactive exercises ... no assignments that
force you to practice," relying "entirely on self-motivation."

**Stealable.** One teacher's presence, made with care; a printed companion
with real exercises.

**Weak.** Inspiration standing in for instruction; celebrity as the product.

### 2.13 Blinkist, as a contrast

**What.** Book summaries promising key ideas in about 15 minutes, as text or
audio, written by a human editorial team (company claim).

**What critics say.** Nuance is stripped; one house voice makes every book
sound as if one person wrote it (Book Riot); a competitor says summaries
encourage consumption more than comprehension. A defender answers that a
summary sets expectations for what the reader will learn.

**The lesson for LiveWell.** An "In brief," a topic lead, or a session's
standfirst is a door into the text, never a replacement for it; and nothing on
the site should flatten James, the church's witnesses and Scripture into one
house voice.

### 2.14 Research that bears on the design

The A-wave cites retrieval practice (Roediger and Karpicke, 2006), the fresh
start effect (Dai, Milkman and Riis, 2014), MOOC completion (Reich and
Ruipérez-Valiente, 2019) and the undermining effect of expected rewards (Deci,
Koestner and Ryan, 1999). Three more bear on this cluster:

- **The pretesting effect.** Richland, Kornell and Kao, "The Pretesting Effect:
  Do Unsuccessful Retrieval Attempts Enhance Learning?" (*Journal of
  Experimental Psychology: Applied* 15, no. 3, 2009, 243 to 257): across five
  experiments, readers asked about an essay's concepts *before* reading it
  learned those concepts better than readers given longer to study, and the
  design controlled for the mere drawing of attention to the concepts. Kornell,
  Hays and Bjork's "Unsuccessful retrieval attempts enhance subsequent
  learning" (*JEP: Learning, Memory, and Cognition* 35, no. 4, 2009) is the
  companion. This is the evidence under the myth check and under pattern 2.
- **The spacing ridgeline.** Cepeda, Vul, Rohrer, Wixted and Pashler,
  *Psychological Science* (2008): more than 1,350 people learned facts,
  reviewed them after a gap of up to 3.5 months, and were tested up to a year
  later. The best gap grew with the delay to the test: about 20 to 40% of a
  one-week delay, falling to about 5 to 10% of a one-year delay. For a reader
  meant to keep something for a year, returns weeks apart are right; a review
  the next morning is too soon.
- **Half-life regression** (Settles and Meeder, 2016; above): a model of
  forgetting chosen per item predicts recall far better than a fixed schedule,
  but a fixed ladder (Execute Program) is a sound simplification for a few
  dozen questions.

---

## 3. What the best of them share

Set side by side, the products that make people *keep* what they meet do the
same five things at the same five moments. Each LiveWell surface can be checked
against the table.

| Moment | What the best do | Seen in | What goes wrong | LiveWell today |
|---|---|---|---|---|
| **Before** | Ask before telling: a bet, a problem, a myth check. | Evolution of Trust, Brilliant, pretesting research | Gating the text behind the question (Mathigon's goals) | Myth check planned for history sessions only |
| **During** | Keep the reader in the text: terms and people open in place; one idea per step; the trail of links stays visible. | Mathigon gloss and bio links, Victor's contextual information, Matuschak's columns | Leaving for a glossary page and losing the place | Glossary is a separate page; registry sheets planned for sessions |
| **Check** | A short question, the reason under every answer, help one step at a time, a wrong answer met with information. | Brilliant's "Why?", Perseus hints, Orbit's three outcomes | Scores, levels, emoji praise, four-way self-grading | *Check yourself* planned: tap to reveal, no score |
| **After** | Bring a few questions back at widening gaps, in short, finite sittings that end honestly; carry one question into life. | Orbit (five days, x2.3), Execute Program (2d, 1w, 3w, 2m), Readwise, Khan's capped review, salience prompts | Streaks, pushes, backlogs that grow | Nothing: no check ever returns |
| **Record** | Show what was kept as time held, in words; let the reader take his kept lines with him. | Orbit's starburst, Readwise export | Percentages and mastery levels | Scripture Memory's "n of 40 memorized" and percentage |

The pattern list that follows fills the empty cells.

---

## 4. The patterns most worth bringing to LiveWell, ranked

Ranked by value to James's brief against cost, inside MASTER-PLAN section 2
(position, not performance; personal state on the device, said plainly;
shareable state in the URL; tokens only; no accounts; interactivity where it
helps a person learn, find, remember, or do, and never inside the argument).
Fit: **core** (central to the brief), **strong**, **maybe**. Effort: **S**
(days), **M** (a unit), **L** (several units).

### 1. It comes back: a short, spaced return of what you studied

**Seen in.** Quantum Country and Orbit (first return at five days, intervals
times 2.3; outcomes Remembered, Forgotten, Skipped; forgotten prompts retried
at the end of the sitting; "Review complete"); Execute Program (fixed returns
at two days, a week, three weeks, two months); Readwise (half-lives of 7, 14,
28 days); Khan Academy's Mastery Challenge (six questions, at most twice a
day); Anki ("You have finished this deck for now").

**What it is.** Wherever LiveWell asks the reader a question he answers for
himself (a history session's *Check yourself*, a context guide's reveal, a
doctrine page's question, a catechism answer, a memory verse, a creed
phrase), the end of that block offers one quiet line: *Bring these back to me
later (on this device).* A few of the page's own questions (three to five,
chosen by the author) go onto a shelf with a date. They return on a fixed
ladder: **about five days, two weeks, five weeks, three months, then "kept."**
That is Orbit's start with Execute Program's simplicity, and Cepeda's
ridgeline says gaps of weeks suit a reader keeping something for a year.

**How a sitting works.** A question, then *Show the answer*; the answer, its
*why* (pattern 3) and a link back to the paragraph or verse it came from; then
three buttons: **I had it** (next step on the ladder), **Not yet** (returns at
the end of this sitting and again in five days), **Skip for now** (returns in a
few days, ladder unchanged). Two grades and a skip, never Anki's four. A
sitting is **never more than six questions** (Khan's six); if more are due, the
six oldest come and the rest wait without a number shown, because the backlog
is the thing that ends spaced repetition for most people and an overdue
question is barely harder than a due one. The sitting ends honestly: *That's
all for now. The next ones come back around Tuesday, November 24.*

**Where the reader meets it.** On the page the questions came from, a line
under the head when any are due (*Two questions from this session are ready to
look at again*), opening the sitting in place. On `/my-library`, a section
*Ready to look at again* listing sources, not counts of days. An optional
*Add a reminder* that writes a calendar entry through `lib/calendar.ts`
(`openIcs`), which the reader adds himself. Not on Home, which stays quiet; not
by notification; not by email.

**Data and code.** `lib/review.ts` over `lib/storage.ts`, key
`livewell-review-v1`: `{ id, source: href, qid, step, due, lastOutcome }`,
shape-guarded; `myProgress.ts` reads it for *Pick up where you left off*.
Questions live in the content they came from (session `retrieval[]`, context
guide, catechism, verse list) with stable ids, so the shelf stores only ids and
dates. One component, `ReviewSitting`, reused everywhere. One telemetry event,
`review_sitting_complete` with the source id only, added to the 9.9 list.

**Why it works.** Retrieval at a delay beats rereading; spacing beats massing,
with the best gap growing as the horizon grows; Matuschak's notes call the
evidence that such sessions produce durable memory "strong." It also answers
James's "draw people's attention" honestly: the site gives the reader a reason
to return that is about him keeping something, not about the site keeping him.

**Fit, effort.** Core · M.

**Evidence.** Orbit source (`spacedRepetitionScheduler.ts`, `event.ts`,
`ReviewSession.tsx`, `EmbeddedBanner.tsx`, `ReviewButtonBar.tsx`); Execute
Program spaced-repetition page and Matuschak's notes on it; Readwise
"Reviewing Highlights" FAQ; Khan "What are Mastery Challenges"; Anki
`scheduling.ftl`; Cepeda et al. 2008; Matuschak "Effects of the mnemonic medium
on reader memory."

### 2. Guess before you see

**Seen in.** *The Evolution of Trust* ("place your bets" before the
tournament; predictions answered "correct" and "incorrect" in the Noise
chapter); Brilliant ("often poses a question before showing a method");
Coursera's in-video quiz (74% of viewers attempted it; ungraded, never
required to continue); the pretesting effect.

**What it is.** Before a reveal, the reader commits to a guess in one tap or one
line; after the reveal, his guess stays beside the answer. Never before an
essay (MASTER-PLAN 6.2 refused that), never a gate (*Skip to the answer* is
always beside the question), never praise or apology: the reply is
information.

**On LiveWell.**
- *Context guides that reveal* (U45): before "what the first readers heard,"
  three short options or a one-line field ("What do you think this promised,
  and to whom?"). After: *You said: ... The first readers heard: ...*
- *The doctrine map* (A-SYNTHESIS pattern 8): "Is this a first-, second-, or
  third-order question? Your guess, then where the creeds land." It teaches the
  sorting the Scholarship Standard asks for by making the reader do it.
- *Hard chapters in the Study Bible* (the `hard` entries): "What would a first
  reader have found hardest here?" before the note opens.
- *History myth checks* (U32), already planned: this adds the evidence and one
  rule, that the reader's first answers return at the end of the session
  beside the story's answer.

Copy model: Evolution of Trust's structure, not its tone. Not "Congrats, you
placed your bet on the right horse," but *Here is what the record shows.*

**Why it works.** An attempt before study improves learning of the tested
ideas even when the attempt fails, beyond the effect of drawing attention
(Richland, Kornell and Kao, 2009); the guess also exposes the assumption the
reader brought, which is the Formation Standard's "cause" step made visible.

**Fit, effort.** Core · S.

**Evidence.** `ncase_trust/words.html` ids `place_your_bets`,
`tournament_winner_2_yay`, `tournament_winner_2_nay`, `noise_evo_2_2_correct`;
Brilliant "how Brilliant teaches math"; the Stanford in-video quiz study and
Vanderbilt guide; Richland et al. 2009.

### 3. The why under every answer, and one nudge before it

**Seen in.** Brilliant ("Why?" on every interaction, even when right); Khan's
Perseus ("Hint #1," "Get another hint," "Show solution"); Khanmigo's Socratic
withholding, and the frustration it caused learners without strong
metacognitive skills.

**What it is.** Every LiveWell question carries a `why`: two or three
sentences that give the reason, with the verse or source it rests on, shown
after the answer whether the reader had it or not. A question may carry one
`nudge` (a single hint, "Think about where Paul was when he wrote this"),
offered as *A nudge* before *Show the answer*. One nudge at most, then the
answer: help one step at a time, but never make a reader beg.

**On LiveWell.** Fields on every question object the site defines:
`{ id, q, a, why, ref, nudge? }` in session `retrieval[]` and `mythCheck[]`,
context-guide reveals, catechism recite, review sittings (pattern 1). The
`why` names its source, so the skeptic can check and the pastor can teach from
it.

**Why it works.** A right answer reached for a wrong reason is the commonest
false mastery; the reason is the part worth keeping. Graduated help keeps the
reader working without abandoning him.

**Fit, effort.** Strong · S.

**Evidence.** Google Play review quoted in search results; Perseus
`packages/perseus/src/strings.ts` (lines 932, 965 to 966); Khanmigo reviews and
the Pedley-Smith write-up.

### 4. Words and people open where you meet them

**Seen in.** Mathigon (401 glossary links and 81 biography links written into
the prose, with born and died years); Bret Victor's "contextual information";
Matuschak's notes site opening each link in a column beside the last, so the
trail stays visible.

**What it is.** Technical terms and named people in prose become quiet links
that open a sheet in place, not a new page. On wide screens the registry's
sheets stack side by side (Nicaea, then Athanasius from Nicaea, then Arius from
Athanasius), the earlier ones narrowing to their titles; on the phone, sheets
stack with *Back to Nicaea*. The stack lives in the URL
(`?e=nicaea-325&p=athanasius`), as MASTER-PLAN requires of shareable state.

**On LiveWell.** The glossary already exists: 114 terms in
`client/public/theology/theology-glossary.json`, each with a one-line `short`.
Add a `gloss:` link form to the in-house remark plugin in `Markdown.tsx` (U16
already turns references into `VerseRef` the same way); the sheet shows
`short`, opens `definition` on request, and links `seeAlso` and the doctrine
page. People, councils and controversies open their registry sheets (U30),
extended from sessions to essays, context guides and Study Bible notes. A
validator checks that every `gloss:` id resolves.

**Why it works.** CLAUDE.md asks for "technical theological vocabulary used
naturally, never defined condescendingly." This is how a text does both: the
prose says *homoousios* without apology and the reader who needs the word
taps it, without leaving the argument.

**Fit, effort.** Core · M.

**Evidence.** `mathigon_textbooks/content/*/content.md` (gloss and bio counts),
`content/shared/bios.yaml`, `glossary.yaml`; worrydream.com/ExplorableExplanations
and Wikipedia; Obsidian Sliding Panes README and forum thread.

### 5. "Kept," not "memorized": Scripture Memory that admits forgetting

**Seen in.** Anki and Orbit, where nothing is ever "memorized," only due later;
Orbit's starburst, which pictures each prompt by how long it has been held.

**What it is.** A repair of `/tools/scripture-memory`. Today a tap marks a verse
"memorized" for good (`livewell-scripture-memorized`) and the page shows "n of
40 memorized," a percentage and progress bars, the "68% complete" MASTER-PLAN
section 2 forbids. Replace the toggle with *Say it again in five days*, which
puts the verse on pattern 1's ladder. Use the four existing modes as a fading
scaffold: the first return in first-letter mode, later returns in fill-the-blank
and then full recall. Show each verse's state in words: *New*, *Comes back
Tuesday*, *Held about a month*, *Kept*. Drop the counter, the percentage and the
bars. On first visit after the change, read the old key once and ask: *You
marked 7 verses as memorized. Want them to come back so you can see whether they
stayed?*

**Why it works.** It tells the truth about memory, and it turns a one-time
drill into a practice that lasts a year at a few minutes a week.

**Fit, effort.** Core · S (after pattern 1).

**Evidence.** `client/src/pages/tools/ScriptureMemory.tsx` lines 16, 201,
398 to 528; Orbit `ReviewStarburst.tsx`; Anki `studying.ftl`.

### 6. A question for the week

**Seen in.** Matuschak's salience prompts ("to cause you to think certain
thoughts when situations or mental states arise"); timeful texts and the Aro
course that spirals back weeks later; Readwise's Themed Reviews delivered on
chosen days.

**What it is.** Some units end with one question meant not to be recalled but
carried: it names a situation the reader will meet and asks what this teaching
would mean there. It goes onto pattern 1's shelf with its own short schedule
(back after about three days and again after about three weeks, then retired),
and it is answered with a line on the device ("Did this come to mind this
week? Write a line if it did."), never graded.

**On LiveWell.** The last line of a care-plan week; a history session's
*Where we do this too* mirror; a topic page's foot; the grown-ups line of a
family devotion. Wording is James's; an illustration of the form for the
politics topic, built on Jeremiah 29 (named in benchmark gap 2): *This week,
when someone says the nation must be won back, what did Jeremiah tell the
exiles in Babylon to do?*

**Why it works.** The Formation Test asks whether the reader is "better able to
see," able to apply what he met "to a situation we never named." Of everything
in this research, salience prompts are the only mechanism built for that
transfer. They also keep the shelf from becoming a quiz deck.

**Fit, effort.** Core · S (after pattern 1; the writing is James's).

**Evidence.** notes.andymatuschak.org "Salience prompts," "2020-07-28 Timeful
texts," "The mnemonic medium can be adapted to author an experience which
unfolds over time"; Readwise Themed Reviews documentation.

### 7. Say it so James would sign it

**Seen in.** *Why books don't work* (the readers who absorb a book are those who
summarize and synthesize); Nielsen (writing the card is how the reader comes
to understand); Readwise's Mastery cards; CLAUDE.md's steelman standard ("in
the form its own defenders would sign").

**What it is.** At an essay's foot, as the first item of the existing *To think
about, or talk about* block (MASTER-PLAN 6.2, item 1, so no new panel): *Before
you agree or disagree, say the argument in three sentences, in a form James
would sign.* A field kept on the device, then *Compare with James's own*
reveals an `argumentInBrief` field, three sentences James writes or approves.

**Why it works.** It turns the steelman discipline the platform asks of itself
onto the reader's reading of James. The skeptic who can state the case fairly
earns his disagreement; the doubting Christian finds out what she actually
took from it; the pastor gets a group exercise that works in ten minutes.

**Fit, effort.** Strong · S (a field and a small component; three sentences
per essay from James, a James gate).

**Evidence.** andymatuschak.org/books (via LessWrong and SuperMemo wiki
excerpts); Nielsen, *Augmenting Long-term Memory*; Readwise docs.

### 8. A source you read alone

**Seen in.** *The Evolution of Trust*'s Sandbox, handed to the reader only after
the guided chapters; Execute Program's prompts, which ask the learner to
*apply*, not recognize; Brilliant's problems.

**What it is.** After a history session's *Check yourself* and before *Talk
about it*: one short, verified primary-source excerpt the session did not
discuss, with two questions only: *What is this writer afraid of?* and *Where
do we do this?*, then *How others have read it*, a short note revealed on
request. The reader's lines stay on the device. The family edition reads one
sentence of it aloud with one question.

**On LiveWell.** A `transfer` block in the session JSON
(`{ sourceId, excerptId, questions[2], note }`), drawn from the registry's
verified excerpts so `verify-sources.mjs` (U07) gates it like every other card.

**Why it works.** It is the Formation Test's last question asked directly: can
the reader see with the session's eyes where the session did not point? It
also teaches the method of Part 0, *How to Read the Dead*, by practice.

**Fit, effort.** Core · M (content per session).

**Evidence.** `ncase_trust/js/slides/7_Slides_Sandbox.js` and `words.html`
`sandbox_*`; Matuschak's notes on Execute Program.

### 9. Look back over the whole Part

**Seen in.** Khan Academy's Course Challenge ("a sampling of skills from the
entire course") and mixed-skill assessments; Mastery Challenges.

**What it is.** At the end of each history Part, each act of the 2027 story
plan, and each eight-week care plan, before the closing rite (A-SYNTHESIS
pattern 15): *Look back over Part I*, eight questions drawn from every
session's `retrieval[]`, in mixed order, tap to reveal, *why* shown, each
linking back to its session, with *Bring these back* into pattern 1. No score,
no level.

**Why it works.** Mixed questions across a whole unit force the reader to
choose which idea applies, which is what keeping a course means; it also gives
the closing rite a substance to close over.

**Fit, effort.** Strong · S (the questions already exist).

**Evidence.** Khan help center, "How do Khan Academy's Mastery levels work?"
and "What are Course and Unit Mastery?"

### 10. Questions held to the prose's standard

**Seen in.** Matuschak's *How to write good prompts* (precise, consistent,
aimed at what matters); Quantum Country's prompts, written by the authors; his
finding that five questions caused more than a quarter of the failures;
Brilliant's reviewers, who met wrong answers and questions with no single
answer; Mathigon's content development guide.

**What it is.** A one-page question style guide and a validator. The guide: one
idea per question; an answer that fits in a sentence; ask what matters, not
what is easy (a date only when the date is the point); every question has a
`why` and a reference; never a true-or-false on a second-order question, which
the Scholarship Standard leaves open (ask *What does each side fear losing?*
instead). `scripts/validate-questions.mjs` checks the shape across every file
that holds questions: required fields, answer length, references parsed by
the shared parser (U09), a `secondOrder` flag that forbids true/false. Then,
with James's agreement, one anonymous telemetry event, `review_outcome` (a
question id and "had it" or "not yet," nothing about the person), so the few
questions that mislead most readers can be found and rewritten each quarter.
The question is fixed, never the reader.

**Why it works.** Every pattern above is only as good as the questions in it,
and the questions are content held to the same integrity rules as the prose.

**Fit, effort.** Strong · S to M (the telemetry event needs the 9.9 list and
James's yes).

**Evidence.** andymatuschak.org/prompts (via mirrors); notes on Quantum
Country's 2022 letter; Brilliant reviews; Mathigon README (content guide).

### 11. Lines you kept, read again

**Seen in.** Readwise's Daily Review (half-life resurfacing), Themed Reviews,
Frequency Tuning and export.

**What it is.** *Keep this line* on any paragraph of an essay, any verse in the
Study Bible, any source card; the line, its title, link and (for Scripture) its
translation are saved to My Library. `/my-library` gains *Lines you kept*: a
*Read again* set of five each week, oldest and least-seen first; themes the
reader names ("suffering," "the church") or by source; *Print my lines* as a
commonplace page; *Send to myself* through the #534 *Take it with you* row. No
streak, no widget, no count of days.

**On LiveWell.** Extend `LibraryItem` in `lib/library.ts` with `quote` and
`anchor`; paragraph anchors on essays (U23 already measures the essay body);
attribution travels with every line.

**Why it works.** The reader's own choices are the most personal prompts there
are, and seeing them again is how a book becomes part of a life. Nielsen's
"memory as a choice," without the card-writing burden.

**Fit, effort.** Strong · M.

**Evidence.** docs.readwise.io "Reviewing Highlights"; Readwise changelog;
App Store listing.

### 12. Step through, never locked

**Seen in.** Mathigon's steps and goals ("You have to complete the activities to
reveal what's next"), Execute Program's locked lessons and Duolingo's linear
path, against Coursera's in-video quiz that never blocks and Brilliant's one
concept at a time.

**What it is.** A rule and one shared primitive for anything shown in steps
(Trace the argument, table mode, an explorable's chapters, a myth check): the
whole list of steps is visible from the start ("6 steps"); *Next* is always
active; every question has *Show me* beside it; the place is remembered on the
device; one idea per step on the phone.

**Why it works.** Steps lower the cost of starting and keep attention on one
idea; locks tell an adult he may not read on. The first without the second is
what keeps patterns 2, 8 and 13 from becoming Mathigon.

**Fit, effort.** Strong · S (`Steps` primitive in the study primitives set).

**Evidence.** `mathigon_textbooks/content/shared/hints.yaml`
(`tutorial1`), `content/circles/content.md` (`> goals:`, `{.reveal(...)}`);
Execute Program notes; Vanderbilt in-video quiz guide.

### 13. A few explorables, only where the idea is a mechanism

**Seen in.** Bret Victor's reactive documents; *The Evolution of Trust* (a real
event first, play, bet, then the sandbox, with sourced footnotes);
Ciechanowski's *Mechanical Watch*; Red Blob Games' caution that readers must
run the mechanism themselves and that most problems do not need
interactivity; Distill's "paths and staircases."

**What it is.** No more than three interactive pages, each where the idea is a
process the reader can operate, each with a plain-text equivalent, inline SVG
colored from tokens, no library, still under reduced motion, and none inside an
essay's argument:
- **How a text survives copying.** The reader copies a short line through
  generations of scribes, a slip creeps in, the copies spread; then he compares
  many copies and finds the slip. The mechanism behind "Is the Bible
  reliable?", the first topic in benchmark 1.2. A bet first ("Will comparing
  ten copies find the original?"). Claims about real manuscripts stay in the
  cited context guide.
- **Alive in the same year.** The timeline's planned "alive in a given year"
  filter (MASTER-PLAN 7.2) made reactive: a year the reader drags, and the
  page reshows who was alive, which councils had met, which creeds stood. A
  Victor reactive document built from the registry's own dates.
- **Which books, listed by whom, and when.** Early lists of New Testament books
  set side by side by date; the reader turns a list on to see what it holds.
  Every list and date chosen from verified primary sources in the U07 survey
  before anything is drawn.

Build one, after James has judged the history slice; build the next only if
the first is used.

**Why it works.** Where the idea is a mechanism, operating it is the shortest
way to understanding, and it is the honest form of the attention James asked
for. Where it is not, interactivity costs more than it teaches (Red Blob; the
CHI 2026 study in `benchmark.md` found engagement up and comprehension level).

**Fit, effort.** Strong for the first, maybe for the others · L.

**Evidence.** `ncase_trust` (chapter files, `words.html`, `notes/notes.md`);
worrydream.com; HN thread on *Mechanical Watch*; redblobgames.com/x/2046;
distill.pub/2017/research-debt.

### Also considered, not ranked

- **Learning objectives at a module's start** (Coursera). The A-wave's "roadmap
  of questions, on screen one" already covers it in a better form.
- **A filmed teacher and a printed workbook** (MasterClass). James's recorded
  readings and the session handouts are already planned (MASTER-PLAN 6.2 item
  12; 7.2 item 8); MasterClass shows the workbook earns its keep only with real
  exercises.
- **The starburst as a picture** (Orbit). Lovely and honest, but a drawn
  measure of a reader's memory invites comparison; words ("held about a
  month") carry the same information with less pull.
- **A summary mode** (Blinkist, Ghostreader). Refused; see section 5.
- **An AI tutor** (Khanmigo). Refused by MASTER-PLAN ("an AI chat box"), and the
  frustration evidence agrees.

---

## 5. What to avoid

Each item is in a product above and would betray "Unhurried. Weighted.
Grown-up." or the integrity rules.

1. **Streaks in any form, including forgiving ones.** Duolingo's streak (600+
   experiments; freezes sold for in-app currency), Brilliant's daily minimum
   and Streak Charges, Readwise's streak with a seven-day "recover" and
   merchandise at one month and one year. A forgiving streak is still a
   streak: it measures attendance and teaches the reader to protect a number.
2. **Leagues and leaderboards** (Brilliant, Duolingo). Ranking readers of
   Scripture against each other is a category error.
3. **Engineered reminders and guilt.** Duolingo's bandit-tuned notification
   templates (for a 0.5% lift in daily users), widgets that change mood when a
   lesson is skipped, "passive-aggressive notifications." LiveWell offers a
   calendar entry the reader adds himself, and nothing else.
4. **Commitment tricks in copy.** "Commit to my goal" beating "continue";
   asking for a goal that is never used, because asking makes people stay.
   LiveWell's copy states and invites; it never works on the reader's will.
5. **Locked steps and prerequisites.** Mathigon's "You have to complete the
   activities to reveal what's next," Execute Program's locked lessons,
   Duolingo's path that removed choice. Every step is skippable; every answer
   can be shown.
6. **Praise, apology and celebration.** Mathigon's thirteen emoji praise lines
   ("Impressive! :trophy:"), Duolingo's animated streak flame, *Evolution of
   Trust*'s "Congrats, you placed your bet on the right horse." The reply to a
   check is information.
7. **Grades of a person.** Khan's Attempted, Familiar, Proficient, Mastered;
   course percentages and mastery points; and LiveWell's own "n of 40
   memorized" with its percentage and bars (pattern 5 removes them). Time held,
   in words, is the only measure.
8. **Backlogs and due counts.** Anki's growing pile, the reason most people quit
   spaced repetition. Never show "37 due"; a sitting is six at most and ends
   honestly.
9. **Fine-grained self-grading.** Anki's Again, Hard, Good, Easy, and its own
   warning that lower retention "can be demoralizing." "I had it," "Not yet,"
   "Skip" is enough.
10. **Summaries that replace the reading.** Blinkist's fifteen minutes and its
    single house voice; Reader's AI summaries. An "In brief" points into the
    text and never stands in for James, the witnesses, or Scripture.
11. **Inbox and feed models of reading.** Reader's Inbox, Later and Archive
    turn a library into a queue to clear; LiveWell is a library and a room.
12. **An AI tutor or chat** (Khanmigo): forbidden by MASTER-PLAN, and its own
    record shows withholding designs frustrate the learners who most need
    help.
13. **Inspiration without practice.** MasterClass's "no quizzes, no
    interactive exercises," celebrity as the product. Every LiveWell study
    unit gives the reader something to do.
14. **Deadlines, certificates and grades** (Coursera), including the reset
    that loses a learner's work. LiveWell has dates as doors, not deadlines.
15. **Interactivity as spectacle.** The widget that changes inputs while the
    page computes (Red Blob's warning), the explorable built because explorables
    are admired. Pattern 13's test: is the idea a mechanism the reader can run?
16. **Questions inside the argument, and quizzes before essays.** Quantum
    Country's medium suits primers, not arguments; MASTER-PLAN 6.2 already
    refuses a myth check before an essay. Questions come after the argument or
    in study units built for them.

---

## 6. What I could not see

- **Brilliant's screens**: the lesson layout, how "Why?" is drawn, the type and
  color, and the course and path structure; the Screens Design recording was
  found but not viewable; the "6x more effective" claim's source.
- **Khan Academy's redesigned course and mastery pages** (only help-center
  descriptions, possibly older than the redesign); whether hints cost mastery;
  any Khanmigo guardrail document; Khan's own account of Khanmigo outcomes.
- **Duolingo's primary streak data**: every streak claim reached me through
  podcast summaries or third-party analyses; the 2022 path change is sourced to
  one weak article; nothing on Duolingo's unit guidebooks or "Explain my
  answer."
- **Readwise Reader's reading view**: progress, time left, highlighting
  interaction, Ghostreader's behavior; Readwise's Mastery card formats (whether
  question-and-answer or cloze); how many highlights a Daily Review shows; the
  completion screen.
- **Quantum Country's live essay UI**: I read Orbit, its successor platform; I
  did not confirm the live site uses the same strings or layout.
- **Matuschak's own text** of *Why books don't work* and *How to write good
  prompts* (seen through excerpts and mirrors), the full note on primers, and
  the "titles as claims" principle (secondary only).
- **Nicky Case's "How I Make Explorable Explanations"** and the workshop's
  design-pattern diagrams (not returned by search); *Parable of the Polygons*'
  source (not cloned).
- **Bartosz Ciechanowski's articles and process** (only Hacker News
  discussion); Bret Victor's essay text, including whether it uses the "ladder
  of abstraction."
- **Coursera's own help center** on module pages, objectives, interactive
  transcripts and Coursera Coach.
- **MasterClass's class page and a workbook's contents**; the launch date of
  Sessions.
- **Blinkist's app** beyond its fifteen-minute key ideas.
- **Mathigon's live interface** and its content development guide (a Notion
  page); I saw only the content source and strings.
- **Any controlled study of Brilliant, Readwise or MasterClass outcomes.**
- **LiveWell's own data**: whether anyone uses `/tools/scripture-memory`, the
  glossary, or My Library (Vercel analytics would say, and should be read
  before pattern 5 or 11 is scheduled).

---

## 7. Evidence

### LiveWell files read

- `CLAUDE.md`; `docs/work/plan/benchmark.md`; `docs/work/plan/MASTER-PLAN.md`
  (sections 0 to 3, 6.2, 7, 9.9); `docs/work/design/research/A-courses-learning.md`
  (sections 2.15, 3, 5, 6) and `A-SYNTHESIS.md` (patterns 14, 15, 22, 25,
  section 3, 4.3).
- `client/src/pages/tools/ScriptureMemory.tsx` (modes line 16; key line 201;
  counter and percentage lines 398 to 418; category bars to line 528).
- `client/src/lib/myProgress.ts`, `lib/library.ts`, `lib/readProgress.ts`,
  `lib/calendar.ts`, `lib/telemetry.ts`, `lib/storage.ts` (exports).
- `client/src/pages/TheologyGlossary.tsx` and
  `client/public/theology/theology-glossary.json` (114 terms).
- `client/src/App.tsx` (routes `/my-library`, `/theology/glossary`,
  `/tools/scripture-memory`, `/study/bible/*`, `/theology/history/*`,
  `/answers`, `/plans/:slug`, `/studyguides/:slug`, `/theology/creeds`).

### Source code read (cloned into the scratchpad `design-src/`)

- **Orbit** (`andymatuschak_orbit`): `Readme.md`;
  `packages/core/src/event.ts` (outcomes); `core/src/schedulers/spacedRepetitionScheduler.ts`
  (five-day first interval, growth 2.3) and its test; `app/src/embedded/EmbeddedBanner.tsx`
  (banner copy); `app/src/reviewSession/ReviewSession.tsx` (retry queue);
  `ui/src/components/ReviewButtonBar.tsx` (button labels);
  `ui/src/components/ReviewStarburst.tsx`, `Starburst.tsx`, `StarburstLegend.tsx`
  (rays sized by interval).
- **The Evolution of Trust** (`ncase_trust`): `README.md` (public domain;
  libraries); `js/slides/` (chapter files 0 to 9 and footnotes);
  `words.html` (ids and copy: intro, bets, winner replies, noise predictions,
  sandbox, conclusion, "forgot who's who"); `notes/notes.md` (sources and
  asides).
- **Perseus** (`Khan_perseus`): `packages/perseus/src/strings.ts` (hint and
  feedback strings), counts of strings across `packages/*/src`.
- **Anki** (`ankitects_anki`, sparse): `ftl/core/studying.ftl` (Again, Hard,
  Good, Easy, Show Answer), `scheduling.ftl` ("Congratulations! You have
  finished this deck for now."), `deck-config.ftl` (desired retention tooltip,
  line 424).
- **Mathigon** (`mathigon_textbooks`): `README.md`; `content/circles/content.md`
  (76 steps, 48 blanks, `> goals:`, `{.reveal(when=...)}`, chapter metadata);
  `content/game-theory/content.md`; `content/shared/hints.yaml` (Archie,
  tutorial lines, praise and incorrect lines), `bios.yaml`, `glossary.yaml`;
  gloss and bio link counts across `content/*/content.md`.

### Brilliant

- [How Brilliant teaches math](https://brilliant.org/resources/choosing-brilliant/how-brilliant-teaches-math/): question before method; guided discovery; simplest useful case; feedback while reasoning.
- [Why Brilliant](https://brilliant.org/help/why-brilliant): contrast with Khan; no videos; "6x" claim.
- [App Store listing](https://apps.apple.com/us/app/-/id913335252): bite-size lessons, one concept at a time; team background.
- [What is a streak](https://brilliant.org/help/features/what-is-a-streak), [What is a Streak Charge?](https://brilliant.org/help/features/what-is-a-streak-charge/): three problems or a lesson a day; up to two charges.
- [A Review: Brilliant (Substack)](https://cedarlila.substack.com/p/a-review-brilliant): thin explanations, faulty questions, leagues and streaks unnecessary.
- [grand-screen.com reviews](https://grand-screen.com/apps/brilliant-learn-by-doing/reviews/): the "Why?" feature on every interaction.
- [Screens Design showcase](https://screensdesign.com/showcase/brilliant-learn-by-doing): screen recording (not viewed).

### Khan Academy

- [How do Khan Academy's Mastery levels work?](https://support.khanacademy.org/hc/tr/articles/5548760867853): levels and thresholds; mixed-skill assessments move skills up or down.
- [What are Mastery Challenges](https://support.khanacademy.org/hc/tr/articles/360037494231-What-are-Mastery-Challenges): six questions, three skills, one per 12 hours, math only.
- [What are Course and Unit Mastery?](https://support.khanacademy.org/hc/en-us/articles/115002552631): course page, unit page, Course Challenge, post-activity card, redesign.
- [Unit Mastery beta post (2018)](https://support.khanacademy.org/hc/fr/community/posts/115001845151/comments/115001154812): legacy points.
- [Khanmigo review (NYU blog)](https://nexus.sps.nyu.edu/post/khanmigo-the-future-of-tutoring-or-something-bigger), [Pedley-Smith, Lessons from Khanmigo](https://pedley-smith.uk/tag/khanmigo/), [JetLearn](https://www.jetlearn.com/blog/how-uk-students-are-using-khanmigo-socratic-and-ai-tutors----and-whats-actually-worth-your-time): Socratic design, "think before it speaks," frustration for some learners.
- Perseus source (above).

### Duolingo

- [Lenny's Podcast summary: Duolingo streaks (Jackson Shuttleworth)](https://www.recall.it/summary/lennys-podcast/behind-the-product-duolingo-streaks-or-jackson-shuttleworth-group-pm-retention-team): 600+ experiments; "most impactful feature"; freezes; "commit to my goal."
- [Lazyweb: streak goals and retention](https://lazyweb.com/research/duolingo-streak-goals-retention): goal choice never stored still helped; widgets, icons, Perfect Streak Week.
- [Deconstructor of Fun: streak mechanics](https://duolingo.deconstructoroffun.com/mechanics/streaks): 84-day celebration with animated flame.
- [Settles and Meeder, ACL 2016](https://preview.aclanthology.org/fix_video/P16-1174.pdf), [Duolingo blog, How we learn how you learn](https://blog.duolingo.com/how-we-learn-how-you-learn): half-life regression; 45% error reduction; +12% engagement; 9.5% retention.
- [Yancey and Settles, KDD 2020](https://paperswithcode.com/paper/a-sleeping-recovering-bandit-algorithm-for), [Vicki Boykis, Duo, the Push, and the Bandits](https://vicki.substack.com/p/duo-the-push-and-the-bandits): notification bandit; +0.5% DAU, +2% new-user retention; random templates before.
- [Unstar review analysis](https://unstar.app/blog/language-learning-app-reviews-duolingo-babbel-rosetta-stone-2026), [The Decision Lab, Streak Creep](https://thedecisionlab.com/es-ES/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification), [Meteora on the path change](https://meteoraweb.com/en/news/duolingo-breaks-users-language-courses-updates-erase-learning-progress): mechanics over learning, notification guilt, burnout, path protests.
- [TechRepublic](https://www.techrepublic.com/article/news-duolingo-ai-strategy-backlash/), [Slashdot / Fast Company](https://tech.slashdot.org/story/25/05/25/0347239/), [Fortune](https://fortune.com/2025/08/18/duolingo-ceo-admits-controversial-ai-memo-did-not-give-enough-context-insists-company-never-laid-off-full-time-employees): the AI-first memo and backlash.

### Readwise and Reader

- [Reviewing Highlights (docs)](https://docs.readwise.io/readwise/docs/faqs/reviewing-highlights): half-life algorithm, 7/14/28-day starts, 50% threshold, "black box," Frequency Tuning, Themed Reviews, Mastery key.
- [Readwise changelog: stats](https://readwise.io/changelog/stats), [iOS widget](https://readwise.io/changelog/ios-widget), [audio reviews](https://readwise.io/changelog/audio-reviews): streak days, seven-day recovery, merchandise, widget behavior.
- [App Store listing](https://apps.apple.com/us/app/-/id1476885528): highlights to flashcards; Themed Connections on Saturdays.
- [Readwise CLI](https://readwise.io/cli), [The Sweet Setup on Reader](https://thesweetsetup.com/readwise-reader-a-very-good-modern-rss-app/), [lilys.ai summary](https://lilys.ai/en/notes/lilysai-20260829/readwise-reader-process-everything): Library, Feed, Inbox, Later, Shortlist, Archive.
- [WiseUp vol. 78](https://wiseup.readwise.io/wiseup-vol-78-capture-your-best-ideas-our-summer-reading-list-and-gpt-5-6-in-ghostreader/), [tft.digitalpress.blog](https://tft.digitalpress.blog/readwise-reader-revolutionizing-the-reading-experience/): show clock, Ghostreader, export template.

### Anki and spaced repetition

- Anki source strings (above).
- [Ease-Hellish in FSRS (forum)](https://forums.ankiweb.net/t/ease-hellish-in-fsrs/44622), [FSRS deck stuck in ease hell](https://forums.ankiweb.net/t/fsrs-one-of-my-decks-is-stuck-in-ease-hell/70644): stalls and backlogs under FSRS.
- [studycardsai on Anki settings](https://studycardsai.com/blog/anki-settings-for-med-school): backlog burnout; overdue cards not much harder (vendor).
- [Nielsen, Augmenting Long-term Memory (via MetaFilter)](https://metafilter.com/175896/Augmenting-Long-term-Memory), [Notion mirror](https://robertphd.notion.site/Augmenting-Long-term-Memory-e0ea381650ff4d5d9cb17990f6f1cef9): "memory a choice," atomic cards, five-minute rule.

### Quantum Country, Orbit, Matuschak

- Orbit source (above).
- [Matuschak and Nielsen, How can we develop transformative tools for thought (Goodreads repost)](https://www.goodreads.com/author_blog_posts/19121247-andy-matuschak-and-michael-nielsen-how-can-we-develop-tr): 112 embedded questions; conceptual memory.
- [Balaji Srinivasan, Quantum computing and proof-of-memory](https://balajis.com/p/quantum-computing-and-proof-of-memory): review every few hundred words; email days later.
- [Effects of the mnemonic medium on reader memory](https://notes.andymatuschak.org/zt1TyUANyt84UkQVBJjWEGZ3JUd2HP92r65): evidence grades; 29% to one month; several hundred readers past a month.
- [2022-02-28 Patreon letter](https://notes.andymatuschak.org/z93QR51f6HAUPLVDxE6KT1T): five questions, more than a quarter of failures.
- [Mnemonic medium](https://notes.andymatuschak.org/Mnemonic_medium), [works well for linear primers](https://notes.andymatuschak.org/zP8MVDmomB7UrTddVY34E1B): boredom without new prompts; data-dense texts; primers.
- [Why books don't work](https://andymatuschak.org/books/) (via [LessWrong](https://www.lesswrong.com/posts/6SwmRb89mwcph3wL2/why-books-don-t-work) and [SuperMemo wiki](https://supermemo.guru/wiki/Books_don%27t_work)); [Bernoff's rebuttal](https://bernoff.com/blog/why-books-work-a-rebuttal-to-andy-matuschak).
- [How to write good prompts](https://andymatuschak.org/prompts/) (via [Obsidian mirror](https://publish.obsidian.md/manuel/Readwise/Articles/RWISE+-+How+to+Write+Good+Prompts+Using+Spaced+Repetition+to+Create+Understanding)); [Writing good prompts is hard](https://notes.andymatuschak.org/Writing_good_spaced_repetition_memory_prompts_is_hard).
- [Salience prompts](https://notes.andymatuschak.org/zF8pCkzLVarNsaFyBxF9Aib), [Unusual applications of spaced repetition](https://notes.andymatuschak.org/Unusual_applications_of_spaced_repetition_memory_systems).
- [2020-07-28 Timeful texts](https://notes.andymatuschak.org/zWCmm4xBhzeviqd5XLkVpCW), [an experience which unfolds over time](https://notes.andymatuschak.org/zvzwYeFU3Au4Ya2uVh2k3BUu8udZB7NSrAdL): Aro course spiraling back.
- [Evergreen notes should be concept-oriented](https://notes.andymatuschak.org/Evergreen_notes_should_be_concept-oriented), [fabric.so on evergreen notes](https://fabric.so/learn/evergreen-notes): atomic, concept-oriented, densely linked; claim titles (secondary).
- [Sliding Panes plugin](https://github.com/deathau/sliding-panes-obsidian), [Obsidian forum](https://forum.obsidian.md/t/sliding-panes-andy-matuschak-mode-plugin/7652/47): columns inspired by Matuschak's site; later in Obsidian core.
- [Execute Program (Matuschak notes)](https://notes.andymatuschak.org/Execute_Program), [Execute Program spaced repetition](https://www.executeprogram.com/spaced-repetition), [lessons don't unlock until prerequisites are reviewed](https://notes.andymatuschak.org/zHLWyC5LVXZLWE9RmoC1gua): four delays; locks; short lessons.

### Explorable explanations

- [Bret Victor, Explorable Explanations](https://worrydream.com/ExplorableExplanations/), [Wikipedia](https://en.wikipedia.org/wiki/Explorable_explanation), [futureofcoding notes](https://futureofcoding.org/notes/bret-victor/explorable-explanations): 2011; three methods; Tangle; criticism.
- [Nicky Case, Explorable Explanations](https://blog.ncase.me/explorable-explanations), [the plan](https://blog.ncase.me/explorable-explanations-the-plan), [Data Stories 103](https://datastori.es/103-explorable-explanations-with-nicky-case/), [Red Blob Games course notes](https://redblobgames.com/x/2306-educ432): workshop patterns, definition, Parable of the Polygons, critiques.
- *The Evolution of Trust* source (above).
- [HN thread, Mechanical Watch](https://hn.nuxt.dev/item/48553550), [simon-frey.com](https://simon-frey.com/links/category/reads/mechanical-watch-article), [sevarg.net](https://conversation.sevarg.net/t/mechanical-watch-yes-that-guy/670): 3D models; reception; Patreon at the bottom; reader-built model.
- [Red Blob Games, Ink and Switch note](https://www.redblobgames.com/x/2046-ink-and-switch), [Bill Mill's note on how he writes](https://notes.billmill.org/programming/SVG/redblobgames_how_I_write_a_tutorial.html): one diagram first; readers must run the algorithm; interactivity only where it helps.
- [Distill, Research Debt](https://distill.pub/2017/research-debt/): interpretive labor; distillation; staircases.

### Mathigon

- Mathigon source (above); [About Mathigon](https://mathigon.org/about); [Amplify acquisition](https://amplify.com/news/amplify-acquires-k-12-mathematics-education-innovator-mathigon/).

### Coursera

- [Warwick Coursera learner guide](https://warwick.ac.uk/services/its/servicessupport/academictechnology/ldcu/workshops/university_of_warwick_-_coursera_learner_guide.pdf): deadline reset; Grades tab; retakes.
- [DeepLearning.AI forum on resets](https://community.deeplearning.ai/t/how-can-i-reset-the-course-deadline-i-am-not-trying-to-pursue-a-grade/270822), [lost grades after reset](https://community.deeplearning.ai/t/i-reset-the-course-deadlines-and-lost-my-grades/33773).
- [Stanford in-video quiz study](https://swap.stanford.edu/was/20140911222256mp_/http://hci.stanford.edu/publications/2016/invideo/invideo-las2016.pdf): 74% attempt; seeking back.
- [Vanderbilt BOLD: Coursera in-video quizzes](https://www.vanderbilt.edu/bold/?p=286): ten seconds; one per 8 to 10 minutes; ungraded; not required.
- [Stony Brook MOOC guidance](https://you.stonybrook.edu/mooc/?p=10): objectives; formative and summative.

### MasterClass

- [Reviewed.com](https://reviewed.com/lifestyle/features/masterclass-review-celebrity-online-education-worth-money), [Develop Good Habits](https://www.developgoodhabits.com/masterclass-review/), [Edubracket](https://edubracket.com/articles/masterclass-review-2026), [The Write Practice on Gaiman](https://thewritepractice.com/neil-gaimans-master-class/), [selfpublishing.com](https://selfpublishing.com/masterclass-review/): inspiration over instruction; production; workbooks; 20 lessons of 10 minutes.
- [MasterClass Sessions](https://www.masterclass.com/sessions), [scholarships360](https://scholarships360.org/college-admissions/what-is-masterclass/), [help center: how do classes work](https://www.masterclass.com/help-center/masterclass/answers/how-do-classes-work--id--GfYxwjzXQuSxglxsayS8Hg): 30-day sections, peer feedback, platforms.

### Blinkist

- [Book Riot review](https://bookriot.com/?p=437881), [Shortform](https://www.shortform.com/blog/hub/?p=3707), [Blinkist's own review page](https://www.blinkist.com/de/learn/blinkist-review-2026-an-honest-look-at-what-you-get), [alexkwa.com](https://alexkwa.com/blinkist-review/): fifteen minutes; nuance stripped; house voice; human editors (claim).

### Research

- [Richland, Kornell and Kao, 2009 (PDF)](https://learninglab.uchicago.edu/Pre-Testing_files/RichlandKornellKao.pdf), [Scientific American, The Pluses of Getting It Wrong](https://www.scientificamerican.com/article/the-pluses-of-getting-it-wrong/): the pretesting effect; Kornell, Hays and Bjork 2009.
- [Cepeda et al., 2008 (PubMed)](https://pubmed.ncbi.nlm.nih.gov/19076480/), [author PDF](https://www.evullab.org/pdf/CepedaVulRohrerWixtedPashler-PS-2008.pdf): the spacing ridgeline.
- Settles and Meeder 2016; Yancey and Settles 2020 (above).
