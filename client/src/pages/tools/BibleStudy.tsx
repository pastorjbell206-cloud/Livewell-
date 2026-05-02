import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { BookOpen, ArrowLeft, ChevronRight } from "lucide-react";

interface BookData {
  name: string;
  testament: "OT" | "NT";
  overview: string;
  themes: string[];
  questions: string[];
  howToRead: string;
  companionEssay: { title: string; href: string };
}

const BOOKS: BookData[] = [
  {
    name: "Genesis",
    testament: "OT",
    overview:
      "Genesis is not a science textbook or a children's storybook. It is a theological argument about who owns the world, who broke it, and what God intends to do about it. The narrative arc from creation to Joseph in Egypt establishes every major biblical theme: covenant, exile, blessing, and the persistent human impulse to seize what God has not given.",
    themes: [
      "Covenant and promise -- God binds Himself to a people before they deserve it",
      "The fall and its repetition -- sin is not a one-time event but a pattern that escalates across generations",
      "Election and calling -- God chooses the younger son, the barren wife, the liar, and works through them anyway",
      "Exile and homecoming -- the movement from garden to wilderness to promised land begins here and never stops",
    ],
    questions: [
      "Why does God choose Abel's offering over Cain's, Jacob over Esau, Joseph over his brothers -- and what does that pattern reveal about how God works in the world?",
      "The Tower of Babel story (Genesis 11) is often read as punishment. What if it is actually about God's refusal to let humanity consolidate power? How does that reframe the story?",
      "Abraham is called the father of faith, yet he lies about Sarah twice and tries to manufacture the promise through Hagar. What does his failure teach us about the relationship between faith and obedience?",
    ],
    howToRead:
      "Read Genesis in four movements: Creation and Fall (1-11), Abraham (12-25), Jacob (25-36), Joseph (37-50). Each movement has its own arc. Do not flatten them into a single story. Pay attention to the repeated pattern: God promises, humans doubt, God delivers anyway.",
    companionEssay: {
      title: "When the Promise Takes Longer Than You Expected",
      href: "/writing",
    },
  },
  {
    name: "Psalms",
    testament: "OT",
    overview:
      "The Psalms are not inspirational poetry. They are the prayer book of a people who knew that faith and suffering are not opposites. Nearly a third of the Psalms are laments -- cries of abandonment, anger, and confusion directed at God. The ancient Israelites believed you could be furious with God and still faithful. Most modern Christians have lost that instinct.",
    themes: [
      "Lament as worship -- bringing raw pain to God is not a failure of faith but an expression of it",
      "The kingship of God -- the Psalms insist that Yahweh reigns even when the evidence suggests otherwise",
      "The two ways -- Psalm 1 sets up the entire collection with a binary that the rest of the Psalms complicate",
      "Remembering -- Israel's faith depends on recounting what God has done, especially when the present is dark",
    ],
    questions: [
      "Psalm 88 ends in darkness with no resolution. Why would the editors of the Psalter include a prayer that God does not answer? What does its presence in Scripture say about the biblical understanding of faith?",
      "The imprecatory Psalms (like 137 and 109) contain violent wishes against enemies. Rather than explaining them away, what do they reveal about what honest prayer actually looks like?",
      "Psalm 22 begins with 'My God, my God, why have you forsaken me?' -- the same words Jesus quotes on the cross. Read the entire Psalm. How does the ending change how you understand Jesus' use of it?",
    ],
    howToRead:
      "Do not read the Psalms like a devotional, picking one at random each morning. Read them in clusters: the Psalms of Ascent (120-134) together, the Hallel Psalms (113-118) together. Notice that the Psalter moves from lament-heavy in Book I to praise-heavy in Book V. That movement is intentional.",
    companionEssay: {
      title: "The Prayers We Are Afraid to Pray",
      href: "/writing",
    },
  },
  {
    name: "Proverbs",
    testament: "OT",
    overview:
      "Proverbs is wisdom literature, which means it trades in general truths, not absolute promises. 'Train up a child in the way he should go' is not a guarantee -- it is an observation about how the world usually works. Misreading Proverbs as promises has caused enormous pastoral damage. The book itself knows this: Proverbs 26:4-5 gives two contradictory pieces of advice back to back, deliberately.",
    themes: [
      "The fear of the Lord -- wisdom begins not with information but with a posture of reverence before God",
      "Wisdom as a person -- Proverbs 8 personifies wisdom as a woman who was present at creation, a theme the New Testament applies to Christ",
      "The fool -- not someone who lacks intelligence but someone who refuses correction",
      "Practical righteousness -- how faith shapes money, speech, marriage, work, and friendship",
    ],
    questions: [
      "Proverbs 26:4 says 'Do not answer a fool according to his folly' and 26:5 says 'Answer a fool according to his folly.' Both are in the same chapter. What does this intentional contradiction teach about the nature of wisdom?",
      "Lady Wisdom in Proverbs 8 claims to have been present at creation. How does this elevate wisdom beyond mere practical advice and into something theological?",
      "Proverbs 31 is often used as a checklist for women. Read it again -- it is an acrostic poem, a literary device. Who is the audience, and what changes if this is poetry rather than prescription?",
    ],
    howToRead:
      "Do not read a chapter of Proverbs per day like a prescription. Read chapters 1-9 first as a complete unit -- they form the theological framework. Then read the individual proverbs (10-31) through the lens of that framework. Without the framework, the proverbs become fortune cookies.",
    companionEssay: {
      title: "Wisdom Is Not a Formula",
      href: "/writing",
    },
  },
  {
    name: "Isaiah",
    testament: "OT",
    overview:
      "Isaiah spans roughly two centuries of Israel's history and was likely compiled from multiple periods of the prophet's tradition. It contains some of the most devastating indictments of religious hypocrisy in all of Scripture -- and some of the most breathtaking visions of restoration. Isaiah 1 calls Israel's worship disgusting to God. Isaiah 40 promises comfort to the same people. Both are true at the same time.",
    themes: [
      "The holiness of God -- Isaiah 6 establishes that God's holiness is not warmth but consuming fire, and the proper response is 'Woe is me'",
      "Justice and worship -- Isaiah insists that worship without justice is not just incomplete but offensive to God",
      "The Suffering Servant -- Isaiah 52-53 describes a figure who bears the sin of others, a text the early church read as pointing to Jesus",
      "New creation -- Isaiah does not end with restoration of the old order but with a vision of new heavens and new earth",
    ],
    questions: [
      "Isaiah 6:9-10 records God telling Isaiah to preach so that the people will NOT understand. Jesus quotes this passage in Mark 4. What does this troubling commission reveal about the purpose of prophetic speech?",
      "Isaiah 58 distinguishes between the fast God rejects and the fast God chooses. What forms of religious practice today might fall under God's rejection for the same reasons?",
      "The Suffering Servant songs (42, 49, 50, 52-53) were originally read as references to Israel herself. The early church read them as prophecy of Jesus. Can both readings be true? What is lost if we flatten it to only one?",
    ],
    howToRead:
      "Read Isaiah in three blocks: chapters 1-39 (judgment, set during the Assyrian crisis), 40-55 (comfort, addressed to exiles in Babylon), and 56-66 (future hope, addressed to the returned community). Each block has its own tone and audience. The shift at chapter 40 is one of the most dramatic pivots in all of Scripture.",
    companionEssay: {
      title: "When God Calls Your Worship Disgusting",
      href: "/writing",
    },
  },
  {
    name: "Matthew",
    testament: "NT",
    overview:
      "Matthew presents Jesus as the new Moses -- a lawgiver who delivers a new Torah from a mountain (the Sermon on the Mount). The Gospel is structured around five major teaching blocks, deliberately mirroring the five books of Moses. Matthew writes for a Jewish audience that needs to understand how Jesus fulfills Israel's story without abolishing it. His fourteen uses of 'this was to fulfill what was spoken' are not proof-texting. They are a theological argument.",
    themes: [
      "Fulfillment -- Jesus does not replace the Hebrew Scriptures but brings them to their intended completion",
      "The kingdom of heaven -- not an afterlife destination but the reign of God breaking into the present order",
      "Discipleship as obedience -- Matthew's Jesus does not merely call people to believe but to do",
      "The church -- Matthew is the only Gospel that uses the word 'church' (ekklesia), and he is deeply concerned with community life and accountability",
    ],
    questions: [
      "In the Sermon on the Mount (chapters 5-7), Jesus repeatedly says 'You have heard it said... but I say to you.' Is He contradicting Moses, intensifying Moses, or doing something else entirely? What difference does your answer make?",
      "Matthew 25:31-46 (the sheep and goats) makes care for 'the least of these' the criterion for final judgment. How does this passage challenge frameworks that separate faith from works?",
      "Matthew's genealogy (1:1-17) includes four women: Tamar, Rahab, Ruth, and Bathsheba -- all with irregular or scandalous stories. Why does Matthew include them in the lineage of the Messiah?",
    ],
    howToRead:
      "Read Matthew with an Old Testament open beside you. Every time Matthew says 'to fulfill what was spoken,' stop and read the original passage in its context. Matthew is not randomly pulling verses. He is making an argument about the continuity of God's plan. Miss the Old Testament background and you miss half of what Matthew is doing.",
    companionEssay: {
      title: "The Sermon Nobody Can Live Up To",
      href: "/writing",
    },
  },
  {
    name: "Mark",
    testament: "NT",
    overview:
      "Mark is the shortest Gospel and almost certainly the first one written. It moves at a relentless pace -- the word 'immediately' appears over forty times. But the speed serves a purpose: Mark is building toward the cross from the first chapter. The so-called 'Messianic Secret' -- Jesus repeatedly telling people not to reveal His identity -- is not modesty. It is Mark's way of saying that you cannot understand who Jesus is until you see how He dies.",
    themes: [
      "The Messianic Secret -- Jesus' identity can only be understood through the cross, never apart from it",
      "Discipleship as failure -- the Twelve consistently misunderstand Jesus, and Mark does not soften their incompetence",
      "The cost of following -- Mark pairs every revelation of Jesus' glory with a demand for suffering",
      "Authority and service -- Jesus has absolute authority and uses it to wash feet and die",
    ],
    questions: [
      "Mark's original ending (16:8) has the women fleeing the tomb in fear, saying nothing to anyone. No resurrection appearances, no Great Commission. Why would Mark end his Gospel in terror? What theological point is he making?",
      "In Mark 8:27-38, Peter confesses Jesus as the Christ and is immediately rebuked for misunderstanding what that means. What was Peter's error, and where do modern Christians repeat it?",
      "Mark 10:45 -- 'The Son of Man came not to be served but to serve, and to give his life as a ransom for many' -- functions as the thesis of the entire Gospel. How does this single verse redefine power?",
    ],
    howToRead:
      "Read Mark in one sitting. It takes about ninety minutes. The Gospel was almost certainly meant to be heard aloud in a single session, and the cumulative effect of its pace matters. Do not break it into daily readings the first time through. Let the urgency wash over you.",
    companionEssay: {
      title: "The Gospel That Ends in Fear",
      href: "/writing",
    },
  },
  {
    name: "Luke",
    testament: "NT",
    overview:
      "Luke is a historian and a theologian simultaneously. He writes to a Gentile audience and is relentlessly concerned with the people everyone else overlooks: women, the poor, Samaritans, tax collectors, sinners. Luke's parables -- the Good Samaritan, the Prodigal Son, the Rich Man and Lazarus -- are unique to his Gospel and all carry the same conviction: God's kingdom inverts the social order. The last become first. That is not metaphor. Luke means it economically.",
    themes: [
      "Reversal -- the rich are sent away empty, the humble are exalted, the outsider becomes the hero",
      "The Holy Spirit -- Luke emphasizes the Spirit's activity more than any other Gospel, preparing the way for Acts",
      "Table fellowship -- Jesus eats with the wrong people constantly, and Luke records more meals than any other Gospel writer",
      "Joy -- Luke's narrative begins and ends with joy (Zechariah's song, the disciples returning to the temple with great joy), framing the entire Gospel",
    ],
    questions: [
      "The Parable of the Prodigal Son (Luke 15:11-32) is often read as a story about the younger son's repentance. But the parable ends with the older brother outside the party, and Jesus never resolves his story. Who is Jesus really addressing, and why does the ending stay open?",
      "In Luke 4:16-30, Jesus' hometown tries to kill Him after His first sermon. Read the sermon carefully -- what specifically enraged them? It was not blasphemy.",
      "Luke 16:19-31 (the Rich Man and Lazarus) is the only parable where a character has a name. What does naming Lazarus -- and not naming the rich man -- communicate about how God sees?",
    ],
    howToRead:
      "Read Luke and Acts as a single two-volume work. Luke wrote both, and the story of Jesus in the Gospel is incomplete without the story of the early church in Acts. Pay attention to the meals -- nearly every major teaching in Luke happens at a table. That is not accidental.",
    companionEssay: {
      title: "The God Who Eats with Sinners",
      href: "/writing",
    },
  },
  {
    name: "John",
    testament: "NT",
    overview:
      "John is not a biography. It is a theological meditation on the identity of Jesus, written by someone who has spent decades reflecting on what it all meant. John omits the birth narrative, the temptation, the parables, and the institution of the Lord's Supper. Instead, he gives us seven signs, seven 'I am' statements, and a prologue that reaches back before creation. John is not interested in what Jesus did on Tuesday. He wants you to see who Jesus is in eternity.",
    themes: [
      "Incarnation -- 'The Word became flesh' is the most radical claim in the New Testament, and John builds everything on it",
      "Light and darkness -- John frames the entire story as a cosmic conflict between light and the darkness that cannot overcome it",
      "Belief and unbelief -- John uses the verb 'believe' nearly 100 times but never uses the noun 'faith,' because for John, believing is always an action, never a possession",
      "Glory -- in John, the cross is not humiliation but glorification. Jesus is lifted up, and the double meaning is deliberate",
    ],
    questions: [
      "John 1:14 says the Word became flesh and 'dwelt among us' -- the Greek literally means 'tabernacled among us.' What does it mean that John uses the language of the Old Testament tabernacle to describe the Incarnation?",
      "Jesus washes the disciples' feet in John 13 instead of instituting the Lord's Supper. Why does John make this substitution, and what does it say about how he understands the meaning of Jesus' death?",
      "In John 20:29, Jesus says 'Blessed are those who have not seen and yet have believed.' John is writing to people who have not seen. How does this verse function as the Gospel's direct address to every subsequent reader?",
    ],
    howToRead:
      "Read John slowly. This is not Mark -- speed will ruin it. Read the Prologue (1:1-18) three times before moving on. It is the lens through which everything else should be read. Pay attention to the 'I am' statements (bread, light, door, shepherd, resurrection, way, vine) -- each one is a claim to deity that Jesus' audience would not have missed.",
    companionEssay: {
      title: "The Word That Became Flesh",
      href: "/writing",
    },
  },
  {
    name: "Romans",
    testament: "NT",
    overview:
      "Romans is Paul's most systematic letter, but it is not a systematic theology textbook. It was written to a specific church dealing with a specific problem: Jewish and Gentile Christians who could not figure out how to be one community. The argument of Romans is not 'how to get saved' -- it is 'how the God of Israel has been faithful to the whole world through the Messiah.' Romans 1-8 is the theological foundation. Romans 9-11 is the heart of the letter. Romans 12-16 is what it looks like lived out.",
    themes: [
      "Justification by faith -- not merely a legal transaction but God's declaration that creates a new people across ethnic lines",
      "The faithfulness of God -- Romans 9-11 wrestles with whether God has abandoned Israel, and Paul's answer is an emphatic no",
      "Life in the Spirit -- Romans 8 is the summit of the letter, moving from condemnation to glorification with nothing in between that can separate",
      "The body of Christ -- Romans 12-15 is not an appendix. It is the point. Theology that does not produce a changed community has missed its own argument",
    ],
    questions: [
      "Romans 7:15-20 ('I do not do the good I want to do') is one of the most debated passages in the New Testament. Is Paul describing his pre-Christian life, his current struggle, or the universal human condition? What is at stake in each reading?",
      "Romans 8:28 ('All things work together for good') is one of the most quoted and most misused verses in Scripture. Read the full context of 8:18-39. What does Paul actually mean by 'good,' and for whom?",
      "Romans 13:1-7 has been used to justify obedience to every government, including oppressive ones. Read it alongside Romans 12:14-21 and 13:8-14. Does Paul actually teach unconditional submission to the state?",
    ],
    howToRead:
      "Read Romans in one sitting the first time. The argument builds across chapters, and breaking it into daily chunks destroys the logic. Then reread chapters 9-11 separately -- they are not a parenthesis. They are the climax of the letter, and skipping them (as most reading plans do) guts the argument.",
    companionEssay: {
      title: "The Letter That Changed Everything",
      href: "/writing",
    },
  },
  {
    name: "Ephesians",
    testament: "NT",
    overview:
      "Ephesians may be Paul's most elevated prose -- sentences that run for paragraphs, doxologies that pile clause upon clause until the grammar nearly collapses under the weight of what Paul is trying to say. The letter's central claim is staggering: the church is not an organization or a building. It is the physical body through which the risen Christ acts in the world. Ephesians takes the highest possible view of the church and then demands that the church live up to it.",
    themes: [
      "The cosmic scope of redemption -- Ephesians 1:10 says God's plan is to unite all things in Christ, not merely to save individual souls",
      "Jew and Gentile as one body -- the dividing wall has been demolished (2:14), and the new humanity is the evidence of the gospel",
      "The church as the fullness of Christ -- this is the highest ecclesiology in the New Testament, and it makes the local church matter more, not less",
      "Spiritual warfare -- Ephesians 6 describes powers and principalities that are not merely personal demons but systemic forces",
    ],
    questions: [
      "Ephesians 2:8-9 ('by grace you have been saved through faith') is often quoted in isolation. Read through 2:10. What does the addition of 'created in Christ Jesus for good works' do to the faith-versus-works debate?",
      "Ephesians 5:21-33 (the household code) is one of the most contested passages in the church today. Read it starting at 5:21 ('submit to one another') rather than 5:22. How does the opening frame change the meaning of what follows?",
      "Ephesians 4:11-16 describes the purpose of church leaders: to equip the saints for the work of ministry. How does this invert the common model where the pastor does the ministry and the congregation watches?",
    ],
    howToRead:
      "Read Ephesians 1:3-14 aloud. In the original Greek, it is one single sentence -- the longest sentence in the New Testament. Paul's grammar is struggling to contain the theology. Then read chapters 1-3 (what God has done) before chapters 4-6 (how to live). Paul never reverses this order. Identity precedes ethics.",
    companionEssay: {
      title: "The Church Paul Imagined",
      href: "/writing",
    },
  },
  {
    name: "James",
    testament: "NT",
    overview:
      "James is the most Jewish book in the New Testament, and Martin Luther famously called it 'an epistle of straw' because he thought it contradicted Paul on justification. It does not. James and Paul are answering different questions: Paul asks 'How are we made right with God?' and answers 'By faith.' James asks 'What does real faith look like?' and answers 'It works.' James is not anti-Paul. He is anti-hypocrisy. And his letter is a sustained attack on the gap between what we say and what we do.",
    themes: [
      "Faith and works -- not competing categories but inseparable realities. Faith without works is not weak faith. It is dead faith.",
      "The tongue -- James devotes more space to the power of speech than any other New Testament author. Words are not neutral.",
      "Wealth and poverty -- James is blunt about economic injustice in ways that make comfortable Christians uncomfortable",
      "Wisdom from above -- James 3:13-18 describes a wisdom that is pure, peaceable, gentle, and full of mercy. This is the alternative to the world's definition of strength.",
    ],
    questions: [
      "James 2:19 says 'Even the demons believe -- and shudder.' What is James' point about the nature of belief? How does this challenge definitions of faith that stop at intellectual agreement?",
      "James 5:1-6 contains one of the harshest condemnations of wealth in the New Testament. Is James condemning wealth itself or something specific about how it was acquired and used? What is the difference?",
      "James 1:2-4 says to 'count it all joy when you meet trials of various kinds.' This is not stoicism. Read the reasoning: trials produce steadfastness, and steadfastness produces completeness. What kind of person does suffering create that comfort cannot?",
    ],
    howToRead:
      "Read James as a sermon, not a letter. It has no personal greetings, no travel plans, no theological argument in the Pauline sense. It is a pastor standing in front of his people and telling them the truth they do not want to hear. Read it as if someone is looking you in the eye.",
    companionEssay: {
      title: "Faith That Does Something",
      href: "/writing",
    },
  },
  {
    name: "Revelation",
    testament: "NT",
    overview:
      "Revelation is the most misread book in the Bible. It is not a coded timeline of future events. It is a piece of apocalyptic literature -- a genre that uses symbolic imagery to reveal (hence the title) the spiritual reality behind current events. John wrote it to seven real churches facing real persecution under Roman imperial power. The question Revelation answers is not 'When will the world end?' but 'Who is really in charge?' The answer, repeated in every chapter, is: the slaughtered Lamb.",
    themes: [
      "The sovereignty of God over empire -- Revelation is a direct challenge to every political power that claims ultimate authority",
      "The Lamb who was slain -- the central image of the book is not a conquering warrior but a slaughtered lamb who conquers by dying",
      "Worship as resistance -- in a world that demands allegiance to Caesar, the act of worshipping God is political subversion",
      "New creation -- Revelation ends not with escape from the world but with the renewal of it. God comes down. Heaven and earth merge.",
    ],
    questions: [
      "Revelation 5 shows a slaughtered Lamb standing in the center of the throne. The Lamb has been killed and is alive. Why does John choose this image rather than a lion or a warrior to represent the victorious Christ?",
      "The number 666 (Revelation 13:18) almost certainly refers to Nero Caesar through Hebrew numerology. If the 'beast' is a first-century Roman emperor, what does that mean for how we read the rest of Revelation's imagery?",
      "Revelation 21:1-5 describes the new creation. Notice that it is not humanity going up to heaven but the New Jerusalem coming down to earth. How does this challenge the common Christian assumption that the goal is to leave this world?",
    ],
    howToRead:
      "Before reading Revelation, read Daniel 7-12 and Ezekiel 37-48. Revelation quotes or alludes to the Old Testament over 500 times without ever directly citing it. If you do not know the source material, the symbols will seem bizarre. They are not. They are a shared language that John's original audience understood immediately.",
    companionEssay: {
      title: "The Book Everyone Misreads",
      href: "/writing",
    },
  },
];

