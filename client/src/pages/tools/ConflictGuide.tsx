import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronRight, Printer, AlertTriangle } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────── */

interface GuidingQuestion {
  text: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
  questions: GuidingQuestion[];
  scripture: { text: string; reference: string };
  warning: string;
}

interface ConflictType {
  id: string;
  label: string;
  description: string;
  steps: Step[];
  relatedArticles: { title: string; href: string }[];
}

/* ── Data ──────────────────────────────────────────────────────── */

const CONFLICT_TYPES: ConflictType[] = [
  {
    id: "communication",
    label: "Communication Breakdown",
    description:
      "When you and your spouse are talking past each other -- or have stopped talking at all. The silence that grows between two people who share a bed is louder than any argument.",
    steps: [
      {
        number: 1,
        title: "Name what happened",
        description:
          "Before you can repair anything, you have to agree on what broke. Not your interpretation of it. Not the story you have been rehearsing in your head for three days. What actually happened, stripped of motive and accusation.",
        questions: [
          { text: "What specific moment or exchange triggered this conflict?" },
          { text: "If a camera had recorded the conversation, what would it show -- without commentary?" },
          { text: "When did you first realize this was no longer a normal conversation?" },
        ],
        scripture: {
          text: "Everyone should be quick to listen, slow to speak and slow to become angry.",
          reference: "James 1:19",
        },
        warning:
          "Do not begin with 'You always...' or 'You never...' Those words are not descriptions. They are indictments. And indictments put people on trial, not in conversation.",
      },
      {
        number: 2,
        title: "Name what you feel",
        description:
          "There is a difference between 'You made me feel ignored' and 'I feel ignored.' The first is an accusation disguised as vulnerability. The second is honesty. The difference is one word, and it changes everything.",
        questions: [
          { text: "What emotion did you feel during the exchange -- not what you thought, but what you felt in your body?" },
          { text: "Is this feeling familiar? Have you felt it before this relationship?" },
          { text: "What is the emotion underneath the anger -- is it fear, grief, loneliness, or something else?" },
        ],
        scripture: {
          text: "Search me, God, and know my heart; test me and know my anxious thoughts.",
          reference: "Psalm 139:23",
        },
        warning:
          "Do not weaponize your emotions. 'I feel hurt' is vulnerable. 'I feel hurt because you are selfish' is an attack wearing the costume of feeling-language.",
      },
      {
        number: 3,
        title: "Name what you need",
        description:
          "Most couples fight because they need something they have not asked for clearly. A vague sense of dissatisfaction is not a request. Your spouse is not a mind reader. They are a person who loves you and cannot hit a target they cannot see.",
        questions: [
          { text: "What specific thing do you need from your spouse right now -- not in general, but this week?" },
          { text: "Have you ever clearly stated this need, or have you been waiting for them to guess?" },
          { text: "Is what you are asking for something your spouse can actually give?" },
        ],
        scripture: {
          text: "You do not have because you do not ask God.",
          reference: "James 4:2b",
        },
        warning:
          "Do not confuse a need with a verdict. 'I need you to acknowledge that you were wrong' is not a need. It is a demand for a confession. A need sounds like: 'I need ten minutes of your full attention when I get home.'",
      },
      {
        number: 4,
        title: "Listen to their side",
        description:
          "This is the step most people skip, because listening without defending feels like losing. It is not. It is the only way two people who see the same event differently can stand in the same room without the room catching fire.",
        questions: [
          { text: "Can you repeat back what your spouse said without correcting or interpreting it?" },
          { text: "What might they be feeling that they have not said out loud?" },
          { text: "What part of their perspective, even a small part, do you recognize as true?" },
        ],
        scripture: {
          text: "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves.",
          reference: "Philippians 2:3",
        },
        warning:
          "Do not listen in order to build your rebuttal. If you are composing your response while they are talking, you are not listening. You are loading ammunition.",
      },
      {
        number: 5,
        title: "Agree on one next step",
        description:
          "One step. Not a ten-point plan. Not a sweeping promise that neither of you can keep. One concrete, verifiable action that you will both do this week. Marriages are not rebuilt in grand gestures. They are rebuilt in small, repeated faithfulness.",
        questions: [
          { text: "What is one thing each of you can commit to doing differently this week?" },
          { text: "How will you check in with each other about this commitment -- when and where?" },
          { text: "If this step works, what would it look like in your daily life together?" },
        ],
        scripture: {
          text: "Therefore, if you are offering your gift at the altar and there remember that your brother or sister has something against you, leave your gift there in front of the altar. First go and be reconciled to them.",
          reference: "Matthew 5:23--24",
        },
        warning:
          "Do not promise what you cannot deliver. 'I will never do that again' is a promise you will break. 'I will pause for ten seconds before I respond when I feel defensive' is a promise you can keep.",
      },
    ],
    relatedArticles: [
      { title: "Read essays on marriage and communication", href: "/writing?category=marriage" },
    ],
  },
  {
    id: "financial",
    label: "Financial Disagreement",
    description:
      "Money fights are never about money. They are about security, control, fear, and what you believe you deserve. The number on the bank statement is a symptom. The disease is older than the marriage.",
    steps: [
      {
        number: 1,
        title: "Name what happened",
        description:
          "Was it a purchase? A hidden account? A disagreement about priorities? Name the specific financial event without assigning motive. 'You spent $300 on something we did not discuss' is a fact. 'You do not care about our family' is a story you are telling yourself.",
        questions: [
          { text: "What specific financial decision or event caused this conflict?" },
          { text: "Was there an agreement in place that was broken, or was there no agreement at all?" },
          { text: "Is this the first time this has happened, or is it a pattern?" },
        ],
        scripture: {
          text: "For where your treasure is, there your heart will be also.",
          reference: "Matthew 6:21",
        },
        warning:
          "Do not interrogate. This is not a deposition. If you treat your spouse like a defendant, they will act like one -- defensive, silent, or dishonest.",
      },
      {
        number: 2,
        title: "Name what you feel",
        description:
          "Financial conflict triggers some of the deepest emotions in a marriage because money is connected to survival. The anxiety you feel is real. It may also be older than this argument.",
        questions: [
          { text: "What emotion surfaces when you think about this financial situation -- fear, anger, shame, helplessness?" },
          { text: "Did your family of origin fight about money? How does that history shape your reaction now?" },
          { text: "Are you reacting to what happened, or to what you fear could happen?" },
        ],
        scripture: {
          text: "Do not worry about your life, what you will eat or drink; or about your body, what you will wear. Is not life more than food, and the body more than clothes?",
          reference: "Matthew 6:25",
        },
        warning:
          "Do not use financial fear to control the conversation. 'We are going to lose everything' may feel true in the moment. It is almost certainly not true. Catastrophizing shuts down dialogue.",
      },
      {
        number: 3,
        title: "Name what you need",
        description:
          "Financial needs in a marriage are rarely about a specific dollar amount. They are about transparency, shared decision-making, and the feeling that you are building something together rather than being dragged along.",
        questions: [
          { text: "Do you need a shared budget, or do you need more communication about spending decisions?" },
          { text: "What financial boundary, if established, would give you peace?" },
          { text: "What does financial partnership actually look like to you -- in specific terms, not principles?" },
        ],
        scripture: {
          text: "Plans fail for lack of counsel, but with many advisers they succeed.",
          reference: "Proverbs 15:22",
        },
        warning:
          "Do not demand total control of the finances as a solution. Financial domination by one spouse is not stewardship. It is control. Partnership means both people have voice and visibility.",
      },
      {
        number: 4,
        title: "Listen to their side",
        description:
          "Your spouse's relationship with money was formed long before they met you. Their spending habits, their fears, their generosity or lack of it -- all of these were shaped by a family system you may not fully understand.",
        questions: [
          { text: "What is your spouse's earliest memory of money? What did it teach them?" },
          { text: "Is your spouse a spender or a saver -- and can you see how that came from their upbringing?" },
          { text: "What financial stress is your spouse carrying that you may not know about?" },
        ],
        scripture: {
          text: "Be completely humble and gentle; be patient, bearing with one another in love.",
          reference: "Ephesians 4:2",
        },
        warning:
          "Do not dismiss their financial perspective because you consider yourself the 'responsible' one. Many financial conflicts in marriage are not between right and wrong. They are between two different kinds of fear.",
      },
      {
        number: 5,
        title: "Agree on one next step",
        description:
          "Financial alignment in marriage does not happen in one conversation. It happens in a repeated rhythm of transparency and shared decision-making. Start with one practice.",
        questions: [
          { text: "Can you agree to a weekly fifteen-minute conversation about money -- not a fight, a check-in?" },
          { text: "What spending threshold requires a conversation before the purchase? Name a specific number." },
          { text: "Would a shared budgeting tool or app reduce the friction?" },
        ],
        scripture: {
          text: "Suppose one of you wants to build a tower. Will you not first sit down and estimate the cost to see if you have enough money to complete it?",
          reference: "Luke 14:28",
        },
        warning:
          "Do not create a financial system so restrictive that it feels like punishment. The goal is trust, not surveillance. A budget that feels like a cage will be abandoned within a month.",
      },
    ],
    relatedArticles: [
      { title: "Read essays on stewardship and financial health", href: "/writing?category=living-well" },
    ],
  },
  {
    id: "parenting",
    label: "Parenting Conflict",
    description:
      "When two parents disagree about how to raise their children, the argument is almost never about bedtimes or screen limits. It is about what kind of adults they are trying to form -- and they have not said that out loud.",
    steps: [
      {
        number: 1,
        title: "Name what happened",
        description:
          "Was it a discipline decision? A disagreement in front of the children? One parent undermining the other? Name the event, not the character flaw you want to assign to it.",
        questions: [
          { text: "What specific parenting moment triggered this conflict?" },
          { text: "Did one parent override or undermine the other in front of the children?" },
          { text: "Is this conflict about a one-time event, or an ongoing pattern of disagreement?" },
        ],
        scripture: {
          text: "Start children off on the way they should go, and even when they are old they will not turn from it.",
          reference: "Proverbs 22:6",
        },
        warning:
          "Do not use the children as evidence in your case against your spouse. 'The kids agree with me' is not a parenting insight. It is a coalition against the other parent.",
      },
      {
        number: 2,
        title: "Name what you feel",
        description:
          "Parenting conflicts hit a nerve that runs deeper than most people realize. When your spouse parents differently than you want, it can feel like an attack on your values, your family of origin, and your vision of who your children will become.",
        questions: [
          { text: "What emotion did you feel in that moment -- fear for your child, anger at being overruled, or something else?" },
          { text: "Does this conflict remind you of how you were parented -- either because you want to replicate it or escape it?" },
          { text: "Are you afraid of a specific outcome for your child, or are you reacting to a loss of control?" },
        ],
        scripture: {
          text: "Fathers, do not exasperate your children; instead, bring them up in the training and instruction of the Lord.",
          reference: "Ephesians 6:4",
        },
        warning:
          "Do not claim moral superiority over your spouse's parenting. 'At least I am involved' or 'At least I discipline them' are not observations. They are weapons.",
      },
      {
        number: 3,
        title: "Name what you need",
        description:
          "What you need from your co-parent is usually not a different parenting style. It is alignment -- the confidence that you are on the same team, even when you disagree about tactics.",
        questions: [
          { text: "What specific parenting practice do you need to agree on right now?" },
          { text: "Do you need a unified front on discipline, or do you need to feel consulted before decisions are made?" },
          { text: "What would it look like for you and your spouse to parent as allies rather than opponents?" },
        ],
        scripture: {
          text: "How good and pleasant it is when God's people live together in unity!",
          reference: "Psalm 133:1",
        },
        warning:
          "Do not demand that your spouse parent exactly like you. Unity does not mean uniformity. Children benefit from two parents who bring different strengths, provided those parents are not at war.",
      },
      {
        number: 4,
        title: "Listen to their side",
        description:
          "Your spouse's parenting instincts come from somewhere. Their strictness or leniency, their fears and hopes for your children -- all of it was formed before the children arrived. Understanding the source changes the conversation.",
        questions: [
          { text: "What about your spouse's own upbringing shapes their approach to parenting?" },
          { text: "What fear is driving your spouse's parenting in this specific situation?" },
          { text: "Is there a legitimate strength in their approach that you have dismissed because it is different from yours?" },
        ],
        scripture: {
          text: "My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry.",
          reference: "James 1:19",
        },
        warning:
          "Do not have this conversation in front of the children. Parenting disagreements resolved in public teach children that their parents are not safe. Resolve it privately. Present it together.",
      },
      {
        number: 5,
        title: "Agree on one next step",
        description:
          "Pick one parenting issue -- the one causing the most friction -- and create a shared approach. Not forever. For this week. See how it works. Adjust together.",
        questions: [
          { text: "What is the single most contentious parenting issue right now, and can you agree on one approach for this week?" },
          { text: "Can you commit to discussing parenting disagreements privately before presenting a decision to the children?" },
          { text: "When is a good time to check in with each other about how your parenting partnership is working?" },
        ],
        scripture: {
          text: "Two are better than one, because they have a good return for their labor.",
          reference: "Ecclesiastes 4:9",
        },
        warning:
          "Do not expect one conversation to resolve years of parenting tension. This is the first step. Commit to a weekly parenting check-in when the children are asleep.",
      },
    ],
    relatedArticles: [
      { title: "Read the age-by-age parenting guide", href: "/tools/parenting-guide" },
      { title: "Read essays on family and parenting", href: "/writing?category=parenting" },
    ],
  },
  {
    id: "intimacy",
    label: "Intimacy Issues",
    description:
      "The distance between two people who share a bed and two people who share a life. When intimacy breaks down, the silence in the bedroom echoes through every other room in the house.",
    steps: [
      {
        number: 1,
        title: "Name what happened",
        description:
          "Intimacy conflicts are rarely about a single event. They are about the slow accumulation of distance. But something brought it to the surface. Name that moment.",
        questions: [
          { text: "When did you first notice the distance between you -- was it a specific rejection, or a gradual withdrawal?" },
          { text: "Is this about physical intimacy, emotional intimacy, or both?" },
          { text: "Has something changed in your life circumstances that may have contributed -- stress, health, children, work?" },
        ],
        scripture: {
          text: "Do not deprive each other except perhaps by mutual consent and for a time, so that you may devote yourselves to prayer.",
          reference: "1 Corinthians 7:5",
        },
        warning:
          "Do not frame desire as entitlement. 'I have needs' is not a conversation starter. It is a demand that reduces your spouse to a service provider.",
      },
      {
        number: 2,
        title: "Name what you feel",
        description:
          "Intimacy issues trigger some of the most painful emotions in a marriage: rejection, inadequacy, loneliness, shame. These emotions are real, and they will not go away because you refuse to name them.",
        questions: [
          { text: "What do you feel when intimacy is absent -- rejected, undesirable, alone, angry?" },
          { text: "Is the pain about this marriage specifically, or does it connect to something older -- a wound from before?" },
          { text: "Are you confusing the desire for sex with the desire to be known? They overlap, but they are not the same." },
        ],
        scripture: {
          text: "The Lord God said, 'It is not good for the man to be alone. I will make a helper suitable for him.'",
          reference: "Genesis 2:18",
        },
        warning:
          "Do not use guilt to produce intimacy. Intimacy born from obligation is not intimacy. It is performance. And both people know the difference, even when neither says so.",
      },
      {
        number: 3,
        title: "Name what you need",
        description:
          "What you need is almost certainly more specific than 'more intimacy.' Break it down. Intimacy has a dozen dimensions, and your spouse cannot address a generality.",
        questions: [
          { text: "Do you need more physical touch that is not sexual -- holding hands, a longer embrace, sitting close?" },
          { text: "Do you need emotional vulnerability -- deeper conversations, less guarding, more honesty?" },
          { text: "Do you need your spouse to initiate, or do you need them to be responsive when you do?" },
        ],
        scripture: {
          text: "Let him kiss me with the kisses of his mouth -- for your love is more delightful than wine.",
          reference: "Song of Solomon 1:2",
        },
        warning:
          "Do not present your need as their failure. 'I need you to want me' puts your spouse in an impossible position. What you can say is: 'I miss being close to you, and I want to find our way back.'",
      },
      {
        number: 4,
        title: "Listen to their side",
        description:
          "Your spouse's withdrawal may have nothing to do with how they feel about you. Stress, exhaustion, body image, past trauma, hormonal changes, medication -- the reasons are numerous and most of them are not personal.",
        questions: [
          { text: "What is your spouse dealing with right now that might be affecting their desire or capacity for closeness?" },
          { text: "Have you asked them what intimacy looks like from their perspective -- not what you wish it looked like?" },
          { text: "Is there something you are doing that unintentionally creates distance rather than closeness?" },
        ],
        scripture: {
          text: "Husbands, love your wives, just as Christ loved the church and gave himself up for her.",
          reference: "Ephesians 5:25",
        },
        warning:
          "Do not assume their lack of desire means lack of love. Those are two different things. A spouse who is exhausted, anxious, or dealing with past wounds may love you deeply and still struggle with physical closeness.",
      },
      {
        number: 5,
        title: "Agree on one next step",
        description:
          "Intimacy is not rebuilt in a single night. It is rebuilt in small acts of closeness that accumulate over time. Start with one practice that both of you can sustain.",
        questions: [
          { text: "Can you commit to ten minutes of non-screen, face-to-face conversation every evening this week?" },
          { text: "What is one small physical gesture -- a longer hug, holding hands during a walk -- that you can practice daily?" },
          { text: "Would it help to schedule a date night, or does the word 'schedule' make intimacy feel like a task?" },
        ],
        scripture: {
          text: "Place me like a seal over your heart, like a seal on your arm; for love is as strong as death.",
          reference: "Song of Solomon 8:6",
        },
        warning:
          "Do not set a deadline for 'fixing' intimacy. Pressure destroys what it tries to create. Agree on direction, not a timeline.",
      },
    ],
    relatedArticles: [
      { title: "Read essays on marriage and intimacy", href: "/writing?category=marriage" },
    ],
  },
  {
    id: "inlaws",
    label: "In-Law Boundaries",
    description:
      "When a third party -- parent, sibling, extended family -- has more influence over your marriage than they should. The problem is not that you have in-laws. The problem is that someone has not left.",
    steps: [
      {
        number: 1,
        title: "Name what happened",
        description:
          "Was it a comment at dinner? An uninvited opinion about your parenting? A financial arrangement that gave someone leverage? Name the specific boundary that was crossed.",
        questions: [
          { text: "What did the in-law say or do that caused the conflict between you and your spouse?" },
          { text: "Is this a one-time boundary violation, or has it been happening for years?" },
          { text: "Does your spouse see it as a problem, or are they defending the behavior?" },
        ],
        scripture: {
          text: "That is why a man leaves his father and mother and is united to his wife, and they become one flesh.",
          reference: "Genesis 2:24",
        },
        warning:
          "Do not attack your spouse's parent. You can name the behavior without assassinating the character. 'When your mother criticizes my cooking in front of the children, it hurts me' is different from 'Your mother is toxic.'",
      },
      {
        number: 2,
        title: "Name what you feel",
        description:
          "In-law conflicts produce a particular kind of pain because they force your spouse to choose between two loyalties. That is an impossible position, and both of you feel the weight of it.",
        questions: [
          { text: "Do you feel unprotected by your spouse when their family crosses a line?" },
          { text: "Are you angry at the in-law, or are you hurt that your spouse did not intervene?" },
          { text: "Does this conflict make you feel like an outsider in your own marriage?" },
        ],
        scripture: {
          text: "Above all, love each other deeply, because love covers over a multitude of sins.",
          reference: "1 Peter 4:8",
        },
        warning:
          "Do not issue ultimatums. 'It is me or your mother' is not a conversation. It is a hostage negotiation. And it will damage your marriage more than the in-law ever could.",
      },
      {
        number: 3,
        title: "Name what you need",
        description:
          "You do not need your in-laws to disappear. You need boundaries that are clear, agreed upon, and enforced by the person whose family is crossing them.",
        questions: [
          { text: "What specific behavior needs to stop or change?" },
          { text: "Do you need your spouse to speak to their parent directly, or do you need to address it together?" },
          { text: "What boundary, if honored, would allow you to have a healthy relationship with your in-laws?" },
        ],
        scripture: {
          text: "Let your 'Yes' be 'Yes,' and your 'No,' 'No.'",
          reference: "Matthew 5:37",
        },
        warning:
          "Do not set boundaries you are not willing to enforce. A boundary without a consequence is a suggestion. Decide in advance what you will do -- not what you will say -- if the boundary is violated.",
      },
      {
        number: 4,
        title: "Listen to their side",
        description:
          "Your spouse is caught between the family that raised them and the family they are building. That tension is real, and dismissing it will not make your case stronger. It will make your spouse feel alone.",
        questions: [
          { text: "What does your spouse's relationship with their parent mean to them -- what are they afraid of losing?" },
          { text: "Is your spouse aware of the problem and conflicted, or genuinely unable to see it?" },
          { text: "What cultural or family expectations is your spouse navigating that you may not fully understand?" },
        ],
        scripture: {
          text: "Honor your father and your mother.",
          reference: "Exodus 20:12",
        },
        warning:
          "Do not make your spouse choose between honoring their parents and protecting your marriage. Help them find a way to do both. That is what boundaries are for.",
      },
      {
        number: 5,
        title: "Agree on one next step",
        description:
          "The boundary must come from the spouse whose parent is the issue. You can agree on the boundary together, but the delivery belongs to the person whose family needs to hear it.",
        questions: [
          { text: "Can you agree on one specific boundary to communicate to the in-law this week?" },
          { text: "Who will deliver the message, and will you script it together beforehand?" },
          { text: "What will you do together if the boundary is not respected?" },
        ],
        scripture: {
          text: "If it is possible, as far as it depends on you, live at peace with everyone.",
          reference: "Romans 12:18",
        },
        warning:
          "Do not expect immediate compliance. Families that have operated without boundaries for decades will not adjust in a week. Be patient with the process while remaining firm on the boundary.",
      },
    ],
    relatedArticles: [
      { title: "Read essays on marriage and family", href: "/writing?category=marriage" },
    ],
  },
  {
    id: "labor",
    label: "Division of Labor",
    description:
      "When the weight of running a household falls unevenly and the resentment has been building so long that every unwashed dish feels like a personal betrayal. This is not about chores. It is about whether you feel like partners or a manager and an employee.",
    steps: [
      {
        number: 1,
        title: "Name what happened",
        description:
          "Usually there is not a single event. There is an accumulation -- the thousandth time you did the thing no one asked you to do, or the moment you realized you were carrying a load your spouse did not even see.",
        questions: [
          { text: "What specific task or responsibility tipped you into frustration?" },
          { text: "Is the issue the task itself, or the fact that your spouse does not see it as their responsibility?" },
          { text: "If you listed every household task you do in a week, would your spouse be surprised by the length of the list?" },
        ],
        scripture: {
          text: "Carry each other's burdens, and in this way you will fulfill the law of Christ.",
          reference: "Galatians 6:2",
        },
        warning:
          "Do not keep a secret scorecard and then present it as evidence. If your spouse does not know the score, the game was never fair.",
      },
      {
        number: 2,
        title: "Name what you feel",
        description:
          "Resentment about household labor is almost always about something deeper than dishes. It is about being seen. It is about whether your work -- the invisible, thankless, daily work of keeping a life running -- is noticed and valued.",
        questions: [
          { text: "Do you feel invisible in this household -- as if your contribution is expected but never acknowledged?" },
          { text: "Is your resentment about the workload itself, or about the lack of gratitude?" },
          { text: "Do you feel like a partner in this home, or a servant in someone else's house?" },
        ],
        scripture: {
          text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
          reference: "Colossians 3:23",
        },
        warning:
          "Do not martyr yourself. Doing everything silently and then exploding is not virtue. It is a pattern. If you never ask for help, you cannot be angry that help did not come.",
      },
      {
        number: 3,
        title: "Name what you need",
        description:
          "Be specific. 'I need more help around the house' is too vague to act on. Name the tasks, the frequency, and the standard. Clarity is kindness.",
        questions: [
          { text: "Which three tasks, if your spouse took them over, would change your daily experience the most?" },
          { text: "Do you need help with the work itself, or help with the mental load of planning and remembering?" },
          { text: "Are you willing to accept your spouse's way of doing a task, even if it is different from yours?" },
        ],
        scripture: {
          text: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up.",
          reference: "Ecclesiastes 4:9--10",
        },
        warning:
          "Do not assign tasks and then criticize how they are done. If you re-do what your spouse just did, you have taught them that their effort does not matter. Let good enough be good enough.",
      },
      {
        number: 4,
        title: "Listen to their side",
        description:
          "Your spouse may genuinely not see the imbalance. Not because they are selfish, but because the invisible labor of a household is, by definition, invisible to the person not doing it.",
        questions: [
          { text: "Does your spouse know how much you do, or have you been absorbing it silently?" },
          { text: "What tasks does your spouse handle that you may not be giving them credit for?" },
          { text: "Is your spouse willing to change, or are they defending the current arrangement?" },
        ],
        scripture: {
          text: "Submit to one another out of reverence for Christ.",
          reference: "Ephesians 5:21",
        },
        warning:
          "Do not assume laziness. Some people grew up in homes where one parent did everything. They are not refusing to help. They literally do not see the work because they were never taught to see it.",
      },
      {
        number: 5,
        title: "Agree on one next step",
        description:
          "Create a visible, shared system. Not because your marriage should run like a corporation, but because invisible expectations produce invisible resentment.",
        questions: [
          { text: "Can you make a shared list of household tasks and divide them in a way that feels fair to both of you?" },
          { text: "What is one task your spouse can own completely -- from noticing it needs doing to doing it -- starting this week?" },
          { text: "Can you agree to revisit this division in two weeks to see if it is working?" },
        ],
        scripture: {
          text: "And let us consider how we may spur one another on toward love and good deeds.",
          reference: "Hebrews 10:24",
        },
        warning:
          "Do not expect transformation overnight. Habits built over years take months to change. Celebrate progress, not perfection.",
      },
    ],
    relatedArticles: [
      { title: "Read essays on marriage and partnership", href: "/writing?category=marriage" },
    ],
  },
  {
    id: "spiritual",
    label: "Spiritual Differences",
    description:
      "When two people who share a life do not share a faith -- or share it at very different depths. This is not a minor disagreement. It touches the deepest questions of meaning, morality, and how you are raising your children.",
    steps: [
      {
        number: 1,
        title: "Name what happened",
        description:
          "Was it a decision about church attendance? A disagreement about how to talk to the children about God? A growing sense that you live in different spiritual worlds? Name the moment, not the verdict.",
        questions: [
          { text: "What specific spiritual difference surfaced in this conflict?" },
          { text: "Has your spouse's faith changed since the beginning of your relationship, or has yours?" },
          { text: "Is this about belief, or about practice -- what you do, or what you hold to be true?" },
        ],
        scripture: {
          text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
          reference: "James 1:5",
        },
        warning:
          "Do not position yourself as spiritually superior. 'If you really loved God...' is not a conversation. It is spiritual manipulation.",
      },
      {
        number: 2,
        title: "Name what you feel",
        description:
          "Spiritual loneliness in a marriage is one of the most painful forms of isolation. You can share a home and feel utterly alone in the most important dimension of your life.",
        questions: [
          { text: "Do you feel alone in your faith -- as if the most important part of you has no companion?" },
          { text: "Are you afraid for your spouse's soul, or are you frustrated by their indifference?" },
          { text: "Do you grieve the spiritual partnership you imagined but do not have?" },
        ],
        scripture: {
          text: "My God, my God, why have you forsaken me? Why are you so far from saving me, so far from my cries of anguish?",
          reference: "Psalm 22:1",
        },
        warning:
          "Do not confuse your grief with their sin. A spouse who does not share your faith is not necessarily in rebellion. They may be in honest doubt, which is a more courageous spiritual position than comfortable belief.",
      },
      {
        number: 3,
        title: "Name what you need",
        description:
          "You cannot force faith. But you can name what you need in terms of respect, support, and shared decision-making about spiritual formation in your home.",
        questions: [
          { text: "Do you need your spouse to attend church with you, or do you need their support for your own faith practice?" },
          { text: "What do you need to agree on about how to raise your children spiritually?" },
          { text: "Can you distinguish between what you need from your spouse and what only God can give you?" },
        ],
        scripture: {
          text: "But as for me and my household, we will serve the Lord.",
          reference: "Joshua 24:15",
        },
        warning:
          "Do not make church attendance the measure of spiritual health. Some of the most faithful people in Scripture worshipped in solitude. And some of the most spiritually dead people attend every Sunday.",
      },
      {
        number: 4,
        title: "Listen to their side",
        description:
          "Your spouse's spiritual position -- whether it is doubt, indifference, or a different tradition -- has a story. Understanding the story does not mean agreeing with it. It means taking them seriously as a person, not a project.",
        questions: [
          { text: "What happened in your spouse's past that shaped their current relationship with faith?" },
          { text: "Has the church hurt your spouse in a way that makes their distance from it understandable?" },
          { text: "Are you willing to hear their honest questions without treating those questions as threats?" },
        ],
        scripture: {
          text: "Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect.",
          reference: "1 Peter 3:15",
        },
        warning:
          "Do not treat your spouse as a conversion project. The fastest way to push someone away from faith is to make them feel like your relationship is contingent on their agreement.",
      },
      {
        number: 5,
        title: "Agree on one next step",
        description:
          "You may not reach spiritual alignment this year. But you can agree on how to respect each other's positions while making decisions together about your home and your children.",
        questions: [
          { text: "Can you agree that both of you will speak respectfully about the other's spiritual position in front of your children?" },
          { text: "Is there one spiritual practice -- a meal prayer, a moment of gratitude, a service project -- that you can share regardless of where each of you stands?" },
          { text: "Can you schedule a monthly conversation about faith that is not an argument but an exchange?" },
        ],
        scripture: {
          text: "Be devoted to one another in love. Honor one another above yourselves.",
          reference: "Romans 12:10",
        },
        warning:
          "Do not set a timeline for your spouse's spiritual change. Faith that grows under pressure is not faith. It is compliance. Pray for them. Love them. And let God do what only God can do.",
      },
    ],
    relatedArticles: [
      { title: "Read essays on faith and doubt", href: "/writing?category=faith" },
    ],
  },
  {
    id: "trust",
    label: "Trust Repair",
    description:
      "When trust has been broken -- by betrayal, dishonesty, or a pattern of broken promises. Trust is destroyed in moments and rebuilt in months. There is no shortcut. But there is a path.",
    steps: [
      {
        number: 1,
        title: "Name what happened",
        description:
          "The person who broke the trust must name what they did. Fully. Without minimizing, excusing, or explaining the context. The person who was betrayed needs to hear that their spouse understands what was done, not just that they are sorry.",
        questions: [
          { text: "Can the person who broke trust describe exactly what they did, without using the word 'but'?" },
          { text: "Does the injured party feel that the full truth has been told, or do they sense there is more?" },
          { text: "Has the behavior stopped completely, or is it ongoing?" },
        ],
        scripture: {
          text: "Therefore each of you must put off falsehood and speak truthfully to your neighbor, for we are all members of one body.",
          reference: "Ephesians 4:25",
        },
        warning:
          "Do not offer a partial confession. Trickle truth -- revealing the betrayal in stages -- causes more damage than the original breach. If you are going to confess, confess everything. Once.",
      },
      {
        number: 2,
        title: "Name what you feel",
        description:
          "Betrayal produces a grief that is unlike any other, because the person who should be your source of comfort is also the source of your pain. Both people are in pain. Both realities are true.",
        questions: [
          { text: "For the injured: what has this broken in you -- your sense of safety, your self-worth, your ability to believe what your spouse says?" },
          { text: "For the one who broke trust: what do you feel -- guilt, shame, fear of consequences, relief that it is in the open?" },
          { text: "Are either of you numb? Numbness is not the absence of feeling. It is feeling so much that the system shuts down." },
        ],
        scripture: {
          text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
          reference: "Psalm 34:18",
        },
        warning:
          "Do not rush past the pain to get to the resolution. The injured person needs time to grieve. The grief is not an obstacle to healing. It is part of it.",
      },
      {
        number: 3,
        title: "Name what you need",
        description:
          "Trust repair requires specific, concrete actions -- not promises. 'I will never do it again' is a prediction, not a plan. What does accountability actually look like in your daily life?",
        questions: [
          { text: "What does the injured person need in order to feel safe -- transparency with devices, check-ins, access to accounts?" },
          { text: "What professional help is needed -- a counselor, a pastor, a support group?" },
          { text: "What is the timeline expectation, and is it realistic? Trust repair measured in weeks is almost always too fast." },
        ],
        scripture: {
          text: "Produce fruit in keeping with repentance.",
          reference: "Matthew 3:8",
        },
        warning:
          "Do not demand trust before it is earned. The person who broke trust does not get to decide when the injured person should be 'over it.' Impatience with the healing process is itself a form of harm.",
      },
      {
        number: 4,
        title: "Listen to their side",
        description:
          "This is the hardest step. For the injured person, listening to the one who hurt them feels like a reward they do not deserve. For the person who broke trust, listening to the depth of the damage they caused is excruciating. Both are necessary.",
        questions: [
          { text: "For the injured: can you hear your spouse's remorse without dismissing it as performance?" },
          { text: "For the one who broke trust: can you hear the full weight of the damage without becoming defensive or shutting down?" },
          { text: "Is there a third party -- a counselor, a pastor -- who can facilitate this conversation if it is too volatile for the two of you alone?" },
        ],
        scripture: {
          text: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
          reference: "Colossians 3:13",
        },
        warning:
          "Do not skip professional help. Trust repair after serious betrayal is beyond what most couples can do alone. A counselor is not a sign of failure. It is a sign that you take the marriage seriously enough to fight for it.",
      },
      {
        number: 5,
        title: "Agree on one next step",
        description:
          "One step. Not the whole road. Trust is rebuilt in small, consistent, verifiable actions repeated over time. The person who broke trust must become radically transparent, and the injured person must be willing to see the effort.",
        questions: [
          { text: "What is one specific accountability measure you can implement this week?" },
          { text: "Can you agree to a weekly check-in where both of you assess how the repair is going?" },
          { text: "Have you contacted a professional counselor? If not, can you make the call today?" },
        ],
        scripture: {
          text: "See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.",
          reference: "Isaiah 43:19",
        },
        warning:
          "Do not confuse forgiveness with reconciliation. Forgiveness is a decision you make before God. Reconciliation is a process that requires changed behavior over time. You can forgive someone and still require them to earn back your trust through sustained, verifiable action.",
      },
    ],
    relatedArticles: [
      { title: "Read essays on trust and faithfulness", href: "/writing?category=marriage" },
      { title: "Take the Marriage Health Assessment", href: "/tools/marriage-assessment" },
    ],
  },
];

