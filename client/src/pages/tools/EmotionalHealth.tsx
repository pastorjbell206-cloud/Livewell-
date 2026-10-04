import Layout from "@/components/Layout";
import { scrollBehavior } from "@/lib/motion";
import { SEOMeta } from "@/components/SEOMeta";
import ScriptureNote from "@/components/ScriptureNote";
import { ToolActions } from "@/components/ToolActions";
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";
import { SafetyCheck } from "@/components/SafetyCheck";
import { SelfCheckHistory } from "@/components/SelfCheckHistory";

interface Statement {
  text: string;
  category: string;
}

type Level = "Strong" | "Developing" | "Struggling" | "Critical";

/** A live page on this site, named by its own title. */
interface NextStep {
  kind: string;
  title: string;
  href: string;
}

/** What one level of one area means, and what to do about it. */
interface LevelGuide {
  /** 80 to 150 words, specific to this area at this level. */
  interpretation: string;
  /** Two or three concrete steps. */
  steps: string[];
  next: NextStep[];
}

interface AreaGuide {
  /** Berean Standard Bible, verbatim from `node scripts/bsb.mjs "<ref>"`. */
  scripture: { ref: string; text: string };
  levels: Record<Level, LevelGuide>;
}

interface CategoryResult extends LevelGuide {
  name: string;
  score: number;
  maxScore: number;
  level: Level;
  scripture: { ref: string; text: string };
}

const CATEGORIES = [
  "Self-Awareness",
  "Boundaries",
  "Grief & Lament",
  "Forgiveness",
  "Rest & Sabbath",
];

const STATEMENTS: Statement[] = [
  // Self-Awareness
  {
    text: "I can name what I am feeling in the moment, not just afterward.",
    category: "Self-Awareness",
  },
  {
    text: "I understand why certain situations or people stir up strong reactions in me.",
    category: "Self-Awareness",
  },
  {
    text: "When someone asks me how I am doing, I can give an honest answer, not a performance.",
    category: "Self-Awareness",
  },
  // Boundaries
  {
    text: "I can say no to a request without guilt consuming me for the rest of the day.",
    category: "Boundaries",
  },
  {
    text: "I protect time for rest, even when other people need things from me.",
    category: "Boundaries",
  },
  {
    text: "My sense of worth does not rise and fall with my productivity or the approval of others.",
    category: "Boundaries",
  },
  // Grief & Lament
  {
    text: "When I experience loss, I allow myself to grieve rather than rushing to find the lesson.",
    category: "Grief & Lament",
  },
  {
    text: "I can sit with my own sadness without immediately trying to fix it.",
    category: "Grief & Lament",
  },
  {
    text: "I resist the urge to offer premature comfort or a Bible verse when someone is suffering and just needs presence.",
    category: "Grief & Lament",
  },
  // Forgiveness
  {
    text: "I have released resentment toward someone who hurt me, rather than rehearsing the offense.",
    category: "Forgiveness",
  },
  {
    text: "I do not keep a mental scoreboard of what others owe me, whether in marriage, friendship, or work.",
    category: "Forgiveness",
  },
  {
    text: "I can forgive someone without feeling I have to trust them again right away.",
    category: "Forgiveness",
  },
  // Rest & Sabbath
  {
    text: "I have a regular practice of rest that is not just collapsing from exhaustion.",
    category: "Rest & Sabbath",
  },
  {
    text: "I can put my phone down for an extended period without anxiety about what I might be missing.",
    category: "Rest & Sabbath",
  },
  {
    text: "I can say 'enough' at the end of a workday, even when the task list is not finished.",
    category: "Rest & Sabbath",
  },
];

const RATING_LABELS = [
  "",
  "Rarely true",
  "Sometimes true",
  "Often true",
  "Usually true",
  "Consistently true",
];

/**
 * Every level of every area has its own reading, its own steps, and its own
 * next steps (docs/grow/GROW-PROMPT.md 7.2). Words a reader might say or
 * think are marked *like this* and set in italics; double quotation marks
 * belong to Scripture alone.
 */
