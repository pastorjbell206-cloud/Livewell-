/**
 * Sermon Series Library — structured preaching plans built from the
 * 60 post-Christian articles. Each series maps 4–8 weeks of sermons
 * with real Scripture, genuine outlines, concrete illustrations, and
 * links back to the article that grounds each week's preparation.
 */

export interface SermonWeek {
  week: number;
  title: string;
  mainText: string;
  secondaryTexts: string[];
  bigIdea: string;
  outline: { point1: string; point2: string; point3: string };
  illustration: string;
  applicationQuestion: string;
  relatedArticle: string;
}

export interface SermonSeriesData {
  title: string;
  slug: string;
  description: string;
  weeks: number;
  audience: string;
  series: SermonWeek[];
}

export const SERMON_SERIES: SermonSeriesData[] = [
  /* ────────────────────────────────────────────────────────────────
   * 1. After Christendom: Faith When the Culture Moves On (6 weeks)
   * ──────────────────────────────────────────────────────────────── */
  {
    title: "After Christendom: Faith When the Culture Moves On",
    slug: "after-christendom-series",
    description:
      "The cultural scaffolding that held Christianity in place for 1,700 years is collapsing. This six-week series traces what we lost, why people are leaving, and what it looks like to rebuild faith without the crutch of cultural support. Not a lament for the past. A preparation for what comes next.",
    weeks: 6,
    audience: "Any congregation wrestling with cultural change",
    series: [
      {
        week: 1,
        title: "The End of an Arrangement",
        mainText: "Jeremiah 29:4-7",
        secondaryTexts: [
          "1 Peter 2:11-12",
          "Daniel 1:1-8",
          "Hebrews 11:13-16",
        ],
        bigIdea:
          "Christendom was an arrangement between the church and the culture, and that arrangement is over — but exile has always been where God's people learn to pray.",
        outline: {
          point1:
            "What Christendom was: the 1,700-year deal where culture carried the faith (Constantine to the courthouse Ten Commandments — what we lost was not the faith but the scaffolding)",
          point2:
            "Why the arrangement ended: not because enemies attacked the church but because the culture outgrew its need for the partnership (secularization, pluralism, institutional betrayal)",
          point3:
            "What Jeremiah told the exiles: build houses, plant gardens, seek the welfare of the city — the posture of faith without power",
        },
        illustration:
          "The moment a small-town pastor realizes the high school football game has been moved to Sunday morning and nobody from the school board thought to call him. Not hostility — irrelevance. That silence is the sound of Christendom ending.",
        applicationQuestion:
          "Where have you been relying on the culture to do the work of faith for you — and what would it look like to do that work yourself?",
        relatedArticle: "the-death-of-christendom",
      },
      {
        week: 2,
        title: "A Faith That Does Not Need the Empire",
        mainText: "Acts 2:42-47",
        secondaryTexts: [
          "Philippians 2:5-11",
          "Matthew 5:13-16",
          "1 Corinthians 1:26-31",
        ],
        bigIdea:
          "The earliest church had no buildings, no budgets, no political access — and it turned the Roman world upside down, because the power was never in the institution.",
        outline: {
          point1:
            "What the post-apostolic church actually looked like: house churches, shared meals, radical economic sharing, voluntary membership that cost something",
          point2:
            "What the church gained and lost after Constantine: buildings, legal standing, cultural prestige — and prophetic distance, voluntary commitment, identification with the margins",
          point3:
            "What Acts 2 offers us now: a picture of Christian community that does not depend on cultural permission",
        },
        illustration:
          "The underground church in China, which has grown from roughly one million believers in 1949 to an estimated 100 million today — without a single megachurch, a single tax exemption, or a single seat at the table of power.",
        applicationQuestion:
          "If your church lost its building, its tax-exempt status, and its place in the community calendar, what would be left?",
        relatedArticle: "christianity-after-christendom",
      },
      {
        week: 3,
        title: "Why They Left",
        mainText: "Matthew 23:1-12",
        secondaryTexts: [
          "Ezekiel 34:1-10",
          "James 1:27",
          "Micah 6:8",
        ],
        bigIdea:
          "Most people who leave the church are not running from God — they are running from a version of the church that failed to look like Jesus.",
        outline: {
          point1:
            "The data on departure: what the research actually shows about why people leave (hypocrisy, political entanglement, anti-intellectualism, moral failures of leaders — not theological liberalism)",
          point2:
            "Jesus's own critique of religious leaders: the heaviest indictment in the Gospels is not aimed at sinners but at the professionally religious",
          point3:
            "The difference between leaving the faith and leaving the institution — and why the church must learn to hear the criticism without dismissing the critic",
        },
        illustration:
          "A twenty-six-year-old woman who grew up in church, memorized more Scripture than most pastors, volunteered every Sunday — and left the day her youth pastor was arrested and the elders' first instinct was to protect the pastor, not the students. She did not lose her faith that day. She lost her trust.",
        applicationQuestion:
          "When someone tells you they left the church, do you listen to understand or listen to refute?",
        relatedArticle: "why-people-are-leaving-the-church",
      },
      {
        week: 4,
        title: "The Fastest-Growing Religion Is None",
        mainText: "Romans 1:19-20",
        secondaryTexts: [
          "Ecclesiastes 3:11",
          "Acts 17:22-28",
          "Psalm 19:1-4",
        ],
        bigIdea:
          "The rise of the religiously unaffiliated is not a story about people rejecting God — it is a story about people rejecting the packaging, and the church must learn the difference.",
        outline: {
          point1:
            "Who the Nones actually are: not militant atheists but spiritual orphans — people who believe in God at high rates but have given up on organized religion (Pew data, 2012-2024)",
          point2:
            "What Paul found in Athens: a city full of spiritual hunger misattached to the wrong objects — and his response was not condemnation but connection",
          point3:
            "What the church must become to reach a generation that is spiritually hungry but institutionally homeless: not louder, not hipper, but more honest",
        },
        illustration:
          "The barista with a tattoo of the Tree of Life, a copy of Thich Nhat Hanh on the counter, and a grandmother who still prays for him every night. He has not stopped searching. He has stopped searching in church. The question is why.",
        applicationQuestion:
          "Do you know someone who identifies as 'spiritual but not religious'? What are they actually looking for — and where have we failed to offer it?",
        relatedArticle: "the-rise-of-the-nones",
      },
      {
        week: 5,
        title: "How to Say What You Believe",
        mainText: "1 Peter 3:15-16",
        secondaryTexts: [
          "Colossians 4:5-6",
          "2 Timothy 2:24-26",
          "Acts 8:26-35",
        ],
        bigIdea:
          "In a post-Christian world, the church does not need better arguments — it needs better conversations, spoken with gentleness, rooted in respect, and earned by the way we live.",
        outline: {
          point1:
            "Why the old evangelistic scripts no longer work: a post-Christian culture has heard the pitch, and what they remember is not the content but the tone",
          point2:
            "Peter's prescription: always be ready — but with gentleness and respect, not volume and certainty",
          point3:
            "The posture that earns a hearing: curiosity before conclusion, presence before proclamation, listening before speaking",
        },
        illustration:
          "A father trying to explain faith to his college-age daughter who has read Nietzsche and Dawkins. He realizes that every apologetics book he owns was written for a world that already believed in God. She does not. He needs a different conversation — one that starts with her questions, not his answers.",
        applicationQuestion:
          "When was the last time you asked a non-Christian what they believe — and actually listened to the answer?",
        relatedArticle: "how-to-talk-about-faith",
      },
      {
        week: 6,
        title: "Building on the Ruins",
        mainText: "Isaiah 58:12",
        secondaryTexts: [
          "Nehemiah 2:17-18",
          "2 Corinthians 5:17-20",
          "Revelation 21:1-5",
        ],
        bigIdea:
          "Reconstructing faith after Christendom is not about going back to something we lost — it is about building forward into something we have never been.",
        outline: {
          point1:
            "What cannot be rebuilt: the cultural monopoly, the social respectability, the default Christianity of the American suburb — and why we should not mourn it",
          point2:
            "What must be rebuilt: thick community, costly discipleship, theological depth married to pastoral warmth, the church as an alternative city within the city",
          point3:
            "Isaiah's promise: you shall be called the repairer of the breach — not the restorer of the old regime but the builder of something new from the rubble",
        },
        illustration:
          "A church in Portland that meets in a brewery on Tuesday nights. No stage, no band, no fog machine. Forty people around tables, eating together, reading Scripture together, arguing about it honestly. Most of them had left other churches. They did not leave the faith — they rebuilt it, smaller and stranger and closer to the ground.",
        applicationQuestion:
          "If you were planting a church from scratch tomorrow — with no model, no denomination, no budget — what would you build?",
        relatedArticle: "reconstructing-faith",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 2. The Story We're In (6 weeks)
   * ──────────────────────────────────────────────────────────────── */
  {
    title: "The Story We're In: A History of Christianity in 6 Weeks",
    slug: "story-were-in",
    description:
      "Most Christians do not know their own story. This adult-education series walks through six turning points that shaped the faith we inherited — from Constantine to Christendom's collapse. Each week pairs the historical narrative with the theological question it raises for us today.",
    weeks: 6,
    audience: "Adult Sunday school or Wednesday night study",
    series: [
      {
        week: 1,
        title: "When the Empire Became Christian",
        mainText: "Matthew 4:8-10",
        secondaryTexts: [
          "Romans 13:1-7",
          "Revelation 13:1-8",
          "John 18:36",
        ],
        bigIdea:
          "When Constantine offered the church the empire, the church said yes — and every subsequent generation has been living with the consequences of that decision.",
        outline: {
          point1:
            "The pre-Constantinian church: persecuted, voluntary, identified with the margins, worshipping in houses and catacombs",
          point2:
            "What changed in 313 AD: the Edict of Milan, imperial patronage, the Council of Nicaea, and the fusion of cross and crown",
          point3:
            "The temptation of power: Jesus refused the kingdoms of the world on a mountain — the church accepted them in a palace",
        },
        illustration:
          "Walk the congregation through the archaeological remains of the house church at Dura-Europos (240 AD) — a converted living room with one wall knocked out, a small baptistery with frescoes — and then show them St. Peter's Basilica. Both are 'church.' The distance between them is the story of Constantine.",
        applicationQuestion:
          "When has the church's pursuit of power compromised its witness — and when has it been tempted to do so in your own community?",
        relatedArticle: "how-christianity-became-an-empire",
      },
      {
        week: 2,
        title: "The Day the Church Split in Two",
        mainText: "John 17:20-23",
        secondaryTexts: [
          "1 Corinthians 1:10-13",
          "Ephesians 4:1-6",
          "Galatians 2:11-14",
        ],
        bigIdea:
          "The Reformation was not a single event but a century of accumulated failures — theological, institutional, moral — that proved a unified church could no longer hold.",
        outline: {
          point1:
            "What the Reformation was actually about: not just Luther's 95 Theses but indulgences, simony, absentee bishops, the Renaissance papacy, and the gap between official theology and lived piety",
          point2:
            "What Luther, Calvin, and the radicals wanted — and how those visions diverged (magisterial vs. radical reformation, state church vs. free church)",
          point3:
            "What the Reformation cost: Christian unity fractured along national lines, the wars of religion, the weaponization of theology for political ends",
        },
        illustration:
          "Read Luther's 95 Theses #82 aloud: 'Why does not the pope empty purgatory for the sake of holy love and the dire need of the souls that are there?' That is not the question of a rebel. It is the question of a pastor who watched a traveling salesman sell his parishioners a lie — and could not stay silent.",
        applicationQuestion:
          "Where do you see the church today compromising its message for institutional survival — and what would it cost to name it?",
        relatedArticle: "what-the-reformation-actually-changed",
      },
      {
        week: 3,
        title: "How the Faith Became American",
        mainText: "Matthew 6:24",
        secondaryTexts: [
          "Deuteronomy 8:11-18",
          "Amos 6:1-7",
          "Jeremiah 7:1-11",
        ],
        bigIdea:
          "American Christianity did not simply import European faith — it reinvented it, blending revivalism, individualism, consumer choice, and national mythology into something the Reformers would not have recognized.",
        outline: {
          point1:
            "The Great Awakenings and the birth of American revivalism: how conversion became a personal experience and church became a voluntary association",
          point2:
            "The fusion of faith and nation: manifest destiny, civil religion, 'one nation under God' (added in 1954), and the dangerous equation of America's story with God's story",
          point3:
            "The market church: how consumer capitalism reshaped American Christianity — church shopping, pastoral celebrities, the megachurch as spiritual shopping mall",
        },
        illustration:
          "In 1801, between 10,000 and 25,000 people gathered at Cane Ridge, Kentucky, for a revival that lasted six days. People fell, shook, barked, and wept. It was chaotic, ecstatic, and utterly unlike anything happening in European cathedrals. That is the moment American Christianity became American — and it has never looked back.",
        applicationQuestion:
          "In what ways has your faith been shaped more by American culture than by Scripture — and how would you tell the difference?",
        relatedArticle: "how-american-christianity-became-american",
      },
      {
        week: 4,
        title: "The Church That Survived What America Did to It",
        mainText: "Psalm 137:1-6",
        secondaryTexts: [
          "Exodus 3:7-10",
          "Luke 4:18-19",
          "Galatians 3:28",
        ],
        bigIdea:
          "The Black church in America forged a theology in the crucible of slavery, segregation, and systemic exclusion — and it produced a Christianity closer to the original than most white churches have ever achieved.",
        outline: {
          point1:
            "The invisible institution: how enslaved people created a Christianity that slaveholders never intended — reinterpreting Exodus, singing liberation into existence, building community under the lash",
          point2:
            "From emancipation to the civil rights movement: the Black church as the institutional spine of African-American survival — Richard Allen, AME, the Black Baptist tradition, and the long road from Reconstruction to Montgomery",
          point3:
            "What the Black church teaches the whole church: a theology tested by suffering, a worship shaped by lament and hope simultaneously, a prophetic tradition that never confused the kingdom of God with the kingdom of America",
        },
        illustration:
          "In 1963, four girls — Addie Mae Collins, Cynthia Wesley, Carole Robertson, and Carol Denise McNair — were killed when white supremacists bombed the 16th Street Baptist Church in Birmingham. The church held services the following Sunday. That is the Black church: faith that buries its dead and then gets up and goes to work.",
        applicationQuestion:
          "What has the Black church's experience taught you about God that you could not have learned in your own tradition?",
        relatedArticle: "the-black-church-in-america",
      },
      {
        week: 5,
        title: "What Evangelicalism Was Supposed to Be",
        mainText: "2 Timothy 4:1-5",
        secondaryTexts: [
          "Galatians 1:6-10",
          "1 Corinthians 2:1-5",
          "Romans 12:1-2",
        ],
        bigIdea:
          "Evangelicalism began as a reform movement — theologically serious, socially engaged, intellectually honest — and it has become something its founders would not recognize.",
        outline: {
          point1:
            "The original vision: Billy Graham, Carl F.H. Henry, Harold Ockenga, and the founding of Fuller Seminary — a movement that wanted to be both intellectually credible and evangelistically urgent",
          point2:
            "The political turn: how the Moral Majority, the culture wars, and the alliance with partisan politics transformed a theological movement into a voting bloc",
          point3:
            "The identity crisis: the gap between what evangelicalism says it believes (biblical authority, the centrality of the cross, the call to conversion) and how it has functioned in public life",
        },
        illustration:
          "Carl F.H. Henry's 1947 book 'The Uneasy Conscience of Modern Fundamentalism' argued that conservative Christians had retreated from social responsibility into cultural isolation. He wanted engagement without compromise. Seventy-five years later, the movement has the engagement — but Henry would not recognize it as his own.",
        applicationQuestion:
          "If evangelicalism started over tomorrow with only the Bible and no political alliances, what would it look like?",
        relatedArticle: "what-evangelicalism-was-supposed-to-be",
      },
      {
        week: 6,
        title: "After the End",
        mainText: "Habakkuk 3:17-19",
        secondaryTexts: [
          "Isaiah 43:18-19",
          "Psalm 46:1-3",
          "Revelation 21:5",
        ],
        bigIdea:
          "Christendom is over. The question is not whether the faith will survive but what kind of faith will emerge from the wreckage — and whether we have the courage to let the old forms die so new ones can live.",
        outline: {
          point1:
            "What ended: not the faith but the civilizational arrangement that carried it — the cultural Christianity of Rotary-club religion, courthouse Bibles, and assumed belief",
          point2:
            "What remains: the gospel itself, undiminished — the death and resurrection of Christ, the call to follow, the promise of the Spirit, the community of the forgiven",
          point3:
            "Habakkuk's posture: even if the fig tree does not bud and there are no grapes on the vines — yet I will rejoice. Faith that does not depend on outcomes.",
        },
        illustration:
          "A pastor in rural New England whose church went from 200 members to 35 in twenty years. He could have left. Instead, he planted a garden on the unused parking lot, started a community meal on Wednesdays, and opened the building to AA meetings. He said: 'We stopped being a church for Christians and started being a church for the neighborhood. It turns out that is what we should have been all along.'",
        applicationQuestion:
          "What part of your faith depends on cultural support — and what would survive if that support disappeared entirely?",
        relatedArticle: "the-death-of-christendom",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 3. Hard Questions, Honest Answers (8 weeks)
   * ──────────────────────────────────────────────────────────────── */
  {
    title: "Hard Questions, Honest Answers",
    slug: "hard-questions-series",
    description:
      "Eight weeks of sermons that take the hardest questions skeptics and doubters ask and refuse to answer them with platitudes. Each week names the question honestly, engages the best thinking on every side, and offers a faith sturdy enough to carry the weight of not knowing everything.",
    weeks: 8,
    audience: "Seekers, doubters, honest questioners",
    series: [
      {
        week: 1,
        title: "Is God Real?",
        mainText: "Psalm 14:1-3",
        secondaryTexts: [
          "Romans 1:19-20",
          "Acts 17:24-28",
          "Job 38:1-7",
        ],
        bigIdea:
          "The question 'Is God real?' deserves more than a Sunday school answer — it deserves the weight of the best arguments on both sides and the honesty to admit what faith actually costs.",
        outline: {
          point1:
            "What honest atheism gets right: the problem of suffering, the absence of empirical proof, the fact that religious claims are often used to manipulate — these are not trivial objections, and pretending they are insults both the questioner and the God we claim to worship",
          point2:
            "What the classical arguments actually offer: not proof but rational warrant — the cosmological argument (why is there something rather than nothing?), the moral argument (why do we sense that some things are objectively wrong?), the argument from consciousness (why does anything experience anything at all?)",
          point3:
            "Faith as trust, not certainty: the biblical writers did not have 'proof' of God — they had encounter, and the encounter was enough to stake their lives on",
        },
        illustration:
          "C.S. Lewis was an atheist who became a Christian reluctantly. He called himself 'the most dejected and reluctant convert in all England.' He did not come to faith through warm feelings or a revival service. He came through argument, reading, and an intellectual honesty that forced him to follow the evidence past the point of comfort. Faith that costs nothing convinces no one.",
        applicationQuestion:
          "If you are a believer: when was the last time you sat with the possibility that you might be wrong? If you are a doubter: when was the last time you sat with the possibility that you might be right to keep searching?",
        relatedArticle: "is-god-real",
      },
      {
        week: 2,
        title: "If God Is Good, Why Is There So Much Suffering?",
        mainText: "Job 2:11-13",
        secondaryTexts: [
          "Romans 8:18-28",
          "Psalm 22:1-2",
          "Lamentations 3:22-33",
        ],
        bigIdea:
          "The problem of suffering is the strongest argument against God — and the one place where Christianity, alone among worldviews, refuses to give a tidy answer, because it offers instead a God who enters the suffering.",
        outline: {
          point1:
            "The argument stated honestly: if God is all-powerful and all-good, suffering should not exist — the logical problem of evil (Epicurus, David Hume, Mackie) deserves more than dismissal",
          point2:
            "What Job's friends got wrong: they had answers. God had questions. The entire book of Job is a rebuke of tidy theology applied to untidy suffering — and the church has been playing the role of Job's friends ever since",
          point3:
            "What the cross means for suffering: not an explanation but a response — God did not stand outside human pain and explain it. God entered it, absorbed it, and transformed it from the inside. That is not a philosophical argument. It is a claim about the character of God.",
        },
        illustration:
          "When Rabbi Harold Kushner's three-year-old son was diagnosed with progeria (rapid aging syndrome) and died at fourteen, Kushner wrote 'When Bad Things Happen to Good People.' His answer — that God is good but not omnipotent — is honest but incomplete. The Christian claim is stranger: God is omnipotent and chose the cross. Power expressed as suffering. That is harder to believe — and harder to dismiss.",
        applicationQuestion:
          "Has suffering drawn you closer to God or pushed you further away? What does that tell you about your image of who God is?",
        relatedArticle: "why-does-god-allow-suffering",
      },
      {
        week: 3,
        title: "Can You Trust the Bible?",
        mainText: "2 Timothy 3:14-17",
        secondaryTexts: [
          "Psalm 119:105",
          "Hebrews 4:12",
          "John 5:39-40",
        ],
        bigIdea:
          "The Bible is not a magic book that fell from heaven — it is a library of texts written by real people in real contexts, and understanding how it was made does not destroy its authority; it reveals a different kind of authority than the one we expected.",
        outline: {
          point1:
            "What the Bible actually is: 66 books, 40+ authors, written over 1,500 years, in three languages, across multiple genres (history, poetry, law, prophecy, letter, apocalyptic) — not a textbook but a library",
          point2:
            "The manuscript evidence honestly assessed: over 5,800 Greek manuscripts of the New Testament (more than any ancient document), the Dead Sea Scrolls, textual criticism and what it reveals — not a perfect transmission but a remarkably reliable one",
          point3:
            "A better question than 'Is it inerrant?': does this book, when read faithfully and in community, put you in contact with the living God? The Bible's authority is not the authority of a legal code but the authority of a love letter — it is trustworthy because of who wrote it and what it reveals",
        },
        illustration:
          "A seminary student in her first textual-criticism class discovers that the ending of Mark (16:9-20) was not in the earliest manuscripts. She feels the ground shift beneath her. Her professor says: 'If your faith depends on every comma being original, your faith is in the wrong thing. The question is not whether the Bible is perfect. The question is whether it is true.' She did not lose her Bible that day. She found it.",
        applicationQuestion:
          "Has your understanding of biblical authority been stretched or challenged? What are you afraid of finding — and what might you gain?",
        relatedArticle: "can-you-trust-the-bible",
      },
      {
        week: 4,
        title: "Did Jesus Actually Exist?",
        mainText: "John 1:14",
        secondaryTexts: [
          "1 Corinthians 15:3-8",
          "Luke 1:1-4",
          "Hebrews 1:1-3",
        ],
        bigIdea:
          "The historical evidence for Jesus of Nazareth is stronger than most people realize — but the real question is not whether he existed but whether the claims made about him can bear the weight of a life.",
        outline: {
          point1:
            "The historical evidence outside the Bible: Tacitus, Josephus, Pliny the Younger, the Talmud — non-Christian sources that confirm the existence of Jesus and the early church (virtually no serious historian doubts Jesus existed)",
          point2:
            "What critical scholarship agrees on: an itinerant Jewish teacher from Galilee, baptized by John, gathered followers, was crucified under Pontius Pilate around 30-33 AD — the minimal facts that even skeptical scholars accept (Bart Ehrman, E.P. Sanders)",
          point3:
            "The leap from history to faith: the evidence establishes the person but not the claim. The claim that this person was God incarnate is not a historical conclusion — it is a decision, made in the presence of evidence and in the absence of proof. John's word for it is 'the Word became flesh.' That is not a fact you verify. It is a reality you enter.",
        },
        illustration:
          "Bart Ehrman, perhaps the most famous agnostic New Testament scholar alive, has spent his career arguing that the Bible is riddled with contradictions and that orthodox Christianity misrepresents its own origins. But even Ehrman says: 'The idea that Jesus did not exist is a conspiracy theory. The evidence is overwhelming that he did.' The debate was never about whether he existed. It was about who he was.",
        applicationQuestion:
          "If you could ask the historical Jesus one question, what would it be — and what does that question reveal about what you are really searching for?",
        relatedArticle: "the-historical-jesus",
      },
      {
        week: 5,
        title: "Are Science and Faith at War?",
        mainText: "Psalm 19:1-6",
        secondaryTexts: [
          "Proverbs 25:2",
          "Genesis 1:1",
          "Colossians 1:15-17",
        ],
        bigIdea:
          "The supposed war between science and faith was invented in the nineteenth century — and most of the Christians who shaped modern science never heard of it.",
        outline: {
          point1:
            "The warfare thesis debunked: the 'conflict model' (Draper 1874, White 1896) was ideological propaganda, not historical scholarship — most historians of science have abandoned it (see Numbers, Harrison, Brooke)",
          point2:
            "The Christians who built science: Copernicus (canon lawyer), Kepler (Lutheran who described astronomy as 'thinking God's thoughts after him'), Newton (wrote more theology than physics), Faraday (elder in the Sandemanian church), Lemaitre (the priest who proposed the Big Bang)",
          point3:
            "How to hold science and faith together: not by making the Bible a science textbook but by recognizing that Scripture answers 'why' and science answers 'how' — different questions, not competing answers",
        },
        illustration:
          "Georges Lemaitre, a Belgian priest and physicist, proposed the Big Bang theory in 1927. When Pope Pius XII tried to use it as proof of creation, Lemaitre objected — not because he lacked faith but because he understood that using science to prove theology cheapens both. He wanted the science to stand on its own evidence and the faith to stand on its own grounds. That is intellectual integrity.",
        applicationQuestion:
          "Where has the supposed conflict between science and faith caused you to suppress either honest inquiry or genuine belief? What would it look like to hold both?",
        relatedArticle: "science-and-faith-are-not-at-war",
      },
      {
        week: 6,
        title: "What About Hell?",
        mainText: "Matthew 25:31-46",
        secondaryTexts: [
          "Revelation 20:11-15",
          "Romans 2:1-11",
          "1 Timothy 2:3-4",
        ],
        bigIdea:
          "The church has never spoken with one voice about hell — and the diversity of the tradition is not a weakness but an invitation to take the question more seriously than a bumper sticker allows.",
        outline: {
          point1:
            "Three views the church has held: eternal conscious torment (Augustine, most of Western tradition), annihilationism/conditional immortality (Stott, Fudge — the unrepentant cease to exist), and universal reconciliation (Origen, Gregory of Nyssa, some contemporary theologians — God's love ultimately wins everyone)",
          point2:
            "What Jesus actually said: the majority of hell language in the New Testament comes from Jesus himself — Gehenna, outer darkness, weeping and gnashing of teeth — but the imagery is varied and resists systematic reduction",
          point3:
            "Why the question matters: hell is not a secondary doctrine. It touches the character of God, the meaning of justice, the nature of human freedom, and the scope of the atonement. Getting it wrong in either direction — trivializing evil or caricaturing God — has enormous pastoral consequences",
        },
        illustration:
          "C.S. Lewis in 'The Great Divorce' imagines hell not as a place God sends people but as a place people choose — a gray, joyless town where everyone has moved further and further from their neighbors because they cannot bear community. 'The doors of hell,' Lewis wrote, 'are locked from the inside.' That image does not settle the debate. But it reframes it: hell is not about a God who tortures. It is about a freedom God will not violate.",
        applicationQuestion:
          "What do you believe about hell — and is your belief based on Scripture, tradition, or a reaction against something you were taught?",
        relatedArticle: "what-christians-believe-about-hell",
      },
      {
        week: 7,
        title: "The Problem with Certainty",
        mainText: "1 Corinthians 13:12",
        secondaryTexts: [
          "Hebrews 11:1",
          "Mark 9:24",
          "Job 42:1-6",
        ],
        bigIdea:
          "The opposite of faith is not doubt — it is certainty, because certainty does not need God, and the Bible never promises it.",
        outline: {
          point1:
            "What certainty actually costs: epistemological certainty (I know that I know) creates a faith that cannot be questioned, and a faith that cannot be questioned cannot grow — it can only harden or shatter",
          point2:
            "The biblical witness to doubt: Abraham laughed, Moses argued, Elijah wanted to die, the Psalms are full of complaint, Thomas demanded proof, Peter denied Christ three times — the heroes of the faith are not models of certainty. They are models of persistence through uncertainty.",
          point3:
            "Faith as trust, not knowledge: 'Now we see through a glass darkly' — Paul's statement is not a concession but a definition. Faith is the substance of things hoped for, the evidence of things not seen. If you could see them, you would not need faith.",
        },
        illustration:
          "Mother Teresa's private letters, published after her death, revealed that she spent nearly fifty years experiencing what she called 'the darkness' — the complete absence of any felt sense of God's presence. She went to daily Mass, she served the dying, she built an order of thousands of nuns — all without feeling. When asked how, she said: 'I have faith.' Not certainty. Faith. The difference is everything.",
        applicationQuestion:
          "Where are you holding on to certainty because you are afraid of what faith without it would require?",
        relatedArticle: "the-problem-with-certainty",
      },
      {
        week: 8,
        title: "Why Christianity?",
        mainText: "John 14:6",
        secondaryTexts: [
          "Acts 4:12",
          "Philippians 2:9-11",
          "Micah 6:8",
        ],
        bigIdea:
          "Christianity does not claim to be the best religion — it claims that God entered history in a particular person, in a particular place, at a particular time, and that this changes everything.",
        outline: {
          point1:
            "The honest pluralist question: in a world of many religions, why should anyone choose Christianity? The question deserves more than 'because the Bible says so' — it deserves an encounter with what Christianity actually claims",
          point2:
            "What makes Christianity distinct: not a moral code (other religions have those), not a community (other religions build those), but the incarnation — the claim that God became human, suffered, died, and rose. No other major religion makes this claim. It is either the most important truth in history or the most elaborate delusion.",
          point3:
            "An invitation, not an ultimatum: 'Come and see' (John 1:46) was Jesus's first evangelistic strategy. Not 'believe or else.' Not 'here is the proof.' Come and see. The faith is not a conclusion to be argued into. It is a life to be entered.",
        },
        illustration:
          "Lesslie Newbigin spent thirty-five years as a missionary in India. When he returned to England in 1974, he discovered that the hardest mission field was not Hindu India but secular Britain. He wrote: 'The gospel is not a set of ideas to be debated. It is a story to be told, a life to be lived, and a community to be joined.' Christianity does not win arguments. It wins people — one at a time, slowly, by the quality of the life it produces.",
        applicationQuestion:
          "If someone asked you, 'Why Christianity and not something else?' — what would you say? And would your life back up your answer?",
        relatedArticle: "why-christianity",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 4. When the Church Hurts (4 weeks)
   * ──────────────────────────────────────────────────────────────── */
  {
    title: "When the Church Hurts",
    slug: "when-church-hurts-series",
    description:
      "A four-week series for congregations willing to examine themselves. Addresses religious trauma, spiritual abuse, the church's failures around mental health, and what it takes to become a community that heals rather than harms. Not comfortable. Not optional.",
    weeks: 4,
    audience: "Congregations doing self-examination",
    series: [
      {
        week: 1,
        title: "The Wound That Wears a Cross",
        mainText: "Matthew 18:1-6",
        secondaryTexts: [
          "Ezekiel 34:1-6",
          "Mark 9:42",
          "Psalm 55:12-14",
        ],
        bigIdea:
          "Religious trauma is not a sign of weak faith — it is the predictable result of spiritual authority exercised without accountability, and the church must stop blaming the wounded for bleeding.",
        outline: {
          point1:
            "What religious trauma actually is: clinically recognized psychological harm caused by authoritarian religious environments — not disagreement with doctrine but damage done in God's name (Marlene Winell, the Religious Trauma Institute)",
          point2:
            "How it happens: fear-based theology (eternal conscious torment as a behavior-management tool), shame cycles (purity culture, public confession, shunning), epistemic abuse (you cannot trust your own thinking, only the leader's interpretation), isolation from outside support systems",
          point3:
            "What Jesus said about those who harm the vulnerable: 'It would be better for him if a millstone were hung around his neck and he were thrown into the sea' — the strongest language Jesus ever used was reserved for religious leaders who damaged the people in their care",
        },
        illustration:
          "A man in his forties tells you he cannot walk into a church without his hands shaking. He grew up in a congregation where every doubt was evidence of demonic influence, every question was rebellion, and every normal adolescent mistake was met with public confession before the entire body. He loves Jesus. He is terrified of church. Both of those things are true at the same time — and until the church can hold both, it cannot help him.",
        applicationQuestion:
          "Is there someone you know who was hurt by a church? What would it look like to believe them before you defend the institution?",
        relatedArticle: "religious-trauma-is-real",
      },
      {
        week: 2,
        title: "When Leaders Become Lords",
        mainText: "1 Peter 5:1-4",
        secondaryTexts: [
          "3 John 1:9-10",
          "Matthew 20:25-28",
          "Acts 20:28-30",
        ],
        bigIdea:
          "Spiritual abuse is not a personality problem — it is a structural problem, and it thrives in churches that confuse leadership with lordship and loyalty with silence.",
        outline: {
          point1:
            "What spiritual abuse looks like: the weaponization of Scripture to control behavior, the conflation of disagreement with disloyalty, financial opacity, sexual exploitation cloaked in spiritual language, the isolation of victims through church discipline used as a silencing mechanism",
          point2:
            "Why structures matter more than intentions: abuse thrives where accountability is absent — single-leader governance without elder oversight, financial secrecy, NDAs for departing staff, membership covenants that function as legal contracts, no external denominational checks",
          point3:
            "Peter's prescription: shepherd the flock 'not lording it over those entrusted to you, but being examples.' The image is pastoral, not monarchical. The pastor is a fellow elder, not a CEO. The moment a leader cannot be questioned is the moment the community is in danger.",
        },
        illustration:
          "Mars Hill Church in Seattle grew to 15,000 members under Mark Driscoll's leadership before collapsing in 2014 under the weight of well-documented allegations of bullying, plagiarism, and authoritarian governance. The elders who tried to raise concerns were fired. The members who asked questions were disciplined. The structure did not fail — it worked exactly as designed. It was designed to protect the leader, not the people.",
        applicationQuestion:
          "Does your church have structures in place that would catch a leader who was abusing power? If the answer is 'We trust our pastor,' that is not a structure — it is a vulnerability.",
        relatedArticle: "spiritual-abuse-how-good-theology-gets-weaponized",
      },
      {
        week: 3,
        title: "The Body That Does Not Know It Is Broken",
        mainText: "Romans 12:15",
        secondaryTexts: [
          "Psalm 42:1-5",
          "2 Corinthians 1:3-5",
          "Galatians 6:2",
        ],
        bigIdea:
          "The church has treated mental illness as a spiritual failure for generations — and until we repent of that, we will keep losing people who needed a hospital and got a sermon instead.",
        outline: {
          point1:
            "The damage done: how 'pray harder,' 'you must have unconfessed sin,' and 'take every thought captive' became the church's mental health plan — and how many people it harmed (the suicide of pastors, the shaming of depression, the dismissal of clinical anxiety as spiritual weakness)",
          point2:
            "What the Bible actually models: David's psalms of despair (Psalm 88 ends without resolution), Elijah's suicidal depression (1 Kings 19), Jeremiah the weeping prophet — Scripture does not sanitize mental anguish. The church should not either.",
          point3:
            "What a healthy church does: integrates pastoral care with professional mental health, destigmatizes medication and therapy from the pulpit, trains small-group leaders to recognize warning signs, makes 'I am not okay' a safe sentence in the community",
        },
        illustration:
          "A pastor's wife sits in the car in the church parking lot every Sunday for ten minutes before going inside, trying to stop crying. She has clinical depression. She cannot tell anyone because her husband's job depends on their family looking healthy. She smiles in the foyer, teaches Sunday school, and goes home and lies in the dark. The church does not know. The church has made it impossible for her to tell them.",
        applicationQuestion:
          "If someone in your congregation said, 'I am on antidepressants,' would the first response be compassion or concern? What does that response reveal about your theology of the body?",
        relatedArticle: "church-and-mental-health",
      },
      {
        week: 4,
        title: "A Church Worth Staying In",
        mainText: "Hebrews 10:24-25",
        secondaryTexts: [
          "1 John 4:7-12",
          "Colossians 3:12-17",
          "Acts 2:42-47",
        ],
        bigIdea:
          "A church worth staying in is not a church without problems — it is a church that deals with its problems honestly, protects the vulnerable ruthlessly, and practices the kind of love that costs something.",
        outline: {
          point1:
            "What to look for: transparent governance, financial accountability, a leadership culture that welcomes questions, a theology robust enough to hold doubt, a community where weakness is not punished",
          point2:
            "What to avoid: personality cults, financial secrecy, membership covenants that restrict your freedom to leave, 'touch not God's anointed' used to silence criticism, a growth-at-all-costs mentality that sacrifices people for numbers",
          point3:
            "What the church is called to be: not a performance venue but a community of practice — the place where you are known, where confession is safe, where the bread is broken, and where the weakest member matters as much as the strongest",
        },
        illustration:
          "A small church in a Midwest college town lost half its congregation during a denominational split. The remaining fifty people had a choice: close the doors or reimagine. They chose to reimagine. They put their finances online for anyone to see. They created an elder board with term limits and external accountability. They started a relationship with a local therapist who attends for free. Ten years later, they are still fifty people — and every one of them chose to be there.",
        applicationQuestion:
          "If you were describing the healthiest church you can imagine — not the biggest, not the most exciting, but the healthiest — what would it look like? Are you building that?",
        relatedArticle: "finding-a-good-church",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 5. Raising Faith in a Post-Christian World (5 weeks)
   * ──────────────────────────────────────────────────────────────── */
  {
    title: "Raising Faith in a Post-Christian World",
    slug: "raising-faith-series",
    description:
      "Five weeks for parents who are trying to hand down a faith they themselves are still working out — in a culture that no longer carries the weight for them. Not a parenting tips series. A theological framework for the hardest assignment most Christians will ever receive.",
    weeks: 5,
    audience: "Parents",
    series: [
      {
        week: 1,
        title: "You Cannot Give What You Do Not Have",
        mainText: "Deuteronomy 6:4-9",
        secondaryTexts: [
          "Psalm 78:1-8",
          "2 Timothy 1:5",
          "Proverbs 22:6",
        ],
        bigIdea:
          "Before you can raise children of faith, you must reckon with the state of your own — because kids do not inherit beliefs. They inherit practices, and they absorb honesty.",
        outline: {
          point1:
            "The Deuteronomy model: 'These words shall be on YOUR heart' — the command begins with the parent's formation, not the child's indoctrination. You teach what you are, not what you lecture.",
          point2:
            "Why cultural Christianity can no longer carry the weight: in previous generations, Sunday school, church camp, and community norms did the heavy lifting. Those structures are gone. What remains is the home — and the home must become what the culture used to be.",
          point3:
            "What honest faith looks like as a parent: not having all the answers but modeling the posture of a person who takes the questions seriously — praying with your kids, reading Scripture as a family practice (not a homework assignment), being willing to say 'I don't know, but let's look together'",
        },
        illustration:
          "A father realizes his fourteen-year-old daughter has never seen him read the Bible outside of church. She has seen him watch football, read the news, scroll his phone for hours. She has memorized what he actually values — not by what he says but by what she has watched him do every day for fourteen years. That is Deuteronomy 6: the faith you practice is the faith you pass on. Everything else is words.",
        applicationQuestion:
          "If your children could only learn about faith by watching your daily life — never hearing a sermon, never attending a service — what would they conclude?",
        relatedArticle: "raising-kids-post-christian",
      },
      {
        week: 2,
        title: "The Conversation They Are Already Having Without You",
        mainText: "1 Peter 3:15-16",
        secondaryTexts: [
          "Colossians 4:5-6",
          "Proverbs 18:13",
          "James 1:19",
        ],
        bigIdea:
          "Your children are already having conversations about God, suffering, sexuality, and meaning — the only question is whether you are part of those conversations or excluded from them.",
        outline: {
          point1:
            "The information gap: your children have access to Bart Ehrman lectures, Reddit atheism threads, and TikTok theology before they are sixteen. They are not asking whether to engage these ideas — they are asking whether you are a safe person to process them with.",
          point2:
            "Why the old scripts fail: 'Because the Bible says so' works until it does not — and when it stops working, if that is all you gave them, they have nothing left. Faith must be thick enough to sustain questioning.",
          point3:
            "How to talk about faith without losing your kids: lead with curiosity, not correction. Ask what they think before telling them what to think. Make your home the one place where no question gets you in trouble. The goal is not to win the argument. The goal is to stay in the conversation.",
        },
        illustration:
          "A mother finds her sixteen-year-old son watching a YouTube video called 'Why I Left Christianity.' Her instinct is to shut it off. Instead, she sits down and watches it with him. Afterward, she says: 'Some of those points are fair. Which ones hit you hardest?' That moment — the willingness to engage rather than censor — is worth more than ten years of Sunday school answers.",
        applicationQuestion:
          "Is your home a place where your children can bring their hardest questions without fear of punishment or disappointment?",
        relatedArticle: "how-to-talk-about-faith",
      },
      {
        week: 3,
        title: "Teaching Them to Doubt Well",
        mainText: "Mark 9:24",
        secondaryTexts: [
          "Jude 1:22",
          "Psalm 73:1-17",
          "Habakkuk 1:2-4",
        ],
        bigIdea:
          "The most dangerous thing you can do for your children's faith is protect them from doubt — because doubt that is suppressed does not disappear; it detonates.",
        outline: {
          point1:
            "Why doubt is not the enemy: faith that has never been tested is not faith — it is assumption. The psalms are full of honest wrestling. The father in Mark 9 said 'I believe; help my unbelief!' — and Jesus did not rebuke him. He healed his son.",
          point2:
            "The deconstruction wave and what it means for parents: many young adults who 'lose their faith' in college are actually losing an unexamined faith that was never built to carry adult weight. The best prevention is not more certainty — it is earlier, safer, more honest engagement with hard questions.",
          point3:
            "How to create a home where doubt is safe: normalize questions at the dinner table. Read Christian thinkers who engage with doubt (Lewis, Buechner, Lamott). Do not treat every question as a crisis. Some questions are invitations to deeper faith — if you do not panic.",
        },
        illustration:
          "Asaph, the psalmist, wrote Psalm 73 about nearly losing his faith when he saw the wicked prosper and the righteous suffer. He was honest: 'My feet had almost stumbled.' But he did not stop there. He went to the temple — he stayed in community — and his perspective shifted. The doubt was real. The faith was real. Both lived in the same person at the same time. That is what you are teaching your children is possible.",
        applicationQuestion:
          "When your child expresses doubt, does your first instinct point toward correction or toward companionship? Which one builds a faith that lasts?",
        relatedArticle: "the-spirituality-of-doubt",
      },
      {
        week: 4,
        title: "Faith in a Digital World",
        mainText: "Philippians 4:8",
        secondaryTexts: [
          "Proverbs 4:23",
          "Romans 12:1-2",
          "Psalm 101:2-4",
        ],
        bigIdea:
          "The phone in your child's pocket is the most powerful discipleship tool ever invented — and it is discipling them every hour of every day into someone's vision of the good life.",
        outline: {
          point1:
            "The discipleship machine: algorithms are not neutral — they are formation systems designed to capture attention, shape desire, and monetize identity. Instagram, TikTok, and YouTube are catechizing your children more hours per week than your church ever will.",
          point2:
            "What is being formed: the constant scroll trains a disposition — impatience, comparison, performance anxiety, the reduction of identity to curated image. These are not morally neutral habits. They are counter-liturgies (James K.A. Smith) that shape the kind of people our children become.",
          point3:
            "A counter-formation strategy: not prohibition (which rarely works) but intentional competing practices — Sabbath from screens, family meals without devices, physical presence with real people, reading (not scrolling), prayer as the first and last act of the day rather than the phone",
        },
        illustration:
          "A family decides to put all phones in a basket during dinner — including the parents' phones. The first week, the fourteen-year-old protests. The second week, the twelve-year-old starts telling stories about school. By the third week, the dad realizes he had not heard his daughter laugh in weeks because he was always looking at his own screen. The basket is not a rule. It is a resurrection.",
        applicationQuestion:
          "What would your family look like with one screen-free evening per week? What are you afraid would happen — and what might actually happen?",
        relatedArticle: "digital-discipleship",
      },
      {
        week: 5,
        title: "When They Walk Away",
        mainText: "Luke 15:11-24",
        secondaryTexts: [
          "Proverbs 22:6",
          "Isaiah 49:15-16",
          "Romans 8:38-39",
        ],
        bigIdea:
          "The hardest moment in a parent's faith is when their child walks away from it — and the only response that keeps the door open is the one the father in the parable chose: he did not chase. He waited. And he never stopped watching the road.",
        outline: {
          point1:
            "Why they leave: sometimes it is rebellion, but more often it is integrity — they cannot hold what they were given because it was not built to hold them. Some leave the institution but keep the faith. Some leave both. Some come back different.",
          point2:
            "What not to do: guilt, manipulation, theological threats, emotional withdrawal, treating their departure as a personal failure or a betrayal. Every one of those responses closes the door that love keeps open.",
          point3:
            "What the father did: he let his son go. He did not follow him to the far country. He did not send messengers. He did not write him out of the will. He waited — and when the son returned, he ran. The parable is not about the son's repentance. It is about the father's love. That love is what keeps the road home visible.",
        },
        illustration:
          "A mother whose adult son has not been to church in seven years still sets a place for him at the Thanksgiving table. She does not lecture him about faith. She does not forward him sermon links. She calls him every Wednesday, asks about his work, laughs at his stories, and prays for him after she hangs up. Last Easter, he called her and said: 'Mom, I went to a church today. Just wanted you to know.' Seven years of waiting. One phone call. That is the parable, lived.",
        applicationQuestion:
          "If your child walked away from the faith tomorrow, would they still feel welcome in your home? Would they still call?",
        relatedArticle: "family-and-faith-transitions",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 6. What the Bible Actually Says (6 weeks)
   * ──────────────────────────────────────────────────────────────── */
  {
    title: "What the Bible Actually Says",
    slug: "what-bible-says-series",
    description:
      "Six weeks on topics everyone has opinions about and few have studied carefully. Money, suffering, marriage, anger, rest, and justice — what the full witness of Scripture says, not what the bumper sticker says. Expects the congregation to handle complexity.",
    weeks: 6,
    audience: "Any congregation",
    series: [
      {
        week: 1,
        title: "What the Bible Actually Says About Money",
        mainText: "1 Timothy 6:6-10",
        secondaryTexts: [
          "Proverbs 30:8-9",
          "Luke 12:13-21",
          "Matthew 6:19-24",
        ],
        bigIdea:
          "The Bible does not say money is evil — it says the love of money is the root of all kinds of evil, and the difference between those two statements is the difference between stewardship and guilt.",
        outline: {
          point1:
            "What the prosperity gospel gets wrong: 'Name it and claim it' theology distorts the Bible's actual teaching on wealth. God does not promise financial reward for faith. Jesus was poor. Paul was poor. The early church shared everything. Prosperity theology inverts the gospel — it makes God a vending machine and faith a transaction.",
          point2:
            "What poverty theology gets wrong: the opposite error treats any wealth as inherently sinful. But Proverbs celebrates the industrious. Abraham was wealthy. Job was restored. The Bible is not anti-wealth — it is anti-idolatry. The question is never 'How much do you have?' The question is 'What does it have on you?'",
          point3:
            "The biblical ethic of enough: Agur's prayer in Proverbs 30 — 'give me neither poverty nor riches.' Paul's content in all circumstances. The parable of the rich fool: a man whose barns were full and whose soul was empty. The Bible does not demand poverty. It demands that money never becomes the thing that names you.",
        },
        illustration:
          "John Wesley earned the equivalent of $160,000 per year from his writings. He lived on $20,000 and gave the rest away. When asked why, he quoted Luke 16:9: 'Make friends for yourselves by means of unrighteous wealth, so that when it fails they may receive you into the eternal dwellings.' Wesley did not hate money. He refused to let it own him. That is the biblical posture: hold it with an open hand.",
        applicationQuestion:
          "If someone looked at your bank statement, what would they conclude about what you worship?",
        relatedArticle: "prosperity-gospel-is-not-the-gospel",
      },
      {
        week: 2,
        title: "What the Bible Actually Says About Suffering",
        mainText: "2 Corinthians 4:7-12",
        secondaryTexts: [
          "Romans 5:3-5",
          "James 1:2-4",
          "Psalm 88:1-9",
        ],
        bigIdea:
          "The Bible does not explain suffering — it enters it, and the difference between an explanation and a presence is the difference between a lecture and a hand in the dark.",
        outline: {
          point1:
            "What the Bible does NOT say: it does not say suffering is always punishment (Job refutes that). It does not say suffering is always for your growth (tell that to a child with cancer). It does not say 'everything happens for a reason' — that phrase is not in the Bible. Romans 8:28 says God works in all things, not that God causes all things.",
          point2:
            "What the Bible does say: suffering is real, suffering is not the last word, and God is present in it. Psalm 88 — the only psalm that ends in darkness — proves that Scripture makes room for unredeemed pain. Not every story has a third act in this life.",
          point3:
            "The crucified God: the distinctive Christian claim is not that God prevents suffering but that God enters it. The cross is not theodicy. It is solidarity. 'We have this treasure in jars of clay' — the power is in the weakness, not despite it.",
        },
        illustration:
          "Nicholas Wolterstorff, the Yale philosopher, lost his twenty-five-year-old son Eric in a mountain-climbing accident. In 'Lament for a Son,' he wrote: 'I shall look at the world through tears. Perhaps I shall see things that dry-eyed I could not see.' He did not find an answer. He found a God who weeps. That is what the Bible actually says about suffering: not an answer but a companion.",
        applicationQuestion:
          "When you suffer, do you need an explanation or a presence? And which one does the church tend to offer?",
        relatedArticle: "why-does-god-allow-suffering",
      },
      {
        week: 3,
        title: "What the Bible Actually Says About Marriage",
        mainText: "Ephesians 5:21-33",
        secondaryTexts: [
          "Genesis 2:18-24",
          "1 Corinthians 7:1-9",
          "Song of Solomon 8:6-7",
        ],
        bigIdea:
          "The Bible's vision of marriage is more radical, more demanding, and more beautiful than either the traditional or progressive caricature allows — because it is not about roles. It is about mutual sacrifice so complete that two people become an icon of Christ's love for the world.",
        outline: {
          point1:
            "What Ephesians 5 actually says: the passage begins with 'Submit to one another' (v. 21) — mutual submission is the frame, not unilateral authority. The husband is told to love as Christ loved the church, which means to die for her. That is not a privilege. It is a crucifixion.",
          point2:
            "What the Old Testament reveals: marriage in Genesis is not hierarchy — it is partnership. 'It is not good for the man to be alone.' The word for Eve — ezer — is used elsewhere in the Old Testament for God as Israel's helper. This is not a subordinate role. It is a rescuing presence.",
          point3:
            "What Paul adds in 1 Corinthians 7: the body of the husband belongs to the wife, and the body of the wife belongs to the husband — a radical mutual claim that would have been scandalous in the first century, where wives were property. Paul is not reinforcing patriarchy. He is dismantling it.",
        },
        illustration:
          "Tim Keller, in 'The Meaning of Marriage,' tells the story of a couple who came to him for counseling. The husband said: 'I married the wrong person.' Keller responded: 'Of course you did. So did she. Everyone marries the wrong person — because marriage is not about finding the right person. It is about becoming the right person.' That reframe is Ephesians 5: marriage as a school for dying to self.",
        applicationQuestion:
          "Is your marriage shaped more by the culture's vision of romance and personal fulfillment, or by the Bible's vision of mutual sacrifice? What would need to change?",
        relatedArticle: "interfaith-marriage",
      },
      {
        week: 4,
        title: "What the Bible Actually Says About Anger",
        mainText: "Ephesians 4:26-27",
        secondaryTexts: [
          "James 1:19-20",
          "Psalm 4:4",
          "John 2:13-17",
        ],
        bigIdea:
          "The Bible does not condemn anger — it commands it to be exercised rightly, because a church that cannot get angry at injustice has nothing prophetic left to say.",
        outline: {
          point1:
            "What Paul actually says: 'Be angry and do not sin' — the command is not 'stop being angry.' The command is 'be angry without destroying.' The distinction is between anger as a moral signal (something is wrong) and anger as a weapon (I will hurt you because I am hurt).",
          point2:
            "Jesus's anger: the cleansing of the temple was not a calm, symbolic act. Jesus made a whip. He overturned tables. He drove out the money changers. This was prophetic rage — directed not at sinners but at religious leaders who were exploiting the vulnerable. If Jesus could be angry, anger itself is not sin.",
          point3:
            "What makes anger sinful: when it becomes cruelty, when it refuses reconciliation, when it seeks revenge rather than justice, when it is directed at the powerless rather than the powerful, when it hardens into bitterness that poisons the one who carries it",
        },
        illustration:
          "Frederick Buechner wrote: 'Of the Seven Deadly Sins, anger is possibly the most fun. To lick your wounds, to smack your lips over grievances long past, to roll over your tongue the prospect of bitter confrontations still to come, to savor to the last toothsome morsel both the pain you are given and the pain you are giving back — in many ways it is a feast fit for a king. The chief drawback is that what you are wolfing down is yourself.' That is the difference: righteous anger seeks justice. Toxic anger eats the one who holds it.",
        applicationQuestion:
          "What makes you angry? Is your anger aimed at the right target — and are you willing to let it go before it becomes bitterness?",
        relatedArticle: "when-politics-replaced-theology",
      },
      {
        week: 5,
        title: "What the Bible Actually Says About Rest",
        mainText: "Exodus 20:8-11",
        secondaryTexts: [
          "Mark 2:27",
          "Genesis 2:2-3",
          "Hebrews 4:9-11",
        ],
        bigIdea:
          "The Sabbath is not a suggestion — it is a commandment, and the fact that the church ignores it while obsessing over other commandments reveals more about our idolatries than we want to admit.",
        outline: {
          point1:
            "Why God rested: not because God was tired but because rest is built into the fabric of creation. The seventh day is not an afterthought — it is the climax. God's first full day with the humans he made was a day of rest. That is not an accident. It is a theology.",
          point2:
            "What the Sabbath was for Israel: an act of resistance against empire. In Egypt, there were no days off — Pharaoh's economy ran on exhaustion. The Sabbath said: you are not slaves. Your worth is not measured by your output. You are human beings, not production units. To rest is to declare that God, not Pharaoh, runs the world.",
          point3:
            "Why we resist it: the American church has baptized busyness as faithfulness. Pastors brag about 60-hour weeks. Congregants measure commitment by committee meetings attended. We have made Pharaoh's economy the church's operating system — and called it ministry.",
        },
        illustration:
          "Abraham Joshua Heschel wrote that the Sabbath is 'a palace in time.' Six days a week we build in space — houses, offices, cities. On the seventh, we build in time — rest, prayer, presence, gratitude. The Sabbath is not what you do when the work is done. It is the work — the hardest kind, because it requires you to trust that the world will not collapse if you stop holding it up.",
        applicationQuestion:
          "When was the last time you rested — truly rested, not collapsed from exhaustion? What would it take to build one day of genuine Sabbath into your week?",
        relatedArticle: "faith-at-work",
      },
      {
        week: 6,
        title: "What the Bible Actually Says About Justice",
        mainText: "Micah 6:6-8",
        secondaryTexts: [
          "Amos 5:21-24",
          "Isaiah 1:10-17",
          "Matthew 25:31-46",
        ],
        bigIdea:
          "The Bible mentions justice over 200 times — more than prayer, more than worship, more than evangelism — and a church that preaches the Bible without preaching justice is not preaching the whole Bible.",
        outline: {
          point1:
            "What the prophets demanded: Amos, Isaiah, Micah, and Jeremiah did not merely suggest justice — they declared that God rejects worship that coexists with injustice. 'I hate, I despise your religious festivals' (Amos 5:21). The prophetic tradition insists that right worship and right action are inseparable.",
          point2:
            "What Jesus said: Matthew 25 is the only judgment scene in the Gospels, and the criteria are not doctrinal purity or worship attendance — they are whether you fed the hungry, clothed the naked, visited the prisoner, and welcomed the stranger. 'Whatever you did for one of the least of these, you did for me.'",
          point3:
            "Why the church avoids it: justice is political, and political means divisive, and divisive means people leave and giving drops. But Micah does not say 'What does the Lord require? Personal piety and small-group attendance.' He says: 'Do justice, love mercy, walk humbly with your God.' Justice is not an option in the biblical economy. It is a requirement.",
        },
        illustration:
          "Dietrich Bonhoeffer, reflecting on the German church's failure during the Nazi era, wrote: 'Silence in the face of evil is itself evil. God will not hold us guiltless. Not to speak is to speak. Not to act is to act.' The German church had worship. It had doctrine. It had beautiful buildings and full pews. What it did not have — with rare and costly exceptions — was the courage to do justice when justice cost everything.",
        applicationQuestion:
          "If someone audited your church's budget, calendar, and sermon archive, would they conclude that justice is a priority — or a footnote?",
        relatedArticle: "why-the-church-lost-the-culture-war",
      },
    ],
  },
];
