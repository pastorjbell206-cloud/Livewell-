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
| fall verses | Genesis 3:15; Genesis 3:21 (whole verses) | BSB, by the validator |
| fall story and question | “you will be like God”; “altogether evil all the time”; “make a name for ourselves”; “Where are you?”; “set free from its bondage to decay” | BSB Genesis 3:5; 6:5; 11:4; 3:9; Romans 8:21 |
| fall activity | “Where are you?”; “seedtime and harvest” | BSB Genesis 3:9; 8:22 |
| sinai verses | Exodus 20:2-3 (the opening quotation mark of 20:2 left out); Exodus 25:8 (whole) | BSB, by the validator |
| sinai story | “I am the LORD your God, who brought you out of the land of Egypt” (and the full verse at the older level); “on eagles’ wings”; “they are to make a sanctuary for Me, so that I may dwell among them”; “The LORD, the LORD God, is compassionate and gracious, slow to anger” and the longer form at the older level; “the life of the flesh is in the blood”; “love your neighbor as yourself” | BSB Exodus 20:2; 19:4; 25:8; 34:6; Leviticus 17:11; 19:18 |
| sinai question | “but to fulfill them”; “one sacrifice for sins”; “the fulfillment of the law”; “I am the LORD your God, who brought you out” | BSB Matthew 5:17; Hebrews 10:12; Romans 13:10; Exodus 20:2 |
| sinai activity | “I am the gate. If anyone enters through Me, he will be saved.”; “one sacrifice for sins”; “bodies washed with pure water”; “I am the light of the world.”; “I am the bread of life.”; “I will meet with you there.”; “made His dwelling among us”; “once for all by His own blood” | BSB John 10:9; Hebrews 10:12; 10:22; John 8:12; 6:35; Exodus 25:22; John 1:14; Hebrews 9:12 |
| land verses | Judges 2:18 (whole); Ruth 1:16 trimmed to Ruth's promise from “wherever you go” | BSB, by the validator |
| land story | “Do not be afraid; do not be discouraged, for the LORD your God is with you wherever you go.”; “What is the meaning of these stones?”; “to this day”; “In those days there was no king in Israel; everyone did what was right in his own eyes” | BSB Joshua 1:9; 4:21; 6:25; Judges 21:25 |
| land activity | the Judges 21:25 line again; “will never end” | BSB Judges 21:25; Luke 1:33 |
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