const AREA_GUIDES: Record<string, AreaGuide> = {
  "Self-Awareness": {
    scripture: {
      ref: "Psalm 139:23-24",
      text: "Search me, O God, and know my heart; test me and know my concerns. See if there is any offensive way in me; lead me in the way everlasting.",
    },
    levels: {
      Strong: {
        interpretation:
          "You can usually tell what you're feeling while it's happening, you understand a good deal about why certain people and moments stir you up, and you can answer *how are you?* honestly. That's a real capacity. It makes you easier to love and harder to fool, yourself included. You don't see everything, of course; every self has blind spots, and the people closest to you can see some of yours. Nor does every feeling need to be announced. The next step is to do something with what you notice: bring it to God in prayer and to one or two people who know you, instead of only understanding it on your own.",
        steps: [
          "Pray Psalm 139:23-24 slowly each morning this week. After the first line, stop and listen for a minute before going on, and write down anything that surprises you.",
          "Ask someone who knows you well which feeling they think you avoid most. Don't explain or defend yourself; thank them, and think about it for a few days.",
          "Use what you see for someone else. The next time a friend says *fine* and you can tell it isn't, ask once more, gently, and wait for the answer.",
        ],
        next: [
          { kind: "How-to", title: "How to Practice Silence and Solitude", href: "/how-tos/sf-how-to-practice-silence-and-solitude" },
          { kind: "Study guide", title: "The Psalms: A Bible Study on Honest Prayer", href: "/studyguides/the-psalms" },
        ],
      },
      Developing: {
        interpretation:
          "You have real awareness of your inner life, but it tends to arrive late. You often understand what you felt after the moment has passed, or you can name the feeling but not what set it off, or you give the easy answer when someone asks how you are and admit the true one only to yourself. That's an ordinary place to be and a good place to grow from. It doesn't mean you're out of touch or dishonest. Most of us learned to manage our feelings long before anyone taught us to name them, and a full life rarely leaves time to notice. The gap to close is time: moving the noticing closer to the moment, and letting at least one other person hear the true answer.",
        steps: [
          "Three times a day this week, stop and name what you're feeling in one word more exact than *fine* or *busy*: irritated, lonely, relieved, afraid, grateful. Write the word down. Naming comes before understanding.",
          "Each evening, finish this sentence in a notebook: *Today I felt ___ when ___.* At the end of the week, read all seven and look for what repeats.",
          "Choose one safe person, and the next time they ask how you are, give them the true answer instead of the easy one.",
        ],
        next: [
          { kind: "How-to", title: "How to Examine Your Day (the Daily Examen)", href: "/how-tos/sf-how-to-examine-your-day-the-daily-examen" },
          { kind: "Study guide", title: "The Psalms: A Bible Study on Honest Prayer", href: "/studyguides/the-psalms" },
        ],
      },
      Struggling: {
        interpretation:
          "Much of what you feel seems to go unnamed, even to yourself. You may notice feelings mostly through their side effects: a short temper, a tight chest, a sudden need to scroll, a day that goes flat for no reason you can find. When someone asks how you are, the answer that comes out is probably the one that keeps things moving. This isn't a character flaw. Many people learned early that feelings were unsafe, inconvenient, or unspiritual, and became very good at managing them out of sight. That skill kept you going. But what we don't name still steers us, and it tends to come out sideways, in our bodies, our tempers, and our closest relationships.",
        steps: [
          "Start with your body, which often notices first. Twice a day, check your jaw, shoulders, and stomach for tension, and ask what feeling might be underneath it. One word is enough.",
          "Pray Psalm 139:23-24 each morning. It's a prayer for someone who can't see all of their own heart, so you don't have to find everything by yourself.",
          "Tell one person you trust that you're trying to notice your feelings better, and ask them to tell you when they see something in you that you haven't mentioned.",
        ],
        next: [
          { kind: "How-to", title: "How to Examine Your Day (the Daily Examen)", href: "/how-tos/sf-how-to-examine-your-day-the-daily-examen" },
          { kind: "Life", title: "What Is the Difference Between Guilt and Shame?", href: "/life/shame-and-the-hiding-self" },
        ],
      },
      Critical: {
        interpretation:
          "It may be hard right now to know what you feel at all. You may feel mostly numb or flat, or feelings may arrive all at once without a clear source, and answering *how are you?* honestly may feel impossible or unsafe. That doesn't mean something is wrong with your soul, and it doesn't mean you can't feel. Going numb is often how a person braces against more than they can hold. If the flatness has lasted more than two weeks, or has spread to your sleep, your appetite, or the things you used to enjoy, please talk with your doctor or a licensed counselor. A pattern like that deserves a real conversation, not only a practice, and asking for help is not a failure of faith.",
        steps: [
          "Make an appointment with your doctor or a licensed counselor. You can say, *I've had trouble feeling much of anything for a while, and I'd like to be seen.*",
          "Tell one person you trust, *I'm not doing well, and I don't fully know why.* That sentence is enough to start with.",
          "Once a day, write down one thing you noticed with your senses: a sound, a taste, the light at a certain hour. You're not forcing feelings to return, only practicing attention, and attention is a place to start.",
        ],
        next: [
          { kind: "Find help", title: "I feel empty, and I don't know why", href: "/help/empty" },
          { kind: "Wisdom", title: "Numbness and Feeling Nothing", href: "/wisdom/numbness" },
        ],
      },
    },
  },
  Boundaries: {
    scripture: {
      ref: "Mark 1:35-38",
      text: "Early in the morning, while it was still dark, Jesus got up and slipped out to a solitary place to pray. Simon and his companions went to look for Him, and when they found Him, they said, “Everyone is looking for You!” But Jesus answered, “Let us go on to the neighboring towns so I can preach there as well, for that is why I have come.”",
    },
    levels: {
      Strong: {
        interpretation:
          "Most of the time you can say no without guilt running the rest of your day, you protect some time for rest, and your sense of worth doesn't swing hard with your output or other people's approval. Those are hard-won, and they make your yes worth more, because people can trust that you mean it. None of that makes you immune to pressure. Limits tend to erode quietly, in a new job, a family crisis, or a season when someone you love needs a great deal. The question worth asking now is what your limits are for. Kept only to protect your comfort, they harden; kept to protect what God has actually given you to do, they make room for it.",
        steps: [
          "Look at the coming month and name the one commitment most likely to crowd out rest or prayer. Decide now what you'll say if it grows.",
          "Read Mark 1:35-38 and notice what Jesus says yes to when he doesn't go back to the crowd that is looking for him. Write one sentence about what your own yes is for in this season.",
          "If someone near you can't say no, help them practice. Offer to be the person they call after they've said it.",
        ],
        next: [
          { kind: "Wisdom", title: "Setting Boundaries", href: "/wisdom/setting-boundaries" },
          { kind: "How-to", title: "How to Build a Rule of Life", href: "/how-tos/sf-how-to-build-a-rule-of-life" },
        ],
      },
      Developing: {
        interpretation:
          "Some of the time you hold a line, and it costs you more than it should. You may say no and then spend hours replaying it, protect your rest until someone needs something, or feel your worth rise on a productive day and sink on a slow one. That usually means you believe in limits but haven't yet made peace with disappointing people. Wanting limits doesn't make you selfish, and struggling to keep them doesn't make you weak. The step in front of you is to practice small, clear refusals and let the guilt pass without obeying it. Guilt after a right no is real, but it isn't proof that you did wrong.",
        steps: [
          "This week, say no to one small request you'd normally accept out of guilt. Keep it short and kind, without a long explanation. Afterward, notice how long the guilt lasts and what actually happened.",
          "Block two hours this week for rest or prayer, and treat them like an appointment you can't move. If someone asks, *I have a commitment* is true.",
          "When you catch yourself grading the day by what you got done, read Genesis 1:26-31. God called everything he had made very good, people included, on the day they were made and before they had done a thing.",
        ],
        next: [
          { kind: "Wisdom", title: "Saying No", href: "/wisdom/saying-no" },
          { kind: "Life", title: "Where Does Your Identity and Worth Come From?", href: "/life/identity-and-worth" },
        ],
      },
      Struggling: {
        interpretation:
          "From your answers, other people's needs and opinions are setting most of the terms of your life. Saying no probably brings guilt that lingers, rest gives way whenever someone needs something, and your sense of worth rises and falls with how much you produce and how others see you. People often land here because they were praised for being dependable, grew up keeping the peace, or work where the needs never end, and ministry can be exactly that kind of work. None of this makes you a bad person; often it's love that got bent by fear. Proverbs 29:25 calls the fear of man a snare, and in the same verse names the way out, which is trusting the Lord.",
        steps: [
          "Read Mark 1:35-38. Everyone was looking for Jesus, and he went on to other towns because he knew what he had come to do. Write down one demand you've been treating as a command, and ask whether it really is one.",
          "Practice one sentence until it comes easily: *I can't take that on right now.* Use it once this week without adding a reason.",
          "Tell a friend or your pastor where you're overextended, and ask them to check on you in two weeks.",
        ],
        next: [
          { kind: "Wisdom", title: "People-Pleasing and the Fear of Man", href: "/wisdom/people-pleasing" },
          { kind: "Life", title: "Where Does Your Identity and Worth Come From?", href: "/life/identity-and-worth" },
        ],
      },
      Critical: {
        interpretation:
          "Your answers suggest you have very little room of your own right now. Saying no may feel close to impossible, rest disappears whenever anyone needs anything, and your worth may feel tied almost entirely to being useful or approved of. That's an exhausting way to live, and it's rarely chosen; it grows out of years of being needed, or of learning that love had to be earned. It doesn't mean you're failing at being a Christian. Laying down your life is not the same as having no life left to lay down. If the person you can't refuse is someone you're afraid of, that's a matter of safety before it's a matter of boundaries, and the question at the top of this page is the place to start.",
        steps: [
          "Tell one person you trust how stretched you are: a friend, a pastor, or a licensed counselor. Ask them to help you decide which commitments can wait.",
          "Choose one hour this week that belongs to no one else, and keep it even if you spend it sitting quietly. It's a small way of practicing the truth that the world does not rest on you.",
        ],
        next: [
          { kind: "Wisdom", title: "Codependency and Losing Yourself", href: "/wisdom/codependency" },
          { kind: "Wisdom", title: "Toxic and Harmful Relationships", href: "/wisdom/toxic-relationships" },
        ],
      },
    },
  },
  "Grief & Lament": {
    scripture: {
      ref: "Psalm 34:18",
      text: "The LORD is near to the brokenhearted; He saves the contrite in spirit.",
    },
    levels: {
      Strong: {
        interpretation:
          "You let loss be loss. You can grieve without rushing to the lesson, stay with your own sadness without forcing it away, and sit with someone else's pain without reaching for a quick answer. That's a gift, and it makes you a safe person to have nearby in someone's worst week. It doesn't mean grief is easy for you, or that you've finished grieving what you've lost. Grief comes in waves, and a steady score today doesn't promise calm water later. Growth here often turns outward: learning the Bible's prayers of lament well enough to lend them to others, and staying close after the funeral, when most people have gone back to normal.",
        steps: [
          "Think of someone who has lost a person they love in the past year. Contact them this week without an agenda, and say the name of the one they lost.",
          "Read Psalm 88, which ends in darkness with no turn to praise, and notice that it's in the Bible anyway. Keep it in mind for the next time someone tells you they can't pray.",
        ],
        next: [
          { kind: "Study guide", title: "Lament: A Bible Study on Praying Your Pain", href: "/studyguides/lament" },
          { kind: "How-to", title: "How to Help a Friend Through Loss", href: "/how-tos/ss-how-to-help-a-friend-through-loss" },
        ],
      },
      Developing: {
        interpretation:
          "You can grieve, but something in you hurries it. You may move quickly to what the loss taught you, let yourself be sad only for a while before getting back to business, or offer comfort a little too soon when someone else is hurting. That's understandable. Many of us were taught, at home or at church, that sadness should be brief and faith should look cheerful. None of this makes you cold, or your faith shallow. It means lament, the kind of prayer that tells God plainly what hurts, may still feel unfamiliar. The Psalms are full of it, and it's a prayer you can learn.",
        steps: [
          "Name one loss you haven't fully grieved: a person, a relationship, a hope, a season of life. Write it down, then tell God about it in your own words, out loud if you can. It doesn't need to be tidy.",
          "Read Psalm 13 aloud. In six verses it moves from asking God how long to trusting him, and it's a pattern you can borrow for your own prayer.",
          "The next time someone you love is grieving, try saying only, *I'm so sorry. I'm here.* Then stay, and let the silence be.",
        ],
        next: [
          { kind: "How-to", title: "How to Practice Lament", href: "/how-tos/ss-how-to-practice-lament" },
          { kind: "Study guide", title: "Lament: A Bible Study on Praying Your Pain", href: "/studyguides/lament" },
        ],
      },
      Struggling: {
        interpretation:
          "Grief doesn't seem to have much room in your life right now. You may move on from losses quickly, keep sadness at a distance, or feel pressure to fix other people's pain because sitting in it is too hard. Often that's because there's more grief underneath than feels safe to open, or because you've been the strong one for so long that no one expects you to fall apart. It doesn't mean you didn't love what you lost. But grief that isn't grieved doesn't disappear. It tends to come out as irritability, tiredness, numbness, or sadness that arrives without warning. If the loss is a death, the Find Help page on grief was written for exactly where you are.",
        steps: [
          "Set aside twenty minutes this week to write about one loss you've kept at a distance: what you miss, what you're angry about, what you wish you'd said. Then read it to God as a prayer.",
          "Read Psalm 34:18 each morning this week. It doesn't promise the pain will leave soon. It promises that God is near to the brokenhearted while the pain is here.",
          "Tell one person about the loss, someone who will listen without trying to fix it.",
        ],
        next: [
          { kind: "Find help", title: "Someone I love has died", href: "/help/grief" },
          { kind: "How-to", title: "How to Practice Lament", href: "/how-tos/ss-how-to-practice-lament" },
        ],
      },
      Critical: {
        interpretation:
          "Grief may be very close to the surface for you, or buried so deep it has gone quiet. You may be avoiding sadness entirely, unable to cry or unable to stop, and other people's pain may feel almost unbearable to be near. If your loss is recent, much of this is simply what grief does, and it doesn't mean you're grieving wrong. If it has gone on a long time, or it's keeping you from sleeping, eating, working, or caring for the people who depend on you, please talk with a doctor, a licensed counselor, or a pastor. Grief this heavy is too much to carry alone, and getting help is not a sign of weak faith.",
        steps: [
          "Tell one person this week what you've lost and how hard it has been. If no one comes to mind, start with a pastor, or ask your doctor where to find grief support near you.",
          "Let yourself pray without having to sound faithful. Psalm 88 says only how dark it is, and God kept it in Scripture.",
        ],
        next: [
          { kind: "Find help", title: "Someone I love has died", href: "/help/grief" },
          { kind: "Care plan", title: "Eight Weeks of Walking With Loss", href: "/plans/grief" },
        ],
      },
    },
  },
  Forgiveness: {
    scripture: {
      ref: "Colossians 3:13",
      text: "Bear with one another and forgive any complaint you may have against someone else. Forgive as the Lord forgave you.",
    },
    levels: {
      Strong: {
        interpretation:
          "You don't seem to be carrying much resentment. You've let go of old injuries rather than replaying them, you don't keep a running tally of what people owe you, and you can forgive without feeling you have to trust again right away. That's real freedom, and it follows the order of Colossians 3:13, where forgiving others rests on having been forgiven by the Lord. It isn't a sign you've never been badly hurt, or a promise that the next wound will be easy. Some injuries take years, and a new one can reopen old ones. The harder half may be asking forgiveness as readily as you give it, and staying patient with someone who is still stuck.",
        steps: [
          "Ask whether there's anyone you need to ask forgiveness from. If a name comes to mind, write down what you did, without excuses, and decide when you'll talk to them.",
          "If a friend is struggling to forgive, don't hurry them. Hear the whole story first, and remind them that forgiving is not the same as pretending it didn't happen.",
        ],
        next: [
          { kind: "Life", title: "How Do You Forgive Someone Who Really Hurt You?", href: "/life/forgiveness-the-hardest-grace" },
          { kind: "How-to", title: "How to Confess Sin and Walk in Repentance", href: "/how-tos/sf-how-to-confess-sin-and-walk-in-repentance" },
        ],
      },
      Developing: {
        interpretation:
          "There are things you've truly forgiven, and a few that haven't let go of you yet. One or two injuries may still replay at odd moments, a quiet tally may be running in a close relationship, or you may be unsure whether forgiving someone means you have to trust them again. This isn't bitterness. It means forgiveness is doing what it usually does, which is taking longer than one decision. Forgiving is a choice to release a debt, often made again each time the memory returns. Trust is something else. It's rebuilt slowly by changed behavior, and you can forgive someone without handing it back.",
        steps: [
          "Write down the one injury that replays most often, and next to it, what it cost you. You can't release a debt you won't admit was taken.",
          "When the memory returns this week, pray Colossians 3:13 as a decision rather than a feeling. Expect to make that decision more than once.",
          "Notice the tally you keep in your closest relationship. For one week, do one kind thing a day without recording it anywhere, even in your head.",
        ],
        next: [
          { kind: "Life", title: "How Do You Forgive Someone Who Really Hurt You?", href: "/life/forgiveness-the-hardest-grace" },
          { kind: "How-to", title: "How to Forgive Someone Who Has Not Apologized", href: "/how-tos/rel-how-to-forgive-someone-who-has-not-apologized" },
        ],
      },
      Struggling: {
        interpretation:
          "By your own account, you're carrying real resentment, and it's costing you energy every day. An old hurt may play on a loop, you may be keeping careful track of what others owe you, and forgiveness may feel impossible because it seems to mean letting someone off the hook or trusting them again. It means neither. You can forgive someone and still call what they did wrong, still want justice, and still keep your distance. Struggling here doesn't make you less of a Christian. Often it means you were truly wronged, and no one has helped you sort out what forgiveness asks of you and what it doesn't. That help exists, and it's worth finding.",
        steps: [
          "Write a letter you won't send to the person who hurt you. Say exactly what they did and what it cost. If you can, end it with one line handing the debt to God; if you can't write that line yet, leave it blank for now.",
          "Talk with a pastor or a licensed counselor about this injury, especially if it involves abuse or betrayal. Forgiving someone never requires putting yourself back within their reach.",
        ],
        next: [
          { kind: "Find help", title: "I can't forgive them", href: "/help/cant-forgive" },
          { kind: "Life", title: "How Do You Forgive Someone Who Really Hurt You?", href: "/life/forgiveness-the-hardest-grace" },
        ],
      },
      Critical: {
        interpretation:
          "Resentment seems to have a strong hold on you right now. A hurt may replay constantly, the tally of what you're owed may feel like the only fair response, and forgiving may feel like betraying yourself or the truth. If someone did you serious harm, that reaction makes sense, and nothing here asks you to call it small. Forgiving doesn't mean excusing, forgetting, reconciling, or keeping quiet. If the person who hurt you could still hurt you, your safety comes first, before any conversation about forgiveness, and the question at the top of this page can connect you with help. When resentment is this heavy, a pastor or a licensed counselor can walk through it with you.",
        steps: [
          "Find one person, a pastor or a licensed counselor, and tell them the story from the beginning. You don't need to be ready to forgive to start.",
          "Pray honestly about the injury, even angrily. Psalm 55 is a prayer about betrayal by a close friend, and bringing your anger to God is where letting go of it can begin.",
        ],
        next: [
          { kind: "Find help", title: "I can't forgive them", href: "/help/cant-forgive" },
          { kind: "Care plan", title: "Eight Weeks Toward Setting Down the Debt", href: "/plans/forgiveness" },
        ],
      },
    },
  },
  "Rest & Sabbath": {
    scripture: {
      ref: "Deuteronomy 5:15",
      text: "Remember that you were a slave in the land of Egypt, and that the LORD your God brought you out of there with a mighty hand and an outstretched arm. That is why the LORD your God has commanded you to keep the Sabbath day.",
    },
    levels: {
      Strong: {
        interpretation:
          "You have a real rhythm of rest. You stop on purpose rather than only when you collapse, you can put your phone away without much pull, and you can call a workday finished while the list is still long. That's harder than it sounds in a culture that treats busyness as a sign of importance, and it says something about what you trust. Your rest isn't safe for good, though; a new job, a new baby, or a crisis can take it quickly. Guard the rhythm, and make it generous. In Deuteronomy 5:14 the Sabbath reaches servants, animals, and foreigners too, so that others can rest as you do.",
        steps: [
          "Read Deuteronomy 5:12-15 and notice who else the Sabbath is for. Ask whose rest depends on yours, whether a spouse, a coworker, or someone you supervise, and make one change this month that gives them more of it.",
          "Write down what your weekly rest actually includes, so you'll notice when it starts to slip.",
        ],
        next: [
          { kind: "Life", title: "What Is Sabbath Rest, and How Do You Keep It?", href: "/life/rest-and-the-sabbath" },
          { kind: "Study guide", title: "Sabbath: A Bible Study on Rest and Hurry", href: "/studyguides/sabbath" },
        ],
      },
      Developing: {
        interpretation:
          "Rest is part of your life, though not yet a dependable part. Some weeks have a real stop in them and others run straight through, your phone pulls at you more than you'd like, and ending a workday with tasks undone may still leave you uneasy. A full season makes this easy to fall into. Resting doesn't make you lazy, and missing a week doesn't make you faithless. It means rest hasn't yet become a rhythm you keep regardless of how the week goes. That's what the Sabbath was given to be: a stop built into every week, because the work is never finished and you were never meant to be its slave.",
        steps: [
          "Choose one block of time this week, half a day if a whole day is impossible, with no work, no email, and no errands. Plan it ahead and tell someone, so it's harder to give away.",
          "Put your phone in another room for two hours one evening. Notice the pull to check it, and what you do with the time instead.",
          "At the end of each workday, write down the one thing that must happen tomorrow, then close the list and stop.",
        ],
        next: [
          { kind: "How-to", title: "How to Keep a Sabbath", href: "/how-tos/sf-how-to-keep-a-sabbath" },
          { kind: "Life", title: "What Is Sabbath Rest, and How Do You Keep It?", href: "/life/rest-and-the-sabbath" },
          { kind: "How-to", title: "How to Unhook From Your Screens", href: "/how-tos/body-how-to-unhook-from-your-screens" },
        ],
      },
      Struggling: {
        interpretation:
          "Rest mostly comes when you run out, not when you choose it. You may push until you collapse, feel uneasy away from your phone, and find it hard to stop while anything is undone. That isn't a lack of discipline. People land here for real reasons: demanding work, small children, caring for someone, money pressure, or a sense that your worth depends on being useful. Some of those pressures won't change this month. But Deuteronomy 5:15 ties the Sabbath to the memory of slavery: people who had been worked without mercy in Egypt were commanded to stop. A life with no stop in it is not the life God gave his people, and the first step back can be small.",
        steps: [
          "Read Deuteronomy 5:15 and ask what in your life is acting like a taskmaster: an inbox, an expectation, a fear. Name it on paper.",
          "This week, choose two hours with no work and no phone, and protect them the way you'd protect an appointment with your doctor.",
          "Go to bed thirty minutes earlier three nights this week, and leave the phone outside the bedroom.",
        ],
        next: [
          { kind: "How-to", title: "How to Rest When You Feel You Cannot Stop", href: "/how-tos/wm-how-to-rest-when-you-feel-you-cannot-stop" },
          { kind: "Life", title: "What Is Sabbath Rest, and How Do You Keep It?", href: "/life/rest-and-the-sabbath" },
        ],
      },
      Critical: {
        interpretation:
          "From what you've described, you're getting almost no rest right now. You may be running until you drop, anxious whenever the phone is out of reach, and unable to stop while anything is unfinished, which in most lives means never. A pace like this wears a person down, and your body may already be telling you so. You're not weak, and you haven't failed God. The likelier story is that you've carried too much for too long. Before you try to build a Sabbath, talk to your doctor about how tired you are, and tell someone close how little rest you're getting. At this point rest isn't a discipline to master. It's something to receive, and you'll likely need help to receive it.",
        steps: [
          "Talk to your doctor this month about your exhaustion, and be specific about your sleep, your energy, and how long it has been like this.",
          "Tonight, stop an hour earlier than usual. Put the phone in another room, and leave something unfinished on purpose.",
          "Ask one person to carry something for you this week: a meal, a ride, an hour of childcare, a task at work. Receiving help is part of rest.",
        ],
        next: [
          { kind: "Find help", title: "I feel empty, and I don't know why", href: "/help/empty" },
          { kind: "Life", title: "What Is Sabbath Rest, and How Do You Keep It?", href: "/life/rest-and-the-sabbath" },
        ],
      },
    },
  },
};

