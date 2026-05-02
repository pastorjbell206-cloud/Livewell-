import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { BookOpen, ArrowLeft } from "lucide-react";

interface Passage {
  ref: string;
  summary: string;
  text: string;
  paraphrase: string;
  keyWords: { word: string; original: string; meaning: string }[];
  historical: string[];
  literary: { genre: string; devices: string; keyTerms: { term: string; language: string; meaning: string }[]; structure: string };
  scholars: { view: string; summary: string; proponents: string }[];
  application: { question: string; connection: string; thisWeek: string };
  deeper: { books: string[]; studyQuestion: string; prayer: string };
}

interface BibleBook {
  name: string;
  testament: "OT" | "NT";
  hook: string;
  passages: Passage[];
}

const BOOKS: BibleBook[] = [
  {
    name: "Genesis", testament: "OT", hook: "Where it all begins and where it all goes wrong",
    passages: [
      {
        ref: "Genesis 1:1-2:3",
        summary: "The creation account and what it actually claims",
        text: "In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters. And God said, 'Let there be light,' and there was light...",
        paraphrase: "Before anything existed, God spoke reality into being. Not by accident, not by conflict with other gods, not as an afterthought. Deliberately. And at the center of it, God made humans to bear his image in the world.",
        keyWords: [
          { word: "created", original: "bara (Hebrew)", meaning: "To create from nothing. Used only of God in the Old Testament. This is not reshaping existing material. This is bringing something from nothing." },
          { word: "formless and empty", original: "tohu vavohu (Hebrew)", meaning: "Chaos, disorder, waste. The creation narrative is God imposing order on chaos, not creating from a blank canvas." },
          { word: "image of God", original: "tselem Elohim (Hebrew)", meaning: "In the ancient world, kings placed images of themselves in territories they ruled. Humans are God's image-bearers, his representatives in creation." },
        ],
        historical: [
          "Genesis 1 was written in a world saturated with competing creation stories. The Babylonian Enuma Elish describes creation as the byproduct of a war between gods. Genesis quietly dismantles this: creation is not violence. It is speech.",
          "The sun and moon are not named in Genesis 1 (they are called 'greater light' and 'lesser light'). In the ancient world, the sun and moon were worshipped as gods. Genesis demotes them to light fixtures.",
          "The seven-day structure mirrors ancient temple dedication ceremonies. Genesis 1 is not a science textbook. It is a temple text. The cosmos is God's temple, and humans are his priests in it.",
          "The Hebrew word for 'Spirit' hovering over the waters (ruach) also means 'wind' and 'breath.' The same creative force that ordered chaos at the beginning is the breath in your lungs right now.",
        ],
        literary: {
          genre: "Liturgical poetry / structured narrative. Days 1-3 create realms (light, sky/sea, land). Days 4-6 fill those realms (sun/moon, birds/fish, animals/humans). The structure is the argument.",
          devices: "Parallelism (days 1-3 mirror days 4-6), repetition ('and God said,' 'it was good,' 'there was evening'), climax (humanity created last, then God rests).",
          keyTerms: [
            { term: "bara", language: "Hebrew", meaning: "Create from nothing. Appears 3 times: creation of matter (v.1), animal life (v.21), human life (v.27). Each marks a category shift." },
            { term: "asah", language: "Hebrew", meaning: "To make or fashion from existing material. Used for most of the creative acts. Bara is reserved for the truly new." },
            { term: "tov", language: "Hebrew", meaning: "'Good' — not morally good, but functionally complete. Everything is working as intended. The world as it was meant to be." },
          ],
          structure: "The text builds to a double climax: humanity in verse 27 (the pinnacle of creation) and Sabbath rest in 2:1-3 (the purpose of creation). The point of the universe is not productivity. It is rest in the presence of God.",
        },
        scholars: [
          { view: "Literal six-day creation", summary: "The days are 24-hour periods. The text says 'evening and morning,' which implies literal days. Young-earth creationism holds this view.", proponents: "Henry Morris, Ken Ham, Answers in Genesis" },
          { view: "Day-age / progressive creation", summary: "Each 'day' represents a long epoch. The Hebrew 'yom' can mean an indefinite period. The sequence roughly matches the scientific timeline.", proponents: "Hugh Ross, Reasons to Believe" },
          { view: "Literary framework", summary: "The seven-day structure is theological, not chronological. The point is not when God created but that God created, and that creation has order, purpose, and a Sabbath destination.", proponents: "John Walton, N.T. Wright, Henri Blocher" },
        ],
        application: {
          question: "If humans are image-bearers placed in a world that God called good, what does that say about your worth on the days you feel worthless?",
          connection: "We live in a culture that derives human value from productivity, appearance, and achievement. Genesis 1 says your value was established before you did anything. You bear the image of God. That is not something you earn.",
          thisWeek: "This week, when you catch yourself measuring your worth by what you produced, stop and name this: 'I bear the image of God. That was true before I accomplished anything today.'",
        },
        deeper: {
          books: ["The Lost World of Genesis One by John Walton", "In the Beginning by Henri Blocher", "Genesis 1-4: A Linguistic, Literary, and Theological Commentary by C. John Collins"],
          studyQuestion: "If Genesis 1 is a temple dedication text rather than a science textbook, how does that change what you expect the passage to tell you? What questions does it answer, and what questions was it never trying to answer?",
          prayer: "God who spoke light into darkness and order into chaos, speak into the formless places in my life today. Remind me that I carry your image. That was your idea, not mine. Amen.",
        },
      },
      {
        ref: "Genesis 3:1-24",
        summary: "The fall and what it actually cost",
        text: "Now the serpent was more crafty than any of the wild animals the Lord God had made. He said to the woman, 'Did God really say...?'",
        paraphrase: "The first act of rebellion was not dramatic. It was a question that reframed God's generosity as restriction. The serpent did not say God was wrong. He said God was withholding.",
        keyWords: [
          { word: "crafty", original: "arum (Hebrew)", meaning: "Shrewd, clever. The previous chapter says humans were 'naked' (arummim). Same root word. The wordplay is intentional: the humans' vulnerability meets the serpent's cunning." },
          { word: "knowledge of good and evil", original: "da'at tov vara (Hebrew)", meaning: "Not information about morality. This is the knowledge of everything, the claim to autonomous judgment. It is the desire to be the one who decides what is good and what is evil." },
          { word: "cursed", original: "arar (Hebrew)", meaning: "The curses in Genesis 3 are descriptions of consequences, not prescriptions of how things should be. They name what happens when humans try to be God. They do not name what God wants." },
        ],
        historical: [
          "In ancient Near Eastern mythology, serpents were associated with wisdom and immortality. The Genesis author uses a familiar symbol and subverts it: the serpent's 'wisdom' leads to death, not life.",
          "The 'tree of knowledge of good and evil' is not about learning the difference between right and wrong. In Hebrew idiom, 'good and evil' means 'everything.' It is the desire for omniscience, for total autonomy.",
          "God's question 'Where are you?' (3:9) is not a request for GPS coordinates. God knows where Adam is. The question is relational: 'What has happened between us?'",
        ],
        literary: {
          genre: "Narrative with mythic elements. Not myth in the sense of 'untrue,' but myth in the sense of 'a story that tells the truth about the human condition at the deepest level.'",
          devices: "Chiastic structure (the order of sin reverses the order of creation), irony (seeking wisdom produces foolishness), dialogue that reveals character.",
          keyTerms: [
            { term: "arum/arummim", language: "Hebrew", meaning: "The wordplay between the serpent's craftiness and human nakedness frames the entire narrative. Vulnerability met cunning. The result was shame." },
            { term: "ezer kenegdo", language: "Hebrew", meaning: "'Helper corresponding to him.' The woman is not subordinate. Ezer is used of God himself 16 times in the Old Testament. She is a rescuer, an ally, a counterpart of equal strength." },
          ],
          structure: "The narrative moves from harmony to disruption to exile. It is the pattern of every human story since: something good, something broken, something lost. The rest of the Bible is the recovery operation.",
        },
        scholars: [
          { view: "Historical fall", summary: "Adam and Eve were real people who made a real choice. The fall is a historical event that introduced sin and death into the world.", proponents: "Wayne Grudem, Thomas Schreiner" },
          { view: "Archetypal reading", summary: "Adam and Eve represent every human. The story is not primarily about the first sin but about the human condition. We are all Adam. We all reach for the tree.", proponents: "John Walton, Tremper Longman III" },
          { view: "Redemptive trajectory", summary: "Genesis 3 is not the end of the story. The 'protoevangelium' in 3:15 (the seed of the woman will crush the serpent) is the first promise of redemption. The fall sets up the rescue.", proponents: "N.T. Wright, Tim Keller" },
        ],
        application: {
          question: "Where in your life are you currently treating God's boundaries as restrictions rather than protections?",
          connection: "The serpent's question, 'Did God really say?' is still the most effective temptation. It does not deny God exists. It reframes God's character: from generous provider to stingy controller. Every sin begins with a distortion of who God is.",
          thisWeek: "Identify one area where you have been resenting a boundary, whether from Scripture, from wisdom, or from someone who loves you. Ask: is this a restriction, or is it a protection I cannot see yet?",
        },
        deeper: {
          books: ["Genesis 1-15 (Word Biblical Commentary) by Gordon Wenham", "The Liberating Image by J. Richard Middleton"],
          studyQuestion: "The serpent's first move was to question God's generosity ('Did God really say you cannot eat from ANY tree?'). God had actually given them every tree except one. Where do you focus on the one restriction and miss the thousand gifts?",
          prayer: "God, I confess that I reach for the tree more often than I admit. I want to be the one who decides. Teach me the difference between a boundary and a cage. Amen.",
        },
      },
    ],
  },
  {
    name: "Psalms", testament: "OT", hook: "The prayer book of people who stopped pretending",
    passages: [
      {
        ref: "Psalm 23",
        summary: "The most famous psalm and the depth most people miss",
        text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul...",
        paraphrase: "God takes care of me the way a shepherd takes care of sheep. Not the way I would take care of myself. The way someone who actually knows what I need does it.",
        keyWords: [
          { word: "shepherd", original: "ro'eh (Hebrew)", meaning: "In the ancient Near East, kings called themselves shepherds. David is claiming that God, not a human king, is his provider and protector. This is a political statement as much as a spiritual one." },
          { word: "valley of the shadow of death", original: "tsalmaveth (Hebrew)", meaning: "Literally 'deep darkness.' Some scholars connect this to the Wadi Qelt, a narrow gorge between Jerusalem and Jericho where bandits hid. David may be naming an actual place, not just a metaphor." },
          { word: "my cup overflows", original: "kosi revayah (Hebrew)", meaning: "In ancient hospitality, the host filled the guest's cup. An overflowing cup meant extravagant, embarrassing generosity. God is not a careful host. He is lavish." },
        ],
        historical: [
          "David wrote this psalm as a king, not as a boy. He is looking back on decades of danger, betrayal, and loss. This is not naive optimism. It is hard-won trust.",
          "Verse 4 shifts from third person ('he leads me') to second person ('you are with me'). The shift happens at the darkest point. When the danger is closest, the relationship becomes most intimate.",
          "The psalm ends not in heaven but in the temple ('the house of the Lord'). The destination of the shepherd's care is worship. Rest leads to presence.",
        ],
        literary: {
          genre: "Individual psalm of trust. Not a lament (though danger is present), not a hymn (though praise is present). It is a declaration of confidence in the middle of real threat.",
          devices: "Extended metaphor (shepherd → host), person shift (he → you at the crisis point), chiastic structure centering on verse 4.",
          keyTerms: [
            { term: "naphshi", language: "Hebrew", meaning: "'My soul' or 'my whole self.' Not the immaterial part of a person. The entire person. God restores all of you, not just the spiritual parts." },
          ],
          structure: "Movement from provision (v.1-3) through danger (v.4) to celebration (v.5-6). The psalm does not avoid the dark valley. It walks through it.",
        },
        scholars: [
          { view: "Royal psalm", summary: "David is writing as a king reflecting on divine kingship. The psalm is political theology: God, not Saul or any human king, is the true ruler.", proponents: "Walter Brueggemann" },
          { view: "Liturgical reading", summary: "The psalm was used in temple worship, possibly at meals. The table imagery in verse 5 is eucharistic for Christian readers.", proponents: "James L. Mays" },
        ],
        application: {
          question: "Where in your life right now are you trying to be your own shepherd instead of letting God lead?",
          connection: "We quote Psalm 23 at funerals. But David did not write it about death. He wrote it about life: about provision when resources are scarce, protection when enemies are present, and presence when the road is dark. This psalm is for Tuesday, not just for the grave.",
          thisWeek: "Read Psalm 23 once each morning this week, slowly. Each day, identify one thing from the past 24 hours that fits the psalm. Name where God was the shepherd when you did not notice.",
        },
        deeper: {
          books: ["Psalms (Interpretation Commentary) by James L. Mays", "The Message of the Psalms by Walter Brueggemann"],
          studyQuestion: "Why does the psalmist shift from 'he' to 'you' at the darkest moment (verse 4)? What does that tell you about how intimacy with God works in suffering?",
          prayer: "Shepherd, I confess I have been trying to lead myself. I am not good at it. Lead me beside the waters I did not know I needed. Amen.",
        },
      },
    ],
  },
  {
    name: "Romans", testament: "NT", hook: "The letter that rewired Christianity",
    passages: [
      {
        ref: "Romans 8:28-39",
        summary: "Nothing can separate you and what that actually means",
        text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose...",
        paraphrase: "Everything you have been through is being woven into something. Not because your pain is good, but because the God who holds you is. And nothing in the entire created order can break that grip.",
        keyWords: [
          { word: "works together", original: "synergei (Greek)", meaning: "God is not causing your suffering. God is weaving it. The word is collaborative, not causative. God enters the mess and makes something from it." },
          { word: "more than conquerors", original: "hypernikomen (Greek)", meaning: "Beyond victory. Not just surviving. Not just enduring. The prefix hyper means excessively, overwhelmingly. You do not merely get through it. You come out the other side stronger than what tried to break you." },
          { word: "glorified", original: "edoxasen (Greek)", meaning: "Past tense. Not 'will be glorified.' Already glorified. Paul writes about the future completion of salvation as though it has already happened. The outcome is that certain." },
        ],
        historical: [
          "Paul wrote Romans from Corinth around 57 AD, to a church he had never visited. The letter is not pastoral advice. It is a systematic argument for the gospel. Chapters 1-8 build the case. Verses 28-39 are the verdict.",
          "The list in verses 35-39 (trouble, hardship, persecution, famine, nakedness, danger, sword) is not hypothetical. Paul experienced every one of them. This is not theory. It is testimony.",
          "The 'golden chain' in verse 30 (foreknew, predestined, called, justified, glorified) is one of the most debated sequences in Christian theology. Notice: every verb is past tense, including 'glorified.' Paul sees the end as already accomplished.",
        ],
        literary: {
          genre: "Theological epistle. This passage is the climax of the argument that began in Romans 1:16. Eight chapters of building arrive here.",
          devices: "Rhetorical questions ('If God is for us, who can be against us?'), catalog of sufferings (building intensity), courtroom imagery (accuse, condemn, intercede).",
          keyTerms: [
            { term: "synergei", language: "Greek", meaning: "'Works together with.' God is not the author of evil. God is the weaver who takes the threads — including the dark ones — and makes a fabric that holds." },
            { term: "hypernikomen", language: "Greek", meaning: "'We overwhelmingly conquer.' The prefix hyper gives it force: not survival, but triumph. Not endurance, but transformation." },
          ],
          structure: "The passage moves from theological statement (v.28-30) to rhetorical questions (v.31-35) to triumphant declaration (v.37-39). It is structured as a closing argument. The jury is you.",
        },
        scholars: [
          { view: "Individual election", summary: "The 'golden chain' describes God's sovereign plan for each believer from eternity past. Predestination is about individuals chosen by God.", proponents: "John Calvin, John Piper, Thomas Schreiner" },
          { view: "Corporate election", summary: "The 'foreknew' and 'predestined' refer to God's plan for a people, not selection of individuals. God chose to have a redeemed community. Those who respond in faith enter it.", proponents: "N.T. Wright, Ben Witherington III" },
          { view: "Christocentric reading", summary: "Predestination is about being conformed to the image of Christ (v.29), not about who gets in and who does not. The point is the destination, not the selection process.", proponents: "Karl Barth, Michael Gorman" },
        ],
        application: {
          question: "What is the thing you are most afraid could separate you from God's love? Name it. Then read verses 38-39 again.",
          connection: "Most Christians intellectually believe nothing can separate them from God's love. But functionally, they live as though their failures, doubts, or circumstances have done exactly that. This passage is not a theological proposition. It is an anchor for the days you cannot feel God.",
          thisWeek: "Write Romans 8:38-39 on a card and put it where you will see it every morning this week. Each time you read it, name one specific thing you are afraid of. Then read the verse aloud.",
        },
        deeper: {
          books: ["Romans (New International Commentary) by Douglas Moo", "Paul and the Faithfulness of God by N.T. Wright"],
          studyQuestion: "Paul says 'glorified' in the past tense even though we are clearly not yet glorified. What does it mean to live as though the outcome is already settled?",
          prayer: "God, I name the thing I am afraid will separate me from your love: [name it]. According to your word, it cannot. I do not fully believe that yet. Help my unbelief. Amen.",
        },
      },
    ],
  },
  {
    name: "Matthew", testament: "NT", hook: "The Gospel that asks who Jesus actually is",
    passages: [
      {
        ref: "Matthew 5:1-12",
        summary: "The Beatitudes and why 'blessed' does not mean happy",
        text: "Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn, for they will be comforted...",
        paraphrase: "The people God favors are not the ones the world favors. The poor, the grieving, the meek, the hungry for justice, the merciful, the pure-hearted, the peacemakers, the persecuted. In God's economy, these are the fortunate ones.",
        keyWords: [
          { word: "blessed", original: "makarios (Greek)", meaning: "Not 'happy.' The word means 'fortunate in God's estimation,' 'favored,' 'in the right place.' It is a status declaration, not an emotion." },
          { word: "poor in spirit", original: "ptochoi to pneumati (Greek)", meaning: "Ptochoi means desperately poor, not mildly lacking. These are people who have nothing left to offer God. They come empty-handed. Jesus says: that is exactly the right starting position." },
          { word: "meek", original: "praeis (Greek)", meaning: "Not weak. The word was used for a horse that had been trained, a war horse under control. Meekness is power under restraint. It is choosing not to use the force you have." },
        ],
        historical: [
          "Jesus delivers this sermon on a mountain, deliberately echoing Moses on Sinai. Matthew is presenting Jesus as the new Moses giving the new Torah to the new Israel.",
          "The Beatitudes reverse every value of both Roman culture (power, conquest, honor) and Pharisaic religion (ritual purity, visible righteousness). Jesus is building a counter-kingdom.",
          "In the first century, 'blessed' (makarios) was typically used of the gods or the wealthy. Jesus applies it to mourners, the poor, and the persecuted. The audience would have been shocked.",
        ],
        literary: {
          genre: "Sermon / ethical discourse. The Sermon on the Mount (chapters 5-7) is one of five major teaching blocks in Matthew, structured to parallel the five books of Moses.",
          devices: "Beatitude formula (repeated structure creates rhythm and memorability), reversal (expected values inverted), inclusio (first and last beatitude both promise 'the kingdom of heaven').",
          keyTerms: [
            { term: "makarios", language: "Greek", meaning: "A divine assessment of status. Not emotional happiness but positional favor. God looks at the mourning, the meek, the justice-hungry, and says: 'You are in the right place.'" },
            { term: "basileia ton ouranon", language: "Greek", meaning: "'Kingdom of heaven.' Not primarily an afterlife destination. The reign of God breaking into the present. Where God's will is done. The Beatitudes describe the citizens of that kingdom." },
          ],
          structure: "Eight beatitudes forming two groups of four. The first four describe internal conditions (poor, mourning, meek, hungry). The second four describe relational actions (merciful, pure, peacemaking, persecuted). Being leads to doing.",
        },
        scholars: [
          { view: "Entrance requirements", summary: "The Beatitudes describe the character God requires for kingdom entry. They are ethical demands.", proponents: "Traditional Reformed reading" },
          { view: "Gospel announcements", summary: "The Beatitudes are not demands but declarations. Jesus is not saying 'be poor to get blessed.' He is saying 'the poor are already blessed because the kingdom has come to them.'", proponents: "Dallas Willard, N.T. Wright" },
          { view: "Eschatological reversal", summary: "The Beatitudes describe the great reversal that will be fully realized when God's kingdom comes in fullness. They are promises about the future breaking into the present.", proponents: "Jurgen Moltmann, Walter Brueggemann" },
        ],
        application: {
          question: "Which beatitude do you most resist? That resistance is probably where the kingdom is trying to grow in you.",
          connection: "We read the Beatitudes as aspirations: 'I should be more meek.' But Jesus is not giving a self-improvement list. He is describing the people God is already blessing. If you are poor in spirit today, broken, grieving, hungry for things to be made right, you are not failing. You are in the right place.",
          thisWeek: "Pick the one beatitude that describes where you are right now, not where you want to be. Sit with it for five minutes each day. Do not try to fix it. Just let the word 'blessed' land on your actual condition.",
        },
        deeper: {
          books: ["The Divine Conspiracy by Dallas Willard", "Studies in the Sermon on the Mount by D. Martyn Lloyd-Jones"],
          studyQuestion: "If the Beatitudes are announcements rather than demands, how does that change the way you read the rest of the Sermon on the Mount?",
          prayer: "Jesus, I come to this mountain poor in spirit. I do not have what I thought I needed. According to your word, that is exactly where the kingdom begins. Meet me here. Amen.",
        },
      },
    ],
  },
  {
    name: "John", testament: "NT", hook: "The Gospel that starts before time and ends with breakfast",
    passages: [],
  },
  {
    name: "Galatians", testament: "NT", hook: "The angriest letter in the New Testament",
    passages: [],
  },
  {
    name: "Ephesians", testament: "NT", hook: "The letter about who you already are",
    passages: [],
  },
  {
    name: "Revelation", testament: "NT", hook: "Not a prediction. A protest.",
    passages: [],
  },
  {
    name: "Exodus", testament: "OT", hook: "The story of liberation that shaped every liberation since",
    passages: [],
  },
  {
    name: "Proverbs", testament: "OT", hook: "Wisdom for people who have to make decisions today",
    passages: [],
  },
  {
    name: "Isaiah", testament: "OT", hook: "The prophet who saw further than anyone",
    passages: [],
  },
  {
    name: "Daniel", testament: "OT", hook: "Faithfulness when the empire demands your worship",
    passages: [],
  },
];

