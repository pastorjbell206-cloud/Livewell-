# The skeptical first-time visitor

**Lens.** He is intelligent, a little wounded by church, and he typed "what does post-Christian mean" into a search box. What does he see in the first 3 seconds, and in the first 30? Does he trust it, does he stay, what does he do next, and what would bring him back? I narrate his path page by page from the screenshots.

**Evidence.** I read every `-phone-first.png` in `docs/work/design/shots/current/`. I cut the full-page phone and desktop shots of the home page, `/writing`, the essay, `/about`, `/books`, `/subscribe`, Test the Case, Which Lens, church history, the Apostolic Age essay, `/help` and John 1 into readable segments. I checked a few facts in the repo: `vercel.json`, `client/src/lib/shelf.json`, `client/src/components/RetiredEssayNotice.tsx`, `client/src/components/SegmentedSignup.tsx`, `client/public/history/essays/after-christendom-era.json` and `client/src/pages/Answers.tsx`. James's portrait was a gray placeholder in the capture, and 14 essays had no dates or reading times because the database was stubbed. I do not fault the site for anything the stubs removed.

---

## Verdict

The writing would keep this man. The site loses him before he reaches it. He came for a definition and the site has none. "Post-Christian America" is the home H1, and it is never defined. Every page once built for the subject now either redirects to an essay section holding one essay or answers "James is revising this essay." The front door talks to people who already follow Jesus ("the culture around you no longer shares your assumptions," "the creeds you confess"). It hides the two things made for him, Test the Case and Honest Answers, in a tools drawer and the footer. Where an answer should be, it gives him two essays on Christian nationalism and a red, white and blue book cover. James's own voice wins trust one page at a time:

- "If you do not believe any of this, I am not going to pretend your reasons are stupid," on `/about`
- "What this move does not settle," in Test the Case
- Tacitus, "no friend of the faith," in the church history

The seams lose it again, and a man hurt by church is trained to find seams. `/about` says 21 books. `/books` says "Three books. Every word mine." and explains that the rest were taken down. A shelf "kept short on purpose" holds "When Fear Becomes Theology" and "When Fear Rewrites Theology" one section apart, and church history counts two overlapping series as one list of 22. Would he stay? For one essay, if he finds it. Would he come back? Nothing gives him a reason. No list shows a date, nothing says what is new, and the newsletter will not take his address until he labels himself. The redesign's first job is not decoration. It has three parts: answer his question on the first screen in James's voice, put the skeptic's door on the home page, and close the seams.

---

## The path, page by page

### 0. Before the page: the search result

He never sees a page built for his question. The home page's title is "LiveWell by James Bell," a name he does not know. Its description promises "A Study Bible with notes on every chapter," which he did not ask for. The URL built for this exact query, `/post-christian`, once a landing page titled "The Post-Christian Series: 60 Essays on Faith, Doubt, and What Remains," now 301s to `/writing?section=after-christendom` (`vercel.json`). So does `/exile`. That section holds one live essay. Its five siblings are "The End of Home-Field Advantage," "The Rise of the Nones," "Is the American Church Really Being Persecuted?," "What a Christian Owes the City" and "The Anabaptist Option." Every one is pending and answers with the revising notice. The notice is `noindex`, so search engines drop the obvious essay. Old shares and links still land on it.