function getCategoryResult(name: string, score: number): CategoryResult {
  const maxScore = 15;
  const pct = score / maxScore;

  let level: Level;
  if (pct >= 0.8) level = "Strong";
  else if (pct >= 0.6) level = "Developing";
  else if (pct >= 0.4) level = "Struggling";
  else level = "Critical";

  const guide = AREA_GUIDES[name];
  return {
    name,
    score,
    maxScore,
    level,
    scripture: guide.scripture,
    ...guide.levels[level],
  };
}

interface OverallBand {
  label: string;
  /** 150 to 300 words: what this usually means, what it doesn't, why people land here, what to do first. */
  paragraphs: string[];
  /** The two lower bands show the talk-to-a-person block before anything else. */
  seekHelp: boolean;
  /** The one next step this band leads with. */
  next: { lead: string; cta: string; href: string };
  /** A slower step for later, when there is one. */
  later?: { lead: string; title: string; href: string };
}

function getOverallInterpretation(totalScore: number): OverallBand {
  const maxTotal = 75;
  const pct = totalScore / maxTotal;

  if (pct >= 0.8) {
    return {
      label: "Emotionally Grounded",
      paragraphs: [
        "Your answers describe an inner life that is getting real attention. Most of the time you can name what you feel while you're feeling it, say no without guilt running the rest of your day, let sorrow be sorrow, set down old debts, and stop when the day is done. A result like this usually means some habits have been doing quiet work for a long time: a way of praying, resting, or telling the truth that has held long enough to shape you.",
        "It doesn't mean you're finished, and it doesn't promise that hard seasons won't come. It also doesn't make you a measuring stick for anyone else. Fifteen statements can't see everything, and a strong score can reflect a calm stretch of life as much as deep roots. People usually land here for one of a few reasons: they've come through something hard and learned from it, someone taught them these habits early, or life is lighter right now than it has been. It's worth knowing which is true of you.",
        "Start with your lowest area below, even if it still scored well, because drift usually begins wherever we stop paying attention. Keep the practices that brought you here, and ask one person who knows you well whether they see what these answers describe. Then look around you. Steady people are often the first ones a grieving or exhausted friend turns to, and some of the steps below are about being that kind of friend without taking over.",
      ],
      seekHelp: false,
      next: {
        lead: "If you'd like a way to keep what's working and strengthen what isn't, there's an eight-week plan that gives each part of life its own week, from the inner life and rest to friendship, work, and the local church, and ends with a simple rule of life you can keep.",
        cta: "Eight Weeks Toward One Undivided Life",
        href: "/plans/whole-life",
      },
    };
  }
  if (pct >= 0.6) {
    return {
      label: "Growing but Uneven",
      paragraphs: [
        "Your answers show real strength in some areas and real strain in others. Most of us grow the capacities that come naturally and neglect the ones that cost us something, so a person who reads their own feelings well may still be unable to say no, and a person who rests well may still be replaying an old injury every night. The scores below show where your own strength and strain sit.",
        "This result doesn't mean you're failing, and it doesn't mean your faith is weak. It means the weight of your life isn't carried evenly, and the weakest place is holding more than it can hold for long. The reasons are usually ordinary: a demanding season at work or at home, a loss that never got grieved, a family that taught some of these things and not others, or a church culture that praised busyness more than rest. Many of us helped build that culture by admiring the people who never stopped.",
        "Begin with the one or two areas below that scored lowest, and read what each says about your level. Don't try to fix all five at once. Choose one step in your lowest area, give it two weeks, and tell one person which step you chose, so it doesn't become a private resolution that quietly fades. If your lowest area involves an old grief or a deep injury, a conversation with a pastor or a licensed counselor may do more than any practice on this page. Your strong areas are real, and they're what will carry you while you tend the weak one.",
      ],
      seekHelp: false,
      next: {
        lead: "When some parts of life are strong and others are running on leftovers, it helps to give each part its own attention. This eight-week plan does that one week at a time, starting with an honest look and ending with a rule of life that holds the parts together.",
        cta: "Eight Weeks Toward One Undivided Life",
        href: "/plans/whole-life",
      },
    };
  }
  if (pct >= 0.4) {
    return {
      label: "Under Significant Strain",
      paragraphs: [
        "Your answers suggest your inner life is carrying more than it was built to carry. Across several areas, the things that usually keep a person steady (knowing what you feel, protecting some rest, grieving what you've lost, letting go of old wrongs) are thin right now. You may be functioning well on the outside while running on less and less inside, and the people around you may not know.",
        "This isn't a verdict on your character or your faith, and it isn't a diagnosis. A self-check can't tell you why you're depleted, only that your answers describe depletion. A result like this tends to follow a long season of giving more than you receive: caring for someone, carrying a hard job, leading others, absorbing a loss, or living for years under an unspoken rule to keep going and not complain. Churches can teach that rule without meaning to, and many of us have praised it in others while it wore them down.",
        "Before you add any new discipline, tell one person the truth about how you are, someone who will listen before they try to fix anything: a friend, your pastor, or a licensed counselor. If the strain has lasted more than a few weeks, or it's changing your sleep, your appetite, or your ability to work, see your doctor too, since exhaustion and low mood can have physical causes worth checking. Then choose the lowest area below and take one small step there. The goal for now isn't to fix everything. It's to stop carrying all of it alone.",
      ],
      seekHelp: true,
      next: {
        lead: "For a season like this, there's an eight-week plan that starts where God started with Elijah, with bread and sleep, then moves to telling one person, letting a doctor look, and praying in the dark. Walking it alongside a counselor is wisdom, not weakness.",
        cta: "Eight Weeks of Small Mercies",
        href: "/plans/empty",
      },
    };
  }
  return {
    label: "Running on Empty",
    paragraphs: [
      "Your answers describe someone running on very little. In most of these areas, what normally keeps a person steady is hard to reach right now: naming what you feel, saying no, grieving, letting go, and resting. That's a heavy place to be, and it took honesty to answer the way you did.",
      "Before any practice on this page, please talk with a real person this week. Your doctor is a good first call, because exhaustion and emptiness can have physical causes worth checking. A licensed counselor can help you understand what's happening and what would help, and a pastor you trust can walk with you through it. You don't need the right words; you can print this page and bring it with you. Nothing here is medical advice.",
      "This result isn't a diagnosis, and it isn't a verdict on your faith or your worth. These answers can show that you're depleted, but not why. It usually follows a long stretch of carrying too much: grief that never had room, a job or a household or a ministry with no off switch, years of saying yes, or an old hurt that still takes energy every day. It can change. Rest, help, and time will do more here than effort.",
      "The page on feeling empty, linked below, says what to do tonight and when to get more help. If any of this has turned into thoughts of not wanting to be alive, call or text 988 now, at any hour.",
    ],
    seekHelp: true,
    next: {
      lead: "Before any plan or practice, read the page for when you feel empty. It says what to do tonight, when to see a doctor, and how to find a counselor.",
      cta: "I feel empty, and I don't know why",
      href: "/help/empty",
    },
    later: {
      lead: "Later, when you're ready for something slower, there's an eight-week plan for this season:",
      title: "Eight Weeks of Small Mercies",
      href: "/plans/empty",
    },
  };
}

