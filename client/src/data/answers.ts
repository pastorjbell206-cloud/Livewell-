/**
 * The Answers hub data (/answers). Each entry is a real reader question whose
 * H2 is the query itself, answered in three tight paragraphs distilled from
 * the essay that carries the full argument, laddering short answer → essay →
 * book. The paragraphs are compressions of their source essays — no claim,
 * citation, or verse appears here that is not in the essay. Edit the answer
 * by editing its essay first; this layer only surfaces it.
 */
export interface Answer {
  /** URL anchor + FAQ identity — the question in kebab form. */
  slug: string;
  /** The reader's actual question, verbatim. Rendered as the H2. */
  question: string;
  /** Three paragraphs: direct answer → strongest ground → the weight it leaves. */
  paragraphs: string[];
  /** The essay that makes the argument in full. */
  essaySlug: string;
  essayTitle: string;
  /** The book that carries it the rest of the way. */
  bookTitle: string;
  bookHref: string;
}

export const ANSWERS: Answer[] = [
  {
    slug: "did-the-resurrection-actually-happen",
    question: "Did the resurrection actually happen?",
    paragraphs: [
      "The resurrection is the best historical explanation of facts nearly all serious scholars — skeptical ones included — already grant. Not a proof. The best explanation. Jesus was executed by crucifixion. His followers were convinced they had seen him alive and died for the claim. The proclamation began in Jerusalem, where a body could have ended it. The creed in 1 Corinthians 15:3–8 dates to within years of the cross. Legends need time. Here there is almost none.",
      "The rivals are not stupid. Hallucinations are private events — they do not happen to five hundred at once or to a persecutor like Paul, and they leave the body in the tomb. Liars do not die for what they know they fabricated. Each alternative rescues one corner and leaves the rest exposed. Hume's deeper objection rules the miracle out before weighing anything. That is not a finding. It is an assumption dressed as rigor.",
      "You can weigh it all and still conclude it did not happen. That is a respectable place to stand. The verdict without the work — where I lived for years — is not. The tomb sat in a city that wanted the movement dead and had only to produce a body. They never did. The matter was supposed to be closed on a Friday. It would not stay closed.",
    ],
    essaySlug: "did-the-resurrection-happen",
    essayTitle: "Did the Resurrection Actually Happen?",
    bookTitle: "The Reliability of Scripture",
    bookHref: "/books/the-reliability-of-scripture",
  },
  {
    slug: "why-would-anyone-trust-the-bible",
    question: "Why would anyone trust the Bible?",
    paragraphs: [
      "The case against the Bible rests almost entirely on claims the relevant scholarship — much of it produced by skeptics — does not support. The telephone game is the wrong picture: the texts spread as a branching tree of copies, and thousands of manuscripts are how scholars catch errors. The canon was not voted in by a council. It emerged by recognition, from below; the alternative gospels arrived late and lost.",
      "None of that makes the contents true, and the contradictions objection has real texture: pretending the differences away is a kind of lying. Independent witnesses differ at the edges and converge at the center — on the angels, not on the crucifixion, the empty tomb, the appearances. All four put women — witnesses their culture discounted — first at the tomb; fabricators edit that out. You can grant every point and still conclude the witnesses were sincerely mistaken.",
      "My unbelief felt like the brave option. It was the credulous one — faith in secular folklore about the Bible, held on worse evidence than the thing I was rejecting. Have you read it with the attention you would give a hostile witness you suspected of telling the truth, or been quoting the trailer and calling it the film? The book is not asking to be trusted blindly. It is asking to be opened.",
    ],
    essaySlug: "why-trust-the-bible",
    essayTitle: "Why Would Anyone Trust the Bible?",
    bookTitle: "The Reliability of Scripture",
    bookHref: "/books/the-reliability-of-scripture",
  },
  {
    slug: "if-god-is-good-why-suffering",
    question: "If God is good, why is there so much suffering?",
    paragraphs: [
      "Suffering does not disprove God, but it does not need to be solved to be survived. It is the best reason not to believe. The logical version has weakened: Plantinga showed a world of free creatures may be worth more than a world of puppets, because forced love is a contradiction. What remains is not a proof but a cry.",
      "Ivan Karamazov gives the objection its full strength: no future harmony is worth the torture of one innocent child, and he returns the ticket. Lewis wrote The Problem of Pain, then lost his wife and found his arguments never touched the wound. But the outrage borrows. Atoms do not have oughts. To call a child's suffering evil is to stand on a moral floor a Godless universe cannot pour. Every worldview carries the problem; the secular one relocates it, where suffering means nothing.",
      "Out of the whirlwind God answers Job with questions, not a theodicy — he refuses the explanation and offers himself. The center of the faith is not a God who explains from a distance but one who entered it. The child in the ward is still in the ward. The people who met him in their worst hour do not come back saying they understand. They come back saying they are not alone in it.",
    ],
    essaySlug: "if-god-is-good-why-suffering",
    essayTitle: "If God Is Good, Why Is There So Much Suffering?",
    bookTitle: "Prayer in the Dark",
    bookHref: "/prayer-in-the-dark",
  },
  {
    slug: "what-if-christianity-is-wrong",
    question: "What if Christianity is wrong?",
    paragraphs: [
      "If Christianity is wrong, everything falls — Paul says if Christ has not been raised the faith is futile and the dead are simply dead. But the question is not the cost-free clarity it feels like at two in the morning. To say the universe is meaningless, that love is chemistry, that justice is a preference, is to hold claims as large as any creed. Everyone is believing something they cannot prove.",
      "Scripture builds on a doubter: Thomas demands evidence, and the risen Christ invites his hand into the wound; the father in Mark 9 prays \"I believe; help my unbelief\", and Jesus heals the boy anyway. Terrified men who had run died rather than recant what they claimed to see, and people do not die for a story they know they invented. Even the morality you cannot stop believing — the worth of the weak — is, on Holland's account, borrowed Christian capital.",
      "No position escapes the wager. The skeptic bets his one life on the tomb staying shut; you bet yours on it opening. Both are total; the honest ones on both sides know it. The question might end a version of your faith — the sheltered one that was always going to break. Let it. You may find you cannot get the stone to stay in front of the tomb.",
    ],
    essaySlug: "what-if-we-are-wrong",
    essayTitle: "What If Christianity Is Wrong?",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
  {
    slug: "was-jesus-just-a-good-teacher",
    question: "Was Jesus just a good teacher?",
    paragraphs: [
      "No. The great-teacher verdict is the one position the historical Jesus makes almost impossible to hold, because the teaching you admire and the claims you want to discard come from the same mouth. He told a paralytic \"your sins are forgiven\" (Mark 2:5–7), and the scribes asked who can forgive sins but God alone. He said \"before Abraham was, I am\" (John 8:58), and they picked up stones. Lewis's point holds: no merely wise teacher talks that way.",
      "The trilemma's largest hole is legend — perhaps a later church put the high claims in a humble rabbi's mouth — long the scholarly default. But legend needs time, and the time has been taken away. Hurtado traces divine worship of Jesus to the first years after his death, among Jewish monotheists who would die before bowing to an idol. Devotion that high, that fast, among those people does not behave like a legend.",
      "The remaining verdicts carry costs the admirer never prices. The Sermon on the Mount is not the work of a disordered mind, and frauds do not die for the con when recanting would save them. I held the comfortable view. It was a file, not a conclusion — honoring a man without obeying him. The one reply he has made unavailable is the one most people reach for first.",
    ],
    essaySlug: "was-jesus-just-a-good-teacher",
    essayTitle: "Was Jesus Really Just a Good Teacher?",
    bookTitle: "The Scandal of the Cross",
    bookHref: "/the-scandal-of-the-cross",
  },
  {
    slug: "do-i-have-to-choose-between-faith-and-science",
    question: "Do I have to choose between faith and science?",
    paragraphs: [
      "No. The war between faith and science is not a finding of science. It is a story with a traceable birth date, assembled in the late nineteenth century by John William Draper (1874) and Andrew Dickson White (1896) — polemics, not history. Science grew up in the cradle of belief. The medieval church funded astronomy. Newton wrote more on theology than on physics. Kepler described his astronomy as thinking God's thoughts after him.",
      "The friction is real — the fight over Darwin was real, and parts of the church handled it badly. But the working scientists the war story says cannot exist are not rare. Francis Collins led the Human Genome Project and describes, in The Language of God (2006), coming to faith by following his reasoning past the edge of what science is built to answer. John Polkinghorne helped establish the existence of quarks, then was ordained an Anglican priest. Water boils because the molecules are agitated; the kettle is on because someone wanted tea. The answers do not compete.",
      "Science does not prove God, and the Christians who say it does have not understood either. What remains is the older question the laboratory cannot settle: whether the world is authored or accidental. Science hands you a magnificent description of the house. It cannot tell you whether anyone lives there.",
    ],
    essaySlug: "faith-and-science",
    essayTitle: "Do You Have to Choose Between Faith and Science?",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
  {
    slug: "is-it-okay-to-be-angry-at-god",
    question: "Is it okay to be angry at God?",
    paragraphs: [
      "Yes — the prayer book of the Bible says so. Roughly a third of the Psalms are laments, raw complaints flung at God. How long, O Lord? Will you forget me forever? That is Psalm 13, not asking whether God has forgotten but asserting it. God gave us a songbook with the complaints left in and called it Scripture.",
      "Walter Brueggemann noticed the church has dropped these psalms from its worship — a cutting that made our faith not more reverent but dishonest. We taught people that the way to be close to God is to lie to him. But the lament is always addressed to God. There is an anger that walks out, and an anger that stays in the room — faith holding on with bloodied hands. You do not rage at a God you have given up on. You rage at the one you are still holding to his promise.",
      "Jesus died with a lament on his lips: My God, my God, why have you forsaken me — Psalm 22. I have watched the anger last into the tenth year in people I did not consider faithless; I will not promise it resolves on a schedule. The opposite of faith was never anger. It was the silence of walking away. You are still yelling at him. So was his Son.",
    ],
    essaySlug: "what-psalms-teach-about-anger-at-god",
    essayTitle: "Is It Okay to Be Angry at God?",
    bookTitle: "Prayer in the Dark",
    bookHref: "/prayer-in-the-dark",
  },
  {
    slug: "can-you-be-a-christian-without-church",
    question: "Can you be a Christian without going to church?",
    paragraphs: [
      "You can believe alone — the thief on the cross believed alone, and Jesus received him without a membership card. But believing alone and being a Christian alone are not the same sentence. The New Testament has no word for a Christian who belongs to no church; the category does not exist. Paul's image is a body part, and a hand on a table is not a more autonomous hand. It is a dying hand.",
      "The strongest objection is accurate: the church that hurt you sounds nothing like the family in Acts 2 that sold its property to feed each other. You were promised a family and sold a service, and when the service disappointed, you were blamed for leaving — which is exactly backward. But the failures of the counterfeit do not abolish the original. You cannot be disappointed by a forgery unless you carry the image of the genuine article it failed to be.",
      "Bonhoeffer wrote that I cannot reliably speak the word of God to myself; a faith with no outside voice becomes a conversation with yourself. The loneliness of your private faith is not a personal failing. It is the ache of a thing built for two or more, running on one. You can hold the faith by yourself. I just don't think it can hold you.",
    ],
    essaySlug: "can-you-be-a-christian-alone",
    essayTitle: "Can You Be a Christian on Your Own?",
    bookTitle: "The Body You Left",
    bookHref: "/the-body-you-left",
  },
  {
    slug: "done-with-church-but-not-jesus",
    question: "What if I'm done with church but not with Jesus?",
    paragraphs: [
      "You are not rare, and you are not outside the reach of the God you still love. The Great Dechurching (2023) found around forty million American adults stopped attending church in the last quarter-century — and a large share did not deconvert. They still pray. They still believe Jesus rose. They drifted. You are not a problem the church needs to solve. You are a person the church mostly failed to notice leaving.",
      "Your faith is plainly real. The question is whether a faith this real was ever meant to be carried alone. When crowds abandoned Jesus in John 6, Peter stayed: Lord, to whom shall we go? You have the words of eternal life (John 6:68). Peter never said that line alone. He said it beside eleven others who had also decided not to leave. The staying was personal. It was not solitary.",
      "No one is asking you back into the room that hurt you; the thing you long for was never the room. But the faith you carry alone is a coal pulled from the fire, and a coal alone goes cold. That is not a verdict on the coal. Jesus has never handed himself out one isolated soul at a time. He comes with a body attached. That is not the fine print. That is the gift.",
    ],
    essaySlug: "done-with-church-not-jesus",
    essayTitle: "What If You're Done With Church but Not With Jesus?",
    bookTitle: "The Body You Left",
    bookHref: "/the-body-you-left",
  },
  {
    slug: "what-happens-after-deconstruction",
    question: "What happens after you deconstruct your faith?",
    paragraphs: [
      "The swept house does not stay empty — that is what happens. But first: the people deconstructing their faith are usually right about why. If you were handed a Christianity that was equal parts Jesus and a voting bloc, tearing it down is not rebellion. It is closer to repentance. I built an atheism at nineteen and tore it down; I have held the hammer. Doubt, by itself, builds nothing.",
      "Derrida meant deconstruction as a way of reading — taking a text apart to see what it was built on — and somewhere we kept the taking-apart and dropped the reading-truly. Suspicion can tell you what to tear down; it cannot tell you what to do on a Tuesday in February. The choice to stop in the empty field is itself a faith — a faith in nothing in particular. The field gets occupied by whatever is strongest in the neighborhood.",
      "Jesus deconstructed the Pharisees relentlessly, but his demolition always had a destination — the line between the prophet and the cynic. Keep tearing out the rot; decide, while the hammer is still swinging, whether you are tearing toward anything and not only away. \"I believe; help my unbelief\" (Mark 9:24) is reconstruction in a single line. The field has no roof, and the rain is coming, and a hammer was never a shelter.",
    ],
    essaySlug: "deconstruction-without-reconstruction",
    essayTitle: "What Happens After You Deconstruct Your Faith?",
    bookTitle: "Faith After Deconstruction",
    bookHref: "/faith-after-deconstruction",
  },
  {
    slug: "how-can-god-be-three-and-one",
    question: "How can God be three and one?",
    paragraphs: [
      "God is one in being and three in persons — the oneness and the threeness are not at the same level, so they do not collide. I made the math objection for years and was objecting to a cartoon: a god who was three of the same thing, which no one has ever taught. The church did not flunk arithmetic. It refused to let arithmetic be the measure of God.",
      "The doctrine was forced on the church by its own evidence. The first Christians were Jews, the last people on earth who would invent a doctrine that multiplied God. Then they met a man who forgave sins and accepted worship, and the Spirit came, and he too was God. They could not let go of either truth. In 325 the council at Nicaea drew the line — the Son is of the same being as the Father — because only God can save you. Every analogy — water, clover, sun — fails, and the failure is a clue. There is nothing else like God.",
      "A solitary god could acquire love only by making something to love. The God of the creeds is love all the way down — and salvation is adoption into the family life of God. You are not meant to master the ocean. You are meant to be taken out into it.",
    ],
    essaySlug: "the-trinity-plainly",
    essayTitle: "How Can God Be Three and One?",
    bookTitle: "Why Not What",
    bookHref: "/why-not-what",
  },
  {
    slug: "should-a-christian-follow-a-political-party",
    question: "Should a Christian follow a political party?",
    paragraphs: [
      "Hold your convictions; do not let a party hold your conscience. The question is not whether your politics are right but whether they are yours — reasoned from something prior, or received pre-formed from a tribe whose approval you needed.",
      "Capture is not a partisan event. It is a human one — the standard wiring of every mind, mine included: we judge by intuitions tuned by the group and hire reasons after the fact. The right made the error in public. After 1979 a voter guide functioned as a catechism, and the cross was asked to ratify a politics it was never consulted on. The left tells the same lie in a different accent — and the herd that is certain it is not a herd is the most thoroughly herded of all. The direction differs. The idolatry is identical.",
      "One test does not lie. Name the issue where you disagree with your own side — one that would cost you standing. No daylight anywhere between your conscience and your tribe's platform means you have a membership, not a conscience. Daniel kept a window open toward Jerusalem in defiance of the king's law (Daniel 6:10); he had not outsourced the window. The crowd is going to be wrong. Yours and mine. That is the whole reason the window faces a different city.",
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
      "The Bible treats wealth as a genuine good, a serious danger, and a thing you cannot finally serve alongside God — all three at once. Getting money wrong is almost always grabbing one of those truths and dropping the other two. Jesus spoke about money and possessions more than he spoke about heaven and hell combined.",
      "Scripture never says that wealth is evil. Abraham was rich; Job was rich, lost it, and was given more. The prosperity gospel distorts a real thread, and the guilt-ridden ascetic crashes against the text just as hard — the biblical ideal is neither poverty nor riches but a life of enough, surplus moving outward toward need. The famous verse is misquoted. Paul wrote that \"the love of money is a root of all kinds of evils\" (1 Timothy 6:10) — not the thing, the grip. Jesus went further: \"You cannot serve God and money\" (Matthew 6:24). Not should not. Cannot. Money is a rival god: it promises security, status, freedom — the things only God can finally make good on.",
      "You cannot reason your way out of the love of money. You can only give your way out, one open-handed act at a time, until the fear that drove the clutching has lost its hold. The number was never the point. It was only ever a mirror.",
    ],
    essaySlug: "what-the-bible-says-about-money",
    essayTitle: "What the Bible Actually Says About Money",
    bookTitle: "Where Your Treasure Is",
    bookHref: "/where-your-treasure-is",
  },
  {
    slug: "what-does-the-bible-say-about-anxiety",
    question: "What does the Bible say about anxiety?",
    paragraphs: [
      "Jesus treats anxiety not as a mood to manage but as a belief about the universe that happens to be false. There is a Father. He runs the place. He feeds the birds, and you are worth more than a sparrow. Worry is a quiet declaration that he is not there, or cannot be trusted.",
      "The Sermon on the Mount puts money and worry in the same breath because both grow from one root: where you decided your security comes from. Dallas Willard called anxiety a failure to believe in the goodness and competence of God — a practical atheism that coexists with a Sunday faith — and you do not defeat worry by fighting it; it shrinks when confidence in the Father crowds it out. The cure is order — \"But seek first the kingdom of God and his righteousness, and all these things will be added to you\" (Matthew 6:33) — and address: you take the worry to a Father who already knows what you need (Philippians 4:6–7).",
      "I have checked the numbers in the dark; the next worry found the next number. He does not promise you will be rich. He promises you are seen, and fed, and worth more than the birds. The wall you built to keep out the dark was the thing making the nights so long.",
    ],
    essaySlug: "what-jesus-said-about-worry-and-money",
    essayTitle: "What Jesus Said About Worry and Money",
    bookTitle: "Consider the Birds",
    bookHref: "/consider-the-birds",
  },
  {
    slug: "when-your-teenager-says-they-dont-believe",
    question: "What do I do when my teenager says they don't believe?",
    paragraphs: [
      "Do not argue them back, and do not grieve them gone; both come from love, and both will fail. The sentence is a door, not a verdict. What is being tested is not the case for the resurrection. It is you — whether your love was ever actually unconditional, or only the reward for agreement.",
      "The argument loses even when it wins. Your teenager did not present a thesis; they presented a relational test, and a debate says you would rather be correct than close to them. They are coming of age in a culture where belief is one contested option among many, which is not their personal failing. Much of what gets called deconstruction is a young adult taking apart a secondhand faith to find which parts are load-bearing — sometimes the only way an inherited faith becomes a personal one. The prodigal's father does not meet the returning son with a doctrine exam. He runs (Luke 15:20).",
      "Listen long enough that they finish — most teenagers have never been heard to the end on this by anyone who loves them. Grieve what you must, but do not make the child carry the grief. You cannot argue your child into the kingdom. Keep the table set. Keep the porch light on. The running is not the end of the story.",
    ],
    essaySlug: "teenager-losing-faith",
    essayTitle: "When Your Teenager Says They Don't Believe Anymore",
    bookTitle: "Raising Believers",
    bookHref: "/books/raising-believers",
  },
];
