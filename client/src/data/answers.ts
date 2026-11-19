/**
 * The Answers hub data (/answers). Each entry is a real reader question whose
 * H2 is the query itself, answered in three tight paragraphs distilled from
 * the essay that carries the full argument, laddering short answer → essay →
 * book (where a book on the shelf takes the question up). The paragraphs are compressions of their source essays: no claim,
 * citation, or verse appears here that is not in the essay. Edit the answer
 * by editing its essay first; this layer only surfaces it. The exception is
 * an argued answer (`sections`, below), which carries its own checked claims.
 */
export interface Answer {
  /** URL anchor + FAQ identity: the question in kebab form. */
  slug: string;
  /** The reader's actual question, verbatim. Rendered as the H2. */
  question: string;
  /** Three paragraphs: direct answer → strongest ground → the weight it leaves. */
  paragraphs: string[];
  /** The essay that makes the argument in full. */
  essaySlug: string;
  essayTitle: string;
  /**
   * The book that carries it the rest of the way: a title on the /books shelf
   * (lib/bookShelf.ts) that takes up this question, or absent when none does.
   */
  bookTitle?: string;
  bookHref?: string;
  /**
   * Other words a person types for this question ("did Jesus rise from the
   * dead"). The site search matches them (scripts/build-search-index.mjs);
   * they are never shown.
   */
  askedAs?: string;
  /**
   * The argued form (James, 2026-11-18: "more logical, more academic... but
   * also someone that would convince a non-believer"). When present, the
   * `paragraphs` above are the short answer, and these parts follow it on the
   * answer's page: the objection at full strength, the argument laid out, the
   * evidence, the best reply and what the argument does not prove. Unlike the
   * three-paragraph answers, an argued answer may carry claims beyond its
   * essay; each is checked in docs/work/elite/apol-ledger.md.
   */
  sections?: AnswerSection[];
  /** "Sources and further reading", shown under the sections. Every entry real and checked. */
  sources?: AnswerSource[];
}

/** An argument set out so a reader can check each step. */
export interface AnswerSteps {
  /** What kind of argument it is, in plain words. */
  kind: string;
  premises: string[];
  conclusion: string;
}

/** One part of an argued answer: a heading, then paragraphs, with an argument laid out where one belongs. */
export interface AnswerSection {
  heading: string;
  body: (string | AnswerSteps)[];
}

export interface AnswerSource {
  author: string;
  /** A book's title, or an article's title when `in` names the journal. */
  title: string;
  in?: string;
  year: string;
  /** One short line on why it is listed. */
  note?: string;
}

/** Every sentence of an answer, short answer and argued parts alike (for the indexes that scan the text). */
export function answerText(a: Answer): string[] {
  const out = [...a.paragraphs];
  for (const s of a.sections ?? []) {
    for (const b of s.body) {
      if (typeof b === "string") out.push(b);
      else out.push(...b.premises, b.conclusion);
    }
  }
  return out;
}

