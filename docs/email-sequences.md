# Email Sequences — LiveWell by James Bell

Ready-to-paste drafts for whatever email platform is chosen (ConvertKit/Kit, MailerLite, Buttondown, etc.). Every URL below was verified against the live route table (`client/src/App.tsx`) and the content manifests (`guides-index.json`, `articles-index.json`) as of June 2026. All links use the canonical format `https://www.livewellbyjamesbell.co/<path>`.

Voice rules are binding per CLAUDE.md: no exclamation marks, no forbidden words or phrases, no signposting, endings that leave weight.

---

## Segmentation Note

Tag every subscriber at capture with one of four audience tags:

| Tag | Source | Sequence assignment |
|-----|--------|---------------------|
| `skeptic` | Skeptic's Track signup, /doubt page form, course opt-in | Skeptic's Course, then Welcome (resume at email 3) |
| `christian` | General site forms, Substack migration | Welcome Sequence |
| `pastor` | PCN import, /for-pastors and /leadership forms | PCN Pastor Sequence; suppress Welcome emails 2 and 4 |
| `seeker` | /start quiz, life/marriage/parenting tools | Welcome Sequence |

Suppression rules: a subscriber should never be in two sequences on the same day. The Skeptic's Course (daily) pauses the Welcome Sequence; resume Welcome two days after the course ends. PCN subscribers get the PCN sequence first and only; if they later engage with non-pastor content, add the Welcome close (email 5) as a single follow-up.

---

## Deliverability DNS Checklist

Complete before the first send, regardless of platform. Send from a subdomain (recommended: `mail.livewellbyjamesbell.co`) so the root domain's reputation is insulated.

- [ ] **SPF** — one TXT record on the sending domain. Example: `v=spf1 include:<platform-spf-domain> ~all`. There must be exactly one SPF record; merge includes if Google Workspace or another sender already publishes one.
- [ ] **DKIM** — add the CNAME (or TXT) records the platform generates (usually one to three). Confirm the platform dashboard shows DKIM as verified and that test messages pass `dkim=pass` in the received headers.
- [ ] **DMARC** — TXT record at `_dmarc.livewellbyjamesbell.co`. Start with monitoring: `v=DMARC1; p=none; rua=mailto:pastorjbell206@gmail.com; fo=1`. After two clean weeks of reports, tighten to `p=quarantine`, then `p=reject`.
- [ ] **Custom return-path / bounce domain** — enable if the platform offers it, so SPF alignment passes under DMARC.
- [ ] **Verification** — send a test to a Gmail address, open "Show original," and confirm SPF, DKIM, and DMARC all read `PASS` before launching any sequence.
- [ ] **Warm-up** — if the PCN list is large, ramp sends over the first two weeks rather than blasting the full list on day one.

---

## Subject Line A/B Alternates

### Welcome Sequence
| Email | Subject A | Subject B |
|-------|-----------|-----------|
| 1 (Day 0) | I did not grow up believing any of this | An atheist walks into a pulpit |
| 2 (Day 2) | Start where you actually are | Four doors into the same house |
| 3 (Day 5) | If you read one thing I have written, read this | The Bible is not an American book |
| 4 (Day 9) | What the membership is, and what it is not | Before you give me a dollar |
| 5 (Day 14) | One question, if you will allow it | The question I ask everyone eventually |

### The Skeptic's Course
| Email | Subject A | Subject B |
|-------|-----------|-----------|
| Day 1 | The Bible is not an American book | Day 1: A book with no flag on it |
| Day 2 | You have been reading someone else's mail | Day 2: The operating system under the text |
| Day 3 | The violence. The slavery. On the table. | Day 3: The texts Christians hope you will not bring up |
| Day 4 | Not fables, not biographies, something stranger | Day 4: What the Gospels actually claim |
| Day 5 | The question under the questions | Day 5: From the other side of the door |

### The PCN Pastor Sequence
| Email | Subject A | Subject B |
|-------|-----------|-----------|
| 1 (Day 0) | The loneliest job in the room | Sunday is coming for both of us |
| 2 (Day 4) | The inventory nobody makes you take | Who audits the shepherd |
| 3 (Day 10) | Forward this to one tired pastor | What PCN is actually for |

---
---

# Sequence 1: Welcome Sequence

