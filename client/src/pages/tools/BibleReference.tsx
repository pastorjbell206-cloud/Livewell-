import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { ArrowLeft, BookOpen, AlertTriangle, Scale, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

/* ─────────────────────────────────────────────────── types ── */

interface Passage {
  reference: string;
  text: string;
  context: string;
  misuse: string;
  teaches: string;
}

interface Topic {
  title: string;
  slug: string;
  icon: string;
  oneLiner: string;
  introduction: string;
  passages: Passage[];
  interpretiveRange: string;
  takeaway: string;
}

/* ─────────────────────────────────────────────── topic data ── */

const TOPICS: Topic[] = [
  {
    title: "Money & Generosity",
    slug: "money-generosity",
    icon: "coins",
    oneLiner: "What Scripture actually demands about wealth, poverty, and giving.",
    introduction:
      "The Bible talks about money more than almost any other subject, and most of what it says makes us uncomfortable. Scripture neither baptizes wealth as a sign of God's favor nor condemns it as inherently evil; it treats money as a revealer of the heart and a test of allegiance.",
    passages: [
      {
        reference: "Proverbs 10:4; 13:11; 22:7",
        text: "Lazy hands make for poverty, but diligent hands bring wealth. ... Dishonest money dwindles away, but whoever gathers money little by little makes it grow. ... The rich rule over the poor, and the borrower is slave to the lender.",
        context:
          "Proverbs is wisdom literature, not promise literature. The original audience understood these as general observations about how the world tends to work, not iron-clad guarantees that faithfulness produces financial reward. They sit alongside passages like Proverbs 13:23 ('A poor person's field may produce abundant food, but injustice sweeps it away'), which qualifies the simplistic reading.",
        misuse:
          "Prosperity preachers extract individual proverbs to teach that poverty is always the result of laziness or lack of faith. This ignores the genre entirely. Proverbs observes patterns; it does not issue contracts. Using these verses to blame the poor contradicts the very book they come from.",
        teaches:
          "Diligence matters. Dishonest gain destroys. Debt is bondage. But outcomes are not always proportional to effort, and wisdom requires holding these observations in tension with the reality of injustice.",
      },
      {
        reference: "Matthew 6:24",
        text: "No one can serve two masters. Either you will hate the one and love the other, or you will be devoted to the one and despise the other. You cannot serve both God and mammon.",
        context:
          "Jesus is speaking in the Sermon on the Mount, not issuing economic policy. 'Mammon' was an Aramaic term for wealth personified. The audience lived in a Roman economy where patron-client relationships defined survival. Jesus is naming a spiritual reality: money demands the same loyalty God does.",
        misuse:
          "Sometimes used to condemn all wealth or to demand that Christians take vows of poverty. But Jesus does not say money is evil; he says it is a rival master. The problem is not possession but allegiance.",
        teaches:
          "The question is not how much you have but whom you serve. Money makes promises about security, identity, and freedom that only God can keep. You will give your deepest loyalty to one or the other.",
      },
      {
        reference: "Philippians 4:11-13",
        text: "I have learned to be content whatever the circumstances. I know what it is to be in need, and I know what it is to have plenty. I have learned the secret of being content in any and every situation. ... I can do all this through him who gives me strength.",
        context:
          "Paul writes from prison, thanking the Philippians for their financial gift. The 'contentment' he describes is not passive acceptance; it is a hard-won discipline forged through shipwreck, hunger, beatings, and chains. Verse 13 ('I can do all things') refers specifically to enduring deprivation, not achieving goals.",
        misuse:
          "Philippians 4:13 is among the most decontextualized verses in the Bible. It is stamped on gym walls and graduation cards as a promise of limitless personal achievement. Paul wrote it about surviving prison without losing his mind.",
        teaches:
          "Contentment is not natural; it is learned. It does not require an absence of desire but a reordering of dependence. The 'strength' Paul describes is the ability to endure, not the power to acquire.",
      },
      {
        reference: "Mark 12:41-44",
        text: "Jesus sat down opposite the place where the offerings were put and watched the crowd putting their money into the temple treasury. Many rich people threw in large amounts. But a poor widow came and put in two very small copper coins. ... 'This poor widow has put more into the treasury than all the others.'",
        context:
          "This occurs in Mark's narrative immediately after Jesus condemns religious leaders who 'devour widows' houses.' Some scholars argue Jesus is not praising the widow's generosity but lamenting a system that takes her last coins. Either way, Jesus sees what the system ignores: the cost behind the gift.",
        misuse:
          "Often used to pressure low-income people to give sacrificially to church budgets without questioning whether the institution deserves or needs that sacrifice. The passage can become the very exploitation it may be critiquing.",
        teaches:
          "God measures generosity by what it costs the giver, not by the amount. But the passage also raises hard questions about institutions that accept the last resources of vulnerable people without examining their own consumption.",
      },
      {
        reference: "Mark 10:17-27",
        text: "A man ran up to [Jesus] and fell on his knees. 'Good teacher,' he asked, 'what must I do to inherit eternal life?' ... Jesus looked at him and loved him. 'One thing you lack,' he said. 'Go, sell everything you have and give to the poor, and you will have treasure in heaven. Then come, follow me.' At this the man's face fell. He went away sad, because he had great wealth.",
        context:
          "The rich young ruler has kept the commandments. He is morally upright. But Jesus identifies the one thing that owns him. The command to sell is not a universal economic policy; it is a surgical diagnosis of this man's specific idol. The disciples' shock ('Who then can be saved?') reveals that they, like most ancient people, assumed wealth was a sign of God's favor.",
        misuse:
          "Some universalize this as a command for all Christians to live in poverty. Others dismiss it as a unique encounter with no application beyond the first century. Both readings avoid the discomfort of the question: What is the one thing you will not release?",
        teaches:
          "Jesus loved this man enough to name his idol. Wealth is not condemned in itself, but anything that you cannot imagine releasing has become your functional god. The passage is a mirror, not a policy paper.",
      },
      {
        reference: "Leviticus 25:8-17 (Jubilee)",
        text: "Consecrate the fiftieth year and proclaim liberty throughout the land to all its inhabitants. It shall be a jubilee for you; each of you is to return to your family property and to your own clan.",
        context:
          "The Jubilee was an economic reset built into Israel's legal code: every fifty years, land reverts to original families, debts are cancelled, and slaves are freed. Whether it was ever fully practiced is debated, but the principle is embedded in Torah: no permanent underclass, no indefinite accumulation, because the land belongs to God.",
        misuse:
          "Sometimes cited to justify either radical wealth redistribution or entirely dismissed as an antiquated Israelite ceremony with no modern relevance. Both responses avoid the theological claim: God structured an economy where generational poverty was architecturally impossible.",
        teaches:
          "God's economic vision includes structural limits on accumulation and structural protections against permanent poverty. Generosity is not just an individual virtue; it is meant to be woven into the systems that govern common life.",
      },
    ],
    interpretiveRange:
      "Faithful Christians disagree on whether the Bible prescribes specific economic systems. Some read the Jubilee laws and the early church's communal sharing (Acts 2:44-45) as normative for how Christians should structure economics. Others see these as principles (generosity, care for the poor, limits on greed) that can be expressed through a variety of systems. What is not debatable is that Scripture consistently sides with the vulnerable against the powerful in matters of wealth.",
    takeaway:
      "Before asking 'How much should I give?' ask the prior question: 'What is my money doing to my soul?' The Bible does not give a percentage that purchases a clean conscience. It gives a diagnostic: where your treasure is, there your heart will be also.",
  },
  {
    title: "Suffering",
    slug: "suffering",
    icon: "flame",
    oneLiner: "Scripture's honest, unresolved reckoning with pain.",
    introduction:
      "The Bible does not explain suffering; it inhabits it. From Job's ash heap to Jesus' cry of dereliction, Scripture refuses to let pain be resolved by platitude. The biblical witness holds together two things most people want separated: God is sovereign, and suffering is real.",
    passages: [
      {
        reference: "Job 1-2; 38-42",
        text: "The Lord gave and the Lord has taken away; may the name of the Lord be praised. ... Then the Lord spoke to Job out of the storm: 'Where were you when I laid the earth's foundation?'",
        context:
          "Job is righteous. His suffering is not punishment. The book spends 35 chapters with Job's friends offering theological explanations for his pain, and God rejects every one of them. When God finally speaks, he does not explain the suffering; he reveals himself. The answer to Job's 'why' is not a reason but a presence.",
        misuse:
          "Job 1:21 ('The Lord gave and the Lord has taken away') is often quoted at funerals as though it resolves grief. But the book of Job exists precisely to dismantle the theology that says suffering always has a tidy explanation. Using Job to produce comfort misses the book's central argument.",
        teaches:
          "Not all suffering has an explanation accessible to humans. The friends' error was not that they cared but that they insisted on a reason. God's response does not answer the question of suffering; it reframes the questioner's relationship to the one who holds the answer.",
      },
      {
        reference: "Psalm 88",
        text: "You have put me in the lowest pit, in the darkest depths. ... I am overwhelmed with troubles and my life draws near to death. ... Darkness is my closest friend.",
        context:
          "Psalm 88 is the only psalm with no turn toward hope. It begins in darkness and ends in darkness. The canonical placement matters: Israel included this psalm in its worship book without requiring it to resolve. The original audience sang this in the temple, which means corporate worship has always had a place for unresolved pain.",
        misuse:
          "Rarely quoted, because it offers no comfort. When it is referenced, it is usually softened by pairing it with more hopeful psalms. But its inclusion in Scripture without resolution is itself the theological statement: some seasons of suffering do not resolve on our timeline.",
        teaches:
          "Bringing unresolved pain to God is not a failure of faith; it is an act of faith. The psalm's existence in the canon means God does not require you to be okay before you come to him.",
      },
      {
        reference: "Romans 8:28",
        text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        context:
          "Paul writes to a persecuted community. The 'good' is defined in verse 29: conformity to the image of Christ, not personal comfort. The Greek grammar (synergei) suggests God is working within all circumstances, not that God causes all circumstances. This is a statement about God's character amid suffering, not a statement that suffering is secretly beneficial.",
        misuse:
          "This is perhaps the most weaponized verse in the New Testament. Telling a grieving person that their loss is 'working for good' takes a statement about God's cosmic redemptive purpose and reduces it to a dismissal of their pain. Paul wrote this from a life of beatings, shipwrecks, and imprisonment; he was not minimizing suffering.",
        teaches:
          "God's redemptive purpose is not stopped by suffering, but that is not the same as saying suffering is good. The promise is about God's faithfulness to his ultimate purpose, not about individual outcomes becoming comfortable.",
      },
      {
        reference: "2 Corinthians 12:7-10",
        text: "There was given me a thorn in my flesh, a messenger of Satan, to torment me. Three times I pleaded with the Lord to take it away from me. But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'",
        context:
          "Paul describes an unidentified affliction that God did not remove despite repeated prayer. The 'thorn' has been variously interpreted as a physical ailment, a spiritual struggle, or persecution. What matters is that Paul prayed specifically, God said no, and the response was not removal but sustaining grace.",
        misuse:
          "Used to tell people they should stop asking God for healing or relief because suffering is 'God's will for them.' But Paul prayed three times; he did not passively accept the thorn. The point is not that we should stop asking but that God's no is not God's absence.",
        teaches:
          "Unanswered prayer is not evidence of God's indifference. Some suffering persists, and the grace to endure it is itself a form of divine power. Weakness acknowledged becomes the venue for God's strength.",
      },
      {
        reference: "Matthew 26:36-46",
        text: "'My soul is overwhelmed with sorrow to the point of death,' he said to them. ... Going a little farther, he fell with his face to the ground and prayed, 'My Father, if it is possible, may this cup be taken from me. Yet not as I will, but as you will.'",
        context:
          "Gethsemane is the moment when the incarnation costs the most. Jesus does not approach the cross with stoic detachment; he sweats blood. He asks for another way. The disciples fall asleep, which means he faces this alone. The one who told others not to be anxious is himself overwhelmed with sorrow.",
        misuse:
          "Sometimes presented as a model of cheerful obedience: 'Jesus submitted, so should you.' This misses the agony. Jesus submitted, yes, but through anguish so severe that Luke describes it as producing sweat like drops of blood. Obedience here is not calm acceptance; it is choosing the Father's will while your body is breaking down.",
        teaches:
          "If Jesus needed to wrestle with God's will before accepting it, you are permitted to wrestle too. Honest prayer does not always end in peaceful resolution; sometimes it ends in costly obedience through tears.",
      },
      {
        reference: "Revelation 21:1-5",
        text: "'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.' He who was seated on the throne said, 'I am making everything new!'",
        context:
          "John writes to churches under Roman persecution. This is not escapist fantasy; it is resistance literature. The promise of a renewed creation where suffering ends is written to people whose present reality includes imprisonment, execution, and exile. The future tense matters: this has not happened yet.",
        misuse:
          "Often used to bypass present grief: 'It will all be better someday.' But John does not intend this as a dismissal of current suffering. It is a promise that anchors endurance. The point is not to stop crying now but to know that the crying will end.",
        teaches:
          "Christian hope is not optimism about the present; it is confidence about the future. The promise does not erase present pain but gives it a horizon. God will make all things new, which means nothing that is broken is beyond repair.",
      },
    ],
    interpretiveRange:
      "Christians disagree significantly on the relationship between God's sovereignty and human suffering. Some hold that God ordains all things, including suffering, for his purposes (a strong sovereignty view). Others hold that God permits suffering as a consequence of a broken world without directly willing each instance. Still others emphasize human freedom and the groaning of creation (Romans 8:22) as the primary framework. What all faithful readings share is that God is not indifferent to pain and that suffering does not have the final word.",
    takeaway:
      "The Bible never tells you to pretend suffering is not real, and it never promises to explain it. What it offers is a God who enters it. The cross is God's answer to suffering, not as explanation but as solidarity: the one who made the world submitted to its worst.",
  },
  {
    title: "Marriage",
    slug: "marriage",
    icon: "rings",
    oneLiner: "Covenant, sexuality, and mutual sacrifice in the biblical witness.",
    introduction:
      "Scripture treats marriage as a covenant, not a contract. The difference matters: a contract is an exchange of services; a covenant is an exchange of selves. The biblical arc from Genesis 2 to Ephesians 5 frames marriage as a living metaphor for God's relationship with his people, which means it carries more weight than modern culture assigns it and more grace than legalism allows.",
    passages: [
      {
        reference: "Genesis 2:18-25",
        text: "The Lord God said, 'It is not good for the man to be alone. I will make a helper suitable for him.' ... For this reason a man will leave his father and mother and be united to his wife, and they will become one flesh.",
        context:
          "This is the only 'not good' in the creation narrative. Everything else is declared good or very good; aloneness is the exception. 'Helper' (ezer) is not a subordinate term; it is used of God himself in the Psalms (Psalm 121:2). 'One flesh' describes not just sexual union but a new kinship bond that supersedes the birth family.",
        misuse:
          "The word 'helper' has been weaponized to teach that women exist in a subordinate role relative to men. But ezer in Hebrew implies strength given in aid. It is a military term when applied elsewhere. Using it to mean 'assistant' is a translation choice, not a textual mandate.",
        teaches:
          "Marriage is designed to address the deepest human aloneness. The union creates a new primary loyalty ('leave father and mother') and a new shared identity ('one flesh'). This is not about roles first; it is about covenant first.",
      },
      {
        reference: "Song of Solomon (selections)",
        text: "'Let him kiss me with the kisses of his mouth, for your love is more delightful than wine.' ... 'Place me like a seal over your heart, like a seal on your arm; for love is as strong as death, its jealousy unyielding as the grave.'",
        context:
          "The Song of Solomon is erotic poetry in the biblical canon. The original audience heard it as a celebration of sexual desire within covenanted love. Attempts to make it purely allegorical (Christ and the church) are historically common but miss the plain reading: the Bible includes a book that celebrates sexual pleasure without embarrassment.",
        misuse:
          "Ironically, the church has both over-spiritualized this book (making it only about Christ) and ignored it (because it is too explicit). Both responses betray a discomfort with embodied sexuality that the text itself does not share.",
        teaches:
          "Sexual desire is not sinful; it is created. The Song treats the body as good, desire as powerful, and covenanted love as the context in which both flourish. Scripture is not prudish about sex; it is serious about it.",
      },
      {
        reference: "Ephesians 5:21-33",
        text: "'Submit to one another out of reverence for Christ. Wives, submit yourselves to your own husbands as you do to the Lord. ... Husbands, love your wives, just as Christ loved the church and gave himself up for her.'",
        context:
          "Verse 21 ('submit to one another') is the heading that governs the entire passage. In a patriarchal culture where wives were property, Paul tells husbands to die for their wives. The radical move in this passage is not the instruction to wives (which mirrored cultural expectations) but the instruction to husbands (which overturned them). Christ's sacrifice is the model, and sacrifice is the opposite of domination.",
        misuse:
          "This is the most abused marriage text in the Bible. Removed from verse 21, it becomes a charter for male authority. But the passage describes mutual submission as the framework, and the husband's role is modeled on a savior who washed feet and died on a cross. Any reading that produces domination has missed the point.",
        teaches:
          "Christian marriage is mutual submission patterned on Christ's self-giving love. The husband's 'headship' is defined not by authority exercised but by sacrifice offered. If your reading of this passage gives one spouse power over another, you have read it against its own logic.",
      },
      {
        reference: "1 Corinthians 7:1-16",
        text: "Each man should have sexual relations with his own wife, and each woman with her own husband. The wife does not have authority over her own body but yields it to the husband. In the same way, the husband does not have authority over his own body but yields it to the wife.",
        context:
          "Paul is responding to questions from the Corinthian church, some of whom believed that spiritual maturity required abstinence from sex, even within marriage. Paul's response is strikingly mutual: both spouses have authority over each other's bodies. In a world where wives were considered property, this symmetry was radical. Paul also permits singleness as a high calling, not a consolation prize.",
        misuse:
          "Verse 4 ('the wife does not have authority over her own body') has been used to justify marital rape. This is a grotesque misreading. The passage is about mutual yielding, not coerced access. Both partners yield; neither dominates.",
        teaches:
          "Sexual intimacy in marriage is mutual, reciprocal, and important. Paul treats both spouses as equal agents with equal claims. He also treats singleness with dignity, which matters in a church culture that often treats marriage as the only valid adult state.",
      },
      {
        reference: "Malachi 2:13-16",
        text: "\"The Lord is the witness between you and the wife of your youth. You have been unfaithful to her, though she is your partner, the wife of your marriage covenant. ... 'The man who hates and divorces his wife,' says the Lord, the God of Israel, 'does violence to the one he should protect.'\"",
        context:
          "Malachi addresses Israelite men who are divorcing their wives to marry younger women or foreign wives. The prophet frames divorce as covenant-breaking violence. The language is legal and theological: God himself is the witness to the marriage covenant, and breaking it is a form of treachery. The target audience is not people in abusive marriages; it is men using the legal system to discard wives for personal advantage.",
        misuse:
          "Often quoted as a blanket prohibition on all divorce without acknowledging that the passage targets a specific injustice: powerful men discarding vulnerable women. Using it to trap an abused spouse in a dangerous marriage inverts the passage's concern for the vulnerable party.",
        teaches:
          "Marriage is a covenant witnessed by God, and breaking it for selfish reasons is an act of violence against the other person. But the passage's concern is the protection of the vulnerable, which means any application must keep that priority intact.",
      },
    ],
    interpretiveRange:
      "Faithful Christians disagree on divorce and remarriage (whether Jesus' exception clause in Matthew 19:9 is the only ground or whether abuse and abandonment also qualify), on the complementarian-egalitarian spectrum (whether Ephesians 5 prescribes distinct gender roles or mutual submission that transcends role-assignment), and on the nature of 'headship' (functional authority vs. sacrificial initiative). What unites all faithful readings is that marriage is covenantal, sacrificial, and more about giving than receiving.",
    takeaway:
      "The Bible does not treat marriage as a path to personal fulfillment. It treats marriage as a covenant that forms you into a person capable of love that costs something. If you enter it looking for what you can get, you have misunderstood the invitation.",
  },
  {
    title: "Anxiety & Fear",
    slug: "anxiety-fear",
    icon: "heart-pulse",
    oneLiner: "What Scripture says to the anxious person without dismissing the anxiety.",
    introduction:
      "The Bible's most repeated command is 'Do not fear,' which tells you two things: fear is real, and God takes it seriously. Scripture does not treat anxiety as a character defect or a faith failure. The psalms are full of people who are terrified and bring that terror to God without apology.",
    passages: [
      {
        reference: "Psalm 23",
        text: "The Lord is my shepherd, I lack nothing. ... Even though I walk through the darkest valley, I will fear no evil, for you are with me.",
        context:
          "David writes as a former shepherd who knows that the 'darkest valley' (literally 'the valley of the shadow of death') is a real geographic feature: a narrow ravine where predators lurk and sheep cannot see the way forward. The psalm does not promise avoidance of the valley but presence within it. The table 'in the presence of my enemies' means the threat is still there; you eat anyway.",
        misuse:
          "Often presented as a soothing lullaby, which strips it of its context. This is not a poem about feeling calm. It is a declaration that God's presence is sufficient even when the danger is real and ongoing. The enemies are still at the table.",
        teaches:
          "Courage in Scripture is not the absence of fear; it is trust in the presence of a shepherd who has walked this valley before you. The psalm acknowledges danger, names it, and then declares that presence is stronger than threat.",
      },
      {
        reference: "Psalm 46:1-3, 10",
        text: "God is our refuge and strength, an ever-present help in trouble. Therefore we will not fear, though the earth give way and the mountains fall into the heart of the sea. ... 'Be still, and know that I am God.'",
        context:
          "This psalm was written for corporate worship amid national crisis, likely military threat. The images are not metaphorical; the original audience lived with real enemies at the gates. 'Be still' (raphah) means 'cease striving' or 'let go.' It is a command to stop fighting for your own survival and recognize that God is acting.",
        misuse:
          "'Be still and know that I am God' appears on decorative pillows and is used to counsel passive waiting. But the Hebrew means something closer to 'Stop. Release your grip. Recognize who is actually in charge.' It is not a call to quiet meditation (though that has value); it is a command to release control.",
        teaches:
          "God does not promise the absence of catastrophe. He promises to be present within it. The stillness commanded is not emotional calm but the deliberate release of self-reliance when everything in you wants to take control.",
      },
      {
        reference: "Matthew 6:25-34",
        text: "Therefore I tell you, do not worry about your life, what you will eat or drink; or about your body, what you will wear. ... Can any one of you by worrying add a single hour to your life?",
        context:
          "Jesus speaks to subsistence-level workers in an agrarian economy. These people were not worried about investment portfolios; they were worried about whether they would eat tomorrow. Jesus' argument is not 'stop feeling anxious' but 'look at the evidence: God feeds birds, God clothes flowers, and you are more valuable than either.' It is an argument from lesser to greater, not a dismissal of legitimate concern.",
        misuse:
          "Used to shame people with anxiety disorders, as though clinical anxiety is a failure of faith. But Jesus is addressing a volitional pattern of worry-driven decision-making, not a neurological condition. He is saying 'redirect your focus,' not 'stop having a brain chemistry problem.'",
        teaches:
          "Worry is a trust issue, but acknowledging that does not mean shaming people who struggle with it. Jesus gives evidence for trust (God's track record with creation) rather than demanding trust as a bare act of will. The cure for anxiety here is not willpower but attention: look at what God has already done.",
      },
      {
        reference: "Philippians 4:6-7",
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
        context:
          "Paul writes from prison to a church he loves. His instruction is not 'stop worrying'; it is 'bring your worry to God through prayer.' The word 'present' (gnorizestho) means to make known, to lay out openly. The peace that follows is described as transcending understanding, which means it does not arrive through comprehension but through relationship.",
        misuse:
          "Quoted as though 'do not be anxious about anything' is a light switch you can flip. But Paul pairs the command with a practice: prayer with thanksgiving. The peace is promised not as the absence of trouble but as a guard (a military metaphor) around the mind. It protects; it does not erase.",
        teaches:
          "The antidote to anxiety is not the suppression of feeling but the redirection of attention through honest prayer. You bring the full weight of your concern to God, and what you receive in return is not an explanation but a guarded mind.",
      },
      {
        reference: "1 Peter 5:7",
        text: "Cast all your anxiety on him because he cares for you.",
        context:
          "Peter writes to persecuted Christians scattered across Asia Minor. 'Cast' (epiripsantes) is a violent word; it means to hurl. These are not people experiencing mild worry. They are being hunted. The instruction is not polite; it is urgent: take the weight that is crushing you and throw it at God.",
        misuse:
          "Used as a gentle devotional encouragement, which is not wrong but misses the intensity. Peter is not suggesting a calm meditation practice. He is telling hunted people to physically unload a burden that will break them if they keep carrying it.",
        teaches:
          "God does not invite you to share your anxiety gently; he invites you to hurl it at him. The reason is not that you are weak but that he cares. The 'casting' is violent because the anxiety is violent. The gentleness is on God's side, not yours.",
      },
      {
        reference: "Isaiah 41:10",
        text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
        context:
          "God speaks to Israel in exile, a nation that has lost everything: land, temple, political sovereignty. The command not to fear is followed immediately by the reason: 'for I am with you.' This is not a command to produce an emotional state; it is a promise that the grounds for fear have been addressed by presence.",
        misuse:
          "Sometimes used as a standalone encouragement without acknowledging that it was spoken to a displaced and traumatized people. The comfort is real, but it was forged in exile, not in comfort.",
        teaches:
          "God's response to fear is not an argument but a declaration of presence. He does not explain why you should not be afraid; he tells you who is with you. The logic of the verse is: your fear is real, but my presence is more real.",
      },
    ],
    interpretiveRange:
      "Christians disagree on the relationship between faith and mental health. Some traditions treat all anxiety as a spiritual problem solvable by prayer and Scripture. Others recognize anxiety disorders as medical conditions requiring treatment alongside spiritual care. The best pastoral theology holds both: anxiety has spiritual dimensions, and medication is not a failure of faith. What all faithful readings affirm is that God meets the anxious person with presence, not condemnation.",
    takeaway:
      "The Bible commands 'do not fear' more than 300 times, but it never commands 'do not feel.' The invitation is not to suppress anxiety but to bring it, unedited, to a God who is strong enough to hold it and present enough to meet you inside it.",
  },
  {
    title: "Forgiveness",
    slug: "forgiveness",
    icon: "hand-heart",
    oneLiner: "The cost, the command, and the limits of what forgiveness means.",
    introduction:
      "Forgiveness in Scripture is never cheap. It cost God the cross. It costs us the right to revenge. The Bible commands forgiveness without pretending it is easy, and it never confuses forgiveness with the erasure of consequences or the obligation to trust someone who has not changed.",
    passages: [
      {
        reference: "Matthew 18:21-35",
        text: "Then Peter came to Jesus and asked, 'Lord, how many times shall I forgive my brother or sister who sins against me? Up to seven times?' Jesus answered, 'I tell you, not seven times, but seventy-seven times.'",
        context:
          "Peter thinks he is being generous: rabbinical teaching suggested forgiving three times. Jesus' response is not a mathematical formula but a way of saying 'stop counting.' The parable that follows tells of a servant forgiven an unpayable debt (10,000 talents, roughly 200,000 years of wages) who then chokes a colleague over pocket change. The logic: you cannot receive limitless forgiveness and ration your own.",
        misuse:
          "Used to pressure victims into premature forgiveness without repentance from the offender. But the parable is about the forgiven refusing to forgive, not about victims being obligated to absorb ongoing abuse. Jesus' teaching on confrontation in the same chapter (Matthew 18:15-17) shows that reconciliation requires truth-telling.",
        teaches:
          "Forgiveness is not optional for those who have been forgiven. But forgiveness is a release of the debt, not a denial that the debt existed. You can forgive someone and still require changed behavior before restoring trust.",
      },
      {
        reference: "Luke 15:11-32",
        text: "'Father, I have sinned against heaven and against you. I am no longer worthy to be called your son.' But the father said to his servants, 'Quick! Bring the best robe and put it on him. Put a ring on his finger and sandals on his feet.'",
        context:
          "The prodigal son parable is told in response to Pharisees who grumble that Jesus 'welcomes sinners and eats with them.' The father's response to the returning son is scandalous: no probation period, no public shaming, immediate restoration of status (robe, ring, sandals are symbols of sonship and authority). The older brother's anger reveals that he has been keeping score, which is its own form of lostness.",
        misuse:
          "The focus on the younger son's restoration often ignores the older son's resentment, which Jesus treats as equally dangerous. This parable is also misread as teaching that repentance requires no change; but the son does come home, does confess, and does submit to the father's household again.",
        teaches:
          "God's forgiveness is excessive. It does not match the offense proportionally; it overwhelms it. But the parable is also about the danger of self-righteousness: the older brother who never left was further from the father's heart than the one who squandered everything and came home.",
      },
      {
        reference: "Colossians 3:13",
        text: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
        context:
          "Paul writes to a church torn along ethnic and cultural lines (Jew, Greek, barbarian, Scythian, slave, free). Forgiveness here is not abstract; it is the social glue for a community made up of people who would normally have nothing to do with each other. 'Bear with' (anechomenoi) means to endure, to put up with, to carry the weight of someone's differences.",
        misuse:
          "Used to sweep conflict under the rug: 'Just forgive and move on.' But Paul's instruction comes after a list of things to 'put to death' (anger, rage, malice, slander) and things to 'put on' (compassion, kindness, humility). Forgiveness is the climax of a process, not a shortcut around it.",
        teaches:
          "Forgiveness is modeled on how God forgave you: at great cost, without minimizing the offense, and while you were still in the wrong (Romans 5:8). It is an act of will that releases the other person from the debt they owe you, regardless of whether they have asked for it.",
      },
      {
        reference: "Psalm 103:8-12",
        text: "The Lord is compassionate and gracious, slow to anger, abounding in love. He will not always accuse, nor will he harbor his anger forever; he does not treat us as our sins deserve or repay us according to our iniquities. ... As far as the east is from the west, so far has he removed our transgressions from us.",
        context:
          "David writes this psalm as a personal reflection on God's character. The image of removing transgressions 'as far as the east is from the west' is deliberately infinite: east and west never meet. The psalm also frames God's compassion in terms of a father's tenderness toward his children (v. 13), 'for he knows how we are formed, he remembers that we are dust.'",
        misuse:
          "Sometimes used to suggest that God simply overlooks sin or that forgiveness means consequences disappear. But the psalm is about God's character, not about the absence of discipline. God forgives fully; that does not mean he pretends nothing happened.",
        teaches:
          "God's forgiveness is total, not partial. He does not hold a reserve of unforgiveness. He does not bring up old debts. But this lavish forgiveness flows from his character, not from our performance. It is a gift, not a transaction.",
      },
      {
        reference: "Genesis 45:1-15; 50:15-21",
        text: "'I am your brother Joseph, the one you sold into Egypt! And now, do not be distressed and do not be angry with yourselves for selling me here, because it was to save lives that God sent me ahead of you.' ... 'You intended to harm me, but God intended it for good.'",
        context:
          "Joseph speaks to the brothers who sold him into slavery, after decades of separation, false imprisonment, and suffering. His forgiveness does not deny what they did ('you sold me,' 'you intended to harm me'). It reframes it within God's larger purposes without erasing the brothers' culpability. Joseph weeps, which means the forgiveness is costly and emotional, not detached.",
        misuse:
          "Often used to suggest that if you just wait long enough, the purpose of your suffering will become clear and forgiveness will become easy. But Joseph's story took decades, and the text shows him weeping and sending people out of the room. This was not easy. It was the hardest thing he ever did.",
        teaches:
          "Forgiveness can coexist with an honest acknowledgment of the harm done. Joseph does not say 'it was fine' or 'it did not hurt.' He says 'you meant evil, God meant good.' Both things are true simultaneously. Forgiveness does not require pretending the wound was not real.",
      },
    ],
    interpretiveRange:
      "Christians disagree on whether forgiveness requires the offender's repentance. Some traditions hold that forgiveness is a unilateral act of the will that releases the victim regardless of whether the offender asks for it. Others distinguish between forgiveness (an internal release) and reconciliation (a restored relationship), arguing that reconciliation requires repentance and changed behavior. What is not in dispute is that God commands it, it is costly, and it is modeled on the cross.",
    takeaway:
      "Forgiveness does not mean pretending it did not happen. It means refusing to let what happened own you. The Bible commands it not because the offender deserves it but because unforgiveness will eat you alive and because you have been forgiven a debt larger than any you are owed.",
  },
  {
    title: "Work & Vocation",
    slug: "work-vocation",
    icon: "hammer",
    oneLiner: "Work as calling, not curse, in the biblical imagination.",
    introduction:
      "Work existed before the fall. That single fact reframes everything the Bible says about labor. Scripture treats work as a reflection of God's own creative nature, not as punishment for sin. The curse did not introduce work; it introduced frustration in work. The difference matters for everyone who carries a lunch pail on Monday morning.",
    passages: [
      {
        reference: "Colossians 3:23-24",
        text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters, since you know that you will receive an inheritance from the Lord as a reward. It is the Lord Christ you are serving.",
        context:
          "Paul writes to a community that included slaves. His instruction applies to all work, but its original audience included people with no choice about their labor. The reframing is radical: your ultimate employer is Christ, regardless of your earthly boss. This dignifies even forced labor without endorsing the system that compels it.",
        misuse:
          "Used by employers to demand uncritical obedience from workers or to spiritualize exploitative working conditions. 'You are working for the Lord' should not mean 'therefore accept poor wages and unsafe conditions without complaint.' Paul dignifies the worker, not the system.",
        teaches:
          "The audience for your work is God, not your boss. This elevates even menial labor into a form of worship and simultaneously protects you from building your identity on your employer's opinion of you.",
      },
      {
        reference: "Genesis 1:28; 2:15",
        text: "God blessed them and said to them, 'Be fruitful and increase in number; fill the earth and subdue it.' ... The Lord God took the man and put him in the Garden of Eden to work it and take care of it.",
        context:
          "The command to 'work and keep' the garden comes before the fall. Work is part of the original good creation, not a result of sin. 'Subdue' (kabash) implies cultivation and stewardship, not exploitation. The same verbs (abad, shamar: work and keep) are used later to describe priestly service in the tabernacle, which means ordinary work and sacred work share the same vocabulary.",
        misuse:
          "Genesis 1:28 ('subdue the earth') has been used to justify environmental exploitation. But 'subdue' in context means to bring order to wildness, to cultivate, to steward. The parallel in 2:15 makes it explicit: work and keep, not strip and discard.",
        teaches:
          "Work is pre-fall, which means it is part of what it means to be human, not a consequence of being broken. You were made to create, to cultivate, to bring order out of chaos. Your Monday morning is not a departure from God's design; it is an expression of it.",
      },
      {
        reference: "Ecclesiastes 2:17-26; 3:12-13",
        text: "So I hated life, because the work that is done under the sun was grievous to me. All of it is meaningless, a chasing after the wind. ... I know that there is nothing better for people than to be happy and to do good while they live. That each of them may eat and drink, and find satisfaction in all their toil -- this is the gift of God.",
        context:
          "The Teacher (Qoheleth) has tried everything: wealth, projects, pleasure, wisdom. His conclusion about work swings between despair and gratitude, which is itself the point. Under the sun (without reference to eternity), work is futile. But as a gift from God, ordinary labor carries genuine satisfaction. Ecclesiastes holds both truths simultaneously without resolving the tension.",
        misuse:
          "Either cherry-picked for its cynicism ('everything is meaningless') or its encouragement ('find satisfaction in your toil') without holding the two together. The book's power is in the tension: work is both frustrating and gift, both futile and meaningful.",
        teaches:
          "You will not find ultimate meaning in your work, and you are not supposed to. But you can find genuine satisfaction in it, and that satisfaction is a gift from God. The person who expects work to save them will despair. The person who receives it as gift will eat and drink with gratitude.",
      },
      {
        reference: "Proverbs 6:6-11; 10:4-5; 12:11; 18:9",
        text: "Go to the ant, you sluggard; consider its ways and be wise! ... Lazy hands make for poverty, but diligent hands bring wealth. ... Those who work their land will have abundant food, but those who chase fantasies have no sense. ... One who is slack in his work is brother to one who destroys.",
        context:
          "Proverbs is a collection of wisdom observations, many directed at young men entering adult life. The warnings about laziness are practical, not moralistic. In an agrarian economy, sloth was not just a character flaw; it was a survival risk. The connection between laziness and destruction (18:9) is particularly strong: passivity does not just fail to build; it actively tears down.",
        misuse:
          "Used to shame people who are underemployed, disabled, or struggling in systems that restrict their opportunities. Proverbs assumes a correlation between effort and outcome that is generally true but not universally true. The same book acknowledges injustice (13:23) and the limits of human control (16:9).",
        teaches:
          "Diligence is a moral category, not just a productivity category. How you work reveals your character. But the proverbs are general wisdom, not absolute promises, and applying them without attention to context can produce cruelty rather than motivation.",
      },
      {
        reference: "Acts 18:1-4; 1 Thessalonians 2:9",
        text: "Paul went to see [Aquila and Priscilla], and because he was a tentmaker as they were, he stayed and worked with them. ... Surely you remember, brothers and sisters, our toil and hardship; we worked night and day in order not to be a burden to anyone while we preached the gospel of God to you.",
        context:
          "Paul, the greatest theologian in Christian history, made tents. He worked with his hands to fund his ministry. In the Greco-Roman world, manual labor was considered beneath intellectuals. Paul's choice to work was deliberate and counter-cultural: it demonstrated that the gospel was free and that ordinary work had dignity.",
        misuse:
          "Sometimes used to argue that pastors should not receive salaries, which contradicts Paul's own teaching elsewhere (1 Corinthians 9:14). Paul's tentmaking was strategic, not normative. The point is not that ministry should be unpaid but that ordinary work is not beneath those who serve God.",
        teaches:
          "There is no sacred-secular divide in Paul's life. Tentmaking and preaching the gospel are both acts of faithfulness. The person who teaches the Bible and the person who builds cabinets are both doing God's work if both are doing it for God's audience.",
      },
    ],
    interpretiveRange:
      "Christians disagree on whether all legitimate work is equally 'called' or whether some vocations carry a higher spiritual weight. Some traditions maintain a distinction between sacred and secular callings (with ministry as the highest). The Reformational tradition (following Luther and Calvin) insists that the farmer and the pastor are equally called. What all faithful readings share is that work matters to God, sloth is a moral issue, and Monday belongs to the Lord as much as Sunday.",
    takeaway:
      "Your work is not a detour from your spiritual life. It is your spiritual life expressed through muscle, mind, and material. The question is not whether your job is 'ministry' but whether you are doing it for an audience of One.",
  },
  {
    title: "Death & Grief",
    slug: "death-grief",
    icon: "candle",
    oneLiner: "What the Bible says to the bereaved without rushing the pain.",
    introduction:
      "Scripture does not hurry past death. Jesus wept at a tomb he was about to open. Paul told grieving Christians not to grieve like those without hope, but he did not tell them not to grieve. The Bible holds death as both enemy and defeated enemy, and the tension between those two truths is where the bereaved actually live.",
    passages: [
      {
        reference: "Psalm 23:4",
        text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
        context:
          "The 'valley of the shadow of death' is a shepherd's term for a narrow ravine where danger is real and visibility is low. David writes as someone who has been in actual valleys with actual predators. The rod and staff are weapons and tools of guidance; comfort here is not sentimental. It is the assurance that the shepherd is armed and present.",
        misuse:
          "Read as a gentle poem about peaceful dying, which strips it of its imagery. This is a combat passage. The shepherd carries weapons. The valley is dangerous. The comfort is not that death is not real but that the one walking with you is stronger than what lurks in the shadows.",
        teaches:
          "God does not promise to spare you from the valley. He promises to walk through it with you. The word 'through' matters: the valley is not your destination. It is a passage, not a permanent address.",
      },
      {
        reference: "John 11:17-44",
        text: "When Jesus saw her weeping, and the Jews who had come along with her also weeping, he was deeply moved in spirit and troubled. ... Jesus wept.",
        context:
          "Jesus knows he is about to raise Lazarus. He has already told the disciples that Lazarus's sickness will not end in death (v. 4). And he weeps anyway. The Greek word for 'deeply moved' (embrimaomai) implies anger, not just sorrow; Jesus may be angry at death itself. The shortest verse in the Bible is also one of the most theologically loaded: God incarnate, standing at a grave he is about to empty, weeps.",
        misuse:
          "Sometimes reduced to 'Jesus understands your feelings,' which is true but insufficient. Jesus is not just empathizing. He is confronting death as an enemy, even as he is about to defeat it. His tears are not passive sympathy; they are the grief of someone who hates what death does to the people he loves.",
        teaches:
          "Grief is not a failure of faith. If Jesus wept at a grave he was about to open, you are permitted to weep at graves that remain closed. The resurrection does not cancel grief; it gives it a horizon.",
      },
      {
        reference: "1 Thessalonians 4:13-18",
        text: "Brothers and sisters, we do not want you to be uninformed about those who sleep in death, so that you do not grieve like the rest of mankind, who have no hope. For we believe that Jesus died and rose again, and so we believe that God will bring with Jesus those who have fallen asleep in him.",
        context:
          "The Thessalonian church was confused: members had died before Jesus returned, and the living wondered if the dead had missed the resurrection. Paul's response is not 'do not grieve.' It is 'do not grieve like those who have no hope.' The distinction is everything. Christian grief is real grief anchored to a real future.",
        misuse:
          "Misread as 'Christians should not grieve,' which is the opposite of what Paul says. He explicitly permits grief; he just distinguishes it from hopeless grief. Using this passage to shame someone for mourning deeply is to misread the Greek and misrepresent the apostle.",
        teaches:
          "Christian grief has a shape different from despair because it has a future. The dead in Christ are not lost. But the future does not erase the present: the empty chair at Thanksgiving is still empty, and the ache is real.",
      },
      {
        reference: "Revelation 21:4",
        text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
        context:
          "Written to churches under imperial persecution, many of whom had lost members to execution. The promise is not that pain is unreal but that it is temporary. The image of God wiping tears implies that there will be tears to wipe. The future hope is not the denial of present suffering; it is the promise of its end.",
        misuse:
          "Used to rush people through grief: 'There will be no more tears!' But the text acknowledges that the tears exist now. It does not say 'stop crying.' It says 'a day is coming when the crying will stop because the causes of crying will be removed.'",
        teaches:
          "The Christian hope is not that suffering is an illusion but that it will end. Death, mourning, crying, and pain are real and named. But they are the old order, and a new order is coming in which God himself addresses the sorrow directly, personally, tenderly.",
      },
      {
        reference: "Ecclesiastes 3:1-4",
        text: "There is a time for everything, and a season for every activity under the heavens: a time to be born and a time to die ... a time to weep and a time to laugh, a time to mourn and a time to dance.",
        context:
          "The Teacher arranges human experience into paired opposites to acknowledge that life includes all of them. Mourning is not a deviation from the plan; it has its own appointed time. In the Hebrew worldview, there is no rush to move from weeping to laughing. Each season is given its proper weight.",
        misuse:
          "Used to imply that grief has an expiration date: 'There is a time to mourn, and now it is time to move on.' But the text does not assign durations. It assigns legitimacy. Every season is real and has its place.",
        teaches:
          "Grief has a rightful place in human life. It is not an interruption to be corrected but a season to be honored. The Bible gives mourning the same structural dignity as celebration.",
      },
      {
        reference: "Lamentations 3:19-26",
        text: "I remember my affliction and my wandering, the bitterness and the gall. I well remember them, and my soul is downcast within me. Yet this I call to mind and therefore I have hope: Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
        context:
          "Lamentations is written in the rubble of Jerusalem after its destruction by Babylon. The city is burned. The temple is gone. People are starving. Into this absolute devastation, the poet writes the line most often quoted on coffee mugs: 'His compassions never fail.' The hope in Lamentations 3 is not sentimental; it is wrested from the darkest possible circumstances by an act of will: 'Yet this I call to mind.'",
        misuse:
          "'Great is thy faithfulness' is extracted and sung in comfortable churches without acknowledging that it was first spoken in a ruin. The hope of Lamentations is not optimism; it is defiance. The poet decides to remember God's character when every visible evidence says God has abandoned them.",
        teaches:
          "The most honest hope is the hope that comes from the worst place. The person who can say 'his mercies are new every morning' while sitting in ashes has a faith that no comfortable theology can produce. Biblical hope is not the absence of despair; it is the presence of God remembered in the middle of it.",
      },
    ],
    interpretiveRange:
      "Christians disagree on the intermediate state (what happens between death and final resurrection), on the nature of the resurrection body, and on how much detail Scripture provides about the afterlife. Some traditions emphasize 'absent from the body, present with the Lord' (2 Corinthians 5:8) as immediate. Others emphasize the bodily resurrection as the primary hope, with the intermediate state as a less-defined waiting. What is not disputed: death is an enemy (1 Corinthians 15:26), Christ has defeated it, and grief is permitted.",
    takeaway:
      "The Bible does not tell you to get over death. It tells you that death does not get the final word. In the meantime, between the already and the not yet, you are permitted to sit in the ashes and remember that his compassions are new every morning. Both things are true at the same time.",
  },
  {
    title: "Anger",
    slug: "anger",
    icon: "flame-kindling",
    oneLiner: "The difference between the anger God honors and the anger that destroys.",
    introduction:
      "The Bible does not condemn anger. It distinguishes between anger that serves justice and anger that serves self. God himself is described as angry throughout Scripture, which means the question is not whether anger is ever appropriate but whether yours is aimed at the right target and held within the right boundaries.",
    passages: [
      {
        reference: "Ephesians 4:26-27",
        text: "'In your anger do not sin': Do not let the sun go down while you are still angry, and do not give the devil a foothold.",
        context:
          "Paul quotes Psalm 4:4, acknowledging that anger is inevitable. His instruction is not 'do not be angry' but 'do not let anger lead you into sin.' The 'sun going down' is a practical time limit: deal with anger quickly, because unresolved anger calcifies into bitterness and gives destructive patterns a 'foothold' (topon, literally a place to stand).",
        misuse:
          "Used to pressure people into premature resolution: 'We cannot go to bed angry, so let us fix this tonight.' But the point is not a legalistic bedtime deadline; it is a warning against letting anger harden into a permanent posture. Some conflicts take more than a day to resolve; the instruction is about trajectory, not timeline.",
        teaches:
          "Anger is permitted. Sin is not. The boundary between them is time and action. Anger held too long or expressed destructively becomes something other than anger; it becomes a character deformation. Deal with it while it is still anger and not yet bitterness.",
      },
      {
        reference: "James 1:19-20",
        text: "My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry, because human anger does not produce the righteousness that God desires.",
        context:
          "James writes to a community of Jewish Christians scattered by persecution. 'Quick to listen, slow to speak, slow to anger' is a triad that reveals the order: listening precedes speaking, and both precede anger. The problem with human anger is not that it exists but that it rarely produces God's justice (dikaiosynen). Our anger tends to produce our agenda dressed in righteous clothing.",
        misuse:
          "Read as a blanket prohibition on anger, which it is not. James says be slow to anger, not never angry. The distinction matters. He warns that human anger is an unreliable vehicle for divine justice, not that anger is inherently sinful.",
        teaches:
          "Most of your anger will not produce the outcome you think it will. The corrective is not the suppression of anger but the discipline of listening first. If you have not listened, your anger is premature, and premature anger almost always misses the mark.",
      },
      {
        reference: "Proverbs 14:29; 15:1; 16:32; 29:11",
        text: "Whoever is patient has great understanding, but one who is quick-tempered displays folly. ... A gentle answer turns away wrath, but a harsh word stirs up anger. ... Better a patient person than a warrior, one with self-control than one who takes a city. ... Fools give full vent to their rage, but the wise bring calm in the end.",
        context:
          "The Proverbs tradition prizes self-mastery as one of the highest virtues. In a world where honor culture demanded immediate retaliation for insult, the wisdom tradition reframes restraint as strength, not weakness. 'Better than one who takes a city' is a military comparison: the person who controls their anger is mightier than a conqueror.",
        misuse:
          "Used to shame people who struggle with anger rather than to train them toward self-control. Proverbs describes the goal; it does not pretend the goal is easy. The person who 'gives full vent to their rage' is called a fool, but the solution is wisdom, not repression.",
        teaches:
          "Self-control with anger is a form of strength, not a form of passivity. The ability to feel anger deeply and express it wisely is harder than giving in to it. Restraint is not the absence of feeling; it is the mastery of it.",
      },
      {
        reference: "John 2:13-17",
        text: "So he made a whip out of cords, and drove all from the temple courts, both sheep and cattle; he scattered the coins of the money changers and overturned their tables. 'Get these out of here! Stop turning my Father's house into a market!'",
        context:
          "Jesus does not quietly protest. He makes a whip. He overturns tables. He drives animals and merchants out of the temple courts. This is premeditated (he made the whip) and targeted (he attacks the commercial system, not random people). The money changers were charging exploitative exchange rates for temple currency, profiting from poor worshippers who had no alternative.",
        misuse:
          "Cited to justify any angry outburst as 'righteous anger.' But Jesus' anger was specifically directed at institutional exploitation of vulnerable worshippers, not at personal insult. Using this passage to validate losing your temper at a coworker is a category error.",
        teaches:
          "Righteous anger is targeted, proportional, and aimed at injustice against others, not offense to self. Jesus was angry because the poor were being exploited in the name of worship. The anger served the vulnerable. Most human anger serves the self.",
      },
      {
        reference: "Jonah 4:1-11",
        text: "But to Jonah this seemed very wrong, and he became angry. He prayed to the Lord, 'Isn't this what I said, Lord, when I was still at home? ... I knew that you are a gracious and compassionate God, slow to anger and abounding in love.' ... But the Lord said, 'Is it right for you to be angry?'",
        context:
          "Jonah is angry because God showed mercy to Nineveh, Israel's enemy. His anger is theological: he believes Nineveh deserves destruction and that God's compassion toward them is an injustice toward Israel. God's response is a question, not a condemnation: 'Is it right for you to be angry?' The book ends without resolution; we never hear Jonah's answer.",
        misuse:
          "Jonah is often treated as a children's story about a man and a fish. But the book is a sophisticated exploration of what happens when your theology of justice collides with God's scandalous mercy. Jonah is not stupid; he is theologically consistent. He is also wrong.",
        teaches:
          "Some anger reveals that you love your own sense of justice more than you love the people God is being merciful to. Jonah's anger was not about Nineveh; it was about his own need to be right. God's question ('Is it right for you to be angry?') is one every angry person should sit with.",
      },
    ],
    interpretiveRange:
      "Christians disagree on the boundaries of righteous anger. Some traditions are suspicious of all human anger, pointing to James 1:20. Others emphasize the prophetic tradition and Jesus' temple action as evidence that some situations demand anger. The distinction between righteous and unrighteous anger is generally drawn around the target (injustice toward others vs. offense to self) and the fruit (does the anger produce repentance and justice, or does it produce destruction and self-righteousness?).",
    takeaway:
      "Before you defend your anger as righteous, ask two questions: Is this anger about what was done to someone else, or about what was done to me? And is this anger building something, or is it just burning things down? The Bible permits anger. It is very cautious about trusting it.",
  },
  {
    title: "Parenting",
    slug: "parenting",
    icon: "baby",
    oneLiner: "Raising children as formation, not behavior management.",
    introduction:
      "Scripture treats parenting as the long work of forming a person, not the short work of managing behavior. The Shema (Deuteronomy 6) envisions parents as the primary theologians in a child's life, weaving faith into the ordinary rhythms of walking, eating, lying down, and getting up. This is discipleship, not discipline.",
    passages: [
      {
        reference: "Deuteronomy 6:4-9",
        text: "Hear, O Israel: The Lord our God, the Lord is one. Love the Lord your God with all your heart and with all your soul and with all your strength. These commandments that I give you today are to be on your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you lie down and when you get up.",
        context:
          "The Shema is the foundational confession of Israelite faith. Its instruction to parents is embedded in daily rhythms, not formal lessons. The assumption is that faith is transmitted through proximity and ordinary conversation, not through curriculum. 'When you sit, when you walk, when you lie down, when you get up' covers the entire day. Formation happens in the mundane.",
        misuse:
          "Used to burden parents with the belief that every moment must be a teaching moment, creating exhaustion and performance anxiety. But the Shema assumes a natural, unhurried integration of faith and life. It is about presence and rhythm, not about constant instruction.",
        teaches:
          "The most important thing you can do as a parent is to live your faith in front of your children. The Shema does not say 'teach your children about God.' It says 'these words shall be on your heart,' and then 'impress them on your children.' Your heart comes first. You cannot transmit what you do not possess.",
      },
      {
        reference: "Proverbs 22:6",
        text: "Start children off on the way they should go, and even when they are old they will not turn from it.",
        context:
          "This is wisdom literature, not a divine guarantee. The Hebrew for 'the way they should go' (al pi darko) more literally means 'according to their own way,' which may suggest parenting that accounts for the child's unique temperament and calling. Proverbs observes general patterns; it does not issue contracts. Many faithful parents have raised children who, for a time or permanently, walked away from faith.",
        misuse:
          "This is the most guilt-inducing verse in the Bible for parents of wayward children. It is read as a promise: 'If you raise them right, they will turn out right.' This weaponizes wisdom literature into a performance contract and blames parents for outcomes that involve another human being's agency.",
        teaches:
          "Faithful parenting increases the likelihood that a child will embrace faith, but it does not guarantee it because children are not products; they are people with their own agency. The proverb encourages intentionality without promising control.",
      },
      {
        reference: "Ephesians 6:4",
        text: "Fathers, do not exasperate your children; instead, bring them up in the training and instruction of the Lord.",
        context:
          "In the Greco-Roman world, fathers had absolute legal authority over their children, including the right to abandon, sell, or execute them (patria potestas). Paul's instruction to not exasperate children was counter-cultural: it assigned children dignity and put limits on parental authority. The word 'exasperate' (parorgizete) means to provoke to frustrated anger through unreasonable demands, harshness, or inconsistency.",
        misuse:
          "The positive command ('bring them up in training and instruction') is emphasized; the negative command ('do not exasperate') is often ignored. But Paul leads with the negative because authoritarian parenting was the default. The instruction restrains power before it directs formation.",
        teaches:
          "Parenting is not the exercise of authority for its own sake. The first command is restraint: do not crush your child's spirit through rigidity, unfairness, or emotional cruelty. The second is direction: form them in the Lord's way. The order matters. Restraint precedes instruction.",
      },
      {
        reference: "Psalm 127:3-5",
        text: "Children are a heritage from the Lord, offspring a reward from him. Like arrows in the hands of a warrior are children born in one's youth. Blessed is the man whose quiver is full of them.",
        context:
          "The psalm is attributed to Solomon and is a 'Song of Ascents,' sung by pilgrims traveling to Jerusalem. The arrow metaphor is significant: arrows are made to be launched. They are shaped carefully and then released. The goal of parenting, in this image, is not to keep your children close but to shape them and send them out.",
        misuse:
          "The 'quiver full' language has been co-opted to argue that large families are inherently more blessed or more faithful. But the metaphor is about the purpose of children (arrows are released), not about quantity. The psalm is also descriptive of an ancient agrarian context where many children meant economic security.",
        teaches:
          "Children are not possessions to be kept but arrows to be launched. The parent's job is to shape them for flight, not to hold them in the quiver permanently. The goal is not a child who stays close forever but a child who is ready to go where they are aimed.",
      },
      {
        reference: "Mark 10:13-16",
        text: "People were bringing little children to Jesus for him to place his hands on them, but the disciples rebuked them. When Jesus saw this, he was indignant. He said to them, 'Let the little children come to me, and do not hinder them, for the kingdom of God belongs to such as these.'",
        context:
          "In first-century Palestine, children had no legal rights and minimal social status. The disciples considered them unworthy of Jesus' time. Jesus' response is indignation (aganakteo, a strong word), not gentle correction. He does not just tolerate children; he makes them the model for kingdom entry. The reversal is complete: the lowest-status members of society become the image of what faithfulness looks like.",
        misuse:
          "Used to sentimentalize childhood, as though Jesus is saying children are innocent and we should be more innocent. But the point is not innocence; it is dependence. Children in the ancient world had nothing to bring, no status to spend. They could only receive. That is the posture Jesus praises.",
        teaches:
          "Children matter to God, and any community that treats them as an interruption has misunderstood the kingdom. But the deeper point is about posture: the kingdom belongs to those who come with nothing to offer and everything to receive.",
      },
    ],
    interpretiveRange:
      "Christians disagree on parenting methods, the role of corporal punishment (Proverbs 13:24 is debated regarding whether 'rod' is literal or metaphorical), and the degree to which parents are responsible for their children's faith outcomes. Some traditions emphasize parental authority and obedience-based models. Others emphasize relational formation and connection-based models. What is not in dispute: parents are called to form, not just manage; faith is transmitted through presence, not just instruction; and children have dignity as bearers of God's image.",
    takeaway:
      "The Bible treats parenting as the longest discipleship relationship you will ever have. Your child does not primarily need your rules. Your child needs your presence, your honesty, and a faith that looks real when the door is closed and no one is performing.",
  },
  {
    title: "Sexuality",
    slug: "sexuality",
    icon: "heart",
    oneLiner: "Embodiment, desire, and the contested terrain of biblical sexual ethics.",
    introduction:
      "Scripture takes the body seriously. It is not Platonic; it does not treat the body as a prison for the soul. The incarnation settles the question: God took on flesh, which means flesh matters. The Bible's sexual ethic begins not with prohibition but with the declaration that embodied existence is good, and that sexual union is a way humans image something about God's covenantal love.",
    passages: [
      {
        reference: "Genesis 1:27-28; 2:23-25",
        text: "So God created mankind in his own image, in the image of God he created them; male and female he created them. ... The man said, 'This is now bone of my bones and flesh of my flesh.' ... Adam and his wife were both naked, and they felt no shame.",
        context:
          "The creation narrative establishes two things: humans are embodied image-bearers, and sexual difference is part of what it means to reflect God's image. The 'no shame' of Genesis 2:25 is a statement about unbroken relationship: vulnerability without fear. The fall introduces shame, which means shame about the body is a consequence of sin, not a feature of creation.",
        misuse:
          "Genesis 1-2 is used both to over-define gender roles (as though 'male and female' prescribes specific social arrangements) and to dismiss the body entirely (as though the spiritual is all that matters). Both errors ignore the text's claim: the body is good, sexual difference is real, and vulnerability without shame is the original design.",
        teaches:
          "The body is not incidental to who you are. You are not a soul trapped in a body; you are a body animated by a soul. Sexual ethics must begin with this affirmation: embodied existence is good, and how you steward your body is a spiritual matter.",
      },
      {
        reference: "Song of Solomon 4:1-7; 7:1-9",
        text: "'How beautiful you are, my darling! Oh, how beautiful!' ... 'Your stature is like that of the palm, and your breasts like clusters of fruit. I said, \"I will climb the palm tree; I will take hold of its fruit.\"'",
        context:
          "This is explicit erotic poetry in the canon of Scripture. The lovers describe each other's bodies in extravagant detail. The woman is not passive; she initiates and pursues. The poetry celebrates sensual pleasure as a good within covenanted love. The Song has no children, no instructions, no rules; it is pure celebration of desire.",
        misuse:
          "The church has historically been uncomfortable with this book and has either allegorized it entirely or ignored it. But the plain reading is clear: the Bible includes a full-throated celebration of sexual desire and pleasure within committed love. A church that cannot say this out loud has a smaller theology of sex than Scripture does.",
        teaches:
          "Sexual desire is not sinful; it is created. The Song does not treat desire as dangerous; it treats it as beautiful. But the desire is embedded in a relationship of mutuality and commitment, which is the context that makes vulnerability safe.",
      },
      {
        reference: "1 Corinthians 6:12-20",
        text: "'I have the right to do anything,' you say, but not everything is beneficial. ... Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies.",
        context:
          "Paul addresses a Corinthian church living in a city famous for sexual license. Some Corinthians argued that since the body is temporary, sexual behavior does not matter spiritually ('food for the stomach, the stomach for food'). Paul's response is that the body is not disposable; it is the temple of the Holy Spirit. Sexual union creates a one-flesh bond, which means casual sex is never actually casual.",
        misuse:
          "The 'temple of the Holy Spirit' language has been used to create shame about bodies, enforce purity-culture standards that treat sexual sin as uniquely damaging, and reduce bodily ethics to sexual behavior alone. But Paul's argument is about the dignity of the body, not its shame. You honor a temple; you do not despise it.",
        teaches:
          "Your body is not a throwaway container for your soul. What you do with your body matters because your body is where God dwells. This is an argument for dignity, not for shame. The body that is a temple is treated with reverence, not contempt.",
      },
      {
        reference: "1 Corinthians 7:1-9, 32-35",
        text: "Now for the matters you wrote about: 'It is good for a man not to have sexual relations with a woman.' But since sexual immorality is occurring, each man should have sexual relations with his own wife, and each woman with her own husband. ... I wish that all of you were as I am [unmarried]. But each of you has your own gift from God.",
        context:
          "Paul treats both marriage and singleness as legitimate callings with their own gifts. He is not anti-sex; he is pro-calling. His preference for singleness is practical (he believes the end is near) and vocational (singleness allows undivided attention to the Lord). But he is equally clear that marriage is good, sexual desire is normal, and mutual sexual fulfillment within marriage is expected.",
        misuse:
          "Used either to elevate singleness over marriage (as though celibacy is inherently more spiritual) or to dismiss Paul's commendation of singleness as irrelevant. Both miss the balance: singleness and marriage are both gifts, both callings, both honored.",
        teaches:
          "The Bible does not treat marriage as the default and singleness as the consolation prize. Both are vocations with dignity. A church that treats unmarried adults as incomplete has a smaller vision of human flourishing than Paul does.",
      },
      {
        reference: "The range of interpretive traditions on contested questions",
        text: "[This is not a single passage but an acknowledgment that faithful Christians read the biblical texts on homosexuality, gender identity, and sexual ethics differently.]",
        context:
          "The six or seven passages most commonly cited regarding homosexuality (Genesis 19, Leviticus 18:22, Leviticus 20:13, Romans 1:26-27, 1 Corinthians 6:9-10, 1 Timothy 1:10, and possibly Jude 7) are interpreted differently across traditions. Traditional readings hold that Scripture consistently limits sexual union to male-female marriage. Affirming readings argue that the ancient categories do not map onto modern understandings of sexual orientation, and that the passages address exploitation, idolatry, or excess rather than committed same-sex relationships.",
        misuse:
          "Both sides of this debate can weaponize Scripture: traditional readings can be used to dehumanize LGBTQ+ persons, and affirming readings can be used to dismiss the seriousness of the biblical witness on sexual ethics. Neither approach honors the text or the people the text addresses.",
        teaches:
          "This is a place where honest, faithful, Scripture-honoring Christians disagree. Whatever your conviction, you are obligated to hold it with humility, to treat those who disagree as bearers of God's image, and to refuse to use the Bible as a weapon against the dignity of any human being.",
      },
    ],
    interpretiveRange:
      "This is one of the most contested areas in contemporary Christianity. Traditional and affirming positions both claim biblical fidelity. What distinguishes genuine disagreement from bad faith is whether the person has actually done the work of exegesis or merely proof-texted their prior conviction. What all faithful Christians should agree on: the body is good, sexual ethics matter, purity culture has done real damage, and no one should be treated as less than the image of God regardless of where you land on contested questions.",
    takeaway:
      "The difference between biblical sexuality and purity culture is the difference between honoring the body and fearing it. The Bible says the body is a temple. Purity culture treats it as a threat. If your sexual ethic produces shame rather than dignity, it has departed from the text it claims to follow.",
  },
  {
    title: "Justice",
    slug: "justice",
    icon: "scale",
    oneLiner: "The Bible's relentless demand for the protection of the vulnerable.",
    introduction:
      "Justice in Scripture is not a political category; it is a theological one. The God of the Bible consistently identifies himself with the poor, the widow, the orphan, and the stranger. The prophetic tradition is not an appendix to the Bible; it is its backbone. Any reading of Scripture that does not produce concern for the vulnerable has missed the central theme.",
    passages: [
      {
        reference: "Micah 6:8",
        text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.",
        context:
          "Micah writes to a nation going through the motions of religion while exploiting the poor. The people ask what God wants: more sacrifices? More elaborate worship? Micah's answer is devastating in its simplicity: three things. Justice (mishpat: right ordering of relationships), mercy (chesed: loyal, covenant love), and humble walk with God. This is not a menu; it is a single life.",
        misuse:
          "Often quoted decoratively without noting that Micah is addressing a nation whose worship is elaborate and whose justice is absent. The verse is not an inspirational poster; it is an indictment of religious performance that ignores human suffering.",
        teaches:
          "God is not impressed by worship that coexists with injustice. The three requirements are inseparable: you cannot walk humbly with God while treating people unjustly, and you cannot act justly without mercy. The verse is a diagnostic for the health of your faith.",
      },
      {
        reference: "Amos 5:21-24",
        text: "'I hate, I despise your religious festivals; your assemblies are a stench to me. Even though you bring me burnt offerings and grain offerings, I will not accept them. ... But let justice roll on like a river, righteousness like a never-failing stream!'",
        context:
          "Amos is a shepherd called to prophesy to the wealthy northern kingdom of Israel during a time of economic prosperity and religious activity. The rich are getting richer, the poor are being sold for sandals (Amos 2:6), and the worship services are crowded. God's response through Amos is visceral: 'I hate your worship.' Not because worship is wrong but because worship without justice is offensive to God.",
        misuse:
          "Sometimes used to dismiss corporate worship entirely or to pit 'social justice' against 'spiritual formation.' But Amos does not reject worship; he rejects worship that serves as a cover for exploitation. The answer is not less worship but worship that produces justice.",
        teaches:
          "God is not neutral on injustice. A church that worships beautifully while ignoring the suffering around it is doing something God finds repulsive. Justice is not a supplementary program; it is the evidence that your worship is real.",
      },
      {
        reference: "Isaiah 58:1-12",
        text: "'Is not this the kind of fasting I have chosen: to loose the chains of injustice and untie the cords of the yoke, to set the oppressed free and break every yoke? Is it not to share your food with the hungry and to provide the poor wanderer with shelter?'",
        context:
          "Israel is fasting and wondering why God does not notice. God's answer: your fasting is self-serving while your workers are exploited and your neighbors are hungry. True fasting is not about food; it is about justice. The passage redefines spiritual discipline as inseparable from economic and social action.",
        misuse:
          "Used either to dismiss spiritual disciplines (as though only social action matters) or to add social action as an afterthought to spiritual practice. But Isaiah does not separate them. True fasting is justice. Justice is a form of fasting. They are the same act.",
        teaches:
          "Spiritual discipline that does not produce concern for the vulnerable is self-indulgence wearing religious clothing. The question is not 'Are you fasting?' but 'Is your fasting freeing anyone other than yourself?'",
      },
      {
        reference: "Matthew 25:31-46",
        text: "'For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink, I was a stranger and you invited me in, I needed clothes and you clothed me, I was sick and you looked after me, I was in prison and you came to visit me.' ... 'Whatever you did for one of the least of these brothers and sisters of mine, you did for me.'",
        context:
          "Jesus tells a parable about the final judgment in which the criterion for division between 'sheep' and 'goats' is not doctrinal correctness or worship attendance but care for the hungry, thirsty, naked, sick, stranger, and imprisoned. The surprise is that both groups are shocked: neither knew they were serving or neglecting Jesus himself.",
        misuse:
          "Sometimes spiritualized to avoid the plain meaning: Jesus identifies himself with the materially poor. He does not say 'when you evangelized the hungry.' He says 'when you fed the hungry.' Any interpretation that reduces this to spiritual care alone has avoided the text's most uncomfortable demand.",
        teaches:
          "Jesus identifies himself with the most vulnerable people in any society. How you treat them is how you treat him. This is not a metaphor; it is the judgment criterion. The question at the end is not 'What did you believe?' but 'What did you do for the least of these?'",
      },
      {
        reference: "James 2:14-17",
        text: "What good is it, my brothers and sisters, if someone claims to have faith but has no deeds? Can such faith save them? Suppose a brother or a sister is without clothes and daily food. If one of you says to them, 'Go in peace; keep warm and well fed,' but does nothing about their physical needs, what good is it?",
        context:
          "James writes to a community where wealthy members receive preferential treatment in worship (2:1-4). His argument is not that works save; it is that faith without works is dead, a corpse. The example is specific and physical: if someone is hungry and you give them theology instead of food, your faith is not faith at all.",
        misuse:
          "Sometimes pitted against Paul's theology of grace, as though James and Paul are in contradiction. But James is not arguing that works produce salvation; he is arguing that salvation produces works. Faith that does not result in action is not a weaker form of faith; it is no faith at all.",
        teaches:
          "The test of your faith is not what you say you believe but what you do when someone is hungry in front of you. Orthodoxy that does not produce orthopraxis is dead. James does not soften this. He names it.",
      },
      {
        reference: "Proverbs 14:31; 19:17; 22:22-23; 31:8-9",
        text: "Whoever oppresses the poor shows contempt for their Maker, but whoever is kind to the needy honors God. ... Whoever is kind to the poor lends to the Lord. ... Do not exploit the poor because they are poor and do not crush the needy in court. ... Speak up for those who cannot speak for themselves, for the rights of all who are destitute.",
        context:
          "The Proverbs tradition consistently links treatment of the poor to relationship with God. This is not occasional emphasis; it is structural. The claim is theological: the poor bear God's image, and to oppress them is to insult their Maker. The instruction to 'speak up for those who cannot speak for themselves' (31:8) is one of the clearest advocacy mandates in Scripture.",
        misuse:
          "Sometimes dismissed as Old Testament ethics superseded by New Testament grace. But Jesus, James, and the entire prophetic tradition reinforce these themes. The Bible has no era in which justice for the poor is optional.",
        teaches:
          "Your treatment of vulnerable people is a direct commentary on your relationship with God. You cannot love God and exploit his image-bearers. This is not social policy; it is theology at its most basic.",
      },
    ],
    interpretiveRange:
      "Christians disagree on how biblical justice principles translate into political policy. Some emphasize personal charity and voluntary action. Others argue that systemic injustice requires systemic solutions and that government has a role in protecting the vulnerable (a position supported by the biblical monarchy's prophetic accountability). What is not debatable: the Bible commands concern for the poor, the marginalized, and the oppressed with more consistency and urgency than almost any other theme.",
    takeaway:
      "If your theology does not produce concern for the vulnerable, it is not biblical theology. The Bible does not allow you to love God without loving the people God identifies with: the hungry, the prisoner, the stranger, the widow, the orphan, the poor. These are not additions to the gospel. They are the evidence of it.",
  },
  {
    title: "Doubt",
    slug: "doubt",
    icon: "circle-help",
    oneLiner: "The Bible's permission for honest questions inside the life of faith.",
    introduction:
      "Doubt is not the opposite of faith; it is the growing edge of faith. The Bible is filled with people who questioned God, argued with God, accused God of abandonment, and demanded answers they did not receive. They are not condemned for these questions. They are included in the canon, which means their doubt is considered holy enough to preserve.",
    passages: [
      {
        reference: "Psalm 22:1-2",
        text: "My God, my God, why have you forsaken me? Why are you so far from saving me, so far from my cries of anguish? My God, I cry out by day, but you do not answer, by night, but I find no rest.",
        context:
          "This is the psalm Jesus quotes from the cross (Matthew 27:46). David writes from a place of genuine abandonment: God is not answering, not saving, not present. The psalm does eventually turn toward trust (v. 22-31), but the turn is not quick or easy. The first 21 verses are sustained complaint, accusation, and bewilderment.",
        misuse:
          "Often the hopeful ending is quoted while the 21 verses of anguish are skipped. But the canon preserves the complaint in full. Skipping to the resolution dishonors the process and tells the doubter that their questions are only acceptable if they resolve quickly.",
        teaches:
          "The language of abandonment is not blasphemy; it is prayer. If David prayed this and Jesus quoted it, then the feeling that God is absent is a recognized experience of faith, not its opposite. You can scream at God and still be talking to God.",
      },
      {
        reference: "Habakkuk 1:2-4, 13",
        text: "How long, Lord, must I call for help, but you do not listen? Or cry out to you, 'Violence!' but you do not save? ... Your eyes are too pure to look on evil; you cannot tolerate wrongdoing. Why then do you tolerate the treacherous? Why are you silent while the wicked swallow up those more righteous than themselves?",
        context:
          "Habakkuk is a prophet who lodges a formal complaint against God. He does not doubt God's existence; he doubts God's justice. His argument is logical: if you are good and powerful, why do you allow this? God's response (using Babylon as an instrument of judgment) does not satisfy Habakkuk, and he says so. The book ends not with answers but with trust that persists without answers (3:17-19).",
        misuse:
          "Rarely referenced because it is uncomfortable. Habakkuk questions God's governance of the world and is not rebuked for it. Using other passages to silence people who have Habakkuk's questions dishonors a canonical prophet.",
        teaches:
          "Questioning God's justice is a prophetic act, not a faithless one. Habakkuk does not stop believing; he stops pretending that belief requires the absence of hard questions. His final declaration ('yet I will rejoice in the Lord') is the most honest form of faith: trust that persists when understanding fails.",
      },
      {
        reference: "John 20:24-29",
        text: "Thomas said to them, 'Unless I see the nail marks in his hands and put my finger where the nails were, and put my hand into his side, I will not believe.' ... Then [Jesus] said to Thomas, 'Put your finger here; see my hands. Reach out your hand and put it into my side. Stop doubting and believe.'",
        context:
          "Thomas is absent when Jesus first appears to the disciples. He demands physical evidence, which is often treated as a failure. But Jesus does not condemn Thomas; he shows up and provides exactly what Thomas asked for. The 'blessed are those who have not seen and yet believe' (v. 29) is not a rebuke of Thomas but a word for future believers. Thomas's doubt resulted in one of the strongest confessions in the New Testament: 'My Lord and my God!' (v. 28).",
        misuse:
          "'Doubting Thomas' has become a pejorative term for people who question. But Jesus met Thomas on Thomas's terms. He did not demand blind faith; he offered evidence. Thomas's doubt did not disqualify him; it deepened his confession.",
        teaches:
          "Jesus does not reject the doubter; he meets them. If Thomas needed to see and touch before he could believe, and Jesus accommodated that need, then the demand for evidence is not a disqualification from faith. It may be the path into it.",
      },
      {
        reference: "Job 3; 7:17-21; 10:1-3",
        text: "'May the day of my birth perish, and the night that said, \"A boy is conceived!\"' ... 'What is mankind that you make so much of them, that you give them so much attention? ... If I have sinned, what have I done to you, you who see everything we do? Why have you made me your target?'",
        context:
          "Job's complaint is sustained across dozens of chapters. He curses the day of his birth. He accuses God of treating him as a target. He demands a hearing in court. His friends tell him to stop. God does not. When God finally speaks (chapters 38-41), he does not rebuke Job for questioning; he rebukes the friends for their bad theology (42:7).",
        misuse:
          "Job's friends are often treated as wise counselors who got a little overzealous. But God explicitly condemns their theology: 'You have not spoken the truth about me, as my servant Job has' (42:7). The honest doubter spoke more truly about God than the confident theologians.",
        teaches:
          "Honest complaint, even accusation, directed at God is more truthful than pious explanations that protect God from difficult questions. Job's doubt was not a failure of faith; it was the most honest form of faith available in the ash heap.",
      },
      {
        reference: "Ecclesiastes 1:2-3; 8:14-17",
        text: "'Meaningless! Meaningless!' says the Teacher. 'Utterly meaningless! Everything is meaningless.' What do people gain from all their labors? ... There is something else meaningless that occurs on earth: the righteous who get what the wicked deserve, and the wicked who get what the righteous deserve.",
        context:
          "Ecclesiastes is canonical skepticism. The Teacher looks at life 'under the sun' and finds it absurd: the righteous suffer, the wicked prosper, death erases all distinctions. This book is in the Bible. Its doubts are not footnoted with corrections. Its presence in the canon means the tradition considered honest reckoning with life's absurdity to be a form of worship.",
        misuse:
          "Either dismissed as irrelevant pessimism or cherry-picked for its positive moments ('there is a time for everything'). But the book's power is in its willingness to say what many people feel and few will say in church: sometimes life does not make sense, and pretending otherwise is its own form of dishonesty.",
        teaches:
          "The Bible includes a book that says 'everything is meaningless' because the community of faith decided that honest doubt belongs in the worship book. If Ecclesiastes is canonical, then your deepest questions about meaning are not a departure from faith. They are part of it.",
      },
      {
        reference: "Psalm 13:1-2; Psalm 44:23-24; Psalm 74:1",
        text: "How long, Lord? Will you forget me forever? How long will you hide your face from me? ... Awake, Lord! Why do you sleep? Rouse yourself! Do not reject us forever. Why do you hide your face and forget our misery and oppression? ... Why have you rejected us forever, O God? Why does your anger smolder against the sheep of your pasture?",
        context:
          "The psalms of complaint (sometimes called lament psalms) make up roughly a third of the Psalter. They are not aberrations; they are the dominant form. Israel worshipped with these prayers, which means communal faith included communal doubt. The questions are direct, urgent, and sometimes accusatory: 'Why do you sleep?' 'Why have you rejected us?'",
        misuse:
          "Most churches skip the complaint psalms in worship, creating the impression that faith should be consistently upbeat. But the canonical worship book of Israel was dominated by lament. A church that only sings praise has a smaller worship repertoire than the Bible provides.",
        teaches:
          "Doubt expressed to God is a form of prayer, and prayer that includes complaint is the most common form of prayer in the Bible. If you have ever wondered where to take your questions, the answer is: to God directly, loudly, and without editing.",
      },
    ],
    interpretiveRange:
      "Christians disagree on whether doubt is a sin, a stage, or a permanent feature of healthy faith. Some traditions treat certainty as the goal and doubt as a failure. Others treat doubt as the engine of theological growth. The mystical tradition (the 'dark night of the soul') treats the absence of God's felt presence as a form of deepening. What the biblical witness makes clear: doubt expressed to God is never condemned, and the people who voice it most boldly (Job, Habakkuk, the psalmists) are never rebuked for the act of questioning.",
    takeaway:
      "If your faith cannot survive your honest questions, it was not faith; it was performance. The Bible gives you full permission to bring every question, complaint, accusation, and bewilderment to God. He is not threatened by your doubt. He is big enough to hold it.",
  },
  {
    title: "Leadership",
    slug: "leadership",
    icon: "shepherd",
    oneLiner: "The Bible's vision of authority as servanthood, not power.",
    introduction:
      "Every model of leadership the Bible endorses inverts the world's definition. The king is a servant. The shepherd lays down his life. The greatest is the least. Scripture's deepest suspicion is reserved for leaders who use their position to serve themselves, and its harshest judgments fall on shepherds who feed themselves instead of the flock.",
    passages: [
      {
        reference: "Ezekiel 34:1-10",
        text: "'Woe to you shepherds of Israel who only take care of yourselves! Should not shepherds take care of the flock? You eat the curds, clothe yourselves with the wool and slaughter the choice animals, but you do not take care of the flock. You have not strengthened the weak or healed the sick or bound up the injured.'",
        context:
          "Ezekiel prophesies against Israel's leaders (kings, priests, and prophets) who have exploited the people. The shepherd metaphor was universally understood in the ancient Near East: kings were shepherds of their people. God's indictment is specific: neglect of the weak, sick, injured, strayed, and lost. The consequence is that God himself will become the shepherd (v. 11-16), which is the background for Jesus' claim to be the Good Shepherd.",
        misuse:
          "Rarely applied to contemporary church leaders with the same force with which Ezekiel applied it. Leaders who build personal platforms, demand luxury, and neglect pastoral care are doing exactly what Ezekiel condemns. The passage is not historical curiosity; it is a standing indictment.",
        teaches:
          "Leadership in God's economy is measured by what happens to the weakest member under your care. If the sick are not healed, the injured are not bound up, and the lost are not sought, the leader has failed regardless of the organization's size or budget.",
      },
      {
        reference: "Mark 10:42-45",
        text: "'You know that those who are regarded as rulers of the Gentiles lord it over them, and their high officials exercise authority over them. Not so with you. Instead, whoever wants to become great among you must be your servant, and whoever wants to be first must be slave of all. For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.'",
        context:
          "James and John have just asked for positions of power in Jesus' kingdom. Jesus does not rebuke their ambition but redirects it. The contrast is between Gentile rulers who 'lord it over' others and kingdom leaders who serve. The word 'servant' (diakonos) is the root of 'deacon,' and 'slave' (doulos) is the lowest status in Roman society. Jesus applies both terms to himself.",
        misuse:
          "Lip service to 'servant leadership' has become a way to retain power while sounding humble. If your version of servant leadership involves subordinates serving you while you talk about serving them, you have inverted the passage.",
        teaches:
          "The kingdom definition of greatness is servanthood, and the model is Jesus, who died. This is not a leadership technique; it is a total redefinition of what authority means. The leader with the most power should be the one with the most calluses on their knees.",
      },
      {
        reference: "1 Timothy 3:1-7",
        text: "Here is a trustworthy saying: Whoever aspires to be an overseer desires a noble task. Now the overseer is to be above reproach, faithful to his wife, temperate, self-controlled, respectable, hospitable, able to teach, not given to drunkenness, not violent but gentle, not quarrelsome, not a lover of money.",
        context:
          "Paul provides qualifications for church leaders (overseers/elders). The list is almost entirely about character, not skill. There is only one competency listed (able to teach); everything else is a character trait. The emphasis on 'not a lover of money,' 'not violent,' 'not quarrelsome' suggests these were actual problems in the early church, not theoretical concerns.",
        misuse:
          "Applied selectively: churches screen for doctrinal precision and theological education but often ignore character traits like gentleness, self-control, and freedom from the love of money. Paul's list has been reduced to a doctrinal checklist when it is actually a character profile.",
        teaches:
          "The primary qualification for leadership is not competence but character. A brilliant teacher who is quarrelsome, greedy, or violent does not qualify. Paul builds the leadership profile on who you are, not what you can do.",
      },
      {
        reference: "Nehemiah 1:1-4; 2:1-5, 17-18; 4:14-23",
        text: "'When I heard these things, I sat down and wept. For some days I mourned and fasted and prayed.' ... 'Come, let us rebuild the wall of Jerusalem.' ... 'Those who carried materials did their work with one hand and held a weapon in the other.'",
        context:
          "Nehemiah is a cupbearer to a foreign king who hears that Jerusalem's walls are in ruins. His response is not a strategic plan; it is weeping and prayer. The actual rebuilding requires political courage (asking the king for permission), practical organization (assigning sections of wall), and personal risk (arming the workers against enemies). Nehemiah leads from grief to action to sustained effort under threat.",
        misuse:
          "Often used as a model for 'visionary leadership' in corporate church culture, which misses that Nehemiah's vision was not his own ambition; it was a response to a community's devastation. He did not build something new for his own legacy; he rebuilt what had been destroyed for a people who had lost everything.",
        teaches:
          "Biblical leadership begins with grief, not vision. Nehemiah saw a need, wept, prayed, and then acted. The sequence matters: leaders who skip from vision to action without passing through compassion will build empires, not communities.",
      },
      {
        reference: "Exodus 3:10-4:17",
        text: "'So now, go. I am sending you to Pharaoh to bring my people the Israelites out of Egypt.' But Moses said to God, 'Who am I that I should go to Pharaoh?' ... 'Pardon your servant, Lord. I have never been eloquent. ... Please send someone else.'",
        context:
          "Moses resists God's call five separate times. He questions his identity ('Who am I?'), God's identity ('Who are you?'), the people's response, his own ability, and finally just asks God to send someone else. God gets angry (4:14) but does not withdraw the call. The most important leader in Israelite history did not want the job.",
        misuse:
          "Moses' reluctance is sometimes romanticized as humility. But it is also stubbornness and fear. God does not celebrate reluctance; he accommodates it (by providing Aaron) while insisting on the call. Reluctance is not a virtue in itself; what matters is whether you go when the conversation is over.",
        teaches:
          "God's call does not require your confidence. Moses' qualifications were not his eloquence or his self-assurance; they were God's presence ('I will be with you'). Leaders who wait until they feel ready will never start. The call is not about your competence; it is about God's commission.",
      },
    ],
    interpretiveRange:
      "Christians disagree on leadership structures (elder-led, congregation-led, bishop-led), on who qualifies for leadership (the complementarian-egalitarian debate on gender), and on the relationship between spiritual authority and organizational authority. What is not disputed: biblical leadership is defined by service rather than status, character rather than charisma, and sacrifice rather than self-promotion.",
    takeaway:
      "If your leadership makes your life easier and the lives of those under you harder, you have it backwards. The biblical leader is the one who absorbs the cost so others do not have to. That is what the cross looks like in organizational form.",
  },
  {
    title: "Rest & Sabbath",
    slug: "rest-sabbath",
    icon: "moon",
    oneLiner: "The radical biblical claim that stopping is an act of faith.",
    introduction:
      "Sabbath is not a productivity hack. It is a declaration that the world does not depend on your effort. God rested on the seventh day not because he was tired but because the work was done. In a culture that derives identity from output, sabbath is an act of resistance: it declares that you are not your productivity.",
    passages: [
      {
        reference: "Genesis 2:2-3",
        text: "By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work. Then God blessed the seventh day and made it holy, because on it he rested from all the work of creating that he had done.",
        context:
          "God rests. The Almighty, who does not grow weary (Isaiah 40:28), stops. This is not about fatigue; it is about completion and delight. The seventh day is blessed and made holy, which means it has a different quality than the other six. Rest is embedded in the architecture of creation before the fall, before the law, before Israel exists.",
        misuse:
          "Dismissed as a quaint creation story detail with no practical relevance. But the creation narrative establishes rest as a fundamental pattern of reality, not an optional add-on for the religious. If God's rhythm includes rest, the human rhythm that omits it is not more productive; it is disordered.",
        teaches:
          "Rest is not earned; it is built into the structure of creation. You do not rest because you have finished everything; you rest because rest is part of what 'finished' means. A life without rest is not a life of greater faithfulness; it is a life of functional atheism, as though everything depends on you.",
      },
      {
        reference: "Exodus 20:8-11",
        text: "Remember the Sabbath day by keeping it holy. Six days you shall labor and do all your work, but the seventh day is a sabbath to the Lord your God. On it you shall not do any work, neither you, nor your son or daughter, nor your male or female servant, nor your animals, nor any foreigner residing in your towns.",
        context:
          "The Sabbath command is the longest of the Ten Commandments, which suggests its importance. It is also the most socially radical: servants, foreigners, and animals all rest. In a world where slaves had no rights and economic production never stopped, the Sabbath was a weekly economic disruption that declared every person's dignity. It is not a personal spiritual practice; it is a communal justice practice.",
        misuse:
          "Reduced to either legalistic rule-keeping (no activity whatsoever) or entirely dismissed as a Jewish ceremonial law irrelevant to Christians. But the principle predates the law (Genesis 2) and is rooted in creation, not ceremony. The Sabbath's social dimension (servants and foreigners rest too) is typically ignored entirely.",
        teaches:
          "Sabbath is a justice issue, not just a spiritual discipline. The command protects the vulnerable from exploitation by mandating that everyone rests, including those who have no power to demand rest for themselves. If your rest depends on others working, you have not kept the Sabbath.",
      },
      {
        reference: "Mark 2:27-28",
        text: "'The Sabbath was made for man, not man for the Sabbath. So the Son of Man is Lord even of the Sabbath.'",
        context:
          "Jesus speaks in response to Pharisees who criticize his disciples for picking grain on the Sabbath. His argument is that the Sabbath is a gift, not a burden. It was created for human flourishing, not as a test of religious compliance. Jesus does not abolish the Sabbath; he restores it to its original purpose.",
        misuse:
          "Used to justify ignoring Sabbath entirely: 'Jesus freed us from the Sabbath.' But Jesus says the Sabbath was made for you, which is a statement about its ongoing gift, not its obsolescence. He corrects legalism without canceling the principle.",
        teaches:
          "Sabbath is a gift you are invited to receive, not a rule you are commanded to endure. It exists for your good: your body, your relationships, your soul. Rejecting it is not freedom; it is refusing a gift your Creator designed for your flourishing.",
      },
      {
        reference: "Hebrews 4:1-11",
        text: "Therefore, since the promise of entering his rest still stands, let us be careful that none of you be found to have fallen short of it. ... There remains, then, a Sabbath-rest for the people of God; for anyone who enters God's rest also rests from their works, just as God did from his.",
        context:
          "The author of Hebrews connects Sabbath rest to salvation rest. The argument is multi-layered: Israel failed to enter the promised land because of unbelief (a failure to rest in God's promise), and a deeper rest remains for God's people. This rest is both present (ceasing from self-effort in salvation) and future (the eternal rest that Sabbath points toward).",
        misuse:
          "Spiritualized to the point of irrelevance: 'We rest in Christ, so we do not need a physical day of rest.' But the author says the Sabbath-rest 'remains' for the people of God, using the present tense. The spiritual reality does not cancel the physical practice; it deepens it.",
        teaches:
          "Sabbath rest is a rehearsal of the gospel: you stop working because the decisive work has already been done. Just as salvation is not earned by effort, Sabbath declares that your value is not produced by your output. Resting is an act of faith that says 'God has this handled.'",
      },
      {
        reference: "Psalm 46:10",
        text: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
        context:
          "As noted earlier, 'be still' (raphah) means 'let go, cease striving, release your grip.' This is not a meditation instruction; it is a military command. In the context of the psalm, nations are raging and kingdoms are falling. God's command to stop is not a suggestion for personal peace but a declaration that he is in control of history.",
        misuse:
          "Turned into a quiet-time platitude about sitting still and feeling calm. But the psalm's context is chaos, not calm. 'Be still' is what you say to someone who is fighting frantically: stop. Let go. I am God, and this is not your fight to win.",
        teaches:
          "Rest is not passivity; it is trust. Sabbath is not laziness; it is the declaration that God is God and you are not. The hardest rest is the rest you take when everything in you says you should be working. That is precisely the rest that matters most.",
      },
      {
        reference: "Mark 1:35; Luke 5:16",
        text: "Very early in the morning, while it was still dark, Jesus got up, left the house and went off to a solitary place, where he prayed. ... But Jesus often withdrew to lonely places and prayed.",
        context:
          "Jesus regularly withdraws from ministry to pray. This happens after healings, before major decisions, and during periods of intense demand. The Son of God, who has infinite power, chooses to stop, leave, and be alone. If Jesus needed to withdraw from the crowds, you are not exempt from the same need.",
        misuse:
          "Occasionally cited to justify isolation or avoidance of responsibility. But Jesus withdraws to pray, not to escape. He returns to the work. The pattern is engagement-withdrawal-return, not engagement-withdrawal-resignation.",
        teaches:
          "If Jesus prioritized solitude and prayer over the urgent demands of ministry, then your busyness is not a sign of faithfulness. It may be a sign that you have substituted activity for the presence that sustains it. The most productive person in history regularly stopped producing.",
      },
    ],
    interpretiveRange:
      "Christians disagree on whether the Sabbath command is binding on Christians (and if so, whether it must be Saturday or can be Sunday), whether Sabbath is primarily about a day or a rhythm, and how strictly to observe it. Some traditions practice strict Sabbath observance (no work, no commerce). Others see the principle as fulfilled in Christ and practiced freely. What is not disputed: the pattern of rest is creational, Jesus practiced it, and the modern refusal to stop is spiritually dangerous.",
    takeaway:
      "You are not indispensable. The world continued while you slept last night, and it will continue when you stop. Sabbath is the weekly reminder that the universe is not your responsibility. If you cannot stop, your identity is built on your output, and that is a theological problem, not a scheduling problem.",
  },
  {
    title: "The Tongue",
    slug: "the-tongue",
    icon: "message-circle",
    oneLiner: "The Bible's disproportionate attention to the power of speech.",
    introduction:
      "Scripture gives more attention to the power of speech than to almost any other human behavior. James calls the tongue a fire that sets the course of life ablaze. Proverbs returns to the subject dozens of times. Jesus says you will give account for every careless word. The Bible treats speech as a matter of life and death because it understands what modern people forget: words create worlds.",
    passages: [
      {
        reference: "James 3:1-12",
        text: "The tongue also is a fire, a world of evil among the parts of the body. It corrupts the whole body, sets the whole course of one's life on fire, and is itself set on fire by hell. ... With the tongue we praise our Lord and Father, and with it we curse human beings, who have been made in God's likeness. Out of the same mouth come praise and cursing. My brothers and sisters, this should not be.",
        context:
          "James uses three images in rapid succession: a bit in a horse's mouth, a rudder on a ship, and a spark in a forest. Each illustrates the same principle: something small controls something large. The tongue is disproportionately powerful relative to its size. James does not say the tongue can be tamed; he says no human being can tame it (v. 8). This is not pessimism; it is realism that points toward the need for divine transformation.",
        misuse:
          "Sometimes used to silence people who are speaking difficult truths, as though all strong speech is sinful. But James is not against direct speech; he is against speech that destroys while claiming to be righteous. The prophets were blunt. Jesus was blunt. James himself is blunt. The issue is not directness; it is destructiveness.",
        teaches:
          "Your words are more powerful than you believe. They set trajectories, destroy reputations, create atmospheres, and reveal hearts. James does not say 'be careful with your words.' He says the tongue is untamable, which means managing speech is not a skill to master but a dependence on God to maintain.",
      },
      {
        reference: "Proverbs 12:18; 15:1, 4; 16:24; 18:21; 25:11",
        text: "The words of the reckless pierce like swords, but the tongue of the wise brings healing. ... A gentle answer turns away wrath. ... The soothing tongue is a tree of life, but a perverse tongue crushes the spirit. ... Gracious words are a honeycomb, sweet to the soul and healing to the bones. ... The tongue has the power of life and death. ... Like apples of gold in settings of silver is a ruling rightly given.",
        context:
          "Proverbs returns to the subject of speech more than any other topic. The variety of images (swords, trees, honeycomb, gold, fire) reveals how seriously the wisdom tradition takes language. These are not abstract observations; they are practical instructions for a community where words were contracts, reputations were currency, and a careless sentence could destroy a family.",
        misuse:
          "Sometimes reduced to 'be nice,' which flattens the wisdom. Proverbs does not command niceness; it commands wisdom in speech. Sometimes wise speech is confrontational (Proverbs 27:5-6, 'Better is open rebuke than hidden love'). The issue is not tone but truth and timing.",
        teaches:
          "Your words carry the power of life and death. This is not metaphorical in its effect, even if it is metaphorical in form. Words heal or wound, build or demolish, give life or take it. The person who says 'it was just words' has not understood what words are.",
      },
      {
        reference: "Ephesians 4:29",
        text: "Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up according to their needs, that it may benefit those who listen.",
        context:
          "Paul provides a practical test for speech: is it building the other person up according to their needs? The emphasis on 'their needs' is significant. The question is not whether the speech makes you feel righteous but whether it serves the person hearing it. This reorients speech from self-expression to other-service.",
        misuse:
          "Applied as a ban on all negative or critical speech, which would eliminate most of the prophetic tradition. But 'building up' (oikodome) can include correction, rebuke, and hard truth. The criterion is not whether the words feel good to the hearer but whether they serve the hearer's genuine need.",
        teaches:
          "Before you speak, ask: will this build the person who hears it? Not 'will this feel good' but 'will this serve their actual need?' Sometimes the most constructive word is a correction. Sometimes it is silence. The test is the effect on the listener, not the intention of the speaker.",
      },
      {
        reference: "Matthew 12:33-37",
        text: "Make a tree good and its fruit will be good, or make a tree bad and its fruit will be bad, for a tree is recognized by its fruit. ... For the mouth speaks what the heart is full of. ... But I tell you that everyone will have to give account on the day of judgment for every empty word they have spoken.",
        context:
          "Jesus connects speech to the heart: your words are not random; they reveal what is inside you. The tree metaphor makes the point that speech reform without heart transformation is impossible. 'Empty words' (argon) means idle, careless, unproductive words, the things you say when you are not trying to be careful. Those reveal the heart more accurately than your prepared statements.",
        misuse:
          "The 'account for every word' language has been used to create terror about speech, as though God is a recording device tracking violations. But Jesus' point is diagnostic, not punitive: your careless words reveal your heart condition. The judgment is not about a word count but about what your speech patterns reveal about your inner life.",
        teaches:
          "Your unguarded words are the truest picture of who you are. The thing you say when you are tired, angry, or not performing is more revealing than your Sunday morning vocabulary. Speech reform begins with heart transformation, and your words will show you where the transformation has not yet reached.",
      },
      {
        reference: "Psalm 141:3",
        text: "Set a guard over my mouth, Lord; keep watch over the door of my lips.",
        context:
          "David prays for help with his speech, recognizing that self-discipline alone is insufficient. The prayer treats speech control as something that requires divine assistance, which echoes James's claim that no human can tame the tongue. The image of a guard at a door implies that not every thought deserves to exit the mouth.",
        misuse:
          "Occasionally used to promote silence as the highest virtue, as though the goal is to speak as little as possible. But the psalm asks for a guard, not a wall. A guard evaluates what passes; it does not block everything. The prayer is for discernment in speech, not the elimination of it.",
        teaches:
          "You need help with your words. This is not a weakness to be ashamed of; it is a reality to be prayed about. If you have never asked God to guard your mouth, you are attempting something James says is impossible for humans alone.",
      },
    ],
    interpretiveRange:
      "Christians disagree on the boundaries of appropriate speech: how direct correction should be, whether 'speaking the truth in love' (Ephesians 4:15) permits or limits confrontational language, and how to balance the prophetic tradition (which is often harsh) with the instruction to be 'gentle and respectful' (1 Peter 3:15). What is universally affirmed: words matter immensely, careless speech is destructive, and the tongue reveals the condition of the heart.",
    takeaway:
      "The next time you are tempted to say something, ask yourself: Am I building or burning? The Bible does not tell you to be silent. It tells you that your words have power you probably underestimate, and that power will either give life or take it. There is no neutral speech.",
  },
];

/* ─────────────────────────────────────────── icon component ── */

function TopicIcon({ icon, size = 32 }: { icon: string; size?: number }) {
  const s: React.CSSProperties = {
    width: size,
    height: size,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size * 0.55,
    lineHeight: 1,
  };
  const map: Record<string, string> = {
    coins: "\u{1FA99}",
    flame: "\u{1F525}",
    rings: "\u{1F48D}",
    "heart-pulse": "\u{1FA76}",
    "hand-heart": "\u{1FAF6}",
    hammer: "\u{1F528}",
    candle: "\u{1F56F}️",
    "flame-kindling": "\u{1F4A2}",
    baby: "\u{1F476}",
    heart: "❤️",
    scale: "⚖️",
    "circle-help": "❓",
    shepherd: "\u{1F9D1}‍\u{1F33E}",
    moon: "\u{1F319}",
    "message-circle": "\u{1F4AC}",
  };
  return <span style={s}>{map[icon] || "\u{1F4D6}"}</span>;
}

/* ──────────────────────────────────────── passage accordion ── */

function PassageCard({ passage }: { passage: Passage }) {
  const [open, setOpen] = useState(false);
  const panelId = `passage-panel-${passage.reference.replace(/\W+/g, "-")}`;

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "2px",
        borderLeft: "4px solid var(--mustard)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        style={{
          width: "100%",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(17px, 2.5vw, 20px)",
            fontWeight: 500,
            color: "var(--ink)",
            lineHeight: 1.3,
          }}
        >
          {passage.reference}
        </span>
        {open ? (
          <ChevronUp size={18} style={{ color: "var(--ink-muted)", flexShrink: 0 }} />
        ) : (
          <ChevronDown size={18} style={{ color: "var(--ink-muted)", flexShrink: 0 }} />
        )}
      </button>

      {open && (
        <div id={panelId} style={{ padding: "0 24px 24px" }}>
          {/* Scripture text */}
          <div
            style={{
              padding: "16px 20px",
              background: "var(--bone)",
              borderRadius: "2px",
              marginBottom: "20px",
              borderLeft: "3px solid var(--mustard-deep)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--serif)",
                fontSize: "16px",
                lineHeight: 1.8,
                color: "var(--ink)",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              {passage.text}
            </p>
          </div>

          {/* Context */}
          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <BookOpen size={14} style={{ color: "var(--mustard-text)" }} />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mustard-text)",
                  fontFamily: "var(--sans)",
                }}
              >
                What the original audience heard
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              {passage.context}
            </p>
          </div>

          {/* Common misuse */}
          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <AlertTriangle size={14} style={{ color: "var(--alert)" }} />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--alert)",
                  fontFamily: "var(--sans)",
                }}
              >
                How this gets misused
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              {passage.misuse}
            </p>
          </div>

          {/* What it teaches */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <Lightbulb size={14} style={{ color: "var(--ok)" }} />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ok)",
                  fontFamily: "var(--sans)",
                }}
              >
                What it actually teaches
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              {passage.teaches}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────── main component ── */