export const ANSWERS: Answer[] = [
  {
    slug: "did-the-resurrection-actually-happen",
    askedAs: "did jesus rise rose risen raised from the dead come back to life easter empty tomb",
    question: "Did the resurrection actually happen?",
    paragraphs: [
      "I think it did, and I think the case is stronger than most people have been told. It isn't a proof. History can't prove a miracle, and I won't pretend it can. But there is a short list of facts that nearly every historian of the period accepts, skeptics included: Jesus was crucified, his followers were soon convinced they had seen him alive, a persecutor and a doubting brother came to believe the same, and the preaching began in the city where he was buried. The question is what best explains them. Each natural explanation covers part of the evidence and strains at the rest. Whether you can accept the one that covers all of it depends on whether you have already decided that God can't act, and that is the question worth facing honestly.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "David Hume gave the objection its classic form in his essay \"Of Miracles\" in 1748. \"A wise man, therefore, proportions his belief to the evidence,\" he wrote. Our experience that the dead stay dead is as uniform as experience gets, so when someone reports that a dead man rose, it is always more likely that the witness was deceived or deceiving than that the laws of nature gave way. Hume didn't need to examine the evidence for Easter to reject it. He thought the question was settled before the evidence was called.",
          "Modern historians put it more carefully. Bart Ehrman, a New Testament scholar at the University of North Carolina and an agnostic, grants that some of Jesus' followers came to believe soon after the crucifixion that God had raised him. What he doesn't accept is that the belief was true, and he argues that historians, working as historians, can't conclude that a miracle happened at all. He suggests that some of the disciples had visions of Jesus, the kind of experience grieving people have. That isn't a cheap suggestion. In 1971 a doctor in Wales named W. Dewi Rees published a study in the British Medical Journal of 293 widowed men and women, and almost half of them reported experiences of their dead spouse, some for years afterward. The disciples were bereaved, frightened and ashamed. Why wouldn't some of them see him?",
          "Then there are the documents. The Gospels were written decades after the events, most critical scholars date Mark around 70, and the four Easter accounts differ in their details. Ehrman has also pressed the strongest objection to the empty tomb. Rome normally left the crucified on their crosses or dumped the bodies, because denying a decent burial was part of the punishment, and he finds it hard to see why Pilate would have made an exception for Jesus. If Jesus was never laid in a known tomb, the stories of an empty one are later legend.",
          "I grant what is true in all of this. Legends do grow. Grief does produce visions. A claim that a dead man rose should face a higher bar than a claim that he died. If the case for the resurrection can't survive those points, it doesn't deserve to be believed.",
        ],
      },
      {
        heading: "What kind of case this is",
        body: [
          "This is a historical argument, and historical arguments don't work like proofs. They work by inference to the best explanation. You start with the facts the evidence establishes, not with any belief that the Bible is inspired, and you ask which account explains the most of them with the least strain. Two cautions belong at the start. History deals in probabilities, so the argument can't force anyone to believe. And the answer you reach depends partly on what you think is possible before you begin. I'll come back to that, because it is where the real disagreement lives.",
        ],
      },
      {
        heading: "What nearly every historian grants",
        body: [
          "First, Jesus was crucified under Pontius Pilate, around the year 30 or 33. Early in the second century the Roman historian Tacitus, who despised Christians, recorded that \"Christus, from whom the name had its origin, suffered the extreme penalty during the reign of Tiberius at the hands of one of our procurators, Pontius Pilatus.\"",
          "Second, his followers became convinced they had seen him alive, and the evidence for that is very early. Writing to the church at Corinth in the mid-50s, Paul reminded them of what he had \"delivered\" to them, a summary he had himself \"received\": \"that Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day in accordance with the Scriptures, and that he appeared to Cephas, then to the twelve. Then he appeared to more than five hundred brothers at one time, most of whom are still alive, though some have fallen asleep. Then he appeared to James, then to all the apostles\" (1 Corinthians 15:3-7). Delivered and received are the words for handing on a tradition you didn't compose. Paul tells the Galatians that about three years after his conversion he spent fifteen days in Jerusalem with Cephas and saw James, the Lord's brother (Galatians 1:18-19), two of the names on that list. Most scholars, including many with no stake in Christianity, think the summary took shape within a few years of the events. Gerd Lüdemann, a German New Testament scholar who did not believe Jesus rose, dated it to about two years after the crucifixion. E. P. Sanders, no apologist, wrote: \"That Jesus' followers (and later Paul) had resurrection experiences is, in my judgement, a fact. What the reality was that gave rise to the experiences I do not know.\"",
          "Third, two people who had every reason not to believe came to believe. Paul says he \"persecuted the church of God violently and tried to destroy it\" (Galatians 1:13). James was one of the brothers of whom John writes, \"For not even his brothers believed in him\" (John 7:5). James went on to lead the church in Jerusalem until he was stoned there around 62.",
          "Fourth, the preaching began in Jerusalem, within weeks, in the city where Jesus had been executed and buried, where the claim was easiest to refute.",
          "The empty tomb is more disputed, and I'll say so plainly. Against Ehrman's objection, Craig Evans and others answer that Judea in peacetime wasn't the rest of the empire. The law of Moses required that a hanged man's body \"shall not remain all night on the tree, but you shall bury him the same day\" (Deuteronomy 21:23), and Josephus, the Jewish historian of the first century, wrote that his people took down even the crucified and buried them before sunset. In 1968 builders in Jerusalem broke into a family tomb holding the bones of a young man named Yehohanan, an iron nail still driven through his heel. Ehrman replies that one case proves very little, and the argument goes on. But some details push hard against invention. Mark says the man who buried Jesus was \"a respected member of the council\" (Mark 15:43), the same council that handed him over. All four Gospels put women first at the tomb, when Josephus could summarize the law as \"let not the testimony of women be admitted.\" And as far as our sources show, the earliest opponents didn't say the body was still in the grave. Matthew answers a story that the disciples stole it (Matthew 28:13-15). They argued about how the tomb became empty.",
        ],
      },
      {
        heading: "The argument, laid out",
        body: [
          {
            kind: "A historical argument: inference to the best explanation",
            premises: [
              "Jesus died by crucifixion under Pontius Pilate.",
              "Soon afterward individuals and groups, including the persecutor Paul and the skeptical brother James, became convinced that they had seen him alive.",
              "They proclaimed his resurrection within weeks in Jerusalem, where his burial place was known, and their earliest opponents disputed how the tomb was empty, not whether.",
              "They chose the word resurrection, which to Jews of the day meant the bodily raising of God's people at the end of history, not the vision of a dead man or his spirit's rescue.",
            ],
            conclusion: "Of the explanations on offer, that God raised Jesus from the dead explains all four facts best, unless it has been ruled out before the evidence is weighed.",
          },
          "The third premise is the most contested, because it depends on the burial. The conclusion also depends on something the evidence can't supply, and I'll name it below. First, the rivals.",
        ],
      },
      {
        heading: "The other explanations",
        body: [
          "The theory that the disciples hid the body and lied has few defenders among scholars now, for a plain reason: they paid for the claim. James the brother of John was killed with the sword (Acts 12:2), James the brother of Jesus was stoned, and a letter from the church in Rome late in the first century says that Peter and Paul suffered martyrdom. People die for false beliefs all the time, but these men were in a position to know whether they had taken the body themselves. Sanders, for one, set fraud aside as no serious explanation. The idea that Jesus survived the cross was answered by the skeptic David Friedrich Strauss in the nineteenth century: a half-dead man in need of bandages and nursing could never have persuaded anyone that he had conquered death.",
          "The vision theory is the serious rival, and it deserves its due. Dale Allison, a New Testament scholar who is himself a Christian, has collected reports of the dead appearing to the living, some of them to more than one person at once, and he warns believers against claiming such visions are always private. But the theory strains at three points. Bereavement visions come to mourners, and Paul wasn't mourning Jesus; he was hunting his followers. James didn't believe in his brother while he lived. And the witnesses chose the wrong word for a vision. The ancient world had a full vocabulary for seeing the dead. When Peter, freed from prison, knocked at the door, the church said, \"It is his angel!\" (Acts 12:15). When the risen Jesus stood among them, the disciples \"were startled and frightened and thought they saw a spirit\" (Luke 24:37). The historian N. T. Wright argued in The Resurrection of the Son of God that resurrection meant something else entirely: the bodily raising of all God's people at the end. Nobody expected one man to be raised ahead of everyone while the world went on.",
          "Another movement shows the normal logic. In 132 Simon bar Kosiba led a revolt against Rome, and Rabbi Akiva hailed him as the messiah. When he died in 135, the sages took his death as proof that he was not. A messiah killed by the pagans had failed. Jesus' followers shared that logic, and they had a natural successor in James. Nobody called James the messiah. They said God had raised Jesus. Wright's conclusion is that only the empty tomb and the appearances together explain it. A missing body alone looks like a robbery. Sightings alone, with the body still in its grave, would have been taken for visions.",
        ],
      },
      {
        heading: "The strongest reply",
        body: [
          "The strongest reply is Hume's, and it was never about the evidence. He imagined every historian of England agreeing that Queen Elizabeth died on the first of January 1600, was seen by her physicians and the whole court before and after her death, and after a month in the grave appeared again, took back the throne and governed for three years. Even then, he wrote, he \"should not have the least inclination to believe so miraculous an event.\" That is candid of him. It shows that in a case like this no testimony could move him, because the conclusion was fixed by a judgment, made in advance, about what kind of world this is.",
          "Part of that is right. The dead do stay dead, and the disciples knew it as well as Hume did, which is why they didn't believe the women. But the claim was never that a corpse revived by some natural process. Peter told the crowd in Jerusalem, \"God raised him up, loosing the pangs of death, because it was not possible for him to be held by it\" (Acts 2:24). As a natural event the resurrection is about as unlikely as anything can be. Whether it is unlikely as an act of God depends on whether there is a God, and that is a question history can't settle. It has its own page, \"Does God actually exist?\" If there is no God, some natural explanation must be true, however strained. If there is, the explanation that fits the evidence is no longer ruled out in advance.",
        ],
      },
      {
        heading: "What this does not prove",
        body: [
          "History can't prove the resurrection. Its tools are built to tell us what usually happens, and this is by definition what doesn't. What it can do is more modest. It won't carry anyone to faith, but it can move a person from dismissing the claim to weighing it. Matthew admits that when the eleven saw the risen Jesus on a mountain in Galilee, \"they worshiped him, but some doubted\" (Matthew 28:17). The Gospels didn't hide that doubt, and I don't need to either.",
          "You can weigh it all and still conclude it did not happen. That is a respectable place to stand. Reaching that conclusion without doing the work isn't, and that's where I lived for years. Paul didn't soften what follows if the body stayed in the grave: \"your faith is futile and you are still in your sins\" (1 Corinthians 15:17). The tomb sat in a city that wanted the movement dead and had only to produce a body. They never did. The matter was supposed to be closed on a Friday. It would not stay closed.",
        ],
      },
    ],
    sources: [
      { author: "N. T. Wright", title: "The Resurrection of the Son of God", year: "2003" },
      { author: "Michael R. Licona", title: "The Resurrection of Jesus: A New Historiographical Approach", year: "2010" },
      { author: "Dale C. Allison Jr.", title: "The Resurrection of Jesus: Apologetics, Polemics, History", year: "2021", note: "A Christian scholar who grants the skeptic more than most." },
      { author: "E. P. Sanders", title: "The Historical Figure of Jesus", year: "1993" },
      { author: "Michael F. Bird, Craig A. Evans and others", title: "How God Became Jesus", year: "2014" },
      { author: "David Hume", title: "Of Miracles", in: "Philosophical Essays concerning Human Understanding, later titled An Enquiry Concerning Human Understanding", year: "1748" },
      { author: "Gerd Lüdemann", title: "The Resurrection of Jesus: History, Experience, Theology", year: "1994", note: "A scholar who did not believe Jesus rose, arguing for visions." },
      { author: "Bart D. Ehrman", title: "How Jesus Became God", year: "2014", note: "The best popular case against." },
    ],
    essaySlug: "did-the-resurrection-happen",
    essayTitle: "Did the Resurrection Actually Happen?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "why-would-anyone-trust-the-bible",
    question: "Why would anyone trust the Bible?",
    paragraphs: [
      "Because the evidence for how the Bible was copied, collected and written is stronger than the rumors about it, and much of that evidence comes from skeptical scholars. We have what was written, with the uncertain places marked in the margins. The books were recognized by the churches over generations, not voted in by a council. Where the history can be checked, it has often held up. None of that proves the Bible's claims true. It clears away the bad reasons for dismissing it, and it leaves the real question standing: what to make of Jesus.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "The strongest critic is Bart Ehrman, and he deserves a hearing in his own terms, because he knows the manuscripts better than most of the Bible's defenders. He came from Moody Bible Institute and Wheaton College, studied at Princeton Theological Seminary under Bruce Metzger, and became an agnostic. In Misquoting Jesus (2005) he pointed out that no original manuscript of any book of the Bible survives, that every copy we have was made by hand from earlier copies, and that \"there are more variations among our manuscripts than there are words in the New Testament.\" In The Orthodox Corruption of Scripture (1993) he argued that scribes sometimes changed a passage to make it say more plainly what they already believed about Christ.",
          "Then there are the differences between the Gospels. In Mark 2:26 Jesus says David ate the bread of the Presence \"in the time of Abiathar the high priest,\" but 1 Samuel 21 names the priest as Ahimelech, Abiathar's father. Ehrman has said that verse was where his belief in a Bible without error began to give way. Put it all together and a careful skeptic has a fair case: if we can't be sure what the authors wrote, if the books were chosen late by the winners, and if the accounts disagree, the Bible is a poor source for anything that happened, let alone a miracle. Every fact in that paragraph is true, and a Christian loses nothing by admitting it. The question is what the facts add up to.",
        ],
      },
      {
        heading: "The case, step by step",
        body: [
          "This is a historical argument, not a deductive one. It comes in four steps, and each can be checked against evidence anyone can look up. The first three answer the skeptic's three charges. The fourth deals with the differences.",
          {
            kind: "A cumulative historical case",
            premises: [
              "The text we read is substantially the text that was written, and the places where it is uncertain are known and marked.",
              "The books of the New Testament were recognized by the churches over generations, not chosen late by a council.",
              "Where the Bible's history can be checked against outside evidence, it has often held up, and its central claim is one that could have been shown false.",
              "The Gospels differ the way independent witnesses differ, and they agree on the events that matter most.",
            ],
            conclusion: "The usual reasons for dismissing the Bible fail. What remains is the question the book itself presses: who Jesus is, and whether he rose.",
          },
          "The first step carries the most weight, because if it fails nothing else can be checked. It is also where the evidence is strongest.",
        ],
      },
      {
        heading: "The evidence",
        body: [
          "There are more than five thousand Greek manuscripts of the New Testament, whole or in part, and thousands more in early translations such as Latin, Syriac and Coptic. That is why the count of variants is so high: with that many copies, every slip counts, and most are spelling, word order or a skipped line. Set that beside the books historians trust every day. The first six books of Tacitus's Annals, one of our main sources for the emperor Tiberius, survive in a single medieval manuscript. The New Testament has a gap too, and nobody should hide it. The oldest piece, a scrap of John's Gospel about the size of a credit card now in Manchester, is commonly dated to the second century, and the oldest complete New Testament, Codex Sinaiticus, was copied in the fourth. But it is a gap of generations, not many centuries, and the early papyri and the great fourth-century copies carry substantially the same text. The Old Testament tells the same story. Before 1947 the oldest complete Hebrew Bible was the Leningrad Codex, copied in 1008. Then the caves near Qumran gave up a complete scroll of Isaiah usually dated to the second century before Christ, about a thousand years older, and most of its differences from the later text are spelling and small points of grammar.",
          "The uncertain places aren't hidden. Open a modern Bible to the end of Mark or to John 8 and a note tells you the earliest manuscripts lack those passages. The plainest statement of the Trinity in the King James Version, 1 John 5:7, is not in the early Greek manuscripts. Erasmus left it out of his printed Greek New Testament in 1516 and added it in 1522, and most modern translations, made by scholars who confess the Trinity, have taken it out again. The doctrine never rested on it. Ehrman himself, in an appendix to Misquoting Jesus, said his position did not stand at odds with Metzger's, that \"essential Christian beliefs are not affected by textual variants in the manuscript tradition of the New Testament.\"",
          "On the second step: the Council of Nicaea in 325 argued about whether the Son is fully God. It didn't draw up a list of books. Around 180, Irenaeus of Lyon could treat four Gospels, no more and no fewer, as settled. Paul's letters were read as Scripture even earlier; 2 Peter sets them beside \"the other Scriptures\" (2 Peter 3:16). The first list we know of with exactly our twenty-seven books comes from Athanasius of Alexandria in 367, and the arguments over books such as Hebrews, James and Revelation were held in the open and written down by the church's own historians.",
          "On the third: Luke says he \"followed all things closely for some time past\" in order to write \"an orderly account\" (Luke 1:3), and he dates his story the way ancient historians did, \"in the fifteenth year of the reign of Tiberius Caesar, Pontius Pilate being governor of Judea\" (Luke 3:1). Claims like that can be tested. In 1961 a stone at Caesarea Maritima was found inscribed with Pilate's name and his title, prefect of Judea. An inscription at Delphi puts Gallio's term in Achaia around AD 51 to 52, the setting of Paul's hearing in Acts 18:12. An Aramaic inscription from Tel Dan, found in 1993, mentions the \"House of David.\" Writers outside the church confirm the center. Tacitus, early in the second century and with no sympathy for the movement, recorded that \"Christus, from whom the name had its origin, suffered the extreme penalty during the reign of Tiberius at the hands of one of our procurators, Pontius Pilatus.\" Josephus, a Jewish historian writing in the 90s, mentions \"the brother of Jesus, the so-called Christ, James by name.\" And Paul, writing to Corinth in the mid-50s, passes on a summary of the faith he had himself received (1 Corinthians 15:3-7), naming witnesses, \"most of whom are still alive\" (1 Corinthians 15:6). That is a claim made where it could be checked.",
          "On the fourth: the Gospels do differ. Matthew has an angel sitting on the stone, Mark a young man inside the tomb, Luke two men in dazzling clothes, and John tells it through Mary Magdalene. The church always knew this. Around 400 Augustine wrote a long work on the agreement of the Gospels, answering critics who had spotted the same differences, and when Tatian wove the four into one smooth account in the second century, the church in the end kept the four that don't line up perfectly. Independent witnesses to a confusing morning usually differ at the edges, and investigators grow suspicious when they agree too neatly. These differ on the angels. They don't differ on the crucifixion, the burial, the empty tomb or the appearances. All four put women first at the tomb, in a world where, as Josephus summarized the law, a woman's testimony was not to be admitted in court. People inventing evidence edit that out.",
        ],
      },
      {
        heading: "The best reply, and an answer",
        body: [
          "The strongest reply goes like this: grant all of it. A text can be copied perfectly and still be legend. Luke can have Pilate right and the resurrection wrong. That's fair, and I accept it. Careful copying and accurate background don't make a miracle true. But they do change what kind of document we're holding. Most scholars now read the Gospels as ancient biographies, the kind of Lives that Greek and Roman readers knew, and Richard Burridge's What Are the Gospels? (1992) is the study that turned that view into the consensus. Most critical scholars date Mark around 70, within the lifetime of people who had known Jesus, and Paul's letters are earlier still. So the question isn't whether a late, garbled myth can be trusted. It's what to make of early testimony, with names attached, about a crucifixion everyone agrees happened and a resurrection its witnesses were willing to die for. That question has its own page.",
          "The second reply is Ehrman's own: if the Bible can be wrong in one place, how do you know it's right in any? That only bites if trusting the Bible stands or falls with winning every argument about every verse. Many evangelical churches confess that Scripture is without error, and the careful modern statement of that conviction, the Chicago Statement of 1978, says it is not negated by \"the topical arrangement of material, variant selections of material in parallel accounts, or the use of free citations.\" Other churches that also confess Scripture as the word of God put the conviction differently, and faithful Christians still divide over which wording is right. That is a family argument among Christians. It isn't the same question as whether the Gospels are a reliable witness to Jesus, and the two shouldn't be confused. Mark 2:26 still has no explanation everyone accepts. I can live with that, the way a historian lives with a hard passage in any good source.",
        ],
      },
      {
        heading: "What this does not prove",
        body: [
          "None of this proves the Bible is the word of God. It shows that the book is what it presents itself as: a carefully kept record, written close to the events, by people who expected to be checked. It doesn't touch the hardest reason many people distrust it, which isn't that the words were changed but that they weren't: laws that regulate slavery, commands in Joshua to destroy whole towns. Those questions have pages of their own, and they deserve more than a paragraph.",
          "The first Christians couldn't have trusted Jesus because of the New Testament, since they didn't have one. They trusted him because they believed God had raised him, and then they received the Scriptures the way he did, as the book that bears \"witness about me\" (John 5:39). Some of the distrust of the Bible was earned, though not by the book. We who defend it loudly often read it very little and quote it most when it agrees with us. The two on the road to Emmaus had heard the Scriptures all their lives; what they lacked was the one who could open them (Luke 24:27). You can settle every question about Abiathar and still have to decide what to do with him. Read one Gospel whole, the way you would read any ancient source, and argue with the book instead of with a rumor about it.",
        ],
      },
    ],
    sources: [
      { author: "Bart D. Ehrman", title: "Misquoting Jesus", year: "2005", note: "The best popular case against." },
      { author: "Bart D. Ehrman", title: "The Orthodox Corruption of Scripture", year: "1993" },
      { author: "Bruce M. Metzger and Bart D. Ehrman", title: "The Text of the New Testament", year: "4th ed., 2005" },
      { author: "Bruce M. Metzger", title: "The Canon of the New Testament", year: "1987" },
      { author: "Richard A. Burridge", title: "What Are the Gospels?", year: "1992" },
      { author: "Richard Bauckham", title: "Jesus and the Eyewitnesses", year: "2006" },
      { author: "Peter J. Williams", title: "Can We Trust the Gospels?", year: "2018" },
      { author: "K. A. Kitchen", title: "On the Reliability of the Old Testament", year: "2003" },
    ],
    essaySlug: "why-trust-the-bible",
    essayTitle: "Why Would Anyone Trust the Bible?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "if-god-is-good-why-suffering",
    question: "If God is good, why is there so much suffering?",
    askedAs: "why does god allow suffering why does god let people suffer why do bad things happen to good people pain evil",
    paragraphs: [
      "Suffering does not disprove God, but it is the strongest reason people give for not believing, and it deserves an argument, not a slogan. The claim that evil makes God impossible has largely been given up, even by atheist philosophers. The claim that evil makes God unlikely is serious and still argued, and its key step, that suffering we can see no reason for probably has none, is weaker than it looks. Neither argument is answered by an explanation of your suffering, and I don't have one. What Christianity offers is something else: a God who entered suffering, and a promise about how it ends.",
    ],
    sections: [
      {
        heading: "The objection at full strength",
        body: [
          "The argument is old. It's usually credited to Epicurus, but it survives because a Christian teacher, Lactantius, quoted it early in the fourth century in order to answer it: \"if He is both willing and able, which alone is suitable to God, from what source then are evils? or why does He not remove them?\" Fourteen centuries later David Hume had a character in his Dialogues remark that \"Epicurus's old questions are yet unanswered.\"",
          "Modern philosophers gave it two forms. In 1955 J. L. Mackie argued in the journal Mind that the three claims \"God is omnipotent,\" \"God is wholly good\" and \"evil exists\" cannot all be held together. In 1979 William Rowe made a more modest and more dangerous case. He asked his readers to imagine a fawn caught in a forest fire started by lightning, horribly burned, lying in terrible agony for several days before it dies. Darwin had felt the same weight in an 1860 letter to the botanist Asa Gray, unable to persuade himself that a good and all-powerful God would have designed wasps that feed inside the living bodies of caterpillars. And Dostoevsky, a believer himself, gave the protest its human face. Ivan Karamazov tells his brother about children tortured by adults and says no final harmony is worth it: \"It's not God that I don't accept, Alyosha, only I most respectfully return Him the ticket.\"",
          "I grant what's true in all this, and it's a lot. The suffering is real, much of it looks pointless from where we stand, and some of the answers Christians reach for first are worse than silence. Telling a grieving mother that everything happens for a reason isn't theology. It's the mistake of Job's friends, and God rebuked them for it: \"you have not spoken of me what is right, as my servant Job has\" (Job 42:7).",
        ],
      },
      {
        heading: "Two arguments, laid out",
        body: [
          "It helps to separate the two forms, because they succeed or fail in different places.",
          {
            kind: "The logical argument (after Mackie, 1955)",
            premises: [
              "If God exists, he is all-powerful and wholly good.",
              "A wholly good being eliminates every evil it can.",
              "An all-powerful being can eliminate every evil.",
              "Evil exists.",
            ],
            conclusion: "God does not exist.",
          },
          "The weight sits on the second premise. Alvin Plantinga answered it in God, Freedom, and Evil (1974): a good being might permit an evil if it is the price of a good it could not have any other way, and a world of creatures free to love, and so free to refuse, may be such a good. Plantinga didn't need to show this is God's actual reason, only that it's possible, because a contradiction has to be impossible. Most philosophers on both sides now think he succeeded. Mackie himself, in The Miracle of Theism (1982), allowed that the problem of evil does not, after all, show the central doctrines of theism to be logically inconsistent, and Rowe wrote that he didn't think anyone had succeeded in establishing so strong a claim. One honest note: Plantinga's answer assumes a view of freedom that many Christians in the Reformed tradition don't hold. They reject the logical argument on other grounds, that God may permit an evil for a greater good we cannot see.",
          {
            kind: "The evidential argument (Rowe, 1979, in my words, close to his)",
            premises: [
              "There probably is intense suffering, like the fawn's, that an all-powerful, all-knowing being could have prevented without losing some greater good or allowing some evil as bad or worse.",
              "A wholly good, all-knowing being would prevent any intense suffering it could, unless that would cost a greater good or allow an evil as bad or worse.",
            ],
            conclusion: "Probably there is no all-powerful, all-knowing, wholly good being.",
          },
          "Rowe himself called the argument valid, and it is. Everything turns on the first premise, and on the word \"probably.\" His reason for it is that we look at the fawn and can't think of any good its suffering serves. The step is from \"I can see no reason\" to \"there is probably no reason.\"",
        ],
      },
      {
        heading: "Where the evidential argument is weakest",
        body: [
          "Whether that step holds depends on whether we should expect to see the reason if there were one. The philosopher Stephen Wykstra pressed this point in 1984, and it has shaped the debate since. Put it with an example of my own. If I look into my garage and see no car, I can be confident there's no car. If I look and see no flea, I can't, because I wouldn't expect to see a flea even if one were there. If God exists, the distance between his mind and ours is far greater than the distance between my eyes and a flea. The reasons of a being who sees the whole of history are not the kind of thing we should expect to spot from inside one afternoon of it.",
          "The Bible tells exactly that kind of story. In Job the reader is shown a reason for Job's suffering in the first two chapters, a scene in the heavenly court, and Job is never told it. When God finally speaks, he gives Job no explanation at all, only questions about the foundations of the earth, the lion hunting its prey and the young ravens crying for food. Job shows, inside Scripture, that a person can suffer for a reason that exists and is never told to him.",
        ],
      },
      {
        heading: "The strongest reply, and an answer",
        body: [
          "A skeptic has a good reply to this, and I want to put it fairly. If we can't judge whether God has reasons for the fawn, how can we judge anything about God? Haven't you made his goodness impossible to test? And if any horror might serve a hidden good, why should I stop a child from being hurt? That reply has real force, and I don't think it's fully answered. But two things can be said. First, the ignorance claimed here is narrow. It isn't that we know nothing about right and wrong. It's that we don't know every good an infinite mind might be weighing. Knowing that God has purposes has never licensed Christians to stand back. Jesus came to the grave of his friend Lazarus already intending to raise him, and still, \"Jesus wept\" (John 11:35). Second, Christians don't read God's goodness off the balance sheet of the world at all. They learn it from a particular history: the cross and the empty tomb. If that history is true, it's the evidence that counts most, and it has its own page.",
          "Christians, me included, often make one more move here, and it needs correcting. We say the skeptic's outrage borrows a moral standard a godless universe can't supply. As an answer to the argument, that fails. The argument is internal: it asks whether the believer's own God and the believer's own idea of goodness can stand together with this world, and the skeptic doesn't need to believe in objective good to ask it. What the point does show is this. If the argument succeeds and there is no God, the suffering is still there. It has only lost the name evil. The child's pain becomes a fact about matter in motion, and the protest that started the argument has nowhere left to stand. Every view of the world has to carry suffering. The question is which one can carry the protest too.",
        ],
      },
      {
        heading: "What this does not prove",
        body: [
          "None of this explains your suffering, or anyone's. At best it shows that God and evil are not contradictory, and that the case from pointless suffering is less certain than it feels. That's a long way short of comfort. C. S. Lewis wrote The Problem of Pain in 1940, and after his wife died in 1960 he published A Grief Observed under a made-up name. What he dreaded, he wrote, was not \"So there's no God after all,\" but \"So this is what God's really like.\" The philosopher Nicholas Wolterstorff, who knew these arguments better than I do, wrote Lament for a Son after his son died in a climbing accident, and he offered no theodicy at all. I find that honest. The arguments belong in the seminar room. They don't belong at the hospital bed.",
          "What Christianity offers there isn't an explanation but an event. The church confesses that God didn't stay outside the suffering. The Son became a man with a body that could be hurt, and he was tortured and killed. Standing with Mary as she wept for her brother, \"he was deeply moved in his spirit and greatly troubled\" (John 11:33). On the cross he prayed the first line of Psalm 22: \"My God, my God, why have you forsaken me?\" (Matthew 27:46). If he was raised, then suffering is real evil and it won't win. The Bible's last picture is of God himself: \"He will wipe away every tear from their eyes, and death shall be no more\" (Revelation 21:4). That doesn't tell a mother why. It tells her who has the last word, and that he has carried the wound himself.",
          "If you're reading this in the middle of it, you don't need an argument tonight. You need someone to sit with you, and Find Help has people you can call; in the US you can call or text 988 at any hour. I can't tell you why, and I'd be wary of anyone who says he can. Job never found out. But he was allowed to ask, and at the end he said, \"I had heard of you by the hearing of the ear, but now my eye sees you\" (Job 42:5). The hands that will wipe away every tear still carry the marks of the nails.",
        ],
      },
    ],
    sources: [
      { author: "J. L. Mackie", title: "Evil and Omnipotence", in: "Mind", year: "1955" },
      { author: "William L. Rowe", title: "The Problem of Evil and Some Varieties of Atheism", in: "American Philosophical Quarterly", year: "1979" },
      { author: "Alvin Plantinga", title: "God, Freedom, and Evil", year: "1974" },
      { author: "Daniel Howard-Snyder, ed.", title: "The Evidential Argument from Evil", year: "1996", note: "Both sides, by the philosophers who made the arguments." },
      { author: "Eleonore Stump", title: "Wandering in Darkness", year: "2010" },
      { author: "Fyodor Dostoevsky", title: "The Brothers Karamazov", year: "1880" },
      { author: "C. S. Lewis", title: "A Grief Observed", year: "1961" },
      { author: "Nicholas Wolterstorff", title: "Lament for a Son", year: "1987" },
      { author: "Bart D. Ehrman", title: "God's Problem", year: "2008", note: "The best popular case against, by a scholar who left the faith over suffering." },
    ],
    essaySlug: "if-god-is-good-why-suffering",
    essayTitle: "If God Is Good, Why Is There So Much Suffering?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "what-if-christianity-is-wrong",
    question: "What if Christianity is wrong?",
    paragraphs: [
      "If Christianity is wrong, everything falls. Paul said so himself: if Christ has not been raised, the faith is futile and the dead are simply dead. That's worth taking seriously, and I won't soften it. But the question cuts both ways. Not believing is also a way of living with the question, and it can be wrong too. Nobody gets to stand outside and wait for proof. So the fair question isn't whether you could be wrong. It's which risk you take with your eyes open, and whether the evidence gives you any reason to take this one. I think it does, and the faith tells you exactly where to check.",
    ],
    sections: [
      {
        heading: "The question at full strength",
        body: [
          "Start with the case for the other side, because it's strong. In 1877 the mathematician W. K. Clifford published an essay called \"The Ethics of Belief\" in the Contemporary Review. He told the story of a shipowner who quiets his own doubts about an old ship and sends it to sea full of emigrants. Clifford said the man is guilty whether the ship sinks or not, because he believed what he wanted, not what the evidence allowed. Then he stated a rule: \"It is wrong always, everywhere, and for anyone, to believe anything upon insufficient evidence.\" If the evidence for Christianity is thin, Clifford says, believing it anyway is a moral failure, however much comfort it brings.",
          "John Loftus, a former minister who became an atheist, added a second test in The Outsider Test for Faith (2013). Most people hold the religion of the place and family they were born into. A Christian looks at Hindu or Muslim belief with a skeptic's eye and finds it wanting. Loftus asks him to turn the same eye on his own faith, as an outsider would. That is a fair demand, and it hurts, because it's true that most of us didn't choose our first beliefs after weighing the options.",
          "And there's the answer Christians often reach for first, Pascal's wager, which deserves the criticism it gets. In the Pensées, published in 1670 after his death, Blaise Pascal urged the undecided to bet on God: \"If you gain, you gain all; if you lose, you lose nothing.\" J. L. Mackie, in The Miracle of Theism (1982), pressed two objections in his own words. There are more than two options on the table, since every religion can offer the same bet. And working yourself into a belief because it pays is a kind of self-deception. I grant both. If the only reason to be a Christian were that it's a safe bet, Clifford would be right to call it a failure of honesty.",
        ],
      },
      {
        heading: "What kind of question this is",
        body: [
          "\"What if Christianity is wrong?\" sounds like one question, but it's two. One is about evidence: is it true? The other is about decision: what should a person do while the evidence is still being weighed, which for most of us is the whole of life? The first is answered by history and argument, and other pages on this site take it up. This page is about the second, and about how it connects to the first. It isn't a proof. It's an argument about what honesty requires when a question can't be avoided and can't be settled beyond doubt.",
        ],
      },
      {
        heading: "The argument, laid out",
        body: [
          "In 1896 the American philosopher William James answered Clifford in a lecture called \"The Will to Believe\". He didn't say evidence doesn't matter. He said that some choices are what he called genuine options: live (both answers are real possibilities to you), forced (there's no third way of avoiding the choice), and momentous (the stakes are large and the chance won't come again). For choices of that kind, and only those, he wrote: \"Our passional nature not only lawfully may, but must, decide an option between propositions, whenever it is a genuine option that cannot by its nature be decided on intellectual grounds.\" Here is the argument as I would put it.",
          {
            kind: "An argument about deciding under uncertainty (after William James, 1896, in my words)",
            premises: [
              "Whether Christianity is true is, for many people, a live, forced and momentous question: refusing to decide means living as if it is false.",
              "The evidence on the question is real but does not compel a conclusion either way. Thoughtful people who have weighed it come down on both sides.",
              "Where a question is forced and momentous and the evidence doesn't settle it, a person may rightly decide with more than the evidence alone, so long as he keeps looking at the evidence.",
            ],
            conclusion: "Neither belief nor unbelief is the safe default. Both are commitments made under risk, and the honest question is not \"could I be wrong?\" but \"which risk am I taking, and on what grounds?\"",
          },
          "The weight sits on the third premise, and Clifford would deny it. But look at the first. The agnostic says he isn't betting, only withholding. James's point is that in a forced option, withholding has the same result as saying no. You can suspend judgment about a distant galaxy and lose nothing. You can't suspend judgment about whether to pray, whether to forgive as one who has been forgiven, or what you will tell your children death is, without in fact living one answer. So I'd put it this way: Clifford's rule works for shipowners and scientists, where you can wait for more evidence before you act. It doesn't work where waiting is itself the act.",
        ],
      },
      {
        heading: "Where Christianity could be shown wrong",
        body: [
          "Here is the part that separates this from Pascal. Christianity doesn't present itself as a safe bet. Pascal said that if you believe and turn out to be wrong, you lose nothing: \"You will be faithful, honest, humble, grateful, generous, a sincere friend, truthful.\" Paul says almost the opposite. \"If in Christ we have hope in this life only, we are of all people most to be pitied\" (1 Corinthians 15:19). He stakes everything on one event: \"And if Christ has not been raised, then our preaching is in vain and your faith is in vain\" (1 Corinthians 15:14). Few faiths name the fact that would sink them. This one does, and it's a public fact about a particular man in a particular city, not a private feeling.",
          "So the decision James describes isn't made in the dark. The evidence that bears on it is historical, and it can be weighed by an outsider, which is exactly what Loftus asks for. Within a few years of the crucifixion, the men who had run away were saying they had seen him alive, and some of them were killed for it. Acts records that Herod \"killed James the brother of John with the sword\" (Acts 12:2). The Jewish historian Josephus, writing in the 90s, tells of the stoning of \"the brother of Jesus, who was called Christ, whose name was James\" around 62 (Antiquities 20.200). A letter from the church in Rome late in the first century, which we call 1 Clement, says that Peter and Paul died as martyrs. The evidence for how most of the other apostles died is later and less certain, and I won't lean on it.",
          "This doesn't prove they were right. People die for false beliefs all the time. What it shows is that they weren't lying: men don't die for a story they know they made up. That narrows the options to the ones the resurrection page weighs, that they were mistaken in some way, or that they saw what they said. Scripture doesn't hide that the first witnesses doubted. Thomas refused to believe until he could touch the wounds, and the risen Christ said to him, \"Put your finger here, and see my hands; and put out your hand, and place it in my side. Do not disbelieve, but believe\" (John 20:27). A faith that wanted to be shielded from evidence wouldn't tell that story about its own apostle.",
        ],
      },
      {
        heading: "The strongest reply, and an answer",
        body: [
          "The best reply a skeptic can make is that James's argument proves too much. If your passions may decide any forced and momentous question the evidence leaves open, then a Muslim, a Mormon and a Hindu may each decide for his own faith on the same grounds, and James has given everyone permission to believe what he already wanted to. That's the many-gods objection to Pascal in a new coat, and it has real force. I don't think it's fully answered.",
          "Two things can be said. First, James never claimed his argument picks the right faith. It only shows that believing isn't a failure of honesty when a question is genuinely open and you can't avoid it. Which faith, if any, is true goes back to evidence, and that's where the outsider test belongs. I accept the test. The Christian claim is unusually open to it, because it rests on what happened in Jerusalem in the spring of about 30 or 33, not on a private revelation no one else can check. Second, the outsider test applies to unbelief too. A secular person raised in a secular family, who finds religion strange because everyone around him does, also holds the beliefs of his time and place. The historian Tom Holland argues in Dominion (2019) that many of the convictions a secular Westerner takes as plain common sense, that the weak and the poor have worth, came into the West through Christianity. If he's right, then the outsider test asks unbelief a hard question as well: whether the values it lives by can stand once the faith they grew from is gone.",
        ],
      },
      {
        heading: "What this does not prove",
        body: [
          "None of this shows that Christianity is true. It shows that believing it isn't the reckless bet Clifford describes, and that not believing isn't the neutral ground it feels like at two in the morning. To say the universe has no meaning, that love is chemistry, that justice is a preference, is to hold claims as large as any creed. Everyone is living by something he cannot prove. The skeptic bets his one life on the tomb staying shut, and the Christian bets his on it opening. Both bets are total, and thoughtful people on both sides know it.",
          "If Christianity is wrong, Paul is right that we are to be pitied, and I won't pretend there's a consolation prize. But the question doesn't have to frighten anyone who is willing to look. The father in Mark 9 brought his son to Jesus with half a faith and said so: \"I believe; help my unbelief!\" (Mark 9:24). Jesus healed the boy anyway. Honest doubt has a place at that table.",
          "The question might end a version of your faith, the sheltered one that was always going to break. Let it. Then go and look at the tomb, the way Thomas did. You may find you can't get the stone to stay in front of it.",
        ],
      },
    ],
    sources: [
      { author: "Blaise Pascal", title: "Pensées", year: "1670" },
      { author: "W. K. Clifford", title: "The Ethics of Belief", in: "Contemporary Review", year: "1877", note: "The classic case that believing without sufficient evidence is wrong." },
      { author: "William James", title: "The Will to Believe", year: "1896" },
      { author: "J. L. Mackie", title: "The Miracle of Theism", year: "1982", note: "Its chapter on belief without reason answers Pascal and James." },
      { author: "N. T. Wright", title: "The Resurrection of the Son of God", year: "2003" },
      { author: "John W. Loftus", title: "The Outsider Test for Faith: How to Know Which Religion Is True", year: "2013", note: "The strongest case against: the test this answer accepts." },
      { author: "Tom Holland", title: "Dominion: How the Christian Revolution Remade the World", year: "2019" },
    ],
    essaySlug: "what-if-we-are-wrong",
    essayTitle: "What If Christianity Is Wrong?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "was-jesus-just-a-good-teacher",
    question: "Was Jesus just a good teacher?",
    paragraphs: [
      "No. He was a good teacher, and the best of what he taught has been admired by people who believed nothing else about him. But \"just a good teacher\" is the one view the earliest evidence makes hard to hold, because the teaching you admire and the claims you want to discard come from the same mouth, in the oldest sources we have, and his first followers, Jews who would die before bowing to an idol, were praying to him within a few years of his death. That leaves harder options than the comfortable one. Either he was right about who he was, or he was wrong about the thing he cared about most. Christians believe the first. What follows sets out why, and what the argument can't do.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "The good-teacher view has a distinguished history, and it deserves to be stated well. Thomas Jefferson admired Jesus as a moral teacher and doubted nearly everything else the Gospels said about him. In a letter to John Adams in October 1813 he described cutting the sayings he thought genuine out of the printed Gospels and arranging them, and said Jesus's own words were \"as easily distinguishable as diamonds in a dunghill.\" The book he finished around 1820, The Life and Morals of Jesus of Nazareth, leaves out the miracles and the claims to be divine, and ends at the tomb, with no resurrection. Plenty of thoughtful people still hold Jefferson's Jesus: a wise Jewish teacher whose followers later made him into a god.",
          "Modern scholarship gives that view a sharper edge. The boldest claims, such as \"before Abraham was, I am\" (John 8:58), come from John, the Gospel most critical scholars treat as the latest and the most shaped by later reflection. Bart Ehrman, an agnostic New Testament scholar, argues in How Jesus Became God (2014) that Jesus did not call himself God, and that his followers came to call him divine only after they came to believe he had been raised. On that account the high claims are the church talking, not Jesus.",
          "There is an older and harder form still. In 1906 Albert Schweitzer published the book known in English as The Quest of the Historical Jesus. He argued that the Jesus of history was neither a gentle moralist nor the Christ of the creeds, but a prophet who expected the world to end soon and was wrong. That is a serious picture, and it is not a lunatic or a liar. It is a sane, sincere man mistaken about the end of history.",
          "I concede two things. First, C. S. Lewis's famous argument, that Jesus must be a liar, a lunatic or the Lord, is often used too quickly, as if legend and honest mistake were not options. They are, and they have to be met. Second, an argument that rests on the sayings in John alone will not persuade anyone who doubts John. So I won't rest it there.",
        ],
      },
      {
        heading: "What kind of case this is",
        body: [
          "This is a historical argument, an inference to the best explanation. It doesn't prove that Jesus is God. It asks what best explains the evidence a historian would use, the earliest Gospel, Mark, the sayings that Matthew and Luke share, and Paul's letters, which are older than any of the Gospels. The question is narrower than it looks: whether \"a good teacher, and no more\" fits that evidence. I think it fits worse than any of the alternatives.",
        ],
      },
      {
        heading: "What the earliest sources have him say",
        body: [
          "Leave John aside and read Mark, the Gospel most scholars date earliest. Early in it Jesus tells a paralyzed man, \"Son, your sins are forgiven.\" The scribes hear it the way it was meant: \"Why does this man speak like that? He is blaspheming! Who can forgive sins but God alone?\" (Mark 2:5-7). A teacher can tell you God forgives. He can't forgive what was done against someone else, unless he is the one every sin is finally against. In the same chapter he calls himself \"lord even of the Sabbath\" (Mark 2:28), the day God himself gave.",
          "The teaching people admire most has the same voice. In the Sermon on the Mount he quotes the law given at Sinai and sets his own word beside it: \"You have heard that it was said ... But I say to you\" (Matthew 5). The prophets said, \"Thus says the LORD.\" He said, \"I say.\" And at his trial in Mark, when the high priest asks whether he is the Christ, the Son of the Blessed, he answers, \"I am, and you will see the Son of Man seated at the right hand of Power\" (Mark 14:62), and they condemn him for blasphemy.",
          "Scholars argue over which of these sayings go back to Jesus in exactly these words, and that argument is fair. But the argument doesn't need every saying. It needs the pattern, and the pattern runs through every layer of the sources, not just the latest. Lewis's point holds: no merely wise teacher talks that way. Take away the claims and you have to take away the teaching that carries them, and what is left is not Jefferson's teacher. It's a shape cut out of the Gospels with scissors.",
        ],
      },
      {
        heading: "The legend objection, and the speed of worship",
        body: [
          "The trilemma's largest hole is legend. Maybe a later church put the high claims in a humble rabbi's mouth, and for a long time that was the scholarly default: devotion to Jesus as divine grew slowly, the story went, as the faith moved out into the pagan world and borrowed its habits of worshiping lords and heroes. But legend needs time, and the time has been taken away. Here is the argument, step by step.",
          {
            kind: "A historical argument, an inference to the best explanation",
            premises: [
              "Within about twenty-five years of Jesus's death, and in prayers older than that, communities of his followers, Jewish believers among them, prayed to him, sang of him and set him inside their confession of the one God.",
              "The Jews of that time held that worship belongs to the one God alone, and would not give it to anyone else.",
              "A change that large, that early, among those people needs a cause at the start, not a slow drift over generations.",
            ],
            conclusion: "The high view of Jesus didn't grow up late. It began with his first followers, and the likeliest causes are what Jesus himself claimed and what they believed happened after his death.",
          },
          "The first step carries the weight, and the evidence for it is in Paul, writing in the 50s. At the end of a letter to Greek-speaking Christians in Corinth he leaves an Aramaic prayer untranslated, Marana tha, \"Our Lord, come\" (1 Corinthians 16:22). A prayer in Aramaic, the language of Jesus's first followers in Judea, used without explanation in a Greek city, points back to the earliest churches, and it is addressed to Jesus. In the same letter Paul takes the confession every Jew said daily, that the LORD is one, and writes, \"yet for us there is one God, the Father, from whom are all things and for whom we exist, and one Lord, Jesus Christ, through whom are all things and through whom we exist\" (1 Corinthians 8:6). The New Testament scholar Richard Bauckham argues, in Jesus and the God of Israel (2008), that Paul has placed Jesus inside the one God's own confession. Some scholars read the verse differently, and that debate is real. In Philippians 2 Paul goes further, taking words that in Isaiah 45:23 the God of Israel speaks of himself alone and saying that at the name of Jesus \"every knee should bow\" (Philippians 2:10).",
          "The historian who did most to establish all this is Larry Hurtado. In Lord Jesus Christ (2003), building on One God, One Lord (1988), he argued that devotion to Jesus as divine began very early among his Jewish followers, not late or by pagan influence, that it had no real parallel in the religion of the time, and that it happened inside a faith that refused to worship anyone but God. Devotion that high, that fast, among those people doesn't behave like a legend.",
          "The second step is common knowledge about the period, and the third is where a skeptic can push. Ehrman's reply is the strongest. He agrees that Christians exalted Jesus very early, but holds that what they first believed was that God had raised a man to a high place, a lesser kind of divinity than the creeds later confessed. That is a real reading, and I won't pretend Paul wrote the language of Nicaea. But the words Paul reaches for are the words Israel kept for the one God, the Shema and Isaiah's words about every knee bowing to God alone, and he uses them of Jesus without apology, writing to churches that already prayed to him. Whatever happened, it happened at the beginning.",
        ],
      },
      {
        heading: "The options that remain",
        body: [
          "Now Lewis's argument can be stated fairly. In Mere Christianity (1952) he wrote, \"A man who was merely a man and said the sort of things Jesus said would not be a great moral teacher.\" He would be, Lewis went on, either a lunatic or something worse. Put with the honest options added, it runs like this. If Jesus made the claims the earliest sources give him, then he was lying, or he was sincerely mistaken, or he was right.",
          "Lying is hard to believe of the man who taught the Sermon on the Mount, and frauds do not die for the con when recanting would save them. Mistake is the serious option, and Schweitzer's prophet is its best form. But notice what it gives up. It is no longer the good-teacher view. It grants that Jesus said what the sources say, and holds that he was wrong about the thing he cared about most, his own place in what God was doing. That might be true. It isn't the comfortable middle position people reach for. It's a verdict that he was a great man fundamentally deceived about himself.",
          "Which leaves the question where Ehrman himself puts the hinge: what his followers came to believe happened after his death. If Jesus was raised, the claims were vindicated. If he wasn't, the mistaken prophet is the best account left. That is a question of history, and \"Did the resurrection actually happen?\" weighs it in full.",
          "I held the comfortable view, and it was a place to file him more than a conclusion. It let me honor a man without obeying him. The one reply he has made unavailable is the one most people reach for first.",
        ],
      },
      {
        heading: "The best reply, and what this does not prove",
        body: [
          "The strongest reply to everything above goes like this. You've assumed the Gospels report Jesus well enough to know what he claimed, but they were written by believers decades later, and believers shape what they remember. That is fair, and it's why the argument leans on Paul, whose letters are earlier than the Gospels and whose prayers and confessions were older than the letters. A skeptic can still say that even Paul's churches had twenty years or more to get Jesus wrong. That is a short time, though, for Jewish monotheists to begin praying to a dead rabbi, and it is shorter still if, as Paul says, he went up to Jerusalem and stayed fifteen days with Peter, whom he calls Cephas (Galatians 1:18).",
          "Here is what the argument doesn't prove. It doesn't prove Jesus is God. It doesn't settle which sayings go back to him word for word. It doesn't answer the mistaken-prophet view, which only the evidence about Easter can answer. What it shows is narrower and, I think, hard to escape. The good teacher who claimed nothing for himself is the least likely Jesus the evidence allows. The real choice is between a man who was wrong about himself and a man who was right.",
          "He put the question to his own followers on a road near Caesarea Philippi, after they had told him what other people said. \"But who do you say that I am?\" (Mark 8:29). Two thousand years haven't made it a smaller question, and nobody else can answer it for you.",
        ],
      },
    ],
    sources: [
      { author: "C. S. Lewis", title: "Mere Christianity", year: "1952" },
      { author: "Albert Schweitzer", title: "The Quest of the Historical Jesus", year: "1906; English translation 1910", note: "The case for a sincere prophet who was mistaken about the end." },
      { author: "Larry W. Hurtado", title: "One God, One Lord: Early Christian Devotion and Ancient Jewish Monotheism", year: "1988" },
      { author: "Larry W. Hurtado", title: "Lord Jesus Christ: Devotion to Jesus in Earliest Christianity", year: "2003" },
      { author: "Richard Bauckham", title: "Jesus and the God of Israel", year: "2008" },
      { author: "Bart D. Ehrman", title: "How Jesus Became God: The Exaltation of a Jewish Preacher from Galilee", year: "2014", note: "The best book against: Jesus did not claim to be God; his followers came to call him divine after Easter." },
      { author: "Michael F. Bird, Craig A. Evans, and others", title: "How God Became Jesus", year: "2014", note: "A reply to Ehrman." },
      { author: "Thomas Jefferson", title: "The Life and Morals of Jesus of Nazareth", year: "c. 1820", note: "The good-teacher view made with scissors." },
    ],
    essaySlug: "was-jesus-just-a-good-teacher",
    essayTitle: "Was Jesus Really Just a Good Teacher?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "do-i-have-to-choose-between-faith-and-science",
    question: "Do I have to choose between faith and science?",
    paragraphs: [
      "No. The long war between faith and science is a story told in the nineteenth century, and historians of science, believers and unbelievers alike, have taken it apart. But the war isn't the strong objection. The strong one is quieter: science keeps explaining what God was once used to explain, so maybe God is only the name for what we haven't figured out yet. I think that mistakes what Christians have meant by God, and I think the plain fact that science works at all points the other way. Christians still disagree about the age of the earth and about evolution, and this page leaves those questions open. What it argues is narrower. The laboratory and the creed aren't rivals.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "Start with the weak form of the objection, so it can be set aside. In 1874 John William Draper published a History of the Conflict between Religion and Science, and in 1896 Andrew Dickson White followed with A History of the Warfare of Science with Theology in Christendom. Between them they gave the modern world its picture of two armies, one marching toward the light and the other holding it back. It's the version most people meet, and it's mostly wrong.",
          "The strong form doesn't need a war. It goes like this. For most of history people explained thunder, plague, the paths of the planets and the fitness of living things by pointing to God or the gods. One by one those explanations were replaced by natural ones, and the replacements worked. When Darwin published On the Origin of Species in 1859, he gave a natural account of the most impressive example of all, the way living things fit their lives. Out of that success came the working rule of every laboratory: look for natural causes, and never write \"God did it\" in the results. The rule has worked so well that a fair-minded person can ask whether God is anything more than a placeholder for what we don't know.",
          "The biologist Jerry Coyne gives the sharpest version in Faith versus Fact (2015). He's careful to say he isn't claiming a strict logical contradiction. His charge is about method. Science has ways of testing a claim and finding out that it's wrong. Religion, he argues, holds its claims by faith, scripture and authority, and has no way to find out that it's wrong. On that account the two aren't partners. One of them is a way of knowing and the other isn't.",
          "I concede a lot of this. The church has sometimes fought science and lost, and deserved to. In 1633 the Roman Inquisition found Galileo \"vehemently suspect of heresy\" for holding that the earth moves around the sun, and he spent the rest of his life under house arrest. Christians have often put God in the gaps of what we know, and every time science filled a gap, God looked smaller. A God who is only an explanation for what we don't yet understand should be expected to shrink. He has.",
        ],
      },
      {
        heading: "What kind of case this is",
        body: [
          "There are two questions here. The first is historical, whether faith and science have actually been at war, and it can be checked against the record. The second is philosophical, whether the success of science makes belief in God less reasonable. That one I'll lay out in steps, the skeptic's argument and then my own, and I'll say which step carries the weight in each. None of this proves that God exists; that case has its own page, \"Does God actually exist?\" The aim here is smaller: to show that nobody has to pick a side.",
        ],
      },
      {
        heading: "The war is a story, not a finding",
        body: [
          "Historians of science have spent the last fifty years taking Draper and White apart, and not because they were defending the church. In 2009 the historian Ronald Numbers, described by one reviewer as a religious agnostic, edited a book for Harvard University Press called Galileo Goes to Jail and Other Myths about Science and Religion. In it he calls the idea of constant conflict \"the greatest myth in the history of science and religion.\"",
          "Galileo himself is a good example. He was a believer, and in 1615 he defended his work by quoting Augustine, who had written early in the fifth century, in The Literal Meaning of Genesis, that for an unbeliever to hear a Christian talking nonsense about the natural world was \"a disgraceful and dangerous thing.\" The church that condemned Galileo had forgotten one of its own best teachers.",
          "The record keeps breaking the war story. When the Cavendish Laboratory opened at Cambridge in the 1870s under James Clerk Maxwell, the physicist who unified electricity and magnetism, its oak doors carried a verse from the Psalms in Latin, by his wish: \"Great are the works of the LORD, studied by all who delight in them\" (Psalm 111:2). In 1927 Georges Lemaître, a Belgian physicist and a Catholic priest, argued that the universe is expanding, two years before Edwin Hubble's famous paper, and in 1931 he proposed that it began from what he called a primeval atom. In our own time John Polkinghorne left a Cambridge chair in mathematical physics to be ordained an Anglican priest in 1982, and Francis Collins, who led the Human Genome Project, wrote The Language of God (2006) about how he came to faith.",
          "None of that proves Christianity is true. Plenty of great scientists have been unbelievers. What it shows is that the war isn't a finding of science. It's a story about science, and a poor one.",
        ],
      },
      {
        heading: "The argument from the shrinking God",
        body: [
          "The strong objection survives all of that history. Here it is, as fairly as I can state it.",
          {
            kind: "The skeptic's argument, set out as a deductive argument",
            premises: [
              "If God exists, he is one of the causes inside nature, the kind of cause science looks for, needed wherever natural causes run out.",
              "Science keeps finding natural causes where people once saw God, and has every reason to expect to keep finding them.",
            ],
            conclusion: "The room for God keeps shrinking, and a reasonable person should expect it to reach nothing.",
          },
          "The second premise is true, and Christians should say so gladly. The weight sits on the first, and I think it's false. That isn't a move invented to escape the argument. It's what the church has taught for a very long time. Thomas Aquinas taught in the thirteenth century that God works through the causes he made, not in competition with them. An author is the cause of every line in a novel without being one of its characters. Scripture puts it more simply. Christ \"is before all things, and in him all things hold together\" (Colossians 1:17). On that view God isn't found where the explanations stop. He's the reason there are explanations at all.",
          "Dietrich Bonhoeffer saw the danger from a prison cell. In a letter of May 1944 he warned against using God as a stopgap for the unfinished parts of our knowledge, and wrote, \"We are to find God in what we know, not in what we don't know.\" About a decade later the physicist Charles Coulson made popular the name we still use for the mistake, the God of the gaps. Water boils because the molecules are agitated. The kettle is on because someone wanted tea. Both answers are true, and they don't compete.",
          "This cuts both ways, and I want to be honest about it. If God isn't found in the gaps, Christians can't argue for him from the gaps either. A believer who says \"science can't explain this, so God did it\" is making the skeptic's mistake in reverse. The fine-tuning argument on the God page isn't that kind of argument. It doesn't say physics can't explain something. It asks why physics is the way it is.",
          "Coyne's charge about method needs its own answer. He's right that a faith which can never be wrong isn't knowledge. But the center of Christianity isn't a claim held out of the reach of evidence. It's a claim about something that happened in a particular city in a particular decade, and the earliest Christian writer staked everything on it. If Christ has not been raised, Paul wrote, \"your faith is futile and you are still in your sins\" (1 Corinthians 15:17). That's a faith that can be wrong. The rule of the laboratory, look for natural causes, is a good rule for the laboratory. It can't tell you whether anything ever happened that natural causes don't explain. That's a question for history, and the resurrection has its own page.",
        ],
      },
      {
        heading: "Why science works at all",
        body: [
          "Now turn the question around and ask why science works in the first place. In 1936 Albert Einstein, who didn't believe in a personal God, wrote in an essay called \"Physics and Reality\": \"One may say 'the eternal mystery of the world is its comprehensibility.'\" His next sentence reads, \"The fact that it is comprehensible is a miracle.\" In 1960 the physicist Eugene Wigner wrote about how strangely well mathematics, worked out on paper, describes the physical world, and he ended by calling it \"a wonderful gift which we neither understand nor deserve.\" Neither man was arguing for God. Both saw something that needs explaining.",
          {
            kind: "An inference to the best explanation",
            premises: [
              "Science depends on two things it can't supply for itself: a world ordered by laws simple enough to be found, often in mathematics, and minds able to find them.",
              "If the world was made by a rational God who made human beings able to know it, both are what we would expect.",
              "If the world and our minds came from unguided processes alone, the order is simply a brute fact, and our ability to grasp it far beyond anything survival required is at least surprising.",
            ],
            conclusion: "The success of science fits belief in God at least as well as it fits unbelief, and I think better. It doesn't settle the question. It turns the objection around.",
          },
          "The third premise carries the weight, and the best reply to it is a serious one. Evolution, the skeptic says, would favor minds that track the world truly, because minds that get the world wrong get eaten, and a general intelligence built for hunting and planning can be turned to physics. I think that explains part of it. It explains less of the rest: why the deepest laws are written in mathematics, some of it worked out for its own beauty long before anyone knew it described anything, and why minds shaped to find food can follow the universe down to quantum fields. The philosopher Alvin Plantinga pressed this point in Where the Conflict Really Lies (2011). He argued that there is \"superficial conflict but deep concord\" between science and belief in God, and \"superficial concord but deep conflict\" between science and naturalism, the view that nature is all there is. His argument has drawn strong replies, and I wouldn't rest everything on its strongest form. But the direction of it seems right to me. Psalm 19 said it long before anyone built a laboratory: \"The heavens declare the glory of God, and the sky above proclaims his handiwork\" (Psalm 19:1).",
        ],
      },
      {
        heading: "Where Christians disagree",
        body: [
          "Some of the sharpest arguments over science aren't between believers and unbelievers. They're among Christians, and they're about the age of the earth and about evolution. Some Christians read the days of Genesis 1 as ordinary days and hold that the earth is thousands of years old. Some accept the long ages of the earth and the universe and hold that God acted directly at points in the history of life. Some hold that God made living things, human beings included, through the process of evolution, and that this is how he did what Genesis says he did. Each is held by believers who take Scripture seriously, and each has hard questions to answer. I won't settle that here, and nothing on this page depends on how it's settled. The page \"How should a Christian read Genesis 1?\" lays out the readings with more care. What I'd ask of all three, and of myself, is Augustine's discipline: know what the evidence says before you speak to it.",
        ],
      },
      {
        heading: "The best reply, and what this does not prove",
        body: [
          "The strongest reply to everything above goes like this. Fine, God isn't in the gaps. But then he makes no difference you could ever detect, and a God who makes no detectable difference is as good as no God. My answer is that Christians don't claim God makes no difference. We claim he makes a difference to the whole, that there is an ordered world at all and minds that can know it, and that he made one particular difference in history, on a Sunday morning outside Jerusalem, that can be weighed like any other event. If the arguments for the first fail and the evidence for the second falls apart, Christianity fails with them. Paul said as much himself.",
          "Here is what this page doesn't prove. It doesn't prove that God exists. It doesn't settle the age of the earth or the history of life. It doesn't excuse the times the church got the world wrong. It only clears away a false choice. You can trust the method that mapped the human genome and still ask the question that method was never built to answer.",
          "\"It is the glory of God to conceal things, but the glory of kings is to search things out\" (Proverbs 25:2). Science is that searching, and Christians have every reason to love it. But science hands you a magnificent description of the house. It can't tell you whether anyone lives there. That question doesn't go away when the lab closes for the night.",
        ],
      },
    ],
    sources: [
      { author: "Jerry A. Coyne", title: "Faith versus Fact: Why Science and Religion Are Incompatible", year: "2015", note: "The best book against: a biologist's case that the two cannot be reconciled." },
      { author: "Ronald L. Numbers, ed.", title: "Galileo Goes to Jail and Other Myths about Science and Religion", year: "2009", note: "Historians on the war story, one myth at a time." },
      { author: "Alvin Plantinga", title: "Where the Conflict Really Lies: Science, Religion, and Naturalism", year: "2011" },
      { author: "Francis S. Collins", title: "The Language of God", year: "2006" },
      { author: "Eugene P. Wigner", title: "The Unreasonable Effectiveness of Mathematics in the Natural Sciences", in: "Communications on Pure and Applied Mathematics", year: "1960" },
      { author: "Albert Einstein", title: "Physics and Reality", in: "Journal of the Franklin Institute", year: "1936" },
      { author: "Augustine", title: "The Literal Meaning of Genesis", year: "early 5th century; trans. John Hammond Taylor, 1982" },
      { author: "Dietrich Bonhoeffer", title: "Letters and Papers from Prison", year: "letters of 1943 to 1945" },
    ],
    essaySlug: "faith-and-science",
    essayTitle: "Do You Have to Choose Between Faith and Science?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "is-it-okay-to-be-angry-at-god",
    question: "Is it okay to be angry at God?",
    paragraphs: [
      "Yes. The prayer book of the Bible says so. Roughly a third of the Psalms are laments, raw complaints flung at God. How long, O Lord? Will you forget me forever? That is Psalm 13, not asking whether God has forgotten but asserting it. God gave us a songbook with the complaints left in and called it Scripture.",
      "Walter Brueggemann noticed that the church has dropped these psalms from its worship. The cut didn't make our faith more reverent, only dishonest. We taught people that the way to be close to God is to lie to him. But the lament is always addressed to God. There is an anger that walks out and an anger that stays in the room, and the second is faith holding on with bloodied hands. You don't rage at a God you've given up on. You rage at the one you are still holding to his promise.",
      "Jesus died with a lament on his lips: My God, my God, why have you forsaken me? That is Psalm 22. I have watched the anger last into the tenth year in people I did not consider faithless; I will not promise it resolves on a schedule. Anger isn't the opposite of faith. Walking away in silence is. You are still yelling at him, and so was his Son.",
    ],
    essaySlug: "what-psalms-teach-about-anger-at-god",
    essayTitle: "Is It Okay to Be Angry at God?",
  },
  {
    slug: "can-you-be-a-christian-without-church",
    question: "Can you be a Christian without going to church?",
    paragraphs: [
      "You can believe alone. The thief on the cross believed alone, and Jesus received him without a membership card. But believing alone and being a Christian alone aren't the same thing. The New Testament has no word for a Christian who belongs to no church; the category does not exist. Paul's image is a body part, and a hand on a table isn't a freer hand. It's a dying one.",
      "The strongest objection is accurate: the church that hurt you sounds nothing like the family in Acts 2 that sold its property to feed each other. You were promised a family and sold a service, and when the service disappointed, you were blamed for leaving, which is exactly backward. But the failures of the counterfeit do not abolish the original. You cannot be disappointed by a forgery unless you carry the image of the genuine article it failed to be.",
      "Bonhoeffer wrote that I cannot reliably speak the word of God to myself; a faith with no outside voice becomes a conversation with yourself. The loneliness of your private faith doesn't mean you've failed. A thing built for two or more aches when it runs on one. You can hold the faith by yourself. I just don't think it can hold you.",
    ],
    essaySlug: "can-you-be-a-christian-alone",
    essayTitle: "Can You Be a Christian on Your Own?",
  },
  {
    slug: "done-with-church-but-not-jesus",
    question: "What if I'm done with church but not with Jesus?",
    paragraphs: [
      "You are not rare, and you are not outside the reach of the God you still love. The Great Dechurching (2023) found around forty million American adults stopped attending church in the last quarter-century, and a large share did not deconvert. They still pray and still believe Jesus rose. They drifted. You aren't a problem for the church to solve. You're a person the church mostly failed to notice leaving.",
      "Your faith is plainly real. The question is whether a faith this real was ever meant to be carried alone. When crowds abandoned Jesus in John 6, Peter stayed: Lord, to whom shall we go? You have the words of eternal life (John 6:68). Peter never said that line alone. He said it beside eleven others who had also decided not to leave. The staying was personal, but it wasn't solitary.",
      "No one is asking you back into the room that hurt you; the thing you long for was never the room. But the faith you carry alone is a coal pulled from the fire, and a coal alone goes cold. I'm not blaming the coal. Jesus has never handed himself out one isolated soul at a time. He comes with a body attached, and the body is part of the gift.",
    ],
    essaySlug: "done-with-church-not-jesus",
    essayTitle: "What If You're Done With Church but Not With Jesus?",
  },
  {
    slug: "what-happens-after-deconstruction",
    question: "What happens after you deconstruct your faith?",
    paragraphs: [
      "The swept house does not stay empty. That is what happens. But first, the people deconstructing their faith are usually right about why. If you were handed a Christianity that was equal parts Jesus and a voting bloc, tearing it down isn't rebellion. It's closer to repentance. I built an atheism at nineteen and tore it down; I have held the hammer. Doubt, by itself, builds nothing.",
      "Derrida meant deconstruction as a way of reading, taking a text apart to see what it was built on, and somewhere we kept the taking-apart and dropped the reading-truly. Suspicion can tell you what to tear down; it cannot tell you what to do on a Tuesday in February. The choice to stop in the empty field is itself a faith, a faith in nothing in particular. The field gets occupied by whatever is strongest in the neighborhood.",
      "Jesus deconstructed the Pharisees relentlessly, but his demolition always had a destination, and that is the line between the prophet and the cynic. Keep tearing out the rot, but decide, while the hammer is still swinging, whether you are tearing toward anything and not only away. \"I believe; help my unbelief\" (Mark 9:24) is reconstruction in a single line. The field has no roof and the rain is coming. A hammer can take a house down, but it can't keep the rain off you.",
    ],
    essaySlug: "deconstruction-without-reconstruction",
    essayTitle: "What Happens After You Deconstruct Your Faith?",
  },
  {
    slug: "how-can-god-be-three-and-one",
    question: "How can God be three and one?",
    paragraphs: [
      "God is one in being and three in persons. The oneness and the threeness are not at the same level, so they do not collide. I made the math objection for years and was objecting to a cartoon: a god who was three of the same thing, which no one has ever taught. The church didn't flunk arithmetic. It refused to let arithmetic be the measure of God.",
      "The doctrine was forced on the church by its own evidence. The first Christians were Jews, the last people on earth who would invent a doctrine that multiplied God. Then they met a man who forgave sins and accepted worship, and the Spirit came, and he too was God. They could not let go of either truth. In 325 the council at Nicaea drew the line: the Son is of the same being as the Father, because only God can save you. Every analogy fails, whether water, clover, or sun, and the failure is a clue. There is nothing else like God.",
      "A solitary god could acquire love only by making something to love. The God of the creeds is love all the way down, and salvation is adoption into the family life of God. You aren't asked to master the Trinity. You're asked into that family.",
    ],
    essaySlug: "the-trinity-plainly",
    essayTitle: "How Can God Be Three and One?",
  },
  {
    slug: "should-a-christian-follow-a-political-party",
    question: "Should a Christian follow a political party?",
    paragraphs: [
      "Keep your convictions, but don't hand your conscience to a party. The first question isn't whether your politics are right. It's whether they're yours, reasoned from something prior, or received pre-formed from a tribe whose approval you needed.",
      "Capture happens in every party because it happens in every mind, mine included. We judge by intuitions tuned by the group and hire reasons after the fact. The right made the error in public. After 1979 a voter guide functioned as a catechism, and the cross was asked to ratify a politics it was never consulted on. The left tells the same lie in a different accent, and a herd that is sure it isn't a herd is the easiest to lead. The direction is different and the idolatry is the same.",
      "Try one test. Name the issue where you disagree with your own side, one that would cost you standing. No daylight anywhere between your conscience and your tribe's platform means you have a membership, not a conscience. Daniel kept a window open toward Jerusalem in defiance of the king's law (Daniel 6:10); he had not outsourced the window. The crowd is going to be wrong, yours and mine both, and that's why the window faces a different city.",
    ],
    essaySlug: "conscience-outsourced-to-party",
    essayTitle: "Should a Christian Follow a Political Party?",
    bookTitle: "When God Bless America Replaces Thy Kingdom Come",
    bookHref: "/books/when-god-bless-america",
  },
  {
    slug: "what-does-the-bible-say-about-money",
    question: "What does the Bible actually say about money?",
    paragraphs: [
      "The Bible treats wealth as a genuine good, a serious danger, and a thing you cannot finally serve alongside God, all three at once. Getting money wrong is almost always grabbing one of those truths and dropping the other two. Jesus spoke about money and possessions more than he spoke about heaven and hell combined.",
      "Scripture never says that wealth is evil. Abraham was rich; Job was rich, lost it, and was given more. The prosperity gospel distorts a real thread, and the guilt-ridden ascetic crashes against the text just as hard. The biblical ideal is neither poverty nor riches but a life of enough, with the surplus moving outward toward need. The famous verse is misquoted. Paul wrote that \"the love of money is a root of all kinds of evils\" (1 Timothy 6:10). The trouble is the grip, not the thing. Jesus went further: \"You cannot serve God and money\" (Matthew 6:24). He didn't say should not. He said cannot. Money is a rival god. It promises security, status, and freedom, the things only God can finally make good on.",
      "You cannot reason your way out of the love of money. You can only give your way out, one open-handed act at a time, until the fear that drove the clutching has lost its hold. The number only shows you what you already trust.",
    ],
    essaySlug: "what-the-bible-says-about-money",
    essayTitle: "What the Bible Actually Says About Money",
  },
  {
    slug: "what-does-the-bible-say-about-anxiety",
    question: "What does the Bible say about anxiety?",
    paragraphs: [
      "Jesus treats anxiety not as a mood to manage but as a belief about the universe that happens to be false. There is a Father. He runs the place. He feeds the birds, and you are worth more than a sparrow. Worry is a quiet declaration that he is not there, or cannot be trusted.",
      "The Sermon on the Mount puts money and worry in the same breath because both grow from one root: where you decided your security comes from. Dallas Willard called anxiety a failure to believe in the goodness and competence of God, a practical atheism that coexists with a Sunday faith. You don't defeat worry by fighting it. It shrinks when confidence in the Father crowds it out. The cure starts with order: \"But seek first the kingdom of God and his righteousness, and all these things will be added to you\" (Matthew 6:33). Then it has an address. You take the worry to a Father who already knows what you need (Philippians 4:6–7).",
      "I have checked the numbers in the dark; the next worry found the next number. He doesn't promise you will be rich. He promises you are seen, and fed, and worth more than the birds.",
    ],
    essaySlug: "what-jesus-said-about-worry-and-money",
    essayTitle: "What Jesus Said About Worry and Money",
  },
  {
    slug: "when-your-teenager-says-they-dont-believe",
    question: "What do I do when my teenager says they don't believe?",
    paragraphs: [
      "Don't argue them back, and don't grieve them gone. Both come from love, and both will fail. Treat what they said as the start of a conversation. What's being tested isn't the case for the resurrection. It's you, and whether your love was ever actually unconditional or only the reward for agreement.",
      "The argument loses even when it wins. Your teenager didn't present a thesis. They presented a relational test, and a debate says you would rather be correct than close to them. They are coming of age in a culture where belief is one contested option among many, which is not their personal failing. Much of what gets called deconstruction is a young adult taking apart a secondhand faith to find which parts are load-bearing, and sometimes that is the only way an inherited faith becomes a personal one. The prodigal's father does not meet the returning son with a doctrine exam. He runs (Luke 15:20).",
      "Listen long enough that they finish. Most teenagers have never been heard to the end on this by anyone who loves them. Grieve what you must, but don't make the child carry the grief. You can't argue your child into the kingdom. Keep the table set and the porch light on. This isn't the end of the story.",
    ],
    essaySlug: "teenager-losing-faith",
    essayTitle: "When Your Teenager Says They Don't Believe Anymore",
  },
  {
    slug: "is-jesus-the-only-way",
    askedAs: "other religions all religions the same exclusive narrow",
    question: "Is Jesus really the only way to God?",
    paragraphs: [
      "Yes. Christians confess that Jesus is the only way to God, and I confess it with them. Many people hear that as arrogance, and the charge deserves an honest answer rather than a shrug. Two things are worth seeing before anyone decides. Every view of the religions, the pluralist's included, makes a claim the others deny, so the real question isn't who is humble but what is true. And the Christian claim is narrower than it's usually heard. It says that whoever is saved is saved by Christ. It doesn't say it knows the fate of every person who never heard his name, and Christians hold more than one view about that. I'll set those views out fairly and leave the question where the creeds leave it, open.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "The question rarely arrives as a doctrine. It arrives as a face across the table, someone who buried a grandmother who prayed toward Mecca for sixty years, asking whether your God would send her to hell. Behind that face stands a serious argument, and its best defender was the philosopher John Hick. In God and the Universe of Faiths (1973) he called for what he named a Copernican revolution in theology. The old picture put Christianity at the center with the other faiths circling it. Hick put God at the center and had every faith, Christianity included, circling him.",
          "In An Interpretation of Religion (1989) he worked the idea out with care. There is one ultimate reality, which he called the Real, beyond the reach of any human concept. The great traditions are different human responses to it, each shaped by its culture, each speaking of God or of ultimate reality in its own terms. And each, as far as anyone can tell, does the same work in human lives, which Hick called the transformation of human existence \"from self-centredness to Reality-centredness.\" The saints of every tradition look more alike than their doctrines do.",
          "Hick added a fact that is hard to deny. The religion a person holds depends, in the great majority of cases, on where that person happened to be born. If salvation depends on believing the right thing, it seems to depend on the luck of birth, and a God who saved people by that kind of luck would not be just.",
          "I grant what is true here. Birthplace shapes belief. Christians have often carried this claim with contempt, and sometimes on the back of an empire. The goodness of Muslim, Jewish, Hindu and Buddhist neighbors is real. Scripture itself says that \"God shows no partiality\" (Acts 10:34). If the Christian claim required me to deny any of that, it would deserve the scorn it gets.",
        ],
      },
      {
        heading: "What kind of case this is",
        body: [
          "What follows isn't a proof that Christianity is true. It's three steps that clear the ground. The first is logical: can all the religions be right at once? The second is historical: what does the Christian claim rest on, and where would you go to test it? The third is theological: what does the claim actually say, and what does it leave unsaid?",
        ],
      },
      {
        heading: "Can every religion be right?",
        body: [
          "The religions don't only differ in style. They make claims about the same things, and some of those claims can't both be true.",
          {
            kind: "A deductive argument from contradiction",
            premises: [
              "The great religions make claims about the same matters that contradict each other. Christianity holds that Jesus of Nazareth died on a Roman cross and rose bodily from the dead. The Qur'an holds that he was neither killed nor crucified (Surah 4:157). Judaism holds that the Messiah has not yet come; Christianity holds that he has.",
              "Two claims that contradict each other about the same matter can't both be true.",
            ],
            conclusion: "At least some of the great religions are mistaken about something they hold central. No view of the religions, the pluralist's included, can call them all true as their own followers understand them.",
          },
          "The second premise is just logic. The weight sits on the first, and Hick saw it. His answer was that the doctrines aren't literally true. They are mythological: true in the sense that they move people toward the Real, not in the sense that they report what happened. That's a coherent position. But look at what it costs. It tells the Muslim that the Qur'an is wrong, taken literally, about the cross. It tells the Christian that the resurrection didn't happen as an event. Every believer at the table is told he has misunderstood his own faith, by a view that stands above all of them and sees what none of them can see.",
          "Lesslie Newbigin, who went to India as a missionary in 1936 and was a bishop there until 1974, put his finger on that in The Gospel in a Pluralist Society (1989), using the pluralist's favorite picture. In the old parable of the blind men and the elephant, each blind man grasps one part and mistakes it for the whole. Newbigin's point, in paraphrase, was that the story is told from the place of someone who isn't blind, who sees the whole elephant and can tell that each of the others has only a part. The parable makes the largest claim in the room. The theologian Gavin D'Costa pressed the same point in the journal Religious Studies in 1996, arguing that pluralism turns out to be one more exclusive view. Hick answered him the next year that pluralism is a philosophical hypothesis about the religions, not a rival religion. That's a fair distinction. But a hypothesis can be true or false like anything else, and this one holds that the central claims of every faith are false as their believers mean them.",
          "Alvin Plantinga took up the charge of arrogance in an essay of 1995, \"Pluralism: A Defense of Religious Exclusivism.\" The pluralist, he observed, also believes something that most of the world rejects and that he can't persuade them of, and he keeps believing it. If holding a belief others deny is arrogant, everyone is arrogant, and the charge says nothing. He turned the birthplace argument around the same way: had he been raised in Madagascar rather than Michigan, his beliefs would likely be different, and the same is true of the pluralist. Everybody at the table is making an exclusive claim. What's left to ask is which one is true.",
        ],
      },
      {
        heading: "What the Christian claim rests on",
        body: [
          "The Christian claim is not that Christians are better people, or that their religion is the best of the religions. It's a claim about something God did. The Nicene Creed confesses that the Son of God \"for us men and for our salvation came down from heaven,\" was crucified under Pontius Pilate and rose again on the third day. Paul writes, \"For there is one God, and there is one mediator between God and men, the man Christ Jesus\" (1 Timothy 2:5). When Peter first said there is \"no other name under heaven given among men by which we must be saved\" (Acts 4:12), he was a fisherman on trial, powerless before the council that had handed his teacher over to be killed. What scandalized people was where it put salvation: in a person you can only receive, and in no philosophy or bloodline.",
          {
            kind: "A conditional argument",
            premises: [
              "If God has acted in history to rescue people, that act happened at a particular time and place, through a particular person.",
              "Christianity claims that he did, in the life, death and resurrection of Jesus of Nazareth.",
            ],
            conclusion: "Then the question of the only way is not a question of which religion is the most humble or the most attractive. It's a question of history: whether that act happened. If it did, it is particular because history is particular, not because Christians are proud.",
          },
          "The second premise is where everything rests, and it can be tested. The claim is that Jesus was raised from the dead, and that is a historical question with its own page here, \"Did the resurrection actually happen?\" If he wasn't raised, Paul himself says the faith is \"futile\" (1 Corinthians 15:17), and you should leave it. If he was, then his own words carry a different weight. \"I am the way, and the truth, and the life. No one comes to the Father except through me\" (John 14:6) wasn't said to a crowd of rivals. It was said to a frightened friend. Thomas had just asked, \"Lord, we do not know where you are going. How can we know the way?\" (John 14:5). Jesus didn't answer with a method. He answered with himself.",
        ],
      },
      {
        heading: "What about those who never heard?",
        body: [
          "Here the creeds bind less than many people think. What they confess is that salvation is God's own work, done through Christ and no one else. They don't say how God deals with the person who lived and died where his name was never spoken. Christians who hold the same creed answer that in at least three ways. John Sanders, who set the views side by side in No Other Name (1992), points out that all of them agree that Jesus is the only Savior. They disagree about how a person comes to be saved by him.",
          "The first view, often called restrictivism, holds that a person must hear the gospel and put conscious faith in Christ in this life. Its strength is that it reads Paul's chain at face value: \"How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching?\" (Romans 10:14). That chain sent missionaries across every ocean. Ronald Nash makes the case in What About Those Who Have Never Heard? (1995). Its hard question is the grandmother's: would a just God hold people accountable for a name they never had the chance to hear?",
          "The second, inclusivism, holds that no one is saved apart from Christ, but that his work may reach some who never knew his name and who answered, in faith, the light God gave them. It points to Abraham, who \"believed the LORD, and he counted it to him as righteousness\" (Genesis 15:6) long before Jesus was born, and to Paul's Gentiles with the law \"written on their hearts\" (Romans 2:15). Clark Pinnock defended it in A Wideness in God's Mercy (1992), and Roman Catholic teaching since the Second Vatican Council, in Lumen Gentium (1964), holds something close to it for those who, through no fault of their own, don't know the gospel but seek God with a sincere heart. Its hard question is Romans 10 itself: why does Scripture press so hard on hearing and believing, if hearing isn't needed?",
          "The third holds that everyone will meet Christ and be able to answer him, at death or after it. It reads 1 Peter 3:19 and 4:6, where Christ proclaims to the spirits in prison and the gospel is preached to the dead, as a door the church shouldn't close. Gabriel Fackre argues for it in the same 1995 volume. Its hard question is Hebrews 9:27, which says that after death comes judgment, and the silence of most of Scripture about any later chance.",
          "I'm not going to tell you which of these to hold. Faithful Christians disagree, and the creeds don't settle it. What all three share is the Judge. Abraham stood before him and pressed: \"Shall not the Judge of all the earth do what is just?\" (Genesis 18:25). We were never handed the list. We were told who keeps it.",
        ],
      },
      {
        heading: "The best reply, and what this does not prove",
        body: [
          "The strongest reply goes like this. You've shown that somebody at the table has to be wrong. You haven't shown it isn't you. And the birthplace point still bites: you believe this mostly because of where you were raised. Both halves are fair. The first is why the argument above sends you to the evidence about Easter rather than claiming to settle it. The second is true of nearly everyone, believer and skeptic alike. Where a belief came from doesn't tell you whether it's true. It does tell each of us to check our belief against something outside the place we grew up in, and the resurrection is that kind of claim. It happened, if it happened, in public, in a city where it could be denied.",
          "Here is what the argument doesn't prove. It doesn't prove Christianity true; that rests on the resurrection. It doesn't show that other religions contain nothing true or good. Paul stood among the philosophers of Athens and quoted their own poets to them with approval (Acts 17:28). It doesn't make Christians better than their neighbors, and it gives no one the right to speak of another person's eternity as if they had read it. What it shows is narrower. The claim that all roads lead to God is not the humble alternative it looks like. It's one more road, with its own claim to see the whole.",
          "And the claim that was called arrogant is closer to Christianity's whole hope. If there is one way, it is not a ladder the clever or the well-born can climb. It's a person who came down. Refuse him if you must, but refuse him for being too particular, not for being proud. The question Thomas asked is still the honest one, and the answer he was given was not a doctrine about the religions. It was a man standing in front of him, a few hours from a cross.",
        ],
      },
    ],
    sources: [
      { author: "John Hick", title: "God and the Universe of Faiths", year: "1973", note: "The call for a Copernican revolution in theology." },
      { author: "John Hick", title: "An Interpretation of Religion", year: "1989", note: "The best book against: the full case for religious pluralism." },
      { author: "Gavin D'Costa", title: "The Impossibility of a Pluralist View of Religions", in: "Religious Studies", year: "1996" },
      { author: "John Hick", title: "The Possibility of Religious Pluralism: A Reply to Gavin D'Costa", in: "Religious Studies", year: "1997" },
      { author: "Alvin Plantinga", title: "Pluralism: A Defense of Religious Exclusivism", year: "1995", note: "In The Rationality of Belief and the Plurality of Faith (Cornell, 1995)." },
      { author: "Lesslie Newbigin", title: "The Gospel in a Pluralist Society", year: "1989" },
      { author: "John Sanders", title: "No Other Name: An Investigation into the Destiny of the Unevangelized", year: "1992" },
      { author: "John Sanders, Gabriel Fackre and Ronald Nash", title: "What About Those Who Have Never Heard? Three Views on the Destiny of the Unevangelized", year: "1995", note: "Three Christian views, each argued by its defender." },
      { author: "Clark H. Pinnock", title: "A Wideness in God's Mercy", year: "1992" },
    ],
    essaySlug: "is-jesus-really-the-only-way",
    essayTitle: "Is Jesus Really the Only Way?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "does-god-actually-exist",
    askedAs: "is there a god is god real proof evidence for god",
    question: "Does God actually exist?",
    paragraphs: [
      "God exists. I believe that, and I think the evidence makes believing it reasonable, not just comforting. I say it as a man who spent years sure no one was there. Nothing below forces anyone to agree, and I won't pretend it does. But three lines of reasoning, each open to inspection, point the same way: that anything exists at all, that the universe is fit for life, and that some things are really wrong. A fourth, the resurrection, is a question of history and has its own page. You can weigh all of it and still say no. What you can't honestly say is that there's nothing to weigh.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "Start with the other side, because it's stronger than most believers admit. David Hume's Dialogues Concerning Natural Religion, published in 1779 after his death, took apart the argument that the world looks designed. The likeness between a universe and a machine is weak, he argued; we have watched machines being made but never a universe, and even if the world had a maker, nothing in it tells us there is only one, or that he is good. When Darwin published On the Origin of Species in 1859, the most popular design argument of the day, William Paley's watch in Natural Theology (1802), lost most of its force for living things. The gaps where God used to stand kept closing. I concede all of that. A God brought in to fill a hole in our science should be expected to shrink, and he has.",
          "Bertrand Russell gave the deepest objection its plainest form. Debating the Jesuit philosopher and historian Frederick Copleston on BBC radio in 1948, he was pressed on why the universe exists at all, and he answered, \"I should say that the universe is just there, and that's all.\" Richard Dawkins added a second reply in The God Delusion (2006): a designer able to make a universe would have to be at least as improbable as the universe, so God explains nothing and you are left asking who designed the designer. Then there is the silence. J. L. Schellenberg argued in Divine Hiddenness and Human Reason (1993) that a perfectly loving God would not leave a sincere, open-minded person unable to believe in him, and such people plainly exist. Add suffering, which has its own page, and you have a serious case. A thoughtful person can rest in it, and many do.",
        ],
      },
      {
        heading: "What kind of case this is",
        body: [
          "None of what follows is a proof in the mathematician's sense, and that isn't a dodge. Almost nothing that matters is proved that way: not that other minds exist, not that the past was real, not that a historian has the cause of a war right. What I can offer is a cumulative case. Some of its parts are deductive, where if the premises are true the conclusion has to follow, and the only question is whether each premise is more believable than its denial. Others are inferences to the best explanation, where we ask which account makes the evidence least surprising. I'll lay out the three I think strongest, and for each one I'll say which premise carries the weight and where an honest person can get off.",
        ],
      },
      {
        heading: "First: why is there anything at all?",
        body: [
          "In 1714, in a short work called the Principles of Nature and Grace, Gottfried Leibniz set down what he took to be the first question we have a right to ask: why is there something rather than nothing? The argument built on that question is called the argument from contingency. I lean on it more than on the better-known argument that the universe had a beginning, because it doesn't need one. Thomas Aquinas, who gave the church its classic arguments for God, held that reason alone cannot show the world began in time; he believed it began because Scripture says so. This argument works even if the universe never had a first moment.",
          {
            kind: "A deductive argument from contingency",
            premises: [
              "Everything that exists has an explanation of its existence, either in the necessity of its own nature or in something outside it.",
              "The universe, all of space, time, matter and energy, does not exist by the necessity of its own nature. It could have been different, or not been at all.",
            ],
            conclusion: "The universe has its explanation in something outside it that exists by necessity and is not made of space, time or matter. That isn't yet the God of the Bible, but it is a large part of what every believer in one God means by the word.",
          },
          "The weight sits on the first premise, and Russell saw it. His answer was that the demand stops at the whole: each thing in the world may need explaining, but the world itself is just there. I think a reasonable person can accept the premise anyway, for a plain reason. We never accept \"just there\" anywhere else. The philosopher Richard Taylor asked his readers, in Metaphysics (1963), to imagine finding a large translucent ball in the woods. No one would think it simply exists for no reason, and making the ball the size of the universe doesn't make the question go away. It makes it bigger. Science itself runs on the conviction that things have explanations. Every account of reality has to stop somewhere. The atheist stops at a universe that happens to exist when it need not have. The theist stops at a being that could not fail to exist. I think the second is the better place to stop, but this is the step where an honest person can disagree.",
          "A related argument, the kalam, revived by William Lane Craig in 1979, adds that the universe began to exist. In 2003 the physicists Arvind Borde, Alan Guth and Alexander Vilenkin showed that any universe which has, on average, been expanding cannot be infinite in the past, though physicists still argue over whether quantum effects open a way around it. If the universe did begin, the contingency argument only gets stronger. It just doesn't depend on that.",
        ],
      },
      {
        heading: "Second: a universe fit for life",
        body: [
          "The second line is newer, and it comes from physics, not theology. Over the last century physicists have found that several numbers in the laws of nature, such as the strength of gravity and the energy of empty space, sit within narrow ranges that allow stars, chemistry and life, and that modest changes in many of them would leave a universe with nothing much in it. The sharpest case is the energy of empty space. Steven Weinberg, a Nobel laureate and an unbeliever, wrote in 1989 that the plainest calculation from physics puts it about 120 orders of magnitude, a one followed by 120 zeros, above what observation allows, so something has to cancel it to an astonishing precision. Martin Rees, the Astronomer Royal, who holds no religious belief, wrote a book on the subject, Just Six Numbers (1999). Fred Hoyle, who was no Christian either, wrote after his own work on how stars make carbon that a common-sense reading of the facts suggests a superintellect had monkeyed with physics. Neither man drew a believer's conclusion. Both saw the fact that needs explaining.",
          {
            kind: "An inference to the best explanation",
            premises: [
              "The values in the laws of nature that allow for life are a very small part of the range they could have had.",
              "If there is a God who means for there to be living, choosing creatures, a universe that allows for life is not surprising.",
              "If this is the only universe and its values fell out by chance, a universe that allows for life is very surprising.",
            ],
            conclusion: "The fitness of the universe for life is evidence for God over chance. It doesn't settle the question. It shifts the weight.",
          },
          "The third premise carries the weight, and there are two serious replies to it. The first is necessity: perhaps a deeper theory will show the numbers could not have been otherwise. Perhaps, though that would move the fine-tuning into the deeper theory without removing it. The second is the multiverse: if there are vast numbers of universes with different values, some will allow life, and we could only find ourselves in one of those. That is real physics, not a dodge, and Rees takes it seriously. But no other universe has been observed, and the philosopher Robin Collins has argued that any machinery proposed for making universes would need its own finely set laws to produce life-permitting ones at all, so the question moves up a level. The astrophysicists Geraint Lewis and Luke Barnes lay out the evidence and both explanations fairly in A Fortunate Universe (2016).",
          "As for Dawkins's question about the designer, an explanation doesn't have to be explained before it counts. An archaeologist who finds arrowheads can conclude that someone made them without knowing where the makers came from. And the God of the creeds isn't a very complicated machine inside the universe. He is the necessary being the first argument arrived at, which is why the two arguments belong together.",
        ],
      },
      {
        heading: "Third: goodness that binds us",
        body: [
          "The third line starts from something almost everyone believes and almost no one can live without. Torturing a child for fun is wrong, and it would still be wrong if every person on earth applauded it. That is what I mean by an objective moral fact: one that holds whatever anyone thinks.",
          {
            kind: "A deductive moral argument",
            premises: [
              "If there is no God, there are no objective moral duties: duties that bind us whatever we or our society think.",
              "There are objective moral duties.",
            ],
            conclusion: "There is a God, a source of goodness that is not our invention.",
          },
          "Most people grant the second premise, so the weight falls on the first, and here the best unbelieving philosophers divide, which is the telling part. J. L. Mackie, an Oxford philosopher and an atheist, argued in Ethics: Inventing Right and Wrong (1977) that objective values would be strange things, unlike anything else in the universe, and he gave them up. In The Miracle of Theism, published in 1982 after his death, he allowed that if such values did exist, they would be very unlikely to have arisen in the ordinary course of events without a god to create them. Erik Wielenberg, also an atheist, takes the other road and holds that the basic moral facts are simply necessary and need no foundation. Then Sharon Street's question presses on him: how did creatures shaped by natural selection, which rewards survival and not truth, come to know such facts at all? Wielenberg has an answer, and it's a serious one. But notice the shape of the choice. Either morality is invented and our sense of an absolute demand is an illusion, or moral facts stand unexplained and we were lucky to find them, or goodness has a source who made us able to know it.",
        ],
      },
      {
        heading: "What this does not prove",
        body: [
          "Even if all three arguments succeed, they bring you to a necessary, powerful source of the world, one that seems to intend life and is the ground of goodness. That's a long way from atheism. It isn't yet Christianity. Nothing here shows that God is three persons, or that he became a man, or that he forgives. For Christians those claims rest on a particular event, and whether it happened is a historical question, not a philosophical one: whether Jesus of Nazareth was raised from the dead. That case has its own page, and I think it is the strongest of all. Paul made the same move in Athens. He started on the philosophers' own ground, with \"the God who made the world and everything in it\" (Acts 17:24), who \"is actually not far from each one of us\" (Acts 17:27), and then went straight to the resurrection (Acts 17:31).",
          "Schellenberg's silence isn't answered by any of this, and I won't pretend it is. The best I can offer is what Blaise Pascal wrote in the notes we call the Pensées: that God has given enough light for those who want to see, and enough darkness for those who don't. A skeptic can fairly reply that this is convenient for the believer. I think it fits the way every serious question in a life works. The evidence is real, it doesn't force anyone, and what we want shapes what we let ourselves see.",
          "I came to faith from atheism, so I don't say this from outside. Paul writes that God's \"invisible attributes, namely, his eternal power and divine nature, have been clearly perceived, ever since the creation of the world, in the things that have been made\" (Romans 1:20). That can sound like an insult. I read it as a description of a habit any of us can have, the habit of not looking. If you weigh all of this and still don't believe, you haven't been foolish. But you'll have to choose where your explanations stop, as everyone does, and the universe will still be there, asking why.",
        ],
      },
    ],
    sources: [
      { author: "G. W. Leibniz", title: "Principles of Nature and Grace, Based on Reason", year: "1714" },
      { author: "Richard Taylor", title: "Metaphysics", year: "1963" },
      { author: "Alexander R. Pruss", title: "The Principle of Sufficient Reason: A Reassessment", year: "2006" },
      { author: "Martin Rees", title: "Just Six Numbers", year: "1999" },
      { author: "Geraint F. Lewis and Luke A. Barnes", title: "A Fortunate Universe: Life in a Finely Tuned Cosmos", year: "2016" },
      { author: "Richard Swinburne", title: "The Existence of God", year: "2nd ed., 2004" },
      { author: "Erik J. Wielenberg", title: "Robust Ethics", year: "2014", note: "An atheist's case for moral facts without God." },
      { author: "J. L. Schellenberg", title: "Divine Hiddenness and Human Reason", year: "1993" },
      { author: "J. L. Mackie", title: "The Miracle of Theism", year: "1982", note: "The best book against: an atheist weighing every argument with care." },
      { author: "Graham Oppy", title: "Arguing about Gods", year: "2006", note: "The strongest recent case that no argument for God succeeds." },
    ],
    essaySlug: "does-god-actually-exist",
    essayTitle: "Does God Actually Exist?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "what-about-those-who-never-heard",
    question: "What about those who never heard of Jesus?",
    paragraphs: [
      "I don't know, and the people who told you they knew, in either direction, told you something the text withholds. The question that undoes people is not whether God exists. It is whether he is fair to the man who died on a mountainside a thousand years before a missionary crossed the water, who never heard the name of Jesus, not once. It is the soft place in the exclusive claim, the one that makes settled believers change the subject.",
      "Start with the hard answer. Paul writes, \"How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching?\" (Romans 10:14). That chain is the engine of every missionary who ever left home. But hold it against Romans 2:14-15, where the work of the law is \"written on their hearts\" in people who never received it, and against Peter in a Roman soldier's house: \"God shows no partiality\" (Acts 10:34-35). The church has held more than one faithful answer. The restrictivist waits for explicit faith and trusts God's justice past his sight; the inclusivist, loving Scripture no less, holds that the cross is still the only ground, applied perhaps to a man who never heard the name the way it was applied to Abraham and Moses. Faithful Christians disagree here, and the creeds don't settle it. We keep trying to settle the mechanism when we were never given the list. We were given the Judge, before whom Abraham stood and pressed: \"Shall not the Judge of all the earth do what is just?\" (Genesis 18:25).",
      "The church still has to go. If I don't know the unreached are safe, and I don't, then reaching them isn't optional and my comfort isn't the point. The uncertainty is a reason for the mission. I wanted the roster for years so I could stop feeling the ache; he handed over his character instead. The Judge did not stay behind the glass. He crossed every distance himself and went to a cross rather than spare himself, in public, where anyone could watch. Whatever he does with the ones who never heard, he will not do it from a distance, and he will not do it unjustly. That is meant to send you back to the road.",
    ],
    essaySlug: "what-about-those-who-never-heard",
    essayTitle: "What About Those Who Never Heard?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "can-you-be-good-without-god",
    question: "Can you be good without God?",
    paragraphs: [
      "You can be good without God, and pretending otherwise is the lie that discredits every true thing standing near it. Atheists are not, as a class, worse neighbors or parents or citizens than the people filling pews, and any pastor who has done funerals for long knows it. The claim was never that unbelievers cannot behave well. The real question is quieter: what makes the word good point at anything real when an atheist says it.",
      "The skeptic has an old reply, and a good one. Plato set it down twenty-four centuries ago in the Euthyphro: is a thing good because God commands it, or does God command it because it is good. If the first, goodness is arbitrary; if the second, it stands above God and you have found it without him. Both doors open onto a cliff. But the dilemma hides a third. Goodness is neither above God nor invented by God. It is what God is. The tradition from Aquinas to Robert Adams locates the good not in a command that could have gone either way but in God's own unchanging character, of which his commands are the expression. That makes it objective, since it answers to no one's opinion, and it isn't arbitrary, since it hangs on no will that might have chosen otherwise. When you call the torture of a child wrong, you mean a fact about the act, not weather in your skull.",
      "I could not keep my footing there. I said morality was evolved and useful and felt, and then I lived every waking hour as if some things were just wrong, wrong the way stone is hard. Paul writes that the Gentiles who never had the law still \"show that the work of the law is written on their hearts, while their conscience also bears witness\" (Romans 2:15, ESV). You already live as if the answer were yes, as if some things are simply, permanently wrong. I did too, on a floor I swore was not under me. The floor held anyway. It is worth asking who laid it.",
    ],
    essaySlug: "can-you-be-good-without-god",
    essayTitle: "Can You Be Good Without God?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "is-faith-irrational",
    question: "Is believing anything on faith irrational?",
    paragraphs: [
      "No, though a good deal of what gets called faith is exactly the credulous thing the charge names, and I won't defend it. The church has too often praised not-thinking as a virtue and used \"just have faith\" as a lid on a pot it did not want boiling. But the framing of faith against reason is a caricature, and it collapses the moment you examine either side. Biblical faith reaches for reasons the whole time, and reason runs on trust it has never been able to prove.",
      "Take Clifford at his word. In 1877 he ruled it \"wrong always, everywhere, and for anyone, to believe anything upon insufficient evidence,\" so try to believe only what your evidence forces. You won't last a morning. You trust your own reason without being able to certify it without using it. You trust that other minds exist, that the future will resemble the past, and Hume saw the size of that one in 1748 and could not argue his way out. Michael Polanyi called it tacit knowing, the floor beneath the floor: no knowledge without a knower who is committed. And the word itself was never a leap into the dark. Pistis meant trust with a track record. \"Now faith is the assurance of things hoped for, the conviction of things not seen\" (Hebrews 11:1). Things unseen, not things disbelieved.",
      "I say this against myself, because for years I accused believers of the exact posture I was standing in. I called my position pure reason. It was a structure of enormous trust I had simply never counted, invisible the way water is invisible to the fish. Everyone is betting on something they cannot stand outside of and prove. The most honest prayer in the Gospels isn't a settled one. It comes from a desperate father with a suffering son: \"I believe; help my unbelief!\" (Mark 9:24). Some of us have just stopped pretending we aren't already doing it.",
    ],
    essaySlug: "is-faith-irrational",
    essayTitle: "Is Believing Anything on Faith Irrational?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "are-miracles-believable",
    question: "Are miracles believable?",
    paragraphs: [
      "A rational person can believe in them. Miracles are rare by definition; if they were common they would not be miracles, because the word names the exception, not the schedule. Christianity is not the claim that tombs are unreliable. It is the claim that on one particular morning, one particular tomb was. What you can't do is rule the possibility out by definition, before the evidence arrives.",
      "The strongest case against them is David Hume's, set out in \"Of Miracles\" in 1748; most people stand inside his conclusion without having heard his name. A miracle, he wrote, is \"a violation of the laws of nature,\" and no testimony can establish one \"unless the testimony be of such a kind, that its falsehood would be more miraculous than the fact which it endeavours to establish.\" It reads like arithmetic. But the uniform experience of mankind can only count against every miracle if you assume in advance that every reported miracle is false, the one under discussion included. John Earman, no apologist, called this circular in Hume's Abject Failure (Oxford, 2000): applied evenly, the rule would have forbidden belief in a black swan or a meteorite, in any novel event that enlarged the world by breaking the pattern. The real question is authorship, not frequency. If God is so much as possible, a miracle is the author writing in the margin, and it can't be ruled out a priori.",
      "I did not lose that argument to a better argument. I lost it to the discovery that I had never had one. What I owned was the feeling of finality, and the feeling came from the definition, and the definition was the very thing I was supposed to be proving. Paul staked everything on the resurrection being fact and not feeling: \"And if Christ has not been raised, then our preaching is in vain and your faith is in vain\" (1 Corinthians 15:14, ESV). Paul wasn't asking for blind belief. He put the claim where it could be checked. Notice whether your certainty that miracles cannot happen is a conclusion you reasoned to, or a definition you started with. If it is the second, you haven't put the resurrection on the scale yet. You've refused in advance to look.",
    ],
    essaySlug: "are-miracles-believable",
    essayTitle: "Are Miracles Believable?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "did-god-command-genocide",
    question: "Did God command genocide in the Old Testament?",
    paragraphs: [
      "On the page, God commands it, and a person who reads those verses and feels sick is reading them correctly. I will not hand you a comfort I could not accept myself. \"You shall save alive nothing that breathes\" (Deuteronomy 20:16). To Saul, of the Amalekites: \"Do not spare them, but kill both man and woman, child and infant, ox and sheep, camel and donkey\" (1 Samuel 15:3). Child and infant. Richard Dawkins called this God a \"bloodthirsty ethnic cleanser\" in The God Delusion (2006), and the line drew blood because he was quoting, not distorting. For years this was my strongest reason to reject the Bible, read aloud to win a room.",
      "The scholars who live inside the ancient world kept pointing at something I had dismissed. K. Lawson Younger's Ancient Conquest Accounts (1990) laid the biblical narratives beside the war annals of Egypt and Assyria and found the same stock formula: total annihilation was the conventional idiom of victory, not a literal census. Kenneth Kitchen, no friend of softening Scripture, said the same in On the Reliability of the Old Testament (2003). And the Bible refuses to let the totality stand: the peoples reported as wiped out in Joshua are Israel's neighbors and in-laws two chapters later. The war is framed as judgment on named evil, not race, with Israel warned it stands under the identical standard: \"Not because of your righteousness ... but because of the wickedness of these nations the LORD your God is driving them out from before you\" (Deuteronomy 9:5). It is sealed to one people, one land, one window, never a template. Then Jesus takes the sword off the table with his own hands: \"Put your sword back into its place\" (Matthew 26:52).",
      "Put it all together, the genre I misread, the judgment on real evil, the seal that shuts the conquest forever, and a weight still remains. The hyperbole eases the scale and does not empty the battlefield. I have no answer for the particular child who chose none of it, and I will not decorate that grief. The texts did not stop being hard. But three of my certainties turned out softer than I had sworn, and a man who finds three certainties soft is obligated to wonder about the fourth. If you leave still troubled, we are troubled together. I think that is the right place to be.",
    ],
    essaySlug: "did-god-command-genocide",
    essayTitle: "Did God Command Genocide?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "why-didnt-the-bible-just-ban-slavery",
    question: "Why didn't the Bible just ban slavery?",
    paragraphs: [
      "It never says the four words a good book should manage: own no human being. It regulates the thing instead, telling masters how to treat their slaves and slaves how to obey. For two thousand years men who preached it bought and branded and sold human beings. Whitefield lobbied to legalize slavery in Georgia; Edwards owned slaves; when the American crisis came, the most confident biblical arguments in the room were the pro-slavery ones. Frederick Douglass, who had been owned, called the slaveholding religion of the land as opposite to the Christianity of Christ as heaven and hell.",
      "Read the whole book instead of the verses that arm you, and it is not silent. The word carries two cargoes: the Atlantic trade of permanent, heritable ownership, and the debt-servitude the Hebrew law regulates and releases. Three lines after the verse that armed the slaveholders, the same chapter of Exodus sets a death sentence over the trade: \"Whoever steals a man and sells him ... shall be put to death\" (Exodus 21:16). The Atlantic trade was manstealing from the first raid to the last auction. Paul calls the runaway \"a beloved brother\" (Philemon 16), and writes \"there is neither slave nor free ... you are all one in Christ Jesus\" (Galatians 3:28). Abolition came from there: Wilberforce drove the trade's end through Parliament out of an evangelical conversion, not the Enlightenment.",
      "I used to play this as a trump card, and I had confused ending the game with finding the truth. The church's blood on this is real, and the believer sets it on the table before he says anything else. But the book did not stay silent. It hid a death sentence in the slaveholder's own law, called the owned man a brother, and made the freeing of slaves the story a whole people were commanded never to forget. I wanted a God who would have said the four words. He made the men who owned slaves read, every year, about the God who set them free.",
    ],
    essaySlug: "why-didnt-the-bible-ban-slavery",
    essayTitle: "Why Didn't the Bible Just Ban Slavery?",
    bookTitle: "The Monster in the Mirror",
    bookHref: "/books/the-monster-in-the-mirror",
  },
  {
    slug: "is-faith-just-wishful-thinking",
    question: "Is faith just wishful thinking?",
    paragraphs: [
      "Sometimes, yes. Religion can be a crutch, and it constantly is for people who make it one. Much of what gets called faith is projection, a god assembled out of a person's fears and preferences, warm where they want warmth and silent where they want silence. The church has sold that god by the millions. If your argument is that some faith is wish-fulfillment, you are not wrong. You are describing my inbox.",
      "Feuerbach (1841) and Freud (1927) gave the suspicion its spine: God is the best of human nature projected onto the sky, the exalted cosmic father the frightened child never stopped wanting. They have a point. But the argument slides from how a belief arose to whether it is true, and that is the genetic fallacy. A frightened man believes the shore is close because he needs it to be, and the shore may also be close. His fear does not move the coastline. The tool cuts both ways. Nagel, no friend of religion, wrote, \"I don't want there to be a God. I don't want the universe to be like that.\" The wanting is on both sides of the table. The God of Scripture is the last god a frightened person would order: holy, demanding, crucified. A wish-god does not bleed.",
      "I ran the projection test on everyone but myself. For years I told myself I had followed the evidence into the cold. But underneath, where I did not look, was a boy raised without a father who found in a Godless universe not a grief but a relief, because a sky with no Father in it could not disappoint him the way one man already had. I wanted there to be no God. Ask the believer what they want to be true, and you will find plenty of faith that is a wish with a steeple. Then have the nerve to ask it of yourself. The crutch was real. It was just in my other hand.",
    ],
    essaySlug: "is-faith-just-wishful-thinking",
    essayTitle: "Is Faith Just Wishful Thinking?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "what-did-the-new-atheists-get-right",
    question: "What did the New Atheists get right?",
    paragraphs: [
      "They got a great deal right, and a believer who cannot say so has understood neither the men nor the faith he imagines he is defending. I owned the books. I read Dawkins and Hitchens and Harris and Dennett the way a soldier reads dispatches from a front where his side is advancing, and I would have followed all four Horsemen off a cliff. They weren't knocking over straw men. They were reading a public record, and it is soaked.",
      "The ground they took is real. Religion has blood on it: the church blessed conquest as mission, lit the fires under dissenters with Scripture, moved men who abused children from parish to parish. It answered honest questions with slogans and taught its children the faith cannot bear examination. But turn the argument over. The worst of religion gets cast as its essence while the worst of the godless twentieth century gets cast as an aberration, and the record will not sit still for that. Under all four sits the genetic fallacy: you have not shown a belief false by naming where it came from. And Dawkins made the cleanest category mistake, treating God as a hypothesis inside the universe when the creeds offer him as the reason there is a universe at all.",
      "Jesus said harder things about religion than Hitchens managed. \"Woe to you, scribes and Pharisees, hypocrites!\" (Matthew 23:27, ESV). The charge the four thought they were leveling from outside had been sitting inside the book, in red letters, the whole time. They were right about the church I was leaving. They were wrong about the God I had never met. I cheered because I thought the machine was the whole of it, and no one had shown me the man that machine crucified for naming the poison. \"Thus you will recognize them by their fruits\" (Matthew 7:20, ESV). Apply it to the church and it draws blood. Apply it to the century that promised to do better once God was gone and it draws blood too. Neither of us walks away clean.",
    ],
    essaySlug: "what-new-atheists-got-right",
    essayTitle: "What the New Atheists Got Right",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "can-life-mean-anything-without-god",
    question: "Can a life mean anything without God?",
    paragraphs: [
      "Yes, and any Christian who says otherwise is protecting his comfort by slandering better men. I was an atheist. I built real meaning out of love and craft and loyalty, and so have people I knew who loved their spouses with a fidelity that shamed my elders and faced a terminal diagnosis with a steadiness I would want at my own bedside. The church invented a miserable nihilist to feel better, and he doesn't exist. Whether you can make meaning was never the real question.",
      "What matters is the kind of meaning you can make. Camus opened by calling suicide the one serious philosophical problem and still refused the ledge, choosing revolt inside the absurd until \"One must imagine Sisyphus happy.\" Sartre said existence precedes essence, \"condemned to be free\" to author our own worth. Both of them mean it. Then watch Tolstoy, who had won by every measure Sartre would prescribe, hide a rope from himself in his own study because none of it answered the death waiting for all of it. What you invent, you can un-invent. Ecclesiastes got there first: \"Vanity of vanities, says the Preacher, vanity of vanities! All is vanity\" (Ecclesiastes 1:2). And both men kept borrowing a moral ground their systems could not supply, calling injustice a crime for everyone when a silent universe stocks no such thing.",
      "So the question is whether what you made is holding you up, or you are holding it. Invented meaning has one fatal property. On the night you can no longer believe in it, it is gone, because it was only ever your believing. I made my own for years, and it was good, right up until it was not, on a night when I was the thing that had broken and there was no one on the shore because I had spent my life proving the shore was empty. Wait for a good day, when you're standing in the dark kitchen with a glass of water and nothing is wrong. Then notice which one of you gets tired first, you or the meaning you made.",
    ],
    essaySlug: "meaning-without-god",
    essayTitle: "Can a Life Mean Anything Without God?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "christianity-and-islam-differences",
    question: "What do Christianity and Islam actually dispute?",
    paragraphs: [
      "They are neither the same faith nor strangers, and both slogans dodge the conversation. When I was an atheist, lumping every religion together kept all of them at arm's length. Looking closely is harder. Both confess one God, not many. Islam honors Jesus, Isa, as a prophet and messiah, born of the virgin Mary. This is a family argument, the bitterest kind, because it runs through what both sides hold most holy.",
      "At the center of Islam is tawhid, the absolute oneness of God, and its gravest sin, shirk, is associating anything created with the Creator. From inside that, the Trinity does not enrich God's oneness; it assaults it, and calling God Father and Son sounds close to blasphemy, not because a Muslim thinks little of Jesus but because he thinks so highly of God. A God that great would not be surrendered to a mob and executed. Islam honors Jesus as the greatest prophet; Christianity worships him and lets Thomas say \"My Lord and my God!\" (John 20:28). One faith says the cross was an execution God prevented; the other stakes everything on its having happened. One says a person climbs toward mercy; the other says God came down.",
      "These are not misunderstandings a patient afternoon could clear. They are the load-bearing walls of two different houses, and no one inside either is a fool. I hold the Christian confession as confession, not as a point scored against a neighbor I respect: the one God, without ceasing to be one, entered his own creation as a man, was handed over to be killed, and was not defeated by it. I could be wrong, and if I am, I have built my life on a rumor. But I cannot make it smaller to keep peace at the table, and neither can the devout Muslim across from me. What we owe each other is to name what stands on each side, and not lie about how far apart they are.",
    ],
    essaySlug: "christianity-and-islam",
    essayTitle: "What Christianity and Islam Actually Dispute",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "can-you-lose-your-salvation",
    question: "Can you lose your salvation?",
    paragraphs: [
      "Faithful churches divide on this, and they divide hard. The creeds don't settle it, and I won't pretend they do. Much of the Reformed and Baptist world holds that the one truly saved is kept by God and cannot finally be lost. Much of the Wesleyan, Arminian, and Catholic world holds that salvation can be forfeited. Both sides are reading the same Bible and loving the same Christ.",
      "The case for security rests where you would want it to rest, on God's grip rather than yours. \"I give them eternal life, and they will never perish, and no one will snatch them out of my hand\" (John 10:28), and Paul is sure that he who began a good work will bring it to completion (Philippians 1:6). The case for the other side rests on the warnings meaning what they say. Hebrews addresses people who have tasted the heavenly gift and speaks of falling away (Hebrews 6:4-6), and Jesus speaks of branches that do not abide being cut off (John 15:6). On this reading, a freedom that cannot walk away is the holding of objects, not the love of persons.",
      "For the person who is actually afraid, this is the part that matters most. Both traditions, rightly held, produce the same posture: a humble clinging to Christ rather than careless presumption or gnawing terror. If you are lying awake afraid you have fallen away, that fear is not usually the mark of someone who has. The settled apostate does not agonize. Don't settle your anxiety by picking the doctrine that soothes it. Go back to the one who said he would not let go.",
    ],
    essaySlug: "can-you-lose-your-salvation",
    essayTitle: "Can You Lose Your Salvation?",
  },
  {
    slug: "is-anxiety-a-spiritual-failure",
    question: "Is my anxiety a spiritual failure?",
    paragraphs: [
      "No. Anxiety doesn't mean your faith is failing, and the person who told you it was did you real harm. I am a pastor and not a physician, and none of this is medical advice, but I have sat with enough people in enough dark rooms to know the difference between someone faking and someone drowning. The first thing the church owes anyone drowning is to stop debating the water and get in it.",
      "Two bad answers get handed out here, and each one gets something right before it goes wrong. The pietist says be anxious for nothing, so if you are anxious you are sinning, which takes seriously that God invites us out of fear and then turns the invitation into a whip. The purely clinical answer says it is only chemistry and the soul has nothing to do with it, which takes seriously that the body is genuinely involved and then leaves the person alone with a machine. Philippians 4:6-7 is not a command to white-knuckle a feeling away. It is an invitation to bring the thing to God. And when Elijah wanted to die, God did not begin with theology. He gave him food and sleep first (1 Kings 19).",
      "So lament is faith rather than its failure, roughly a third of the Psalms will teach you the language, and getting help is a gift to receive rather than a defeat to hide. A doctor, a counselor, medicine, one trusted person who will stay. If you have reached the place where you are not sure you want to be here at all, tell someone today, and in the United States you can call or text 988 right now. That sentence matters more than anything else on this page. God isn't keeping score.",
    ],
    essaySlug: "anxiety-and-faith",
    essayTitle: "Is My Anxiety a Spiritual Failure?",
  },
  {
    slug: "is-hell-forever-or-does-it-end",
    askedAs: "eternal punishment annihilation what is hell",
    question: "Is hell forever, or does it end?",
    paragraphs: [
      "The reality of judgment and of being finally separated from God is what the church has always taught, and it is close to the center of the faith. The exact nature and duration of hell is a different matter, and Bible-loving Christians have genuinely disagreed about it. I'm not going to fake a consensus that doesn't exist. But the skeptic's real question isn't how long. It's how a good God could do this at all, and that question deserves an argument, not a shrug. I think a world with no final judgment would be worse, not kinder, especially for the people who suffered most in it. And I think each of the three views Christians hold is an honest attempt to answer the moral objection, by denying a different step in it.",
    ],
    sections: [
      {
        heading: "The objection at full strength",
        body: [
          "Bertrand Russell made the charge plainly in a lecture in London in 1927, published as Why I Am Not a Christian. Jesus, he pointed out, believed in hell, and Russell counted that against his moral character: \"I do not myself feel that any person who is really profoundly humane can believe in everlasting punishment.\" He went further and called the doctrine of hell-fire a doctrine of cruelty, one that had put cruelty into the world. Sixty years earlier John Stuart Mill had made the same point from the other side. In his Examination of Sir William Hamilton's Philosophy (1865) he refused to call any being good whose goodness was not the kind we mean when we call a person good, and he added that if such a being could send him to hell for refusing, \"to hell I will go.\"",
          "Put as an argument, the objection is about proportion. A just punishment fits the wrong. A human life is short, and even its worst wrongs are finite. Endless conscious suffering is infinite. So a God who punished that way would not be just, and a God who isn't just isn't good. Not all who press this are unbelievers. The Christian philosopher Thomas Talbott argued that hell, understood as endless and final, is a problem of evil that Christians have to answer among themselves.",
          "I grant what is true in this, and it's a lot. The church has sometimes preached hell with a relish that looks nothing like the God who wept over Jerusalem. It has used the fear of hell to control people, and it has spoken about the fate of others with a confidence Scripture doesn't give. Russell was right that a doctrine can make people cruel. Any answer has to take that seriously before it says anything else.",
        ],
      },
      {
        heading: "What kind of case this is",
        body: [
          "Two different questions sit inside this one, and they don't carry the same weight. The first is whether there will be a final judgment at all, in which a person can be finally separated from God. The Nicene Creed confesses that Christ \"shall come again, with glory, to judge both the quick and the dead,\" the living and the dead, and that belongs near the center of the faith. The second is what that separation is like and whether it lasts forever, and on that faithful Christians have disagreed for a very long time. I'll argue for the first. On the second I'll set out the moral objection as a chain of steps and show how each Christian view answers it by denying a different step. The argument doesn't decide among them, and I won't pretend it does.",
        ],
      },
      {
        heading: "Why there must be a judgment",
        body: [
          "Start with the people the objection tends to forget. Miroslav Volf is a Croatian-born theologian whose book Exclusion and Embrace (1996) grew out of trying to make sense of the war that tore apart the former Yugoslavia. He argued that a God who refused to judge would not be kind. He would be complicit. And he wrote a line that should stop anyone who has lived a comfortable life: \"It takes the quiet of a suburban home for the birth of the thesis that human nonviolence corresponds to God's refusal to judge.\"",
          {
            kind: "A deductive argument for final judgment",
            premises: [
              "Some wrongs are real and grave: the murder of the innocent, the abuse of a child, the slaughter of a people.",
              "A good God can't treat such wrongs as if they didn't matter, because that would be to treat their victims as if they didn't matter.",
              "Many such wrongs are never set right in this life. The guilty die comfortable, and the victims die unheard.",
            ],
            conclusion: "If God is good, there will be a final reckoning. Judgment isn't a stain on God's goodness. It is one of the things his goodness requires.",
          },
          "The weight sits on the second premise. A skeptic can reply that a good God would simply heal the victims and leave the rest alone. But healing that never names the wrong isn't love. It's indifference with a smile. Abraham, pleading for Sodom, asked the question this whole page depends on: \"Shall not the Judge of all the earth do what is just?\" (Genesis 18:25). Notice that he asked it as an appeal, not an accusation. He trusted that God's justice would be better than his own, not worse.",
        ],
      },
      {
        heading: "The argument about proportion, and three answers",
        body: [
          "Now the hard part. Here is the moral objection laid out, so we can see where each Christian view parts company with it.",
          {
            kind: "The skeptic's argument from proportion",
            premises: [
              "A just punishment is proportioned to the wrong done.",
              "Every human wrong is finite.",
              "Hell, as eternal conscious punishment, is infinite punishment.",
            ],
            conclusion: "Eternal conscious punishment would be unjust, so a just God would not inflict it.",
          },
          "The traditional view, held by most of the church through most of its history, rests on texts like \"these will go away into eternal punishment, but the righteous into eternal life\" (Matthew 25:46). It answers by denying the second premise. Thomas Aquinas argued that sin has two sides: a turning toward some lesser good, which is finite, and a turning away from God, who is the infinite good, and that the loss of God which follows is lasting because of that second side. C. S. Lewis gave a more human version. Sin isn't a single act in the past, finished and paid for. It's a direction a person keeps choosing. In The Problem of Pain (1940) he wrote that \"the doors of hell are locked on the inside.\" On that view hell doesn't punish a finite past forever. It is the place of a refusal that never ends.",
          "Conditional immortality, or annihilationism, denies the third premise. It holds that the finally impenitent are not kept alive forever in torment but at last perish, resting on Jesus warning of the one who can \"destroy both soul and body in hell\" (Matthew 10:28) and on the wages of sin being death (Romans 6:23). The punishment is eternal in its result, not in endless suffering. Edward Fudge argued it at length in The Fire That Consumes (1982), and John Stott, one of the most respected evangelical leaders of the last century, said in a published dialogue in 1988 that he held it, tentatively.",
          "A minority hope of final restoration denies that the separation is final at all. It has appeared in church history, in Gregory of Nyssa among others, and Talbott argues for it today. But the church has generally not affirmed universal salvation, and the New Testament's warnings are severe and real. Any view that empties them has stopped reading the pages it quotes.",
          "Each of these is an attempt to keep both God's justice and his love, and each has texts it struggles with. The traditional view has to explain why God, who \"desires all people to be saved\" (1 Timothy 2:4), keeps the lost in being forever. Conditional immortality has to explain why Jesus set \"eternal punishment\" beside \"eternal life\" in a single sentence, and why Revelation speaks of torment whose smoke rises forever (Revelation 14:11). The hope of restoration has to explain the warnings that speak of no way back. Christians who love Scripture hold all three, though not equally, and each of them is answering the moral objection rather than ignoring it. I'm not going to settle that here.",
        ],
      },
      {
        heading: "The strongest reply",
        body: [
          "The strongest reply is Mill's, sharpened. Fine, the skeptic says, judge the murderer. But your tradition sends ordinary decent people to hell for failing to believe the right things, and a God who does that is the one I won't call good. If that were the Christian teaching, I'd agree with him. It isn't. Scripture says the dead are judged \"according to what they had done\" (Revelation 20:12), by a God who says, \"I have no pleasure in the death of the wicked\" (Ezekiel 33:11). What about those who never heard has its own page, and it leaves open what the Bible leaves open.",
          "Christianity's deeper answer isn't a theory of punishment. It's the cross. The Christian claim is that God doesn't stand outside judgment sending others into it. He enters it himself, and bears it, \"so that he might be just and the justifier of the one who has faith in Jesus\" (Romans 3:26). Whatever hell is, it isn't what God wants for anyone. It is what remains when someone finally refuses what God has given at that cost. Lewis put it in a sentence in The Great Divorce (1945): \"There are only two kinds of people in the end: those who say to God, 'Thy will be done,' and those to whom God says, in the end, 'Thy will be done.'\"",
        ],
      },
      {
        heading: "What this does not prove",
        body: [
          "None of this proves that hell exists. The case for final judgment rests on two things a skeptic may deny: that God is real and that he is good. The argument shows that if he is both, judgment isn't a contradiction of his goodness. It doesn't settle what hell is like or how long it lasts, and it doesn't tell anyone who will be there. Jesus' own warnings are among the sternest in the New Testament, and many of them were aimed at the religious. That alone should keep anyone from preaching hell at someone else.",
          "Both cheap versions are wrong. The preacher who relishes the fire has not understood the God he claims to serve, and the sentimentalist who empties the warnings has not read the pages he is quoting. What the tradition guards is narrower and more sober than either: that a person can finally, really refuse God, and that the refusal is not nothing. Christians disagree about what hell is like and how long it lasts. They don't disagree that a person can choose it.",
        ],
      },
    ],
    sources: [
      { author: "Bertrand Russell", title: "Why I Am Not a Christian", year: "1927", note: "The classic short case against." },
      { author: "Jonathan L. Kvanvig", title: "The Problem of Hell", year: "1993" },
      { author: "C. S. Lewis", title: "The Problem of Pain", year: "1940" },
      { author: "C. S. Lewis", title: "The Great Divorce", year: "1945" },
      { author: "Edward William Fudge", title: "The Fire That Consumes", year: "1982" },
      { author: "David L. Edwards and John Stott", title: "Essentials: A Liberal-Evangelical Dialogue", year: "1988" },
      { author: "Thomas Talbott", title: "The Inescapable Love of God", year: "1999", note: "A Christian philosopher's case for universal salvation." },
      { author: "Miroslav Volf", title: "Exclusion and Embrace", year: "1996" },
    ],
    essaySlug: "is-hell-eternal",
    essayTitle: "Is Hell Forever, or Does It End?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "does-god-choose-us-or-do-we-choose-him",
    question: "Does God choose us, or do we choose him?",
    paragraphs: [
      "This question divides Calvinist and Arminian churches that preach the same gospel and confess the same creeds. You can close this page holding either answer and still be my brother or sister, so I'm going to lay out both and not pick for you.",
      "The Reformed case is that salvation is entirely God's initiative, so that no one may boast. He \"chose us in him before the foundation of the world\" and predestined us for adoption according to the purpose of his will (Ephesians 1:4-5), and Romans 9 presses that it depends not on human will or exertion but on God who has mercy. The pastoral comfort is enormous: your salvation does not finally rest on the strength of your grip. The Arminian case is that God genuinely desires all to be saved (1 Timothy 2:3-4), that grace goes before and enables a real human response, and that love which cannot be refused is not love. \"Whoever believes\" (John 3:16) is not a formality, and human responsibility is not a fiction.",
      "Scripture holds both in the same breath. Paul tells the Philippians to work out their own salvation, and in the very next clause says it is God who works in them (Philippians 2:12-13). Each side has an overreach to guard against: a determinism that makes God the author of sin, and a human choice that quietly becomes a work. As a convert I could never tell whether I had found God or been found by him. The answer the text gives is yes.",
    ],
    essaySlug: "predestination-and-free-will",
    essayTitle: "Does God Choose Us, or Do We Choose Him?",
  },
  {
    slug: "how-should-a-christian-read-genesis-1",
    question: "How should a Christian read Genesis 1?",
    paragraphs: [
      "Start by separating what is binding from what is open, because most of the heat in this argument comes from confusing the two. That God created, that he created from nothing, and that humanity bears his image are not up for negotiation. The age of the earth and the way God created are open questions, and faithful Christians who love the same Bible have landed in different places.",
      "Three readings are held by people who take Scripture seriously. Young-earth creationism reads six ordinary days and a recent creation, out of a concern to protect the plain sense of the text and the theological weight of a historical Adam. Old-earth and literary-framework readings, including the framework view associated with Meredith Kline, take the days as an ordered literary structure or long ages and take deep time seriously while holding the text as true. Evolutionary creation, argued by Francis Collins and others at BioLogos, holds that God created through the evolutionary process and that Genesis 1 is theological rather than scientific literature. All three confess the same Creator.",
      "The genre question is the one most arguments skip. Genesis 1 answers who and why, and it may simply not be pitched at the modern question of how. When I was an atheist the science was a real barrier, and learning that the church has held several faithful readings of this chapter mattered more to me than winning any single argument about it. Hold on tight to the Creator, and hold the mechanism loosely.",
    ],
    essaySlug: "how-to-read-genesis-one",
    essayTitle: "How Should a Christian Read Genesis 1?",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "what-does-the-bible-say-about-divorce-and-remarriage",
    question: "What does the Bible say about divorce and remarriage?",
    paragraphs: [
      "Jesus begins where we would rather not, with the permanence. \"So they are no longer two but one flesh. What therefore God has joined together, let not man separate\" (Matthew 19:6). Divorce is not a neutral administrative event. It is the tearing of something God joined, and we have to say so before we say anything else.",
      "But Scripture itself names exceptions, and the church has read them faithfully in more than one way. Jesus permits divorce for sexual immorality (Matthew 19:9), and Paul addresses the believer whose unbelieving spouse leaves, saying the brother or sister is not enslaved in such cases and that God has called us to peace (1 Corinthians 7:15). Christians who take both texts seriously still differ on how far those exceptions extend, especially when it comes to abuse and abandonment, and I'm not going to hand you a ruling on your marriage from a web page.",
      "What I will say is that the church has often gotten the weighting exactly backwards. It has treated the divorced as a permanent category of failure while quietly tolerating the contempt, neglect, and cruelty that killed the marriage long before the paperwork. If you are in danger, get safe first and sort the theology after. The Find Help page on this site is a place to start. If you are grieving a marriage that ended, you are not a second-class Christian. Grace is not the reward for a clean history.",
    ],
    essaySlug: "divorce-and-remarriage",
    essayTitle: "When a Marriage Ends: Divorce, Remarriage, and Grace",
  },
  {
    slug: "why-does-god-allow-natural-disasters",
    question: "Why does God allow earthquakes, cancer, and animal suffering?",
    paragraphs: [
      "This is the harder half of the problem of evil, and most answers never reach it. Free will can be offered as an account of the torturer. It says nothing about the tsunami, the child's leukemia, or the fawn that burns in a forest fire far from anyone. I can't explain any one of them, and I'd distrust anyone who said he could. What I can offer is an argument about the argument. The skeptic's case rests on a claim about what a good God would make, and that claim is much harder to know than it looks. Christians have three serious things to say about it, and each has a cost. And the Christian hope was never that this makes sense now. It is that suffering isn't the last word, and that God didn't stay outside it.",
    ],
    sections: [
      {
        heading: "The objection at full strength",
        body: [
          "Start with the other side, because it has the facts. On the morning of November 1, 1755, All Saints' Day, an earthquake struck Lisbon while many of its churches were full for Mass. A tsunami surged up the Tagus into the lower city, and fires burned for days. Voltaire wrote a poem asking what crime had been committed by the children who lay crushed and bleeding on their mothers' breasts. Nobody chose it. That is what philosophers mean by natural evil: suffering that comes from the way the world works, not from anyone's will.",
          "David Hume saw where this leads. In his Dialogues Concerning Natural Religion, published in 1779, the skeptic Philo looks over the whole of nature, its predators and plagues, and says it shows a blind Nature \"pouring forth from her lap, without discernment or parental care, her maimed and abortive children.\" Darwin felt the same weight with more evidence in hand. In a letter of May 22, 1860, to the botanist Asa Gray, he wrote: \"I cannot persuade myself that a beneficent and omnipotent God would have designedly created the Ichneumonidae with the express intention of their feeding within the living bodies of Caterpillars, or that a cat should play with mice.\" The Ichneumonidae are wasps that lay their eggs inside living caterpillars, and the young eat their host from within.",
          "In 1979 William Rowe gave the problem its best-known picture. In some distant forest, lightning starts a fire, and a fawn is trapped in it, horribly burned, lying in terrible agony for several days before it dies. So far as we can see, Rowe said, its suffering serves no purpose at all. Ten years later Paul Draper sharpened the case in the journal Noûs, in an article called \"Pain and Pleasure: An Evidential Problem for Theists\" (1989). He didn't argue that suffering makes God impossible. He compared two hypotheses. On one, God made the world. On the other, which he called the hypothesis of indifference, nothing behind nature cares either way about the creatures in it. Draper argued that the pain and pleasure we actually find, bound tightly to survival and handed out with no regard to anyone's goodness, is just what the second would lead you to expect, and a surprise on the first.",
          "I grant what's true in this, and it's a great deal. Free will doesn't reach the fawn. If the earth is as old as most geologists hold, predators and parasites were at work for ages before there were people to sin. Christians differ about that history, but on any view the wasp and the caterpillar are here now. And some of what Christians say in reply is worse than silence. In 1756 the Jesuit Gabriel Malagrida published a pamphlet blaming the Lisbon earthquake on the city's sins. Jesus refused that reading of a disaster in his own day. Of the eighteen killed when the tower in Siloam fell, he asked, \"do you think that they were worse offenders than all the others who lived in Jerusalem? No, I tell you\" (Luke 13:4-5).",
        ],
      },
      {
        heading: "What kind of case this is",
        body: [
          "Draper's argument isn't a proof that God doesn't exist, and he never said it was. It's an argument from evidence: a fact counts toward whichever account makes it less surprising. That's a fair way to argue, and I'll answer in the same coin. So the question isn't whether a Christian can explain each wasp. Nobody can. The question is whether the suffering in nature is really more surprising if God exists than if he doesn't, once everything Christians mean by God is in the picture. What follows is what philosophers call a defense, not a theodicy. It doesn't claim to know God's reasons. It asks whether a good God could have reasons of this kind, and so whether the evidence points as hard as it seems to.",
        ],
      },
      {
        heading: "The argument, laid out",
        body: [
          "Here is the skeptic's case in its simplest form.",
          {
            kind: "An argument from evidence (after Draper, 1989, in my words)",
            premises: [
              "In nature, pain and pleasure are tied closely to survival, and they fall on creatures with no regard to their goodness, including creatures that can do no wrong.",
              "That pattern is just what we would expect if nothing behind nature cares about the creatures in it.",
              "That pattern is much less to be expected if the world was made by a God who is all-powerful and wholly good.",
            ],
            conclusion: "The suffering in nature is strong evidence for indifference over God. Unless something else outweighs it, a reasonable person should lean toward unbelief.",
          },
          "The first premise is true. The second is close enough to true. The weight sits on the third, because it's a claim about what a perfectly good and all-powerful God would make, and to know that you'd need to know what goods such a world has to make room for and what they cost. Scripture doesn't hide the wildness the third premise points to. \"The young lions roar for their prey, seeking their food from God\" (Psalm 104:21). When God finally answers Job, he asks, \"Who provides for the raven its prey?\" (Job 38:41). He claims the predators as his own, and he gives Job no explanation. So the Christian can't say that nature looks tame. The question is whether a good God might make a world this wild, and Christians have given three serious answers.",
        ],
      },
      {
        heading: "Three answers, and what each costs",
        body: [
          "The first is about laws. C. S. Lewis argued in The Problem of Pain (1940) that creatures who can meet, act and depend on one another need a nature with fixed laws, and fixed laws don't bend to spare whoever is in the way. The water that carries a boat can drown a child. Richard Swinburne pressed this further in Providence and the Problem of Evil (1998). Creatures can only be responsible for one another if they can learn what harms and what helps, and they learn it by watching how the world works. Geology adds a point neither man needed. The moving plates that cause earthquakes also, on the case Peter Ward and Donald Brownlee make in Rare Earth (2000), drive the cycle of carbon through rock and air that keeps the planet's temperature fit for complex life. The cost is plain: God could, it seems, step in each time. But a world where fire never burns the wrong creature isn't a world with laws, and the creatures in it couldn't learn, plan or keep one another safe.",
          "The second goes deeper, and it belongs to Christians who accept the long history of life that most scientists describe. Christopher Southgate argues in The Groaning of Creation (2008) that a world which makes its creatures through long processes, not all at once, may be the only way, or the best way, to bring about creaturely selves at all: beings with their own skill and hunger, the speed of the leopard and the eye of the hawk. The same processes that make the hawk make its prey suffer. Southgate doesn't stop there. He holds that God suffers with every creature and won't leave its victims without redemption, and, following the theologian Jay McDaniel, he is willing to speak of a pelican heaven for the chick pushed from the nest. The cost: nobody can show it's the only way. A skeptic can say an all-powerful God could have done it without the wasps, and I can't prove otherwise. Neither can he prove that God could.",
          "The third is the oldest, and it's Paul's. \"For the creation was subjected to futility, not willingly, but because of him who subjected it, in hope that the creation itself will be set free from its bondage to corruption\" (Romans 8:20-21). Scripture refuses to call the present order the intended one. Christians read that in more than one way, and I won't choose among them here. Many hold that animal death came into the world through human sin, and most of them hold that the earth is young. Many others hold that the earth is very old and read the futility as the condition of a creation made good but not yet finished. In his chapter on animal pain, Lewis suggested another reading: that some mighty created power may have been at work for ill on the material world before man appeared. The creeds don't settle it, and faithful churches divide over it. The cost of all three readings is that none can be checked from here. What they share is the claim that matters for the argument: the fawn's death isn't what God calls good, and it isn't the end of the story.",
          "I'll leave one answer aside. Some have argued that animals feel pain without the inner awareness that makes it suffering. Michael Murray gives views of that kind their most careful hearing in Nature Red in Tooth and Claw (2008). I don't find them believable. The fawn's pain looks real, and Jesus didn't tell us to doubt it. Of the sparrows sold two for a penny, he said, \"not one of them will fall to the ground apart from your Father\" (Matthew 10:29).",
        ],
      },
      {
        heading: "The strongest reply, and an answer",
        body: [
          "The best reply a skeptic can make goes like this. Every one of these answers comes down to saying a good God might have reasons we can't see. But if you can always say that, no evidence can ever count against God, and a belief no evidence can touch isn't worth much. That reply has real force, and I don't think it's fully answered. Two things can be said.",
          "First, I'm not claiming nothing could count against the Christian faith. It can be tested at a point that has nothing to do with wasps: whether Jesus of Nazareth was raised from the dead. That question has its own page, and if the answer is no, Paul says plainly that \"your faith is futile and you are still in your sins\" (1 Corinthians 15:17). Few faiths name the evidence that would sink them. This one does.",
          "Second, the skeptic's hypothesis carries a cost of its own. If nothing behind nature cares, the fawn's agony is a fact about nerves and fire, and the protest that started the argument, that it shouldn't be so, is only a feeling we happen to have. That doesn't refute Draper; his argument needs no moral view from me. But it does mean the choice isn't between a world with suffering and a world without it. Both views have to carry the suffering. Indifference explains the pain well. It can't call it wrong, and it can't promise it will end.",
          "The Christian hope does both, and it's older than Darwin. John Wesley's sermon on Romans 8, \"The General Deliverance\", from the early 1780s, argued that the animals will share in the restoration of all things. Scripture doesn't say whether the fawn itself will be raised, and I won't say more than it does. But Isaiah's picture is of a creation where predation ends: \"They shall not hurt or destroy in all my holy mountain\" (Isaiah 11:9).",
        ],
      },
      {
        heading: "What this does not prove",
        body: [
          "None of this explains the fawn, and I'd distrust any answer that claims to. At most it shows that the suffering in nature counts less decisively against God than Draper's third premise says, because none of us is placed to know what a good God's world would have to cost. That's a modest result. It leaves the wasp in the caterpillar and the child in the cancer ward exactly where they were. It doesn't make Christianity true. It only clears room for asking whether it is.",
          "The Christian claim is not that the suffering makes sense now. It is that it is neither the last word nor the intended word, and that God did not stay outside it explaining. He entered it. The Son of God took a body that could be hurt, and on the cross he prayed the first line of Psalm 22: \"My God, my God, why have you forsaken me?\" (Matthew 27:46). If he was raised, then the world in which fawns burn is not the world God means to keep.",
          "If you are in the middle of this, you don't need my argument. You need someone to sit with you, and that is the church's actual job. Find Help has people you can call, today if you need them. Job never learned why. He was allowed to ask, and in the end he said, \"I had heard of you by the hearing of the ear, but now my eye sees you\" (Job 42:5).",
        ],
      },
    ],
    sources: [
      { author: "David Hume", title: "Dialogues Concerning Natural Religion", year: "1779" },
      { author: "Charles Darwin", title: "Letter to Asa Gray, 22 May 1860", in: "The Life and Letters of Charles Darwin, vol. 2 (1887)", year: "1860" },
      { author: "C. S. Lewis", title: "The Problem of Pain", year: "1940" },
      { author: "William L. Rowe", title: "The Problem of Evil and Some Varieties of Atheism", in: "American Philosophical Quarterly", year: "1979" },
      { author: "Paul Draper", title: "Pain and Pleasure: An Evidential Problem for Theists", in: "Noûs", year: "1989", note: "The strongest case against: the argument this answer meets." },
      { author: "Richard Swinburne", title: "Providence and the Problem of Evil", year: "1998" },
      { author: "Peter D. Ward and Donald Brownlee", title: "Rare Earth: Why Complex Life Is Uncommon in the Universe", year: "2000" },
      { author: "Christopher Southgate", title: "The Groaning of Creation: God, Evolution, and the Problem of Evil", year: "2008" },
      { author: "Michael J. Murray", title: "Nature Red in Tooth and Claw: Theism and the Problem of Animal Suffering", year: "2008" },
    ],
    essaySlug: "natural-evil-and-animal-suffering",
    essayTitle: "The Suffering God Never Ordered",
    bookTitle: "Believe",
    bookHref: "/books/believe",
  },
  {
    slug: "what-makes-us-human-in-the-age-of-ai",
    question: "What makes us human in the age of AI?",
    paragraphs: [
      "Start with the functionalist case, because it's a serious one. If the mind simply is information processing, then a human being is a wet computer, and a sufficiently advanced machine that reasons, converses, and reports feeling would be a person in every way that counts. To deny it would be mere carbon chauvinism. The machines are now good enough that this is not science fiction, and much of what we prized as uniquely human, including calculation, fluency, and a kind of creativity, turns out to be reproducible. That should humble us.",
      "The Christian answer is not that humans compute better. It is that personhood was never a capacity in the first place. If it were, the infant, the demented, and the profoundly disabled would be less than persons, and nobody should want to go down that road. \"So God created man in his own image\" (Genesis 1:27), formed from dust and given breath (Genesis 2:7). A person is one who is made and loved and named by God, and that is conferred rather than earned or benchmarked.",
      "That changes what we should be anxious about. The body is not luggage the real self is carrying, and the Christian hope is the resurrection of the body rather than escape from it, so the transhumanist dream of uploading the self is an old heresy on new hardware: the gnostic contempt for flesh. What the machines finally show us is the difference between being simulated and being known.",
    ],
    essaySlug: "personhood-in-the-age-of-ai",
    essayTitle: "What Makes Us Human in the Age of AI?",
  },
];