export default function BibleStudy() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const book = BOOKS.find((b) => b.name === selectedBook) || null;

  return (
    <Layout>
      <SEOMeta
        title="Bible Study Guide -- Study Any Book with Theological Depth"
        description="Study 12 essential books of the Bible with theological depth. Key themes, study questions, reading strategies, and companion essays. Built for serious readers, not academics."
        keywords="Bible study guide, Genesis study, Psalms study, Romans study, Gospel of John, Bible reading plan, theological Bible study"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Bible Study Guide",
          description:
            "Study any book of the Bible with theological depth. Key themes, study questions, and reading strategies for 12 essential books.",
          url: "https://www.livewellbyjamesbell.co/tools/bible-study",
          applicationCategory: "ReligiousApp",
          offers: { "@type": "Offer", price: "0" },
        }}
      />

      {/* Hero */}
      <section
        style={{
          background: "var(--charcoal)",
          color: "var(--bone)",
          padding: "80px 32px 60px",
          textAlign: "center",
        }}
      >
        <div className="wrap" style={{ maxWidth: "700px" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "var(--mustard)",
              fontFamily: "var(--U)",
              marginBottom: "16px",
            }}
          >
            FREE TOOL
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 300,
              fontFamily: "var(--F)",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Bible Study{" "}
            <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>
              Guide
            </em>
          </h1>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              opacity: 0.85,
              fontFamily: "var(--B)",
            }}
          >
            Select a book. Get the overview, the key themes, the questions worth
            asking, and a strategy for reading it well.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "48px 32px", background: "var(--bone)" }}>
        <div className="wrap" style={{ maxWidth: "900px" }}>
          {/* Back button when a book is selected */}
          {selectedBook && (
            <button
              onClick={() => setSelectedBook(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 0",
                background: "none",
                border: "none",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "var(--U)",
                color: "var(--ink)",
                cursor: "pointer",
                marginBottom: "24px",
                opacity: 0.7,
              }}
            >
              <ArrowLeft size={16} />
              All Books
            </button>
          )}

          {/* Book Grid */}
          {!selectedBook && (
            <>
              <div style={{ marginBottom: "32px" }}>
                <h2
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "20px",
                  }}
                >
                  OLD TESTAMENT
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {BOOKS.filter((b) => b.testament === "OT").map((b) => (
                    <button
                      key={b.name}
                      onClick={() => setSelectedBook(b.name)}
                      style={{
                        padding: "24px 16px",
                        background: "white",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
                        fontSize: "18px",
                        fontWeight: 600,
                        fontFamily: "var(--F)",
                        color: "var(--ink)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        textAlign: "center",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--mustard)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 24px rgba(0,0,0,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <BookOpen
                        size={20}
                        style={{
                          display: "block",
                          margin: "0 auto 10px",
                          opacity: 0.4,
                        }}
                      />
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "20px",
                  }}
                >
                  NEW TESTAMENT
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {BOOKS.filter((b) => b.testament === "NT").map((b) => (
                    <button
                      key={b.name}
                      onClick={() => setSelectedBook(b.name)}
                      style={{
                        padding: "24px 16px",
                        background: "white",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
                        fontSize: "18px",
                        fontWeight: 600,
                        fontFamily: "var(--F)",
                        color: "var(--ink)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        textAlign: "center",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--mustard)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 24px rgba(0,0,0,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <BookOpen
                        size={20}
                        style={{
                          display: "block",
                          margin: "0 auto 10px",
                          opacity: 0.4,
                        }}
                      />
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Book Detail */}
          {book && (
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {/* Title card */}
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "40px 36px",
                  borderTop: "4px solid var(--mustard)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "12px",
                  }}
                >
                  {book.testament === "OT" ? "OLD TESTAMENT" : "NEW TESTAMENT"}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 4vw, 40px)",
                    fontWeight: 400,
                    fontFamily: "var(--F)",
                    color: "var(--ink)",
                    marginBottom: "20px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {book.name}
                </h2>
                <p
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.8,
                    color: "var(--ink)",
                    fontFamily: "var(--B)",
                    maxWidth: "68ch",
                  }}
                >
                  {book.overview}
                </p>
              </div>

              {/* Key Themes */}
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "36px",
                }}
              >
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "24px",
                  }}
                >
                  KEY THEMES
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {book.themes.map((theme, i) => {
                    const parts = theme.split(" -- ");
                    return (
                      <div key={i} style={{ paddingLeft: "20px", borderLeft: "2px solid var(--bone-warm)" }}>
                        <span
                          style={{
                            fontWeight: 600,
                            fontFamily: "var(--F)",
                            fontSize: "17px",
                            color: "var(--ink)",
                          }}
                        >
                          {parts[0]}
                        </span>
                        {parts[1] && (
                          <span
                            style={{
                              fontFamily: "var(--B)",
                              fontSize: "15px",
                              color: "var(--ink2)",
                              display: "block",
                              marginTop: "4px",
                              lineHeight: 1.7,
                            }}
                          >
                            {parts[1]}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Study Questions */}
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "36px",
                }}
              >
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "24px",
                  }}
                >
                  STUDY QUESTIONS
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  {book.questions.map((q, i) => (
                    <div key={i} style={{ display: "flex", gap: "16px" }}>
                      <span
                        style={{
                          fontFamily: "var(--F)",
                          fontSize: "24px",
                          fontWeight: 400,
                          color: "var(--mustard)",
                          lineHeight: 1.2,
                          flexShrink: 0,
                          width: "28px",
                          textAlign: "center",
                        }}
                      >
                        {i + 1}
                      </span>
                      <p
                        style={{
                          fontSize: "16px",
                          lineHeight: 1.8,
                          color: "var(--ink)",
                          fontFamily: "var(--B)",
                          margin: 0,
                        }}
                      >
                        {q}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to Read */}
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "36px",
                  borderLeft: "4px solid var(--mustard)",
                }}
              >
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "16px",
                  }}
                >
                  HOW TO READ THIS BOOK
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    color: "var(--ink)",
                    fontFamily: "var(--B)",
                    maxWidth: "68ch",
                    margin: 0,
                  }}
                >
                  {book.howToRead}
                </p>
              </div>

              {/* Companion Essay Link */}
              <a
                href={book.companionEssay.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--charcoal)",
                  color: "var(--bone)",
                  borderRadius: "8px",
                  padding: "24px 32px",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: "var(--mustard)",
                      fontFamily: "var(--U)",
                      marginBottom: "6px",
                    }}
                  >
                    COMPANION READING
                  </div>
                  <span
                    style={{
                      fontSize: "18px",
                      fontFamily: "var(--F)",
                      fontWeight: 400,
                      fontStyle: "italic",
                    }}
                  >
                    {book.companionEssay.title}
                  </span>
                </div>
                <ChevronRight size={20} style={{ opacity: 0.5, flexShrink: 0 }} />
              </a>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
