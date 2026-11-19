# Worlds ledger: "The Old Testament's world"

Data file: `client/public/context/worlds/old-testament-world.json`.
Page: `/resources/context/world/old-testament-world`.

How to read this ledger. **Verified (search, 2026-11-18/19)** means a web
search run for this portrait returned the claim from a translation of the
primary text, the excavators' or authors' own publication, or a reliable
secondary source (named). **Verified (site guide)** means the claim already
stands in one of the five Ancient Near East guides on the site
(`client/public/context/guides/*.json`) and the portrait says no more than the
guide does. **Verified (BSB text)** means the wording was read in the Study
Bible's own text in `client/public/bible/text`. **Verified (validator)** means
a CI gate checks it on every build. **Softened** means the search did not
support the first wording and the prose was cut back to what it did support.
Every check was made before the sentence was written, or the sentence was
changed after; nothing marked verified here was checked only from memory.

51 web searches were used (of 60 allowed).

## Scripture

| Claim | Source | How checked |
|---|---|---|
| All 21 passages under "How it changes what you read" are word for word the Berean Standard Bible and link to their chapter and first verse | `client/public/bible/text` | Verified (validator): `scripts/validate-worlds.mjs`, now reading any book of the Bible (it read only the Gospels and Acts before) |
| Every other reference in the prose (Numbers 20:17; Deuteronomy 6:8-9, 7:13, 11:10-11, 11:14, 12:5, 12:31, 24:17-18, 25:13-15, 31:10-11; Exodus 20:2-4, 21:23-27, 23:14-16; Leviticus 19:9-10; Numbers 6, 22:5, 27:7, 35:31; Joshua 7:14; Judges 2:14, 6:11; Ruth 3:2, 4:1; 1 Samuel 13:21, 28:24; 1 Kings 6:2, 12:19-20, 16:24, 18:1, 22:39; 2 Kings 3:27, 17:6, 17:24, 18:4, 18:13-14, 20:20, 23:6, 23:10, 24:17, 25:30; Isaiah 22:10, 36:2, 44:15; Jeremiah 7:18, 7:31, 26:18-19, 29:5, 32:9, 34:7, 36:10; Ezekiel 1:1; Hosea 2:8; Amos 5:15, 6:4, 7:13, 8:5; Psalms 68:4, 137:1, 137:4; Genesis 23:16, 25:8; Ezra 1:2-3) | Bible text | Verified (BSB text): each was printed from `client/public/bible/text` and the prose quotes or paraphrases what it says. Quoted words are the BSB's |

## Intro and Part 1: A land between empires

| Claim | Source | How checked |
|---|---|---|
| Merneptah Stele: found by Petrie at Thebes in 1896; Merneptah's fifth year, about 1208 BC; "Israel is laid waste; his seed is not"; the sign marks a people; "seed" as grain or offspring debated; oldest mention of Israel outside the Bible, the only one from Egypt | Merneptah Stele | Verified (search): Wikipedia "Merneptah Stele" and COJS ("c. 1207 BCE"; the date is given as 1208 or 1207) |
| More than 250 Iron I hill-country sites; largest three or four acres with a few hundred people; total not much more than 45,000 around 1000 BC | Finkelstein and Silberman, The Bible Unearthed (2001) | Verified (search): University of Michigan course excerpt of Finkelstein and Silberman pp. 105-120; Cambridge chapter (more than 250 Iron I sites). The 50 to 100 per village figure was not found and is not used |
| Almost no pig bones in highland villages, common at Philistine sites; Finkelstein on pork as a marker of identity; Hesse and Wapnish's caution | zooarchaeology | Verified (search): Weizmann Institute report; Sapir-Hen, Bar-Oz, Gadot and Finkelstein; Yahalom; summary of Hesse and Wapnish |
| Mesha Stele: found at Dhiban 1868, F. A. Klein; 34 lines; "Omri king of Israel" oppressed Moab many days because Chemosh was angry with his land | Mesha Stele | Verified (search): New World Encyclopedia, Yarmouk University museum page, BAS translations |
| Tel Dan Stele: fragments 1993 and 1994, Biran's team; Old Aramaic; king of Aram, most likely Hazael; "house of David"; a minority dispute the reading; ninth century | Tel Dan Stele | Verified (search): Wikipedia, COJS ("c. 840 BCE") |
| Gezer calendar: found 1908; usually dated tenth century but uncertain; months listed by farm work; almanac or writing exercise | Gezer calendar | Verified (search): Wikipedia, COJS, BAS; ANET (Albright) and Gray renderings for gathering, sowing, late sowing, hoeing flax, barley harvest, summer fruit. "More harvest" and "tending vines" follow the common reading; the portrait does not quote the tablet |
| Samaria fell 722 or 720; Sargon II's Khorsabad inscription claims 27,290 people taken | Sargon II | Verified (search): Posen Library, Khorsabad Summary Inscription; Wikipedia "Annals of Sargon II" (two-conquest model). One source gives 27,280 |
| Babylon took Jerusalem 597; Cyrus took Babylon 539 | Babylonian Chronicle; Cyrus Cylinder | Verified (search): see Part 7 rows |
| Dead Sea the lowest place on earth; the land's bands west to east | geography | Standard geography; no number given |

