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
| kingdom verses | 1 Samuel 16:7 trimmed to God's words from “the LORD does not see”; 2 Samuel 7:16 (whole) | BSB, by the validator |
| kingdom story and question | “like all the other nations”; “appoint a king to judge us like all the other nations”; “they have rejected Me as their king”; “obedience is better than sacrifice”; “the LORD sees the heart” and the longer form; “the sweet psalmist of Israel”; “I will raise up your descendant after you”; “I will establish the throne of his kingdom forever”; “the thing that David had done was evil in the sight of the LORD”; “You are that man!”; “I have sinned against the LORD”; “The LORD has taken away your sin”; “an understanding heart”; “the glory of the LORD filled the house of the LORD”; “Even heaven, the highest heaven, cannot contain You, much less this temple I have built”; “a clean heart”; “the son of David” | BSB 1 Samuel 8:5, 8:7; 15:22; 16:7; 2 Samuel 23:1; 7:12-13; 11:27; 12:7; 12:13; 1 Kings 3:9; 8:11; 8:27; Psalm 51:10; Matthew 1:1 (each read in the repo's BSB; each also checked by the validator's quotation rule) |
| kingdom activity | “your throne will be established forever”; “His kingdom will never end” (the BSB's exclamation mark left outside the trimmed quotation) | BSB 2 Samuel 7:16; Luke 1:33 |
| exile verses | Psalm 137:1 (whole); Jeremiah 31:33 trimmed to God's words from “I will put My law” (the opening quotation mark of the verse left out) | BSB, by the validator |
| exile story and question | “a shoot will spring up from the stump of Jesse”; “Here, O Israel, are your gods”; “Turn from your wicked ways”; “let justice roll on like a river”; “they would not listen”; “By the rivers of Babylon we sat and wept when we remembered Zion”; “among the exiles by the River Kebar”; “I have been a sanctuary for them in the countries to which they have gone”; “He was pierced for our transgressions”; “Neither this man nor his parents sinned”; “His mercies never fail. They are new every morning” | BSB Isaiah 11:1; 1 Kings 12:28; 2 Kings 17:13, 14; Amos 5:24; Psalm 137:1; Ezekiel 1:1; 11:16; Isaiah 53:5; John 9:3; Lamentations 3:22-23 |
| exile activity | promises: Jeremiah 31:31 (from “I will make”); Ezekiel 36:27 (“I will put My Spirit within you”); Isaiah 53:7 (“He was led like a lamb to the slaughter”); Isaiah 9:7 (“He will reign on the throne of David and over his kingdom”); kept: “This cup is the new covenant in My blood” | BSB, by the validator (the promise field); Luke 22:20 |
| jesus verses | John 1:14 (whole); Mark 4:41 trimmed to the disciples' question | BSB, by the validator |
| jesus story | “The Word became flesh and made His dwelling among us”; “You are My beloved Son; in You I am well pleased”; “the kingdom of God is near”; “the city of David”; “from the house and line of David”; “as was His custom”; “Son, your sins are forgiven”; “Who can forgive sins but God alone?”; “listened to Him with delight”; “But what about you?”; “Who do you say I am?”; “You are the Christ” | BSB John 1:14; Mark 1:11, 15; Luke 2:4; 4:16; Mark 2:5, 7; 12:37; 8:29 |
| jesus activity | “Son, your sins are forgiven”; “Who can forgive sins but God alone?”; “has authority on earth to forgive sins”; “We have never seen anything like this!”; “Follow Me”; “Why does He eat with tax collectors and sinners?”; “I have not come to call the righteous, but sinners”; “Listen! A farmer went out to sow his seed”; “Where did this man get these ideas?”; “Silence!” and “Be still!”; “Who is this, that even the wind and the sea obey Him?”; “Who do you say I am?”; “You are the Christ” | BSB Mark 2:5, 7, 10, 12, 14, 16, 17; 4:3; 6:2; 4:39, 41; 8:29 |
| jesus question | Tacitus, ‘Christus, from whom the name had its origin, suffered the extreme penalty during the reign of Tiberius at the hands of one of our procurators, Pontius Pilatus’; Josephus, ‘the brother of Jesus, the so-called Christ, James by name’ | Not checked anew: reused word for word, with the sentences around them, from the Honest Answer `why-would-anyone-trust-the-bible` in `client/src/data/answers.ts` (its "On the third" paragraph), where they are already cited (Tacitus, Annals 15.44); single quotation marks here so the validator does not read them as Scripture |
| return verses | Nehemiah 8:8 (whole); Malachi 3:1 trimmed to its first sentence (the opening quotation mark left out) | BSB, by the validator |
| return story and question | “to fulfill the word of the LORD spoken through Jeremiah”; “many of the older priests, Levites, and family heads who had seen the first temple wept loudly”; “Does it not appear to you like nothing in comparison?”; “with joy”; “I will fill this house with glory”; “worked with one hand and held a weapon with the other”; “the wall was completed in fifty-two days”; “Behold, I will send My messenger … suddenly come to His temple”; “Elijah the prophet”; “when the time had fully come, God sent His Son”; “It is not for you to know times or seasons that the Father has fixed by His own authority”; “I wait for the LORD; my soul does wait” | BSB Ezra 1:1; 3:12; Haggai 2:3; Ezra 6:16; Haggai 2:7; Nehemiah 4:17; 6:15; Malachi 3:1; 4:5; Galatians 4:4; Acts 1:7; Psalm 130:5 (each also by the validator's quotation rule) |
| church verses | Acts 1:8 (the closing quotation mark left out); 1 Corinthians 3:16 (whole) | BSB, by the validator |
| church story, differ and question | “you will be My witnesses …”; “all that Jesus began to do and to teach”; “a cloud hid Him from their sight”; “tongues like flames of fire”; “from every nation under heaven”; “about three thousand were added to the believers that day”; “to the apostles’ teaching and to the fellowship, to the breaking of bread and to prayer”; “The disciples were first called Christians at Antioch”; “Saul, Saul, why do you persecute Me?”; “Boldly and freely he proclaimed the kingdom of God and taught about the Lord Jesus Christ”; “Now you are the body of Christ …”; “Do you not know that you yourselves are God’s temple …”; “being built together into a dwelling place for God in His Spirit”; “in the name of the Father, and of the Son, and of the Holy Spirit”; “You have abandoned your first love” | BSB Acts 1:8, 1:1, 1:9; 2:3, 2:5, 2:41, 2:42; 11:26; 9:4; 28:31; 1 Corinthians 12:27; 3:16; Ephesians 2:22; Matthew 28:19; Revelation 2:4 |
| church activity | “does not show favoritism, but welcomes those from every nation who fear Him and do what is right” | BSB Acts 10:34-35 |
| church question | ‘the failures of the counterfeit do not abolish the original. You cannot be disappointed by a forgery unless you carry the image of the genuine article it failed to be.’ | Not new: reused word for word from the Honest Answer `can-you-be-a-christian-without-church` (`client/src/data/answers.ts`, its second paragraph); single quotation marks so the validator does not read it as Scripture. “no church gets to point at another” is the wording of the Honest Answer `what-did-the-new-atheists-get-right` (“No church gets to point at another.”) |
| new-creation verses | Revelation 21:3 from “Behold” (the quotation marks left out); Revelation 21:5 trimmed to God's words | BSB, by the validator |
| new-creation story and question | “the firstfruits of those who have fallen asleep”; “is raised imperishable”; “will be set free from its bondage to decay”; “has set a day when He will judge the world with justice”; “according to their deeds”; “a new heaven and a new earth”; “Behold, the dwelling place of God is with man, and He will dwell with them”; “no more death or mourning or crying or pain”; “because the glory of God illuminates the city, and the Lamb is its lamp”; “the glory and honor of the nations”; “as clear as crystal”; “No longer will there be any curse”; “will see His face”; “Behold, I make all things new”; “coming down out of heaven from God”; “to depart and be with Christ, which is far better indeed”; “No one knows about that day or hour” | BSB 1 Corinthians 15:20, 42; Romans 8:21; Acts 17:31; Revelation 20:12; 21:1-5, 21:23, 21:26; 22:1-4; Philippians 1:23; Matthew 24:36 |
| new-creation creed | ‘the resurrection of the body; and the life everlasting’ | The Apostles' Creed as the site gives it (`client/public/creeds/documents/apostles-creed.json`); Christ coming “to judge the quick and the dead” is told in plain words (the living and the dead), not quoted |
| new-creation judgment | ‘The reality of judgment and of being finally separated from God is what the church has always taught, and it is close to the center of the faith. The exact nature and duration of hell is a different matter, and Bible-loving Christians have genuinely disagreed about it.’ and ‘Whatever hell is, it isn't what God wants for anyone.’ | Reused word for word from the Honest Answer `is-hell-forever-or-does-it-end` (its opening paragraph, and its section "The strongest reply"); no first-person sentence of that answer is used |
| new-creation activity | Genesis 3:24 (“to guard the way to the tree of life”); Genesis 2:10 (“Now a river flowed out of Eden to water the garden”); Genesis 3:8 (“the LORD God walking in the garden in the breeze of the day”); Genesis 3:17 (“cursed is the ground because of you”); kept lines told from Revelation 22:1-4 and 21:3, with “No longer will there be any curse” quoted from 22:3 | BSB, by the validator (the promise field); Revelation in the BSB |
| king thread | “kings will descend from you”; “The LORD will reign forever and ever!” (the exclamation mark is the BSB's own, inside the quotation); “a kingdom of priests and a holy nation”; “In those days there was no king in Israel; everyone did what was right in his own eyes”; “your throne will be established forever”; “will reign on the throne of David”; “See, your King comes to you”; “the kingdom of God is near”; “THE KING OF THE JEWS”; “head over everything for the church”; “The throne of God and of the Lamb will be within the city” | BSB Genesis 17:6; Exodus 15:18; 19:6; Judges 21:25; 2 Samuel 7:16; Isaiah 9:7; Zechariah 9:9; Mark 1:15; 15:26; Ephesians 1:22; Revelation 22:3 (the validator now runs its quotation rule over every thread too) |
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
| The Kingdom: the people ask for a king like the nations; God says they have rejected him as king; Saul a head taller than anyone; Saul offers the sacrifice himself when Samuel is late and the troops slip away, and makes excuses; Samuel says his kingdom will not endure | BSB 1 Samuel 8:5-7, 20; 9:2; 13:8-14; 15:22-23 |
| Jesse's sons pass before Samuel; the youngest, tending the sheep, is anointed | BSB 1 Samuel 16:6-13 |
| David played the harp (the drawing's harp) | BSB 1 Samuel 16:23 |
| Many psalms carry David's name | BSB Psalm headings (e.g. Psalm 23:1, 51:1, "A Psalm of David"); the site's Psalm 51 note (`client/public/bible/notes/psalms/51.json`: "the second collection of David's psalms (51 to 72)") |
| David and Goliath: he trusted the LORD to deliver him | BSB 1 Samuel 17:37, 45-47 |
| David spared Saul in the cave, his men urging him to kill him | BSB 1 Samuel 24:3-10 |
| David took Jerusalem (the fortress of Zion, the City of David) and brought up the ark | BSB 2 Samuel 5:6-7; 6:12-15 |
| David wanted to build God a house; God promised him a son whose throne lasts for ever, disciplined but never losing God's loving devotion | BSB 2 Samuel 7:1-16 |
| David's sin: in the spring he stayed in Jerusalem; he sent for Bathsheba, the wife of Uriah, and slept with her; she became pregnant; he had Uriah put at the front of the battle to be killed; she mourned her husband; David took her as his wife; the thing was evil in the LORD's sight | BSB 2 Samuel 11:1-5, 14-17, 26-27; 12:9 ("You put Uriah the Hittite to the sword and took his wife as your own") |
| Nathan's story of the rich man and the poor man's lamb; David confessed and was forgiven; the sword would not depart from his house | BSB 2 Samuel 12:1-14 |
| Psalm 51 is headed as David's prayer when Nathan came to him | BSB Psalm 51:1 (heading); site note `psalms/51.json` |
| Solomon at Gibeon asked for an understanding heart; God was pleased | BSB 1 Kings 3:5-12 |
| The temple: built of stone finished at the quarry; cedar from Lebanon; two bronze pillars at the porch, Jachin and Boaz (the drawing) | BSB 1 Kings 5:6; 6:7; 7:15-21 |
| The cloud and the glory filled the temple | BSB 1 Kings 8:10-11 |
| Solomon in old age: his wives turned his heart after other gods; high places for their gods; the kingdom to be torn away from his son | BSB 1 Kings 11:3-13 |
| Matthew calls Jesus the son of David; the angel says the Lord God will give him the throne of his father David and his kingdom will never end | BSB Matthew 1:1; Luke 1:32-33 |
| Jewish and Christian readers both have long heard in the promise to David the hope of a coming king from David's line; Christians believe it is Jesus; Jewish tradition still waits | The site's context guide `client/public/context/guides/messianic-expectation.json` (God's promise to David kept alive through the prophets; Psalm of Solomon 17's hope for the son of David). Web search 2026-11-20: My Jewish Learning, "Who is the Messiah?", https://www.myjewishlearning.com/article/who-is-the-messiah/ ; Jewish Virtual Library, "The Messiah", https://www.jewishvirtuallibrary.org/the-messiah (the Messiah a human descendant of David, still awaited; Maimonides' account). Stated with "still waits" only, no description of any community beyond it |
| The Prophets and Exile: Rehoboam answered harshly and rejected the elders' advice; the northern tribes made Jeroboam king; only Judah followed the house of David; ten tribes | BSB 1 Kings 11:31; 12:13-20 |
| Jeroboam's two golden calves | BSB 1 Kings 12:28 |
| Prophets named: Elijah (Ahab's day), Amos, Hosea, Isaiah, Micah (the days of the kings of Israel and Judah), Jeremiah (to the exile) | BSB 1 Kings 17:1; Amos 1:1; Hosea 1:1; Isaiah 1:1; Micah 1:1; Jeremiah 1:1-3 |
| A prophet spoke God's word about worship, justice for the poor and hope (not mainly a fortune-teller) | The brief's wording; BSB 2 Kings 17:13; Amos 5:24; Isaiah 1:17; Jeremiah 31:31-34 show all three |
| The north carried away by Assyria from Samaria | BSB 2 Kings 17:6 |
| Babylon burned the temple, the palace and the houses, broke down the walls, carried the people into exile | BSB 2 Kings 25:8-11 |
| Ezekiel among the exiles by the Kebar saw the glory of the LORD; later, in a vision, saw it leave the temple; God a sanctuary to the exiles | BSB Ezekiel 1:1, 28; 10:18; 11:16 (Ezekiel 1 is dated before chapter 10: Ezekiel 1:2 and 8:1) |
| Daniel prayed toward Jerusalem three times a day; Jeremiah told the exiles to pray for the city | BSB Daniel 6:10; Jeremiah 29:7 |
| Lamentations mourns the lonely city | BSB Lamentations 1:1 |
| The promises: new covenant (Jeremiah 31:31-34); new heart and Spirit (Ezekiel 36:26-27); child on David's throne (Isaiah 9:6-7); shoot from the stump of Jesse (Isaiah 11:1); the servant (Isaiah 53) | BSB at each reference |
| Where the New Testament takes them up: the cup at the supper; Pentecost; Philip and the Ethiopian official reading Isaiah 53; the angel to Mary | BSB Luke 22:20 (and Hebrews 8:8, which quotes Jeremiah 31 by name); Acts 2:1-4 (the site's own note `client/public/bible/notes/acts/plain/1.json` pairs Ezekiel 36:27 with the Spirit's coming); Acts 8:27-35; Luke 1:32-33 |
| Isaiah calls Israel God's servant | BSB Isaiah 49:3 (also 41:8) |
| Christians from the first church read the servant as Jesus; many Jewish readers, especially since the Middle Ages, read him as Israel; some older Jewish writings read him as the Messiah | BSB Acts 8:35; the site's Study Bible note `client/public/bible/notes/isaiah/53.json` (Rashi, Ibn Ezra and Kimhi from the eleventh century; the Targum calls the Servant the Messiah; Levine and Brettler, *The Bible With and Without Jesus*, 2020, on the national reading coming to dominate in the Middle Ages) |
| Not every loss is a punishment | BSB John 9:2-3 |
| Jesus Comes: born in Bethlehem, the city of David; Mary pledged to Joseph of David's line; laid in a manger | BSB Luke 1:26-27; 2:4-7 |
| Grew up in Nazareth; the synagogue on the Sabbath as his custom; the Passover at Jerusalem with his parents | BSB Luke 2:39-42, 51-52; 4:16 |
| About thirty at the start of his ministry | BSB Luke 3:23 |
| Baptized by John in the Jordan; the Spirit like a dove; the voice from heaven | BSB Mark 1:9-11 |
| Touched a man with leprosy; others kept away from him | BSB Mark 1:40-42; the site's note `client/public/bible/notes/matthew/plain/8.json` (Leviticus 13:46: he lived alone outside the camp) |
| Four friends, the roof opened, the man lowered on his mat, forgiven, healed, walked out (the drawing's house, roof and mat) | BSB Mark 2:1-12 |
| Levi at the tax booth by the sea; the meal with tax collectors and sinners (the drawing's booth) | BSB Mark 2:13-17 |
| Taught from a boat to the crowd along the shore; the parable of the sower, birds on the path (the drawing) | BSB Mark 4:1-4 |
| That evening the storm on the lake; calmed with a word | BSB Mark 4:35-41 |
| The LORD calms the storm (Psalms) | BSB Psalm 107:29 (also 89:9) |
| Twelve disciples, a number that recalls the twelve tribes | BSB Mark 3:14; Matthew 19:28 |
| Some Pharisees with the Herodians plotted against him; the crowd listened with delight; Jesus, his disciples and the crowds were Jews | BSB Mark 3:6; 12:37. Wording follows `client/public/bible/notes/acts/plain/2.json` ("Jesus himself, his disciples, and the crowds who welcomed him were Jews") and the Cross stop |
| Caesarea Philippi: who people say; Peter's answer; then the teaching that he must suffer, be killed and rise; the road up to Jerusalem | BSB Mark 8:27-31; 10:32-33 |
| The sun over Galilee in the drawing (a light has dawned) | BSB Matthew 4:13-16 (quoting Isaiah 9:1-2) |
| The care line on healing: prayer for healing that did not come is not a sign of too little faith | The site's note `client/public/bible/notes/matthew/plain/8.json` (verses 1-4): "The Bible does not teach that sickness comes from too little faith" |
| The answer on the Gospels | Sentences reused from the Honest Answer `why-would-anyone-trust-the-bible` (its opening paragraph), one sentence ("The books were recognized ... not voted in by a council.") left out; "Writers outside the church confirm the center." from the same answer |

| Cyrus let the exiles go home to rebuild; only some went; Esther set in Persia | BSB Ezra 1:1-4; 2:64 (the count of those who came); Esther 1:1-2 |
| The returning exiles rebuilt the altar, laid the foundation, were opposed and stalled, then finished under Haggai and Zechariah in Darius's sixth year | BSB Ezra 3:1-13; 4:4-5, 24; 5:1-2; 6:14-15 |
| No cloud of glory is reported at the second temple's dedication (the stop says only that Ezra reports none) | BSB Ezra 6:16-22 read in full: sacrifices, priests and Levites, Passover; no cloud or glory filling the house (contrast 1 Kings 8:10-11) |
| Ezra read the law from daybreak until noon; the Levites helped the people understand | BSB Nehemiah 8:3, 7-8 |
| The people fell back into old wrongs at the end of Nehemiah | BSB Nehemiah 13:10-11, 15-18, 23-27 |
| John the Baptist as the messenger of Malachi 3:1 | BSB Mark 1:2-4 |
| Abraham waited twenty-five years; Israel lived 430 years in Egypt | Already in this ledger (Genesis 12:4; 21:5; Exodus 12:40) |
| Ascension after forty days; two men in white; Pentecost; three thousand baptized; the shared life | BSB Acts 1:3-11; 2:1-47 |
| The first church Jewish; met in the temple courts | BSB Acts 2:5, 2:46; wording of “as Jesus himself, his disciples and the crowds who welcomed him were Jews” from `client/public/bible/notes/acts/plain/2.json` (verses 22-28) |
| Scattered by persecution to Samaria; a long and painful history between Jews and Samaritans | BSB Acts 8:1-8; wording from `client/public/bible/notes/acts/plain/8.json` (verses 1-3 and 4-8, “carried a long and painful history”) |
| The Ethiopian official; Ethiopia the far southern edge of the known world | BSB Acts 8:26-39; `client/public/bible/notes/acts/plain/8.json` (verses 26-40: “the far southern edge of the known world”) |
| Cornelius, a Roman centurion in Caesarea; the Spirit fell while Peter was speaking | BSB Acts 10:1-2, 44-48; `client/public/bible/notes/acts/plain/10.json` |
| Greeks believed in Antioch; Barnabas and Saul sent out; Saul also called Paul; Acts ends in Rome | BSB Acts 11:19-26; 13:1-4, 9; 28:30-31 |
| The council: Gentiles need not become Jews | BSB Acts 15:19-29 |
| Saul a Pharisee who approved of Stephen's death and set out to destroy the church | BSB Philippians 3:5; Acts 8:1-3 |
| Many readers think of Babel at Pentecost | Wording from `client/public/bible/notes/acts/plain/2.json` (verses 1-4, “many readers think of Babel”) |
| Where churches differ: who is baptized and how; whether gifts such as tongues continue; how churches are led | Baptism: `client/public/bible/notes/acts/plain/2.json` (verses 37-41, each tradition in its own words; “What all these churches share is larger than what divides them”, “faithful churches differ while confessing one Lord”); mode (immersion, pouring, sprinkling): `client/public/bible/notes/acts/plain/8.json` (verses 36-40, “many churches baptize by pouring water or sprinkling it”) and `client/public/theology/church.json` (“by immersion under the water, by pouring, or by sprinkling”); the gifts: Acts 2 note (verses 1-4: “the Spirit is the gift of the risen Jesus to his whole church”); leadership: `client/public/bible/notes/hebrews/13.json` (“Churches differ on how leadership is structured (bishops, elders, congregational decision-making)”) |
| Letters to the churches are much of the New Testament | `client/public/bible/story.json`, act `church-spirit` (the letters, most by Paul, written into the movement) |
| Paul's travels get a map later | The plan in `docs/work/elite/explorer.md` ("Paul's travels"); no link until it exists |
| Revelation written by John to seven churches in Asia, where loyalty to Rome was shown by worshipping the emperor; its last chapters bring the first chapters home | `client/public/bible/story.json`, act `new-creation` ("world" and "watch") |
| Christians differ on the thousand years, the rapture and the order of the last events; faithful readers have held more than one view since the early church | `client/public/bible/notes/revelation/20.json` (Justin Martyr and Irenaeus, Augustine, Edwards, Darby); `client/public/studyguides/end-times.json` (the rapture and the dispensational debate); `client/public/bible/story.json` (second-order questions; every reading agrees on its center) |
| The risen Jesus could be touched and ate fish | BSB Luke 24:39-43 |
| Revelation shows no sun or moon, no temple, no sea, the gates never shut (the New Creation drawing) | BSB Revelation 21:1, 21:22-25 |

## History and scholarship

| Claim | Checked |
|---|---|
| The kingdom split around 930 BC | `client/public/bible/notes/1-kings/` (book page: "After the division of the kingdom around 930 BC"); `client/public/bible/story.json` (Solomon "about 970 to 930"). Web search 2026-11-20: sources give 931, 930 or 922 BC (e.g. ESV Global Study Bible chart, https://www.esv.org/resources/esv-global-study-bible/chart-06-historical-intro/), so the stop says "around" |
| Samaria fell to Assyria in 722 BC | `client/public/bible/notes/2-kings/` book page; web search 2026-11-20 (most sources 722 BC; some 722 to 720), e.g. https://www.posenlibrary.com/node/9424 |
| Babylon burned Jerusalem and the temple in 587 or 586 BC | Worded as the site's Psalms and Kings notes word it ("587 or 586 BC"; `client/public/bible/notes/psalms/`, the 2 Kings book page); web search 2026-11-20 (sources split between 587 and 586 by calendar reckoning) |
| "More than three centuries" of prophets | From about 930 BC to 587 or 586 BC, by the dates above |
| In the ancient world a king could be called the image of a god, and kings set up statues of themselves to show who ruled a land | Already stated in the site's own content (`client/public/bible/doctrines/humanity.json`, `client/public/bible/notes/genesis/verses/1.json`, `client/public/studyguides/youth-who-am-i.json`); web search 2026-11-19: Bible Odyssey, "Created in the Image of God" (Akkadian *tzalmu*, the king as the image of the god), https://www.bibleodyssey.org/passages/related-articles/created-in-the-image-of-god ; J. Richard Middleton, "Created in God's Image: The Royal Calling of Humanity", https://jrichardmiddleton.com/category/origin-of-evil/ |
| Paul wrote the list of witnesses "within about twenty-five years of the events" | Site's own dating: 1 Corinthians "around AD 53 to 55" (Study Bible notes; `client/public/bible/`), crucifixion "AD 30 or 33" (`client/public/bible/story.json`, act `christ`): twenty to twenty-five years |
| Roughly four centuries between the return and the birth of Jesus | `client/public/bible/story.json`, act `return-silence` ("roughly four centuries the Old Testament does not narrate") |
| The Spirit came fifty days after Passover (Pentecost) | `client/public/bible/notes/acts/plain/2.json` |
| The Council of Chalcedon, 451, confessed Christ truly God and truly man in one person | `client/public/theology/church-history-councils.json` and `christology.json` |
| Who condemned and who crucified; Jesus, his disciples and the first church were Jews; the New Testament places all people inside the guilt | Wording follows `client/public/bible/notes/acts/plain/2.json` (verses 22-28, "hard") |
| The Honest Answer on choosing "lays out both" views without picking | `client/src/data/answers.ts`, `does-god-choose-us-or-do-we-choose-him` |
| The Honest Answer on Genesis 1 takes no side on the age of the earth or evolution | `client/src/data/answers.ts`, `how-should-a-christian-read-genesis-1`, first paragraph |

| Babylon fell to Cyrus in 539 BC; the return about 538 BC | `client/public/bible/story.json`, act `return-silence` (“538 BC”; the Cyrus Cylinder “from about 539 BC … though it does not mention the Jews”). Web search 2026-11-20: 538 BC widely given for the decree (e.g. City of David timeline, https://timeline.cityofdavid.org.il/event/the-proclamation-of-cyrus-538-bce-and-the-dedication-of-the-second-temple-516-bce ; Jewish Agency, https://archive.jewishagency.org/jewish-history/content/25602), so the activity says “About 538 BC” |
| The second temple finished around 515 BC (some count 516) | Ezra 6:15 (Darius's sixth year); `client/public/bible/story.json` (“around 515 BC”). Web search 2026-11-20: sources give 515 or 516 depending on how the regnal year is converted (e.g. https://cojs.org/Historical_Background_and_Political_History_-520-332_BCE/ ; the City of David timeline gives 516), so both are named |
| Ezra around 458 BC; Nehemiah around 445 BC | `client/public/bible/story.json`, act `return-silence` |
| Alexander conquered Persia in the 330s BC; the Scriptures put into Greek in Alexandria; Antiochus IV defiled the temple in 167 BC; the Maccabean revolt; the temple rededicated in 164 BC, the origin of Hanukkah; Rome took Jerusalem in 63 BC | `client/public/bible/story.json`, act `return-silence`; `client/public/context/worlds/jewish-life-in-jesus-day.json` (the Maccabees against Antiochus in the 160s BC; Pompey took Jerusalem in 63 BC); ledger `docs/work/elite/worlds-ledger.md` covers that portrait. Web search 2026-11-20: 167 BC and 164 BC most cited (some give 165 for the rededication), Pompey 63 BC agreed (e.g. https://www.bu.edu/mzank/Jerusalem/cp/hasmoneans.htm ; https://enterthebible.org/time-period/maccabees-and-hasmoneans/) |
| Synagogue, Pharisees and Sadducees belong to these years and are the Gospels' world | `client/public/bible/story.json`, act `return-silence`; `client/public/context/worlds/jewish-life-in-jesus-day.json` (parts on the synagogue and the groups) |
| “The silent years”: a Christian name; Jewish life and writing in those centuries | The name is a common Christian label (said as “Christians have sometimes called”); that the years were full of Jewish prayer, study, argument, martyrdom and writing: the same portrait (1 and 2 Maccabees, Sirach, the Psalms of Solomon, the Dead Sea Scrolls, the synagogue) |
| John the Baptist about AD 28 or 29 | Luke 3:1 (the fifteenth year of Tiberius); the site's Luke notes (“his fifteenth year falls in late AD 28 or 29”) |
| About four hundred years between Malachi and John | Malachi mid-fifth century (`story.json`) to about AD 28; `story.json` (“roughly four centuries the Old Testament does not narrate”) |
| Pentecost fifty days after Passover, the Feast of Weeks | `client/public/bible/notes/acts/plain/2.json` |

## Deliberately left out

- Which Egyptian god each plague answered (a common teaching, but argued); the stop quotes Exodus 12:12 instead.
- The women's testimony argument (that a woman's word counted little in court); not checked to the standard, so not used.
- Any date for Abraham or the exodus; the story is told without them for this age.
- Any date for the conquest or the judges, and any position on the flood's extent or on the details of a historical Adam.
- Which tribes camped on which side of the tabernacle (Numbers 2): the drawing shows tents at the mountain's foot only, not a tribal plan.
- Ruth 4:14 ("Blessed be the LORD") is not quoted: the site's forbidden-language rule covers "blessed".
- Nehemiah 4:17 is drawn and quoted as the BSB words it (a laborer working with one hand and holding a weapon with the other); no trowel is named, since the BSB does not say one.
- Any date for the end, any reading of current events, any modern nation or state, and any scheme of the last things named as the right one.
- Any list of the church's atrocities; the question on the church's harm names kinds of wrong plainly and points to the Honest Answers.
- No first-person sentence from any Honest Answer is reused (several are written in James's voice).

