/**
 * Family Devotion Builder (/tools/family-devotions) — pick an age band and a
 * theme, get a complete 15-minute devotion: Scripture, Big Idea, teaching
 * adapted to age, three discussion questions, a hands-on activity, and a
 * closing prayer. All content is static; passages are KJV (public domain).
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { Users, Copy, Check, RotateCcw, BookOpen, MessageCircle, Hand, HeartHandshake } from "lucide-react";
import { Link } from "wouter";
import { copyToClipboard } from "@/lib/clipboard";

type BandId = "young" | "elementary" | "teens" | "mixed";

interface BandContent {
  teaching: string[];
  questions: string[];
  activity: string;
}

interface ThemeData {
  passage: string;
  passageText: string;
  bigIdea: string;
  prayer: string;
  bands: Record<BandId, BandContent>;
}

const AGE_BANDS: { id: BandId; label: string }[] = [
  { id: "young", label: "Young children (3-6)" },
  { id: "elementary", label: "Elementary (7-11)" },
  { id: "teens", label: "Teens (12-18)" },
  { id: "mixed", label: "Mixed ages" },
];

const THEMES: Record<string, ThemeData> = {
  Gratitude: {
    passage: "Psalm 100:4-5 (KJV)",
    passageText:
      "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name. For the LORD is good; his mercy is everlasting; and his truth endureth to all generations.",
    bigIdea: "Thankfulness is not a mood. It is a door you walk through to get near God.",
    prayer:
      "Father, You have been good to this family in ways we forget by dinner time. Forgive us for noticing what is missing more than what is here. Teach us to say thank You out loud, to You and to each other. Your mercy does not run out. Help us live like people who believe that. Amen.",
    bands: {
      young: {
        teaching: [
          "God gives us good things every day. Food. A bed. People who love us. The Bible says we can come to God like walking through a gate, and the way we walk in is by saying thank You. When we say thank You to God, we remember that He is good and that He loves us. We did not make any of these good things ourselves. God gave them.",
        ],
        questions: [
          "What is one thing you are happy God gave you today?",
          "Who is someone who loves you? Let's thank God for them right now.",
          "What can we say to God before we go to bed tonight?",
        ],
        activity:
          "Walk through a doorway in your house together. Before each person steps through, they say one thing they are thankful for. Do two rounds. The doorway is your thanksgiving gate, like the gates in the psalm.",
      },
      elementary: {
        teaching: [
          "Psalm 100 was a song people sang on their way into the temple. They did not wait until they felt thankful. They sang thanks at the gate, on purpose, before anything else happened. That is worth noticing. Gratitude in the Bible is not a feeling that shows up on good days. It is a choice you make at the door.",
          "Here is the hard part. Most of us are better at noticing what we do not have. A friend gets something and we want it. A day goes wrong and we forget the hundred things that went right. The psalm gives us the fix. Say it out loud. The Lord is good. His mercy lasts forever. Saying it changes what we see.",
        ],
        questions: [
          "Why do you think the people sang thanks before they even got inside the temple?",
          "What is something good in your life that you almost never notice?",
          "Is it harder to be thankful on a bad day? Why?",
        ],
        activity:
          "Set a timer for three minutes. Go around the room and take turns naming things you are thankful for, one at a time, no repeats. See how many your family can name before the timer ends. When someone gets stuck, the family helps.",
      },
      teens: {
        teaching: [
          "Psalm 100 is a processional psalm. Israel sang it while walking into the temple courts. Notice the order. Thanksgiving comes first, at the gate, before the worship, before the requests, before anything. The psalm does not say enter His gates when you feel grateful. It says enter with thanksgiving. Gratitude is the admission price you pay with your attention.",
          "There is research on this now, and it confirms what the psalm assumed three thousand years ago. People who practice thanks, who name specific good things on purpose, are measurably less anxious and less envious. But the psalm goes further than self-help does. It tells you who to thank. Gratitude that floats free, thankful to no one in particular, eventually starves. The psalm anchors it. The Lord is good. His mercy is everlasting. His truth endures to all generations.",
          "Envy is the opposite discipline, and your phone runs on it. Every feed is built to show you a life slightly better than yours. The psalm is the counter-practice. You cannot scroll and give thanks at the same moment. One of them will form you.",
        ],
        questions: [
          "What in your life trains you to want more instead of giving thanks?",
          "Is there a difference between feeling grateful and practicing gratitude? Which one do you control?",
          "If you thanked God for one specific thing every night this week, what would change?",
        ],
        activity:
          "Everyone takes out their phone, or thinks of their most-used app. Each person names one thing that app makes them want that they did not want five minutes before opening it. Then each person names one real thing they already have that is better. Say both out loud.",
      },
      mixed: {
        teaching: [
          "Psalm 100 was a song families sang together while walking to worship. Old people and small children, all singing the same words at the gate. Thank You. You are good. Your mercy lasts forever. They did not wait to feel it. They said it, and the saying taught the feeling.",
          "Every family forgets to say thank you. We get used to the food, the house, each other. The psalm is the cure for getting used to things. It puts the words in our mouths before our hearts catch up. Tonight we say them together, smallest to oldest, because that is how Israel did it.",
        ],
        questions: [
          "What is one thing our family has that we almost never say thank you for?",
          "Who in this room are you thankful for, and why? Tell them right now.",
          "What would change at our table if we thanked God out loud every night?",
        ],
        activity:
          "Go around the table from youngest to oldest. Each person thanks God for the person on their left, out loud, with one specific reason. No general answers. Name something that person actually did this week.",
      },
    },
  },
  Courage: {
    passage: "Joshua 1:9 (KJV)",
    passageText:
      "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
    bigIdea: "Courage is not the absence of fear. It is moving forward because God is with you.",
    prayer:
      "Lord, each of us in this room is afraid of something. You know what it is, even when we will not say it. Thank You that You do not ask us to stop being afraid before You go with us. Make us strong and of good courage, not because we are big, but because You are near. Amen.",
    bands: {
      young: {
        teaching: [
          "Joshua had a big job to do, and he was scared. God did not say there is nothing to be afraid of. God said something better. I will be with you everywhere you go. That is why Joshua could be brave. Being brave does not mean you never feel scared. It means you remember God is with you, and you take the next step anyway.",
        ],
        questions: [
          "What is something that feels scary to you?",
          "Where does God go with you? Is there anywhere He does not go?",
          "What can you say to yourself next time you feel afraid?",
        ],
        activity:
          "Play a short game. One parent closes their eyes and a child leads them slowly across the room by the hand, telling them where to step. Then trade places. Talk about how it feels to walk when you cannot see but someone you trust is holding your hand. That is what God promised Joshua.",
      },
      elementary: {
        teaching: [
          "Moses was dead, and Joshua had to take his place. Imagine following the most famous leader your people ever had. Joshua was afraid, and God knew it, because God says be not afraid three times in one chapter. You do not tell someone to stop being afraid unless they already are.",
          "Notice what God does not say. He does not say nothing bad will happen. He does not say it will be easy. He gives one reason for courage. The Lord thy God is with thee whithersoever thou goest. The reason for courage is not that the scary thing is small. It is that God goes with you into it.",
        ],
        questions: [
          "What is the bravest thing you have ever had to do?",
          "Why do you think God told Joshua three times not to be afraid?",
          "What scary thing is in front of you right now, at school or anywhere else?",
        ],
        activity:
          "Each person names one thing they are afraid of this week. A test, a kid at school, a doctor visit, anything real. After each one, the whole family says together: Be strong and of good courage, for the Lord your God is with you. Say it like you mean it.",
      },
      teens: {
        teaching: [
          "Joshua 1:9 gets printed on posters and graduation cards, which almost ruins it. Look at the situation. Moses is dead. Joshua inherits a nation of refugees, a river at flood stage, and fortified cities on the other side. God's command is not a warm sentiment. It is a military briefing with one strange line of support. I will be with you. No troop numbers. No guarantee of an easy campaign. Just presence.",
          "That tells you what biblical courage actually is. It is not confidence in your own ability, which collapses the moment your ability runs out. It is not the absence of fear, which is usually just ignorance of the stakes. It is acting in obedience while afraid, because the decisive fact about your situation is not the size of the problem but the presence of God in it.",
          "You will need this. Not for crossing the Jordan, but for the moment you have to be the one who tells the truth, or refuses what everyone else is doing, or admits faith in a room that finds it embarrassing. Courage for a teenager usually looks less like a battlefield and more like a lunch table. The promise holds in both places.",
        ],
        questions: [
          "Where in your life right now does doing the right thing cost something socially?",
          "What is the difference between confidence in yourself and courage that rests on God being with you?",
          "Has fear ever made a decision for you that you regret? What happened?",
        ],
        activity:
          "Each person tells the others about one moment this past month when they were afraid and acted anyway, or afraid and backed down. No fixing, no advice, no laughing. Just listen. Then have the youngest person read Joshua 1:9 out loud over the family.",
      },
      mixed: {
        teaching: [
          "When Joshua took over from Moses, God told him three times in one chapter to be strong and have courage. God repeats things when He knows we are scared. And He gave Joshua only one reason. Not that the job was easy. Not that nothing would go wrong. Just this. I will be with you everywhere you go.",
          "Everyone at this table is afraid of something. The youngest of us and the oldest of us. The fears change size as we grow, but the answer to them does not change. God goes with us. Into the classroom, the hospital, the new job, the dark bedroom. Courage is taking the next step with Him.",
        ],
        questions: [
          "What is one thing each of us is afraid of right now? Everyone answers, parents too.",
          "Why do you think God said it three times instead of once?",
          "How can we remind each other this week that God is with us?",
        ],
        activity:
          "Stand in a line holding hands and walk together through the darkest room in the house with the lights off. Have the person in front go slowly. When you are done, talk about how being together changed the dark. Then say Joshua 1:9 together with the lights on.",
      },
    },
  },
  Forgiveness: {
    passage: "Colossians 3:13 (KJV)",
    passageText:
      "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye.",
    bigIdea: "We forgive other people the way Christ forgave us, first and at His own cost.",
    prayer:
      "Father, You forgave us before we deserved it, and we are slow to do the same for each other. There are grudges in this room, some small and some old. Loosen our grip on them. Help each of us forgive the way Christ forgave us, all the way, without keeping score. Amen.",
    bands: {
      young: {
        teaching: [
          "Sometimes people hurt us. A friend grabs a toy. A brother says something mean. It hurts, and we want to hurt back. But Jesus forgave us for all the wrong things we do, and He asks us to forgive other people the same way. Forgiving means we stop trying to get them back. We let God take care of it, and we let our hearts feel light again.",
        ],
        questions: [
          "Has someone ever said sorry to you? What did you say back?",
          "Is it hard to forgive someone who hurt you? Why?",
          "Is there anyone you need to forgive tonight?",
        ],
        activity:
          "Have each child hold a heavy book or a full water bottle out to the side with one arm while you slowly count to twenty. Talk about how it gets heavier and heavier. Not forgiving someone is like never putting it down. Then put it down together and shake out your arms.",
      },
      elementary: {
        teaching: [
          "Paul says forgive as Christ forgave you. That little word as carries all the weight. How did Christ forgive you? Before you said sorry. Completely, not partially. At His own cost, on a cross. That is the pattern, and it is a hard one, because our instinct is to wait until the other person earns it.",
          "Here is what forgiveness is not. It is not saying the thing did not hurt. It is not pretending it was okay. It is deciding you will not spend your life making them pay. You hand the debt to God, who judges better than you do, and you get your own heart back. The person who refuses to forgive is the one who stays trapped.",
        ],
        questions: [
          "Why is it harder to forgive someone who never says sorry?",
          "Is there a difference between forgiving someone and saying what they did was fine?",
          "Who is someone you are still a little angry at?",
        ],
        activity:
          "Each person quietly thinks of one person they need to forgive. Then everyone takes one deep breath together, and on the breath out, says: I forgive, as Christ forgave me. You do not have to say the name out loud. God knows it.",
      },
      teens: {
        teaching: [
          "Colossians 3:13 hangs on three words. As Christ forgave. Paul does not say forgive because it will make you feel better, though it often does. He does not say forgive because the offense was minor, because sometimes it was not. He grounds forgiveness in an event. You were forgiven first, at the cross, at a cost you did not pay. Everything you are asked to release is smaller than what was released for you.",
          "Be clear about what forgiveness is not, because the confusion keeps people stuck. Forgiveness is not trust. Trust is rebuilt slowly, and sometimes it should not be rebuilt at all. Forgiveness is not pretending it did not happen or that it did not matter. It is a decision to stop collecting the debt yourself, to take the ledger you have been keeping and hand it to God. You can forgive someone and still keep a wise distance from them.",
          "And it is rarely a single moment. You forgive, and then the memory comes back on a Tuesday and you have to forgive again. That is not failure. That is what the actual practice looks like. The question is not whether you have finished forgiving someone. The question is which direction you are facing.",
        ],
        questions: [
          "Is there someone you have decided not to forgive? What is keeping the debt open?",
          "How is forgiving someone different from trusting them again?",
          "What does it do to a person, over years, to keep every score?",
        ],
        activity:
          "Each person writes one grudge on a small piece of paper, real but private, no names read aloud. Fold the papers and have one person collect and tear them up over the trash while someone reads Colossians 3:13. The tearing is not magic. It is a promise about which direction you will face.",
      },
      mixed: {
        teaching: [
          "Families need forgiveness more than anyone, because no one can hurt you like the people who live in your house. We are close enough to wound each other daily, and we do. The Bible says forgive one another as Christ forgave you. He went first. He paid for it. He did not wait for us to deserve it.",
          "A house where nobody forgives gets cold and quiet in a specific way. A house where people forgive stays warm even after bad days. Tonight is a good night to put down whatever we have been carrying against each other.",
        ],
        questions: [
          "What does it feel like inside when you stay mad at someone in this family?",
          "Why do you think Jesus forgave us before we ever said sorry?",
          "Is there anything anyone needs to say sorry for tonight? This is a safe time to say it.",
        ],
        activity:
          "Hold hands in a circle. Anyone who wants to may say two sentences: I am sorry for, and, I forgive. Parents go first, because children learn to apologize by watching adults do it. Close by saying together: As Christ forgave us.",
      },
    },
  },
  Honesty: {
    passage: "Ephesians 4:25 (KJV)",
    passageText:
      "Wherefore putting away lying, speak every man truth with his neighbour: for we are members one of another.",
    bigIdea: "We tell the truth because we belong to each other, and lies break what holds us together.",
    prayer:
      "Lord, You are truth, and every lie we tell takes us further from You and from each other. Forgive the small lies we have excused and the big ones we have buried. Make this family a safe place to tell the truth, even when the truth is embarrassing. Help us speak truth in love. Amen.",
    bands: {
      young: {
        teaching: [
          "The Bible tells us to put away lying and tell the truth, because we belong to each other. When we lie, the people who love us cannot trust our words anymore. When we tell the truth, even hard truth like I broke it or I did it, we can be helped and forgiven. Telling the truth is brave. God loves it when we are truthful, and He helps us do it.",
        ],
        questions: [
          "Why is it hard to tell the truth when you did something wrong?",
          "How do you feel inside after you tell a lie? How about after you tell the truth?",
          "What should you do if you already told a lie?",
        ],
        activity:
          "Play two truths and a pretend. Each person says two true things about their day and one made-up thing, and the family guesses which is made up. Then talk about it: the game was fun because we knew it was a game. Lying in real life is different, because people believe us.",
      },
      elementary: {
        teaching: [
          "Paul gives a reason for honesty that most people miss. He does not say tell the truth or you will get in trouble. He says tell the truth because we are members one of another. We belong to each other, like parts of one body. When your eye lies to your feet about what it sees, the whole body falls. A family works the same way. Every lie, even a small one, makes the family a little less safe.",
          "Most lies come from fear. We lie to escape trouble, or to look better than we are. But here is the secret. The truth, told early, is almost always smaller than the lie that grows to cover it. And a kid who can say I did it and I am sorry is stronger than a kid who can only hide.",
        ],
        questions: [
          "Why do you think people lie even when the truth would have been okay?",
          "Has a lie ever grown bigger and bigger? What happened?",
          "What makes it easier to tell the truth in our house? What makes it harder?",
        ],
        activity:
          "Truth chain. One person starts by saying one true thing they have never told the family, small and safe, like a food they secretly dislike or a thing that scared them once. Each person adds a link. Notice that the room feels closer at the end than it did at the start. Truth does that.",
      },
      teens: {
        teaching: [
          "Ephesians 4:25 gives an unusual argument for honesty. Paul does not appeal to consequences, getting caught, or reputation. He says speak truth with your neighbor because we are members one of another. The reason for honesty is relational. A community runs on trustworthy words the way a body runs on accurate nerves. Lying is not just a private moral failure. It damages every relationship the lie touches.",
          "Your generation lives in an economy of curated images. Every profile is edited, every photo selected, every flaw cropped. None of that is technically lying, but it trains the same muscle, the habit of managing what people see instead of being known. The cost is real. You can be admired for the edited version and still be completely alone, because the person they admire is not you.",
          "Honesty has a second half that gets skipped. Paul says elsewhere to speak the truth in love. Truth without love is a weapon. Brutal honesty is usually more brutal than honest. The goal is not saying everything you think. It is being a person whose words can be trusted and whose truth-telling makes people better, not bleeding.",
        ],
        questions: [
          "Where do you edit yourself the most, and who actually knows the unedited version?",
          "Is there a difference between lying and letting people believe something false about you?",
          "When has someone told you a hard truth in a way you could receive? What made it work?",
        ],
        activity:
          "Each person answers one question out loud with zero image management: what is one thing about your week that you would normally not mention because it makes you look bad? Everyone answers, parents included and parents first. No one responds with advice. Just thank each person for the truth.",
      },
      mixed: {
        teaching: [
          "Paul says we should put away lying and speak truth to each other for one reason. We belong to each other. A family is like one body. If the hand lies to the eye, the whole body gets hurt. Every honest word makes this house safer. Every lie, even a small one, makes it less safe.",
          "Honesty has to be safe to survive. If telling the truth always brings an explosion, people stop telling it. So tonight we make each other a promise. In this family, the truth will always be received better than a lie. Trouble may still come, but truth will never make it worse.",
        ],
        questions: [
          "Is it easy or hard to tell the truth in our family? Be honest about that too.",
          "Why does a lie hurt the person who hears it, even a small lie?",
          "What can we do as a family to make truth-telling easier?",
        ],
        activity:
          "Make a family truth promise. Together, agree on one sentence, something like: In this house the truth is always safe to tell. Have everyone repeat it. Parents add this out loud: if you tell us the truth, we will never punish you harder for having told it.",
      },
    },
  },
  Prayer: {
    passage: "Matthew 6:9-11 (KJV)",
    passageText:
      "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name. Thy kingdom come. Thy will be done in earth, as it is in heaven. Give us this day our daily bread.",
    bigIdea: "Prayer is not a performance for people. It is a child talking to a Father who already loves them.",
    prayer:
      "Our Father in heaven, thank You that we do not have to impress You with long words. You taught us how to pray, and You want to hear us more than we want to talk. Teach this family to pray, simply and often, about real things. Give us this day our daily bread. Amen.",
    bands: {
      young: {
        teaching: [
          "Jesus taught His friends how to pray, and He started with two wonderful words. Our Father. Praying is not hard, and you do not need special words. It is talking to God like a child talks to a daddy who loves them. You can thank Him, ask Him for help, and tell Him anything. He is never too busy, and He never falls asleep while you are talking.",
        ],
        questions: [
          "What would you like to tell God tonight?",
          "What do you want to ask God for help with?",
          "When is a good time for you to talk to God every day?",
        ],
        activity:
          "Teach a hand prayer. Thumb points to your heart: thank You, God. Pointer finger: please help someone else. Middle finger, the tallest: God, You are the biggest. Ring finger: help my family. Pinky, the smallest: help me. Pray it together once, with each person saying one finger.",
      },
      elementary: {
        teaching: [
          "Right before Jesus taught the Lord's Prayer, He warned about two ways prayer goes wrong. Some people prayed loudly on street corners to be seen. Others piled up many words, thinking God charges by the syllable. Jesus said no to both. Your Father already knows what you need. Prayer is not a show and it is not a vending machine.",
          "Then He gave a prayer so short you can say it in twenty seconds. It starts with who God is, Our Father. It asks for His will before our wants. And it asks for daily bread, which means ordinary things, food, help, today's needs. You are allowed to pray about small things. The same prayer that says hallowed be thy name also says give us bread.",
        ],
        questions: [
          "Why do you think Jesus said to ask for bread for today instead of bread for the whole year?",
          "Does prayer ever feel like saying the right words instead of really talking? What would just talking sound like?",
          "What is one ordinary thing you could ask God for tomorrow morning?",
        ],
        activity:
          "Pray the Lord's Prayer together one line at a time. After each line, stop, and one family member says that line in their own words. Our Father becomes God, You are like a dad to us. Keep going to the end. You just learned to pray.",
      },
      teens: {
        teaching: [
          "Before Jesus gives a single word of the Lord's Prayer, He clears away two corruptions. The first is prayer as performance, the street-corner prayer designed for an audience. The second is prayer as technique, the pagan instinct that enough words, said correctly, will move the machinery of heaven. Both turn prayer into a way to work an audience, human or divine. Jesus replaces both with one word. Father. Prayer is not performance or technique. It is relationship.",
          "Look at the architecture of the prayer itself. It begins with God, His name, His kingdom, His will, before it mentions a single human need. That order is not decoration. It is medicine for the self that wakes up every morning convinced it is the center of the universe. Praying this way daily slowly reorders your loves. Then, and only then, daily bread, forgiveness, protection. The needs are real and Jesus makes room for all of them. But they come second, and the sequence is the point.",
          "If prayer feels dead to you, you are in good company, and the answer is usually not more feeling but more honesty. The Psalms include rage, doubt, and despair, all addressed directly to God. He would rather hear your real anger than your fake reverence. Start where you actually are. That is the only place anyone has ever started.",
        ],
        questions: [
          "Be honest: when you pray, who is the audience? God, or some version of yourself watching yourself?",
          "Why does Jesus put God's name and will before our needs? What would change if your prayers ran in that order?",
          "What is the most honest thing you are not saying to God right now?",
        ],
        activity:
          "Set a phone timer for four minutes. Spend it in silence, everyone praying the Lord's Prayer slowly in their head, one line at a time, putting their own week into each line. When the timer goes, each person shares which line was hardest to mean. Answer honestly.",
      },
      mixed: {
        teaching: [
          "When Jesus' friends asked Him how to pray, He did not give them a technique. He gave them a Father. Our Father, the prayer begins, and everything else follows from those two words. You do not have to be old enough, smart enough, or holy enough to pray. You have to be a child talking to a parent. Everyone at this table qualifies.",
          "The prayer He taught asks for big things, God's kingdom, God's will, and small things, bread for today. That means nothing in our family's life is too small to pray about and nothing is too big. The math test and the medical test both fit.",
        ],
        questions: [
          "What is one big thing and one small thing our family should pray about this week?",
          "Why do you think Jesus told us to call God Our Father instead of something fancier?",
          "When could our family pray together every day, even for one minute?",
        ],
        activity:
          "Pray the Lord's Prayer together out loud, all voices at once, even the ones still learning the words. Then go around once: each person adds one sentence of their own to God, anything at all. The youngest goes last so they can copy the others.",
      },
    },
  },
  Generosity: {
    passage: "2 Corinthians 9:7 (KJV)",
    passageText:
      "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.",
    bigIdea: "God loves a cheerful giver, because giving with joy is how we become like Him.",
    prayer:
      "Father, everything we have came from You first. Forgive us for holding our things tightly, as if we made them ourselves. Teach this family to give the way You give, freely and with joy. Show each of us one place to be generous this week, and make us glad to do it. Amen.",
    bands: {
      young: {
        teaching: [
          "God gives us everything. Our food, our home, our family. And God loves it when we share, not because we have to, but because sharing makes us like Him. The Bible says God loves a cheerful giver. Cheerful means happy. Giving with a happy heart, not a grumpy one. When we share and it makes us smile, we are acting just like God.",
        ],
        questions: [
          "What is something you really like to share? What is something hard to share?",
          "How do you feel when someone shares with you?",
          "Who could you share with this week?",
        ],
        activity:
          "Have each child pick one toy or book they like, not a broken one, to give away to a friend or to donate. Put it by the door tonight. Talk about the difference between giving away what we do not want and giving what is actually good.",
      },
      elementary: {
        teaching: [
          "Paul says each person should give what they decided in their heart, not grudgingly or because they have to, for God loves a cheerful giver. Notice that God cares about the how, not just the how much. A big gift given with a groan and a small gift given with joy are not the same in His eyes. He is after your heart, not your wallet.",
          "Why does giving matter so much? Because money and stuff are where our hearts hide. Jesus said where your treasure is, your heart goes too. Every act of giving pries our fingers open a little. People who give regularly slowly become free people. People who only collect slowly become owned by their things.",
        ],
        questions: [
          "What is the difference between giving because you have to and giving because you want to?",
          "Have you ever given something and felt happy afterward? What was it?",
          "Is there anything you own that would be hard to give up? Why that thing?",
        ],
        activity:
          "Family generosity plan, five minutes. Decide together on one act of giving for this week: money to church or a cause, a meal for a neighbor, outgrown clothes, or an afternoon of someone's time. Pick the day, write it down where everyone can see it, and pray over it tonight.",
      },
      teens: {
        teaching: [
          "Paul is raising famine relief for Jerusalem when he writes this, and his fundraising method is strange. He refuses to pressure anyone. Each person should give as they have decided in their heart, not reluctantly or under compulsion, for God loves a cheerful giver. Forced generosity is a contradiction. God could have taxed us. Instead He invites us, because the goal was never the money. The goal is the kind of person giving makes you.",
          "Look one verse earlier at the principle. Whoever sows sparingly reaps sparingly. Paul borrows farm logic. No farmer holds back seed to keep it safe, because hoarded seed is just slow rot. Seed only becomes anything when it leaves your hand. The same is true of money, time, and ability. What you keep stays small. What you give multiplies in directions you cannot trace.",
          "Be suspicious of the version of this that gets preached as an investment scheme, give so God will make you rich. That is just greed wearing a choir robe. Paul promises sufficiency, not luxury, enough so that you can keep being generous. The reward of giving is mostly that you become a giver, which is to say, you start to resemble God. He gave first and gave most.",
        ],
        questions: [
          "What do you actually spend your money on, and what does that say about what you treasure?",
          "Why does cheerfulness matter to God? Why is a resentful gift worth less?",
          "What would generosity look like for someone your age with little money? What else do you have to give?",
        ],
        activity:
          "Each person does a sixty-second audit out loud: roughly where did your money and free time go this past month? Then each person names one specific gift for this week, an amount, an hour, or an ability, and tells the family so they can ask about it next week.",
      },
      mixed: {
        teaching: [
          "Everything in this house came from God before it came from us. The paycheck, the groceries, the toys, the time. Paul says we should each decide to give, and then give cheerfully, because God loves a cheerful giver. Not a guilty giver. Not a show-off giver. A cheerful one.",
          "Generosity is something families learn together, like a language. Children learn it by watching parents give. Parents relearn it by watching children share with no math involved. The question for our family is not whether we can afford to give. It is what kind of family we want to be.",
        ],
        questions: [
          "When has someone been generous to our family? What did it feel like?",
          "What do we have a lot of in this house that someone else needs?",
          "What is one way our whole family could give together this month?",
        ],
        activity:
          "The give-away walk. Take five minutes and walk through the house together with one bag. Each person puts in one good thing they own to give away, parents included. Set the bag by the door and decide together where it goes.",
      },
    },
  },
  Patience: {
    passage: "James 5:7-8 (KJV)",
    passageText:
      "Be patient therefore, brethren, unto the coming of the Lord. Behold, the husbandman waiteth for the precious fruit of the earth, and hath long patience for it, until he receive the early and latter rain. Be ye also patient; stablish your hearts: for the coming of the Lord draweth nigh.",
    bigIdea: "Patience is trusting God's timing the way a farmer trusts the rain.",
    prayer:
      "Lord, we are a family in a hurry, and You are a God who is never rushed. Forgive our complaining when things take longer than we want. Teach us to wait like the farmer waits, doing our work and trusting You with the timing. Settle our hearts, because You are coming, and You are never late. Amen.",
    bands: {
      young: {
        teaching: [
          "Waiting is hard. We wait for birthdays, we wait for dinner, we wait in the car. The Bible says a farmer plants a seed and then waits a long, long time for the rain and the fruit. He cannot make it grow faster by yelling at it. He trusts that God sends the rain. We can wait like the farmer, because God always remembers us, and He is never ever late.",
        ],
        questions: [
          "What is the hardest thing for you to wait for?",
          "What does the farmer do while he waits? Does he dig up the seed to check it?",
          "Who helps you when waiting feels too long?",
        ],
        activity:
          "The quiet minute game. Everyone sits still and silent, and each person raises their hand when they think one minute has passed. See who is closest. Then talk: a minute feels long when you are waiting. The farmer waits months. God helps us wait.",
      },
      elementary: {
        teaching: [
          "James tells impatient people to look at a farmer. He plants seed, and then he waits for rain he cannot make fall, through weeks where nothing seems to be happening at all. But under the dirt, everything is happening. The seed is doing exactly what it should. The farmer's job is not to make it grow. His job is to do his part and trust the timing.",
          "James says stablish your hearts, which means make them steady, plant them like a post. Impatience is really a kind of unbelief. It whispers that God forgot, that nothing is happening, that we must grab control. The farmer knows better. Slow is not the same as stuck. Some of the best things God grows in you, He grows slowly on purpose.",
        ],
        questions: [
          "What are you waiting for right now that is taking too long?",
          "Why is it silly for the farmer to dig up his seed every day to check on it?",
          "Can you think of something good in your life that took a long time to come?",
        ],
        activity:
          "If you have any dried beans or seeds in the kitchen, put one on a wet paper towel in a cup on the windowsill and check it every day this week. If not, plant a question instead: write down one thing your family is waiting on, fold the paper, and open it in one month to see what God did.",
      },
      teens: {
        teaching: [
          "James writes to poor field workers being cheated by rich landowners, and his counsel sounds almost offensive at first. Be patient. But the word he uses is not passive. It means long-tempered, the opposite of short-tempered, a fuse that does not blow. And his example is a farmer, which matters, because the farmer's patience is not idleness. He plows, plants, fences, repairs. He does everything in his power and then trusts God with the one thing that is not, the rain.",
          "That is the actual shape of Christian patience. It is not pretending you do not want things, and it is not doing nothing. It is doing your full work while refusing to seize what only God can give. Most of the damage people do in their twenties comes from refusing to wait, for the relationship, the recognition, the shortcut money. Hurry is how good desires become disasters.",
          "James anchors patience in one fact: the coming of the Lord draws near. History is not a treadmill. It is a pregnancy. Something is on the way, and every injustice and every delay has an expiration date. You can afford to be patient if the story actually ends well. You cannot afford it otherwise, which is why a culture that has stopped believing in the end of the story cannot wait for anything.",
        ],
        questions: [
          "What are you most impatient for right now, and what would grabbing it early cost?",
          "What is the difference between waiting passively and waiting like the farmer?",
          "Do you actually believe the story ends well? How would your hurry change if you did?",
        ],
        activity:
          "Each person names one thing they want that they cannot have yet. College, a license, a relationship, a result. For each one, the family answers two questions together: what is the work you can do now, and what is the rain, the part only God controls? Name both out loud.",
      },
      mixed: {
        teaching: [
          "James says to wait like a farmer. The farmer plants, then waits months for rain and harvest, and all his stomping and sighing cannot speed up one tomato. Our family knows about waiting too. Little ones wait for birthdays. Big ones wait for answers to prayers that are taking years. The waiting comes in different sizes, but it is the same lesson.",
          "Here is what the farmer knows. Waiting is not wasted time. Things grow in the waiting, under the surface, where nobody can see. God is doing the same in each of us, and in this family. He is never late. He is growing something.",
        ],
        questions: [
          "What is each person in this family waiting for right now? Everyone answers.",
          "Why can the farmer relax while he waits? What does he know?",
          "How can we help each other when waiting gets hard this week?",
        ],
        activity:
          "Make a family waiting list. On one piece of paper, write down one thing each person is waiting for, from the smallest birthday to the biggest prayer. Stick it on the fridge. Whenever one gets answered, cross it off together and thank God at dinner.",
      },
    },
  },
  "Identity in Christ": {
    passage: "1 Peter 2:9 (KJV)",
    passageText:
      "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light.",
    bigIdea: "You are not what others say about you. You are who God says you are, chosen and His.",
    prayer:
      "Father, the world tells each of us who we are all day long, and most of it is not true. Thank You that the deepest word over our lives belongs to You. Chosen. Royal. Holy. Yours. Help every person at this table believe Your word about them more than any other voice. Amen.",
    bands: {
      young: {
        teaching: [
          "Do you know who you are? The Bible says that if you belong to Jesus, you are chosen. That means God picked you, like being picked first for a team. He calls you His own special treasure. Other kids might say unkind things sometimes, but they do not get to decide who you are. God already decided. You are His, and He brought you out of the dark into His wonderful light.",
        ],
        questions: [
          "How does it feel to be picked first for something?",
          "What does God call you? Can you remember one word from the verse?",
          "What should you remember when someone says something unkind to you?",
        ],
        activity:
          "The name game. Each family member sits in the middle one at a time, and everyone else says one true, good thing about them. Then a parent says over each child: God chose you, and you are His. Let everyone, including parents, take a turn in the middle.",
      },
      elementary: {
        teaching: [
          "Peter writes to Christians who were being mocked and left out for their faith, and he gives them new names. Chosen. Royal priesthood. Holy nation. God's own people. These were Israel's titles, and now Peter hands them to ordinary people, many of them poor, many of them nobodies in the eyes of their town. The world said worthless. God said treasured. Both could not be true, and Peter tells them which voice to believe.",
          "Everyone gets named by somebody. Kids at school hand out names, fast or slow, cool or weird, and those names try to stick. But the deepest name on you was given before any of that, by the One who made you and brought you out of darkness into His marvellous light. Your job, Peter says, is to show forth His praises, to live like someone who knows whose they are.",
        ],
        questions: [
          "What names or labels do kids give each other at school? Do they stick?",
          "Which of God's names for you is your favorite: chosen, royal, holy, or His own?",
          "How would you act differently this week if you really believed God chose you?",
        ],
        activity:
          "Label trade. Each person says out loud one unkind name or label they have been given, by others or by themselves. After each one, the family answers together: That is not your name. You are chosen. Go around until everyone has traded at least one label.",
      },
      teens: {
        teaching: [
          "Peter's readers were social outsiders, mocked, excluded, slandered for leaving the old gods. To people the empire treated as nothing, Peter writes the most extravagant identity statement in the New Testament. You are a chosen generation, a royal priesthood, a holy nation, God's own possession. Every title is shared, given, and unearned. Not one of them was achieved, voted on, or performed for. That is the structural difference between identity in Christ and every other identity on offer.",
          "Think about how identity works now. You assemble it, out of achievements, aesthetics, followers, the team you make or do not make, the scores that come back. Self-made identity has one fatal feature. Anything you build can be repossessed. The athlete is one injury from nobody. The straight-A identity is one bad semester from collapse. The philosopher Charles Taylor calls this the exhausting condition of the modern self, endlessly performing a self it must also invent. Peter's word cuts across all of it. Your deepest identity is not built. It is given.",
          "Notice the purpose clause, though, because this is not just comfort. You were named so that you would show forth the praises of Him who called you out of darkness. Identity in Christ is not a participation trophy. It is a commission. People who know who they are become free to stop performing and start serving, because they no longer need every room to tell them they matter. They already know.",
        ],
        questions: [
          "Where do you currently get your sense of being worth something, and what happens to you when that source has a bad week?",
          "What is the difference between an identity you build and an identity you are given?",
          "If you fully believed you were chosen and royal, what would you stop doing? What would you start?",
        ],
        activity:
          "Each person names the identity they lean on most. Athlete, smart one, funny one, the responsible one, whatever is true. Then each person answers one question honestly: what happens to you when that identity fails for a week? Close with one person reading 1 Peter 2:9 over the family, slowly.",
      },
      mixed: {
        teaching: [
          "Everyone in this family gets told who they are, all day long. Grades tell us. Teams tell us. Mirrors and screens and other people tell us. Peter writes to people who were being told they were nothing, and he says no. You are chosen. You are royal. You are holy. You are God's own people. God's word about you goes deeper than every other word.",
          "This is true for the youngest person at this table and the oldest. Nobody here earned it, and nobody here can lose it by having a bad week. Our family's job is to remind each other when we forget. And we will all forget.",
        ],
        questions: [
          "What is one thing the world says about you that you have a hard time not believing?",
          "Which of God's four names from the verse do you need most this week?",
          "How can we remind each other who we are when someone in this family forgets?",
        ],
        activity:
          "Family circle. One at a time, each person sits in the middle. The rest of the family says together: You are chosen. You are God's own. Then each person adds one true good thing they see in them. Everyone gets a turn, parents too.",
      },
    },
  },
  Obedience: {
    passage: "John 14:15 (KJV)",
    passageText: "If ye love me, keep my commandments.",
    bigIdea: "Obedience is not how we earn God's love. It is what love for God looks like in motion.",
    prayer:
      "Lord Jesus, You said that if we love You, we will keep Your commandments. We confess that we often want Your love without Your commands. Forgive us. Help each of us obey You this week in one real way, not to earn anything, but because we love You. And let our obeying start at home. Amen.",
    bands: {
      young: {
        teaching: [
          "Jesus said, if you love me, keep my commandments. That means obeying is a way of loving. When you obey Mom or Dad the first time, with a happy heart, you are showing love. It works the same with Jesus. We do not obey so God will love us. He already loves us. We obey because we love Him back. Obeying is love you can see.",
        ],
        questions: [
          "How do you show Mom or Dad that you love them without using words?",
          "Is it easier to obey someone you love? Why?",
          "What is one of Jesus' commands that you know?",
        ],
        activity:
          "Play a quick round of follow the leader around the living room, with a parent leading. Then ask: was it easier to follow because you trust the leader? Then say: Jesus is the best leader there is. Following Him is how we love Him.",
      },
      elementary: {
        teaching: [
          "Notice what Jesus did not say. He did not say, if you obey me, I will love you. He said, if you love me, keep my commandments. The order changes everything. Love comes first. Obedience flows out of it, the way a kid who loves soccer does not have to be forced to practice. Obedience without love is just rule-keeping, and Jesus was never after rule-keepers. He was after hearts.",
          "But the verse also cuts the other way. We cannot say we love Jesus and then ignore everything He said. Love that never obeys is just talk. The proof of love is not the feeling. It is the following. And here is good news: Jesus said this on the same night He promised to send the Holy Spirit as our Helper. He does not command us and then leave us alone to manage it.",
        ],
        questions: [
          "Which command of Jesus is hardest for you to obey? Be specific.",
          "Can someone say they love God and disobey Him all the time? Why not?",
          "What is the difference between obeying because you are scared and obeying because you love?",
        ],
        activity:
          "Pick one command of Jesus together. Love your enemies, forgive, tell the truth, do not worry. Write it on a scrap of paper and put it where the family will see it all week. Each night at dinner, ask: did anyone get a chance to obey it today?",
      },
      teens: {
        teaching: [
          "John 14:15 takes apart two opposite errors in a single sentence. The first error is legalism, the idea that obedience earns God's love. Jesus speaks these words at the Last Supper, hours before He pays for sins no one's obedience could cover. Love is settled before a single command is mentioned. The second error is sentimentalism, the idea that love for God is a feeling that requires nothing. If ye love me, keep my commandments. Love without obedience, in Jesus' grammar, is not love. It is a mood.",
          "Our culture believes obedience and freedom are opposites, that every command is oppression and the truest self emerges when all constraints fall away. Test that against anything real. The pianist who obeyed scales for ten years is the only one free to actually play. The athlete who obeyed training is the only one free on the field. Obedience to the right authority does not crush freedom. It creates it. The question is never whether you will obey something. Everyone obeys something. Appetites, peer approval, algorithms. The question is whether the thing you obey loves you.",
          "And Jesus does. That is what makes His commands different from raw power. The next verse promises the Spirit, a Helper, because He never intended obedience to be a solo performance. You will fail at it. The arrangement survives failure, because it rests on His love, not your record. But the direction of a life that loves Him will be obedience, the way the direction of a compass is north, even when the needle trembles.",
        ],
        questions: [
          "What do you actually obey right now? What voice or appetite or crowd has your reflexes trained?",
          "Where have you seen discipline produce freedom in your own life?",
          "Is there one command of Jesus you have been deliberately not looking at? What would obeying it cost?",
        ],
        activity:
          "Each person names one authority they obey without thinking. A group chat, a coach, a craving, an algorithm. Then each person names one command of Jesus they will deliberately obey this week, concretely, and says it to the family out loud. Specific enough to be asked about next week.",
      },
      mixed: {
        teaching: [
          "Jesus said, if you love me, keep my commandments. In a family we understand this fast, because home is where obedience is learned, and where it is hardest. Kids obey parents. Parents obey God. Everyone in this house is under authority, and that is not bad news. It is how love works when it gets up and moves.",
          "And remember the order. Jesus loves us first, before we obey one single thing. Then we obey because we love Him back. A house that runs on that order, love first, then obedience, feels completely different from a house that runs on rules alone.",
        ],
        questions: [
          "Why is obeying easier when you know the person loves you?",
          "Parents, answer honestly: what is hard for you about obeying God?",
          "What is one command of Jesus our whole family could work on together this week?",
        ],
        activity:
          "Role reversal. For five minutes, the kids give the family three good instructions, kind ones, like everyone hug someone or everyone say one nice thing, and the parents obey first, immediately and cheerfully. Then talk about it: parents obeying showed you what cheerful obedience looks like. That is what we all owe God.",
      },
    },
  },
  Hope: {
    passage: "Romans 15:13 (KJV)",
    passageText:
      "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.",
    bigIdea: "Hope is not wishful thinking. It is confidence in a God who keeps His promises.",
    prayer:
      "God of hope, fill this family with all joy and peace in believing, just like Your Word says. Some of us are tired, and some of us are worried about things we have not said out loud. Meet each one. Let our home overflow with hope, not because everything is fine, but because You are faithful. Amen.",
    bands: {
      young: {
        teaching: [
          "The Bible calls God the God of hope. Hope means knowing that God will keep His promises, the way you know morning will come even when the night is dark. When you feel sad or worried, God wants to fill you up with joy and peace, like filling a cup to the very top until it spills over. God never breaks a promise. Not one. That is why we can hope.",
        ],
        questions: [
          "What are you looking forward to right now?",
          "When you wake up in the dark, how do you know morning is coming?",
          "What is one promise God makes that helps you feel safe?",
        ],
        activity:
          "Bring a cup and a pitcher of water to the table. Slowly fill the cup while saying the verse: may the God of hope fill you with all joy and peace. Let it overflow a little into a bowl. Then say: that is what God wants to do with our family. Fill us until hope spills onto other people.",
      },
      elementary: {
        teaching: [
          "When the Bible says hope, it does not mean finger-crossing, like I hope it does not rain. Bible hope is being sure of something that has not happened yet, because the One who promised it has never broken His word. It looks forward the way you look forward to a birthday, certain it is coming, just not here yet.",
          "Notice where Paul says hope comes from. The God of hope fills you, through the power of the Holy Spirit. Hope is not something you squeeze out of yourself by trying to think positive. It is something God pours in. Your job is to hold your cup where He can fill it, by believing, by praying, by remembering what He has already done. And notice the word abound. God does not want you to have a teaspoon of hope. He wants it overflowing, enough to share.",
        ],
        questions: [
          "What is the difference between wishing for something and hoping in God?",
          "What has God already done, in the Bible or in our family, that helps you trust Him for the future?",
          "Who do you know who needs hope right now? How could our family share some?",
        ],
        activity:
          "Promise hunt, five minutes. As a family, list out loud as many promises of God as you can remember. He is with us, He forgives, He hears prayer, He is coming back. Count them on your fingers. Then pick the one your family needs most this month and say it together twice.",
      },
      teens: {
        teaching: [
          "Romans 15:13 is a benediction, but look at the logic before you let it sound nice. Paul calls God the God of hope and asks Him to fill believers with joy and peace in believing, so that they abound in hope by the power of the Holy Spirit. Hope here is not an emotion you generate. It is a result, with inputs. Believing leads to joy and peace, and joy and peace overflow into hope, and the entire chain runs on power that is not yours. If your hope has collapsed, the verse says to check the inputs, not to try harder at the output.",
          "Be precise about what hope is, because the word has been worn thin. Optimism says things will probably work out, and it dies on contact with evidence, which is why your generation, with more evidence scrolling past hourly than any generation in history, reports the least optimism. Biblical hope is different in kind. It is confidence about the future grounded in an event in the past. God raised Jesus from the dead. That either happened or it did not. If it did, then death, the worst fact in every human story, has already lost, and hope is not naive. It is realism with better information.",
          "This is why Christians can look directly at terrible things without flinching or pretending. We are not required to say everything happens for a reason, or that it is all fine. It is not all fine. We are people who believe the story turns, because we have seen it turn once, on the third day. Hope is living now in a way that only makes sense if that is true.",
        ],
        questions: [
          "Where does your generation look for hope, and how is that working?",
          "What is the actual difference between optimism and hope grounded in the resurrection?",
          "What is one area of your life where you have quietly stopped hoping? What would it mean to bring it back to God?",
        ],
        activity:
          "Each person names one thing about the future they are genuinely worried about. No minimizing allowed from anyone else. After all of them are on the table, one person reads Romans 15:13 out loud over the list. Then each person says one sentence: what would change about my worry if the resurrection is true?",
      },
      mixed: {
        teaching: [
          "Paul calls God the God of hope, and he prays that God would fill His people with joy and peace until hope overflows. Every family needs this, because every family carries worries. The little ones worry about little things that feel big. The big ones worry about big things they keep quiet. Hope is for all of it.",
          "Hope does not mean pretending everything is fine. It means knowing who holds tomorrow. God has kept every promise He has ever made, and He is not going to stop with our family. So tonight we trade our worries for His promises, out loud, together.",
        ],
        questions: [
          "What is one thing you are worried about? Everyone answers, and no one fixes anyone.",
          "What is one promise of God that covers that worry?",
          "How can our family give hope to someone outside this house this week?",
        ],
        activity:
          "Worry and promise trade. Go around the table. Each person says one worry, and the rest of the family answers with one promise of God or one true thing about Him. End by saying Romans 15:13 together, with your family's name added: may the God of hope fill this family.",
      },
    },
  },
};

const THEME_NAMES = Object.keys(THEMES);

const SECTION_LABEL: React.CSSProperties = {
  fontFamily: "var(--U)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--mustard-text)",
  marginBottom: "10px",
};

export default function FamilyDevotionBuilder() {
  const [band, setBand] = useState<BandId | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const themeData = theme ? THEMES[theme] : null;
  const bandContent = themeData && band ? themeData.bands[band] : null;
  const bandLabel = band ? AGE_BANDS.find((b) => b.id === band)?.label ?? "" : "";

  const handleReset = () => {
    setBand(null);
    setTheme(null);
    setCopied(false);
    setCopyFailed(false);
  };

  const handleCopy = async () => {
    if (!themeData || !bandContent || !theme) return;
    const text = [
      `Family Devotion: ${theme} (${bandLabel})`,
      `Read: ${themeData.passage}`,
      `"${themeData.passageText}"`,
      `Big Idea: ${themeData.bigIdea}`,
      "Teach:",
      ...bandContent.teaching,
      "Ask:",
      ...bandContent.questions.map((q, i) => `${i + 1}. ${q}`),
      `Do: ${bandContent.activity}`,
      `Pray: ${themeData.prayer}`,
      "From LiveWell by James Bell (livewellbyjamesbell.co/tools/family-devotions)",
    ].join("\n\n");
    const ok = await copyToClipboard(text);
    if (!ok) {
      setCopyFailed(true);
      return;
    }
    setCopyFailed(false);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pillStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "var(--U)",
    fontSize: "13px",
    fontWeight: 600,
    padding: "12px 18px",
    borderRadius: "999px",
    cursor: "pointer",
    border: `1px solid ${active ? "var(--mustard)" : "var(--border)"}`,
    background: active ? "var(--bone-warm)" : "transparent",
    color: "var(--ink)",
    transition: "all 0.2s",
  });

  return (
    <Layout>
      <SEOMeta
        title="Family Devotion Builder — 15-Minute Devotions by Age and Theme"
        description="Build a complete 15-minute family devotion in seconds. Pick your kids' ages and a theme, and get Scripture, teaching, discussion, an activity, and a prayer."
        keywords="family devotions, family devotion builder, devotions for kids, family worship, devotions by age, Bible activities for children, devotions for teens, family Bible time"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Family Devotion Builder",
          description:
            "Pick your kids' ages and a theme and get a complete 15-minute devotion with Scripture, teaching, an activity, and a prayer.",
          url: "https://www.livewellbyjamesbell.co/tools/family-devotions",
          applicationCategory: "ReligiousApp",
          offers: { "@type": "Offer", price: "0" },
        }}
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "80px 32px 60px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color: "var(--mustard)", marginBottom: "16px", textTransform: "uppercase" }}>
            Free Tool
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Family Devotion <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>Builder</em>
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "56ch", margin: "0 auto" }}>
            Pick your kids' ages and a theme. Get a complete 15-minute devotion with Scripture, teaching, three questions, an activity, and a prayer. Made for the table or the couch.
          </p>
        </div>
      </section>

      {/* BUILDER */}
      <section style={{ background: "var(--bone)", padding: "48px 32px 80px" }}>
        <div className="wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* STEP 1: AGE BAND */}
          <div style={{ marginBottom: "36px" }}>
            <div style={SECTION_LABEL}>Step 1 · Who is at the table?</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {AGE_BANDS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => { setBand(b.id); setCopied(false); setCopyFailed(false); }}
                  style={pillStyle(band === b.id)}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: THEME */}
          <div style={{ marginBottom: "44px", opacity: band ? 1 : 0.45, transition: "opacity 0.2s" }}>
            <div style={SECTION_LABEL}>Step 2 · What does your family need this week?</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
              {THEME_NAMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  disabled={!band}
                  onClick={() => { setTheme(t); setCopied(false); setCopyFailed(false); }}
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "14px",
                    fontWeight: 500,
                    padding: "16px 12px",
                    borderRadius: "8px",
                    cursor: band ? "pointer" : "default",
                    border: `1px solid ${theme === t ? "var(--mustard)" : "var(--border)"}`,
                    background: theme === t ? "var(--bone-warm)" : "var(--card, #FFFFFF)",
                    color: "var(--ink)",
                    textAlign: "center",
                    transition: "all 0.2s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* OUTPUT */}
          {themeData && bandContent && theme ? (
            <div style={{ background: "#FFFFFF", border: "1px solid var(--border)", borderTop: "4px solid var(--mustard)", borderRadius: "10px", padding: "40px 36px" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "6px" }}>
                {bandLabel} · About 15 minutes
              </div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 400, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: "28px" }}>
                {theme}
              </h2>

              {/* READ */}
              <div style={{ marginBottom: "28px" }}>
                <div style={{ ...SECTION_LABEL, display: "flex", alignItems: "center", gap: "8px" }}>
                  <BookOpen size={14} aria-hidden style={{ color: "var(--mustard)" }} /> Read
                </div>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" }}>{themeData.passage}</p>
                <p style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.6, color: "var(--ink)", fontStyle: "italic", margin: 0 }}>
                  {themeData.passageText}
                </p>
              </div>

              {/* BIG IDEA */}
              <div style={{ marginBottom: "28px", padding: "18px 20px", background: "var(--bone)", borderLeft: "3px solid var(--mustard)", borderRadius: "0 6px 6px 0" }}>
                <div style={{ ...SECTION_LABEL, marginBottom: "6px" }}>Big Idea</div>
                <p style={{ fontFamily: "var(--F)", fontSize: "18px", lineHeight: 1.5, color: "var(--ink)", margin: 0 }}>{themeData.bigIdea}</p>
              </div>

              {/* TEACH */}
              <div style={{ marginBottom: "28px" }}>
                <div style={{ ...SECTION_LABEL, display: "flex", alignItems: "center", gap: "8px" }}>
                  <Users size={14} aria-hidden style={{ color: "var(--mustard)" }} /> Teach
                </div>
                {bandContent.teaching.map((p, i) => (
                  <p key={i} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", margin: i === 0 ? 0 : "14px 0 0", maxWidth: "68ch" }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* ASK */}
              <div style={{ marginBottom: "28px" }}>
                <div style={{ ...SECTION_LABEL, display: "flex", alignItems: "center", gap: "8px" }}>
                  <MessageCircle size={14} aria-hidden style={{ color: "var(--mustard)" }} /> Ask
                </div>
                <ol style={{ margin: 0, paddingLeft: "20px" }}>
                  {bandContent.questions.map((q, i) => (
                    <li key={i} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: i === bandContent.questions.length - 1 ? 0 : "10px" }}>
                      {q}
                    </li>
                  ))}
                </ol>
              </div>

              {/* DO */}
              <div style={{ marginBottom: "28px" }}>
                <div style={{ ...SECTION_LABEL, display: "flex", alignItems: "center", gap: "8px" }}>
                  <Hand size={14} aria-hidden style={{ color: "var(--mustard)" }} /> Do
                </div>
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", margin: 0, maxWidth: "68ch" }}>
                  {bandContent.activity}
                </p>
              </div>

              {/* PRAY */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{ ...SECTION_LABEL, display: "flex", alignItems: "center", gap: "8px" }}>
                  <HeartHandshake size={14} aria-hidden style={{ color: "var(--mustard)" }} /> Pray
                </div>
                <p style={{ fontFamily: "var(--F)", fontSize: "16px", fontStyle: "italic", lineHeight: 1.7, color: "var(--ink-muted)", borderLeft: "2px solid var(--mustard)", paddingLeft: "16px", margin: 0, maxWidth: "68ch" }}>
                  {themeData.prayer}
                </p>
              </div>

              {/* ACTIONS */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
                <button
                  type="button"
                  onClick={handleCopy}
                  style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", background: "var(--mustard)", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: 600, fontFamily: "var(--U)", color: "var(--charcoal)", cursor: "pointer" }}
                >
                  {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy Devotion</>}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", background: "transparent", border: "1px solid var(--border)", borderRadius: "6px", fontSize: "13px", fontWeight: 600, fontFamily: "var(--U)", color: "var(--ink)", cursor: "pointer" }}
                >
                  <RotateCcw size={14} /> Pick Another
                </button>
              </div>
              {copyFailed && (
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "12px 0 0" }}>
                  Copy failed — select and copy manually.
                </p>
              )}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--ink-muted)" }}>
              <Users size={44} aria-hidden style={{ margin: "0 auto 14px", opacity: 0.3, display: "block" }} />
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", margin: 0 }}>
                {band ? "Now choose a theme." : "Start by choosing who is at the table."}
              </p>
            </div>
          )}

          {/* FOOTNOTE */}
          <p style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", marginTop: "32px", lineHeight: 1.6 }}>
            Scripture quotations are from the King James Version, public domain. Looking for a full year of weekly devotions?{" "}
            <Link href="/family/devotions" style={{ color: "var(--mustard-text)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              See the Family Devotions library
            </Link>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
}