## Part 2: A village in the hill country

| Claim | Source | How checked |
|---|---|---|
| Stager linked land reclamation (terracing) to lineages as the way to gather labor | Lawrence E. Stager, "The Archaeology of the Family in Ancient Israel", BASOR 260 (1985) 1-35 | Verified (search): abstract in the Tübingen index (KEI00060287): "links land reclamation to lineage development as the best means to mobilize labor" |
| Four-room house: animals, storage and food work below; eating and sleeping above; Holladay on storage and stabling; Bunimovitz and Faust on the house as an expression of Israelite ideas, every room opening onto the central space; Zevit on examples outside Israel; until 586 BC | Bunimovitz and Faust, BAR 28:4 (2002) and in Symbiosis, Symbolism, and the Power of the Past (2003) | Verified (search): COJS reprint of "Ideology in Stone"; Bar-Ilan CRIS record of "Building Identity"; Wikipedia "Four-room house" for Zevit |
| Grinding grain two hours or more a day | Carol Meyers | Verified in substance (search): Oxford University Press blog ("it's been estimated ... two or more hours"), Hebraic Thought essay on Meyers ("at least 2-3 hours ... family of six", several sets of grinding tools in one house). Meyers's own page not seen, so the prose says "estimates drawn from Carol Meyers's work" |
| Meyers: biblical texts written mostly by urban elite men leave women's work out | Meyers, Rediscovering Eve (2013) | Verified (search): Jewish Book Council and Bible Odyssey summaries |
| Pim: meaning unknown until inscribed weights were found, the first at Gezer; average about 7.8 g, about two thirds of a shekel | archaeology | Verified (search): Wikipedia "Pim weight"; BAS; JW Insight (1907 at Gezer) |
| Silver weighed, no coins for most of the period | Genesis 23:16; Jeremiah 32:9 | Verified (BSB text) for the weighing; "no coins for most of this history" is standard and stated without a date |
| Bloch-Smith: over 850 burials examined; bench tombs with repositories; the family tomb as a claim to the patrimony | Elizabeth Bloch-Smith, Judahite Burial Practices and Beliefs about the Dead (1992) | Verified (search): vLex review and catalog records. The tie between "gathered to his people" and the tomb is offered as what "many readers hear", not as her finding |

## Part 3: Kings, cities and the Temple

