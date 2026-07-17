/**
 * Theological Vocabulary Glossary (/tools/glossary)
 *
 * 100 essential theological terms explained at three levels of depth:
 * one-liner, paragraph, and significance. Organized into five categories
 * with search, category filtering, and alphabetical navigation.
 */
import { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "wouter";
import { Search, ChevronDown, ChevronUp, BookOpen, X } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category =
  | "Doctrine"
  | "Biblical Studies"
  | "Church History"
  | "Worship & Practice"
  | "Philosophy & Ethics";

interface GlossaryTerm {
  term: string;
  category: Category;
  oneLiner: string;
  paragraph: string;
  significance: string;
  relatedTerms: string[];
  originalLanguage: string;
}

/* ------------------------------------------------------------------ */
/*  Data — 100 terms                                                   */
/* ------------------------------------------------------------------ */

const TERMS: GlossaryTerm[] = [
  // ===================== DOCTRINE (25) =====================
  {
    term: "Trinity",
    category: "Doctrine",
    oneLiner: "The Christian conviction that one God exists eternally as three distinct persons: Father, Son, and Holy Spirit.",
    paragraph: "The doctrine of the Trinity does not mean three gods or three modes of one God, but one divine being who has always existed in a communion of three co-equal, co-eternal persons. The Father is not the Son; the Son is not the Spirit; the Spirit is not the Father — yet each is fully God. The church arrived at this formulation not by speculating but by reading Scripture carefully: the Father sends, the Son is sent and dies, the Spirit empowers — and each is called God. The Nicene Creed (325/381) crystallized this reading against Arianism. It remains the foundational grammar of Christian theology, shaping prayer, worship, and every other doctrine downstream.",
    significance: "Without the Trinity, the cross becomes a transaction between strangers rather than a costly act within the life of God. The doctrine grounds both the intimacy of prayer and the shape of Christian community — persons in relation, not isolated individuals.",
    relatedTerms: ["Incarnation", "Filioque", "Arianism"],
    originalLanguage: "Latin: trinitas (threefold), coined by Tertullian (c. 200 AD)",
  },
  {
    term: "Incarnation",
    category: "Doctrine",
    oneLiner: "The belief that the eternal Son of God took on human flesh in the person of Jesus of Nazareth.",
    paragraph: "Incarnation is the claim that God did not merely speak to humanity from a distance but entered the human condition from inside. The Son — the second person of the Trinity — assumed a full human nature without ceasing to be divine. This was defined at the Council of Chalcedon (451) as two natures in one person, without confusion, change, division, or separation. The Incarnation means God knows hunger, grief, temptation, and death — not by report but by experience. It is the pivot on which salvation turns: what God has not assumed, God has not healed.",
    significance: "The Incarnation insists that matter, bodies, and ordinary life are not obstacles to God but the medium God chose. It makes every doctrine of salvation concrete — God does not rescue from a distance.",
    relatedTerms: ["Trinity", "Kenosis", "Atonement"],
    originalLanguage: "Latin: incarnatio (in + caro, flesh), from John 1:14 (Greek: sarx egeneto, 'became flesh')",
  },
  {
    term: "Atonement",
    category: "Doctrine",
    oneLiner: "The work of Christ on the cross that reconciles sinful humanity to God.",
    paragraph: "Atonement names the reality that something stands between God and humanity — and that Jesus' death and resurrection dealt with it. The church has never settled on a single theory of how this works. Penal substitution emphasizes Christ bearing the penalty for sin. Christus Victor frames the cross as victory over evil powers. The moral influence view stresses the love displayed in Christ's sacrifice. Recapitulation (Irenaeus) sees Christ re-living human life rightly where Adam failed. Each theory illuminates a facet; none exhausts the whole. The word itself is English — 'at-one-ment' — coined by William Tyndale.",
    significance: "Without atonement, the cross is tragedy without purpose. The doctrine forces every generation to answer: what exactly went wrong between God and us, and what exactly did Christ do about it?",
    relatedTerms: ["Propitiation", "Expiation", "Reconciliation"],
    originalLanguage: "English coinage by Tyndale (1526); translates Greek: katallage (reconciliation) and hilasmos (propitiation)",
  },
  {
    term: "Justification",
    category: "Doctrine",
    oneLiner: "God's declaration that a sinner is righteous, not on the basis of their own merit but through faith in Christ.",
    paragraph: "Justification is a legal metaphor: the judge pronounces the defendant 'not guilty,' not because the defendant is innocent but because Christ's righteousness has been credited to their account. This was the hinge of the Reformation. Luther insisted that justification is by grace through faith alone — sola fide — against the medieval system that blended grace with human merit. The Catholic counter-position (Trent, 1547) held that justification includes the actual transformation of the person, not merely a declaration. The Joint Declaration on the Doctrine of Justification (1999) sought common ground. Paul's letter to the Romans, especially chapters 3-5, is the primary source.",
    significance: "Justification determines whether Christianity is fundamentally about human effort or divine gift. It shapes how a person stands before God on Tuesday morning — with confidence or with dread.",
    relatedTerms: ["Imputation", "Sanctification", "Redemption"],
    originalLanguage: "Greek: dikaiosis (a declaring righteous), from dikaios (just/righteous)",
  },
  {
    term: "Sanctification",
    category: "Doctrine",
    oneLiner: "The ongoing process by which believers are gradually made holy — conformed to the character of Christ.",
    paragraph: "If justification is the verdict, sanctification is the rehabilitation. It names the slow, often painful process by which God reshapes a person's desires, habits, and character into the image of Christ. Protestants generally distinguish sanctification from justification: one is God's declaration, the other is God's renovation. Wesleyans add a doctrine of 'entire sanctification' — a moment of full surrender that enables consistent love, though not sinless perfection. Reformed theology emphasizes that sanctification is entirely God's work through the Spirit, even as it requires human obedience. Either way, the process is lifelong and incomplete this side of the resurrection.",
    significance: "Sanctification rescues Christianity from both cheap grace (believing without changing) and moralism (changing without grace). It names the actual experience of following Jesus: difficult, incremental, and dependent on the Spirit.",
    relatedTerms: ["Justification", "Glorification", "Regeneration"],
    originalLanguage: "Latin: sanctificatio, from sanctus (holy) + facere (to make); Greek: hagiasmos (making holy)",
  },
  {
    term: "Glorification",
    category: "Doctrine",
    oneLiner: "The final transformation of believers at the resurrection, when sin and death are permanently removed.",
    paragraph: "Glorification is the end of the sanctification process — but it is not merely its completion. It names the moment when God finishes what he started: the bodily resurrection of believers, the removal of every inclination toward sin, and full conformity to Christ's glorified humanity. Paul describes it in Romans 8:30 as the final link in a chain: foreknown, predestined, called, justified, glorified — the past tense is deliberate, treating a future event as so certain it can be spoken of as accomplished. Glorification is corporate, not just individual. The whole creation, Paul argues, groans alongside believers waiting for this moment (Romans 8:18-23).",
    significance: "Glorification prevents Christianity from becoming a self-improvement project. The final word over a believer is not 'try harder' but a promise: God will finish what he started, and it includes a body.",
    relatedTerms: ["Sanctification", "Resurrection", "Eschatology"],
    originalLanguage: "Latin: glorificatio, from gloria (glory); Greek: doxazo (to glorify, to give weight/honor)",
  },
  {
    term: "Sovereignty",
    category: "Doctrine",
    oneLiner: "The belief that God exercises supreme authority and control over all creation, history, and salvation.",
    paragraph: "Divine sovereignty means that nothing happens outside the knowledge, permission, or direction of God. This is one of the most debated concepts in theology because it raises the question of human freedom. Strong Calvinist readings hold that God's sovereignty extends to the decreeing of all events, including the choices of individuals. Arminian readings hold that God sovereignly chooses to grant genuine freedom, limiting his own control to preserve the integrity of relationship. Both sides claim biblical support. The tension is not resolved by picking one pole; it is lived in by any serious reader of Scripture who notices that the same Bible affirms both God's control (Ephesians 1:11) and human responsibility (Ezekiel 18:30-32).",
    significance: "The doctrine of sovereignty shapes whether a person prays with confidence or despair. It is the theological ground beneath the phrase 'God is still in control' — and the doctrine that forces honesty about what that phrase costs when suffering arrives.",
    relatedTerms: ["Providence", "Predestination", "Election"],
    originalLanguage: "Latin: superanus (supreme); applied theologically to translate biblical concepts of God's melek (Hebrew: king) and pantokrator (Greek: almighty/all-ruling)",
  },
  {
    term: "Providence",
    category: "Doctrine",
    oneLiner: "God's ongoing governance and care for the world he created, sustaining it and directing it toward his purposes.",
    paragraph: "Providence is sovereignty in motion — not just that God rules, but that God is actively at work in ordinary events, historical processes, and individual lives. Traditional theology distinguishes general providence (God sustains the natural order — rain falls, crops grow) from special providence (God intervenes in particular circumstances for particular purposes). The Heidelberg Catechism (1563) defines it memorably: everything comes 'not by chance but by his fatherly hand.' The difficulty, of course, is suffering. If God governs everything, what do we do with famine, cancer, and cruelty? Providence does not resolve that question; it holds it inside the claim that the God who allowed Friday also raised Sunday.",
    significance: "Providence is the doctrine that makes daily life theological. It is the difference between seeing events as random and seeing them as held — even when the holding is painful.",
    relatedTerms: ["Sovereignty", "Theodicy", "Predestination"],
    originalLanguage: "Latin: providentia (foresight, care), from pro (before) + videre (to see)",
  },
  {
    term: "Predestination",
    category: "Doctrine",
    oneLiner: "The teaching that God determined the eternal destiny of individuals before the foundation of the world.",
    paragraph: "Predestination is the doctrine that makes people uncomfortable — and for good reason. Paul introduces it in Romans 8-9 and Ephesians 1, and the church has been arguing about it since Augustine and Pelagius in the fifth century. Calvin developed double predestination: God actively elects some to salvation and passes over others, leaving them to the just consequences of their sin. Arminius responded that predestination is based on God's foreknowledge of who would freely believe. Molinism offers a middle way through 'middle knowledge.' Each position has exegetical strengths and theological costs. The doctrine cannot be avoided because Scripture uses the word; it cannot be resolved because the Bible also commands 'whoever will, let him come.'",
    significance: "Predestination confronts the deepest questions about grace, freedom, and justice. It forces the church to decide whether salvation originates in human choice or divine initiative — and to hold whichever answer with humility.",
    relatedTerms: ["Election", "Sovereignty", "Prevenient Grace"],
    originalLanguage: "Latin: praedestinatio (a determining beforehand); Greek: proorizo (to decide upon beforehand, Romans 8:29-30)",
  },
  {
    term: "Election",
    category: "Doctrine",
    oneLiner: "God's choice of certain individuals or groups for a particular purpose, most often salvation.",
    paragraph: "Election is predestination with a warmer face: it emphasizes that God chose his people, not that he rejected others. In the Old Testament, election is corporate — God chooses Israel, not because they are worthy but because he loves them (Deuteronomy 7:7-8). In the New Testament, election applies to believers in Christ (Ephesians 1:4). The debate mirrors predestination: Calvinists hold that election is unconditional (not based on foreseen faith), while Arminians hold that it is conditional (based on God's foreknowledge of faith). Karl Barth reframed the entire debate by arguing that Jesus Christ is the elect one, and all humanity is elect in him — though Barth's universalism remains contested.",
    significance: "Election reminds the church that faith is a response to grace, not its cause. When taken seriously, it produces gratitude rather than pride — 'I did not choose God; God chose me.'",
    relatedTerms: ["Predestination", "Sovereignty", "Perseverance"],
    originalLanguage: "Latin: electio (a choosing); Greek: ekloge (selection, choosing out, Romans 11:5)",
  },
  {
    term: "Original Sin",
    category: "Doctrine",
    oneLiner: "The doctrine that all humans inherit a corrupted nature from Adam's first act of disobedience.",
    paragraph: "Original sin does not mean that every person committed Adam's sin; it means every person is born into Adam's condition. Augustine formalized the doctrine against Pelagius, who argued that humans are born morally neutral and capable of choosing good without divine aid. Augustine countered that the will itself is damaged — fallen humans are free to sin but not free not to sin without grace. The Eastern Orthodox tradition prefers 'ancestral sin,' emphasizing mortality and brokenness inherited from Adam rather than inherited guilt. The Reformation traditions largely followed Augustine. Original sin explains the universality of human failure: it is not that people occasionally make bad choices, but that something is structurally wrong with humanity from the start.",
    significance: "Original sin is the doctrine that prevents optimistic humanism from becoming the default Christian anthropology. It names what everyone already suspects: the problem with the world is not merely external but internal — and it runs deeper than poor education or bad policy.",
    relatedTerms: ["Total Depravity", "Regeneration", "Imputation"],
    originalLanguage: "Latin: peccatum originale (original/originating sin), coined by Augustine; Greek: hamartia (missing the mark)",
  },
  {
    term: "Total Depravity",
    category: "Doctrine",
    oneLiner: "The Reformed teaching that sin affects every part of human nature — mind, will, and affections — not that humans are as bad as possible.",
    paragraph: "Total depravity is the most misunderstood of the five points of Calvinism. It does not mean that every person is as wicked as they could be, or that unbelievers cannot do good things. It means that no part of the human person is untouched by sin: the intellect is clouded, the will is bent, the desires are disordered. The result is not that humans cannot perform admirable acts but that they cannot, on their own initiative, turn to God and embrace salvation. The doctrine is the theological premise for the necessity of grace — if the will is intact, grace is optional; if the will is damaged, grace is the only hope. Other traditions (Arminianism) affirm a similar depth of fallenness but insist that prevenient grace restores enough freedom for genuine choice.",
    significance: "Total depravity matters because it determines whether the church preaches 'try harder' or 'cry out for help.' It shapes evangelism, discipleship, and the posture a believer takes toward their own persistent failures.",
    relatedTerms: ["Original Sin", "Prevenient Grace", "Regeneration"],
    originalLanguage: "Latin: depravitas (corruption); the concept rests on Paul's language in Romans 3:10-18 (Greek: ouk estin dikaios oude heis, 'there is no one righteous, not even one')",
  },
  {
    term: "Prevenient Grace",
    category: "Doctrine",
    oneLiner: "Grace that comes before conversion, enabling a fallen person to respond freely to God's offer of salvation.",
    paragraph: "Prevenient grace is the Arminian and Wesleyan answer to total depravity. It concedes that humanity is too fallen to seek God on its own but insists that God's grace goes ahead (Latin: praevenire, 'to come before') of every human decision, restoring enough freedom to say yes or no to the gospel. This preserves both the necessity of grace and the reality of genuine human choice. John Wesley considered prevenient grace essential to his theology: it explains how God can justly hold people accountable for rejecting the gospel — they were given the capacity to respond. Calvinists counter that if grace merely enables rather than ensures, salvation rests finally on the human decision rather than on God.",
    significance: "Prevenient grace explains why an Arminian can preach with urgency ('you can respond') without abandoning the priority of grace ('you could not respond without God's prior work'). It holds together what many assume must be separated: divine initiative and human freedom.",
    relatedTerms: ["Total Depravity", "Election", "Predestination"],
    originalLanguage: "Latin: gratia praeveniens (grace that comes before), from praevenire (to precede)",
  },
  {
    term: "Imputation",
    category: "Doctrine",
    oneLiner: "The crediting of Christ's righteousness to the believer's account, so that God treats them as righteous even while they remain sinners.",
    paragraph: "Imputation is an accounting metaphor: something is placed on your ledger that was not earned by you. Protestant theology holds a double imputation: humanity's sin is imputed to Christ on the cross (he bears what is not his), and Christ's righteousness is imputed to believers (they receive what is not theirs). This is the mechanism behind justification — the believer is declared righteous not because of any inner change but because of a righteous status granted from outside. Roman Catholic theology resists the language of imputation in favor of infusion — righteousness actually poured into the believer, making them genuinely (not just legally) righteous. The distinction has enormous pastoral consequences: does your standing with God depend on what Christ did or on what Christ is doing in you?",
    significance: "Imputation is the doctrine that answers the question 'how can I stand before a holy God?' with something other than 'be better.' It is the ground of assurance for millions of believers who know they are not yet who they ought to be.",
    relatedTerms: ["Justification", "Atonement", "Original Sin"],
    originalLanguage: "Latin: imputatio (a reckoning to one's account); Greek: logizomai (to reckon/credit, Romans 4:3-8)",
  },
  {
    term: "Propitiation",
    category: "Doctrine",
    oneLiner: "The turning away of God's wrath through the sacrificial death of Christ.",
    paragraph: "Propitiation is the most uncomfortable word in the Christian vocabulary because it requires acknowledging divine wrath — something modern Christianity would rather avoid. The concept appears in Romans 3:25, 1 John 2:2, and 1 John 4:10, where Christ is called the hilasmos — the one who turns away God's righteous anger against sin. Liberal scholarship (C.H. Dodd) argued that the Greek term means expiation (the removal of sin) rather than propitiation (the appeasement of wrath). Leon Morris and others countered that the biblical context clearly includes wrath. The distinction matters: if God's wrath is real, the cross addresses something in God, not just something in us. Propitiation does not mean God is petty or vindictive; it means God's holiness cannot coexist with unaddressed sin.",
    significance: "Propitiation forces the church to take God's holiness as seriously as God's love. Without it, the cross becomes an inspirational example rather than a necessary rescue.",
    relatedTerms: ["Expiation", "Atonement", "Reconciliation"],
    originalLanguage: "Greek: hilasmos (appeasement, satisfaction); hilasterion (mercy seat, place of atonement, Romans 3:25)",
  },
  {
    term: "Expiation",
    category: "Doctrine",
    oneLiner: "The removal or cleansing of sin and its guilt, distinct from but related to the turning away of wrath.",
    paragraph: "Where propitiation addresses God (turning away his wrath), expiation addresses sin (removing its stain and guilt). The two are not opposed but complementary. In the Old Testament, the Day of Atonement rituals (Leviticus 16) picture both: blood is sprinkled on the mercy seat (propitiation — God's wrath is satisfied) and the scapegoat carries sins into the wilderness (expiation — guilt is removed). The scholarly debate between Dodd (expiation only) and Morris (propitiation included) shaped twentieth-century theology. Most evangelical scholarship now holds that the biblical terms include both dimensions: Christ's death both satisfies divine justice and cleanses human guilt.",
    significance: "Expiation assures the believer that sin is not merely forgiven as a legal matter but actually removed — the stain is cleansed, the guilt is carried away. This is what makes a guilty conscience rest.",
    relatedTerms: ["Propitiation", "Atonement", "Redemption"],
    originalLanguage: "Latin: expiatio (atonement, purification); from ex (out) + piare (to appease, cleanse)",
  },
  {
    term: "Reconciliation",
    category: "Doctrine",
    oneLiner: "The restoration of a broken relationship between God and humanity, accomplished through Christ's death.",
    paragraph: "Reconciliation is the relational language of the atonement — not legal (justification), not commercial (redemption), not sacrificial (propitiation), but personal. Paul says God was 'reconciling the world to himself in Christ, not counting people's sins against them' (2 Corinthians 5:19). The direction matters: it is God who reconciles, and the world that is reconciled. This does not mean God needed to change his mind about humanity; it means the obstacle to relationship (sin) has been removed, and the invitation stands open. The ministry of reconciliation is then given to the church (2 Corinthians 5:18-20) — believers become ambassadors of the restored relationship.",
    significance: "Reconciliation reminds the church that salvation is not primarily about avoiding punishment but about restoring a relationship. It is the most personal and least abstract of the atonement images.",
    relatedTerms: ["Atonement", "Redemption", "Adoption"],
    originalLanguage: "Greek: katallage (exchange, restoration of relations, 2 Corinthians 5:18); Latin: reconciliatio",
  },
  {
    term: "Redemption",
    category: "Doctrine",
    oneLiner: "The act of purchasing someone's freedom — applied to Christ's work of liberating humanity from sin and death.",
    paragraph: "Redemption is marketplace language applied to salvation. In the ancient world, a slave could be redeemed — bought out of bondage by a payment. Paul applies this directly: 'You were bought at a price' (1 Corinthians 6:20). The price is the blood of Christ (Ephesians 1:7). The Old Testament background is the exodus — God redeems Israel from Egypt, not with money but with power. The New Testament merges both images: Christ's death is the price that liberates believers from bondage to sin, death, and the law's condemnation. The question of 'to whom was the ransom paid?' generated debate in the early church (Origen suggested the devil; Gregory of Nazianzus rejected this as absurd). The metaphor does not require a recipient of payment — it requires the reality of bondage and the cost of freedom.",
    significance: "Redemption names what every person suspects about the human condition: we are not merely sick but enslaved. Freedom is not self-achieved. Someone had to pay for it.",
    relatedTerms: ["Atonement", "Justification", "Reconciliation"],
    originalLanguage: "Greek: apolytrosis (release upon payment of ransom); Hebrew: ga'al (to redeem, act as kinsman-redeemer); padah (to ransom)",
  },
  {
    term: "Regeneration",
    category: "Doctrine",
    oneLiner: "The supernatural act of God giving spiritual life to a person who was spiritually dead — being 'born again.'",
    paragraph: "Regeneration is the theological name for what Jesus described to Nicodemus: 'You must be born again' (John 3:3). It is not reformation (changing behavior) or education (changing beliefs) but the impartation of new spiritual life to a person who was, in Paul's language, 'dead in transgressions' (Ephesians 2:1). Reformed theology insists regeneration precedes faith — God must make the heart alive before it can respond. Arminian theology holds that regeneration accompanies or follows the decision of faith, enabled by prevenient grace. Both agree on the essential point: human effort alone cannot produce spiritual life. Regeneration is God's act, not a human achievement.",
    significance: "Regeneration explains why Christianity is not merely a moral system but a new birth. It accounts for the lived experience of conversion — something changed that willpower alone could not change.",
    relatedTerms: ["Sanctification", "Original Sin", "Total Depravity"],
    originalLanguage: "Greek: palingenesia (new birth, rebirth, Titus 3:5); from palin (again) + genesis (birth/origin)",
  },
  {
    term: "Adoption",
    category: "Doctrine",
    oneLiner: "God's act of receiving believers into his family as sons and daughters, with all the rights and intimacy that status implies.",
    paragraph: "Adoption is the most neglected metaphor of salvation and arguably the most personal. Paul uses Roman adoption law as his framework (Romans 8:15, Galatians 4:5, Ephesians 1:5): in Roman practice, an adopted son received the full legal status of a natural-born heir — debts were cancelled, a new identity was conferred, and the father's name became the son's name. Applied to salvation, adoption means believers are not merely pardoned criminals (justification) or freed slaves (redemption) but welcomed children. They call God 'Abba, Father' — an intimate address that would have startled first-century Jewish ears. The Spirit himself confirms this identity (Romans 8:16).",
    significance: "Adoption reveals that God's goal is not merely to acquit but to embrace. It shapes how a believer relates to God — not as a defendant before a judge but as a child before a father. This distinction changes everything about prayer, failure, and identity.",
    relatedTerms: ["Justification", "Reconciliation", "Regeneration"],
    originalLanguage: "Greek: huiothesia (placing as a son, Romans 8:15); from huios (son) + tithemi (to place)",
  },
  {
    term: "Perseverance",
    category: "Doctrine",
    oneLiner: "The doctrine that those truly saved by God will continue in faith to the end and cannot finally fall away.",
    paragraph: "Perseverance of the saints — the 'P' in TULIP — asserts that genuine believers will persevere because God preserves them. Jesus says, 'No one can snatch them out of my hand' (John 10:28). Paul says nothing 'will be able to separate us from the love of God' (Romans 8:39). Arminians counter with Hebrews 6:4-6, which warns of those who were 'enlightened' and then 'fell away,' and argue that genuine believers can forfeit salvation through persistent unbelief. The Reformed response is that those who permanently apostatize were never truly regenerate (1 John 2:19). The Wesleyan tradition holds that perseverance is conditional on continued faith. Both sides agree that the warnings of Scripture are real and serious.",
    significance: "Perseverance answers the question that haunts every serious believer: 'Can I lose this?' The Reformed answer is 'No, because God holds you.' The Arminian answer is 'Not unless you let go.' Both agree: presumption without obedience is dangerous.",
    relatedTerms: ["Election", "Assurance", "Sanctification"],
    originalLanguage: "Latin: perseverantia (steadfastness, remaining to the end); Greek: hupomone (patient endurance, Hebrews 12:1)",
  },
  {
    term: "Assurance",
    category: "Doctrine",
    oneLiner: "The confidence a believer can have that they are truly saved and accepted by God.",
    paragraph: "Assurance is the subjective side of perseverance — not whether God will keep the believer, but whether the believer can know it. The Reformers insisted that assurance is possible and normal: Calvin said true faith necessarily includes assurance; the Westminster Confession (1646) was more cautious, distinguishing between the reality of salvation and the assurance of it (a believer may be truly saved yet struggle with doubt). Wesley added that the Spirit gives a direct witness to the believer's spirit that they are children of God (Romans 8:16). Catholic theology, particularly at Trent, resisted the idea that anyone could have absolute certainty of salvation in this life — presumption was considered a sin. The pastoral stakes are enormous: assurance shapes whether faith produces peace or anxiety.",
    significance: "Assurance is the doctrine that determines whether Christianity feels like good news on a Wednesday night. Without it, believers live in perpetual uncertainty; with it, they can rest — not in their own performance but in God's faithfulness.",
    relatedTerms: ["Perseverance", "Justification", "Regeneration"],
    originalLanguage: "Greek: plerophoria (full assurance, Hebrews 10:22); Latin: certitudo (certainty)",
  },
  {
    term: "Eschatology",
    category: "Doctrine",
    oneLiner: "The study of last things: death, judgment, heaven, hell, the return of Christ, and the renewal of creation.",
    paragraph: "Eschatology is not merely about predicting the future; it is about how the future shapes the present. The New Testament presents the kingdom of God as both 'already' (inaugurated by Jesus' life, death, and resurrection) and 'not yet' (awaiting consummation at his return). This 'already/not yet' framework, developed by Oscar Cullmann and George Eldon Ladd, stands between the over-realized eschatology that thinks the kingdom is fully here now and the futurist eschatology that locates all hope in the distant future. Major eschatological positions include premillennialism (Christ returns before a thousand-year reign), amillennialism (the millennium is symbolic of the present age), and postmillennialism (the church gradually transforms the world before Christ's return).",
    significance: "Eschatology shapes ethics. If God is renewing creation, then Christians care for bodies, institutions, and the earth — not just souls. If everything burns, then only evangelism matters. What you believe about the end determines what you do in the middle.",
    relatedTerms: ["Parousia", "Resurrection", "Dispensationalism"],
    originalLanguage: "Greek: eschatos (last/final) + logos (study/word); ta eschata (the last things)",
  },
  {
    term: "Parousia",
    category: "Doctrine",
    oneLiner: "The second coming of Christ — his visible, bodily return to earth at the end of the age.",
    paragraph: "Parousia literally means 'presence' or 'arrival,' and in the ancient world it described the formal visit of a king or emperor to a city. The New Testament applies it to Christ's return (Matthew 24:27, 1 Thessalonians 4:15). The early church expected the Parousia imminently — Paul seems to have anticipated it within his lifetime (1 Thessalonians 4:17). As centuries passed, the church settled into harder-won positions: the return is certain but the timing unknown ('no one knows the day or the hour,' Matthew 24:36). The Parousia is not a second chance but a consummation — the completion of everything Christ began at his first coming. It includes judgment, resurrection, and the renewal of all things.",
    significance: "The Parousia keeps the church from settling for the world as it is. It is the doctrine that insists history has a destination — not mere cycles, not entropy, but a return and a restoration.",
    relatedTerms: ["Eschatology", "Resurrection", "Glorification"],
    originalLanguage: "Greek: parousia (presence, coming, arrival); used in secular Greek for a royal visit",
  },
  {
    term: "Resurrection",
    category: "Doctrine",
    oneLiner: "The bodily rising of Christ from the dead and the promised future bodily rising of all believers.",
    paragraph: "The resurrection is not a metaphor. Paul is emphatic: 'If Christ has not been raised, your faith is futile; you are still in your sins' (1 Corinthians 15:17). The New Testament claims that Jesus' body was physically raised — the tomb was empty, he ate fish, Thomas touched his wounds. This was not a resuscitation (coming back to the same kind of life) but a transformation (entering a new kind of bodily existence). The resurrection of believers is patterned on Christ's: 'sown perishable, raised imperishable' (1 Corinthians 15:42). This is why Christianity is not a religion of escape from the body but of the body's redemption. The resurrection stands as the central historical claim of the faith — remove it, and the entire structure collapses.",
    significance: "The resurrection makes Christianity falsifiable — it stakes everything on a historical event. It also means that hope is not abstract but embodied: God does not discard what he made; he raises it.",
    relatedTerms: ["Parousia", "Glorification", "Eschatology"],
    originalLanguage: "Greek: anastasis (a standing up again, a rising); Latin: resurrectio (a rising again)",
  },

  // ===================== BIBLICAL STUDIES (20) =====================
  {
    term: "Hermeneutics",
    category: "Biblical Studies",
    oneLiner: "The science and art of interpreting texts, especially the Bible.",
    paragraph: "Hermeneutics asks the question: how do we read this rightly? It is not a single method but a discipline that encompasses historical context, literary genre, authorial intent, canonical context, and the reader's own location. The Reformers emphasized the literal-grammatical-historical method: what did the author mean in their original context? Modern hermeneutics (Schleiermacher, Gadamer, Ricoeur) expanded the field to include the reader's horizon and the fusion of horizons between text and interpreter. Evangelical hermeneutics typically privileges authorial intent while acknowledging that the Spirit may illumine dimensions the original author did not fully grasp (sensus plenior). Every doctrinal debate is ultimately a hermeneutical debate: not 'what does the Bible say?' but 'how do we read what the Bible says?'",
    significance: "Hermeneutics is the discipline that prevents the Bible from being a mirror for the reader's existing opinions. Good hermeneutics is the difference between hearing God's word and hearing your own voice echoed back in King James English.",
    relatedTerms: ["Exegesis", "Eisegesis", "Typology"],
    originalLanguage: "Greek: hermeneuein (to interpret, to explain); related to Hermes, the messenger god",
  },
  {
    term: "Exegesis",
    category: "Biblical Studies",
    oneLiner: "Drawing meaning out of a biblical text by careful analysis of its words, context, and original setting.",
    paragraph: "Exegesis literally means 'to lead out' — you lead the meaning out of the text rather than reading your meaning into it. Good exegesis requires attention to the original languages (Hebrew, Aramaic, Greek), the historical and cultural context of the passage, the literary genre (narrative reads differently than poetry, prophecy differently than epistle), and the passage's place in the larger biblical narrative. Exegesis is what happens before application: before you ask 'what does this mean for me?' you must first ask 'what did this mean for them?' The discipline of exegesis keeps preaching honest and theology accountable. Every sermon, every theological claim, every doctrinal position should be built on exegetical work, not on impressions or traditions.",
    significance: "Exegesis is the guard against using the Bible as a ventriloquist's dummy. It demands humility: the text may not say what you want it to say, and that is precisely when reading starts to change the reader instead of confirming him.",
    relatedTerms: ["Eisegesis", "Hermeneutics", "Pericope"],
    originalLanguage: "Greek: exegesis (a leading out, explanation), from ex (out) + hegeisthai (to lead/guide)",
  },
  {
    term: "Eisegesis",
    category: "Biblical Studies",
    oneLiner: "Reading one's own ideas or biases into a biblical text rather than drawing the meaning out of it.",
    paragraph: "Eisegesis is the opposite of exegesis and the perennial temptation of every reader. It occurs when a person approaches the text with a conclusion already formed and finds (or forces) support for it in Scripture. Every tradition is susceptible: progressives eisegete when they dismiss passages that challenge contemporary ethics; conservatives eisegete when they read modern individualism into ancient communal texts. The term is always pejorative — no one describes their own reading as eisegesis. The corrective is rigorous exegetical method: attention to grammar, context, genre, and canonical placement. But complete objectivity is impossible; every reader brings a perspective. The goal is not to eliminate the reader's context but to discipline it — to let the text talk back.",
    significance: "Naming eisegesis is essential for honest biblical engagement. It reminds every reader and preacher that the most dangerous misreadings are the ones that feel most natural — the ones that confirm what we already believe.",
    relatedTerms: ["Exegesis", "Hermeneutics", "Canon"],
    originalLanguage: "Greek: eisegesis (a leading into), from eis (into) + hegeisthai (to lead); coined as the antonym of exegesis",
  },
  {
    term: "Canon",
    category: "Biblical Studies",
    oneLiner: "The recognized collection of books accepted as authoritative Scripture by the church.",
    paragraph: "Canon comes from a Greek word meaning 'rule' or 'measuring rod.' The canon of Scripture is the list of books the church recognizes as divinely inspired and authoritative. The Hebrew Bible's canon was largely settled by the first century, though debate about books like Ecclesiastes and Song of Songs continued. The New Testament canon developed over centuries: the four Gospels and Paul's major letters were widely accepted by the late second century; books like Hebrews, James, 2 Peter, and Revelation took longer. Athanasius's Easter letter (367 AD) is the first to list exactly the twenty-seven books of the current New Testament. The church did not create the canon by arbitrary decision; it recognized books that had already demonstrated their authority through apostolic origin, consistency with the rule of faith, and widespread use in worship.",
    significance: "The canon determines what counts as Scripture and what does not. Every theological argument ultimately depends on which books are on the table and who gets to decide.",
    relatedTerms: ["Inspiration", "Apocrypha", "Pseudepigrapha"],
    originalLanguage: "Greek: kanon (reed, measuring rod, rule); applied to the list of authoritative books",
  },
  {
    term: "Inspiration",
    category: "Biblical Studies",
    oneLiner: "The belief that God guided the human authors of Scripture so that what they wrote is the word of God.",
    paragraph: "Inspiration is the doctrine that explains how human books became divine Scripture. Paul says 'all Scripture is God-breathed' (2 Timothy 3:16) — the Greek theopneustos suggests not that God dictated but that God breathed out through human authors. Theories of inspiration range from mechanical dictation (God controlled every word, the human author was passive) to dynamic inspiration (God guided the process while the human author's personality, vocabulary, and context remained fully engaged). Most evangelical theology favors a verbal-plenary model: God inspired the very words (verbal), all of them (plenary), through the genuine agency of the human authors. This means Isaiah writes differently than Paul, Luke researches his sources (Luke 1:1-4), and yet the result is what God intended to say.",
    significance: "The doctrine of inspiration grounds the authority of Scripture. Without it, the Bible is merely a collection of religious literature. With it, the Bible carries the weight of God's own speech — which means it can be trusted, and it can talk back to its readers.",
    relatedTerms: ["Inerrancy", "Infallibility", "Canon"],
    originalLanguage: "Greek: theopneustos (God-breathed, 2 Timothy 3:16); Latin: inspiratio (a breathing into)",
  },
  {
    term: "Inerrancy",
    category: "Biblical Studies",
    oneLiner: "The belief that the Bible, in its original manuscripts, is entirely without error in all it affirms.",
    paragraph: "Inerrancy became a flash point in twentieth-century American evangelicalism, particularly after the publication of Harold Lindsell's The Battle for the Bible (1976) and the Chicago Statement on Biblical Inerrancy (1978). The doctrine holds that the Bible is without error not only in matters of faith and practice but also in its historical and scientific claims — when properly interpreted and in the original manuscripts (autographa). Critics argue that inerrancy is a modern construction imposed on ancient texts that never intended to meet modern standards of precision. Defenders counter that Jesus treated the Old Testament as fully reliable (Matthew 5:18, John 10:35). The distinction between inerrancy and infallibility has become important: some scholars hold infallibility (the Bible achieves its purpose without fail) while declining the stronger claim of inerrancy (no errors of any kind).",
    significance: "Inerrancy shapes how a community reads the Bible. It is not merely an abstract doctrine but a posture: does the reader stand over the text as judge, or under it as one who is judged?",
    relatedTerms: ["Infallibility", "Inspiration", "Textual Criticism"],
    originalLanguage: "Latin: inerrantia (freedom from error); from in (not) + errare (to wander, to err)",
  },
  {
    term: "Infallibility",
    category: "Biblical Studies",
    oneLiner: "The belief that the Bible is completely trustworthy and will not fail in accomplishing its divine purpose.",
    paragraph: "Infallibility is sometimes used interchangeably with inerrancy, but many theologians draw a careful distinction. Infallibility means the Bible will not fail — it is a reliable guide to faith and practice, and the God who speaks through it will accomplish his purposes (Isaiah 55:11). This is a claim about the Bible's function and purpose. Inerrancy, by contrast, is a claim about the Bible's factual accuracy in all its assertions. Some evangelicals hold infallibility without inerrancy, arguing that the Bible is entirely trustworthy for its intended purpose (revealing God, forming faith) while allowing for the kind of imprecision normal in ancient historiography. Others insist the two are inseparable — a book that errs cannot be fully trusted. The Reformed tradition has generally held both together.",
    significance: "Infallibility grounds the practical authority of the Bible in the life of the church. A Bible that might fail is a Bible that can be overruled; a Bible that cannot fail demands a different kind of engagement from its readers.",
    relatedTerms: ["Inerrancy", "Inspiration", "Canon"],
    originalLanguage: "Latin: infallibilitas (incapability of error), from in (not) + fallere (to deceive/fail)",
  },
  {
    term: "Textual Criticism",
    category: "Biblical Studies",
    oneLiner: "The scholarly discipline of comparing ancient manuscript copies to reconstruct the most likely original text of the Bible.",
    paragraph: "No original manuscript (autograph) of any biblical book survives. What survive are copies — thousands of them, in various languages, from various centuries, with various differences. Textual criticism is the discipline that compares these manuscripts to determine what the original likely said. For the New Testament, there are over 5,800 Greek manuscripts, plus translations into Latin, Syriac, and Coptic. The vast majority of variants are trivial (spelling differences, word order) and affect no doctrine. A few are significant: the long ending of Mark (16:9-20), the woman caught in adultery (John 7:53-8:11), and the Comma Johanneum (1 John 5:7-8 in the KJV) are all debated. Textual criticism is not an attack on the Bible; it is the discipline that lets us read it more accurately.",
    significance: "Textual criticism gives the church confidence that its Bible is reliable — not by pretending the manuscripts agree perfectly but by carefully demonstrating that the overwhelming agreement points to a trustworthy text.",
    relatedTerms: ["Inerrancy", "Masoretic Text", "Septuagint"],
    originalLanguage: "The discipline operates on manuscripts in Greek (New Testament), Hebrew and Aramaic (Old Testament), and ancient translations (versiones)",
  },
  {
    term: "Form Criticism",
    category: "Biblical Studies",
    oneLiner: "A method of biblical analysis that identifies the pre-literary oral forms behind the written text.",
    paragraph: "Form criticism (German: Formgeschichte) was developed in the early twentieth century by Hermann Gunkel (Old Testament) and Martin Dibelius and Rudolf Bultmann (New Testament). The method asks: before this text was written down, what oral form did it take? A healing story has a different shape than a pronouncement story, a hymn, or a legal code. By identifying the form, the critic can reconstruct the Sitz im Leben (setting in life) — the social context in which the material was used. Form criticism yielded genuine insights: the Psalms, for example, divide into types (lament, praise, thanksgiving, royal) that correspond to worship settings. Its excesses — particularly Bultmann's skepticism about recovering the historical Jesus — provoked reaction, but the method itself remains a standard tool in biblical scholarship.",
    significance: "Form criticism reminds readers that the Bible did not fall from the sky as a printed book. It passed through communities, worship, and oral tradition — and understanding that process helps us hear it more clearly.",
    relatedTerms: ["Redaction Criticism", "Hermeneutics", "Pericope"],
    originalLanguage: "German: Formgeschichte (history of forms); Sitz im Leben (setting in life); the method analyzes forms (Gattungen) in Hebrew, Aramaic, and Greek texts",
  },
  {
    term: "Redaction Criticism",
    category: "Biblical Studies",
    oneLiner: "A method of biblical analysis that studies how biblical authors edited, arranged, and shaped their source materials.",
    paragraph: "Redaction criticism emerged in the mid-twentieth century as a complement to form and source criticism. Where source criticism asks 'what sources did the author use?' and form criticism asks 'what oral forms lie behind the text?', redaction criticism asks 'what did the author do with those sources?' Applied to the Gospels, this means studying how Matthew and Luke used Mark (and the hypothetical source Q) — what they added, omitted, rearranged, and reworded reveals their theological emphases. Matthew highlights Jesus as the new Moses; Luke emphasizes the marginalized and the Spirit. Redaction criticism treats the Gospel writers as theologians, not mere compilers. This was a significant advance over form criticism, which had tended to treat the evangelists as scissors-and-paste editors with little creative contribution.",
    significance: "Redaction criticism reveals that the biblical authors were not passive transcribers but intentional theologians. Understanding their editorial choices deepens our reading and our preaching.",
    relatedTerms: ["Form Criticism", "Hermeneutics", "Exegesis"],
    originalLanguage: "German: Redaktionsgeschichte (history of redaction/editing); from Latin: redactio (a bringing back, editing)",
  },
  {
    term: "Septuagint",
    category: "Biblical Studies",
    oneLiner: "The ancient Greek translation of the Hebrew Scriptures, produced in the third and second centuries BC.",
    paragraph: "The Septuagint (abbreviated LXX) was the Bible of the early church. Produced in Alexandria, Egypt, beginning around 250 BC, it translated the Hebrew Scriptures into Greek — the common language of the Hellenistic world. The legend (Letter of Aristeas) claims seventy-two translators produced identical translations independently; hence the name 'Septuagint' (seventy). In reality, the translation was the work of many hands over several centuries. The Septuagint matters enormously because it is the Old Testament text most frequently quoted by the New Testament authors. When Paul or the author of Hebrews cites the Old Testament, they usually cite the LXX, not the Hebrew. The LXX also includes books (Wisdom, Sirach, Maccabees) that Protestants classify as Apocrypha but Catholics and Orthodox accept as canonical or deuterocanonical.",
    significance: "The Septuagint shaped the theological vocabulary of the New Testament. Greek words like diatheke (covenant/testament), ekklesia (assembly/church), and nomos (law) carry their meaning in part from the LXX's translation choices.",
    relatedTerms: ["Masoretic Text", "Canon", "Textual Criticism"],
    originalLanguage: "Latin: Septuaginta (seventy), referring to the legendary seventy translators; abbreviated LXX",
  },
  {
    term: "Masoretic Text",
    category: "Biblical Studies",
    oneLiner: "The authoritative Hebrew text of the Jewish Scriptures, meticulously preserved and vocalized by medieval Jewish scholars.",
    paragraph: "The Masoretic Text (MT) is the standard Hebrew text of the Old Testament, produced by a group of Jewish scholar-scribes known as the Masoretes between the sixth and tenth centuries AD. Hebrew was originally written without vowels; the Masoretes added a system of dots and dashes (nikkud) to preserve the correct pronunciation and reading tradition. They also added marginal notes (masorah) to guard against copying errors. The Leningrad Codex (c. 1009 AD) is the oldest complete Masoretic manuscript. The MT was the only major Hebrew witness until the Dead Sea Scrolls (discovered 1947), which provided manuscripts a thousand years older and generally confirmed the MT's reliability — though with significant variants in some books (notably Jeremiah and Samuel).",
    significance: "The Masoretic Text is the textual foundation of every English Old Testament translation. Understanding its history guards against the naive assumption that 'the original Hebrew' is a simple, singular thing.",
    relatedTerms: ["Septuagint", "Textual Criticism", "Canon"],
    originalLanguage: "Hebrew: masorah (tradition, that which is transmitted); the Masoretes (ba'ale ha-masorah, masters of tradition) worked primarily in Tiberias and Babylon",
  },
  {
    term: "Apocrypha",
    category: "Biblical Studies",
    oneLiner: "A collection of Jewish writings included in the Catholic and Orthodox Old Testaments but excluded from the Protestant canon.",
    paragraph: "The Apocrypha (or deuterocanonical books) includes works like Tobit, Judith, 1-2 Maccabees, Wisdom of Solomon, Sirach (Ecclesiasticus), and Baruch. These were part of the Septuagint and used widely in the early church — Augustine accepted them; Jerome had reservations. At the Reformation, Protestants followed Jerome and excluded them from the canon (the books are not in the Hebrew Bible), while the Council of Trent (1546) formally affirmed their canonicity for Catholics. The books are historically valuable regardless of canonical status: Maccabees provides essential background for the intertestamental period, and Wisdom of Solomon influenced Paul's language in Romans 1. The Anglican tradition retained them for reading 'for example of life and instruction of manners' but not for establishing doctrine.",
    significance: "The Apocrypha reveals that the Bible's boundaries are not self-evident but were discerned by communities over centuries. It also reminds Protestants that the early church read more widely than the sixty-six-book canon suggests.",
    relatedTerms: ["Canon", "Pseudepigrapha", "Septuagint"],
    originalLanguage: "Greek: apokrypha (hidden things), from apokryptein (to hide away); the term was applied pejoratively by Jerome",
  },
  {
    term: "Pseudepigrapha",
    category: "Biblical Studies",
    oneLiner: "Ancient Jewish and early Christian writings attributed to biblical figures but not accepted as canonical by any major tradition.",
    paragraph: "The Pseudepigrapha is a vast, loosely defined collection of texts written between roughly 200 BC and 200 AD, attributed to figures like Enoch, Moses, Abraham, and Isaiah. The name means 'falsely attributed writings,' though pseudonymous authorship was a common and accepted literary convention in the ancient world — not deception but honor. Key texts include 1 Enoch (influential on Jude and the concept of the Son of Man), the Testaments of the Twelve Patriarchs, 2 Baruch, and 4 Ezra. These writings are invaluable for understanding the theological world of Second Temple Judaism — the context from which Christianity emerged. Concepts like the messianic age, the resurrection of the dead, angelic hierarchies, and final judgment were developed and debated in this literature.",
    significance: "The Pseudepigrapha illuminates the intellectual world between the Testaments. Without it, the New Testament appears in a vacuum; with it, the connections between Jewish expectation and Christian fulfillment become visible.",
    relatedTerms: ["Apocrypha", "Canon", "Septuagint"],
    originalLanguage: "Greek: pseudepigrapha (falsely inscribed/attributed), from pseudos (false) + epigraphe (inscription)",
  },
  {
    term: "Chiasm",
    category: "Biblical Studies",
    oneLiner: "A literary structure in which ideas are presented in an A-B-C-B'-A' pattern, with the central element carrying the main emphasis.",
    paragraph: "Chiasm (or chiasmus) is named after the Greek letter chi (X) because the structure forms a conceptual crossover pattern. In a chiasm, the first element corresponds to the last, the second to the second-to-last, and the central element stands as the theological climax. This structure is pervasive in Hebrew poetry, narrative, and even in Greek New Testament texts. The Flood narrative in Genesis 6-9 forms a large chiasm with God's remembering of Noah (8:1) at its center. Psalm 23 and the Sermon on the Mount have been analyzed chiastically. Recognizing chiastic structure changes interpretation: the most important idea is in the middle, not at the end — a reversal of modern Western reading habits that expect a climax at the conclusion.",
    significance: "Chiasm reveals that biblical authors structured their texts with care and artistry. Recognizing the structure helps readers find the author's central emphasis rather than imposing their own.",
    relatedTerms: ["Inclusio", "Hermeneutics", "Exegesis"],
    originalLanguage: "Greek: chiasmos, from chi (the letter X, describing the crossover pattern)",
  },
  {
    term: "Inclusio",
    category: "Biblical Studies",
    oneLiner: "A literary device in which a passage begins and ends with the same word, phrase, or theme, forming a frame.",
    paragraph: "An inclusio (also called a literary bracket or envelope structure) signals the boundaries of a unit of text. Psalm 8, for instance, opens and closes with 'Lord, our Lord, how majestic is your name in all the earth!' — everything between is framed by that declaration. The Gospel of Matthew begins with 'God with us' (1:23, Emmanuel) and ends with 'I am with you always' (28:20) — the entire Gospel is bracketed by divine presence. Inclusio is not merely decorative; it tells the reader where a section begins and ends (essential in ancient texts without chapter or verse divisions) and names the interpretive lens through which the enclosed material should be read.",
    significance: "Inclusio is a reading clue the ancient authors left for us. Missing it means missing the frame — and without the frame, the picture is easily misread.",
    relatedTerms: ["Chiasm", "Hermeneutics", "Pericope"],
    originalLanguage: "Latin: inclusio (an enclosing); the device appears throughout Hebrew and Greek texts",
  },
  {
    term: "Typology",
    category: "Biblical Studies",
    oneLiner: "A method of biblical interpretation that reads Old Testament persons, events, or institutions as foreshadowing their New Testament fulfillment.",
    paragraph: "Typology sees patterns of correspondence across the Testaments: Adam is a type of Christ (Romans 5:14), the exodus prefigures salvation, the temple foreshadows Christ's body, the Passover lamb anticipates the crucifixion. The key distinction is between typology and allegory. Typology respects the historical reality of the original event — the exodus really happened — and sees in it a pattern that God later fulfills on a larger scale. Allegory (as practiced by Origen and the Alexandrian school) tends to bypass the historical meaning in favor of a spiritual one. The New Testament authors employ typology extensively: Matthew presents Jesus as a new Moses, Hebrews reads the entire sacrificial system as a shadow of Christ's once-for-all sacrifice. Done well, typology reveals the coherence of Scripture; done poorly, it becomes a game of finding Jesus under every rock.",
    significance: "Typology holds the two Testaments together as a single story rather than two separate books. It reveals that the Old Testament is not merely background but the first act of a drama whose resolution comes in Christ.",
    relatedTerms: ["Allegory", "Hermeneutics", "Exegesis"],
    originalLanguage: "Greek: typos (mark, pattern, example, Romans 5:14); antitypos (corresponding reality, 1 Peter 3:21)",
  },
  {
    term: "Allegory",
    category: "Biblical Studies",
    oneLiner: "A method of interpretation that treats the surface meaning of a text as a vehicle for a deeper, often spiritual, meaning.",
    paragraph: "Allegorical interpretation dominated the Alexandrian school (Clement, Origen) and much of medieval exegesis. Origen proposed three levels of meaning: literal (the body), moral (the soul), and spiritual/allegorical (the spirit). The medieval church expanded this to four: literal, allegorical, moral, and anagogical (pointing to heavenly realities). The Reformers largely rejected allegory in favor of the literal-grammatical-historical method, though they retained typology. Paul himself uses allegorical reading in Galatians 4:21-31, treating Hagar and Sarah as representing two covenants — so the method has apostolic precedent, even if its uncontrolled use led to exegetical excess. The danger of allegory is that it can make the text say anything the interpreter wants; its gift is that it recognizes Scripture's capacity to mean more than its surface.",
    significance: "Allegory raises the permanent question of how much meaning a text can carry. Used recklessly, it evacuates Scripture of its historical grounding. Used carefully, it acknowledges that the God who inspired the text may have embedded more than the human author consciously intended.",
    relatedTerms: ["Typology", "Hermeneutics", "Exegesis"],
    originalLanguage: "Greek: allegoria (speaking otherwise), from allos (other) + agoreuein (to speak in the assembly); Paul uses the term in Galatians 4:24",
  },
  {
    term: "Pericope",
    category: "Biblical Studies",
    oneLiner: "A self-contained passage or unit of Scripture, especially in the Gospels, that conveys a single episode or teaching.",
    paragraph: "A pericope is the basic building block of biblical narrative. It is a section of text that can stand on its own as a coherent unit — a healing story, a parable, a discourse, a pronouncement. The Gospels are largely composed of pericopes that the evangelists arranged in particular orders for theological purposes. Mark's arrangement differs from Matthew's, and the differences are theologically significant (this is what redaction criticism studies). The most famous pericope is the Pericope Adulterae — the story of the woman caught in adultery (John 7:53-8:11) — which is also the most textually disputed: it does not appear in the earliest manuscripts. Understanding where one pericope ends and another begins is essential for good exegesis; reading a verse in isolation often misses the unit it belongs to.",
    significance: "The concept of the pericope reminds readers that the Bible was not written in verses. Reading a single verse without its pericope is like reading a sentence without its paragraph — technically possible, but almost guaranteed to distort the meaning.",
    relatedTerms: ["Exegesis", "Form Criticism", "Hermeneutics"],
    originalLanguage: "Greek: perikope (a cutting around, a section), from peri (around) + koptein (to cut)",
  },
  {
    term: "Hapax Legomenon",
    category: "Biblical Studies",
    oneLiner: "A word that appears only once in the entire Bible (or in a particular author's writings), making its meaning difficult to determine.",
    paragraph: "A hapax legomenon (plural: hapax legomena) is a translator's headache. When a word appears only once, there is no other biblical context to help determine its meaning — the interpreter must rely on cognate languages, ancient translations, and context. The Hebrew Old Testament contains hundreds of hapax legomena. One famous example is the word translated 'gopher wood' in Genesis 6:14 (Hebrew: gofer) — it appears nowhere else in the Bible, and no one is certain what kind of wood it names. In the New Testament, Paul uses several hapax legomena, including theopneustos ('God-breathed,' 2 Timothy 3:16) — a word so rare that its precise meaning has been debated for centuries. Hapax legomena remind us that ancient languages contain gaps in our knowledge that no amount of scholarship can fully close.",
    significance: "Hapax legomena inject necessary humility into biblical interpretation. They remind us that translation is always an act of judgment, not certainty — and that honesty about what we do not know is more faithful than false confidence.",
    relatedTerms: ["Textual Criticism", "Exegesis", "Hermeneutics"],
    originalLanguage: "Greek: hapax legomenon (something said once), from hapax (once) + legomenon (being said)",
  },

  // ===================== CHURCH HISTORY (20) =====================
  {
    term: "Christendom",
    category: "Church History",
    oneLiner: "The historical era and cultural arrangement in which Christianity held dominant social, political, and institutional power.",
    paragraph: "Christendom began when Constantine legalized Christianity (Edict of Milan, 313) and accelerated when Theodosius made it the state religion (380). For over a thousand years, the church and the state were deeply intertwined — the church provided legitimacy, the state provided enforcement. Christendom produced cathedrals, universities, hospitals, and the Western legal tradition. It also produced the Inquisition, forced conversions, and the conflation of political power with spiritual authority. The Reformers critiqued many elements of Christendom but did not dismantle it — Lutheran, Reformed, and Anglican churches continued the pattern of state establishment. The end of Christendom is a defining reality of the modern West: the church no longer holds default cultural authority, and many theologians (Hauerwas, Newbigin, Dreher) argue this is an opportunity, not a tragedy.",
    significance: "Understanding Christendom is essential for reading the present moment. Much of the anxiety in American Christianity comes from the loss of Christendom's privileges — and much of the church's renewal depends on not trying to get them back.",
    relatedTerms: ["Reformation", "Supersessionism", "Fundamentalism"],
    originalLanguage: "Latin: Christianitas (the Christian world); English: Christendom (the domain of Christ)",
  },
  {
    term: "Reformation",
    category: "Church History",
    oneLiner: "The sixteenth-century movement that divided Western Christianity, led by Luther, Calvin, and others who challenged the Catholic Church's theology and authority.",
    paragraph: "The Reformation is conventionally dated from October 31, 1517, when Martin Luther posted his 95 Theses against the sale of indulgences in Wittenberg. But the Reformation was not one event or one man: it was a convergence of theological conviction (sola scriptura, sola fide, sola gratia), political opportunity (German princes seeking independence from Rome), technological revolution (Gutenberg's printing press), and genuine spiritual hunger. Luther, Calvin, Zwingli, and the Radical Reformers differed significantly among themselves. The Reformation produced Protestantism in all its diversity — Lutheran, Reformed, Anabaptist, Anglican — and provoked the Catholic Counter-Reformation (Council of Trent, 1545-1563). It permanently fractured Western Christianity and shaped the modern world's understanding of conscience, authority, and the individual's relationship to institutions.",
    significance: "The Reformation is not ancient history; its debates (Scripture vs. tradition, faith vs. works, church authority vs. individual conscience) are alive in every denomination. Protestantism cannot understand itself without understanding the break that created it.",
    relatedTerms: ["Counter-Reformation", "Indulgence", "Scholasticism"],
    originalLanguage: "Latin: reformatio (a reshaping, renewal); the Reformers saw themselves restoring, not innovating",
  },
  {
    term: "Counter-Reformation",
    category: "Church History",
    oneLiner: "The Catholic Church's internal reform and response to Protestantism in the sixteenth and seventeenth centuries.",
    paragraph: "The Counter-Reformation (also called the Catholic Reformation) was the Roman Catholic Church's answer to the crisis provoked by Luther, Calvin, and the Protestant movement. Its centerpiece was the Council of Trent (1545-1563), which reaffirmed Catholic doctrines on justification, the sacraments, Scripture and tradition, and purgatory — while also addressing the corruption and abuses that had fueled Protestant critique. The Jesuits (Society of Jesus, founded by Ignatius of Loyola in 1540) became the intellectual and missionary vanguard of the Counter-Reformation, establishing schools, producing scholarship, and evangelizing from Asia to the Americas. The Counter-Reformation was not merely reactive; it included genuine spiritual renewal — Teresa of Avila and John of the Cross reformed the Carmelites, and the Baroque art and architecture that followed expressed a renewed Catholic confidence.",
    significance: "The Counter-Reformation shaped modern Catholicism as decisively as the Reformation shaped Protestantism. Without it, the story of Christianity becomes one-sided — as if only the Protestant wing renewed itself.",
    relatedTerms: ["Reformation", "Scholasticism", "Indulgence"],
    originalLanguage: "The term Gegenreformation (Counter-Reformation) was coined by German historian Leopold von Ranke in the nineteenth century",
  },
  {
    term: "Scholasticism",
    category: "Church History",
    oneLiner: "The medieval intellectual tradition that used philosophical reasoning, especially Aristotelian logic, to systematize and defend Christian doctrine.",
    paragraph: "Scholasticism dominated European theology and philosophy from roughly the eleventh to the sixteenth century. Its method was the disputatio: a question is posed, objections are listed, a response is given with careful distinctions, and the objections are answered. Thomas Aquinas's Summa Theologiae is the supreme example. Scholasticism's great achievement was the integration of faith and reason — the conviction that theology could be rigorous, systematic, and philosophically defensible. Its great danger was excessive abstraction: questions like 'how many angels can dance on the head of a pin?' became a caricature of the method (though no medieval theologian actually asked that question). The Reformers criticized scholasticism for burying the gospel under philosophical apparatus, but later Protestant theology (Protestant scholasticism) adopted many of the same methods. The Thomistic revival (Leo XIII, Aeterni Patris, 1879) reestablished scholasticism as the dominant Catholic intellectual framework.",
    significance: "Scholasticism established the vocabulary and method of Western theology. Even its critics think in categories it created. Understanding it is essential for reading any systematic theology written before 1900.",
    relatedTerms: ["Reformation", "Natural Theology", "Ontology"],
    originalLanguage: "Latin: scholasticus (belonging to a school); from Greek: scholastikos; the schola was the medieval university",
  },
  {
    term: "Monasticism",
    category: "Church History",
    oneLiner: "The Christian tradition of withdrawing from ordinary society to pursue God through prayer, poverty, chastity, and community.",
    paragraph: "Monasticism began in the Egyptian desert in the third century with hermits like Anthony of Egypt (c. 251-356), who withdrew into solitude to fight spiritual battles. Pachomius (c. 292-348) organized the first communal monasteries. Benedict of Nursia (c. 480-547) wrote the Rule that became the foundation of Western monasticism: ora et labora (pray and work). Monasteries became the primary preservers of learning, culture, and literacy during the early Middle Ages — without monks copying manuscripts, much of classical and biblical literature would have been lost. The monastic tradition generated multiple orders (Benedictines, Franciscans, Dominicans, Cistercians), each with a different emphasis. The Reformation generally rejected monasticism as works-righteousness, though the Taize community and new monastic movements (Shane Claiborne, Jonathan Wilson-Hartgrove) have revived interest among Protestants.",
    significance: "Monasticism is the church's permanent reminder that following Jesus can require leaving things behind. Even those who do not take monastic vows are challenged by the tradition's claim that prayer is work and that comfort can be an obstacle to God.",
    relatedTerms: ["Asceticism", "Contemplation", "Reformation"],
    originalLanguage: "Greek: monachos (solitary one), from monos (alone); Latin: monasterium (a place for monks)",
  },
  {
    term: "Gnosticism",
    category: "Church History",
    oneLiner: "An early heretical movement that claimed salvation comes through secret spiritual knowledge and that the material world was created by an inferior deity.",
    paragraph: "Gnosticism was the most persistent theological threat to early Christianity. Gnostic systems varied widely, but most shared a core narrative: the material world is the flawed creation of a lesser god (the Demiurge), and the true God is entirely spiritual. Humans carry a divine spark trapped in matter, and salvation means escaping the material prison through gnosis — secret knowledge of the true God. The implications for Christianity were devastating: if matter is evil, the Incarnation is impossible (God would not take on flesh), and the resurrection of the body is undesirable. Irenaeus (Against Heresies, c. 180) mounted the definitive early Christian response, insisting on the goodness of creation, the unity of the Creator and Redeemer, and the authority of apostolic tradition over esoteric claims. The Nag Hammadi library, discovered in 1945, provided primary Gnostic texts (Gospel of Thomas, Gospel of Philip) that deepened scholarly understanding.",
    significance: "Gnosticism is not merely an ancient heresy; its DNA reappears whenever Christianity becomes anti-body, anti-material, or addicted to insider knowledge. The church's rejection of Gnosticism was a defense of the goodness of creation itself.",
    relatedTerms: ["Arianism", "Incarnation", "Christendom"],
    originalLanguage: "Greek: gnosis (knowledge); gnostikos (having knowledge, knowing)",
  },
  {
    term: "Arianism",
    category: "Church History",
    oneLiner: "The fourth-century heresy that denied the full divinity of Christ, teaching that the Son was the first and greatest created being.",
    paragraph: "Arius, a presbyter in Alexandria (c. 256-336), argued that 'there was a time when the Son was not' — that Christ was created by the Father before all other things and is therefore not co-eternal or co-equal with God. This struck at the heart of Christian worship and salvation: if Christ is not fully God, then God did not personally enter the human condition, and the one who saves us is a creature. The Council of Nicaea (325) condemned Arianism and produced the Nicene Creed, which affirms that the Son is homoousios (of the same substance) as the Father — 'true God from true God, begotten, not made.' Athanasius of Alexandria spent his career defending Nicene orthodoxy against Arian and semi-Arian opponents, enduring five exiles for his position. The Council of Constantinople (381) reaffirmed and expanded the creed, settling the matter for orthodox Christianity.",
    significance: "Arianism forced the church to articulate what it believed about Christ with philosophical precision. The answer — that Christ is fully God — is not a philosophical luxury but a pastoral necessity: only God can save, and only God can bridge the infinite gap between Creator and creature.",
    relatedTerms: ["Trinity", "Filioque", "Gnosticism"],
    originalLanguage: "Named for Arius (Greek: Areios); the key term: homoousios (Greek: of the same substance/being)",
  },
  {
    term: "Pelagianism",
    category: "Church History",
    oneLiner: "The heresy that humans can achieve salvation through their own moral effort without the necessity of divine grace.",
    paragraph: "Pelagius, a British monk active in Rome around 400 AD, taught that Adam's sin affected only Adam — it did not corrupt human nature. Every person is born with the same moral freedom Adam had: the ability to choose good or evil without any inherited deficiency. Grace is helpful but not strictly necessary; it consists mainly in God's law and Christ's example. Augustine fought this position with everything he had, insisting that the fall damaged the will so fundamentally that without grace, no one can please God. The Council of Carthage (418) and the Council of Ephesus (431) condemned Pelagianism. Semi-Pelagianism — the milder position that humans can take the first step toward God on their own, with grace completing the process — was condemned at the Council of Orange (529). Despite these condemnations, Pelagian instincts persist: every time a church communicates that being good is enough, Pelagius smiles.",
    significance: "Pelagianism is the default religion of the human heart: 'I can do this on my own if I try hard enough.' Its condemnation established that Christianity is fundamentally about grace, not effort — and that this distinction is not negotiable.",
    relatedTerms: ["Original Sin", "Prevenient Grace", "Total Depravity"],
    originalLanguage: "Named for Pelagius (Latin/Celtic name, possibly meaning 'of the sea'); the debates center on gratia (Latin: grace) and liberum arbitrium (Latin: free will)",
  },
  {
    term: "Donatism",
    category: "Church History",
    oneLiner: "The fourth-century schism that insisted the validity of the sacraments depends on the moral purity of the priest who administers them.",
    paragraph: "The Donatist controversy erupted in North Africa after the Great Persecution (303-305). Some clergy had surrendered (traditor, 'hander-over') copies of Scripture to Roman authorities to save their lives. When the persecution ended, the question was fierce: could these lapsed clergy still validly perform baptisms and ordinations? The Donatists said no — a sacrament administered by an unworthy minister is invalid. The church must be a community of the pure. Augustine argued the opposite: the sacraments derive their validity from Christ, not from the minister. A baptism is valid regardless of the priest's personal holiness because Christ is the true minister of every sacrament. The church is a corpus permixtum (mixed body) of saints and sinners until the final judgment separates them. Augustine's position prevailed and became the dominant Western view, though Donatist impulses recur whenever a community seeks to create a 'pure church.'",
    significance: "Donatism raises a question every congregation faces: does the minister's character invalidate the ministry? Augustine's answer protected the church from the impossible standard of moral perfection as a precondition for God's work.",
    relatedTerms: ["Sacrament", "Pelagianism", "Reformation"],
    originalLanguage: "Named for Donatus Magnus, Donatist bishop of Carthage; Latin: traditor (one who hands over), the root of English 'traitor'",
  },
  {
    term: "Iconoclasm",
    category: "Church History",
    oneLiner: "The destruction of religious images, driven by the belief that icons violate the commandment against graven images.",
    paragraph: "Iconoclasm tore the Byzantine Empire apart in two waves (726-787, 814-842). Emperor Leo III ordered the removal and destruction of religious icons, arguing they violated the second commandment and bordered on idolatry. Defenders of icons (iconodules), led by John of Damascus, argued that the Incarnation had changed everything: because God became visible in Christ, it is legitimate — even necessary — to depict Christ in art. To refuse images is to deny the reality of the Incarnation. The Second Council of Nicaea (787) affirmed the veneration (not worship) of icons, distinguishing between latreia (worship due to God alone) and proskynesis (veneration/honor given to images as windows to the divine). Iconoclasm resurfaced during the Reformation — Zwingli's Zurich stripped churches bare, and the Puritans followed. The debate endures: is the visual a legitimate vehicle for the sacred, or an obstacle to it?",
    significance: "Iconoclasm is ultimately a debate about whether matter can carry the sacred. The church's defense of icons is an extension of its defense of the Incarnation: if God entered the material world, then the material world can point back to God.",
    relatedTerms: ["Incarnation", "Reformation", "Christendom"],
    originalLanguage: "Greek: eikon (image) + klaein (to break); eikonoklastes (image-breaker)",
  },
  {
    term: "Filioque",
    category: "Church History",
    oneLiner: "The Western addition to the Nicene Creed stating that the Holy Spirit proceeds from the Father 'and the Son,' which became a primary cause of the East-West schism.",
    paragraph: "The original Nicene-Constantinopolitan Creed (381) says the Spirit 'proceeds from the Father.' Western churches gradually added filioque ('and the Son'), first in Spain (Third Council of Toledo, 589), eventually in Rome (1014). The Eastern churches objected on two grounds: theologically, it subordinates the Spirit and distorts the Trinity's internal relations (the Father alone is the source of the Godhead); procedurally, no regional church has the authority to alter an ecumenical creed unilaterally. The Filioque became a primary cause of the Great Schism (1054) between the Roman Catholic and Eastern Orthodox churches. Modern ecumenical dialogue has made progress — some Western theologians acknowledge the addition was procedurally illegitimate, and some Orthodox theologians allow that the Spirit proceeds from the Father 'through' the Son — but the division persists.",
    significance: "The Filioque is the theological fracture that divided Christianity's two oldest branches. It demonstrates that words in a creed are not academic — they carry the weight of centuries and the unity (or division) of the church.",
    relatedTerms: ["Trinity", "Arianism", "Christendom"],
    originalLanguage: "Latin: filioque (and from the Son), from filius (son) + que (and); Greek: ekporeusis (procession)",
  },
  {
    term: "Indulgence",
    category: "Church History",
    oneLiner: "A grant by the Catholic Church reducing the temporal punishment due for sins already forgiven, whose sale was a catalyst for the Reformation.",
    paragraph: "An indulgence, properly understood, is the remission of temporal punishment that remains after a sin has been forgiven through confession. The theology assumes a distinction between the guilt of sin (removed by absolution) and the temporal consequences (which must still be satisfied, in this life or in purgatory). The church, drawing on the 'treasury of merit' — the superabundant merits of Christ and the saints — claimed authority to apply this treasury to the faithful through indulgences. The corruption came when indulgences were sold for revenue. Johann Tetzel's famous line — 'As soon as the coin in the coffer rings, the soul from purgatory springs' — provoked Luther's 95 Theses (1517) and ignited the Reformation. The Council of Trent retained the theology of indulgences but banned their sale. The Catholic Church still grants indulgences, though the practice is little understood even among Catholics.",
    significance: "Indulgences triggered the Reformation, but the deeper issue was authority: who has the power to forgive, and can that power be commercialized? The question persists whenever the church conflates spiritual goods with financial transactions.",
    relatedTerms: ["Reformation", "Counter-Reformation", "Simony"],
    originalLanguage: "Latin: indulgentia (remission, forgiveness, kindness); the theological framework involves meritum (merit) and thesaurus meritorum (treasury of merits)",
  },
  {
    term: "Simony",
    category: "Church History",
    oneLiner: "The buying or selling of spiritual privileges, church offices, or sacraments — named after Simon Magus, who tried to purchase the power of the Holy Spirit.",
    paragraph: "In Acts 8:18-24, Simon the magician offers Peter money for the ability to confer the Holy Spirit. Peter's response is severe: 'May your money perish with you, because you thought you could buy the gift of God with money.' Simony became one of the most persistent corruptions in church history. In the medieval period, church offices (bishoprics, abbacies) were routinely bought and sold — a bishop's appointment came with substantial land, revenue, and political power, and ambitious families treated them as investments. The Gregorian Reform (eleventh century) attacked simony as part of a broader effort to free the church from secular control. The Investiture Controversy (1076-1122) was, at bottom, a fight over who had the right to appoint bishops — and whether that appointment could be purchased.",
    significance: "Simony exposes what happens when the church becomes an institution that can be exploited for profit. It is the permanent temptation of every religious organization that handles money, influence, or power — which is all of them.",
    relatedTerms: ["Indulgence", "Reformation", "Christendom"],
    originalLanguage: "Latin: simonia, named for Simon Magus (Greek: Simon ho Magos, Acts 8:9-24)",
  },
  {
    term: "Inquisition",
    category: "Church History",
    oneLiner: "A series of Catholic Church institutions established to identify, try, and punish heresy, most notably active from the twelfth through the eighteenth centuries.",
    paragraph: "The Inquisition was not a single institution but several, spanning centuries and continents. The Medieval Inquisition (from 1184) targeted Cathars and Waldensians in southern France and northern Italy. The Spanish Inquisition (established 1478) focused on conversos — Jews and Muslims who had converted to Christianity — suspected of secretly practicing their original faiths. The Roman Inquisition (1542) was created to combat Protestantism and later tried Galileo. Methods included interrogation under oath, the use of torture (permitted by Innocent IV in 1252), and, in severe cases, execution by the secular arm (burning at the stake). Historical assessment requires honesty: the Inquisition was real, it inflicted suffering, and it cannot be explained away. It also requires perspective: execution rates were lower than popular imagination suggests, and secular courts of the same era were often harsher.",
    significance: "The Inquisition is the church's most troubling inheritance. It demonstrates what happens when the church acquires coercive power and uses it to enforce belief — a direct contradiction of the gospel it claimed to protect.",
    relatedTerms: ["Christendom", "Reformation", "Donatism"],
    originalLanguage: "Latin: inquisitio (inquiry, investigation), from inquirere (to inquire into); the formal name was Sanctum Officium (Holy Office)",
  },
  {
    term: "Great Awakening",
    category: "Church History",
    oneLiner: "A series of Protestant revival movements in the eighteenth and nineteenth centuries, primarily in Britain and North America, emphasizing personal conversion and emotional preaching.",
    paragraph: "The First Great Awakening (1730s-1740s) swept through the American colonies and Britain, led by Jonathan Edwards, George Whitefield, and John Wesley. Edwards's sermon 'Sinners in the Hands of an Angry God' (1741) is the iconic text, but the movement was broader: Whitefield's open-air preaching drew thousands, and Wesley's itinerant ministry laid the groundwork for Methodism. The Second Great Awakening (1790s-1840s) was even larger, producing camp meetings, the temperance movement, abolitionism, and a host of new denominations and reform movements. The revivals democratized American Christianity — authority shifted from educated clergy to traveling preachers, and conversion became a personal decision rather than a communal inheritance. Charles Finney's 'new measures' (anxious bench, protracted meetings) formalized revivalism as a method, for better and worse.",
    significance: "The Great Awakenings shaped the DNA of American Protestantism: the emphasis on personal decision, emotional experience, and the individual's direct access to God — for both its vitality and its blind spots — traces to these movements.",
    relatedTerms: ["Fundamentalism", "Dispensationalism", "Reformation"],
    originalLanguage: "English; the revivalist vocabulary (conviction, conversion, new birth) draws heavily on Puritan theology",
  },
  {
    term: "Fundamentalism",
    category: "Church History",
    oneLiner: "The early twentieth-century movement that defended traditional Protestant doctrines against theological liberalism and modernism.",
    paragraph: "Fundamentalism takes its name from The Fundamentals, a series of ninety essays published between 1910 and 1915, defending doctrines including the virgin birth, the bodily resurrection, the inerrancy of Scripture, and the substitutionary atonement. The movement arose in response to theological liberalism, which questioned miracles, accepted Darwinian evolution, and applied historical criticism to the Bible. The Scopes Trial (1925) publicly associated fundamentalism with anti-intellectualism, and the movement retreated from mainstream culture for decades. It re-emerged in the late 1970s as the Religious Right (Jerry Falwell, the Moral Majority). The term 'fundamentalist' has since been applied (often pejoratively) to rigid movements in any religion, but its original meaning was specific: a defense of the non-negotiable core of Protestant Christianity against modernist erosion.",
    significance: "Fundamentalism asked a legitimate question: are there truths so essential that surrendering them means surrendering Christianity itself? Its weakness was not the question but the posture — a defensiveness that often confused the gospel's irreducible claims with culturally contingent positions.",
    relatedTerms: ["Neo-Orthodoxy", "Great Awakening", "Dispensationalism"],
    originalLanguage: "English, from The Fundamentals (1910-1915); the term was first used by Curtis Lee Laws in 1920",
  },
  {
    term: "Neo-Orthodoxy",
    category: "Church History",
    oneLiner: "A twentieth-century theological movement, led by Karl Barth, that rejected liberal theology's optimism while refusing fundamentalism's rigid biblicism.",
    paragraph: "Neo-Orthodoxy — also called dialectical theology or crisis theology — erupted after World War I shattered liberal Protestantism's confidence in human progress. Karl Barth's commentary on Romans (1919, revised 1922) fell, in the Catholic theologian Karl Adam's famous description, 'like a bomb on the playground of the theologians.' Barth insisted on the absolute otherness of God, the priority of revelation over reason, and the centrality of Christ as the Word of God. He rejected both liberal theology (which had domesticated God into a helper for human culture) and fundamentalist biblicism (which, he argued, made the Bible an idol rather than a witness to Christ). Emil Brunner, Rudolf Bultmann, and Reinhold Niebuhr are also associated with the movement, though each differed significantly from Barth. Neo-Orthodoxy dominated Protestant theology from roughly 1920 to 1960 and remains deeply influential.",
    significance: "Neo-Orthodoxy saved Protestantism from the wreckage of liberal optimism without surrendering intellectual seriousness. It demonstrated that rigorous theology and robust faith are not enemies.",
    relatedTerms: ["Fundamentalism", "Liberation Theology", "Reformation"],
    originalLanguage: "The term is English, imposed by others; Barth preferred 'theology of the Word of God.' The German context is decisive: dialektische Theologie (dialectical theology), Krisistheologie (crisis theology)",
  },
  {
    term: "Liberation Theology",
    category: "Church History",
    oneLiner: "A theological movement, originating in Latin America in the 1960s, that reads Scripture from the perspective of the poor and oppressed.",
    paragraph: "Liberation theology emerged from the social upheaval of Latin America, crystallized by Gustavo Gutierrez's A Theology of Liberation (1971). Its core claim is that God has a 'preferential option for the poor' — that theology must begin not with abstract concepts but with the concrete suffering of the marginalized. The exodus becomes the paradigm: God liberates the enslaved. Jesus' proclamation in Luke 4:18 ('good news to the poor') becomes programmatic. Liberation theology was controversial for its use of Marxist social analysis (the Vatican's Congregation for the Doctrine of the Faith issued warnings in 1984 and 1986) and for its challenge to established power structures, including those within the Catholic Church itself. Related movements include Black theology (James Cone), feminist theology (Rosemary Radford Ruether), and Minjung theology (South Korea). Pope Francis, shaped by the Latin American church, has revived key themes of the movement.",
    significance: "Liberation theology forced the global church to ask: whose voice is centered in our theology? If theology is written only by the comfortable, it will inevitably serve the comfortable. The movement's lasting contribution is the question, even when specific answers are debated.",
    relatedTerms: ["Neo-Orthodoxy", "Christendom", "Fundamentalism"],
    originalLanguage: "Spanish: teologia de la liberacion; Latin: liberatio (a setting free); the key phrase is opcion preferencial por los pobres (preferential option for the poor)",
  },
  {
    term: "Dispensationalism",
    category: "Church History",
    oneLiner: "A theological system that divides biblical history into distinct eras (dispensations) in which God relates to humanity under different arrangements.",
    paragraph: "Dispensationalism was developed by John Nelson Darby (1800-1882) and popularized through the Scofield Reference Bible (1909). It divides history into typically seven dispensations (innocence, conscience, government, promise, law, grace, kingdom) and draws a sharp distinction between Israel and the church — God has separate purposes and programs for each. This framework generates a distinctive eschatology: a pretribulational rapture (the church is removed before a seven-year tribulation), a literal thousand-year reign of Christ in Jerusalem, and the restoration of national Israel with a rebuilt temple. The Left Behind novel series brought dispensationalist eschatology into popular culture. Critics (covenant theology, progressive dispensationalism) argue that the Israel/church distinction is overdrawn and that the system imposes categories on Scripture rather than deriving them from it.",
    significance: "Dispensationalism shaped American evangelical eschatology more than any other system. Its influence on Christian Zionism, end-times speculation, and popular culture remains enormous — and understanding it is necessary for understanding the American church.",
    relatedTerms: ["Eschatology", "Supersessionism", "Great Awakening"],
    originalLanguage: "Greek: oikonomia (household management, stewardship, Ephesians 1:10); English 'dispensation' from Latin dispensatio (a weighing out, management)",
  },
  {
    term: "Supersessionism",
    category: "Church History",
    oneLiner: "The belief that the church has replaced Israel as God's covenant people, rendering God's promises to Israel obsolete.",
    paragraph: "Supersessionism (also called replacement theology) holds that the church is the 'new Israel' and that God's covenant with the Jewish people has been superseded by the new covenant in Christ. This view was dominant in Christian theology from the second century (Justin Martyr, Adversus Judaeos) through the modern period and contributed to a long history of Christian anti-Judaism. Biblical support is claimed from passages like Galatians 3:28-29 and Hebrews 8:13. Critics point to Romans 9-11, where Paul explicitly argues that God has not rejected Israel: 'the gifts and the calling of God are irrevocable' (Romans 11:29). Post-Holocaust theology has powerfully challenged supersessionism, and many traditions have issued formal repudiations. Alternatives include dual-covenant theology (God has separate covenants with Jews and Christians) and the 'olive tree' model of Romans 11 (Gentile believers are grafted into Israel's story, not a replacement of it).",
    significance: "Supersessionism is not an abstract theological opinion; it has blood on its hands. The church's claim to have replaced Israel provided theological cover for centuries of anti-Jewish persecution. Repudiating it is a matter of honesty and repentance.",
    relatedTerms: ["Dispensationalism", "Christendom", "Reformation"],
    originalLanguage: "Latin: supersedere (to sit above, to replace); the theological term was coined in modern scholarship to name a pattern present since the patristic era",
  },

  // ===================== WORSHIP & PRACTICE (15) =====================
  {
    term: "Liturgy",
    category: "Worship & Practice",
    oneLiner: "The structured order of public worship, including prayers, readings, hymns, and sacraments, that shapes a community's encounter with God.",
    paragraph: "Liturgy literally means 'the work of the people' — it is not a performance by the clergy but a communal act. Historical liturgies (the Divine Liturgy of John Chrysostom, the Roman Rite, the Book of Common Prayer) follow a pattern rooted in synagogue worship and early Christian practice: gathering, word (Scripture readings and sermon), table (Eucharist), and sending. The Reformers simplified medieval liturgy but did not abandon structure: Calvin's Geneva, Luther's Wittenberg, and Cranmer's England each produced distinctive worship orders. Contemporary evangelical worship tends to minimize fixed liturgy in favor of spontaneity, though a 'liturgy' exists whether it is written down or not — every church follows a pattern, even if that pattern is 'three songs and a sermon.' The liturgical renewal movement of the twentieth century has drawn many evangelicals back toward historic forms.",
    significance: "Liturgy is the church's oldest claim that worship shapes belief. What a community prays, sings, and recites week after week forms its theology more deeply than any sermon. This is why arguments about worship style are never merely aesthetic.",
    relatedTerms: ["Eucharist", "Lectionary", "Doxology"],
    originalLanguage: "Greek: leitourgia (public service, work of the people), from leitos (public) + ergon (work)",
  },
  {
    term: "Eucharist",
    category: "Worship & Practice",
    oneLiner: "The sacrament of bread and wine in which Christians participate in the body and blood of Christ, also called Communion or the Lord's Supper.",
    paragraph: "The Eucharist is the most practiced and most debated act of Christian worship. Jesus instituted it at the Last Supper: 'This is my body... this is my blood' (Matthew 26:26-28). The question of what 'this is' means has divided the church. Catholic transubstantiation holds that the bread and wine become Christ's body and blood in substance while retaining the appearance of bread and wine. Luther's view (sometimes called consubstantiation, though he rejected the term) holds that Christ is truly present 'in, with, and under' the elements. Calvin's spiritual presence view holds that Christ is genuinely but spiritually present through the Holy Spirit. Zwingli's memorial view holds that the Supper is a remembrance, not a conveyance of grace. Each position claims biblical and patristic support. What unites all traditions is that this meal is commanded, central, and communal — it is not a private devotion but the act of a gathered body.",
    significance: "The Eucharist is the one act Jesus specifically commanded his followers to repeat. How a church understands it reveals what it believes about grace, presence, community, and the body — both Christ's and the church's.",
    relatedTerms: ["Sacrament", "Liturgy", "Baptism"],
    originalLanguage: "Greek: eucharistia (thanksgiving), from eu (well/good) + charizesthai (to show favor); Latin: communio (sharing in common)",
  },
  {
    term: "Baptism",
    category: "Worship & Practice",
    oneLiner: "The rite of initiation into the Christian faith, performed with water in the name of the Father, Son, and Holy Spirit.",
    paragraph: "Baptism is the entry point of the Christian life, commanded by Jesus in the Great Commission (Matthew 28:19). The church has debated its mode (immersion, pouring, sprinkling), its subjects (believers only, or infants of believing families), and its meaning (sacramental conveyance of grace, covenantal sign, public declaration of faith). Baptists and Anabaptists insist on believer's baptism by immersion — the candidate must profess faith before baptism. Reformed, Lutheran, Catholic, and Orthodox traditions practice infant baptism on the basis of covenant theology: children of believers are included in the covenant community, as circumcision included infants in Israel. Paul connects baptism to death and resurrection (Romans 6:3-4) — going under the water signifies dying with Christ; rising out signifies new life. All major traditions agree that baptism is not merely symbolic but genuinely initiatory — it marks the beginning of life in Christ and in his body, the church.",
    significance: "Baptism is the one rite almost all Christians share, yet it is also a source of division. Understanding its theology is essential for every Christian who wants to know what happened — or will happen — when they go through the water.",
    relatedTerms: ["Sacrament", "Eucharist", "Confirmation"],
    originalLanguage: "Greek: baptizo (to immerse, to dip, to wash); baptisma (the act of baptism)",
  },
  {
    term: "Sacrament",
    category: "Worship & Practice",
    oneLiner: "A visible sign of an invisible grace — a physical act through which God conveys spiritual reality to the participant.",
    paragraph: "Augustine's definition — 'a visible sign of an invisible grace' — has shaped the church's understanding for sixteen centuries. The Catholic and Orthodox traditions recognize seven sacraments: baptism, confirmation, Eucharist, penance, anointing of the sick, holy orders, and matrimony. The Reformers reduced the number to two (baptism and the Lord's Supper), arguing that only these two were directly instituted by Christ. The deeper question is whether sacraments actually convey grace (the Catholic and Lutheran view: grace is transmitted through the physical act when received with faith) or whether they are signs that confirm grace already given (the Reformed view) or symbols that commemorate grace (the memorial view). The sacramental principle — that God uses physical, material means to accomplish spiritual purposes — is itself a claim about the nature of reality: matter is not opposed to spirit but can be its vehicle.",
    significance: "The sacraments are where theology becomes tangible. They insist that Christianity is not a religion of pure ideas but of water, bread, wine, oil, and the laying on of hands. God meets us in the material, not despite it.",
    relatedTerms: ["Ordinance", "Eucharist", "Baptism"],
    originalLanguage: "Latin: sacramentum (a sacred oath, a mystery); translates Greek: mysterion (mystery, hidden reality)",
  },
  {
    term: "Ordinance",
    category: "Worship & Practice",
    oneLiner: "A term used primarily by Baptists and other free-church traditions for baptism and the Lord's Supper, emphasizing obedience to Christ's command rather than the conveyance of grace.",
    paragraph: "The choice between 'sacrament' and 'ordinance' is a theological statement. Those who prefer 'ordinance' wish to avoid the implication that the physical act itself conveys grace — water does not regenerate, bread does not become Christ's body. Instead, baptism and the Lord's Supper are acts of obedience commanded (ordained) by Christ. The believer participates not to receive grace through the act but to publicly declare faith and remember Christ's work. Baptists, Churches of Christ, and many nondenominational evangelicals use this language. The distinction is not trivial: it reflects a different understanding of how God works in the world — whether through physical means (sacramental theology) or directly through the Spirit apart from material elements (ordinance theology). In practice, many churches use the terms loosely, and the actual experience of worship may be closer between traditions than the theological language suggests.",
    significance: "The sacrament/ordinance distinction reveals a deeper question: does God work through created things, or only despite them? The answer shapes not just worship but a church's entire relationship to the material world.",
    relatedTerms: ["Sacrament", "Baptism", "Eucharist"],
    originalLanguage: "Latin: ordinare (to set in order, to appoint, to decree); the term emphasizes Christ's command rather than the element's power",
  },
  {
    term: "Catechism",
    category: "Worship & Practice",
    oneLiner: "A structured summary of Christian teaching, usually in question-and-answer format, used to instruct new believers and children.",
    paragraph: "Catechesis — teaching the faith systematically — is as old as the church. The earliest catechisms were oral instruction given to converts before baptism. The Reformation produced the great written catechisms: Luther's Small Catechism (1529) for households and his Large Catechism for pastors, Calvin's Geneva Catechism (1542), the Heidelberg Catechism (1563), and the Westminster Shorter and Larger Catechisms (1647-1648). The Catholic Church produced the Roman Catechism after Trent (1566) and the Catechism of the Catholic Church (1992). The question-and-answer format is deliberate: it assumes that the learner carries real questions and that the faith provides real answers. The Heidelberg Catechism's first question — 'What is your only comfort in life and in death?' — is arguably the finest opening sentence in the history of Christian education.",
    significance: "Catechism is the church's answer to the problem of theological illiteracy. Without systematic instruction, the faith is passed on as fragments — a verse here, a feeling there — without the architecture that holds them together.",
    relatedTerms: ["Confirmation", "Liturgy", "Lectionary"],
    originalLanguage: "Greek: katechesis (oral instruction), from katechein (to sound down, to instruct by word of mouth); Latin: catechismus",
  },
  {
    term: "Lectionary",
    category: "Worship & Practice",
    oneLiner: "A systematic schedule of Scripture readings assigned to each Sunday and holy day across the church year.",
    paragraph: "A lectionary ensures that the church hears the breadth of Scripture rather than only the preacher's favorite passages. The Revised Common Lectionary (RCL), used by most mainline Protestant and many Catholic congregations, operates on a three-year cycle (Year A: Matthew; Year B: Mark; Year C: Luke; John is read in all three years, especially during Lent and Easter). Each Sunday includes four readings: Old Testament, Psalm, Epistle, and Gospel. The lectionary follows the church year — Advent, Christmas, Epiphany, Lent, Easter, Pentecost, and Ordinary Time — so the rhythm of worship rehearses the shape of the gospel narrative annually. Non-lectionary churches (most evangelical and Baptist congregations) typically follow a topical or book-by-book preaching plan chosen by the pastor. Each approach has strengths: the lectionary guarantees breadth; free preaching allows responsive depth.",
    significance: "The lectionary is the church's discipline against selectivity. Left to our own devices, we read the passages we like and avoid the ones that challenge us. The lectionary will not let us.",
    relatedTerms: ["Liturgy", "Catechism", "Doxology"],
    originalLanguage: "Latin: lectionarium (a book of readings), from lectio (a reading, a lesson); the practice descends from the synagogue's Torah reading cycle",
  },
  {
    term: "Doxology",
    category: "Worship & Practice",
    oneLiner: "A short hymn or formula of praise to God, especially the familiar 'Praise God from whom all blessings flow.'",
    paragraph: "Doxology means 'a word of glory' — it is praise distilled to its essence. The most familiar in English-speaking Protestantism is the 'Common Doxology' by Thomas Ken (1674): 'Praise God, from whom all blessings flow; praise Him, all creatures here below; praise Him above, ye heavenly host; praise Father, Son, and Holy Ghost. Amen.' The Gloria Patri ('Glory be to the Father, and to the Son, and to the Holy Ghost') is the ancient Trinitarian doxology recited in every liturgical tradition. Paul's letters often erupt into doxology mid-argument (Romans 11:33-36, Ephesians 3:20-21) — theology at its best cannot help becoming worship. The doxology is where systematic theology and lived faith meet: it says what is true about God and says it with joy.",
    significance: "Doxology is the test of all theology: if a doctrine cannot be sung, something may be wrong with it. The church's deepest convictions have always found their way into praise.",
    relatedTerms: ["Liturgy", "Benediction", "Invocation"],
    originalLanguage: "Greek: doxologia (a speaking of glory), from doxa (glory, honor) + logos (word/speech)",
  },
  {
    term: "Benediction",
    category: "Worship & Practice",
    oneLiner: "A pronouncement of God's blessing, typically given at the close of a worship service.",
    paragraph: "The benediction is the last word spoken in worship — and it matters what that word is. The most ancient benediction is the Aaronic Blessing from Numbers 6:24-26: 'The Lord bless you and keep you; the Lord make his face shine upon you and be gracious to you; the Lord turn his face toward you and give you peace.' Paul closes his letters with benedictions: 'The grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with you all' (2 Corinthians 13:14). The benediction is not a prayer (addressed to God) but a declaration (addressed to the people, from God). The minister speaks it with raised hands, embodying the posture of pronouncement. The congregation does not bow their heads for the benediction — they receive it, eyes open, because it is good news spoken over them.",
    significance: "The benediction sends the congregation into the world carrying God's spoken word over them. It is the bridge between worship and Monday morning — the last thing the church hears before it scatters.",
    relatedTerms: ["Doxology", "Invocation", "Liturgy"],
    originalLanguage: "Latin: benedictio (a speaking well), from bene (well) + dicere (to speak); translates Hebrew: berakhah (blessing)",
  },
  {
    term: "Invocation",
    category: "Worship & Practice",
    oneLiner: "A prayer at the opening of worship that calls upon God's presence and asks for the Spirit's guidance.",
    paragraph: "The invocation marks the beginning of worship by acknowledging that the gathered community cannot worship rightly without God's initiative. It is not a warm-up or a throat-clearing — it is a theological claim that God must be present for worship to be real. In liturgical traditions, the invocation often includes the Trinitarian formula ('In the name of the Father, and of the Son, and of the Holy Spirit') and a petition for the Spirit to open hearts and illuminate Scripture. In free-church traditions, the invocation may be an extemporaneous prayer. The term also applies more broadly: an epiclesis is the invocation of the Holy Spirit over the bread and wine in the Eucharist — the moment when the community asks God to do something with ordinary elements that ordinary elements cannot do on their own.",
    significance: "The invocation confesses that worship is not a human production but a divine-human encounter. Without it, the service risks becoming a performance for an audience rather than an offering to God.",
    relatedTerms: ["Benediction", "Doxology", "Liturgy"],
    originalLanguage: "Latin: invocatio (a calling upon), from invocare (to call upon); the epiclesis (Greek: epiklesis, 'calling upon') is a specific liturgical invocation of the Spirit",
  },
  {
    term: "Absolution",
    category: "Worship & Practice",
    oneLiner: "The formal declaration that a penitent person's sins are forgiven, pronounced by a priest or minister.",
    paragraph: "Absolution is the church's authorized pronouncement of what God has done: 'Your sins are forgiven.' In Catholic theology, absolution is an essential part of the sacrament of penance (confession): the priest, acting in persona Christi (in the person of Christ), speaks the words of forgiveness with sacramental authority. The words are indicative, not optative: 'I absolve you,' not 'May God forgive you.' Lutheran and Anglican traditions retain a form of absolution in corporate worship and private confession. Reformed and Baptist traditions typically avoid the language of absolution, preferring to announce forgiveness as a declaration of the gospel rather than a priestly act. The debate turns on whether ministers have the authority to pronounce forgiveness or only to announce it — Jesus' words to the disciples ('If you forgive anyone's sins, their sins are forgiven,' John 20:23) are the contested text.",
    significance: "Absolution matters because guilt is real and the need to hear 'you are forgiven' spoken aloud — by a human voice, in a specific moment — is not a weakness but a feature of how embodied creatures receive grace.",
    relatedTerms: ["Sacrament", "Liturgy", "Ordination"],
    originalLanguage: "Latin: absolutio (an acquitting, a freeing), from absolvere (to loosen from, to set free)",
  },
  {
    term: "Confirmation",
    category: "Worship & Practice",
    oneLiner: "A rite in which a baptized person affirms their faith publicly and receives the laying on of hands, often associated with the gift of the Holy Spirit.",
    paragraph: "Confirmation's meaning and practice vary significantly across traditions. In Catholic and Orthodox theology, confirmation (or chrismation) is a sacrament — a distinct impartation of the Holy Spirit that completes baptismal initiation. In the Catholic Church, it is typically administered by a bishop to adolescents; in the Orthodox Church, it is administered immediately after baptism (even for infants) by anointing with chrism (holy oil). In Protestant traditions that practice infant baptism (Lutheran, Reformed, Anglican, Methodist), confirmation is the moment when the baptized person personally affirms the faith into which they were baptized as a child — it is the individual's 'yes' to what the community said 'yes' to on their behalf. Baptist and free-church traditions generally do not practice confirmation, regarding believer's baptism as the confession of faith.",
    significance: "Confirmation asks whether faith can be inherited or must be chosen. Every tradition that baptizes infants must eventually answer: when does the child's faith become the child's own?",
    relatedTerms: ["Baptism", "Catechism", "Ordination"],
    originalLanguage: "Latin: confirmatio (a strengthening, a making firm); Greek: chrismation, from chrisma (anointing oil), related to christos (anointed one)",
  },
  {
    term: "Ordination",
    category: "Worship & Practice",
    oneLiner: "The rite by which a person is set apart for ministry — typically as a deacon, priest/elder, or bishop — through prayer and the laying on of hands.",
    paragraph: "Ordination is the church's act of recognizing, authorizing, and commissioning a person for public ministry. The New Testament provides the model: the apostles laid hands on the seven (Acts 6:6), Paul and Barnabas were set apart by the Antioch church (Acts 13:2-3), and Timothy was charged to 'fan into flame the gift of God, which is in you through the laying on of my hands' (2 Timothy 1:6). Catholic and Orthodox theology holds that ordination is a sacrament that confers an indelible character — a priest is a priest forever. Protestant theology generally understands ordination as a recognition of calling and gifting rather than an ontological change. The debate about who may be ordained — women, LGBTQ persons — is among the most contested in contemporary Christianity, with different traditions reading the same texts (1 Timothy 2:12, Galatians 3:28) to opposite conclusions.",
    significance: "Ordination is where the church decides who speaks for it. The criteria it uses — education, character, calling, gender, sexuality — reveal what it values most and what it fears most.",
    relatedTerms: ["Confirmation", "Absolution", "Excommunication"],
    originalLanguage: "Latin: ordinatio (an arranging, an appointing to an order), from ordo (order, rank); Greek: cheirotonia (a stretching out of the hand, election by show of hands)",
  },
  {
    term: "Excommunication",
    category: "Worship & Practice",
    oneLiner: "The formal exclusion of a person from the community of the church and its sacraments, typically for persistent and unrepentant sin.",
    paragraph: "Excommunication is the church's most severe disciplinary act. Jesus provides the basis in Matthew 18:15-17: if a member sins and refuses correction through private rebuke, small-group confrontation, and congregational appeal, they are to be treated 'as you would a pagan or a tax collector.' Paul orders excommunication for a man in the Corinthian church living in incest (1 Corinthians 5:1-5), with the stated goal of restoration: 'hand this man over to Satan for the destruction of the flesh, so that his spirit may be saved.' The aim is always redemptive, not punitive — the hope is that exclusion will provoke repentance. Catholic canon law distinguishes between latae sententiae excommunication (automatic, triggered by certain acts) and ferendae sententiae (imposed by a tribunal). Protestant traditions vary widely in practice, from formal church courts (Presbyterian) to informal 'church discipline' (Baptist).",
    significance: "Excommunication raises the hardest questions about community: who is in and who is out, and who decides? Its abuse is a form of spiritual violence; its absence leaves the community without accountability. Neither extreme is faithful.",
    relatedTerms: ["Anathema", "Ordination", "Donatism"],
    originalLanguage: "Latin: excommunicatio (a putting out of the community), from ex (out of) + communio (communion, community)",
  },
  {
    term: "Anathema",
    category: "Worship & Practice",
    oneLiner: "A formal curse or declaration that a teaching or person is condemned and cut off from the church.",
    paragraph: "Paul uses the word in Galatians 1:8-9: 'If anyone preaches a gospel other than what you accepted, let them be anathema.' In the early church, anathema was stronger than excommunication — it was a solemn, formal condemnation of heresy, often accompanied by a liturgical curse. The ecumenical councils used anathemas to condemn positions they judged destructive to the faith: 'If anyone says [heretical proposition], let him be anathema.' The Council of Trent (1545-1563) issued hundreds of anathemas against Protestant positions. In 1965, Pope Paul VI and Ecumenical Patriarch Athenagoras mutually lifted the anathemas of 1054 — a symbolic step toward reconciliation between Rome and Constantinople. The term retains its force: to call something anathema is to say it is not merely wrong but dangerously, destructively wrong — a false gospel that, if believed, leads to ruin.",
    significance: "Anathema names the church's conviction that some ideas are not merely mistaken but lethal. The willingness to draw that line — and the humility to know when it has been drawn wrongly — is one of the church's most difficult responsibilities.",
    relatedTerms: ["Excommunication", "Inquisition", "Reformation"],
    originalLanguage: "Greek: anathema (a thing devoted to God, then a thing devoted to destruction, a curse; Galatians 1:8-9); Hebrew: cherem (a thing devoted/banned)",
  },

  // ===================== PHILOSOPHY & ETHICS (20) =====================
  {
    term: "Theodicy",
    category: "Philosophy & Ethics",
    oneLiner: "The attempt to reconcile the existence of a good, omnipotent God with the reality of evil and suffering in the world.",
    paragraph: "Theodicy is the question that will not go away: if God is all-powerful and all-good, why does evil exist? The word was coined by Leibniz (1710), but the problem is ancient — Job, the Psalms, and Habakkuk wrestle with it. The major responses include the free-will defense (evil is the price of genuine human freedom — Augustine, Plantinga), the soul-making theodicy (suffering produces character and growth — Irenaeus, John Hick), the greater-good argument (God permits evil to bring about goods otherwise impossible), and the protest tradition (the appropriate response is not explanation but lament — Dostoevsky's Ivan Karamazov, Elie Wiesel). No theodicy fully resolves the problem; the Christian tradition offers not an explanation but a God who enters suffering (the cross) and promises to end it (the resurrection).",
    significance: "Theodicy is where theology meets the hospital bed. Every pastor, every believer who has suffered, every skeptic who walked away — they are all engaged in theodicy whether they use the word or not. It is the question that separates honest faith from denial.",
    relatedTerms: ["Providence", "Sovereignty", "Natural Theology"],
    originalLanguage: "Greek: theos (God) + dike (justice); coined by Gottfried Wilhelm Leibniz in Essais de Theodicee (1710)",
  },
  {
    term: "Apologetics",
    category: "Philosophy & Ethics",
    oneLiner: "The reasoned defense of the Christian faith against objections and misunderstandings.",
    paragraph: "Apologetics takes its name from Peter's command: 'Always be prepared to give an answer (apologia) to everyone who asks you to give the reason for the hope that you have' (1 Peter 3:15). The field divides into classical apologetics (arguing from reason to God's existence, then from evidence to Christianity's truth — William Lane Craig, C.S. Lewis), evidentialist apologetics (focusing on historical evidence, especially for the resurrection — Gary Habermas), presuppositional apologetics (arguing that Christian theism is the necessary precondition for reason, science, and morality — Cornelius Van Til, Francis Schaeffer), and reformed epistemology (arguing that belief in God is properly basic and needs no external proof — Alvin Plantinga). Each approach has a different starting point, a different audience, and different strengths. The best apologetics does not merely win arguments; it removes obstacles so that the gospel can be heard.",
    significance: "Apologetics matters because real people have real questions, and 'just believe' is not an answer. At its best, apologetics respects the intellect of the skeptic enough to engage honestly. At its worst, it becomes a weapon that wins debates and loses people.",
    relatedTerms: ["Natural Theology", "Theodicy", "Epistemology"],
    originalLanguage: "Greek: apologia (a speech in defense), from apo (from/away) + logos (word/reason); used in legal contexts for a defense speech",
  },
  {
    term: "Natural Theology",
    category: "Philosophy & Ethics",
    oneLiner: "The attempt to know something about God through reason and observation of the natural world, apart from special revelation.",
    paragraph: "Natural theology argues that creation itself testifies to its Creator. Paul makes this case in Romans 1:20: 'God's invisible qualities — his eternal power and divine nature — have been clearly seen, being understood from what has been made.' Thomas Aquinas developed the Five Ways — arguments for God's existence from motion, causation, contingency, degrees of perfection, and design — that remain the foundation of natural theology. The cosmological argument (everything that begins to exist has a cause), the teleological argument (design implies a designer), and the moral argument (objective morality implies a moral lawgiver) are its primary tools. Barth famously rejected natural theology entirely, arguing that all knowledge of God comes through Christ alone — his 'Nein!' to Emil Brunner (1934) is the sharpest critique. Most traditions land between Aquinas and Barth: natural theology can establish that a god exists but cannot identify that god as the Trinity without Scripture.",
    significance: "Natural theology determines whether the church can engage the secular world on shared ground. If reason can reach God, then Christians and non-Christians have something to discuss. If it cannot, then only proclamation remains.",
    relatedTerms: ["Revealed Theology", "Apologetics", "Ontology"],
    originalLanguage: "Latin: theologia naturalis (theology from nature), distinguished from theologia revelata (theology from revelation)",
  },
  {
    term: "Revealed Theology",
    category: "Philosophy & Ethics",
    oneLiner: "Knowledge of God that comes through God's own self-disclosure — in Scripture, in Christ, and in the acts of God in history.",
    paragraph: "Revealed theology (theologia revelata) holds that what we know about God we know because God chose to tell us. This is the counterpart to natural theology: where natural theology argues from creation to Creator, revealed theology begins with God's speech. The primary vehicle of revelation is Scripture — the written record of God's words and acts. The supreme vehicle is Christ — 'the image of the invisible God' (Colossians 1:15), 'the exact representation of his being' (Hebrews 1:3). Barth built his entire theology on the premise that revelation is God's act, not humanity's achievement — we do not discover God; God discloses himself. The distinction between general revelation (available to all through nature and conscience) and special revelation (available through Scripture and Christ) is standard across most traditions. The question is how far general revelation goes: enough to condemn (Romans 1:20), or enough to save?",
    significance: "Revealed theology insists that the most important truths about God are not conclusions we reach but gifts we receive. It guards against the arrogance of thinking we can figure God out and the despair of thinking God cannot be known.",
    relatedTerms: ["Natural Theology", "Inspiration", "Apologetics"],
    originalLanguage: "Latin: theologia revelata (revealed theology); Greek: apokalypsis (unveiling, revelation); Hebrew: galah (to uncover, to reveal)",
  },
  {
    term: "Ontology",
    category: "Philosophy & Ethics",
    oneLiner: "The study of being — what exists, what kinds of things exist, and what it means for something to exist.",
    paragraph: "Ontology asks the most basic of all questions: what is there? In theology, ontological questions arise at every turn. Does God exist as a being among beings, or is God being itself (Tillich)? Does the bread of the Eucharist undergo an ontological change (Catholic transubstantiation says yes — the substance changes while the accidents remain)? Is human nature ontologically damaged by the fall (Reformed theology) or merely weakened (Catholic theology)? The ontological argument for God's existence (Anselm, 1078) argues that God, defined as 'that than which nothing greater can be conceived,' must exist in reality, because existence in reality is greater than existence in the mind alone. Kant rejected this argument; Plantinga reformulated it. Ontology matters because what you believe about the nature of being determines what you believe is possible — including the possibility of God, miracles, and resurrection.",
    significance: "Ontology is the invisible framework beneath every theological claim. When a Christian says 'God is real,' they are making an ontological claim. When they say 'evil is the absence of good,' that too is ontology. The discipline forces theology to say what it means by 'exists.'",
    relatedTerms: ["Epistemology", "Natural Theology", "Teleology"],
    originalLanguage: "Greek: on (being, that which is) + logos (study/word); coined by philosopher Jacob Lorhard (1606), popularized by Christian Wolff (1730)",
  },
  {
    term: "Epistemology",
    category: "Philosophy & Ethics",
    oneLiner: "The study of knowledge — what we can know, how we can know it, and what justifies a belief as true.",
    paragraph: "Epistemology asks: how do you know what you claim to know? In theology, this question is inescapable. How do we know God exists? (Through reason? Experience? Revelation? Faith?) How do we know the Bible is true? (Through internal evidence? Historical confirmation? The witness of the Spirit?) How do we know our interpretation is correct? (Through tradition? The consensus of scholars? The plain reading of the text?) Alvin Plantinga's reformed epistemology argues that belief in God can be properly basic — justified without argument, the way belief in other minds or the reliability of memory is justified. This challenges the Enlightenment assumption that religious belief requires external proof to be rational. Epistemological questions also arise in debates about religious experience: is a subjective sense of God's presence evidence, or just emotion? The answer depends on one's epistemology.",
    significance: "Epistemology determines whether faith is rational, irrational, or beyond rationality. It is the discipline that forces the believer to answer the hardest version of the question: 'How do you know?'",
    relatedTerms: ["Ontology", "Apologetics", "Revealed Theology"],
    originalLanguage: "Greek: episteme (knowledge, understanding) + logos (study/word); distinguished from doxa (opinion, belief)",
  },
  {
    term: "Teleology",
    category: "Philosophy & Ethics",
    oneLiner: "The study of purpose and design — the belief that things exist for a reason and are directed toward an end.",
    paragraph: "Teleology asks: what is something for? Aristotle held that everything in nature has a telos — an inherent purpose or end toward which it moves. The acorn's telos is the oak; the human telos is eudaimonia (flourishing/happiness). Christian theology baptized teleology: creation has a purpose because it has a Creator. The teleological argument for God's existence (the design argument) reasons from the appearance of purpose in nature to the existence of a purposeful Designer — William Paley's watchmaker analogy (1802) is the classic formulation. Darwin's theory of natural selection challenged teleology by providing a mechanism for apparent design without a designer. Modern debates about Intelligent Design revive the teleological argument in updated form. Beyond cosmology, teleology shapes ethics: if human beings have a telos (to glorify God and enjoy him forever, per the Westminster Catechism), then morality is about living in accordance with that purpose.",
    significance: "Teleology is the claim that life is going somewhere — that meaning is built into the structure of reality, not projected onto it by desperate humans. Without it, ethics becomes arbitrary and suffering becomes pointless.",
    relatedTerms: ["Ontology", "Natural Theology", "Natural Law"],
    originalLanguage: "Greek: telos (end, purpose, goal) + logos (study/word); Aristotle's concept of telos is foundational",
  },
  {
    term: "Deontology",
    category: "Philosophy & Ethics",
    oneLiner: "An ethical framework that judges actions by whether they conform to moral rules or duties, regardless of their consequences.",
    paragraph: "Deontology is duty-based ethics: an action is right if it conforms to a moral rule, wrong if it violates one — regardless of the outcome. Immanuel Kant is the foundational deontologist: his categorical imperative ('Act only according to that maxim by which you can at the same time will that it should become a universal law') demands that moral rules be universalizable, consistent, and independent of consequences. In Christian ethics, deontology aligns naturally with divine command theory: an action is right because God commands it, wrong because God forbids it. The Ten Commandments are deontological: 'You shall not murder' is not qualified by 'unless the consequences would be good.' The strength of deontology is its clarity and its resistance to utilitarian calculation (you cannot justify torturing one person to save ten). Its weakness is rigidity: are there no cases where the rule must bend to the situation?",
    significance: "Deontology protects ethics from the tyranny of consequences. It insists that some things are wrong even when they work, and some things are right even when they cost. This is the moral intuition behind the claim that the ends do not justify the means.",
    relatedTerms: ["Natural Law", "Teleology", "Antinomianism"],
    originalLanguage: "Greek: deon (duty, that which is binding) + logos (study/word); Kant's term: Pflicht (German: duty)",
  },
  {
    term: "Natural Law",
    category: "Philosophy & Ethics",
    oneLiner: "The moral order embedded in creation and accessible to human reason, reflecting God's design for human flourishing.",
    paragraph: "Natural law theory holds that moral truths are not arbitrary divine commands but reflections of the way God made the world. Because humans are created in God's image, they have access to moral knowledge through reason and conscience — Paul argues this in Romans 2:14-15 ('the law written on their hearts'). Thomas Aquinas developed the fullest Christian account: natural law is humanity's participation in God's eternal law, known through reason and directing human beings toward their proper ends (preservation of life, reproduction, social living, knowledge of truth). Natural law has been enormously influential in Catholic moral theology, shaping positions on issues from just war to sexual ethics to economic justice. Protestant theologians have been more cautious — Calvin affirmed a natural moral sense but argued it was too corrupted by sin to be reliable without Scripture. The natural law tradition provides a basis for moral conversation across religious boundaries, since it appeals to shared reason rather than sectarian revelation.",
    significance: "Natural law is the theological claim that morality is not invented but discovered — that right and wrong are woven into the fabric of creation, not imposed from outside or determined by majority vote.",
    relatedTerms: ["Deontology", "Teleology", "Imago Dei"],
    originalLanguage: "Latin: lex naturalis (natural law); Greek: nomos physikos (law of nature); Aquinas: participatio legis aeternae in rationali creatura (participation of the eternal law in the rational creature)",
  },
  {
    term: "Imago Dei",
    category: "Philosophy & Ethics",
    oneLiner: "The belief that every human being is made in the image of God, grounding human dignity, equality, and moral worth.",
    paragraph: "Genesis 1:26-27 states that God created humanity 'in his image' (Hebrew: betselem elohim) — male and female alike. The meaning of this image has been debated for centuries. The substantive view (dominant in the tradition) identifies the image with specific human capacities: reason, morality, self-awareness, creativity. The relational view (Barth, Brunner) locates the image in humanity's capacity for relationship — with God and with one another. The functional view sees the image as a vocation: humans are God's representatives (vice-regents) on earth, tasked with exercising dominion (care, stewardship) over creation. The image of God is not lost in the fall — Genesis 9:6 and James 3:9 appeal to it after the fall — but it is damaged and distorted. Christ, 'the image of the invisible God' (Colossians 1:15), is the full and undistorted picture of what humanity was meant to be.",
    significance: "The Imago Dei is the theological foundation of human rights. Every person — regardless of race, gender, age, ability, productivity, or moral record — bears the image of God. This is not a sentiment; it is the most radical claim in the history of ethics.",
    relatedTerms: ["Natural Law", "Kenosis", "Theosis"],
    originalLanguage: "Latin: imago Dei (image of God); Hebrew: tselem (image, likeness); demuth (resemblance, likeness, Genesis 1:26)",
  },
  {
    term: "Kenosis",
    category: "Philosophy & Ethics",
    oneLiner: "The self-emptying of Christ in the Incarnation — the voluntary setting aside of divine prerogatives to take on human form.",
    paragraph: "Kenosis comes from Philippians 2:7, where Paul says Christ 'emptied himself' (Greek: ekenosen) and took the form of a servant. The question is: what exactly did Christ empty himself of? Kenotic theologians of the nineteenth century (Gottfried Thomasius, Charles Gore) argued that Christ set aside certain divine attributes (omniscience, omnipotence, omnipresence) during the Incarnation. Classical orthodoxy resists this — the Chalcedonian definition holds that Christ retained his full divine nature while adding a human nature. A more careful reading is that kenosis describes not a subtraction of divinity but a voluntary concealment and non-use of divine prerogatives: Christ chose not to exercise what he never ceased to possess. The hymn in Philippians 2 is not primarily a metaphysical statement but an ethical one: 'Have this mind among yourselves, which is yours in Christ Jesus' — the pattern of kenosis is the pattern for Christian life.",
    significance: "Kenosis shapes the Christian understanding of power: true power is not grasping but releasing; true greatness is not self-assertion but self-giving. This is the most counter-cultural claim Christianity makes.",
    relatedTerms: ["Incarnation", "Imago Dei", "Theosis"],
    originalLanguage: "Greek: kenosis (emptying), from kenoo (to empty, to make void); Philippians 2:7: heauton ekenosen (he emptied himself)",
  },
  {
    term: "Theosis",
    category: "Philosophy & Ethics",
    oneLiner: "The Eastern Orthodox doctrine that the goal of human life is to become partakers of the divine nature — union with God without loss of human identity.",
    paragraph: "Theosis (also called divinization or deification) is the heart of Eastern Orthodox soteriology. Athanasius captured it memorably: 'God became man so that man might become god.' This does not mean humans become God in essence — the Creator-creature distinction is never dissolved. It means humans are drawn into participation in God's own life, sharing in God's energies (grace, love, holiness) while remaining distinct persons. Peter provides the biblical basis: God has given 'very great and precious promises, so that through them you may participate in the divine nature' (2 Peter 1:4). The Western tradition has parallels — Catholic mysticism (Meister Eckhart, John of the Cross) and even Calvin's concept of union with Christ share significant overlap — but Protestantism has generally been nervous about divinization language, fearing it blurs the line between Creator and creature. The Orthodox insist the distinction is maintained: the energies of God are shared; the essence of God is not.",
    significance: "Theosis reframes salvation from a legal transaction (guilt removed) to a communion that changes what you are (life shared). It offers a vision of the Christian life as becoming fully human by becoming fully alive to God — not less human, but more.",
    relatedTerms: ["Kenosis", "Sanctification", "Beatific Vision"],
    originalLanguage: "Greek: theosis (deification, divinization), from theos (God); also: theopoiesis (God-making); Latin: deificatio",
  },
  {
    term: "Beatific Vision",
    category: "Philosophy & Ethics",
    oneLiner: "The direct, face-to-face encounter with God that the redeemed will experience in eternity — the ultimate fulfillment of human longing.",
    paragraph: "The beatific vision is the climax of the Christian hope. It is what Paul hints at: 'Now we see only a reflection as in a mirror; then we shall see face to face. Now I know in part; then I shall know fully, even as I am fully known' (1 Corinthians 13:12). Thomas Aquinas argued that the beatific vision is the ultimate human happiness — the telos of human existence — because only the infinite God can satisfy the infinite capacity of the human soul. In Catholic theology, the beatific vision is what the saints in heaven experience now (defined by Pope Benedict XII, Benedictus Deus, 1336). The vision is not merely intellectual but total — it involves the whole person, body and soul, in the direct knowledge and love of God. Protestant theology is less systematic on this point but shares the core hope: to see God is the end for which we were made.",
    significance: "The beatific vision insists that the deepest human longing — the restless, unsatisfiable desire Augustine named — has a destination. It is the theological name for the hope that the ache will one day be answered, not with a thing but with a Person.",
    relatedTerms: ["Theosis", "Eschatology", "Glorification"],
    originalLanguage: "Latin: visio beatifica (blessed/happy seeing), from beatus (blessed) + visio (seeing, vision); Thomas Aquinas: visio Dei per essentiam (seeing God through his essence)",
  },
  {
    term: "Mysticism",
    category: "Philosophy & Ethics",
    oneLiner: "The pursuit of direct, personal experience of God that transcends ordinary perception and rational understanding.",
    paragraph: "Christian mysticism is the tradition of those who claim to have encountered God directly — not through argument, institution, or text alone, but through an immediate experience of divine presence. The great mystics include Pseudo-Dionysius (sixth century), Meister Eckhart (c. 1260-1328), Julian of Norwich (1342-c. 1416), Teresa of Avila (1515-1582), and John of the Cross (1542-1591). John of the Cross described the 'dark night of the soul' — a period of spiritual desolation that, paradoxically, deepens union with God. The mystical tradition typically describes a threefold path: purgation (cleansing from sin), illumination (growing knowledge of God), and union (direct communion with the divine). Protestant Christianity has been wary of mysticism — Luther worried it bypassed Christ and Scripture — but figures like Jonathan Edwards, A.W. Tozer, and the Quaker tradition demonstrate that mystical experience is not exclusively Catholic or Orthodox.",
    significance: "Mysticism insists that God is not merely believed in but experienced. It challenges every form of Christianity that has reduced faith to intellectual assent or moral effort, reminding the church that theology without encounter is merely academic.",
    relatedTerms: ["Contemplation", "Theosis", "Asceticism"],
    originalLanguage: "Greek: mystikos (pertaining to mysteries, secret), from myein (to close the eyes or lips, to initiate); Latin: mysticus",
  },
  {
    term: "Contemplation",
    category: "Philosophy & Ethics",
    oneLiner: "A form of prayer that moves beyond words and thoughts into silent, receptive awareness of God's presence.",
    paragraph: "Contemplation is the deepest mode of Christian prayer. Where meditation actively engages the mind with Scripture or a truth about God, contemplation releases the mind into stillness — what the mystics call a 'loving gaze' at God. The Desert Fathers practiced contemplative prayer in the Egyptian wilderness. Gregory the Great distinguished between the active life (Martha) and the contemplative life (Mary, Luke 10:38-42) — both are valid, but contemplation is the higher calling. The anonymous author of The Cloud of Unknowing (fourteenth century) taught that God is found not in thinking but in a 'blind stirring of love.' Thomas Merton brought contemplative spirituality to a Protestant and secular audience in the twentieth century. The centering prayer movement (Thomas Keating, Basil Pennington) adapted contemplative practice for modern practitioners. Evangelicals have been cautious, fearing that contentless prayer opens the door to syncretism, but the tradition is deeply Christian and deeply biblical (Psalm 46:10: 'Be still, and know that I am God').",
    significance: "Contemplation challenges the assumption that all prayer must be verbal. It insists that sometimes the most faithful response to God is silence — not because there is nothing to say, but because words are not enough.",
    relatedTerms: ["Mysticism", "Asceticism", "Liturgy"],
    originalLanguage: "Latin: contemplatio (a gazing at, consideration); Greek: theoria (viewing, contemplation); both translate the experiential dimension of prayer beyond discursive thought",
  },
  {
    term: "Asceticism",
    category: "Philosophy & Ethics",
    oneLiner: "The practice of rigorous self-discipline and abstinence from physical pleasures as a means of spiritual growth.",
    paragraph: "Asceticism is training — the Greek askesis means 'exercise' or 'practice,' the same word used for athletic training. Paul uses the athletic metaphor: 'I discipline my body and keep it under control' (1 Corinthians 9:27). Christian asceticism includes fasting, celibacy, poverty, silence, solitude, and manual labor — practices designed to weaken the grip of disordered desires and strengthen the soul's orientation toward God. The Desert Fathers (Anthony, Macarius, Evagrius) developed ascetical practices to extreme levels — years of solitary prayer, radical fasting, exposure to the elements. The monastic orders institutionalized asceticism under rules and community oversight. The Reformation largely rejected asceticism as works-righteousness, though disciplines of prayer, study, and Sabbath-keeping are functionally ascetical. The danger of asceticism is dualism — treating the body as the enemy of the soul. At its best, asceticism is not anti-body but pro-freedom: it loosens the grip of appetites so that desire can be redirected toward God.",
    significance: "Asceticism names the uncomfortable truth that spiritual growth usually requires giving something up. In a culture built on consumption, the ascetical tradition asks: what would happen if you wanted less?",
    relatedTerms: ["Monasticism", "Contemplation", "Mysticism"],
    originalLanguage: "Greek: askesis (exercise, training, discipline); asketes (one who practices); the term was borrowed directly from athletic vocabulary",
  },
  {
    term: "Casuistry",
    category: "Philosophy & Ethics",
    oneLiner: "The application of general moral principles to specific, often difficult, real-world cases.",
    paragraph: "Casuistry is case-based moral reasoning. Rather than arguing from abstract principles downward, casuistry works from concrete cases upward — examining specific situations, comparing them to paradigm cases, and drawing moral conclusions. The Jesuits became the most famous (and most criticized) casuists: their detailed analyses of moral cases in the sixteenth and seventeenth centuries were brilliant in their precision but attracted the accusation of legalistic hair-splitting and moral flexibility. Pascal's Provincial Letters (1656-1657) savagely satirized Jesuit casuistry, accusing it of finding loopholes for the powerful. Casuistry fell into disrepute but has been rehabilitated by modern ethicists (Albert Jonsen and Stephen Toulmin, The Abuse of Casuistry, 1988) who argue that case-based reasoning is how moral thinking actually works — not from principles to cases but from cases to principles. Medical ethics, in particular, operates casuistically: each patient, each situation, each decision is a case.",
    significance: "Casuistry reminds ethicists that real moral decisions happen in specific situations with competing goods, limited information, and imperfect options. Abstract principles alone cannot tell you what to do at the bedside or in the boardroom.",
    relatedTerms: ["Deontology", "Natural Law", "Legalism"],
    originalLanguage: "Latin: casuistica, from casus (a case, a fall, a happening); casus conscientiae (a case of conscience)",
  },
  {
    term: "Antinomianism",
    category: "Philosophy & Ethics",
    oneLiner: "The belief that Christians are freed from all moral law by grace, so that obedience to commandments is unnecessary for the saved.",
    paragraph: "Antinomianism is the theological error of taking grace too far — or rather, of taking a true premise (salvation is by grace, not law) to a false conclusion (therefore the law does not matter). Paul anticipated this move: 'Shall we go on sinning so that grace may increase? By no means!' (Romans 6:1-2). The term was coined during the Reformation when Johann Agricola argued that the law has no role in the Christian life — only the gospel matters. Luther condemned this position. Later, hyper-Calvinist movements sometimes drifted toward antinomianism by emphasizing God's sovereignty over human obedience. The Puritan tradition fought antinomianism vigorously, insisting on the 'third use of the law' — the law as a guide for grateful Christian living, not as a condition for salvation but as a description of what redeemed life looks like. The tension between grace and law is permanent in Christian ethics: lean too far toward law and you get legalism; lean too far toward grace and you get antinomianism.",
    significance: "Antinomianism is the mirror image of legalism — both distort the gospel, one by adding to grace, the other by subtracting from obedience. Faithful Christianity holds the tension: saved by grace, shaped by command.",
    relatedTerms: ["Legalism", "Justification", "Sanctification"],
    originalLanguage: "Greek: anti (against) + nomos (law); the term was first applied by Martin Luther to Johann Agricola in the 1530s",
  },
  {
    term: "Legalism",
    category: "Philosophy & Ethics",
    oneLiner: "The distortion of Christianity that reduces faith to rule-keeping and measures standing with God by performance rather than grace.",
    paragraph: "Legalism is the older brother in the parable of the prodigal son: he did everything right and resented the grace shown to the one who did not. In theological terms, legalism takes the law — which is good (Romans 7:12) — and makes it the condition of acceptance rather than the description of faithfulness. The Pharisees of Jesus' time are the classic case: their zeal for the law was genuine, but it hardened into a system in which human effort replaced divine grace. Paul's letter to the Galatians is the most sustained attack on legalism in the New Testament: 'I do not set aside the grace of God, for if righteousness could be gained through the law, Christ died for nothing' (Galatians 2:21). Legalism is not unique to one era or tradition; it appears wherever the church prioritizes visible compliance over interior transformation, external rules over a changed heart.",
    significance: "Legalism is Christianity's most persistent temptation — not because rules are bad, but because rule-keeping feels safer than grace. Grace requires trust; rules require only effort. And effort is something the ego can control.",
    relatedTerms: ["Antinomianism", "Justification", "Casuistry"],
    originalLanguage: "The concept has no single Greek or Latin technical term; it describes the misuse of nomos (Greek: law) and Torah (Hebrew: instruction, teaching)",
  },
  {
    term: "Syncretism",
    category: "Philosophy & Ethics",
    oneLiner: "The blending of incompatible religious or philosophical elements into a single system, diluting the distinctiveness of each.",
    paragraph: "Syncretism is the theological equivalent of mixing paint until every color becomes mud. It occurs when Christianity absorbs elements from other religions, philosophies, or cultures in ways that compromise its core claims. Old Testament Israel struggled with syncretism constantly — the worship of Yahweh alongside Baal (1 Kings 18) is the paradigmatic case. In the early church, Gnosticism was syncretistic, blending Christian language with Greek philosophy and Eastern mysticism. In modern contexts, syncretism appears when Christianity is merged uncritically with nationalism (God and country become interchangeable), capitalism (prosperity theology), therapeutic culture (God as life coach), or New Age spirituality (Christ as one enlightened master among many). Not every cultural engagement is syncretism — Christianity has always adopted and adapted cultural forms (Augustine used Neoplatonism, Aquinas used Aristotle). The line is crossed when the adaptation changes the substance of the faith.",
    significance: "Syncretism is the warning label on every attempt to make Christianity fit comfortably into its surrounding culture. The question is not whether the church engages culture but whether, in the engagement, it remembers what is non-negotiable.",
    relatedTerms: ["Gnosticism", "Christendom", "Apologetics"],
    originalLanguage: "Greek: synkretismos (a union of Cretans, a joining together against a common enemy — later applied to the blending of religions); from syn (together) + Kretes (Cretans)",
  },
];

/* ------------------------------------------------------------------ */
/*  Category metadata                                                  */
/* ------------------------------------------------------------------ */

const CATEGORIES: { label: string; value: Category | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Doctrine", value: "Doctrine" },
  { label: "Biblical Studies", value: "Biblical Studies" },
  { label: "Church History", value: "Church History" },
  { label: "Worship & Practice", value: "Worship & Practice" },
  { label: "Philosophy & Ethics", value: "Philosophy & Ethics" },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TheologyGlossary() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  /* -- Scroll to hash on mount -- */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          setExpandedTerms(new Set([decodeURIComponent(hash)]));
        }
      }, 120);
    }
  }, []);

  /* -- Filtering -- */
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return TERMS.filter((t) => {
      if (activeCategory !== "All" && t.category !== activeCategory) return false;
      if (!needle) return true;
      return (
        t.term.toLowerCase().includes(needle) ||
        t.oneLiner.toLowerCase().includes(needle) ||
        t.category.toLowerCase().includes(needle) ||
        t.originalLanguage.toLowerCase().includes(needle)
      );
    });
  }, [query, activeCategory]);

  /* -- Group by letter -- */
  const groups = useMemo(() => {
    const sorted = [...filtered].sort((a, b) => a.term.localeCompare(b.term));
    const map = new Map<string, GlossaryTerm[]>();
    for (const t of sorted) {
      const letter = t.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(t);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const activeLetters = useMemo(() => new Set(groups.map(([l]) => l)), [groups]);

  const toggleTerm = useCallback((term: string) => {
    setExpandedTerms((prev) => {
      const next = new Set(prev);
      if (next.has(term)) next.delete(term);
      else next.add(term);
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setActiveCategory("All");
  }, []);

  /* -- Styles -- */
  const wrap: React.CSSProperties = { maxWidth: "var(--w-default)", margin: "0 auto", padding: "0 var(--s-4)" };

  const categoryBtnBase: React.CSSProperties = {
    fontFamily: "var(--B)",
    fontSize: "14px",
    fontWeight: 500,
    padding: "8px 18px",
    borderRadius: "var(--radius-pill)",
    border: "1px solid",
    cursor: "pointer",
    transition: "all var(--dur) var(--ease)",
    whiteSpace: "nowrap",
  };

  const categoryColor = (cat: Category): string => {
    const map: Record<Category, string> = {
      Doctrine: "#8B5E3C",
      "Biblical Studies": "#3D5A40",
      "Church History": "#6B4C7A",
      "Worship & Practice": "#2E6B8A",
      "Philosophy & Ethics": "#9B6B30",
    };
    return map[cat] || "var(--ink-muted)";
  };

  /* ------------------------------------------------------------------ */
  /*  Structured data                                                    */
  /* ------------------------------------------------------------------ */

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Theological Vocabulary Glossary",
    description: "100 essential theological terms explained at three levels of depth for students, pastors, and anyone serious about the language of faith.",
    url: "https://www.livewellbyjamesbell.co/tools/glossary",
    hasDefinedTerm: TERMS.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.oneLiner,
    })),
  };

  return (
    <Layout>
      <SEOMeta
        title="Theological Vocabulary Glossary — 100 Essential Terms"
        description="100 essential theological terms explained at three levels of depth. Search by term, filter by category, and expand any entry from a one-liner to a full explanation with historical roots and pastoral significance."
        url="https://www.livewellbyjamesbell.co/tools/glossary"
        structuredData={structuredData}
      />

      {/* ============ HERO ============ */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-7) 0 var(--s-6)",
          color: "var(--charcoal-fg)",
        }}
      >
        <div style={wrap}>
          <p
            style={{
              fontFamily: "var(--U)",
              fontSize: "0.75rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--mustard)",
              marginBottom: "16px",
            }}
          >
            <Link href="/tools" style={{ color: "inherit", textDecoration: "none" }}>
              Tools
            </Link>{" "}
            &middot; Reference
          </p>

          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              maxWidth: "22ch",
            }}
          >
            Theological Vocabulary Glossary
          </h1>

          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "18px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.78)",
              maxWidth: "62ch",
              marginBottom: "28px",
            }}
          >
            One hundred terms the church has used for two thousand years to name
            what it believes, how it reads, and why it worships. Each defined at
            three levels: a sentence, a paragraph, and a statement of why it
            matters. Search, filter, or read straight through.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "480px", marginBottom: "16px" }}>
            <Search
              size={18}
              aria-hidden
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--ink-muted)",
              }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 100 terms…"
              aria-label="Search glossary terms"
              style={{
                width: "100%",
                fontFamily: "var(--B)",
                fontSize: "16px",
                padding: "13px 42px 13px 42px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid rgba(245,240,230,0.25)",
                background: "var(--bone)",
                color: "var(--ink)",
                outline: "none",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ink-muted)",
                  padding: "4px",
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <p
            role="status"
            style={{
              fontFamily: "var(--U)",
              fontSize: "13px",
              color: "rgba(245,240,230,0.55)",
            }}
          >
            {filtered.length} of {TERMS.length} terms
            {(query || activeCategory !== "All") && (
              <button
                onClick={clearFilters}
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "13px",
                  color: "var(--mustard)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "12px",
                  textDecoration: "underline",
                }}
              >
                Clear filters
              </button>
            )}
          </p>
        </div>
      </section>

      {/* ============ FILTERS + ALPHA NAV ============ */}
      <section style={{ background: "var(--bone-warm)", borderBottom: "1px solid var(--border)", padding: "var(--s-3) 0" }}>
        <div style={wrap}>
          {/* Category buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            {CATEGORIES.map(({ label, value }) => {
              const isActive = activeCategory === value;
              return (
                <button
                  key={value}
                  onClick={() => setActiveCategory(value)}
                  aria-pressed={isActive}
                  style={{
                    ...categoryBtnBase,
                    background: isActive ? "var(--charcoal)" : "transparent",
                    color: isActive ? "var(--bone)" : "var(--ink)",
                    borderColor: isActive ? "var(--charcoal)" : "var(--border)",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Alphabetical jump links */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2px",
            }}
          >
            {ALPHABET.map((letter) => {
              const isActive = activeLetters.has(letter);
              return (
                <a
                  key={letter}
                  href={isActive ? `#letter-${letter}` : undefined}
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      return;
                    }
                    e.preventDefault();
                    document.getElementById(`letter-${letter}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  style={{
                    fontFamily: "var(--B)",
                    fontSize: "14px",
                    fontWeight: 600,
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--radius-sm)",
                    color: isActive ? "var(--ink)" : "var(--bone-muted)",
                    textDecoration: "none",
                    cursor: isActive ? "pointer" : "default",
                    transition: "color var(--dur) var(--ease)",
                  }}
                >
                  {letter}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ GLOSSARY BODY ============ */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) 0 var(--s-8)" }}>
        <div style={wrap}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "var(--s-7) 0" }}>
              <BookOpen size={40} style={{ color: "var(--bone-muted)", marginBottom: "16px" }} />
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", color: "var(--ink-muted)" }}>
                No terms match that search. Try another word or clear your filters.
              </p>
            </div>
          )}

          {groups.map(([letter, items]) => (
            <div key={letter} id={`letter-${letter}`} style={{ marginBottom: "var(--s-5)", scrollMarginTop: "80px" }}>
              <h2
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "32px",
                  fontWeight: 400,
                  color: "var(--mustard-text)",
                  paddingBottom: "8px",
                  borderBottom: "2px solid var(--mustard)",
                  marginBottom: "var(--s-3)",
                }}
              >
                {letter}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {items.map((t) => {
                  const isExpanded = expandedTerms.has(t.term);
                  const termId = t.term.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <div
                      key={t.term}
                      id={termId}
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        scrollMarginTop: "90px",
                        transition: "box-shadow var(--dur) var(--ease)",
                      }}
                    >
                      {/* Collapsed header — always visible */}
                      <button
                        onClick={() => toggleTerm(t.term)}
                        aria-expanded={isExpanded}
                        aria-controls={`${termId}-body`}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: "12px",
                          width: "100%",
                          padding: "var(--s-3) var(--s-4)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "baseline",
                              gap: "10px",
                              marginBottom: "4px",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--F)",
                                fontSize: "22px",
                                fontWeight: 500,
                                color: "var(--ink)",
                                lineHeight: 1.2,
                              }}
                            >
                              {t.term}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--U)",
                                fontSize: "11px",
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.12em",
                                color: categoryColor(t.category),
                                whiteSpace: "nowrap",
                              }}
                            >
                              {t.category}
                            </span>
                          </div>
                          <p
                            style={{
                              fontFamily: "var(--B)",
                              fontSize: "15px",
                              lineHeight: 1.6,
                              color: "var(--ink-muted)",
                              maxWidth: "68ch",
                            }}
                          >
                            {t.oneLiner}
                          </p>
                        </div>
                        <div
                          style={{
                            flexShrink: 0,
                            marginTop: "4px",
                            color: "var(--ink-muted)",
                          }}
                        >
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </button>

                      {/* Expanded body */}
                      {isExpanded && (
                        <div
                          id={`${termId}-body`}
                          style={{
                            padding: "0 var(--s-4) var(--s-4)",
                            borderTop: "1px solid var(--border)",
                          }}
                        >
                          {/* Paragraph */}
                          <div style={{ marginTop: "var(--s-3)" }}>
                            <h4
                              style={{
                                fontFamily: "var(--U)",
                                fontSize: "11px",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.14em",
                                color: "var(--mustard-text)",
                                marginBottom: "8px",
                              }}
                            >
                              Explanation
                            </h4>
                            <p
                              style={{
                                fontFamily: "var(--B)",
                                fontSize: "15px",
                                lineHeight: 1.7,
                                color: "var(--ink)",
                                maxWidth: "68ch",
                              }}
                            >
                              {t.paragraph}
                            </p>
                          </div>

                          {/* Significance */}
                          <div style={{ marginTop: "var(--s-3)" }}>
                            <h4
                              style={{
                                fontFamily: "var(--U)",
                                fontSize: "11px",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.14em",
                                color: "var(--mustard-text)",
                                marginBottom: "8px",
                              }}
                            >
                              Why It Matters
                            </h4>
                            <p
                              style={{
                                fontFamily: "var(--B)",
                                fontSize: "15px",
                                lineHeight: 1.7,
                                color: "var(--ink)",
                                maxWidth: "68ch",
                                fontStyle: "italic",
                              }}
                            >
                              {t.significance}
                            </p>
                          </div>

                          {/* Original Language */}
                          <div style={{ marginTop: "var(--s-3)" }}>
                            <h4
                              style={{
                                fontFamily: "var(--U)",
                                fontSize: "11px",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.14em",
                                color: "var(--mustard-text)",
                                marginBottom: "8px",
                              }}
                            >
                              Etymology
                            </h4>
                            <p
                              style={{
                                fontFamily: "JetBrains Mono, monospace",
                                fontSize: "13px",
                                lineHeight: 1.6,
                                color: "var(--ink-muted)",
                                maxWidth: "68ch",
                              }}
                            >
                              {t.originalLanguage}
                            </p>
                          </div>

                          {/* Related Terms */}
                          {t.relatedTerms.length > 0 && (
                            <div
                              style={{
                                marginTop: "var(--s-3)",
                                paddingTop: "var(--s-2)",
                                borderTop: "1px solid var(--border)",
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "var(--U)",
                                  fontSize: "11px",
                                  fontWeight: 600,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.14em",
                                  color: "var(--ink-muted)",
                                }}
                              >
                                See also:
                              </span>
                              {t.relatedTerms.map((rt) => {
                                const relatedExists = TERMS.some((x) => x.term === rt);
                                if (!relatedExists) return null;
                                return (
                                  <button
                                    key={rt}
                                    onClick={() => {
                                      const targetId = rt.toLowerCase().replace(/\s+/g, "-");
                                      setExpandedTerms((prev) => { const next = new Set(Array.from(prev)); next.add(rt); return next; });
                                      setTimeout(() => {
                                        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
                                      }, 50);
                                    }}
                                    style={{
                                      fontFamily: "var(--B)",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                      padding: "4px 12px",
                                      borderRadius: "var(--radius-pill)",
                                      border: "1px solid var(--border)",
                                      background: "var(--bone)",
                                      color: "var(--mustard-text)",
                                      cursor: "pointer",
                                      transition: "all var(--dur) var(--ease)",
                                    }}
                                  >
                                    {rt}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FOOTER CTA ============ */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) 0", color: "var(--charcoal-fg)" }}>
        <div style={{ ...wrap, textAlign: "center", maxWidth: "640px" }}>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Language is the beginning, not the end.
          </h2>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.72)",
              marginBottom: "28px",
            }}
          >
            Knowing the word is not the same as knowing the reality it names.
            These definitions are doors, not destinations. Walk through them.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
            <Link
              href="/theology"
              style={{
                fontFamily: "var(--U)",
                fontSize: "15px",
                fontWeight: 500,
                padding: "12px 28px",
                borderRadius: "var(--radius-sm)",
                background: "var(--mustard)",
                color: "var(--charcoal)",
                textDecoration: "none",
                transition: "opacity var(--dur) var(--ease)",
              }}
            >
              Explore Theology
            </Link>
            <Link
              href="/tools"
              style={{
                fontFamily: "var(--U)",
                fontSize: "15px",
                fontWeight: 500,
                padding: "12px 28px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid rgba(245,240,230,0.3)",
                background: "transparent",
                color: "var(--bone)",
                textDecoration: "none",
                transition: "opacity var(--dur) var(--ease)",
              }}
            >
              All Tools
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
