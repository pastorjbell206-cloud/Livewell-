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
}

const RESURRECTION: ArgumentCase = {
  slug: "resurrection",
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

export const ARGUMENT_CASES: ArgumentCase[] = [RESURRECTION, EVIL, GOSPELS, JESUS, HELL, MEANING];

export function caseBySlug(slug: string): ArgumentCase | undefined {
  return ARGUMENT_CASES.find((c) => c.slug === slug);
}