For general subscribers (`christian`, `seeker`, untagged). Five emails, days 0 / 2 / 5 / 9 / 14.

---

## Email 1 — Day 0

**Subject A:** I did not grow up believing any of this
**Subject B:** An atheist walks into a pulpit

I should tell you who is writing to you, since you gave me your inbox and that is no small thing.

I grew up without a father and without God, and for a long time I assumed both absences were permanent. I was not a seeker. I was an atheist, and a fairly content one. The faith I hold now was not inherited. It was argued into me, suffered into me, and finally given to me, in roughly that order.

These days I pastor First Baptist Church of Fenton, Michigan. I have five sons. I have written twenty-one books. None of that is a resume. It is a list of rooms — the hospital room, the kitchen at midnight, the study on a Saturday when the sermon will not come — and the writing on this site comes out of those rooms, not from above them.

What you will get from me: an email when I have something worth your time, essays that take both the Bible and your intelligence seriously, and no manufactured urgency. What you will not get: spam, guilt, or a sales funnel wearing a clerical collar.

Over the next two weeks I will send a few short notes — where to start, the one essay I would hand you first, and what the paid membership is and is not. After that, you will hear from me when there is something to say, and not before.

You can answer any of these emails. I read them.

Grace and peace,
James

---

## Email 2 — Day 2

**Subject A:** Start where you actually are
**Subject B:** Four doors into the same house

The site holds more than 160 essays and a shelf of tools. Nobody needs all of it. You need the door that matches the weight you walked in carrying.

If you are a skeptic — if you suspect this is all wishful thinking, or you used to believe and stopped — start with the Skeptic's Track. It was built by a former atheist who has not forgotten what the arguments feel like from the outside:
https://www.livewellbyjamesbell.co/skeptic-track

If you are a Christian whose questions have outgrown the answers you were given, the doubt section is for you. Suffering, hell, the silence of God — taken seriously instead of managed:
https://www.livewellbyjamesbell.co/doubt

If you are a pastor, there is a working library built for the actual job — sermon preparation, governance, the inner life nobody asks about:
https://www.livewellbyjamesbell.co/for-pastors

If you came because of your marriage or your kids — because theology has to hold on a Tuesday afternoon or it does not hold at all — start here:
https://www.livewellbyjamesbell.co/marriage
https://www.livewellbyjamesbell.co/parenting

And if you are not sure which of those people you are, there is a short quiz that will point you somewhere honest:
https://www.livewellbyjamesbell.co/start

One request. Do not file this email under later. Pick one door and walk through it today. Later is where reading goes to die.

James

---

## Email 3 — Day 5

**Subject A:** If you read one thing I have written, read this
**Subject B:** The Bible is not an American book

People ask where to start with the writing. There are essays on marriage, on doubt, on the church and the nation, and I stand behind all of them. But if you read one piece first, read this one:

**The Bible Is Not an American Book**
https://www.livewellbyjamesbell.co/resources/context/the-bible-is-not-an-american-book

Almost every argument I have ever had about Scripture — with skeptics, with Christians, with myself — turned out to be an argument about a book we were both misreading in the same direction. The Bible was written in three languages, across a dozen empires, by authors who never saw a ballot, never heard of the West, and never met a middle-class individualist. We drape our flag over it anyway. Both political tribes do it. I have done it from a pulpit, which is worse.

That essay clears the ground. Once you see what the book is not, you can begin to hear what it has been saying the whole time, which is stranger and harder and better than the uses we have put it to.

It takes maybe ten minutes. Read it with your guard up. The text can take it.

James

---

## Email 4 — Day 9

**Subject A:** What the membership is, and what it is not
**Subject B:** Before you give me a dollar

At some point you will notice the site has a paid membership, and I would rather tell you about it plainly than let a pop-up do it.

What it is: a way to support work that has no advertiser and no denomination underwriting it, and access to the deeper material — the full library, the tools, the projects that take months to build. The writing is the product here. There is no merchandise table.

What it is not: a paywall around the gospel. The essays that matter most stay free, because a fatherless kid with no money was once exactly the person who needed them. It is not a tithe, and it is not a transaction with God — those categories do not survive contact with grace anyway. And it is not urgent. The price does not expire at midnight. Nothing is counting down.