/** Words a reader might say or think are marked *like this* in the copy above; set them in italics. */
function withItalics(text: string) {
  return text
    .split(/\*([^*]+)\*/g)
    .map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part));
}

/* ── Saved progress (HS-5): survive a refresh mid-assessment ───── */

const STORAGE_KEY = "livewell-progress-emotional-health";

interface StoredProgress {
  answers: Record<number, number>;
  step: number;
  savedAt: string;
}

function isStoredProgress(x: unknown): x is StoredProgress {
  if (typeof x !== "object" || x === null) return false;
  const p = x as Record<string, unknown>;
  return (
    typeof p.step === "number" &&
    Number.isFinite(p.step) &&
    typeof p.savedAt === "string" &&
    typeof p.answers === "object" &&
    p.answers !== null &&
    !Array.isArray(p.answers) &&
    Object.values(p.answers).every((v) => typeof v === "number")
  );
}

export default function EmotionalHealth() {
  const [saved] = useState(() =>
    readStoredJSON<StoredProgress | null>(STORAGE_KEY, isStoredProgress, null),
  );
  const [answers, setAnswers] = useState<Record<number, number>>(
    saved?.answers ?? {},
  );
  const [showResults, setShowResults] = useState(false);
  const [resumed, setResumed] = useState(
    () => saved !== null && Object.keys(saved.answers).length > 0,
  );
  const [persistFailed, setPersistFailed] = useState(false);

  const allAnswered = STATEMENTS.every((_, i) => answers[i] !== undefined);

  const persist = (nextAnswers: Record<number, number>) => {
    setPersistFailed(
      !writeStoredJSON(STORAGE_KEY, {
        answers: nextAnswers,
        step: 0,
        savedAt: new Date().toISOString(),
      }),
    );
  };

  const handleRate = (index: number, value: number) => {
    const next = { ...answers, [index]: value };
    setAnswers(next);
    setResumed(false);
    persist(next);
  };

  const handleSubmit = () => {
    if (allAnswered) {
      setShowResults(true);
      persist(answers);
    }
  };

  const handleReset = () => {
    removeStoredJSON(STORAGE_KEY);
    setAnswers({});
    setShowResults(false);
    setResumed(false);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  const handleChangeAnswers = () => {
    setShowResults(false);
    setResumed(false);
    persist(answers);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  // Calculate results
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const categoryResults: CategoryResult[] = CATEGORIES.map((cat) => {
    const indices = STATEMENTS.map((s, i) => (s.category === cat ? i : -1)).filter(
      (i) => i >= 0
    );
    const score = indices.reduce((sum, i) => sum + (answers[i] || 0), 0);
    return getCategoryResult(cat, score);
  });
  const overall = getOverallInterpretation(totalScore);

  return (
    <Layout>
      <SEOMeta
        title="Emotional Health Self-Check: An Honest Look at Your Inner Life"
        description="A 15-question self-check on emotional and spiritual health: self-awareness, boundaries, grief, forgiveness, and rest. Not a diagnosis. Honest results, practical steps."
        keywords="emotional health assessment, emotional health self-check, spiritual health check, self-awareness, boundaries, grief, forgiveness, sabbath rest, Christian mental health"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Emotional Health Self-Check",
          description:
            "A 15-question self-check on emotional and spiritual health, not a diagnosis. Honest results, Scripture, and practical steps for each category.",
          url: "https://www.livewellbyjamesbell.co/tools/emotional-health",
          applicationCategory: "HealthApplication",
          offers: { "@type": "Offer", price: "0" },
        }}
      />

      {/* Hero */}
      <section
        style={{
          background: "var(--charcoal)",
          color: "var(--charcoal-fg)",
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
            Emotional Health{" "}
            <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>
              Self-Check
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
            Fifteen statements about five parts of the inner life:
            self-awareness, boundaries, grief, forgiveness, and rest. It takes a
            few minutes. Answer for how things have really been lately, not how
            you wish they were.
          </p>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              fontFamily: "var(--B)",
              margin: "12px 0 0",
            }}
          >
            This is a self-check for reflection, not a test or a diagnosis, and
            your answers stay on this device.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "48px 32px", background: "var(--bone)" }}>
        <div className="wrap" style={{ maxWidth: "900px" }}>
          {!showResults ? (
            <>
              {resumed && (
                <div
                  className="no-print"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flexWrap: "wrap",
                    marginBottom: "24px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontFamily: "var(--U)",
                      color: "var(--ink-muted)",
                    }}
                  >
                    Picked up where you left off.
                  </span>
                  <button
                    onClick={handleReset}
                    style={{
                      fontSize: "13px",
                      fontFamily: "var(--U)",
                      fontWeight: 600,
                      padding: "6px 14px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      background: "none",
                      color: "var(--ink-muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    Start fresh
                  </button>
                </div>
              )}
              {persistFailed && (
                <p
                  style={{
                    fontSize: "13px",
                    fontFamily: "var(--U)",
                    color: "var(--ink-muted)",
                    margin: "0 0 24px",
                  }}
                >
                  Couldn't save to this browser — your work here will not
                  survive a reload.
                </p>
              )}
              {/* Assessment Form */}
              {CATEGORIES.map((cat, ci) => {
                const catStatements = STATEMENTS.map((s, i) => ({
                  ...s,
                  index: i,
                })).filter((s) => s.category === cat);

                return (
                  <div
                    key={cat}
                    style={{
                      background: "var(--card)",
                      borderRadius: "8px",
                      padding: "36px",
                      marginBottom: "20px",
                      borderTop:
                        ci === 0 ? "4px solid var(--mustard)" : undefined,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "var(--mustard-text)",
                        fontFamily: "var(--U)",
                        marginBottom: "24px",
                      }}
                    >
                      {cat.toUpperCase()}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "28px",
                      }}
                    >
                      {catStatements.map((s) => (
                        <div key={s.index}>
                          <p
                            style={{
                              fontSize: "16px",
                              lineHeight: 1.7,
                              color: "var(--ink)",
                              fontFamily: "var(--B)",
                              margin: "0 0 14px",
                            }}
                          >
                            {s.text}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              flexWrap: "wrap",
                            }}
                          >
                            {[1, 2, 3, 4, 5].map((val) => (
                              <button
                                key={val}
                                onClick={() => handleRate(s.index, val)}
                                aria-pressed={answers[s.index] === val}
                                style={{
                                  padding: "8px 14px",
                                  background:
                                    answers[s.index] === val
                                      ? "var(--mustard)"
                                      : "var(--bone)",
                                  color:
                                    answers[s.index] === val
                                      ? "var(--ink)"
                                      : "var(--ink-muted)",
                                  border: `1px solid ${
                                    answers[s.index] === val
                                      ? "var(--mustard)"
                                      : "var(--border)"
                                  }`,
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  fontFamily: "var(--U)",
                                  cursor: "pointer",
                                  transition: "all 0.15s",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {val}: {RATING_LABELS[val]}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Submit */}
              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  style={{
                    padding: "14px 40px",
                    background: allAnswered
                      ? "var(--mustard)"
                      : "var(--bone-muted)",
                    color: allAnswered ? "var(--ink)" : "var(--ink-muted)",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "var(--U)",
                    cursor: allAnswered ? "pointer" : "not-allowed",
                    transition: "all 0.2s",
                    letterSpacing: "0.05em",
                  }}
                >
                  {allAnswered
                    ? "SEE MY RESULTS"
                    : `${Object.keys(answers).length} OF 15 ANSWERED`}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Results */}
              <ToolActions toolName="Emotional Health Self-Check" onStartOver={handleReset} />
              <SafetyCheck />
              <SelfCheckHistory
                id="emotional-health"
                total={totalScore / 75}
                areas={Object.fromEntries(categoryResults.map((c) => [c.name, c.score / c.maxScore]))}
                answersKey={JSON.stringify(answers)}
              />
              {persistFailed && (
                <p
                  style={{
                    fontSize: "13px",
                    fontFamily: "var(--U)",
                    color: "var(--ink-muted)",
                    margin: "0 0 24px",
                  }}
                >
                  Couldn't save to this browser — your work here will not
                  survive a reload.
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  flexWrap: "wrap",
                  marginBottom: "24px",
                }}
                className="no-print"
              >
                <button
                  onClick={handleChangeAnswers}
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
                    opacity: 0.7,
                  }}
                >
                  <ArrowLeft size={16} />
                  Change my answers
                </button>
                <button
                  onClick={handleReset}
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
                    opacity: 0.7,
                  }}
                >
                  Take the self-check again
                </button>
              </div>

              {/* Overall Score */}
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "8px",
                  padding: "40px 36px",
                  marginBottom: "28px",
                  borderTop: "4px solid var(--mustard)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "var(--mustard-text)",
                    fontFamily: "var(--U)",
                    marginBottom: "12px",
                  }}
                >
                  YOUR EMOTIONAL HEALTH
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "16px",
                    marginBottom: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(36px, 5vw, 56px)",
                      fontWeight: 400,
                      fontFamily: "var(--F)",
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {totalScore}
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      fontFamily: "var(--B)",
                      color: "var(--ink-muted)",
                    }}
                  >
                    out of 75
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: "clamp(22px, 3vw, 30px)",
                    fontWeight: 400,
                    fontFamily: "var(--F)",
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    margin: "16px 0",
                  }}
                >
                  {overall.label}
                </h2>
                {overall.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.8,
                      color: "var(--ink)",
                      fontFamily: "var(--B)",
                      maxWidth: "68ch",
                      margin: i === 0 ? 0 : "16px 0 0",
                    }}
                  >
                    {withItalics(para)}
                  </p>
                ))}

                {overall.seekHelp && (
                  <div
                    style={{
                      marginTop: "24px",
                      background: "var(--bone)",
                      border: "1px solid var(--border)",
                      borderLeft: "3px solid var(--mustard)",
                      borderRadius: "2px",
                      padding: "20px 24px",
                      maxWidth: "68ch",
                    }}
                  >
                    <p style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", margin: "0 0 10px" }}>
                      A word before the practical steps
                    </p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.75, color: "var(--ink)", margin: "0 0 14px" }}>
                      A score in this range is a reason to talk to a real person,
                      not just to try harder. A licensed counselor is the right
                      next step, and seeing one is not a failure of faith. And if
                      the depletion has turned into not wanting to be here, that
                      is not something to carry alone for another day.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <a href="tel:988" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                        988 Suicide &amp; Crisis Lifeline: call or text 988, any hour →
                      </a>
                      <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                        Find a licensed counselor near you →
                      </a>
                    </div>
                  </div>
                )}

                {/* Score bar */}
                <div
                  style={{
                    marginTop: "28px",
                    background: "var(--bone)",
                    borderRadius: "4px",
                    height: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(totalScore / 75) * 100}%`,
                      height: "100%",
                      background: "var(--mustard)",
                      borderRadius: "4px",
                      transition: "width 0.6s var(--ease)",
                    }}
                  />
                </div>
              </div>

              {/* The next step this band leads with */}
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "8px",
                  padding: "36px",
                  marginBottom: "28px",
                  borderTop: "4px solid var(--mustard)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "var(--mustard-text)",
                    fontFamily: "var(--U)",
                    marginBottom: "12px",
                  }}
                >
                  YOUR NEXT STEP
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    color: "var(--ink)",
                    fontFamily: "var(--B)",
                    maxWidth: "68ch",
                    margin: "0 0 20px",
                  }}
                >
                  {overall.next.lead}
                </p>
                <Link
                  href={overall.next.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    minHeight: "44px",
                    padding: "12px 28px",
                    background: "var(--mustard)",
                    color: "var(--ink)",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontFamily: "var(--U)",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {overall.next.cta}
                  <ChevronRight size={16} />
                </Link>
                {overall.later && (
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "var(--ink-muted)",
                      fontFamily: "var(--B)",
                      maxWidth: "68ch",
                      margin: "20px 0 0",
                    }}
                  >
                    {overall.later.lead}{" "}
                    <Link
                      href={overall.later.href}
                      style={{
                        color: "var(--ink)",
                        fontWeight: 600,
                        textDecoration: "none",
                        borderBottom: "1px solid var(--mustard)",
                      }}
                    >
                      {overall.later.title}
                    </Link>
                  </p>
                )}
              </div>

              {/* Category Breakdown */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {categoryResults.map((cat) => (
                  <div
                    key={cat.name}
                    style={{
                      background: "var(--card)",
                      borderRadius: "8px",
                      padding: "36px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: "12px",
                        marginBottom: "20px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          color: "var(--mustard-text)",
                          fontFamily: "var(--U)",
                          margin: 0,
                        }}
                      >
                        {cat.name.toUpperCase()}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "28px",
                            fontFamily: "var(--F)",
                            fontWeight: 400,
                            color: "var(--ink)",
                            lineHeight: 1,
                          }}
                        >
                          {cat.score}
                        </span>
                        <span
                          style={{
                            fontSize: "13px",
                            fontFamily: "var(--B)",
                            color: "var(--ink-muted)",
                          }}
                        >
                          / {cat.maxScore}
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            fontFamily: "var(--U)",
                            color:
                              cat.level === "Strong"
                                ? "var(--mustard-deep)"
                                : cat.level === "Developing"
                                  ? "var(--ink-muted)"
                                  : "var(--ink)",
                            background:
                              cat.level === "Strong"
                                ? "rgba(212,160,23,0.12)"
                                : "var(--bone)",
                            padding: "3px 10px",
                            borderRadius: "3px",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {cat.level}
                        </span>
                      </div>
                    </div>

                    {/* Score bar */}
                    <div
                      style={{
                        background: "var(--bone)",
                        borderRadius: "4px",
                        height: "6px",
                        overflow: "hidden",
                        marginBottom: "24px",
                      }}
                    >
                      <div
                        style={{
                          width: `${(cat.score / cat.maxScore) * 100}%`,
                          height: "100%",
                          background: "var(--mustard)",
                          borderRadius: "4px",
                          transition: "width 0.6s var(--ease)",
                        }}
                      />
                    </div>

                    {/* What this level means in this area */}
                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.75,
                        color: "var(--ink)",
                        fontFamily: "var(--B)",
                        maxWidth: "68ch",
                        margin: "0 0 24px",
                      }}
                    >
                      {withItalics(cat.interpretation)}
                    </p>

                    {/* Scripture */}
                    <div
                      style={{
                        background: "var(--bone)",
                        padding: "20px 24px",
                        borderRadius: "4px",
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
                        {cat.scripture.text}
                      </p>
                      <Link
                        href={`/theology/passage?ref=${encodeURIComponent(cat.scripture.ref)}`}
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          fontFamily: "var(--U)",
                          color: "var(--mustard-text)",
                          textDecoration: "none",
                          borderBottom: "1px solid var(--mustard)",
                          paddingBottom: "1px",
                        }}
                      >
                        Read {cat.scripture.ref} in context
                      </Link>
                      <ScriptureNote rendering="bsb" />
                    </div>

                    {/* Practical steps */}
                    <h4
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: "var(--ink-muted)",
                        fontFamily: "var(--U)",
                        marginBottom: "16px",
                      }}
                    >
                      PRACTICAL STEPS
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        marginBottom: "20px",
                      }}
                    >
                      {cat.steps.map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: "14px" }}>
                          <span
                            style={{
                              fontFamily: "var(--F)",
                              fontSize: "22px",
                              fontWeight: 400,
                              color: "var(--mustard-text)",
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
                              fontSize: "15px",
                              lineHeight: 1.7,
                              color: "var(--ink)",
                              fontFamily: "var(--B)",
                              margin: 0,
                            }}
                          >
                            {withItalics(step)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Next steps for this area at this level */}
                    <h4
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: "var(--ink-muted)",
                        fontFamily: "var(--U)",
                        marginBottom: "12px",
                      }}
                    >
                      WHERE TO GO NEXT
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {cat.next.map((n) => (
                        <Link
                          key={n.href}
                          href={n.href}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                            padding: "14px 20px",
                            background: "var(--bone)",
                            borderRadius: "6px",
                            textDecoration: "none",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--bone-warm)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--bone)";
                          }}
                        >
                          <div>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                color: "var(--mustard-text)",
                                fontFamily: "var(--U)",
                                display: "block",
                                marginBottom: "4px",
                              }}
                            >
                              {n.kind.toUpperCase()}
                            </span>
                            <span
                              style={{
                                fontSize: "15px",
                                fontFamily: "var(--F)",
                                fontWeight: 400,
                                fontStyle: "italic",
                                color: "var(--ink)",
                              }}
                            >
                              {n.title}
                            </span>
                          </div>
                          <ChevronRight
                            size={16}
                            style={{ opacity: 0.4, flexShrink: 0 }}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <a
                href="/help"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--charcoal)",
                  color: "var(--charcoal-fg)",
                  borderRadius: "8px",
                  padding: "24px 32px",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                  marginTop: "28px",
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
                    FIND HELP
                  </div>
                  <span
                    style={{
                      fontSize: "18px",
                      fontFamily: "var(--F)",
                      fontWeight: 400,
                      fontStyle: "italic",
                    }}
                  >
                    Start from what you are facing, in your own words
                  </span>
                </div>
                <ChevronRight
                  size={20}
                  style={{ opacity: 0.5, flexShrink: 0 }}
                />
              </a>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
