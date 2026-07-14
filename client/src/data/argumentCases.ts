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
  intro: "This case is being written.",
  published: false,
  steps: [],
  close: "",
};

const MEANING: ArgumentCase = {
  slug: "meaning",
  title: "Can a life mean anything without God?",
  kicker: "The case, one move at a time",
  intro: "This case is being written.",
  published: false,
  steps: [],
  close: "",
};

export const ARGUMENT_CASES: ArgumentCase[] = [RESURRECTION, HELL, MEANING];

export function caseBySlug(slug: string): ArgumentCase | undefined {
  return ARGUMENT_CASES.find((c) => c.slug === slug);
}
