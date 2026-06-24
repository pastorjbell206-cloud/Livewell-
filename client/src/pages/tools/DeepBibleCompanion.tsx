import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { ArrowLeft } from "lucide-react";

interface KeyWord { word: string; original: string; meaning: string; }
interface KeyTerm { term: string; language: string; meaning: string; }
interface ScholarView { view: string; summary: string; proponents: string; }
interface Passage {
  ref: string;
  summary: string;
  text: string;
  paraphrase: string;
  keyWords: KeyWord[];
  historical: string[];
  literary: { genre: string; devices: string; keyTerms: KeyTerm[]; structure: string; };
  scholars: ScholarView[];
  application: { question: string; connection: string; thisWeek: string; };
  deeper: { books: string[]; studyQuestion: string; prayer: string; };
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
        summary: "Creation and the God who speaks order into chaos",
        text: "In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters. And God said, 'Let there be light,' and there was light...",
        paraphrase: "Before anything existed, there was God. And the first thing God did was speak. Not command. Not demand. Speak. The universe is the overflow of a God who talks. Creation is not an accident. It is an utterance. And everything God spoke, God called good.",
        keyWords: [
          { word: "created", original: "bara (Hebrew)", meaning: "To create from nothing. Only God is the subject of bara in the Old Testament. Humans make (asah) and form (yatsar), but only God creates ex nihilo. The word carries divine exclusivity." },
          { word: "formless and void", original: "tohu wabohu (Hebrew)", meaning: "Chaos, emptiness, wasteland. A rhyming pair that describes the pre-creation state as disordered potential. God does not create from a blank canvas. God creates by ordering chaos. The pattern repeats through the entire Bible." },
          { word: "And God said", original: "wayyomer Elohim (Hebrew)", meaning: "God creates by speaking. The instrument of creation is language. This establishes a theology of the word that runs through Scripture to John 1: 'In the beginning was the Word.'" },
        ],
        historical: [
          "Genesis 1 was likely written during or after the Babylonian exile (6th century BC). The Babylonian creation myth (Enuma Elish) describes creation as the result of divine violence — Marduk killing Tiamat and forming the world from her corpse. Genesis 1 is a deliberate counter-narrative: creation by speech, not violence. Order from love, not war.",
          "The seven-day structure mirrors the dedication of ancient temples. In the ancient Near East, a temple was completed and then the deity 'rested' in it — meaning took up residence. Genesis 1 presents the entire cosmos as God's temple, with Day 7 as God taking up residence in creation.",
          "The repeated 'And God saw that it was good' (tov) is a value statement about the material world. In a context where many philosophies (later Gnosticism, certain Greek thought) would call the physical world evil or inferior, Genesis insists: matter is good. Bodies are good. The earth is good.",
          "Humans are made in God's 'image' (tselem) — the same word used for idols in ancient temples. In pagan temples, the idol represented the god. In Genesis, humans are the living images of God in his cosmic temple. You do not need a statue. You need a mirror. Every human being is one.",
        ],
        literary: {
          genre: "Liturgical poetry / structured cosmological narrative. Not a scientific report. Not a myth in the pejorative sense. A theological declaration structured for oral recitation and communal worship.",
          devices: "Repetition ('And God said,' 'and it was so,' 'God saw that it was good,' 'there was evening and morning'), parallelism between days 1-3 (forming) and days 4-6 (filling), chiastic structure with humanity at the climax, the Sabbath as the literary and theological capstone.",
          keyTerms: [
            { term: "bara", language: "Hebrew", meaning: "Divine creation. Exclusive to God. Never used with a material object (God does not create 'from' something). The word itself encodes the uniqueness of divine creative power." },
            { term: "tselem", language: "Hebrew", meaning: "Image, idol, representation. Humans as God's image-bearers function as living representatives in the cosmic temple. The democratization of the divine image: not just kings, but all humans." },
            { term: "tov", language: "Hebrew", meaning: "Good. Not merely 'functional' but beautiful, fitting, delightful. Seven times God declares creation good, culminating in 'very good' (tov meod). The material world is affirmed at its root." },
          ],
          structure: "Days 1-3 create realms (light/dark, sky/sea, land/vegetation). Days 4-6 fill those realms with rulers (sun/moon, birds/fish, animals/humans). Day 7 is God's enthronement in the finished temple. The structure is not chronological science but theological architecture.",
        },
        scholars: [
          { view: "Temple inauguration", summary: "Genesis 1 describes the cosmos as God's temple, with creation as the seven-day dedication ceremony and Day 7 as God taking up residence. Humans are the priestly images in the cosmic sanctuary.", proponents: "John Walton, G.K. Beale" },
          { view: "Polemic against ANE mythology", summary: "Genesis 1 is a deliberate counter-narrative to Babylonian creation myths. Where Enuma Elish has divine violence, Genesis has divine speech. Where Babylon enslaves humans to serve the gods, Genesis dignifies humans as God's image.", proponents: "Bruce Waltke, John Oswalt" },
          { view: "Literary-framework view", summary: "The seven-day structure is a literary framework, not a chronological account. The days are topical, not sequential. The point is theology (God is sovereign, creation is good, humans bear God's image), not cosmological sequence.", proponents: "Henri Blocher, Meredith Kline, C. John Collins" },
        ],
        application: {
          question: "If you are made in the image of God, what does that say about your value on the days you feel least productive, least useful, least impressive?",
          connection: "We live in a culture that assigns value based on output. Your worth is what you produce. Genesis 1 says your worth is what you are: an image-bearer. You did not earn this status. You cannot lose it by underperforming. The homeless man and the CEO bear the same image. That is either the most radical statement in the Bible or it is nothing at all.",
          thisWeek: "This week, every time you encounter another person — the barista, the colleague, the difficult family member — practice this internal sentence: 'This person bears the image of God.' Notice what shifts in how you treat them when you start from dignity rather than utility.",
        },
        deeper: {
          books: ["The Lost World of Genesis One by John Walton", "Genesis 1-11 (Word Biblical Commentary) by Gordon Wenham", "In the Beginning by Henri Blocher"],
          studyQuestion: "If Genesis 1 is written as a temple text, and the cosmos is God's temple, then what does it mean that humans are placed as 'images' within that temple? What priestly function are we meant to serve?",
          prayer: "Creator God, you spoke and the world existed. You did not need to create. You chose to. And you called it good. Teach me to see the goodness you built into the material world — my body, my work, my ordinary life. I am your image-bearer. Let me live like it. Amen.",
        },
      },
      {
        ref: "Genesis 3:1-24",
        summary: "The Fall and why everything is harder than it should be",
        text: "Now the serpent was more crafty than any of the wild animals the Lord God had made. He said to the woman, 'Did God really say...?'",
        paraphrase: "The serpent did not begin with a command or a temptation. He began with a question: 'Did God really say?' The first move of evil in the Bible is not violence. It is doubt planted in the form of a question. And once the question took root, everything unraveled. Not because the fruit was irresistible, but because the question made God seem untrustworthy.",
        keyWords: [
          { word: "crafty", original: "arum (Hebrew)", meaning: "Shrewd, cunning. A wordplay: in Genesis 2:25, Adam and Eve are 'naked' (arummim). In 3:1, the serpent is 'crafty' (arum). The same root. Their vulnerability met his cunning. The pun is intentional and devastating." },
          { word: "Did God really say", original: "aph ki-amar Elohim (Hebrew)", meaning: "The serpent's first words introduce doubt not about God's existence but about God's word. The strategy is not atheism. It is suspicion. 'Perhaps God is not as generous as he seems.'" },
          { word: "eyes were opened", original: "watippaqachna (Hebrew)", meaning: "They gained knowledge, but it was the knowledge of their own nakedness and shame. The 'enlightenment' the serpent promised turned out to be self-consciousness. They saw more, but they lost more." },
        ],
        historical: [
          "The serpent (nachash) in the ancient Near East was associated with both wisdom and chaos. In Egyptian iconography, the uraeus serpent represented divine wisdom and royal power. The Genesis narrative takes a figure of wisdom and shows it deployed for destruction.",
          "The tree of knowledge of 'good and evil' likely refers to moral autonomy — the capacity to determine good and evil for oneself, independent of God. The sin is not gaining information. It is claiming the right to define reality on your own terms.",
          "The consequences in Genesis 3:14-19 are not arbitrary punishments but natural results: broken trust leads to hiding, autonomy from God leads to painful labor and strained relationships. The curse describes what life looks like when humans try to be their own gods.",
          "The clothing of animal skins (3:21) is the Bible's first sacrifice — an animal dies so humans can be covered. The pattern of substitution begins here, long before Leviticus, long before the cross. God provides covering at the cost of life.",
        ],
        literary: {
          genre: "Narrative theology. A story that encodes the human condition. Whether read as historical event or theological parable (scholars disagree), the narrative explains why the world is beautiful but broken, ordered but painful.",
          devices: "Dialogue-driven plot (the serpent speaks, Eve responds, then silence from Adam), ironic reversal (they sought wisdom and gained shame), chiastic judgment (serpent, woman, man — reversing the order of the temptation), divine questions ('Where are you?') that expose rather than inform.",
          keyTerms: [
            { term: "nachash", language: "Hebrew", meaning: "Serpent. Also means 'to practice divination' or 'to shine like bronze.' The serpent is not a cartoonish villain. It is a figure of uncanny wisdom that uses its intelligence against God's purposes." },
            { term: "da'at tov wara", language: "Hebrew", meaning: "'Knowledge of good and evil.' Not mere information but moral autonomy. The power to define right and wrong on your own terms. The sin is not curiosity. It is sovereignty." },
            { term: "ayyekka", language: "Hebrew", meaning: "'Where are you?' God's first question to fallen humanity is not 'What have you done?' but 'Where are you?' It is a question of relationship, not interrogation. God seeks before he judges." },
          ],
          structure: "The narrative moves from harmony (2:25) to temptation (3:1-5) to transgression (3:6-7) to hiding (3:8-10) to judgment (3:14-19) to grace (3:21). The pattern — sin, consequence, grace — becomes the template for the entire biblical story.",
        },
        scholars: [
          { view: "Historical fall", summary: "Genesis 3 describes a real event involving real persons. The fall explains the origin of sin and death as a historical rupture in creation. The theological weight of Romans 5 (one man's sin brought death) depends on a real Adam.", proponents: "Henri Blocher, C. John Collins, John Walton" },
          { view: "Archetypal reading", summary: "Adam and Eve represent every human being. The story is 'true' not because it happened once but because it happens always. Every person stands before the tree. Every person reaches. The story is prescient, not just past.", proponents: "Karl Barth, Paul Ricoeur, Peter Enns" },
          { view: "Structural evil reading", summary: "Genesis 3 explains not just individual sin but the systemic nature of evil. Once trust is broken between God and humanity, every relationship downstream fractures: marriage, family, work, worship. Sin is structural, not just personal.", proponents: "Walter Brueggemann, Gerhard von Rad" },
        ],
        application: {
          question: "Where in your life have you heard the serpent's question: 'Did God really say?' Where have you chosen autonomy over trust?",
          connection: "The serpent's strategy has not changed. It is still a question, not a command. 'Did God really mean that? Is that really what the Bible says? Maybe God is holding out on you.' The temptation is always the same: to believe that you know better than God what is good for you. The fruit always looks reasonable in the moment. The shame always comes after.",
          thisWeek: "Identify one area where you are currently negotiating with a boundary — God's or your own. Name the internal question ('Did God really say...?'). Then ask instead: 'What is this boundary protecting?' Sit with that long enough to feel the difference between protection and restriction.",
        },
        deeper: {
          books: ["Genesis 1-15 (Word Biblical Commentary) by Gordon Wenham", "Not the Way It's Supposed to Be by Cornelius Plantinga", "Evil and the Justice of God by N.T. Wright"],
          studyQuestion: "God asks 'Where are you?' before he asks 'What have you done?' What does this tell us about God's primary concern after human failure — is it punishment or restoration?",
          prayer: "God who asked 'Where are you?' before you asked 'What have you done?' — I confess I have been hiding. From you. From myself. From the consequences of my choices. Find me again. I am tired of fig leaves. Amen.",
        },
      },
    ],
  },
  {
    name: "Psalms", testament: "OT", hook: "The prayer book of people who stopped pretending",
    passages: [
      {
        ref: "Psalm 23",
        summary: "The shepherd psalm and why it works when nothing else does",
        text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. He guides me along the right paths for his name's sake. Even though I walk through the darkest valley, I will fear no evil, for you are with me...",
        paraphrase: "God is not my boss. God is not my judge. God is my shepherd. And shepherds do not drive sheep. They lead them. They know where the water is. They know where the danger is. And when the valley gets dark — not if, when — the shepherd does not remove the valley. He walks through it with you. That is what 'I will fear no evil' means. Not that evil is absent. But that you are not alone in it.",
        keyWords: [
          { word: "shepherd", original: "ro'eh (Hebrew)", meaning: "One who tends, feeds, and guards. In the ancient Near East, 'shepherd' was a royal title. Kings were called shepherds of their people. David — himself a shepherd — is claiming God as his king who leads not from a throne but from the front of the flock." },
          { word: "I lack nothing", original: "lo echsar (Hebrew)", meaning: "Not 'I have everything I want' but 'I am not in want.' The difference is crucial. Contentment, not abundance. Sufficiency, not surplus. The shepherd provides what is needed, not what is craved." },
          { word: "darkest valley", original: "gey tsalmawet (Hebrew)", meaning: "Traditionally 'shadow of death.' The compound may mean 'deep darkness' or literally 'death-shadow.' Either way, David does not avoid the valley. He walks through it. The preposition matters: through, not around." },
        ],
        historical: [
          "David wrote this psalm from experience. As a shepherd boy, he fought lions and bears to protect his flock (1 Samuel 17:34-36). He knew what a good shepherd risks. When he calls God his shepherd, he is saying: God will fight for me the way I fought for my sheep.",
          "In the ancient Near East, kings were called 'shepherds' of their people. Hammurabi called himself 'the shepherd of the people.' When David calls God his shepherd, he is making a political statement: YHWH is my true king. Not Saul. Not any earthly power. God himself.",
          "The 'table prepared in the presence of enemies' (v.5) evokes ancient hospitality customs. A host who set a table for you in front of your enemies was publicly declaring protection. To eat at someone's table in their territory was to be under their shield.",
          "The shift from third person ('He leads me') to second person ('You are with me') happens at the darkest moment — the valley. When the danger is greatest, the psalm becomes a conversation. Distance becomes intimacy exactly when you would expect God to feel furthest away.",
        ],
        literary: {
          genre: "Psalm of trust / confidence psalm. Unlike lament psalms that cry out for help, trust psalms declare confidence already found. David is not asking for deliverance. He is testifying to it.",
          devices: "Extended metaphor (shepherd, then host), shift from third to second person at the psalm's emotional center, progressive movement from provision (v.1-3) through danger (v.4) to celebration (v.5-6), the phrase 'for his name's sake' grounding God's care in God's character rather than human deserving.",
          keyTerms: [
            { term: "ro'eh", language: "Hebrew", meaning: "Shepherd. A title of intimacy and authority. The shepherd knows each sheep by name. The shepherd goes ahead into danger. The shepherd does not delegate protection." },
            { term: "nefesh", language: "Hebrew", meaning: "Soul, life, self. 'He restores my nefesh' — not just spiritual refreshment but the restoration of the whole person. Physical, emotional, spiritual. The shepherd cares for the entire animal, not just its spirit." },
            { term: "tsalmawet", language: "Hebrew", meaning: "Deep darkness, death-shadow. The word appears in Job, in Isaiah, and here. It names the worst possible experience. And it is precisely there that the psalm becomes most intimate: 'You are with me.'" },
          ],
          structure: "The psalm moves through three scenes: green pastures (provision, v.1-3), dark valley (danger, v.4), and prepared table (celebration, v.5-6). The movement is not problem-solution but provision-testing-abundance. God's care is proven in the valley, not despite it.",
        },
        scholars: [
          { view: "Royal psalm", summary: "David speaks as king acknowledging a greater King. The psalm is a political declaration of allegiance. YHWH, not any human ruler, is the true shepherd-king of Israel.", proponents: "Walter Brueggemann, James Mays" },
          { view: "Exodus typology", summary: "The psalm recapitulates the Exodus journey: provision in the wilderness (green pastures), guidance through danger (dark valley), and arrival at the promised land (table of abundance). Personal faith mirrors national story.", proponents: "Dennis Tucker, William Brown" },
          { view: "Christological reading", summary: "Jesus claims the psalm's imagery in John 10: 'I am the good shepherd.' The early church read Psalm 23 as a prophecy of Christ's pastoral care. The shepherd who walks through the valley of death is the shepherd who himself died and rose.", proponents: "Augustine, Calvin, modern liturgical tradition" },
        ],
        application: {
          question: "Are you in green pastures, the dark valley, or at the table right now? And do you believe the same shepherd is present in all three?",
          connection: "We love this psalm at funerals. But it was not written for the dead. It was written for the living — for people in the middle of the valley who needed to hear that the shepherd had not left. The psalm does not promise the absence of darkness. It promises the presence of God in the darkness. That is a harder promise to believe and a better one.",
          thisWeek: "Identify which 'scene' of the psalm you are living in right now. If green pastures: practice gratitude. If the valley: name one way God is present even in the darkness. If the table: rest without guilt. The shepherd is appropriate to every season.",
        },
        deeper: {
          books: ["Psalms 1-50 (Word Biblical Commentary) by Peter Craigie", "The Message of the Psalms by Walter Brueggemann", "A Shepherd Looks at Psalm 23 by W. Phillip Keller"],
          studyQuestion: "The shift from 'He' to 'You' happens at the darkest point of the psalm (v.4). Why does the language of prayer become most intimate in the moment of greatest danger? What does this tell us about how faith actually works?",
          prayer: "Shepherd, I am in the valley. I did not choose it. I cannot see the end of it. But you say you are with me. I believe you. Help my unbelief. Walk with me until I see green again. Amen.",
        },
      },
      {
        ref: "Psalm 51",
        summary: "David's confession and how to pray when you are the problem",
        text: "Have mercy on me, O God, according to your unfailing love; according to your great compassion blot out my transgressions. Wash me, and I will be whiter than snow... Create in me a pure heart, O God, and renew a steadfast spirit within me.",
        paraphrase: "David does not make excuses. He does not explain. He does not minimize. He says: I did it. It was wrong. I cannot fix it. I cannot undo it. Only you can make me clean. And the shocking thing is that David does not expect God to reject him. He expects God to restore him. That is either arrogance or faith.",
        keyWords: [
          { word: "mercy", original: "chanan (Hebrew)", meaning: "To show grace, to be gracious. From the root meaning 'to bend down.' God's mercy is not reluctant tolerance. It is God bending down to reach the person who cannot stand up." },
          { word: "create", original: "bara (Hebrew)", meaning: "The same word used in Genesis 1:1. David is not asking for improvement. He is asking for re-creation. A new heart. The same divine power that made the world from nothing is needed to remake a human soul." },
          { word: "blot out", original: "mecheh (Hebrew)", meaning: "To wipe clean, to erase. Used of wiping a dish clean (2 Kings 21:13) or erasing a name from a book. David wants his sin not just forgiven but erased. As if it never happened." },
        ],
        historical: [
          "The superscription links this psalm to David's adultery with Bathsheba and murder of Uriah (2 Samuel 11-12). David was confronted by the prophet Nathan. This psalm is David's response — not to being caught, but to being seen.",
          "In the ancient Near East, kings did not confess sin. They commissioned propaganda. They blamed enemies. David's willingness to record this prayer permanently in Israel's worship book is culturally shocking. The king admits he is the sinner.",
          "The phrase 'against you, you only, have I sinned' (v.4) is not denying that David sinned against Bathsheba and Uriah. It is acknowledging that all sin is ultimately against God because God is the one whose image is violated when any person is violated.",
          "'Do not cast me from your presence' (v.11) echoes the exile from Eden in Genesis 3. David fears the ultimate consequence: not punishment but separation. The worst thing God could do is not inflict pain. It is withdraw presence.",
        ],
        literary: {
          genre: "Individual lament / penitential psalm. One of the seven penitential psalms in Christian tradition. The psalm moves from plea to confession to petition to vow — the full arc of genuine repentance.",
          devices: "Imperatives pile up (blot out, wash me, cleanse me, create, renew, restore) — David is urgent, not casual. Metaphors of cleansing (wash, snow, hyssop) suggest contamination that requires not just forgiveness but purification. The request for 'a new heart' echoes Ezekiel's later prophecy of heart transplant (Ezekiel 36:26).",
          keyTerms: [
            { term: "chanan", language: "Hebrew", meaning: "Grace, mercy. God bending toward the undeserving. David's only argument is God's character, not his own merit. He does not say 'I deserve mercy.' He says 'You are the kind of God who gives it.'" },
            { term: "bara", language: "Hebrew", meaning: "Create. Genesis language in a psalm of repentance. David needs not repair but recreation. The old heart cannot be fixed. It must be replaced. Only the Creator has that power." },
            { term: "ruach", language: "Hebrew", meaning: "Spirit, breath, wind. Used three times: 'a steadfast spirit' (v.10), 'your Holy Spirit' (v.11), 'a willing spirit' (v.12). David asks for internal renovation at every level: steadiness, God's presence, willingness." },
          ],
          structure: "The psalm moves in four movements: plea for mercy (v.1-2), confession of sin (v.3-6), petition for cleansing (v.7-12), and vow of praise (v.13-17). The climax is not the confession but the request for a new heart. David does not just want forgiveness. He wants transformation.",
        },
        scholars: [
          { view: "Davidic authorship", summary: "David wrote this psalm after Nathan's confrontation. It is raw, personal, and historically grounded. The emotional authenticity makes it the model for all subsequent prayers of repentance.", proponents: "Derek Kidner, Willem VanGemeren, James Hamilton" },
          { view: "Liturgical adaptation", summary: "Whatever its original occasion, Psalm 51 was adapted for communal worship. The 'broken spirit' and 'contrite heart' (v.17) became Israel's understanding of what God actually wants — not more sacrifices but genuine repentance.", proponents: "Walter Brueggemann, James Mays" },
          { view: "New covenant anticipation", summary: "David's request for a 'new heart' and 'new spirit' anticipates Ezekiel 36 and Jeremiah 31 — the new covenant promise. David is asking for something the old covenant could not provide. The psalm points beyond itself to Christ.", proponents: "Tremper Longman, Bruce Waltke" },
        ],
        application: {
          question: "When was the last time you prayed like David — no excuses, no explanations, no minimizing — just 'I did it, and only you can fix it'?",
          connection: "We have lost the art of confession. We explain. We contextualize. We offer reasons. David offers none. He says: I am the problem. Not my childhood. Not my circumstances. Not the people around me. Me. And paradoxically, that is the most freeing prayer in the Bible. Because once you stop defending yourself, you can finally be healed.",
          thisWeek: "Write your own Psalm 51. Not in biblical language — in your own words. Name the specific thing, not the generic category. Then read David's psalm aloud and notice: he does not end in shame. He ends in praise. Confession is not the final word. Restoration is.",
        },
        deeper: {
          books: ["Psalms 1-72 (Tyndale Old Testament Commentary) by Derek Kidner", "Praying the Psalms by Walter Brueggemann", "The Psalms as Christian Lament by Bruce Waltke"],
          studyQuestion: "David says 'a broken and contrite heart, O God, you will not despise' (v.17). Why does God value brokenness over performance? And what is the difference between healthy conviction and destructive shame?",
          prayer: "God, I have been explaining when I should have been confessing. I have been managing my image when I should have been honest with you. Create in me a clean heart. Not a better version of the old one. A new one. Amen.",
        },
      },
    ],
  },
  {
    name: "Romans", testament: "NT", hook: "The letter that rewired Christianity",
    passages: [
      {
        ref: "Romans 8:1-17",
        summary: "No condemnation and the life the Spirit actually gives",
        text: "Therefore, there is now no condemnation for those who are in Christ Jesus, because through Christ Jesus the law of the Spirit who gives life has set you free from the law of sin and death...",
        paraphrase: "The verdict is in. It is not guilty. Not 'not guilty because you tried really hard.' Not 'not guilty pending future review.' No condemnation. Period. And the reason is not your performance. It is your position — in Christ. The Spirit who raised Jesus from the dead now lives in you. Not as a guest. As a resident. And that Spirit is not a feeling you chase. It is a power that has already declared you free.",
        keyWords: [
          { word: "no condemnation", original: "ouden katakrima (Greek)", meaning: "No verdict of guilt. A judicial declaration. The courtroom has spoken. The case is closed. Paul does not say 'less condemnation' or 'conditional acquittal.' He says none. Zero. The word is absolute." },
          { word: "in Christ Jesus", original: "en Christō Iēsou (Greek)", meaning: "Paul's shorthand for union with Christ. Not a location but an identity. To be 'in Christ' is to have your status, your future, and your identity determined by his story rather than your own." },
          { word: "Spirit of life", original: "pneuma tēs zōēs (Greek)", meaning: "The Holy Spirit characterized by and producing life. Not mere existence but the quality of life that belongs to the age to come — resurrection life already at work in mortal bodies." },
        ],
        historical: [
          "Romans 8 follows Romans 7, where Paul describes the agonizing inability to do what he knows is right. The 'therefore' of 8:1 answers the despair of 7:24 ('Who will rescue me?'). The answer is not 'try harder.' The answer is 'there is now no condemnation.'",
          "Paul writes to a mixed Jewish-Gentile church in Rome that he has never visited. The letter is his theological masterpiece, meant to unite a divided community. Romans 8 is the theological climax — moving from justification (ch. 3-5) through sanctification struggle (ch. 6-7) to the security of those in Christ (ch. 8).",
          "The contrast between 'flesh' (sarx) and 'Spirit' (pneuma) in this passage is not body vs. soul. It is old-age existence vs. new-age existence. The flesh is the whole person oriented around self. The Spirit is the whole person oriented around God. Paul is not anti-body.",
          "The 'Abba, Father' cry (v.15) is the same Aramaic word Jesus used in Gethsemane (Mark 14:36). Paul is saying: the Spirit gives you the same intimacy with God that Jesus had. You are not a slave petitioning a master. You are a child addressing a father.",
        ],
        literary: {
          genre: "Theological argument / pastoral encouragement. Paul moves from legal declaration (v.1-4) to ethical description (v.5-11) to relational assurance (v.12-17). The logic is: if God has declared you free, then live free.",
          devices: "Contrast (flesh/Spirit, death/life, slavery/adoption), repetition of 'Spirit' (pneuma appears 21 times in Romans 8), the 'Abba' cry as emotional climax, conditional sentences that are not conditions of salvation but descriptions of reality ('if the Spirit lives in you').",
          keyTerms: [
            { term: "katakrima", language: "Greek", meaning: "Condemnation, guilty verdict. Used only three times in the New Testament, all in Romans. Paul is emphatic: the verdict that hung over humanity (5:16, 5:18) has been removed (8:1). Completely." },
            { term: "sarx", language: "Greek", meaning: "Flesh. Not the body but the entire orientation of life apart from God's Spirit. The flesh is the self turned in on itself. It is not defeated by willpower but displaced by the Spirit." },
            { term: "huiothesia", language: "Greek", meaning: "Adoption as sons. A legal term from Roman law: adopted children had full inheritance rights, identical to biological children. God does not offer second-class membership. Adopted heirs get everything." },
          ],
          structure: "Declaration of freedom (v.1-4), description of two ways of living (v.5-8), assurance of the Spirit's presence (v.9-11), implication for identity (v.12-14), climax in adoption and inheritance (v.15-17). The passage moves from legal status to lived experience to ultimate identity.",
        },
        scholars: [
          { view: "Forensic justification", summary: "'No condemnation' is a legal declaration. God the judge pronounces the verdict: not guilty. This is objective, external to the believer's experience. It is true whether you feel it or not.", proponents: "John Murray, Thomas Schreiner, Douglas Moo" },
          { view: "Participatory union", summary: "'In Christ' means incorporated into Christ's story. You died when he died. You rose when he rose. 'No condemnation' is not just a legal fiction but a reality based on genuine participation in Christ's death and resurrection.", proponents: "Michael Gorman, N.T. Wright, Richard Hays" },
          { view: "New creation theology", summary: "Romans 8 is about the new creation breaking into the old. The Spirit is the firstfruits of the coming world. 'No condemnation' is not just forgiveness of the past but the power of the future already at work.", proponents: "N.T. Wright, J. Christiaan Beker" },
        ],
        application: {
          question: "Do you live as if the verdict has already been rendered — or are you still waiting for the jury to come back?",
          connection: "Most Christians live under a suspended sentence. Technically forgiven but functionally on probation. Romans 8:1 demolishes probation theology. The verdict is not pending. It is rendered. Not guilty. The work of the Christian life is not earning a verdict you already have. It is living from a verdict you did not earn.",
          thisWeek: "Each morning this week, before you do anything productive or spiritual, say aloud: 'There is now no condemnation for me in Christ Jesus.' Notice the internal resistance. That resistance is the flesh insisting you must earn what has already been given. Let the Spirit's word overrule the flesh's lie.",
        },
        deeper: {
          books: ["Romans (New International Commentary) by Douglas Moo", "The Letter to the Romans (Pillar) by Leon Morris", "Paul and Union with Christ by Constantine Campbell"],
          studyQuestion: "Paul says 'the Spirit you received does not make you slaves so that you live in fear again.' If fear is incompatible with the Spirit, why do so many Christians live in constant spiritual anxiety? What has gone wrong?",
          prayer: "Father — Abba — I have been living as if the verdict is still out. As if one more failure will tip the scales. But you have spoken. No condemnation. Teach me to live from that word, not toward it. I am your child. Let me stop auditioning. Amen.",
        },
      },
      {
        ref: "Romans 12:1-2",
        summary: "The transformed mind and what worship actually looks like on a Tuesday",
        text: "Therefore, I urge you, brothers and sisters, in view of God's mercy, to offer your bodies as a living sacrifice, holy and pleasing to God — this is your true and proper worship. Do not conform to the pattern of this world, but be transformed by the renewing of your mind.",
        paraphrase: "After eleven chapters of theology, Paul finally says 'therefore.' Everything that follows is built on everything that came before. And the first command is not 'believe the right things' or 'attend the right church.' It is: give God your body. Your actual, physical, Monday-through-Saturday body. That is worship. Not a song. Not a feeling. Your life.",
        keyWords: [
          { word: "living sacrifice", original: "thysian zōsan (Greek)", meaning: "In the old system, sacrifices were killed. They were done. Paul says: you are a sacrifice that stays alive. Which means you have to keep choosing it. A dead sacrifice is offered once. A living sacrifice crawls off the altar every morning and has to climb back on." },
          { word: "transformed", original: "metamorphousthe (Greek)", meaning: "Metamorphosis. The same word used for Jesus' transfiguration (Matthew 17:2). Not cosmetic change but fundamental alteration of form. Present tense: be being transformed. It is ongoing, not instantaneous." },
          { word: "renewing of your mind", original: "anakainōsei tou noos (Greek)", meaning: "Renovation of the mind. Anakainosis means 'making new again' — not patching the old mind but installing a new one. The mind that interprets reality must be rebuilt from the foundation." },
        ],
        historical: [
          "Romans 12:1 is the hinge of the entire letter. Chapters 1-11 are theology (what God has done). Chapters 12-16 are ethics (how we respond). The 'therefore' connects them permanently: ethics without theology is moralism. Theology without ethics is abstraction. You need both.",
          "The language of 'sacrifice' would have shocked both Jewish and Gentile hearers. Jews offered animal sacrifices at the temple. Pagans offered sacrifices at their shrines. Paul says: the new sacrifice is not an animal. It is you. Your body. Your ordinary physical existence. The temple is your life.",
          "'The pattern of this world' (schema tou aiōnos toutou) refers to the present age's way of organizing reality — its values, its assumptions, its definitions of success and failure. Paul uses schema (external pattern) for the world but morphē (inner form) for transformation. The world reshapes you from the outside. God transforms you from the inside.",
          "This verse was read in early Christian communities as a radical redefinition of worship. Roman religion was transactional: offer the right sacrifice, get the god's favor. Christian worship is total: everything you are, offered to God, not to get something but because of mercy already given.",
        ],
        literary: {
          genre: "Ethical exhortation (paraenesis) following theological exposition. The 'therefore' marks the pivot from indicative (what God has done) to imperative (how we live). The imperative only makes sense in light of the indicative.",
          devices: "The 'therefore' connecting 11 chapters of theology to practical living, paradox ('living sacrifice' — sacrifices die; this one lives), contrast between conform (passive, external) and transform (passive-divine, internal), the phrase 'in view of God's mercy' grounding ethics in grace rather than obligation.",
          keyTerms: [
            { term: "parakalō", language: "Greek", meaning: "'I urge' or 'I appeal.' Not a command from above but an appeal from alongside. Paul does not say 'I order you.' He says 'I urge you.' The tone is pastoral, not authoritarian." },
            { term: "logikēn latreian", language: "Greek", meaning: "'Reasonable worship' or 'logical service.' Your rational, considered, bodily offering to God is the truest form of worship. Worship is not irrational ecstasy. It is the deliberate offering of your actual life." },
            { term: "metamorphousthe", language: "Greek", meaning: "Be transformed. Passive voice: you do not transform yourself. You are transformed. By God. Through the renewal of your mind. Your job is to present yourself. God's job is to change you." },
          ],
          structure: "Two verses, two commands: (1) Offer your bodies — positive action; (2) Do not conform / be transformed — negative refusal paired with positive submission. The first is about giving God access. The second is about letting God change what he has access to.",
        },
        scholars: [
          { view: "Embodied ethics", summary: "Paul's emphasis on 'bodies' (not souls or spirits) means Christianity is an embodied faith. Worship happens in the physical: how you eat, work, rest, spend money, use your time. Disembodied spirituality is not Pauline.", proponents: "N.T. Wright, Michael Gorman, James Dunn" },
          { view: "Counter-formation", summary: "Romans 12:2 is about resisting the formative power of culture. Every culture shapes its members into a particular image. Paul says: resist that shaping. Be shaped by God instead. The mind is the battleground of formation.", proponents: "James K.A. Smith, Dallas Willard" },
          { view: "Mercy-based obedience", summary: "The phrase 'in view of God's mercy' is the foundation. Paul does not say 'in view of God's demands.' Ethics flow from gratitude, not fear. You offer your body because you have received mercy, not in order to earn it.", proponents: "John Stott, Leon Morris, Douglas Moo" },
        ],
        application: {
          question: "What is one area of your physical, ordinary, Tuesday-afternoon life that you have never consciously offered to God as worship?",
          connection: "We compartmentalize worship into Sunday. Paul refuses. Worship is offering your body — the body that commutes, that cooks dinner, that gets tired, that sits in meetings. If worship only happens when you sing, then most of your life is secular. Paul says: none of it is secular. All of it can be offered. All of it can be worship.",
          thisWeek: "Choose one 'secular' activity this week — your commute, your workout, your meal preparation — and before you begin it, say: 'I offer this to you as worship.' Do not change what you do. Change the intention behind it. See if that reframing changes how you experience it.",
        },
        deeper: {
          books: ["Romans (New International Commentary) by Douglas Moo", "You Are What You Love by James K.A. Smith", "The Spirit of the Disciplines by Dallas Willard"],
          studyQuestion: "Paul says 'be transformed by the renewing of your mind.' If the mind is the organ of transformation, what practices actually renew the mind? And what is the difference between information (knowing more) and formation (becoming different)?",
          prayer: "God, I offer you my body. Not just my soul. Not just my Sunday. My commute. My lunch break. My fatigue. My ordinary physical life. Transform my mind so that I see every moment as a place where worship is possible. Amen.",
        },
      },
    ],
  },
  {
    name: "Matthew", testament: "NT", hook: "The Gospel that asks who Jesus actually is",
    passages: [
      {
        ref: "Matthew 5:1-12",
        summary: "The Beatitudes and the upside-down kingdom",
        text: "Now when Jesus saw the crowds, he went up on a mountainside and sat down. His disciples came to him, and he began to teach them. He said: 'Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn, for they will be comforted...'",
        paraphrase: "Jesus looked at the people the world had forgotten and said: You are the blessed ones. Not the powerful. Not the successful. Not the ones with the right answers. The mourners. The meek. The hungry. The peacemakers. The persecuted. The kingdom belongs to you. Not because suffering is good, but because God is drawn to the place where pretense has been stripped away.",
        keyWords: [
          { word: "blessed", original: "makarios (Greek)", meaning: "Blessed, happy, fortunate. In Greek literature, makarios described the gods — they were blessed because they were beyond suffering. Jesus takes the word and gives it to sufferers. The blessed are not beyond pain. They are in the middle of it and held by God." },
          { word: "poor in spirit", original: "ptōchoi tō pneumati (Greek)", meaning: "The spiritually destitute. Not 'humble' as a personality trait, but bankrupt. Those who know they have nothing to offer God. The first beatitude is the door: you cannot receive the kingdom with full hands." },
          { word: "kingdom of heaven", original: "basileia tōn ouranōn (Greek)", meaning: "Matthew's term for the reign of God. Not a place you go when you die but a reality breaking into the present. Wherever God's will is done, the kingdom is present. Jesus says it belongs to the broken." },
        ],
        historical: [
          "Jesus teaches from a mountain, deliberately echoing Moses at Sinai. Matthew presents Jesus as the new Moses, giving a new law to a new covenant people. But where Moses descended with commands carved in stone, Jesus sits down (the posture of a rabbi) and speaks words of blessing.",
          "The 'poor in spirit' would have included most of Jesus' audience: peasant farmers, day laborers, the economically and socially marginalized of Roman Palestine. Jesus is not romanticizing poverty. He is declaring that the kingdom starts with those who have nothing left to lose.",
          "In the Roman honor-shame culture, the 'meek' (praeis) were not admired. Meekness was weakness. Power was admired. Jesus inverts the value system: the meek inherit the earth. Not the conquerors. The conquerors lease it for a generation. The meek inherit it forever.",
          "The beatitudes echo Isaiah 61, where the Messiah is anointed to bring good news to the poor, comfort to those who mourn, and freedom to captives. By preaching the beatitudes, Jesus is implicitly claiming to be the fulfillment of Isaiah's messianic prophecy.",
        ],
        literary: {
          genre: "Wisdom teaching / prophetic declaration. The beatitudes function as both description (this is how things are in God's kingdom) and invitation (come into this reality). They are not commands but announcements.",
          devices: "Anaphora (repetition of 'blessed are'), inclusio (the first and eighth beatitudes both end with 'for theirs is the kingdom of heaven'), progressive movement from internal states (poor, mourn, meek) to external actions (merciful, peacemakers, persecuted), paradox throughout (mourning leads to comfort, meekness leads to inheritance).",
          keyTerms: [
            { term: "makarios", language: "Greek", meaning: "Blessed. Not a feeling but a declaration. Jesus is not saying 'you should feel happy.' He is saying 'God declares you fortunate.' The blessing is objective, not subjective." },
            { term: "praeis", language: "Greek", meaning: "Meek, gentle. Not weakness but strength under control. Moses was called the meekest man on earth (Numbers 12:3) while leading two million people through a wilderness. Meekness is power that refuses to crush." },
            { term: "dikaiosynē", language: "Greek", meaning: "Righteousness, justice. Those who hunger and thirst for dikaiosynē want both personal righteousness and social justice. The word refuses to separate the two." },
          ],
          structure: "Eight beatitudes forming an inclusio (first and last both promise 'the kingdom of heaven'). The first four address internal spiritual postures; the last four address external ethical actions. Together they paint a complete portrait of kingdom character.",
        },
        scholars: [
          { view: "Entrance requirements", summary: "The beatitudes describe the character required to enter the kingdom. They are not salvation by works but descriptions of the kind of people who respond to Jesus' call. The kingdom is for the poor in spirit because only the empty can be filled.", proponents: "D.A. Carson, John Stott, R.T. France" },
          { view: "Eschatological reversal", summary: "The beatitudes announce God's end-time reversal of present injustice. Those who mourn now will be comforted then. Those who are persecuted now will be vindicated then. They are promises, not prescriptions.", proponents: "N.T. Wright, Dale Allison, Ulrich Luz" },
          { view: "New Torah", summary: "Jesus on the mountain delivers a new Torah for the messianic community. The beatitudes replace the curses and blessings of Deuteronomy 28. The new covenant community is defined not by ethnic markers but by character shaped by grace.", proponents: "W.D. Davies, Matthew Thiessen" },
        ],
        application: {
          question: "Which beatitude makes you most uncomfortable — and what does that discomfort reveal about which kingdom you are actually living for?",
          connection: "The beatitudes are not aspirational. They are descriptive. Jesus is not saying 'try to be poor in spirit.' He is saying: if you are already there — mourning, hungry for justice, persecuted — then hear this: you are not forgotten. You are blessed. The kingdom is not for the impressive. It is for the honest.",
          thisWeek: "Read through the eight beatitudes slowly. Identify which one describes your current season. Then sit with the promise attached to it. If you mourn, hear: 'You will be comforted.' If you hunger for justice, hear: 'You will be filled.' Let the promise address your specific ache.",
        },
        deeper: {
          books: ["The Sermon on the Mount (Pillar) by Charles Quarles", "Studies in the Sermon on the Mount by Martyn Lloyd-Jones", "The Divine Conspiracy by Dallas Willard"],
          studyQuestion: "The first beatitude says 'theirs IS the kingdom' (present tense), while the others use future tense ('will be comforted,' 'will inherit'). Why is poverty of spirit the only beatitude that receives its promise in the present?",
          prayer: "Jesus, I confess I want a kingdom for the strong, not the poor in spirit. I want a religion for the impressive, not the mourners. Overturn my values. Show me what blessed really looks like. It does not look like what I expected. Amen.",
        },
      },
      {
        ref: "Matthew 28:18-20",
        summary: "The Great Commission and why it starts with authority, not activity",
        text: "Then Jesus came to them and said, 'All authority in heaven and on earth has been given to me. Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.'",
        paraphrase: "Before Jesus says 'go,' he says 'all authority is mine.' The mission is not built on your competence. It is built on his authority. And the command is not 'make converts.' It is 'make disciples.' There is a difference. A convert agrees with you. A disciple becomes like you. And the last word is not 'go' but 'I am with you.' The mission begins and ends with presence.",
        keyWords: [
          { word: "all authority", original: "pasa exousia (Greek)", meaning: "Every kind of authority in every realm. Not 'some authority in spiritual matters.' All authority. In heaven and on earth. Political, spiritual, cosmic. The risen Christ holds everything. The mission proceeds from that total claim." },
          { word: "make disciples", original: "mathēteusate (Greek)", meaning: "The main verb. Not 'go' (a participle), not 'baptize' (a participle), not 'teach' (a participle). The one imperative is: make disciples. Going, baptizing, and teaching are how you do it. But discipleship is the goal." },
          { word: "I am with you", original: "egō meth hymōn eimi (Greek)", meaning: "Echoes 'Emmanuel' — God with us (Matthew 1:23). The Gospel begins with 'God with us' and ends with 'I am with you.' The frame of Matthew's entire story is presence. Mission is never solo." },
        ],
        historical: [
          "Jesus speaks after the resurrection but before the ascension. He is addressing disciples who had abandoned him days earlier. The commission goes not to the faithful but to the failures. That is grace in action: the people who fled are the people sent.",
          "'All nations' (panta ta ethnē) breaks the boundaries of Jewish mission. Throughout Matthew, Jesus focused on Israel ('I was sent only to the lost sheep of Israel,' 15:24). Now the scope explodes. Every nation. Every people group. The particular mission becomes universal.",
          "Baptism 'in the name of the Father and of the Son and of the Holy Spirit' is the earliest Trinitarian formula in the New Testament. The mission is grounded in the full identity of God. Disciples are not made in the name of a teacher. They are made in the name of the triune God.",
          "The phrase 'to the very end of the age' uses aion (age), not kosmos (world). Jesus is not promising to be with them until the world ends geographically. He is promising to be with them until the present age gives way to the age to come. The promise is eschatological.",
        ],
        literary: {
          genre: "Commissioning narrative. Follows the pattern of divine commissioning in the Old Testament: divine appearance, statement of authority, commission, objection/assurance. Jesus skips the objection — there is no time for doubt. Only authority, command, and promise.",
          devices: "Triadic structure (Father, Son, Spirit), inclusio with Matthew 1:23 (Emmanuel/God-with-us), the 'therefore' linking authority to mission (you go because he reigns), participles surrounding one imperative (the structure focuses everything on 'make disciples').",
          keyTerms: [
            { term: "exousia", language: "Greek", meaning: "Authority, power, right to rule. Given to Jesus (passive voice: 'has been given to me'). The Father grants the Son all authority. The mission proceeds from delegated divine sovereignty." },
            { term: "mathēteusate", language: "Greek", meaning: "Make disciples. Aorist imperative: a decisive command. Not 'try to make disciples.' Make them. The verb implies a process: teaching, modeling, forming people into followers who obey." },
            { term: "synteleia tou aiōnos", language: "Greek", meaning: "'End of the age.' Not the end of the world but the completion of this present era. Jesus promises presence until the mission is finished and the new age fully arrives." },
          ],
          structure: "Four elements: (1) Authority claim (v.18b), (2) Mission command (v.19a), (3) Method description (v.19b-20a), (4) Presence promise (v.20b). The structure says: Jesus has the authority, you have the mission, here is how, and you are not alone.",
        },
        scholars: [
          { view: "Christological focus", summary: "The commission is about Jesus' lordship, not human activity. 'All authority' is the foundation. The mission is possible only because the risen Christ reigns. Without the authority claim, the commission is impossible.", proponents: "R.T. France, D.A. Carson, Grant Osborne" },
          { view: "Missional ecclesiology", summary: "The church exists for mission, not mission for the church. The Great Commission defines the church's purpose: making disciples who make disciples. A church not engaged in disciple-making has forgotten its commission.", proponents: "David Bosch, Christopher Wright, Leslie Newbigin" },
          { view: "Presence theology", summary: "The key promise is 'I am with you.' The mission is sustained not by strategy or resources but by the ongoing presence of Christ with his people. Emmanuel ('God with us') is both the beginning and the end of Matthew's story.", proponents: "Ulrich Luz, Warren Carter" },
        ],
        application: {
          question: "Are you trying to fulfill the Great Commission from your own competence, or from Christ's authority? What would change if you genuinely believed 'all authority' belongs to him?",
          connection: "We turn the Great Commission into a guilt trip: you should be doing more, reaching more, converting more. But the commission begins with authority (his, not yours) and ends with presence (his, not yours). The middle part — the going, baptizing, teaching — happens between two statements about Jesus. If you remove the guilt and restore the authority and the presence, the mission becomes possible again.",
          thisWeek: "This week, instead of asking 'What should I be doing for God?' ask 'Where is Jesus already at work around me, and how do I join him there?' The shift from obligation to participation changes everything. The mission is his. He invites you into it.",
        },
        deeper: {
          books: ["The Gospel of Matthew (New International Commentary) by R.T. France", "Transforming Mission by David Bosch", "The Mission of God by Christopher Wright"],
          studyQuestion: "Jesus says 'make disciples,' not 'make converts.' What is the difference? And what does it look like practically to disciple someone versus merely converting them?",
          prayer: "Lord Jesus, all authority is yours. I do not have to manufacture the mission. I have to join it. You are already at work. Open my eyes to see where, and give me courage to follow. And remind me daily: you are with me. That is enough. Amen.",
        },
      },
    ],
  },
  {
    name: "John", testament: "NT", hook: "The Gospel that starts before time and ends with breakfast",
    passages: [
      {
        ref: "John 1:1-18",
        summary: "The Prologue and the scandal of God becoming flesh",
        text: "In the beginning was the Word, and the Word was with God, and the Word was God...",
        paraphrase: "Before anything existed, there was a Word. Not a book. Not a statement. A person. And that person was with God and was God. And then the unthinkable happened: the Word became flesh. God moved into the neighborhood.",
        keyWords: [
          { word: "Word", original: "logos (Greek)", meaning: "Word, Reason, Logic. In Stoic philosophy, logos was the rational principle holding the universe together. In Jewish wisdom tradition, it echoes the creative speech of Genesis 1 and personified Wisdom in Proverbs 8. John takes a Greek concept and fills it with Jewish meaning." },
          { word: "became flesh", original: "sarx (Greek)", meaning: "Flesh. Scandalous to Greeks who saw the physical as inferior to the spiritual. God did not merely appear in a body. God became flesh — vulnerable, tired, hungry, mortal. The scandal is not that God exists but that God became material." },
          { word: "dwelt", original: "eskenosen (Greek)", meaning: "Literally 'tabernacled' or 'pitched a tent.' The Word set up camp among us, echoing the wilderness tabernacle where God's presence dwelt with Israel. The incarnation is the new tabernacle." },
        ],
        historical: [
          "Logos was a concept in Stoic philosophy meaning the rational principle of the universe. Heraclitus used it five centuries before John. John takes a term his Greek readers would recognize and claims it is not a principle but a person.",
          "The prologue mirrors Genesis 1 deliberately. 'In the beginning' is not an accident. John is writing a new creation story.",
          "The phrase 'we have seen his glory' (v.14) uses the language of the Shekinah, the visible glory of God that filled the tabernacle and temple. The disciples are claiming they saw with their eyes what Moses only glimpsed from behind a rock.",
          "First-century Judaism expected God's Wisdom to dwell with Israel (Sirach 24). John claims that expectation has been fulfilled — not in Torah, but in a person.",
        ],
        literary: {
          genre: "Hymnic poetry. The prologue functions as a theological overture to the entire Gospel, introducing every major theme: light and darkness, belief and rejection, glory and grace.",
          devices: "Chiastic structure (the prologue folds in on itself with the incarnation at the center), parallelism, repetition of key terms (Word, light, life), prose interruptions about John the Baptist that ground the poetry in history.",
          keyTerms: [
            { term: "logos", language: "Greek", meaning: "Word, Reason, Logic. Connects to both Greek philosophical tradition and Jewish wisdom tradition. John uses it to claim that the ordering principle of the universe is personal." },
            { term: "sarx", language: "Greek", meaning: "Flesh. Not merely a body but the full weight of physical, mortal, vulnerable human existence. God did not put on a costume. God became the thing." },
            { term: "eskenosen", language: "Greek", meaning: "'Tabernacled.' The Word pitched a tent among us. The wilderness tabernacle was portable because God goes where his people go." },
          ],
          structure: "Moves from eternity (v.1-2) through creation (v.3-5) to historical witness (v.6-8) to incarnation (v.14) to community testimony (v.16-18). A funnel from the cosmic to the personal.",
        },
        scholars: [
          { view: "High Christology", summary: "The Word IS God from eternity. This is not an adopted human elevated to divine status. This is God himself stepping into creation.", proponents: "Richard Bauckham, D.A. Carson, Andreas Kostenberger" },
          { view: "Wisdom Christology", summary: "The Word is personified Wisdom from Proverbs 8 and Sirach 24. John identifies Jesus with the Wisdom tradition in Judaism.", proponents: "Ben Witherington III, James Dunn" },
          { view: "Incarnational theology", summary: "The scandal is not that God exists but that God became flesh. The incarnation dignifies the material world permanently.", proponents: "Karl Barth, T.F. Torrance, Rowan Williams" },
        ],
        application: {
          question: "If God became flesh, what does that say about the physical life you are living right now — your body, your work, your ordinary Tuesday afternoon?",
          connection: "We tend to divide life into sacred and secular, spiritual and physical. The incarnation demolishes that wall. If God became flesh, then physical life is not inferior to spiritual life. Your body, your work, your Tuesday afternoon matters to God.",
          thisWeek: "This week, pay attention to one physical, ordinary moment each day — a meal, a conversation, a walk — and name it as a place where God has pitched his tent.",
        },
        deeper: {
          books: ["The Gospel According to John (Pillar) by D.A. Carson", "The Gospel of John: A Theological Commentary by Herman Ridderbos", "Jesus and the God of Israel by Richard Bauckham"],
          studyQuestion: "John could have started with Jesus' birth (like Matthew and Luke) or with his baptism (like Mark). Instead he starts before time. Why does it matter that the story of Jesus does not begin in Bethlehem but in eternity?",
          prayer: "God who became flesh, I confess I have treated my physical life as less important than my spiritual life. You did not. You moved into it. Teach me to see the ordinary as the place you chose to dwell. Amen.",
        },
      },
      {
        ref: "John 15:1-17",
        summary: "The Vine and Branches and what it means to stay",
        text: "I am the true vine, and my Father is the gardener. He cuts off every branch in me that bears no fruit, while every branch that does bear fruit he prunes so that it will be even more fruitful. Remain in me, as I also remain in you...",
        paraphrase: "Jesus does not say 'try harder.' He says 'stay connected.' The vine does not demand performance from the branches. The vine offers itself. Fruit is not the goal you achieve. Fruit is the byproduct of remaining attached to the source.",
        keyWords: [
          { word: "abide", original: "meno (Greek)", meaning: "Remain, stay, dwell. Appears 11 times in this passage alone. Not a feeling. Not a spiritual high. A decision to stay connected when everything in you wants to detach." },
          { word: "prune", original: "kathairo (Greek)", meaning: "To prune, to clean. Same root as katharos (pure). The pruning is not punishment. It is purification. God cuts away what prevents growth." },
          { word: "friends", original: "philos (Greek)", meaning: "Jesus elevates the disciples from servants (doulos) to friends. In the ancient world, a 'friend of the king' had access to the inner court. Jesus is granting intimacy, not just instruction." },
        ],
        historical: [
          "The vine was a national symbol of Israel. Isaiah 5 describes Israel as God's vineyard that produced bad fruit. When Jesus says 'I am the true vine,' he is claiming to be the true Israel.",
          "This discourse takes place at the Last Supper, after Judas has left. The remaining eleven are about to watch Jesus die. 'Remain in me' is spoken to men who are hours away from scattering.",
          "In first-century viticulture, pruning was severe. A vinedresser would cut back up to 90% of the previous year's growth. The branches would look dead. But the pruning was what made the next season's fruit possible.",
          "The shift from 'servants' to 'friends' (v.15) is not casual. A servant obeyed without understanding. A friend was entrusted with the master's reasoning.",
        ],
        literary: {
          genre: "Farewell discourse. John 13-17 is Jesus' final teaching before the crucifixion. The vine metaphor is the last major 'I am' statement in John's Gospel.",
          devices: "Extended metaphor (vine, branches, gardener, fruit, pruning), repetition of meno creating a meditative rhythm, contrast between abiding and being cut off, movement from metaphor to direct command ('love one another').",
          keyTerms: [
            { term: "meno", language: "Greek", meaning: "Abide, remain, stay. Eleven occurrences in seventeen verses. John wants you to hear it until it lodges in you." },
            { term: "kathairo", language: "Greek", meaning: "Prune, clean. What feels like cutting is actually cleaning. The pain of God's pruning is the pain of purification." },
            { term: "philos", language: "Greek", meaning: "Friend. Not a casual term. An elevation of status. The friend knows the reasons." },
          ],
          structure: "Moves from metaphor (v.1-8) to command (v.9-17). The metaphor establishes the relationship. The command names the fruit: love one another. Abiding produces love. Not the other way around.",
        },
        scholars: [
          { view: "Mystical union", summary: "Abiding is spiritual contemplation, an interior life of prayer and communion with Christ.", proponents: "Thomas Merton, Andrew Murray, Lesslie Newbigin" },
          { view: "Covenantal faithfulness", summary: "Abiding is not mystical experience but covenantal loyalty. To remain in the vine is to remain faithful to the relationship.", proponents: "D.A. Carson, Craig Keener" },
          { view: "Missional fruitfulness", summary: "Abiding produces fruit for others. The passage is not about private spirituality but about a community that bears witness.", proponents: "N.T. Wright, Lesslie Newbigin, Michael Gorman" },
        ],
        application: {
          question: "Where in your life are you trying to produce fruit by effort rather than by connection?",
          connection: "We live in a culture that rewards production. The vine metaphor subverts that. Fruit is not manufactured. It is grown. And it is grown only by staying connected to the source.",
          thisWeek: "Identify one place where you are exhausted from trying to produce results on your own. Instead of working harder, spend ten minutes in silence asking: 'Jesus, what does it look like to abide in you here?'",
        },
        deeper: {
          books: ["The Gospel According to John 13-21 (Anchor Bible) by Raymond Brown", "The Gospel of John (NICNT) by D.A. Carson", "Abide in Christ by Andrew Murray"],
          studyQuestion: "Jesus says the Father prunes branches that bear fruit so they will bear more fruit. If pruning is not punishment but preparation, how does that change how you interpret painful seasons?",
          prayer: "Jesus, I confess I have been trying to produce fruit by my own effort. I am tired. Teach me what it means to remain. Not to perform. Not to prove. Just to stay connected to you. Amen.",
        },
      },
    ],
  },
  {
    name: "Galatians", testament: "NT", hook: "The angriest letter in the New Testament",
    passages: [
      {
        ref: "Galatians 2:15-21",
        summary: "Justified by faith — the thesis that rewired Christianity",
        text: "We who are Jews by birth and not sinful Gentiles know that a person is not justified by the works of the law, but by faith in Jesus Christ. So we, too, have put our faith in Christ Jesus that we may be justified by faith in Christ and not by the works of the law, because by the works of the law no one will be justified... I have been crucified with Christ and I no longer live, but Christ lives in me.",
        paraphrase: "Even we — Jews who grew up inside the covenant, who had the law from birth — even we had to admit the law could not make us right with God. We put our faith in Christ not because we ran out of other options but because the law was never designed to do what we asked it to do. And now? I died with Christ. The person who used to perform for God's approval is dead. The life I live now is not my own striving. It is Christ living through me.",
        keyWords: [
          { word: "justified", original: "dikaioo (Greek)", meaning: "To declare righteous, to vindicate. A legal term from the courtroom. Not 'made righteous' but 'declared righteous.' The distinction matters: justification is a status change, not a behavior change." },
          { word: "works of the law", original: "erga nomou (Greek)", meaning: "The practices required by Torah — circumcision, dietary laws, Sabbath observance. Paul is not attacking good behavior. He is attacking the idea that covenant membership is determined by ethnic boundary markers rather than by faith in the Messiah." },
          { word: "crucified with", original: "synestaurōmai (Greek)", meaning: "Co-crucified. A compound verb: syn (with) + stauroo (crucify). Paul does not say 'I imitate Christ's death.' He says 'I participated in it.' The old self — the one that needed the law's approval — died on that cross too." },
        ],
        historical: [
          "The Antioch incident (2:11-14) is the immediate backdrop. Peter had been eating with Gentile believers — radical table fellowship that crossed ethnic boundaries. When emissaries from James arrived, Peter withdrew. Paul confronted him publicly. This passage is Paul's theological explanation of why Peter was wrong.",
          "Justification language comes from the Hebrew law court. The judge does not make the defendant innocent; the judge declares the defendant righteous — acquitted. Paul transfers this courtroom metaphor to God's relationship with humanity.",
          "The 'works of the law' debate was not abstract theology. It was about whether Gentile converts had to become ethnically Jewish to belong to God's people. Circumcision, food laws, and calendar observance were the visible markers. Paul says: those markers are not the door. Christ is.",
          "When Paul says 'I have been crucified with Christ,' he uses language from Roman crucifixion — the most public, shameful, and definitive form of death. To be crucified with Christ is to undergo a death so thorough that the old identity cannot be recovered.",
        ],
        literary: {
          genre: "Theological argument embedded in autobiographical narrative. Paul moves from telling a story (the Antioch confrontation) to making a universal theological claim. The personal becomes the doctrinal.",
          devices: "Antithesis (works of law vs. faith in Christ), paradox ('I no longer live, but Christ lives in me'), rhetorical intensification building to the climactic 'I have been crucified with Christ,' first-person testimony as theological proof.",
          keyTerms: [
            { term: "dikaioo", language: "Greek", meaning: "To justify, declare righteous. Appears three times in verse 16 alone. The repetition is not careless. It is relentless." },
            { term: "erga nomou", language: "Greek", meaning: "Works of the law. Refers specifically to Torah observance as a boundary marker, not to moral effort in general." },
            { term: "synestaurōmai", language: "Greek", meaning: "Co-crucified. Perfect tense: a past action with ongoing results. Paul was crucified with Christ once, and he remains crucified." },
          ],
          structure: "Three steps: (1) Even Jews need faith, not law (v.15-16); (2) If seeking justification through Christ makes us sinners, does that make Christ a servant of sin? Absolutely not (v.17-18); (3) The radical conclusion — I died with Christ (v.19-21).",
        },
        scholars: [
          { view: "New Perspective on Paul", summary: "'Works of the law' refers to ethnic boundary markers that separated Jews from Gentiles. The issue is inclusion, not introspection.", proponents: "James D.G. Dunn, N.T. Wright, E.P. Sanders" },
          { view: "Traditional Reformed reading", summary: "Paul argues against any human effort to earn standing before God. Justification is forensic — God declares the sinner righteous on the basis of Christ's righteousness alone.", proponents: "Martin Luther, John Calvin, Thomas Schreiner" },
          { view: "Participationist reading", summary: "The heart of Paul's theology is union with Christ. 'Crucified with Christ' is the key. Believers participate in Christ's death and resurrection.", proponents: "Michael Gorman, Richard Hays, Morna Hooker" },
        ],
        application: {
          question: "Where are you still performing for approval — from God, from others, from yourself — instead of living from the identity you have already been given?",
          connection: "We live in a performance economy. Your worth is your output. Paul says: the person who needed to perform is dead. You were crucified with Christ. The verdict has already been rendered. You are free to stop auditioning for a role you have already been given.",
          thisWeek: "Identify one area where you are performing for approval this week. Name it. Then practice this sentence each morning: 'The verdict has already been rendered. I do not need to earn what I have already been given.'",
        },
        deeper: {
          books: ["Galatians (Anchor Yale Bible) by J. Louis Martyn", "Justification by N.T. Wright", "Galatians (Baker Exegetical Commentary) by Douglas Moo"],
          studyQuestion: "Luther called Galatians 'my epistle.' But the New Perspective argues Paul was addressing ethnic boundary markers, not personal guilt. Can both readings be true simultaneously?",
          prayer: "God, I confess I am still performing. Still trying to earn what you have already given. Help me believe the verdict. Help me live from the freedom and not toward it. Amen.",
        },
      },
      {
        ref: "Galatians 5:16-26",
        summary: "The fruit of the Spirit and the war inside you",
        text: "So I say, walk by the Spirit, and you will not gratify the desires of the flesh. For the flesh desires what is contrary to the Spirit, and the Spirit what is contrary to the flesh... But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.",
        paraphrase: "There is a war inside you, and pretending it does not exist will not make it stop. But Paul does not tell you to try harder. He tells you to walk. To keep step with the Spirit. And when you do, what grows is not a checklist of behaviors but a single crop with nine expressions: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. It is fruit, not fruits. One tree. One life. Nine flavors.",
        keyWords: [
          { word: "walk", original: "peripateō (Greek)", meaning: "To walk around, to conduct one's life. A Hebrew idiom (halakh) for the pattern of daily living. Not a single decision but a sustained direction." },
          { word: "flesh", original: "sarx (Greek)", meaning: "Not the physical body but the old order of existence — the self oriented around its own appetites, anxieties, and ambitions. Paul is not anti-body. He is anti-self-as-center." },
          { word: "fruit", original: "karpos (Greek)", meaning: "Singular, not plural. This is one integrated life expressing itself in nine ways. You do not pick love and skip gentleness. The fruit grows together or not at all." },
        ],
        historical: [
          "The flesh-Spirit contrast has roots in Jewish apocalypticism, where two ages overlap. Believers live in the overlap. The flesh belongs to the old age. The Spirit belongs to the new. The war Paul describes is eschatological — two ages fighting for territory inside one person.",
          "The 'works of the flesh' list would have been recognizable from Greco-Roman vice lists. But Paul includes 'discord, jealousy, fits of rage, selfish ambition, dissensions, factions.' The sins of the religious are on the same list as the sins of the pagan.",
          "The fruit of the Spirit echoes God's self-description in Exodus 34:6-7. Love (hesed), patience (erek appayim), faithfulness (emunah) — the Spirit produces God's own character in human lives.",
          "Paul's phrase 'against such things there is no law' is darkly humorous. When the Spirit produces this kind of life, what law could possibly object? The law has nothing to add to a person who loves, who is gentle, who has self-control.",
        ],
        literary: {
          genre: "Ethical exhortation (paraenesis) using apocalyptic framework. Paul describes a cosmic conflict that plays out in the daily decisions of ordinary people.",
          devices: "Antithesis (flesh vs. Spirit), vice and virtue lists, singular 'fruit' against plural 'works' (the flesh fragments; the Spirit unifies), ironic understatement ('against such things there is no law').",
          keyTerms: [
            { term: "sarx", language: "Greek", meaning: "Flesh. The gravitational pull of the old age toward self-interest, self-protection, self-exaltation." },
            { term: "pneuma", language: "Greek", meaning: "Spirit. The presence of the age to come already at work in the present. Not a feeling but the power of God's future breaking into your Tuesday." },
            { term: "karpos", language: "Greek", meaning: "Fruit. Singular. Not manufactured by effort but grown by remaining connected to the source." },
          ],
          structure: "Command (walk by the Spirit, v.16), conflict (flesh vs. Spirit, v.17), vice list (v.19-21), virtue list (v.22-23), resolution (crucified the flesh, v.24), exhortation (keep in step, v.25).",
        },
        scholars: [
          { view: "Already/not yet tension", summary: "Believers have the Spirit but still experience the flesh. The Christian life is ongoing warfare in the overlap of two ages.", proponents: "Gordon Fee, N.T. Wright, George Eldon Ladd" },
          { view: "Virtue ethics reading", summary: "The fruit is character formation over time. Spiritual maturity is grown, not downloaded.", proponents: "Jonathan Wilson, Stanley Hauerwas" },
          { view: "Community formation", summary: "The fruit is relational. The Spirit is forming a people, not just improving individuals. The works of the flesh destroy community. The fruit builds it.", proponents: "Richard Hays, Michael Gorman, Scot McKnight" },
        ],
        application: {
          question: "Which of the nine aspects of the Spirit's fruit is most absent in your life — and what does its absence reveal about where you are still living in your own strength?",
          connection: "We treat the fruit like a self-improvement checklist. But Paul's entire argument is that trying harder is the problem. The fruit is produced by the Spirit in those who have stopped performing and started abiding. The question is not 'how do I manufacture patience?' but 'where am I disconnected from the source?'",
          thisWeek: "Pick the one aspect most absent in your life. Do not try to produce it. Instead ask: 'Where am I striving in my own strength here?' Then pray each morning: 'Spirit, produce in me what I cannot produce in myself.'",
        },
        deeper: {
          books: ["God's Empowering Presence by Gordon Fee", "Galatians (Two Horizons Commentary) by Stephen Fowl", "The Letter to the Galatians (Pillar) by Douglas Moo"],
          studyQuestion: "Paul uses singular 'fruit' not plural 'fruits.' Can you have love without patience, or joy without gentleness? What does it mean that the Spirit produces one integrated life?",
          prayer: "Spirit, I confess I have been trying to manufacture what only you can grow. Produce in me what I cannot produce in myself — not by my effort but by your presence. Amen.",
        },
      },
    ],
  },
  {
    name: "Ephesians", testament: "NT", hook: "The letter about who you already are",
    passages: [
      {
        ref: "Ephesians 2:1-10",
        summary: "Dead, alive, and saved by grace through faith",
        text: "As for you, you were dead in your transgressions and sins, in which you used to live when you followed the ways of this world... But because of his great love for us, God, who is rich in mercy, made us alive with Christ even when we were dead in transgressions — it is by grace you have been saved. And God raised us up with Christ and seated us with him in the heavenly realms... For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast. For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
        paraphrase: "You were dead. Not sick. Not struggling. Dead. And dead people do not save themselves. God did it. While you were still in the grave of your own making, God — out of sheer, unreasonable love — made you alive. Raised you up. Seated you in a position of honor you did not earn. You are saved by grace through faith. Not by your effort. Not by your resume. It is a gift. And the good works you do afterward? God prepared those in advance too. Even your obedience is a gift. You contribute nothing but the need.",
        keyWords: [
          { word: "dead", original: "nekros (Greek)", meaning: "Dead, lifeless, corpse. Not 'sick' or 'struggling' but dead. The metaphor is absolute: a dead person cannot contribute to their own resurrection. Spiritual death means total inability apart from God's intervention." },
          { word: "grace", original: "charis (Greek)", meaning: "Unmerited favor, gift. The word carries the sense of something beautiful freely given. Grace is not God overlooking your sin. Grace is God acting at full cost to himself while you contributed nothing but the need." },
          { word: "handiwork", original: "poiēma (Greek)", meaning: "Something made, a work of art. English 'poem' comes from this word. You are God's poem. Not your own self-made project. A work of art crafted by the divine artist." },
        ],
        historical: [
          "Ephesians was likely a circular letter sent to multiple churches in Asia Minor. The theology is not occasional (addressing a specific problem) but foundational: here is who you are in Christ. The letter reads like a theological constitution for the church.",
          "'Dead in transgressions' echoes Ezekiel 37, the valley of dry bones. Just as those bones could not reassemble themselves, the spiritually dead cannot raise themselves. Resurrection is God's exclusive prerogative — in both testaments.",
          "The phrase 'seated us in the heavenly realms' (v.6) uses the aorist tense — past action, completed. Paul says you are already seated with Christ in heavenly places. Not 'will be someday.' Already are. Your position is secured before your experience catches up.",
          "'Created in Christ Jesus to do good works' (v.10) prevents two errors: works-righteousness (you are saved BY works) and antinomianism (works do not matter). Paul's order is precise: saved by grace, for good works. Grace is the cause. Works are the purpose. Never the reverse.",
        ],
        literary: {
          genre: "Theological exposition in epistolary form. Ephesians 2:1-10 is a single sentence in the Greek (one of Paul's longest), building from death to life to purpose in a sustained theological arc.",
          devices: "Contrast (dead/alive, wrath/mercy, death/resurrection), the 'but God' turn at v.4 that reverses everything, repetition of 'grace' as the engine of salvation, the surprising ending: you are God's artwork, created for prepared works.",
          keyTerms: [
            { term: "nekros", language: "Greek", meaning: "Dead. The starting point of the human condition is not moral weakness but spiritual death. This establishes the absolute necessity of divine initiative." },
            { term: "charis", language: "Greek", meaning: "Grace. Repeated three times in this passage (v.5, 7, 8). Paul wants no misunderstanding: the cause of salvation is grace. Period." },
            { term: "poiēma", language: "Greek", meaning: "Workmanship, masterpiece, poem. The final word about human identity: you are not self-made. You are God-made. And what God makes, God makes for a purpose." },
          ],
          structure: "Three movements: (1) What we were — dead in sin (v.1-3); (2) What God did — 'But God' made us alive (v.4-7); (3) Why it matters — saved by grace for good works (v.8-10). The 'but God' in verse 4 is the hinge on which all of Christian theology turns.",
        },
        scholars: [
          { view: "Monergistic salvation", summary: "God alone saves. The dead cannot contribute. Grace is the sole cause, faith is the sole instrument, and even faith is a gift. Human agency begins only after resurrection, not before.", proponents: "John Calvin, John Piper, Thomas Schreiner" },
          { view: "Cosmic scope of salvation", summary: "Ephesians 2 is not just about individual salvation but about God's plan to unite all things in Christ (1:10). Jews and Gentiles made alive together (v.5-6) previews the cosmic reconciliation God is accomplishing.", proponents: "N.T. Wright, Andrew Lincoln, Markus Barth" },
          { view: "Works as telos", summary: "Good works are not the basis of salvation but its purpose (telos). 'Created for good works' means salvation has a goal beyond itself: God is making a people who embody his purposes in the world.", proponents: "Klyne Snodgrass, Peter O'Brien, Frank Thielman" },
        ],
        application: {
          question: "Do you live as God's masterpiece (poiēma) — someone crafted with purpose and beauty — or as a self-improvement project constantly under construction?",
          connection: "We oscillate between pride ('I saved myself') and despair ('I cannot save myself'). Paul eliminates both. You cannot save yourself (you were dead). And you did not need to (God did it). The result is not pride or despair but gratitude. And gratitude, not guilt, is the engine of obedience.",
          thisWeek: "Each morning this week, read verse 10 aloud: 'I am God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for me to do.' Let that sentence reframe your day: you are not manufacturing purpose. You are walking into what has already been prepared.",
        },
        deeper: {
          books: ["Ephesians (Baker Exegetical Commentary) by Frank Thielman", "The Letter to the Ephesians (Pillar) by Peter O'Brien", "Ephesians (Two Horizons) by Stephen Fowl"],
          studyQuestion: "Paul says we are God's 'poiēma' — his poem, his artwork. What does it mean to think of yourself not as a self-improvement project but as a work of art in the hands of a divine artist? How does that change the pressure you put on yourself?",
          prayer: "God, I was dead and you made me alive. I did not contribute to my own resurrection. I cannot earn what you have freely given. I am your workmanship. Teach me to live as your poem, not my own self-improvement project. Amen.",
        },
      },
      {
        ref: "Ephesians 5:21-33",
        summary: "Marriage as a mystery pointing beyond itself",
        text: "Submit to one another out of reverence for Christ. Wives, submit yourselves to your own husbands as you do to the Lord... Husbands, love your wives, just as Christ loved the church and gave himself up for her... 'For this reason a man will leave his father and mother and be united to his wife, and the two will become one flesh.' This is a profound mystery — but I am talking about Christ and the church.",
        paraphrase: "Before Paul says anything about husbands and wives, he says 'submit to one another.' Mutual submission is the atmosphere. Then he specifies: wives, your submission mirrors the church's trust in Christ. Husbands, your love must mirror Christ's sacrifice for the church — which means dying, not dominating. And then the reveal: this passage was never primarily about marriage. It is about Christ and the church. Marriage is the metaphor. Christ's love is the reality.",
        keyWords: [
          { word: "submit", original: "hypotassō (Greek)", meaning: "To arrange oneself under, to voluntarily yield. A military term for arranging troops under a commander. Not about inferiority but about voluntary ordering for a purpose. The first use (v.21) is mutual — everyone submitting to everyone." },
          { word: "gave himself up", original: "paredōken heauton (Greek)", meaning: "Handed himself over. The same verb used for Judas betraying Jesus. Christ handed himself over willingly, for the church's benefit. The husband's model is not authority but self-sacrifice unto death." },
          { word: "mystery", original: "mystērion (Greek)", meaning: "A hidden truth now revealed. Paul says marriage has always been a mystery pointing to something larger: the relationship between Christ and the church. Marriage is a sign, not the thing signified." },
        ],
        historical: [
          "In the Greco-Roman household codes (Aristotle, Politics), the husband's authority was absolute and unquestioned. Paul subverts the convention: the husband's role is not to command but to die. Christ 'gave himself up' — the model for husbands is crucifixion, not domination.",
          "The mutual submission of v.21 ('submit to one another') is the heading for the entire household code that follows (5:22-6:9). Everything Paul says about husbands, wives, children, parents, slaves, and masters is governed by mutual submission. It is not one-directional hierarchy.",
          "When Paul quotes Genesis 2:24 ('the two will become one flesh') and then says 'this mystery is about Christ and the church,' he is reading Genesis christologically. He is claiming that marriage was always a prophecy — from the very beginning, it pointed to Christ's union with his people.",
          "First-century marriage was primarily an economic and social arrangement. Love was not the basis; family alliance was. Paul's command for husbands to love their wives sacrificially would have been countercultural: love is not the bonus. Love is the requirement. And not romantic love — cruciform love.",
        ],
        literary: {
          genre: "Household code (Haustafel) adapted and subverted by the gospel. Paul takes a conventional Greco-Roman form and transforms it from within: the husband's authority becomes self-sacrifice, the wife's submission is voluntary and mutual, and the entire structure serves as a metaphor for Christ and the church.",
          devices: "Chiastic structure (mutual submission frames everything), analogy (husband:wife :: Christ:church), quotation of Genesis 2 with reinterpretation, the surprise reveal in v.32 ('I am talking about Christ and the church') that recasts the entire passage.",
          keyTerms: [
            { term: "hypotassō", language: "Greek", meaning: "Submit, arrange under. Mutual in v.21, then specified in v.22 and v.25. The key: the husband's 'authority' is exercised through dying, not commanding. That redefines authority entirely." },
            { term: "agapaō", language: "Greek", meaning: "Love. Not eros (romantic desire) or philia (friendship) but agape — self-giving love that costs the lover everything. The standard is not feeling. It is sacrifice." },
            { term: "mystērion", language: "Greek", meaning: "Mystery. A reality hidden in the old age now revealed in Christ. Marriage was always pointing beyond itself. The 'one flesh' of Genesis was always about Christ and his people." },
          ],
          structure: "The passage moves from principle (mutual submission, v.21) to specification (wives, v.22-24; husbands, v.25-30) to theological reveal (the mystery is about Christ and the church, v.31-32) to practical summary (v.33). The theological reveal at the end reframes everything that came before.",
        },
        scholars: [
          { view: "Complementarian", summary: "Paul affirms distinct roles: the husband leads as Christ leads the church; the wife submits as the church submits to Christ. The roles are not interchangeable but are both dignified and essential.", proponents: "Wayne Grudem, Andreas Kostenberger, Thomas Schreiner" },
          { view: "Egalitarian", summary: "Mutual submission (v.21) governs the passage. Paul subverts patriarchal norms by making the husband a servant-leader whose authority is exercised only through dying. The trajectory of the text moves toward full mutuality.", proponents: "Gordon Fee, Philip Payne, Cynthia Long Westfall" },
          { view: "Christological reading", summary: "The primary point is not marriage advice but christology. Paul is explaining Christ's relationship to the church using marriage as a metaphor. The ethical implications for marriage are secondary to the theological revelation.", proponents: "Markus Barth, Andrew Lincoln, N.T. Wright" },
        ],
        application: {
          question: "Whether married or single: where in your life are you exercising authority through control rather than through sacrifice? And where are you confusing submission with passivity?",
          connection: "This passage has been weaponized to justify domination. But read carefully, it destroys domination. The husband's model is Christ on the cross — not Christ on the throne. Authority in the kingdom is exercised by dying, not by demanding. If your version of leadership does not cost you anything, it is not the kind Paul is describing.",
          thisWeek: "If married: identify one way this week you can exercise authority through sacrifice rather than demand, or submission through trust rather than resignation. If single: identify one relationship where you can practice mutual submission — voluntarily yielding for the other's good without losing yourself.",
        },
        deeper: {
          books: ["Ephesians (Anchor Bible) by Markus Barth", "The Letter to the Ephesians (NICNT) by Frank Thielman", "Discovering Biblical Equality edited by Pierce & Groothuis"],
          studyQuestion: "Paul says 'this mystery is about Christ and the church.' If marriage is a metaphor for Christ's love, what does divorce, abuse, or domination within marriage communicate about the gospel it is supposed to represent?",
          prayer: "Christ who gave yourself up, teach me what authority looks like when it is shaped by crucifixion. Teach me what submission looks like when it is shaped by trust. Free me from both domination and passivity. Make my relationships a sign of your love. Amen.",
        },
      },
    ],
  },
  {
    name: "Revelation", testament: "NT", hook: "Not a prediction. A protest.",
    passages: [
      {
        ref: "Revelation 1:9-20",
        summary: "The vision of the risen Christ that John could barely describe",
        text: "I, John, your brother and companion in the suffering and kingdom and patient endurance that are ours in Jesus, was on the island of Patmos because of the word of God and the testimony of Jesus. On the Lord's Day I was in the Spirit, and I heard behind me a loud voice like a trumpet... I turned around to see the voice that was speaking to me. And when I turned I saw... someone like a son of man, dressed in a robe reaching down to his feet and with a golden sash around his chest. The hair on his head was white like wool, as white as snow, and his eyes were like blazing fire.",
        paraphrase: "John was in exile. Not on retreat. In exile — banished to a rock in the Aegean for refusing to bow to Caesar. And there, in the loneliest place on earth, he saw Jesus. Not the gentle Jesus of the Galilean ministry. A Jesus with eyes like fire, a voice like a waterfall, a face like the sun at full strength. John — who had leaned on Jesus' chest at supper — fell at his feet like a dead man. This is what the risen Christ actually looks like when the veil is pulled back.",
        keyWords: [
          { word: "son of man", original: "huios anthrōpou (Greek)", meaning: "Echoes Daniel 7:13-14. The figure who receives all authority from the Ancient of Days. Jesus' preferred self-title during his ministry, now seen in its full apocalyptic glory. Not a humble designation. A cosmic claim." },
          { word: "sharp double-edged sword", original: "rhomphaia distomos (Greek)", meaning: "Proceeding from his mouth. The sword is his word — not a weapon held in his hand but the truth that emerges from his speech. Christ conquers not by violence but by utterance. His word judges and divides." },
          { word: "the living one", original: "ho zōn (Greek)", meaning: "A divine title. 'I am the living one. I was dead, and now look, I am alive forever.' The resurrection is not a past event. It is an ongoing, eternal reality. Christ did not merely survive death. He conquered it permanently." },
        ],
        historical: [
          "Patmos was a Roman penal colony — a small, barren island in the Aegean Sea used for political exiles. John was there 'because of the word of God and the testimony of Jesus.' He was not on a spiritual retreat. He was a political prisoner of the Roman Empire.",
          "The vision deliberately combines imagery from Daniel 7 (Ancient of Days, son of man), Daniel 10 (the angelic figure), and Ezekiel 1 (the throne vision). John is saying: every vision of God's glory in the Old Testament now resolves in a single person — Jesus.",
          "The 'seven golden lampstands' (v.12) represent seven churches. Christ walks among his churches. He is not absent from their struggles. He is present in the middle of them, assessing, caring, correcting. The lampstand imagery echoes the menorah in the Jerusalem temple — the churches are God's temple now.",
          "Writing under Domitian (81-96 AD), who demanded to be called 'Lord and God' (dominus et deus), John's vision is a direct political challenge. The true Lord and God is not the emperor. It is the crucified and risen Jesus. Every title Domitian claimed for himself, Revelation gives to Christ.",
        ],
        literary: {
          genre: "Apocalyptic vision. Apocalypse does not mean 'the end of the world.' It means 'unveiling' — pulling back the curtain to see reality as God sees it. John sees what is already true but hidden from ordinary sight.",
          devices: "Simile piled on simile ('like wool, like snow, like blazing fire, like bronze, like the sound of rushing waters, like the sun') — John reaches for comparison after comparison because no single image is adequate. The language breaks under the weight of what he sees.",
          keyTerms: [
            { term: "apokalypsis", language: "Greek", meaning: "Unveiling, revelation. The genre name tells you the purpose: this is not prediction but perception. You are being shown what is already true behind the curtain of ordinary reality." },
            { term: "ho zōn", language: "Greek", meaning: "The living one. A title for God in the Old Testament (Joshua 3:10, Psalm 42:2). Jesus claims it for himself. He is not merely alive. He is life itself." },
            { term: "kleis", language: "Greek", meaning: "Keys. 'I hold the keys of death and Hades.' Keys represent authority and access. Christ has authority over the realm of the dead. Death is not autonomous. It operates under his permission." },
          ],
          structure: "The passage moves from setting (v.9-11: exile, Spirit, voice) to vision (v.12-16: the risen Christ in overwhelming glory) to response (v.17: John falls like dead) to commission (v.17-20: 'Do not be afraid. Write.'). The pattern: encounter leads to collapse leads to commissioning.",
        },
        scholars: [
          { view: "Political resistance", summary: "Revelation 1 establishes Jesus as the true emperor in contrast to Rome's claims. Every divine title, every attribute of glory, every mark of sovereignty is taken from Caesar and given to Christ. The vision is political theology dressed in apocalyptic imagery.", proponents: "Richard Bauckham, Brian Blount, Wes Howard-Brook" },
          { view: "Pastoral comfort", summary: "The vision is written to suffering churches. Its primary purpose is not political protest but pastoral encouragement: your Lord is alive, he holds the keys of death, and he walks among his churches. You are not abandoned.", proponents: "G.K. Beale, Grant Osborne, Robert Mounce" },
          { view: "Christological revelation", summary: "The vision reveals who Jesus truly is when all veils are removed. During his earthly ministry, his glory was hidden. Now it is displayed without restraint. This is the Jesus the universe will eventually see.", proponents: "Richard Bauckham, Ian Paul, Michael Gorman" },
        ],
        application: {
          question: "When you picture Jesus, do you picture the gentle shepherd only — or do you also see the one with eyes like fire and a voice like a waterfall? What changes when your image of Christ includes his authority and not just his tenderness?",
          connection: "We domesticate Jesus. We make him gentle, approachable, safe. And he is gentle. But Revelation 1 shows the other side: eyes like fire that see everything, a voice like rushing waters that cannot be ignored, a face like the sun at full strength. John — who knew Jesus better than anyone — fell at his feet like a dead man. A Jesus who is only tender is a Jesus we have tamed. The real Jesus comforts and terrifies in the same breath.",
          thisWeek: "Read Revelation 1:12-18 slowly, one image at a time. For each description (white hair, blazing eyes, bronze feet, rushing voice, sharp sword, shining face), ask: what does this attribute tell me about who Jesus actually is? Let your image of Christ expand beyond the gentle shepherd to include the sovereign Lord.",
        },
        deeper: {
          books: ["The Theology of the Book of Revelation by Richard Bauckham", "Revelation (New International Greek Testament Commentary) by G.K. Beale", "Revelation (Two Horizons) by Ian Paul"],
          studyQuestion: "John 'fell at his feet as though dead' (v.17). This is the same John who leaned on Jesus' chest at the Last Supper. What changed? Why does intimacy with Jesus not prevent being overwhelmed by his glory?",
          prayer: "Lord Jesus, I have made you small. I have kept only the parts of you that feel safe. Show me the rest. Show me the eyes of fire and the voice of waters. I need a savior who is not only kind but sovereign. Let me see you as you truly are. Amen.",
        },
      },
      {
        ref: "Revelation 21:1-8",
        summary: "New heaven, new earth, and God wiping every tear",
        text: "Then I saw 'a new heaven and a new earth,' for the first heaven and the first earth had passed away, and there was no longer any sea. I saw the Holy City, the new Jerusalem, coming down out of heaven from God, prepared as a bride beautifully dressed for her husband. And I heard a loud voice from the throne saying, 'Look! God's dwelling place is now among the people, and he will dwell with them...' He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
        paraphrase: "The end of the Bible is not escape from earth. It is heaven coming to earth. God does not evacuate his people to a distant paradise. He moves his throne room into the neighborhood. The new Jerusalem comes down. And in that city, God himself wipes every tear. Not explains every tear. Not justifies every tear. Wipes them. The last word in the Bible is not judgment. It is tenderness.",
        keyWords: [
          { word: "new", original: "kainos (Greek)", meaning: "New in quality, not merely new in time (neos). Not a replacement earth but a renewed earth. The same creation, liberated from decay. Continuity with transformation, not annihilation and restart." },
          { word: "coming down", original: "katabainousan (Greek)", meaning: "Descending. The direction is crucial: heaven comes to earth, not earth goes to heaven. Popular Christianity gets this backwards. The biblical hope is not escape but arrival — God arriving here, permanently." },
          { word: "dwelling place", original: "skēnē (Greek)", meaning: "Tent, tabernacle. The same word used in John 1:14 ('the Word tabernacled among us'). The incarnation was the preview. The new creation is the permanent move. God pitches his tent with humanity and never leaves." },
        ],
        historical: [
          "John writes to churches under persecution. The 'new heaven and new earth' is not escapism but hope that makes endurance possible. If this world is all there is, then suffering has the last word. If God will make all things new, then suffering is penultimate, not ultimate.",
          "'No longer any sea' (v.1) is not about disliking the ocean. In the ancient Near East, the sea represented chaos, evil, and the forces that oppose God (see Daniel 7, where beasts rise from the sea). 'No more sea' means: no more chaos. No more powers that threaten creation.",
          "The 'new Jerusalem coming down from heaven' reverses the Tower of Babel (Genesis 11), where humans tried to build up to God. In Revelation, God builds down to humans. The city comes from God. It is not a human achievement. It is a divine gift.",
          "'God will wipe every tear from their eyes' (v.4) echoes Isaiah 25:8. The image is extraordinary in its intimacy: the sovereign God of the universe performing the tender act of wiping tears from human faces. Not sending an angel. Doing it himself.",
        ],
        literary: {
          genre: "Apocalyptic vision of consummation. This is the climax of the entire biblical narrative — the resolution of every tension introduced in Genesis 1-3. Creation is restored. The curse is reversed. God dwells with humanity.",
          devices: "The 'I saw' structure (John narrates what he witnesses), bridal imagery (the city as bride), direct divine speech ('I am making everything new' — one of the few times God speaks directly in Revelation), negation theology (no death, no mourning, no crying, no pain — the future is defined by what is absent).",
          keyTerms: [
            { term: "kainos", language: "Greek", meaning: "Qualitatively new. Not neos (brand new, never existed before) but kainos (existing thing made new). This earth, renewed. This creation, healed. Not discarded but redeemed." },
            { term: "skēnē", language: "Greek", meaning: "Tabernacle, dwelling place. God's tent pitched permanently with humanity. The journey from Eden (God walking with humans) through the tabernacle (God dwelling temporarily) to the new creation (God dwelling permanently) is complete." },
            { term: "idou", language: "Greek", meaning: "'Look! Behold!' God interrupts the vision to speak directly: 'Look! I am making everything new.' The present tense: this renewal is not only future. It has already begun." },
          ],
          structure: "Three movements: (1) What John sees — new heaven, new earth, holy city descending (v.1-2); (2) What God declares — dwelling with humanity, wiping tears, ending death (v.3-4); (3) What God promises — 'I am making everything new,' the water of life freely given, the overcomers' inheritance (v.5-8).",
        },
        scholars: [
          { view: "Cosmic renewal", summary: "God does not destroy creation and start over. He renews it. The new heaven and earth are this heaven and earth freed from corruption. Salvation is not escape from the material world but the redemption of it.", proponents: "N.T. Wright, Richard Bauckham, J. Richard Middleton" },
          { view: "Fulfillment of covenant", summary: "Revelation 21 fulfills every covenant promise in Scripture: God dwelling with his people (Sinai covenant), all nations blessed (Abrahamic covenant), death defeated (Davidic hope). The ending of the Bible is the completion of its beginning.", proponents: "G.K. Beale, Greg Beale, Thomas Schreiner" },
          { view: "Hope as resistance", summary: "The vision of the new creation is not escapism but resistance. It sustains suffering communities by insisting that Rome (and every empire) does not have the last word. God does. And God's last word is restoration, not destruction.", proponents: "Brian Blount, Allan Boesak, Wes Howard-Brook" },
        ],
        application: {
          question: "Does your hope for the future look like escape from this world — or the healing of this world? And how does the difference change how you live now?",
          connection: "Popular Christianity often teaches: this world is disposable, heaven is the real destination, and everything here will burn. Revelation 21 says the opposite: heaven comes here. God moves in. Creation is healed, not discarded. And if the earth's future is renewal rather than destruction, then what we do here matters permanently. Work, art, justice, love — all of it is building material for the new creation.",
          thisWeek: "Identify one act of creation care, justice, or beauty you can do this week. Do it not as a distraction from eternity but as participation in it. If God will make all things new, then everything good you build here echoes forward into the renewed creation. Nothing done in love is wasted.",
        },
        deeper: {
          books: ["Surprised by Hope by N.T. Wright", "The Theology of the Book of Revelation by Richard Bauckham", "A New Heaven and a New Earth by J. Richard Middleton"],
          studyQuestion: "God says 'I am making everything new' — not 'I am making all new things.' The distinction matters. What is the difference between God making new things (replacement) and making everything new (renewal)? How does this shape your hope?",
          prayer: "God who makes all things new, come. Bring your city down. Wipe every tear — mine and the world's. Until that day, give me the courage to build toward your future rather than escape from this present. Everything you touch becomes new. Touch this world again. Amen.",
        },
      },
    ],
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
          { word: "I AM WHO I AM", original: "ehyeh asher ehyeh (Hebrew)", meaning: "The most debated phrase in the Old Testament. It can mean 'I am who I am,' 'I will be what I will be,' or 'I cause to be what I cause to be.' God's name is not a label. It is an unfinished sentence." },
          { word: "holy ground", original: "admat qodesh (Hebrew)", meaning: "Qodesh means 'set apart.' The ground was not inherently sacred. It became holy because God was present. Holiness is not a property of places. It is a consequence of presence." },
          { word: "burning bush", original: "seneh bo'er (Hebrew)", meaning: "The bush (seneh) may be a wordplay on Sinai. The fire that does not consume is a theophany — God's visible manifestation. Fire in the OT signals God's presence and his refusal to be domesticated." },
        ],
        historical: [
          "Moses had been in Midian for forty years. He was eighty years old. He had killed an Egyptian, fled Pharaoh, and settled into obscurity. God's call came not at the height of Moses' competence but at the far end of his failure.",
          "The name YHWH (the tetragrammaton) revealed here became so sacred that Jews stopped pronouncing it, substituting 'Adonai' (Lord). The name God gave to invite intimacy became the name humans were too reverent to speak.",
          "Horeb and Sinai are likely the same mountain. The place where God revealed his name is the same place where God would later give the law. Name before command. Relationship before obligation.",
          "The burning bush as theophany distinguishes Israel's God from every other ancient Near Eastern deity. Egyptian gods were carved in stone. Israel's God shows up in fire that does not destroy what it touches.",
        ],
        literary: {
          genre: "Call narrative. Follows the classic prophetic call pattern: divine encounter, commission, objection, reassurance, sign. Moses' reluctance is not humility. It is resistance.",
          devices: "Dialogue drives the entire scene. God speaks, Moses objects, God responds. Five times Moses resists. The bush itself is a literary symbol: fire that does not consume mirrors a God who draws near without destroying.",
          keyTerms: [
            { term: "ehyeh", language: "Hebrew", meaning: "'I AM' or 'I will be.' God names himself with a verb, not a noun. He is not a thing. He is an act — an ongoing, unfinished act of being." },
            { term: "seneh", language: "Hebrew", meaning: "The bush. Possibly a pun on Sinai. A lowly desert shrub. God reveals himself in what is small and overlooked." },
            { term: "YHWH", language: "Hebrew", meaning: "The personal name of God, related to the verb 'to be.' Not a title but a name. God gives Moses something no other deity offered: a personal name to call him by." },
          ],
          structure: "Moves from ordinary labor (v.1) to extraordinary encounter (v.2-6) to divine commission (v.7-10) to human objection (v.11-12) to divine self-revelation (v.13-15). The climax is not the commission. It is the name.",
        },
        scholars: [
          { view: "Revelatory theology", summary: "'I AM WHO I AM' is God's definitive self-disclosure. It establishes God as self-existent, uncaused, sovereign. The name is both an invitation and a boundary.", proponents: "Brevard Childs, Walter Brueggemann" },
          { view: "Liberation theology", summary: "The burning bush is inseparable from the cry of the enslaved (v.7-9). God reveals his name in the context of hearing suffering. The name is a promise of action.", proponents: "Gustavo Gutierrez, James Cone" },
          { view: "Mosaic vocation reading", summary: "The passage is about call, not just theology. Moses' five objections mirror every human resistance to divine vocation. God does not remove the inadequacy. He promises his presence alongside it.", proponents: "Terence Fretheim, Dennis Olson" },
        ],
        application: {
          question: "Moses was eighty and hiding when God called him. Where have you decided you are too old, too failed, or too far gone to be used?",
          connection: "We want God to call us at our best. God called Moses at his worst. Forty years of tending someone else's sheep. The burning bush did not appear to the young, ambitious Moses. It appeared to the old, broken one. God's timing looks like waste until it looks like wisdom.",
          thisWeek: "Identify one area where you have been telling God 'send someone else.' Write it down. Then read Exodus 3:12: 'I will be with you.' Sit with that promise for five minutes each day.",
        },
        deeper: {
          books: ["Exodus (Old Testament Library) by Brevard Childs", "Exodus: A Theological Commentary by Dennis Olson", "The God Who Acts by G. Ernest Wright"],
          studyQuestion: "God gives Moses a name that is essentially a verb: 'I AM.' What does it mean to worship a God who refuses to be a noun?",
          prayer: "God who burns without consuming, I confess I have been hiding. I have called my fear humility. You know my name. You have told me yours. That is enough to start. Amen.",
        },
      },
      {
        ref: "Exodus 20:1-17",
        summary: "The Ten Commandments and why they are gift before demand",
        text: "And God spoke all these words: 'I am the Lord your God, who brought you out of Egypt, out of the land of slavery. You shall have no other gods before me...'",
        paraphrase: "Before God gave a single command, he reminded Israel who he was and what he had done. The law begins with grace. The first word is not 'thou shalt.' It is 'I am the Lord who set you free.' Every command that follows is built on that foundation.",
        keyWords: [
          { word: "I am the Lord your God", original: "anokhi YHWH elohekha (Hebrew)", meaning: "The prologue before the commands. In suzerainty treaties, the great king identified himself and named what he had done before listing obligations. Grace before law." },
          { word: "You shall not", original: "lo (Hebrew)", meaning: "Apodictic law: absolute, unconditional. 'You shall not murder' does not say 'or else.' It describes the kind of people a redeemed community becomes." },
          { word: "covet", original: "chamad (Hebrew)", meaning: "Not merely wanting. Chamad means to desire with intent to acquire. The tenth commandment is the only one that legislates the interior life." },
        ],
        historical: [
          "The Ten Commandments follow the structure of ancient Near Eastern suzerainty treaties: preamble, historical prologue, stipulations. Israel would have recognized this form. God is making a covenant, not issuing a memo.",
          "The prologue ('I am the Lord who brought you out') means every command rests on prior deliverance. Israel does not obey in order to be saved. Israel obeys because it has already been saved.",
          "The command about Sabbath is the longest. In a world where Pharaoh demanded seven-day-a-week labor from enslaved people, a mandatory day of rest was revolutionary.",
          "The distinction between apodictic law ('You shall not') and casuistic law ('If... then...') matters. The Ten Commandments are entirely apodictic: absolute principles that define identity, not just behavior.",
        ],
        literary: {
          genre: "Covenant law / treaty stipulations. Not a legal code in the modern sense. The terms of a relationship between a liberating God and a liberated people.",
          devices: "The prologue establishes relationship before requirements. Commands move from God-directed (1-4) to human-directed (5-10). The tenth command turns inward, making the list a journey from worship to the heart.",
          keyTerms: [
            { term: "anokhi", language: "Hebrew", meaning: "'I myself.' Emphatic. God does not begin with 'You must.' He begins with 'I am.' Commands are grounded in God's character." },
            { term: "berith", language: "Hebrew", meaning: "'Covenant.' The commands are covenant stipulations. Outside the covenant, they are just rules. Inside it, they are the shape of love." },
            { term: "pesel", language: "Hebrew", meaning: "'Carved image.' Not about statues but about any attempt to make God manageable and predictable." },
          ],
          structure: "Two tablets: duties to God (1-4) and duties to neighbor (5-10). Jesus summarized: love God, love neighbor. The entire law hangs on these two movements.",
        },
        scholars: [
          { view: "Covenant treaty reading", summary: "The commands follow Hittite suzerainty treaty format. They are covenant terms given to a specific people with universal implications.", proponents: "George Mendenhall, Dennis McCarthy, Meredith Kline" },
          { view: "Gift theology", summary: "The commands are gifts describing the shape of a free life. A people just liberated from slavery need to know what freedom looks like. The law is the architecture of liberty.", proponents: "Walter Brueggemann, Patrick Miller" },
          { view: "Moral law tradition", summary: "The Ten Commandments reflect God's eternal moral law, valid across all times and cultures.", proponents: "John Calvin, Westminster Confession" },
        ],
        application: {
          question: "Which commandment have you reduced to a rule you keep rather than a relationship it was meant to protect?",
          connection: "We read the commandments as restrictions. They were given as architecture for freedom. Every 'you shall not' protects something precious: life, marriage, truth, contentment, worship.",
          thisWeek: "Pick one commandment. Spend the week asking not 'Am I obeying this?' but 'What is this protecting?' Move from compliance to understanding.",
        },
        deeper: {
          books: ["The Ten Commandments by Patrick Miller", "Theology of the Old Testament by Walter Brueggemann", "Treaty of the Great King by Meredith Kline"],
          studyQuestion: "If the prologue is removed, the commandments become generic rules. What changes when every command is read as spoken by a God who has already rescued you?",
          prayer: "God who freed Israel before instructing Israel, free me from reading your commands as a checklist. Show me what each one protects. Let me live as a free person, not a compliant one. Amen.",
        },
      },
    ],
  },
  {
    name: "Proverbs", testament: "OT", hook: "Wisdom for people who have to make decisions today",
    passages: [
      {
        ref: "Proverbs 1:1-7",
        summary: "The fear of the Lord and why wisdom starts with surrender",
        text: "The proverbs of Solomon son of David, king of Israel: for gaining wisdom and instruction; for understanding words of insight... The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.",
        paraphrase: "Before Solomon gives a single piece of practical advice, he tells you the foundation: wisdom begins with the fear of the Lord. Not terror. Not groveling. A proper reckoning with the fact that you are not the smartest person in the room. God is. And until you accept that, every clever strategy you devise will be built on sand.",
        keyWords: [
          { word: "fear of the Lord", original: "yir'at YHWH (Hebrew)", meaning: "Reverence, awe, proper respect for God's sovereignty. Not the fear of a slave before a master but the awe of a creature before its Creator. The starting point of all wisdom is the acknowledgment that you are not God." },
          { word: "beginning", original: "reshit (Hebrew)", meaning: "First principle, foundation, starting point. Not just chronologically first but foundationally first. Everything else in Proverbs is built on this. Remove the fear of the Lord and you have mere pragmatism." },
          { word: "wisdom", original: "chokmah (Hebrew)", meaning: "Skill for living. Not abstract intelligence but the ability to navigate life well. In Hebrew thought, wisdom is not what you know. It is how skillfully you live." },
        ],
        historical: [
          "Proverbs belongs to the ancient Near Eastern wisdom tradition. Egypt (Amenemope), Mesopotamia, and Israel all produced wisdom literature. But Israel's wisdom has a distinctive foundation: the fear of YHWH. Other cultures built wisdom on observation alone. Israel built it on revelation.",
          "The 'fear of the Lord' was not abstract theology. In a polytheistic world where people feared dozens of unpredictable deities, fearing one God who had revealed his character (Exodus 34:6-7) was actually liberating. You feared one, and that freed you from fearing all the others.",
          "Solomon was associated with wisdom throughout Israel's history (1 Kings 3-4). The attribution 'proverbs of Solomon' gives the collection royal authority — this is not folk wisdom. It is wisdom endorsed by the crown.",
          "The Hebrew word for 'fool' (ewil) does not mean 'stupid.' It means 'one who rejects the moral order.' The fool is not intellectually deficient. The fool is morally rebellious. Folly is a choice, not a limitation.",
        ],
        literary: {
          genre: "Wisdom instruction / prologue to a wisdom collection. The first seven verses function as a thesis statement for the entire book. Everything that follows is an elaboration of this foundation.",
          devices: "Purpose statements stacked in parallel (for gaining... for understanding... for receiving...), the climactic placement of 'the fear of the Lord' after building expectation, contrast between the wise and the fool.",
          keyTerms: [
            { term: "chokmah", language: "Hebrew", meaning: "Wisdom. Not theoretical knowledge but practical skill. The same word is used for the craftsmen who built the tabernacle (Exodus 31:3). Wisdom is skill applied to the material of daily life." },
            { term: "yir'ah", language: "Hebrew", meaning: "Fear, reverence, awe. The emotional and intellectual posture of a creature who knows its place in the cosmos. Not anxiety but appropriate smallness before God's greatness." },
            { term: "musar", language: "Hebrew", meaning: "Instruction, discipline, correction. Wisdom is not comfortable. It requires submission to correction. Those who refuse correction refuse wisdom." },
          ],
          structure: "Title and attribution (v.1), purpose statements (v.2-6), thesis statement (v.7). The entire collection hangs on verse 7 as its foundation. Every proverb that follows assumes this starting point.",
        },
        scholars: [
          { view: "Theological wisdom", summary: "The fear of the Lord is not one piece of wisdom among many. It is the epistemological foundation for all wisdom. Without it, wisdom becomes mere technique — clever but untethered from moral reality.", proponents: "Tremper Longman, Bruce Waltke, Derek Kidner" },
          { view: "Creation theology", summary: "Proverbs assumes that God built wisdom into the structure of creation itself. To live wisely is to align yourself with the grain of the universe. To live foolishly is to go against reality.", proponents: "William Brown, Leo Perdue" },
          { view: "Practical skill reading", summary: "Proverbs is primarily about practical life competence. The fear of the Lord provides the moral compass, but the content is everyday guidance: relationships, work, speech, money, parenting.", proponents: "Roland Murphy, Richard Clifford" },
        ],
        application: {
          question: "Where in your life are you trying to be wise without being submitted? Where have you built strategy without first establishing surrender?",
          connection: "We want wisdom without worship. Technique without surrender. Proverbs says: that is not possible. Every strategy built without the fear of the Lord is a house without a foundation. It may stand for a while, but it will not endure. The smartest decision you will ever make is the admission that you are not the smartest person in the room.",
          thisWeek: "Before making any significant decision this week, pause and pray one sentence: 'God, I am not the wisest person in this situation. You are. Show me what I am missing.' That posture — humble, submitted, teachable — is what Proverbs calls the beginning of wisdom.",
        },
        deeper: {
          books: ["Proverbs (New International Commentary) by Bruce Waltke", "The Book of Proverbs (Pillar) by Tremper Longman", "Wisdom and Creation by Leo Perdue"],
          studyQuestion: "The word 'beginning' (reshit) can mean 'foundation' or 'first principle.' If the fear of the Lord is the foundation, then what happens to wisdom when that foundation is removed? Can secular wisdom function without it?",
          prayer: "God, I have been trying to be wise on my own terms. I have sought technique without surrender. Teach me to fear you rightly — not with terror but with the awe that opens my eyes to see clearly. Amen.",
        },
      },
    ],
  },
  {
    name: "Isaiah", testament: "OT", hook: "The prophet who saw further than anyone",
    passages: [
      {
        ref: "Isaiah 52:13-53:12",
        summary: "The Suffering Servant and the God who saves through pain",
        text: "See, my servant will act wisely; he will be raised and lifted up and highly exalted... He was despised and rejected by mankind, a man of suffering, and familiar with pain... Surely he took up our pain and bore our suffering, yet we considered him punished by God... But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.",
        paraphrase: "This is the servant nobody wanted. Despised. Rejected. Acquainted with grief. And here is the scandal: his suffering was not his own punishment. It was ours. He carried what we deserved. He was pierced for what we did. And by his wounds — not despite them, but by them — we are healed. Pain became the instrument of salvation.",
        keyWords: [
          { word: "servant", original: "eved (Hebrew)", meaning: "Servant, slave. The title carries echoes of Moses, David, and the prophets — all called 'servants.' But this servant surpasses them all: he does not merely speak God's word. He embodies God's redemption in his body." },
          { word: "pierced", original: "mecholal (Hebrew)", meaning: "To be pierced through, fatally wounded. The passive voice matters: this was done to him. He did not stumble into suffering. He was subjected to it — for our transgressions, not his own." },
          { word: "healed", original: "nirpa (Hebrew)", meaning: "To be healed, restored. By his wounds we are healed. The paradox is the theology: the wound of one becomes the healing of many. Pain is not wasted. It is transferred, transformed, redemptive." },
        ],
        historical: [
          "Isaiah 53 was written approximately 700 years before Christ. The early church saw it as the clearest prophecy of Jesus' crucifixion in the Old Testament. The Ethiopian eunuch in Acts 8 was reading this exact passage when Philip explained the gospel to him.",
          "In Jewish interpretation, the servant has been identified with Israel itself (corporate reading), with a specific prophet (Isaiah or another), or with a coming messianic figure. The Dead Sea Scrolls show that pre-Christian Jews were already debating the identity of this servant.",
          "The idea of vicarious suffering — one person bearing the penalty deserved by others — was radical in the ancient Near East. In most ancient thought, suffering was caused by your own sin. Isaiah says: this servant suffers not for his own sin but for the sins of others.",
          "The servant is 'lifted up' (v.13) — the same verb used for Moses lifting the bronze serpent in the wilderness (Numbers 21:9). John's Gospel makes the connection explicit: Jesus is 'lifted up' on the cross as the serpent was lifted in the desert.",
        ],
        literary: {
          genre: "Servant Song — the fourth and final of Isaiah's 'Servant Songs' (42:1-9, 49:1-7, 50:4-9, 52:13-53:12). This song is the climax, moving from the servant's calling to his suffering to his vindication.",
          devices: "Paradox (exalted through humiliation, healed through wounds), the shift from 'we' to 'he' (the community confessing what the servant bore for them), imagery of sacrifice (lamb led to slaughter), the reversal in v.10-12 (the dead servant sees his offspring and is satisfied).",
          keyTerms: [
            { term: "eved YHWH", language: "Hebrew", meaning: "'Servant of the Lord.' This servant embodies God's redemption in his own body. The ultimate servant is the ultimate sacrifice." },
            { term: "asham", language: "Hebrew", meaning: "'Guilt offering' (v.10). The servant becomes the guilt offering — the specific sacrifice in Leviticus for trespass against God's holiness. He does not merely suffer. He atones." },
            { term: "yaskil", language: "Hebrew", meaning: "'Will act wisely' or 'will prosper' (52:13). The opening verb creates tension: how can wisdom and exaltation coexist with the crushing that follows? Only through resurrection." },
          ],
          structure: "The song moves in five stanzas: the servant's exaltation announced (52:13-15), his suffering described from the community's perspective (53:1-3), the meaning of his suffering revealed — vicarious atonement (53:4-6), his silent submission (53:7-9), and his ultimate vindication (53:10-12).",
        },
        scholars: [
          { view: "Christological fulfillment", summary: "Isaiah 53 is a direct prophecy of Jesus' crucifixion, fulfilled in detail: rejected, silent before accusers, numbered with transgressors, buried in a rich man's tomb, raised to see his offspring.", proponents: "Alec Motyer, J. Alec Motyer, Edward Young, John Oswalt" },
          { view: "Corporate Israel reading", summary: "The servant is Israel itself — suffering in exile for the sins of the nations, innocent yet punished, ultimately restored. The early church applied this corporately to Jesus as Israel's representative.", proponents: "H.H. Rowley (historical), Jon Levenson (Jewish scholarship)" },
          { view: "Penal substitution", summary: "The servant bears the punishment (penal) that others deserved (substitution). 'The punishment that brought us peace was upon him' is the clearest Old Testament statement of substitutionary atonement.", proponents: "John Stott, Leon Morris, Steve Jeffery" },
        ],
        application: {
          question: "Where have you experienced undeserved suffering — and can you imagine that even that suffering might be used redemptively for others?",
          connection: "We live in a culture that sees suffering only as something to be eliminated. Isaiah 53 says something scandalous: God uses suffering as the instrument of healing. Not all suffering — not random or vindictive suffering — but suffering freely accepted for the sake of others. The servant did not suffer as a victim. He suffered as a volunteer. And his wounds became our healing.",
          thisWeek: "Read Isaiah 53 slowly, one verse at a time. At each verse, pause and ask: what does this tell me about the cost of my healing? What did it take to make me whole? Let the weight of it produce not guilt but gratitude.",
        },
        deeper: {
          books: ["The Prophecy of Isaiah by Alec Motyer", "Isaiah 40-66 (New International Commentary) by John Oswalt", "The Cross of Christ by John Stott"],
          studyQuestion: "The servant 'did not open his mouth' (53:7). Why is the servant's silence significant? What is communicated by not defending himself? And how does Jesus' silence before Pilate fulfill this?",
          prayer: "God, the cost of my healing was borne by another. I did not pay for my own freedom. You did — in your servant, in your Son. Let me never treat that cost casually. And where I suffer, show me how even my pain might become redemptive for someone else. Amen.",
        },
      },
    ],
  },
  {
    name: "Daniel", testament: "OT", hook: "Faithfulness when the empire demands your worship",
    passages: [
      {
        ref: "Daniel 7:1-14",
        summary: "The Son of Man vision and who gets the last kingdom",
        text: "In my vision at night I looked, and there before me were the four winds of heaven churning up the great sea. Four great beasts, each different from the others, came up out of the sea... As I looked, thrones were set in place, and the Ancient of Days took his seat... In my vision at night I looked, and there before me was one like a son of man, coming with the clouds of heaven. He approached the Ancient of Days and was led into his presence. He was given authority, glory and sovereign power...",
        paraphrase: "Daniel sees the empires of the world as beasts rising from the sea of chaos — violent, predatory, temporary. Then the scene shifts to heaven. The Ancient of Days — God, eternal and unhurried — takes his seat. And someone 'like a son of man' approaches the throne and receives an everlasting kingdom. Not a beast. A human. The empires devour. The Son of Man receives. The kingdoms built by violence will end. The kingdom given by God will not.",
        keyWords: [
          { word: "Ancient of Days", original: "attiq yomin (Aramaic)", meaning: "A title for God that appears only in Daniel 7. White hair and clothing signal purity and age beyond measure. This is not a frail elder. This is the one who was old when the mountains were young." },
          { word: "son of man", original: "bar enash (Aramaic)", meaning: "Literally 'one like a human being.' In contrast to the beasts, this figure is human. Jesus' adoption of this title as his primary self-designation draws directly from Daniel 7:13." },
          { word: "everlasting dominion", original: "sholtan alam (Aramaic)", meaning: "An authority that will not pass away, unlike the temporary reign of empires. Every beast-kingdom has an expiration date. This kingdom does not." },
        ],
        historical: [
          "Daniel 7 was written during or reflecting on the exile — when Israel had no political power and was subject to a succession of empires (Babylon, Persia, Greece, Rome). The vision says: these empires look permanent. They are not. God has a kingdom that outlasts them all.",
          "The four beasts represent successive empires. Most scholars identify them as Babylon (lion), Persia (bear), Greece (leopard), and Rome (terrifying beast). Each is more violent than the last. The pattern of empire is escalating brutality.",
          "Jesus' use of 'Son of Man' as his primary self-title draws directly from Daniel 7:13. When Jesus told the high priest 'you will see the Son of Man sitting at the right hand of the Mighty One and coming on the clouds of heaven' (Mark 14:62), he was quoting Daniel 7. The high priest understood immediately and tore his robes.",
          "The vision's political context matters: empires that demand total allegiance (Nebuchadnezzar's statue in Daniel 3, Darius' decree in Daniel 6) are judged by a God who gives authority to his chosen one. Every empire claiming divine right is implicitly challenged.",
        ],
        literary: {
          genre: "Apocalyptic vision. The genre unveils heavenly reality behind earthly politics. What looks like permanent empire on earth is temporary beast in heaven. What looks like weakness on earth (a human figure, not a beast) receives eternal authority.",
          devices: "Beast imagery (chaos, predation, violence) contrasted with human imagery (the son of man receives rather than seizes), the courtroom scene (thrones, books, judgment), the shift from earth (sea, beasts) to heaven (throne, Ancient of Days, clouds).",
          keyTerms: [
            { term: "attiq yomin", language: "Aramaic", meaning: "'Ancient of Days.' Used three times in Daniel 7, nowhere else. Places God outside of time. The empires are trapped in history. God presides over it." },
            { term: "bar enash", language: "Aramaic", meaning: "'Son of man' or 'one like a human being.' In a vision full of beasts, the figure who receives the kingdom is human. Humanity redeemed, not beastly power, inherits the earth." },
            { term: "sholtan", language: "Aramaic", meaning: "Authority, dominion. Given (not seized) to the son of man. The pattern of God's kingdom: authority is received from God, not taken by violence." },
          ],
          structure: "The vision moves in three scenes: (1) Four beasts rise from the sea (v.1-8) — empires in their predatory reality; (2) The Ancient of Days takes his seat and judges (v.9-12) — God's sovereignty over history; (3) The son of man receives an eternal kingdom (v.13-14) — God's final answer to empire.",
        },
        scholars: [
          { view: "Messianic reading", summary: "The 'one like a son of man' is an individual messianic figure who receives universal authority from God. Jesus' adoption of the title confirms this reading.", proponents: "E.J. Young, Stephen Miller, traditional evangelical reading" },
          { view: "Corporate symbol", summary: "The son of man represents 'the saints of the Most High' (v.18, 27) — the faithful remnant of Israel. Just as the beasts represent kingdoms, the human figure represents God's people.", proponents: "John Collins, John Goldingay" },
          { view: "Both/and reading", summary: "The son of man is both an individual (Jesus) and a corporate figure (God's people). The king represents his kingdom. Jesus as Son of Man incorporates his people into his reign.", proponents: "N.T. Wright, G.K. Beale, Richard Bauckham" },
        ],
        application: {
          question: "Which 'beast' in your cultural moment demands your worship — and how do you maintain loyalty to the Son of Man's kingdom while living inside the beast's territory?",
          connection: "Every generation faces its own version of Nebuchadnezzar's statue: a system demanding total allegiance. Political parties, economic systems, cultural ideologies — all claiming to be the final word. Daniel 7 says: they are all beasts. They are all temporary. The only kingdom that lasts is the one given to the Son of Man. Your allegiance to that kingdom will cost you. But it is the only one with no expiration date.",
          thisWeek: "Identify one area where you feel pressure to give ultimate allegiance to something that is not God's kingdom — a political identity, an economic system, a cultural ideology. Name it. Then read Daniel 7:14 and remember: that system has an expiration date. The Son of Man's kingdom does not.",
        },
        deeper: {
          books: ["Daniel (Word Biblical Commentary) by John Goldingay", "Daniel (Tyndale OT Commentary) by Ernest Lucas", "Jesus and the God of Israel by Richard Bauckham"],
          studyQuestion: "Jesus chose 'Son of Man' as his primary self-designation over 'Messiah' or 'Son of God.' Why? What does Daniel 7 communicate about Jesus' mission that the other titles do not?",
          prayer: "Ancient of Days, the empires look permanent and your kingdom looks invisible. Give me eyes to see what Daniel saw: the beasts are temporary. Your kingdom is eternal. Help me live accordingly. Amen.",
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

  return (
    <Layout>
      <SEOMeta
        title="Deep Bible Study Companion — Seminary Depth, Kitchen-Table Language"
        description="Study any passage with 6 layers of analysis: text, historical context, literary structure, scholarly perspectives, modern application, and deeper resources. PhD-level depth made accessible."
        structuredData={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Deep Bible Study Companion", applicationCategory: "ReligiousApp", offers: { "@type": "Offer", price: "0" } }}
      />

      <section style={{ background: "var(--charcoal, #1a1a1a)", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", fontFamily: "var(--U, Inter, sans-serif)", marginBottom: "1.5rem" }}>FLAGSHIP TOOL</div>
          <h1 style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--bone, #F5F0E6)", marginBottom: "1rem" }}>
            Deep Bible Study Companion
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--bone, #F5F0E6)", opacity: 0.6, maxWidth: "560px" }}>
            Seminary-level depth. Kitchen-table language. Six layers of analysis for every passage. No pastor required. No seminary required. Just you, the text, and the tools to understand it.
          </p>
        </div>
      </section>

      {!selectedBook ? (
        <section style={{ background: "var(--bone, #F5F0E6)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink, #14110C)", marginBottom: "0.5rem" }}>Choose a book</h2>
            <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "2rem" }}>Books with full study content are highlighted. More books coming soon.</p>

            {["OT", "NT"].map(testament => (
              <div key={testament} style={{ marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", fontFamily: "var(--U, Inter, sans-serif)", marginBottom: "1rem" }}>
                  {testament === "OT" ? "Old Testament" : "New Testament"}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                  {BOOKS.filter(b => b.testament === testament).map(book => {
                    const hasContent = book.passages.length > 0;
                    return (
                      <button key={book.name} onClick={() => hasContent && setSelectedBook(book)} style={{
                        padding: "1.25rem", background: "white", border: "1px solid #e5e0d5",
                        borderRadius: "2px", cursor: hasContent ? "pointer" : "default", textAlign: "left",
                        opacity: hasContent ? 1 : 0.5, transition: "all 240ms ease",
                      }}>
                        <div style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink, #14110C)", marginBottom: "0.25rem" }}>{book.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "#666", lineHeight: 1.4 }}>{book.hook}</div>
                        {!hasContent && <div style={{ fontSize: "0.65rem", color: "var(--mustard, #D4A017)", marginTop: "0.5rem", fontFamily: "var(--U, Inter, sans-serif)" }}>Coming soon</div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : !selectedPassage ? (
        <section style={{ background: "var(--bone, #F5F0E6)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <button onClick={() => setSelectedBook(null)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", color: "#666", fontSize: "0.85rem", fontFamily: "var(--U, Inter, sans-serif)", cursor: "pointer", marginBottom: "2rem" }}>
              <ArrowLeft size={14} /> All books
            </button>
            <h2 style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.75rem", fontWeight: 400, color: "var(--ink, #14110C)", marginBottom: "0.5rem" }}>{selectedBook.name}</h2>
            <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "2rem" }}>{selectedBook.hook}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {selectedBook.passages.map((p, i) => (
                <button key={i} onClick={() => { setSelectedPassage(p); setActiveTab(0); }} style={{
                  padding: "1.5rem", background: "white", border: "1px solid #e5e0d5", borderLeft: "3px solid var(--mustard, #D4A017)",
                  borderRadius: "2px", cursor: "pointer", textAlign: "left", transition: "all 240ms ease",
                }}>
                  <div style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink, #14110C)", marginBottom: "0.25rem" }}>{p.ref}</div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>{p.summary}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section style={{ background: "var(--bone, #F5F0E6)", padding: "3rem 1.5rem" }}>
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <button onClick={() => setSelectedPassage(null)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", color: "#666", fontSize: "0.85rem", fontFamily: "var(--U, Inter, sans-serif)", cursor: "pointer", marginBottom: "1.5rem" }}>
              <ArrowLeft size={14} /> {selectedBook.name}
            </button>
            <h2 style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.75rem", fontWeight: 400, color: "var(--ink, #14110C)", marginBottom: "2rem" }}>{selectedPassage.ref}</h2>

            <div style={{ display: "flex", gap: "0", borderBottom: "1px solid #e5e0d5", marginBottom: "2rem", overflowX: "auto" }}>
              {TABS.map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(i)} style={{
                  padding: "0.75rem 1rem", background: "none", border: "none", borderBottom: activeTab === i ? "2px solid var(--mustard, #D4A017)" : "2px solid transparent",
                  color: activeTab === i ? "var(--ink, #14110C)" : "#999", fontSize: "0.8rem", fontFamily: "var(--U, Inter, sans-serif)", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
                }}>{tab}</button>
              ))}
            </div>

            <div style={{ background: "white", border: "1px solid #e5e0d5", borderRadius: "2px", padding: "2rem" }}>
              {activeTab === 0 && (
                <div>
                  <h3 style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.25rem", color: "var(--ink, #14110C)", marginBottom: "1.5rem" }}>The Text</h3>
                  <blockquote style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.7, color: "var(--ink, #14110C)", borderLeft: "2px solid var(--mustard, #D4A017)", paddingLeft: "1.5rem", margin: "0 0 2rem" }}>
                    {selectedPassage.text}
                  </blockquote>
                  <h4 style={{ fontFamily: "var(--U, Inter, sans-serif)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", marginBottom: "0.75rem" }}>Plain-English Paraphrase</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--ink, #14110C)", marginBottom: "2rem" }}>{selectedPassage.paraphrase}</p>
                  <h4 style={{ fontFamily: "var(--U, Inter, sans-serif)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", marginBottom: "0.75rem" }}>Key Words</h4>
                  {selectedPassage.keyWords.map((kw, i) => (
                    <div key={i} style={{ marginBottom: "1.25rem", paddingLeft: "1rem", borderLeft: "2px solid #e5e0d5" }}>
                      <div style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1rem", fontWeight: 500, color: "var(--ink, #14110C)", marginBottom: "0.25rem" }}>"{kw.word}" — <span style={{ fontStyle: "italic", color: "var(--mustard, #D4A017)" }}>{kw.original}</span></div>
                      <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "#666" }}>{kw.meaning}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 1 && (
                <div>
                  <h3 style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.25rem", color: "var(--ink, #14110C)", marginBottom: "1.5rem" }}>Historical Context</h3>
                  <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1.5rem" }}>What the original audience heard that we miss.</p>
                  {selectedPassage.historical.map((h, i) => (
                    <div key={i} style={{ marginBottom: "1.25rem", padding: "1.25rem", background: "var(--bone, #F5F0E6)", borderRadius: "2px" }}>
                      <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink, #14110C)" }}>{h}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 2 && (
                <div>
                  <h3 style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.25rem", color: "var(--ink, #14110C)", marginBottom: "1.5rem" }}>Literary & Grammatical Analysis</h3>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U, Inter, sans-serif)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", marginBottom: "0.5rem" }}>Genre</h4>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink, #14110C)" }}>{selectedPassage.literary.genre}</p>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U, Inter, sans-serif)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", marginBottom: "0.5rem" }}>Literary Devices</h4>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink, #14110C)" }}>{selectedPassage.literary.devices}</p>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U, Inter, sans-serif)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", marginBottom: "0.5rem" }}>Key Terms</h4>
                    {selectedPassage.literary.keyTerms.map((kt, i) => (
                      <div key={i} style={{ marginBottom: "1rem", paddingLeft: "1rem", borderLeft: "2px solid #e5e0d5" }}>
                        <div style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1rem", fontWeight: 500, color: "var(--ink, #14110C)" }}>{kt.term} <span style={{ fontStyle: "italic", fontSize: "0.85rem", color: "var(--mustard, #D4A017)" }}>({kt.language})</span></div>
                        <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "#666" }}>{kt.meaning}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--U, Inter, sans-serif)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", marginBottom: "0.5rem" }}>Structure</h4>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink, #14110C)" }}>{selectedPassage.literary.structure}</p>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div>
                  <h3 style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.25rem", color: "var(--ink, #14110C)", marginBottom: "1.5rem" }}>What Scholars Say</h3>
                  <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1.5rem" }}>Honest disagreement exists. Here are the major views.</p>
                  {selectedPassage.scholars.map((s, i) => (
                    <div key={i} style={{ marginBottom: "1.5rem", padding: "1.25rem", background: "var(--bone, #F5F0E6)", borderRadius: "2px", borderLeft: "2px solid var(--mustard, #D4A017)" }}>
                      <h4 style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1rem", fontWeight: 500, color: "var(--ink, #14110C)", marginBottom: "0.5rem" }}>{s.view}</h4>
                      <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "var(--ink, #14110C)", marginBottom: "0.5rem" }}>{s.summary}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--mustard, #D4A017)", fontFamily: "var(--U, Inter, sans-serif)" }}>Key proponents: {s.proponents}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 4 && (
                <div>
                  <h3 style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.25rem", color: "var(--ink, #14110C)", marginBottom: "1.5rem" }}>Why It Matters Today</h3>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U, Inter, sans-serif)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", marginBottom: "0.5rem" }}>The Question This Passage Answers</h4>
                    <p style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink, #14110C)" }}>{selectedPassage.application.question}</p>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U, Inter, sans-serif)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", marginBottom: "0.5rem" }}>The Connection</h4>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink, #14110C)" }}>{selectedPassage.application.connection}</p>
                  </div>
                  <div style={{ padding: "1.25rem", background: "var(--bone, #F5F0E6)", borderRadius: "2px", borderLeft: "2px solid var(--mustard, #D4A017)" }}>
                    <h4 style={{ fontFamily: "var(--U, Inter, sans-serif)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", marginBottom: "0.5rem" }}>This Week</h4>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink, #14110C)" }}>{selectedPassage.application.thisWeek}</p>
                  </div>
                </div>
              )}

              {activeTab === 5 && (
                <div>
                  <h3 style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1.25rem", color: "var(--ink, #14110C)", marginBottom: "1.5rem" }}>Go Deeper</h3>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U, Inter, sans-serif)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", marginBottom: "0.75rem" }}>Recommended Books</h4>
                    {selectedPassage.deeper.books.map((b, i) => (
                      <p key={i} style={{ fontSize: "0.9rem", color: "var(--ink, #14110C)", marginBottom: "0.5rem", paddingLeft: "1rem", borderLeft: "1px solid #e5e0d5" }}>{b}</p>
                    ))}
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontFamily: "var(--U, Inter, sans-serif)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", marginBottom: "0.5rem" }}>Discussion Question</h4>
                    <p style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink, #14110C)" }}>{selectedPassage.deeper.studyQuestion}</p>
                  </div>
                  <div style={{ padding: "1.25rem", background: "var(--charcoal, #1a1a1a)", borderRadius: "2px" }}>
                    <h4 style={{ fontFamily: "var(--U, Inter, sans-serif)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard, #D4A017)", marginBottom: "0.75rem" }}>A Prayer From This Passage</h4>
                    <p style={{ fontFamily: "var(--F, 'Cormorant Garamond', serif)", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.7, color: "var(--bone, #F5F0E6)" }}>{selectedPassage.deeper.prayer}</p>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
              <button onClick={() => setActiveTab(Math.max(0, activeTab - 1))} disabled={activeTab === 0} style={{ padding: "0.5rem 1rem", background: "none", border: "1px solid #e5e0d5", borderRadius: "2px", color: activeTab === 0 ? "#ccc" : "var(--ink, #14110C)", fontSize: "0.8rem", fontFamily: "var(--U, Inter, sans-serif)", cursor: activeTab === 0 ? "default" : "pointer" }}>
                Previous Layer
              </button>
              <button onClick={() => setActiveTab(Math.min(5, activeTab + 1))} disabled={activeTab === 5} style={{ padding: "0.5rem 1rem", background: "none", border: "1px solid #e5e0d5", borderRadius: "2px", color: activeTab === 5 ? "#ccc" : "var(--ink, #14110C)", fontSize: "0.8rem", fontFamily: "var(--U, Inter, sans-serif)", cursor: activeTab === 5 ? "default" : "pointer" }}>
                Next Layer
              </button>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
