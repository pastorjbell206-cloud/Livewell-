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
  {
    slug: "is-jesus-the-only-way",
    question: "Is Jesus really the only way to God?",
    paragraphs: [
      "Yes, and the claim you were told was arrogant is closer to Christianity's whole hope. The question rarely arrives as a doctrine. It arrives as a face across the table, someone who buried a grandmother who prayed toward Mecca for sixty years, asking whether your God would send her to hell. For most of my life I was an atheist, and of all the church's claims I found this one not merely improbable but obscene.",
      "The philosopher John Hick pressed the objection well: make God the center, and Christianity, Islam, and the rest are planets in orbit, each catching the same light at a different angle. He loved the parable of the blind men and the elephant, each grasping one part, none the whole. But notice the one thing the parable cannot survive being asked. The man telling it is not blind. He stands above the scene with his eyes open, describing the whole elephant everyone else is too limited to see. Lesslie Newbigin, forty years a missionary in India, named it: pluralism does not refuse the total claim. It makes one and calls the refusal humility. The question is not whether to make an exclusive claim. It is which one is true.",
      "I once thought pluralism was the humble position and exclusivity the arrogant one. It is the reverse. When Peter first said there is \"no other name under heaven given among men by which we must be saved\" (Acts 4:12), he was a fisherman on trial, powerless before the council that killed his teacher. The scandal was never that the claim grabbed power. It was where it put salvation: not in a philosophy or a bloodline but in a person you can only receive. And the verse quoted at that grieving face is tenderness, not menace. \"I am the way, and the truth, and the life. No one comes to the Father except through me\" (John 14:6) was spoken to a terrified friend who asked how to find God. Refuse him if you must. But not for being arrogant. Refuse him for being too particular.",
    ],
    essaySlug: "is-jesus-really-the-only-way",
    essayTitle: "Is Jesus Really the Only Way?",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
  {
    slug: "does-god-actually-exist",
    question: "Does God actually exist?",
    paragraphs: [
      "God exists, and I say that as a man who spent most of his life certain no one was there. Not because someone won an argument. No proof marches a living person across that line, and anyone selling one has never watched it work. What I found was smaller and harder to escape: the atheism I held could be stated but not inhabited, and it kept running up debts it refused to pay.",
      "Grant the other side its strongest hand first. Schellenberg built a rigorous case out of the silence alone, that a perfectly loving God would not leave the honest seeker to find only absence, and the silence is real. Do not pretend it is weak. Then watch what my account had to spend. Leibniz's question does not retire: why is there something rather than nothing. The fine-tuning of the physical constants sits so narrow that to dodge a set-up cosmos the naturalist posits an infinity of universes he can never observe, faith in a lab coat. And C. S. Lewis pressed where it cost most: without God, my sense that a tortured child is really wrong, wrong if every person on earth applauded it, is only chemistry in a primate brain. I could say that sentence. I could not live it.",
      "None of this is a proof. Blaise Pascal saw that God gives enough light for those who desire to see and enough darkness for those who do not, evidence calibrated for a heart that is looking. Paul told Rome that God's \"invisible attributes, namely, his eternal power and divine nature, have been clearly perceived, ever since the creation of the world, in the things that have been made. So they are without excuse\" (Romans 1:20). The problem was never mainly the evidence. I had grown practiced at not seeing what I did not want to owe. The unbelief was not too rational to keep. It was too expensive, and I had been paying all along.",
    ],
    essaySlug: "does-god-actually-exist",
    essayTitle: "Does God Actually Exist?",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
  {
    slug: "what-about-those-who-never-heard",
    question: "What about those who never heard of Jesus?",
    paragraphs: [
      "I do not know, and the people who told you they knew, in either direction, told you something the text withholds. The question that undoes people is not whether God exists. It is whether he is fair to the man who died on a mountainside a thousand years before a missionary crossed the water, who never heard the name of Jesus, not once. It is the soft place in the exclusive claim, the one that makes settled believers change the subject.",
      "Give the hard answer its full due first. Paul writes, \"How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching?\" (Romans 10:14). That chain is the engine of every missionary who ever left home. But hold it against Romans 2:14-15, where the work of the law is \"written on their hearts\" in people who never received it, and against Peter in a Roman soldier's house: \"God shows no partiality\" (Acts 10:34-35). The church has held more than one faithful answer. The restrictivist waits for explicit faith and trusts God's justice past his sight; the inclusivist, loving Scripture no less, holds that the cross is still the only ground, applied perhaps to a man who never heard the name the way it was applied to Abraham and Moses. It is genuinely open ground, not first-order. We keep trying to settle the mechanism when we were never given the list. We were given the Judge, before whom Abraham stood and pressed: \"Shall not the Judge of all the earth do what is just?\" (Genesis 18:25).",
      "None of this loosens the church's feet from the road. If I do not know the unreached are safe, and I do not, then their reaching is not optional and my comfort is not the point. The uncertainty cuts toward the mission, not away from it. I wanted the roster for years so I could stop feeling the ache; he handed over his character instead. The Judge did not stay behind the glass. He crossed every distance himself and went to a cross rather than spare himself, in public, where anyone could watch. Whatever he does with the ones who never heard, he will not do it from a distance, and he will not do it unjustly. That accusation died with him and got up without him. It is meant to send you back to the road.",
    ],
    essaySlug: "what-about-those-who-never-heard",
    essayTitle: "What About Those Who Never Heard?",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
  {
    slug: "can-you-be-good-without-god",
    question: "Can you be good without God?",
    paragraphs: [
      "You can be good without God, and pretending otherwise is the lie that discredits every true thing standing near it. Atheists are not, as a class, worse neighbors or parents or citizens than the people filling pews; in fifteen years of pastoring I have buried men who never darkened a church door and were kinder than deacons I could name. The claim was never that unbelievers cannot behave well. The real question is quieter. Not whether an atheist can be good, but what makes the word good point at anything real when he says it.",
      "The skeptic has an old reply, and a good one. Plato set it down twenty-four centuries ago in the Euthyphro: is a thing good because God commands it, or does God command it because it is good. If the first, goodness is arbitrary; if the second, it stands above God and you have found it without him. Both doors open onto a cliff. But the dilemma hides a third. Goodness is neither above God nor invented by God. It is what God is. The tradition from Aquinas to Robert Adams locates the good not in a command that could have gone either way but in God's own unchanging character, of which his commands are the expression. Objective, because it answers to no one's opinion. Not arbitrary, because it hangs on no will that might have chosen otherwise. When you call the torture of a child wrong, you mean a fact about the act, not weather in your skull.",
      "I could not keep my footing there. I said morality was evolved and useful and felt, and then I lived every waking hour as if some things were just wrong, wrong the way stone is hard. Paul writes that the Gentiles who never had the law still \"show that the work of the law is written on their hearts, while their conscience also bears witness\" (Romans 2:15, ESV). You already live as if the answer were yes, as if some things are simply, permanently wrong. I did too, on a floor I swore was not under me. The floor held anyway. It is worth asking who laid it.",
    ],
    essaySlug: "can-you-be-good-without-god",
    essayTitle: "Can You Be Good Without God?",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
  {
    slug: "is-faith-irrational",
    question: "Is believing anything on faith irrational?",
    paragraphs: [
      "No, though a good deal of what gets called faith is exactly the credulous thing the charge names, and I will not defend it. The church has too often praised not-thinking as a virtue and used \"just have faith\" as a lid on a pot it did not want boiling. But the framing of faith against reason is a caricature, and it collapses the moment you examine either side. Biblical faith is reaching for reasons the whole time. Reason is running on trust the whole time.",
      "Take Clifford at his word. In 1877 he ruled it \"wrong always, everywhere, and for anyone, to believe anything upon insufficient evidence,\" so try to believe only what your evidence forces. You will not last a morning. You trust your own reason without being able to certify it without using it. You trust that other minds exist, that the future will resemble the past, and Hume saw the size of that one in 1748 and could not argue his way out. Michael Polanyi called it tacit knowing, the floor beneath the floor: no knowledge without a knower who is committed. And the word itself was never a leap into the dark. Pistis meant trust with a track record. \"Now faith is the assurance of things hoped for, the conviction of things not seen\" (Hebrews 11:1). Things unseen, not things disbelieved.",
      "I say this against myself, because for years I accused believers of the exact posture I was standing in. I called my position pure reason. It was a structure of enormous trust I had simply never counted, invisible the way water is invisible to the fish. Everyone is betting on something they cannot stand outside of and prove. The honest prayer was never the resolved one. It was a desperate father with a dying child: \"I believe; help my unbelief!\" (Mark 9:24). Some of us have just stopped pretending we are not already doing it.",
    ],
    essaySlug: "is-faith-irrational",
    essayTitle: "Is Believing Anything on Faith Irrational?",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
  {
    slug: "are-miracles-believable",
    question: "Are miracles believable?",
    paragraphs: [
      "A rational person can believe in them. Miracles are rare by definition; if they were common they would not be miracles, because the word names the exception, not the schedule. Christianity is not the claim that tombs are unreliable. It is the claim that on one particular morning, one particular tomb was. What cannot be done is to rule the possibility out before the evidence arrives, by the shape of a definition.",
      "The strongest case against them is David Hume's, set out in \"Of Miracles\" in 1748; most people stand inside his conclusion without having heard his name. A miracle, he wrote, is \"a violation of the laws of nature,\" and no testimony can establish one \"unless the testimony be of such a kind, that its falsehood would be more miraculous than the fact which it endeavours to establish.\" It reads like arithmetic. But the uniform experience of mankind can only count against every miracle if you assume in advance that every reported miracle is false, the one under discussion included. John Earman, no apologist, called this circular in Hume's Abject Failure (Oxford, 2000): applied evenly, the rule would have forbidden belief in a black swan or a meteorite, in any novel event that enlarged the world by breaking the pattern. The real question was never frequency. It is authorship. If God is so much as possible, a miracle is not a crack in the machine but the author writing in the margin, and it cannot be ruled out a priori.",
      "I did not lose that argument to a better argument. I lost it to the discovery that I had never had one. What I owned was the feeling of finality, and the feeling came from the definition, and the definition was the very thing I was supposed to be proving. Paul staked everything on the resurrection being fact and not feeling: \"And if Christ has not been raised, then our preaching is in vain and your faith is in vain\" (1 Corinthians 15:14, ESV). He did not ask to be believed blindly. He asked to be weighed. Notice whether your certainty that miracles cannot happen is a conclusion you reasoned to, or a definition you started with. If it is the second, you have not put the resurrection on the scale. You have only refused, in advance, to look.",
    ],
    essaySlug: "are-miracles-believable",
    essayTitle: "Are Miracles Believable?",
    bookTitle: "The Scandal of the Cross",
    bookHref: "/the-scandal-of-the-cross",
  },
  {
    slug: "did-god-command-genocide",
    question: "Did God command genocide in the Old Testament?",
    paragraphs: [
      "On the page, God commands it, and a person who reads those verses and feels sick is reading them correctly. I will not hand you a comfort I could not accept myself. \"You shall save alive nothing that breathes\" (Deuteronomy 20:16). To Saul, of the Amalekites: \"Do not spare them, but kill both man and woman, child and infant, ox and sheep, camel and donkey\" (1 Samuel 15:3). Child and infant. Richard Dawkins called this God a \"bloodthirsty ethnic cleanser\" in The God Delusion (2006), and the line drew blood because he was quoting, not distorting. For years this was my strongest reason to reject the Bible, read aloud to win a room.",
      "The scholars who live inside the ancient world kept pointing at something I had dismissed. K. Lawson Younger's Ancient Conquest Accounts (1990) laid the biblical narratives beside the war annals of Egypt and Assyria and found the same stock formula: total annihilation was the conventional idiom of victory, not a literal census. Kenneth Kitchen, no friend of softening Scripture, said the same in On the Reliability of the Old Testament (2003). And the Bible refuses to let the totality stand: the peoples reported as wiped out in Joshua are Israel's neighbors and in-laws two chapters later. The war is framed as judgment on named evil, not race, with Israel warned it stands under the identical standard: \"Not because of your righteousness ... but because of the wickedness of these nations the LORD your God is driving them out from before you\" (Deuteronomy 9:5). It is sealed to one people, one land, one window, never a template. Then Jesus takes the sword off the table with his own hands: \"Put your sword back into its place\" (Matthew 26:52).",
      "Put it all together, the genre I misread, the judgment on real evil, the seal that shuts the conquest forever, and a weight still remains. The hyperbole eases the scale and does not empty the battlefield. I do not have the specific child who chose none of it, and I will not decorate that grief. What changed was not that the texts stopped being hard. Three of my certainties turned out softer than I had sworn, and a man who finds three certainties soft is obligated to wonder about the fourth. If you leave still troubled, we are troubled together. That is the honest place to be.",
    ],
    essaySlug: "did-god-command-genocide",
    essayTitle: "Did God Command Genocide?",
    bookTitle: "The Reliability of Scripture",
    bookHref: "/books/the-reliability-of-scripture",
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
    bookTitle: "The Reliability of Scripture",
    bookHref: "/books/the-reliability-of-scripture",
  },
  {
    slug: "is-faith-just-wishful-thinking",
    question: "Is faith just wishful thinking?",
    paragraphs: [
      "Sometimes, yes. Religion can be a crutch, and it constantly is for people who make it one. Much of what gets called faith is projection, a god assembled out of a person's fears and preferences, warm where they want warmth and silent where they want silence. The church has sold that god by the millions. If your argument is that some faith is wish-fulfillment, you are not wrong. You are describing my inbox.",
      "Feuerbach (1841) and Freud (1927) gave the suspicion its spine: God is the best of human nature projected onto the sky, the exalted cosmic father the frightened child never stopped wanting. Grant it. But the argument slides from how a belief arose to whether it is true, and that is the genetic fallacy. A frightened man believes the shore is close because he needs it to be, and the shore may also be close. His fear does not move the coastline. The tool cuts both ways. Nagel, no friend of religion, wrote, \"I don't want there to be a God. I don't want the universe to be like that.\" The wanting is on both sides of the table. The God of Scripture is the last god a frightened person would order: holy, demanding, crucified. A wish-god does not bleed.",
      "I ran the projection test on everyone but myself. For years I told myself I had followed the evidence into the cold. But underneath, where I did not look, was a boy raised without a father who found in a Godless universe not a grief but a relief, because a sky with no Father in it could not disappoint him the way one man already had. I wanted there to be no God. Ask the believer what they want to be true, and you will find plenty of faith that is a wish with a steeple. Then have the nerve to ask it of yourself. The crutch was real. It was just in my other hand.",
    ],
    essaySlug: "is-faith-just-wishful-thinking",
    essayTitle: "Is Faith Just Wishful Thinking?",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
  {
    slug: "what-did-the-new-atheists-get-right",
    question: "What did the New Atheists get right?",
    paragraphs: [
      "They got a great deal right, and a believer who cannot say so has understood neither the men nor the faith he imagines he is defending. I owned the books. I read Dawkins and Hitchens and Harris and Dennett the way a soldier reads dispatches from a front where his side is advancing, and I would have followed all four Horsemen off a cliff. They were not knocking over straw. They were reading a public record, and it is soaked.",
      "Concede the ground, because it is real. Religion has blood on it: the church blessed conquest as mission, lit the fires under dissenters with Scripture, moved men who abused children from parish to parish. It answered honest questions with slogans and taught its children the faith cannot bear examination. But turn the argument over. The worst of religion gets cast as its essence while the worst of the godless twentieth century gets cast as an aberration, and the record will not sit still for that. Under all four sits the genetic fallacy: you have not shown a belief false by naming where it came from. And Dawkins made the cleanest category mistake, treating God as a hypothesis inside the universe when the creeds offer him as the reason there is a universe at all.",
      "Jesus said harder things about religion than Hitchens managed. \"Woe to you, scribes and Pharisees, hypocrites!\" (Matthew 23:27, ESV). The indictment the four thought they were leveling from outside had been sitting inside the book, in red letters, the whole time. They were right about the church I was leaving. They were wrong about the God I had never met. I cheered because I thought the machine was the whole of it, and no one had shown me the man that machine crucified for naming the poison. \"Thus you will recognize them by their fruits\" (Matthew 7:20, ESV). Apply it to the church and it draws blood. Apply it to the century that promised to do better once God was gone and it draws blood too. Neither of us walks away clean.",
    ],
    essaySlug: "what-new-atheists-got-right",
    essayTitle: "What the New Atheists Got Right",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
  {
    slug: "can-life-mean-anything-without-god",
    question: "Can a life mean anything without God?",
    paragraphs: [
      "Yes, and any Christian who says otherwise is protecting his comfort by slandering better men. I was an atheist. I built real meaning out of love and craft and loyalty, and so have people I knew who loved their spouses with a fidelity that shamed my elders and faced a terminal diagnosis with a steadiness I would want at my own bedside. The church invented a miserable nihilist to feel better. He does not exist. That was never the real question.",
      "The seam is not whether you can make meaning but what kind. Camus opened by calling suicide the one serious philosophical problem and still refused the ledge, choosing revolt inside the absurd until \"One must imagine Sisyphus happy.\" Sartre said existence precedes essence, \"condemned to be free\" to author our own worth. Take both at full strength. Then watch Tolstoy, who had won by every measure Sartre would prescribe, hide a rope from himself in his own study because none of it answered the death waiting for all of it. What you invent, you can un-invent. Ecclesiastes got there first: \"Vanity of vanities, says the Preacher, vanity of vanities! All is vanity\" (Ecclesiastes 1:2). And both men kept borrowing a floor their systems could not mill, calling injustice a crime for everyone when a silent universe stocks no such thing.",
      "So the question was never whether you can make meaning. It is whether what you made is holding you up, or you are holding it. Invented meaning has one fatal property. On the night you can no longer believe in it, it is gone, because it was only ever your believing. I made my own for years, and it was good, right up until it was not, on a night when I was the thing that had broken and there was no one on the shore because I had spent my life proving the shore was empty. Wait for the good day, the dark kitchen, the glass of water. Then notice which one of you gets tired first.",
    ],
    essaySlug: "meaning-without-god",
    essayTitle: "Can a Life Mean Anything Without God?",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
  {
    slug: "christianity-and-islam-differences",
    question: "What do Christianity and Islam actually dispute?",
    paragraphs: [
      "They are neither the same faith nor strangers, and both slogans dodge the conversation. When I was an atheist, lumping every religion together kept all of them at arm's length. The honest look is harder. Both confess one God, not many. Islam honors Jesus, Isa, as a prophet and messiah, born of the virgin Mary. This is a family argument, the bitterest kind, because it runs through what both sides hold most holy.",
      "At the center of Islam is tawhid, the absolute oneness of God, and its gravest sin, shirk, is associating anything created with the Creator. From inside that, the Trinity does not enrich God's oneness; it assaults it, and calling God Father and Son sounds close to blasphemy, not because a Muslim thinks little of Jesus but because he thinks so highly of God. A God that great would not be surrendered to a mob and executed. Islam honors Jesus as the greatest prophet; Christianity worships him and lets Thomas say \"My Lord and my God!\" (John 20:28). One faith says the cross was an execution God prevented; the other stakes everything on its having happened. One says a person climbs toward mercy; the other says God came down.",
      "These are not misunderstandings a patient afternoon could clear. They are the load-bearing walls of two different houses, and no one inside either is a fool. I hold the Christian confession as confession, not as a point scored against a neighbor I respect: the one God, without ceasing to be one, entered his own creation as a man, was handed over to be killed, and was not defeated by it. I could be wrong, and if I am, I have built my life on a rumor. But I cannot make it smaller to keep peace at the table, and neither can the devout Muslim across from me. The honesty we owe each other is to name what stands on each side, and refuse to lie about its width.",
    ],
    essaySlug: "christianity-and-islam",
    essayTitle: "What Christianity and Islam Actually Dispute",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
];
