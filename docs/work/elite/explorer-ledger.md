# Bible Explorer: the ledger of claims

Every factual claim in `client/public/explorer/` (the stops, `threads.json`, `cards.json`) and where it was checked. "BSB" means the Berean Standard Bible text in the repo (`client/public/bible/ch/`), read through `scripts/lib/bsb.mjs`. Every verse quoted in a `verses`, `quote` or `promise` field, and every “quotation” in the prose, is checked against the BSB on every CI run by `scripts/validate-explorer.mjs`; this ledger covers the rest.

## Scripture, quoted

| Where | Quotation | Checked |
|---|---|---|
| creation verses | Genesis 1:1; Genesis 1:27 (whole verses) | BSB, by the validator |
| abraham verses | Genesis 12:2-3; Genesis 15:5-6 (whole verses) | BSB, by the validator |
| abraham story | “all the families of the earth”; “was credited to him as righteousness” | BSB Genesis 12:3; 15:6 |
| abraham activity | “I will make you into a great nation”; “go to the land I will show you”; “all the families of the earth will be blessed through you” | BSB Genesis 12:2; 12:1; 12:3 |
| rescue verses | Exodus 12:13 (first sentence; the verse goes on); Exodus 14:13-14 (Moses' words, the speech introduction trimmed) | BSB, by the validator |
| rescue story | “Let My people go” | BSB Exodus 5:1 |
| rescue story | “against all the gods of Egypt”; “who brought you out of the land of Egypt, out of the house of slavery” | BSB Exodus 12:12; 20:2 |
| cross verses | Romans 5:8; Luke 24:5-6 trimmed to the two men's question and answer (“Why do you look … He has risen!”) | BSB, by the validator; the exclamation mark is the BSB's own, inside the quotation |
| cross story | “It is finished.”; “He is not here; He has risen!” | BSB John 19:30; Luke 24:6 |
| cross story | “Christ died for our sins”; “most of whom are still living” | BSB 1 Corinthians 15:3; 15:6 |
| cross question | “if Christ has not been raised, our preaching is worthless, and so is your faith” | BSB 1 Corinthians 15:14 |
| cross activity | “the Lamb of God, who takes away the sin of the world”; “our Passover lamb” | BSB John 1:29; 1 Corinthians 5:7 |
| card: the Bible | 2 Timothy 3:16-17 (whole); “spoke from God as they were carried along by the Holy Spirit” | BSB, by the validator; 2 Peter 1:21 |
| card: Jesus | John 1:14 (whole); “My Lord and my God” | BSB, by the validator; John 20:28 |

## Scripture, told in the site's words

| Claim | Checked |
|---|---|
| Six times God calls what he made good; the seventh time, very good | BSB Genesis 1: "good" at verses 4, 10, 12, 18, 21, 25; "very good" at 31 (counted in the text) |
| God rested on the seventh day and blessed it | BSB Genesis 2:2-3 |
| God planted a garden and put the man there; a river flowed out of Eden | BSB Genesis 2:8, 2:10, 2:15 |
| Abram from Ur and Haran; seventy-five when he left Haran; a hundred when Isaac was born (so twenty-five years) | BSB Genesis 11:31; 12:4; 21:5 |
| Abram went without knowing where he was going | BSB Hebrews 11:8 |
| Twice he passed Sarah off as his sister | BSB Genesis 12:13; 20:2 |
| Joseph sold by his brothers | BSB Genesis 37:28 |
| Paul builds on Genesis 15:6 | BSB Romans 4:3; Galatians 3:6 |
| Paul reads the promise as the good news announced ahead of time | BSB Galatians 3:8 |
| Peter tells a crowd the blessing comes through Jesus | BSB Acts 3:25-26 |
| Israel filled the land in Egypt; God gave Israel the land sworn to their fathers | BSB Exodus 1:7; Joshua 21:43 |
| Israel lived in Egypt 430 years | BSB Exodus 12:40 |
| Pharaoh ordered Hebrew baby boys thrown into the Nile | BSB Exodus 1:22 |
| God saw, heard and came down to rescue | BSB Exodus 3:7-8 |
| Ten plagues; the last fell on the firstborn sons of Egypt | BSB Exodus 7 to 12; 11:5; 12:29 |
| Israel is God's firstborn son; Pharaoh warned at the start | BSB Exodus 4:22-23 |
| Blood on the top and sides of the doorframe, brushed on with hyssop from a basin (the drawing) | BSB Exodus 12:7, 12:22 |
| Children ask what the Passover means | BSB Exodus 12:26-27 |
| Pillar of cloud by day and fire by night; it moved behind the people at the sea (the drawing) | BSB Exodus 13:21; 14:19-20 |
| Dry ground between walls of water | BSB Exodus 14:21-22 |
| Judas helped arrest Jesus at night; chief priests and council handed him to Pilate; Pilate handed him over to be crucified; Roman soldiers crucified him | BSB Mark 14:43-46; 15:1; 15:15-16; Luke 23 |
| Herod, Pilate, the Gentiles and the people of Israel together | BSB Acts 4:27 |
| Bread and cup: body given, blood poured out for many | BSB Mark 14:22-24; Luke 22:19 |
| Women at the tomb very early on the first day; stone rolled away; two men in radiant clothes; Mary Magdalene, Joanna, Mary the mother of James | BSB Luke 24:1-10 |
| A garden at the place of crucifixion, with a new tomb (the drawing) | BSB John 19:41 |
| Touch me and see; a spirit has no flesh and bones; he ate broiled fish | BSB Luke 24:39-43 |
| The temple veil torn from top to bottom when Jesus died | BSB Mark 15:37-38; Matthew 27:51 |
| Appeared to Peter, the Twelve, more than five hundred at once | BSB 1 Corinthians 15:5-6 |
| Luke carefully investigated before writing | BSB Luke 1:3 |
| Jesus said the Scriptures testify about him | BSB John 5:39 |
| Jesus grew tired, wept, died | BSB John 4:6; 11:35; 19:30 |
| Every thread line (garden, hiding, Jacob at Bethel, pillar, tabernacle, Shiloh, temple glory, glory leaving, Haggai's promise, the Word dwelling among us, the veil, God's temple, God's dwelling with man) | BSB at the reference given beside each line in `threads.json`; each reference is read by the validator |
| Summaries of stops still being drawn: Assyria took the north; Babylon burned Jerusalem and the temple; Paul's news reaches Rome; a man after God's heart; a son whose kingdom will never end | BSB 2 Kings 17:6; 25:9; Acts 28:14; 1 Samuel 13:14; 2 Samuel 7:16 |

## History and scholarship

| Claim | Checked |
|---|---|
| In the ancient world a king could be called the image of a god, and kings set up statues of themselves to show who ruled a land | Already stated in the site's own content (`client/public/bible/doctrines/humanity.json`, `client/public/bible/notes/genesis/verses/1.json`, `client/public/studyguides/youth-who-am-i.json`); web search 2026-11-19: Bible Odyssey, "Created in the Image of God" (Akkadian *tzalmu*, the king as the image of the god), https://www.bibleodyssey.org/passages/related-articles/created-in-the-image-of-god ; J. Richard Middleton, "Created in God's Image: The Royal Calling of Humanity", https://jrichardmiddleton.com/category/origin-of-evil/ |
| Paul wrote the list of witnesses "within about twenty-five years of the events" | Site's own dating: 1 Corinthians "around AD 53 to 55" (Study Bible notes; `client/public/bible/`), crucifixion "AD 30 or 33" (`client/public/bible/story.json`, act `christ`): twenty to twenty-five years |
| Roughly four centuries between the return and the birth of Jesus | `client/public/bible/story.json`, act `return-silence` ("roughly four centuries the Old Testament does not narrate") |
| The Spirit came fifty days after Passover (Pentecost) | `client/public/bible/notes/acts/plain/2.json` |
| The Council of Chalcedon, 451, confessed Christ truly God and truly man in one person | `client/public/theology/church-history-councils.json` and `christology.json` |
| Who condemned and who crucified; Jesus, his disciples and the first church were Jews; the New Testament places all people inside the guilt | Wording follows `client/public/bible/notes/acts/plain/2.json` (verses 22-28, "hard") |
| The Honest Answer on choosing "lays out both" views without picking | `client/src/data/answers.ts`, `does-god-choose-us-or-do-we-choose-him` |
| The Honest Answer on Genesis 1 takes no side on the age of the earth or evolution | `client/src/data/answers.ts`, `how-should-a-christian-read-genesis-1`, first paragraph |

## Deliberately left out

- Which Egyptian god each plague answered (a common teaching, but argued); the stop quotes Exodus 12:12 instead.
- The women's testimony argument (that a woman's word counted little in court); not checked to the standard, so not used.
- Any date for Abraham or the exodus; the story is told without them for this age.
