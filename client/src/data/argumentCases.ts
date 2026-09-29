/**
 * "Test the Case": content for the step-through argument tool (/tools/test-the-case).
 *
 * The promise the platform makes to skeptics is that they will be argued with,
 * not preached at. So each case is a sequence of moves, and at every move the
 * reader can push back with the objection they actually hold and get the honest
 * answer, including what the move does NOT prove. No altar call, no manufactured
 * urgency; the closing leaves weight and lets the reader decide.
 *
 * A case with `published: false` is a real, honest stub: the tool lists it as
 * "In progress" and never lets it dead-end. Add new cases here; the engine and
 * the persistence work automatically.
 */
export interface Objection {
  /** The reader's pushback, shown as a button ("Couldn't it have been a hallucination?"). */
  label: string;
  /** The honest answer to that objection. */
  response: string;
}

export interface CaseStep {
  id: string;
  /** The move being made at this step. */
  move: string;
  /** The pushbacks a reader can raise here, each with its answer. */
  objections: Objection[];
  /** What this step honestly does NOT settle. Always shown. */
  grants: string;
}

export interface ArgumentCase {
  slug: string;
  title: string;
  kicker: string;
  intro: string;
  published: boolean;
  steps: CaseStep[];
  /** The verdict that leaves weight. No decision is pressed. */
  close: string;
  /**
   * The essays this case was built from. A reader who finishes one of them is
   * offered the interactive version at the foot of the essay, so the tool and
   * the writing point at each other. Kept here so the mapping lives with the
   * case rather than drifting in a parallel table.
   */
  essaySlugs: string[];
}

const RESURRECTION: ArgumentCase = {
  slug: "resurrection",
  essaySlugs: ["did-the-resurrection-happen"],
  title: "Did the resurrection happen?",
  kicker: "The case, one move at a time",
  intro:
    "I am not going to try to close this in a paragraph, and I am not going to pretend the honest objections are weak. We will go one move at a time. At every step you can push back with the objection you actually hold, and I will give you the real answer, including what the move does not prove. You can walk away unconvinced at any point and I will not chase you.",
  published: true,
  steps: [
    {
      id: "facts",
      move: "Start with what almost everyone grants, believer and skeptic alike. Jesus of Nazareth was executed by crucifixion under Rome. His followers were soon convinced they had seen him alive again, and said so publicly in the same city where he was killed. And at least one committed enemy of the movement, Paul, became convinced of the same thing and spent the rest of his life paying for it. These are not devotional claims. They are close to the common ground of the historians who work on this, including ones with no faith to defend.",
      objections: [
        {
          label: "Scholars have an agenda, so their agreement proves nothing.",
          response:
            "Some do, in both directions, which is exactly why the interesting agreement is the one that crosses the line. The crucifixion and the disciples' sincere conviction that they saw him are granted by skeptical, non-Christian scholars too, people with every reason to withhold it. When your opponents concede a point against their own interest, that point has earned some weight. It does not make the conclusion true. It means we are not starting from Christian assumptions.",
        },
        {
          label: "How do we even know what the disciples believed?",
          response:
            "From behavior, not just report. Frightened men who had scattered began proclaiming a risen Jesus in the one city that could most easily disprove it, and kept it up under threat. People can be sincerely wrong. What they do not do is suffer and die for something they privately know they made up. The sincerity of the belief is well evidenced, even before we ask whether the belief was correct.",
        },
      ],
      grants:
        "This step proves only that something happened that the first witnesses were convinced was a bodily encounter. It does not yet show they were right.",
    },
    {
      id: "early",
      move: "Now the timing, which is the thing I had wrong for years. In his first letter to Corinth, Paul hands on a summary he says he received: that Christ died, was buried, was raised, and appeared to named people, many still alive. The words for delivered and received are the technical language for passing on a fixed tradition, so the creed is older than the letter that carries it. Even skeptical historians date it to within a few years of the crucifixion, into the hands of the men who claimed to be there.",
      objections: [
        {
          label: "A fast legend is still a legend.",
          response:
            "It can be, but speed is the problem for the legend theory, not the help. Legends need time and distance, room to grow after the eyewitnesses are gone. Here the summary is hardening into a creed while the named witnesses are still walking around to be contradicted. That does not prove it happened. It removes the easiest explanation, that the story grew up quietly over generations, because the timescale for that is not there.",
        },
        {
          label: "Maybe Paul invented the list of witnesses.",
          response:
            "He names people his readers could go ask, including Peter and a group he calls more than five hundred, and says most are still living. That is a strange move for a forger. You do not invite fact-checking on a claim you fabricated. It reads like a man citing witnesses he expects to hold up, not one hoping no one checks.",
        },
      ],
      grants:
        "This step shows the claim is early and tied to named witnesses, not a late myth. It does not prove the witnesses were not mistaken.",
    },
    {
      id: "alternatives",
      move: "So take the natural explanations seriously, one at a time. Each one is trying to account for the same cluster: a dead man, an empty tomb, and people convinced they met him alive. The trouble is that every alternative rescues one corner and leaves the rest exposed. Push on whichever one you find strongest.",
      objections: [
        {
          label: "They hallucinated it.",
          response:
            "Grief hallucinations are real, but they are private events. They do not happen to groups on the same occasion, and they do not happen to a determined enemy like Paul who was not grieving and wanted the movement crushed. And a hallucination leaves the body in the tomb, so it explains the visions and not the empty grave the authorities never filled with a corpse.",
        },
        {
          label: "The disciples stole the body and lied.",
          response:
            "This is the oldest theory, and it breaks on a simple fact about people. Frauds abandon the con when it starts costing them their lives. Men will die for something false they sincerely believe. They do not die, one after another, for something they know they faked, when a single confession would save them. The theft theory explains the empty tomb and cannot explain the martyrdoms.",
        },
        {
          label: "Jesus never actually died on the cross.",
          response:
            "Roman execution squads killed for a living and did not misplace a live prisoner, and the account has a spear driven into his side to confirm death. Even setting the sources aside, a half-dead man who clawed out of a tomb would have looked like a torture victim needing a doctor, not a conqueror of death. He would have inspired pity, not the claim that he had beaten the grave.",
        },
        {
          label: "They went to the wrong tomb.",
          response:
            "Possible for a grieving follower in the dark. Not for everyone at once, and not for long. The authorities who wanted the movement dead had only to walk to the right tomb and produce the body. They never did, and the movement grew in the one city where that rebuttal was easiest to make.",
        },
      ],
      grants:
        "This step shows the ordinary explanations each leave something central unexplained. It does not prove a miracle. It narrows the field.",
    },
    {
      id: "embarrassment",
      move: "One more detail, because it cuts against invention. All four accounts make women the first witnesses to the empty tomb, in a culture where a woman's testimony was discounted and often inadmissible. If you were building a persuasive legend for that world, you would never stake it on witnesses no one was required to believe. You would put men there.",
      objections: [
        {
          label: "Maybe it just happened that way, so it means nothing.",
          response:
            "That is precisely the point, and it is the strongest reading. The most natural reason the embarrassing detail is in the story is that it was too well known to leave out, because it was what happened. Invented accounts trim the parts that weaken them. This one kept a detail that cost it credibility in its own day, which is what truthful, awkward memory looks like.",
        },
      ],
      grants:
        "This step shows the accounts behave like inconvenient memory rather than tidy propaganda. It is a mark of honesty, not a proof of the event.",
    },
    {
      id: "verdict",
      move: "Now the honest limit, because I promised not to oversell it. None of this is a proof. You can grant every step, that the man died, that the claim is early, that the alternatives strain, that the accounts look honest, and still conclude that sincere witnesses were sincerely wrong, because a dead man staying dead is the one thing you are sure of. That is a coherent place to stand, and the evidence does not drag you out of it by force.",
      objections: [
        {
          label: "Extraordinary claims require extraordinary evidence.",
          response:
            "They do, and this is a genuinely extraordinary claim. But notice the phrase can hide a decision made before the evidence is weighed, that no testimony could ever be enough because such things simply do not happen. If that is your rule, you have not examined the resurrection. You have ruled it out in advance and called the ruling evidence. The honest version keeps weighing.",
        },
        {
          label: "I still do not believe it.",
          response:
            "That is allowed, and it is not stupid, and I am not going to press you toward a decision at the bottom of a web page. What I would ask is only this: notice whether your disbelief is a conclusion you reasoned to from the evidence, or a starting assumption the evidence never got to touch. Those are very different, and only one of them has actually put the resurrection on the scale.",
        },
      ],
      grants:
        "This is where the case ends and the choice begins. No argument can make it for you.",
    },
  ],
  close:
    "So here is the whole of it, and no more than it. The tomb sat in a city that wanted the movement finished and had only to produce a body to end it, and it never did. The matter was supposed to be closed on a Friday. It would not stay closed. You can weigh all of that and still walk away unconvinced, and keep reading here, and be welcome. I only wanted you to see that walking away is a choice about the evidence, not an escape from having to make one.",
};

const HELL: ArgumentCase = {
  slug: "hell",
  essaySlugs: ["does-hell-exist","is-hell-eternal"],
  title: "Could a good God send anyone to hell?",
  kicker: "The case, one move at a time",
  intro:
    "I am not going to defend a cartoon, and I am not going to pretend the objection is weak. For years this was one of my own hardest reasons to reject the whole thing. We will go one move at a time. Raise the objection you actually hold, and I will give you the real answer, including what the move does not settle. You can walk away unconvinced at any point.",
  published: true,
  steps: [
    {
      id: "concede",
      move: "Start by granting the objection its full weight, because most defenses of hell skip this and lose the honest reader here. The picture you are reacting to, a God who tortures people forever for a finite life of ordinary failure, gleeful about it, keeping a chamber of pain running for eternity, is monstrous. If that is what the word means, I am against it too, and so were many of the people who thought hardest about it. Do not let anyone rush you past that revulsion. It is doing its job.",
      objections: [
        {
          label: "You are just redefining hell to dodge the problem.",
          response:
            "Fair suspicion, so hold me to the text and the tradition, not to my convenience. The oldest and most serious Christian thinking does not describe God dragging the unwilling into torment. It describes a self that insists, to the end, on being its own god, and a God who finally honors that no. Whether that is better or worse we can argue. But the cartoon I just described is not the considered Christian claim, and it is worth knowing that before you reject it.",
        },
        {
          label: "Plenty of Christians really do preach the cartoon.",
          response:
            "They do, and it has done real damage, and I will not defend them. Preachers have used hell as a cattle prod, relished the fire, and made God sound like the villain. That is a failure of the church, and the skeptic who recoils from it is recoiling from something genuinely ugly. The question is only whether the abuse is the doctrine or a corruption of it. It is worth testing the real thing, not the worst sermon you ever heard.",
        },
      ],
      grants: "This step clears away a caricature. It does not yet show that any doctrine of hell is just, or true.",
    },
    {
      id: "will",
      move: "Now the move that reframed it for me. C. S. Lewis put it in an image that has never left me: the doors of hell are locked on the inside. On this reading hell is not a sentence imposed on someone who longed for God and was refused. It is the ratified choice of a person who, offered God, says no, and keeps saying it, and is finally allowed to have what they insisted on, which is a self curved in on itself with the light shut out. Love that cannot be refused is not love. A God who forced heaven on the unwilling would be running the very tyranny the objection accuses him of.",
      objections: [
        {
          label: "No one would actually choose that.",
          response:
            "We choose smaller versions of it constantly, the grudge nursed past all reason, the pride that would rather be right and alone than reconciled, the habit defended to the end. It is not hard to imagine a self that has practiced saying no to love for a lifetime becoming, at last, a self that cannot say anything else. Hell, on this account, is not a surprise verdict. It is a direction, finally arrived at.",
        },
        {
          label: "Then God made people he knew would choose it.",
          response:
            "That is the hard edge, and I will not pretend it vanishes. It is the old question of why God makes free creatures at all, knowing some will use the freedom to refuse him. The answer the tradition gives is that love requires a real other who can say no, and that a world of creatures who could not refuse would be a world without love in it. You can find that answer insufficient. But notice it is the price of freedom, not the whim of a torturer.",
        },
      ],
      grants:
        "This step shows hell can be understood as honored refusal rather than imposed cruelty. It does not prove that is the true account, only that the monstrous one is not the only one.",
    },
    {
      id: "justice",
      move: "Take the sharpest version of the fairness objection, the one about proportion. A finite life of finite wrongs, and then unending consequence. That looks like a punishment wildly out of scale with the crime, and no human judge who did that would be called good. Push here, because this is where the objection is strongest.",
      objections: [
        {
          label: "Finite sin cannot deserve infinite punishment.",
          response:
            "If hell were a fixed sentence for a closed list of past deeds, I would agree the math is obscene. But on the reading we have been building, hell is not a stack of penalties for finite acts. It is the ongoing state of a will that goes on refusing, forever choosing the self over God. The duration is not a sentence handed down. It is the refusal, still being made. That may be wrong. It is not the proportionality problem you started with.",
        },
        {
          label: "Christians cannot even agree on what hell is.",
          response:
            "True, and I will be honest that faithful Christians divide here, between those who hold unending conscious separation and those who hold that the finally impenitent at last cease to be. That is a real and open disagreement inside the church, and I am not going to fake a consensus that does not exist. What they agree on is narrower and more sober: that a person can finally, really refuse God, and that this refusal is not nothing. The exact nature of the far country is contested. That it can be chosen is the claim.",
        },
      ],
      grants: "This step reframes the proportion objection and admits the tradition disagrees about hell's nature. It settles neither debate.",
    },
    {
      id: "who",
      move: "Then the worry underneath the worry, which is usually not about the doctrine in the abstract but about specific people. Your grandmother. The kind atheist. The billions who never heard the name. The fear is that a good person is going to be filed into torment on a technicality of belief.",
      objections: [
        {
          label: "So my decent unbelieving friend is going to hell.",
          response:
            "I do not know, and I will not pretend to, and anyone who says it easily has understood neither the doctrine nor the grief. What the tradition guards is that no one is filed on a technicality by an indifferent clerk. The Judge is not a distant bureaucrat applying a policy. He is the one who crossed every distance himself and went to a cross rather than spare himself. Whatever he does with your friend, he will not do it carelessly, and he will not do it without having paid, himself, more than you would ask.",
        },
        {
          label: "That is just a way of avoiding the answer.",
          response:
            "It is a refusal to give an answer I do not have, which is different. I could invent a confident verdict about your friend to satisfy you, and it would be dishonest. What I can say is that the character of the Judge is on the record, in public, on a hill outside Jerusalem, and that character is the opposite of the careless cruelty the objection fears. You are allowed to press him on it. You are not required to assume the worst of a God who died.",
        },
      ],
      grants: "This step addresses the fear about who, without pretending to a roster no one was given. It comforts no one into certainty.",
    },
    {
      id: "verdict",
      move: "Now the honest limit, because I promised not to oversell it. None of this proves hell is real, and none of it makes hell comfortable. What it does is dismantle the cartoon and hand you the actual question. Not, would a good God run a torture chamber. But, would you want a God who forced every unwilling person into his presence forever, and is a universe where love can be finally refused better or worse than one where it cannot.",
      objections: [
        {
          label: "I still find the whole idea monstrous.",
          response:
            "Then hold onto that, because a person who feels the weight here is more serious than one who shrugs. I would only ask you to aim the feeling at the real target. If what you find monstrous is a God who delights in pain and damns the sincere on a technicality, you and the serious tradition are on the same side against that God. If what you find monstrous is a God who will not override a person's final no, that is a different objection, and a smaller one than it first looked.",
        },
        {
          label: "This still is not a reason to believe.",
          response:
            "Correct, and it was never meant to be. This case does not argue you into faith. It only clears one obstacle that keeps people from looking, the belief that the Christian God is obviously a cosmic torturer and therefore not worth a second thought. Remove the cartoon and the real question is still open. That is all I wanted, to get you an honest look rather than a caricature you were right to reject.",
        },
      ],
      grants: "This is where the case ends and the choosing begins. It removes a caricature. It does not compel belief.",
    },
  ],
  close:
    "So here is the whole of it, and no more. The hell worth arguing about is not a chamber a gleeful God runs for the weak. It is the possibility that a person can say no to love so long and so fully that the no becomes the whole of them, and that God is the kind of God who will not force the door he has left them free to lock. You can still find that unbearable. But if you do, make sure it is the real thing you are refusing, and not the cartoon you were handed by people who should have known better.",
};

const MEANING: ArgumentCase = {
  slug: "meaning",
  essaySlugs: ["meaning-without-god"],
  title: "Can a life mean anything without God?",
  kicker: "The case, one move at a time",
  intro:
    "I was an atheist, and I built a real and meaningful life without God, so I am not going to insult you by pretending you cannot. We will go one move at a time. Raise the objection you actually hold, and I will give you the honest answer, including what the move does not settle. You can walk away unconvinced at any point.",
  published: true,
  steps: [
    {
      id: "concede",
      move: "Start where the honest atheist starts, because the Christian version of this argument is usually a slander. People build rich, loving, meaningful lives with no God at all. I have known unbelievers who loved their spouses with a fidelity that shamed the elders of my church and faced a terminal diagnosis with a steadiness I would want at my own bedside. The miserable nihilist the church invented to feel superior does not exist. Meaning without God is not rare. It is everywhere. That was never the real question.",
      objections: [
        {
          label: "Right, so the argument is already over.",
          response:
            "Not quite, because I conceded the wrong thing on purpose. The question was never whether you can feel your life is meaningful. Obviously you can. The question is what kind of meaning it is, and whether it can bear weight when the feeling goes. Hold that distinction. Everything below turns on it, and it is not a trick. It is the actual seam.",
        },
      ],
      grants: "This step grants that meaningful atheist lives are real and common. It does not touch what that meaning is made of.",
    },
    {
      id: "kinds",
      move: "So the distinction. There is meaning you invent and meaning you discover. Camus faced this honestly. He called the universe absurd, silent to our demand for sense, and still refused the ledge, choosing to make his own meaning in revolt, imagining Sisyphus happy at the bottom of the hill. Sartre said we are condemned to be free, that there is no given purpose so we must author our own. Take both at full strength. It is a brave account. But notice what kind of meaning it is. It is assigned by you, and what you assign, you can also un-assign.",
      objections: [
        {
          label: "Invented meaning is still real meaning.",
          response:
            "While you believe it, yes, and I am not mocking it. But there is a difference between a value you discover, which was true before you saw it and stays true when you stop looking, and a value you confer, which exists only as long as you keep conferring it. The first can hold you up. The second you are holding up. On a good day you cannot feel the difference. The difference shows up on the bad day.",
        },
        {
          label: "Meaning does not have to be cosmic to be real.",
          response:
            "Agreed, and the Christian claim is not that only galaxy-sized meaning counts. It is that the small, real meanings, the love, the work, the promise kept, are either anchored in something outside you that makes them truly matter, or they are moves you are making in a game you also invented and could stop playing. Both feel identical from the inside. They are not identical when the ground shifts.",
        },
      ],
      grants: "This step draws the line between invented and discovered meaning. It has not yet shown which kind yours is.",
    },
    {
      id: "test",
      move: "Now the test that exposes which kind you have, and I put myself under it first. Leo Tolstoy had won by every measure Sartre would prescribe, fame, family, one of the greatest novels ever written, and he still hid a rope from himself in his own study, because none of it answered the death waiting to erase all of it. That is not weakness. It is invented meaning meeting the one thing it cannot metabolize. What you invent, you can un-invent, and on the night you can no longer believe in the meaning you assigned, it is simply gone, because it was only ever your believing.",
      objections: [
        {
          label: "The heat death of the universe is billions of years away. Who cares.",
          response:
            "The distance does not change the logic, it only lets you not look at it. If the final state of everything is silence, then the meaning you assign is not discovered in the world, it is projected onto it, and a projection lasts exactly as long as the projector. You can live happily without staring at that. Most people do. But do not confuse not looking with having answered it. Tolstoy was not looking either, right up until he was.",
        },
        {
          label: "You are just afraid of the void and dressing it as an argument.",
          response:
            "Maybe, and I have to take that seriously, because fear can absolutely manufacture belief. But the knife cuts both ways. The wish that there be no one to answer to, no final accounting, no gaze you cannot escape, is also a wish, and it can manufacture unbelief just as easily. Naming my fear does not settle whether my conclusion is true, any more than naming your relief settles yours. We both have to argue past our motives, not from them.",
        },
      ],
      grants: "This step shows invented meaning has a failure point that discovered meaning would not. It does not prove meaning is discovered.",
    },
    {
      id: "borrowed",
      move: "One more thing I noticed, because it surprised me. The people who most insist the universe is meaningless keep reaching for values their own account cannot fund. Camus, who said there is no cosmic justice, spent himself denouncing injustice as though it were really, bindingly wrong for everyone. They borrow a moral floor a silent universe does not stock. And the Bible got to the emptiness first and did not blink. Ecclesiastes stares straight into the void: Vanity of vanities, says the Preacher, vanity of vanities! All is vanity (Ecclesiastes 1:2). The scandal is not that the skeptic has a hard question the Bible cannot handle. It is that the Bible put the hardest form of the question in its own scriptures.",
      objections: [
        {
          label: "You can be committed to justice without grounding it in God.",
          response:
            "You can be committed to it, deeply, and many atheists are more committed than many believers. The question is not commitment, it is grounding. When you say cruelty is really wrong, wrong even if everyone approved, you are describing a fact that holds independent of anyone's opinion. A silent, indifferent universe supplies feelings about cruelty. It does not supply the fact. You may be living off moral capital you did not mint and cannot account for. That is not an insult. I did the same for years.",
        },
      ],
      grants: "This step shows the meaningless-universe view struggles to fund the values its holders actually live by. It does not prove those values come from God.",
    },
    {
      id: "verdict",
      move: "Now the honest limit. None of this proves God, and none of it says your life is not meaningful. What it does is change the question. Not, can an atheist have meaning. Plainly yes. But, is the meaning you have something you are holding up, or something holding you up. On the good day you cannot tell. So wait for the bad day, the dark kitchen, the loss that empties the room, and then notice which one of you gets tired first.",
      objections: [
        {
          label: "I still do not need God to have a meaningful life.",
          response:
            "You do not need him to feel that you do, and I will not argue you out of a real and good life. What I am pointing at is narrower and quieter. The meaning you have is either woven into the world or draped over it by you, and only one of those survives the night you stop believing in it. You may never have that night. Many do. I only want you to know which kind of meaning you are standing on before it is tested, not after.",
        },
        {
          label: "This still is not a reason to believe.",
          response:
            "No, and it was not meant to be. This case does not argue you into faith. It only removes a bad reason to dismiss it, the idea that Christianity thinks you are a joyless nihilist and has nothing to say to a full atheist life. It thinks the opposite. It thinks your life is drenched in a meaning too heavy for you to have made, and it wants to ask you where the weight came from. You can refuse the question. I only wanted you to hear it asked honestly.",
        },
      ],
      grants: "This is where the case ends and the choosing begins. It reframes the question. It does not compel belief.",
    },
  ],
  close:
    "So here is the whole of it. You can make your own meaning, and it can be beautiful, and it will hold right up until the day you can no longer believe in it, because you were the one holding it. The Christian claim is not that your life is empty. It is that your life is full of a weight you did not manufacture and cannot finally account for, and that the weight has a source. You can close this unconvinced and go on living well. I only wanted you to notice that the meaning you trusted was leaning on something, and to wonder, on the hard night, what.",
};

const EVIL: ArgumentCase = {
  slug: "evil",
  essaySlugs: ["if-god-is-good-why-suffering"],
  title: "If God is good, why is there so much suffering?",
  kicker: "The case, one move at a time",
  intro:
    "This is the best argument against God, and I am not going to pretend otherwise. It is the one that cost me the most, and it is not solved in a paragraph. We will go one move at a time. Raise the objection you actually hold, and I will give you the honest answer, including what it does not settle. You can walk away unconvinced at any point.",
  published: true,
  steps: [
    {
      id: "concede",
      move: "Start by granting the whole weight of it, because a defense that hurries past the horror has not earned the right to speak. A child dies slowly in a cancer ward. A wave takes a quarter of a million people in a morning. If there is a God who is both good and able, that is a real problem, not a debating point, and the person who feels it in their body is seeing clearly. I felt it for years. I still feel its edge.",
      objections: [
        {
          label: "A good, all-powerful God would simply prevent it.",
          response:
            "That is the logical form of the problem, and for a long time it was thought to be a knockout. It is not anymore, and the person who moved it was a philosopher, Alvin Plantinga, with the free-will defense. If God wanted creatures who could actually love, he had to make creatures who could actually refuse, and a world of genuine freedom is a world where that freedom can be turned to harm. That does not make the suffering good. It shows that an all-good God and real evil are not a flat contradiction, which is what the objection first claimed.",
        },
      ],
      grants: "This step shows the logical version does not disprove God outright. It does nothing yet for the suffering that no one's freedom caused.",
    },
    {
      id: "natural",
      move: "So push exactly there, because it is the hardest ground. Free will explains the torturer. It explains nothing about the earthquake, the childhood leukemia, the millions of years of animals tearing each other apart long before any human could sin. This is the evidential problem, and its sharpest form is the philosopher William Rowe's, a fawn burned in a forest fire no one set, dying in agony over days with no human to witness or learn from it. That suffering looks simply pointless.",
      objections: [
        {
          label: "There is no free-will excuse for a fawn's agony.",
          response:
            "There is not, and I will not reach for one. The most honest thing I can say is smaller and harder. A world stable enough for embodied creatures to live and act and love at all may be a world that runs on fixed laws, and the same physics that lets bone grow lets it break, and the same tectonics that recycle the carbon also quake. Scripture does not call the present arrangement the intended one. It says the whole creation was subjected to futility and groans (Romans 8:20-22), which is a strange thing for a book to admit if its job were to make you comfortable.",
        },
        {
          label: "That still sounds like an excuse dressed up as physics.",
          response:
            "It might be, and I am not going to tell you it closes the fawn, because it does not. What I will say is that the Christian claim was never that the suffering makes sense right now. It is that the present state of things is not the last word and not the intended word. You can find that insufficient. It is different from the claim you started with, that the suffering proves there is no God, because the account has room for the suffering to be real, wrong, and temporary all at once.",
        },
      ],
      grants: "This step offers no tidy theodicy and admits the hardest case remains hard. It only narrows what the suffering can be made to prove.",
    },
    {
      id: "floor",
      move: "Now turn the argument over, gently, because there is a cost hidden inside the objection itself. When you call the child's suffering not just sad but evil, wrong, an outrage that ought not to be, you are standing on something. You are appealing to a way things are supposed to be, a real moral floor under the world. Where does a silent, indifferent universe get one of those.",
      objections: [
        {
          label: "I do not need God to know that a child's suffering is wrong.",
          response:
            "You do not need God to know it, and I am not saying atheists cannot feel it fiercely. The question is not knowing, it is grounding. If the universe is only matter and energy with no author and no purpose, then the child's agony is a rearrangement of particles, unfortunate to you, neutral to the cosmos. Your outrage is reporting something you cannot quite account for, a wrongness that would still be wrong if everyone shrugged. That intuition fits a made and moral world far better than a blind one. The problem of evil quietly assumes the very thing it is trying to disprove.",
        },
      ],
      grants: "This step shows the outrage the objection runs on is easier to ground with God than without. It does not explain any particular suffering.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. None of this makes the ward or the wave make sense, and I will not insult you by pretending it does. What the Christian claim finally offers is not an explanation delivered from a safe distance. When Job demanded his answer, God did not hand him a theodicy. He handed him himself. And the center of the faith is not a God who stayed outside the suffering explaining it, but one who came into it, and was tortured to death under an empire, and called out from inside the dark.",
      objections: [
        {
          label: "A God who suffers too still has not fixed anything.",
          response:
            "Not yet, and the people who met him in their worst hour do not come back saying they now understand. They come back saying they were not alone in it, and that the one who made the promise had a wound of his own to show. That is not a proof, and I am not offering it as one. It is the difference between a God who owes you an explanation and a God who entered the thing you needed explained. You can decide that is not enough. It was more than I expected to find.",
        },
        {
          label: "I still cannot reconcile the suffering with a loving God.",
          response:
            "Then you are in good company, because neither could Job, and neither, on the cross, did the Son sound like a man for whom it all added up. What I would only ask is that you notice which you are refusing. If it is a God who watches the ward from a distance and does nothing, refuse him, because that God is not the one at the center of this faith. The one at the center is in the ward. You can still say no to him. But say no to the real one.",
        },
      ],
      grants: "This is where the case ends and the choosing begins. It does not resolve the suffering. It changes what kind of God is on the table.",
    },
  ],
  close:
    "So here is the whole of it, and no less than it. The suffering is real, it is the best reason not to believe, and I have not made it small. What I have said is only that it does not prove as much as it feels like it proves, that the outrage it runs on is hard to ground in a universe with no author, and that the God it is aimed at is not a distant manager but the one who was killed and who called out from the middle of the dark. You can weigh all of that and still walk away. I only wanted the God you refuse to be the real one, not the one who was never there.",
};

