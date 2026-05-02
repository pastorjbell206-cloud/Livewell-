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
    passages: [
      {
        ref: "Exodus 3:1-15",
        summary: "The burning bush and the God who names himself",
        text: "Now Moses was tending the flock of Jethro his father-in-law, the priest of Midian, and he led the flock to the far side of the wilderness and came to Horeb, the mountain of God. There the angel of the Lord appeared to him in flames of fire from within a bush. Moses saw that though the bush was on fire it did not burn up...",
        paraphrase: "Moses was a fugitive working his father-in-law's sheep in the middle of nowhere. God showed up in a bush that burned without being consumed and told Moses to go back to the place he had fled. Moses asked for God's name. God gave him one that refuses to be pinned down: I AM WHO I AM.",
        keyWords: [
          { word: "I AM WHO I AM", original: "ehyeh asher ehyeh (Hebrew)", meaning: "The most debated phrase in the Old Testament. It can mean 'I am who I am,' 'I will be what I will be,' or 'I cause to be what I cause to be.' God's name is not a label. It is an unfinished sentence. He refuses to be categorized." },
          { word: "holy ground", original: "admat qodesh (Hebrew)", meaning: "Qodesh means 'set apart.' The ground was not inherently sacred. It became holy because God was present. Holiness in the Bible is not a property of places. It is a consequence of presence." },
          { word: "burning bush", original: "seneh bo'er (Hebrew)", meaning: "The bush (seneh) may be a wordplay on Sinai. The fire that does not consume is a theophany, a visible manifestation of God. Fire in the Old Testament signals God's presence and his refusal to be domesticated." },
        ],
        historical: [
          "Moses had been in Midian for forty years. He was eighty years old. He had killed an Egyptian, fled Pharaoh, and settled into obscurity. God's call came not at the height of Moses' competence but at the far end of his failure.",
          "The name YHWH (the tetragrammaton) revealed here became so sacred that Jews stopped pronouncing it, substituting 'Adonai' (Lord) instead. The name God gave to invite intimacy became the name humans were too reverent to speak.",
          "Horeb and Sinai are likely the same mountain. The place where God revealed his name is the same place where God would later give the law. The personal encounter precedes the public covenant. Name before command. Relationship before obligation.",
          "The burning bush as theophany distinguishes Israel's God from every other ancient Near Eastern deity. Egyptian gods were carved in stone. Canaanite gods were represented by fertility symbols. Israel's God shows up in fire that does not destroy what it touches.",
        ],
        literary: {
          genre: "Call narrative. The passage follows the classic prophetic call pattern: divine encounter, commission, objection, reassurance, sign. Moses' reluctance is not humility. It is resistance. God overrules it without dismissing it.",
          devices: "Dialogue drives the entire scene. God speaks, Moses objects, God responds. Five times Moses resists. The bush itself is a literary symbol: fire that does not consume mirrors a God who draws near without destroying.",
          keyTerms: [
            { term: "ehyeh", language: "Hebrew", meaning: "'I AM' or 'I will be.' The first person form of the verb 'to be.' God names himself not with a noun but with a verb. He is not a thing. He is an act. An ongoing, unfinished act of being." },
            { term: "seneh", language: "Hebrew", meaning: "The bush. Possibly a pun on Sinai. A lowly desert shrub, not a cedar or an oak. God reveals himself in what is small and overlooked. The pattern holds through the entire Bible." },
            { term: "YHWH", language: "Hebrew", meaning: "The personal name of God, related to the verb 'to be.' Not a title (like 'Lord' or 'Almighty') but a name. God gives Moses something no other deity in the ancient world offered: a personal name to call him by." },
          ],
          structure: "The passage moves from ordinary labor (v.1) to extraordinary encounter (v.2-6) to divine commission (v.7-10) to human objection (v.11-12) to divine self-revelation (v.13-15). The climax is not the commission. It is the name.",
        },
        scholars: [
          { view: "Revelatory theology", summary: "The name 'I AM WHO I AM' is God's definitive self-disclosure. It establishes God as self-existent, uncaused, and sovereign. The name is both an invitation and a boundary: God reveals enough to relate but not enough to control.", proponents: "Brevard Childs, Walter Brueggemann" },
          { view: "Liberation theology reading", summary: "The burning bush is inseparable from the cry of the enslaved (v.7-9). God reveals his name in the context of hearing suffering. The name is not abstract philosophy. It is a promise of action: 'I will be present with you in the work of liberation.'", proponents: "Gustavo Gutiérrez, James Cone" },
          { view: "Mosaic vocation reading", summary: "The passage is primarily about call, not theology. Moses' five objections mirror every human resistance to divine vocation. God does not remove the inadequacy. He promises his presence alongside it.", proponents: "Terence Fretheim, Dennis Olson" },
        ],
        application: {
          question: "Moses was eighty and hiding when God called him. Where have you decided you are too old, too failed, or too far gone to be used?",
          connection: "We want God to call us at our best. God called Moses at his worst. Forty years of tending someone else's sheep. The burning bush did not appear to the young, ambitious Moses in Pharaoh's court. It appeared to the old, broken Moses in the wilderness. God's timing looks like waste until it looks like wisdom.",
          thisWeek: "Identify one area of your life where you have been telling God 'send someone else.' Write it down. Then read Exodus 3:12 again: 'I will be with you.' Sit with that promise for five minutes each day.",
        },
        deeper: {
          books: ["Exodus (Old Testament Library) by Brevard Childs", "Exodus: A Theological Commentary by Dennis Olson", "The God Who Acts by G. Ernest Wright"],
          studyQuestion: "God gives Moses a name that is essentially a verb: 'I AM.' What does it mean to worship a God who refuses to be a noun, who defines himself not as a thing but as an ongoing act of presence?",
          prayer: "God who burns without consuming, I confess I have been hiding in Midian. I have called my fear humility and my avoidance wisdom. You know my name. You have told me yours. That is enough to start. Amen.",
        },
      },
      {
        ref: "Exodus 20:1-17",
        summary: "The Ten Commandments and why they are gift before demand",
        text: "And God spoke all these words: 'I am the Lord your God, who brought you out of Egypt, out of the land of slavery. You shall have no other gods before me...'",
        paraphrase: "Before God gave a single command, he reminded Israel who he was and what he had already done. The law begins with grace. The first word is not 'thou shalt.' It is 'I am the Lord who set you free.' Every command that follows is built on that foundation.",
        keyWords: [
          { word: "I am the Lord your God", original: "anokhi YHWH elohekha (Hebrew)", meaning: "The prologue before the commands. In ancient suzerainty treaties, the great king identified himself and named what he had done for the vassal before listing obligations. God follows the same pattern: identity, then history, then expectation." },
          { word: "You shall not", original: "lo (Hebrew)", meaning: "The Hebrew commands are apodictic law: absolute, unconditional, without exceptions or penalties listed. 'You shall not murder' does not say 'or else.' It describes the kind of people a redeemed community becomes." },
          { word: "covet", original: "chamad (Hebrew)", meaning: "Not merely wanting. Chamad means to desire with intent to acquire. The tenth commandment is the only one that legislates the interior life. It is the hinge between external behavior and internal formation." },
        ],
        historical: [
          "The Ten Commandments follow the exact structure of ancient Near Eastern suzerainty treaties: preamble ('I am the Lord'), historical prologue ('who brought you out'), stipulations (the commands), and implied blessings and curses. Israel would have recognized this form immediately. God is making a covenant, not issuing a memo.",
          "The distinction between apodictic law ('You shall not murder') and casuistic law ('If a man does X, then Y shall happen') matters. The Ten Commandments are entirely apodictic: absolute principles with no case-by-case conditions. They define identity, not just behavior. The casuistic applications come later in Exodus 21-23.",
          "The prologue, 'I am the Lord your God, who brought you out of Egypt,' means every command rests on prior deliverance. Israel does not obey in order to be saved. Israel obeys because it has already been saved. The order is grace first, then law. Always.",
          "The command about Sabbath is the longest of the ten. In a world where Pharaoh demanded seven-day-a-week labor from enslaved people, a mandatory day of rest was revolutionary. Sabbath is not a spiritual luxury. It is a refusal to let any human system own all your time.",
        ],
        literary: {
          genre: "Covenant law / treaty stipulations. The Ten Commandments are not a legal code in the modern sense. They are the terms of a relationship between a liberating God and a liberated people. The genre is relational before it is legal.",
          devices: "The prologue establishes the relationship before the requirements. The commands move from God-directed (1-4) to human-directed (5-10), establishing vertical relationship as the foundation for horizontal ethics. The tenth command (coveting) turns inward, making the list a journey from worship to the human heart.",
          keyTerms: [
            { term: "anokhi", language: "Hebrew", meaning: "'I myself.' The emphatic first person pronoun. God does not begin with 'You must.' He begins with 'I am.' The commands are grounded in God's character, not human capacity." },
            { term: "berith", language: "Hebrew", meaning: "'Covenant.' The Ten Commandments are covenant stipulations, not abstract moral principles. They make sense only inside a relationship. Outside the covenant, they are just rules. Inside it, they are the shape of love." },
            { term: "pesel", language: "Hebrew", meaning: "'Carved image.' The command against idols is not about statues. It is about any attempt to make God manageable, predictable, small enough to fit in a shrine. Every generation carves its own version." },
          ],
          structure: "The two-tablet structure divides the commands between duties to God (1-4) and duties to neighbor (5-10). Jesus later summarized this same structure: love God, love neighbor. The entire law hangs on these two movements.",
        },
        scholars: [
          { view: "Covenant treaty reading", summary: "The Ten Commandments follow the Hittite suzerainty treaty format. They are not timeless moral principles dropped from heaven but covenant terms given to a specific people at a specific time, with universal implications that emerge from the particular.", proponents: "George Mendenhall, Dennis McCarthy, Meredith Kline" },
          { view: "Gift theology", summary: "The commands are not burdens but gifts. They describe the shape of a free life. A people just liberated from slavery need to know what freedom looks like in practice. The law is the architecture of liberty.", proponents: "Walter Brueggemann, Patrick Miller" },
          { view: "Moral law tradition", summary: "The Ten Commandments reflect the eternal moral law of God, valid across all times and cultures. While the ceremonial and civil laws of Israel were fulfilled in Christ, the moral law remains binding.", proponents: "John Calvin, Westminster Confession, traditional Reformed theology" },
        ],
        application: {
          question: "Which commandment have you reduced to a rule you keep rather than a relationship it was meant to protect?",
          connection: "We read the Ten Commandments as restrictions. They were given as the architecture of freedom. A people who had been slaves for four hundred years did not need more commands. They needed a framework for living as free people. Every 'you shall not' is protecting something precious: life, marriage, truth, contentment, worship.",
          thisWeek: "Pick one commandment and spend the week asking not 'Am I obeying this?' but 'What is this protecting in my life?' Move from compliance to understanding. Let the command become a gift.",
        },
        deeper: {
          books: ["The Ten Commandments by Patrick Miller", "Theology of the Old Testament by Walter Brueggemann", "Treaty of the Great King by Meredith Kline"],
          studyQuestion: "If the prologue ('I am the Lord who brought you out') is removed, the commandments become generic moral rules. What changes when every command is read as spoken by a God who has already rescued you?",
          prayer: "God who freed Israel before you instructed Israel, free me from reading your commands as a checklist. Show me what each one protects. Let me live as a free person, not a compliant one. Amen.",
        },
      },
    ],
  },
  {
    name: "Proverbs", testament: "OT", hook: "Wisdom for people who have to make decisions today",
    passages: [
      {
        ref: "Proverbs 1:1-7",
        summary: "The thesis statement of the entire book and what fear actually means",
        text: "The proverbs of Solomon son of David, king of Israel: for gaining wisdom and instruction; for understanding words of insight; for receiving instruction in prudent behavior... The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.",
        paraphrase: "Before any advice is given, the book tells you why it exists: to make you wise, not just informed. And the foundation of all wisdom is this: take God seriously. Not terror. Reverence. The posture of someone who knows they are not the smartest person in the room, because God is.",
        keyWords: [
          { word: "fear", original: "yirah (Hebrew)", meaning: "Not terror or dread. Yirah is reverence, awe, the proper response to standing before something vastly greater than yourself. It is the posture of a student before a master, a creature before a Creator. Fear in this sense is not the opposite of love. It is the beginning of it." },
          { word: "wisdom", original: "chokmah (Hebrew)", meaning: "Not intelligence or education. Chokmah is skill for living. It is the ability to navigate the world as it actually is, not as you wish it were. In the ancient world, the same word was used for a craftsman's skill. Wisdom is practical, not abstract." },
          { word: "beginning", original: "reshith (Hebrew)", meaning: "Can mean 'beginning,' 'first principle,' or 'foundation.' The fear of the Lord is not where wisdom starts and then moves past. It is the foundation on which every other insight is built. Remove it and the structure collapses." },
        ],
        historical: [
          "Solomon's association with Proverbs is real but complex. He authored many proverbs, but the book was compiled over centuries. Chapters 25-29 are attributed to Solomon but collected by 'the men of Hezekiah,' two hundred years later. Proverbs is not one author's work. It is a tradition's accumulated wisdom.",
          "Wisdom literature was an international genre in the ancient Near East. Egypt had 'The Instruction of Amenemope,' which shares striking parallels with Proverbs 22-24. Israel participated in a broader wisdom tradition but anchored it in covenant theology: wisdom begins with YHWH, not with human observation alone.",
          "Proverbs is structured in two main sections: chapters 1-9 are extended instruction speeches from a father (or teacher) to a son, personifying wisdom as a woman who calls out in the streets. Chapters 10-31 shift to sentence proverbs, short two-line observations. The instruction speeches set the theological framework. The sentence proverbs apply it to daily life.",
        ],
        literary: {
          genre: "Wisdom literature. Proverbs is not prophecy, not law, not narrative. It is observation refined into instruction. The genre assumes that the world has a moral order built into it by God, and that attentive people can discern that order and live accordingly.",
          devices: "Parallelism is the primary device: synonymous (line B restates line A), antithetic (line B contrasts line A), and synthetic (line B completes line A). The personification of Wisdom as a woman (Lady Wisdom in chapter 1) creates a dramatic contrast with the 'forbidden woman' who represents folly.",
          keyTerms: [
            { term: "yirah", language: "Hebrew", meaning: "'Fear, reverence, awe.' The controlling concept of the entire book. Without this orientation toward God, all other wisdom becomes mere cleverness, and cleverness without reverence is dangerous." },
            { term: "chokmah", language: "Hebrew", meaning: "'Wisdom, skill.' The ability to live well in God's world. Not theoretical knowledge but practical competence. A wise person is not someone who knows facts. A wise person is someone who knows what to do next." },
            { term: "musar", language: "Hebrew", meaning: "'Discipline, instruction, correction.' Wisdom does not come free. It requires submission to correction, which is why fools despise it. The fool's problem is not ignorance. It is refusal." },
          ],
          structure: "Verses 1-6 are the preamble: purpose and audience. Verse 7 is the thesis: the fear of the Lord is the beginning of knowledge. Everything that follows in the entire book is commentary on verse 7. The structure is foundation first, application second.",
        },
        scholars: [
          { view: "Theological wisdom", summary: "Verse 7 is not merely an introduction but the hermeneutical key to the entire book. All practical wisdom in Proverbs flows from and returns to the fear of the Lord. Wisdom without God is not wisdom at all.", proponents: "Tremper Longman III, Bruce Waltke" },
          { view: "Pedagogical reading", summary: "Proverbs 1-9 functions as a curriculum introduction. The father-to-son speeches are a teaching method, preparing the student to receive the sentence proverbs that follow. The structure is intentionally educational.", proponents: "Roland Murphy, Michael Fox" },
          { view: "Ancient Near Eastern context", summary: "Proverbs participates in a wider wisdom tradition shared across the ancient Near East. Israel's distinctive contribution is grounding wisdom in covenant relationship with YHWH rather than in human reason alone.", proponents: "James Crenshaw, John Walton" },
        ],
        application: {
          question: "Where in your life are you trying to be wise without being reverent? Where have you substituted cleverness for the kind of humility that actually produces good decisions?",
          connection: "Our culture prizes intelligence, information, and expertise. Proverbs says none of those are wisdom. Wisdom begins with a posture: acknowledging that you are not the final authority on your own life. In a world that tells you to trust yourself above all, verse 7 is a quiet act of rebellion.",
          thisWeek: "Each morning this week, before you check your phone, pause and say: 'I am not the wisest person in this room. God, teach me what I cannot teach myself.' See if the day unfolds differently when it begins with that posture.",
        },
        deeper: {
          books: ["The Book of Proverbs: Chapters 1-15 by Bruce Waltke", "Proverbs (Old Testament Library) by Roland Murphy", "The Fear of the Lord Is Wisdom by Tremper Longman III"],
          studyQuestion: "If 'the fear of the Lord is the beginning of knowledge,' what does that say about the kind of knowledge available to someone who has no reverence for anything greater than themselves? Is secular wisdom incomplete, or is it a different thing entirely?",
          prayer: "God, I confess I have often chosen cleverness over wisdom. I have trusted my own judgment and called it discernment. Teach me the fear that is not terror but awe, the kind that makes me quiet enough to hear you. Amen.",
        },
      },
      {
        ref: "Proverbs 31:10-31",
        summary: "The woman of valor and what the passage actually celebrates",
        text: "A wife of noble character who can find? She is worth far more than rubies. Her husband has full confidence in her and lacks nothing of value...",
        paraphrase: "This is not a checklist for women. It is a poem of admiration for a person of strength, resourcefulness, and fearless competence. The Hebrew calls her a warrior. The church turned her into a homemaker. The text says something far more dangerous.",
        keyWords: [
          { word: "noble character", original: "eshet chayil (Hebrew)", meaning: "Chayil means 'valor, strength, might.' It is the same word used for warriors and armies throughout the Old Testament. Ruth is called an eshet chayil. Boaz is called a gibbor chayil (mighty warrior). The word is military before it is domestic. This woman is not merely virtuous. She is formidable." },
          { word: "she laughs at the days to come", original: "vatischaq leyom acharon (Hebrew)", meaning: "Not naivety. This woman can laugh at the future because she has done the work of preparation. Her confidence is earned. She faces what is coming without anxiety because she has been faithful in what is present." },
          { word: "fears the Lord", original: "yirat YHWH (Hebrew)", meaning: "Verse 30 is the interpretive key. 'Charm is deceptive and beauty is fleeting, but a woman who fears the Lord is to be praised.' The entire poem hangs on this verse. Her strength, her commerce, her generosity, her wisdom — all of it flows from the same foundation Proverbs 1:7 established." },
        ],
        historical: [
          "This passage is an acrostic poem: each verse begins with a successive letter of the Hebrew alphabet, aleph through tav. It is not a list of requirements. It is a literary celebration, an A-to-Z portrait meant to say: 'This woman is everything, from beginning to end.'",
          "In Jewish tradition, 'eshet chayil' is sung by husbands to their wives every Friday evening at the Sabbath table. It is not a standard to meet. It is a blessing spoken over someone. The tradition understood what the modern church often misses: this is praise, not prescription.",
          "The woman in this poem is an entrepreneur (she buys fields, trades goods, manages a household economy), a teacher ('faithful instruction is on her tongue'), and a community leader ('she extends her hands to the needy'). Reducing her to a domestic ideal requires ignoring two-thirds of the text.",
        ],
        literary: {
          genre: "Acrostic poem / heroic portrait. The acrostic structure is not decorative. In Hebrew literature, an A-to-Z poem signifies completeness. This woman embodies wisdom from aleph to tav. She is the human fulfillment of Lady Wisdom from Proverbs 1-9.",
          devices: "Acrostic (each verse begins with the next Hebrew letter), hyperbole (not meant as a literal daily schedule), inclusio (the poem begins with her value — 'worth far more than rubies' — and ends with the reason — 'a woman who fears the Lord').",
          keyTerms: [
            { term: "chayil", language: "Hebrew", meaning: "'Valor, strength, might, wealth.' Used 243 times in the Old Testament, overwhelmingly in military contexts. Translating it as 'noble character' or 'virtuous' domesticates a word that means something far stronger." },
            { term: "sadin", language: "Hebrew", meaning: "'Fine linen garments.' She makes and sells them. She is not merely crafting for her family. She is running a business. The text describes economic agency, not domestic confinement." },
            { term: "oz vehadar", language: "Hebrew", meaning: "'Strength and dignity are her clothing.' Oz means 'fierce strength.' Hadar means 'splendor, majesty.' The same words are used of God elsewhere. Her character is her adornment." },
          ],
          structure: "The poem moves from her economic activity (v.10-18) to her community engagement (v.19-22) to her public reputation (v.23-27) to the verdict (v.28-31). The structure builds outward: home, marketplace, city gate, divine evaluation. The final word is praise.",
        },
        scholars: [
          { view: "Wisdom personified", summary: "The eshet chayil is the human embodiment of Lady Wisdom from Proverbs 1-9. The book opens with Wisdom calling out and closes with a woman who lives it. She is the thesis made flesh.", proponents: "Christine Roy Yoder, Tremper Longman III" },
          { view: "Household economics", summary: "The passage reflects the economic realities of ancient Israelite life, where the household was the primary unit of production. The woman's activities are not exceptional. They describe the skilled management of a household economy.", proponents: "Carol Meyers, Victor Matthews" },
          { view: "Feminist recovery", summary: "The passage has been misused as a checklist to measure women's performance. Read in its original context, it celebrates female agency, economic power, public voice, and intellectual strength. The text is more feminist than the church has allowed it to be.", proponents: "Ellen Davis, Kathleen O'Connor" },
        ],
        application: {
          question: "Have you been reading this passage as a standard to meet or a song of praise for strength already present? What changes if you read it as celebration rather than expectation?",
          connection: "The church has too often turned this poem into a performance review. Women hear it and feel inadequate. Men hear it and build a checklist for a future wife. But the poem is not a job description. It is a standing ovation. The Jewish tradition gets it right: you sing this over someone you love. You do not hand it to them as a to-do list.",
          thisWeek: "If you are married, read this poem to your spouse this week, not as a standard but as a blessing. If you are not, read it as a description of wisdom embodied. Ask: where do I see this kind of strength in the women around me? Name it. Tell them.",
        },
        deeper: {
          books: ["Proverbs 31: Discovering the Joys of a Faithful Life by Ellen Davis", "The Book of Proverbs: Chapters 15-31 by Bruce Waltke", "Discovering Biblical Equality edited by Ronald Pierce and Rebecca Merrill Groothuis"],
          studyQuestion: "If 'eshet chayil' means 'woman of valor' or 'warrior woman,' how does that change what the passage is celebrating? What is lost when we translate chayil as 'virtuous' or 'noble character'?",
          prayer: "God, forgive me for turning your songs of praise into performance reviews. Teach me to see strength where I have only looked for compliance. And where I see that strength, give me the courage to name it. Amen.",
        },
      },
    ],
  },
  {
    name: "Isaiah", testament: "OT", hook: "The prophet who saw further than anyone",
    passages: [
      {
        ref: "Isaiah 53:1-12",
        summary: "The Suffering Servant and the scandal of vicarious suffering",
        text: "Who has believed our message and to whom has the arm of the Lord been revealed? He grew up before him like a tender shoot, and like a root out of dry ground. He had no beauty or majesty to attract us to him, nothing in his appearance that we should desire him. He was despised and rejected by mankind, a man of suffering, and familiar with pain...",
        paraphrase: "The servant of God does not arrive the way power always arrives. He comes without beauty, without army, without credentials. He is crushed not for his own failures but for ours. The logic is backward: the innocent suffers so the guilty can be healed. No one asked for this. No one expected it. It offends every system of justice we have built.",
        keyWords: [
          { word: "pierced", original: "mecholal (Hebrew)", meaning: "From the root chalal, meaning 'to pierce, to wound fatally.' The word implies violent, deliberate wounding. 'He was pierced for our transgressions' — the preposition 'for' (min) indicates substitution. He was pierced instead of us, on account of us." },
          { word: "bore", original: "nasa (Hebrew)", meaning: "To carry, to lift, to bear the weight of. The same word is used for the scapegoat carrying Israel's sins into the wilderness (Leviticus 16). The servant carries what does not belong to him. The sin is ours. The weight is his." },
          { word: "it was the Lord's will to crush him", original: "YHWH chaphets dak'o (Hebrew)", meaning: "The most disturbing line in the passage. Chaphets means 'to delight in, to desire.' God willed the servant's suffering. This is not passive permission. It is active purpose. The scandal is that God's plan for redemption runs through suffering, not around it." },
        ],
        historical: [
          "Isaiah 53 is the fourth of four 'Servant Songs' in Isaiah (42:1-9, 49:1-7, 50:4-9, 52:13-53:12). The identity of the servant is the most debated question in Old Testament scholarship. Is the servant Israel as a nation? A faithful remnant? The prophet himself? A future messianic figure? The text sustains multiple readings because the servant functions on multiple levels.",
          "In Jewish interpretation, the servant has most often been identified with Israel itself — the nation suffers vicariously for the world. The Targum Jonathan (Aramaic translation) identifies the servant as the Messiah but reassigns the suffering to Israel's enemies. The idea that the Messiah himself would suffer was deeply scandalous.",
          "Early Christians read Isaiah 53 as the clearest Old Testament prophecy of Jesus' crucifixion. The Ethiopian eunuch in Acts 8 is reading this exact passage when Philip explains it to him. The New Testament writers saw in Isaiah 53 the theological framework for understanding why the Messiah had to die.",
          "The concept of vicarious suffering — the innocent bearing the punishment of the guilty — was rare in the ancient world. Justice systems were built on retribution: the guilty suffer for their own crimes. Isaiah 53 introduces a logic that overturns retribution with substitution. It is the theological earthquake beneath the entire gospel.",
        ],
        literary: {
          genre: "Prophetic poetry / Servant Song. The passage is part of a larger literary unit (the four Servant Songs) embedded within Isaiah 40-55, often called 'Deutero-Isaiah' or the 'Book of Comfort.' The genre is prophetic oracle with lyric intensity.",
          devices: "Contrast (exalted/humiliated, guilty/innocent, many/one), substitutionary language ('for our transgressions,' 'for our iniquities'), simile (lamb to slaughter, sheep before shearers), irony (the silent sufferer accomplishes what all the loud prophets could not).",
          keyTerms: [
            { term: "eved YHWH", language: "Hebrew", meaning: "'Servant of the Lord.' The title carries echoes of Moses, David, and the prophets — all called 'servants.' But this servant surpasses them all: he does not merely speak God's word. He embodies God's redemption in his own body." },
            { term: "asham", language: "Hebrew", meaning: "'Guilt offering.' In verse 10, the servant's life is made an asham — the specific sacrifice for trespass against God. The servant does not just die. He becomes the sacrifice itself. The categories of temple worship are applied to a human life." },
            { term: "yatsa'", language: "Hebrew", meaning: "The servant 'poured out his life unto death' (v.12). The verb suggests voluntary self-emptying. This is not victimhood. It is agency. He chose it." },
          ],
          structure: "The passage moves from rejection (v.1-3) to substitutionary suffering (v.4-6) to silent endurance (v.7-9) to vindication and purpose (v.10-12). The low point is the center. The resolution is not escape from suffering but meaning within it.",
        },
        scholars: [
          { view: "Messianic prophecy", summary: "The servant is a prophetic portrait of Jesus Christ. The details — rejection, silent suffering, substitutionary death, vindication — correspond too precisely to be coincidence. Isaiah saw the cross seven hundred years before it happened.", proponents: "J. Alec Motyer, Edward Young, traditional Christian reading" },
          { view: "Corporate Israel reading", summary: "The servant is Israel, suffering in exile for the eventual benefit of the nations. The passage describes the vocation of God's people to suffer faithfully as a witness to the world. This does not exclude a messianic reading but begins with a national one.", proponents: "H.H. Rowley, John Goldingay" },
          { view: "Both/and reading", summary: "The servant operates on multiple levels: Israel, the prophet, and the coming Messiah. The ambiguity is intentional. The servant is whoever fulfills the vocation of faithful suffering on behalf of others. Jesus is the final and fullest embodiment of a pattern that runs through Israel's entire story.", proponents: "Brevard Childs, N.T. Wright, Richard Bauckham" },
        ],
        application: {
          question: "Where in your life are you bearing a cost that is not yours to bear? And where have you refused to bear a cost that love requires?",
          connection: "We want a God who removes suffering. Isaiah 53 gives us a God who enters it. The servant does not explain pain. He absorbs it. For those who follow Jesus, this is not just theology. It is a vocation. There are burdens that love requires you to carry for someone else. Not as a doormat. As a servant.",
          thisWeek: "Read Isaiah 53 slowly, once each day. On the first reading, let it describe Jesus. On the second, ask where you see innocent suffering around you. On the third, ask what burden you might be called to carry for someone else this week.",
        },
        deeper: {
          books: ["The Prophecy of Isaiah by J. Alec Motyer", "Isaiah 40-66 (New International Commentary) by John Goldingay", "Jesus and the Suffering Servant edited by William Bellinger Jr. and William Farmer"],
          studyQuestion: "If the servant's suffering is both Israel's vocation and Jesus' mission, what does that say about the vocation of the church? Are Christians called to vicarious suffering, or was that unique to Christ?",
          prayer: "God, I do not understand the logic of vicarious suffering. I want justice, not substitution. But you have carried what I could not. Teach me what it means to bear someone else's weight without resentment, without martyrdom, and without losing myself. Amen.",
        },
      },
      {
        ref: "Isaiah 6:1-8",
        summary: "Isaiah's call and what holiness does to a person",
        text: "In the year that King Uzziah died, I saw the Lord, high and exalted, seated on a throne; and the train of his robe filled the temple. Above him were seraphim, each with six wings: With two wings they covered their faces, with two they covered their feet, and with two they were flying...",
        paraphrase: "The king was dead. The nation was unstable. And in that political vacuum, Isaiah saw the real King. The vision did not comfort him. It undid him. He saw God's holiness and his first response was not worship. It was terror. He knew he was unclean. God did not argue the point. He sent fire to burn the guilt away. Then he asked for a volunteer.",
        keyWords: [
          { word: "holy, holy, holy", original: "qadosh, qadosh, qadosh (Hebrew)", meaning: "The trisagion — the only attribute of God repeated three times in Scripture. Hebrew uses repetition for emphasis. To say something twice is to intensify it. To say it three times is to make it absolute. God is not merely holy. Holiness is what God is. It is not one of his attributes. It is the attribute that defines all the others." },
          { word: "unclean lips", original: "tame sephataim (Hebrew)", meaning: "Tame means 'ritually impure, defiled.' Isaiah's confession is specific: his lips are the problem. He is a prophet. His lips are his instrument. The very tool of his calling is the site of his contamination. He cannot fix this himself." },
          { word: "whom shall I send", original: "et mi eshlach (Hebrew)", meaning: "God does not command Isaiah. He asks. The commission is framed as an invitation, not a conscription. After the cleansing, Isaiah is free to choose. His response, 'Here am I, send me' (hineni shelacheni), uses hineni — the same word Abraham used. It means total availability." },
        ],
        historical: [
          "King Uzziah reigned for fifty-two years (792-740 BC). His death was not just a personal loss. It was a national crisis. Uzziah had been a strong king. Without him, Judah faced Assyrian expansion under Tiglath-Pileser III. Isaiah's vision came at a moment when the earthly throne was empty and the nation was afraid.",
          "Uzziah died a leper, struck by God for entering the temple to burn incense — a priestly duty the king had no right to perform (2 Chronicles 26:16-21). The irony is heavy: the king who trespassed in the temple is dead, and now Isaiah sees the true King in that same temple. One entered presumptuously. The other enters trembling.",
          "Seraphim appear only here in the entire Bible. The word saraph means 'burning one.' They are not the gentle angels of Christmas cards. They are creatures of fire who cover their own faces before God's holiness. If the seraphim cannot look at God uncovered, Isaiah's terror makes complete sense.",
          "The coal taken from the altar (v.6-7) connects to the sacrificial system. The altar fire consumed offerings for sin. The same fire that accepts sacrifice now purifies the prophet. Atonement and calling are linked: you cannot be sent until you have been cleansed.",
        ],
        literary: {
          genre: "Prophetic call narrative / throne-room vision. The passage follows the pattern of prophetic commissions (compare Jeremiah 1, Ezekiel 1-3) but with distinctive intensity. The vision is not of a garden or a battlefield. It is of the divine throne room. The setting establishes the authority behind everything Isaiah will say.",
          devices: "Sensory overload (sight, sound, physical sensation — the doorposts shake), contrast (God's holiness / Isaiah's uncleanness), dialogue (the seraphim's cry, Isaiah's confession, God's question), the number three (trisagion, six wings in three pairs).",
          keyTerms: [
            { term: "qadosh", language: "Hebrew", meaning: "'Holy, set apart, wholly other.' Not moral purity in the narrow sense. Holiness is God's radical otherness, the quality that makes God God and not anything else. It is the weight of his reality." },
            { term: "saraph", language: "Hebrew", meaning: "'Burning one.' The seraphim are fire-creatures. Even they cover themselves before God. The same root gives us the 'fiery serpents' in Numbers 21. These are not safe beings. They are dangerous, and they worship." },
            { term: "hineni", language: "Hebrew", meaning: "'Here I am.' The word of total availability. Abraham said it (Genesis 22). Moses said it (Exodus 3). Samuel said it (1 Samuel 3). It is the most dangerous word in the Hebrew Bible because it means 'I am holding nothing back.'" },
          ],
          structure: "The passage has five movements: vision (v.1-2), worship (v.3-4), confession (v.5), cleansing (v.6-7), commission (v.8). The structure is the anatomy of a calling: you see God, you see yourself, you are undone, you are restored, you are sent. The order cannot be rearranged.",
        },
        scholars: [
          { view: "Throne-room commissioning", summary: "Isaiah 6 is a royal court scene. Isaiah is being commissioned as God's herald, like a messenger sent from a king's throne room. The vision establishes Isaiah's authority: he speaks for the King who sits above all kings.", proponents: "John Oswalt, Brevard Childs" },
          { view: "Liturgical reading", summary: "The passage reflects the worship of the Jerusalem temple. The seraphim's cry ('Holy, holy, holy') may be a liturgical formula used in temple worship. Isaiah's vision is an intensified experience of what Israel encountered in worship.", proponents: "Joseph Blenkinsopp, Marvin Sweeney" },
          { view: "Woe oracle reversed", summary: "Isaiah has just pronounced six 'woe' oracles against others (chapter 5). Now the seventh 'woe' falls on himself: 'Woe to me! I am ruined!' The prophet who judged others is judged. The pattern is self-implication before commission.", proponents: "Walter Brueggemann, Christopher Seitz" },
        ],
        application: {
          question: "When was the last time an encounter with God undid you rather than merely comforted you? If the answer is never, is the God you are worshipping large enough?",
          connection: "We have domesticated worship. We come to God for comfort, encouragement, a boost for the week. Isaiah came to the temple and was wrecked. The holiness of God did not affirm him. It exposed him. Real encounter with God does not leave you feeling better about yourself. It leaves you on the floor. And then — only then — it rebuilds you for a purpose you could not have imagined.",
          thisWeek: "Before you worship this week — whether in church or in private — pause and read Isaiah 6:1-4. Let the weight of holiness land before you start asking for things. Begin with awe. See if your prayers change when they start from the floor instead of from a wish list.",
        },
        deeper: {
          books: ["The Book of Isaiah: Chapters 1-39 by John Oswalt", "Isaiah 1-39 (Anchor Bible) by Joseph Blenkinsopp", "The Holy One of Israel by Richard Bauckham"],
          studyQuestion: "Isaiah's lips — the tool of his prophetic calling — are the specific site of his uncleanness. What is the equivalent for you? Where is your greatest gift also your greatest vulnerability to sin?",
          prayer: "Holy God, I have come to worship casually. I have treated your presence like a comfort station. Undo me. Show me what the seraphim see. And when I am on the floor, send the coal. I need to be burned clean before I can be sent. Hineni. Amen.",
        },
      },
    ],
  },
  {
    name: "Daniel", testament: "OT", hook: "Faithfulness when the empire demands your worship",
    passages: [
      {
        ref: "Daniel 3:1-30",
        summary: "The fiery furnace and faithfulness without guarantee",
        text: "King Nebuchadnezzar made an image of gold, sixty cubits high and six cubits wide, and set it up on the plain of Dura in the province of Babylon... Shadrach, Meshach and Abednego replied to him, 'King Nebuchadnezzar, we do not need to defend ourselves before you in this matter. If we are thrown into the blazing furnace, the God we serve is able to deliver us from it, and he will deliver us from Your Majesty's hand. But even if he does not, we want you to know, Your Majesty, that we will not serve your gods or worship the image of gold you have set up.'",
        paraphrase: "The empire built a statue and demanded everyone worship it. Three Jewish exiles refused. When threatened with incineration, they gave one of the most remarkable speeches in Scripture: God can save us. But even if he does not, we will not bow. That 'even if he does not' is the entire theology of faithfulness without guarantee.",
        keyWords: [
          { word: "even if he does not", original: "hen la (Aramaic)", meaning: "The most theologically loaded two words in the book of Daniel. 'Hen' means 'if' or 'behold.' 'La' means 'not.' The three men separate God's ability from God's obligation. He can save them. He is not required to. They will obey regardless. This is faith without a safety net." },
          { word: "image of gold", original: "tselem di dehav (Aramaic)", meaning: "The statue was ninety feet tall and nine feet wide — absurdly disproportionate, more obelisk than human form. It was not art. It was a loyalty test. Bowing was not worship in the private sense. It was political submission. The empire does not care what you believe. It cares that you bow." },
          { word: "a fourth figure", original: "revei (Aramaic)", meaning: "Nebuchadnezzar sees four figures in the furnace, though only three were thrown in. He describes the fourth as looking like 'a son of the gods' (bar elahin). The text does not identify him. Jewish tradition sees an angel. Christian tradition sees a pre-incarnate Christ. The text leaves it open. The point is: God is in the fire." },
        ],
        historical: [
          "The Babylonian exile (586-539 BC) was the defining crisis of ancient Israel. The temple was destroyed, the monarchy ended, and the people were deported to Babylon. Daniel and his friends were among the first wave of exiles, taken as young men and trained in Babylonian culture. The book of Daniel is a manual for faithfulness under empire.",
          "Nebuchadnezzar's statue was not unusual. Imperial religion in the ancient Near East required conquered peoples to acknowledge the gods of the conqueror. Refusal was not merely religious dissent. It was political treason. The furnace was not a punishment for bad theology. It was the penalty for insurrection.",
          "The plain of Dura was likely a flat area near Babylon used for public ceremonies. The musical instruments listed (horn, flute, zither, lyre, harp, pipes) represent a multicultural orchestra, drawing from the diverse peoples of the empire. The message was clear: everyone is here, everyone plays, everyone bows. Uniformity is the empire's liturgy.",
          "The names Shadrach, Meshach, and Abednego are Babylonian names assigned to replace their Hebrew names (Hananiah, Mishael, Azariah). The empire renames you before it tries to reshape you. The first act of assimilation is the loss of your name. But the three men carried their Hebrew identity beneath their Babylonian labels.",
        ],
        literary: {
          genre: "Court tale / resistance narrative. Daniel 1-6 consists of court tales: stories of Jewish exiles navigating the dangers of foreign imperial service while maintaining faithfulness to God. The genre exists to answer the question: how do you live faithfully when the empire controls everything except your conscience?",
          devices: "Repetition (the list of officials and instruments is repeated to comic effect, satirizing imperial bureaucracy), irony (the fire meant to destroy becomes the place of divine encounter), contrast (the empire's coercion versus the exiles' calm defiance), the 'even if he does not' as narrative pivot.",
          keyTerms: [
            { term: "tselem", language: "Aramaic", meaning: "'Image, statue.' The same root as the 'image of God' in Genesis 1 (tselem Elohim). The empire builds its own image and demands worship. The theological conflict is between two images: God's image borne by humans, and the empire's image demanding human submission." },
            { term: "pelach", language: "Aramaic", meaning: "'To serve, to worship.' The word appears throughout the chapter, used for both serving the king and worshipping his gods. In the empire's vocabulary, there is no difference. Service to the state is worship of its gods. The three men insist on the distinction." },
            { term: "shezib", language: "Aramaic", meaning: "'To deliver, to rescue.' God is able to shezib. But the three men do not make their obedience contingent on rescue. The verb acknowledges God's power without presuming his plan." },
          ],
          structure: "The chapter follows a clear arc: imperial command (v.1-7), accusation (v.8-12), confrontation (v.13-15), confession of faith (v.16-18), punishment (v.19-23), divine rescue (v.24-27), royal reversal (v.28-30). The theological climax is not the rescue. It is the confession: 'even if he does not.'",
        },
        scholars: [
          { view: "Resistance literature", summary: "Daniel 3 was written for Jewish communities under imperial pressure — first Babylon, later the Seleucid persecution under Antiochus IV Epiphanes (167 BC). The story models faithful resistance without violence: you do not rebel, you do not fight, and you do not bow.", proponents: "John Collins, Daniel Smith-Christopher" },
          { view: "Theology of presence", summary: "The fourth figure in the fire is the theological center. God does not prevent the furnace. He enters it. The text does not promise rescue from suffering but divine presence within it. This is the pattern of biblical theology: God with us in the fire, not God removing the fire.", proponents: "Tremper Longman III, Ernest Lucas" },
          { view: "Imperial critique", summary: "The chapter satirizes empire through literary exaggeration: the absurd dimensions of the statue, the exhaustive lists of officials and instruments, the king's rage. The empire takes itself with deadly seriousness. The text does not. This is subversive humor, written by the colonized about the colonizer.", proponents: "Daniel Smith-Christopher, Anathea Portier-Young" },
        ],
        application: {
          question: "What is the furnace you are avoiding because you are not sure God will rescue you from it? What would it look like to obey without the guarantee?",
          connection: "Most of us practice conditional faithfulness: I will obey God as long as it works out. The three men practiced unconditional faithfulness: we will obey God regardless of the outcome. 'Even if he does not' is the line that separates faith from transaction. God is not a vending machine. Sometimes you put in the obedience and nothing comes out. You obey anyway.",
          thisWeek: "Identify one act of faithfulness you have been delaying because you are not sure it will turn out well. This week, take one step toward it. Not because God has promised a rescue, but because he is worth obeying even without one.",
        },
        deeper: {
          books: ["Daniel (Hermeneia Commentary) by John Collins", "A Faith Among Empires by Daniel Smith-Christopher", "Daniel (Tyndale Old Testament Commentary) by Ernest Lucas"],
          studyQuestion: "The three men said 'even if he does not.' What does that phrase cost to say? What does it mean to worship a God who can rescue but might not? How is that different from worshipping a God who is powerless?",
          prayer: "God who walked in the fire with three men who did not know you would show up, I name the furnace I am afraid of. I do not know if you will rescue me. I know you are able. That is enough. Even if you do not, I will not bow. Help me mean it. Amen.",
        },
      },
      {
        ref: "Daniel 7:1-14",
        summary: "The Son of Man vision and the kingdom that outlasts every empire",
        text: "In the first year of Belshazzar king of Babylon, Daniel had a dream and visions of his head as he lay in bed... In my vision at night I looked, and there before me was one like a son of man, coming with the clouds of heaven. He approached the Ancient of Days and was led into his presence. He was given authority, glory and sovereign power; all nations and peoples of every language worshiped him. His dominion is an everlasting dominion that will not pass away, and his kingdom is one that will never be destroyed.",
        paraphrase: "Daniel sees four beasts rise from the sea — each one more terrifying than the last, each one representing an empire that devours the world. Then the scene shifts to a courtroom in heaven. An ancient figure takes his seat. The books are opened. And into that courtroom comes a human figure, 'one like a son of man,' who receives a kingdom that never ends. The beasts are temporary. The son of man is forever.",
        keyWords: [
          { word: "son of man", original: "bar enash (Aramaic)", meaning: "Literally 'son of a human being,' meaning simply 'a human figure.' In a vision full of beasts (empires as monsters), the one who receives the eternal kingdom looks human. The contrast is deliberate: empires are bestial. God's kingdom is humane. Jesus chose this as his primary self-designation, using it over eighty times in the Gospels." },
          { word: "Ancient of Days", original: "attiq yomin (Aramaic)", meaning: "A title for God that appears only in Daniel 7. It emphasizes God's eternal nature and judicial authority. The white hair and clothing signal purity and age beyond measure. This is not a frail elder. This is the one who was old when the mountains were young." },
          { word: "the great sea", original: "yamma rabba (Aramaic)", meaning: "In the ancient Near East, the sea represented chaos, evil, and the forces opposed to God. The four beasts rise from the sea — they emerge from chaos. They are chaos organized into political power. Every empire is ultimately chaos wearing a crown." },
        ],
        historical: [
          "The four beasts are most commonly identified with four successive empires: Babylon (lion with eagle's wings), Media or Medo-Persia (bear raised on one side), Persia or Greece (leopard with four wings), and Greece or Rome (the terrifying fourth beast with iron teeth). The specific identifications are debated, but the pattern is clear: empires rise, devour, and fall. All of them.",
          "Apocalyptic literature emerged during periods of intense persecution, when normal prophetic speech was insufficient. Daniel 7-12 shifts from court tales to apocalyptic visions. The genre uses symbolic imagery — beasts, numbers, cosmic battles — to communicate a subversive message: the empires that seem invincible are already judged in heaven's courtroom.",
          "Jesus' use of 'Son of Man' (bar enash) as his primary title draws directly from Daniel 7:13. When Jesus told the high priest 'you will see the Son of Man sitting at the right hand of the Mighty One and coming on the clouds of heaven' (Mark 14:62), he was quoting Daniel 7. The high priest understood immediately: Jesus was claiming to be the figure who receives an everlasting kingdom. That is why he tore his robes.",
          "The 'ten horns' and the 'little horn' of the fourth beast (v.7-8) have been interpreted as ten kings and a particularly arrogant ruler. Many scholars identify the little horn with Antiochus IV Epiphanes, the Seleucid king who desecrated the Jerusalem temple in 167 BC. The text insists: even this horn will be broken. No tyrant outlasts the courtroom of God.",
        ],
        literary: {
          genre: "Apocalyptic vision. Apocalyptic is not fortune-telling. It is a genre of resistance. It uses coded imagery to say what cannot be said openly under imperial surveillance: the empire will fall, God will judge, and the kingdom will belong to the faithful. It is the literature of the oppressed, not the comfortable.",
          devices: "Symbolic beasts (political empires as monsters), numerical symbolism (four beasts = totality of earthly power; ten horns = completeness of political authority), contrast (beasts from the sea vs. the human figure from heaven; temporary kingdoms vs. eternal kingdom), courtroom imagery (thrones, books, judgment).",
          keyTerms: [
            { term: "bar enash", language: "Aramaic", meaning: "'Son of man,' a human figure. The phrase is generic — 'a human being.' But the context makes it extraordinary: this human figure receives what no human has ever held — universal, eternal dominion. The ordinary term carries an extraordinary claim." },
            { term: "attiq yomin", language: "Aramaic", meaning: "'Ancient of Days.' Used three times in Daniel 7, nowhere else in Scripture. The title places God outside of time. The empires are trapped in history. God presides over it." },
            { term: "malku", language: "Aramaic", meaning: "'Kingdom, sovereignty, dominion.' The word appears throughout the chapter, applied first to the beasts (temporary dominion) and then to the son of man (everlasting dominion). The same word. Two different durations. The chapter is about which kingdom lasts." },
          ],
          structure: "The vision has two scenes: earth (v.1-8) and heaven (v.9-14). On earth, beasts rise and devour. In heaven, the court sits and judges. The movement from earth to heaven is the movement from appearance to reality. The beasts look powerful from below. From above, they are already sentenced.",
        },
        scholars: [
          { view: "Historical-critical reading", summary: "The four beasts represent Babylon, Media, Persia, and Greece. The vision was composed during the Maccabean crisis (160s BC) to encourage Jewish resistance against Antiochus IV. The 'son of man' represents the faithful community of Israel who will inherit the kingdom.", proponents: "John Collins, Carol Newsom" },
          { view: "Messianic reading", summary: "The 'one like a son of man' is an individual messianic figure who receives universal authority from God. Jesus' adoption of the title confirms this reading. The vision is predictive prophecy pointing to Christ's exaltation.", proponents: "E.J. Young, Stephen Miller, traditional evangelical reading" },
          { view: "Both corporate and individual", summary: "The son of man is both a symbol for faithful Israel (the 'saints of the Most High' in v.18) and a messianic figure who represents and leads them. The corporate and individual readings are not mutually exclusive. Jesus embodies Israel's vocation and fulfills it.", proponents: "N.T. Wright, Richard Bauckham, George Ladd" },
        ],
        application: {
          question: "Which beast is your generation most tempted to worship? Which empire — political, economic, cultural — looks so dominant that you have started to believe it will last forever?",
          connection: "Every generation has its beast. Every era has an empire that seems invincible. Daniel 7 says: they all fall. The beast with iron teeth looked eternal to the people under its heel. It was not. The kingdom that lasts is not the one with the largest army or the strongest economy. It is the one given to the son of man in heaven's courtroom. We live between the beasts and the kingdom. The question is which one we are organizing our lives around.",
          thisWeek: "This week, notice one place where you have been living as though a human institution, system, or power is permanent and ultimate. Name it. Then read Daniel 7:14 again: 'His dominion is an everlasting dominion that will not pass away.' Let that sentence relativize what felt absolute.",
        },
        deeper: {
          books: ["Daniel (Hermeneia Commentary) by John Collins", "The Old Testament Pseudepigrapha and the New Testament by James Charlesworth", "Jesus and the Victory of God by N.T. Wright"],
          studyQuestion: "Jesus chose 'Son of Man' as his primary self-designation over 'Messiah' or 'Son of God.' Why? What does Daniel 7 communicate about Jesus' mission that the other titles do not? And why would the high priest tear his robes when Jesus quoted this passage?",
          prayer: "Ancient of Days, I confess I have been intimidated by beasts. I have organized my life around kingdoms that will not last. Give me the vision Daniel had: to see the courtroom behind the chaos, the throne above the beasts, and the kingdom that will not be destroyed. Amen.",
        },
      },
    ],
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
