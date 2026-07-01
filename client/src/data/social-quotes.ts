/**
 * Social-media pull quotes from the LiveWell article library.
 * 3 quotes per article, 60 articles = 180 total.
 *
 * Categories:
 *   conviction — hard truths that challenge
 *   comfort   — pastoral care for the hurting
 *   challenge — calls to action or change
 *   history   — historical facts that surprise
 *   wisdom    — timeless insight
 */

export interface SocialQuote {
  text: string;
  articleSlug: string;
  articleTitle: string;
  pillar: string;
  category: "conviction" | "comfort" | "challenge" | "history" | "wisdom";
}

export const SOCIAL_QUOTES: SocialQuote[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. How to Read the Bible Without Making It Say What You Want
  // ─────────────────────────────────────────────────────────────
  {
    text: "There is no such reader. The mind that imagines it can approach the text scrubbed clean of every inheritance does not exist. There never was.",
    articleSlug: "how-to-read-the-bible-without-making-it-say-what-you-want",
    articleTitle: "How to Read the Bible Without Making It Say What You Want",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "A book you can interpret into anything is a book that can no longer command you.",
    articleSlug: "how-to-read-the-bible-without-making-it-say-what-you-want",
    articleTitle: "How to Read the Bible Without Making It Say What You Want",
    pillar: "Theological Depth",
    category: "wisdom",
  },
  {
    text: "Read like a person who expects to be told something true and unwelcome. It is the only way anyone has ever heard from God.",
    articleSlug: "how-to-read-the-bible-without-making-it-say-what-you-want",
    articleTitle: "How to Read the Bible Without Making It Say What You Want",
    pillar: "Theological Depth",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 2. What the Gospel Actually Is
  // ─────────────────────────────────────────────────────────────
  {
    text: "A man stops you on the street and tells you the war is over. He does not tell you to end the war. He does not give you seven steps for ending wars. He tells you a thing that happened.",
    articleSlug: "what-the-gospel-actually-is",
    articleTitle: "What the Gospel Actually Is",
    pillar: "Theological Depth",
    category: "wisdom",
  },
  {
    text: "Advice assumes the war can still be won by the listener. The whole problem is that it cannot.",
    articleSlug: "what-the-gospel-actually-is",
    articleTitle: "What the Gospel Actually Is",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "Grace is not the absence of demand. It is the most total demand there is, because it claims everything and gives everything, and there is nothing left over that is still yours to control.",
    articleSlug: "what-the-gospel-actually-is",
    articleTitle: "What the Gospel Actually Is",
    pillar: "Theological Depth",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 3. The Trinity Is Not Optional
  // ─────────────────────────────────────────────────────────────
  {
    text: "Before there was a universe to love, there was love. The Father loved the Son. The love did not begin when creatures arrived to receive it.",
    articleSlug: "the-trinity-is-not-optional",
    articleTitle: "The Trinity Is Not Optional",
    pillar: "Theological Depth",
    category: "wisdom",
  },
  {
    text: "The lonely autonomous self is not the height of freedom. It is a small imitation of the lonely god who does not exist.",
    articleSlug: "the-trinity-is-not-optional",
    articleTitle: "The Trinity Is Not Optional",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "The child's question was the right question, and changing the subject was the failure.",
    articleSlug: "the-trinity-is-not-optional",
    articleTitle: "The Trinity Is Not Optional",
    pillar: "Theological Depth",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 4. Inerrancy, Infallibility, and the Word You Can Trust
  // ─────────────────────────────────────────────────────────────
  {
    text: "You can hold a flawless Bible in a closed fist and never once be changed by it.",
    articleSlug: "inerrancy-infallibility-and-the-word-you-can-trust",
    articleTitle: "Inerrancy, Infallibility, and the Word You Can Trust",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "The word that is actually trustworthy is the one you cannot finally master, the one that reads you while you are reading it.",
    articleSlug: "inerrancy-infallibility-and-the-word-you-can-trust",
    articleTitle: "Inerrancy, Infallibility, and the Word You Can Trust",
    pillar: "Theological Depth",
    category: "wisdom",
  },
  {
    text: "Every argument about biblical inerrancy that I have ever watched turn bitter was not, underneath, an argument about the Bible. It was an argument about fear.",
    articleSlug: "inerrancy-infallibility-and-the-word-you-can-trust",
    articleTitle: "Inerrancy, Infallibility, and the Word You Can Trust",
    pillar: "Theological Depth",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 5. Grace Is Not a Feeling
  // ─────────────────────────────────────────────────────────────
  {
    text: "We have made grace into a mood. A soft light, a warm acceptance, a general sense that everything is fine. And we have called that the heart of Christianity, when it is closer to its anesthetic.",
    articleSlug: "grace-is-not-a-feeling",
    articleTitle: "Grace Is Not a Feeling",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "The grace that asks nothing of you is not kinder than the grace that asks everything. It is crueler, because it leaves you precisely where it found you.",
    articleSlug: "grace-is-not-a-feeling",
    articleTitle: "Grace Is Not a Feeling",
    pillar: "Theological Depth",
    category: "wisdom",
  },
  {
    text: "Grace is a father on a road in front of a village, his robe in his hands and his dignity on the ground, reaching a son who deserved none of it.",
    articleSlug: "grace-is-not-a-feeling",
    articleTitle: "Grace Is Not a Feeling",
    pillar: "Theological Depth",
    category: "comfort",
  },

  // ─────────────────────────────────────────────────────────────
  // 6. The Council of Nicaea: What Was Actually Decided in 325
  // ─────────────────────────────────────────────────────────────
  {
    text: "You do not need a council to command you to worship someone you are already willing to be executed for refusing to deny.",
    articleSlug: "the-council-of-nicaea-what-was-decided-in-325",
    articleTitle: "The Council of Nicaea: What Was Actually Decided in 325",
    pillar: "Theological Depth",
    category: "history",
  },
  {
    text: "A Christ who is merely the highest creature is a Christ who cannot save, and a Christianity built on him is a religion of admiring a fine example.",
    articleSlug: "the-council-of-nicaea-what-was-decided-in-325",
    articleTitle: "The Council of Nicaea: What Was Actually Decided in 325",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "The novel got the drama right and the facts wrong. The truth was less of a conspiracy and more of a confession, signed by men who had already proven what their confession was worth.",
    articleSlug: "the-council-of-nicaea-what-was-decided-in-325",
    articleTitle: "The Council of Nicaea: What Was Actually Decided in 325",
    pillar: "Theological Depth",
    category: "history",
  },

  // ─────────────────────────────────────────────────────────────
  // 7. How the Reformation Started and Why It Still Matters
  // ─────────────────────────────────────────────────────────────
  {
    text: "People do not burn at the stake over administrative corruption. They burn over a question.",
    articleSlug: "how-the-reformation-started-and-why-it-still-matters",
    articleTitle: "How the Reformation Started and Why It Still Matters",
    pillar: "Theological Depth",
    category: "history",
  },
  {
    text: "The performance treadmill is works-righteousness with God deleted, all of the judgment and none of the grace.",
    articleSlug: "how-the-reformation-started-and-why-it-still-matters",
    articleTitle: "How the Reformation Started and Why It Still Matters",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "He was not mainly being brave. He was being free, free the way only a man can be who has stopped trying to earn what he has finally learned is given.",
    articleSlug: "how-the-reformation-started-and-why-it-still-matters",
    articleTitle: "How the Reformation Started and Why It Still Matters",
    pillar: "Theological Depth",
    category: "comfort",
  },

  // ─────────────────────────────────────────────────────────────
  // 8. The Great Awakenings and the Making of American Faith
  // ─────────────────────────────────────────────────────────────
  {
    text: "Heat is not light. A strong feeling is not the Holy Spirit.",
    articleSlug: "the-great-awakenings-and-the-making-of-american-faith",
    articleTitle: "The Great Awakenings and the Making of American Faith",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "The awakening that freed the believer from dead formalism also cut him loose from the one community that could ever test whether his feeling was the Spirit or only himself.",
    articleSlug: "the-great-awakenings-and-the-making-of-american-faith",
    articleTitle: "The Great Awakenings and the Making of American Faith",
    pillar: "Theological Depth",
    category: "history",
  },
  {
    text: "The test of a genuine work of God is not the intensity of the emotion. It is the fruit, a changed life that remains after the meeting ends.",
    articleSlug: "the-great-awakenings-and-the-making-of-american-faith",
    articleTitle: "The Great Awakenings and the Making of American Faith",
    pillar: "Theological Depth",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 9. Why There Are So Many Christian Denominations
  // ─────────────────────────────────────────────────────────────
  {
    text: "The remarkable thing is not that Christians have disagreed. The remarkable thing is that, across two thousand years and every culture on earth, they have kept the same center.",
    articleSlug: "why-there-are-so-many-christian-denominations",
    articleTitle: "Why There Are So Many Christian Denominations",
    pillar: "Theological Depth",
    category: "wisdom",
  },
  {
    text: "A divided church is a scandal, and the answer is neither to deny it nor to despair of it.",
    articleSlug: "why-there-are-so-many-christian-denominations",
    articleTitle: "Why There Are So Many Christian Denominations",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "Pretending the disagreements do not matter is not unity. It is indifference, and indifference is not what Jesus prayed for.",
    articleSlug: "why-there-are-so-many-christian-denominations",
    articleTitle: "Why There Are So Many Christian Denominations",
    pillar: "Theological Depth",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 10. The Crusades: What Actually Happened
  // ─────────────────────────────────────────────────────────────
  {
    text: "A Christianity that cannot tell the truth about its own worst chapters has no business asking anyone to trust it about anything.",
    articleSlug: "the-crusades-what-actually-happened",
    articleTitle: "The Crusades: What Actually Happened",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "The kingdom of God has never once advanced by killing for him. It has only ever advanced by people willing to die for him.",
    articleSlug: "the-crusades-what-actually-happened",
    articleTitle: "The Crusades: What Actually Happened",
    pillar: "Theological Depth",
    category: "challenge",
  },
  {
    text: "The most devastating critique of the Crusades is not the atheist's. It is the Christian one.",
    articleSlug: "the-crusades-what-actually-happened",
    articleTitle: "The Crusades: What Actually Happened",
    pillar: "Theological Depth",
    category: "history",
  },

  // ─────────────────────────────────────────────────────────────
  // 11. What Is the Kingdom of God
  // ─────────────────────────────────────────────────────────────
  {
    text: "The kingdom of God is not first a where. It is a happening. It is God stepping into the world to be king of it again.",
    articleSlug: "what-is-the-kingdom-of-god-and-why-it-changes-everything",
    articleTitle: "What Is the Kingdom of God",
    pillar: "Theological Depth",
    category: "wisdom",
  },
  {
    text: "A kingdom that changes nothing visible is not a kingdom. It is a mood.",
    articleSlug: "what-is-the-kingdom-of-god-and-why-it-changes-everything",
    articleTitle: "What Is the Kingdom of God",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "The kingdom did come. It came like a seed, not like an army.",
    articleSlug: "what-is-the-kingdom-of-god-and-why-it-changes-everything",
    articleTitle: "What Is the Kingdom of God",
    pillar: "Theological Depth",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 12. Exodus: The Story Underneath the Whole Bible
  // ─────────────────────────────────────────────────────────────
  {
    text: "Israel did not begin its national memory with a creed. It began with a rescue.",
    articleSlug: "exodus-the-story-underneath-the-whole-bible",
    articleTitle: "Exodus: The Story Underneath the Whole Bible",
    pillar: "Theological Depth",
    category: "wisdom",
  },
  {
    text: "Before God gives a single command, he names himself by what he did. He is the God who got his people out.",
    articleSlug: "exodus-the-story-underneath-the-whole-bible",
    articleTitle: "Exodus: The Story Underneath the Whole Bible",
    pillar: "Theological Depth",
    category: "comfort",
  },
  {
    text: "The God of the Exodus does not give instructions to slaves. He frees them first and then speaks.",
    articleSlug: "exodus-the-story-underneath-the-whole-bible",
    articleTitle: "Exodus: The Story Underneath the Whole Bible",
    pillar: "Theological Depth",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 13. Why the Bible Is One Story, Not Sixty-Six Books
  // ─────────────────────────────────────────────────────────────
  {
    text: "Open most Bibles and the table of contents tells you it is a collection. It looks like a shelf, not a story. The question is whether the unity is really there.",
    articleSlug: "why-the-bible-is-one-story-not-66-books",
    articleTitle: "Why the Bible Is One Story, Not Sixty-Six Books",
    pillar: "Theological Depth",
    category: "challenge",
  },
  {
    text: "The Bible is not a reference book you consult for answers. It is a story you are already inside of, and you cannot step outside it to judge it, because it is judging you.",
    articleSlug: "why-the-bible-is-one-story-not-66-books",
    articleTitle: "Why the Bible Is One Story, Not Sixty-Six Books",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "The same story that began in a garden ends in a city, and the door that was shut by a cherub's sword is opened by a lamb's blood.",
    articleSlug: "why-the-bible-is-one-story-not-66-books",
    articleTitle: "Why the Bible Is One Story, Not Sixty-Six Books",
    pillar: "Theological Depth",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 14. What It Means to Bear the Image of God
  // ─────────────────────────────────────────────────────────────
  {
    text: "The first thing the Bible says about a human being is the most radical thing ever said about one.",
    articleSlug: "what-it-means-to-bear-the-image-of-god",
    articleTitle: "What It Means to Bear the Image of God",
    pillar: "Theological Depth",
    category: "wisdom",
  },
  {
    text: "Every claim your civilization makes about human worth rests on a foundation most people who depend on it have no idea is there.",
    articleSlug: "what-it-means-to-bear-the-image-of-god",
    articleTitle: "What It Means to Bear the Image of God",
    pillar: "Theological Depth",
    category: "conviction",
  },
  {
    text: "You do not earn the image of God. You bear it. The murderer bears it on the way to the chair. The infant bears it before she draws her first breath.",
    articleSlug: "what-it-means-to-bear-the-image-of-god",
    articleTitle: "What It Means to Bear the Image of God",
    pillar: "Theological Depth",
    category: "comfort",
  },

  // ─────────────────────────────────────────────────────────────
  // 15. Already and Not Yet: Living Between Two Worlds
  // ─────────────────────────────────────────────────────────────
  {
    text: "The promises sound total. Then you wake up the next morning and you are still anxious, still fighting the same old habit, still standing at gravesides.",
    articleSlug: "already-and-not-yet-living-between-two-worlds",
    articleTitle: "Already and Not Yet: Living Between Two Worlds",
    pillar: "Theological Depth",
    category: "comfort",
  },
  {
    text: "Either the promises are exaggerated, or you are failing to claim them. Most of us oscillate between those two conclusions. There is a third possibility.",
    articleSlug: "already-and-not-yet-living-between-two-worlds",
    articleTitle: "Already and Not Yet: Living Between Two Worlds",
    pillar: "Theological Depth",
    category: "wisdom",
  },
  {
    text: "We live in the overlap, where the decisive battle is won and the war is not over. That is not a flaw in the system. It is the shape of grace stretched out in time.",
    articleSlug: "already-and-not-yet-living-between-two-worlds",
    articleTitle: "Already and Not Yet: Living Between Two Worlds",
    pillar: "Theological Depth",
    category: "comfort",
  },

  // ─────────────────────────────────────────────────────────────
  // 16. What Christian Nationalism Is and What It Is Not
  // ─────────────────────────────────────────────────────────────
  {
    text: "You can love your country the way you love your family. You cannot love it the way you love your God. The first is commanded. The second is idolatry.",
    articleSlug: "what-christian-nationalism-is-and-is-not",
    articleTitle: "What Christian Nationalism Is and What It Is Not",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },
  {
    text: "The cross does not need a flag behind it. The moment you place one there, you have decided which one is the backdrop and which one is the point.",
    articleSlug: "what-christian-nationalism-is-and-is-not",
    articleTitle: "What Christian Nationalism Is and What It Is Not",
    pillar: "Prophetic Disruption",
    category: "challenge",
  },
  {
    text: "Patriotism says this is my country and I owe it my service. Nationalism says this is God's country and he owes it his blessing. The distance between the two is everything.",
    articleSlug: "what-christian-nationalism-is-and-is-not",
    articleTitle: "What Christian Nationalism Is and What It Is Not",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 17. The Difference Between Loving and Worshiping Your Country
  // ─────────────────────────────────────────────────────────────
  {
    text: "We put our hands over our hearts in two settings. One is in front of the flag. The other is when we pray. A child notices the rhyme that an adult has stopped hearing.",
    articleSlug: "loving-versus-worshiping-your-country",
    articleTitle: "The Difference Between Loving and Worshiping Your Country",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },
  {
    text: "The question was never whether you may love your country. It is how much, before love becomes worship.",
    articleSlug: "loving-versus-worshiping-your-country",
    articleTitle: "The Difference Between Loving and Worshiping Your Country",
    pillar: "Prophetic Disruption",
    category: "challenge",
  },
  {
    text: "Love wants the beloved to be good. Worship insists the beloved already is. That is the line, and a nation cannot bear to have it crossed.",
    articleSlug: "loving-versus-worshiping-your-country",
    articleTitle: "The Difference Between Loving and Worshiping Your Country",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 18. Flags in the Sanctuary
  // ─────────────────────────────────────────────────────────────
  {
    text: "Nobody chose the flag in the sanctuary. It arrived the way air conditioning arrived, and it has been guarding the Word with a quiet authority no business meeting ever granted it.",
    articleSlug: "flags-in-the-sanctuary",
    articleTitle: "Flags in the Sanctuary: A Theology of the Nation",
    pillar: "Prophetic Disruption",
    category: "history",
  },
  {
    text: "The question is not whether the flag is allowed. The question is what it says about whose house this is.",
    articleSlug: "flags-in-the-sanctuary",
    articleTitle: "Flags in the Sanctuary: A Theology of the Nation",
    pillar: "Prophetic Disruption",
    category: "challenge",
  },
  {
    text: "A sanctuary that cannot tell the difference between honoring the nation and worshiping it has lost the ability to prophesy against it.",
    articleSlug: "flags-in-the-sanctuary",
    articleTitle: "Flags in the Sanctuary: A Theology of the Nation",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },

  // ─────────────────────────────────────────────────────────────
  // 19. Whose Kingdom? Jesus and Political Power
  // ─────────────────────────────────────────────────────────────
  {
    text: "Before Jesus preached a sermon or healed a single body, he was taken to a high place and shown every kingdom of the world. He refused. The refusal is the founding decision of his entire ministry.",
    articleSlug: "whose-kingdom-jesus-and-political-power",
    articleTitle: "Whose Kingdom? Jesus and Political Power",
    pillar: "Prophetic Disruption",
    category: "challenge",
  },
  {
    text: "He would not take the kingdoms of the world on the terms by which the kingdoms of the world are taken.",
    articleSlug: "whose-kingdom-jesus-and-political-power",
    articleTitle: "Whose Kingdom? Jesus and Political Power",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },
  {
    text: "The crowd wanted a Messiah who would do to Rome what Rome did to its enemies. They got a king who absorbed the violence rather than dealing it.",
    articleSlug: "whose-kingdom-jesus-and-political-power",
    articleTitle: "Whose Kingdom? Jesus and Political Power",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },

  // ─────────────────────────────────────────────────────────────
  // 20. How the Religious Right Was Built
  // ─────────────────────────────────────────────────────────────
  {
    text: "The movement he took for the air itself was younger than my parents. It was built, on purpose, by people whose names we know, in years we can count.",
    articleSlug: "how-the-religious-right-was-built",
    articleTitle: "How the Religious Right Was Built",
    pillar: "Prophetic Disruption",
    category: "history",
  },
  {
    text: "The thing that feels eternal was assembled inside living memory.",
    articleSlug: "how-the-religious-right-was-built",
    articleTitle: "How the Religious Right Was Built",
    pillar: "Prophetic Disruption",
    category: "history",
  },
  {
    text: "A young pastor assumed the religious right had always existed. He could not imagine a time when faithfulness did not come with a voter guide attached.",
    articleSlug: "how-the-religious-right-was-built",
    articleTitle: "How the Religious Right Was Built",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },

  // ─────────────────────────────────────────────────────────────
  // 21. What Render Unto Caesar Actually Means
  // ─────────────────────────────────────────────────────────────
  {
    text: "They brought him a coin because they wanted him dead. That is the first thing we lose when we quote the line.",
    articleSlug: "what-render-unto-caesar-actually-means",
    articleTitle: "What Render Unto Caesar Actually Means",
    pillar: "Prophetic Disruption",
    category: "history",
  },
  {
    text: "We have turned the most dangerous sentence in the Gospels into a permission slip.",
    articleSlug: "what-render-unto-caesar-actually-means",
    articleTitle: "What Render Unto Caesar Actually Means",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },
  {
    text: "The question is never what belongs to Caesar. The question is what does not. And the answer Jesus gives is everything that bears the image of God.",
    articleSlug: "what-render-unto-caesar-actually-means",
    articleTitle: "What Render Unto Caesar Actually Means",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 22. Christendom Is Ending. Christianity Is Not.
  // ─────────────────────────────────────────────────────────────
  {
    text: "There is Christianity, the body of people who confess that Jesus is Lord. And there is Christendom, the cultural arrangement that once made that confession easy. We are grieving the second and calling it the first.",
    articleSlug: "christendom-is-ending-christianity-is-not",
    articleTitle: "Christendom Is Ending. Christianity Is Not.",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },
  {
    text: "A pastor told me the country is losing its faith, and he meant it as a funeral. Then I noticed we were grieving two different things and using one word for both.",
    articleSlug: "christendom-is-ending-christianity-is-not",
    articleTitle: "Christendom Is Ending. Christianity Is Not.",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },
  {
    text: "The church has survived the loss of every empire that ever hosted it. It was never the empire that kept it alive.",
    articleSlug: "christendom-is-ending-christianity-is-not",
    articleTitle: "Christendom Is Ending. Christianity Is Not.",
    pillar: "Prophetic Disruption",
    category: "comfort",
  },

  // ─────────────────────────────────────────────────────────────
  // 23. The Early Church Under Rome: Faith Without Power
  // ─────────────────────────────────────────────────────────────
  {
    text: "Pliny did not know what to do with them, so he wrote to the emperor. He had tried giving them three chances to curse Christ. The stubborn ones he sent to die.",
    articleSlug: "the-early-church-under-rome",
    articleTitle: "The Early Church Under Rome: Faith Without Power",
    pillar: "Prophetic Disruption",
    category: "history",
  },
  {
    text: "The early church did not have power. It had presence. And presence, it turns out, is harder for an empire to answer than an army.",
    articleSlug: "the-early-church-under-rome",
    articleTitle: "The Early Church Under Rome: Faith Without Power",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },
  {
    text: "Rome met the church not as a comfortable institution but as a movement whose members would rather die than burn a pinch of incense to a man they knew was not God.",
    articleSlug: "the-early-church-under-rome",
    articleTitle: "The Early Church Under Rome: Faith Without Power",
    pillar: "Prophetic Disruption",
    category: "history",
  },

  // ─────────────────────────────────────────────────────────────
  // 24. Two Kingdoms: How Christians Relate Faith and State
  // ─────────────────────────────────────────────────────────────
  {
    text: "Behind his question were two opposite fears. He was afraid the church had become a wing of a political party. He was also afraid that saying no would mean abandoning the poor.",
    articleSlug: "two-kingdoms-faith-and-state",
    articleTitle: "Two Kingdoms: How Christians Relate Faith and State",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },
  {
    text: "Both fears are right. That is what makes the question hard, and that is what the old language of two kingdoms was built to hold.",
    articleSlug: "two-kingdoms-faith-and-state",
    articleTitle: "Two Kingdoms: How Christians Relate Faith and State",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },
  {
    text: "The church that refuses to speak to power and the church that becomes a chaplain to power make the same mistake from opposite directions.",
    articleSlug: "two-kingdoms-faith-and-state",
    articleTitle: "Two Kingdoms: How Christians Relate Faith and State",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },

  // ─────────────────────────────────────────────────────────────
  // 25. The Church After Cultural Power
  // ─────────────────────────────────────────────────────────────
  {
    text: "The store stayed closed on Sunday because the whole town agreed the day belonged to God, and now it does not. The real question is not how to get the terms back.",
    articleSlug: "the-church-after-cultural-power",
    articleTitle: "The Church After Cultural Power",
    pillar: "Prophetic Disruption",
    category: "challenge",
  },
  {
    text: "The real question is whether the church ever knew how to be the church without the culture doing half its work for free.",
    articleSlug: "the-church-after-cultural-power",
    articleTitle: "The Church After Cultural Power",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },
  {
    text: "A church that needs cultural power to survive has confused the scaffold for the building.",
    articleSlug: "the-church-after-cultural-power",
    articleTitle: "The Church After Cultural Power",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 26. How to Revitalize a Dying Church
  // ─────────────────────────────────────────────────────────────
  {
    text: "Every revitalization actually begins not with a plan but with a man who has run out of plans.",
    articleSlug: "how-to-revitalize-a-dying-church",
    articleTitle: "How to Revitalize a Dying Church",
    pillar: "Leadership Formation",
    category: "wisdom",
  },
  {
    text: "Average attendance down a third, the giving following it like a shadow, three funerals and no baptisms. My son asked what was wrong, and I could not answer him.",
    articleSlug: "how-to-revitalize-a-dying-church",
    articleTitle: "How to Revitalize a Dying Church",
    pillar: "Leadership Formation",
    category: "comfort",
  },
  {
    text: "We ask how to grow the church, as if growth were the thing a dying church needs. The dying church does not need to grow. It needs to repent.",
    articleSlug: "how-to-revitalize-a-dying-church",
    articleTitle: "How to Revitalize a Dying Church",
    pillar: "Leadership Formation",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 27. Why Churches Close, and What Comes Next
  // ─────────────────────────────────────────────────────────────
  {
    text: "By the time the door is locked, the dying happened years ago. She had cried years earlier, when she first understood it was over, long before anyone said it aloud.",
    articleSlug: "why-churches-close-and-what-comes-next",
    articleTitle: "Why Churches Close, and What Comes Next",
    pillar: "Leadership Formation",
    category: "comfort",
  },
  {
    text: "A church does not close the day the last member leaves. It closes the day the last member stops expecting anyone new to walk in.",
    articleSlug: "why-churches-close-and-what-comes-next",
    articleTitle: "Why Churches Close, and What Comes Next",
    pillar: "Leadership Formation",
    category: "conviction",
  },
  {
    text: "The hymnal was still in the rack. The offering plates were stacked like dishes after the last guest has gone.",
    articleSlug: "why-churches-close-and-what-comes-next",
    articleTitle: "Why Churches Close, and What Comes Next",
    pillar: "Leadership Formation",
    category: "comfort",
  },

  // ─────────────────────────────────────────────────────────────
  // 28. Why Gen Z Is Coming Back to Church
  // ─────────────────────────────────────────────────────────────
  {
    text: "He was not looking for a welcome. He had welcomes everywhere. He was looking for someone who would not lie to him.",
    articleSlug: "why-gen-z-is-coming-back-to-church",
    articleTitle: "Why Gen Z Is Coming Back to Church",
    pillar: "Leadership Formation",
    category: "wisdom",
  },
  {
    text: "He had been raised on nothing, no church, no catechism, a household where religion was treated the way you treat an old superstition. And he thought it might all be true.",
    articleSlug: "why-gen-z-is-coming-back-to-church",
    articleTitle: "Why Gen Z Is Coming Back to Church",
    pillar: "Leadership Formation",
    category: "comfort",
  },
  {
    text: "The generation the church wrote off as lost is showing up asking harder questions than the church has heard in decades. The question is whether we have answers or only atmospheres.",
    articleSlug: "why-gen-z-is-coming-back-to-church",
    articleTitle: "Why Gen Z Is Coming Back to Church",
    pillar: "Leadership Formation",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 29. Replanting: When a Church Has to Start Over
  // ─────────────────────────────────────────────────────────────
  {
    text: "A woman in her eighties raised her hand for yes with tears running down her face. She said dissolving the church she had given her life to was the only way to keep it from ending.",
    articleSlug: "replanting-when-a-church-starts-over",
    articleTitle: "Replanting: When a Church Has to Start Over",
    pillar: "Leadership Formation",
    category: "comfort",
  },
  {
    text: "The vote was twenty-three to nine. Twenty-three older members agreed to hand their building, their name, and their Sunday to a replant they would not lead and could barely recognize.",
    articleSlug: "replanting-when-a-church-starts-over",
    articleTitle: "Replanting: When a Church Has to Start Over",
    pillar: "Leadership Formation",
    category: "challenge",
  },
  {
    text: "Death and resurrection is not just a doctrine the church preaches. Sometimes it is the thing the church has to do.",
    articleSlug: "replanting-when-a-church-starts-over",
    articleTitle: "Replanting: When a Church Has to Start Over",
    pillar: "Leadership Formation",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 30. Leading a Church When Trust Is Gone
  // ─────────────────────────────────────────────────────────────
  {
    text: "People listened to me preach with their arms folded, not because they disliked me but because the last man had stood in the same spot and sounded sincere, and look what that was worth.",
    articleSlug: "leading-a-church-when-trust-is-gone",
    articleTitle: "Leading a Church When Trust Is Gone",
    pillar: "Leadership Formation",
    category: "comfort",
  },
  {
    text: "The wound was not in the budget. It was in the eyes.",
    articleSlug: "leading-a-church-when-trust-is-gone",
    articleTitle: "Leading a Church When Trust Is Gone",
    pillar: "Leadership Formation",
    category: "wisdom",
  },
  {
    text: "You cannot lead people who do not trust you, and you cannot make them trust you. You can only be trustworthy, for as long as it takes, which is always longer than you want.",
    articleSlug: "leading-a-church-when-trust-is-gone",
    articleTitle: "Leading a Church When Trust Is Gone",
    pillar: "Leadership Formation",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 31. How Individualism Changed the Way We Read the Bible
  // ─────────────────────────────────────────────────────────────
  {
    text: "A man tells me God has a plan for his life. He means his life. Singular. He did not learn that sentence from Scripture. He learned it from the air he breathes.",
    articleSlug: "how-individualism-changed-how-we-read-the-bible",
    articleTitle: "How Individualism Changed the Way We Read the Bible",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },
  {
    text: "The question is not whether God cares about individuals. The question is whether the individual has become so large that the community has disappeared.",
    articleSlug: "how-individualism-changed-how-we-read-the-bible",
    articleTitle: "How Individualism Changed the Way We Read the Bible",
    pillar: "Prophetic Disruption",
    category: "challenge",
  },
  {
    text: "Most of the yous in the New Testament are plural. We read them as singular because we cannot hear the difference in English, and because we want to.",
    articleSlug: "how-individualism-changed-how-we-read-the-bible",
    articleTitle: "How Individualism Changed the Way We Read the Bible",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 32. Consumerism Is a Spiritual Formation
  // ─────────────────────────────────────────────────────────────
  {
    text: "My sons can tell the difference between two phones I cannot see a difference between. They were not taught this in any class. They absorbed it the way I absorbed my father's absence.",
    articleSlug: "consumerism-is-a-spiritual-formation",
    articleTitle: "Consumerism Is a Spiritual Formation",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },
  {
    text: "We assume that what makes us who we are is what we believe. State the doctrine, win the mind, and the life follows. But we are not brains on sticks. We are bodies trained by repetition.",
    articleSlug: "consumerism-is-a-spiritual-formation",
    articleTitle: "Consumerism Is a Spiritual Formation",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },
  {
    text: "The question that should keep a pastor awake is not whether his people have been formed but by what, and toward what end.",
    articleSlug: "consumerism-is-a-spiritual-formation",
    articleTitle: "Consumerism Is a Spiritual Formation",
    pillar: "Prophetic Disruption",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 33. The Church Held Captive to the Culture War
  // ─────────────────────────────────────────────────────────────
  {
    text: "A man left my church not over a doctrine but over a vote. When I asked him what he believed about the cross, he answered me with a position on a policy.",
    articleSlug: "the-church-captive-to-the-culture-war",
    articleTitle: "The Church Held Captive to the Culture War",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },
  {
    text: "The grammar had shifted underneath him, and he had not noticed. His deepest loyalty had moved, and he could no longer locate it.",
    articleSlug: "the-church-captive-to-the-culture-war",
    articleTitle: "The Church Held Captive to the Culture War",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },
  {
    text: "A church captive to a culture war is a church that has forgotten which war it was enlisted to fight.",
    articleSlug: "the-church-captive-to-the-culture-war",
    articleTitle: "The Church Held Captive to the Culture War",
    pillar: "Prophetic Disruption",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 34. Outrage Is Not a Spiritual Gift
  // ─────────────────────────────────────────────────────────────
  {
    text: "I caught myself reaching for my phone before I had finished the prayer. Not after. During. My body wanted to be in the outrage the way a younger man wants to be in a fight.",
    articleSlug: "outrage-is-not-a-spiritual-gift",
    articleTitle: "Outrage Is Not a Spiritual Gift",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },
  {
    text: "It was not a hunger for righteousness. It was a hunger for the feeling of righteousness, which is a different and more dangerous thing.",
    articleSlug: "outrage-is-not-a-spiritual-gift",
    articleTitle: "Outrage Is Not a Spiritual Gift",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },
  {
    text: "Outrage is the cheapest form of moral seriousness. It costs you nothing and changes nothing and lets you feel like a prophet without any of the suffering.",
    articleSlug: "outrage-is-not-a-spiritual-gift",
    articleTitle: "Outrage Is Not a Spiritual Gift",
    pillar: "Prophetic Disruption",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 35. Formed by Screens: Technology and the Soul
  // ─────────────────────────────────────────────────────────────
  {
    text: "I sit down to read Scripture and my hand reaches for the phone before my mind has settled, and the reaching has stopped feeling like a choice.",
    articleSlug: "formed-by-screens-technology-and-the-soul",
    articleTitle: "Formed by Screens: Technology and the Soul",
    pillar: "Prophetic Disruption",
    category: "conviction",
  },
  {
    text: "Something is forming us both, my son and me, and it did not ask permission, and we did not notice it happening until it had already happened.",
    articleSlug: "formed-by-screens-technology-and-the-soul",
    articleTitle: "Formed by Screens: Technology and the Soul",
    pillar: "Prophetic Disruption",
    category: "wisdom",
  },
  {
    text: "The screen is not a neutral window. It is a liturgy, and it is forming your loves before your theology has a chance to object.",
    articleSlug: "formed-by-screens-technology-and-the-soul",
    articleTitle: "Formed by Screens: Technology and the Soul",
    pillar: "Prophetic Disruption",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 36. What the Bible Actually Says About Money
  // ─────────────────────────────────────────────────────────────
  {
    text: "He had played by every rule the culture handed him, and the rules had not lied about how to acquire, only about what acquiring would do to him.",
    articleSlug: "what-the-bible-actually-says-about-money-and-wealth",
    articleTitle: "What the Bible Actually Says About Money",
    pillar: "Prophetic Justice",
    category: "wisdom",
  },
  {
    text: "Money keeps its promises and breaks them in the same motion. It delivers the house. It does not deliver the man who can live in it.",
    articleSlug: "what-the-bible-actually-says-about-money-and-wealth",
    articleTitle: "What the Bible Actually Says About Money",
    pillar: "Prophetic Justice",
    category: "conviction",
  },
  {
    text: "The prosperity gospel is not wrong because it promises too much. It is wrong because it promises the wrong thing.",
    articleSlug: "what-the-bible-actually-says-about-money-and-wealth",
    articleTitle: "What the Bible Actually Says About Money",
    pillar: "Prophetic Justice",
    category: "conviction",
  },

  // ─────────────────────────────────────────────────────────────
  // 37. Is Poverty Political? The Bible's Uncomfortable Answer
  // ─────────────────────────────────────────────────────────────
  {
    text: "Ask whether poverty is political in most American churches and you will watch faces close. The word political has become a smell.",
    articleSlug: "is-poverty-political-the-bibles-answer",
    articleTitle: "Is Poverty Political? The Bible's Uncomfortable Answer",
    pillar: "Prophetic Justice",
    category: "conviction",
  },
  {
    text: "When the Bible commands care for the poor, is it speaking only to my private compassion, or is it making a claim on the structures I benefit from? I have read Amos, and Amos will not let me keep it private.",
    articleSlug: "is-poverty-political-the-bibles-answer",
    articleTitle: "Is Poverty Political? The Bible's Uncomfortable Answer",
    pillar: "Prophetic Justice",
    category: "challenge",
  },
  {
    text: "Poverty is a heart issue, they say. It is about generosity, not policy. I understand the instinct. I have also read Amos.",
    articleSlug: "is-poverty-political-the-bibles-answer",
    articleTitle: "Is Poverty Political? The Bible's Uncomfortable Answer",
    pillar: "Prophetic Justice",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 38. Jubilee, Debt, and the Economy God Commanded
  // ─────────────────────────────────────────────────────────────
  {
    text: "God built into the calendar a planned and recurring undoing of accumulation. He called it Jubilee. And the church has spent two millennia finding reasons he could not have been serious.",
    articleSlug: "jubilee-debt-and-the-economy-god-commanded",
    articleTitle: "Jubilee, Debt, and the Economy God Commanded",
    pillar: "Prophetic Justice",
    category: "conviction",
  },
  {
    text: "Every fiftieth year, a trumpet sounds and the whole economy resets. Land returns. Debts dissolve. The God of Israel was not subtle about accumulation.",
    articleSlug: "jubilee-debt-and-the-economy-god-commanded",
    articleTitle: "Jubilee, Debt, and the Economy God Commanded",
    pillar: "Prophetic Justice",
    category: "history",
  },
  {
    text: "There is a law in Leviticus so strange that most Christians have never heard it preached. The church filed it under abolished. God filed it under essential.",
    articleSlug: "jubilee-debt-and-the-economy-god-commanded",
    articleTitle: "Jubilee, Debt, and the Economy God Commanded",
    pillar: "Prophetic Justice",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 39. The Eye of the Needle: Jesus and the Rich
  // ─────────────────────────────────────────────────────────────
  {
    text: "A story got told that there was a low gate called the Needle's Eye, and that a camel could squeeze through if it knelt. It is a fabrication. Jesus meant what he said.",
    articleSlug: "the-eye-of-the-needle-jesus-and-the-rich",
    articleTitle: "The Eye of the Needle: Jesus and the Rich",
    pillar: "Prophetic Justice",
    category: "history",
  },
  {
    text: "Commentators invented a gate in the Middle Ages to relieve a pressure they could not bear. The pressure was the plain words of Jesus about wealth.",
    articleSlug: "the-eye-of-the-needle-jesus-and-the-rich",
    articleTitle: "The Eye of the Needle: Jesus and the Rich",
    pillar: "Prophetic Justice",
    category: "conviction",
  },
  {
    text: "Jesus said a camel, the largest animal in Palestine, and a needle, the smallest hole anyone knew. He was not being subtle. We have been being subtle for him ever since.",
    articleSlug: "the-eye-of-the-needle-jesus-and-the-rich",
    articleTitle: "The Eye of the Needle: Jesus and the Rich",
    pillar: "Prophetic Justice",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 40. Charity Is Not Justice: The Difference
  // ─────────────────────────────────────────────────────────────
  {
    text: "There is a kind of generosity that costs the giver nothing it cannot spare and changes nothing it does not wish to change. We have perfected it.",
    articleSlug: "charity-is-not-justice-the-difference",
    articleTitle: "Charity Is Not Justice: The Difference That Changes Everything",
    pillar: "Prophetic Justice",
    category: "conviction",
  },
  {
    text: "I have felt the warm relief of having given, and mistaken the relief for righteousness. The Bible has a word for what I felt, and it is not justice.",
    articleSlug: "charity-is-not-justice-the-difference",
    articleTitle: "Charity Is Not Justice: The Difference That Changes Everything",
    pillar: "Prophetic Justice",
    category: "challenge",
  },
  {
    text: "Charity feeds a man. Justice asks why he is hungry. The Bible commands both, and we have been doing only the comfortable one.",
    articleSlug: "charity-is-not-justice-the-difference",
    articleTitle: "Charity Is Not Justice: The Difference That Changes Everything",
    pillar: "Prophetic Justice",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 41. Covenant vs. Contract: What Marriage Actually Is
  // ─────────────────────────────────────────────────────────────
  {
    text: "She was no longer happy. She had absorbed an account of marriage in which her happiness was the thing the marriage existed to produce. The trouble was not that her marriage had failed. It was her categories.",
    articleSlug: "covenant-vs-contract-what-marriage-is",
    articleTitle: "Covenant vs. Contract: What Marriage Actually Is",
    pillar: "Integrated Life",
    category: "wisdom",
  },
  {
    text: "A contract protects your interests. A covenant binds your life. The difference is whether you came to get something or to give yourself.",
    articleSlug: "covenant-vs-contract-what-marriage-is",
    articleTitle: "Covenant vs. Contract: What Marriage Actually Is",
    pillar: "Integrated Life",
    category: "challenge",
  },
  {
    text: "Marriage is not a feeling you protect. It is a promise you keep, especially on the days the feeling has gone underground and is not answering.",
    articleSlug: "covenant-vs-contract-what-marriage-is",
    articleTitle: "Covenant vs. Contract: What Marriage Actually Is",
    pillar: "Integrated Life",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 42. How to Raise Children in the Faith Without Crushing Them
  // ─────────────────────────────────────────────────────────────
  {
    text: "He was not reporting a conclusion. He was running a test. He wanted to know whether the love in that house was load-bearing or conditional.",
    articleSlug: "how-to-raise-children-in-the-faith",
    articleTitle: "How to Raise Children in the Faith Without Crushing Them",
    pillar: "Integrated Life",
    category: "wisdom",
  },
  {
    text: "The question under most of their questions is not is it true. It is will you still have me if I doubt it.",
    articleSlug: "how-to-raise-children-in-the-faith",
    articleTitle: "How to Raise Children in the Faith Without Crushing Them",
    pillar: "Integrated Life",
    category: "comfort",
  },
  {
    text: "You cannot give your children a faith they will never question. You can give them a home they will never doubt was safe to question in.",
    articleSlug: "how-to-raise-children-in-the-faith",
    articleTitle: "How to Raise Children in the Faith Without Crushing Them",
    pillar: "Integrated Life",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 43. What Fatherhood Requires
  // ─────────────────────────────────────────────────────────────
  {
    text: "He was doing everything his own father had not. He was there. And something was not working. Presence is the floor, and he had mistaken it for the ceiling.",
    articleSlug: "what-fatherhood-requires",
    articleTitle: "What Fatherhood Requires",
    pillar: "Integrated Life",
    category: "conviction",
  },
  {
    text: "A father who is only present is a witness. A father who speaks is a voice. Your children need a voice, not just a body in the room.",
    articleSlug: "what-fatherhood-requires",
    articleTitle: "What Fatherhood Requires",
    pillar: "Integrated Life",
    category: "challenge",
  },
  {
    text: "I was raised without a father. I know what the absence costs. And I have learned that showing up is necessary and not sufficient.",
    articleSlug: "what-fatherhood-requires",
    articleTitle: "What Fatherhood Requires",
    pillar: "Integrated Life",
    category: "comfort",
  },

  // ─────────────────────────────────────────────────────────────
  // 44. Protecting Your Marriage From the Demands of Work
  // ─────────────────────────────────────────────────────────────
  {
    text: "His marriage had become a logistics partnership. No affair. No fight. The marriage had simply been crowded out, one good and urgent work demand at a time.",
    articleSlug: "protecting-your-marriage-from-work",
    articleTitle: "Protecting Your Marriage From the Demands of Work",
    pillar: "Integrated Life",
    category: "conviction",
  },
  {
    text: "He had not chosen against his wife on any single day. He had chosen against her on every day, in increments too small to notice and too consistent to survive.",
    articleSlug: "protecting-your-marriage-from-work",
    articleTitle: "Protecting Your Marriage From the Demands of Work",
    pillar: "Integrated Life",
    category: "wisdom",
  },
  {
    text: "What remained was a smooth-running operation with two strangers at the controls.",
    articleSlug: "protecting-your-marriage-from-work",
    articleTitle: "Protecting Your Marriage From the Demands of Work",
    pillar: "Integrated Life",
    category: "conviction",
  },

  // ─────────────────────────────────────────────────────────────
  // 45. Forgiveness in Marriage: How to Actually Do It
  // ─────────────────────────────────────────────────────────────
  {
    text: "They had been wounding each other for years and forgiving each other never, and they had mistaken the not-divorcing for forgiveness.",
    articleSlug: "forgiveness-in-marriage",
    articleTitle: "Forgiveness in Marriage: How to Actually Do It",
    pillar: "Integrated Life",
    category: "conviction",
  },
  {
    text: "They were two creditors who had agreed not to call in the debt while never once forgiving it. The debt sat there, accruing interest.",
    articleSlug: "forgiveness-in-marriage",
    articleTitle: "Forgiveness in Marriage: How to Actually Do It",
    pillar: "Integrated Life",
    category: "wisdom",
  },
  {
    text: "Forgiveness is not a feeling you wait for. It is a decision you make and then live into, and some days the living costs more than the deciding.",
    articleSlug: "forgiveness-in-marriage",
    articleTitle: "Forgiveness in Marriage: How to Actually Do It",
    pillar: "Integrated Life",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 46. Why Pastors Are Leaving Ministry
  // ─────────────────────────────────────────────────────────────
  {
    text: "He said the sentence the way a man says it when he has already cleaned out the office and is only calling to be heard once before he stops being a pastor.",
    articleSlug: "why-pastors-are-leaving-ministry",
    articleTitle: "Why Pastors Are Leaving Ministry",
    pillar: "Leadership Formation",
    category: "comfort",
  },
  {
    text: "A congregation loved him and exhausted him in roughly equal measure, and he could not name the thing that broke. That is the part that should frighten us.",
    articleSlug: "why-pastors-are-leaving-ministry",
    articleTitle: "Why Pastors Are Leaving Ministry",
    pillar: "Leadership Formation",
    category: "conviction",
  },
  {
    text: "Not falling, not in scandal, not in doubt about the existence of God. Done. That single word carries more weight than any headline about a pastor's failure.",
    articleSlug: "why-pastors-are-leaving-ministry",
    articleTitle: "Why Pastors Are Leaving Ministry",
    pillar: "Leadership Formation",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 47. Depression in the Pulpit: A Pastor's Mental Health
  // ─────────────────────────────────────────────────────────────
  {
    text: "I have preached a sermon on the goodness of God on a morning when I could not feel it. I stood in a pulpit with my chest full of lead and told three hundred people about a joy I could not locate in myself.",
    articleSlug: "depression-in-the-pulpit",
    articleTitle: "Depression in the Pulpit: A Pastor's Mental Health",
    pillar: "Leadership Formation",
    category: "comfort",
  },
  {
    text: "There is a sentence pastors learn to say without believing it. We do not talk about it, and the not talking is part of the sickness.",
    articleSlug: "depression-in-the-pulpit",
    articleTitle: "Depression in the Pulpit: A Pastor's Mental Health",
    pillar: "Leadership Formation",
    category: "conviction",
  },
  {
    text: "Depression in a pastor is not a failure of faith. It is a wound in a person who happens to carry the faith of others, and the carrying does not protect him from the wound.",
    articleSlug: "depression-in-the-pulpit",
    articleTitle: "Depression in the Pulpit: A Pastor's Mental Health",
    pillar: "Leadership Formation",
    category: "comfort",
  },

  // ─────────────────────────────────────────────────────────────
  // 48. How to Lead Without Losing Your Soul
  // ─────────────────────────────────────────────────────────────
  {
    text: "What does it profit a man to gain the whole world and forfeit his soul. He was not speaking to stockbrokers. He was speaking to disciples.",
    articleSlug: "how-to-lead-without-losing-your-soul",
    articleTitle: "How to Lead Without Losing Your Soul",
    pillar: "Leadership Formation",
    category: "conviction",
  },
  {
    text: "A pastor can forfeit his soul building a kingdom and call the forfeiture sacrifice.",
    articleSlug: "how-to-lead-without-losing-your-soul",
    articleTitle: "How to Lead Without Losing Your Soul",
    pillar: "Leadership Formation",
    category: "wisdom",
  },
  {
    text: "There is a way of succeeding in ministry that looks exactly like faithfulness from the outside and is a slow death from the inside.",
    articleSlug: "how-to-lead-without-losing-your-soul",
    articleTitle: "How to Lead Without Losing Your Soul",
    pillar: "Leadership Formation",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 49. The Interior Life of the Pastor
  // ─────────────────────────────────────────────────────────────
  {
    text: "I had not read a word of Scripture for my own soul in weeks. I had read it for the sermon. I had read it for the funeral. I had not read it for the bread it is.",
    articleSlug: "the-interior-life-of-the-pastor",
    articleTitle: "The Interior Life of the Pastor",
    pillar: "Leadership Formation",
    category: "conviction",
  },
  {
    text: "There is a particular kind of hunger that only afflicts people who work with food all day. The cook surrounded by meals he never sits down to eat.",
    articleSlug: "the-interior-life-of-the-pastor",
    articleTitle: "The Interior Life of the Pastor",
    pillar: "Leadership Formation",
    category: "wisdom",
  },
  {
    text: "The interior life is the part of a pastor that no one sees, no one evaluates, and no one will maintain for him. It is also the only part that can keep him alive.",
    articleSlug: "the-interior-life-of-the-pastor",
    articleTitle: "The Interior Life of the Pastor",
    pillar: "Leadership Formation",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 50. Why Your Church Should Require a Sabbatical
  // ─────────────────────────────────────────────────────────────
  {
    text: "Most churches will let a pastor work himself into the ground and call it dedication.",
    articleSlug: "why-your-church-should-require-a-sabbatical",
    articleTitle: "Why Your Church Should Require a Sabbatical",
    pillar: "Leadership Formation",
    category: "conviction",
  },
  {
    text: "We need you. We could not do it without you. That sentence has buried more pastors than scandal ever has.",
    articleSlug: "why-your-church-should-require-a-sabbatical",
    articleTitle: "Why Your Church Should Require a Sabbatical",
    pillar: "Leadership Formation",
    category: "wisdom",
  },
  {
    text: "The same church that would never ask a member to work without rest for a decade will ask exactly that of the man who shepherds them, and frame it as a compliment.",
    articleSlug: "why-your-church-should-require-a-sabbatical",
    articleTitle: "Why Your Church Should Require a Sabbatical",
    pillar: "Leadership Formation",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 51. How to Preach to People Who Have Heard It All
  // ─────────────────────────────────────────────────────────────
  {
    text: "You announce the text and her face does a small, courteous thing. It closes. Not in anger. In recognition. She knows where this is going.",
    articleSlug: "how-to-preach-to-people-who-have-heard-it-all",
    articleTitle: "How to Preach to People Who Have Heard It All",
    pillar: "Leadership Formation",
    category: "wisdom",
  },
  {
    text: "The real difficulty of preaching is not reaching the person who has never heard the gospel. It is reaching the one who has heard it so many times she can no longer hear it at all.",
    articleSlug: "how-to-preach-to-people-who-have-heard-it-all",
    articleTitle: "How to Preach to People Who Have Heard It All",
    pillar: "Leadership Formation",
    category: "challenge",
  },
  {
    text: "Familiarity is the preacher's enemy because it lets the listener predict the landing. A sermon that can be predicted cannot wound or heal.",
    articleSlug: "how-to-preach-to-people-who-have-heard-it-all",
    articleTitle: "How to Preach to People Who Have Heard It All",
    pillar: "Leadership Formation",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 52. Preaching Politics Without Losing the Gospel
  // ─────────────────────────────────────────────────────────────
  {
    text: "He stands there with a text in his hand and a country in his pews, and there is no neutral sentence available to him.",
    articleSlug: "preaching-politics-without-losing-the-gospel",
    articleTitle: "Preaching Politics Without Losing the Gospel",
    pillar: "Leadership Formation",
    category: "wisdom",
  },
  {
    text: "Half the room voted one way. Half voted the other. Both halves are watching his eyes for a sign. Even the weather report would be heard as a verdict.",
    articleSlug: "preaching-politics-without-losing-the-gospel",
    articleTitle: "Preaching Politics Without Losing the Gospel",
    pillar: "Leadership Formation",
    category: "challenge",
  },
  {
    text: "The gospel is not apolitical. It is political in a way that no party can contain and no election can fulfill.",
    articleSlug: "preaching-politics-without-losing-the-gospel",
    articleTitle: "Preaching Politics Without Losing the Gospel",
    pillar: "Leadership Formation",
    category: "conviction",
  },

  // ─────────────────────────────────────────────────────────────
  // 53. Expository vs. Topical Preaching: Which and When
  // ─────────────────────────────────────────────────────────────
  {
    text: "The first preacher opens his Bible to where he left off. His sermon is decided before he has had a single idea, because the text decided it.",
    articleSlug: "expository-vs-topical-preaching",
    articleTitle: "Expository vs. Topical Preaching: Which and When",
    pillar: "Leadership Formation",
    category: "wisdom",
  },
  {
    text: "The question the conferences keep arguing about is which of them did it right. The question underneath is which of them let the Word have the first word.",
    articleSlug: "expository-vs-topical-preaching",
    articleTitle: "Expository vs. Topical Preaching: Which and When",
    pillar: "Leadership Formation",
    category: "challenge",
  },
  {
    text: "A preacher who only follows the text never addresses the room. A preacher who only addresses the room never lets the text surprise him. Both are half a ministry.",
    articleSlug: "expository-vs-topical-preaching",
    articleTitle: "Expository vs. Topical Preaching: Which and When",
    pillar: "Leadership Formation",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 54. Five Preaching Habits That Empty a Room
  // ─────────────────────────────────────────────────────────────
  {
    text: "No one walks out in the middle of a sermon. A room empties slowly, over months, through a thousand small decisions made in cars on the way home.",
    articleSlug: "five-preaching-habits-that-empty-a-room",
    articleTitle: "Five Preaching Habits That Empty a Room",
    pillar: "Leadership Formation",
    category: "conviction",
  },
  {
    text: "The preacher rarely sees the leak because the leak is silent and because he is standing at the exact spot where it begins.",
    articleSlug: "five-preaching-habits-that-empty-a-room",
    articleTitle: "Five Preaching Habits That Empty a Room",
    pillar: "Leadership Formation",
    category: "wisdom",
  },
  {
    text: "I have emptied rooms. Not with scandal. With habits I could not see in myself because I was the one doing them.",
    articleSlug: "five-preaching-habits-that-empty-a-room",
    articleTitle: "Five Preaching Habits That Empty a Room",
    pillar: "Leadership Formation",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 55. The Difference Between a Sermon and a Talk
  // ─────────────────────────────────────────────────────────────
  {
    text: "A talk is survivable. You can hear a good talk and remain exactly who you were. A sermon is not supposed to be survivable.",
    articleSlug: "the-difference-between-a-sermon-and-a-talk",
    articleTitle: "The Difference Between a Sermon and a Talk",
    pillar: "Leadership Formation",
    category: "conviction",
  },
  {
    text: "A man stands up with notes and speaks for thirty minutes about God, and at the end you cannot tell whether what just happened was a sermon or a talk.",
    articleSlug: "the-difference-between-a-sermon-and-a-talk",
    articleTitle: "The Difference Between a Sermon and a Talk",
    pillar: "Leadership Formation",
    category: "challenge",
  },
  {
    text: "The two can look identical from the outside. The difference is whether the Word was handled as information to be transferred or as fire to be carried into the room.",
    articleSlug: "the-difference-between-a-sermon-and-a-talk",
    articleTitle: "The Difference Between a Sermon and a Talk",
    pillar: "Leadership Formation",
    category: "wisdom",
  },

  // ─────────────────────────────────────────────────────────────
  // 56. The Most Segregated Hour
  // ─────────────────────────────────────────────────────────────
  {
    text: "Eleven o'clock on Sunday morning is the most segregated hour in America. We nod. We put the line on a slide. Then we drive home to the same neighborhood we drove from.",
    articleSlug: "the-most-segregated-hour",
    articleTitle: "The Most Segregated Hour: Why Sunday Morning Is Still Divided",
    pillar: "Prophetic Justice",
    category: "conviction",
  },
  {
    text: "We have been quoting King ever since as if quoting him were the same as repenting.",
    articleSlug: "the-most-segregated-hour",
    articleTitle: "The Most Segregated Hour: Why Sunday Morning Is Still Divided",
    pillar: "Prophetic Justice",
    category: "challenge",
  },
  {
    text: "A congregation counts as multiracial only when no single group makes up more than eighty percent. By that measure, over ninety percent of American churches fail.",
    articleSlug: "the-most-segregated-hour",
    articleTitle: "The Most Segregated Hour: Why Sunday Morning Is Still Divided",
    pillar: "Prophetic Justice",
    category: "history",
  },

  // ─────────────────────────────────────────────────────────────
  // 57. What the Bible Means by Reconciliation
  // ─────────────────────────────────────────────────────────────
  {
    text: "He said he was tired of the word. Reconciliation had become a code, a Trojan horse. He was not entirely wrong. But the answer to a stolen word is not to abandon it.",
    articleSlug: "what-the-bible-means-by-reconciliation",
    articleTitle: "What the Bible Means by Reconciliation",
    pillar: "Prophetic Justice",
    category: "wisdom",
  },
  {
    text: "Reconciliation does not come from the language of feelings. It comes from the language of war and the language of money, the settling of an account that stood open.",
    articleSlug: "what-the-bible-means-by-reconciliation",
    articleTitle: "What the Bible Means by Reconciliation",
    pillar: "Prophetic Justice",
    category: "wisdom",
  },
  {
    text: "Cheap reconciliation skips the truth-telling and goes straight to the handshake. It costs nothing, and it heals nothing.",
    articleSlug: "what-the-bible-means-by-reconciliation",
    articleTitle: "What the Bible Means by Reconciliation",
    pillar: "Prophetic Justice",
    category: "conviction",
  },

  // ─────────────────────────────────────────────────────────────
  // 58. The Image of God and the Lie of Race
  // ─────────────────────────────────────────────────────────────
  {
    text: "Race as we mean it, the sorting of humanity into a ladder of worth by the color of skin, is younger than the printing press. It was made. And some of the hands that made it held a Bible.",
    articleSlug: "the-image-of-god-and-the-lie-of-race",
    articleTitle: "The Image of God and the Lie of Race",
    pillar: "Prophetic Justice",
    category: "history",
  },
  {
    text: "Ask a child where race comes from and she will tell you it has always been here. Ask a historian and you get a different answer.",
    articleSlug: "the-image-of-god-and-the-lie-of-race",
    articleTitle: "The Image of God and the Lie of Race",
    pillar: "Prophetic Justice",
    category: "challenge",
  },
  {
    text: "The image of God does not come in colors. It comes in flesh, and every piece of flesh that bears it has the same worth, and the same claim on your conscience.",
    articleSlug: "the-image-of-god-and-the-lie-of-race",
    articleTitle: "The Image of God and the Lie of Race",
    pillar: "Prophetic Justice",
    category: "conviction",
  },

  // ─────────────────────────────────────────────────────────────
  // 59. Lament: The Prayer the Church Forgot
  // ─────────────────────────────────────────────────────────────
  {
    text: "Open the hymnal of most churches and try to find a song that does not resolve. You will be looking a long time. We have a thousand songs of triumph and almost none of sorrow.",
    articleSlug: "lament-the-prayer-the-church-forgot",
    articleTitle: "Lament: The Prayer the Church Forgot",
    pillar: "Prophetic Justice",
    category: "conviction",
  },
  {
    text: "A full third of the Psalms are laments, prayers of complaint and grief addressed to God. They are not polite. How long, O Lord. Will you forget me forever.",
    articleSlug: "lament-the-prayer-the-church-forgot",
    articleTitle: "Lament: The Prayer the Church Forgot",
    pillar: "Prophetic Justice",
    category: "comfort",
  },
  {
    text: "A church that cannot lament cannot stand beside the grieving. And a church that cannot stand beside the grieving is not the church.",
    articleSlug: "lament-the-prayer-the-church-forgot",
    articleTitle: "Lament: The Prayer the Church Forgot",
    pillar: "Prophetic Justice",
    category: "challenge",
  },

  // ─────────────────────────────────────────────────────────────
  // 60. Building the Multiethnic Church Without Faking It
  // ─────────────────────────────────────────────────────────────
  {
    text: "There is a kind of multiethnic church that exists mostly in the brochure. The faces are varied. Underneath, every decision that matters is made by one group, in one cultural key.",
    articleSlug: "building-the-multiethnic-church",
    articleTitle: "Building the Multiethnic Church Without Faking It",
    pillar: "Prophetic Justice",
    category: "conviction",
  },
  {
    text: "This is not the one new humanity of Ephesians. It is assimilation with a diversity filter, and the people being assimilated can feel the difference.",
    articleSlug: "building-the-multiethnic-church",
    articleTitle: "Building the Multiethnic Church Without Faking It",
    pillar: "Prophetic Justice",
    category: "challenge",
  },
  {
    text: "A multiethnic church that only asks people of color to cross a cultural threshold has confused hospitality with absorption.",
    articleSlug: "building-the-multiethnic-church",
    articleTitle: "Building the Multiethnic Church Without Faking It",
    pillar: "Prophetic Justice",
    category: "wisdom",
  },
];