If the work has been worth something to you and you want it to keep existing, the details are here:
https://www.livewellbyjamesbell.co/membership

If money is tight, or you are still deciding whether you trust me, do not join. Read free for a year. I mean that. The people I write for have been sold enough things by enough preachers, and I am not interested in being the next one.

Either way, you keep getting these emails.

James

---

## Email 5 — Day 14

**Subject A:** One question, if you will allow it
**Subject B:** The question I ask everyone eventually

This is the last of the introduction emails. After this, you hear from me when there is something worth saying, and not before.

Before I close, one question. Not a survey. A real one, from a pastor's desk, and you can ignore it without guilt:

What is the question about God you have stopped asking out loud?

Everyone has one. The skeptic has one. The deacon has one. I had one for years — whether a man who never had a father could trust one in heaven — and I carried it silently through more sermons than I want to admit. Questions do not die in silence. They go underground and run the place from the basement.

If you write yours back to me, I will read it. I may not have an answer. The honest questions rarely come with answers attached, and I will not pretend otherwise. But naming the thing to one other person changes its weight. That has held true in every hospital room and every midnight kitchen I have ever stood in.

Hit reply. Or close this email and let the question sit where it can see you.

Either way, I am glad you are here. I do not take the inbox lightly.

James

---
---

# Sequence 2: The Skeptic's Course — "Reading the Bible Like an Adult"

For subscribers tagged `skeptic`. Five emails, daily. Written for skeptics by a former one. No apologetics-by-ambush.

---

## Day 1

**Subject A:** The Bible is not an American book
**Subject B:** Day 1: A book with no flag on it

You signed up for five days on reading the Bible like an adult. I was an atheist for years, so I remember the standing suspicion — that Christian email courses are sales funnels with a Bible verse stapled to them. This one is not. Five days, some history, no ambush, and you can leave whenever you want.

Start with a clearing of the ground. The Bible you have rejected, or keep at a polite distance, is usually not the Bible. It is an American artifact: a book wrapped in a flag, quoted at rallies, deployed to win elections and end arguments. Rejecting that object is not a failure of intelligence. It may be evidence of intelligence.

The actual text was written across roughly a thousand years, in Hebrew, Aramaic, and Greek, under the shadow of a dozen empires — Egypt, Assyria, Babylon, Persia, Greece, Rome. Its authors were displaced poets, court officials, fishermen, a doctor, a tentmaker. Not one of them ever saw a ballot, a megachurch, or the West. The book has outlived every empire that tried to own it, and it will outlive ours.

None of that makes it true. It makes it worth reading as what it is rather than what it has been used for, which is the only adult way to read anything.

Today's reading, about ten minutes:

**The Bible Is Not an American Book**
https://www.livewellbyjamesbell.co/resources/context/the-bible-is-not-an-american-book

Tomorrow: why almost nothing in it was addressed to you — and why that is good news for your reading.

James

---

## Day 2

**Subject A:** You have been reading someone else's mail
**Subject B:** Day 2: The operating system under the text

Nearly every "you" in the New Testament letters is plural. The Greek is unambiguous. Paul is addressing congregations — rooms full of people — and modern English quietly converts every one of those sentences into a private message for the individual reader. One grammatical fact, and the book changes shape.

That is what it means to read someone else's mail. The Bible's first audiences lived in a world run on honor and shame, where the community's verdict was the heaviest thing a person carried. We live in a world wired for private guilt and individual conscience. Neither of us chose our wiring. But when a guilt-culture individualist reads an honor-culture collectivist text and assumes nothing is lost in the transfer, everything is lost — and most of the readings you have rightly rolled your eyes at were manufactured exactly that way.

The adult move is not learning ancient languages. It is admitting you have an accent. Every reader carries one into the text. The dangerous readers are the ones who believe they do not.

Three short guides. Any one of them will do today:

**Honor and Shame: The Operating System of the Biblical World**
https://www.livewellbyjamesbell.co/resources/context/honor-shame-vs-guilt

**What We Bring to the Text Without Knowing It**
https://www.livewellbyjamesbell.co/resources/context/misreading-with-western-eyes

**You (Plural): Reading a Collectivist Book with Individualist Eyes**
https://www.livewellbyjamesbell.co/resources/context/collectivist-world-individualist-readers