/* ── Component ─────────────────────────────────────────────────── */

export default function ConflictGuide() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const conflict = CONFLICT_TYPES.find((c) => c.id === selectedType);

  const handleSelectType = (id: string) => {
    setSelectedType(id);
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (conflict && currentStep < conflict.steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setSelectedType(null);
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const step = conflict?.steps[currentStep];
  const isLastStep = conflict ? currentStep === conflict.steps.length - 1 : false;

  return (
    <Layout>
      <SEOMeta
        title="Conflict Resolution Guide -- A Five-Step Process for Couples and Families"
        description="An interactive five-step guide to help couples and families work through conflict -- from naming the issue to agreeing on a concrete next step. Scripture-grounded, practically honest."
        keywords="conflict resolution, marriage conflict, family conflict, communication, couples guide, relationship repair, Christian marriage"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Conflict Resolution Guide",
          description:
            "An interactive five-step guide to help couples and families resolve conflict with honesty, Scripture, and concrete action.",
          url: "https://www.livewellbyjamesbell.co/tools/conflict-guide",
          applicationCategory: "LifestyleApplication",
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
              letterSpacing: "-0.02em",
            }}
          >
            Conflict Resolution{" "}
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
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Five steps. One conflict at a time. Not a formula for avoiding hard
            conversations -- a framework for having them without destroying
            what you are trying to protect.
          </p>
        </div>
      </section>

      {/* Conflict Type Selection */}
      {!selectedType && (
        <section style={{ padding: "48px 32px 80px", background: "var(--bone)" }}>
          <div className="wrap" style={{ maxWidth: "800px" }}>
            <div style={{ marginBottom: "40px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "var(--mustard)",
                  fontFamily: "var(--U)",
                  marginBottom: "12px",
                }}
              >
                SELECT YOUR SITUATION
              </div>
              <h2
                style={{
                  fontSize: "clamp(24px, 4vw, 34px)",
                  fontWeight: 400,
                  fontFamily: "var(--F)",
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                What kind of conflict are you facing?
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "var(--ink-muted)",
                  fontFamily: "var(--B)",
                  maxWidth: "60ch",
                }}
              >
                Choose the category that best describes your current situation.
                The five-step process will be tailored to your specific kind
                of conflict.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {CONFLICT_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleSelectType(type.id)}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    padding: "28px 24px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--mustard)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "20px",
                      fontWeight: 500,
                      color: "var(--ink)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {type.label}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "var(--ink-muted)",
                      fontFamily: "var(--B)",
                    }}
                  >
                    {type.description.length > 120
                      ? type.description.slice(0, 120) + "..."
                      : type.description}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontFamily: "var(--U)",
                      fontWeight: 600,
                      color: "var(--mustard)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "4px",
                    }}
                  >
                    Start guide <ChevronRight size={14} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guided Steps */}
      {selectedType && conflict && step && (
        <>
          {/* Progress Bar */}
          <div
            style={{
              background: "var(--bone-warm)",
              position: "sticky",
              top: 70,
              zIndex: 100,
            }}
            className="no-print"
          >
            <div
              style={{
                height: "4px",
                background: "var(--bone-muted)",
                width: "100%",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${((currentStep + 1) / conflict.steps.length) * 100}%`,
                  background: "var(--mustard)",
                  transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </div>
            <div
              className="wrap"
              style={{
                maxWidth: "900px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 32px",
              }}
            >
              <button
                onClick={handleReset}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontFamily: "var(--U)",
                  fontWeight: 600,
                  color: "var(--ink-muted)",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
              >
                <ArrowLeft size={14} />
                Change topic
              </button>
              <div style={{ display: "flex", gap: "6px" }}>
                {conflict.steps.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background:
                        i === currentStep
                          ? "var(--mustard)"
                          : i < currentStep
                            ? "var(--ink-muted)"
                            : "var(--bone-muted)",
                      transition: "background 0.2s",
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: "var(--U)",
                  fontWeight: 600,
                  color: "var(--ink-muted)",
                  letterSpacing: "0.08em",
                }}
              >
                STEP {currentStep + 1} OF {conflict.steps.length}
              </span>
            </div>
          </div>

          <section style={{ padding: "48px 32px 80px", background: "var(--bone)" }}>
            <div className="wrap" style={{ maxWidth: "700px" }}>
              {/* Conflict Type Label */}
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "var(--mustard)",
                  fontFamily: "var(--U)",
                  marginBottom: "8px",
                }}
              >
                {conflict.label.toUpperCase()}
              </div>

              {/* Step Header */}
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 38px)",
                  fontWeight: 400,
                  fontFamily: "var(--F)",
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                Step {step.number}: {step.title}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.8,
                  color: "var(--ink)",
                  fontFamily: "var(--B)",
                  maxWidth: "64ch",
                  marginBottom: "36px",
                }}
              >
                {step.description}
              </p>

              {/* Guiding Questions */}
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "2px",
                  padding: "32px",
                  border: "1px solid var(--border)",
                  marginBottom: "24px",
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
                  GUIDING QUESTIONS
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {step.questions.map((q, i) => (
                    <div key={i} style={{ display: "flex", gap: "14px" }}>
                      <span
                        style={{
                          fontFamily: "var(--F)",
                          fontSize: "22px",
                          fontWeight: 400,
                          color: "var(--mustard)",
                          lineHeight: 1.2,
                          flexShrink: 0,
                          width: "24px",
                          textAlign: "center",
                        }}
                      >
                        {i + 1}
                      </span>
                      <p
                        style={{
                          fontSize: "16px",
                          lineHeight: 1.7,
                          color: "var(--ink)",
                          fontFamily: "var(--B)",
                          margin: 0,
                        }}
                      >
                        {q.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scripture */}
              <div
                style={{
                  background: "var(--bone-warm)",
                  padding: "24px 28px",
                  borderRadius: "2px",
                  borderLeft: "3px solid var(--mustard)",
                  marginBottom: "24px",
                }}
              >
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                    color: "var(--ink)",
                    fontFamily: "var(--B)",
                    margin: "0 0 8px",
                  }}
                >
                  "{step.scripture.text}"
                </p>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "var(--U)",
                    color: "var(--ink-muted)",
                  }}
                >
                  {step.scripture.reference}
                </span>
              </div>

              {/* Warning */}
              <div
                style={{
                  background: "rgba(192,57,43,0.05)",
                  border: "1px solid rgba(192,57,43,0.15)",
                  borderRadius: "2px",
                  padding: "24px 28px",
                  marginBottom: "48px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <AlertTriangle
                  size={20}
                  style={{
                    color: "#C0392B",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "#C0392B",
                      fontFamily: "var(--U)",
                      marginBottom: "8px",
                    }}
                  >
                    WHAT NOT TO DO
                  </div>
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "var(--ink)",
                      fontFamily: "var(--B)",
                      margin: 0,
                    }}
                  >
                    {step.warning}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className="no-print"
              >
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontFamily: "var(--U)",
                    fontWeight: 600,
                    color:
                      currentStep === 0
                        ? "var(--bone-muted)"
                        : "var(--ink-muted)",
                    cursor: currentStep === 0 ? "default" : "pointer",
                    padding: "12px 0",
                    background: "none",
                    border: "none",
                  }}
                >
                  <ArrowLeft size={16} />
                  Previous Step
                </button>

                {!isLastStep ? (
                  <button
                    onClick={handleNext}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      fontFamily: "var(--U)",
                      fontWeight: 600,
                      padding: "14px 28px",
                      borderRadius: "2px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background: "var(--mustard)",
                      color: "var(--ink)",
                      border: "none",
                    }}
                  >
                    Next Step
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => window.print()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      fontFamily: "var(--U)",
                      fontWeight: 600,
                      padding: "14px 28px",
                      borderRadius: "2px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background: "var(--charcoal)",
                      color: "var(--bone)",
                      border: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.85";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    <Printer size={16} />
                    Print This Conversation Guide
                  </button>
                )}
              </div>

              {/* Related Articles (show on last step) */}
              {isLastStep && (
                <div style={{ marginTop: "40px" }}>
                  {conflict.relatedArticles.map((article, i) => (
                    <a
                      key={i}
                      href={article.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "var(--charcoal)",
                        color: "var(--bone)",
                        borderRadius: "2px",
                        padding: "24px 32px",
                        textDecoration: "none",
                        transition: "opacity 0.2s",
                        marginBottom: "12px",
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
                          RELATED READING
                        </div>
                        <span
                          style={{
                            fontSize: "18px",
                            fontFamily: "var(--F)",
                            fontWeight: 400,
                            fontStyle: "italic",
                          }}
                        >
                          {article.title}
                        </span>
                      </div>
                      <ChevronRight
                        size={20}
                        style={{ opacity: 0.5, flexShrink: 0 }}
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}
