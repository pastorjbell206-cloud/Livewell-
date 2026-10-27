# Claims ledger: did-the-resurrection-happen

Essay: `docs/work/essays/did-the-resurrection-happen.md` ("Did the Resurrection Actually Happen?"). The writer's ledger of 2026-10-26 was checked and rewritten by the verifier on 2026-10-27. Every line below says what was found and how. Where the writer's ledger recorded a search result that this run could not repeat, that is said, and it is not counted as a check.

## Read this first: no web search was available for this check

The workflow's shared web-search budget was already used up when this check began. The first WebSearch call (Hume's "A wise man" sentence) came back "this turn's web search budget is used up," so no search result was seen in this run. bmj.com could not be reached by curl (the sandbox proxy answered 403) or by WebFetch (the host did not resolve). esv.org, Wikipedia and the Ehrman blog were not tried.

The methods actually used, and what the words below mean:

- **"ESV copy"**: the ESV text in the public GitHub repository lguenth/mdbible ("ESV Bible in Markdown"), already cloned in the scratchpad (commit fd66568, dated 2022-01-20). Its JSON labels itself "English Standard Version 2011," taken from a SWORD module. The book files were read on 2026-10-27 with `git show`, and a script compared each quotation with the verse text after normalizing punctuation, quotation marks and spacing, once with case and once without. This is not esv.org or the ESV API, and it is the 2011 text, not the 2016 Permanent Text; recheck with James's API key once it exists.
- **"Library"**: the public-domain patristic texts in the HistoricalChristianFaith Writings-Database, already cloned in the scratchpad (commit 328918a, dated 2026-10-25). Files were read on 2026-10-27 with `git show 'HEAD:<path>'`, the HTML stripped by a script, and the passages found with grep. Translations used: the Ante-Nicene Fathers (ANF) texts of Origen, *Against Celsus*; Justin Martyr, *Dialogue with Trypho*; and *1 Clement*.
- **"Perseus Whiston"** and **"Perseus Tacitus"**: William Whiston's translation of Josephus (*Antiquities*, `tlg0526.tlg001.perseus-eng2.xml`; *Jewish War*, `tlg0526.tlg004.perseus-eng2.xml`) and the Church and Brodribb translation of Tacitus, *Annals* (`phi1351.phi005.perseus-eng1.xml`) with the Latin (`phi1351.phi005.perseus-lat1.xml`), fetched from the PerseusDL repositories on raw.githubusercontent.com on 2026-10-27 and read with a script.
- **"Hume text"**: Project Gutenberg EBook #9662, *An Enquiry Concerning Human Understanding* (the Selby-Bigge edition text), file `9662-8.txt` from the GITenberg repository on raw.githubusercontent.com, fetched 2026-10-27 and read with grep. Section numbers below are the Selby-Bigge paragraph numbers printed in that text. This is the later revised text of the Enquiry, not the 1748 first printing.
- **"Sefaria export"**: Sefaria's public text export on storage.googleapis.com (`sefaria-export`), fetched 2026-10-27: *Mishneh Torah, Kings and Wars*, English (Eliyahu Touger's translation, as the file states), and *Jerusalem Talmud Taanit*, English (Heinrich Guggenheimer's translation, as the file states).
- **"Repo creeds"**: `client/public/creeds/documents/apostles-creed.json` and `nicene-creed.json` in this repo, read 2026-10-27.
- **"Not checked (textbook)"** or **"Not checked (reference knowledge)"**: no source was opened or searched in this run. The verifier judged it standard reference knowledge. That judgment is not a check.
- **"Generalized"**: a figure or claim that could not be checked was replaced with a broader statement meant to stay true across any plausible error. The generalized statement is itself unchecked.

## Corrections made in the essay

1. What Almost Every Historian Grants: "executed by crucifixion under Pontius Pilate, which the Roman historian Tacitus ... recorded" became "crucified under Pontius Pilate. Early in the second century the Roman historian Tacitus ... recorded that Pilate had put him to death." Reason: Tacitus says Christus "suffered the extreme penalty ... at the hands of one of our procurators, Pontius Pilatus" (Latin *supplicio adfectus erat*), *Annals* 15.44 (Perseus Tacitus). He does not name crucifixion, so the essay no longer says he recorded it.
2. Same section: "Most scholars, including many with no stake in Christianity, think Paul received this summary within a few years" became "Scholars across the field, including many ...". Reason: no source on how many scholars hold the early date could be opened or searched. Generalized.
3. Was the Tomb Empty?: "All four Gospels say that women found the tomb empty" became "All four Gospels say that Mary Magdalene, alone or with other women, found the tomb empty." Reason: John names only Mary Magdalene (John 20:1–2); Matthew 28:1, Mark 16:1–6 and Luke 24:1–10 name her with other women (ESV copy).
4. Same section: "Ehrman replies that one case among hundreds proves very little" became "one case proves very little." Reason: the figure behind "hundreds" (the writer's ledger records a search summary of Ehrman's blog citing "some 900 bone boxes") could not be checked in this run. Generalized.
5. Could They Have Seen Visions?: "where Celsus mocked the women" became "where Celsus mocked Mary Magdalene." Reason: Celsus speaks of "A half-frantic woman" (singular), and Origen identifies her as Mary Magdalene, *Against Celsus* 2.59 (Library).
6. Same section, Rees: "a Welsh doctor named W. Dewi Rees published a study ... of 293 widowed men and women, and almost half reported" became "a doctor in Wales named W. Dewi Rees published a study ... of widowed men and women, and a large share of them reported." Reason: the BMJ article could not be reached (bmj.com blocked) or searched. The count and proportion are generalized; "Welsh" became "in Wales," which claims only where he worked.
7. Same section: "Ehrman thinks some of them did, in just this sense," became "Ehrman thinks some of them did," Reason: whether Ehrman ties the disciples' visions to bereavement experiences specifically could not be checked. The remaining claim is the general one.
8. What "Resurrection" Meant: "Rabbi Akiva hailed him as the messiah, calling him Bar Kokhba, the son of the star" became "hailed him as the messiah and applied to him the prophecy of a star out of Jacob (Numbers 24:17), which is how he came to be called Bar Kokhba, the son of the star." Reason: the Jerusalem Talmud (Taanit 4:5, Sefaria export) shows Akiva reading "there appeared a star out of Jacob" as "there appeared Koziba out of Jacob" and saying "this is King Messias"; it does not show him coining the name. That the name comes from this reading is not checked (reference knowledge).
9. Can a Historian Say a Miracle Happened?: "Any testimony to a miracle, however good, will always be weaker than the evidence that such things don't happen, so the reasonable course is always to conclude ..." became "No testimony to a miracle, he argued, has ever been strong enough to outweigh that experience, and none could ever prove a miracle as the foundation of a religion. The reasonable course is to conclude ..." Reason: Hume limits his conclusion. He says no testimony for a miracle "has ever amounted to a probability" (§98) and that "a miracle can never be proved, so as to be the foundation of a system of religion" (§99), and he grants that other miracles might in principle "admit of proof from human testimony," giving the example of eight days of darkness from 1 January 1600 (§99) (Hume text). The old sentence said he ruled out all testimony to any miracle.
10. Same section, Hume's Queen Elizabeth: "was seen dead by her physicians and her court, was buried, and a month later reappeared and governed for three more years" became "was seen by her physicians and the whole court before and after her death, and after a month in the grave reappeared, took back the throne, and governed for three years." Reason: Hume writes "both before and after her death she was seen by her physicians and the whole court ... after being interred a month, she again appeared, resumed the throne, and governed England for three years" (§99, Hume text).
11. What the Church Has Done With Easter: "Evangelical churches, the ones I know best," became "Evangelical churches, and Baptist churches like the one I pastor,". Reason: NOTES.md confirms that James pastors a Baptist church; it does not confirm which churches he knows best or that his church calls itself evangelical. The new wording uses only the confirmed fact.
12. Same section: "the motto Isaiah once heard in the streets of Jerusalem (Isaiah 22:13)" became "the motto of the revelers Isaiah rebuked in Jerusalem (Isaiah 22:13)." Reason: Isaiah 22 sets the line in Jerusalem (22:9–10) among people feasting when God called for mourning (22:12–14), but the text says nothing about streets or about Isaiah hearing it there (ESV copy).

## Quotations of non-Scripture sources

- Celsus: "A half-frantic woman, as you state." Matched word for word against Origen, *Against Celsus* 2.55, ANF (Library). Celsus speaks there through an imagined Jewish critic. Origen names the woman as Mary Magdalene in 2.59.
- Celsus: "had either dreamed so, owing to a peculiar state of mind, or under the influence of a wandering imagination had formed to himself an appearance according to his own wishes, which has been the case with numberless individuals." Matched word for word against *Against Celsus* 2.55, ANF (Library), except that the library's text reads "bad formed," an obvious scanning error for "had formed," the reading the sentence requires.
- Celsus: "is whether any one who was really dead ever rose with a veritable body." Matched word for word against *Against Celsus* 2.55, ANF (Library): "But the question is, whether any one who was really dead ever rose with a veritable body."
- Hume: "A wise man, therefore, proportions his belief to the evidence." Matched word for word against the Hume text (Section X, Part 1, §87). The essay puts the comma inside the closing quotation mark before "he wrote."
- Hume: "should not have the least inclination to believe so miraculous an event." Matched word for word against the Hume text (§99).
- Apostles' Creed: "the resurrection of the body." Matched against the repo creeds.
- Nicene Creed: "we look for the resurrection of the dead, and the life of the world to come." Matched against the repo creeds ("and we look for the resurrection of the dead, and the life of the world to come. Amen.").
- Hume's essay title "Of Miracles." Not checked (textbook).

## Numbers, dates, names and events

Opening and What Paul Handed On

- Paul wrote 1 Corinthians from Ephesus. Matched against the ESV copy (1 Corinthians 16:8, "I will stay in Ephesus until Pentecost"). The mid-50s date: not checked (textbook).
- Paul planted the church in Corinth. Matched against the ESV copy (1 Corinthians 3:6, "I planted").
- Some in Corinth said there is no resurrection of the dead. Matched against the ESV copy (1 Corinthians 15:12).
- Paul uses "delivered" and "received" for the Lord's Supper "a few chapters earlier." Matched against the ESV copy (1 Corinthians 11:23).
- Paul visited Jerusalem "after three years," stayed fifteen days with Cephas, and saw no other apostle except James. Matched against the ESV copy (Galatians 1:18–19). That the three years count from his conversion is the usual reading, not checked.
- Cephas and James are the two names on the list Paul saw in Jerusalem. Matched against the ESV copy (1 Corinthians 15:5, 7; Galatians 1:18–19).
- Jesus crucified around 30 or 33. Not checked (textbook).
- The letter written "some twenty years after the crucifixion." Arithmetic from the two textbook dates above; not checked otherwise.
- Scholars across the field date Paul's reception of the summary within a few years of the events. Generalized (correction 2); not checked.
- Most of the five hundred still alive. Matched against the ESV copy (1 Corinthians 15:6).

What Almost Every Historian Grants

- Tacitus recorded that Pilate put Christ to death. Matched against Perseus Tacitus, *Annals* 15.44, English and Latin (correction 1).
- Tacitus despised Christians. Matched against the same passage ("a class hated for their abominations," "a most mischievous superstition," Perseus Tacitus).
- Tacitus wrote early in the second century. Not checked (textbook).
- Paul persecuted the church violently. Matched against the ESV copy (Galatians 1:13).
- Jesus' brothers did not believe in him. Matched against the ESV copy (John 7:5).
- The preaching began in Jerusalem. Matched against the ESV copy (Acts 2:14, Peter addressing "all who dwell in Jerusalem").
- Bart Ehrman grants that the followers came to believe very soon after the crucifixion that God had raised Jesus, and denies the belief was true. Paraphrase, no quotation. Not checked (no Ehrman text opened or searched in this run).

Was the Tomb Empty?

- All four Gospels: Mary Magdalene, alone or with other women, found the tomb empty early on the first day of the week. Matched against the ESV copy (Matthew 28:1, 6; Mark 16:1–6; Luke 24:1–3, 10; John 20:1–2) (correction 3).
- Ehrman, in *How Jesus Became God*, argued that Rome normally left the crucified on their crosses or disposed of the bodies, so Jesus was probably not laid in a known tomb. Paraphrase. Not checked in this run; the writer's ledger records a search summary of ehrmanblog.org posts from 2014.
- Craig Evans answered that Judea in peacetime was not the rest of the empire. Paraphrase. Not checked in this run; the writer's ledger records a search summary and names Evans's essay in *How God Became Jesus* (2014), which the essay does not name.
- Josephus said the Jews took down even the crucified and buried them before sunset. Matched against Perseus Whiston, *Jewish War* 4.317 (in the paragraph beginning at section 314): "the Jews used to take so much care of the burial of men, that they took down those that were condemned and crucified, and buried them before the going down of the sun."
- 1968, a construction crew at Giv'at ha-Mivtar in Jerusalem broke into a family tomb from around the time of Jesus; an ossuary held the remains of a young man named Yehohanan with an iron nail through his heel. Not checked in this run (reference knowledge). The writer's ledger records search summaries.
- Ehrman replies that one case proves very little. Generalized (correction 4); not checked.
- Joseph of Arimathea, "a respected member of the council," buried Jesus. Matched against the ESV copy (Mark 15:43–46).
- The same council handed Jesus over. Matched against the ESV copy (Mark 15:1, "the whole council ... delivered him over to Pilate").
- Josephus, summarizing the law, said women's testimony was not to be admitted. Matched against Perseus Whiston, *Antiquities* 4.219: "But let not the testimony of women be admitted, on account of the levity and boldness of their sex."
- Celsus attacked Christianity late in the second century. Not checked (textbook).
- In the oldest manuscripts Mark ends at 16:8. Not checked (textbook).
- Mary Magdalene took Jesus for the gardener. Matched against the ESV copy (John 20:15, "Supposing him to be the gardener").
- The guards were paid to say the disciples stole the body. Matched against the ESV copy (Matthew 28:12–15).
- Justin Martyr, in his *Dialogue with Trypho*, complained that men had been sent throughout the world to say the disciples stole the body from the tomb by night. Matched against the Library, *Dialogue* 108, ANF: "you have sent chosen and ordained men throughout all the world to proclaim ... his disciples stole him by night from the tomb." Paraphrase. "In the middle of the second century": not checked (textbook).
- Many scholars doubt Matthew's guard story. General; not checked.

Could They Have Seen Visions?

- Celsus offered his own account of the appearances in the same passage as the "half-frantic woman." Matched against the Library, *Against Celsus* 2.55.
- Celsus's book is lost and survives in Origen's point-by-point answer. That Origen's reply quotes "the treatise of Celsus, entitled A True Discourse" in sequence: matched against the Library (*Against Celsus* 2.1). That the book is otherwise lost, and that Origen wrote around the middle of the third century: not checked (textbook).
- W. Dewi Rees, a doctor in Wales, published a study of widowed men and women in the British Medical Journal in 1971; a large share reported experiences of their dead spouse, some for years. Name, journal and year: not checked (reference knowledge). Count and proportion generalized (correction 6). The writer's ledger records a search summary of the BMJ abstract (227 widows and 66 widowers; "almost half").
- Rees thought these experiences normal and often helpful. Not checked in this run; kept as paraphrase on the strength of the writer's search summary, which this run could not repeat.
- Peter denied knowing Jesus on the night of his arrest. Matched against the ESV copy (Mark 14:71, "I do not know this man").
- Ehrman thinks some disciples had visions and that resurrection belief grew from them. Paraphrase. Not checked (correction 7).
- Dale Allison, a New Testament scholar and a Christian, collected reports of the dead appearing to the living, some to more than one person at once, and warns believers against claiming such visions are always private. Paraphrase. Not checked in this run; the writer's ledger records search summaries about his *Resurrecting Jesus* (2005) and calls the "warns believers" wording the writer's own paraphrase.
- Paul was trying to destroy Jesus' followers; James did not believe during Jesus' life. Matched against the ESV copy (Galatians 1:13; John 7:5).
- The Gospels describe the risen Jesus eating, being touched, and talking at length. Matched against the ESV copy (Luke 24:27, 42–43; Matthew 28:9; John 20:27; Acts 1:3).

What "Resurrection" Meant

- Peter, freed from prison, knocked at the gate of a house where the church was praying; the servant girl Rhoda ran to tell them. Matched against the ESV copy (Acts 12:5, 12–15).
- N.T. Wright, a historian who also served as an Anglican bishop, spent some eight hundred pages in *The Resurrection of the Son of God* tracing what resurrection meant to Jews and pagans, and argued that the empty tomb and the appearances together, not either alone, produced the belief. Not checked (reference knowledge).
- Paul in Athens: "some mocked." Matched against the ESV copy (Acts 17:32).
- The Sadducees denied the resurrection. Matched against the ESV copy (Mark 12:18).
- Lazarus four days in the tomb. Matched against the ESV copy (John 11:17).
- Firstfruits are the first sheaf of the harvest. Matched against the ESV copy (Leviticus 23:10, "the sheaf of the firstfruits of your harvest").
- Simon bar Kosiba led a revolt against Rome in 132 and was killed at Betar in 135. Dates: not checked (textbook). Betar named as the place of Hadrian's slaughter: matched against the Sefaria export (Jerusalem Talmud Taanit 4:5, "Bettar").
- Rabbi Akiva hailed him as messiah and applied to him the star out of Jacob. Matched against the Sefaria export (Jerusalem Talmud Taanit 4:5) (correction 8). Numbers 24:17 ("a star shall come out of Jacob"): matched against the ESV copy; the essay cites it without quotation marks.
- The name Bar Kokhba, son of the star, comes from that reading. Not checked (reference knowledge).
- Maimonides explained that the sages believed he was the messiah until he was killed, and his death showed them he was not. Matched against the Sefaria export (*Mishneh Torah*, Kings and Wars 11:3: "He and all the Sages of his generation considered him to be the Messianic king until he was killed because of sins. Once he was killed, they realized that he was not the Mashiach."). Paraphrase. "A thousand years later": not checked (textbook; the Mishneh Torah is twelfth-century).
- James the brother of Jesus led the church in Jerusalem. Matched against the ESV copy (Galatians 2:9; Acts 15:13; Acts 21:18).
- James was stoned. Matched against Perseus Whiston, *Antiquities* 20.200 ("the brother of Jesus, who was called Christ, whose name was James ... he delivered them to be stoned"). The year 62: not checked (textbook); the passage places it after Festus died and before Albinus arrived.
- Nobody called James the messiah. An argument from silence; not checked.

The Other Explanations

- The theory that the disciples stole the body and lied has few defenders among scholars now. General; not checked.
- Herod Agrippa killed James the brother of John. Matched against the ESV copy (Acts 12:1–2, "Herod the king"). The identification with Herod Agrippa I: not checked (textbook).
- Josephus describes the stoning of James the brother of Jesus. Matched against Perseus Whiston, *Antiquities* 20.200.
- 1 Clement, a letter from the church in Rome to Corinth, says Peter and Paul suffered martyrdom. Matched against the Library, *1 Clement* 5, ANF ("when he had at length suffered martyrdom"; Paul "suffered martyrdom under the prefects"). "Late in the first century": not checked (textbook; the library file is headed AD 96).
- The evidence for how most other apostles died is later and less certain. General; not checked.
- The swoon theory was popular among some rationalist critics two centuries ago. Not checked (reference knowledge).
- David Friedrich Strauss answered it: a half-dead man needing bandages and nursing could not have persuaded anyone he had conquered death. Paraphrase, no quotation marks. Not checked (no Strauss text opened or searched; reference knowledge).
- Joseph of Arimathea knew where he had laid the body. Matched against the ESV copy (Mark 15:46–47).
- Celsus compared the Christian story to legends of figures said to have come back from the underworld. Matched against the Library, *Against Celsus* 2.55 (Zamolxis, Pythagoras, Rhampsinitus in Egypt, Orpheus, Protesilaus, Hercules, Theseus).

Can a Historian Say a Miracle Happened?

- Hume gave the argument its classic form in "Of Miracles," published in 1748. Not checked (textbook).
- Hume's argument: uniform experience that the dead stay dead; weigh whether the witness deceives or is deceived. Matched against the Hume text (§90, "a dead man should come to life ... has never been observed in any age or country"; §91, "whether it be more probable, that this person should either deceive or be deceived"). Paraphrase.
- Hume on the limits of testimony. Matched against the Hume text, §§98–99 (correction 9).
- Hume's Queen Elizabeth example. Matched against the Hume text, §99 (correction 10).
- Peter's first sermon in Jerusalem. Matched against the ESV copy (Acts 2:14, 24).
- The eleven saw Jesus on a mountain in Galilee. Matched against the ESV copy (Matthew 28:16–17).

What the Church Has Done With Easter

- Marcus Borg, a widely read scholar, wrote a book with Wright setting their two views side by side, and treated the empty-tomb stories as parables whose truth did not depend on what happened to the body. Paraphrase; the essay does not name the book. Not checked in this run; the writer's ledger records search summaries naming *The Meaning of Jesus: Two Visions* (1999).
- Paul's "Let us eat and drink, for tomorrow we die" repeats Isaiah 22:13, set in Jerusalem. Matched against the ESV copy (Isaiah 22:9–14) (correction 12).
- Paul wrote to believers in Thessalonica. Matched against the ESV copy (1 Thessalonians 4:13).
- Mary Magdalene came to the tomb weeping, took him for the gardener, and he said her name. Matched against the ESV copy (John 20:11–16).

## Biography

- "I was an atheist before I was a Christian." Matched against NOTES.md (came to faith as an adult from atheism).
- "Baptist churches like the one I pastor." Matched against NOTES.md (he pastors a Baptist church). No denomination or convention named (correction 11).
- No title, years in ministry, book count, scene or conversation appears in the essay. Checked by reading the essay on 2026-10-27.

## Scripture quotations (ESV)

Every quotation below was compared by script with the ESV copy on 2026-10-27, and each string was confirmed to appear in the essay exactly as checked. All 31 matched word for word after punctuation and spacing were normalized.

- 1 Corinthians 15:12 "Now if Christ is proclaimed as raised from the dead, how can some of you say that there is no resurrection of the dead?" Matched.
- 1 Corinthians 15:17 "your faith is futile and you are still in your sins." Matched.
- 1 Corinthians 15:19 "if in Christ we have hope in this life only, we are of all people most to be pitied." Matched; the verse begins "If," lowercased in the essay because it runs into the sentence.
- 1 Corinthians 15:15 "found to be misrepresenting God." Matched.
- 1 Corinthians 15:3–8 (block quotation). Matched in full.
- 1 Corinthians 11:23 "For I received from the Lord what I also delivered to you." Matched.
- Galatians 1:18–19 "to visit Cephas and remained with him fifteen days" and "James the Lord's brother." Matched.
- Galatians 1:13 "persecuted the church of God violently and tried to destroy it." Matched.
- John 7:5 "For not even his brothers believed in him." Matched.
- Deuteronomy 21:23 "shall not remain all night on the tree, but you shall bury him the same day." Matched.
- Mark 15:43 "a respected member of the council." Matched.
- Mark 16:8 "they said nothing to anyone, for they were afraid." Matched.
- Luke 24:11 "seemed to them an idle tale, and they did not believe them." Matched.
- John 20:15 "Sir, if you have carried him away, tell me where you have laid him, and I will take him away." Matched.
- Matthew 28:13 "His disciples came by night and stole him away while we were asleep." Matched.
- Matthew 28:15 "this story has been spread among the Jews to this day." Matched.
- Acts 12:15 "You are out of your mind" and "It is his angel!" Matched. The exclamation point is inside quoted Scripture.
- Luke 24:37 "they were startled and frightened and thought they saw a spirit." Matched.
- Acts 17:32 "some mocked." Matched.
- Daniel 12:2 "And many of those who sleep in the dust of the earth shall awake, some to everlasting life, and some to shame and everlasting contempt." Matched.
- John 11:24 "I know that he will rise again in the resurrection on the last day." Matched.
- 1 Corinthians 15:20 "But in fact Christ has been raised from the dead, the firstfruits of those who have fallen asleep." Matched (body and Closing Texts).
- Acts 12:2 "killed James the brother of John with the sword." Matched.
- Acts 2:24 "God raised him up, loosing the pangs of death, because it was not possible for him to be held by it." Matched.
- Matthew 28:17 "they worshiped him, but some doubted." Matched.
- 1 Corinthians 15:32 "Let us eat and drink, for tomorrow we die." Matched; the same words also matched at Isaiah 22:13.
- 1 Corinthians 15:58 "be steadfast, immovable, always abounding in the work of the Lord, knowing that in the Lord your labor is not in vain." Matched.
- 1 Thessalonians 4:13 "that you may not grieve as others do who have no hope." Matched.
- Luke 24:5–6 "Why do you seek the living among the dead? He is not here, but has risen." (Closing Texts) Matched.
- John 11:25 "I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live." (Closing Texts) Matched; the ESV has a comma where the verse runs on into 11:26, and the Closing Texts line ends it with a period.

## Links

- /writing/the-historical-jesus, /writing/the-first-christians-died-for-this, /writing/did-christianity-copy-pagan-myths: all three found in the "shelf" list of `docs/work/essays/link-targets.json` on 2026-10-27. The link text "Why Were the Early Christian Martyrs Willing to Die?" matches the title in NOTES.md.

## Original wording, for restoring

When search or the source pages can be reached, these can go back word for word if they check out:

- Rees: "a Welsh doctor named W. Dewi Rees published a study in the British Medical Journal of 293 widowed men and women, and almost half reported experiences of their dead spouse" (BMJ 1971; 4:37, "The hallucinations of widowhood," per the writer's ledger).
- Ehrman's reply: "one case among hundreds proves very little" (check Ehrman's figure for ossuaries).
- Scholarly dating of 1 Corinthians 15:3–8: "Most scholars, including many with no stake in Christianity" (check a survey or a named skeptical scholar such as Gerd Lüdemann).
- Ehrman on visions: "Ehrman thinks some of them did, in just this sense" (check *How Jesus Became God* on bereavement visions).

## Folded in and discarded (from the writer's ledger, unchanged)

- Folds in the-historical-jesus-without-the-shortcuts (limits of historical method; hallucination, legend and theft weighed; "from contempt to consideration"). Kept the ideas, not the wording.
- Dropped from the old essays: Gary Habermas "minimal facts" framing; claim that hallucinations never happen to groups (overclaim, contradicted by Allison); "in case after case, execution" of the disciples (overclaim); Tom Holland's Dominion section (off the question); Acts 26:26; the Emmaus "had hoped" passage; the "Greek word suggesting the babbling of the delirious" gloss on Luke 24:11; old biography lines about reading Wright as an atheist (invented biography).