const GOSPELS: ArgumentCase = {
  slug: "gospels",
  essaySlugs: ["why-trust-the-bible"],
  title: "Can you trust the Gospels?",
  kicker: "The case, one move at a time",
  intro:
    "There is a confident version of this that everyone knows and almost no one has checked. Written centuries late, changed like a game of telephone, voted into being by an emperor. I believed all three when I was an unbeliever, and I had checked none of them. We will go one move at a time. Raise the objection you actually hold, and I will give you the real answer.",
  published: true,
  steps: [
    {
      id: "concede",
      move: "Start by granting the honest part, because the skeptical case is not weak. We do have a great many differences among the surviving manuscripts, more variants than there are words in the New Testament. The Gospels were not written by neutral court reporters. They were written by believers who wanted you to believe, and they differ from one another in details a modern witness would be cross-examined over, the hour, the words on the sign, who reached the tomb first. If you have felt the force of all that, good.",
      objections: [
        {
          label: "Hundreds of thousands of variants means the text is unreliable.",
          response:
            "That number is real, and it should stop you, but ask what the variants are. The scholar who popularized the figure, Bart Ehrman, also grants what his followers do not, that the overwhelming majority are trivial, spelling and word order and obvious slips, and that no core teaching hangs on a contested line. The reason we can even count the differences is that we have so many manuscripts to compare, from so many places. Abundance is what lets scholars triangulate back toward the original. It is the friend of accuracy here, not the enemy.",
        },
      ],
      grants: "This step concedes the real differences and shows they are mostly trivial. It does not yet show the accounts are early or true.",
    },
    {
      id: "telephone",
      move: "So take the telephone image head on, because it is the most persuasive and the most wrong. Telephone works as a party game precisely because there is one chain and no original to check against. Each person hears only the previous whisper. That is the opposite of how a manuscript tradition behaves.",
      objections: [
        {
          label: "It was copied by hand for centuries, so of course it drifted.",
          response:
            "It was copied by hand, but not in a single line. The texts spread out fast, to Egypt and Syria and Rome and North Africa, in branches that quickly lost contact with each other. A scribe in Alexandria and a scribe in Carthage do not make the same slip, so when their descendants disagree you can usually see exactly where each one wandered and reconstruct the reading they were both copying. The many branches are not the corruption. They are the correction. The telephone game has one chain. The manuscripts have hundreds, cross-checking each other.",
        },
      ],
      grants: "This step dismantles the telephone picture. It does not by itself date the Gospels early.",
    },
    {
      id: "early",
      move: "So the dating, which is the thing that turned me. Even the critical consensus puts the four Gospels inside the first century, within living memory. But you do not need the Gospels for the earliest evidence. Paul's first letter to Corinth is dated by nearly everyone to about twenty-five years after the crucifixion, and in its fifteenth chapter he quotes something older than his own letter.",
      objections: [
        {
          label: "Twenty-five years is still plenty of time for a legend.",
          response:
            "It is not, and this is the point. Paul says he delivered what he also received, the technical language for handing on a fixed tradition, a creed he was taught after his conversion, which pushes the core claim back to within a very few years of the events, into the hands of the named men who said they were there. Legends need generations, room to grow up after the eyewitnesses are safely dead. This is a summary already hardening into a creed while the witnesses were still walking around to be contradicted. That is not legend's timescale.",
        },
        {
          label: "The emperor and the council at Nicaea decided all this later.",
          response:
            "This may be the most confident falsehood of them all. The Council of Nicaea, in 325, did not select which books to keep, and it did not invent the divinity of Jesus. Its records are about the relation of the Son to the Father, the fight with Arius. The four Gospels were already being read as Scripture more than a century before Constantine was born, sorted out by use across the churches, not by a vote. And the divinity of Jesus is sitting in that Corinthian creed, decades before any emperor took an interest.",
        },
      ],
      grants: "This step shows the claim is early and tied to named witnesses, and that the Nicaea story is a myth. It does not prove the witnesses were right.",
    },
    {
      id: "verdict",
      move: "So the honest limit. None of this is proof, and I am not offering it as proof. The tell, for me, was the embarrassment. Legends flatter their heroes and their authors. The Gospels record the leaders as cowards who ran, and they make women the first witnesses to the empty tomb, in a culture where a woman's testimony was worth so little it was often inadmissible.",
      objections: [
        {
          label: "The women being first could just be how it happened.",
          response:
            "That is exactly the point, and it is the strongest reading. If you were inventing a resurrection story to persuade first-century people, you would not build its foundation on witnesses no one was required to believe. You would put men there. The historian N. T. Wright has pressed this as hard as it can be pressed: the women are in the account because the women were there, and no one fabricating it for effect would have chosen them. The Gospels keep details that cost them credibility in their own day. Invented legends do not pay costs they could have avoided.",
        },
        {
          label: "I still think the witnesses were sincerely mistaken.",
          response:
            "That is a coherent place to stand, and the evidence does not drag you out of it by force. Honest witnesses can be honestly wrong. But it is a different place from the one most people think they occupy. Most people believe the documents are late, corrupted, and politically manufactured, and so they never have to weigh what the documents say. They have not earned that dismissal. The Gospels are early, they are the best-attested texts of the ancient world, and no emperor handed them to you. So the choice is the honest one, between believing an unlikely thing on good testimony and disbelieving it because you already know such things do not happen.",
        },
      ],
      grants: "This is where the case ends and the choosing begins. It cannot make the last step for you.",
    },
  ],
  close:
    "So here is the whole of it. The Gospels are not late, they are not a telephone game, and no council voted them into being, and once those three excuses are gone you are left with the honest and uncomfortable question the excuses were hiding. Early, well-attested, awkwardly truthful accounts of the one thing that does not happen. You can weigh all of that and still conclude it did not happen, and be welcome to keep reading here. I only wanted you to see that the dismissal you inherited was doing your thinking for you, and that the real question was always still open.",
};

const JESUS: ArgumentCase = {
  slug: "jesus",
  essaySlugs: ["was-jesus-just-a-good-teacher","who-did-jesus-claim-to-be"],
  title: "Was Jesus just a good teacher?",
  kicker: "The case, one move at a time",
  intro:
    "The most respectable thing you can say about Jesus in polite company is that he was a great moral teacher, nothing more. It costs nothing and offends no one, and for years it was my verdict too. We will go one move at a time. Raise the objection you actually hold, and I will give you the honest answer, including what it does not settle.",
  published: true,
  steps: [
    {
      id: "same-mouth",
      move: "Start with the thing that makes the comfortable verdict so hard to hold. The teaching you admire and the claims you want to discard come out of the same mouth, in the same sources, with no seam between them. He told a paralyzed man his sins were forgiven (Mark 2:5), and the scribes asked the obvious question, who can forgive sins but God alone. He said, before Abraham was, I am (John 8:58), taking the divine name onto his own lips, and they picked up stones. You do not get the Sermon on the Mount without the man who talked like that.",
      objections: [
        {
          label: "Maybe he never said the divine-sounding parts.",
          response:
            "That is the real move, and it is worth taking seriously. Perhaps a later church put the high claims in the mouth of a humble rabbi. But you cannot keep only the parts you like and call the method history. The same documents carry the ethics and the claims together, and if the sources are unreliable enough to have invented the divinity, you have lost your grounds for trusting the moral teaching too. You cannot saw off the branch and keep sitting on it.",
        },
      ],
      grants: "This step shows the admirable teaching and the divine claims come as a package. It does not yet show the claims are true.",
    },
    {
      id: "trilemma",
      move: "So take the old, blunt instrument for this, C. S. Lewis's trilemma. A man who was merely human and said the things Jesus said would not be a great moral teacher. He would be a liar, or a lunatic, or something worse. The one thing he could not be, Lewis said, is the reasonable option everyone reaches for first, a wise teacher who was simply mistaken about being God.",
      objections: [
        {
          label: "The trilemma ignores a fourth option: legend.",
          response:
            "That is the trilemma's real weakness, and I will not hide it. There is a fourth L, legend, the possibility that the divine claims grew up long after a humble teacher was gone. For a long time that was the scholarly default. But it runs into the dating. The claims are not late. Which is why the strongest form of this argument does not lean on the trilemma alone.",
        },
      ],
      grants: "This step names the trilemma's genuine hole, legend, rather than pretending it is airtight. It hands the weight to the next move.",
    },
    {
      id: "devotion",
      move: "So the move that actually carries it, and it is a matter of history, not logic. If the divinity were a legend, it would need generations to grow. Instead the historian Larry Hurtado spent a career showing that the worship of Jesus as divine appears in the very first years after his death, among Jewish monotheists, the last people on earth who would casually add a second figure to God. They would die before bowing to an idol. And they bowed to a crucified man.",
      objections: [
        {
          label: "Early followers exaggerate their founders all the time.",
          response:
            "Followers do inflate their teachers, but not like this and not this fast, and not against everything their own religion trained into them. These were Jews for whom the worship of anyone but the one God was the unforgivable line, and within a few years they were praying to Jesus, singing to him, being baptized into his name. Devotion that high, that early, among those particular people does not behave like the slow drift of a legend. It behaves like a response to something that had already happened.",
        },
      ],
      grants: "This step shows the divine claim is early and costly, not a late embellishment. It does not force you to accept it.",
    },
    {
      id: "verdict",
      move: "So the honest limit. None of this proves he was who he said he was, and I am not going to pretend it does. What it does is take away the one verdict most people reach for, the safe one. The Sermon on the Mount is not the work of a disordered mind, and a con man does not die for the con when recanting would save him.",
      objections: [
        {
          label: "I can still admire his ethics without the metaphysics.",
          response:
            "You can admire them, and you should, but notice what you are doing. You are honoring the teaching of a man while setting aside his own account of who was teaching it, which is a strange way to respect anyone. The comfortable view, the one I held, turns out to be a file and not a conclusion, a way of keeping the parts of Jesus that cost nothing and shelving the man himself. The historical Jesus does not leave that shelf empty. He talked his way off it.",
        },
        {
          label: "I still just think he was a remarkable man.",
          response:
            "That is allowed, and he was remarkable, and I am not going to press you toward a decision at the bottom of a web page. I would only ask you to see the size of the thing you are declining. Not a set of nice sayings you can keep, but a man who forgave sins that were not committed against him, accepted the worship a faithful Jew would have died rather than give, and let his friends call him Lord and God. Good teacher is the one verdict he made almost impossible. Refuse the rest if you must, but refuse it with your eyes open.",
        },
      ],
      grants: "This is where the case ends and the choosing begins. It removes the easy verdict. It does not compel the hard one.",
    },
  ],
  close:
    "So here is the whole of it. The great-teacher verdict is the one the historical Jesus makes hardest to hold, because the wisdom you admire and the claims you want to skip come from the same mouth, early and unembellished, and were worshiped as divine by the very people least likely to invent it. You can still conclude he was a remarkable, mistaken man, and be welcome to keep reading here. I only wanted you to notice that the safe verdict is the one option he took off the table himself.",
};

const WISHFUL: ArgumentCase = {
  slug: "wishful",
  essaySlugs: ["is-faith-just-wishful-thinking"],
  title: "Is faith just wishful thinking?",
  kicker: "The case, one move at a time",
  intro:
    "This one I have to answer against myself, because for years I made it, and I made it well. We will go one move at a time. Raise the objection you actually hold, and I will give you the honest answer, including what it does not settle. You can walk away unconvinced at any point.",
  published: true,
  steps: [
    {
      id: "concede",
      move: "Start by granting it, because a great deal of faith is exactly what the objection says. Religion can be a crutch, and it constantly is for people who make it one. Much of what passes for belief is a god assembled out of a person's fears and preferences, warm where they want warmth and silent where they want silence. If your argument is that some faith is wish-fulfillment, you are not wrong. You are describing my inbox.",
      objections: [
        {
          label: "Feuerbach and Freud already explained the whole thing.",
          response:
            "They gave the suspicion its spine, and they are worth taking seriously. Feuerbach in 1841 said God is the best of human nature projected onto the sky. Freud in 1927 said God is the exalted cosmic father the frightened child never stopped wanting. Grant both at full strength. The trouble is what comes next, because the argument quietly slides from where a belief came from to whether it is true, and those are not the same question at all.",
        },
      ],
      grants: "This step concedes that projection is real and common. It has not yet shown that belief in God is only projection.",
    },
    {
      id: "genetic",
      move: "So name the move under the objection, because it is a known fault. It is the genetic fallacy: explaining why someone holds a belief tells you nothing about whether the belief is true. A frightened man believes the shore is close because he needs it to be, and the shore may also be close. His fear does not move the coastline.",
      objections: [
        {
          label: "But the emotional need is obvious, so the belief is suspect.",
          response:
            "Then apply the tool evenly, because it cuts both ways. The wish that there be no God, no final accounting, no gaze you cannot escape, is also a wish, and it can manufacture unbelief as easily as need manufactures belief. The philosopher Thomas Nagel, no friend of religion, admitted it plainly: I do not want there to be a God. I do not want the universe to be like that. The wanting is on both sides of the table. It settles nothing on either.",
        },
      ],
      grants: "This step shows the projection charge, applied honestly, disqualifies the atheist's motive as much as the believer's. It proves neither view true.",
    },
    {
      id: "unwished",
      move: "Now the part that broke the objection for me. If faith were wish-fulfillment, you would expect the God on offer to be the one a frightened person would order. Comfortable, undemanding, agreeable. That is not the God of Scripture. He opens by requiring a perfection no one can meet, he calls people to lose their lives to find them, and at the center of the whole thing is not a warm affirmation but a crucified man.",
      objections: [
        {
          label: "People still find that God comforting, so it is still a crutch.",
          response:
            "Some do, and some have sanded him down until he is one. But the God actually described is the last god a wish would build. When a man in the Bible comes into his presence he does not feel affirmed, he comes apart. A wish-god does not make demands you cannot satisfy, and a wish-god does not bleed. You have to work to make this God into a comfort object, and the working is the tell that he was not one to begin with.",
        },
      ],
      grants: "This step shows the Christian God is strikingly un-wished-for. It does not prove he is real, only that he is a strange thing to have invented for comfort.",
    },
    {
      id: "verdict",
      move: "So the honest limit. None of this proves God exists, and I am not going to pretend it does. What it does is take the objection off the table as a shortcut. You cannot dismiss the claim by naming the need, because the need runs both ways and the God in question is not the one need would design.",
      objections: [
        {
          label: "I still think believers just want it to be true.",
          response:
            "Some do, and you should say so, and I was a believer's mirror image who wanted it not to be true. So here is the only fair test. Ask the believer what they want to be true, and you will find plenty of faith that is a wish with a steeple. Then have the nerve to ask it of yourself. I ran the projection test on everyone but me for years, and underneath, where I did not look, was a man who found a Godless universe not a grief but a relief. The crutch was real. It was just in my other hand.",
        },
      ],
      grants: "This is where the case ends and the choosing begins. It removes a shortcut. It does not make the decision for you.",
    },
  ],
  close:
    "So here is the whole of it. Some faith is a wish with a steeple, and I will not defend it, but the objection cannot do the work people ask of it, because the projection charge disqualifies the atheist's motive as fully as the believer's, and the God at the center is the last one a frightened person would invent. You can weigh all of that and still walk away, and be welcome to keep reading here. I only wanted you to notice that naming the need was never the same as answering the question.",
};

const PLURALISM: ArgumentCase = {
  slug: "pluralism",
  essaySlugs: ["is-jesus-really-the-only-way"],
  title: "Don't all religions lead to the same God?",
  kicker: "The case, one move at a time",
  intro:
    "I used to think this was the humble, obvious position, and that the people who denied it were arrogant. It turned out to be almost the reverse, and it took me years to see it. We will go one move at a time. Raise the objection you actually hold, and I will give you the honest answer.",
  published: true,
  steps: [
    {
      id: "concede",
      move: "Start by granting what is true and painful in it. The exclusive claim has often been held like a weapon, used to bless conquest and to say unspeakable things to grieving people about their dead. And the intuition underneath is real: if you had been born in a different place, you would almost certainly hold a different faith with the same confidence you hold this one. That should unsettle anyone. It unsettled me for years.",
      objections: [
        {
          label: "Your beliefs just track your birthplace, so none of them can be the truth.",
          response:
            "That where-you-were-born point is real, and it should keep everyone humble, but look at what it proves, because it proves too much. Your atheism, or your pluralism, also tracks your time and place. A person raised in a secular Western university is about as likely to land there as a person raised in Riyadh is to land in Islam. If the geography argument discredits a belief, it discredits the belief that all religions are the same just as fully. It is a reason for humility, not a verdict on truth.",
        },
      ],
      grants: "This step concedes the real arrogance and the birthplace worry. It does not yet show whether any one faith is true.",
    },
    {
      id: "elephant",
      move: "So take the strongest version of the pluralist case, the one the philosopher John Hick spent a career on. He loved the old parable of the blind men and the elephant. One grabs the trunk and says snake, one the leg and says tree, one the ear and says fan. Each has a piece, none has the whole, and how foolish for any of them to insist his part is the animal. It is a devastating little story, and it has been used against religious confidence for a century.",
      objections: [
        {
          label: "Exactly. Every religion has a piece of the truth, none has all of it.",
          response:
            "Now ask the one question the parable cannot survive. Who is telling it. The man narrating the story is not one of the blind men. He is standing above the whole scene with his eyes open, describing the entire elephant that everyone else is too limited to see. To tell the parable at all, he has to claim the very thing he is denying to everyone else, a view of the whole. The pluralist is not standing nowhere. He is standing somewhere, and from it he is making the largest claim in the room.",
        },
      ],
      grants: "This step shows the pluralist parable quietly assumes a God's-eye view it denies to the religions. It does not yet show any religion is right.",
    },
    {
      id: "claims",
      move: "So the real shape of the thing, once the parable is set down. The religions do not describe the same elephant from different angles. They say incompatible things about what is finally real. One says the self is an illusion to be escaped. Another says the self is loved by name and will be raised. One says God is a single undivided will. Another says God is one being in three persons and came in the flesh. These cannot all be true at once, and the pluralist who says they are partial glimpses has not risen above the disagreement. He has joined it, on a third side.",
      objections: [
        {
          label: "The differences are just cultural clothing on the same core.",
          response:
            "That sounds generous, but it is the one claim no adherent of those faiths would accept, which makes it the least respectful move of all. It tells the devout Muslim, the devout Buddhist, the devout Christian that the thing they would die for is surface decoration, and that you, from outside all of them, can see the real core they missed. That is not humility about religion. It is a new religion of its own, with its own dogma, insisting the others are too limited to see what it sees.",
        },
      ],
      grants: "This step shows the faiths make genuinely rival claims, so they cannot all be true. It does not settle which one is.",
    },
    {
      id: "verdict",
      move: "So the honest limit. Nothing here proves Christianity is the true one. What it removes is the idea that you can float above the question. Everyone at the table is making a claim about the whole. The atheist, the pluralist, the believer. The real question was never whether to make an exclusive claim, because no one avoids one. It is which one is true, and that is a harder and more honest question than the one the elephant was hiding.",
      objections: [
        {
          label: "This still feels arrogant, picking one and calling it true.",
          response:
            "It would be, if the claim were that your side is smarter or your people are better. But the scandal of the Christian version is the opposite. It does not say the way is narrow because God is stingy with the map. It says the way is a person, one you cannot earn or reason or be born into, only receive, which is the one door that stays open to the person who got everything else wrong. Refuse it if you must. But do not refuse it for arrogance. Refuse it, if you do, for being too particular.",
        },
      ],
      grants: "This is where the case ends and the choosing begins. It shows there is no view from nowhere. It does not make the choice for you.",
    },
  ],
  close:
    "So here is the whole of it. All religions leading to the same God sounds like the humble view and turns out to be the most sweeping claim in the room, a God's-eye verdict that the faiths themselves are too limited to see straight. Set the parable down and the honest question returns, the harder one about which account of the world is actually true. You can weigh all of that and still walk away unconvinced, and be welcome here. I only wanted you to see that floating above the question was never one of the options.",
};

const FAITH: ArgumentCase = {
  slug: "faith",
  essaySlugs: ["is-faith-irrational"],
  title: "Is believing anything on faith irrational?",
  kicker: "The case, one move at a time",
  intro:
    "I called my old position pure reason, and I was wrong about it in a way that took me a long time to see. We will go one move at a time. Raise the objection you actually hold, and I will give you the honest answer, including what it does not settle.",
  published: true,
  steps: [
    {
      id: "concede",
      move: "Start by granting it, because a great deal of what gets called faith is exactly the credulous thing the charge names. The church has too often praised not-thinking as a virtue and used just have faith as a lid on a pot it did not want boiling. If your objection is to belief held against the evidence, or with no evidence at all, then you and I are on the same side, and I will not defend the thing you are attacking.",
      objections: [
        {
          label: "Faith means believing what you have no evidence for.",
          response:
            "That is the popular definition, and it is a caricature, but I understand why you hold it, because plenty of religious people have earned it. The trouble is that it does not match what the word actually means in the tradition that uses it most. The Greek word behind it, pistis, means trust, the kind you place in a person with a track record, not a leap into the dark. Hebrews 11:1 calls faith the assurance of things hoped for, the conviction of things not seen. That is trust about the unseen, not belief against the evidence.",
        },
      ],
      grants: "This step concedes that credulous faith is real and indefensible. It does not yet show that faith and reason are not opposites.",
    },
    {
      id: "commitments",
      move: "So take the strongest form of the objection, the philosopher W. K. Clifford's, who wrote in 1877 that it is wrong always, everywhere, and for anyone, to believe anything upon insufficient evidence. Try to actually live by that rule for one morning. You will not last.",
      objections: [
        {
          label: "That seems like a reasonable rule to me.",
          response:
            "Then notice everything you already believe that it forbids. You trust that your own reasoning is reliable, which you cannot prove without using the very reasoning in question. You trust that other minds exist, that the past was real, that the future will resemble the past. David Hume saw in 1748 that this last one cannot be justified by argument without going in a circle, and no one has closed the gap since. You are not standing on pure evidence. You are standing on a floor of commitments that outrun your proof, and so is everyone.",
        },
      ],
      grants: "This step shows that everyone lives by trust beyond what they can prove. It does not yet show which trust is warranted.",
    },
    {
      id: "warrant",
      move: "So the real question comes into focus, and it is not faith against reason. The chemist and philosopher Michael Polanyi spent a career showing that all knowing, science included, rests on commitments the knower cannot fully justify from the outside, a floor beneath the floor. Reason does not run without trust. The honest question was never whether to have faith. It is which faith is warranted.",
      objections: [
        {
          label: "Scientific trust is earned by evidence. Religious faith is not.",
          response:
            "Scientific trust is earned by a track record, and that is exactly the right standard, so apply it here too. Biblical faith is not asked in a vacuum. It is asked on the basis of a claimed track record: a people's history, a set of witnesses, an event they said they saw and died refusing to recant. You can judge that record weak. That is a fair fight about evidence. But it is a different accusation from the one you started with, that faith means believing with no reasons at all. It has reasons. You are free to weigh them and find them wanting.",
        },
      ],
      grants: "This step reframes the question from faith-versus-reason to which commitments are warranted. It does not settle whether the Christian ones are.",
    },
    {
      id: "verdict",
      move: "So the honest limit. None of this proves the Christian faith is the warranted one. What it removes is the clean high ground, the idea that you hold only what the evidence forces while the believer leaps in the dark. You do not, and neither does anyone. We are all trusting past our proof, and the real work is arguing about which trust the evidence best supports.",
      objections: [
        {
          label: "Fine, but I would still rather trust as little as possible.",
          response:
            "That is a fair instinct, and I share it more than you might guess. I do not ask you to believe on no evidence, and I would not have, because the demand would have insulted the man I was. I ask only that you count the faith you already live by, the trust under the reason you are so sure is unmixed, and then weigh whether the object of the Christian faith could bear that kind of weight. That is not a leap into the dark. It is the same thing you already do with everything you know, turned toward a harder question.",
        },
      ],
      grants: "This is where the case ends and the choosing begins. It levels the ground. It does not decide for you.",
    },
  ],
  close:
    "So here is the whole of it. Faith is not the enemy of reason, and reason is not the pure alternative to faith, because both of them run on trust that outstrips proof, and the honest question is only which trust is earned. I called my own position pure reason for years and had never counted the enormous faith underneath it, invisible the way water is invisible to the fish. You can weigh all of this and still find the Christian claim unwarranted, and be welcome to keep reading here. I only wanted the fight to be a fair one, over evidence, and not over a caricature of the word faith.",
};

