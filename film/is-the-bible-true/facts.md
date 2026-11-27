# Is the Bible true?: the facts in the script, and where each was checked

This film rebuilds the Bible Explorer film `client/public/explorer/films/is-the-bible-true.json`. The old film was about manuscripts and archaeology; the film/apol-* films now cover that ground in depth, so this script takes the broader question (what "true" means for different kinds of writing, what the Bible claims about itself, the honest limits, where Christians differ). Every claim comes from four sources: the old film with its rows in `docs/work/elite/explorer-ledger.md` ("is-the-bible-true 1" to "7 to 8"); the Honest Answer `why-would-anyone-trust-the-bible` in `client/src/data/answers.ts`; `client/public/questions/text/_area.json`; and the essay `client/public/essays/why-trust-the-bible.json`. Nothing was added from outside.

## Claims

| Line in the film | Source |
|---|---|
| Copying words correctly doesn't make them true; a lie can be preserved perfectly | Essay, "Did It Happen?" first paragraph ("Copying the words correctly doesn't make the words true. A lie can be preserved perfectly."); answer, "The best reply" ("A text can be copied perfectly and still be legend") |
| The Bible holds histories, prayers, laws, prophets and letters | Essay: Luke writes as a historian ("Did It Happen?"), psalms and laws ("What About the Hard Passages?"), prophets ("What Trust Looks Like"), Paul's letters ("Who Chose the Books?"). The list itself is a summary of these, not a quotation |
| Some Christians say Scripture is "fully trustworthy in everything it sets out to teach" | Essay, "What About the Contradictions?" (other churches word the conviction this way) |
| Luke opens like a historian; says he checked his sources | Essay, "Did It Happen?"; answer, "The evidence" ("On the third"); ledger row "is-the-bible-true 6" |
| Most scholars read the Gospels as ancient biographies; Richard Burridge, What Are the Gospels? (1992), turned that view into the consensus | Answer, "The best reply, and an answer"; answer sources list |
| Ancient biographers arranged material by theme and summarized speeches as a matter of course | Essay, "What About the Contradictions?" |
| The New Testament's central claim is one that could be proved false | Essay, "Did It Happen?" ("Its central claim is one that could be proved false"); answer, premise 3 |
| Job asks the question chapter after chapter | Essay, "What About the Hard Passages?" ("Job asks it chapter after chapter, and Jeremiah and Habakkuk put it to God to his face") |
| Psalms that ask God to break the teeth of enemies | Essay, "What About the Hard Passages?" |
| The deepest problem for many skeptics isn't that the words were changed but that they weren't: laws that regulate slavery, commands in Joshua to destroy whole towns | Essay, "What About the Hard Passages?"; answer, "What this does not prove" |
| The question moves from "Do we have the text?" to "Is the God of this text good?"; a better question; pages of its own | Essay, "What About the Hard Passages?"; answer, "What this does not prove" ("Those questions have pages of their own") |
| The Bible keeps sending prophets to people who already have the Scriptures; it expects its readers to get it wrong | Essay, "What Trust Looks Like" |
| Paul's letters were read as Scripture very early; one apostle admits another is hard to understand | Essay, "Who Chose the Books?" and "What About the Contradictions?" (last paragraph); answer, "The evidence" ("On the second") |
| Jesus rested an argument on a phrase from a psalm and said Scripture cannot be broken | Essay, "Why It Comes Back to Jesus" (Psalm 82, John 10:35). The words "the Scripture cannot be broken" match the BSB of John 10:35 |
| The circular defense ("true because it says it's true"); the first Christians had no New Testament, only the Scriptures of Israel and the news that Jesus had been raised; they trusted him because they believed God had raised him, then received the Scriptures the way he did | Essay, "Why It Comes Back to Jesus"; answer, "What this does not prove" |
| He told critics who knew the Scriptures that they had missed what the book was for | Essay, "Why It Comes Back to Jesus" (John 5:39-40) |
| Many evangelical churches confess Scripture is without error; the Chicago Statement of 1978; quotation "variant selections of material in parallel accounts, or the use of free citations" | Answer, "The best reply, and an answer"; essay, "What About the Contradictions?". The film quotes the last two items of the Statement's list as the sources give it; the first item, "the topical arrangement of material", is omitted for length |
| Others put the conviction differently; faithful Christians still divide over which wording is right | Answer, "The best reply, and an answer"; essay, "What About the Contradictions?" |
| Mark 2:26 names Abiathar; 1 Samuel 21 names Ahimelech, Abiathar's father | Answer, "The case against, at its strongest"; essay, opening |
| The young Bart Ehrman built an argument around it; his professor Cullen Story wrote "Maybe Mark just made a mistake." | Essay, opening paragraphs |
| That verse still has no explanation everyone accepts | Answer, "The best reply"; essay, "What About the Contradictions?" |
| No stone can show that a man rose from the dead | Essay, "Did It Happen?" ("A stone with Pilate's name on it ... says nothing about whether Jesus rose from the dead") |
| Many were taught the Bible stands or falls with winning every argument about every verse; the Bible never taught that | Essay, "What About the Contradictions?" (last paragraph); answer, "The best reply" |
| What would it take for you to trust an ancient book, any ancient book? | Old film, "think" (older) |
| Read one Gospel whole; Mark is the shortest; notice what it keeps that anyone managing a reputation would have cut, Peter's denial | Essay, "What Trust Looks Like"; old film frame "read-it"; ledger row "is-the-bible-true 7 to 8" |
| Closing line: "Christians trust the Bible because they have come to trust the one it is about." | Essay, "Why It Comes Back to Jesus" (verbatim) |
| "Other films here go deep on the copies, the dates and the books" | Points to the film/apol-* films and the area page `_area.json`; no titles named |

## Scripture (Berean Standard Bible)

Each quotation was checked word for word against `client/public/bible/text/` by `film/tools/write-script.py` on 2026-11-27.

- **Luke 1:3** (spoken): "having carefully investigated everything from the beginning, it seemed good also to me to write an orderly account for you"
- **Habakkuk 1:2** (spoken): "How long, O LORD, must I call for help but You do not hear"
- **2 Peter 3:16** (spoken): "Some parts of his letters are hard to understand"
- **2 Timothy 3:16** (spoken): "All Scripture is God-breathed and is useful for instruction, for conviction, for correction, and for training in righteousness"
- **John 10:35** (spoken inside a line, not a chapter's Scripture field, so not shown with a reference): "the Scripture cannot be broken"
- **John 5:39-40** (spoken): "These are the very words that testify about Me, yet you refuse to come to Me to have life."
- **John 20:31** (spoken): "these are written so that you may believe that Jesus is the Christ, the Son of God, and that by believing you may have life in His name."

The sources name Habakkuk generally ("put it to God to his face") and psalms that ask God to break enemies' teeth without naming a verse; Habakkuk 1:2 was chosen from the BSB to show that kind of prayer. No psalm verse is quoted. 2 Timothy 3 is in the old film's read list.

## Notes

- The old film has no care line. The essay's Find Help sentence (about questions that come with a loss or wound, and abuse by a church leader) stays on the essay and is not in the narration.
- Manuscripts, Qumran, the Pilate stone, Tel Dan, the canon and Gospel differences are left to the film/apol-* films and the trust-the-bible pilot.
- Where Christians differ (inerrancy and how it is stated), the film names both and takes no side.