const TABS = ["What It Says", "What It Meant", "How It's Built", "What Scholars Say", "Why It Matters", "Go Deeper"];

export default function DeepBibleCompanion() {
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedPassage, setSelectedPassage] = useState<Passage | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const booksWithContent = BOOKS.filter(b => b.passages.length > 0);

  return (
    <Layout>
      <SEOMeta
        title="Deep Bible Study Companion — Seminary Depth, Kitchen-Table Language"
        description="Study any passage with 6 layers of analysis: text, historical context, literary structure, scholarly perspectives, modern application, and deeper resources. PhD-level depth made accessible."
        structuredData={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Deep Bible Study Companion", applicationCategory: "ReligiousApp", offers: { "@type": "Offer", price: "0" } }}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard)", fontFamily: "var(--U)", marginBottom: "1.5rem" }}>FLAGSHIP TOOL</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1rem" }}>
            Deep Bible Study Companion
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--bone)", opacity: 0.6, maxWidth: "560px" }}>
            Seminary-level depth. Kitchen-table language. Six layers of analysis for every passage. No pastor required. No seminary required. Just you, the text, and the tools to understand it.
          </p>
        </div>
      </section>

      {!selectedBook ? (
        /* Book Selection */
        <section style={{ background: "var(--bone)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", marginBottom: "0.5rem" }}>Choose a book</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)", marginBottom: "2rem" }}>Books with full study content are highlighted. More books coming soon.</p>

            {["OT", "NT"].map(testament => (
              <div key={testament} style={{ marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontFamily: "var(--U)", marginBottom: "1rem" }}>
                  {testament === "OT" ? "Old Testament" : "New Testament"}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                  {BOOKS.filter(b => b.testament === testament).map(book => {
                    const hasContent = book.passages.length > 0;
                    return (
                      <button key={book.name} onClick={() => hasContent && setSelectedBook(book)} style={{
                        padding: "1.25rem", background: "var(--card)", border: `1px solid ${hasContent ? "var(--bone-muted)" : "var(--bone-muted)"}`,
                        borderRadius: "2px", cursor: hasContent ? "pointer" : "default", textAlign: "left",
                        opacity: hasContent ? 1 : 0.5, transition: "all 240ms cubic-bezier(0.22,1,0.36,1)",
                      }}
                        onMouseEnter={(e) => { if (hasContent) { e.currentTarget.style.borderColor = "var(--mustard)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bone-muted)"; e.currentTarget.style.transform = "none"; }}
                      >
                        <div style={{ fontFamily: "var(--F)", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", marginBottom: "0.25rem" }}>{book.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--ink-muted)", lineHeight: 1.4 }}>{book.hook}</div>
                        {!hasContent && <div style={{ fontSize: "0.65rem", color: "var(--mustard-text)", marginTop: "0.5rem", fontFamily: "var(--U)" }}>Coming soon</div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : !selectedPassage ? (
        /* Passage Selection */
        <section style={{ background: "var(--bone)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <button onClick={() => setSelectedBook(null)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", color: "var(--ink-muted)", fontSize: "0.85rem", fontFamily: "var(--U)", cursor: "pointer", marginBottom: "2rem" }}>
              <ArrowLeft size={14} /> All books
            </button>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "1.75rem", fontWeight: 400, color: "var(--ink)", marginBottom: "0.5rem" }}>{selectedBook.name}</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)", marginBottom: "2rem" }}>{selectedBook.hook}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {selectedBook.passages.map((p, i) => (
                <button key={i} onClick={() => { setSelectedPassage(p); setActiveTab(0); }} style={{
                  padding: "1.5rem", background: "var(--card)", border: "1px solid var(--bone-muted)", borderLeft: "3px solid var(--mustard)",
                  borderRadius: "2px", cursor: "pointer", textAlign: "left", transition: "all 240ms cubic-bezier(0.22,1,0.36,1)",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(20,17,12,0.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontFamily: "var(--F)", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", marginBottom: "0.25rem" }}>{p.ref}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>{p.summary}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Passage Study — 6 Layers */
        <section style={{ background: "var(--bone)", padding: "3rem 1.5rem" }}>
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <button onClick={() => setSelectedPassage(null)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", color: "var(--ink-muted)", fontSize: "0.85rem", fontFamily: "var(--U)", cursor: "pointer", marginBottom: "1.5rem" }}>
              <ArrowLeft size={14} /> {selectedBook.name}
            </button>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "1.75rem", fontWeight: 400, color: "var(--ink)", marginBottom: "2rem" }}>{selectedPassage.ref}</h2>

            {/* Tab Bar */}
            <div style={{ display: "flex", gap: "0", borderBottom: "1px solid var(--bone-muted)", marginBottom: "2rem", overflowX: "auto" }}>
              {TABS.map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(i)} style={{
                  padding: "0.75rem 1rem", background: "none", border: "none", borderBottom: activeTab === i ? "2px solid var(--mustard)" : "2px solid transparent",
                  color: activeTab === i ? "var(--ink)" : "var(--ink-muted)", fontSize: "0.8rem", fontFamily: "var(--U)", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
                }}>{tab}</button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ background: "var(--card)", border: "1px solid var(--bone-muted)", borderRadius: "2px", padding: "2rem" }}>
              {activeTab === 0 && (
                <div>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "1.25rem", color: "var(--ink)", marginBottom: "1.5rem" }}>The Text</h3>
                  <blockquote style={{ fontFamily: "var(--F)", fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.7, color: "var(--ink)", borderLeft: "2px solid var(--mustard)", paddingLeft: "1.5rem", margin: "0 0 2rem" }}>
                    {selectedPassage.text}
                  </blockquote>
                  <h4 style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "0.75rem" }}>Plain-English Paraphrase</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--ink)", marginBottom: "2rem" }}>{selectedPassage.paraphrase}</p>
                  <h4 style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "0.75rem" }}>Key Words</h4>
                  {selectedPassage.keyWords.map((kw, i) => (
                    <div key={i} style={{ marginBottom: "1.25rem", paddingLeft: "1rem", borderLeft: "2px solid var(--bone-muted)" }}>
                      <div style={{ fontFamily: "var(--F)", fontSize: "1rem", fontWeight: 500, color: "var(--ink)", marginBottom: "0.25rem" }}>"{kw.word}" — <span style={{ fontStyle: "italic", color: "var(--mustard-text)" }}>{kw.original}</span></div>
                      <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "var(--ink-muted)" }}>{kw.meaning}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 1 && (
                <div>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "1.25rem", color: "var(--ink)", marginBottom: "1.5rem" }}>Historical Context</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)", marginBottom: "1.5rem" }}>What the original audience heard that we miss.</p>
                  {selectedPassage.historical.map((h, i) => (
                    <div key={i} style={{ marginBottom: "1.25rem", padding: "1.25rem", background: "var(--bone)", borderRadius: "2px" }}>
                      <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink)" }}>{h}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 2 && (
                <div>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "1.25rem", color: "var(--ink)", marginBottom: "1.5rem" }}>Literary & Grammatical Analysis</h3>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "0.5rem" }}>Genre</h4>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink)" }}>{selectedPassage.literary.genre}</p>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "0.5rem" }}>Literary Devices</h4>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink)" }}>{selectedPassage.literary.devices}</p>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "0.5rem" }}>Key Terms</h4>
                    {selectedPassage.literary.keyTerms.map((kt, i) => (
                      <div key={i} style={{ marginBottom: "1rem", paddingLeft: "1rem", borderLeft: "2px solid var(--bone-muted)" }}>
                        <div style={{ fontFamily: "var(--F)", fontSize: "1rem", fontWeight: 500, color: "var(--ink)" }}>{kt.term} <span style={{ fontStyle: "italic", fontSize: "0.85rem", color: "var(--mustard-text)" }}>({kt.language})</span></div>
                        <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "var(--ink-muted)" }}>{kt.meaning}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "0.5rem" }}>Structure</h4>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink)" }}>{selectedPassage.literary.structure}</p>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "1.25rem", color: "var(--ink)", marginBottom: "1.5rem" }}>What Scholars Say</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)", marginBottom: "1.5rem" }}>Honest disagreement exists. Here are the major views.</p>
                  {selectedPassage.scholars.map((s, i) => (
                    <div key={i} style={{ marginBottom: "1.5rem", padding: "1.25rem", background: "var(--bone)", borderRadius: "2px", borderLeft: "2px solid var(--mustard)" }}>
                      <h4 style={{ fontFamily: "var(--F)", fontSize: "1rem", fontWeight: 500, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.view}</h4>
                      <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "var(--ink)", marginBottom: "0.5rem" }}>{s.summary}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--mustard-text)", fontFamily: "var(--U)" }}>Key proponents: {s.proponents}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 4 && (
                <div>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "1.25rem", color: "var(--ink)", marginBottom: "1.5rem" }}>Why It Matters Today</h3>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "0.5rem" }}>The Question This Passage Answers</h4>
                    <p style={{ fontFamily: "var(--F)", fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink)" }}>{selectedPassage.application.question}</p>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "0.5rem" }}>The Connection</h4>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink)" }}>{selectedPassage.application.connection}</p>
                  </div>
                  <div style={{ padding: "1.25rem", background: "var(--bone)", borderRadius: "2px", borderLeft: "2px solid var(--mustard)" }}>
                    <h4 style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "0.5rem" }}>This Week</h4>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink)" }}>{selectedPassage.application.thisWeek}</p>
                  </div>
                </div>
              )}

              {activeTab === 5 && (
                <div>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "1.25rem", color: "var(--ink)", marginBottom: "1.5rem" }}>Go Deeper</h3>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "0.75rem" }}>Recommended Books</h4>
                    {selectedPassage.deeper.books.map((b, i) => (
                      <p key={i} style={{ fontSize: "0.9rem", color: "var(--ink)", marginBottom: "0.5rem", paddingLeft: "1rem", borderLeft: "1px solid var(--bone-muted)" }}>{b}</p>
                    ))}
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "0.5rem" }}>Discussion Question</h4>
                    <p style={{ fontFamily: "var(--F)", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink)" }}>{selectedPassage.deeper.studyQuestion}</p>
                  </div>
                  <div style={{ padding: "1.25rem", background: "var(--charcoal)", borderRadius: "2px" }}>
                    <h4 style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "0.75rem" }}>A Prayer From This Passage</h4>
                    <p style={{ fontFamily: "var(--F)", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.7, color: "var(--bone)" }}>{selectedPassage.deeper.prayer}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation between tabs */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
              <button onClick={() => setActiveTab(Math.max(0, activeTab - 1))} disabled={activeTab === 0} style={{ padding: "0.5rem 1rem", background: "none", border: "1px solid var(--bone-muted)", borderRadius: "2px", color: activeTab === 0 ? "var(--bone-muted)" : "var(--ink)", fontSize: "0.8rem", fontFamily: "var(--U)", cursor: activeTab === 0 ? "default" : "pointer" }}>
                Previous Layer
              </button>
              <button onClick={() => setActiveTab(Math.min(5, activeTab + 1))} disabled={activeTab === 5} style={{ padding: "0.5rem 1rem", background: "none", border: "1px solid var(--bone-muted)", borderRadius: "2px", color: activeTab === 5 ? "var(--bone-muted)" : "var(--ink)", fontSize: "0.8rem", fontFamily: "var(--U)", cursor: activeTab === 5 ? "default" : "pointer" }}>
                Next Layer
              </button>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