| Claim | Source | How checked |
|---|---|---|
| Samaria ivories: Joint Expedition 1931-1935 under J. W. Crowfoot; Phoenician and Egyptian style; the Crowfoots thought a link with Ahab's ivory house likely; rubble moved later, date argued | Crowfoot and Crowfoot, Early Ivories from Samaria (1938) | Verified (search): BAS; Armstrong Institute; University of the Free State paper. **Softened:** "hundreds of fragments" and a list of motifs were cut |
| 'Ain Dara: closest parallel argued by John Monson, BAR 26:3 (2000); others prefer Tell Tayinat; footprints; damaged January 2018 by an airstrike | archaeology | Verified (search): ASOR special report; Live Science; BAR 26:3 contents; BAS endnote. **Softened:** "carved lions and sphinxes" cut |
| Arad shrine: two limestone altars at the entrance to the inner room; frankincense with animal fat on the larger, cannabis with dung on the smaller; in use about 760/750 to 715 BC | Arie, Rosen and Namdar, Tel Aviv 47 (2020) | Verified (search): Haifa CRIS abstract; Sci.News; Popular Archaeology. **Softened:** the standing stone was cut (not in the sources seen). The link to Hezekiah's reform is stated as argued |
| Hezekiah bulla: 2015, Eilat Mazar, Ophel, refuse dump, with 33 other bullae; "Belonging to Hezekiah [son of] Ahaz king of Judah"; winged sun | archaeology | Verified (search): Hebrew University release via ScienceDaily and phys.org; Israel21c |
| Broad Wall: Avigad's dig from 1969; about 65 m long, about 7 m wide; built partly over recent houses; Isaiah 22:10 | archaeology | Verified (search): Jewish Virtual Library; COJS (Rosovsky, BAR 18:3). "Seven meters" is given as width, as the better sources have it |
| Siloam inscription: 1880, a boy in the tunnel; six lines; pick against pick; 1,200 cubits; 100 cubits of rock above; now in Istanbul; tunnel about 533 m (1,748 ft) | Siloam inscription | Verified (search): Encyclopedia.com, Jewish Virtual Library, Bible Odyssey. "Names no king" follows the six-line text as translated |
| Sennacherib's annals: 46 strong walled towns; Hezekiah shut up "like a bird in a cage"; no claim to have taken Jerusalem | Taylor and Oriental Institute prisms | Verified (search): Bethel University page, BAS sidebars, Tyndale Bulletin lecture (1984). The prism's silver figure was not confirmed and is not used |
| Lachish reliefs: Sennacherib's South-West Palace, Nineveh; found by Layard in the 1840s; British Museum | Lachish reliefs | Verified (search): COJS, World History Encyclopedia |
| Lachish siege ramp: found in the 1930s (Starkey), excavated by Ussishkin in 1983 with a Judean counter-ramp; 859 arrowheads in one area (Ussishkin elsewhere "more than 800"); iron armor scales, perforated stones; Level III = 701 BC; "often called the only Assyrian siege ramp excavated" | David Ussishkin | Verified (search): COJS "Defensive Judean Counter-Ramp Found at Lachish" (BAR); BAS; Wikipedia. "Only" is marked as "often called", since it rests on encyclopedic statements |

## Part 4: The gods next door

| Claim | Source | How checked |
|---|---|---|
| Mesha took Nebo, killed 7,000, devoted to Ashtar-Chemosh; took the vessels (or altar hearths) of Yahweh before Chemosh; oldest mention of Yahweh as Israel's God outside the Bible | Mesha Stele | Verified (search): BAS "text of the Moabite Stone", ANET 320-321 (Michigan PDF), Yarmouk University. The children are "on the usual reading of the damaged lines", since those words are restored |
| Ugarit: 1928 farmer's plough opened a tomb; digs from 1929 under Claude Schaeffer; Baal cycle; Baal defeats Yamm; Baal's title "Rider on the Clouds" | Ugarit | Verified (search): World History Encyclopedia, New World Encyclopedia, Wikipedia. Baal's fall to Mot and return with the rain: Verified (site guide, the-gods-of-the-nations). The reading of Psalm 68:4 as deliberate is given as what "many scholars" think, and the BSB text says "rides on the clouds" |
| Washing and opening of the mouth; images woken, washed, dressed, fed, carried | Mesopotamian ritual | Verified (site guide, the-gods-of-the-nations) |
| Kuntillet Ajrud: Meshel 1975-76; about 800 BC; "Yahweh of Samaria and his asherah", "Yahweh of Teman and his asherah"; meaning argued; Khirbet el-Qom similar, about 725 BC | inscriptions | Verified (search): BAS library; Wikipedia; scholarly abstract (830-750 at Ajrud, about 725 at el-Qom) |
| Judean pillar figurines: almost a thousand by a 2003 count; most in Jerusalem and Judah; eighth and seventh centuries; household finds; Kletter links them to Asherah, others disagree | Kletter (1996) | Verified (search): Tyndale Bulletin 2003 ("almost one thousand"); BAS; Kletter's book confirmed in catalogs (BAR International Series 636) |
| Carthage tophet debate: Schwartz and colleagues 2010 (not mainly sacrifice); Smith, Avishai, Greene and Stager (2011, 2013) and Xella, Quinn, Melchiorri and van Dommelen (Antiquity 2013) for sacrifice | Antiquity | Verified (search): Cambridge (Antiquity), Live Science, academia.edu. Urns with infant and animal bones: standard description of the tophet |