Tomorrow we stop circling and go straight at the texts Christians hope you will not mention. The violence. The slavery. They are on the table here.

James

---

## Day 3

**Subject A:** The violence. The slavery. On the table.
**Subject B:** Day 3: The texts Christians hope you will not bring up

The conquest of Canaan. The laws about slaves. The psalms that pray ruin on an enemy's children. If you have raised these and been handed a subject change, you were right to notice the dodge. I will not change the subject.

Two things can be true at once. First: these texts are genuinely hard, and any reading that makes them easy is lying to you. Second: they are not what they appear to be when a twenty-first-century reader meets them cold.

Set the Torah next to the Code of Hammurabi — same legal language, same era, same region — and watch what each does with a slave, a foreigner, a debtor. The comparison does not dissolve the problem. It relocates it. You stop asking why an ancient law code reads like an ancient law code and start asking why this one keeps bending, against every contemporary pattern, toward the powerless. The same exercise works on the household codes in Ephesians and Colossians, which take a form Aristotle would have recognized and then keep breaking it from the inside.

That is not an answer. It is a method. And the difference between an adult reading and a propaganda reading — in either direction — is whether the method gets used or skipped.

**The Violence of the Old Testament**
https://www.livewellbyjamesbell.co/resources/context/the-violence-of-the-old-testament

**The Slavery Texts**
https://www.livewellbyjamesbell.co/resources/context/the-slavery-texts

**The Law of Moses Next to the Laws of Babylon**
https://www.livewellbyjamesbell.co/resources/context/torah-and-the-law-codes

The full context library, when you want to go further:
https://www.livewellbyjamesbell.co/resources/context

Tomorrow: what the Gospels actually claim to be, which is not what either side usually says.

James

---

## Day 4

**Subject A:** Not fables, not biographies, something stranger
**Subject B:** Day 4: What the Gospels actually claim

"Gospel" was not a church word. Euangelion was an imperial announcement — the herald's news that Caesar had won a victory or taken a throne. "Lord" and "savior" were stamped on coins, and the man they pointed to lived in Rome. When the first Christians used that vocabulary about an executed Jewish builder, everyone within earshot understood exactly what was being claimed, and exactly what it could cost.

That matters because of what the Gospels are not. They are not fables — fables do not name the Roman prefect, the high priest, the province, the decade. They are not philosophy — no school ever got itself executed over a syllogism. They present themselves as testimony: accounts of a public event, datable, locatable, offered by people who kept insisting they had seen it and kept dying rather than retract it.

And the event itself was a liability, not a selling point. In polite Roman society, crucifixion was an obscenity — a word decent people did not say at dinner. First-century Judaism held a range of messianic hopes, and a crucified messiah fit none of them. Nobody invents a crucified god to win arguments in that world. The early church preached its greatest embarrassment as its headline, which is either madness or memory.

You do not have to believe the testimony. Adults are allowed to weigh witnesses and walk away. But weigh it as testimony — not as a fairy tale nobody ever bled for.

**Crucifixion: The Word Decent People Did Not Say**
https://www.livewellbyjamesbell.co/resources/context/honor-status-and-the-cross

**Gospel, Lord, Savior: Caesar's Words in Christian Mouths**
https://www.livewellbyjamesbell.co/resources/context/gospel-against-empire

**What Israel Was Waiting For**
https://www.livewellbyjamesbell.co/resources/context/messianic-expectation

Tomorrow, the last email. The question under all the questions.

James

---

## Day 5

**Subject A:** The question under the questions
**Subject B:** Day 5: From the other side of the door

Last email of the course. No pitch coming. I only want to name something I could not see until years afterward.

When I was an atheist, my questions were real. The violence, the contradictions, the hypocrites — I was not inventing them, nobody ever talked me out of them, and if anyone had tried the ambush approach, the door would have stayed shut for good. But long after, I could admit there had been a question underneath my questions, one I never said out loud: if this turned out to be true, what would it cost me? Who would I have to become? A fatherless kid had reasons for keeping a Father at arm's length that had nothing to do with manuscripts.

I do not assume your basement question is mine. Maybe yours is grief, or a church that hurt you, or the plain fear of being made a fool of. Maybe there is no basement and the arguments are the whole house. You know. I do not.

