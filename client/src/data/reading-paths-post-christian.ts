/**
 * Reading Paths — Post-Christian Series
 *
 * Eight curated journeys through the 60-article post-Christian series,
 * sequencing articles for readers in specific seasons of questioning,
 * exploration, or reckoning.
 *
 * Data structure matches the ReadingPath interface used by
 * client/src/pages/ReadingPaths.tsx.
 */

interface PathArticle {
  title: string;
  slug: string;
  description: string;
  readTime: string;
}

interface ReadingPath {
  id: number;
  title: string;
  slug: string;
  introduction: string;
  estimatedTime: string;
  icon: string;
  audience: string;
  articles: PathArticle[];
}

export const READING_PATHS: ReadingPath[] = [
  {
    id: 1,
    title: "The Story of Christianity",
    slug: "story-of-christianity",
    introduction:
      "This path traces the full arc of Christian history — from persecuted Jewish sect to global religion — in ten essays that refuse to sanitize the triumphs or minimize the failures. If you want to understand how we got here, start at the beginning. The beginning is stranger than you think.",
    estimatedTime: "140 minutes that cover two thousand years",
    icon: "scroll",
    audience: "Someone who wants to understand the full arc of Christian history",
    articles: [
      {
        title: "How Christianity Became an Empire",
        slug: "how-christianity-became-an-empire",
        description:
          "The story of how a persecuted Jewish sect became the official religion of Rome — and what was gained and lost in the transformation.",
        readTime: "14 min read",
      },
      {
        title: "The Great Schism: When One Church Became Two",
        slug: "the-great-schism",
        description:
          "The 1054 split between Eastern and Western Christianity was centuries in the making. Its consequences shape the Christian world to this day.",
        readTime: "12 min read",
      },
      {
        title: "What the Reformation Actually Changed",
        slug: "what-the-reformation-actually-changed",
        description:
          "The Reformation shattered the unity of Western Christianity, redrew the political map of Europe, and created the conditions for the modern world.",
        readTime: "15 min read",
      },
      {
        title: "The Anabaptist Option",
        slug: "the-anabaptist-option",
        description:
          "They rejected the state church, practiced nonviolence, and were killed for it by both Catholics and Protestants. Four centuries later, their ideas are more relevant than ever.",
        readTime: "11 min read",
      },
      {
        title: "How American Christianity Became American",
        slug: "how-american-christianity-became-american",
        description:
          "The story of how a transplanted European faith became something entirely new — shaped by revivalism, individualism, capitalism, and a national mythology.",
        readTime: "16 min read",
      },
      {
        title: "The Rise and Fall of Mainline Protestantism",
        slug: "the-rise-and-fall-of-mainline-protestantism",
        description:
          "For most of the twentieth century, mainline Protestantism was American Christianity. Its decline is a story about what happens when a tradition can no longer distinguish itself from the culture.",
        readTime: "13 min read",
      },
      {
        title: "What Evangelicalism Was Supposed to Be",
        slug: "what-evangelicalism-was-supposed-to-be",
        description:
          "Evangelicalism was born as a reform movement. That it became something else entirely is one of the great tragedies of modern American religion.",
        readTime: "14 min read",
      },
      {
        title: "The Black Church: The Most Important Institution in American Christianity",
        slug: "the-black-church-in-america",
        description:
          "Born in the crucible of enslavement, sustained through Jim Crow, and central to the most significant moral movement in American history.",
        readTime: "15 min read",
      },
      {
        title: "Pentecostalism and the Global South",
        slug: "pentecostalism-and-the-global-south",
        description:
          "The explosive growth of Pentecostalism has redrawn the map of world Christianity and challenged every assumption Western Christians hold about what the faith looks like.",
        readTime: "12 min read",
      },
      {
        title: "The Death of Christendom",
        slug: "the-death-of-christendom",
        description:
          "The era in which Christianity and Western civilization were fused is over. The question is whether its death might be the best thing that ever happened to the church.",
        readTime: "14 min read",
      },
    ],
  },
  {
    id: 2,
    title: "Know Your Tradition",
    slug: "know-your-tradition",
    introduction:
      "Every church has a theology, a history, and a set of assumptions — whether it names them or not. These seven essays map the terrain of Christian denominations, worship styles, and confessional traditions so you can understand where your church comes from, what it carries, and what it may be missing.",
    estimatedTime: "84 minutes across the denominational map",
    icon: "map",
    audience: "Someone exploring denominations and traditions",
    articles: [
      {
        title: "Catholic, Orthodox, Protestant: The Three Families of Christianity",
        slug: "three-families-of-christianity",
        description:
          "Christianity is not one tradition but three great families, each with its own genius and its own blind spots. Understanding all three is essential.",
        readTime: "13 min read",
      },
      {
        title: "A Guide to Every Major Denomination",
        slug: "guide-to-every-major-denomination",
        description:
          "From Baptists to Lutherans, Presbyterians to Pentecostals — what they believe, how they worship, and why they exist as separate bodies.",
        readTime: "16 min read",
      },
      {
        title: "Non-Denominational Doesn't Mean No Tradition",
        slug: "non-denominational-doesnt-mean-no-tradition",
        description:
          "The fastest-growing segment of American Christianity claims no label. But every church has a theology, a tradition, and a set of assumptions — whether it names them or not.",
        readTime: "10 min read",
      },
      {
        title: "What Calvinism and Arminianism Actually Argue About",
        slug: "calvinism-and-arminianism",
        description:
          "The oldest and most consequential debate in Protestant theology is also the most misunderstood. What Calvin and Arminius actually taught.",
        readTime: "12 min read",
      },
      {
        title: "Liturgical vs. Contemporary Worship: What We Gained and What We Lost",
        slug: "liturgical-vs-contemporary-worship",
        description:
          "The worship wars were never really about music. They were about what worship is for — and the answer shapes what kind of Christians we become.",
        readTime: "11 min read",
      },
      {
        title: "Creeds, Confessions, and Statements of Faith",
        slug: "creeds-confessions-statements-of-faith",
        description:
          "The ancient creeds were not bureaucratic exercises. They were battle lines drawn against heresies that threatened to gut the faith from within.",
        readTime: "11 min read",
      },
      {
        title: "The Charismatic Movement Inside Every Denomination",
        slug: "charismatic-movement-inside-every-denomination",
        description:
          "The movement that crossed every denominational boundary and forced every tradition to reckon with the question of whether the Spirit still moves in power.",
        readTime: "11 min read",
      },
    ],
  },
  {
    id: 3,
    title: "When Faith Falls Apart",
    slug: "when-faith-falls-apart",
    introduction:
      "You are not losing your faith. You may be losing a version of it that could no longer hold the weight of your actual life. These seven essays trace the terrain of deconstruction, disaffiliation, and the long walk between the faith you inherited and the faith — if there is one — that can survive what you now know.",
    estimatedTime: "83 minutes for the person in the middle of it",
    icon: "compass",
    audience: "Someone deconstructing or questioning inherited beliefs",
    articles: [
      {
        title: "Why People Are Leaving the Church",
        slug: "why-people-are-leaving-the-church",
        description:
          "The exodus from American churches is not a mystery. The data is clear, the reasons are documented, and the church's refusal to listen is accelerating the departure.",
        readTime: "13 min read",
      },
      {
        title: "Deconstruction Is Not Destruction",
        slug: "deconstruction-is-not-destruction",
        description:
          "The impulse to question inherited beliefs is as old as Scripture itself — and it may be the only path to a faith worth keeping.",
        readTime: "12 min read",
      },
      {
        title: "The Rise of the Nones",
        slug: "the-rise-of-the-nones",
        description:
          "They are the fastest-growing religious group in America, and most of them are not atheists. Understanding the nones requires abandoning nearly everything the church assumes about unbelief.",
        readTime: "12 min read",
      },
      {
        title: "Exvangelical: When Leaving Isn't Losing Faith",
        slug: "exvangelical-when-leaving-isnt-losing-faith",
        description:
          "A growing movement of former evangelicals is redefining what it means to leave a tradition without leaving the faith that tradition claimed to own.",
        readTime: "11 min read",
      },
      {
        title: "The Spirituality of Doubt",
        slug: "the-spirituality-of-doubt",
        description:
          "Doubt is not the enemy of faith. It is faith's most demanding companion — the one that refuses to let you settle for answers too small for the questions you carry.",
        readTime: "11 min read",
      },
      {
        title: "The Problem with Certainty",
        slug: "the-problem-with-certainty",
        description:
          "The demand for certainty is not a sign of strong faith. It is a sign of a faith too fragile to survive contact with the world as it actually is.",
        readTime: "11 min read",
      },
      {
        title: "Reconstructing Faith: What Comes After Deconstruction",
        slug: "reconstructing-faith",
        description:
          "The faith that emerges on the other side of honest questioning is not a lesser faith. It is a faith that has been tested in the fire and refined.",
        readTime: "12 min read",
      },
    ],
  },
  {
    id: 4,
    title: "The Skeptic's Path",
    slug: "skeptics-path",
    introduction:
      "This path is for the person who is not interested in being persuaded but is willing to be honest — willing to look at the strongest case for Christian faith alongside the strongest objections and sit with what remains. These eight essays take the hardest questions seriously, because the questions deserve it.",
    estimatedTime: "103 minutes for the honest questioner",
    icon: "search",
    audience: "Honest questioners and seekers who want the strongest arguments, not the safest ones",
    articles: [
      {
        title: "Is God Real? An Honest Assessment",
        slug: "is-god-real",
        description:
          "The question deserves more than slogans from either side. The best arguments, the hardest objections, and the honesty to sit with what remains.",
        readTime: "14 min read",
      },
      {
        title: "Why Does God Allow Suffering?",
        slug: "why-does-god-allow-suffering",
        description:
          "The problem of suffering is not an intellectual puzzle to be solved. It is a wound that demands not explanation but presence.",
        readTime: "14 min read",
      },
      {
        title: "Can You Trust the Bible?",
        slug: "can-you-trust-the-bible",
        description:
          "The Bible is not what most people think it is. It is stranger, more varied, more honest, and more resilient than either the fundamentalist or the skeptic imagines.",
        readTime: "13 min read",
      },
      {
        title: "What Happened to the Historical Jesus",
        slug: "the-historical-jesus",
        description:
          "The quest for the historical Jesus has occupied scholars for over two centuries. What they found — and what they cannot find — matters for everyone.",
        readTime: "14 min read",
      },
      {
        title: "Science and Faith Are Not at War",
        slug: "science-and-faith-are-not-at-war",
        description:
          "The supposed war between science and religion is not a historical fact but a nineteenth-century invention. The real history is far more interesting.",
        readTime: "12 min read",
      },
      {
        title: "Evolution and Genesis: A Pastor's Guide",
        slug: "evolution-and-genesis",
        description:
          "The path forward requires understanding what Genesis actually says, what science actually shows, and what is genuinely at stake theologically.",
        readTime: "13 min read",
      },
      {
        title: "Miracles: Do They Still Happen?",
        slug: "do-miracles-still-happen",
        description:
          "The question of miracles sits at the intersection of philosophy, science, personal experience, and the nature of the God Christians claim to worship.",
        readTime: "11 min read",
      },
      {
        title: "Why Christianity and Not Something Else?",
        slug: "why-christianity",
        description:
          "In a world of competing truth claims, the case for Christianity rests not on its exclusivity but on the particular story it tells about who God is and what God has done.",
        readTime: "12 min read",
      },
    ],
  },
  {
    id: 5,
    title: "Faith in a Secular World",
    slug: "faith-in-secular-world",
    introduction:
      "Christendom is over. The culture no longer carries your faith for you. These seven essays are for the Christian who is not losing their faith but learning to hold it in a world that no longer assumes it — at work, at home, in marriage, online, and in the search for a community that will not break you.",
    estimatedTime: "79 minutes for Christians living post-Christendom",
    icon: "globe",
    audience: "Christians learning to hold faith in a world that no longer assumes it",
    articles: [
      {
        title: "Christianity After Christendom",
        slug: "christianity-after-christendom",
        description:
          "The end of cultural Christianity is not the end of Christianity. It may be the beginning of a faith worth choosing rather than inheriting.",
        readTime: "13 min read",
      },
      {
        title: "How to Talk About Faith Without Being Weird",
        slug: "how-to-talk-about-faith",
        description:
          "Most Christians have been trained to share their faith in ways that guarantee nobody wants to hear it. The problem is not the gospel. The problem is us.",
        readTime: "10 min read",
      },
      {
        title: "Faith at Work When Nobody Shares It",
        slug: "faith-at-work",
        description:
          "The office is not a mission field. It is a place where how you work is already saying everything about what you believe.",
        readTime: "10 min read",
      },
      {
        title: "Raising Kids in a Post-Christian Culture",
        slug: "raising-kids-post-christian",
        description:
          "Your children will not inherit your faith by osmosis. They will inherit it only if it is real enough to survive contact with a world that no longer assumes it is true.",
        readTime: "12 min read",
      },
      {
        title: "Digital Discipleship: Spiritual Formation in the Age of Algorithms",
        slug: "digital-discipleship",
        description:
          "The algorithm is not neutral. It is forming you into a particular kind of person. The question is whether your faith is strong enough to resist it.",
        readTime: "11 min read",
      },
      {
        title: "Interfaith Marriage: When You Love Someone Who Doesn't Believe",
        slug: "interfaith-marriage",
        description:
          "The most intimate theological divide is the one that runs through your own bed. No amount of pretending it is not there will make it go away.",
        readTime: "12 min read",
      },
      {
        title: "How to Find a Church That Won't Hurt You",
        slug: "finding-a-good-church",
        description:
          "The search for a good church is about learning to distinguish between a community that will challenge you toward growth and one that will damage you in the name of God.",
        readTime: "11 min read",
      },
    ],
  },
  {
    id: 6,
    title: "The Church's Reckoning",
    slug: "church-reckoning",
    introduction:
      "The church has done enormous good. It has also done enormous harm — and the harm was not incidental to the institution but produced by its structures, its theology, and its entanglement with power. These nine essays name what the church must face if it wants to be worthy of the gospel it claims to carry.",
    estimatedTime: "116 minutes that will not let you look away",
    icon: "scale",
    audience: "Those wrestling with institutional failure in the church",
    articles: [
      {
        title: "Purity Culture and Its Wreckage",
        slug: "purity-culture-and-its-wreckage",
        description:
          "A generation was taught that their sexual worth was a commodity to be preserved. The theology was thin, the damage was deep, and the reckoning is long overdue.",
        readTime: "13 min read",
      },
      {
        title: "The Prosperity Gospel Is Not the Gospel",
        slug: "prosperity-gospel-is-not-the-gospel",
        description:
          "The theology that promises health and wealth in exchange for faith and financial gifts is among the most destructive heresies in modern Christianity.",
        readTime: "12 min read",
      },
      {
        title: "When Politics Replaced Theology",
        slug: "when-politics-replaced-theology",
        description:
          "The Religious Right did not emerge from a moral awakening. It was constructed for reasons that had far more to do with racial segregation than with abortion.",
        readTime: "14 min read",
      },
      {
        title: "The Sexual Abuse Crisis: A Reckoning the Church Cannot Avoid",
        slug: "sexual-abuse-crisis-in-the-church",
        description:
          "The abuse crisis is not a Catholic problem or a Protestant problem. It is a power problem — and until the church names the structural conditions, it will keep producing them.",
        readTime: "14 min read",
      },
      {
        title: "White Evangelicalism and Race",
        slug: "white-evangelicalism-and-race",
        description:
          "The American church did not merely tolerate slavery. It theologized it. And the theological habits that justified the slaveholder's religion are still operative.",
        readTime: "14 min read",
      },
      {
        title: "The Megachurch Model: What Worked, What Didn't, What's Next",
        slug: "megachurch-model",
        description:
          "The megachurch reached millions and revealed something important about American Christianity's hunger for accessibility — and what happens when the church mistakes growth for faithfulness.",
        readTime: "12 min read",
      },
      {
        title: "Toxic Masculinity in the Pulpit",
        slug: "toxic-masculinity-in-the-pulpit",
        description:
          "The church that confuses aggression with authority and domination with leadership has baptized the very thing the gospel came to crucify.",
        readTime: "12 min read",
      },
      {
        title: "Colonialism and Missions",
        slug: "colonialism-and-missions",
        description:
          "The cross arrived in the colonies alongside the sword. The church has spent centuries celebrating the gospel's spread while refusing to examine the wreckage it left behind.",
        readTime: "13 min read",
      },
      {
        title: "Why the Church Lost the Culture War",
        slug: "why-the-church-lost-the-culture-war",
        description:
          "The church spent forty years trying to win a culture war it was never meant to fight. The cost was the loss of the one thing it cannot function without: moral credibility.",
        readTime: "12 min read",
      },
    ],
  },
  {
    id: 7,
    title: "When the Church Hurts",
    slug: "when-the-church-hurts",
    introduction:
      "These essays are for the person who was wounded by the institution that was supposed to be safe. Not wounded by the gospel — wounded by the people and systems that claimed to represent it. If that is you, this path does not ask you to forgive prematurely. It asks you to name what happened, understand why, and decide what comes next.",
    estimatedTime: "82 minutes for survivors of church harm",
    icon: "shield",
    audience: "Survivors of church harm seeking understanding and a way forward",
    articles: [
      {
        title: "Religious Trauma Is Real",
        slug: "religious-trauma-is-real",
        description:
          "The psychological damage inflicted by authoritarian religion is not a failure of individual faith. It is a predictable consequence of theological systems designed to control through fear.",
        readTime: "12 min read",
      },
      {
        title: "Spiritual Abuse: How Good Theology Gets Weaponized",
        slug: "spiritual-abuse-how-good-theology-gets-weaponized",
        description:
          "Spiritual abuse is not a failure of theology but its perversion — the deliberate use of scriptural authority to control, isolate, and silence.",
        readTime: "12 min read",
      },
      {
        title: "How the Church Handles Mental Health (Badly)",
        slug: "church-and-mental-health",
        description:
          "The church that tells a depressed person to pray harder is not offering spiritual counsel. It is practicing spiritual malpractice.",
        readTime: "12 min read",
      },
      {
        title: "Women in Ministry: The Biblical Case the Church Keeps Ignoring",
        slug: "women-in-ministry",
        description:
          "The Bible contains a robust record of women exercising leadership and authority. The church's refusal to see it says more about the church than about the Bible.",
        readTime: "13 min read",
      },
      {
        title: "Why Young Adults Aren't Coming Back",
        slug: "why-young-adults-arent-coming-back",
        description:
          "The exodus of 18-to-35-year-olds is not about worship style. It is about credibility — and the church is losing on every front that matters to this generation.",
        readTime: "12 min read",
      },
      {
        title: "How to Find a Church That Won't Hurt You",
        slug: "finding-a-good-church",
        description:
          "The search for a good church is about learning to distinguish between a community that will challenge you toward growth and one that will damage you in the name of God.",
        readTime: "11 min read",
      },
      {
        title: "Reconstructing Faith: What Comes After Deconstruction",
        slug: "reconstructing-faith",
        description:
          "The faith that emerges on the other side of honest questioning is not a lesser faith. It is a faith that has been tested in the fire and refined.",
        readTime: "12 min read",
      },
    ],
  },
  {
    id: 8,
    title: "Wisdom Beyond Walls",
    slug: "wisdom-beyond-walls",
    introduction:
      "Christianity did not develop in isolation, and it will not mature in isolation. These six essays explore what the Christian tradition can learn from Judaism, Islam, Buddhism, indigenous spirituality, and its own forgotten mystics — not by abandoning its convictions but by discovering that God's truth is larger than any single tradition's apprehension of it.",
    estimatedTime: "69 minutes for those exploring broader spiritual wisdom",
    icon: "book-open",
    audience: "Those exploring wisdom across spiritual traditions",
    articles: [
      {
        title: "What Christians Can Learn From Judaism",
        slug: "what-christians-can-learn-from-judaism",
        description:
          "Christianity emerged from Judaism and then spent two millennia pretending it had outgrown its parent. The cost has been theological impoverishment and moral blindness.",
        readTime: "12 min read",
      },
      {
        title: "What Christians Can Learn From Islam",
        slug: "what-christians-can-learn-from-islam",
        description:
          "Islam is the faith Christians know least and fear most. The common ground between them is deeper than either side typically admits.",
        readTime: "11 min read",
      },
      {
        title: "What Christians Can Learn From Buddhism",
        slug: "what-christians-can-learn-from-buddhism",
        description:
          "The contemplative traditions of Christianity and Buddhism have been carrying on a quiet conversation for centuries. The church has much to gain from listening.",
        readTime: "11 min read",
      },
      {
        title: "What Christians Can Learn From Indigenous Spirituality",
        slug: "what-christians-can-learn-from-indigenous-spirituality",
        description:
          "The church that destroyed indigenous traditions in the name of Christ had much to learn from the very people it sought to convert. The wisdom it burned is the wisdom it now needs.",
        readTime: "11 min read",
      },
      {
        title: "The Mystics: Christianity's Best-Kept Secret",
        slug: "the-christian-mystics",
        description:
          "The Christian mystical tradition is the faith's deepest current — where theology becomes experience, doctrine becomes encounter, and God is known not by argument but by love.",
        readTime: "12 min read",
      },
      {
        title: "The Spirituality of Doubt",
        slug: "the-spirituality-of-doubt",
        description:
          "Doubt is not the enemy of faith. It is faith's most demanding companion — the one that refuses to let you settle for answers too small for the questions you carry.",
        readTime: "11 min read",
      },
    ],
  },
];
