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
          "Modern historians put it more carefully. Bart Ehrman, a New Testament scholar at the University of North Carolina and an agnostic, grants that some of Jesus' followers came to believe soon after the crucifixion that God had raised him. What he doesn't accept is that the belief was true, and he argues that historians, working as historians, can't conclude that a miracle happened at all. He suggests that some of the disciples had visions of Jesus, the kind of experience grieving people have. That isn't a cheap suggestion. The disciples were bereaved, frightened and ashamed. Why wouldn't some of them see him?",
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
          "Second, his followers became convinced they had seen him alive, and the evidence for that is very early. Writing to the church at Corinth in the mid-50s, Paul reminded them of what he had \"delivered\" to them, a summary he had himself \"received\": \"that Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day in accordance with the Scriptures, and that he appeared to Cephas, then to the twelve. Then he appeared to more than five hundred brothers at one time, most of whom are still alive, though some have fallen asleep. Then he appeared to James, then to all the apostles\" (1 Corinthians 15:3-7). Delivered and received are the words for handing on a tradition you didn't compose. Paul tells the Galatians that about three years after his conversion he spent fifteen days in Jerusalem with Cephas and saw James, the Lord's brother (Galatians 1:18-19), two of the names on that list. Most scholars, including many with no stake in Christianity, think the summary took shape within a few years of the events. Gerd Lüdemann, a German New Testament scholar who did not believe Jesus rose, dated it to about two years after the crucifixion.",
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
          "The theory that the disciples hid the body and lied has few defenders among scholars now, for a plain reason: they paid for the claim. James the brother of John was killed with the sword (Acts 12:2), James the brother of Jesus was stoned, and a letter from the church in Rome late in the first century says that Peter and Paul suffered martyrdom. People die for false beliefs all the time, but these men were in a position to know whether they had taken the body themselves. The idea that Jesus survived the cross was answered by the skeptic David Friedrich Strauss in the nineteenth century: a half-dead man in need of bandages and nursing could never have persuaded anyone that he had conquered death.",
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
          "So the decision James describes isn't made in the dark. The evidence that bears on it is historical, and it can be weighed by an outsider, which is exactly what Loftus asks for. Within a few years of the crucifixion, his followers were saying they had seen him alive, and some of them were killed for it. Acts records that Herod \"killed James the brother of John with the sword\" (Acts 12:2). The Jewish historian Josephus, writing in the 90s, tells of the stoning of \"the brother of Jesus, who was called Christ, whose name was James\" around 62 (Antiquities 20.200). A letter from the church in Rome late in the first century, which we call 1 Clement, says that Peter and Paul died as martyrs. The evidence for how most of the other apostles died is later and less certain, and I won't lean on it.",
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
          "The second step is common knowledge about the period, and the third is where a skeptic can push. Ehrman's reply is the strongest. He agrees that Christians exalted Jesus very early, but holds that what they first believed was that God had raised a man to a high place. That is a real reading, and I won't pretend Paul wrote the language of Nicaea. But the words Paul reaches for are the words Israel kept for the one God, the Shema and Isaiah's words about every knee bowing to God alone, and he uses them of Jesus without apology, writing to churches that already prayed to him. Whatever happened, it happened at the beginning.",
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
          "Historians of science have spent the last fifty years taking Draper and White apart, and not because they were defending the church. In 2009 the historian Ronald Numbers, described by one reviewer as a religious agnostic, edited a book for Harvard University Press called Galileo Goes to Jail and Other Myths about Science and Religion.",
          "Galileo himself is a good example. He was a believer, and in 1615 he defended his work by quoting Augustine, who had written early in the fifth century, in The Literal Meaning of Genesis, that for an unbeliever to hear a Christian talking nonsense about the natural world was a disgrace and a danger. The church that condemned Galileo had forgotten one of its own best teachers.",
          "The record keeps breaking the war story. When the Cavendish Laboratory opened at Cambridge in the 1870s under James Clerk Maxwell, the physicist who unified electricity and magnetism, its oak doors carried a verse from the Psalms in Latin, by his wish: \"Great are the works of the LORD, studied by all who delight in them\" (Psalm 111:2). In 1927 Georges Lemaître, a Belgian physicist and a Catholic priest, argued that the universe is expanding, two years before Edwin Hubble's famous paper, and in 1931 he proposed that it began from what he called a primeval atom. In our own time John Polkinghorne left a Cambridge chair in mathematical physics to be ordained an Anglican priest in 1982.",
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
          "The physicist Charles Coulson made popular the name we still use for the mistake, the God of the gaps. Water boils because the molecules are agitated. The kettle is on because someone wanted tea. Both answers are true, and they don't compete.",
          "This cuts both ways, and I want to be honest about it. If God isn't found in the gaps, Christians can't argue for him from the gaps either. A believer who says \"science can't explain this, so God did it\" is making the skeptic's mistake in reverse. The fine-tuning argument on the God page isn't that kind of argument. It doesn't say physics can't explain something. It asks why physics is the way it is.",
          "Coyne's charge about method needs its own answer. He's right that a faith which can never be wrong isn't knowledge. But the center of Christianity isn't a claim held out of the reach of evidence. It's a claim about something that happened in a particular city in a particular decade, and the earliest Christian writer staked everything on it. If Christ has not been raised, Paul wrote, \"your faith is futile and you are still in your sins\" (1 Corinthians 15:17). That's a faith that can be wrong. The rule of the laboratory, look for natural causes, is a good rule for the laboratory. It can't tell you whether anything ever happened that natural causes don't explain. That's a question for history, and the resurrection has its own page.",
        ],
      },
      {
        heading: "Why science works at all",
        body: [
          "Now turn the question around and ask why science works in the first place. In 1960 the physicist Eugene Wigner wrote about how strangely well mathematics, worked out on paper, describes the physical world, and he called it \"a wonderful gift which we neither understand nor deserve.\" He wasn't arguing for God. He saw something that needs explaining.",
          {
            kind: "An inference to the best explanation",
            premises: [
              "Science depends on two things it can't supply for itself: a world ordered by laws simple enough to be found, often in mathematics, and minds able to find them.",
              "If the world was made by a rational God who made human beings able to know it, both are what we would expect.",
              "If the world and our minds came from unguided processes alone, the order is simply a brute fact, and our ability to grasp it far beyond anything survival required is at least surprising.",
            ],
            conclusion: "The success of science fits belief in God at least as well as it fits unbelief, and I think better. It doesn't settle the question. It turns the objection around.",
          },
          "The third premise carries the weight, and the best reply to it is a serious one. Evolution, the skeptic says, would favor minds that track the world truly, because minds that get the world wrong get eaten, and a general intelligence built for hunting and planning can be turned to physics. I think that explains part of it. It explains less of the rest: why the deepest laws are written in mathematics, some of it worked out for its own beauty long before anyone knew it described anything, and why minds shaped to find food can follow the universe down to quantum fields. The philosopher Alvin Plantinga pressed this point in Where the Conflict Really Lies (2011). He argued that the conflict is not between science and belief in God but between science and naturalism, the view that nature is all there is. His argument has drawn strong replies, and I wouldn't rest everything on its strongest form. But the direction of it seems right to me. Psalm 19 said it long before anyone built a laboratory: \"The heavens declare the glory of God, and the sky above proclaims his handiwork\" (Psalm 19:1).",
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
      { author: "Eugene P. Wigner", title: "The Unreasonable Effectiveness of Mathematics in the Natural Sciences", in: "Communications on Pure and Applied Mathematics", year: "1960" },
      { author: "Augustine", title: "The Literal Meaning of Genesis", year: "early 5th century; trans. John Hammond Taylor, 1982" },
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
      "God is one in being and three in persons: the Father, the Son and the Holy Spirit, each fully God, and one God. The oneness and the threeness are not at the same level, so they do not collide. It stands in the Nicene Creed, the confession the great churches share, and here it is confessed, not put to a vote. But the charge against it is serious: Jews, Muslims, Unitarians and some careful philosophers say it is simply a contradiction. Below I set out that charge at full strength, say what the creeds claim and what they don't, show why the first Christians, who were Jews, ended up saying it, and say plainly what remains a mystery. A mystery is something we can't see to the bottom of. A contradiction is something that can't be true. The question is which one this is.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "The objection comes from three directions. Israel's daily confession is \"Hear, O Israel: The LORD our God, the LORD is one\" (Deuteronomy 6:4), and Jesus himself called it the most important commandment (Mark 12:29). Maimonides, the great Jewish teacher of the twelfth century, made God's unity the second of his thirteen principles of faith: the cause of all things is one, with a oneness unlike any other, not divisible in any way. Seen from there, a God in three persons abandons the very verse Christians say they keep.",
          "Islam presses the same point from its own scripture. In the Saheeh International translation the Qur'an says, \"And do not say, 'Three'; desist - it is better for you. Indeed, Allah is but one God. Exalted is He above having a son\" (Qur'an 4:171). Its shortest chapter confesses that God \"neither begets nor is born, Nor is there to Him any equivalent\" (Qur'an 112:3-4). To a Muslim, calling Jesus God is the gravest error there is: setting something beside the one God.",
          "Inside Christianity the Unitarians made the case from the Bible itself. William Ellery Channing's sermon \"Unitarian Christianity,\" preached in Baltimore in 1819, rejected the Trinity as contrary to the unity of God. The philosopher Dale Tuggy argues today that in the New Testament the one God is the Father alone.",
          "Philosophers have put it as plain logic. Richard Cartwright's essay \"On the Logical Problem of the Trinity,\" published in his Philosophical Essays in 1987, takes the Athanasian Creed at its word and asks whether its sentences can all be true together.",
          {
            kind: "The objection, as a deductive argument",
            premises: [
              "The Father is God, the Son is God, and the Holy Spirit is God.",
              "The Father is not the Son, the Son is not the Spirit, and the Spirit is not the Father.",
              "If each of three distinct beings is a God, there are at least three Gods. Cartwright held this way of counting to be plain to reason: if every A is a B, there can't be fewer B's than A's.",
            ],
            conclusion: "There are at least three Gods, which the creed itself denies. So the doctrine, as stated, contradicts itself.",
          },
          "I grant what is true here. If the premises mean what they seem to mean, the conclusion follows. And the church has often answered badly, with a shrug or a picture: many Christians, asked to explain the Trinity, describe three gods on a team or one God in three costumes. If that's the doctrine, the objectors are right. So the first thing is to get straight what it says.",
        ],
      },
      {
        heading: "What the creeds claim, and what they don't",
        body: [
          "The Athanasian Creed, written in Latin around 500, is the church's most exact statement. \"And the catholic faith is this: that we worship one God in Trinity, and Trinity in Unity; neither confounding the Persons, nor dividing the Substance.\" Then it says the sentences Cartwright built his argument from: \"So the Father is God, the Son is God, and the Holy Ghost is God; and yet they are not three Gods, but one God.\" The Nicene Creed says it with less arithmetic. The Son is \"of one substance with the Father,\" and the Holy Spirit is the one \"who with the Father and the Son together is worshipped and glorified.\"",
          "Notice what the creeds don't claim. They don't say that one equals three, or that God has three parts, or that one person plays three roles in turn, or that the Son or the Spirit is a lesser god. What they claim is that God is one in one respect, his being, what God is, and three in another, the persons, who God is. In short: one what, three whos.",
          "Augustine, in his long work On the Trinity, was honest about how far the words reach. \"When the question is asked, What three? human language labors altogether under great poverty of speech\" (On the Trinity 5.9, in the Nicene and Post-Nicene Fathers translation). The church says \"three persons,\" he went on, not because the word says everything, but so that something can be said rather than nothing.",
        ],
      },
      {
        heading: "Why the church said it",
        body: [
          "The doctrine was forced on the church by its own evidence. The first Christians were Jews, the last people on earth who would invent a doctrine that multiplied God. They prayed the Shema. And yet within a few years of the crucifixion they were worshiping Jesus. The historian Larry Hurtado argued in Lord Jesus Christ (2003) that devotion to Jesus as divine began early, among his Jewish followers, inside their belief in one God, not as a later borrowing from pagan religion. Around the year 112 Pliny the Younger, a Roman governor, reported to the emperor Trajan that the Christians he questioned sang a hymn to Christ \"as to a god.\" Writing in the 50s, Paul takes the Shema itself and says, \"yet for us there is one God, the Father, from whom are all things and for whom we exist, and one Lord, Jesus Christ, through whom are all things and through whom we exist\" (1 Corinthians 8:6). Richard Bauckham reads that as placing Jesus inside the Shema; others disagree.",
          {
            kind: "An argument from the evidence the church had to hold together",
            premises: [
              "Scripture teaches that there is one God and no other (Deuteronomy 6:4).",
              "Scripture speaks of the Father, of the Son and of the Spirit in ways it speaks only of God. \"In the beginning was the Word, and the Word was with God, and the Word was God\" (John 1:1). Thomas says to the risen Jesus, \"My Lord and my God!\" (John 20:28). Peter tells a man who lied \"to the Holy Spirit,\" \"You have not lied to man but to God\" (Acts 5:3-4).",
              "Scripture keeps the three distinct. At Jesus' baptism the Spirit descends and the Father says, \"This is my beloved Son, with whom I am well pleased\" (Matthew 3:17). The risen Jesus sends his followers out \"baptizing them in the name of the Father and of the Son and of the Holy Spirit\" (Matthew 28:19). Paul blesses a church: \"The grace of the Lord Jesus Christ and the love of God and the fellowship of the Holy Spirit be with you all\" (2 Corinthians 13:14).",
            ],
            conclusion: "Any faithful account has to hold all three at once. Drop the first and you have many gods. Drop the second and you have a Jesus who is less than God. Drop the third and you have one person in disguises. The doctrine of the Trinity is the church's refusal to drop any of them.",
          },
          "The weight sits on the second premise, and it is contested. Tuggy reads the high texts as speaking of a man God exalted, and Bart Ehrman argued in How Jesus Became God (2014) that Jesus did not call himself God and that belief in his divinity came after belief in his resurrection. The church argued over these texts for three centuries. Arius, a presbyter of Alexandria, taught that the Son was the first and greatest thing God made. In 325 the council at Nicaea answered that the Son is of the same being as the Father, \"begotten, not made.\" Athanasius, who defended Nicaea for the rest of his life, pressed the reason: a creature, however high, cannot save you; only God can. In 381 the council at Constantinople said the same of the Spirit. A reasonable person can weigh the texts and side with Tuggy. But the doctrine was not a Greek idea laid over a simple gospel. It was the slow answer to what the earliest Jewish Christians were already doing on their knees.",
        ],
      },
      {
        heading: "Why every picture fails",
        body: [
          "Every analogy fails, whether water, clover, or sun, and the failure is a clue. There is nothing else like God. Each bad picture teaches an old error the church already weighed and set aside.",
          "Water as ice, liquid and steam, or a man who is at once a father, a son and a husband, teaches modalism: one person who shows up in three modes. Early in the third century Tertullian answered a teacher named Praxeas, who held something like it, and said that Praxeas \"put to flight the Paraclete, and he crucified the Father\" (Against Praxeas 1). If the Son is only the Father in another mode, then in Gethsemane Jesus was praying to himself.",
          "Three men who share one human nature teaches tritheism. Gregory of Nyssa took up exactly this objection in his short work On \"Not Three Gods,\" where it is put to him that \"Peter, James, and John, being in one human nature, are called three men.\" His answer was that men who share a task each work at it by himself, while the Father, the Son and the Spirit never act apart. A clover's three leaves fails another way: it makes each person a third of God, when the creed says each is wholly God.",
          "A father and a son in time teaches Arianism. A human son comes after his father, so there was a time when he did not exist. That was Arius's slogan about Christ, and it is why the Nicene Creed says he was \"begotten of his Father before all worlds.\" No picture taken from inside the world can show how its maker is one, which is what you would expect if the doctrine is about the maker.",
        ],
      },
      {
        heading: "A mystery, not a contradiction",
        body: [
          "Go back to Cartwright. A contradiction says that something is and is not so in the same respect. The creed says God is one in being and three in persons. The weight of the objection sits on the third premise, which reads \"the Son is God\" the way we read \"Peter is a man\": as one more member of a kind, to be counted. The creed doesn't mean that. It means the Son is wholly the one divine being, not one more instance of it. How to state that with full logical precision is still argued, and philosophers have offered models. I give them as proposals and take no side.",
          "The Latin model, which looks back to Augustine and is defended by Brian Leftow, starts from the one God and takes the persons as distinct by their eternal relations to one another. Its hard question is whether it can keep the persons from collapsing into modes. The social model, defended by Cornelius Plantinga Jr. and others, starts from three persons in perfect communion, one in nature and will. Its hard question is whether it can keep from becoming three gods. The relative identity model, which goes back to the philosopher Peter Geach, holds that things can be the same God without being the same person, and Peter van Inwagen showed that a statement of the doctrine can be free of formal contradiction in such a logic. Its hard question is whether sameness can really be relative to a kind.",
          "The strongest reply goes like this. Showing that a doctrine can't be proved contradictory is a low bar. You have stretched the words \"person\" and \"being\" until they no longer say anything, and a claim that says nothing can't be wrong. Part of that is simply true: \"person\" does not mean in God what it means of us, and Augustine said so. But the creed still rules things out, and that's the test of a claim that says something. It rules out three gods, a lesser Christ, and one God in masks. It tells you who was praying in Gethsemane, and to whom. It does not let you see to the bottom of God, and Christians have never claimed it does.",
        ],
      },
      {
        heading: "What this does not prove",
        body: [
          "None of this proves the Trinity true. It shows, I think, that it is not the incoherence it is said to be, and that it was forced, not invented, by Jews who would not give up the Shema and could not stop worshiping Jesus. Whether they were right rests on who Jesus was, and that rests on whether he was raised from the dead, which has its own page here. If he was, the question is no longer how the church could say something so strange, but what else it could honestly have said.",
          "And there is a reason the church held this line so hard. \"Anyone who does not love does not know God, because God is love\" (1 John 4:8). A solitary god could acquire love only by making something to love. The God of the creeds is love all the way down. The night before he died, Jesus prayed to his Father, \"you loved me before the foundation of the world\" (John 17:24). The church didn't flunk arithmetic. It refused to let arithmetic be the measure of God, and it never claimed to see to the bottom of him. It claimed to have been told his name.",
        ],
      },
    ],
    sources: [
      { author: "Richard Cartwright", title: "On the Logical Problem of the Trinity", in: "Philosophical Essays", year: "1987", note: "The logical objection in its classic form." },
      { author: "Dale Tuggy", title: "Trinity", in: "Stanford Encyclopedia of Philosophy", year: "2009", note: "The strongest case against: a philosopher who holds that the one God is the Father alone, surveying every answer. Revised since." },
      { author: "Cornelius Plantinga Jr.", title: "Social Trinitarianism and Tritheism", in: "Trinity, Incarnation, and Atonement", year: "1989" },
      { author: "Peter van Inwagen", title: "And Yet They Are Not Three Gods But One God", in: "God, Knowledge, and Mystery", year: "1995" },
      { author: "Brian Leftow", title: "Anti Social Trinitarianism", in: "The Trinity: An Interdisciplinary Symposium", year: "1999" },
      { author: "Larry W. Hurtado", title: "Lord Jesus Christ: Devotion to Jesus in Earliest Christianity", year: "2003" },
      { author: "Richard Bauckham", title: "Jesus and the God of Israel", year: "2008" },
      { author: "Bart D. Ehrman", title: "How Jesus Became God", year: "2014", note: "The best case that belief in Jesus' divinity came later." },
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
    bookTitle: "A Higher Allegiance",
    bookHref: "/books/a-higher-allegiance",
  },
  {
    slug: "what-does-the-bible-say-about-money",
    question: "What does the Bible actually say about money?",
    paragraphs: [
      "The Bible treats wealth as a genuine good, a serious danger, and a thing you cannot finally serve alongside God, all three at once. Getting money wrong is almost always grabbing one of those truths and dropping the other two. Jesus spoke often about money and possessions, and many of his parables turn on them.",
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
          "A related argument, the kalam, revived by William Lane Craig in 1979, adds that the universe began to exist. In 2003 the physicists Arvind Borde, Alan Guth and Alexander Vilenkin showed that inflationary spacetimes, in the words of their paper's title, \"are incomplete in past directions,\" though physicists still argue over whether quantum effects open a way around it. If the universe did begin, the contingency argument only gets stronger. It just doesn't depend on that.",
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
      "I don't know, and the people who told you they knew, in either direction, told you something the text withholds. What I can say is what Christians confess, what Scripture actually says and doesn't say, and what each Christian answer has to face. Christians confess that whoever is saved is saved by Christ and no one else, and that the Judge of all the earth will do what is just. How God deals with the person who lived and died where the name of Jesus was never spoken is a question faithful Christians answer in more than one way. The three main answers are set out on the page \"Is Jesus really the only way to God?\" This page goes underneath them, to the moral objection itself, because it deserves to be heard at full strength before anyone answers it.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "The question that undoes people is not whether God exists. It is whether he is fair to the man who died on a mountainside a thousand years before a missionary crossed the water, who never heard the name of Jesus, not once. It is the soft place in the exclusive claim, the one that makes settled believers change the subject.",
          "Philosophers call it the soteriological problem of evil, from the Greek word for salvation, and it is built like the older problem of suffering. John Hick, the most careful defender of religious pluralism, pressed the fact underneath it: the faith a person holds depends, in the great majority of cases, on where that person was born. If salvation depends on believing in Jesus, it seems to depend on the luck of birth.",
          {
            kind: "The objection, as a deductive argument",
            premises: [
              "A just God does not condemn anyone for failing to do what they could not have done.",
              "Many people could not have believed in Jesus: those who lived before him, those who lived and died where his name never came, and those who died as infants.",
              "Christianity teaches that no one is saved except by believing in Jesus.",
            ],
            conclusion: "Either the God of Christianity is unjust, or Christianity's claim about salvation is false.",
          },
          "The argument has a second edge. Annie Dillard tells a story in Pilgrim at Tinker Creek (1974) of an Inuit hunter who asked a missionary priest whether he would go to hell if he had never known about God and sin. No, said the priest, not if you did not know. Then the hunter asked why, in that case, the priest had told him. If not knowing excuses, the mission puts people in danger. If it doesn't, God condemns people for a message no one sent them. Either way, the objector says, the Christian is stuck.",
          "I grant what is true here. The first premise is true, and Scripture says so before any skeptic did. When God was about to judge Sodom, Abraham stood before him and pressed: \"Shall not the Judge of all the earth do what is just?\" (Genesis 18:25). God did not rebuke the question. He let Abraham press it again and again. And the second premise is plainly true. Most people who have ever lived never heard of Jesus. Some Christians have answered this with a shrug, as if the fate of most of the human race were a footnote. It isn't. If the third premise means what it seems to mean, the objector has a case.",
        ],
      },
      {
        heading: "What Scripture actually says",
        body: [
          "So the weight sits on the third premise, and the first thing to see is that it runs together two claims Scripture keeps apart. One is that no one is saved except by Christ. The church confesses that without hedging: \"there is salvation in no one else, for there is no other name under heaven given among men by which we must be saved\" (Acts 4:12). The other is that no one is saved except by knowing Christ's name and trusting him in this life. That second claim may be true. But it isn't the same claim, and the Bible itself shows the difference.",
          "Take the people who lived before Christ. Abraham \"believed the LORD, and he counted it to him as righteousness\" (Genesis 15:6), long before Bethlehem. Hebrews says of him and the others that \"These all died in faith, not having received the things promised, but having seen them and greeted them from afar\" (Hebrews 11:13). Paul says the cross showed God's righteousness \"because in his divine forbearance he had passed over former sins\" (Romans 3:25). Every Christian view holds that these believers were saved by Christ, by a work done centuries after they died, though they never heard his name. Salvation by Christ alone has never meant, for them, salvation only for those who knew what to call him.",
          "Then there are people outside Israel whom Scripture treats with respect. Melchizedek, a king who met Abram, was \"priest of God Most High\" (Genesis 14:18), and Abram gave him \"a tenth of everything\" (Genesis 14:20). Job lived in the land of Uz, not in Israel, and God himself calls him \"a blameless and upright man\" (Job 1:8). Cornelius was a Roman centurion, \"a devout man who feared God with all his household\" (Acts 10:2), before he had heard the gospel, and Peter said at his door, \"Truly I understand that God shows no partiality, but in every nation anyone who fears him and does what is right is acceptable to him\" (Acts 10:34-35).",
          "Scripture also says that no one is left with nothing. Paul writes that God's \"invisible attributes, namely, his eternal power and divine nature, have been clearly perceived, ever since the creation of the world, in the things that have been made. So they are without excuse\" (Romans 1:20). At Lystra he said, \"In past generations he allowed all the nations to walk in their own ways. Yet he did not leave himself without witness\" (Acts 14:16-17), and he pointed to the rain and the harvest. In Romans 2:14-15 he speaks of Gentiles who never had the law yet \"show that the work of the law is written on their hearts.\" And in Athens he said that God \"made from one man every nation of mankind to live on all the face of the earth, having determined allotted periods and the boundaries of their dwelling place\" (Acts 17:26), \"that they should seek God, and perhaps feel their way toward him and find him\" (Acts 17:27).",
          "Here is what follows, and it is shared by every Christian view. No one in Scripture is condemned for never hearing a name. Paul says that people are judged by the light they had, the law by the law and the conscience by the conscience (Romans 2:12-16), and that \"all have sinned and fall short of the glory of God\" (Romans 3:23). The question the Bible raises is not whether God will hold the man on the mountain responsible for a sermon he never heard. He won't. It is whether that man, judged by his own light, can be rescued by a Christ he never knew. On that, Scripture speaks less than either side wants.",
          "It is just as important to see what Scripture doesn't say. It never says that the light of creation and conscience is enough to save anyone. Romans 1 says it is enough to leave us without excuse, which is a different thing. Paul's chain in Romans 10 still stands: \"How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching?\" (Romans 10:14). Cornelius, devout as he was, was told that Peter would bring \"a message by which you will be saved, you and all your household\" (Acts 11:14). And in Athens Paul said, \"The times of ignorance God overlooked, but now he commands all people everywhere to repent\" (Acts 17:30), and then went straight to the day of judgment and the resurrection (Acts 17:31). The overlooking is real mercy. It is not a promise that ignorance saves.",
        ],
      },
      {
        heading: "What each answer has to face",
        body: [
          "The three main Christian answers are on the page \"Is Jesus really the only way to God?\" I won't repeat them at length. Each takes Scripture seriously, and each has a question it has to face.",
          "The view that a person must hear the gospel and believe in this life reads Romans 10 and Acts 11:14 at face value. Its hardest case is the one its defenders know best: the billions who never heard. The philosopher William Lane Craig gave this view its most careful defense in an article in Faith and Philosophy in 1989. He proposed that God, who knows what every person would freely do in any circumstance, may have so ordered the world that those who never hear are those who would not have believed if they had. That proposal can't be shown false. Critics answer that it can't be shown true either, that it is hard to square with reflective people who have heard and still find themselves unable to believe, and that it says nothing about a child who dies before believing anything.",
          "The view that Christ may save some who never knew his name, through their response to the light God gave them, leans on Abraham, Melchizedek, Job and Cornelius, and on the minimum Hebrews names: \"whoever would draw near to God must believe that he exists and that he rewards those who seek him\" (Hebrews 11:6). Its hard question is why the New Testament presses so hard on hearing, why Cornelius still had to be told, and what exactly a person who never heard is trusting.",
          "The view that everyone will meet Christ, at death or after it, and be able to answer him, reads 1 Peter 3:19 and 4:6 as a door left open. Its hard question is Hebrews 9:27, that after death comes judgment, and the silence of almost all of Scripture about any later chance.",
          "Notice that none of the three says God condemns people for an accident of birth. They disagree about how the one Savior reaches those who never heard, or whether he does. That's a second-order question: it divides faithful Christians, not the faith. The creeds don't settle it, and I won't pretend they do.",
        ],
      },
      {
        heading: "The child, and the best reply",
        body: [
          "Then there is the child who dies before she can believe anything. Scripture doesn't answer this in a direct sentence, and honesty starts there. What it gives is a few texts. After his infant son died, David said, \"I shall go to him, but he will not return to me\" (2 Samuel 12:23), and he said it as comfort. Moses spoke of children who have \"no knowledge of good or evil\" (Deuteronomy 1:39), a real category of those who never reached the age of choosing. Many Christians, across many traditions, have hoped and taught that such children are safe in Christ. That hope rests on the character of the Judge more than on any single verse, and it should be stated as hope, not as a doctrine Scripture spells out.",
          "The strongest reply goes like this. You've shown that Christians disagree, and that none of you knows. That's not an answer. If God wanted to be fair to the man on the mountain, he could have sent someone. The reply is fair, and I won't make it smaller. Christianity doesn't claim to know how God will judge every person who never heard. It claims to know who the Judge is. Here is the one thing in this whole question we are told plainly: the Judge did not stay behind the glass. He crossed every distance himself and went to a cross rather than spare himself, in public, where anyone could watch. Whatever he does with the ones who never heard, he will not do it from a distance, and he will not do it unjustly.",
        ],
      },
      {
        heading: "What this does not settle",
        body: [
          "None of this tells you the fate of any person who never heard, and I would distrust anyone who claimed to know it. It doesn't remove the cost of the exclusive claim; it locates it. If Jesus is the only Savior, then salvation is something no one earns by being born in the right place, and something no one is denied by being born in the wrong one, because it was never ours to deserve. Whether he is the only Savior rests on whether he rose, and that has its own page.",
          "And it leaves the church with work it cannot hand off. If I don't know the unreached are safe, and I don't, then reaching them isn't optional and my comfort isn't the point. The uncertainty is a reason for the mission, not an excuse from it. That answers Dillard's hunter, too. The gospel isn't news that makes people guilty. They were already accountable for the light they had. It's the news of a rescue, and nobody who believed it would keep it to himself.",
          "We keep trying to settle the mechanism when we were never given the list. We were given the Judge, before whom Abraham stood and pressed his question, and who did not send him away for asking. The question is still open in the way Abraham left it: not whether the Judge of all the earth will do right, but whether we will trust him to.",
        ],
      },
    ],
    sources: [
      { author: "John Hick", title: "An Interpretation of Religion", year: "1989", note: "The best book against: the case that no single faith can be the only way." },
      { author: "Annie Dillard", title: "Pilgrim at Tinker Creek", year: "1974", note: "The hunter's question to the missionary." },
      { author: "William Lane Craig", title: "\"No Other Name\": A Middle Knowledge Perspective on the Exclusivity of Salvation through Christ", in: "Faith and Philosophy", year: "1989" },
      { author: "John Sanders", title: "No Other Name: An Investigation into the Destiny of the Unevangelized", year: "1992" },
      { author: "Clark H. Pinnock", title: "A Wideness in God's Mercy", year: "1992" },
      { author: "John Sanders, Gabriel Fackre and Ronald Nash", title: "What About Those Who Have Never Heard? Three Views on the Destiny of the Unevangelized", year: "1995", note: "Three Christian views, each argued by its defender." },
      { author: "Second Vatican Council", title: "Lumen Gentium", year: "1964", note: "Section 16, on those who through no fault of their own do not know the gospel." },
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
      "You can be good without God, and pretending otherwise is the lie that discredits every true thing standing near it. Atheists are not, as a class, worse neighbors or parents or citizens than the people filling pews. The claim was never that unbelievers can't behave well. The real question is quieter: what makes the word good point at anything real when anyone says it, believer or not. My answer is that moral facts which really bind us fit a world made by a good God better than a world without one. That isn't a proof, and it says nothing against the goodness of the atheist next door. It's a question about what his goodness is answering to.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "Start with what is plainly true. Most of us know people who believe nothing about God and are kinder, more truthful and more generous than plenty of people in church on Sunday. I came to faith from atheism, so I'm not describing strangers. Christians have often been unfair here. In a study published in 2017, a team led by the psychologist Will Gervais described to more than three thousand people in thirteen countries a man who had tortured animals as a boy and later killed five homeless people. Participants were about twice as likely to connect him with atheism as with religious belief. Even atheists did it. Paul would not have shared that suspicion. He wrote that Gentiles who never had the law of Moses still \"show that the work of the law is written on their hearts, while their conscience also bears witness\" (Romans 2:15).",
          "The unbeliever also has more than one good account of where morality comes from. The first is evolutionary. Charles Darwin set it out in The Descent of Man (1871): \"any animal whatever, endowed with well-marked social instincts, would inevitably acquire a moral sense or conscience, as soon as its intellectual powers had become as well developed, or nearly as well developed, as in man.\" Creatures who protected their young, punished cheats and kept faith with each other tended to survive, and over a very long time that pressure gave us outrage at cruelty and guilt at betrayal. On this view morality is real the way language is real, a deep part of human life that needs no explanation beyond biology and history.",
          "The second account is stronger, and it doesn't rest on biology at all. Many philosophers who don't believe in God hold that moral truths are simply true, the way the truths of mathematics are. The philosopher Erik Wielenberg, an atheist, has defended this at length in Value and Virtue in a Godless Universe (2005) and Robust Ethics (2014). The most basic ethical facts, he argues, hold necessarily and need nothing beneath them. \"On my view,\" he writes, \"objective morality does not require an external foundation of any kind.\" Every explanation has to stop somewhere. The theist stops at God; Wielenberg stops at the moral facts. In the 2020 PhilPapers survey of professional philosophers, about 62 percent said they accept or lean toward moral realism, the view that there are objective moral facts.",
          "The third is the oldest objection there is. In Plato's Euthyphro, set in 399 BC as Socrates waits to answer the charge that will end in his death, he asks \"whether the pious or holy is beloved by the gods because it is holy, or holy because it is beloved of the gods.\" Put in terms of one God: is a thing good because God commands it, or does God command it because it is good? If the first, then had God commanded cruelty, cruelty would be good, and calling God good means only that he does what he likes. If the second, goodness is a standard above God, and you can have it without him.",
          "I grant the first point completely, and I grant that each of the other two is held by serious people for serious reasons. If the Christian claim were that you need to believe in God to know that cruelty is wrong, the skeptic would win, and Romans 2 would be on his side.",
        ],
      },
      {
        heading: "What kind of question this is",
        body: [
          "There are three questions here, and the argument goes wrong whenever they're mixed up. Can an unbeliever behave well? Yes. Can an unbeliever know right from wrong? Yes, and Paul says so. The third is the one that's actually open: what makes a moral claim true, and what makes it bind us? The argument below is only about the third.",
          "It's an argument to the best explanation, the kind a detective or a historian makes. It doesn't claim to prove God from premises no one can deny. It asks which picture of the world makes the best sense of something nearly all of us already believe.",
        ],
      },
      {
        heading: "The argument, laid out",
        body: [
          {
            kind: "An argument to the best explanation (the moral argument, in my words)",
            premises: [
              "Some moral claims are objectively true. It is wrong to torment a child for fun, and it would still be wrong if everyone voted otherwise.",
              "Such truths do more than describe. They bind: they give every person a reason not to do the thing, whether he wants to or not.",
              "We are able to know at least some of them.",
              "If there is a God who is goodness itself and who made human beings to know him, all three are what we would expect.",
              "The main accounts without God each leave at least one of them unexplained.",
            ],
            conclusion: "Objective morality is evidence for God. It doesn't prove him, but it makes his existence more likely than it would otherwise be.",
          },
          "Most people, believers or not, accept the first three premises in the way they live and argue. Anyone who presses the problem of evil is using them, since the argument from suffering needs real evil to work. The one consistent way out is to deny the first premise, and J. L. Mackie, the Oxford philosopher and atheist, took it. His Ethics: Inventing Right and Wrong (1977) argued that objective values, if they existed, would be strange things unlike anything else in the universe, facts with a demand built into them. He called it the argument from queerness, and concluded there are none. In The Miracle of Theism, published in 1982 after his death, he allowed that if there were objective moral values of that kind, they would be very unlikely to have arisen in the ordinary course of events without a god to create them. He kept his atheism by giving up the values.",
          "So the weight sits on the fifth premise. That's where a fair reader should push, and it's where the secular accounts make their case.",
        ],
      },
      {
        heading: "What evolution can and can't explain",
        body: [
          "Christians differ over how much of the evolutionary history to accept, and nothing here depends on settling it. Grant the whole account, and it explains why we feel what we feel. What it can't do by itself is tell us whether the feeling is right.",
          "Darwin saw this. In the same chapter he imagined people \"reared under precisely the same conditions as hive-bees,\" and said that then \"our unmarried females would, like the worker-bees, think it a sacred duty to kill their brothers, and mothers would strive to kill their fertile daughters; and no one would think of interfering.\" If our sense of right is only the shape that survival pressed into us, then a different history would have given us a different sense, and neither would be truer than the other. The philosopher Sharon Street pressed the same point in 2006, from the other side. Natural selection rewards what helps an animal survive and reproduce, and it has no reason to track moral facts that exist independently of us. If such facts exist, it would be a remarkable coincidence for our judgments to match them. Street concluded that we should stop thinking of values as existing independently of us at all.",
          "Taken alone, the evolutionary account leaves the second premise unexplained. It tells us why we feel bound. It can't tell us that we are.",
        ],
      },
      {
        heading: "Moral facts without God",
        body: [
          "That's why Wielenberg doesn't rest his case on evolution. His view takes the first three premises as seriously as any Christian does, and he has an answer to Street: the same features of our minds that make moral facts hold of us also lead us to believe them, so the match is no accident. His strongest point is parity. The theist says God is the stopping place and needs no explanation. Why may the atheist not say the same of the basic moral facts?",
          "It's a fair question, and here is my answer. Every account stops somewhere; what matters is where. A brute moral fact is an abstract thing. It can't command you, and it can't forgive you. Yet obligation doesn't feel like noticing an abstract truth. It feels like being answerable, which is why guilt is so much like owing someone. Mackie's oddness is still there on Wielenberg's view. He has simply accepted it as a feature of the world. On the Christian view, the demand built into a moral fact comes from a person, the one to whom we are answerable, and the knowing comes from the same source: the God who is good made creatures able to know the good. That is not a knockdown reply. Reasonable people hold Wielenberg's view. I think it leaves the binding and the knowing as two separate pieces of luck, where theism explains both with one cause.",
        ],
      },
      {
        heading: "The Euthyphro dilemma, answered",
        body: [
          "The classical Christian answer takes neither of Socrates' options. Thomas Aquinas taught that \"God alone is good essentially,\" and that everything else is good by sharing in his goodness. Goodness is not a rule God might have written differently, and it isn't a law above him that he obeys. It is what God is. The philosopher Robert Merrihew Adams worked this out in Finite and Infinite Goods (1999). On his account the supreme good is God himself, and other things are excellent in the measure they resemble him. Moral obligation is then the command of a God who is loving, and on Adams's account it is that love which keeps such a God from commanding wanton cruelty. Scripture puts it in the language of a gift: \"Every good gift and every perfect gift is from above, coming down from the Father of lights, with whom there is no variation or shadow due to change\" (James 1:17).",
          "The skeptic can press back: haven't you just moved the question? Why should God's character be the measure? But that is the parity question again, and the answer is the same. Something has to be the measure. The only question is whether it is an impersonal fact or a person who is good. The dilemma also bites hardest in one place, and I won't hide it. The Old Testament records commands to kill that look like the very cruelty a good God would not command. That question has its own page, \"Did God command genocide in the Old Testament?\", and it doesn't get an easy answer there either.",
        ],
      },
      {
        heading: "The best reply, and what this does not prove",
        body: [
          "The strongest reply goes like this. You can't even recognize God's commands as good without already using your own moral sense, so morality comes first and God adds nothing. Half of that is right. We do know right from wrong before we know where it comes from, and Paul says so. But knowing a thing and explaining it are different. People knew that fire burns long before anyone knew what fire is. The moral argument doesn't say you need God to see the moral facts. It says the moral facts you already see make the most sense if God is there.",
          "Here is what the argument doesn't prove. It doesn't prove that God exists; it makes him more likely, and the other lines of evidence have their own pages. It doesn't show which God, though a God who is goodness itself narrows the field. It doesn't show that believers behave better than unbelievers. Friedrich Nietzsche, who had no love for Christianity, said of George Eliot and the English moralists like her, \"They are rid of the Christian God and now believe all the more firmly that they must cling to Christian morality.\" His verdict was that \"When one gives up the Christian faith, one pulls the right to Christian morality out from under one's feet.\" He wasn't calling them bad people. He was saying they lived on an inheritance whose source they had given up. A Christian has to hear the other half too. Paul's passage about the law written on Gentile hearts is aimed at the religious: \"Therefore you have no excuse, O man, every one of you who judges. For in passing judgment on another you condemn yourself, because you, the judge, practice the very same things\" (Romans 2:1). We have often had a sound account of goodness without the life to match it.",
          "Mark tells of a man who ran up to Jesus and knelt and called him \"Good Teacher.\" Jesus answered, \"Why do you call me good? No one is good except God alone\" (Mark 10:18). The man had kept the commandments since he was young, and Jesus didn't dispute it. Mark adds, \"And Jesus, looking at him, loved him\" (Mark 10:21). If you don't believe, no one is asking you to stop being good. The question is what your goodness is answering to, and whether it was ever as impersonal as it seemed.",
        ],
      },
    ],
    sources: [
      { author: "Charles Darwin", title: "The Descent of Man, and Selection in Relation to Sex", year: "1871", note: "Chapter on the moral sense." },
      { author: "J. L. Mackie", title: "Ethics: Inventing Right and Wrong", year: "1977" },
      { author: "J. L. Mackie", title: "The Miracle of Theism", year: "1982" },
      { author: "Robert Merrihew Adams", title: "Finite and Infinite Goods", year: "1999", note: "The good as God, and obligation as the command of a loving God." },
      { author: "Sharon Street", title: "A Darwinian Dilemma for Realist Theories of Value", in: "Philosophical Studies", year: "2006" },
      { author: "Erik J. Wielenberg", title: "Robust Ethics: The Metaphysics and Epistemology of Godless Normative Realism", year: "2014", note: "The best book against: moral facts without God." },
      { author: "Friedrich Nietzsche", title: "Twilight of the Idols", year: "1889" },
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
      "No, though a good deal of what gets called faith is exactly the credulous thing the charge names, and I won't defend it. The church has too often praised not-thinking as a virtue and used \"just have faith\" as a lid on a pot it did not want boiling. If faith means believing without evidence, or against it, the skeptic is right to call it irrational. But that isn't what the New Testament means by the word, and it isn't how reason works either. Faith in the Bible is trust in someone, resting on testimony and evidence and reaching past what can be seen. And no one, the skeptic included, believes only what he can prove, because every chain of reasons ends in trust somewhere. The real question isn't whether you trust. It's whether what you trust has earned it.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "The case was put most sharply in 1877, by the mathematician W. K. Clifford, in an essay called \"The Ethics of Belief.\" He told of a shipowner who quiets his own doubts about an old ship and sends it to sea full of emigrants. Clifford says the man is guilty whether the ship sinks or not, because he had no right to believe it was sound on the evidence he had. Then Clifford stated his rule: \"It is wrong always, everywhere, and for anyone, to believe anything upon insufficient evidence.\"",
          "Clifford is often caricatured, and he shouldn't be. He didn't say we may believe only what we've checked ourselves. In the second part of the essay he allowed that we may believe what others tell us, when there is good reason to think they know what they're talking about and are telling the truth as far as they know it. His rule is about proportion, the same rule David Hume had set down in 1748: \"A wise man, therefore, proportions his belief to the evidence.\" That's the view philosophers call evidentialism, and in that form it's hard to argue with. Most of us live by it every day, and we're right to.",
          "Set beside that rule a definition of faith, and the charge writes itself. Richard Dawkins, in The Selfish Gene, described faith as blind trust without evidence and even against it. If that is faith, then Clifford's rule condemns it, and it should.",
          "I grant more than a skeptic might expect. Plenty of Christians use faith in just that sense. They say \"you just have to believe\" when a question gets hard, and they treat doubt as disloyalty. A faith that can't bear to be examined deserves Clifford's verdict, and I'd rather say so myself than wait for a skeptic to say it for me.",
        ],
      },
      {
        heading: "What kind of question this is",
        body: [
          "There are two questions here. The first is about words and history: what did the first Christians mean when they spoke of faith? The second is about knowledge: does every rational belief have to rest on evidence, all the way down? Neither answer proves that God exists. Together they show whether faith, as the New Testament uses the word, is the thing Clifford's rule forbids.",
        ],
      },
      {
        heading: "What the New Testament means by faith",
        body: [
          "The Greek word is pistis, with its verb pisteuō, to trust or believe. Teresa Morgan, a historian of the ancient world, studied how the word was used across the Roman world in Roman Faith and Christian Faith (2015). She argues that in the first century pistis meant above all a relationship of trust, in human dealings and between people and their gods, rather than assent to a list of ideas. In the New Testament that trust is bound up with beliefs about who Jesus is, but it is trust first. It is the kind of faith you have in a surgeon or a friend, and you have it because of what you know of them.",
          "The writers themselves point to their evidence. Luke opens his Gospel by saying he \"followed all things closely\" and wrote \"that you may have certainty concerning the things you have been taught\" (Luke 1:3-4). John closes his: \"these are written so that you may believe that Jesus is the Christ, the Son of God, and that by believing you may have life in his name\" (John 20:31). Paul lists the witnesses of the risen Jesus and adds that more than five hundred saw him at one time, \"most of whom are still alive\" (1 Corinthians 15:6), which is an invitation to go and ask. In Athens he said God \"has given assurance to all by raising him from the dead\" (Acts 17:31). The word translated assurance there is pistis itself. The thing that grounds faith is called by faith's own name.",
          "None of that makes faith the same as proof. \"Now faith is the assurance of things hoped for, the conviction of things not seen\" (Hebrews 11:1). Faith reaches past what can be seen, to what is promised and not yet here. But things unseen are not things disbelieved, and trust that goes beyond its evidence is not the same as trust against it. A wife who trusts her husband while he's away has no proof he is faithful tonight. She has years of knowing him. That is the shape of faith in the New Testament, and it's the part of the question worth arguing about.",
        ],
      },
      {
        heading: "The argument, laid out",
        body: [
          {
            kind: "An argument from the limits of evidence (after Thomas Reid and Alvin Plantinga, in my words)",
            premises: [
              "If every rational belief must rest on evidence, the evidence must itself be believed rationally, and so on.",
              "The chain can't go on forever, so it ends in beliefs we hold without evidence from anything further.",
              "Among those beliefs are some no one can do without: that our senses and memory are generally reliable, that other people have minds, that the future will be like the past, and that what others tell us is generally true.",
              "Holding those beliefs is not irrational.",
            ],
            conclusion: "Rational belief can't mean belief based on evidence all the way down. Every reasoner trusts. The real question is which trusts are reasonable, and which beliefs need argument before they may be held.",
          },
          "The weight sits on the third and fourth premises, and Hume is the best witness to both. In the same Enquiry, he showed that we can't prove by reasoning that the future will be like the past, because \"all inferences from experience suppose, as their foundation, that the future will resemble the past.\" Any argument for it assumes it. Hume didn't conclude that we should stop expecting the sun to rise. He concluded that \"Custom, then, is the great guide of human life.\" Thomas Reid, Hume's fellow Scot, who wrote against his skepticism, answered in An Inquiry into the Human Mind (1764) that our trust in our senses, and in what other people tell us, is part of how we are made, and that we would know almost nothing without it. Most of what you believe about history, geography and science you took on testimony. You were right to.",
          "In 1983, in \"Reason and Belief in God,\" the philosopher Alvin Plantinga turned this on the rule itself. A belief may be properly basic, he argued, rational to hold without being argued from other beliefs, as belief in other minds is. He also argued that the strict foundationalist's rule fails its own test, since the rule itself is neither self-evident nor evident to the senses, and no one has shown it from beliefs that are. Clifford's rule seems to me to have a version of the same difficulty: it's hard to say what evidence would be enough to establish it. Other philosophers, William Alston among them, have argued that Plantinga's case against foundationalism doesn't succeed in that form, and the debate is still live. But the first point stands on its own. If Clifford's rule were applied strictly, it would condemn trust no one can live without.",
        ],
      },
      {
        heading: "William James's reply",
        body: [
          "The American philosopher William James answered Clifford directly in \"The Will to Believe\" (1896). He thought Clifford's rule obeyed one fear, of being duped, as if it were the whole of duty. \"Clifford's exhortation has to my ears a thoroughly fantastic sound,\" he wrote. \"It is like a general informing his soldiers that it is better to keep out of battle forever than to risk a single wound.\" His central point was this: \"a rule of thinking which would absolutely prevent me from acknowledging certain kinds of truth if those kinds of truth were really there, would be an irrational rule.\"",
          "James was careful about where that applies. He meant questions that are live, forced and momentous, where refusing to decide is itself a decision; the page \"What if Christianity is wrong?\" takes that argument up. Here the point is narrower. A rule that would keep you from ever trusting a person until you could prove him trustworthy would keep you from ever finding out that he was. Some truths are only known from inside a trust.",
        ],
      },
      {
        heading: "The best reply, and what this does not prove",
        body: [
          "The strongest reply goes like this. Fine, everyone trusts their senses and their memory. But everyone shares those. Belief in God isn't like that. If you may hold it without argument, then anyone may hold anything without argument, and you've opened the door to every superstition there is. Philosophers call this the Great Pumpkin objection, after a cartoon, and Plantinga answered it himself: a belief is properly basic only when it has the right kind of ground, and there's no reason to think belief in the Great Pumpkin has one. The reply is still argued over, and I don't think a Christian should rest the whole case there. He doesn't have to. The New Testament itself doesn't ask anyone to believe without looking. It points to a public event, in a particular city, with named witnesses, and calls that event the assurance. Whether it happened is a historical question, and the page \"Did the resurrection actually happen?\" weighs it.",
          "Here is what the argument doesn't prove. It doesn't prove that God exists. It doesn't defend faith in Dawkins's sense; where believers hold their faith blindly or against the evidence, that is a failure, and Christians should say so. It doesn't make every trust reasonable, since trust can be misplaced, and the shipowner's was. What it shows is narrower. Faith as the New Testament describes it is not the opposite of reason. It is what reason does when it meets a person: it weighs what it can know and then trusts beyond it, or refuses to.",
          "Peter told the first Christians to honor Christ in their hearts, \"always being prepared to make a defense to anyone who asks you for a reason for the hope that is in you; yet do it with gentleness and respect\" (1 Peter 3:15). A reason for the hope. Everyone trusts something they can't stand outside of and prove: their own mind, the world going on tomorrow, the people who taught them. The question was never whether you live by faith. It's whether the one you trust has given you any reason to.",
        ],
      },
    ],
    sources: [
      { author: "David Hume", title: "An Enquiry Concerning Human Understanding", year: "1748", note: "Section IV, on why we expect the future to resemble the past." },
      { author: "Thomas Reid", title: "An Inquiry into the Human Mind on the Principles of Common Sense", year: "1764" },
      { author: "W. K. Clifford", title: "The Ethics of Belief", in: "Contemporary Review", year: "1877", note: "The best case against: believing on insufficient evidence is wrong." },
      { author: "William James", title: "The Will to Believe", year: "1896" },
      { author: "Richard Dawkins", title: "The Selfish Gene", year: "1976" },
      { author: "Alvin Plantinga", title: "Reason and Belief in God", in: "Faith and Rationality, ed. Plantinga and Wolterstorff", year: "1983" },
      { author: "Teresa Morgan", title: "Roman Faith and Christian Faith: Pistis and Fides in the Early Roman Empire and Early Churches", year: "2015" },
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
      "A rational person can believe in them, and a rational person can doubt them. What no one can do honestly is rule them out before looking. Miracles are rare by definition; if they were common they would not be miracles, because the word names the exception, not the schedule. The strongest case against them is David Hume's, and it deserves to be heard in his own words. It gives good reasons to be careful with any report of a miracle, including the ones Christians make. What it can't do is show that no evidence could ever be enough, unless it first assumes there is no God who might act. So the question comes down to two others, whether God exists and whether one particular miracle happened, and each of those has its own page.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "Hume set out the case in 1748, in the essay \"Of Miracles,\" the tenth section of the book later called An Enquiry Concerning Human Understanding. Most people who doubt miracles stand inside his conclusion without having heard his name. He began with a rule anyone can accept: \"A wise man, therefore, proportions his belief to the evidence.\" Then he defined his terms. \"A miracle is a violation of the laws of nature; and as a firm and unalterable experience has established these laws, the proof against a miracle, from the very nature of the fact, is as entire as any argument from experience can possibly be imagined.\" It's no miracle, he said, that a healthy man dies suddenly. \"But it is a miracle, that a dead man should come to life; because that has never been observed in any age or country.\"",
          "From there he drew what he called a general maxim: \"That no testimony is sufficient to establish a miracle, unless the testimony be of such a kind, that its falsehood would be more miraculous, than the fact, which it endeavours to establish.\" When someone tells him a dead man was restored to life, he asks himself which is more likely, \"that this person should either deceive or be deceived, or that the fact, which he relates, should really have happened.\" The answer, he thought, is always the first.",
          "In the second part of the essay he argued that no real report has ever come close to that bar. No miracle in history, he wrote, was \"attested by a sufficient number of men, of such unquestioned good-sense, education, and learning, as to secure us against all delusion in themselves,\" and of such integrity and standing that they had much to lose if caught. People love to feel wonder and to pass it on. Reports of miracles \"are observed chiefly to abound among ignorant and barbarous nations.\" And the miracles of rival religions cancel each other out, since each is offered as proof of a faith that denies the others. His sharpest example was the healings reported in his own lifetime at the tomb of the Abbé Paris, a Jansenist, in Paris. By Hume's own account many were \"attested by witnesses of credit and distinction, in a learned age,\" and he still thought no sensible person should believe them. His conclusion was careful. He set it down as a maxim \"that no human testimony can have such force as to prove a miracle, and make it a just foundation for any such system of religion.\" Carl Sagan gave the same instinct a modern slogan: extraordinary claims require extraordinary evidence.",
          "I grant a great deal of this. Most reports of miracles are false. People do love wonder, and believers have every reason to want their faith confirmed, so their reports deserve more scrutiny, not less. Christians reject most miracle claims themselves, including many made by other Christians. Scripture tells believers to do the same: \"Beloved, do not believe every spirit, but test the spirits to see whether they are from God\" (1 John 4:1). If the case for any miracle can't survive Hume's caution, it doesn't deserve belief.",
        ],
      },
      {
        heading: "What kind of case this is",
        body: [
          "Hume's is an argument about evidence and probability, and the reply here is of the same kind. It doesn't try to prove that any miracle happened. It asks whether Hume showed what he claimed to show, that testimony can never be enough to make belief in a miracle reasonable. If he did, the question is closed before any particular evidence is weighed. If he didn't, the question is open, and it has to be settled the slow way, case by case, by looking at what happened.",
        ],
      },
      {
        heading: "Hume's argument, laid out",
        body: [
          {
            kind: "Hume's argument, set out as he gives it",
            premises: [
              "A wise person proportions belief to the evidence.",
              "A miracle is a violation of the laws of nature, and those laws are established by firm and unalterable experience, so the evidence against any miracle is as strong as experience can give.",
              "Testimony is evidence from experience too, and people often deceive or are deceived.",
            ],
            conclusion: "Testimony to a miracle will always be outweighed by the evidence against it, unless its falsehood would be more miraculous than the miracle itself; and no testimony in history has met that bar.",
          },
          "The first premise is right, and every Christian should hold it. The weight sits on the second, and it has three problems.",
          "The first is a circle. Experience against miracles is \"firm and unalterable\" only if every report of one is false, and that's the question being asked. C. S. Lewis put it plainly in Miracles (1947): we know the experience against them to be uniform \"only if we know that all the reports of them are false,\" and so we are \"arguing in a circle.\" Defenders of Hume reply, fairly, that he didn't mean experience without exception, only that the weight of experience always goes against the report. That is a better argument. But it turns Hume's rule into a question of probability, and then it has to pass the tests of probability.",
          "That is the second problem. John Earman, a philosopher of science at the University of Pittsburgh and no apologist, examined the essay with the mathematics of probability worked out by Hume's own contemporaries, Thomas Bayes and Richard Price. He called his book Hume's Abject Failure (2000), and argued that Hume's maxim, read carefully, doesn't deliver what Hume claimed for it. One reason is independent witnesses. Charles Babbage, the mathematician who designed the first mechanical computers, showed in the 1830s, in his Ninth Bridgewater Treatise, that if witnesses are truly independent of each other and more often right than wrong, enough of them can outweigh any improbability short of impossibility. Earman's verdict is contested. William Vanderburgh argued in Hume Studies in 2005 that Earman misread what Hume was doing, and Peter Millican has pressed the hard question of how we could ever know that ancient witnesses were independent. Those are real replies. But they move the argument from \"no testimony could ever be enough\" to \"this testimony isn't enough,\" which is a different and more modest claim.",
          "The third problem is the word violation. Hume's own example shows the danger. He wrote that \"the Indian prince, who refused to believe the first relations concerning the effects of frost, reasoned justly.\" Hume saved the prince by saying frost was not contrary to his experience, only unlike it. Still, a rule that keeps a man warm and wrong about ice should make us careful. And the laws of nature, as Christians have long understood them, don't forbid God to act. Lewis used the picture of a drawer. Put six pennies in on Monday and six more on Tuesday, and arithmetic says you'll find twelve on Wednesday. If a thief has opened the drawer, you may find two. The thief broke the law of the land, not the laws of arithmetic. A miracle, on this view, isn't nature failing. It's something added to nature from outside it, after which nature carries on by its own laws.",
        ],
      },
      {
        heading: "Where the real question lies",
        body: [
          {
            kind: "An argument about probability",
            premises: [
              "How much evidence a report needs depends on how probable the event was before the report came in.",
              "The probability of a miracle before the evidence isn't fixed by the laws of nature alone. It depends on whether there is a God who could act, and whether he would have a reason to act in this case.",
              "So no rule laid down in advance can decide whether testimony to a miracle is enough. It depends on what we have reason to believe about God, and on the evidence in the particular case.",
            ],
            conclusion: "Hume's argument can rule out every miracle before the evidence is heard only if it assumes there is no God, or none who acts. Without that assumption, the question goes back to the evidence.",
          },
          "The second premise carries the weight. The chance that a dead man rises by natural causes is as close to zero as anything gets, and Christians agree. The resurrection is not the claim that natural causes did it. It's the claim that God raised this man, and the probability of that depends on whether God exists and on what Jesus said and did before he died. A skeptic can fairly reply that even if God exists, the chance he would act in any given case is tiny. That is true of random marvels. It's less true of an event that comes at the end of a life spent claiming to speak for God, in a people who had waited centuries for him to act. A miracle with a meaning isn't the same as a statue that weeps.",
          "Hume's second part should be taken seriously, and some of it stands. The love of wonder is real. But his phrase \"ignorant and barbarous nations\" judges a witness by his nation, not his honesty. The New Testament scholar Craig Keener gathered hundreds of eyewitness reports of healing, many from Asia, Africa and Latin America, in the two volumes of Miracles (2011). They don't prove that any of those events were miracles. They do show that sane, careful people in many cultures claim to have seen such things, and that a rule which dismisses them for where they live is not a rule of evidence. The argument from rival miracles works only if every miracle is offered as proof that every other faith is false. Christianity has never needed that.",
        ],
      },
      {
        heading: "The best reply, and what this does not prove",
        body: [
          "The strongest reply doesn't need Hume's definition at all. It goes like this: every time we've been able to check a report of a miracle, it has turned out to be false, mistaken or explained. The Abbé Paris, the faith healers, the weeping statues. That's a terrible record, and a reasonable person should expect the next report to go the same way. I agree with that as a starting point. It's how anyone should treat a healer on television. But a starting point isn't a verdict. Evidence can overturn it, and anyone who says no evidence ever could has walked back into Hume's circle. The record also isn't quite what it seems. Most of what we've checked were wonders that proved nothing in particular. The claim at the center of Christianity is a single event, said to have happened once, for a reason, in public, in the city where it could most easily be denied.",
          "Here is what the argument doesn't prove. It doesn't prove that any miracle has happened. It doesn't prove that God exists; that case has its own page. It doesn't make every miracle report believable, and Christians have been credulous often enough to deserve Hume's suspicion. It doesn't threaten science, which depends on nature being regular, because a miracle can only be recognized against that regularity. What it shows is narrower. Whether a miracle is believable can't be settled by a definition. It has to be settled by looking.",
          "Paul didn't ask anyone to believe the resurrection without looking. He named the witnesses and put the claim where it could be checked: \"And if Christ has not been raised, then our preaching is in vain and your faith is in vain\" (1 Corinthians 15:14). \"Did the resurrection actually happen?\" weighs that evidence in full. Before you read it, notice whether your certainty that miracles can't happen is a conclusion you reasoned to, or a definition you started with. If it's the second, you haven't put the resurrection on the scale yet. You've decided in advance not to look.",
        ],
      },
    ],
    sources: [
      { author: "David Hume", title: "An Enquiry Concerning Human Understanding, Section X, \"Of Miracles\"", year: "1748", note: "The best case against, and still the one to answer." },
      { author: "C. S. Lewis", title: "Miracles: A Preliminary Study", year: "1947" },
      { author: "John Earman", title: "Hume's Abject Failure: The Argument Against Miracles", year: "2000", note: "A philosopher of science, not a believer's book." },
      { author: "William L. Vanderburgh", title: "Of Miracles and Evidential Probability: Hume's \"Abject Failure\" Vindicated", in: "Hume Studies", year: "2005", note: "A defense of Hume against Earman." },
      { author: "Charles Babbage", title: "The Ninth Bridgewater Treatise", year: "1837", note: "Chapter 10, on Hume and independent witnesses." },
      { author: "Craig S. Keener", title: "Miracles: The Credibility of the New Testament Accounts", year: "2011" },
      { author: "N. T. Wright", title: "The Resurrection of the Son of God", year: "2003" },
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
      "On the page, God commands it, and a person who reads those verses and feels sick is reading them correctly. \"You shall save alive nothing that breathes\" (Deuteronomy 20:16). To Saul, of the Amalekites: \"Do not spare them, but kill both man and woman, child and infant, ox and sheep, camel and donkey\" (1 Samuel 15:3). Christians who hold the whole Bible to be God's word read these chapters in more than one way, and I'll set out the main readings with the strength and the hard question of each, without pretending any of them makes the problem go away. Two things hold under all of them. The God of Joshua is the Father of Jesus. And nothing in these chapters gives anyone today a warrant for violence against anyone.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "The commands are in Deuteronomy, for the war Israel was about to fight west of the Jordan. For the peoples of the land, the law says, \"you shall save alive nothing that breathes, but you shall devote them to complete destruction\" (Deuteronomy 20:16-17). Joshua narrates it. At Jericho \"they devoted all in the city to destruction, both men and women, young and old, oxen, sheep, and donkeys, with the edge of the sword\" (Joshua 6:21). The word genocide is modern. Raphael Lemkin coined it in 1944, and the United Nations convention adopted on December 9, 1948, defines it as acts \"committed with intent to destroy, in whole or in part, a national, ethnical, racial or religious group, as such.\" Deuteronomy 20 names six peoples and gives a religious reason. If a government gave that order today, we would know what to call it.",
          "Richard Dawkins put the charge loudly in The God Delusion (2006), where he calls the God of the Old Testament vindictive and bloodthirsty, among much else. The same objection was made more carefully in 2009, in a symposium in the Christian philosophy journal Philosophia Christi. The philosopher Wes Morriston pressed it there in \"Did God Command Genocide? A Challenge to the Biblical Inerrantist,\" and Randal Rauser, in the same issue, concluded that God did not give these commands. Put in its strongest form, in my words and not theirs, the objection runs like this. A morally perfect God would not command the killing of children without a reason good enough to justify it, and it is hard to believe any such reason existed. Behind that stands a point about what we can know. We are more sure that it is wrong to kill a child for what his parents did than we could ever be that an ancient text speaks for God. When the two collide, the reasonable thing is to doubt the text.",
          "I grant the force of that. People have left the faith on this reasoning, taking their consciences seriously, which is what the church tells them to do. I have five sons. Whatever a Christian says about \"child and infant\" has to be something he could say with a parent listening. If these chapters have shaken your own faith, talk it through with someone; the Find Help page has real people you can call.",
        ],
      },
      {
        heading: "What kind of question this is",
        body: [
          "Two questions are tangled here. One is first-order, settled by the creeds the whole church confesses: is the God of these chapters the same God as the Father of Jesus? The church answered that in the second century, when it rejected Marcion, who taught that the God of the Old Testament could not be the Father Jesus revealed. The other is how these commands should be read, and that question divides faithful Christians and careful scholars still. I won't settle it for you. The skeptic's argument is the best way to see where the readings part.",
          {
            kind: "The skeptic's argument (my own summary of the objection argued in the 2009 symposium)",
            premises: [
              "A perfectly good God would not command the killing of children unless he had a morally sufficient reason.",
              "It is very unlikely that any such reason existed.",
              "The Bible says that God commanded it.",
            ],
            conclusion: "Either God is not perfectly good, or the Bible is mistaken in saying he commanded it.",
          },
          "A Christian who holds the Bible true can't easily deny the first premise, so on this summary the dispute comes down to the second, the claim about reasons. But the Christian readings don't all answer in the same place. Some read the third premise differently, as a description of something other than what it seems. Some deny the second. Each has a real strength, and each leaves a hard question.",
        ],
      },
      {
        heading: "First reading: the language of ancient war",
        body: [
          "The book of Joshua complicates its own summaries. Joshua 11:23 says \"Joshua took the whole land.\" Two chapters later God tells him \"there remains yet very much land to possess\" (Joshua 13:1). The Jebusites of Jerusalem were never driven out (Joshua 15:63). In Joshua's own farewell he warns Israel about \"the remnant of these nations remaining among you\" (Joshua 23:12), and in Judges \"the people of Israel lived among the Canaanites, the Hittites, the Amorites, the Perizzites, the Hivites, and the Jebusites\" (Judges 3:5). Right after the command to destroy them, Deuteronomy says \"You shall not intermarry with them\" (Deuteronomy 7:3), a law that assumes they will still be there. Saul is said to have destroyed all the Amalekites (1 Samuel 15:8), and fifteen chapters later four hundred of their young men escape David on camels (1 Samuel 30:17).",
          "Scholars of the ancient Near East have shown that this is how victory was reported in Israel's world. Around 1208 BC the pharaoh Merneptah boasted on his victory stele that Israel's seed was no more. Around 840 BC Mesha, king of Moab, claimed that Israel had perished forever, and his stone uses the Bible's own word for the ban. K. Lawson Younger, in Ancient Conquest Accounts (1990), laid Joshua beside Egyptian, Hittite and Assyrian campaign reports and found the same stock, formulaic claims of total victory. Kenneth Kitchen agreed in On the Reliability of the Old Testament (2003), and Paul Copan and Matthew Flannagan made the reading central to Did God Really Command Genocide? (2014): what God required was the end of Canaan's religious order and the removal of its peoples, and the language of killing everyone belongs to the idiom of war.",
          "Its strength is that it comes from the text, not from modern discomfort. Its hard question is that it eases the scale without emptying the battlefield. Jericho is still described as a city where men and women, young and old, were killed, and an exaggerated report of a massacre is still a report of a massacre. First Samuel 15:3 still says infant.",
        ],
      },
      {
        heading: "Second reading: judgment after long patience",
        body: [
          "The text insists the war was not a reward for Israel's goodness: \"Not because of your righteousness or the uprightness of your heart are you going in to possess their land, but because of the wickedness of these nations\" (Deuteronomy 9:5). The charges are specific. The peoples of the land \"even burn their sons and their daughters in the fire to their gods\" (Deuteronomy 12:31), and \"the land vomited out its inhabitants\" (Leviticus 18:25). The judgment is described as late. Long before, God told Abraham his descendants would wait, \"for the iniquity of the Amorites is not yet complete\" (Genesis 15:16). And the line is not drawn by blood. Rahab of Jericho confesses Israel's God and is spared, and \"she has lived in Israel to this day\" (Joshua 6:25). Deuteronomy 13 orders the same destruction against any Israelite town that turns to other gods, and in the end, around 586 BC, Israel itself went into exile under the same charge.",
          "Its strength is that it shows the war as judgment on named evil after long patience, not a tribal god clearing ground for his favorites. Its hard question is the one the children ask. A baby in Jericho had never offered anyone to Molech. And \"they deserved it\" is what armies always say about the towns they burn.",
        ],
      },
      {
        heading: "Third reading: God stooping, seen through Christ",
        body: [
          "Origen, preaching on Joshua in the third century, told his hearers that unless these wars were figures of spiritual ones, he doubted the apostles would have handed these books to the followers of a Christ who came to teach peace. In our own time Eric Seibert, in Disturbing Divine Behavior (2009), drew a distinction from Terence Fretheim between the God of the text, as Israel portrayed him, and the actual God, and read the portraits by the God that Jesus reveals. Greg Boyd, in The Crucifixion of the Warrior God (2017), keeps every page as inspired Scripture, and reads the violent portraits as God stooping to let his people see him in the terms of their own violent world, bearing their misunderstanding much as Christ bore our sin.",
          "Its strength is that it takes seriously that the Son \"is the radiance of the glory of God and the exact imprint of his nature\" (Hebrews 1:3), and that when his disciples wanted fire on a Samaritan village, \"he turned and rebuked them\" (Luke 9:55). Its hard question is who decides which portraits truly show God. Its critics say it leaves the reader to decide which texts to set aside, which leads back toward Marcion. Boyd answers that he keeps every text and reads it through Christ, which is the opposite of what Marcion did.",
        ],
      },
      {
        heading: "Fourth reading: the right of the giver of life",
        body: [
          "The oldest Christian answer is the plainest. Augustine, answering the Manichaean bishop Faustus, said God gave those commands \"not in cruelty, but in righteous retribution.\" Thomas Aquinas reasoned that every human being, guilty or innocent, dies by God's power, and so \"by the command of God, death can be inflicted on any man, guilty or innocent, without any injustice whatever.\" William Lane Craig defends a form of this today: God, as the giver of life, can give and take life as he chooses.",
          "Its strength is that it refuses to let the modern conscience overrule the text, and that it is true that every life is God's to give and to end. Its hard question is that God's right to take a life is not obviously a right to command human beings to take it, and that anyone who believes such a command can come from God has to ask how he would ever know it had. That second question is not abstract, as the next part shows.",
        ],
      },
      {
        heading: "What these chapters do not permit",
        body: [
          "Whatever reading a Christian holds, these texts give no warrant for violence by anyone today. The command in Deuteronomy names particular peoples in one land at one moment, and the same chapter requires an offer of peace to cities outside it (Deuteronomy 20:10, 15). Nothing in the New Testament renews it. When a disciple drew a sword for Jesus, he said, \"Put your sword back into its place. For all who take the sword will perish by the sword\" (Matthew 26:52). No nation today is Israel at Jericho, and no people today stands in the place of Canaan.",
          "Christians have used these chapters anyway. On May 26, 1637, English soldiers with Mohegan and Narragansett allies burned a fortified Pequot village near the Mystic River, and several hundred Pequots died, women and children among them. The next year one of the English captains, John Underhill, answered readers who asked why Christians had shown so little mercy: \"Sometimes the Scripture declareth women and children must perish with their parents.\" He added, \"We had sufficient light from the word of God for our proceedings.\" His fellow captain, John Mason, framed the war in the language of Canaan. That is the misuse the church has to name as its own. The move from God judged them to God is with us against them still comes easily, and it feels like faithfulness while we make it.",
        ],
      },
      {
        heading: "What remains, and what this does not prove",
        body: [
          "The strongest reply to everything above is simple: you've given four readings because none of them works alone. There's truth in that. The hyperbole reading leaves Jericho. The judgment reading leaves the children. The christological reading leaves the question of who decides. The traditional reading leaves the question of how anyone could know. A Christian who says these chapters are easy hasn't read them.",
          "Here is what this doesn't prove. It doesn't prove the Bible is from God, and it doesn't make the texts comfortable. It doesn't answer the particular child who chose none of it, and I won't decorate that grief. What it shows is narrower. The charge that the Bible simply endorses genocide, as a template, reads past what the text itself says about survivors, judgment, its own limits, and the Christ who came after. The God who waited generations for the Amorites is the God who asks, \"Have I any pleasure in the death of the wicked, declares the Lord GOD, and not rather that he should turn from his way and live?\" (Ezekiel 18:23).",
          "Abraham, the father of the faith, argued with God over Sodom: \"Shall not the Judge of all the earth do what is just?\" (Genesis 18:25). The Bible doesn't rebuke him for asking. Matthew puts Rahab of Jericho in Jesus' family tree (Matthew 1:5), and tells of a Canaanite woman who begged Jesus for her daughter and heard, \"O woman, great is your faith! Be it done for you as you desire\" (Matthew 15:28). Christians believe the Judge answered Abraham's question at the cross. That answer doesn't close these chapters. It means we read them with Abraham's question still open, and with the Judge's own face in view.",
        ],
      },
    ],
    sources: [
      { author: "K. Lawson Younger", title: "Ancient Conquest Accounts: A Study in Ancient Near Eastern and Biblical History Writing", year: "1990" },
      { author: "K. A. Kitchen", title: "On the Reliability of the Old Testament", year: "2003" },
      { author: "Richard Dawkins", title: "The God Delusion", year: "2006" },
      { author: "Wes Morriston", title: "Did God Command Genocide? A Challenge to the Biblical Inerrantist", in: "Philosophia Christi", year: "2009", note: "The best case against, made carefully." },
      { author: "Randal Rauser", title: "\"Let Nothing that Breathes Remain Alive\": On the Problem of Divinely Commanded Genocide", in: "Philosophia Christi", year: "2009" },
      { author: "Eric A. Seibert", title: "Disturbing Divine Behavior: Troubling Old Testament Images of God", year: "2009" },
      { author: "Paul Copan and Matthew Flannagan", title: "Did God Really Command Genocide? Coming to Terms with the Justice of God", year: "2014" },
      { author: "Gregory A. Boyd", title: "The Crucifixion of the Warrior God", year: "2017" },
      { author: "John Underhill", title: "Newes from America", year: "1638" },
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
      "Because it didn't, and that has to be said first. The Bible regulates slavery without forbidding it. The law of Moses lets Israel buy foreigners and hand them down to their children as property, and the New Testament tells slaves to obey their masters. For generations American Christians, Baptists among them, quoted those verses to defend owning human beings. But the same Bible makes stealing a person and holding him a capital crime (Exodus 21:16), names slave-dealers among the lawless (1 Timothy 1:10), says every human being bears the image of God, founds Israel on God freeing slaves, and calls an owned man \"a beloved brother\" (Philemon 16). The case that finally ended slavery in the English-speaking world was made largely from those texts. Neither that case nor the long record against it answers why God gave no plain prohibition, and I won't pretend this answer does.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "Start with the texts, because they are plain. Leviticus 25, the chapter that gives Israel the jubilee, goes on: \"As for your male and female slaves whom you may have: you may buy male and female slaves from among the nations that are around you. You may also buy from among the strangers who sojourn with you and their clans that are with you, who have been born in your land, and they may be your property. You may bequeath them to your sons after you to inherit as a possession forever\" (Leviticus 25:44-46). If a master struck a slave with a rod and the slave died under his hand, \"he shall be avenged\" (Exodus 21:20). The next verse adds, \"if the slave survives a day or two, he is not to be avenged, for the slave is his money\" (Exodus 21:21). The New Testament doesn't reverse any of this by decree. \"Bondservants, obey your earthly masters with fear and trembling\" (Ephesians 6:5). Paul sends Onesimus, whom most readers have taken to be a runaway, back to the man who owned him.",
          "The objection needs no philosophy. A law that rules on what a garment may be woven from (Leviticus 19:19) was not too vague to forbid things, yet on whether one person may own another it gives instructions for doing it. If a good God spoke here, why not the one sentence that would have spared millions of people? The biblical scholar Hector Avalos added a second charge in Slavery, Abolitionism, and the Ethics of Biblical Scholarship (2011): that most modern biblical scholarship still works as an apology for biblical slavery, softening what the words plainly say.",
          "The history is worse than the texts. George Whitefield, the best-known preacher of the First Great Awakening, campaigned to make slavery legal in the colony of Georgia and owned slaves to support his orphanage there. Jonathan Edwards bought a girl of about fourteen named Venus at Newport in 1731. In December 1822 the Baptist preacher Richard Furman, writing to the governor of South Carolina on behalf of the state's Baptist convention, argued that the right to hold slaves was clearly established in Scripture, by precept and by example. The Virginia Baptist minister Thornton Stringfellow argued that slavery had \"the sanction of the Almighty in the Patriarchal age,\" that it was \"incorporated into the only National Constitution which ever emanated from God,\" and that it was recognized \"by Jesus Christ in his kingdom.\" In May 1845 Baptists from the slaveholding states met in Augusta, Georgia, and formed the Southern Baptist Convention, after the denomination's mission boards had made clear they would not appoint slaveholders as missionaries.",
          "I'm a Baptist pastor, so I don't get to tell this story from a safe distance. In 1995, a hundred and fifty years after Augusta, the Southern Baptist Convention adopted a resolution acknowledging the part slavery had played in its founding, repenting of racism, and apologizing to African Americans for condoning and perpetuating it. The skeptic who asks this question is describing Baptists, and I am one. So I grant the heart of the objection. The sentence he wants isn't in the Bible. Leviticus 25 permits what it permits. Christians with open Bibles defended chattel slavery for generations, and they were not stupid men misreading an obscure verse. They were quoting.",
        ],
      },
      {
        heading: "What the law regulated, said fairly",
        body: [
          "The usual Christian reply starts with a distinction, and the distinction is real. Much of what the Hebrew law regulates under the word we translate slave was debt servitude: a poor man, or his children, sold into service to pay what he owed. The standard study, Gregory Chirichigno's Debt-Slavery in Israel and the Ancient Near East (1993), reads the release laws of Exodus 21 beside the debt-sale law in Hammurabi's code. For an Israelite the law set limits. \"When you buy a Hebrew slave, he shall serve six years, and in the seventh he shall go out free, for nothing\" (Exodus 21:2). \"If your brother becomes poor beside you and sells himself to you, you shall not make him serve as a slave\" (Leviticus 25:39). The reason follows: \"For they are my servants, whom I brought out of the land of Egypt; they shall not be sold as slaves\" (Leviticus 25:42). Hammurabi's code made it a capital crime to help a slave out through the city gate or to hide a runaway in your house. Deuteronomy says, \"You shall not give up to his master a slave who has escaped from his master to you\" (Deuteronomy 23:15), though many readers, slavery's American defenders among them, took that to mean a slave fleeing a foreign master into Israel.",
          "But the distinction stops at the border, and this is where a great deal of Christian apologetics stops too. The protections for the brother do not cover the foreigner. The same chapter that frees the Israelite in the jubilee lets the foreigner be bought, held for life, and passed to the next generation as property. Most scholars, whatever they make of the Bible, read Leviticus 25 as drawing exactly that line, between Israelite debt servants and foreign slaves held as chattel. Exodus 21:21 calls the slave his master's money. A Christian who quotes the release laws to a skeptic and leaves out verses 44 to 46 has done what the slaveholder did from the other side. He has picked the verses that help him. Avalos's charge lands there, and it is fair.",
        ],
      },
      {
        heading: "The case that the Bible's own logic undid slavery",
        body: [
          "American slavery was built on kidnapping. \"Whoever steals a man and sells him, and anyone found in possession of him, shall be put to death\" (Exodus 21:16). That law sits in the same chapter that slavery's preachers cited for a master's rights. When Paul lists the people the law exists to restrain, he names \"enslavers\" (1 Timothy 1:10), a word for a slave-dealer who trades in captured people; the King James Version rendered it \"menstealers,\" and the abolitionists took the word straight from their Bibles. Their case was not a proof text. It was an argument about what the Bible's own premises imply, and it can be set out so that it can be checked.",
          {
            kind: "An argument from the Bible's own premises (the abolitionists' case, in my words)",
            premises: [
              "Every human being is made in the image of God, and by the same hand as the one who would own him: \"So God created man in his own image\" (Genesis 1:27); \"Did not he who made me in the womb make him?\" (Job 31:15).",
              "Under the law itself, a person God has redeemed may not be held as a slave, because he already belongs to God (Leviticus 25:42).",
              "In Christ the line between brother and foreigner, on which the permission for lifelong slavery rested, is erased: \"There is neither Jew nor Greek, there is neither slave nor free, there is no male and female, for you are all one in Christ Jesus\" (Galatians 3:28).",
              "The law makes stealing a person, and holding one who was stolen, a capital crime (Exodus 21:16), and the New Testament counts slave-dealers among the lawless (1 Timothy 1:10).",
            ],
            conclusion: "Owning a fellow believer as property, and the whole trade in kidnapped people that fed American slavery, stand condemned by the Bible's own law and logic, whatever the law permitted ancient Israel.",
          },
          "The third premise carries the weight. A skeptic can answer that Galatians speaks of standing before God, not of social order, and Paul did not free anyone by decree. But Paul drew the social consequence himself. He asked Philemon to receive Onesimus \"no longer as a bondservant but more than a bondservant, as a beloved brother\" (Philemon 16), and told the Corinthians, \"You were bought with a price; do not become bondservants of men\" (1 Corinthians 7:23). By the logic of Leviticus 25, a brother can't be held as property, and in the household of God there are no strangers left to hold. The first premise carries the rest of the way, to those outside the church.",
          "Late in the fourth century Gregory of Nyssa, preaching on the verse where the Preacher boasts, \"I bought male and female slaves\" (Ecclesiastes 2:7), asked his congregation what price they thought they had paid for a creature made in the image of God, and condemned owning human beings as such. David Bentley Hart has argued that no other surviving ancient text, Christian, Jewish or pagan, condemns slavery so fiercely. When the conscience of the English-speaking world finally moved, it moved from the same texts. William Wilberforce, after his evangelical conversion in 1785, brought the cause back to Parliament for nearly twenty years until the British slave trade was abolished in 1807. Frederick Douglass, who had escaped slavery in Maryland, wrote in the appendix to his Narrative (1845) that his attacks were aimed at \"the slaveholding religion of this land,\" with \"no possible reference to Christianity proper.\" He drew the line the whole controversy came down to: \"I love the pure, peaceable, and impartial Christianity of Christ: I therefore hate the corrupt, slaveholding, women-whipping, cradle-plundering, partial and hypocritical Christianity of this land.\"",
        ],
      },
      {
        heading: "The honest counter",
        body: [
          "The strongest reply to that argument is historical, and it deserves to be heard in full. If the Bible's logic was so clear, why did it take so long, and why did the most confident biblical arguments in America's crisis belong to slavery's defenders? The historian Mark Noll gives the uncomfortable answer in The Civil War as a Theological Crisis (2006). Read the way most American Protestants had been taught to read it, verse by verse and at face value, the Bible gave the defenders of slavery the easier argument, since both testaments regulate slavery and neither condemns it outright. The abolitionists had to appeal to the spirit and direction of Scripture, and to a great many devout people that sounded like an evasion of the text.",
          "Noll's point cuts both ways. It explains how sincere men read so badly. It also means the abolitionist case is an argument from the whole, not a verse anyone can point to, and a skeptic is entitled to ask whether readers found that spirit in the text or brought it there. Slavery's defenders had answers for the hard verses too. Many granted that the African trade had been wicked but denied that a man who inherited slaves was holding stolen people, and their King James text of Exodus 21:16 was less plain than the ESV's \"anyone found in possession of him.\"",
          "The church also doesn't get to take a bow. It didn't follow Gregory for well over a thousand years. Abolition had other engines: Enlightenment arguments about natural rights, the revolt of the enslaved in Saint-Domingue that began in 1791 and ended in an independent Haiti, economics, and finally war. The church was on both sides, and it was on the wrong side first and for longest. What the record shows is narrower. The Christian case against slavery was real, and it ran on the texts the slaveholders had to explain away.",
        ],
      },
      {
        heading: "What remains hard",
        body: [
          "Here is what none of this proves. It doesn't show that the Bible forbade slavery as plainly as it forbade idols; it didn't. It doesn't make Leviticus 25:44-46 or Exodus 21:21 easier to read. It doesn't give back a single year to anyone who lived and died under the law of Moses or the law of Virginia.",
          "The nearest the Bible comes to explaining its own permission is Jesus on divorce: \"Because of your hardness of heart Moses allowed you to divorce your wives, but from the beginning it was not so\" (Matthew 19:8). That establishes that the law can permit what God does not love, with creation standing behind it as the measure. Many Christians read slavery that way. Critics such as Avalos answer that this reads a modern conscience back into texts that never shared it. That dispute is honest, and it isn't settled here.",
          "So the skeptic's question stands. Why not the plain sentence? I don't know. I can say what the book did instead. It gave a slaveholding world a God who says, \"I have surely seen the affliction of my people who are in Egypt and have heard their cry because of their taskmasters. I know their sufferings\" (Exodus 3:7), and it commanded his people to tell that story every year. Enslaved Christians in America heard it read by the men who owned them, and they knew whose story it was. They read the book more truly than their masters did. The skeptic has every right to ask why God took the slow way. The people who paid for the delay have a greater right. Whatever answer a Christian gives, he gives it in front of them.",
        ],
      },
    ],
    sources: [
      { author: "Frederick Douglass", title: "Narrative of the Life of Frederick Douglass, an American Slave", year: "1845", note: "With the appendix on the Christianity of Christ and the Christianity of this land." },
      { author: "Thornton Stringfellow", title: "The Bible Argument: or, Slavery in the Light of Divine Revelation", in: "Cotton Is King, and Pro-Slavery Arguments", year: "1860", note: "The proslavery case from Scripture, in its own words." },
      { author: "Gregory of Nyssa", title: "Homilies on Ecclesiastes", year: "late 4th century; English version by Stuart George Hall and Rachel Moriarty, 1993" },
      { author: "David Bentley Hart", title: "The \"Whole Humanity\": Gregory of Nyssa's Critique of Slavery in Light of His Eschatology", in: "Scottish Journal of Theology", year: "2001" },
      { author: "Gregory Chirichigno", title: "Debt-Slavery in Israel and the Ancient Near East", year: "1993" },
      { author: "Mark A. Noll", title: "The Civil War as a Theological Crisis", year: "2006", note: "Why the proslavery reading looked so plausible." },
      { author: "Hector Avalos", title: "Slavery, Abolitionism, and the Ethics of Biblical Scholarship", year: "2011", note: "The best book against: the Bible endorses slavery, and its scholars still excuse it." },
    ],
    essaySlug: "why-didnt-the-bible-ban-slavery",
    essayTitle: "Why Didn't the Bible Just Ban Slavery?",
    bookTitle: "Blind Spots",
    bookHref: "/books/blind-spots",
  },
  {
    slug: "is-faith-just-wishful-thinking",
    question: "Is faith just wishful thinking?",
    paragraphs: [
      "Sometimes, yes. Religion can be a crutch, and it constantly is for people who make it one. Much of what gets called faith is projection, a god assembled out of a person's fears and preferences, warm where they want warmth and silent where they want silence. The church has sold that god by the millions. But the charge proves less than it seems to. Showing why someone wants a belief to be true doesn't show that it's false, as Freud himself admitted. The wish runs both ways, since plenty of people want there to be no God, and some of the best of them have said so. And the God of the Bible is a strange thing to have wished for. None of that proves God exists. It means the question has to be settled by evidence, not by a guess about anyone's motives, believer or unbeliever.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "The suspicion has a distinguished history, and it should be stated in its best form. In 1841 the German philosopher Ludwig Feuerbach published The Essence of Christianity. His claim was that God is human nature looked at from outside. We take the best of ourselves, our love, wisdom and goodness, set it in the sky, call it God, and worship it, and in doing so we empty ourselves of what is really ours. Three years later, in February 1844, Karl Marx took the idea from the study to the street: \"Religion is the sigh of the oppressed creature, the heart of a heartless world, and the soul of soulless conditions. It is the opium of the people.\" Religion, on his account, is what people reach for when life is unbearable, and it keeps them from changing the conditions that make it so.",
          "Sigmund Freud gave the suspicion its sharpest form in The Future of an Illusion (1927). Every child, he argued, meets the world in terror and helplessness, and is protected by a father. The adult never stops being helpless before nature, illness and death, and so he makes the father permanent, a God who guards him, rewards the good, punishes the wicked and promises life after the grave. Religious doctrines, Freud wrote, are \"illusions, fulfilments of the oldest, strongest and most urgent wishes of mankind.\" Their power comes from the power of those wishes, not from evidence. That is why believers hold them so fiercely and examine them so little.",
          "I grant much of this, because the Bible grants it first. People do make gods out of their wishes. Israel did it with a golden calf, and the prophets spent centuries attacking a religion that told people what they wanted to hear. Jeremiah said of the religious leaders of his day, \"They have healed the wound of my people lightly, saying, 'Peace, peace,' when there is no peace\" (Jeremiah 6:14). A faith whose God never disagrees with you, never asks anything you didn't already want to give, and always takes your side is the faith Freud described, and a great deal of it is preached in churches every Sunday. If your argument is that some faith is wish-fulfillment, you are not wrong.",
        ],
      },
      {
        heading: "What kind of case this is",
        body: [
          "The projection argument is an argument about where beliefs come from. Philosophers call this kind a genealogy, or a debunking argument: it doesn't claim to show that God doesn't exist, but that belief in God is produced by something that has nothing to do with whether he does. So the question here isn't whether God exists. That has its own page. The question is whether an account of why people believe can settle whether what they believe is true, and if not, what it can do.",
        ],
      },
      {
        heading: "Freud's argument, laid out",
        body: [
          {
            kind: "The projection argument, as Freud's readers usually take it",
            premises: [
              "Belief in God matches what human beings deeply wish for: protection, a father, justice and life after death.",
              "When a belief matches our wishes that closely, the wishes are the likeliest explanation of why we hold it.",
              "Beliefs produced by wishes are not produced by a process aimed at truth, so they can't be trusted.",
            ],
            conclusion: "Belief in God can't be trusted, however sincerely it is held.",
          },
          "Notice first what Freud himself did not claim. He defined an illusion by where it comes from, not by whether it is true. \"Illusions need not necessarily be false,\" he wrote, and his example was a girl of modest means who believes a prince will come and marry her. It's unlikely, and her wish explains her belief, but it has happened. He said plainly in the same book, \"To assess the truth-value of religious doctrines does not lie within the scope of the present enquiry.\" On Freud's own terms, then, the argument can't show that there is no God. A frightened man believes the shore is close because he needs it to be, and the shore may also be close. His fear does not move the coastline. Reasoning from how a belief arose to whether it's true is the mistake logicians call the genetic fallacy.",
          "The stronger version doesn't make that mistake. It rests on the third premise: even if the belief happens to be true, it wasn't formed in a way that tracks the truth, so you have no right to hold it. The philosopher Alvin Plantinga answered this in Warranted Christian Belief (2000), and his answer is the heart of the matter. Whether wish is a bad way to come by a belief depends on what the world is like. If there is no God, then the longing for him is a misfire, and belief built on it is unreliable. But if there is a God who made human beings to know him, the longing may be exactly how he made us able to find him. Augustine said as much at the opening of his Confessions, around the year 400: \"you have made us for yourself, and our heart is restless until it rests in you.\" So the complaint that faith is unreliable already assumes that God doesn't exist. Plantinga also pointed out that neither Freud nor Marx offered much of an argument that faith in fact arises this way. They described how it could, on the assumption that it is false.",
        ],
      },
      {
        heading: "The wish runs both ways",
        body: [
          "If wanting a belief to be true discredits it, the rule has to be applied to everyone.",
          {
            kind: "An argument from parity",
            premises: [
              "If a belief is discredited because the person holding it wants it to be true, then every belief its holder wants to be true is discredited in the same way.",
              "Many people want there to be no God, and some of the most careful unbelievers have said so plainly.",
            ],
            conclusion: "Applied evenly, the projection argument discredits unbelief as much as faith, and so it settles neither. The question goes back to the evidence.",
          },
          "The second premise doesn't need a guess about anyone's motives. The philosopher Thomas Nagel, one of the most respected unbelievers of his generation, wrote in The Last Word (1997), \"I want atheism to be true,\" and went on: \"I don't want there to be a God; I don't want the universe to be like that.\" He guessed that this \"cosmic authority problem\" is not rare. The psychologist Paul Vitz turned Freud's own method around in Faith of the Fatherless (1999). He looked at the lives of well-known atheists of the last four centuries and found that many had lost a father early or had a weak, harsh or absent one, and he argued that unbelief can be a projection too, a refusal of any Father in heaven by those failed by one on earth. Vitz was careful to say this doesn't determine anyone's beliefs, and his evidence has the limits of any such survey.",
          "I was raised without a father, so I can't read either theory as a stranger to it. On Freud's account, any faith I hold is the obvious wish of a fatherless boy. On Vitz's account, unbelief in a man like me would be just as easy to explain. Both stories can be told about the same person, and that is the trouble with both. They tell you something about the believer. They tell you nothing about whether God is there.",
        ],
      },
      {
        heading: "Is this the God anyone would wish for?",
        body: [
          "There is one more test, and it cuts against Freud. If God were made from our wishes, we would expect him to look like what we want. Some gods do. The God of the Bible often doesn't. When Isaiah saw him, he didn't feel comforted. He said, \"Woe is me! For I am lost\" (Isaiah 6:5). The letter to the Hebrews says, \"It is a fearful thing to fall into the hands of the living God\" (Hebrews 10:31). Jesus told those who would follow him, \"If anyone would come after me, let him deny himself and take up his cross daily and follow me\" (Luke 9:23), and he told them to \"love your enemies and pray for those who persecute you\" (Matthew 5:44). The center of the faith is a crucified Messiah, which Paul himself called \"a stumbling block to Jews and folly to Gentiles\" (1 Corinthians 1:23). The God of Scripture is the last god a frightened person would order: holy, demanding, crucified. A wish-god does not bleed.",
          "A skeptic can fairly answer that even the hard parts serve wishes. Judgment satisfies the wish to see our enemies punished, and a demanding God satisfies the wish to feel serious. There's something in that. But the same Scriptures command love for those enemies, and they place the believer under the same judgment as everyone else. A projection that keeps turning on its maker is an odd kind of projection. This test can't prove that God exists. It shows that the wish account fits the actual content of the faith worse than it claims to.",
        ],
      },
      {
        heading: "The best reply, and what this does not prove",
        body: [
          "The strongest reply goes like this. I'm not saying your belief is false because of where it came from. I'm saying we now have a full explanation of religious belief that doesn't need God, in fear, in wishes, in the way minds like ours are built, and once a belief is fully explained without its object, it has nothing left to stand on. That's a serious argument, and it works in many cases. If I learned that I believed something only because I'd been hypnotized to, I should drop it. But it works only if two things are true: that the explanation is complete, and that there is no other evidence for the belief. Neither has been shown. Freud offered a theory, not a study of believers, and the case for God doesn't rest on anyone's feelings. It rests on arguments from why anything exists, from a universe fit for life, from goodness that binds us, and on the history of Easter, each of which has its own page. A debunking argument also has to be careful what it debunks. Our trust in reason and our sense that cruelty is really wrong came to us through minds shaped by the same pressures, and few people are ready to give those up.",
          "Here is what the argument doesn't prove. It doesn't prove that God exists. It doesn't defend faith that really is a wish with a steeple; much of it is, and it deserves Freud's scorn. It doesn't show that unbelievers are driven by wishes either; Nagel's honesty is a credit to him, not a charge against him. What it shows is narrower. The question of motive can be asked of everyone, and it settles nothing for anyone.",
          "The Bible doesn't flatter believers about their motives. \"The heart is deceitful above all things\" (Jeremiah 17:9), and that includes the believing heart. So ask yourself what you want to be true, whichever way it points. Then put the question down and look at the evidence anyway. The most honest prayer in the Gospels comes from a father with a suffering son, who wanted something badly and knew it: \"I believe; help my unbelief!\" (Mark 9:24). Wanting something doesn't make it false. It just means you have to look harder.",
        ],
      },
    ],
    sources: [
      { author: "Ludwig Feuerbach", title: "The Essence of Christianity", year: "1841" },
      { author: "Karl Marx", title: "A Contribution to the Critique of Hegel's Philosophy of Right, Introduction", year: "1844" },
      { author: "Sigmund Freud", title: "The Future of an Illusion", year: "1927", note: "The best book against: faith as the wish for a father made permanent." },
      { author: "Thomas Nagel", title: "The Last Word", year: "1997" },
      { author: "Paul C. Vitz", title: "Faith of the Fatherless: The Psychology of Atheism", year: "1999" },
      { author: "Alvin Plantinga", title: "Warranted Christian Belief", year: "2000", note: "The answer to the Freud and Marx complaint." },
      { author: "Augustine", title: "Confessions", year: "c. 400; tr. Henry Chadwick, Oxford, 1992" },
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
      "A great deal, and a Christian who can't say so hasn't understood them or the faith he's defending. Richard Dawkins, Christopher Hitchens, Sam Harris and Daniel Dennett, writing between 2004 and 2007, named real things: children abused by clergy and the abuse covered up, violence done in God's name, believers who treat faith as a reason to stop thinking, and arguments for God that don't survive a first reading. They were right that religion can be studied like any other human behavior, and right that a faith which can't bear questions isn't worth keeping. Where their case was weak was philosophy, and that judgment isn't only a believer's. The atheist philosopher Thomas Nagel and the philosopher of science Michael Ruse, no believer, said so in print. Showing that religion does harm doesn't show that God isn't there, and the God they argued against was often not the God the creeds confess. None of that excuses the church. The charge of hypocrisy was in the Gospels long before it was in their books.",
    ],
    sections: [
      {
        heading: "What they got right",
        body: [
          "The movement had four books at its center. Sam Harris began The End of Faith (2004) right after the attacks of September 11, 2001. Richard Dawkins published The God Delusion and Daniel Dennett Breaking the Spell: Religion as a Natural Phenomenon in 2006, and Christopher Hitchens followed with God Is Not Great: How Religion Poisons Everything in 2007. Their case should be heard at its strongest, because much of it is true.",
          "First, abuse and its cover-up. In April 2010 Dawkins and Hitchens backed an effort, with the barrister Geoffrey Robertson, to seek legal action against Pope Benedict XVI over the Catholic Church's handling of priests who had abused children. A believer can think the stunt misjudged and still admit that the thing it pointed at was real. Nor is it only a Catholic sin. In May 2022 an independent report by Guidepost Solutions found that a few senior leaders of the Southern Baptist Convention's Executive Committee, with outside lawyers, had for years controlled the response to reports of abuse and mistreated the survivors who made them. No church gets to point at another.",
          "Second, violence in God's name. Harris wrote out of the smoke of September 11, and his charge was that faith which can't be questioned will sooner or later license killing. The Christian record doesn't let us point only at other religions. English soldiers from the Puritan colonies burned a Pequot village at Mystic in 1637, and one of their captains defended it from Scripture. Third, the life of the mind. In The Selfish Gene Dawkins described faith as blind trust without evidence and even against it. That isn't what the New Testament means by faith, but it is what many believers have been taught to mean, and where it is held it deserves his scorn. Christians have answered honest questions with slogans, called doubt a sin, and offered arguments that a bright fifteen-year-old can take apart. Fourth, Dennett's plain point: religion is a human activity, and like any other it can be studied, and a faith that forbids looking at it has something to hide.",
          "Jesus said harder things than any of them. \"Woe to you, scribes and Pharisees, hypocrites!\" (Matthew 23:27), he said, and he compared the religious leaders of his day to whitewashed tombs, handsome outside and full of bones. The prophets before him said that God hates feasts and sacrifices offered without justice (Amos 5:21-24). The New Atheists thought they were bringing a charge from outside. It had been inside the book the whole time. I came to faith from atheism, so I owe their side the fairest hearing I can give, and on these four counts the fair verdict is that they were right.",
        ],
      },
      {
        heading: "Three different claims",
        body: [
          "It helps to separate what the four books argued, because the claims are of different kinds and stand or fall separately. One is moral and historical: religion does great harm. One is about knowledge: belief in God has no good evidence, so holding it is irrational. One is about God himself: God almost certainly doesn't exist. The first can be true while the third is false. A medicine can be misused by a thousand doctors and still cure. The third is the one that matters most, and Dawkins gave it its clearest form in the fourth chapter of The God Delusion.",
          {
            kind: "The improbability argument (my summary of the case Dawkins makes)",
            premises: [
              "Complex, improbable things need an explanation, and the best explanations account for complexity by something simpler.",
              "A mind able to design a universe would be at least as complex and improbable as the universe it is meant to explain.",
              "So a designer explains nothing. It leaves a greater improbability than the one it was brought in to remove.",
            ],
            conclusion: "God, understood as a designer of the universe, almost certainly does not exist.",
          },
          "The second premise carries the weight. Everything depends on whether God is the kind of thing that could be complex and improbable, a very large and clever being inside the order of things, or the kind of thing the classical creeds mean. It's easy to see why the argument persuades. Much popular Christianity does talk about God as if he were the biggest person in the universe, a designer who stepped in at certain points to do what nature couldn't. If that were God, the second premise would be hard to deny, and the believer would owe an explanation of the explainer. The New Atheists didn't invent that picture. Many of us taught it to them.",
        ],
      },
      {
        heading: "Where their case is weak",
        body: [
          "The sharpest criticism came from people who share Dawkins's unbelief. Thomas Nagel, an atheist and one of the most respected philosophers of his generation, reviewed The God Delusion in The New Republic in October 2006 under the title \"The Fear of Religion.\" He judged its philosophy weak, and he argued that the improbability argument would only have force if believers thought of God as a complicated physical being, something like a vast brain, which the theism of the great traditions does not. Michael Ruse, a philosopher of science and a nonbeliever, went further in a 2009 essay titled \"Why I Think the New Atheists Are a Bloody Disaster,\" saying that The God Delusion would fail an introductory course in philosophy or religion.",
          "Terry Eagleton, the Marxist literary critic, reviewed the book in the London Review of Books in October 2006 as \"Lunging, Flailing, Mispunching.\" His charge was that Dawkins attacked a caricature, a God no serious theologian believes in, and treated God's existence as a scientific question that evidence inside the universe could settle. The classical answer is that God is not one more thing in the universe, however large, but the reason there is a universe at all. That idea may be false. But an argument against a complex being inside the world doesn't touch it, and a reader who wants to reject it has to meet it.",
          "The second claim, that belief in God has no evidence, depends on what counts as evidence. The four books mostly asked for the kind of evidence you'd want for a thing inside the world: a measurement, an experiment, a gap only God could fill. That is the wrong kind of test for a cause of the world as a whole, and the right kind of test for the God of the gaps, which is why that God keeps losing. The better arguments start somewhere else, from the fact that anything exists, from the fitness of the universe for life, from moral obligation, and from a particular event in history. Dawkins's definition of faith as blind trust describes what many believers do. It doesn't describe what the New Testament calls faith, which is trust resting on testimony and evidence, and which the page on faith and reason sets out.",
          "The argument from harm has a different weakness. It shows that people have done evil in God's name. It doesn't show that God isn't there, any more than the crimes done in the name of science show that atoms aren't there. Reasoning from where a belief came from, or what its holders did, to whether it is true is the mistake logicians call the genetic fallacy. The argument also tends to count the worst of religion as its essence and the good it has done as an accident, the hospitals and the abolition of the slave trade among it. A fair atheist will answer that the twentieth century's officially godless states, the Soviet Union first among them, did not kill in the name of atheism the way crusaders killed in the name of Christ. That answer has force. What it shows is that human beings will kill for anything they make absolute, with God or without him. It doesn't show that religion is uniquely poisonous.",
        ],
      },
      {
        heading: "The best reply, and what this does not prove",
        body: [
          "The strongest reply from the New Atheists' side goes like this. Grant that Dawkins's philosophy was weak and that Hitchens was a polemicist, not a philosopher. But the burden of proof hasn't moved. If there is a God, show the evidence. Waving at classical theism isn't evidence. That's fair, and it can't be answered in a paragraph. It is answered, as well as I can, on the pages that argue for God from why anything exists, from a universe fit for life, and from moral facts, and on the page that weighs the history of Easter. A reader is right to judge those arguments on their merits, and he's right to expect them to be better than the ones the four were knocking down.",
          "Here is what none of this proves. It doesn't prove that God exists. Showing that one argument against God fails is not an argument for him. It doesn't clear the church of anything the four accused it of; the abuse, the violence and the anti-intellectualism were real, and some of it is still going on. And it doesn't make them bad men. They were often unfair, and Dawkins's chapter on God's existence is weaker than its confidence. But they asked the church questions it should have been asking itself, and much of the church answered with outrage instead of repentance.",
          "Jesus gave a test for prophets: \"Thus you will recognize them by their fruits\" (Matthew 7:20). Apply it to the church and it draws blood. Apply it to the secular states of the last century that promised a better world once God was gone, and it draws blood again. Neither side walks away clean. The question the New Atheists made unavoidable isn't whether religious people do harm. They do. It's whether there is a God who judges that harm more severely than Hitchens did, and who did not leave the matter there.",
        ],
      },
    ],
    sources: [
      { author: "Sam Harris", title: "The End of Faith", year: "2004" },
      { author: "Richard Dawkins", title: "The God Delusion", year: "2006", note: "The best book against: the case that God almost certainly does not exist." },
      { author: "Daniel C. Dennett", title: "Breaking the Spell: Religion as a Natural Phenomenon", year: "2006" },
      { author: "Christopher Hitchens", title: "God Is Not Great: How Religion Poisons Everything", year: "2007" },
      { author: "Thomas Nagel", title: "The Fear of Religion", in: "The New Republic", year: "2006", note: "An atheist's review of The God Delusion." },
      { author: "Terry Eagleton", title: "Lunging, Flailing, Mispunching", in: "London Review of Books", year: "2006" },
      { author: "Michael Ruse", title: "Why I Think the New Atheists Are a Bloody Disaster", in: "Beliefnet, Science and the Sacred", year: "2009" },
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
      "Yes, in the sense most people mean. Unbelievers love their children, give themselves to good work, keep faith with their friends and face death with courage, and their lives mean a great deal, to them and to the people they serve. A Christian who denies that is slandering his neighbors. The real question is a different one. There's meaning in a life, the worth found in love, work and goodness, and there's the meaning of life, whether the whole has a point and whether what we love is worth it beyond our caring about it. Atheists have the first in full. The second is where the accounts part. The best secular philosophers say we make our meaning, or find it in values that are simply there, in a universe that is silent about both. I think the worth people find in love and justice is real, and that it is better explained by a God who made us for it than by a universe that will not remember it. That is an argument, not a verdict on anyone's life. If you have reached the place where you are not sure you want to be here at all, tell someone today, and in the United States you can call or text 988 right now.",
    ],
    sections: [
      {
        heading: "The case for meaning without God, at its strongest",
        body: [
          "Start with what is plainly true. I was an atheist, and I won't pretend that unbelief makes anyone incapable of love, or of work worth doing, or of courage at a deathbed. The church has sometimes talked as if every atheist must be a secret nihilist, and that picture is false. The serious unbelieving philosophers have thought about meaning more carefully than most Christians have.",
          "Albert Camus put the question at the start of The Myth of Sisyphus (1942): whether life is worth living. His answer was a kind of defiance, to live fully in a world that gives no answer, without the comfort of hope, and he ended the essay, in Justin O'Brien's translation, \"One must imagine Sisyphus happy.\" Jean-Paul Sartre, lecturing in Paris on October 29, 1945, in the talk published as Existentialism Is a Humanism, gave the movement its formula, that existence precedes essence. There is no human nature given in advance, so we make ourselves and our values by what we choose. We are, he said, \"condemned to be free.\"",
          "Two later philosophers made the case in a quieter, stronger form. Thomas Nagel, in \"The Absurd\" (1971), argued that the sense that life is absurd comes from our ability to step back and look at our lives from far outside, and that this is no reason for distress. If nothing matters from that distant standpoint, then that doesn't matter either. He thought Camus's defiance \"romantic and slightly self-pitying,\" and ended, \"we can approach our absurd lives with irony instead of heroism or despair.\" Susan Wolf, in Meaning in Life and Why It Matters (2010), argued that meaning is neither just feeling fulfilled nor just doing something objectively good. Her summary: \"meaning arises when subjective attraction meets objective attractiveness.\" A life is meaningful when a person loves things that are worth loving and does something with that love.",
          "I grant most of this. Wolf is right that meaning is more than a feeling and more than a duty. Nagel is right that a life doesn't need to be seen from the stars to matter on a Tuesday. If the Christian claim were that unbelievers can't have meaningful lives, these philosophers would have refuted it, and so would the unbelievers we know.",
        ],
      },
      {
        heading: "Two questions, not one",
        body: [
          "The argument below isn't about whether atheists find meaning. They do. It's about what meaning is, and what has to be true for it to be what it seems to be. When a mother says her children are worth everything, she doesn't mean only that she happens to care about them. She means they are worth it, and that she'd be wrong not to care. When someone gives his life to justice, he doesn't think he has picked a hobby. Meaning, as we experience it, makes a claim beyond our feelings. The question is what could make that claim true. This is an inference to the best explanation, not a proof: it asks which picture of the world makes best sense of something nearly everyone already believes.",
        ],
      },
      {
        heading: "The argument, laid out",
        body: [
          {
            kind: "An inference to the best explanation",
            premises: [
              "The meaning people find in a life is not only a feeling. It includes the conviction that some things, love, truth and justice among them, are worth giving a life to whether or not anyone feels it. Wolf's account rightly says a meaningful life needs this objective element as well as the subjective one.",
              "If there is no God, that worth is either something we invent, in which case the conviction is mistaken, or a brute fact about a universe that neither knows it nor keeps it.",
              "If there is a good God who made persons to know and love what is good, that worth is what we'd expect, and death doesn't cancel it.",
            ],
            conclusion: "The meaning unbelievers rightly find in their lives is better explained if God exists than if he doesn't. That doesn't show anyone's life lacks meaning. It is an argument about what the meaning they have is.",
          },
          "The first premise is taken from Wolf's account. The rest is my argument, not hers. The weight sits on the second premise, and it has a strong reply, which is that objective values can simply be there, needing no ground, the way the truths of mathematics seem to be. The page on whether you can be good without God weighs that view at length. Here it's enough to say what it costs. On that view, the worth of a child or of justice is real, but it belongs to nothing and no one. Nothing in the universe knows it, and when the last mind goes out, nothing will keep it.",
          "Bertrand Russell, who did not believe in God, saw the long view without flinching. In \"A Free Man's Worship\" (1903) he wrote that all the labors and genius of the ages are \"destined to extinction in the vast death of the solar system.\" Nagel's answer is that this long view isn't the measure, and he's right that the death of the sun can't reach back and spoil a good afternoon. But the question was never whether this afternoon matters to me. It was whether it matters, full stop, and whether that mattering is anywhere but in me. Leo Tolstoy, who had fame, family and wealth, put it plainly in A Confession (1882): \"What will come of what I am doing today or shall do tomorrow? What will come of my whole life?\" That's not a question about feelings. It's a question about what is real.",
        ],
      },
      {
        heading: "What the Bible says about the same question",
        body: [
          "The Bible doesn't dodge Russell's view. One of its own books states it. \"Vanity of vanities, says the Preacher, vanity of vanities! All is vanity\" (Ecclesiastes 1:2). The Preacher tries pleasure, work, wealth and wisdom and finds that death levels all of them. That book is in the canon, which tells you something: the faith doesn't need to hide from the thought that, under the sun, nothing lasts. But the same Preacher says of God, \"He has made everything beautiful in its time. Also, he has put eternity into man's heart, yet so that he cannot find out what God has done from the beginning to the end\" (Ecclesiastes 3:11). On that account, the ache Tolstoy felt isn't a mistake in the wiring. It's what you'd expect in a creature made for more than a lifetime.",
          "The New Testament grounds the answer in an event, not a mood. Paul ends his long argument for the resurrection by turning to ordinary work: \"knowing that in the Lord your labor is not in vain\" (1 Corinthians 15:58). That doesn't make an unbeliever's labor worthless. It says something about why any labor is worth doing, and it rests on whether Jesus rose, which has its own page. If he didn't, Paul himself says the faith is futile.",
        ],
      },
      {
        heading: "The best reply, and what this does not prove",
        body: [
          "The strongest reply is Nagel's, pressed hard. You are smuggling in a demand for cosmic meaning that no one needs. A finite good is still good. A friendship that ends at death was still a friendship, and a kindness no one remembers was still kind. Wanting the universe to keep score is a kind of vanity of its own. There's real force in that, and the Christian should grant it: finite goods are good, and their worth isn't on loan from eternity. The Christian claim is narrower. It's that their worth is real and not ours to revoke, and that a world with a God who knows and keeps what is good is the kind of world in which that would be true. Whether that world is ours is the question the other pages argue.",
          "Here is what the argument doesn't prove. It doesn't prove God exists. It doesn't show that believers live more meaningful lives than unbelievers; many don't. It doesn't show that anyone who doubts God should feel that his life is empty, because it isn't. What it shows is narrower: that the meaning nearly everyone finds asks to be true, and that the question of God is one place to look for what makes it so.",
        ],
      },
      {
        heading: "If the question isn't abstract for you",
        body: [
          "Sometimes this question comes from a seminar. Sometimes it comes at three in the morning, from grief, or exhaustion, or a darkness that makes everything look pointless. If that's where you are, the feeling that nothing matters is real and it is common, and it is not the truth about you. Your life matters to people who would be wrecked to lose you, whether or not you can feel that tonight. Find Help has people you can call, today if you need them. If you have reached the place where you are not sure you want to be here at all, tell someone today, and in the United States you can call or text 988 right now.",
          "The Preacher of Ecclesiastes wrote some of the darkest sentences in the Bible, and they have been kept and read for more than two thousand years by people who believed God was there. The question of meaning doesn't have to be answered tonight. It only has to be carried to someone, and asked out loud.",
        ],
      },
    ],
    sources: [
      { author: "Leo Tolstoy", title: "A Confession", year: "1882" },
      { author: "Bertrand Russell", title: "A Free Man's Worship", in: "The Independent Review", year: "1903" },
      { author: "Albert Camus", title: "The Myth of Sisyphus", year: "1942; tr. Justin O'Brien, 1955" },
      { author: "Jean-Paul Sartre", title: "Existentialism Is a Humanism", year: "lecture 1945; tr. Carol Macomber, 2007" },
      { author: "Thomas Nagel", title: "The Absurd", in: "The Journal of Philosophy", year: "1971" },
      { author: "Susan Wolf", title: "Meaning in Life and Why It Matters", year: "2010", note: "The best case for meaning without appeal to God." },
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
      "They aren't the same faith, and they aren't strangers. Both confess one God, the Creator, who spoke through prophets and will judge the world. Islam honors Jesus as a prophet and as the Messiah, born of the virgin Mary. The disputes are real, and they run through the center of both faiths: whether God's oneness leaves room for Father, Son and Spirit; whether Jesus died on a cross; whether he is a prophet of God or God come in the flesh; and how a person stands before God at the judgment. Below, each dispute is argued from the Christian side with the strongest Muslim reply beside it. No one inside either faith is a fool.",
    ],
    sections: [
      {
        heading: "What Muslims confess, in their own terms",
        body: [
          "The heart of Islam is tawhid, the oneness of God: one God, without partner and without equal, the Creator distinct from everything he made. The gravest sin is shirk, associating anything with God. In Marmaduke Pickthall's translation, quoted throughout this page, the Qur'an says, \"Allah forgiveth not that a partner should be ascribed unto Him\" (Qur'an 4:48). The shortest statement of the faith is a chapter of four verses (Qur'an 112), which confesses Allah as the One and ends, \"He begetteth not nor was begotten. And there is none comparable unto Him\" (112:3-4).",
          "Jesus, whom the Qur'an calls Isa, holds a high place. He is called the Messiah and \"a word from him\" (Qur'an 3:45). He is born of Mary, who asks, \"How can I have a child when no mortal hath touched me?\" (3:47). But he isn't God's son, and he isn't God. \"The Messiah, Jesus son of Mary, was only a messenger of Allah, and His word which He conveyed unto Mary, and a spirit from Him\" (4:171). The same verse goes on to forbid saying \"Three\" and says, \"Allah is only One Allah. Far is it removed from His Transcendent Majesty that He should have a son.\"",
          "On the cross, the Qur'an answers a boast that Jesus had been killed: \"they slew him not nor crucified him, but it appeared so unto them\" (4:157), and \"But Allah took him up unto Himself\" (4:158). Most Muslim commentators have read this to mean that Jesus didn't die on the cross and that God took him up alive, and many held that someone else was made to look like him. Muslim scholars haven't all read the verse the same way, as Todd Lawson's history of its interpretation (2009) shows, but the common confession is plain: Jesus was not crucified.",
          "Islam also honors the books that came before it. The Qur'an says God gave Jesus the Gospel, \"wherein is guidance and a light\" (5:46), and tells the People of the Gospel to judge by what God revealed in it (5:47). It also charges some in the earlier communities with distorting God's words (2:75; 4:46). Muslims call this tahrif, and they haven't agreed on what it means. The eleventh-century scholar Ibn Hazm argued at length that the text of the Bible itself had been altered. Other Muslim scholars have held that the corruption lay in how the books were interpreted rather than in their words.",
        ],
      },
      {
        heading: "What the two faiths share",
        body: [
          "The common ground isn't small. Both confess one God, the Creator of heaven and earth, who is merciful, who speaks, who sends prophets, and who will judge. Both honor Abraham, Moses and Jesus, and both pray, fast and give to the poor as duties. The Second Vatican Council, in Nostra Aetate (1965), said of Muslims, \"They adore the one God, living and subsisting in Himself; merciful and all-powerful, the Creator of heaven and earth.\" In October 2007, 138 Muslim scholars and leaders signed an open letter to Christian leaders, A Common Word Between Us and You, arguing that love of God and love of neighbor stand at the center of both faiths. And the Qur'an tells Muslims to say to Jews and Christians, \"We believe in that which hath been revealed unto us and revealed unto you; our Allah and your Allah is One\" (Qur'an 29:46).",
        ],
      },
      {
        heading: "Do Christians and Muslims worship the same God?",
        body: [
          "Christians answer this differently, and this page doesn't settle it. Miroslav Volf argued in Allah: A Christian Response (2011) that Christians and Muslims worship the same God, whom they understand differently in important ways, and that this matters for how the two communities live together. Other Christians answer no, or not in the same sense. Imad Shehadeh, reviewing Volf's book in Themelios, argued that the two faiths share a name for God but describe him so differently that the shared name hides more than it shows.",
          "Much turns on the difference between referring to someone and describing him rightly: two people can mean the same man and believe very different things about him, up to a point. Christians of good faith land on both sides of that point.",
        ],
      },
      {
        heading: "The first dispute: is God three?",
        body: [
          "The Muslim objection at full strength is not ignorance. It's reverence. If God is one without partner, talk of Father and Son sounds like dragging the Most High into biology. A Muslim objects to the Trinity not because he thinks little of Jesus but because he thinks so highly of God.",
          "So begin with what Christians don't mean. They don't mean three gods, or that God fathered a son as creatures do, or that Mary is divine. When the Qur'an pictures Jesus asked whether he told people, \"Take me and my mother for two gods beside Allah\" (5:116), Christians reject that as firmly as Muslims do. The Nicene Creed calls the Son \"begotten, not made\": not a creature, and not the product of any act in time, but eternally from the Father, of one being with him. Christians confess one God.",
          "What they do mean is that the one God is eternally Father, Son and Spirit, and the reason isn't a love of paradox. It's a claim about what God is. \"Anyone who does not love does not know God, because God is love\" (1 John 4:8). Jesus prays to the Father, \"you loved me before the foundation of the world\" (John 17:24).",
          {
            kind: "An argument from within the Christian confession (it persuades only someone who grants the first premise)",
            premises: [
              "God is love. Love belongs to what God is eternally, not only to what he began to do when he made the world.",
              "Love, as the giving of oneself to another, needs someone to love.",
              "Before the world was made, there was nothing but God.",
            ],
            conclusion: "If God is love eternally, there is giving and receiving within the one God himself. That is the shape of what Christians mean by Father, Son and Spirit.",
          },
          "The strongest Muslim reply goes at the first premise. The Qur'an calls God \"the Loving\" (85:14), and it also tells mankind, \"Ye are the poor in your relation to Allah,\" while he is \"the Absolute, the Owner of Praise\" (35:15). A love that requires another is a need, and God needs nothing. His attributes are eternal without any eternal object beside him. The Christian answer is narrow: the Son and the Spirit aren't beside God, as a creature would be, but within the one God's own life. A Muslim will say that is exactly the point in dispute, and he's right. The argument shows why Christians confess the Trinity. It can't make a Muslim accept the premise it starts from.",
        ],
      },
      {
        heading: "The second dispute: did Jesus die on the cross?",
        body: [
          "This one is a question about an event, so outside evidence can be heard.",
          {
            kind: "A historical argument, an inference to the best explanation",
            premises: [
              "Paul, writing in the 50s, hands on a formula he had already received: \"that Christ died for our sins in accordance with the Scriptures, that he was buried\" (1 Corinthians 15:3-4).",
              "Tacitus, a Roman historian with no sympathy for Christians, writing early in the second century, says \"Christus, from whom the name had its origin, suffered the extreme penalty during the reign of Tiberius at the hands of one of our procurators, Pontius Pilatus\" (Annals 15.44).",
              "A crucified Messiah embarrassed the first preachers. Paul called it \"a stumbling block to Jews and folly to Gentiles\" (1 Corinthians 1:23). It isn't a story they would have invented.",
              "John Dominic Crossan, no friend of traditional belief, in Jesus: A Revolutionary Biography (1994), called Jesus' death by crucifixion under Pilate \"as sure as anything historical can ever be.\"",
            ],
            conclusion: "The best historical explanation of the evidence is that Jesus was crucified under Pontius Pilate and died.",
          },
          "The strongest Muslim reply doesn't dispute that people saw a crucifixion. The verse itself says \"it appeared so unto them\" (4:157). The witnesses reported honestly what they saw, and a historian, who can weigh only human reports, will find exactly what the verse predicts. Revelation from the One who knows the unseen outranks those reports.",
          "The Christian answer is that no evidence could ever count against it, which is its strength as faith and its weakness as history. It asks us to believe that God let Jesus' mother, his friends and his enemies all believe a false thing about the most important event in their lives, and that the faith built on it spread for six centuries before it was corrected. A Muslim will answer that God's purpose in saving his messenger was good. A historian can't rule out a miracle of appearance. He can only say that nothing in the first-century evidence points to one. Nor does the argument show that Jesus rose or that his death saves anyone. The resurrection has its own page.",
        ],
      },
      {
        heading: "The third dispute: who is Jesus?",
        body: [
          "Islam gives Jesus the highest honor it can give a man. In the Qur'an he says, \"I am the slave of Allah. He hath given me the Scripture and hath appointed me a Prophet\" (19:30). Christians worship him. \"Thomas answered him, 'My Lord and my God!'\" (John 20:28).",
          "The Christian case rests partly on how early that worship began. Larry Hurtado, in Lord Jesus Christ (2003), argued that devotion to Jesus as divine, with prayer to him and calling on his name, appeared among his Jewish followers at the very start of the movement, and within a strict belief in one God. If he's right, the worship of Jesus wasn't a later corruption of a prophet's message.",
          "The strongest Muslim reply uses the Gospels themselves. When a man calls him good, Jesus answers, \"Why do you call me good? No one is good except God alone\" (Mark 10:18). He prays to God. In the Qur'an he tells Israel, \"worship Allah, my Lord and your Lord\" (5:72). Bart Ehrman, an agnostic historian, argues in How Jesus Became God (2014) that Jesus didn't call himself God and that his followers came to call him divine after they came to believe he had been raised. Christians read Mark 10:18 as a question that asks the man whom he's speaking to. But grant the limit of the historical argument. It can show that the worship of Jesus is early. It can't show that it's true.",
        ],
      },
      {
        heading: "The fourth dispute: how does a person stand before God?",
        body: [
          "Christians often get this one wrong. Every chapter of the Qur'an but one opens, \"In the name of Allah, the Beneficent, the Merciful\" (1:1). The Qur'an says, \"Despair not of the mercy of Allah, Who forgiveth all sins\" (39:53). Deeds are weighed at the judgment (7:8), but a hadith reported by al-Bukhari has the Prophet saying that no one enters Paradise by his deeds, not even he himself, unless God grants him favor and mercy. Islam is not a religion of earning heaven.",
          "The real difference is narrower. In Islam, God forgives the one who repents, and no atoning death is needed. In Christianity, forgiveness comes through the cross. \"For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast\" (Ephesians 2:8-9).",
          "The strongest Muslim reply is moral. \"Each soul earneth only on its own account, nor doth any laden bear another's load\" (Qur'an 6:164). Punishing the innocent for the guilty is unjust, and a God who needs a death before he forgives seems less merciful, not more. The Christian answer is that the cross isn't God punishing a third party. It's God himself, in the Son, bearing the cost of the wrong, the judge paying what the judged owe. Every real forgiveness costs the one who forgives. But that answer works only if Jesus is God, and if he isn't, the Muslim objection stands. The four disputes turn out to be one.",
        ],
      },
      {
        heading: "What this page doesn't settle",
        body: [
          "These aren't misunderstandings a patient afternoon could clear. They are the load-bearing walls of two different houses. The pluralist who says the faiths are the same hasn't honored Islam. He has erased it.",
          "I hold the Christian confession as confession, not as a point scored against a neighbor I respect: the one God, without ceasing to be one, entered his own creation as a man, was handed over to be killed, and was not defeated by it. I could be wrong, and if I am, I have built my life on a rumor. But I cannot make it smaller to keep peace at the table, and neither can the devout Muslim across from me. What we owe each other is to name what stands on each side, and not lie about how far apart they are.",
        ],
      },
    ],
    sources: [
      { author: "Marmaduke Pickthall", title: "The Meaning of the Glorious Koran", year: "1930", note: "The translation quoted on this page." },
      { author: "Second Vatican Council", title: "Nostra Aetate", year: "1965" },
      { author: "Larry W. Hurtado", title: "Lord Jesus Christ: Devotion to Jesus in Earliest Christianity", year: "2003" },
      { author: "Muslim scholars and leaders", title: "A Common Word Between Us and You", year: "2007", note: "An open letter from 138 Muslim signatories to Christian leaders." },
      { author: "Todd Lawson", title: "The Crucifixion and the Qur'an: A Study in the History of Muslim Thought", year: "2009" },
      { author: "Gabriel Said Reynolds", title: "On the Qur'anic Accusation of Scriptural Falsification (tahrif) and Christian Anti-Jewish Polemic", in: "Journal of the American Oriental Society", year: "2010", note: "On what the charge of tahrif meant." },
      { author: "Miroslav Volf", title: "Allah: A Christian Response", year: "2011" },
      { author: "Bart D. Ehrman", title: "How Jesus Became God", year: "2014", note: "The best case that Jesus' divinity was a later belief." },
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
          "Put as an argument, the objection is about proportion. A just punishment fits the wrong. A human life is short, and even its worst wrongs are finite. Endless conscious suffering is infinite. So a God who punished that way would not be just, and a God who isn't just isn't good. Not all who press this are unbelievers.",
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
          "A minority hope of final restoration denies that the separation is final at all. It has appeared in church history, in Gregory of Nyssa among others, and the Christian philosopher Thomas Talbott argues for it today. But the church has generally not affirmed universal salvation, and the New Testament's warnings are severe and real. Any view that empties them has stopped reading the pages it quotes.",
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
          "Both cheap versions are wrong. The preacher who relishes the fire has not understood the God he claims to serve, and the sentimentalist who empties the warnings has not read the pages he is quoting. What the tradition guards is narrower and more sober than either: that a person can finally, really refuse God, and that the refusal is not nothing. Christians disagree about what hell is like and how long it lasts.",
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
      "Start by separating what is binding from what is open, because most of the heat in this argument comes from confusing the two. That God created, that he created from nothing, and that humanity bears his image are not up for negotiation. The age of the earth and the way God created are open questions, and faithful Christians who love the same Bible have landed in different places. This page takes no side on the age of the earth or on evolution. It sets out the skeptic's charge that Genesis 1 is ancient myth, what kind of text it is, the main ways Christians read it, each in its defenders' best form with its hard question, and what all of them confess together.",
    ],
    sections: [
      {
        heading: "The case against, at its strongest",
        body: [
          "The skeptic's charge is plain. Genesis 1 is a creation story from the ancient Near East, like the others of its time. It describes the world as people saw it then: waters above the sky held back by a solid dome, and the sun, moon and stars set into that dome on the fourth day, after plants already grow on the third. Mainstream science puts the age of the universe at about 13.8 billion years and the earth at about 4.54 billion. Life came by a long history, not in six days. If Christians read the chapter as a factual record, it is false. If they read it some other way, they are retreating from a text that has lost the argument, and finding new meanings only because they have to.",
          "Part of this is true, and some Christian scholars grant it. Paul Seely argued in the Westminster Theological Journal in 1991 that the Hebrew word for the \"expanse\" of Genesis 1:6-8, raqia, was understood in the ancient world as a solid dome. Others, such as Vern Poythress, answer that the word describes the sky as it appears, not a physical theory. Either way, the chapter uses the picture of the world its first readers had. It does not read like a modern science paper, and no honest reading pretends it does.",
          "But the second half of the charge, that non-literal readings are a modern retreat, is simply wrong on the history.",
        ],
      },
      {
        heading: "Not a modern retreat",
        body: [
          "Christians were arguing about how to read these days more than a thousand years before anyone dated a rock. In the third century Origen asked in On First Principles whether anyone \"possessed of understanding\" would suppose \"that the first day, and the second, and the third, in which also both evening and morning are mentioned, existed without sun, and moon, and stars\" (On First Principles 4, in the Ante-Nicene Fathers translation). He read the days as pointing beyond themselves.",
          "Early in the fifth century Augustine wrote The Literal Meaning of Genesis, and even in a book with that title he concluded that the days were not days measured by the sun, and that God made all things together. He also warned Christians against talking nonsense about the natural world in front of unbelievers, calling it \"a disgraceful and dangerous thing\" (The Literal Meaning of Genesis 1.19.39, in John Hammond Taylor's translation).",
          "The plainer reading is just as old. In the fourth century Basil of Caesarea preached nine sermons on the six days, the Hexaemeron, and set himself against reading the text as allegory: \"For me grass is grass; plant, fish, wild beast, domestic animal, I take all in the literal sense\" (Hexaemeron 9.1, in the Nicene and Post-Nicene Fathers translation). The church has held more than one faithful reading from the start. That doesn't settle which is right. It does mean no reading can be dismissed as a recent invention.",
        ],
      },
      {
        heading: "What kind of text it is",
        body: [
          "The best way to see what Genesis 1 is doing is to read it beside the stories it was written among. The best known is the Babylonian Enuma Elish, found on tablets from the library of the Assyrian king Ashurbanipal at Nineveh and first published by George Smith in 1876. In it the god Marduk kills the sea goddess Tiamat in battle and splits her body to make the sky and the earth. Human beings are made from the blood of a slain god, Kingu, to serve the gods.",
          "Set Genesis 1 beside that and the differences are the point. There is one God, and no battle. He speaks, and things are. The deep and the waters are not a goddess but a thing he made and orders. The sun and moon, worshiped as gods all around Israel, are not even named; they are \"lights,\" hung up to mark seasons and days (Genesis 1:14-16). The great sea creatures, monsters in other stories, are made on the fifth day and called good. And humans are not slaves made to feed the gods. They are made in God's own image to rule the world on his behalf: \"So God created man in his own image, in the image of God he created him; male and female he created them\" (Genesis 1:27). Then God rests, not because he has handed his work to slaves, but because it is finished and good.",
          "So the honest answer to the skeptic is that Genesis 1 is ancient, and written in the world picture of its time, and that this is not the same as being myth in the sense of a false story. It is an argument with the myths of its neighbors, made in their own terms, about who God is, what the world is, and what a human being is for. Whatever one decides about the days, that argument is the chapter's main business, and it doesn't depend on any answer about how long creation took.",
        ],
      },
      {
        heading: "The main Christian readings",
        body: [
          "Here are the readings faithful Christians hold, each in the form its defenders would give it, with its strongest point and its hard question. I take no side among them.",
          "The calendar-day reading holds that God made the world in six ordinary days, not long ago. It was revived in modern form by John Whitcomb and Henry Morris in The Genesis Flood (1961). Its strongest point is the text: the word \"day\" with a number, framed by \"there was evening and there was morning,\" reads most naturally as an ordinary day, and the Sabbath command grounds Israel's week in it: \"For in six days the LORD made heaven and earth, the sea, and all that is in them, and rested on the seventh day\" (Exodus 20:11). It reads the chapter the way Basil did. Its hard question is the evidence of geology, astronomy and biology, which mainstream science reads as showing a very old earth and universe, and the light and evenings of the first three days, before the sun of the fourth, which Origen already noticed.",
          "The day-age reading, defended by the astronomer Hugh Ross, who founded Reasons to Believe in 1986, holds that each day is a long age. Its strongest point is that the Hebrew word for day can mean a period of time, as it does in Genesis 2:4, where all of creation happens \"in the day\" God made it, and that \"For a thousand years in your sight are but as yesterday when it is past\" (Psalm 90:4). Its hard question is the order: plants on the third day before the sun on the fourth fits poorly with a sequence of ages, and the evenings and mornings sound like days.",
          "The framework reading, first proposed by the Dutch scholar Arie Noordtzij in 1924 and developed by Meredith Kline, beginning with his article \"Because It Had Not Rained\" in 1958, holds that the days are a literary frame, not a timetable. The first three days form realms (light and dark, sky and sea, land) and the next three fill them with their rulers (sun and moon, birds and fish, animals and humans). Its strongest point is that the pattern is plainly there and plainly deliberate, and that Genesis 2:5 assumes the ordinary workings of rain and growth. Its hard question is that the chapter reads like a sequence, and Exodus 20:11 seems to treat it as one.",
          "The analogical-day reading, argued by C. John Collins in Genesis 1-4 (2006), holds that the days are God's workdays, like ours but not identical to them, told so that Israel's week could mirror its maker's. Its strongest point is that it keeps the days as days in the story while treating their length as beside the text's purpose. Its hard question is whether it can say what the days correspond to in the world at all.",
          "The cosmic-temple reading, argued by John Walton in The Lost World of Genesis One (2009), holds that in the ancient world to create something was mainly to give it a function, and that the seven days describe God setting up the cosmos as his temple and, on the seventh day, taking up his rest in it the way a god takes up residence in a temple. Walton does not deny that God made the material world; he argues that Genesis 1 is not that account. Its strongest point is how much it explains about the chapter's ancient setting, and why it ends in rest. Its hard question, pressed by his critics, is whether ancient readers really separated function from material so sharply.",
          "Evolutionary creation holds that God created through the long process biology describes, and that Genesis 1 teaches who made the world and why, not the method. Francis Collins, who led the Human Genome Project, founded BioLogos in 2007 to make this case. Its strongest point is that it takes both the text and the scientific evidence seriously without asking either to say what it doesn't. Its hard question is death and suffering over long ages before human sin, and what becomes of Adam.",
        ],
      },
      {
        heading: "What all of them confess",
        body: [
          "Underneath the disagreement is a great deal of agreement, and it's the part that matters most. Every one of these readings confesses that God made everything that is, and made it from nothing: \"By faith we understand that the universe was created by the word of God, so that what is seen was not made out of things that are visible\" (Hebrews 11:3). Every one confesses that he made it by his word, \"And God said, 'Let there be light,' and there was light\" (Genesis 1:3), and that it was good: \"And God saw everything that he had made, and behold, it was very good\" (Genesis 1:31). Every one confesses that human beings bear his image, and that the world is a creature, not a god and not an accident.",
          "The creeds bind exactly that. The Apostles' Creed confesses God the Father Almighty, \"Maker of heaven and earth,\" and the Nicene Creed adds \"and of all things visible and invisible.\" Neither says a word about how long it took. That puts the question of the days where it belongs: a third-order question, where faithful Christians differ without dividing churches or the faith. Treating it as the gospel itself does real harm. A young believer who is told that losing her view of the earth's age means losing Christ may believe it, and lose both.",
        ],
      },
      {
        heading: "Adam, and what this does not settle",
        body: [
          "A related question carries more weight for many Christians: whether Adam was a historical individual. Paul builds on him: \"sin came into the world through one man, and death through sin, and so death spread to all men because all sinned\" (Romans 5:12), and \"as in Adam all die, so also in Christ shall all be made alive\" (1 Corinthians 15:22). Many Christians hold that the gospel's account of sin and rescue needs a real first man. Others hold that Adam stands for humanity, or was a real man chosen as its head among a larger population. The book Four Views on the Historical Adam (2013) sets these out side by side: Denis Lamoureux argues there was no historical Adam, John Walton that Adam was historical but presented as an archetype, C. John Collins for a historical Adam with an old earth, and William Barrick for a historical Adam with a young earth. Because of what Paul builds on him, many treat this as weightier than the days. This page leaves it where faithful Christians have left it, open, and names why it matters to them.",
          "None of this settles how old the earth is or how life came to be, and it isn't meant to. What it does show is that the skeptic's choice, a scientific textbook or a dead myth, is a false one. Genesis 1 is neither. It's an ancient text that took on the gods of the most powerful empires of its day and told a different story about where everything came from. Genesis 1 answers who and why, and it may simply not be pitched at the modern question of how. Hold on tight to the Creator, and hold the mechanism loosely. The chapter still asks the question it asked in Babylon: not how long it took, but whose world this is.",
        ],
      },
    ],
    sources: [
      { author: "Augustine", title: "The Literal Meaning of Genesis", year: "trans. John Hammond Taylor, 1982", note: "Ancient Christian Writers 41." },
      { author: "John C. Whitcomb and Henry M. Morris", title: "The Genesis Flood", year: "1961" },
      { author: "Meredith G. Kline", title: "Because It Had Not Rained", in: "Westminster Theological Journal", year: "1958" },
      { author: "Paul H. Seely", title: "The Firmament and the Water Above, Part I: The Meaning of raqia in Gen 1:6-8", in: "Westminster Theological Journal", year: "1991" },
      { author: "C. John Collins", title: "Genesis 1-4: A Linguistic, Literary, and Theological Commentary", year: "2006" },
      { author: "John H. Walton", title: "The Lost World of Genesis One", year: "2009" },
      { author: "Matthew Barrett and Ardel B. Caneday, eds.", title: "Four Views on the Historical Adam", year: "2013" },
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
      "Not being the smartest thing in the room. Machines now do much of what people once called uniquely human: they calculate, they converse, they write fluent paragraphs. The strongest secular account of the mind says a mind is what it does, so a machine that does what we do would, in the end, be one of us. Serious philosophers who don't believe in God dissent from that account, and no one yet knows whether a machine could be conscious. This page doesn't pretend to know. It answers a different question: where human worth rests if it doesn't rest on our abilities. The Christian answer is that it rests on being made in the image of God, which is given, not earned, and which no machine's skill can add to or take away.",
    ],
    sections: [
      {
        heading: "The case that a mind is what it does",
        body: [
          "Start with the strongest version of the other view. Alan Turing opened his paper \"Computing Machinery and Intelligence\" (1950) with the sentence \"I propose to consider the question, 'Can machines think?'\" He then put a test in its place, the imitation game: if a machine's answers can't be told from a person's, we have no good reason to deny it what we grant the person. To the objection that a machine wouldn't really feel what it says, Turing replied that on that standard you couldn't know that other people think either. We extend to each other what he called \"the polite convention that everyone thinks,\" and he saw no principled reason to withhold it from a machine.",
          "Philosophers built a theory of mind on that insight. Hilary Putnam argued in 1967 that a mental state such as pain is a functional state: what makes it pain is the role it plays in a whole system, not the stuff the system is made of. A mammal and an octopus can both be in pain with very different nerves. If that's right, a mind could in principle be made of silicon as well as of cells. Daniel Dennett pressed further. In Consciousness Explained (1991) he argued that there is no inner theater in the brain where experience is shown to a self, and no extra ingredient beyond the brain's own processing. In a 1994 paper on conscious robots he wrote that \"we are a sort of robot ourselves,\" and said his doubts about building a conscious machine were practical, not theoretical.",
          "Grant what is true in this. The list of things only humans could do has been shrinking for a long time, and each item on it was once defended as the mark of a mind. If our worth rested on that list, we'd have reason to be anxious. To deny a machine anything simply because it's made of silicon rather than carbon would be an arbitrary line, and the charge of \"carbon chauvinism\" would stick. The machines should humble us. They show that much of what we prized in ourselves can be copied.",
        ],
      },
      {
        heading: "The secular dissent",
        body: [
          "Not every unbeliever accepts that account, and the two most famous objections come from philosophers who make no religious argument at all. John Searle, in \"Minds, Brains, and Programs\" (1980), asked us to imagine a man who knows no Chinese, shut in a room with a rulebook for matching Chinese symbols to other Chinese symbols. Questions come in, he follows the rules, and answers go out that a Chinese speaker can't tell from a native's. Yet the man understands nothing. Searle's point was that running a program, however well, isn't the same as understanding. His critics answered that the whole system, the man with his rulebook and papers, understands, even if the man doesn't. Searle replied that the man could memorize the rulebook and still not know what a single symbol meant. The argument is still disputed.",
          "Thomas Nagel, in \"What Is It Like to Be a Bat?\" (1974), made a different point. He wrote that \"an organism has conscious mental states if and only if there is something that it is like to be that organism.\" We can describe everything a bat's brain does and still not know what it is like to be a bat. A complete account of what a system does may leave out the one thing that makes it conscious: that there is someone there for whom it is like something.",
          "Neither argument shows that a machine can't be conscious, and honesty requires saying so. Searle's argument is about running a program, not about every possible machine, and Nagel's is about the limits of our descriptions. What they show is that doing what a mind does and being a mind may not be the same thing, and that nobody has yet shown how to tell from the outside. Whether any machine has an inner life, now or ever, is a question this page leaves open.",
        ],
      },
      {
        heading: "Why ability can't be the measure of worth",
        body: [
          "Set the machines aside for a moment and ask what we already believe about each other. We hold that a newborn, a man with advanced dementia and a child with a profound disability have the same worth as the most gifted adult in the room. None of them can do what the gifted adult does. Some can do less than a good machine. If worth tracked ability, they'd have less of it.",
          "The philosopher Peter Singer has been honest about where a view based on abilities leads. In Practical Ethics (1979) and since, he has used \"person\" to mean a being aware of itself as existing over time, and argued that a newborn is not a person in that sense, so that killing a newborn is never equivalent to killing a person. Most people, religious or not, recoil from that conclusion. The recoil is worth taking seriously. It suggests that we already believe human worth rests on something other than what we can do.",
          "Unbelievers hold that belief as firmly as Christians do, and often live it better. Jacques Maritain recalled that when people of opposed philosophies agreed on a list of human rights after the Second World War, they agreed on condition that no one asked them why. The agreement was real. The question of what grounds it is still there.",
        ],
      },
      {
        heading: "What the image of God has meant",
        body: [
          "The Bible's first word on what a human being is says this: \"Then God said, 'Let us make man in our image, after our likeness. And let them have dominion'\" (Genesis 1:26), and \"So God created man in his own image, in the image of God he created him; male and female he created them\" (Genesis 1:27). Christians have read the image in three main ways, and each has a strength and a weakness.",
          "The first reading finds the image in something we are, chiefly the mind. Thomas Aquinas, following Augustine, placed the image above all in our intellectual nature. Its strength is that it names something real about us. Its weakness, in this century, is plain: if the image is reason, then it comes in degrees, and the question of machines becomes a contest of abilities after all.",
          "The second reading finds the image in what we are called to do. J. Richard Middleton, in The Liberating Image (2005), argued from the ancient Near East, where a king was called the image of a god, that Genesis gives every human being that royal office: to represent God and care for his world. Its strength is that it fits the text, where image and dominion arrive together. Its weakness is the same question in another form, since some people can't carry out any office at all.",
          "The third reading finds the image in relationship. Karl Barth read \"male and female he created them\" as the clue: human beings image a God who is himself a communion of persons, and they are made for relationship with God and with each other. Its strength is that it rests the image on God's turning toward us, which no loss of ability can undo. Some recent theologians combine the three.",
          "Whatever the image consists in, the text presents it as given. God creates, and the creature receives. No one in Genesis earns the image or qualifies for it. That is the point that matters here.",
        ],
      },
      {
        heading: "The argument, laid out",
        body: [
          {
            kind: "An inference to the best explanation, about where human worth rests (it makes no claim about what machines are)",
            premises: [
              "Every human being has equal and unconditional worth: the newborn and the man with advanced dementia as much as the most gifted adult.",
              "Abilities such as intelligence, speech and reasoning come in degrees, can be lost, and can be matched or passed by machines in some tasks.",
              "So a worth that rested on abilities would come in degrees, could be lost, and could be outranked.",
              "A worth that rests on being made and loved by God, given rather than earned, is equal, can't be lost, and doesn't depend on any ranking.",
            ],
            conclusion: "Equal human worth is better explained if it is given by God than if it rests on what we can do. Whatever machines turn out to be able to do, that worth isn't in competition with them.",
          },
          "The weight sits on the first premise, and nearly everyone accepts it. The strongest secular reply is that worth can rest on being a member of the human species, or on the kind of being we are even when our abilities fail, with no appeal to God. That reply is held sincerely and lived well. The Christian answer is a question: why should membership in a species carry unconditional worth, if the species is one product of nature among others? Something has to make the human kind worth more than its abilities. The Christian account says what that is. This is an argument about what best explains a belief we share, not a proof, and it doesn't show that anyone who rejects God values people less.",
        ],
      },
      {
        heading: "Dust and breath: why the body matters",
        body: [
          "The second account of creation says, \"Then the LORD God formed the man of dust from the ground and breathed into his nostrils the breath of life, and the man became a living creature\" (Genesis 2:7). The person is neither the dust alone nor the breath alone, but the two together. Christianity has never treated the body as luggage the real self carries around. The Apostles' Creed confesses \"the resurrection of the body,\" not an escape from it.",
          "That has always set Christians against one recurring idea: that the true self is something inside the body that would be better off out of it. Around the year 180, Irenaeus of Lyon wrote Against Heresies against Gnostic teachers who denied that the body would be saved, and he insisted that the God who made the flesh would raise it. Some people now hope that a mind might one day be copied out of the brain and kept running on a machine. That hope assumes a person is a pattern that the body merely carries. Whatever one thinks of its chances, Christianity holds a different picture of a person, and it's the older one: a creature of dust and breath, made to be raised whole.",
        ],
      },
      {
        heading: "What this does not settle",
        body: [
          "This answer doesn't show that machines can't be conscious. Nobody knows that, and the Christian account doesn't require a verdict on it. It doesn't prove that God exists; the other pages argue that. It doesn't say how we ought to treat a machine if one ever did have an inner life, which would be a hard and new question. And it doesn't claim that Christians have always honored the weak; often they haven't.",
          "What it says is narrower. Your worth was never your ability. The machines can do more than many people every year, and that is no threat to what you are, because what you are was never a ranking. \"What is man that you are mindful of him, and the son of man that you care for him? Yet you have made him a little lower than the heavenly beings and crowned him with glory and honor\" (Psalm 8:4-5). The psalmist asked the question looking up at the stars. We ask it now looking at a screen. The answer he gave doesn't depend on what the screen can do.",
        ],
      },
    ],
    sources: [
      { author: "Alan M. Turing", title: "Computing Machinery and Intelligence", in: "Mind", year: "1950", note: "The case that a machine that does what we do should be granted what we grant each other." },
      { author: "Jacques Maritain", title: "Man and the State", year: "1951" },
      { author: "Hilary Putnam", title: "Psychological Predicates", year: "1967; reprinted as \"The Nature of Mental States\", 1975" },
      { author: "Thomas Nagel", title: "What Is It Like to Be a Bat?", in: "The Philosophical Review", year: "1974" },
      { author: "Peter Singer", title: "Practical Ethics", year: "1979" },
      { author: "John R. Searle", title: "Minds, Brains, and Programs", in: "Behavioral and Brain Sciences", year: "1980" },
      { author: "Daniel C. Dennett", title: "Consciousness Explained", year: "1991", note: "The strongest case that a mind is what a brain does, with nothing added." },
      { author: "J. Richard Middleton", title: "The Liberating Image", year: "2005" },
    ],
    essaySlug: "personhood-in-the-age-of-ai",
    essayTitle: "What Makes Us Human in the Age of AI?",
  },
];