The invitation, then, with no pressure load-bearing anywhere in it: keep reading. The site has a section built for exactly the questions the church tends to manage instead of answer — suffering, hell, the silence of God:

https://www.livewellbyjamesbell.co/doubt

And if you ever want to say the under-question to one person who remembers standing on that side of the door, reply to this email. I answer slowly, and I do not add people to anything.

The door has no salesman behind it. It never did.

James

---
---

# Sequence 3: The PCN Pastor Sequence

For subscribers tagged `pastor` (PCN list). Three emails, days 0 / 4 / 10. Peer correspondence from one working pastor to another. Not a campaign.

---

## Email 1 — Day 0

**Subject A:** The loneliest job in the room
**Subject B:** Sunday is coming for both of us

James Bell here — pastor at First Baptist in Fenton, PCN like you. This is not a campaign. It is a letter, the first of three, and then I will leave your inbox alone.

You know the math of the job. You are in the room for everyone's worst day, and when yours comes there is no one to call who is not also, in some sense, your responsibility. You carry confidences you cannot set down, criticism you cannot answer from the pulpit, and a calendar that eats whatever you do not defend. The congregation sees you for forty minutes a week and assumes the other hours resemble them. We both know what the other hours resemble.

I wrote about that loneliness here, mostly to stop pretending I was exempt from it:
https://www.livewellbyjamesbell.co/leadership/article/the-loneliness-of-leadership

But pastors do not need another article about how hard the job is. We need help with Sunday, because Sunday is indifferent to our interior lives. So, one tool: a sermon series library — planned series, structured and ready to work from, built by a working preacher who also stares at a blank page on Thursday:

https://www.livewellbyjamesbell.co/leadership/sermon-series

Take whatever serves your people. No attribution needed. Nobody is watching the download counter.

More in a few days. Until then, preach well, and let somebody feed you for once.

James

---

## Email 2 — Day 4

**Subject A:** The inventory nobody makes you take
**Subject B:** Who audits the shepherd

Second letter, as promised.

The church audits its books. The denomination reviews the doctrine. The board evaluates the budget and, awkwardly, the pastor. But no one requires an inventory of the one instrument every part of the ministry actually runs through — the man's own soul — and most of us quietly bank on that exemption.

I did. For years my prayer life was sermon preparation with the lights off. Scripture became raw material. I could exegete a text on rest while running on fumes and feel professional about it. Nobody caught it because nobody was looking, and I had arranged for nobody to be looking. The schedule was my alibi, and I wrote the schedule.

One discipline helped me more than I expected: a formation inventory. Not a personality quiz. A structured, unsentimental look at the parts of the inner life that ministry lets you outsource until they fail — prayer, rest, ambition, anger, the marriage, the hidden hours:

https://www.livewellbyjamesbell.co/leadership/inventory

Take it on a day off, if those still exist for you. Do not take it the week of a funeral.

The pulpit will survive a thin sermon. It will not survive a hollow man, and the difference between the two gets decided in hours no committee will ever see.

One more letter in a few days, and then an ask. Not money.

James

---

## Email 3 — Day 10

**Subject A:** Forward this to one tired pastor
**Subject B:** What PCN is actually for

Last letter.

The Pastors Connection Network exists for one reason: this job cannot be done alone, and nearly everyone is doing it alone. Not for lack of conferences. For lack of peers — men who know what the Monday after a hard Sunday tastes like, who can hear "I am not okay" without converting it into a referral or a rumor.

That is what PCN is for. It is also what the pastors' section of LiveWell is for — sermon tools, governance documents, the formation work, articles on the parts of the job nobody put on the ordination exam:

https://www.livewellbyjamesbell.co/for-pastors

Now the ask. It is not money, and it is not a platform.

You know a pastor who is tired. Not busy-tired — pastor-tired. The one whose name surfaced while you read that sentence. He is not going to find these resources himself, because tired men do not search for help. They survive until they do not. Some of the men reading this letter are him, and a few will be out of ministry within two years over things an honest friendship could have caught at the kitchen-table stage. I have watched it happen, and I have been too slow to call more than once.

Forward him this email with one line: thought of you. That is the whole intervention, and it costs forty seconds.

We were never meant to do this work as strangers in adjacent buildings. I forget that as often as you do.

Sunday is coming. So is his.

James
