# Claims ledger: can-you-be-good-without-god

Essay: `docs/work/essays/can-you-be-good-without-god.md` ("Can You Be Good Without God?"). Rewrite of the machine essay of the same slug; folds in apologetics-where-does-morality-come-from and morality-without-god-and-with-him. The writer's ledger (2026-10-26) was replaced by this verifier's ledger on the night of 2026-10-26 to 2026-10-27. Every line below records what this verification run actually did.

## Read this first: no web search was available for this check

The workflow's shared web-search budget was already used up when this check began. The first two WebSearch calls (James 1:17 in the ESV; the Myers passage on George Eliot) both came back "this turn's web search budget is used up," and no search result was seen in this run. WebFetch of the Pew Research Center page failed (getaddrinfo ENOTFOUND www.pewresearch.org). No other site was opened. The only outside sources reachable were public-domain texts cloned from GitHub.

The writer's ledger had recorded search-summary matches on 2026-10-26 for the Myers, Locke and Nietzsche quotations and for the Pew and Gervais figures. Those were the writer's own checks; this run could not repeat any of them. So, as the brief requires, the three non-Scripture quotations that nothing in this run could confirm became marked paraphrase, and the survey and study figures were generalized. The exact wording is kept below under "Original wording, for restoring," so a run with search can put it back word for word if it matches.

The methods actually used, and what the words below mean:

- **"ESV copy"**: compared with the ESV text in the public GitHub repository lguenth/mdbible ("ESV Bible in Markdown," parsed by its author from javascripture's ESV JSON), already cloned in this session's scratchpad (`esv-mdbible`, commit fd66568, dated 2022-01-20), read with `git show`. A script (`scratchpad/cygw/check.py`) compared each quotation with the verse text after normalizing case, punctuation and spacing, and every quotation matched word for word; punctuation was then compared by eye. The copy drops quotation marks inside verses and does not say which ESV edition it is. It is not esv.org or the ESV API; recheck with James's API key once it exists.
- **"WDB"**: read in a clone of github.com/HistoricalChristianFaith/Writings-Database (scratchpad `wdb/repo`), with `git show 'HEAD:<path>'` and the HTML tags stripped. Martyrdom of Polycarp and Justin's First Apology are the ANF translations. The Summa Theologiae file is the English Dominican Province translation (not ANF/NPNF; identified by its wording, not by a label in the file).
- **"Jowett (GITenberg)"**: Plato, *Euthyphro*, Benjamin Jowett's translation with his introduction, Project Gutenberg ebook 1642, cloned from github.com/GITenberg/Euthyphro_1642 on 2026-10-26 and read as `1642.txt`.
- **"Per the sibling ledger"**: the same fact was search-checked on 2026-10-26 by another run and recorded in `docs/work/essays/ledgers/why-does-god-allow-suffering.md`. Not searched again here.
- **"Not checked (reference knowledge)"**: no source was opened or searched in this run. The verifier judged it standard reference knowledge and kept it. That judgment is not a check.
- **"Generalized"**: a figure that could not be checked was replaced by a rounder statement meant to stay true across any plausible error. The generalized statement is itself unchecked.
- **"NOTES.md"**: checked against the confirmed biography in `docs/work/NOTES.md`.

## Corrections made in the essay

1. Opening paragraph, Myers's report of Eliot: the quotation "how inconceivable was the first, how unbelievable the second, and yet how peremptory and absolute the third" became marked paraphrase: "and told him, as he remembered it, that the first was inconceivable and the second unbelievable, and yet the third was peremptory and absolute." Reason: could not be matched to any source in this run (the writer's search summaries also disagreed on "unbelievable the second" versus "unbelievable was the second").
2. Second paragraph: "Myers wrote that he had perhaps never heard sterner words spoken for what he called 'the sovereignty of impersonal and unrecompensing Law'" became "Myers wrote that he had perhaps never heard anyone speak more sternly for the rule of a law that was impersonal and promised no reward." Reason: the quoted fragment could not be checked. The ending's "the law she served was not impersonal after all" still rests on this paraphrase.
3. The First Answer Is Yes, Pew: "49 percent ... By 2017 it was 56 percent, and among white evangelical Protestants it had risen from 26 to 32 percent" became "about half ... By 2017 a majority said so, and the share had grown even among white evangelical Protestants, though most of them still said belief in God was necessary." Reason: unchecked figures. Generalized.
4. Same paragraph, Gervais: "more than three thousand people in thirteen countries" became "thousands of people in countries around the world"; "killed five homeless people" became "killed several homeless people"; "about twice as likely to connect him with atheism as with religious belief" became "much more likely to connect him with atheism than with religious belief." Reason: unchecked figures. Generalized.
5. When Christians Were Called Atheists, Polycarp: "the proconsul offered to set him free if he would swear by the fortune of Caesar and say those words himself" became "the proconsul urged him to swear by the fortune of Caesar and say those words himself." Reason: in the ANF text (ch. 9) the request to swear by Caesar's fortune and say "Away with the Atheists" comes first; the offer of liberty ("Swear, and I will set thee at liberty, reproach Christ") comes only after Polycarp has said the words, and is tied to reviling Christ. The old sentence merged the two. This is the one change made because a check found the text inexact.
6. Same section, Locke: the three-sentence quotation became marked paraphrase: "The last people Locke refused to tolerate were those who denied that God exists. His reason, in substance, was that promises, covenants and oaths are what bind a society together, that none of them can hold an atheist, and that taking God away, even only in thought, dissolves everything." Reason: the Popple text could not be opened in this run.
7. What Nietzsche Said About George Eliot: both quotations (Kaufmann's translation) became one marked paraphrase: "His charge, in substance, was that she and the English moralists like her had got rid of the Christian God and now believed they had to cling all the harder to Christian morality, and that anyone who gives up the Christian faith has pulled the right to that morality out from under his own feet." Reason: could not be checked in this run.
8. The Strongest Case Without God: "both were raised by philosophers who rejected the Christian answer" became "who did not accept the Christian answer," and "a solution she has set aside" became "a solution she does not adopt." Reason: Sharon Street's own view of theism was not checked by anyone; her published conclusion (antirealism about value) is enough to say she does not adopt the theistic answer, not that she considered and rejected it.

No other claim was changed. Apart from correction 5, every change was made because a quotation, figure or detail could not be checked, not because a check showed it was wrong.

## Original wording, for restoring

When search or the sources are available, check these and, if they match, restore them exactly:

- F. W. H. Myers, "George Eliot," *Century Magazine*, November 1881 (reprinted in his *Essays: Modern*), as the writer had it: Eliot, taking as her text "God, Immortality, Duty," pronounced "how inconceivable was the first, how unbelievable the second, and yet how peremptory and absolute the third." Writer's note: one search summary read "how unbelievable was the second." Check which.
- Myers, same passage: "the sovereignty of impersonal and unrecompensing Law" (the writer's summaries had "Never, perhaps, have sterner accents affirmed [or confirmed] the sovereignty of impersonal and unrecompensing Law"; the essay quoted only the phrase).
- Pew Research Center (Gregory A. Smith, "A growing share of Americans say it's not necessary to believe in God to be moral," October 16, 2017): 49 percent in 2011; 56 percent in 2017; white evangelical Protestants 26 percent (2011) and 32 percent (2017).
- Will Gervais et al., "Global evidence of extreme intuitive moral prejudice against atheists," *Nature Human Behaviour* (2017): more than three thousand participants in thirteen countries; the vignette's man killed five homeless people; participants about twice as likely to connect him with atheism as with religious belief.
- John Locke, *A Letter Concerning Toleration* (William Popple's English translation, 1689): "Lastly, those are not at all to be tolerated who deny the being of a God. Promises, covenants, and oaths, which are the bonds of human society, can have no hold upon an atheist. The taking away of God, though but even in thought, dissolves all." (Writer: several sites agreed apart from typography.)
- Friedrich Nietzsche, *Twilight of the Idols*, "Skirmishes of an Untimely Man," section 5, Walter Kaufmann's translation (*The Portable Nietzsche*): "They are rid of the Christian God and now believe all the more firmly that they must cling to Christian morality" and "When one gives up the Christian faith, one pulls the right to Christian morality out from under one's feet." If restored, consider naming the translation, since Kaufmann's wording is under copyright and differs from the public-domain Ludovici translation.

## Biography

- "I was an atheist before I was a Christian." Checked against NOTES.md (came to faith as an adult from atheism). No other biography in the essay.

## George Eliot and Frederic Myers

- Walk in the Fellows' Garden of Trinity College, Cambridge, with Frederic Myers, on a rainy evening in May 1873. Not checked (reference knowledge; the standard dating and setting of Myers's account). The writer's ledger recorded search support for "an evening of rainy May" and the year 1873.
- Myers "a young scholar" (born 1843, so about thirty). Not checked (reference knowledge).
- Eliot by then one of the most admired novelists in England. Characterization. Not checked.
- *Middlemarch* had finished its serial run a few months earlier (eight parts, December 1871 to December 1872). Not checked (reference knowledge).
- Eliot an earnest evangelical as a girl who gave up the faith in her early twenties (the break with her father's church in 1842; born 1819). Not checked (reference knowledge).
- Eliot later translated David Friedrich Strauss's *Life of Jesus* (published 1846), a German study that treated much of the Gospels as myth. Not checked (reference knowledge).
- Myers wrote about the walk years afterward (1881). Not checked (reference knowledge).
- Eliot took God, Immortality and Duty as her text and judged the first inconceivable, the second unbelievable, the third peremptory and absolute. Marked paraphrase now (correction 1). Not checked.
- Myers had perhaps never heard a sterner statement of an impersonal law that promised no reward. Marked paraphrase now (correction 2). Not checked.
- Eliot's novels as morally serious, about small choices and selfishness as blindness; "She did not think duty needed heaven to back it up." The essay's characterization. Not checked.

## The First Answer Is Yes

- Pew Research Center: in 2011 about half of American adults said belief in God is not necessary to be moral and have good values; by 2017 a majority; the share grew among white evangelical Protestants, most of whom still said belief was necessary. Generalized (correction 3). Not checked.
- A 2017 study led by the psychologist Will Gervais; thousands of participants in countries around the world; vignette of a man who tortured animals as a boy and later killed several homeless people; participants much more likely to connect him with atheism; even atheists did so. Generalized (correction 4). Year, lead author and vignette: not checked (reference knowledge).
- Romans 2:14–15, block quotation, "For when Gentiles ... accuse or even excuse them." Matched word for word against the ESV copy. Verse 15 runs on into verse 16 in the ESV ("excuse them on that day when"); the essay closes the quotation with a period at "them," which is acceptable truncation.
- Paul writing to the church in Rome; Gentiles who had never been given the law of Moses. Reading of Romans 2:12–14 in the ESV copy.

## When Christians Were Called Atheists

- Romans called second-century Christians atheists for refusing to honor the gods. WDB: Martyrdom of Polycarp ch. 3 and 9; First Apology ch. 5 ("Christians Charged with Atheism") and ch. 6.
- In Smyrna a crowd demanded Polycarp's arrest with the cry "Away with the Atheists." WDB, Martyrdom ch. 3 (ANF): "Away with the Atheists; let Polycarp be sought out!" The essay quotes the first clause and drops the exclamation point. The cry comes during the beast shows at which Germanicus fought; the text does not name the stadium at that point (it does in ch. 9 and 12), so "a crowd in the stadium" is a fair reading.
- "in the middle of that century." WDB metadata gives 155 as the default year; not otherwise checked. Kept general.
- "aged bishop." WDB: ch. 9 ("Have respect to thy old age"; "Eighty and six years have I served Him") and ch. 16 ("bishop of the Catholic Church which is in Smyrna").
- The proconsul urged him to swear by the fortune of Caesar and say "Away with the Atheists" himself. WDB, ch. 9 ("Swear by the fortune of Caesar; repent, and say, Away with the Atheists"). Corrected (correction 5).
- Polycarp looked sternly at the crowd, waved his hand toward them, groaned, looked up to heaven and said "Away with the Atheists." WDB, ch. 9 ("gazing with a stern countenance on all the multitude ... waving his hand towards them, while with groans he looked up to heaven, said, 'Away with the Atheists.'"). Paraphrase plus the three-word quotation, which matches.
- The account is a letter from the church at Smyrna. WDB, opening address ("The Church of God which sojourns at Smyrna, to the Church of God sojourning in Philomelium").
- Justin's apology addressed to the emperor Antoninus Pius. WDB, First Apology ch. 1 (addressed to Antoninus Pius, his sons, the Senate and the people of Rome).
- "in the 150s." Not checked (reference knowledge; the usual dating is about 150 to 157). WDB metadata gives 165, Justin's death year, as its default.
- Quotation: "Hence are we called atheists. And we confess that we are atheists, so far as gods of this sort are concerned, but not with respect to the most true God, the Father of righteousness and temperance and the other virtues." WDB, First Apology ch. 6, word for word. The ANF sentence continues ", who is free from all impurity"; the essay ends the quotation at "virtues."
- Justin asked the emperor to judge Christians by their deeds, not their name. WDB, ch. 3 ("Claim of Judicial Investigation") and ch. 4 ("Christians Unjustly Condemned for Their Mere Name"). Paraphrase.
- Locke's *Letter Concerning Toleration* published in English in 1689. Not checked (reference knowledge; Popple's translation, 1689).
- One of the founding arguments for religious liberty in the English-speaking world; made room for more people than most contemporaries would. Characterization. Not checked.
- Locke would not tolerate those who deny God, because promises, covenants and oaths cannot bind an atheist and taking God away dissolves everything. Marked paraphrase now (correction 6). Not checked.
- Earlier in the 1680s, Pierre Bayle, a French Protestant exile in Rotterdam, argued that an atheist could be virtuous and a society of atheists possible (the comet book, 1682 to 1683). Not checked (reference knowledge). The writer's ledger cited the Stanford Encyclopedia of Philosophy via search.
- Bayle was later accused of atheism himself. Not checked (reference knowledge; the writer cited the same SEP entry on Pierre Jurieu's attacks).
- Courts and contracts ran on oaths sworn before God. General history. Not checked.

## What We Mean When We Call Something Wrong

- The evolutionary account of morality (social animals, selection for cooperation, moral emotions refined by culture and reason). A general description, no source named. Not checked.
- Seven times eight is fifty-six. Arithmetic, checked.

## The Strongest Case Without God

- Erik Wielenberg, an atheist philosopher, defends the view that the most basic ethical facts hold necessarily and need no foundation, and that explanation stops at them as the theist's stops at God (his *Robust Ethics*, 2014, not named in the essay). Not checked (reference knowledge). The writer's ledger cited search summaries of the book and reviews.
- Both difficulties raised by philosophers who did not accept the Christian answer. Corrected wording (correction 8). Mackie's atheism: not checked (reference knowledge). Street: inferred from her published antirealism; her religious views not checked.
- J. L. Mackie, Australian-born philosopher at Oxford who denied objective moral values. Not checked (reference knowledge: born in Sydney in 1917; University College, Oxford).
- *Ethics: Inventing Right and Wrong* (1977) and the argument from queerness (objective values would be unlike anything else in the universe, facts that carry a demand so that knowing one gives a reason to act). Not checked (reference knowledge). Paraphrase, no quotation.
- Mackie's book on the arguments for God's existence (*The Miracle of Theism*, not named in the essay) published in 1982 after his death. Per the sibling ledger (year 1982). His death in 1981: not checked (reference knowledge).
- Mackie's concession that objective prescriptive values would be very unlikely to have arisen in the ordinary course of events without a god to create them. Paraphrase without quotation marks (the writer's ledger gives the source as *The Miracle of Theism*, pp. 115–16, via the Prindle Institute). Not checked.
- "He kept his atheism by denying the values." Characterization. Not checked.
- Sharon Street, a 2006 paper ("A Darwinian Dilemma for Realist Theories of Value," *Philosophical Studies* 127; title not in the essay). Not checked (reference knowledge).
- Street's argument: selection has no reason to track independent moral truths, so the realist's confidence would be a coincidence; she concludes that values do not exist independently of us. Paraphrase. Not checked (reference knowledge).

## The Euthyphro Dilemma

- Plato's *Euthyphro* set outside the office of the Athenian magistrate who heard impiety charges, where Socrates has come to answer the charge that will end in his death. Jowett (GITenberg): "SCENE: The Porch of the King Archon"; introduction: "Socrates is defendant in a suit for impiety which Meletus has brought against him." The King Archon's jurisdiction over impiety cases and the outcome: not checked (reference knowledge).
- Set in 399 BC. Not checked (reference knowledge; the year of Socrates' trial; the dialogue itself gives no year).
- Euthyphro so certain he knows what piety requires. Jowett: Euthyphro claims "exact knowledge of all such matters."
- He is prosecuting his own father over the death of a hired man. Jowett: "a poor dependant of mine who worked for us as a field labourer," who had killed a servant, was bound and thrown into a ditch by the father's order, and died there; "taking the part of the murderer and prosecuting my father."
- Socrates' question whether the holy is holy because the gods love it or loved because it is holy. Jowett: "whether the pious or holy is beloved by the gods because it is holy, or holy because it is beloved of the gods." Paraphrase, no quotation marks.
- Thomas Aquinas: God alone is good by his very essence, and everything else is good by sharing in his goodness. WDB, Summa Theologiae I, q. 6, a. 3 ("God alone is good essentially") and a. 4 (everything is called good from the first being "inasmuch as it participates in it by way of a certain assimilation"). Paraphrase.
- James 1:17 "Every good gift and every perfect gift is from above, coming down from the Father of lights, with whom there is no variation or shadow due to change". Matched word for word against the ESV copy. Punctuation unresolved: the ESV copy has no comma after "lights"; the essay has one, as the writer's search summaries of esv.org did. Left as written; recheck with the ESV API.
- "every account stops somewhere, as Wielenberg himself says." Paraphrase of his position. Not checked (reference knowledge).

## What Nietzsche Said About George Eliot

- *Twilight of the Idols* published sixteen years after the walk (1873 to 1889). Not checked (reference knowledge; written 1888, published 1889). Arithmetic checked.
- He named George Eliot in it ("Skirmishes of an Untimely Man," section 5). Not checked (reference knowledge).
- His charge about Eliot and the English moralists. Marked paraphrase now (correction 7). Not checked.
- Nietzsche held Christianity to be a single system from which belief in God cannot be removed without the rest falling. Paraphrase of the same section. Not checked.
- The equal worth of a slave, an unwanted newborn or a foreigner was not the common sense of Rome; the church carried it into that world. General characterization; detail left to the linked essay. Not checked.
- Genesis 9:6 "Whoever sheds the blood of man, by man shall his blood be shed, for God made man in his own image". Matched word for word against the ESV copy.
- Genesis 9:6 sits in God's word to Noah after the flood, the covenant passage (Genesis 9:1–17). Read in the ESV copy context; the covenant is named from 9:9.
- American preachers defended slavery from the pulpit. General history, developed in the linked essay. Not checked here.

## What Paul Actually Says in Romans 2

- The end of Romans 1 describes the idolatry and cruelty of the pagan world. Read in the ESV copy (Romans 1:23, 25, 29–31: idolatry; "murder ... heartless, ruthless").
- Romans 2:1 "Therefore you have no excuse, O man, every one of you who judges. For in passing judgment on another you condemn yourself, because you, the judge, practice the very same things". Matched word for word against the ESV copy.
- Romans 2:21 (part) "you then who teach others, do you not teach yourself?" Matched word for word against the ESV copy.
- Romans 2:24 (the inner quotation) "The name of God is blasphemed among the Gentiles because of you". Matched word for word against the ESV copy, where it follows "For, as it is written," which supports "he turns Scripture on his own people." The Old Testament source (usually traced to Isaiah 52:5) is not named in the essay and was not checked.
- Romans 3:23 "for all have sinned and fall short of the glory of God". Matched word for word against the ESV copy (the verse ends with a comma and runs into 3:24).

## The Rich Young Man

- Mark 10:17 (part) "Good Teacher, what must I do to inherit eternal life?" Matched word for word against the ESV copy. The man "ran up ... and knelt" is in the same verse.
- Mark 10:18 "Why do you call me good? No one is good except God alone". Matched word for word against the ESV copy. Also used, with a closing period, as a Closing Text.
- Mark 10:19–20 paraphrase: Jesus listed commandments; the man said he had kept them since he was young ("Teacher, all these I have kept from my youth"). Checked against the ESV copy. Paraphrase.
- Mark 10:21 (part) "And Jesus, looking at him, loved him". Matched word for word against the ESV copy.
- "Mark adds a detail the other Gospels leave out." Checked by reading Matthew 19:16–22 and Luke 18:18–23 in the ESV copy: neither has Jesus looking at him and loving him.
- Mark 10:21–22 paraphrase: the one thing he lacked was to sell what he had, give to the poor, and follow; he went away grieving because he had great wealth (ESV: "Disheartened by the saying, he went away sorrowful, for he had great possessions"). Checked against the ESV copy. Paraphrase.
- Mark 10:26 paraphrase: the disciples asked who could be saved ("Then who can be saved?"). Checked against the ESV copy.
- Mark 10:27 "With man it is impossible, but not with God. For all things are possible with God". Matched word for word against the ESV copy (the verse opens "Jesus looked at them and said").
- The heading "The Rich Young Man" is the traditional name of the episode; "young" comes from Matthew 19:20, not Mark.

## Closing Texts

- Mark 10:18. As above.
- Romans 2:15 (part) "They show that the work of the law is written on their hearts, while their conscience also bears witness." Matched word for word against the ESV copy; the ESV continues with a comma.
- Luke 19:10 "For the Son of Man came to seek and to save the lost." Matched word for word against the ESV copy.

## Links and mechanics

- /writing/the-early-church-under-rome, /writing/the-children-rome-threw-away, /writing/why-didnt-the-bible-ban-slavery. All three slugs found in `docs/work/essays/link-targets.json` in this run.
- No em-dashes (U+2014) and no exclamation points in the essay, checked by grep in this run. Every remaining quotation mark in the essay encloses ESV Scripture matched above or an ANF text matched in WDB.