| The Fall: one tree forbidden; the serpent's question and promise; both ate; fig leaves; hiding among the trees; “Where are you?”; the man blames the woman, the woman the serpent; thorns and thistles, toil, return to dust; garments of skin; sent out; cherubim and a whirling sword of flame on the east side guarding the way to the tree of life (all used in the drawing too) | BSB Genesis 2:16-17; 3:1-24 |
| The serpent on its belly in the dust (the drawing) | BSB Genesis 3:14 |
| Cain killed Abel; the mark on Cain so no one would kill him | BSB Genesis 4:8; 4:15 |
| Wickedness before the flood; Noah and his family kept; the promise of seedtime and harvest | BSB Genesis 6:5-8; 7:1, 7; 8:22 |
| Babel: a tower to the heavens, a name for themselves; language confused, people scattered | BSB Genesis 11:4-9 |
| Christians have long read Genesis 3:15 as the first announcement of Jesus (the "protoevangelium") | Stated as a reading, not as the text's plain sense; the site's own Study Bible note on Genesis 3 (`client/public/bible/notes/genesis/3.json`: "Christian readers since the second century have heard in verse 15 the first announcement of the gospel") and the doctrine of sin (`client/public/bible/doctrines/sin.json`) |
| Christians read some of Genesis 3 differently; all confess creation good, broken by human sin, loved by God | Wording takes no side; the sin doctrine's "differ" section (`client/public/bible/doctrines/sin.json`) shows the traditions differing |
| Sinai: in the third month after leaving Egypt; camped before the mountain; cloud, fire, thunder, the people trembled | BSB Exodus 19:1-2, 16-18 |
| The law given after the rescue: 20:2 states the rescue, 20:3 is the first command | BSB Exodus 20:2-3; site doctrine of the law (`client/public/bible/doctrines/law.json`, definition) says the same |
| The golden calf called the gods who brought them out of Egypt; Moses pleads; God's name; the covenant renewed | BSB Exodus 32:1-4, 30-32; 34:6-10 |
| Glory filled the tabernacle when it was finished | BSB Exodus 40:33-35 |
| Leviticus: Day of Atonement once a year; only the high priest behind the veil; blood and atonement | BSB Leviticus 16:2, 34; 23:27; 17:11; Hebrews 9:7 |
| The tabernacle's parts, each named as Exodus names it: the gate of the courtyard (east side, toward the sunrise, curtain of blue, purple and scarlet yarn); the altar of burnt offering (acacia overlaid with bronze, a horn at each corner); the bronze basin between the Tent of Meeting and the altar, for washing hands and feet; the lampstand of pure hammered gold, one piece, six branches, seven lamps (south side); the table of acacia wood with the Bread of the Presence, twelve loaves in two rows (north side); the gold altar of incense in front of the veil, incense morning and at twilight; the veil of blue, purple and scarlet yarn with cherubim, separating the Holy Place from the Most Holy Place; the ark of the Testimony, acacia overlaid with gold, the mercy seat and two cherubim of gold | BSB Exodus 25:10-37; 26:31-35; 27:1-2, 9-16; 30:1-8, 18-20; 40:2-8, 20-33; Leviticus 24:5-6. Hebrews 9:4 places the incense altar with the Most Holy Place; the stop follows Exodus 30:6 and 40:26 and does not quote Hebrews 9:4 |
| North at the top of the plan and the gate on the east | The drawing's choice, consistent with Exodus 26:35 (table north, lampstand south) and 27:13 (east, toward the sunrise) |
| Where the New Testament takes up each part | BSB John 10:9; Hebrews 10:10-12, 19-22; John 8:12; 6:35; Revelation 8:3-4; Mark 15:38; John 1:14; Hebrews 9:12 |
| What Christians share on the law; that churches explain its place differently (three positions named, no side) | BSB Matthew 5:17; Hebrews 10:12; Romans 13:9-10; site doctrine of the law (`law.json`, "differ": the threefold division, law and gospel, the law of Christ) |
| Many Jewish people today keep the Torah | A general statement only; no description of any community's practice beyond it |
| Forty years in the wilderness after the spies' report; manna; Moses died in sight of the land | BSB Numbers 13:31; 14:33-34; Deuteronomy 8:2-4; 34:4-5 |
| Joshua: the Jordan stopped, dry ground; twelve stones, one per tribe, set up at Gilgal; children asking what they mean | BSB Joshua 3:15-17; 4:1-9, 19-24 |
| The conquest: cities destroyed and many killed, and the text says God commanded it | BSB Joshua 10:40; the Honest Answer `did-god-command-genocide` (Deuteronomy 20:16-17; Joshua 6:21) |
| Rahab of Jericho spared, lived among the Israelites; in Jesus' line | BSB Joshua 6:25; Matthew 1:5 |
| None of God's good promises failed | BSB Joshua 21:45 |
| The judges' cycle and its stages; each time worse; Othniel, Deborah, Gideon; rest forty years (3:11, 5:31, 8:28); Gideon's ephod worshipped by all Israel | BSB Judges 2:11-19; 3:7-11; 4:4; 5:31; 6:6, 12-14; 8:27-28; 10:10 |
| Ruth: set when the judges ruled; a Moabite; barley harvest; gleaning in Boaz's field; Obed the grandfather of David | BSB Ruth 1:1, 16, 22; 2:2-3, 8-9; 4:13-17 (the drawing's field, sheaves and gleaner) |
| Jesus the son of David, whose kingdom will never end | BSB Luke 1:32-33 |
| The answer to "Did God command killing?" | Sentences reused from the Honest Answer `did-god-command-genocide` in `client/src/data/answers.ts`: "On the page, God commands it, and a person who reads those verses and feels sick is reading them correctly."; "Christians who hold the whole Bible to be God's word read these chapters in more than one way."; "Two things hold under all of them. The God of Joshua is the Father of Jesus. And nothing in these chapters gives anyone today a warrant for violence against anyone." One phrase turned from first person to third ("sets out the main readings, with the strength and the hard question of each, without pretending any of them makes the problem go away"). No new argument; nothing about any modern people, state or border |

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
- Any date for the conquest or the judges, and any position on the flood's extent or on the details of a historical Adam.
- Which tribes camped on which side of the tabernacle (Numbers 2): the drawing shows tents at the mountain's foot only, not a tribal plan.
- Ruth 4:14 ("Blessed be the LORD") is not quoted: the site's forbidden-language rule covers "blessed".
