# Claims ledger: did-god-command-genocide

Essay: `docs/work/essays/did-god-command-genocide.md` ("Did God Command Genocide?"). Rewrite of the earlier essay of the same slug; NOTES.md lists no essays folded into it. The writer's ledger of 2026-10-26 marked most items "memory, unverified." The verifier rechecked every claim on 2026-10-27 and rewrote this ledger. Each line gives the result and the method actually used.

## Read this first: no web search was available for this check

The workflow's shared web-search budget was used up before this check began. The one WebSearch call this run made (for the Underhill quotation) came back "this turn's web search budget is used up." No search result was seen for this essay. No page on esv.org, un.org, ohchr.org or Wikipedia was opened: un.org, ohchr.org, avalon.law.yale.edu and en.wikipedia.org were each tried once with curl and refused by the sandbox proxy (403 on CONNECT). Every check below was made against texts reachable through GitHub, or against files already in this repository.

What the method words below mean:

- **"ESV copy"**: compared by script with the ESV text in the public GitHub repository lguenth/mdbible ("ESV Bible in Markdown"), commit fd66568 (2022-01-20). The clone was already in the session scratchpad (`scratchpad/esv-mdbible`) from an earlier run; this run read its chapter files with `git show` on 2026-10-27. Its `json/ESV.json` names itself "English Standard Version 2011" (built from a SWORD module), so this is the 2011 ESV text, not the 2016 permanent text and not esv.org. The script compared each quotation twice: once after normalizing case, punctuation and spacing, and once keeping punctuation (only curly quotes, the copy's "Lord" for LORD, and the parser's stray spaces before punctuation were normalized). Every Scripture quotation matched both times; the only flags were a capital letter at the start of a verse (Exodus 23:30, "Little by little") and the parser's space before an apostrophe (Matthew 15:27, "masters ’ table"). Recheck against esv.org with James's API key once it exists.
- **"KJV copy"**: read in `json/en_kjv.json` from the public GitHub repository thiagobodruk/bible, downloaded by this run from raw.githubusercontent.com on 2026-10-27.
- **"TCP Underhill"**: read in the EEBO-TCP keyed transcription A14203 of John Underhill, *Nevves from America* (London, 1638; STC 24518), downloaded by this run on 2026-10-27 from raw.githubusercontent.com/textcreationpartnership/A14203/master/A14203.xml. Its TCP number was found by reading the Text Creation Partnership's own index file, raw.githubusercontent.com/textcreationpartnership/Texts/master/TCP.csv, downloaded the same day. Its title page reads "LONDON, Printed by I.D. for Peter Cole ... 1638."
- **"TCP Mason"**: read in the Evans-TCP keyed transcription N03314 of John Mason, *A Brief History of the Pequot War* (Boston, 1736), with Thomas Prince's introduction and notes, downloaded by this run on 2026-10-27 from raw.githubusercontent.com/textcreationpartnership/N03314/master/N03314.xml.
- **"WDB"**: read with `git show` on 2026-10-27 in the HistoricalChristianFaith/Writings-Database clone already in the scratchpad (`scratchpad/wdb`, commit 328918a, 2026-10-25). The repository's README says its texts come from the ANF/NPNF series, Roger Pearse's collections, and machine-translated Migne. The files used here do not name their translator; the Tertullian, Augustine and Confessions files read as the ANF/NPNF translations, and the Aquinas file reads as the English Dominican Province translation. Where a file is the repository's own translation, the line says so.
- **"Swete LXX"**: read in the public GitHub repository nathans/lxx-swete (Swete's Septuagint, derived from the First1KGreek project), cloned blobless by this run on 2026-10-27 (commit 26bad3e), file `data/06.Josue.txt`.
- **"Site Greek/Hebrew data"**: read in this repository's `client/public/bible/ch/<book>/<chapter>.json` (STEPBible tagged Greek and Hebrew) on 2026-10-27.
- **"Checked against NOTES"**: checked against the biography rules in `docs/work/NOTES.md` and `docs/work/essays/BRIEF.md`.
- **"Not checked (textbook)"**: no source was opened or searched; the verifier judged it standard reference knowledge. That judgment is not a check.
- **"Not checked (memory), kept"**: a characterization of a modern scholar or a general observation that no reachable source could test. It stays as written and should be checked when search or the book is available.

## Corrections made in the essay (2026-10-27)

1. Opening: "Several hundred Pequots died, most of them women, children and old men" became "Several hundred Pequots died, women and children among them." The proportion could not be checked. Underhill's own account says "downe fell men, women, and children" (TCP Underhill), which supports the new wording.
2. The word genocide: the Genocide Convention's Article II wording was in quotation marks ("committed with intent to destroy, in whole or in part, a national, ethnical, racial or religious group, as such"). The Convention's text could not be opened (un.org and ohchr.org refused by the proxy; no search). It is now paraphrase without quotation marks: "defines it as acts committed with intent to destroy, in whole or in part, a national, ethnic, racial or religious group." Restore the verbatim quotation once the text is checked.
3. Ancient war reports: "he says he killed the seven thousand people of Nebo" became "he says he killed the people of Nebo." The number could not be checked against any reachable translation of the Mesha inscription, so it was cut.
4. Jesus and the Canaanite woman (section headed "A Canaanite Woman" until the voice pass): "coastland the tribes of Israel never took (Judges 1:31)" became "coastland the tribes of Israel never took (Judges 1:31 lists Sidon among the towns Asher did not drive out)." ESV copy: Judges 1:31 names Sidon (with Acco, Ahlab, Achzib and others) but not Tyre, so the bare reference overstated what the verse says.
5. Use and misuse: "the verse after the walls fall is left out" became "is usually left out." The claim about children's Bibles is a general observation no source here could test; the absolute form was an overclaim.

No Scripture quotation was found to be wrong, and no non-Scripture quotation that could be opened was found to be wrong.

## Biography

- "I have five sons." Verified. Checked against NOTES (confirmed biography). No other biography appears in the essay.

## Mystic, 1637, and John Underhill

- The attack came in the early morning. Verified. TCP Underhill: the volley was "given at breake of day"; TCP Mason: "it being a cool Morning."
- Date, May 26, 1637. Verified. TCP Mason, Prince's note: "Mr. Increase Mather, from a Manuscript He met with, tells us; It was on Friday, May 26. 1637." (Julian calendar.)
- English soldiers from Connecticut and Massachusetts Bay. Verified. TCP Mason: ninety men "sent out by CONNECTICUT COLONY ... under the Command of Capt. John Mason"; Underhill, earlier sent out by "the Council of the Massachusetts," joined with nineteen men.
- With Mohegan and Narragansett fighters alongside them. Verified. TCP Mason: Uncas (Onkos), sachem of the Mohegans, went with the Connecticut force; TCP Underhill names "Narragansets, and Mohigeners" among "our Indians" and says those who escaped "fell into the hands of the Indians, that were in the reere of us."
- A fortified village near the Mystic River. Verified. TCP Mason: "The Place of the Fort being called MISTICK, this Fight was called MISTICK-FIGHT."
- The English set it on fire. Verified. TCP Underhill: Mason "set fire on the West-side ... my selfe set fire on the South end"; TCP Mason: "WE MUST BURN THEM."
- People who escaped the flames were cut down outside the palisade. Verified. TCP Underhill: those who came out "our souldiers received and entertained with the point of the sword; downe fell men, women, and children, those that scaped us, fell into the hands of the Indians."
- Several hundred Pequots died, women and children among them. Verified (as corrected). TCP Underhill: "about foure hundred soules in this Fort, and not above five of them escaped"; TCP Mason: "six or seven Hundred, as some of themselves confessed."
- "one of the two English captains, John Underhill." Verified. TCP Underhill (fort engraving labels "Captayne Vnderhill" and "Captayne Mason"); TCP Mason.
- Underhill published *Newes from America* in London the next year. Verified. TCP Underhill title page: London, 1638.
- He answered readers who would ask why Christians had shown so little mercy. Verified as paraphrase. TCP Underhill: "It may bee demanded, Why should you be so furious (as some have said) should not Christians have more mercy and compassion?"
- Quotation: "Sometimes the Scripture declareth women and children must perish with their parents." Verified. TCP Underhill: "sometimes the Scripture declareth women and children must perish with their parents;" Every word matches; the essay capitalizes the first letter because the quotation opens its sentence. The words that follow in the source, "some-time the case alters: but we will not dispute it now," are left out, which the essay signals by closing the first quotation and opening a second.
- Quotation: "We had sufficient light from the word of God for our proceedings." Verified. TCP Underhill, word for word.
- Note for the editor, no change made: just before these sentences Underhill points his readers to "Davids warre" (the harrows and saws of the Ammonite campaign) rather than to Joshua. The essay's later line that English soldiers could "play Israel" and the Pequots "play Canaan" is interpretation and does not misquote him.

## The commands (Scripture, ESV)

- Genesis 18:25 "Far be it from you ... Shall not the Judge of all the earth do what is just?" Verified. ESV copy.
- Abraham bargains from fifty down to ten, and God agrees to spare the city for ten (Genesis 18:24–32). Verified. ESV copy.
- Deuteronomy 20:10, 15: an offer of peace to cities far away. Verified as paraphrase. ESV copy ("offer terms of peace to it"; "all the cities that are very far from you").
- Deuteronomy 20:16–18 block quotation. Verified. ESV copy.
- Deuteronomy 20:17 names six peoples. Verified. ESV copy.
- Deuteronomy as instructions for a war west of the Jordan. Not checked (textbook).
- *herem* is the Hebrew behind "devote to destruction." Verified. Site Greek/Hebrew data: Deuteronomy 20:17, Joshua 6:21 and 1 Samuel 15:3, 8 tag the verb as H2763 (ḥāram), and Joshua 6:17 tags the noun as H2764 (ḥērem). "devote to destruction" itself is ESV wording (ESV copy: Numbers 21:2 and elsewhere).
- *herem* as something handed over to God entirely and taken out of human use. Verified in substance. ESV copy, Leviticus 27:28–29 ("every devoted thing is most holy to the LORD"; no devoted thing "shall be sold or redeemed").
- In war, people under the ban were not taken captive, and goods under it were not kept as plunder. Verified in substance for Jericho. ESV copy, Joshua 6:17–19 (silver and gold go "into the treasury of the LORD"). Ai is the exception (Joshua 8:2, livestock and spoil allowed); the essay's wording ("goods under it") stays within that.
- Joshua 6:21 "they devoted all in the city to destruction ... with the edge of the sword." Verified. ESV copy.
- Joshua 10:40 "left none remaining, but devoted to destruction all that breathed, just as the LORD God of Israel commanded." Verified. ESV copy. "After the southern campaign": 10:40 lists the hill country, Negeb, lowland and slopes.
- 1 Samuel 15:3 "Do not spare them, but kill both man and woman, child and infant, ox and sheep, camel and donkey." Verified. ESV copy. Samuel speaks the command to Saul (15:1–2). Verified. ESV copy.
- "child and infant" (quoted again in the five-sons paragraph). Verified. ESV copy, 1 Samuel 15:3.
- "Generations later." Not checked (textbook).

## The word genocide

- Raphael Lemkin, a Polish Jewish lawyer, coined the word in 1944. Not checked (textbook).
- The UN Convention on the Prevention and Punishment of the Crime of Genocide adopted on December 9, 1948. Not checked (textbook).
- Article II definition. Corrected: now paraphrase without quotation marks (see Corrections, item 2). The Convention text could not be opened.
- Deuteronomy 20:18 gives a religious reason. Verified. ESV copy.

## What the text says the war was for

- Deuteronomy 9:5 "Not because of your righteousness ... driving them out from before you." Verified. ESV copy (the quotation stops mid-verse).
- Leviticus 18 lists practices that defiled the land (18:24–27), among them offering children to Molech (18:21). Verified as paraphrase. ESV copy.
- Leviticus 18:25 "the land vomited out its inhabitants." Verified. ESV copy.
- Deuteronomy 12:31 "even burn their sons and their daughters in the fire to their gods." Verified. ESV copy.
- Genesis 15:16 "for the iniquity of the Amorites is not yet complete," spoken to Abram about the land. Verified. ESV copy (15:13–16).
- Rahab lived in Jericho and hid the spies. Verified. ESV copy, Joshua 2:1.
- Joshua 2:11 "the LORD your God, he is God in the heavens above and on the earth beneath." Verified. ESV copy.
- Joshua 6:25 "she has lived in Israel to this day." Verified. ESV copy.
- The Gibeonites gain a treaty by cunning and are kept alive (Joshua 9). Verified as paraphrase. ESV copy, Joshua 9:3–4, 15.
- Achan, of the tribe of Judah, kept devoted things (Joshua 7:1); he is put to death and his sons and daughters are brought with him to the valley (Joshua 7:24–25). Verified. ESV copy (7:24 "his sons and daughters"; "they brought them up to the Valley of Achor"). The essay does not say the children were executed; interpreters differ on 7:25.
- Deuteronomy 13 orders the same destruction against an Israelite town that turns to other gods. Verified. ESV copy, 13:12–15.
- Jeremiah 7:31 "to burn their sons and their daughters in the fire, which I did not command, nor did it come into my mind," spoken against the people of Judah building the high places of Topheth. Verified. ESV copy (7:30–31).
- Leviticus 18:28: the land would vomit Israel out as well. Verified as paraphrase. ESV copy.
- In 586 BC Babylon destroyed Jerusalem and carried its people into exile. Not checked (textbook; some date it 587).

## How ancient war reports talk

- Joshua 11:23 "Joshua took the whole land." Verified. ESV copy.
- Joshua 13:1 "there remains yet very much land to possess," spoken to the aged Joshua, two chapters later. Verified. ESV copy.
- Judges 3:5 "the people of Israel lived among the Canaanites, the Hittites, the Amorites, the Perizzites, the Hivites, and the Jebusites." Verified. ESV copy.
- The Jebusites of Jerusalem were not driven out (Joshua 15:63). Verified. ESV copy ("the people of Judah could not drive out").
- Deuteronomy 7:2 "devote them to complete destruction" and 7:2–3 "You shall make no covenant with them ... You shall not intermarry with them." Verified. ESV copy.
- Exodus 23:30 "little by little." Verified. ESV copy (the verse opens "Little by little").
- 1 Samuel 15:8 "devoted to destruction all the people with the edge of the sword." Verified. ESV copy.
- 1 Samuel 30:1, 17: the Amalekites raid and burn Ziklag; four hundred young men flee on camels. Verified. ESV copy. Ziklag as David's town: ESV copy, 1 Samuel 27:6. "Fifteen chapters later": 15 to 30. Verified by reference.
- Merneptah's victory stele, around 1208 BC, the earliest mention of Israel outside the Bible, boasts that Israel's seed is no more. Not checked (textbook). The essay paraphrases; no translation of the stele was reachable.
- Mesha, king of Moab, around 840 BC, claimed on his monument that Israel had perished forever. Not checked (textbook). Paraphrase.
- "Israel outlived both boasts." Inference; not a citation.
- Mesha's inscription uses the root of *herem* and says he killed the people of Nebo because he had devoted the town to his god. Not checked (textbook). The number seven thousand was cut (see Corrections, item 3).
- K. Lawson Younger, an Old Testament scholar, compared Joshua with Egyptian, Hittite and Assyrian campaign reports and found the same habit of sweeping claims of total victory beside evidence that the fighting went on. Not checked (memory), kept. The work in view is his *Ancient Conquest Accounts* (1990); the list of corpora and the exact form of his conclusion should be checked against the book.
- Nicholas Wolterstorff, philosopher, reading Joshua closely, concluded that the book signals its totals were not meant as body counts. Not checked (memory), kept. The work in view is his essay "Reading Joshua" in *Divine Evil?* (Oxford, 2011).
- Paul Copan and Matthew Flannagan built a book on that reading "under nearly the same title as this essay." Not checked (memory), kept. The book in view is *Did God Really Command Genocide? Coming to Terms with the Justice of God* (Baker, 2014).
- Their argument: God required the end of Canaan's religious order and the removal of its peoples, and the language of killing everyone is the idiom of war. Not checked (memory), kept.
- Jericho is still described as a city where men and women, young and old, were killed. Verified. ESV copy, Joshua 6:21.
- "Many archaeologists also doubt that the conquest happened on anything like the scale the book describes." Not checked (memory), kept. General characterization.
- The linked essay why-trust-the-bible says the archaeology of the conquest is argued over and believing scholars disagree. Verified by reading `docs/work/essays/why-trust-the-bible.md` (line 51).

## How Christians have answered

- Marcion, a teacher from Pontus, in the middle of the second century. Verified. WDB, Tertullian, *Against Marcion* 1.1 ("the Heretic Marcion, a Native" of Pontus) and 1.19 ("a heretic of the Antonine period"; "Marcion teaches from his Pontus").
- Marcion held that the God of the Old Testament could not be the Father Jesus revealed. Verified as paraphrase. WDB, *Against Marcion* 1.19 ("the God of the gospel is different from the God of the law").
- The *Antitheses* set the law against the gospel to show two gods. Verified as paraphrase. WDB, *Against Marcion* 1.19 ("These are Marcion's Antitheses ... they may contend for a diversity of gods also").
- He kept only an edited Gospel of Luke and ten of Paul's letters. Verified. WDB, *Against Marcion* 4.2 ("Marcion seems to have singled out Luke for his mutilating process") and Book 5, whose chapters treat exactly ten letters (Galatians, 1 and 2 Corinthians, Romans, 1 and 2 Thessalonians, "Laodiceans" [Ephesians], Colossians, Philippians, Philemon); 5.21 says he "rejected the two epistles to Timothy and the one to Titus."
- "The church rejected him." Not checked (textbook).
- Tertullian spent five books answering him. Verified. WDB (work titled "The Five Books Against Marcion," Books 1 to 5).
- Quotation: "that Christ Jesus is the revealer of none other god but the Creator." Verified. WDB, *Against Marcion* 1.19, word for word.
- The creed confesses one God, the Father almighty, maker of heaven and earth. Paraphrase without quotation marks. Not checked (textbook).
- Faustus, a Manichaean bishop in North Africa, late in the fourth century. Verified. WDB, Augustine, *Reply to Faustus* 1.1 ("Faustus was an African by race, a citizen of Mileum," a Manichaean) and *Confessions* 5.3 ("a certain bishop of the Manichaeans, by name Faustus," who came to Carthage in Augustine's twenty-ninth year).
- Quotation (Faustus): "destroyed thousands of men for a slight offense, or for nothing." Verified. WDB, *Reply to Faustus* 22.4 (sections 1 to 5 of Book 22 are Faustus speaking), word for word.
- Quotation (Faustus): "threatened to come with a sword and spare nobody, righteous or wicked." Verified. WDB, same passage, word for word.
- Quotation (Augustine): God gave the commands "not in cruelty, but in righteous retribution." Verified. WDB, *Reply to Faustus* 22.74 ("God in giving the command, acted not in cruelty, but in righteous retribution"), in a passage on "the wars of Moses."
- Quotation (Augustine): "Is it the death of some who will soon die in any case, that others may live in peaceful subjection?" Verified. WDB, 22.74, word for word, following "What is the evil in war?"
- Thomas Aquinas, thirteenth century. Not checked (textbook).
- Paraphrase: all, guilty and innocent, die by God's power because of original sin. Verified. WDB, *Summa Theologiae* I-II q.94 a.5, reply to objection 2 ("All men alike, both guilty and innocent, die the death of nature: which death of nature is inflicted by the power of God on account of original sin").
- Quotation (Aquinas): "by the command of God, death can be inflicted on any man, guilty or innocent, without any injustice whatever." Verified. WDB, same reply, word for word. The file reads as the English Dominican Province translation; it is not one of the ANF/NPNF or Pearse texts and not the machine-translated Migne material.
- Origen preached through Joshua in the third century. Not checked (textbook).
- Origen paraphrase: unless these physical wars were figures of spiritual ones, he doubted the apostles would have handed these histories to the church to be read by followers of a Christ who came to teach peace; the real enemies were sin and the powers behind it. Not checked (memory), kept, as marked paraphrase. The only text reached was WDB, *Homilies on Joshua* 15.1, which agrees in substance ("Unless these carnal wars bore the figure of spiritual wars, never, I think, would the books of the Jewish histories have been handed down by the Apostles to be read in the churches by the disciples of Christ, who came to teach peace"; "spiritual wickednesses in the heavenly places"; "the soul dies when it has received a wound of sin"). But that file is the repository's own English from Baehrens's Latin, not an ANF/NPNF or Pearse translation and possibly machine-made, so it does not count as verification. Check against Barbara Bruce's translation (Fathers of the Church 105) or the Latin.
- Ephesians 6:12 "For we do not wrestle against flesh and blood." Verified. ESV copy.

## The three readings today

- The traditional reading (judgment after long patience; the giver of life may take it; defenders' replies). Not checked (memory), kept. A survey characterization; it rests on the Augustine and Aquinas passages verified above.
- The hyperbole reading (survivors, marriage law, Rahab, Merneptah and Mesha). Not checked (memory), kept. Survey characterization.
- Greg Boyd, pastor and theologian, argued the third reading most fully in *The Crucifixion of the Warrior God*: the cross as the final revelation of God; the violent portraits as God stooping to his people's violent conceptions, bearing their misunderstanding as Christ bore sin; every page kept as inspired Scripture read through Christ. Not checked (memory), kept. The book in view is the two-volume Fortress Press edition (2017).
- Its critics say it leaves the reader to decide which parts of Scripture truly show God, close to Marcion. Not checked (memory), kept. Survey characterization.
- Hebrews 1:3 "is the radiance of the glory of God and the exact imprint of his nature." Verified. ESV copy.
- The essay leaves the choice among the three readings open (a second-order question). Needs James's position or his word to publish it open.

## What these chapters have been used for

- Deuteronomy 20 names particular peoples and requires an offer of peace to cities outside the land. Verified. ESV copy, 20:10, 15–17.
- "Nothing in the New Testament renews it." Reading of the New Testament; not a citation.
- Luke 9:55 "he turned and rebuked them," after James and John asked to call down fire on a Samaritan village that had not received him. Verified. ESV copy, Luke 9:52–55.
- Matthew 26:52 "Put your sword back into its place. For all who take the sword will perish by the sword." Verified. ESV copy. One of those with Jesus drew a sword (26:51) at Gethsemane (26:36). Verified. ESV copy.
- "Underhill was not the last American Christian to read Canaan onto the people whose land he wanted." Not checked (memory), kept. General historical characterization; the linked doctrine-of-discovery essay carries the detail.
- Children's Bibles tell Joshua 6 as the walls falling and usually leave out the next verse. Corrected (softened; see Corrections, item 5). Not checked (memory), kept. The verse order is verified: ESV copy, the wall falls at 6:20 and the killing is 6:21.
- "Plenty of lifelong churchgoers have never heard a sermon on 1 Samuel 15:3." Not checked (memory), kept. General observation.

## Jesus and the Canaanite woman

- The name Jesus is the Greek form of Joshua. Not checked (textbook).
- The Greek Old Testament spells Joshua's name as the Gospels spell Jesus. Verified. Swete LXX, Joshua 1:1 onward: Ἰησοῦς (over a hundred times in the nominative in Joshua); Site Greek/Hebrew data, Matthew 1:16: Ἰησοῦς. (The Septuagint's dative is Ἰησοῖ where the New Testament has Ἰησοῦ; the name itself is the same.)
- Hebrews 4:8 "For if Joshua had given them rest, God would not have spoken of another day later on." Verified. ESV copy. The Greek name there is Ἰησοῦς: Site Greek/Hebrew data (also Acts 7:45).
- The King James Version prints "Jesus" at Hebrews 4:8. Verified. KJV copy ("For if Jesus had given them rest, then would he not afterward have spoken of another day.").
- Jesus withdraws to the district of Tyre and Sidon (Matthew 15:21). Verified. ESV copy.
- Coastland the tribes of Israel never took. Corrected citation (see Corrections, item 4). ESV copy: Judges 1:31 names Sidon; Joshua 19:29 has Asher's border reach "the fortified city of Tyre." That Tyre itself was never Israelite: Not checked (textbook).
- Matthew 15:22 "Have mercy on me, O Lord, Son of David; my daughter is severely oppressed by a demon." Verified. ESV copy.
- Mark calls her a Gentile, a Syrophoenician by birth. Verified. ESV copy, Mark 7:26 (the essay uses Mark's words without quotation marks, attributed to Mark).
- Matthew calls her "a Canaanite woman." Verified. ESV copy, Matthew 15:22.
- She is the only person in the New Testament given that name. Verified. Site Greek/Hebrew data: Χαναναία (G5478) occurs only at Matthew 15:22; Καναναῖος (G2581) at Matthew 10:4 and Mark 3:18 is a different word, glossed "Zealot."
- The disciples want her sent away (Matthew 15:23). Verified as paraphrase. ESV copy.
- Matthew 15:24 "was sent only to the lost sheep of the house of Israel." Verified. ESV copy.
- Matthew 15:27 "Yes, Lord" and "yet even the dogs eat the crumbs that fall from their masters' table." Verified. ESV copy.
- Matthew 15:28 "O woman, great is your faith! Be it done for you as you desire." Verified. ESV copy. The exclamation point is inside verbatim Scripture.
- "Her daughter is healed that same hour." Paraphrase without quotation marks of Matthew 15:28; the ESV copy reads "healed instantly" (the Greek is "from that hour"). Acceptable as paraphrase.
- Matthew 1:5 "Salmon the father of Boaz by Rahab." Verified. ESV copy. That this Rahab is Rahab of Jericho is the traditional reading. Not checked (textbook).
- Romans 3:25 paraphrase: God put Christ forward. Verified. ESV copy ("whom God put forward as a propitiation").
- Romans 3:26 "to show his righteousness at the present time, so that he might be just and the justifier of the one who has faith in Jesus." Verified. ESV copy.
- Ezekiel 18:23 "Have I any pleasure in the death of the wicked, declares the Lord GOD, and not rather that he should turn from his way and live?" Verified. ESV copy.
- God rebuked Jonah for wanting Nineveh destroyed. Verified as paraphrase. ESV copy, Jonah 4:1–5, 9–11 ("Do you do well to be angry?"; Jonah waits "till he should see what would become of the city").
- Jonah 4:11 "more than 120,000 persons who do not know their right hand from their left." Verified. ESV copy.
- "The God who waited generations for the Amorites": Genesis 15:16. Verified. ESV copy.

## Closing Texts

- Genesis 18:25 "Shall not the Judge of all the earth do what is just?" Verified. ESV copy.
- Matthew 15:28 "O woman, great is your faith! Be it done for you as you desire." Verified. ESV copy.
- Romans 3:26 "It was to show his righteousness at the present time, so that he might be just and the justifier of the one who has faith in Jesus." Verified. ESV copy.

## Links

- /writing/why-trust-the-bible, /writing/doctrine-of-discovery and /writing/why-didnt-the-bible-ban-slavery: all three slugs are in `docs/work/essays/link-targets.json`. Verified by reading that file on 2026-10-27.
- [Find Help](/help), added in the voice pass where the essay names people who have left the faith over these chapters. /help is allowed by BRIEF.md. "has real people you can call" matches the page's own description ("real people to call", `client/src/pages/Help.tsx`, SEOMeta), and the page lists doubt among what it covers. Verified by reading that file on 2026-10-27.
- `node scripts/validate-essays.mjs`, run on 2026-10-27 against a scratch JSON copy of the essay (no repo file written): language, dashes, "!", references and Closing Texts all pass. Its only three problems are that the three /writing links above point to shelf essays with no rewrite yet in `client/public/essays/`. Those rewrites must land in the same batch as this essay or before it, or the CI gate will fail.

## Voice pass (2026-10-27)

The final reader changed wording only. No fact, quotation, number, date, name or existing link changed, and all 52 quoted passages are byte-identical to the verified text (checked by script against HEAD). The changes: removed announced turns ("What the skeptic may not expect...", "The text also shows something easier to miss", "That matters here", "something with them most readers miss", "There is a quieter way to get these chapters wrong"); removed the "Whatever we say about..." frame, used twice and close to a sentence in the slavery pilot; replaced "the tone of a man pleased to have found the answer", which echoed the slavery pilot; cut the rulebook phrase "The sharpest form of the objection" and the two-beat closer "Christians tell them to"; softened "the easiest way out of Joshua anyone has ever proposed" to "the simplest way out of Joshua"; replaced the third "children of Jericho" concession with "Matthew's story doesn't erase Joshua 6:21" (Joshua 6:21 is verified above); clarified "offered him violence on his behalf"; renamed the last section heading to plain words; turned the closing mirror into a real question and cut the redundant line "He met her that way."

## Mechanics

- No em-dash (U+2014) in the essay. Verified by grep on 2026-10-27.
- Every exclamation point sits inside verbatim quoted Scripture (Genesis 18:25, Matthew 15:28, twice). Verified by grep on 2026-10-27.