**Critical. The site never answers the question that brought him.**
- **Where:** the home H1, `/post-christian`, `/exile`, `/writing?section=after-christendom`, and the history essay `/theology/history/after-christendom-era`.
- **What is wrong:** the subject that defines the site has no page that says what it is. The best candidate is the era essay "After Christendom: The era the reader is standing in." It never uses the word "post-Christian," and it is the 22nd and last card on `/theology/history`. The clearest definition anywhere on the site is a paragraph two and a half phone screens into `/about`: "America is not the churched country it used to be ... The old assumptions are gone. Nobody owes Christianity a hearing anymore."
- **Why it costs him:** he came with a question that has an answer, and the site's answer is "read around." A skeptic takes an unanswered question as evasion, which is the one thing he expects from church.
- **World-class version:** restore `/post-christian` as a real page. Its URL already exists and already earns links.
  - Lead the way the Stanford Encyclopedia of Philosophy leads an entry, with the definition in the first paragraph and the argument after it.
  - Put James's two sentences from `/about` in the H1 deck.
  - Give the long arc in a handful of dated turns, each linking an era essay already written: the Constantinian Turn (312), Westphalia (1648), the American Experiment, the Attractional Era, After Christendom.
  - Give the secular reading at its strongest (Charles Taylor's *A Secular Age*, already named in the brand contract), then what the change asks of a believer and of someone who does not believe.
  - End on three doors: read (the After Christendom era essay), test (Test the Case), ask (Honest Answers).
  - Show evidence the way Pew Research shows it, with a source line under every number.
  - Give the home page a title that carries the subject, not only the name.

### 1. `/` the home page

**First 3 seconds (phone, `home-phone-first.png`).** A cream bar with "LiveWell / BY JAMES BELL" and a mustard "Find Help." Under it, a black field, a small portrait (a 56 x 70px thumbnail, a placeholder in the capture), and a four-line serif H1: "Learning to follow Jesus — and live well — in post-Christian America." He sees his phrase. He also learns, before anything else, that the site is for people learning to follow Jesus. He does not count himself among them.

**First 30 seconds.** He reads two paragraphs of muted text. The first assumes he is a believer: "What does it look like to follow Jesus when the culture around you no longer shares your assumptions? The early church knew." The second holds the sentence that could have held him: "I was raised without a father and came to faith as an adult, after years as an atheist, so I know the objections from the inside." On a 390px screen it sits at the bottom of the first screen, about 770px down, at the point a skimmer has already stopped reading. Screen 2 offers three doors: "Study the Bible," "Read the essays," "The books." Each assumes he already wants the thing it offers. "Start with these" gives two essays on Christian nationalism and one on how sincere people go wrong. Then a red, white and blue cover reading "WHEN GOD BLESS AMERICA ... THY KINGDOM COME."

**Critical. The front door speaks to the insider, and the skeptic's door is missing.**
- **Where:** home hero copy, the three doors, and the header.
- **What is wrong:**
  - The brand contract ranks the skeptic first ("the one Bell writes toward"), but every sentence above the fold is addressed to a Christian.
  - The site has two instruments built for exactly this man. Test the Case ("You can walk away unconvinced at any point and I will not chase you") is not linked from the home page or the header. `/answers`, "Honest Answers to Hard Questions About Christianity ... from a pastor who was an atheist first," is linked only from the footer, under Essays.
  - The atheist-to-faith fact is the platform's single strongest credential with this reader, and it is buried in paragraph two.
- **Why it costs him:** in the first screen he decides whether he is the audience. The page tells him he is not, so he reads the rest as an outsider looking in on someone else's church.
- **World-class version:**
  - Lead with the doubt, the way Keller's *The Reason for God* puts the doubter's objections before a single claim.
  - Make the first screen name its readers. A deck or kicker should carry "I was an atheist for years. I know the objections from the inside." in the first 3 seconds, not the last.
  - Give the skeptic a door with his own words on it: "Not sure you believe any of this? Start here." It opens Test the Case's first move, or Honest Answers.
  - Keep "Study the Bible" and "Read the essays" for the believer, but let them be the second door, not the only doors.

**Major. The front door narrows "post-Christian America" to Christian nationalism.**
- **Where:** home "Start with these" and "The books."
- **What is wrong:** two of the three starting essays ("When the Church Married Empire," "How Christian Nationalism Rewrites Doctrine") and the loudest object on the page, the flag-colored cover, are about the church and right-wing politics. The shelf does hold "The Conservative Blind Spot" and "The Progressive Blind Spot" side by side, but the home picks do not show that balance.
- **Why it costs him:** a skeptic on the left gets the "flattery loop" the brand contract warns against ("finally a pastor who agrees with me about those Christians"). A skeptic on the right reads partisanship before he reads a word. Either way, his question (what has changed in America, and what does it mean for belief) gets the answer "politics." The Constitution's final impression is "deeper than my politics."
- **World-class version:**
  - Pick the three starting reads by the reader's question, not the author's current project: one on the mirror (keep "Every Generation Was Sure It Was Right"), one on post-Christian America itself (the After Christendom era essay until "The End of Home-Field Advantage" is rewritten), and one that tests the faith's claims (Test the Case, or the free opening of *Believe*).
  - Move the nationalism book one door deeper.

**Minor. The home doors do not look like doors.**
- **Where:** "Study the Bible / Read the essays / The books" and the "Start with these" rows on phone.
- **What is wrong:** large serif text over a hairline, with no arrow, no card edge and no pressed state.
- **Why it costs him:** a first-time visitor scrolling past cannot tell these are the page's navigation. `/writing` on desktop already puts an arrow on each row. Use it here.

**Minor. The face is small.**
- **Where:** the home hero portrait, 56 x 70px on phone. The capture showed a placeholder; readers see the photograph.
- **Why it costs him:** for this reader the face of a real pastor is evidence. He checks who is speaking before he decides whether to listen.
- **World-class version:** a portrait large enough to read an expression, beside the atheist line.

### 2. The header and the phone menu

**Major. The masthead says "wellness site," not "theology."**
- **Where:** every page's header and `header-menu-open-phone-first.png`.
- **What is wrong:** the wordmark "LiveWell" and the only colored nav item, a mustard "Find Help," are what he takes in during the first 3 seconds. On phone, "Find Help for What You Are Facing" is the first line of the menu, in mustard. "LiveWell" is a common health-and-wellness name. The line that says what this is, "Theology that carries the weight of everyday life," appears only in the footer.
- **Why it costs him:** he searched a cultural and intellectual question. The header tells him he has reached a counseling or self-care brand, a genre a wounded skeptic has learned to distrust in churches.
- **World-class version:** a plain descriptor beside the name on every page ("Theology for post-Christian America" or the footer line), the way research publications put what they are next to who they are. Keep Find Help reachable in the header, at the weight of the other doors. It does not need to be the loudest thing a stranger sees.

### 3. `/writing` the essay shelf

He taps "Read the essays." The header reads "Essays. A short shelf, kept short on purpose." Below it come three numbered starters and five sections.

**Major. The shelf looks thin and unedited exactly where he looks.**
- **Where:** `writing-desktop.png` and `writing-phone.png`.
- **What is wrong:**
  - The section that matches his search, After Christendom ("What it means to follow Christ now that Christian America is ending"), holds one essay, and that essay is already starter number 2.
  - Three of the 15 essays appear twice (the three starters again in their sections), so 18 rows hold 15 essays.
  - "When Fear Becomes Theology" (The Mirror) and "When Fear Rewrites Theology" (Faith and Power) sit one section apart. Their titles differ by one word. The live essay "Why a Frightened Church Wants a King" also runs a section headed "Fear is the factory where false theology is made."
  - No row shows a date, even where one exists: the strongman row carries a date and shows only "11 min read."
- **Why it costs him:** "kept short on purpose" is a claim of editorial care. Repeats and near-twins on a 15-item list read as the opposite, and with no dates he cannot tell a living shelf from an abandoned one.
- **World-class version:**
  - Aeon's essay index: every row has a date, a reading time and an author line, and no item appears twice on one screen.
  - Let the starters stand alone and drop them from their sections, or mark them "also in Start."
  - Give the fear pieces distinct titles, or merge them.
  - Hide an empty section, or one of one, behind its single essay rather than presenting it as a category.

### 4. `/writing/the-rise-of-the-nones` the essay he wanted

He tries the essay whose title is his question. It answers: "James is revising this essay. It is off the site until the new version is ready. Read instead: When the Church Married Empire."

**Minor. The substitute does not answer his question.**
- **Where:** the "Read instead" link on the pending notices in the After Christendom section.
- **What is wrong:** the notice is honest and keeps him moving, so it should stay. But the substitute is about Constantine and empire, not about the nones.
- **World-class version:** for the After Christendom pending essays, point "Read instead" at `/theology/history/after-christendom-era`. It is committed, it is live, and it calls itself "the era the reader is standing in." Point it at the restored `/post-christian` page once that exists.

### 5. `/writing/strongman-theology` the read

This is where the site earns him, if he gets here. The prose is the real thing. It moves from 1 Samuel 8 to Brueggemann's "royal consciousness" to Niebuhr to Bonhoeffer's broadcast. Then comes the self-implication a skeptic needs before he will trust a pastor: "I have sat across from the fear. I know it is not stupid." The ending lands: "We already have a King, and he is not like the other nations, and that is the entire point we are too frightened to remember."

**Major. Eight controls stand between him and the first sentence, and the loudest says "Send to my phone" on a phone.**
- **Where:** `writing-strongman-theology-phone-first.png`.
- **What is wrong:**
  - Under the dek and meta line come Send to my phone (the filled black primary), Save, Print, Listen, A−, A+, Focus, and a collapsed "In this essay." The drop cap starts about 640px down the 844px screen.
  - He is already on his phone, and the most prominent button offers to send the essay there.
- **Why it costs him:** the first impression of the essay is a product, not a writer, and the misfired primary action tells him nobody looked at this page on a phone.
- **World-class version:**
  - Aeon and The Atlantic open with title, dek, author and reading time, and the first sentence is on the first screen.
  - On phone, keep one quiet row (Listen and Save) and move Print, text size, Focus and Send under a single "More" at the end. Show "Send to my phone" only on a desktop.

**Major. The verdict is followed by a sales sequence.**
- **Where:** after the essay's last line (`writing-strongman-theology-phone-05.png` and `-06.png`).
- **What is wrong:** a second toolbar, then a black band with the flag-colored cover and a large mustard-filled "Read the book →." Then "Find help for what you are facing," four more essays on the same subject, a subscribe card, the author card, "James also writes elsewhere," "All essays," and a footer with a second subscribe form. That is six or more asks in two screens.
- **Why it costs him:** the brand contract's rule is "endings that leave weight." The weight lasts one line before a cover in national colors asks for $8.99. A skeptic who has been sold to by churches reads the essay backwards from there: it was the funnel.
- **World-class version:**
  - Aeon ends an essay with the author's short bio and then stops.
  - Give the ending a full screen of quiet. Then offer one next thing chosen by what he just read (here, "Every Generation Was Sure It Was Right"). After that, the author card with the book as a line inside it, not a band.
  - Keep mustard fills for the one action the page exists for. The brand contract caps mustard at 8% of a viewport, and this band spends it on a sale.

**Major. The flagship essay has no sources block.**
- **Where:** the essay end has "Cite this" but no "Sources." The church-history era essays end with one (Gonzalez, Chadwick, MacCulloch, Shelley).
- **Why it costs him:** the essay makes dated historical claims (Bonhoeffer's broadcast, Niebuhr's 1932 book, Brueggemann's 1978 one). A skeptic checks exactly these. A sources list is the cheapest trust signal on the web, and the site already has the pattern.
- **World-class version:** the era essays' "Sources" panel, under every essay, with the works named inline listed with their years.

**Minor. The related list cuts off mid-word on phone.**
- **Where:** "Keep reading · Another essay."
- **What is wrong:** excerpts end "How churches lose Christ by merging the cr..." and "The most dangerous heresies are not the o...".
- **Why it costs him:** a clipped sentence reads as careless on a site selling care.
- **World-class version:** two full lines, or a dek written to fit.

### 6. `/about` the trust page

He goes to check who this is. `/about` is the best page on the site for him. "My story in my own words" says: "I was an atheist before I was a Christian ... If you do not believe any of this, I am not going to pretend your reasons are stupid." "The heart behind it" holds the definition the site never gives him on the home page. "How the writing works" ("It starts at the root / The writer is inside it / It ends on a verdict, not a recap") is a methodology statement, which is what a skeptic asks a serious writer for.

**Minor. The hero repeats the home page word for word, and the best lines sit two screens down.**
- **Where:** `about-phone-first.png`.
- **What is wrong:** the hero lede is the same "What does it look like to follow Jesus..." paragraph he read on the home page, set larger. The page's strongest sentence for him starts about 1,000px down.
- **World-class version:** open `/about` on the atheist paragraph, and link it from the home page's skeptic door.

### 7. `/books` and the seams

**Critical. The numbers about James do not agree, and the books page answers a question nobody asked.**
- **Where:** `/about`, the essay author card, and `/books`.
- **What is wrong:**
  - `/about`'s hero says "Author of 21 books," and its body says "21 books so far." The author card under every essay says he "has written twenty-one books."
  - `/books` opens "Three books. Every word mine." and closes "Looking for a book that used to be here? I took the rest of the shelf down to rewrite it in my own hand."
  - Add 43 of 58 shelf essays answering "James is revising this essay," and two overlapping church-history series (section 9).
- **Why it costs him:** a reader hurt by church is alert to a pastor whose self-description shifts between rooms. "Every word mine" invites the very suspicion it denies: why would a writer need to say so? Then the page confirms that something on the old shelf was not his to stand behind. This is the most likely moment for him to close the tab with a knowing smile.
- **World-class version:**
  - One fact sheet about James (years at Fenton, books written, books in print here, network size), used verbatim on every page that states a number.
  - State the shelf plainly, once, without defense: "Twenty-one books written. Three are in print here while the others are revised."
  - Cut "Every word mine." The free openings prove it better than the claim does.

**Minor. *Believe*, the book written for him, is third, and two of the three covers look unfinished.**
- **Where:** the `/books` covers.
- **What is wrong:** *Believe* ("For skeptics ... from a pastor who spent years on the other side of the argument") sits under two other titles. Its cover, like *The Monster in the Mirror*'s, is near-black with type too small to read at card size, next to a finished, loud flag cover.
- **World-class version:** finished covers for all three, and the skeptic's book first for the reader who arrives from `/answers` or Test the Case.

**Minor. The price line asks for a smirk.**
- **Where:** `/books` hero.
- **What is wrong:** "The rest costs $8.99, which is less than the coffee you would read it over." It overstates, it is cute, and it is a pitch.
- **World-class version:** "The rest is $8.99" is enough.

### 8. `/tools/test-the-case` and `/tools/which-lens` the two best things he will probably never find

These are the most skeptic-literate instruments I have seen on a pastor's site. Test the Case says "I am not going to pretend the honest objections are weak," lets him push back with a real objection at each move, and closes each move with "What this move does not settle." Which Lens puts question 1 and both answers on the first phone screen and says "Your answers stay in this browser tab and are seen by no one."

**Major. They are filed for families, and Test the Case asks him to agree in order to continue.**
- **Where:** `/tools`, `/tools/test-the-case`.
- **What is wrong:**
  - The tools hub's title is "Free Christian Tools for Families." Test the Case sits between "Life Audit" and "Deep Bible Study Companion" with the same weight as the Quote Library.
  - The only way forward from Move 1 is a button labeled "That's fair, keep going." A skeptic who is not persuaded but wants the next move has to click a sentence that says he was.
- **Why it costs him:** the instrument promises he can "walk away unconvinced at any point." The button makes him concede to stay. It is a small sentence, and it is the exact moment he decides whether he is being met or handled.
- **World-class version:**
  - Battleground God (The Philosophers' Magazine) is the classic interactive that tests a reader's beliefs about God without asking him to agree to proceed. It is the right reference for both of these instruments.
  - Label the forward button "Next move." Offer "Not convinced, but go on" beside "That's fair."
  - Give Test the Case and Which Lens a home outside the tools catalogue: on the home page's skeptic door, on `/answers`, and at the end of the post-Christian page.

### 9. `/theology/history` and `/theology/history/the-apostolic-age`

He follows "learn the church's long history" from the home hero. The Apostolic Age essay is serious and fair-minded: "the historian Tacitus, no friend of the faith," "We should be honest about how unlikely this was." It ends with a Sources panel that names Diarmaid MacCulloch, a historian a skeptic already trusts.

**Major. The history speaks to insiders, counts two series as one, and has no "next."**
- **Where:** `theology-history-*.png` and `theology-history-the-apostolic-age-*.png`.
- **What is wrong:**
  - The hub's H1 is "The story you were born into." The lede says "the councils that fixed the creeds you confess," and the interlude says "You did not start the faith. You were handed it." He was not born into it, he does not confess the creeds, and nobody handed it to him.
  - "22 essays, from Pentecost to the present" is two overlapping series in one grid. There are 14 period essays ("The Reformation," "The Apostolic and Sub-Apostolic Age"), then 8 more that cover the same ground again ("The Reformation and Its Wars," "The Apostolic and Persecuted Church").
  - The essay most relevant to his search, "After Christendom," is card 22 of 22.
  - The Apostolic Age essay ends with "← All of Church History" and, below it, "← Church History": two links back and none forward to "The Age of the Martyrs."
- **Why it costs him:** the second person tells him again that this is someone else's family story. The doubled list looks unedited. A 22-part history with no next link ends every reader after part one.
- **World-class version:**
  - Write the hub to every reader: "Whether or not you believe it, this is the story that made the country you live in."
  - Present one sequence, and label the second series ("The same story, told by era" or "A shorter route").
  - End every era essay with Khan Academy's "Up next": the next era, its date range and one line.
  - Pin "After Christendom" as "Start where you are standing," above the grid.

**Minor. The era essay has no byline or date.**
- **Where:** the Apostolic Age essay.
- **What is wrong:** the essay page names no author and no date.
- **Why it costs him:** a skeptic asks "who is telling me this, and when?"
- **World-class version:** the same author line the `/writing` essays carry.

**Minor. The timeline states the church's confession as plain chronology.**
- **Where:** the timeline accordion on `/theology/history`.
- **What is wrong:** "Jesus had been crucified, then raised," and "around 95 · John writes Revelation" sit in the same voice as "70 · The fall of Jerusalem." Test the Case is careful to separate what historians grant from what the church confesses. The timeline is not.
- **World-class version:** keep the confession and do not soften it, but mark it as confession, as the era essay does ("a tomb they insisted was empty"). It costs one clause, and the site already has the habit.

### 10. `/help` where his two doors are hidden

**Major. "The church hurt me" and "I'm deconstructing my faith" sit at the bottom of a crisis page.**
- **Where:** `help-desktop.png` and `help-phone.png`.
- **What is wrong:**
  - The two pages written for a reader wounded by church exist, and they are good to have. They sit at card 21 and card 34 of 34.
  - The page opens with a 988 suicide-line banner and a full panel of hotlines. That is right for a person in crisis, and it is the wrong doorway for a man who is angry at his old church but not in danger.
  - The only route to them from the header is a link labeled "Find Help."
- **Why it costs him:** he will not go looking for help, because he is not asking for help. He is asking whether anyone in the church will admit what happened. These pages answer that, behind a label he will never click.
- **World-class version:**
  - Link "The church hurt me" and "I'm deconstructing my faith" from the skeptic's door on the home page, from `/answers`, and from the After Christendom material.
  - On `/help`, give "Hurt by church, or no longer sure" its own row near the top, beside "What people bring most."

### 11. `/subscribe` and the reason to come back

`/subscribe` is the only page in the main flow that names him: "I'm a skeptic. Hand me the essays that take the questions seriously," listed first. "Nothing else comes with it, and you can leave the moment it stops being worth your time" is the right promise.

**Major. Nothing gives him a reason to return, and the weekly promise cannot be checked.**
- **Where:** `/subscribe`, `/writing`, the essay meta line, and `/tools`.
- **What is wrong:**
  - The site promises "One serious essay a week" in five places. The only date he sees anywhere in his path is "April 11, 2026" on the essay, about six months before this capture. Lists never show dates, and nothing on any page says what is new.
  - "My Library" lives on one device.
  - Test the Case has nine cases, which is a natural reason to come back, but nothing tells a returning visitor which ones he has done.
- **Why it costs him:** a skeptic returns to a voice that keeps arguing with him. He needs to see that the argument continues: a date, a new piece, an open question.
- **World-class version:**
  - Put a date on every essay row, as Substack (James's own newsletter channel) does on every post.
  - On the home page, a line that shows "New this week" in production, or nothing at all.
  - Test the Case remembers on this device which cases he has worked through, the way Which Lens remembers its answers.

**Minor. Subscribe will not take an address until he picks a label, and does not say why.**
- **Where:** the Subscribe button on `/subscribe`.
- **What is wrong:** the button stays disabled (`disabled={!email || !audience}` in `SegmentedSignup.tsx`) and looks greyed out, with no hint.
- **Why it costs him:** a reader who will not label himself gets a dead button.
- **World-class version:** preselect nothing and accept the address. Ask the question as optional ("Tell us where you're standing, if you like").

**Minor. "Written slow, sent once." reads as "sent one time."**
- **Where:** the `/subscribe` H1.
- **World-class version:** "Written slowly. Sent once a week."

### 12. `/study/bible/john/1` (if he gets this far)

**Minor. The honest part is the last thing on the page.**
- **Where:** the chapter notes on John 1.
- **What is wrong:** the notes contain "A hard question (1 of 2)" and "(2 of 2)," along with the kind of hedge a skeptic respects ("Some interpreters count these days as an opening week ... others think the count is too uncertain to carry that weight"). Both hard questions are collapsed accordion rows 11 and 12 of 14, below the full chapter text.
- **World-class version:** name the chapter's hard question in "This chapter at a glance" beside the text, one line with a link down to it. It is the hook for exactly this reader.

---

## What to keep

- **The atheist sentence on the home page,** "came to faith as an adult, after years as an atheist, so I know the objections from the inside." Move it up. Do not lose it.
- **`/about`'s "My story in my own words," "The heart behind it" and "How the writing works,"** above all "If you do not believe any of this, I am not going to pretend your reasons are stupid" and "Nobody owes Christianity a hearing anymore." Those two sentences are the site's best answer to the question that brought him.
- **Test the Case:** one move at a time, his own objection as a button, "What this move does not settle," "You can walk away unconvinced at any point and I will not chase you." Change one button label. Keep everything else.
- **Which Lens Has You?:** question 1 and its answers on the first phone screen, "Pick the answer that is truer of you, not the one you approve of," and answers that stay in the tab.
- **The strongman essay's prose:** the history behind the verdict, the self-implication ("I have sat across from the fear. I know it is not stupid."), and an ending that does not resolve.
- **The era essays' fairness and their Sources panel:** Tacitus "no friend of the faith," MacCulloch and Chadwick named. Put that panel under every essay.
- **The pending-essay notice:** honest, short, and never a dead 404. Only aim its "Read instead" better.
- **The quiet:** no pop-up, no modal newsletter, no cookie wall, no autoplay, no countdown. To a man used to church marketing, the absence of pressure is itself evidence.
- **`/subscribe`'s "I'm a skeptic" listed first,** and the promise that nothing else comes with it.
- **The existence of "The church hurt me" and "I'm deconstructing my faith"** on `/help`, and the care in its crisis banner. Give the two pages a door he would use.