const KALAM: ArgumentCase = {
  slug: "kalam",
  essaySlugs: ["is-god-real"],
  title: "Did the universe have a cause?",
  kicker: "The case, one move at a time",
  intro:
    "This is the argument most people meet first, usually in a clipped debate video, and it deserves better than the clip gives it. It is also more exposed than its defenders sometimes admit. We will go one move at a time. At every step you can push back with the objection you actually hold, and I will give you the honest answer, including what the move does not prove.",
  published: true,
  steps: [
    {
      id: "shape",
      move: "Start with the shape of it, because the shape is simple and the pedigree is long. Al-Ghazali pressed the argument around 1095 in The Incoherence of the Philosophers, against thinkers who held that the world had always existed. William Lane Craig revived it in The Kalam Cosmological Argument (1979), in the form now repeated everywhere: whatever begins to exist has a cause; the universe began to exist; therefore the universe has a cause. The logic is valid. If both premises are true, the conclusion follows, so the whole fight is over the premises and over what kind of cause the conclusion allows.",
      objections: [
        {
          label: "Then who made God?",
          response:
            "The first premise is about things that begin to exist. It never says that everything has a cause, which would include God and sink the argument on the spot. If the cause at the end is something that never began, asking for its maker quietly changes the subject. You can doubt that anything could be beginningless. But notice that for centuries the universe itself was the favored candidate, and plenty of atheists were content with an eternal cosmos that needed no maker. The real question is only which beginningless thing stands at the bottom.",
        },
        {
          label: "You can prove anything with a syllogism. It's a word game.",
          response:
            "You can dress a bad argument in logical form, and the form will not save it. But the form does one honest service: it shows you exactly where to push. There are two premises here and nowhere to hide. If either one fails, the argument fails, and I will tell you where the serious critics think it does. That is a fairer fight than a vague sense that it is all word games, which is a position no one can ever lose.",
        },
      ],
      grants:
        "This step only lays out the argument. Nothing yet has shown that either premise is true.",
    },
    {
      id: "cause",
      move: "The first premise, that whatever begins to exist has a cause, feels like common sense, and most people grant it without a second thought. Horses, hurricanes and villages do not pop into being from nothing, and if they could, it would be strange that they never do. But David Hume argued in A Treatise of Human Nature (1739-40) that we can conceive of something beginning without a cause, and that the maxim, however natural, is neither self-evident nor provable. That challenge deserves a real hearing.",
      objections: [
        {
          label: "Quantum events happen without causes.",
          response:
            "That is the strongest scientific objection to the premise, and it needs a careful answer. On the standard interpretations, a particular radioactive decay has no deterministic trigger; physics gives probabilities, not pushes. But those events do not come from nothing. They happen within a quantum field, governed by laws, in a space with measurable properties. An indeterministic event is not an event without conditions, and some interpretations of quantum mechanics are deterministic anyway. What the physics shows is that causes may be probabilistic. It does not show that being can arise from no being at all.",
        },
        {
          label: "Lawrence Krauss showed a universe can come from nothing.",
          response:
            "Krauss's A Universe from Nothing (2012) described how a universe might emerge from a quantum vacuum under the laws of quantum fields. The philosopher of physics David Albert, reviewing the book that year in the New York Times, pointed out that such a vacuum is a particular arrangement of fields, obeying rules, and is not nothing in the sense the question asks about. Krauss answered sharply, and the exchange is worth reading in full. But the kalam asks why there is any field or law at all, and the book redescribes that question without answering it.",
        },
        {
          label: "Every cause we know is inside the universe. You can't apply that to the universe itself.",
          response:
            "This is Hume's deeper worry, and it has real force. Every cause we have ever observed operates within time and space, and the beginning of time and space is the one event no one can observe from the inside. The defender answers that the principle is not a generalization from observed cases but a basic intuition about being, the same one we use to reject the idea that a tiger could appear in your kitchen uncaused. That answer is respectable. It is also an intuition, and the critic is free to say that his intuitions stop at the edge of the cosmos.",
        },
      ],
      grants:
        "This step shows the first premise is widely held and survives the usual scientific objections. It does not make it certain, and Hume's doubt about applying it to the whole universe is not fully answered.",
    },
    {
      id: "infinite",
      move: "The second premise says the universe began. Craig's first line of support is philosophical. He argues that an actually infinite collection of real things leads to absurdity, borrowing David Hilbert's image of a hotel with infinitely many rooms, all full, that can still take new guests by moving everyone down one room. And he argues that an infinite past could never have been completed one day at a time: if an infinite number of days had to pass before today, today would never arrive. Al-Ghazali made the point nine centuries earlier by asking whether the past revolutions of the heavens were odd or even.",
      objections: [
        {
          label: "Mathematicians work with actual infinities all the time.",
          response:
            "They do, and this is where many philosophers get off the train. Since Georg Cantor in the late nineteenth century, the mathematics of actual infinities has been consistent and fruitful. Craig answers that a coherent mathematics of infinite sets does not show that an infinite collection of concrete things is possible, just as a coherent geometry of eleven dimensions does not show that we live in eleven. That is a fair distinction. But it leaves the impossibility claim resting on the strangeness of Hilbert's hotel, and strangeness is not the same as contradiction. Physics is full of things that are strange and real.",
        },
        {
          label: "An infinite past has no starting point to count from.",
          response:
            "That is the reply J. L. Mackie gave in The Miracle of Theism (1982), and Graham Oppy has pressed versions of it since. An infinite past has no first day on which the count began, so the image of someone setting out to cross an infinite distance smuggles in the very beginning the view denies. Every past day is a finite distance from today. Defenders reply that the whole series must still have been traversed. I think this exchange is closer to a draw than either side admits, which is why I would not rest the case on it alone.",
        },
      ],
      grants:
        "This step gives a serious philosophical reason to doubt an infinite past. It does not show that one is impossible, and able philosophers think it is not.",
    },
    {
      id: "cosmology",
      move: "The second line of support is scientific. Since Georges Lemaître's work in 1927 and 1931 and the detection of the cosmic microwave background by Arno Penzias and Robert Wilson in 1965, the standard picture has our universe expanding from a hot, dense state about 13.8 billion years ago. In 2003 Arvind Borde, Alan Guth and Alexander Vilenkin proved that a universe that has been expanding on average throughout its history cannot be extended infinitely into the past. Defenders of the kalam take that as strong support for an absolute beginning.",
      objections: [
        {
          label: "The Big Bang is the start of our expansion, not of everything.",
          response:
            "That's correct, and a defender who says the Big Bang proves creation out of nothing is overselling it. The standard model describes the universe from a very early moment forward. What came before, if before even means anything there, belongs to theories of quantum gravity nobody has yet. Lemaître himself, a Catholic priest, refused to let his physics be turned into a proof of God. The honest claim is that the evidence fits a beginning well and gives no support to the old picture of a steady, eternal universe. It does not settle the matter.",
        },
        {
          label: "Sean Carroll has shown models with no beginning.",
          response:
            "In a 2014 debate with Craig, the physicist Sean Carroll argued that the theorem of Borde, Guth and Vilenkin assumes a classical spacetime and does not hold where quantum effects rule, and he pointed to models, including one he developed with Jennifer Chen in 2004, in which the universe has no absolute beginning. He also argued that cause is the wrong category at that level: physics asks for a consistent model, not a cause. That is a serious reply from someone who knows the physics better than any apologist does. Those models are speculative, and so are the models with a beginning. The science currently leaves the second premise plausible and unproven.",
        },
        {
          label: "Stephen Hawking said the universe needs no beginning.",
          response:
            "With James Hartle in 1983, Hawking proposed a no-boundary model in which time, near the start, behaves like a dimension of space, so there is no first instant, in the way there is no edge at the South Pole. It is an elegant idea. Notice, though, that a universe with a finite past and no sharp first moment still has a finite past, which is all the kalam needs. And whether such a universe needs an explanation of its existence is a question the model cannot ask, because it describes the universe rather than accounting for why there is one.",
        },
      ],
      grants:
        "This step shows that current cosmology is friendly to a beginning. It does not prove one, and the physicists who doubt it are not being evasive.",
    },
    {
      id: "which-cause",
      move: "Suppose both premises hold. What sort of cause follows? Craig argues that it must be beyond space and time, since it brought them about; enormously powerful; and personal, because a timeless cause producing an effect with a beginning is best understood as an agent who freely chose to act. This is the most contested step, and the argument's force thins as it goes.",
      objections: [
        {
          label: "Why a person? It could be some impersonal state.",
          response:
            "This is the strongest place to resist. Craig reasons that if the cause were a timeless mechanical condition, its effect should be timeless too, the way water sitting in a temperature below freezing from eternity would be frozen from eternity; only a free agent could produce a new effect from a changeless state. Critics reply that we know too little about timeless states to say what they can and cannot do, and that the very language of choosing assumes time. I find Craig's reasoning suggestive rather than compelling. The argument reaches a cause far more naturally than it reaches a person.",
        },
        {
          label: "Why one cause? Why not several, or an indifferent one?",
          response:
            "Hume's skeptic Philo pressed this in the Dialogues Concerning Natural Religion (1779): an argument from effects gives you no more than the effect requires, and nothing here requires one God rather than many, or a good one rather than an indifferent one. Defenders appeal to simplicity, the principle of not multiplying causes beyond need. That is a reasonable principle and not a proof. On its own, the kalam gives you something like a maker of the beginning. It does not hand you the God of Israel.",
        },
        {
          label: "This is just the god of the gaps again.",
          response:
            "A god of the gaps fills a hole in a mechanism that science may later close, and gets evicted when it does. The kalam does not sit inside a mechanism. It asks why there is a mechanism and a history at all, and whether that history had a start. You can think it fails. But it is not waiting for the next paper in cell biology to push it out. If its premises are true, no future discovery about how the universe unfolds will make its question go away.",
        },
      ],
      grants:
        "This step shows that the cause, if there is one, would be extraordinary. It does not show that it is personal, single or good, and it certainly does not show that it is the God Christians confess.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. The kalam is a real argument, not a trick, and it has made atheism answer questions it once found easy. But its second premise is hostage to physics and to the philosophy of the infinite, and its last step reaches further than the premises carry it. Graham Oppy concluded in Arguing about Gods (2006) that no argument on either side of the God question compels every reasonable mind, and I think he is right. What the kalam can do is make the universe itself look like something that calls for an account, rather than the place where accounts simply stop.",
      objections: [
        {
          label: "Then the argument fails.",
          response:
            "It fails as a proof, and I will not pretend otherwise. It does not fail as evidence. An argument can raise the plausibility of a conclusion without forcing it, which is how we reason about nearly everything that matters, from history to medicine to whether to trust a friend. If the universe began, and if things that begin have causes, then naturalism owes an account of the beginning, and saying it just happened is an answer only in the sense that a shrug is an answer.",
        },
        {
          label: "Even if something caused the universe, that is a long way from Jesus.",
          response:
            "It is, and no Christian should pretend otherwise. The kalam at its best reaches a cause beyond space and time. Christianity makes a far more specific claim, about a man in first-century Judea and what happened to him after he died. One argument cannot carry the other. What the kalam can do is change how the specific claim looks. If there is a maker, a story about that maker acting in history is no longer absurd on its face. It becomes a question about evidence.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. It is evidence, not proof, and it cannot make the choice for you.",
    },
  ],
  close:
    "So here is the whole of it. There may have been a first moment; the physics does not forbid it, and the philosophy gives some reason to expect it. If there was, then everything you have ever known sits downstream of something that did not have to happen, brought about by something none of us made and none of us can see from here. You can say that the universe simply began, for no reason at all, and live there honestly. I only wanted you to feel how large a thing you are saying when you say it.",
};

const CONTINGENCY: ArgumentCase = {
  slug: "contingency",
  essaySlugs: ["does-god-actually-exist"],
  title: "Why is there anything at all?",
  kicker: "The case, one move at a time",
  intro:
    "The kalam asks whether the universe had a beginning. This older argument asks something that would still stand if it never did: why there is anything at all rather than nothing. Nobody brought me to faith by winning a debate, and this argument did not either. What it did was show me that my unbelief was more expensive than I had noticed. We will go one move at a time, and you can push back wherever you disagree.",
  published: true,
  steps: [
    {
      id: "depend",
      move: "Start with a plain distinction. Some things exist but might not have: you, me, this planet, the particular stars overhead. Each depends on something outside itself for being here, on parents, on a collapsing cloud of gas, on a chain of prior conditions. Philosophers call such things contingent. Gottfried Wilhelm Leibniz asked the sharpest form of the question in his Principles of Nature and Grace (1714): why is there something rather than nothing, when nothing would have been simpler and easier? Thomas Aquinas had asked a version of it in the thirteenth century. Neither needed a first moment in time. The question is about what holds things up now, not how they started.",
      objections: [
        {
          label: "Nothing isn't simpler. Something just had to exist.",
          response:
            "That may be right, and if it is, it is already a large concession. To say that something had to exist is to say that at the bottom of reality there is something that could not have failed to be. That is exactly where this argument is headed. The disagreement then becomes what that necessary thing is, whether the universe, its laws or God, which is the right fight to have.",
        },
        {
          label: "Why assume there's an explanation at all?",
          response:
            "That is the crux, and the next move takes it head on. For now, notice that you assume it everywhere else. If you found a glowing sphere in the woods, you would not accept that it is simply there for no reason, and you would not stop asking if someone told you it had always been there. The argument asks whether the whole collection of such things, the universe, is the one thing exempt from the question.",
        },
      ],
      grants:
        "This step names the difference between things that depend on others and things that do not. It has not shown that anything exists that does not depend.",
    },
    {
      id: "reason",
      move: "Leibniz rested the argument on what he called the principle of sufficient reason: for whatever exists, there is a reason why it exists and why it is this way rather than another. Weaker versions ask only that contingent things have explanations. We lean on some version of it every time we investigate anything. A detective who concluded that a body in the library was simply there, for no reason, would be dismissed rather than admired.",
      objections: [
        {
          label: "The principle of sufficient reason isn't self-evident.",
          response:
            "J. L. Mackie said so in The Miracle of Theism (1982), and he is right that it is not self-evident in the way that two plus two is four. Defenders like Alexander Pruss, in The Principle of Sufficient Reason: A Reassessment (2006), argue instead that we cannot coherently do without it: if things can simply occur for no reason, we lose our grounds for trusting that our perceptions and beliefs have the causes they seem to have. You can reject the principle. The cost is that your trust in explanation everywhere else becomes a habit rather than a conviction.",
        },
        {
          label: "The strong version makes everything necessary.",
          response:
            "This is a serious technical objection, and Peter van Inwagen pressed it in An Essay on Free Will (1983). If absolutely every truth has an explanation that guarantees it, then the great fact of how things contingently are would need an explanation that makes it necessary, and then nothing could have been otherwise. Philosophers call that modal collapse, and it would be fatal. Most defenders now use a weaker principle, that every contingent thing has an explanation, rather than that every truth is guaranteed. The weaker principle escapes the collapse. It also gives the argument less to work with, and honesty requires saying so.",
        },
      ],
      grants:
        "This step shows the principle is costly to deny. It does not show that it is true in its strongest form.",
    },
    {
      id: "whole",
      move: "Now apply the principle to the whole. Each contingent thing is explained by other contingent things. But the whole collection, however long, even an infinitely long one, does not explain why there is such a collection at all. Leibniz gave the image in 1697. Imagine a book of geometry that has always existed, each copy made from an earlier copy. You could explain every copy by the one before it and still not have explained why there is such a book, or why it says what it says.",
      objections: [
        {
          label: "Every human has a mother, but the human race doesn't. That's a fallacy.",
          response:
            "Bertrand Russell pressed exactly this against Frederick Copleston on the BBC Third Programme in January 1948, and it lands against careless versions of the argument. But some properties do pass from parts to wholes. A wall built entirely of red bricks is red, and a collection made entirely of things that could have failed to exist looks like something that could itself have failed to exist. Whether contingency passes to the whole is the real question. It is a claim you can dispute, not a logical slip you can dismiss.",
        },
        {
          label: "Explain each part and you've explained the whole.",
          response:
            "Hume made this point in the Dialogues (1779): explain each of twenty particles and it is unreasonable to ask for a separate cause of the twenty. That works when the parts are explained by things outside the collection. It works less well when every explanation is itself another member of the same dependent series. Explaining each link of a hanging chain by the link above it tells you nothing about what the chain hangs from, and an infinitely long chain is still hanging.",
        },
        {
          label: "The universe is just there, and that's all.",
          response:
            "That was Russell's answer to Copleston, nearly word for word: “I should say that the universe is just there, and that's all.” It is not a refutation. It is a place to stop, and every account of reality stops somewhere. The theist stops at a being that could not have failed to be. Russell stopped at a universe that happens to be. The question is which stopping place is more reasonable, and both men understood that neither of them had avoided stopping.",
        },
      ],
      grants:
        "This step shows that the whole of contingent reality would need something beyond itself if the principle holds for the whole. It does not prove that it does.",
    },
    {
      id: "necessary",
      move: "If the chain hangs from something, what could it be? It would have to exist by its own nature, unable not to exist: what philosophers call a necessary being. Aquinas's third way ends here, and so does Leibniz. Two questions follow at once. Does the idea of such a being even make sense, and could the necessary thing simply be the universe itself?",
      objections: [
        {
          label: "Necessary existence is incoherent.",
          response:
            "Hume argued that whatever we can conceive as existing we can also conceive as not existing, so nothing exists necessarily, and Russell added that necessity belongs to statements, not to things. That is a real objection. Defenders reply that what we can seem to conceive is a poor guide here, since we seem to conceive many things that turn out impossible, and that numbers and logical truths are widely thought to exist necessarily. The dispute is live among philosophers. But notice that anyone who says something simply had to exist has already accepted a necessary something.",
        },
        {
          label: "Why not let the universe be the necessary thing?",
          response:
            "Hume asked this too, and Graham Oppy has pressed it hard. If the theist may posit a necessary God, the naturalist may posit a necessary initial state of the physical world, and the two theories are even. That is the best naturalist reply, and I do not think it is easily beaten. The theist's answer is that the physical world bears every mark of contingency, with particular values and arrangements and parts that could have been otherwise, and that it is strange to call necessary a thing whose every detail looks as if it could have been different. That is a judgment, not a proof.",
        },
        {
          label: "Then who made the necessary being?",
          response:
            "Nothing did, if it is what the argument says it is. Asking who made a necessary being is like asking what caused the number seven. The question assumes the necessary being is one more contingent thing and then objects that it needs a cause. You can deny that anything is necessary. What you cannot do is keep the idea and then ask for its maker.",
        },
      ],
      grants:
        "This step shows where the argument ends if it works. It does not rule out that the necessary thing is the universe, and serious philosophers think it could be.",
    },
    {
      id: "which-god",
      move: "Here the argument turns and asks what kind of God, if any, it has found. David Bentley Hart argues in The Experience of God (2013) that the classical traditions never meant by God a very large being inside the universe, a cosmic engineer standing alongside the world. They meant being itself, the reason there is anything to inventory at all. On that reading God is not the biggest item in reality. He is why there is reality.",
      objections: [
        {
          label: "That's redefining God to put him beyond evidence.",
          response:
            "It can sound that way, and some people use it that way. But the view is old, not a modern retreat. Aquinas called God subsistent being itself in the thirteenth century, and the tradition heard the same thing in the name God gave Moses from the bush: “I AM WHO I AM” (Exodus 3:14). The claim is not that God escapes all evidence. It is that he is not the kind of thing you would find by searching the room, because he is the reason there is a room.",
        },
        {
          label: "A ground of being isn't someone who hears prayer.",
          response:
            "This is exactly where Christians themselves divide. Classical theists hold that God is personal though not a person in the way we are; theistic personalists like Richard Swinburne picture God as a perfect person without a body. It is a second-order question, and faithful Christians stand on both sides of it. What this argument reaches, if it reaches anything, is something necessary and underived. Whether that ground knows your name is something this argument alone cannot tell you.",
        },
      ],
      grants:
        "This step shows the argument points toward something like being itself rather than a cosmic engineer. It does not settle whether that ground is personal.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. The argument from contingency does not force anyone to believe. What it does is narrow the disagreement to one point: whether reality can finally be a fact with no explanation. Russell said yes, and that is a coherent answer. The theist says no, and that is a coherent answer too. What neither side gets to say is that the question is silly.",
      objections: [
        {
          label: "I'm fine with brute facts.",
          response:
            "Many careful people are, and I will not call that irrational. Sean Carroll says as much in The Big Picture (2016): at some point explanation stops, and the universe may simply be. I would only ask you to notice what kind of brute fact you are accepting. Not a small unexplained detail, but the existence of everything, your own reasoning included, as a fact with no reason behind it. That may be how things are. It is a very large thing to be at peace with.",
        },
        {
          label: "Even so, this gets me nowhere near Christianity.",
          response:
            "No, and it was never meant to. This argument asks what reality rests on. Christianity says that the one on whom everything rests entered the world he holds up, was killed in it, and was raised. Paul put both claims in one letter: “he is before all things, and in him all things hold together” (Colossians 1:17), and a few verses later he speaks of peace made “by the blood of his cross” (Colossians 1:20). The argument can bring you to the first claim. The second is a matter of history and trust, and it has to be weighed on its own.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. The question stands, and the argument cannot make you answer it one way.",
    },
  ],
  close:
    "So here is the whole of it. You exist, and you did not have to. The same is true of every star you can see, and possibly of the laws that govern them, and of every mind that has ever asked why. Either all of it rests on something that could not have failed to be, or it rests on nothing and simply is. A thoughtful person can stand in either place. I only wanted you to feel the ground under the second one before you settled there, and to notice that the question you may have been taught to wave off is one of the oldest honest questions there is.",
};

const FINE_TUNING: ArgumentCase = {
  slug: "fine-tuning",
  essaySlugs: ["what-secular-explanations-still-have-to-explain"],
  title: "Is the universe tuned for life?",
  kicker: "The case, one move at a time",
  intro:
    "This argument is easy to cheapen, and both sides have cheapened it. Apologists have oversold it, and critics have waved it off as a misunderstanding. The working physicists who study it are more interesting than either. We will go one move at a time. At each step, push back with the objection you actually hold, and I will tell you what the move does not prove.",
  published: true,
  steps: [
    {
      id: "data",
      move: "Start with the data, which is not an apologist's invention. The laws of physics contain constants whose values the laws themselves do not fix: the strengths of the forces, the masses of particles, the energy of empty space. Physicists have found that relatively small changes to several of them would, as far as current physics can tell, produce a universe without stable atoms, long-lived stars or the chemistry life needs. Martin Rees, Britain's Astronomer Royal and no apologist, set this out in Just Six Numbers (1999). One of his six is the fraction of mass turned into energy when hydrogen fuses into helium, about 0.007. At 0.006 or 0.008, he explains, the chemistry of the universe would be unrecognizable and lifeless.",
      objections: [
        {
          label: "Victor Stenger showed most of this is overstated.",
          response:
            "Stenger argued in The Fallacy of Fine-Tuning (2011) that many claimed examples dissolve when you vary several constants at once. That is a fair point of method, and some popular claims have been sloppy. The astrophysicist Luke Barnes answered him in a long technical review in 2012, and with Geraint Lewis concluded in A Fortunate Universe (2016) that fine-tuning is a real feature of current physics, while the two of them openly disagree about what it means. The data, stated carefully, survives. What it implies is the argument.",
        },
        {
          label: "Life could exist in forms we can't imagine.",
          response:
            "Possibly, and the claim should always carry that caution: life-permitting as far as we can tell. But most of the examples concern whether there would be stable atoms at all, stars that burn for billions of years, or any chemistry worth the name. It is hard to picture life of any kind in a universe of pure hydrogen, or one that collapses a moment after it begins. The objection is true in principle and weaker in practice than it sounds.",
        },
      ],
      grants:
        "This step establishes that current physics describes a narrow life-permitting range. It says nothing yet about why.",
    },
    {
      id: "options",
      move: "So the question is how to explain it, and there are roughly three options. Physical necessity: a deeper theory fixes the constants where they are. Chance: we were lucky. Design: a mind chose them. Each deserves a fair hearing before any verdict.",
      objections: [
        {
          label: "A deeper theory will fix the constants.",
          response:
            "It might, and a Christian has no stake in hoping it won't. If it does, the question moves rather than disappears: why is the deeper theory one that yields a life-permitting universe rather than a lifeless one? A law that requires life-friendly values is as remarkable as the values themselves. But I grant that this option is live, and that if it came true it would reduce the argument's force.",
        },
        {
          label: "Any set of values is unlikely. So what?",
          response:
            "Any hand of cards is unlikely, true. What draws attention is not improbability alone but improbability that lines up with something significant. If you are dealt a random hand, no one asks questions. If you are dealt a royal flush every hand all night, people start asking about the dealer, and they are right to. The argument claims the constants are not merely unlikely but unlikely in a way that matches the one outcome that could notice them.",
        },
        {
          label: "You can't assign probabilities to constants with no known range.",
          response:
            "This is the sharpest technical objection, and it has come from Christians as well as skeptics. Timothy McGrew, Lydia McGrew and Eric Vestrup argued in the journal Mind in 2001 that if a constant could in principle take any value across an infinite range, the probabilities cannot be properly defined, and the argument's numbers lose their meaning. Defenders reply that physicists work within the range where current theory is valid, and that judgments of narrowness do not need exact figures. The debate is unresolved. It is a good reason to hold the argument with an open hand.",
        },
      ],
      grants:
        "This step lays out the options and admits that the probabilities are harder to state than popular versions suggest. Nothing has been chosen yet.",
    },
    {
      id: "anthropic",
      move: "The first naturalist reply is the anthropic principle, named by the physicist Brandon Carter in 1973: we could only find ourselves in a universe that permits observers, so we should not be surprised to observe one. That is true. The question is whether it explains anything.",
      objections: [
        {
          label: "Of course we see a life-friendly universe. We couldn't see any other.",
          response:
            "Agreed, and the philosopher John Leslie showed what that point does and does not do in Universes (1989). A man faces a firing squad of fifty trained marksmen, and all of them miss. He should not be surprised that he is alive to notice he survived, since dead men notice nothing. He should be very surprised that he survived, and right to ask whether the misses were arranged. The anthropic principle explains why we observe what we observe. It does not explain why there is something so improbable to observe.",
        },
        {
          label: "The firing squad sneaks in a designer.",
          response:
            "It sneaks in a question, not an answer. The analogy works whether the survivor ends up concluding that the squad was bribed, or that there were thousands of executions that day and he is the one lucky man among them. Both are explanations. What does not count as an explanation is saying he had to survive or he would not be here to wonder about it. That is the only answer the analogy rules out.",
        },
      ],
      grants:
        "This step shows the anthropic principle is true but does not by itself explain the fine-tuning. It does not rule out chance on a much larger scale.",
    },
    {
      id: "multiverse",
      move: "That brings us to the strongest reply: many universes. Several lines of current physics, cosmic inflation among them, suggest that our universe may be one region among a vast number with differing constants. If enough tickets are drawn, a winning ticket is no marvel. Rees himself leans this way. It is not a desperate move.",
      objections: [
        {
          label: "The multiverse is real physics, not an escape hatch.",
          response:
            "Yes, and it has a striking success on its record. In 1987 Steven Weinberg used anthropic reasoning to set a bound on the cosmological constant, and on that reasoning a small value that was not zero would be no surprise. A decade later, in 1998, observations showed the expansion of the universe accelerating, which is what a small positive constant produces. Many physicists count that as a genuine anthropic success, and it gives the multiverse a scientific standing I will not wave away. A Christian has no stake in denying it either. God can make as many worlds as he likes.",
        },
        {
          label: "Then the fine-tuning is explained. Case closed.",
          response:
            "Not quite, for two reasons. First, a mechanism that generates universes with varying constants is itself a law-governed, carefully structured system, and the question of why there is such a machine comes back one level up. Second, the philosopher Ian Hacking argued in Mind in 1987 that one form of the inference, from our fortunate universe to a long sequence of earlier universes, commits what he called the inverse gambler's fallacy. John Leslie replied the next year that the charge misfires against other versions, and philosophers still dispute it. The multiverse may well be true. It relocates the question more than it dissolves it.",
        },
        {
          label: "Positing God is no better. Both are unobservable.",
          response:
            "That is a fair point about parity, and I accept it as far as it goes. Both are inferences to something we cannot see directly, justified, if at all, by what they explain. The honest comparison is between them as explanations: which is simpler, which explains more, which fits other things we have reason to believe. Reasonable people land differently. What neither side may say is that its own unobservable is science and the other's is superstition.",
        },
      ],
      grants:
        "This step shows the multiverse is a serious alternative. It does not show that it is true, or that it removes the need for a further explanation.",
    },
    {
      id: "designer",
      move: "Now turn to the design hypothesis and press it as hard as the critics do. If a mind chose the constants, what kind of mind, and does that hypothesis actually predict the universe we see?",
      objections: [
        {
          label: "Who designed the designer?",
          response:
            "Richard Dawkins made this the center of The God Delusion (2006): a designer complex enough to tune a universe would need more explaining than the universe does. That is a good objection to a designer who is one more complicated thing inside reality. It misses the God of the classical tradition, who is not assembled from parts and is not an improbable arrangement of anything. You can doubt that such a God exists. But the objection is aimed at a different God from the one most Christians have confessed.",
        },
        {
          label: "An all-powerful God wouldn't need fine-tuning.",
          response:
            "This is Sean Carroll's objection, and I think it is the strongest one. A God who could sustain life by sheer will in any universe did not need to balance the constants at all, so fine-tuning is not what theism predicts. The Christian reply is that God did not need a finely tuned universe but may have chosen one, preferring a world with its own integrity that holds by law rather than by constant repair. That is an answer from inside the faith, not a proof from outside it. It is coherent, and it does not compel.",
        },
        {
          label: "Most of the universe is hostile to life. Some design.",
          response:
            "It is vast, cold and almost entirely empty, and life on this planet has come close to being wiped out more than once. That is a real observation, and it cuts against any picture of a universe built like a nursery. It fits less poorly with a God whose purposes are not centered on our comfort, the God who answers Job out of the whirlwind by pointing to stars and wild creatures that have nothing to do with Job at all. But I grant that it makes design look less like engineering and more like something stranger.",
        },
      ],
      grants:
        "This step shows the design hypothesis faces real objections, one of which Christians have not fully answered. It does not take design off the table.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. Fine-tuning proves nothing. It is evidence to be weighed, and it weighs something. Barnes and Lewis, two working astrophysicists, disagree with each other about what it means, and that disagreement is the honest state of the field. The psalmist did not need the cosmological constant to write that “the heavens declare the glory of God” (Psalm 19:1). But the more we learn about the sky, the less it sounds like noise.",
      objections: [
        {
          label: "It still looks like a god of the gaps.",
          response:
            "It would, if the argument were waiting for science to fail. It is not. Fine-tuning comes out of the success of physics, not its failure, and it has grown sharper as the measurements improved. If a deeper theory explains the values, the question rises to that theory. The argument sits at the level of why the laws are the kind that allow anything interesting to exist. That is not a hole in the mechanism. It is a question about the mechanism.",
        },
        {
          label: "So you believe because of physics?",
          response:
            "No, and I would be suspicious of anyone who did. Christianity does not rest on fine-tuning; it rests on a man raised from the dead and on whether that happened. What fine-tuning can do is remove one reason people give for never looking, the sense that the universe is obviously a blind accident with nothing about it to suggest otherwise. It suggests otherwise. Whether you follow the suggestion is a separate decision, and the numbers cannot make it for you.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. It is evidence, contested evidence, and no more than that.",
    },
  ],
  close:
    "So here is the whole of it. The universe sits in a narrow band where stars burn long enough and chemistry runs rich enough for anything to be here asking about it. Perhaps a deeper law explains that, or a vast lottery of worlds, or a mind that chose it, and serious people hold each view. I will not tell you the numbers force you to God. I only wanted you to know that when you look up on a clear night and feel that the sky is saying something, you are not being sentimental. You are noticing what the physicists noticed first, and they have not yet agreed on what it means.",
};

const MORAL: ArgumentCase = {
  slug: "moral",
  essaySlugs: ["can-you-be-good-without-god"],
  title: "Can right and wrong be real without God?",
  kicker: "The case, one move at a time",
  intro:
    "Begin with the concession, because this argument collapses the moment it becomes grudging: you do not need to believe in God to be good. When I was an atheist, the decent unbelievers in my life were not a category in someone's lecture. They were people I knew. The question here is quieter and harder than whether they were good. We will go one move at a time, and you can push back at every step.",
  published: true,
  steps: [
    {
      id: "distinction",
      move: "Philosophers keep apart two questions the popular debate runs together. One concerns moral knowledge and behavior: how we come to know that cruelty is wrong, and whether we act on it. The other concerns what right and wrong actually are, what makes cruelty wrong rather than merely unpopular. The moral argument for God, in the form serious people make it, grants the atheist everything on the first question. Its question is whether his picture of the world has room for the thing he knows.",
      objections: [
        {
          label: "Christians do say atheists can't be moral.",
          response:
            "Some have, and we have earned the contempt that followed. It is false, and it contradicts Paul, who says that Gentiles without the law sometimes do by nature what the law requires, and that “they show that the work of the law is written on their hearts” (Romans 2:15). Any Christian who uses this argument to suggest unbelievers are worse people has misunderstood it and deserves to be corrected, beginning with pastors.",
        },
        {
          label: "This distinction just moves the goalposts.",
          response:
            "I understand the suspicion. But it is the distinction philosophers on every side use, atheists like J. L. Mackie included. Knowing that something is the case and explaining what makes it so are different tasks in every field. You can know that water freezes without knowing any chemistry. The question here is not whether you know cruelty is wrong. It is what that wrongness consists in.",
        },
      ],
      grants:
        "This step clears away a slander and names the real question. It says nothing yet about the answer.",
    },
    {
      id: "binding",
      move: "So press the question gently. When you say that gratuitous cruelty is wrong, you do not mean you dislike it the way you dislike a certain food. You mean it would be wrong even if a whole society approved of it. That is why we honor the abolitionists who called slavery evil while their country's law protected it. They were not proposing a better contract. They were saying the contract itself stood condemned by something higher, and we remember them as right and the law as wrong.",
      objections: [
        {
          label: "Morality is just what cultures agree on.",
          response:
            "Then the abolitionists were wrong until they won, and the slaveholders were right until they lost. Almost no one believes that when they think about a particular case. Mackie, who denied objective values, pointed to moral disagreement across cultures as evidence for his view. But disagreement about what is right does not show there is no right, any more than disagreement about the shape of the earth showed it had no shape. The relativist has to say that reform is only change. None of us talks or lives that way.",
        },
        {
          label: "Evolution explains our moral feelings. No objectivity needed.",
          response:
            "It explains a great deal, and it is the explanation I lived inside. Darwin argued in The Descent of Man (1871) that the moral sense grew from social instincts, and he was honest about the implication: had human beings been raised under conditions like those of hive-bees, he suggested, unmarried females might think it a sacred duty to kill their brothers. That explains why we have the moral feelings we have. It does not tell us whether any of them are correct. The feeling that cruelty is wrong and the fact that it is wrong are different things, and evolution speaks only to the first.",
        },
      ],
      grants:
        "This step shows that most of us believe in moral facts that bind regardless of opinion. It does not show that the belief is true.",
    },
    {
      id: "debunk",
      move: "The hardest challenge to that belief comes from a naturalist who took Darwin at his word. Sharon Street argued in 2006, in “A Darwinian Dilemma for Realist Theories of Value,” that if natural selection shaped our moral attitudes, the realist must say either that those attitudes track independent moral truths, which is poor biology, or that they do not, in which case any match between our moral beliefs and the moral truth is a fluke. Street concluded that value is constructed by valuing creatures rather than discovered.",
      objections: [
        {
          label: "Then Street is right. Moral facts are constructed.",
          response:
            "That is a coherent position, and Street defends it with care. It even leaves room for error, since a person can be mistaken about what his own deepest values commit him to. But notice what it costs. On her view, the torturer is not wrong in any sense that holds apart from the standpoint of valuing creatures. If a whole species were built to prize cruelty, cruelty would not be wrong for them. Try living inside that sentence. I held a view like it once, and I could never get my life to sit down inside it.",
        },
        {
          label: "Philip Kitcher gives a naturalist account that works.",
          response:
            "Kitcher's The Ethical Project (2011) is one of the most serious attempts. He tells the story of ethics as a social technology our ancestors developed to repair failures of altruism, refined over thousands of years, with progress measured by how well it solves those problems. It is humane and historically rich. It also makes moral progress a matter of better problem-solving rather than the discovery of what was always true. If you are content with that, the moral argument will not move you. If you think the abolitionists found something rather than engineered it, you need more than Kitcher offers.",
        },
        {
          label: "The same argument would debunk a God-given morality.",
          response:
            "It is a fair question. The Christian answer is that the one whose character is the good also made the minds that perceive it, “in his own image” (Genesis 1:27), so the match between moral belief and moral truth is no accident, and selection could be one of the means. That is what philosophers call a third-factor explanation, and it has the same shape as the one some atheists now offer. The question becomes which third factor better explains a world where moral facts bind and moral minds can read them.",
        },
      ],
      grants:
        "This step shows evolution creates a real problem for moral realism without God. It does not show that God solves it, only that theism has an answer ready.",
    },
    {
      id: "euthyphro",
      move: "The skeptic has a reply older than the church. In Plato's Euthyphro, Socrates asks whether the holy is loved by the gods because it is holy, or holy because the gods love it. Put in biblical terms: is a thing good because God commands it, or does God command it because it is good? If the first, goodness is arbitrary. If the second, goodness stands above God and you do not need him. I sprang that trap on believers with real satisfaction.",
      objections: [
        {
          label: "Either God is arbitrary or God is redundant. Pick one.",
          response:
            "The older Christian answer took neither horn, and Robert Merrihew Adams gave its modern form in Finite and Infinite Goods (1999). The good is God himself, the standard of excellence in person, and our obligations arise from the commands of a God who is loving and just. So his commands are not arbitrary, because they flow from a character that was never chosen and could not be otherwise. And goodness does not stand above God, because goodness is what God is. Jesus said as much: “No one is good except God alone” (Mark 10:18).",
        },
        {
          label: "That just moves the question. Why is God's nature the standard?",
          response:
            "Every account of morality stops somewhere, and the question is whether it stops at something that could serve as a standard. A nature that is perfectly loving, just and wise is the kind of thing that could. The atheist realist stops at brute moral facts, and the constructivist stops at our attitudes. Adams's answer does not prove that God exists. It shows that the Euthyphro refutes a caricature of Christian ethics, not the thing itself.",
        },
      ],
      grants:
        "This step shows the Euthyphro dilemma has a coherent answer. It does not show that the answer is true.",
    },
    {
      id: "realism",
      move: "Now the strongest alternative, where the argument should be resisted if it is resisted anywhere. Some atheists refuse both relativism and construction. Derek Parfit in On What Matters (2011) and Erik Wielenberg in Robust Ethics (2014) defend moral facts that are real, objective and binding without God, necessary truths like the truths of mathematics. If you are going to reject the moral argument, reject it here.",
      objections: [
        {
          label: "Moral facts are like math. No God required.",
          response:
            "That is a serious metaphysics, and it deserves respect. But it carries two costs, each drawn up by philosophers with no interest in defending God. Mackie called such facts queer: entities unlike anything else in the universe, which require something of you merely by existing and would need a faculty unlike any of our ordinary ways of knowing. And he conceded in The Miracle of Theism (1982) that objective values, if there were any, would make God's existence more probable. The robust realist keeps the strange facts and declines the frame that would make them less strange. He is entitled to. He is also carrying a stranger cargo than he usually admits.",
        },
        {
          label: "Wielenberg has an answer to Street.",
          response:
            "He does, and it is ingenious. The capacities that lead us to believe persons have rights, he argues, are the same capacities that make us beings who have rights, so belief and fact share a cause and their agreement is not luck. The Christian account has exactly that shape with a different third factor. So the choice is between two explanations of the same fit. That is a real contest, not a rout, and I would rather name it that way.",
        },
        {
          label: "Guilt is just a feeling. It proves nothing.",
          response:
            "On its own, it proves nothing. But it has a texture worth noticing. The truth that a triangle's angles sum to two right angles makes no claim on my will. The truth that I must not betray a friend does, and when I ignore it I do not feel I have made an error in arithmetic. I feel I owe someone. Adams takes that at face value: obligation is a demand made by someone on someone. The robust realist has a law without a lawgiver and a debt without a creditor. That is consistent. It is also strange.",
        },
      ],
      grants:
        "This step shows that robust atheist realism is coherent and serious. It argues only that it pays a price theism does not.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. None of this proves God, and none of it says unbelievers are not good. The argument narrows to a choice. Give up the bindingness of morality, as Street and Mackie did in their different ways. Give up pure naturalism, as Parfit and Wielenberg in effect did. Or find the ground of the moral law in a person. Nietzsche saw that the morality of the West would not survive the death of its God by default, and, unlike most of us, he did not want it to.",
      objections: [
        {
          label: "I can live morally without answering this.",
          response:
            "You can, and most people do, the atheist I was included. We go on treating certain things as really wrong without auditing the ground beneath them. I only want you to notice that you are standing on something, and that the question of what it is does not go away because you are standing firmly. The firmness is part of the evidence.",
        },
        {
          label: "Christians have often been worse than atheists.",
          response:
            "Sometimes, and badly. In 1845 Baptists in the South left their national mission body over whether a slaveholder could be appointed a missionary, while confessing every doctrine that grounds human dignity in the image of God. That is a judgment on the church, not a defense of it. If the moral law is real, it judges its keepers first, and Paul's argument in Romans ends with everyone under it, the religious judge included: “for all have sinned and fall short of the glory of God” (Romans 3:23). The moral argument is a mirror before it is ever a weapon.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. It clarifies the choice. It cannot make it for you.",
    },
  ],
  close:
    "So here is the whole of it. You can be good without God, and people without faith are often better than we are. The question was always what good is, why it holds when no one is feeling it, and how a clever animal on a cooling planet came to be bound by something it did not invent. I never answered that in all the years I argued it. I simply went on treating cruelty as really wrong, and so did the people I knew who believed nothing. The next time you know, with a certainty no argument can shake, that something is wrong, it may be worth asking whose voice you are hearing.",
};

const CONSCIOUSNESS: ArgumentCase = {
  slug: "consciousness",
  essaySlugs: ["what-secular-explanations-still-have-to-explain", "personhood-in-the-age-of-ai"],
  title: "Can the brain explain the mind?",
  kicker: "The case, one move at a time",
  intro:
    "This is not a gap argument, and I will try hard not to turn it into one. Neuroscience is one of the great achievements of our age, and nothing here asks you to doubt a single finding in it. The question is narrower and stranger than that. We will go one move at a time. Raise the objection you actually hold, and I will tell you what each move does not prove.",
  published: true,
  steps: [
    {
      id: "hard",
      move: "Begin with the plain fact that there is something it is like to be you. In 1974 the atheist philosopher Thomas Nagel asked, in “What Is It Like to Be a Bat?”, whether we could know everything about a bat's brain and still not know what it is like, from the inside, to be the bat. In 1995 David Chalmers gave the difficulty its working name. The easy problems of consciousness, how the brain discriminates stimuli, integrates information and reports on its states, are hard enough to occupy neuroscience for a century, but we know what solving them would look like. The hard problem is why any of that processing is accompanied by experience at all.",
      objections: [
        {
          label: "Neuroscience is explaining consciousness right now.",
          response:
            "It is explaining a great deal, and the correlations between brain states and experiences are among the most important discoveries of the last century. The hard problem denies none of it. It asks why these physical processes feel like anything from the inside. A complete map of which neurons fire when you see red would still leave the redness of red, as you experience it, as a further fact. That is why Chalmers, who is not a theist, calls it hard.",
        },
        {
          label: "The hard problem is just an intuition. Intuitions mislead.",
          response:
            "They can. But this intuition is not about some remote matter. It concerns the thing you know most directly, that you are having experiences at all. Every other piece of evidence, including every experiment in neuroscience, reaches you through that fact. If the conviction that experience exists cannot be trusted, it is hard to see what else could be.",
        },
      ],
      grants:
        "This step names the hard problem. It says nothing about God, and many who accept it are atheists.",
    },
    {
      id: "mill",
      move: "The difficulty is older than its name. Leibniz, in the Monadology (1714), asked us to imagine a thinking machine enlarged until we could walk inside it as into a mill. We would find parts pushing on one another and nothing that explains a perception. Frank Jackson sharpened the point in 1982 with a thought experiment about Mary, a scientist who knows every physical fact about color but has lived her whole life in a black-and-white room. When she walks out and sees a red tomato for the first time, does she learn something new?",
      objections: [
        {
          label: "Mary learns nothing new. She just gains an ability.",
          response:
            "That is the reply of physicalists like David Lewis, and it is a serious one: what Mary gains is know-how, the ability to recognize and imagine red, not a new fact. Jackson himself later changed his mind and became a physicalist. So the thought experiment is no knockdown. But notice what the reply concedes. Complete physical knowledge left Mary unable to know what seeing red is like until she had the experience. Call it a new fact or a new ability; the physics alone did not give it to her.",
        },
        {
          label: "Leibniz lacked modern neuroscience.",
          response:
            "He did, but his point was never about the details of the machinery. Replace his gears with neurons and neurotransmitters and the image survives. Walk through a brain the size of a mill and you will see channels opening, charges moving and chemicals binding. At no point will you see a pain or the taste of coffee. The better the map becomes, the clearer it is that it maps the mechanism and not the experience.",
        },
      ],
      grants:
        "This step shows the problem is old and persistent. It does not prove that experience is non-physical.",
    },
    {
      id: "replies",
      move: "Now give the naturalist replies at full strength. Some, like the physicist Sean Carroll, hold that consciousness is a higher-level way of describing what brains do and that the science is unfinished. Others go further. Daniel Dennett argued in Consciousness Explained (1991) that the private inner qualities we think we have are not what they seem, and that once the easy problems are solved nothing will be left over. The philosopher Keith Frankish has called that view illusionism.",
      objections: [
        {
          label: "Life once seemed inexplicable too, until biochemistry.",
          response:
            "That is the best argument on the naturalist side. People once thought life required a vital spark, and physicalists like Patricia Churchland have pressed the parallel: vitalism dissolved when the mechanisms were found, and the hard problem will dissolve the same way. It may. But the analogy has a limit. Life was always identified by what it does, metabolism and reproduction and growth, so explaining those functions explained life. Consciousness is not identified by its functions. You could, in principle, explain every function and still ask why any of it is experienced. That is why the hard problem has not shrunk as neuroscience has grown.",
        },
        {
          label: "Illusionism is the honest answer. Experience isn't what it seems.",
          response:
            "It is a bold position, and Dennett argued it with great skill. But an illusion is itself something experienced; there has to be a seeming for something to seem. If experience is an illusion, what is the illusion appearing to? Illusionists have answers to that question, and they deserve to be read. I have not yet found one that does not quietly use the thing it denies. That does not refute the view, but it makes it a harder bet than its confident defenders suggest.",
        },
        {
          label: "This is an argument from ignorance.",
          response:
            "It would be if I said that we cannot explain experience, so God did it. I am not saying that. I am saying the difficulty is not the ordinary kind of ignorance that the next discovery removes. It is a mismatch between the kind of explanation physics gives, which is structure and function, and the kind of thing experience is. Chalmers says the same, and he draws a naturalist conclusion from it. The real question is what kind of world makes minds unsurprising.",
        },
      ],
      grants:
        "This step shows the naturalist replies are serious and unfinished. It does not show that they will fail.",
    },
    {
      id: "options",
      move: "So what are the options, if experience is real and not reducible to physics? Either it is a basic feature of nature, or it belongs in a world whose ground is itself mind. Chalmers leans toward the first. Philip Goff, in Galileo's Error (2019), has revived panpsychism, the view that some form of experience is present in the basic stuff of the world. Theists like Richard Swinburne have argued that consciousness is better explained if mind lies at the bottom of things than if it appeared late and by accident.",
      objections: [
        {
          label: "Panpsychism explains consciousness without God.",
          response:
            "It may, and I respect its honesty. It takes the hard problem seriously and refuses to pretend it away. It also pays a price. It has to explain how tiny flickers of experience in particles combine into the unified experience of a person, which its own defenders call the combination problem and admit is unsolved. Theism says that mind came first and that our minds are made in the image of a mind. Neither view is proven. Both are attempts to live honestly with the same fact.",
        },
        {
          label: "Christians just believe in a ghost in the machine.",
          response:
            "Some do, and the picture of the soul as a separate substance pulling levers in the brain has real problems. But the Christian tradition is wider than that picture. Thomas Aquinas held that the soul is the form of the body, not a passenger in it, and some Christian philosophers today, like Nancey Murphy, are physicalists about the human person. What Christians share is not a theory of the mechanism. It is the conviction that personal existence is no late accident in an impersonal universe, because the ground of reality is personal.",
        },
      ],
      grants:
        "This step shows there are several ways to take consciousness seriously, and God is only one of them. It does not choose among them.",
    },
    {
      id: "witness",
      move: "Then notice who refuses to be satisfied. Thomas Nagel, who admitted in The Last Word (1997) that he hopes there is no God, argued in Mind and Cosmos (2012) that the materialist neo-Darwinian conception of nature is, in the words of his subtitle, “almost certainly false,” because it cannot account for consciousness, reason and value. He reached for a natural purpose in the cosmos rather than for God, and many of his colleagues received the book harshly.",
      objections: [
        {
          label: "Nagel was widely criticized. One dissenter proves nothing.",
          response:
            "He was, and on its own it proves nothing. I mention him not as an authority but as a witness against his own interest. An atheist of the first rank, with every motive to find the standard story sufficient, looked at the same remainder and said the account was not closed. That does not make him right. It does make the question more than a believer's wish.",
        },
        {
          label: "Damage the brain and the mind changes. The mind is the brain.",
          response:
            "That is true, and it is the most intuitive evidence against any view that separates mind from body too sharply. Injury, disease and drugs change who we are, and anyone who has watched a parent through dementia knows it in their bones. The Christian faith has never said the mind floats free of the body; it confesses the resurrection of the body because a person without one is incomplete. The dependence shows that the mind works through the brain. By itself it does not show that the mind is nothing but the brain's activity, though I grant it is the evidence a materialist would expect to find.",
        },
      ],
      grants:
        "This step shows serious unbelievers share the worry. It does not make the worry decisive.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. The hard problem does not prove God. It shows that the most intimate fact you know, that you are awake and experiencing this sentence, has not been explained by the account of the world that claims to explain everything else. There is a light on inside you, and no one has yet said why.",
      objections: [
        {
          label: "Science will get there eventually.",
          response:
            "It may, and if it does I will read the paper with real interest. But notice what kind of confidence that is. It is a promissory note, and a reasonable one to write if you already believe matter is all there is. It is much less reasonable as a reason to believe that. The difficulty Nagel named in 1974 is recognizably the one Leibniz named in 1714, and the neuroscience in between has mapped the correlates of experience without saying why they are experienced. That may change. It has not changed yet.",
        },
        {
          label: "Even granting all of this, it's a long way to Christianity.",
          response:
            "A very long way, and I will not pretend otherwise. The most this argument reaches is that mind is not a late accident in the universe. The Christian claim is that the ground of all things is not only mind but Word, and that “the Word became flesh and dwelt among us” (John 1:14), a man with a body and a face. That claim has to be weighed on other evidence. But if mind lies at the bottom of things, a God who speaks is no longer an absurd idea.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. It leaves the question open and points one way.",
    },
  ],
  close:
    "So here is the whole of it. You are having an experience right now, the color of this page and the sound of your own voice reading in your head, and the most complete physical account we possess does not say why any of it feels like anything. Perhaps one day it will. Perhaps experience is woven into matter itself. Or perhaps the light on inside you is there because the world was made by someone who also sees. I will not tell you which. I only wanted you to stop treating the most astonishing fact you know as though it were the most ordinary one.",
};

const REASON: ArgumentCase = {
  slug: "reason",
  essaySlugs: ["what-secular-explanations-still-have-to-explain"],
  title: "Can you trust your mind without God?",
  kicker: "The case, one move at a time",
  intro:
    "Every argument you have ever weighed, here or anywhere, was weighed by your mind. This case asks a question about that instrument itself: whether the account of the world many of us were taught gives us any reason to trust it. When these questions came up in my atheist years, I waved them away. We will go one move at a time, and you can push back at every step.",
  published: true,
  steps: [
    {
      id: "doubt",
      move: "Darwin felt this first. In a letter to William Graham dated 3 July 1881, he wrote: “With me the horrid doubt always arises whether the convictions of man's mind, which has been developed from the mind of the lower animals, are of any value or at all trustworthy.” The worry is simple to state. If our minds were shaped by a process that cared only about survival, why think they are good at finding truth, especially truth far from survival, in philosophy or cosmology?",
      objections: [
        {
          label: "It's one letter. Darwin was having a bad day.",
          response:
            "It is one letter, and I do not want to make Darwin a secret theist; he was not. But the sentence is precise, and it names a problem that many thinkers since, believers and unbelievers, have taken seriously. I quote it not to borrow Darwin's authority but to show that the question is not a religious invention. It came from inside the theory.",
        },
        {
          label: "True beliefs help survival, so evolution selects for truth.",
          response:
            "That is the most natural reply, and there is a great deal to it. A creature that believes the lion is a rock gets eaten. For beliefs about lions, rivers and ripe fruit, truth and survival run together. The question is whether that relationship reaches as far as we need it to reach, to theories of quantum fields or arguments about whether naturalism itself is true. The next moves take that up directly.",
        },
      ],
      grants:
        "This step names the worry. It does not show that evolution produces unreliable minds.",
    },
    {
      id: "lewis",
      move: "C. S. Lewis built an argument on the same nerve in Miracles (1947). If every thought is wholly the product of nonrational causes, the reasoning by which we conclude that naturalism is true seems to lose its claim on us. In February 1948 the philosopher Elizabeth Anscombe, herself a Christian, criticized the argument at the Oxford Socratic Club for failing to separate the causes of a belief from its grounds. Lewis took the criticism seriously and rewrote the chapter for the 1960 edition.",
      objections: [
        {
          label: "Anscombe refuted Lewis, and he knew it.",
          response:
            "She exposed a real flaw, and he admitted it by rewriting, which is to his credit and a model for how this argument should be held. How much the exchange shook him is disputed. What is not disputed is that he revised the argument into a stronger form, and Victor Reppert defended that revised version at length in C. S. Lewis's Dangerous Idea (2003). The revised question is whether, on naturalism, a belief can ever be held because of its grounds, rather than merely caused by events that happen to line up with the grounds some of the time.",
        },
        {
          label: "Causes and reasons don't compete. A calculator is caused and correct.",
          response:
            "This is the best reply, and it shows the argument needs care. But notice why the calculator is reliable. Someone designed it to follow the rules of arithmetic, so its causal processes track the truth because a mind arranged them to. The question for naturalism is what arranged our causal processes to track truth, and whether natural selection can do that job for every kind of truth we claim to know.",
        },
      ],
      grants:
        "This step shows the argument from reason has a history of honest revision. It does not show that the revised version wins.",
    },
    {
      id: "plantinga",
      move: "Alvin Plantinga gave the argument its modern shape in Warrant and Proper Function (1993) and Where the Conflict Really Lies (2011). Natural selection rewards adaptive behavior, not true belief as such. So if naturalism and evolution are both true, the probability that our faculties are reliable is either low or impossible to estimate, and someone who accepts both has a reason to doubt the very faculties that produced his belief in both. Note his target. It is not evolution. It is evolution paired with naturalism.",
      objections: [
        {
          label: "Behavior comes from beliefs, so selecting behavior selects true beliefs.",
          response:
            "That is the heart of the naturalist reply, and it is strong. Plantinga's answer is that many different combinations of belief and desire can produce the same useful behavior. A creature might flee the tiger because it believes the tiger is dangerous, or because it wants to run and believes running wins a prize. Selection sees the running, not the reasons. Critics call such scenarios far-fetched, and in part they are. The live question is how much of our belief-forming, especially abstract reasoning, selection actually shaped for accuracy.",
        },
        {
          label: "Plantinga's probabilities can't be assessed.",
          response:
            "This is the most technical objection. Branden Fitelson and Elliott Sober argued in 1998 that Plantinga's probability assignments are unsupported. Plantinga replied that if the probability is simply inscrutable, that is already enough to generate the doubt. The collection Naturalism Defeated? (2002), in which critics press him and he answers, shows how hard both sides have pushed. I think the argument is serious and not decisive, and I would not want you to hear it as more than that.",
        },
        {
          label: "Evolutionary debunking cuts against belief in God too.",
          response:
            "It does, and the cognitive science of religion makes the point: we may be built to see agents where there are none. Plantinga's answer is that the two cases are not parallel. If theism is true, God could use evolution to make minds aimed at truth, so the theist has a reason to trust his faculties. The naturalist has to hope that a process indifferent to truth produced truth-trackers reliable enough to discover that it was indifferent to truth. That may be so. It is more of a bet than it sounds.",
        },
      ],
      grants:
        "This step gives the argument its strongest form and names its strongest critics. It does not settle the probabilities.",
    },
    {
      id: "fitness",
      move: "A surprising witness has since arrived from the scientific side. The cognitive scientist Donald Hoffman, who makes no theological argument, argued in The Case Against Reality (2019) that evolutionary game theory suggests perception tuned for fitness will generally not show us the world as it is. Fitness, he argues, beats truth. He draws a radical conclusion about perception that Plantinga would reject. But his starting point is Darwin's horrid doubt, put into mathematics.",
      objections: [
        {
          label: "Hoffman is an outlier. Most cognitive scientists disagree.",
          response:
            "Many do, and I am not offering him as the consensus. I mention him because he shows the worry is not a theological trick. A working scientist, reasoning from evolution alone, concluded that selection does not guarantee accurate perception. If that holds for perception, it is harder, not easier, to assume it for abstract reasoning.",
        },
        {
          label: "Science works. That proves our minds are reliable.",
          response:
            "The success of science is excellent evidence that our minds are reliable, and I believe they are. The question is not whether they are reliable but whether naturalism explains why. Theism has an explanation ready: the mind was made by Mind, for truth. “In the beginning was the Word” (John 1:1), and John chose a word his Greek readers heard as the reason in things. The naturalist trusts reason as much as I do. He has to bring that trust with him rather than receive it from his account of the world.",
        },
      ],
      grants:
        "This step shows the worry is shared by scientists with no theological case to make. It does not show that they share Plantinga's conclusion.",
    },
    {
      id: "mathematics",
      move: "Then the stranger fact. In 1960 the physicist Eugene Wigner published an essay titled “The Unreasonable Effectiveness of Mathematics in the Natural Sciences.” Concepts that mathematicians develop for their elegance turn out, sometimes decades later, to be the ones the world obeys. In 1846 Urbain Le Verrier predicted, from calculations on paper, the position of a planet no one had seen, and Neptune turned up close to where he said it would.",
      objections: [
        {
          label: "Minds that couldn't track reality got eaten. Of course we're good at this.",
          response:
            "For counting lions and judging the distance to the river, yes. Selection can explain why our ancestors managed the arithmetic of survival. It has far less obvious purchase on why the same organ can find, in pure thought, the equations of fields no ancestor ever met. Wigner closed his essay by calling this a gift we neither understand nor deserve. He was not making a religious argument. He was reporting astonishment.",
        },
        {
          label: "Mathematics is a human invention we fit onto the world.",
          response:
            "Some of it is, and our notation certainly is. But the world keeps confirming structures we did not design for it, like the complex numbers that turned out to be essential to quantum mechanics centuries after mathematicians invented them. If mathematics were only our invention, it would be odd that the universe keeps obeying it. If the world was made by a rational mind and so were we, it would be much less odd.",
        },
      ],
      grants:
        "This step names a fact that fits theism well. It does not show that theism is the only explanation.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. None of this proves God, and you are right to hold the argument at arm's length. What it asks is narrower. Your confidence in reason is not something naturalism hands you. You bring it with you, and so do I. The Christian has an account of where it came from. The naturalist has a hope that it came from somewhere reliable.",
      objections: [
        {
          label: "Then we're even. We both just trust reason.",
          response:
            "In practice, yes. We both trust it, and we both should. The difference is whether that trust is explained by the rest of what we believe or sits beside it unexplained. That is not a small difference when the thing being trusted is the one tool you have for deciding everything else, including whether to be a naturalist.",
        },
        {
          label: "This feels like a clever trick, not a reason.",
          response:
            "I understand that, and I would rather you felt it than pretended not to. Arguments about the foundations of thought can feel like sleight of hand. So set the argument aside and keep only the question: why should a universe of particles, with no purpose in it, produce creatures who can know that it has no purpose? You may have an answer. I only want you to notice that it needs one.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. It names a cost. It does not compel a conclusion.",
    },
  ],
  close:
    "So here is the whole of it. You are reading an argument and judging it, and you trust yourself to judge it well, as you should. The question is where that trust comes from. If mind lies at the bottom of things, minds at the top are a homecoming. If it does not, our reasoning is a fortunate accident that happens to work, and we go on trusting it anyway. Both are possible. I only wanted you to see that the tool you use to weigh God is one of the things that has to be accounted for, and that the accounting is not finished.",
};

const DESIRE: ArgumentCase = {
  slug: "desire",
  essaySlugs: ["augustine-the-restless-man"],
  title: "Does our longing point beyond this world?",
  kicker: "The case, one move at a time",
  intro:
    "This is the gentlest of the arguments and the easiest to dismiss, and I want to be careful with it, because it is also the one most people have felt in their own bodies. It is not a proof, and the people who first made it never thought it was. We will go one move at a time. Push back wherever you think it is only wishful.",
  published: true,
  steps: [
    {
      id: "ache",
      move: "Start with the experience, not the argument. Many people, believers and unbelievers alike, know moments when something breaks through: a piece of music, a mountain at dusk, the face of a newborn child. The moment brings not only joy but an ache for something it points toward and cannot give. Charles Taylor, in A Secular Age (2007), calls these experiences of fullness and observes that people on both sides of the question report them. Augustine opened his Confessions, around 397, with a sentence usually rendered: you have made us for yourself, and our heart is restless until it rests in you.",
      objections: [
        {
          label: "I've never felt anything like that.",
          response:
            "Then this argument is not for you, and I will say so plainly. Some people report no such longing, and they are neither lying nor repressing anything. An argument from an experience only works for those who have the experience. If you are one of the many who have, keep going. If you are not, I would understand you closing this case, and I am still glad you read this far.",
        },
        {
          label: "That's just an emotional high. Brains do that.",
          response:
            "Brains do produce it, as they produce every experience you have, including your perception of this screen. Saying the brain produces the ache tells us how it happens, not whether it points at anything. The question is what the ache is about, and whether anything answers it.",
        },
      ],
      grants:
        "This step describes an experience many people share. It says nothing yet about what it means.",
    },
    {
      id: "lewis",
      move: "C. S. Lewis gave the argument its best-known form. In Mere Christianity (1952) he wrote: “If I find in myself a desire which no experience in this world can satisfy, the most probable explanation is that I was made for another world.” He reasoned that creatures are not born with desires unless something exists to satisfy them. Hunger implies food, thirst implies water, and so a desire that nothing in this world satisfies suggests something beyond it.",
      objections: [
        {
          label: "Desires don't prove their objects. I want to fly.",
          response:
            "True, and Lewis knew it. His premise concerns natural desires that come with being human, not particular wishes. Wanting to fly like a bird is a specific wish assembled from things we have seen. Hunger is a natural desire, and food exists. The question is which kind the longing for more is. Lewis thought it was the natural kind, because it shows up across cultures and survives the satisfaction of everything else we want. That is an argument, not a proof, and the next objection presses it hard.",
        },
        {
          label: "The premise that natural desires have objects begs the question.",
          response:
            "John Beversluis pressed this in C. S. Lewis and the Search for Rational Religion (1985), and it is the strongest philosophical reply. How do we know every natural desire has an object, unless we already know this one does? Defenders like Peter Kreeft answer that the premise is a generalization from every other natural desire we know, not an assumption about this one. That is fair as far as it goes. The argument is a matter of probability, and it should be stated that way.",
        },
        {
          label: "Evolution explains it. Restless creatures survive.",
          response:
            "This is a strong reply. A creature that is never quite satisfied keeps striving, and striving creatures leave more descendants. That explains a general restlessness well. It explains less well why the longing so often attaches to things that do nothing for survival, a line of music or a view we will never live in, and why it survives the satisfaction of every survival need. The Darwinian account and the Christian account may both be true, one describing the mechanism and the other what the longing is for.",
        },
      ],
      grants:
        "This step gives the argument its classic form and names its strongest critics. It is suggestive, not decisive.",
    },
    {
      id: "projection",
      move: "Sigmund Freud had an answer before Lewis wrote. In The Future of an Illusion (1927), he argued that religious belief is wish-fulfillment: we long for a cosmic father, so we imagine one. That is a fair warning. A desire does not prove its object, and a strong enough wish can manufacture a belief.",
      objections: [
        {
          label: "Exactly. The longing is where the illusion comes from.",
          response:
            "It may be. But the argument cuts both ways. The hope that there is no God and no final accounting is also a wish, and the atheist philosopher Thomas Nagel confessed that he had it. Explaining why someone believes tells you nothing about whether the belief is true. Freud's point is a caution for everyone at the table, not a verdict for one side of it.",
        },
        {
          label: "Lewis wanted it to be true.",
          response:
            "In the end he did. But he reports in Surprised by Joy (1955) that for years he wanted nothing less, and that he was brought into faith kicking and struggling. More to the point, the argument from desire does not ask you to believe because you want to. It asks what the wanting is evidence of. Those are different questions, and it is worth keeping them apart.",
        },
      ],
      grants:
        "This step shows that the charge of projection applies to belief and unbelief alike. It does not settle what the longing points to.",
    },
    {
      id: "beauty",
      move: "Consider beauty, which the longing so often fastens on. Iris Murdoch, who did not believe in a personal God, wrote in The Sovereignty of Good (1970) of looking out of a window in an anxious and resentful state of mind and seeing a kestrel hovering, and of how her brooding self simply fell away. Beauty seems to call us out of ourselves toward something we did not make and cannot own.",
      objections: [
        {
          label: "Beauty is in the eye of the beholder.",
          response:
            "Partly, and taste varies widely. Hume wrote “Of the Standard of Taste” (1757) because that variety troubled him, and he still concluded that some judgments are better than others. More telling is how we actually talk. When someone says a sunset is beautiful, they do not mean only that they like it. They mean it deserves the response. That is the grammar of discovery rather than preference, even if the grammar sometimes misleads.",
        },
        {
          label: "Denis Dutton showed the aesthetic sense evolved.",
          response:
            "The Art Instinct (2009) makes a strong case that our sense of beauty has evolutionary roots, like our preference for open country with water and trees. That explains why we have the capacity. It does not show the capacity perceives nothing real, any more than the evolution of the eye shows there is nothing to see. Where a capacity came from and whether it is accurate are separate questions.",
        },
      ],
      grants:
        "This step shows that beauty feels like discovery. It does not prove that it is.",
    },
    {
      id: "preacher",
      move: "The Bible names the ache without resolving it too fast. Ecclesiastes says that God “has put eternity into man's heart, yet so that he cannot find out what God has done from the beginning to the end” (Ecclesiastes 3:11). The Preacher does not call the ache a proof. He says it is there, and too large for life under the sun.",
      objections: [
        {
          label: "Quoting the Bible to support the Bible is circular.",
          response:
            "It would be if I were offering the verse as evidence. I am not. I am pointing out that the Christian account anticipated the experience you may have had, and described it with unusual honesty: not as a warm glow the faith supplies, but as an ache the faith says will not be fully satisfied here. A religion invented to comfort people would not tell them their deepest longing will go unmet in this life.",
        },
        {
          label: "Christianity promises satisfaction. That's the wish.",
          response:
            "It promises satisfaction, but on strange terms: not now, not on our schedule, and only by way of a death. Paul writes that the whole creation groans, and that believers groan inwardly as they wait (Romans 8:22-23). A wish would promise fulfillment soon and cheaply. This promise asks you to carry the ache further than you would choose to.",
        },
      ],
      grants:
        "This step shows that the Christian account names the longing honestly. It does not show that the account is true.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. The longing is not a proof. It is a clue, and clues can mislead. But if you have had these moments, you are carrying one, and it has to be interpreted somehow. Either it points at nothing, a trick of neurons in a creature that survives by never resting, or it points at something the world cannot supply and was never meant to.",
      objections: [
        {
          label: "I'd rather accept the ache as part of being human.",
          response:
            "That is a dignified position, and many people hold it with courage. I would only ask you to notice its shape. Hunger fits food and thirst fits water, and on this view the one appetite that fits nothing in the world is the one we treat as most important. That may be how things are. It would be strange if it were.",
        },
        {
          label: "This proves nothing.",
          response:
            "No, and Lewis never claimed it did. It is one of the reasons I take seriously the possibility that we were made for more than this. It is weakest standing alone and strongest beside the others, the ones about existence, mind and morality, and above all the question of whether a man rose from the dead. On its own it leaves you with a question worth keeping.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. The ache remains, and what it means is yours to judge.",
    },
  ],
  close:
    "So here is the whole of it. You have probably felt it: the moment when the music or the mountain or a child's face opens onto something larger and then closes again. You can call that a quirk of an animal that survives by never resting, and live well. Or you can take it the way Augustine took his own restlessness, as a homing signal from the one who made him. I will not tell you which it is. I only wanted you to stop treating the ache as noise before asking what it is an ache for.",
};

const EXPERIENCE: ArgumentCase = {
  slug: "experience",
  essaySlugs: ["the-christian-mystics"],
  title: "Can experience of God count as evidence?",
  kicker: "The case, one move at a time",
  intro:
    "Across every century and culture, people report experiencing God. The skeptic is right to be wary of that, and the best of the Christian mystics were warier than most skeptics. We will go one move at a time. Raise the objection you actually hold, and I will tell you what each move does not prove.",
  published: true,
  steps: [
    {
      id: "reports",
      move: "Start with the reports. People of every temperament and education describe encounters they take to be with God, sudden or slow, dramatic or quiet. Blaise Pascal, one of the finest mathematical minds of his century, wrote down an experience on the night of 23 November 1654 and sewed the note into the lining of his coat, where it was found after his death. William James, in The Varieties of Religious Experience (1902), gathered such accounts and concluded, carefully, that they carry authority for those who have them but lay no duty on anyone else to accept them uncritically.",
      objections: [
        {
          label: "People report alien abductions too.",
          response:
            "They do, and that should make everyone careful. But abduction reports cluster in particular cultures and decades and tend to dissolve under examination. Religious experience is reported across nearly every culture and century, by people who are otherwise careful about evidence, some of them former skeptics. The comparison is a useful warning. It does not show the two kinds of report are the same kind of thing.",
        },
        {
          label: "Personal experience is only evidence for the person who has it.",
          response:
            "That is roughly where James landed, and I think he was mostly right. Someone else's experience gives you at most testimony, which you weigh as you weigh any testimony. But testimony counts for something; we believe most of history and most of science on it. The question is whether religious testimony deserves special suspicion, and if so, why.",
        },
      ],
      grants:
        "This step establishes that the reports are widespread and some are serious. It does not show that any of them are accurate.",
    },
    {
      id: "credulity",
      move: "Richard Swinburne, in The Existence of God (1979), proposed what he called the principle of credulity: if it seems to you that something is present, then probably it is, unless you have a particular reason to doubt it. We run our whole lives on that principle; you trust that the table is there because it seems to be. William Alston argued in Perceiving God (1991) that Christian experience of God works like a practice of perception, with its own ways of checking itself, and deserves the same basic trust we give our senses unless it is shown to be unreliable.",
      objections: [
        {
          label: "Sense perception can be checked. Religious experience can't.",
          response:
            "This is the central objection, and Alston spent much of his book on it. Sense perception can be checked by the other senses and by other people. Religious experience, he argued, has its own checks, largely about fruit: whether it coheres with Scripture, whether it produces humility and love or pride and cruelty. Those checks are real but weaker, and I grant the difference. What is disputed is whether it is large enough to make the whole practice untrustworthy.",
        },
        {
          label: "A principle that credulous would justify believing anything.",
          response:
            "Swinburne built in the brakes. You should doubt a seeming if the person is unreliable, the conditions are poor, or there is strong reason to think the thing is not there. So the principle does not justify just anything. What it does is shift the burden. Instead of demanding that experience prove itself from nothing, it asks the skeptic why this kind of experience, unlike all our others, deserves no trust at all. That is a fair question to put to both sides.",
        },
      ],
      grants:
        "This step shows that religious experience deserves a hearing on the same terms as other experience. It does not show that it passes the hearing.",
    },
    {
      id: "diversity",
      move: "Now the hardest objection. People experience very different gods, or none. A Hindu devotee experiences Krishna, a Buddhist the emptiness of the self, a Christian the Father through Christ. If experience is evidence, it seems to be evidence for incompatible things.",
      objections: [
        {
          label: "Conflicting experiences cancel each other out.",
          response:
            "This is the most serious problem, and Alston called it that himself. His answer was that disagreement shows at least some reports are mistaken, not that all of them are; we do not abandon sight because witnesses to an accident disagree about what they saw. I do not think that fully answers the objection. The disagreements are deep, and they should keep any believer humble about how much his own experience proves to anyone else.",
        },
        {
          label: "Maybe they're all experiencing the same reality.",
          response:
            "That is the perennialist view, set out by Aldous Huxley in The Perennial Philosophy (1945), and its motives are often generous. The strongest reply came from Steven Katz in 1978: no experience comes uninterpreted, and the concepts a mystic brings shape the experience itself, not only the report of it. On his view there is no common core beneath the traditions. Katz was not defending Christianity. But his point means experience cannot settle which tradition is right; it can only be weighed within a larger case.",
        },
      ],
      grants:
        "This step concedes that religious diversity weakens the argument from experience. It does not show that all such experience is illusion.",
    },
    {
      id: "science",
      move: "Then the scientific explanations. The cognitive scientist Justin Barrett, in Why Would Anyone Believe in God? (2004), described our tendency to detect agents behind events, sometimes called hyperactive agency detection. Researchers at Johns Hopkins reported in 2006 that psilocybin could occasion experiences volunteers ranked among the most meaningful of their lives. The anthropologist Tanya Luhrmann, in When God Talks Back (2012), showed how evangelicals learn through practice to experience God's voice.",
      objections: [
        {
          label: "If a drug can cause it, it's just chemistry.",
          response:
            "This is a strong point, and I will not brush it off. But notice that every experience is chemistry, in the sense that the brain carries it. Drugs can make you see colors that are not there, and that does not make your ordinary color vision unreliable. The research shows religious experience has a neural basis. It does not show whether, in the ordinary case, it is a perception of something real. Barrett himself is a Christian, and he argues that his findings are neutral on that question.",
        },
        {
          label: "Luhrmann shows people train themselves to hear God.",
          response:
            "She shows the experience is learned, which matters. But many real perceptions are learned: a radiologist learns to see a tumor on a scan, and a musician learns to hear a flat note. Training can create illusions, and it can also sharpen perception. Luhrmann, writing as an anthropologist, was careful not to claim which is happening. The honest conclusion is that practice shapes experience, not that there is nothing to experience.",
        },
        {
          label: "We see agents everywhere. God is a false positive.",
          response:
            "We are prone to that, and it explains a great deal of superstition. But an oversensitive detector does not show that every detection is false; a smoke alarm that goes off at burnt toast still catches real fires. And if our evolved tendencies are untrustworthy here, the same evolved mind is doing the reasoning that leads to atheism. The cognitive science of religion explains why belief comes easily. It cannot tell you whether any god is there.",
        },
      ],
      grants:
        "This step shows that science can explain how religious experience happens. It does not show that experiences so explained are false.",
    },
    {
      id: "tests",
      move: "Here is what many skeptics do not expect. The Christian tradition was harder on religious experience than most skeptics are. John of the Cross, in the sixteenth century, told his readers not to seek visions and not to rest in them when they came, because they can be counterfeited and even true ones become attachments. Jonathan Edwards concluded in Religious Affections (1746) that the surest sign of grace is not the intensity of a feeling but a changed life. The New Testament itself says, “test the spirits to see whether they are from God” (1 John 4:1).",
      objections: [
        {
          label: "So Christians admit experience is unreliable.",
          response:
            "They admit it is the least reliable part of the spiritual life, a strange lesson to learn from mystics and the right one. The tradition never made experience its foundation. It made Scripture, the creeds and the church the tests experience has to pass. That means the Christian case does not rest on anyone's feelings. It rests on claims about history that experience can confirm for a person but cannot establish for the world.",
        },
        {
          label: "Then why count experience as evidence at all?",
          response:
            "Because it is one of the things a true faith would produce and a false one would have to explain away. If God exists and is personal, it would be odd if no one ever experienced him. The experiences do not prove he exists. Their total absence would count against him, and their presence, especially in lives that change toward humility and love, fits.",
        },
      ],
      grants:
        "This step shows the tradition subjects experience to hard tests. It does not show that any particular experience passes them.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. Religious experience cannot prove God to someone who has not had it, and it can mislead those who have. What it can do is change the shape of the question. If the world is closed, the reports of billions are all mistaken. If it is not, some of them may be the most important perceptions human beings have. Which world we live in has to be judged on other grounds, and then the experiences look different.",
      objections: [
        {
          label: "I've prayed and experienced nothing.",
          response:
            "Then you are in company that includes some of the saints, and the tradition has names for that silence. There is a separate case here on why God might hide, and it may deserve your time more than this one. I would never tell you that your lack of experience means you did something wrong. The tradition has never claimed that God's presence depends on anyone feeling it.",
        },
        {
          label: "So experience counts for nothing in the argument?",
          response:
            "It counts for something, as testimony does, and as your own experience would if you had it. It is weak alone and not nothing in combination. I have experienced, in prayer and in the community of faith, a presence I cannot reduce to psychology, and I hold that as one strand among several, never as the whole rope. You are right not to take my word as proof. I would only ask you not to assume it is nothing.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. Experience is one piece of evidence, and it cannot carry the case alone.",
    },
  ],
  close:
    "So here is the whole of it. People in every age report meeting God, and the reports are shaped by brains, cultures and hopes, and some are surely mistaken; the best Christian teachers said so first. What remains is a question no experiment can close: whether all of it is noise, or whether some of it is what it seems, someone making himself known. You do not have to believe any report, including mine. I only wanted you to see that dismissing all of them is also a judgment, and that it needs reasons too.",
};

const HISTORICAL_JESUS: ArgumentCase = {
  slug: "historical-jesus",
  essaySlugs: ["the-historical-jesus-without-the-shortcuts", "the-historical-jesus"],
  title: "Did Jesus even exist?",
  kicker: "The case, one move at a time",
  intro:
    "You will meet two confident voices on this. One says Jesus is a legend that scholars quietly abandoned long ago; the other says he is better attested than anyone in the ancient world. Both are wrong in ways that matter. For years I read Christian writing the way a wary buyer reads a contract, and that wariness belongs here. We will go one move at a time. Push back wherever you disagree.",
  published: true,
  steps: [
    {
      id: "expect",
      move: "Start with what we should expect to find. Jesus was a village teacher from Galilee, a backwater of a minor province, executed as one troublemaker among many. Even Pontius Pilate, who governed Judea from about 26 to 36, appears in only a handful of ancient writers, and until 1961 no inscription bearing his name had been found. That year archaeologists at Caesarea Maritima uncovered a limestone block naming him prefect of Judea. No one had concluded before 1961 that Pilate was a myth.",
      objections: [
        {
          label: "There are no contemporary records of Jesus.",
          response:
            "That is true, and it is what we should expect. There are almost no contemporary records of anyone of his standing in that world, and historians of the period work mostly from sources written decades later. The question is not whether a birth certificate survives. It is whether the sources we do have are better explained by a real man or by a myth.",
        },
        {
          label: "Rome kept careful records. Where are they?",
          response:
            "Most Roman provincial records have not survived at all, for anyone. We have no court records of Pilate's trials, including the trials of people we know existed. What survives from antiquity is a thin and accidental stream. The silence of lost archives is not evidence against anyone in particular.",
        },
      ],
      grants:
        "This step lowers expectations to what the period warrants. It proves nothing yet about Jesus.",
    },
    {
      id: "rome",
      move: "Then the outsiders. Tacitus, a Roman senator writing his Annals around 116, describes Nero blaming the Christians for the great fire of Rome in 64, and explains their name: it came from Christus, who had been executed in the reign of Tiberius by the governor Pontius Pilate (Annals 15.44). Tacitus despised the movement and calls it a deadly superstition. Around 112, Pliny the Younger, governing Bithynia, wrote to the emperor Trajan that the Christians brought before him met before dawn and sang a hymn to Christ as to a god (Letters 10.96).",
      objections: [
        {
          label: "Tacitus was just repeating what Christians said.",
          response:
            "That is possible, and a fair historian grants it; we do not know his source. But he was a senator with access to official circles, and he reports the execution under Pilate as settled fact, not as something Christians claim. At minimum, the passage shows that by the early second century a hostile Roman insider took the founder's execution in Judea as history. It is not an independent eyewitness, and I will not pretend it is.",
        },
        {
          label: "Christians forged these passages.",
          response:
            "Not these. No Christian copyist would call his own faith a deadly superstition, and the contempt in the passage marks it as Tacitus's own. Pliny's letter sits inside a correspondence that includes Trajan's reply and fits its setting. Forgery is a real question for one passage in Josephus, which comes next. It is not a plausible account of these two.",
        },
        {
          label: "Pliny tells us about Christians, not about Jesus.",
          response:
            "Correct. Pliny says nothing about Jesus's life. What he shows is that within about eighty years of the crucifixion, communities far from Judea were worshiping Christ as divine, and a Roman governor already knew them by his name. That is evidence for how early and how far the movement spread, not for the details of the man.",
        },
      ],
      grants:
        "This step shows hostile Roman writers took the execution of Jesus as fact. They were not eyewitnesses, and their evidence is thin.",
    },
    {
      id: "josephus",
      move: "Josephus matters more. He was a Jewish commander in the revolt against Rome and afterward a historian, and he finished his Jewish Antiquities around 93 or 94. In 20.200 he describes how, in the year 62, the high priest Ananus had a man named James stoned, and he identifies James as the brother of Jesus who was called Christ. Almost all scholars accept this passage as Josephus's own. It is incidental, and the phrase who was called Christ sounds like an outsider identifying a man, not a believer confessing one.",
      objections: [
        {
          label: "The Josephus passage about Jesus is a known forgery.",
          response:
            "You are thinking of the longer passage, the Testimonium Flavianum at 18.63-64, and there you are partly right. As it survives in the Greek manuscripts, it says Jesus was the Messiah and appeared alive on the third day, which no Jew who remained outside the church, as Josephus did, would have written. Most scholars, John P. Meier among them, hold that Josephus wrote a shorter, neutral notice that later Christian copyists embellished, and Origen, in the third century, remarks that Josephus did not believe Jesus was the Christ. Some scholars think the whole passage is a later insertion. Even if all of it fell, 20.200 would still stand.",
        },
        {
          label: "The James passage could be about a different Jesus.",
          response:
            "Josephus mentions several men named Jesus, so the question is fair. But he distinguishes this one as the one called Christ, and the James in question fits what Paul and later Christian sources say about James, the brother of the Lord, as a leader of the church in Jerusalem. A minority of scholars propose otherwise. Most find the identification secure.",
        },
        {
          label: "The Arabic version is just another edit.",
          response:
            "In 1971 Shlomo Pines published a tenth-century Arabic version preserved by the Christian historian Agapius, in which the claims are hedged, so that Jesus only perhaps was the Messiah. It may reflect a later form of the text rather than the original, and I do not lean on it. What it suggests is that the passage circulated in forms less confessional than our Greek manuscripts, which is what the middle view would expect.",
        },
      ],
      grants:
        "This step shows a Jewish historian refers to Jesus, securely once and probably twice. The longer passage has been altered, and honesty requires saying so.",
    },
    {
      id: "paul",
      move: "The earliest evidence is not Roman or Jewish but Christian: the letters of Paul, written from around 50, some two decades after the crucifixion. Setting them aside because a believer wrote them is not a historian's rule, since every ancient source has a point of view, Tacitus included. And Paul says something no theory of a purely mythical Jesus absorbs easily. Recalling his first visit to Jerusalem, he writes: “But I saw none of the other apostles except James the Lord's brother” (Galatians 1:19).",
      objections: [
        {
          label: "Brother of the Lord could just mean a fellow Christian.",
          response:
            "That is the reply of the mythicist historian Richard Carrier. But Paul calls believers brothers constantly without ever adding of the Lord, and elsewhere he sets the brothers of the Lord apart as a recognizable group (1 Corinthians 9:5). And Josephus, writing independently for a different audience, calls James the brother of Jesus. It is hard to have a brother if you never had a body.",
        },
        {
          label: "Paul says almost nothing about an earthly Jesus.",
          response:
            "That is true, and it is the mythicist's best evidence. Paul never quotes a parable, never mentions a miracle, never names Nazareth. But letters address problems in particular churches, and Paul assumes his readers already know the story. Even so, he says Jesus was “born of woman, born under the law” (Galatians 4:4), descended from David, shared a meal on the night he was betrayed, and was crucified and buried. That is a man in history, not a figure in a heavenly realm.",
        },
      ],
      grants:
        "This step shows our earliest writer knew Jesus's brother and placed Jesus in history. It relies on a believer's testimony, weighed as testimony.",
    },
    {
      id: "myth",
      move: "Now the case that Jesus never lived, at full strength. Its most capable advocate today, Richard Carrier, argued in On the Historicity of Jesus (2014) that the first Christians believed in a heavenly Jesus, crucified in a spiritual realm and known through visions and Scripture, and that the Gospels, beginning with Mark around 70, turned him into an earthly biography that later readers took literally. Carrier ran the evidence through Bayesian probability and concluded that the odds lean against a historical Jesus. The argument is disciplined, and it presses on real weaknesses.",
      objections: [
        {
          label: "Jesus is a copy of the dying-and-rising gods.",
          response:
            "That claim was popular a century ago and has not aged well. The historian of religion Jonathan Z. Smith, who had no brief for Christianity, argued in 1987 that dying-and-rising gods were largely a category constructed by modern scholars, and the parallels usually cited are thin when read in their own sources. Carrier himself does not rest his case on them. If you met this argument online, it is worth knowing that serious mythicists have mostly left it behind.",
        },
        {
          label: "Scholarly consensus could be wrong.",
          response:
            "It could, and consensus is not proof. But this consensus crosses every line: believers, Jews, agnostics and atheists. Bart Ehrman, an agnostic and a long-standing critic of evangelical views of the Bible, wrote Did Jesus Exist? (2012) specifically to answer the mythicists, and he calls Jesus's existence one of the few things on which virtually every expert in the field agrees. When a scholar with every motive to find the evidence weak finds it strong, that counts for something.",
        },
        {
          label: "A crucified messiah is exactly what someone would invent.",
          response:
            "I think it is the opposite. Jews who hoped for a messiah expected one who would triumph over Israel's enemies, not one stripped and nailed up by them. Paul knew exactly how the message sounded: “we preach Christ crucified, a stumbling block to Jews and folly to Gentiles” (1 Corinthians 1:23). A movement inventing a savior would hardly choose the most degrading death the empire had, and then date it under a named governor within living memory.",
        },
      ],
      grants:
        "This step gives the myth theory its strongest form and shows why nearly every expert rejects it. It does not make the theory impossible.",
    },
    {
      id: "minimum",
      move: "So what survives the sifting? Historians of every persuasion, following lists like the one E. P. Sanders drew up in Jesus and Judaism (1985), would sign a core like this. Jesus was baptized by John. He proclaimed the kingdom of God. He called disciples. He was known as a healer and exorcist. He ate with people the religious avoided. He caused a disturbance in the temple. And he was crucified outside Jerusalem by Roman authority, under a charge that read “The King of the Jews” (Mark 15:26).",
      objections: [
        {
          label: "That minimum is small. It doesn't get you to Christianity.",
          response:
            "It is small, and that is the point of stating it honestly. Historical method recovers a minimum any careful reader can check. The church confesses far more, and the more has to be argued on other grounds, above all the question of the resurrection, which has its own case here. What the minimum does is fasten the Christian claim to the world, to a name and a date.",
        },
        {
          label: "Historians can't say he was a healer.",
          response:
            "They can say his contemporaries saw things they took for healings and exorcisms, and that even his opponents granted the deeds while disputing their source; the scribes from Jerusalem said he cast out demons by the prince of demons (Mark 3:22). Whether God was acting is beyond what the method can weigh. That is the right limit, and I would rather state it than blur it.",
        },
      ],
      grants:
        "This step states what history can recover. It does not tell you who the man was.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. The evidence walks a historian to the foot of a Roman cross outside Jerusalem around the year 30 and stops there. That Jesus lived is about as secure as ancient history gets. Who he was is a different question. Luke tells of two disciples on the road to Emmaus who had every fact right, a prophet mighty in deed and word, handed over by the authorities and crucified, and still did not recognize who was walking beside them (Luke 24:19-21).",
      objections: [
        {
          label: "Fine, he existed. That changes nothing for me.",
          response:
            "It changes one thing: the question moves. The honest skeptic's quarrel is not with whether Jesus lived but with who he was, which is a harder and better question. It is the one he asked his own disciples: “But who do you say that I am?” (Mark 8:29). No historical method answers that for you.",
        },
        {
          label: "Why should historians matter to faith anyway?",
          response:
            "Because Christianity chose to expose itself to them. Instead of a timeless myth, it confesses that the Son of God suffered under Pontius Pilate, which fixes its center to a date and a name. A claim like that can be checked, and a faith that can be checked can also be found false. Christianity took that risk on purpose, and on the question of whether he lived, the check has come back the way it would if the man were real.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. History establishes the man. It cannot answer the question he asked.",
    },
  ],
  close:
    "So here is the whole of it. A Roman senator who despised the movement, a Jewish historian who stayed outside it, and a former persecutor who met the man's brother all place Jesus in history, executed under a named governor. The theory that he never lived is possible, and nearly every expert, believer or not, finds it the weaker explanation. You can accept all of that and remain unconvinced of everything else, and still be welcome here. I only wanted you to see that the easy dismissal is not available, and that the real question was always the one he asked on the road.",
};

const MIRACLES: ArgumentCase = {
  slug: "miracles",
  essaySlugs: ["are-miracles-believable"],
  title: "Did Hume disprove miracles?",
  kicker: "The case, one move at a time",
  intro:
    "When I was an atheist I thought I had a proof against miracles, borrowed from a Scottish philosopher two centuries dead, and I remember the pleasure of reading it, like hearing a heavy door swing shut. It took me a long time to notice that what I called a proof was a definition carrying the whole load. We will go one move at a time. Hume deserves his full strength, so push back wherever you think he wins.",
  published: true,
  steps: [
    {
      id: "hume",
      move: "David Hume published “Of Miracles” in 1748 as the tenth section of what became An Enquiry Concerning Human Understanding. His argument is about evidence: “A wise man, therefore, proportions his belief to the evidence.” We trust testimony only because experience shows that reports usually match events, and experience also shows that people lie, misremember and exaggerate. The laws of nature, by contrast, rest on uniform experience. So, he concludes, “no testimony is sufficient to establish a miracle, unless the testimony be of such a kind, that its falsehood would be more miraculous, than the fact, which it endeavours to establish.”",
      objections: [
        {
          label: "That seems obviously right.",
          response:
            "Much of it is. Most miracle claims dissolve under inspection, and a wise person does proportion belief to evidence. The question is not whether Hume's caution is wise; it is. The question is whether his argument settles the matter before any particular claim is heard, and that turns on the phrase uniform experience.",
        },
        {
          label: "The dead stay dead. That's all anyone needs to know.",
          response:
            "That is the popular form of Hume, and it is where most people stand. Grant it fully: the dead stay dead with a regularity as firm as any we know, and a resurrection would be astonishing. The Christian claim has never been that it would be ordinary. It is that it happened once, for a reason, which is a different kind of claim from the one Hume's scale was built to weigh.",
        },
      ],
      grants:
        "This step sets out Hume's argument fairly. Nothing has yet been said against it.",
    },
    {
      id: "history",
      move: "Hume added four observations from history. No miracle, he said, has been attested by enough witnesses of good sense and integrity in a public enough place. Human beings love the marvelous, and religious zeal excuses loose reporting. Miracle stories abound chiefly among ignorant and barbarous nations. And the miracles of rival religions cancel one another.",
      objections: [
        {
          label: "He's right about religious zeal.",
          response:
            "He is, and Christians have given him more ammunition than he could have hoped for. The preacher who promises a miracle in return for a gift is doing exactly what Hume said zeal does, letting a holy cause excuse loose evidence. We pass along healing videos we would laugh at if another faith had posted them. If believing in miracles means believing every wonder that flatters our side, Hume has already won, and he deserves to.",
        },
        {
          label: "Every religion claims miracles, so none can be trusted.",
          response:
            "That assumes a miracle is a credential offered to win an argument between religions. The Gospels do not treat miracles that way. When the Pharisees demanded a sign, Jesus “sighed deeply in his spirit” and said no sign would be given (Mark 8:12). Christianity does not ask you to believe in miracles in general. It stakes everything on one event, and says so bluntly (1 Corinthians 15:14). Rival claims each have to be weighed on their own evidence.",
        },
        {
          label: "Educated people don't report miracles.",
          response:
            "That observation has aged worst of all. Craig Keener's two-volume Miracles (2011) gathers a large body of contemporary eyewitness accounts of healing from around the world, many from educated people and some with medical documentation. Keener does not claim every report is a miracle, and he grants that many may have natural explanations. His point is narrower: eyewitnesses do make such claims in great numbers, and dismissing them all as ignorance is one culture's habit, not a neutral finding.",
        },
      ],
      grants:
        "This step concedes much of Hume's historical caution. It shows only that his observations do not close every case in advance.",
    },
    {
      id: "law",
      move: "Now the center of the argument, the word law. Hume defines a miracle as a violation of the laws of nature. But what is a law of nature? C. S. Lewis, in Miracles (1947), defined a miracle instead as “an interference with Nature by supernatural power,” and gave an ordinary illustration. Put sixpence in a drawer on Monday and another on Tuesday, and the laws of arithmetic say you will find a shilling there on Wednesday, other things being equal. If a thief has been at the drawer, arithmetic has not been broken. The laws always told you what happens if nothing else interferes.",
      objections: [
        {
          label: "That's redefining miracle to escape Hume.",
          response:
            "It is older than Hume. Augustine argued in The City of God, early in the fifth century, that a portent happens not contrary to nature but contrary to what is known of nature. Alvin Plantinga put the point in the language of physics in Where the Conflict Really Lies (2011): the laws describe how matter behaves in a closed system, one that nothing outside acts upon. Whether the universe is such a system is not a finding of physics. It is the philosophical question underneath the whole argument.",
        },
        {
          label: "Miracles would make science impossible.",
          response:
            "Only if they were frequent or random. A world of constant interventions would indeed be unpredictable. But the Christian claim is that God ordinarily governs the world through the regular order he made, which is part of why the founders of modern science expected to find laws. A miracle only means something against a background of regularity, as a signature only means something on a page written in an ordinary hand. Richard Swinburne argued in The Concept of Miracle (1970) that a non-repeatable exception leaves a law standing as our best account of every repeatable case.",
        },
        {
          label: "Spinoza said God wouldn't break his own laws.",
          response:
            "Spinoza argued in 1670 that the laws of nature are the decrees of God, so a miracle would be God contradicting himself. A Christian should feel the force of that; Scripture praises the dependability of nature as God's faithfulness (Genesis 8:22). But the objection assumes the laws are the whole of God's will for the world rather than his ordinary way with it. A father who keeps a steady routine does not contradict himself when, once, he does something unusual for a reason.",
        },
      ],
      grants:
        "This step shows Hume's definition assumes more than it says. It does not show that anything outside nature exists or acts.",
    },
    {
      id: "circle",
      move: "With that distinction in hand, the circle in Hume's first part comes into view. His scale works only if experience is uniform against miracles. But how could anyone know that, unless he already knew that every reported miracle in history, including the one now on the table, was false? If even one happened, experience is not uniform. Lewis pressed this in Miracles and called it by its name: the verdict has been written into the premise.",
      objections: [
        {
          label: "Hume isn't circular. He's setting a high bar.",
          response:
            "That is the reading Robert Fogelin defended in A Defense of Hume on Miracles (2003), and it is stronger than the version apologists usually attack. On Fogelin's reading, the first part sets a standard of evidence and the second argues from history that no report has met it. I think that is a fair reading of Hume. But notice what it concedes: the case against any particular miracle then rests on historical evidence, weighed claim by claim. That is precisely the work the popular Hume promised we could skip.",
        },
        {
          label: "Hume's reasoning is still mathematically sound.",
          response:
            "The philosopher of science John Earman, who had no religious case to make, tested it against the mathematics of probability in a book bluntly titled Hume's Abject Failure (2000). He argued that Hume's maxim either says something nearly trivial or something false, and that Hume ignored how quickly the testimony of independent witnesses gains force. Earman did not conclude that any miracle has occurred. He concluded that Hume had not settled the question.",
        },
        {
          label: "Extraordinary claims require extraordinary evidence.",
          response:
            "They do, and Carl Sagan popularized the line for good reason. But ask what makes a claim extraordinary. If you already know there is no God, a resurrection is not merely extraordinary but impossible, and no evidence could ever be enough. If there might be a God, it becomes an extraordinary claim about a particular event, to be weighed with extraordinary care. The slogan is right. It cannot tell you which of those situations you are in.",
        },
      ],
      grants:
        "This step shows Hume's argument does not close the question in advance. It does not show that any miracle happened.",
    },
    {
      id: "odds",
      move: "An ordinary case shows why. The odds against any particular lottery number being drawn are enormous, and yet you believe the newspaper that reports the winning number, because a low prior probability is never the whole calculation. What matters just as much is how likely the report would be if the event had not happened. Hume's scale, as he applied it, never seriously weighs that.",
      objections: [
        {
          label: "A lottery draw is natural. A resurrection isn't.",
          response:
            "Right, and that is the real disagreement. The lottery shows that improbability alone does not defeat good testimony. What makes the resurrection different is not its improbability but whether events like it can happen at all. That is a question about whether nature is all there is, and it cannot be settled by counting reports.",
        },
        {
          label: "A natural explanation is always more likely than a miracle.",
          response:
            "That is the most honest form of the naturalist position, and a thoughtful person can hold it without dishonesty: a strained explanation that stays within what we know can happen may still be likelier than one that does not. I grant that. The question then becomes how strained the natural explanations are in a particular case. For the resurrection, that is a real historical question, and it has its own case on this site.",
        },
      ],
      grants:
        "This step shows testimony can overcome low probability. It leaves the question of what is possible exactly where it was.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. Hume teaches a wise caution, and much of what passes for miracle claims deserves his skepticism. What he did not do is show, before any evidence is heard, that no miracle could ever be reasonably believed. Lewis saw that the question of miracles finally depends on the question of naturalism. That is where the honest skeptic has to decide whether his certainty is a conclusion he reached or a definition he began with.",
      objections: [
        {
          label: "I still find miracles impossible to believe.",
          response:
            "That is allowed, and it is not stupid. Hume closed his essay with the ironic remark that the Christian religion cannot be believed by any reasonable person without a miracle working in him. The church has always said something close to that, without the irony: faith is a gift, not a conclusion argued into being. Argument can do something smaller. It can show that the lock on the door is one you installed yourself.",
        },
        {
          label: "You haven't shown that any miracle happened.",
          response:
            "I have not, and this case was never meant to. It asks only whether the question is open. If it is, the one miracle Christianity stakes everything on, the resurrection, has to be weighed on its evidence like any other surprising report from witnesses who gained nothing by it and lost a great deal. Paul invited exactly that weighing, naming witnesses “most of whom are still alive” (1 Corinthians 15:6).",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. It opens the question. It does not answer it for you.",
    },
  ],
  close:
    "So here is the whole of it. Hume was right that most wonders are human error and that zeal has lied for God. He was not right that the matter could be closed from the armchair. If nature is all there is, no miracle ever happened, and no argument was needed to show it. If it is not, then a claim about a particular tomb, on a particular morning, deserves to be weighed on its evidence. You can weigh it and still say no. I only wanted you to see that refusing to put it on the scale was never the same as weighing it.",
};

const HIDDENNESS: ArgumentCase = {
  slug: "hiddenness",
  essaySlugs: ["the-god-who-hides", "when-god-is-silent-and-the-room-is-empty"],
  title: "If God is real, why does he hide?",
  kicker: "The case, one move at a time",
  intro:
    "As an atheist I counted God's hiddenness as a decisive point against him: a perfect, loving being who wants relationship and cannot manage to show his face. As a believer I have not lost the silence. I have prayed into it and received what the psalmist received. So I will not pretend this away. We will go one move at a time, and you can push back at every step.",
  published: true,
  steps: [
    {
      id: "argument",
      move: "Start with the argument at full strength. In Divine Hiddenness and Human Reason (1993), the philosopher J. L. Schellenberg argued that a perfectly loving God would always be open to a personal relationship with any creature capable of one. Relationship requires, at the very least, believing that the other exists. So such a God would make sure no one capable of relationship with him was left without that belief through no fault of their own. But there are such people, whom Schellenberg later called nonresistant nonbelievers: people who are not running from God, who would welcome him, and who have looked honestly and cannot find him. If they exist, a perfectly loving God does not.",
      objections: [
        {
          label: "That's exactly my experience.",
          response:
            "Then I am not going to argue you out of it, and you deserve better than the accusation that you did not search hard enough. The church has too often told people like you that every unbeliever is secretly in rebellion, a claim it cannot know and one that insults people who have searched longer and more honestly than many believers. Hold on to your experience. What we are testing is the argument, not your honesty.",
        },
        {
          label: "Isn't this just the problem of evil again?",
          response:
            "It is related but different, and in one way sharper. The problem of evil asks why God permits suffering. Hiddenness asks why God permits unbelief in people who would gladly believe. You could imagine a world with no suffering in which God was still hidden, and the argument works even for someone whose life has been fortunate. That is part of its force.",
        },
      ],
      grants:
        "This step states the argument and grants its central observation. It has not yet tested the premises.",
    },
    {
      id: "love",
      move: "The force of the argument lies in its picture of love. No loving mother hides for years from a frightened child calling for her in the dark, least of all to build the child's character. If she could make herself known and chose not to, we would not call her mysterious. We would call her cruel.",
      objections: [
        {
          label: "Exactly. Nothing could justify that.",
          response:
            "For a human mother, I agree. The question is whether the analogy holds all the way up. Michael Rea argued in The Hiddenness of God (2018) that the argument quietly assumes divine love must look like the love of an ideal human parent, which is exactly what a transcendent God need not be. That can sound like an escape, and sometimes it is used as one. But the parental picture breaks in other places too: a mother who could prevent every illness and chose not to would also be cruel, and Christians have never claimed that God relates to us only as a human parent does.",
        },
        {
          label: "Saying God's love is different is special pleading.",
          response:
            "It can be, but it is not automatically. Scripture itself uses the parent image and strains it. The God who says that even if a nursing mother could forget her child, he will not forget his people (Isaiah 49:15), is the same one of whom Isaiah says, “Truly, you are a God who hides himself” (Isaiah 45:15). If God is the ground of being rather than one more person in the room, his presence may not be the kind that is felt the way a human presence is felt. That does not answer the argument. It puts one premise under question.",
        },
      ],
      grants:
        "This step names the argument's key premise about love. It does not show that the premise is false.",
    },
    {
      id: "freedom",
      move: "The oldest reply is Pascal's: a God who overwhelmed every mind with evidence would compel assent without winning trust. Søren Kierkegaard told a parable in Philosophical Fragments (1844) of a king who loved a humble maiden and came to her disguised as a servant, because if he came in his majesty she could not love him freely. Paul Moser argues in The Elusive God (2008) that the evidence God gives is offered to invite the surrender of the will, not to satisfy the curiosity of a spectator.",
      objections: [
        {
          label: "Believing God exists doesn't force anyone to love him.",
          response:
            "This is Schellenberg's reply, and it is strong. Belief that God exists is compatible with rejecting him; the New Testament says that even the demons believe God is one, and shudder (James 2:19). So God could give everyone enough evidence to believe he exists without coercing anyone's love. I think that is right against the simple version of the freedom defense. The better versions argue that a certain kind of overwhelming presence would change the relationship itself, which is a weaker claim, and I admit it.",
        },
        {
          label: "The freedom reply fits resisters, not people like me.",
          response:
            "That is its precise weakness. Moser's view explains why God might not force himself on people who do not want him. It explains much less why he would remain hidden from someone who does. Schellenberg's argument is about the nonresistant, and the freedom reply mostly misses them. I will not pretend it covers you.",
        },
      ],
      grants:
        "This step shows the freedom reply is real but limited. It does not answer the nonresistant seeker.",
    },
    {
      id: "seekers",
      move: "So take the nonresistant seeker as real, because such people are real. What the tradition adds is not denial but a claim about time and kind. It has never promised felt presence on demand, and it has always said that some seeking is long. Rea argues that God can be present without being felt, making himself available in Scripture, prayer and the life of the church to anyone who comes, whether or not anything is felt there. C. Stephen Evans, in Natural Signs and Knowledge of God (2010), argued that the evidence for God may be widely available but easily resisted, a pattern that makes sense if God seeks trust rather than bare assent.",
      objections: [
        {
          label: "Available but not felt is the same as absent.",
          response:
            "It can feel identical, and I will not argue with the feeling. But in other relationships we know the difference. A friend who has written letters you have not yet been able to read is not the same as a friend who never wrote. The Christian claim is that God has spoken, in a history and a person, and that the silence many people feel is silence in their experience, not silence in the record. That does not make the silence painless.",
        },
        {
          label: "Jesus said seek and you will find. I sought.",
          response:
            "He did say it: “seek, and you will find” (Matthew 7:7), and you are allowed to hold him to it. The promise sits in a book where finding often takes a long time and comes in forms no one expected, and nothing in it names the day. I will not tell you that your search failed because you did it wrong. I will only say that Scripture gives no timetable, and that some of its most faithful people waited in silence longer than you or I have.",
        },
      ],
      grants:
        "This step concedes that nonresistant nonbelief is real. It suggests, without proving, that the silence may not be final.",
    },
    {
      id: "psalms",
      move: "Then notice something easy to miss. The Bible complains about God's hiddenness more loudly than most atheists do. “How long, O LORD? Will you forget me forever? How long will you hide your face from me?” (Psalm 13:1). That is the songbook of the people of God. And at the center of the Christian story is a man crying out to a God who does not answer: “My God, my God, why have you forsaken me?” (Mark 15:34).",
      objections: [
        {
          label: "Sad psalms don't answer the argument.",
          response:
            "No, they do not, and I am not offering them as a refutation. I am offering them as evidence about what kind of faith this is. A religion invented to comfort people would not write the complaint into its own scriptures and hand it to believers to pray. Christianity has already said that love and felt absence can occupy the same hour. That shifts the question from whether a loving God could be silent to what kind of silence the cross is.",
        },
        {
          label: "The Holocaust was a silence no psalm can hold.",
          response:
            "Yes. Elie Wiesel was fifteen when he was deported to Auschwitz in 1944, and his memoir Night remembers the first night in the camp as the night the flames consumed his faith. The Yiddish version was titled And the World Remained Silent. The first thing a Christian owes that book is not an argument. It is to stop talking. Whatever the cross means, it does not permit anyone to explain Auschwitz to the people who survived it.",
        },
      ],
      grants:
        "This step shows the faith already contains the complaint. It does not explain why God is silent.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. None of these replies makes the argument disappear, and it would be dishonest to pretend otherwise. What they show is that it rests on a premise Christians have reason to question, that love must mean felt presence on terms we would recognize. They question it because of where their own story puts God: in the darkness of a Friday afternoon, crying out to a heaven that seemed closed.",
      objections: [
        {
          label: "So you have no answer.",
          response:
            "I have no answer that removes the silence, and I do not trust anyone who claims one. What I have is a reason to keep speaking into it, which is what the psalmist did. Psalm 13 begins with how long and ends, with nothing visibly changed, by saying he has trusted in God's steadfast love. The silence did not break. He kept addressing the one who seemed absent, on the strength of who God had shown himself to be elsewhere.",
        },
        {
          label: "That sounds like refusing to accept the obvious.",
          response:
            "It might be. From the outside, faith in the silence and plain stubbornness can look identical. The difference, if there is one, lies in whether a reason has been given somewhere else, and the Christian claim is that it has: a man raised from the dead after the most complete silence in the story. If that did not happen, the silence is what it looks like. If it did, the silence is not the last word.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. The argument is not refuted. The silence is shared, and what it means is yours to decide.",
    },
  ],
  close:
    "So here is the whole of it. If you have looked honestly and found nothing, you are not a fraud, and this is one of the strongest arguments there is. The faith you are weighing did not avoid the silence. It wrote the complaint into its songbook and placed God himself at the center of the silence, forsaken on a cross. Whether that turns the silence into something else depends on whether the Sunday after it happened. You can leave unconvinced and be welcome here. I only wanted you to know that the question you are asking has been asked out loud, by the people who knew God best.",
};

const SCIENCE: ArgumentCase = {
  slug: "science",
  essaySlugs: ["faith-and-science"],
  title: "Hasn't science disproved God?",
  kicker: "The case, one move at a time",
  intro:
    "Most people who believe that science and faith are at war never decided to believe it. They absorbed it. I believed the story when I was an atheist, partly because no one in the church had given me a reason not to. We will go one move at a time. The conflict deserves its strongest form, and you can push back at each step.",
  published: true,
  steps: [
    {
      id: "retreat",
      move: "Grant what is true first. Science tests its predictions without mercy and has been right about an astonishing amount. The church has more than once put its weight behind claims about nature that proved false, and has sometimes punished people for saying so. Each time a mechanism was found for something once credited directly to God, the room left for God seemed to shrink. A skeptic who sees an army in retreat is not being foolish.",
      objections: [
        {
          label: "Science explains more every year, and God explains less.",
          response:
            "That is the strongest form of the objection, and it describes a real pattern. The god of the gaps has been evicted many times. Dietrich Bonhoeffer saw the danger from a Nazi prison, writing in May 1944 that it is wrong to use God as a stopgap for the incompleteness of our knowledge, because as knowledge grows God is pushed back with it. The Christians worth listening to agreed with you before you raised it. The real question is whether God was ever meant to be a gap.",
        },
        {
          label: "Science and religion use incompatible methods.",
          response:
            "Jerry Coyne argued this in Faith Versus Fact (2015): science tests claims against evidence and revises them, while religion holds claims on faith and resists revision. It is a serious charge, and it describes some religion accurately. But it assumes faith means belief without evidence, which is not what the word means in the tradition that uses it most. The better question is whether particular Christian claims are open to evidence. The central one, the resurrection, is a historical claim that could in principle be false, and Paul said so (1 Corinthians 15:14).",
        },
      ],
      grants:
        "This step concedes the real friction and the real pattern of retreat. It does not show that science can say whether God exists.",
    },
    {
      id: "origin",
      move: "But the story in its familiar form, a war that has always been fought and must be fought to the end, has a birth date. In 1874 John William Draper published History of the Conflict between Religion and Science. In 1896 Andrew Dickson White, co-founder and first president of Cornell, published A History of the Warfare of Science with Theology in Christendom. These were books of advocacy by men with institutions to defend, and they supplied the scenes nearly everyone still pictures.",
      objections: [
        {
          label: "Who wrote the story doesn't matter if it's true.",
          response:
            "Agreed, which is why the historians checked it. Ronald Numbers, a historian of science who does not write as a believer, edited Galileo Goes to Jail and Other Myths about Science and Religion (2009), in which specialists took one piece of folklore per chapter and tested it against the sources. The greatest myth of all, Numbers says, is that science and religion have been in constant conflict. John Hedley Brooke had already concluded in 1991 that the real relationship is too varied for any general thesis, whether war or harmony.",
        },
        {
          label: "Historians who deny the conflict are apologists.",
          response:
            "Some who write on this are, but the ones I have named mostly are not. Numbers was raised a Seventh-day Adventist and left that faith. The flat-earth legend was taken apart by Jeffrey Burton Russell, and the Galileo legend corrected by historians working from the trial records. The revision came from the archive, not the pulpit.",
        },
        {
          label: "Medieval Christians thought the earth was flat.",
          response:
            "They did not. Educated medieval Christians knew the earth was a sphere; Bede taught it in 725, and Thomas Aquinas used its roundness as a routine example on the first page of his Summa. The quarrel over Columbus concerned the earth's size, and his critics were right that it was larger than he claimed. The legend owes much to Washington Irving's romantic life of Columbus (1828). It survives because it flatters us.",
        },
      ],
      grants:
        "This step shows the warfare story is a nineteenth-century polemic rather than a finding of history. It does not show there has been no real conflict.",
    },
    {
      id: "galileo",
      move: "Galileo is harder, and he has to be told straight, because the church was in the wrong. In 1616 the Holy Office's consultants declared the sun-centered cosmos formally heretical. In 1633 Galileo was tried, found vehemently suspected of heresy and made to abjure. He was threatened with torture but not tortured, and his sentence was commuted to house arrest at his villa near Florence, where he died in 1642. John Paul II acknowledged the error in 1992.",
      objections: [
        {
          label: "That proves the church suppresses truth.",
          response:
            "It proves that an institution did, in that case, and there is no softening it. A man was silenced for telling the truth about the sky because churchmen let one reading of a few verses outrank the evidence. But notice the principle Cardinal Bellarmine himself had stated in 1615: if the earth's motion were ever truly demonstrated, the church would have to reinterpret the passages that seemed to deny it. The failure was a failure to keep its own principle. It is a parable of an institution mistaking its interpretation for the text, and that temptation belongs to every church, mine included.",
        },
        {
          label: "The legend of the tortured martyr is close enough.",
          response:
            "It is not, and the difference matters to anyone who wants the truth rather than a useful story. Maurice Finocchiaro's chapter in the Numbers volume reaches the right verdict: the legend of the tortured martyr is false, and the condemnation was real. You do not need the embellished version to condemn what happened. The accurate one is bad enough, and more useful to learn from.",
        },
      ],
      grants:
        "This step concedes that the church was wrong about Galileo. It shows only that the affair was a failure of interpretation, not proof of an eternal war.",
    },
    {
      id: "founders",
      move: "The warfare story has to keep one fact quiet. The people who built modern science were, with few exceptions, Christians, and many thought their faith gave them reason to expect a world worth studying. Johannes Kepler trained to become a pastor. Robert Boyle left money for lectures defending the Christian faith. Michael Faraday served as an elder among the Sandemanians, a small and strict sect that began in Scotland. James Clerk Maxwell had a psalm carved over the door of the Cavendish Laboratory: “Great are the works of the LORD, studied by all who delight in them” (Psalm 111:2).",
      objections: [
        {
          label: "Everyone was Christian then. It proves nothing.",
          response:
            "That is a fair point, and it is why Christians should state this claim narrowly. The Scientific Revolution also drew on Greek, Arabic and Jewish learning, and Noah Efron's chapter in the Numbers volume takes apart the myth that Christianity alone gave birth to science. The honest claim is smaller: the founders expected nature to be lawful because they believed a faithful God made it, and intelligible because they believed human minds bore his image. For many of them, faith was not an obstacle they overcame. It was a motive.",
        },
        {
          label: "Newton rejected the Trinity, so he doesn't count.",
          response:
            "He privately did, and Christians who enlist him as an orthodox believer do their cause no favors. Newton is evidence that belief in a Creator drove scientific work, not evidence for Nicene orthodoxy. I would rather say that plainly than borrow a reputation.",
        },
        {
          label: "Most scientists today are atheists.",
          response:
            "Surveys of elite scientists do find far lower belief than in the general population; Edward Larson and Larry Witham reported in Nature in 1998 that only about seven percent of members of the National Academy of Sciences said they believed in a personal God. That deserves to be taken seriously. Elaine Howard Ecklund's survey work, reported in Science vs. Religion (2010), also found many scientists who are religious and many more who are not hostile to religion. Belief rates among scientists tell us about scientists. They do not measure whether God exists, which is not something the scientific method can measure.",
        },
      ],
      grants:
        "This step shows that faith motivated many of the founders of science. It does not show that their faith was true.",
    },
    {
      id: "darwin",
      move: "Then Darwin, the war's second founding scene. The reception of On the Origin of Species (1859) was mixed, not a rout. Darwin's most important American ally, the Harvard botanist Asa Gray, was a devout Christian who argued that natural selection was compatible with a God working through natural processes. B. B. Warfield, whose defense of biblical inerrancy became the conservative Protestant standard, was open through much of his career to evolution as a means providence might use.",
      objections: [
        {
          label: "Evolution made God unnecessary.",
          response:
            "Richard Dawkins wrote in The Blind Watchmaker (1986) that Darwin “made it possible to be an intellectually fulfilled atheist,” and that is an honest claim about what the theory permits. It is not a claim that the theory disproves God. Evolution explains how living things came to be as they are. It does not explain why there is a universe whose laws allow evolution, or why that universe is intelligible. Francis Collins, who led the Human Genome Project, accepts common descent and argues in The Language of God (2006) that God is not diminished by working through a process.",
        },
        {
          label: "Plenty of Christians still reject evolution.",
          response:
            "Many do, and Christians genuinely disagree here, among young-earth, old-earth and evolutionary creationists. The age of the earth and the process of creation are second-order questions that divide faithful churches without dividing the faith. What no Christian may do is tell a sixteen-year-old that the gospel stands or falls with one reading of the days in Genesis, and then act surprised when she chooses the laboratory. We have done that, and it has cost us.",
        },
      ],
      grants:
        "This step shows that evolution and Christian faith have coexisted from the start. It does not settle how Genesis should be read.",
    },
    {
      id: "method",
      move: "Beneath the history lies a distinction the war story depends on blurring. Methodological naturalism is a working rule of science: investigate nature by looking for natural, repeatable causes. Metaphysical naturalism is a claim about reality: nature is all there is. The first is a method and the second is a philosophy, and the second does not follow from the first, any more than a metal detector's silence proves there is no wood in the ground.",
      objections: [
        {
          label: "If science can't detect God, there's no reason to believe.",
          response:
            "Science cannot detect justice or beauty or obligation either, and I doubt you have stopped believing in those. When I was an atheist I took the silence of science on such questions as the answer no, and exempted the values I liked from the standard I used on the God I did not want. That was selective skepticism, not the real thing. There may be no good reason to believe in God. But the reason cannot be that a method designed to study nature finds only nature.",
        },
        {
          label: "Carl Sagan said the cosmos is all there is.",
          response:
            "He opened Cosmos (1980) with the sentence “The Cosmos is all that is or ever was or ever will be.” It is a beautiful sentence, and it is not a finding of astronomy. No telescope observed it. It is a philosophical conviction voiced by a scientist, which is entirely allowed, but it should be weighed as philosophy rather than deferred to as science.",
        },
      ],
      grants:
        "This step separates the method of science from a philosophy sometimes attached to it. It does not show that the philosophy is false.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. Science hands you a magnificent description of the house. By its own method, it cannot tell you whether anyone lives there. Georges Lemaître, the Catholic priest who first proposed what became the Big Bang, refused to let his equations be turned into a proof of God, and he was right to refuse. The questions science cannot answer, why there is a nature at all and why it can be understood, are not waiting for better instruments.",
      objections: [
        {
          label: "Then religion adds nothing to knowledge.",
          response:
            "It adds nothing to physics. It may have a great deal to say about what physics presupposes and what it cannot weigh: why the world is orderly, whether it is meant, what we owe one another. Those are real questions, and everyone answers them somehow. The claim that only science produces knowledge is not itself a scientific finding.",
        },
        {
          label: "The church gave skeptics their best material.",
          response:
            "It did. Churchmen silenced Galileo, and churches told a generation of students to choose between the fossil record and Christ, and many took us at our word. We have been more afraid of what a microscope might find than confident in the God who made what it looks at. Maxwell could put a psalm over a laboratory door because he did not expect anything inside to threaten the Lord of the works. Our faith has too often been smaller than his.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. Science does not decide the question, and it does not excuse you from deciding it.",
    },
  ],
  close:
    "So here is the whole of it. The war you were told about was written up in the nineteenth century by men with institutions to defend, and the historians who checked it found a stranger and more interesting story. The church has real failures in that story, and so does the story itself. What remains is not a choice between faith and evidence. It is an older choice no laboratory can make for you: whether the order you study points beyond itself. You can decide it does not, and be welcome here. I only wanted you to stop letting a polemic decide it for you.",
};

const CHURCH: ArgumentCase = {
  slug: "church",
  essaySlugs: ["apologetics-hasnt-the-church-done-terrible-things", "church-credibility-problem"],
  title: "Hasn't the church done too much harm to be true?",
  kicker: "The case, one move at a time",
  intro:
    "The church has done terrible things, and any answer that begins by softening that sentence has already lost the argument. When I was an atheist, the Crusades were part of my case against Christianity, and the usual Christian answers, the embarrassed change of subject or the scrubbed history, only teach a skeptic that believers cannot be trusted with their own past. We will go one move at a time. I will not ask you to excuse anything. I will only ask what the record counts against.",
  published: true,
  steps: [
    {
      id: "record",
      move: "Start with the record, told plainly. In 1096, bands marching toward the First Crusade destroyed the Jewish communities of Worms and Mainz. On 15 July 1099 the crusaders took Jerusalem and massacred much of its population. In 1204 the Fourth Crusade sacked Constantinople, a Christian city. The Spanish Inquisition, established in 1478, pursued baptized Jews and their descendants for generations. Preachers defended slavery from the pulpit. And within living memory, bishops and pastors shielded men who abused children.",
      objections: [
        {
          label: "Christians always say those weren't real Christians.",
          response:
            "That excuse will not do, and I will not use it. They were baptized, they confessed the creeds I confess, and they are the church's fathers and mothers whether we like it or not. The distinction I am going to draw runs between the church and its Lord, never between true Christians and false ones, as though the church could keep its saints and disown its sinners.",
        },
        {
          label: "Historians have exaggerated this to attack the church.",
          response:
            "Some of the popular picture is exaggerated, and historians like Henry Kamen, working from the Inquisition's own records, have corrected the inflated numbers, while Thomas Madden and Jonathan Riley-Smith have corrected the picture of the Crusades as simple colonial greed. But revision must not become absolution. Riley-Smith's evidence shows many crusaders were sincerely devout, which is worse for the church, not better. Sincerity was no safeguard.",
        },
      ],
      grants:
        "This step concedes the record. It has not yet asked what the record proves.",
    },
    {
      id: "mechanism",
      move: "Now the serious form of the charge, which is a mechanism rather than a list. Christopher Hitchens argued in God Is Not Great (2007) that religion does not merely accompany tribal hatred but sanctifies it. Sam Harris argued in The End of Faith (2004) that beliefs held without evidence are dangerous in proportion to the stakes they claim, and none claim higher stakes than eternal ones. Hector Avalos argued in Fighting Words (2005) that religion creates scarce resources, sacred space and favored status and salvation, which no evidence can adjudicate, so that its violence is uniquely unnecessary.",
      objections: [
        {
          label: "That explains the Crusades perfectly.",
          response:
            "It explains a great deal, and a Christian should feel its full weight. The crusade indulgence, which promised remission of penance to those who took the cross, looks like Avalos's mechanism written down as policy, and Jerusalem, a city three faiths call holy, is the obvious illustration. I am not going to argue that religion had nothing to do with it. The question is whether religion is the root, or one banner among many.",
        },
        {
          label: "Without religion there would be far less violence.",
          response:
            "The twentieth-century regimes that set out to abolish faith, in Russia, China and Cambodia, killed on a scale no crusade approached. That is not a counterpunch, because they did not kill in the name of atheism the way crusaders killed in the name of Christ. The lesson is narrower. The capacity for atrocity is not located in religion. It is located in us, and it will march under whatever banner is nearest. Aleksandr Solzhenitsyn, who survived the Soviet camps, wrote in The Gulag Archipelago that the line between good and evil runs through every human heart.",
        },
        {
          label: "The wars of religion prove religion causes war.",
          response:
            "William Cavanaugh argued in The Myth of Religious Violence (2009) that the European wars of the sixteenth and seventeenth centuries do not fit that story neatly: Catholics fought Catholics, and Catholic France under Richelieu paid Lutheran Sweden to fight the Catholic Habsburgs. The rising state was part of the cause. His critics answer that Christians plainly killed over theology too, and they are right. Cavanaugh's book challenges a double standard. It is no alibi for the church.",
        },
      ],
      grants:
        "This step shows that religious violence is real but not unique to religion. It does not acquit the church of anything.",
    },
    {
      id: "fruit",
      move: "So what does the record count against? Here is the uncomfortable fact: the premise of the skeptic's argument comes from Jesus. “You will recognize them by their fruits” (Matthew 7:16). He gives that test as a warning about wolves in sheep's clothing, and a few verses later he describes people who call him Lord and do mighty works in his name and are disowned on the last day. He aims the fruit test first at people who use his name.",
      objections: [
        {
          label: "Then by Jesus's own test the church fails.",
          response:
            "In many places, yes. The question is what that failure refutes. If Christianity claimed its followers would be conspicuously better people than everyone else, the record would refute it. If it claims instead that its followers are sinners under the judgment of a holy Lord, the record indicts the followers on the faith's own terms. That is not an evasion. It is what the New Testament says about the church from its first pages.",
        },
        {
          label: "That makes Christianity impossible to falsify.",
          response:
            "That is a fair worry, and there is a real test. Christianity would be refuted by its history if its teaching, followed faithfully and read plainly, made people crueler; if it produced no one who loved enemies at cost; if the violence flowed from the center of the text rather than from its suppression. The faith could fail that test in principle. So we have to run it honestly.",
        },
      ],
      grants:
        "This step shows the charge is serious on Christianity's own terms. It has not yet run the test.",
    },
    {
      id: "center",
      move: "So run it. Did the violence flow from the center of the teaching or from its suppression? When James and John wanted to call fire down on a Samaritan village that refused Jesus, “he turned and rebuked them” (Luke 9:55). When a follower drew a sword in Gethsemane, Jesus said: “Put your sword back into its place. For all who take the sword will perish by the sword” (Matthew 26:52). The crusader had to set aside the plainest command in the Sermon on the Mount: “Love your enemies and pray for those who persecute you” (Matthew 5:44).",
      objections: [
        {
          label: "The Bible has violent passages they could quote.",
          response:
            "They did quote them. Augustine, defending the use of imperial force against the Donatists, took his warrant from a parable in which a master tells his servant to “compel people to come in” (Luke 14:23). But the parable is about a banquet, and the master's urgency is generosity. To make it a charter for coercing conscience, the church had to read a story about hospitality as a story about police. The violent readings required twisting. The command to love enemies only required reading.",
        },
        {
          label: "Christians only read it that way after the Enlightenment.",
          response:
            "Not only then. In 1511 the Dominican friar Antonio de Montesinos told Spanish colonists they were in mortal sin for their treatment of the native people. Bartolomé de las Casas gave up the native laborers he held and spent five decades defending them, arguing at Valladolid in 1550. William Wilberforce's evangelical faith drove the campaign that ended the British slave trade in 1807. Frederick Douglass wrote in 1845 that he loved the Christianity of Christ and hated the slaveholding religion of the land. They were reading the same book as the oppressors, and they only had to read it.",
        },
        {
          label: "You have heroes, I have villains. It's a wash.",
          response:
            "I do not think it is a wash, because it was not symmetrical. The defenders of slavery had to lean on a handful of verses lifted from their setting and suppress a story that begins with a God who hears the cry of slaves in Egypt. The abolitionists had the grain of the text with them. When one reader must silence the center of a book and the other only has to read it, that is not a tie. It does not make the church innocent. It shows where the text stood.",
        },
      ],
      grants:
        "This step shows the worst violence required resisting the teaching of Jesus. It does not excuse anyone who resisted it.",
    },
    {
      id: "standard",
      move: "A larger point came most forcefully from outside the faith. Friedrich Nietzsche, in On the Genealogy of Morality (1887), despised Christianity for making the weak and the suffering the objects of moral concern. The historian Tom Holland argued in Dominion (2019) that the West's deepest moral instincts, that victims have a claim on us and the powerful owe something to the powerless, are Christian inheritances. When we condemn the church, we are standing on ground the church taught the world to stand on.",
      objections: [
        {
          label: "That's a convenient way to take credit for my morality.",
          response:
            "It could be used that way, and I would rather not use it so. The point is narrower. When the church's crimes are judged, they are judged by the standard of its own Lord. That does not make the church good. It means the church has no excuse, because it knew better, from the book it carried.",
        },
        {
          label: "A hospital doesn't pay for a massacre.",
          response:
            "No, it does not, and I will not pretend the ledger balances. The charity of Basil of Caesarea, who built a house for the sick and poor around 370, does not compensate the dead of Mainz. The victims of one Christian are not repaid by the kindness of another. I only mean that the measuring stick by which the church stands condemned was cut largely from the story of a crucified man.",
        },
      ],
      grants:
        "This step shows the church is condemned by its own Lord's standard. It does not lessen the condemnation.",
    },
    {
      id: "now",
      move: "It is easy to repent of the Crusades; condemning men dead for eight hundred years costs nothing. The wound that should keep Christians awake is recent. From Boston in 2002 to the Southern Baptist Convention's own investigation in 2022, institutions that should have protected children protected themselves, in Christ's name. Peter wrote to the church, not about it: “For it is time for judgment to begin at the household of God” (1 Peter 4:17).",
      objections: [
        {
          label: "This is why I left.",
          response:
            "Then you left for a reason, and the reason was real. No argument heals that, and much of the damage those crimes did to faith was deserved. If you were harmed, it was a crime and not your fault, and RAINN answers at 1-800-656-4673. I would never ask you to return to a place that hurt you as the price of taking Christ seriously. The one in whose name it happened condemned it before you did.",
        },
        {
          label: "Church apologies are public relations.",
          response:
            "Many are, and you are right to be suspicious. John Paul II led a Day of Pardon in 2000, and the Southern Baptist Convention repented in 1995 of the role slavery played in its founding. Critics said both named categories rather than victims, and that criticism is fair. Neither undid anything. Repentance that does not lead to truth-telling, accountability and protection for the vulnerable is not repentance. The test is what churches do next, and many have failed it.",
        },
      ],
      grants:
        "This step names the present failure. It offers no defense, because there is none.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. The skeptic's charge stands: the church has done terrible things, some of them by devout people with Scripture in their mouths. What the charge cannot do is refute the one in whose name those things were done, because he had already condemned them, on the road through Samaria and in the garden at night. The crimes cannot disprove Christ. They are among the things he will judge, and among the things he died for.",
      objections: [
        {
          label: "I can't separate Jesus from the people who represent him.",
          response:
            "That is understandable, and it is partly the church's fault that you cannot. I would only ask you to try once, as an experiment. Read one Gospel straight through, without the church standing between you and the page, and ask whether the man in it would have approved of what was done in his name. If you conclude that he would have, you should reject him. I do not think you will.",
        },
        {
          label: "Why should I trust any of you now?",
          response:
            "You should not trust us on our word, and I include myself. I know the pull of the sermon that picks a fight because a fight draws a crowd, and the pleasant certainty that the people I oppose are opposed to God. If trust comes back, it will come from watching whether Christians confess their own sins before anyone else's and love enemies at cost. That is the only case for the church that has ever really worked.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. The record stands. What it counts against is yours to judge.",
    },
  ],
  close:
    "So here is the whole of it. The church has done terrible things, and I am not outside that history. What the record cannot do is disprove the man who rebuked his disciples for wanting to burn a village and told a follower to put away his sword. The crusaders took Jerusalem by the sword; Jesus went up to the same city to be killed there. You can look at the church and decide the whole thing is poisoned, and I would understand. I only wanted you to see that the sharpest judgment on the church's crimes has always come from its own Lord.",
};

const CONQUEST: ArgumentCase = {
  slug: "conquest",
  essaySlugs: ["did-god-command-genocide"],
  title: "Did God command genocide?",
  kicker: "The case, one move at a time",
  intro:
    "There are passages a skeptic does not need to distort; he only needs to read them aloud. When I argued as an atheist, the conquest of Canaan was one of them, and I think the person who reads these chapters and feels sick is reading them more honestly than the Christian who has learned not to notice. We will go one move at a time. I will not pretend the weight is gone.",
  published: true,
  steps: [
    {
      id: "texts",
      move: "Start with the words themselves. Of seven peoples in the land, Moses tells Israel: “you must devote them to complete destruction. You shall make no covenant with them and show no mercy to them” (Deuteronomy 7:2). Of the cities of the land: “you shall save alive nothing that breathes” (Deuteronomy 20:16). And Samuel tells Saul to strike Amalek and “kill both man and woman, child and infant” (1 Samuel 15:3). That verse removes the last hiding place. It names the infant, and it puts the command in the mouth of God.",
      objections: [
        {
          label: "That's genocide. There's no other word for it.",
          response:
            "The word was coined by Raphael Lemkin in 1944, and the 1948 Genocide Convention defines it as acts intended to destroy a national, ethnic, racial or religious group as such. Christians sometimes say the ban targeted religion rather than race, but the Convention lists religious groups by name. If Deuteronomy 20:16 were carried out as written against every person in every city, it would meet the definition. The real questions are whether it was meant and carried out as written, what it was for, and whether it licenses anyone else.",
        },
        {
          label: "Christians just skip these chapters.",
          response:
            "Many do, and that is a failure. I would rather read them aloud and stay with them. The Hebrew word ḥerem, to devote to destruction, belongs to the world of worship before it belongs to the world of war: something placed under the ban was removed from human use and handed over to God, so nothing could be taken as plunder. That frames the violence as a sacred act, which is exactly what makes a modern reader recoil. It should.",
        },
      ],
      grants:
        "This step states the texts without softening them. It has not argued anything in their defense.",
    },
    {
      id: "charge",
      move: "Now the case against God, as its best defenders make it. Richard Dawkins argued in The God Delusion (2006) that no believer actually takes his morality from these texts: Christians read Joshua and decline to imitate it, which shows they carry a moral standard above the book. The philosopher Wes Morriston pressed the point with more care in 2009. We have far better reason to believe that a perfectly good God would not command the killing of children than to believe the Bible is inerrant, so the honest believer should conclude that God did not command it.",
      objections: [
        {
          label: "Morriston is right. That's the only honest conclusion.",
          response:
            "It is a serious argument, and some Christians accept a version of it. I do not, for reasons I will lay out, but I will not call it dishonest. Morriston's argument assumes the texts are best read as straightforward reports of what God ordered and what Israel did. That is a claim about genre, and the texts themselves complicate it. If the genre reading fails, Morriston's argument gets stronger.",
        },
        {
          label: "“They deserved it” is what every army says.",
          response:
            "It is, and Christians who reach for it as if it closed the case have not listened to their own Bible. Scripture gives a category here, judgment, but not an anesthetic, and the God of the prophets says: “Have I any pleasure in the death of the wicked, declares the Lord GOD, and not rather that he should turn from his way and live?” (Ezekiel 18:23). Whatever these chapters mean, they do not license the cheerful certainty of a victor.",
        },
      ],
      grants:
        "This step gives the skeptic's argument its strongest form. It does not answer it yet.",
    },
    {
      id: "genre",
      move: "The first response concerns how the ancient world wrote about war. Around 1208 BC the pharaoh Merneptah boasted on a victory stele that Israel was laid waste and its seed was no more, and Israel went on existing. Around 840 BC Mesha, king of Moab, claimed that Israel had perished forever, using the Moabite form of the same word, ḥerem. K. Lawson Younger's Ancient Conquest Accounts (1990) showed that stock formulas of total annihilation were the conventional way of saying we won decisively, in texts written while the enemy plainly remained.",
      objections: [
        {
          label: "That's a convenient reinterpretation.",
          response:
            "It would be, if the Bible did not make the point itself. Joshua 10 says Joshua left none remaining. Then Joshua 11:22 admits that some Anakim remained in Gaza, Gath and Ashdod, Joshua 13:13 says Israel did not drive out the Geshurites, who dwell in Israel “to this day,” and Judges 1:21 says the Jebusites still lived in Jerusalem. Either the editors were too careless to notice what sat on neighboring pages, or the language of total destruction was never meant as a census.",
        },
        {
          label: "Hyperbole about a war is still about a war.",
          response:
            "Yes, and that is the honest limit of this reading. Even if the numbers are rhetorical, there were cities, and there were dead, and some of the dead were not soldiers. The genre argument moves the question off the ground the skeptic chose. It does not empty the battlefield.",
        },
        {
          label: "1 Samuel 15 wrecks the hyperbole reading.",
          response:
            "It strains it at its hardest point. Saul is condemned not for killing too many but for sparing King Agag and the best of the livestock, which suggests someone took the command literally. Paul Copan and Matthew Flannagan, in Did God Really Command Genocide? (2014), note that the Amalekites are back before the book ends, and four hundred of them escape David on camels (1 Samuel 30:17). But the critics press a further point: even if the text exaggerates what happened, it still holds up total destruction as the ideal, and it is the ideal that troubles the conscience, not only the count.",
        },
      ],
      grants:
        "This step shows the texts use a conventional idiom of exaggeration. It does not remove the violence or the command.",
    },
    {
      id: "judgment",
      move: "The second response concerns what the war was for. The text resists the tribal reading from the start. When God promises the land to Abraham, he delays for four centuries, “for the iniquity of the Amorites is not yet complete” (Genesis 15:16). Israel is told plainly that the land is given “Not because of your righteousness or the uprightness of your heart,” but because of the wickedness of these nations (Deuteronomy 9:5), wickedness that included burning children as offerings (Deuteronomy 12:31). And Leviticus warns that if Israel does the same things, the land will vomit Israel out as well (Leviticus 18:24-28). In 722 and 586 BC, it did.",
      objections: [
        {
          label: "Calling it judgment does nothing for the children.",
          response:
            "No, it does not, and I will not pretend it does. Naming the sins of Canaan explains why the text calls this judgment rather than conquest. It does not answer for a particular child who chose none of it. Some defenders argue that the children who died were received by God, and whatever one makes of that, it cannot be used to make the killing easy. This is the point where I stop arguing and carry the weight.",
        },
        {
          label: "This was a tribal war god favoring his people.",
          response:
            "The text pushes against that at every turn. Rahab, a Canaanite, confesses Israel's God and is spared, and the New Testament places her in the genealogy of Jesus (Matthew 1:5). Just before Jericho, Joshua meets a man with a drawn sword and asks whether he is for Israel or for its enemies, and the answer begins with a flat “No” (Joshua 5:14). God is not Israel's mascot. Israel stands under his command and under his judgment in the same breath.",
        },
        {
          label: "If God commanded this once, anyone can claim he commands it again.",
          response:
            "That is the right fear, and history confirms it. In 1637 English soldiers set fire to a Pequot town at Mystic, and a year later Captain John Underhill defended the killing by appealing to the wars of Scripture. The distinction that matters is between a bounded judgment tied to one people, one land and one moment, and a license for anyone. Copan and Flannagan argue that no one today has warrant to believe God has issued such a command, and the New Testament closes the door from the inside when Jesus rebukes the disciples who want to call down fire (Luke 9:54-55).",
        },
      ],
      grants:
        "This step shows the texts frame the conquest as a bounded judgment rather than a tribal war. It does not make the deaths of children bearable.",
    },
    {
      id: "cross",
      move: "There has always been a simpler way out, and the church has always refused it. Around 144 a shipowner named Marcion concluded that the God of the Old Testament was a different and lesser deity than the Father of Jesus, and cut the Hebrew Scriptures out of his Bible. Tertullian answered that goodness and justice cannot be divided between two gods without destroying both. The church kept Joshua because Jesus read those Scriptures as the word of his Father.",
      objections: [
        {
          label: "Marcion was right. Keep Jesus and drop Joshua.",
          response:
            "It is the most natural response, and many modern readers reach for it without knowing his name. The church rejected it because a God who is good but never judges has made his peace with evil, and a Christ cut loose from Israel is a Christ nobody can recognize. Greg Boyd, in The Crucifixion of the Warrior God (2017), tries another path, keeping the texts while reading their violent portraits through the cross as God stooping to bear his people's distorted picture of him. His critics say that returns to Dawkins's sorting problem by a more reverent road. Readers who find him persuasive remain inside the faith.",
        },
        {
          label: "Reading it through the cross doesn't change what it says.",
          response:
            "It does not change the words. It changes where the story goes. Paul writes that “Christ redeemed us from the curse of the law by becoming a curse for us” (Galatians 3:13). The Judge of Canaan did not stay outside the judgment; he entered it and bore it. And the canon ends with the ban abolished: “No longer will there be anything accursed” (Revelation 22:3). That does not return the children of Jericho to their mothers. It tells us who took the curse, and who we are forbidden to become.",
        },
      ],
      grants:
        "This step shows the church refused to cut these texts and read them toward the cross. It does not answer the objection they raise.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. The strongest objection has not been fully answered, and Morriston names it: this position still asks you to believe that a good God, at least once, commanded a war in which children died. I do not think that objection can be argued away. I think it can only be carried, and carried somewhere.",
      objections: [
        {
          label: "Then I can't worship that God.",
          response:
            "I understand, and I will not try to argue you out of the revulsion; it is a sign that you are reading honestly. I would only ask you to hold the whole book in view before you decide what God it shows: the one who waited four centuries, who spared Rahab, who took no side, who warned Israel it would be judged by the same standard, and who finally took the curse onto himself rather than handing it to anyone to wield.",
        },
        {
          label: "This is my best reason to reject the Bible.",
          response:
            "It may be a better reason than most people give, and I will not treat it as small. Christians carry these chapters as a wound in the book we trust, and pretending otherwise has only deepened the wound. I would only say that the book which contains them is the same book that finally takes the sword out of human hands. That does not close the question. It is why I have not closed the book.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. The difficulty remains. It is carried, not solved.",
    },
  ],
  close:
    "So here is the whole of it. The texts say what they say, and the best readings change the picture more than skeptics usually allow and less than defenders usually claim. What remains is a judgment described in the violent idiom of its age, bound to one moment, licensing no one after it, and finally borne by the one who gave it. That does not return the dead to their mothers, and I will not pretend it does. You may still find it unbearable. I only wanted you to see the whole book before you judged the God in it.",
};

const SLAVERY: ArgumentCase = {
  slug: "slavery",
  essaySlugs: ["why-didnt-the-bible-ban-slavery"],
  title: "Why didn't the Bible ban slavery?",
  kicker: "The case, one move at a time",
  intro:
    "When I was an atheist I kept a short list of arguments I considered closed, and this one sat near the top. If God is good and the book is his word, then somewhere in its thousands of verses it should manage a plain sentence: own no human being. It never does. We will go one move at a time. The objection deserves its full weight, and I carried it at full weight for years.",
  published: true,
  steps: [
    {
      id: "texts",
      move: "Start with the texts that armed the slaveholders. Leviticus permits Israel to “buy male and female slaves from among the nations that are around you,” and to leave them to their sons “to inherit as a possession forever” (Leviticus 25:44-46). Exodus says that when a master strikes his slave with a rod and the slave survives a day or two, “he is not to be avenged, for the slave is his money” (Exodus 21:21). In the New Testament, Paul tells slaves to obey their earthly masters (Ephesians 6:5), and he sends Onesimus back to Philemon.",
      objections: [
        {
          label: "That settles it. The Bible endorses slavery.",
          response:
            "It regulates slavery, and some of that regulation permits things that should trouble any reader, including me. I will not soften Leviticus 25 or Exodus 21. The question is whether regulation is the whole story, or whether the same book plants something that cannot live alongside the institution. We will look. But I do not want you to think I am hurrying past these verses. They are there.",
        },
        {
          label: "It wasn't like American slavery. It was debt service.",
          response:
            "Much of what the Hebrew law regulates was debt-servitude with a forced release. A Hebrew slave served six years and went free in the seventh (Exodus 21:2), and every fiftieth year the trumpet was to “proclaim liberty throughout the land to all its inhabitants” (Leviticus 25:10). That distinction is real. But it is exactly where a defender is tempted to plant a flag and declare victory, and it does not touch the permanent, inherited ownership of foreigners in the same chapter. An honest believer has to hold both.",
        },
      ],
      grants:
        "This step states the texts without softening them. It has not yet asked what else the book says.",
    },
    {
      id: "history",
      move: "Then grant the history, which is not a misunderstanding but a debt. George Whitefield lobbied for slavery to be legalized in Georgia and held enslaved people himself. Jonathan Edwards owned them. In the American crisis, the most confident biblical arguments were often the proslavery ones. The historian Mark Noll showed in The Civil War as a Theological Crisis (2006) that the proslavery side could claim the plainer literal reading of individual verses, and many devout, literate people found it more scriptural than the abolitionist case.",
      objections: [
        {
          label: "So the Bible was on the slaveholders' side.",
          response:
            "Noll's point is sharper than that. The proslavery reading could claim the plain sense of isolated verses, but those verses said nothing to justify the race-based slavery it actually defended, and a church in the habit of reading verse by verse had no way to settle the question short of war. That is an indictment of how we read. It is also why the whole book has to be read before anyone decides what it teaches.",
        },
        {
          label: "Christians were on the wrong side of history.",
          response:
            "Many were, including famous ones, and I will not hide behind the abolitionists. Frederick Douglass, who had been owned, wrote in the appendix to his Narrative (1845) that he loved what he called the Christianity of Christ and despised the slaveholding religion of the land, and he insisted that between the two lay the widest possible difference. He earned that sentence in a way I never will. I would only ask you to notice which of the two he said belonged to Christ.",
        },
      ],
      grants:
        "This step concedes the church's complicity. It does not show that the book required it.",
    },
    {
      id: "seeds",
      move: "Now what I never noticed while I was using the argument as a weapon. Scattered through the same Scriptures are lines that cannot coexist with the institution. Israel's founding memory is a God who hears slaves: “I have surely seen the affliction of my people who are in Egypt and have heard their cry because of their taskmasters” (Exodus 3:7). And a few verses after the law on striking a slave comes this: “Whoever steals a man and sells him, and anyone found in possession of him, shall be put to death” (Exodus 21:16).",
      objections: [
        {
          label: "That verse didn't stop Israel from owning slaves.",
          response:
            "It did not abolish slavery, and I will not claim it did. But it condemns the Atlantic trade at its root. That system was, from the first raid on an African village to the last auction block, one unbroken chain of stealing people. Every person in it had been stolen, or was the child of someone stolen, so by the plain letter of the law the slaveholders claimed to honor, every trader and buyer stood condemned. Paul lists “enslavers” among the lawless (1 Timothy 1:10), using a word for those who traffic in people.",
        },
        {
          label: "Then why send a runaway back, like Paul did?",
          response:
            "The Torah forbids returning a runaway: “You shall not give up to his master a slave who has escaped from his master to you” (Deuteronomy 23:15). Set that beside the Fugitive Slave Act of 1850. As for Onesimus, scholars debate whether he was a runaway at all, but Paul tells Philemon to receive him “no longer as a bondservant but more than a bondservant, as a beloved brother” (Philemon 16). Once you call the man you own your beloved brother, the institution has already died inside you.",
        },
        {
          label: "Paul told slaves to stay slaves.",
          response:
            "He told believers not to make their social station the center of who they are, and in the same breath told slaves that if they could gain their freedom, they should take it (1 Corinthians 7:21). He also wrote the sentence no slave market can share a room with: “There is neither Jew nor Greek, there is neither slave nor free, there is no male and female, for you are all one in Christ Jesus” (Galatians 3:28). He did not issue a decree. He planted a charge.",
        },
      ],
      grants:
        "This step shows the Bible contains principles that condemn slavery. It does not explain why they were left to work so slowly.",
    },
    {
      id: "why",
      move: "So the question sharpens. Why plant seeds instead of swinging a sword? I think the answer is a pattern that runs through how this God works. He does not usually abolish a fallen order by decree and leave the hearts inside it unchanged. He plants what will make the order unbearable to people who have been changed. A decree bans a practice, and the next regime can repeal it. A brother cannot be owned, and once that is truly believed, it unmakes the man who believes it, and then he unmakes the practice himself.",
      objections: [
        {
          label: "That's generations of suffering while the seeds grow.",
          response:
            "It is, and that is the hardest part of the whole account. The people who paid the cost while the seed grew were real, and I will not pretend that arithmetic is painless. It is not. This is where the answer runs out of explanation and has to be carried, the same way the problem of suffering has to be carried.",
        },
        {
          label: "An all-powerful God could have changed hearts and banned it.",
          response:
            "He could have written the sentence, yes. Whether it would have ended the practice is another question: the Torah forbade stealing people outright, and Christian slaveholders read past that for centuries. Decrees in a book are easily ignored. I think the harder thing was done, a story placed at the center of the faith that slaves themselves could read and recognize as their own. I do not claim that answers why God did not also do the easier thing.",
        },
      ],
      grants:
        "This step offers an account of how God works. It does not justify the suffering that his way of working allowed.",
    },
    {
      id: "harvest",
      move: "When the harvest came, it came from where the seeds were planted. Around 379, Gregory of Nyssa preached the fourth of his homilies on Ecclesiastes, condemning the ownership of human beings outright, perhaps the earliest such condemnation to survive from the ancient world. The Quakers moved first against the Atlantic trade. William Wilberforce's evangelical conversion in 1785 drove the long campaign that ended the British slave trade in 1807. John Newton, who had captained a slave ship, came to write against the trade. And the deepest reservoir of abolitionist conviction in America was the Black church, the enslaved themselves, who heard the Exodus read and knew whose story it was.",
      objections: [
        {
          label: "Abolition came from Enlightenment reason, not the Bible.",
          response:
            "The Enlightenment played a real part, and I do not want to erase it. But in the English-speaking world the movement was driven in large part by religious conviction, and the enslaved did not take their hope from philosophers. They took it from the book their masters handed them, expecting it to make them docile, and it made them free instead. Neither the church nor the Enlightenment has a clean record here. The seed grew in both soils.",
        },
        {
          label: "Gregory of Nyssa was one voice, and the church ignored him.",
          response:
            "Largely it did, for more than a thousand years, and that is a judgment on the church. But it shows the case against slavery could be made from Scripture by an orthodox bishop in the fourth century, reasoning from the image of God in every person. The seed was there. The church's failure to let it grow was the church's failure, not the book's.",
        },
      ],
      grants:
        "This step shows abolition drew deeply on Christian faith. It does not erase the church's long complicity.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. The Bible does not ban slavery in a sentence. It regulates an institution it did not create, in ways that include permissions that should trouble us. It also hides a death sentence for stealing people in the fine print of the slaveholder's own law, calls the owned man a brother, and makes the freeing of slaves the story a whole people were commanded never to forget.",
      objections: [
        {
          label: "I still wanted the plain sentence.",
          response:
            "So did I. I have come to think he did something harder to argue with. He made the men who owned slaves read, year after year, about the God who set slaves free. You can decide that was not enough. I only ask that you weigh the whole book rather than the verses that armed the slaveholders, which is what I did for too long.",
        },
        {
          label: "The church's complicity is still disqualifying.",
          response:
            "It is a wound the believer carries into the room and sets on the table before saying anything else. Southern Baptists repented in 1995 of slavery's role in their founding, a century and a half late. I do not think the church's complicity disproves the Christ it betrayed. I think it condemns the church by his own words.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. It does not make the texts comfortable. It shows what else is in the book.",
    },
  ],
  close:
    "So here is the whole of it. The Bible regulates slavery, and some of its permissions should trouble anyone who reads them, including me. It also makes stealing a person a capital crime, protects the runaway, calls the slave a brother, and begins the story of God's people with slaves walking out of Egypt. When the enslaved read it, they found themselves in it and not their masters. You can weigh all of that and still find the missing sentence unforgivable. I only wanted you to read the whole book before you decided what it said.",
};

const ATONEMENT: ArgumentCase = {
  slug: "atonement",
  essaySlugs: ["why-did-jesus-have-to-die"],
  title: "Why would God need a death to forgive?",
  kicker: "The case, one move at a time",
  intro:
    "Before I came to faith, the God I refused was a short fuse in the sky. Many people were handed that God, and the cross was explained to them as the moment his anger finally found somewhere to land. Some people would rather have no God than that one, and I understand why. We will go one move at a time. Push back wherever this starts to sound like a God with a temper.",
  published: true,
  steps: [
    {
      id: "simply",
      move: "Start with the objection at full strength. We forgive each other constantly and nobody dies. If a father can forgive the son who wrecked the car, surely God can forgive without blood. In the sixteenth century the theologian Faustus Socinus pressed this with real precision: a debt paid in full has not been forgiven, and a debt forgiven needed no payment. You can have forgiveness or satisfaction, but not both.",
      objections: [
        {
          label: "Exactly. Why can't God just forgive?",
          response:
            "Watch what forgiveness does among us. When a woman forgives her husband's betrayal, the betrayal does not evaporate. She absorbs it, carrying the lost trust and the wasted years rather than sending the bill back to the man who ran it up. Forgiveness is free only to the one forgiven; the one who forgives bears the cost. That is why cheap forgiveness offends us. The question was never whether forgiveness costs. It is who pays.",
        },
        {
          label: "Socinus is right. Payment cancels forgiveness.",
          response:
            "He is right when the one who pays and the one who forgives are different people. If I pay your debt to a bank, the bank has forgiven nothing. But the Christian claim is that the one who forgives is the one who pays. The creditor absorbs the loss himself. That is forgiveness at full cost, not forgiveness canceled by payment.",
        },
      ],
      grants:
        "This step shows that forgiveness always costs someone. It does not yet show why the cost is a death.",
    },
    {
      id: "wrath",
      move: "Every account of the cross runs into the word the modern reader most wants to avoid, which is wrath. The comfortable story, an angry Old Testament God calmed down by a gentle Jesus, does not survive the texts. But Scripture's own self-portrait will not let wrath mean temper. God names himself to Moses as “merciful and gracious, slow to anger, and abounding in steadfast love and faithfulness” (Exodus 34:6), and in the next verse as one who “will by no means clear the guilty” (Exodus 34:7).",
      objections: [
        {
          label: "A God who gets angry is a primitive God.",
          response:
            "Human anger is mostly weather, a loss of control when something hits a sore place. The prophets described something else. Abraham Joshua Heschel argued in The Prophets (1962) that God's anger is the proof that he is not neutral about evil. A mother who watched her child harmed with serene neutrality would care less than the mother who burns. On this reading, the wrath of God is his settled opposition to everything that destroys what he loves.",
        },
        {
          label: "Wrath is a tool to scare people into church.",
          response:
            "It has been used that way, and that is a sin. But consider who hears it as good news. Miroslav Volf, writing Exclusion and Embrace (1996) out of the wars in the former Yugoslavia, came to think that the idea of a God who refuses to judge is born in the quiet of a suburban home and dies in a land soaked in innocent blood. It is the confidence that God will judge that lets a victim lay down the sword. Victims seldom ask for a God without wrath.",
        },
      ],
      grants:
        "This step reframes wrath as love's opposition to evil. It does not show that the opposition requires a death.",
    },
    {
      id: "windows",
      move: "The church has never defined a single mechanism for how the cross saves. The creeds confess that Christ was crucified for us; they do not say exactly how that works. So the tradition has offered several windows onto it. The oldest, which Gustaf Aulén called Christus Victor in 1931, sees a rescue: humanity held captive by sin and death, and God fighting for us. Anselm, in 1098, spoke of a debt of honor only a God-man could pay. The Reformers spoke of Christ bearing the penalty in our place. Abelard, in the 1130s, stressed that the cross changes us by showing a love that kindles love in return.",
      objections: [
        {
          label: "If Christians can't agree how it works, why believe it does?",
          response:
            "Because the disagreement is about mechanism, not about the event. Doctors prescribed aspirin for decades before anyone understood how it worked. The church has confessed from the beginning “that Christ died for our sins in accordance with the Scriptures” (1 Corinthians 15:3). The windows are attempts to see into something larger than any one of them. Fleming Rutledge argues in The Crucifixion (2015) that they need one another, and I think she is right.",
        },
        {
          label: "Substitution is the ugly one. Drop it.",
          response:
            "Many would like to. But its roots run deep: the servant in Isaiah “was pierced for our transgressions; he was crushed for our iniquities” (Isaiah 53:5), and Paul writes that God “made him to be sin who knew no sin” (2 Corinthians 5:21). What matters is how it is stated. John Stott, in The Cross of Christ (1986), called it the self-substitution of God and rejected any picture of a loving Son placating an unwilling Father. The one who takes our place is God himself.",
        },
      ],
      grants:
        "This step shows the church holds several accounts of the cross together. It does not make any of them easy.",
    },
    {
      id: "abuse",
      move: "So the sharpest objection. In 1989 Joanne Carlson Brown and Rebecca Parker argued, in an essay titled “For God So Loved the World?”, that the church's accounts of the cross picture a Father who requires his child's suffering, which amounts to divine child abuse, and that they teach the abused that silent endurance is Christlike. The British pastor Steve Chalke put a similar charge into a phrase, cosmic child abuse, in The Lost Message of Jesus (2003).",
      objections: [
        {
          label: "That's exactly what it sounds like.",
          response:
            "The charge lands on things pastors have actually said, so the answer has to begin with confession. Women have been sent home to violent husbands and told to carry it as their cross. That is grievous sin. No reading of the cross ever requires anyone to stay under abuse; the cross is where God took the victim's side. If you are in danger at home, the National Domestic Violence Hotline answers at 1-800-799-7233, and if you are thinking of ending your life, call or text 988.",
        },
        {
          label: "But the Father still sent the Son to die.",
          response:
            "The charge assumes the Father and the Son are two beings with two wills, one inflicting and one enduring. That describes a family tragedy, not the Trinity. Jesus says of his life, “No one takes it from me, but I lay it down of my own accord” (John 10:18). Paul says that “in Christ God was reconciling the world to himself” (2 Corinthians 5:19). God is in Christ, on the cross, not standing apart and aiming violence at someone else. The wrath is not appeased by a third party. It is borne by God himself.",
        },
        {
          label: "Isaiah says it was the LORD's will to crush him.",
          response:
            "It does: “Yet it was the will of the LORD to crush him” (Isaiah 53:10), and I will not hide the verse. But the same passage calls the servant's death an offering, and the New Testament reads it as the act of the whole Trinity, speaking of Christ, “who through the eternal Spirit offered himself without blemish to God” (Hebrews 9:14). The will that crushes and the will that offers are one will. That does not make the verse gentle. It makes it something other than a parent harming a child.",
        },
      ],
      grants:
        "This step answers the charge of abuse by insisting that God himself bears the cost. It does not make the cross any less terrible.",
    },
    {
      id: "kant",
      move: "One objection remains that the substitution window has not fully answered. Immanuel Kant argued in Religion within the Bounds of Mere Reason (1793) that moral guilt is the most personal of debts and cannot be handed to someone else the way money can. You can pay my fine. You cannot carry my guilt.",
      objections: [
        {
          label: "Kant is right. Guilt can't be transferred.",
          response:
            "He has a point I cannot dismiss. The tradition's best answer is union with Christ: he is the head in whom we are included, not a stranger swapped in for us, so Paul can write that “one has died for all, therefore all have died” (2 Corinthians 5:14). That answer goes a long way without dissolving the mystery. A Christian who leans more on the victory or participation windows because of Kant's objection still sits at the same table.",
        },
        {
          label: "Union with Christ is just more mystery.",
          response:
            "It is a mystery, and I will not dress it up as a formula. But we know something like it. A family can carry the disgrace of one member, and a nation can inherit the debts of its fathers. Daniel confessed sins he had not committed because he belonged to the people who had (Daniel 9:5). The idea that persons are bound together, so that one can act for many, is strange to modern individualism. It is not strange to human experience.",
        },
      ],
      grants:
        "This step names an objection the tradition has not fully answered. It does not settle it.",
    },
    {
      id: "verdict",
      move: "So here is the honest limit. None of this proves the cross did what Christians say it did. What it shows is that the question was never whether God could forgive cheaply but whether he would pay the cost himself. The Christian claim is that evil is real enough to require it, that love is great enough to pay it, and that God would not ask anyone to stand where he was unwilling to stand himself. Whether that is true depends on whether the one who died rose.",
      objections: [
        {
          label: "It still seems barbaric.",
          response:
            "The death was barbaric. Crucifixion was the death Rome kept for slaves and rebels, meant to erase a person's standing before everyone who passed by. The Christian claim is not that the barbarity was good. It is that God entered the barbarity we practice, bore it, and prayed for the people doing it: “Father, forgive them, for they know not what they do” (Luke 23:34). The question is whether that is barbarism, or the answer to it.",
        },
        {
          label: "I'd rather believe in a God who simply forgives.",
          response:
            "I understand the wish. But a God who announced that the worst thing ever done to someone you love simply does not count would betray the victim a second time. H. Richard Niebuhr named what we would be left with, in The Kingdom of God in America (1937): “A God without wrath brought men without sin into a kingdom without judgment through the ministrations of a Christ without a cross.” That God is easier to believe in. He is also unable to take evil seriously, which means he cannot take you seriously either.",
        },
      ],
      grants:
        "This is where the case ends and the weighing begins. The cross remains a scandal, and what it means is yours to judge.",
    },
  ],
  close:
    "So here is the whole of it. The cross does not tell you that your sin was smaller than you feared. It says your sin was as serious as you feared, serious enough to cost a death, and that the death has already happened, and that the one who died was God. If that is true, the fire you feared was the heat of a love that refused to leave you to what was killing you. If it is not, it is the most beautiful story ever told about a debt no one could pay. You can close this unconvinced. I only wanted you to see that the God on that cross was not the short fuse you were handed.",
};

export const ARGUMENT_CASES: ArgumentCase[] = [
  RESURRECTION, EVIL, GOSPELS, JESUS, PLURALISM, WISHFUL, FAITH, HELL, MEANING,
  KALAM, CONTINGENCY, FINE_TUNING, MORAL, CONSCIOUSNESS, REASON, DESIRE, EXPERIENCE,
  HISTORICAL_JESUS, MIRACLES, HIDDENNESS, SCIENCE, CHURCH, CONQUEST, SLAVERY, ATONEMENT,
];

export function caseBySlug(slug: string): ArgumentCase | undefined {
  return ARGUMENT_CASES.find((c) => c.slug === slug);
}

/**
 * The published case built from a given essay, if there is one. Used at the
 * foot of an essay to offer the reader the interactive version of the argument
 * they just read.
 */
export function caseForEssay(essaySlug: string): ArgumentCase | undefined {
  if (!essaySlug) return undefined;
  return ARGUMENT_CASES.find((c) => c.published && c.essaySlugs.includes(essaySlug));
}