## Part 5: Covenant, law and treaty

| Claim | Source | How checked |
|---|---|---|
| Mendenhall 1954; Hittite (Late Bronze) suzerainty treaties; the treaty sequence; McCarthy found deposit and reading in only a few | Mendenhall, BA 1954, and Law and Covenant (1955) | Verified (search): Tyndale Bulletin "Significance of the Ancient Near Eastern Treaty Pattern"; Themelios; Irish Biblical Studies. Also in the site guide covenant-and-treaty |
| Esarhaddon's succession treaty 672 BC; Tell Tayinat copy 2009 in a temple's inner sanctum; Steymans on Manasseh and on Deuteronomy 28:20-44 following §56; the borrowing contested | Steymans, Verbum et Ecclesia 34:2 (2013) | Verified (search): the article's abstract and text (verbumetecclesia.org.za); University of Chicago record of the Tayinat find. The bronze-sky parallel of Deuteronomy 28:23 was not confirmed and is not claimed |
| Hammurabi: about 1754 BC; Susa 1901; black pillar over seven feet; casuistic form; goring ox | Laws of Hammurabi | Verified (site guide, torah-and-the-law-codes) |
| Laws 196, 198, 199: eye for a free man's eye; a mina of silver for a commoner's; half the price for a slave's, paid to the owner | Laws of Hammurabi | Verified (search): Hanover, Macmillan sources, Historycollection. Translations differ on the class word for law 198 and one gives gold; "a mina of silver" follows the majority |
| Bottero: court records do not cite the stele as binding | Jean Bottero | Verified (site guide, torah-and-the-law-codes) |
| Ketef Hinnom: 1979, Barkay, burial cave above the Hinnom Valley, found by a young volunteer; two silver scrolls with the priestly blessing; late seventh or early sixth century; oldest known biblical text, centuries before the Dead Sea Scrolls | archaeology | Verified (search): Bible Archaeology, COJS, Israel Foreign Ministry, historyofinformation.com; Barkay, Vaughn, Lundberg and Zuckerman, BASOR 334 (2004) |

## Part 6: Scribes, seals and prophets