export default function BibleReference() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const topic = activeTopic ? TOPICS.find((t) => t.slug === activeTopic) : null;

  return (
    <Layout>
      <SEOMeta
        title="What the Bible Actually Says About… -- Topical Scripture Reference"
        description="A comprehensive topical reference covering 15 life topics with full biblical data, interpretive range, and practical application. Not proof-texts. Context, common misuses, and what the passages actually teach."
        keywords="what the Bible says about money, Bible and suffering, Bible marriage, Bible anxiety, Bible forgiveness, topical Bible study, Scripture in context"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "What the Bible Actually Says About…",
          description:
            "A comprehensive topical reference covering 15 life topics with full biblical data, interpretive range, and practical application.",
          url: "https://www.livewellbyjamesbell.co/tools/bible-says",
          applicationCategory: "ReligiousApp",
          offers: { "@type": "Offer", price: "0" },
        }}
      />

      {/* ── Hero ── */}
      <section
        style={{
          background: "var(--charcoal)",
          color: "#F5F0E6",
          padding: "80px 32px 60px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mustard)",
              fontFamily: "var(--sans)",
              marginBottom: "16px",
            }}
          >
            FREE REFERENCE TOOL
          </div>
          <h1
            style={{
              fontSize: "clamp(30px, 5vw, 52px)",
              fontWeight: 400,
              fontFamily: "var(--display)",
              lineHeight: 1.12,
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}
          >
            What the Bible{" "}
            <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>Actually</em>{" "}
            Says About…
          </h1>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              opacity: 0.85,
              fontFamily: "var(--sans)",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Not proof-texts. Not devotional platitudes. The full biblical data on
            15 life topics, with context, common misuses, interpretive range, and
            what the passages actually teach.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section
        style={{
          padding: "48px 24px 80px",
          background: "var(--bone)",
          minHeight: "60vh",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          {/* ── Topic Grid ── */}
          {!topic && (
            <>
              <h2
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "clamp(22px, 3vw, 28px)",
                  fontWeight: 400,
                  color: "var(--ink)",
                  textAlign: "center",
                  marginBottom: "32px",
                }}
              >
                Choose a topic
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "16px",
                }}
              >
                {TOPICS.map((t) => (
                  <button
                    key={t.slug}
                    onClick={() => setActiveTopic(t.slug)}
                    style={{
                      padding: "24px",
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "box-shadow var(--dur) var(--ease), border-color var(--dur) var(--ease)",
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "var(--shadow-card)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "var(--mustard)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "var(--border)";
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "2px",
                        background: "var(--bone)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <TopicIcon icon={t.icon} size={28} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--display)",
                          fontSize: "19px",
                          fontWeight: 500,
                          color: "var(--ink)",
                          marginBottom: "6px",
                          lineHeight: 1.2,
                        }}
                      >
                        {t.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--sans)",
                          fontSize: "14px",
                          lineHeight: 1.5,
                          color: "var(--ink-muted)",
                          margin: 0,
                        }}
                      >
                        {t.oneLiner}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── Topic Detail ── */}
          {topic && (
            <div>
              {/* Back button */}
              <button
                onClick={() => setActiveTopic(null)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--sans)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--ink-muted)",
                  marginBottom: "32px",
                  padding: 0,
                }}
              >
                <ArrowLeft size={16} />
                All topics
              </button>

              {/* Topic header */}
              <div style={{ marginBottom: "40px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "2px",
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TopicIcon icon={topic.icon} size={32} />
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--display)",
                      fontSize: "clamp(28px, 4vw, 40px)",
                      fontWeight: 400,
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                    }}
                  >
                    {topic.title}
                  </h2>
                </div>
                <p
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "17px",
                    lineHeight: 1.7,
                    color: "var(--ink)",
                    maxWidth: "var(--w-prose)",
                  }}
                >
                  {topic.introduction}
                </p>
              </div>

              {/* Key passages */}
              <div style={{ marginBottom: "48px" }}>
                <h3
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: "24px",
                    fontWeight: 400,
                    color: "var(--ink)",
                    marginBottom: "20px",
                  }}
                >
                  Key Passages
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {topic.passages.map((p, i) => (
                    <PassageCard key={i} passage={p} />
                  ))}
                </div>
              </div>

              {/* Interpretive range */}
              <div
                style={{
                  padding: "28px 28px",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "14px",
                  }}
                >
                  <Scale size={18} style={{ color: "var(--mustard-text)" }} />
                  <h3
                    style={{
                      fontFamily: "var(--display)",
                      fontSize: "22px",
                      fontWeight: 400,
                      color: "var(--ink)",
                      margin: 0,
                    }}
                  >
                    The Interpretive Range
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "var(--ink)",
                    margin: 0,
                  }}
                >
                  {topic.interpretiveRange}
                </p>
              </div>

              {/* Practical takeaway */}
              <div
                style={{
                  padding: "28px 28px",
                  background: "var(--charcoal)",
                  borderRadius: "2px",
                  borderLeft: "4px solid var(--mustard)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "14px",
                  }}
                >
                  <Lightbulb size={18} style={{ color: "var(--mustard)" }} />
                  <h3
                    style={{
                      fontFamily: "var(--display)",
                      fontSize: "22px",
                      fontWeight: 400,
                      color: "#F5F0E6",
                      margin: 0,
                    }}
                  >
                    Practical Takeaway
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "rgba(245, 240, 230, 0.9)",
                    margin: 0,
                  }}
                >
                  {topic.takeaway}
                </p>
              </div>

              {/* Back to topics link at bottom */}
              <div style={{ textAlign: "center", marginTop: "48px" }}>
                <button
                  onClick={() => {
                    setActiveTopic(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    padding: "12px 28px",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    fontFamily: "var(--sans)",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "var(--ink-muted)",
                    cursor: "pointer",
                    transition: "border-color var(--dur) var(--ease)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "var(--mustard)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "var(--border)";
                  }}
                >
                  Back to all topics
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