| Claim | Source | How checked |
|---|---|---|
| Gemaryahu son of Shaphan bulla: Shiloh, 1982, City of David, 51 bullae in a burned room; identified with the scribe of Jeremiah 36; authenticity firmer because excavated | archaeology | Verified (search): City of David timeline; COJS; Armstrong Institute |
| Arad ostraca about 600 BC, mostly to Eliashib, ordering wine and flour, some for the Kittim (probably Greek or Cypriot mercenaries) | Arad ostraca | Verified (search): Wikipedia, COJS, Posen Library (Aharoni's reading of Kittim) |
| Faigenbaum-Golovin et al., PNAS 2016: at least six writers; 2020 PLOS ONE: at least twelve in the same 18 texts; far from universal literacy | PNAS 2016 | Verified (search): Tel Aviv University news; Popular Archaeology; ScienceDaily (2020) |
| Lachish letters: Starkey 1935; last months before the fall, about 588-586 BC; Letter 4, "we cannot see Azekah"; meaning argued | Lachish ostraca | Verified (search): Wikipedia, Encyclopedia.com, BAS. **Softened:** "in a room by the city gate" became "in the burned ruins of Lachish" |
| Mari letters: eighteenth century BC; apilum and muhhum; Dagan and Adad; promises of victory over Hammurabi, who conquered Mari; reported in letters, not gathered into books | Mari archives | Verified (search): Encyclopedia of the Bible (Bible Gateway); Sasson 1995; Nissinen (SBL); Denver Journal |
| Deir Alla: 1967; plaster; red and black ink; "Balaam son of Beor", "seer of the gods"; gods at night; he weeps; dates from the ninth to the eighth century | Deir Alla inscription | Verified (search): Wikipedia; COJS (750-700); dates range 880 to 700 across sources, so the prose gives a range |

## Part 7: Exile and return

| Claim | Source | How checked |
|---|---|---|
| Babylonian Chronicle (BM 21946): camped against the city, second of Adar seized the city and the king, appointed a king of his choice; 16 March 597 BC | Chronicle 5 | Verified (search): COJS; JTA archive (Wiseman 1956). **Softened:** "in the seventh year" and "the city of Judah" were cut to what the search showed |
| Jehoiachin ration tablets: Koldewey 1899-1917; Weidner 1939; oil for "Yaukin, king of Judah" and five sons; about 592 BC; craftsmen from Phoenician cities | ration tablets | Verified (search): Wikipedia "Jehoiachin's Rations Tablets"; BAS |
| Al-Yahudu: Pearce and Wunsch 2014, 103 texts; 572 to 477 BC; Yahwistic names; leases, loans, receipts, sales of cattle, tax; state land for barley and dates, tax and army service; some in debt, some well off | CUSAS 28 | Verified (search): Tyndale House article; Ancient Jew Review; Wikipedia |
| Cyrus Cylinder: Rassam, March 1879, Babylon, British Museum; Marduk chose Cyrus; gods returned to their sanctuaries; peoples returned home; no mention of Jews or Jerusalem | Cyrus Cylinder | Verified (search): New World Encyclopedia; FEZANA lesson with Finkel's translation; World History Encyclopedia |
| Elephantine: temple of Yahu destroyed about 410 BC by priests of Khnum with Vidranga; petition to Bagohi dated 25 November 407 BC; the 419 BC letter on Unleavened Bread, 15 to 21 Nisan, in the king's name (the word Passover not preserved) | Elephantine papyri | Verified (search): Israel in Their Land; BAS; COJS and TheTorah.com on the 419 letter. The portrait does not name the letter "the Passover letter" |
| Province called Yehud | Persian period | Standard name of the Persian province; not separately searched |

## Modern books in the reading list

Each was seen in a catalog, a publisher's page or a citing source during the
searches above: Mendenhall (1955), Stager (1985), Bloch-Smith (1992), Kletter
(1996), Monson (2000), Finkelstein and Silberman (2001), Bunimovitz and Faust
(2003), Ussishkin (2004), Meyers (2013), Steymans (2013), Pearce and Wunsch
(2014), Faigenbaum-Golovin and others (2016), Arie, Rosen and Namdar (2020).
King and Stager, Life in Biblical Israel (2001), Walton, Ancient Near Eastern
Thought and the Old Testament (2006, already a source of the site's guides)
and Meshel's final report (2012) are standard works listed for further
reading; no single sentence of the portrait rests on them alone.

## Still not verified

- "The Dead Sea, the lowest place on earth", "Yehud" and "no coins for most of
  this history": standard facts, not searched.
- Gezer calendar months "more harvest" and "tending vines" follow common
  translations not seen in full.
- Whether the Lachish ramp is truly the only Assyrian siege ramp ever
  excavated: stated as "often called".
- Meyers's own page for the grinding estimate.
