import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { ArrowLeft, Users, ChevronRight } from "lucide-react";

interface AgeGroup {
  id: string;
  label: string;
  range: string;
  needs: { title: string; description: string }[];
  talkAboutGod: string[];
  mistakes: { mistake: string; why: string; instead: string }[];
  practice: { title: string; description: string };
}

const AGE_GROUPS: AgeGroup[] = [
  {
    id: "toddler",
    label: "Toddler",
    range: "Ages 1--3",
    needs: [
      {
        title: "Safety as theology",
        description:
          "Your toddler cannot understand doctrine, but they are already learning the most important theological lesson there is: whether the world is safe. Every time you respond to their cry, you are preaching a sermon about a God who does not abandon. Consistency here is not parenting technique. It is incarnation.",
      },
      {
        title: "Rhythm over content",
        description:
          "Toddlers cannot process information. They process pattern. A prayer before meals, a song before bed, the same three words every night -- 'God loves you' -- these rhythms build a grammar of faith before the child has any vocabulary for it.",
      },
      {
        title: "Naming the world as gift",
        description:
          "When your two-year-old points at the moon and waits for you to say something, that is not a teaching moment. It is a worship moment. Say 'God made that.' Not as curriculum. As wonder. The child who learns to see the world as made is already doing theology.",
      },
      {
        title: "Emotional regulation through presence",
        description:
          "When a toddler melts down, they are not sinning. They are overwhelmed by a nervous system they cannot control. Your calm presence in the storm is the first experience they will have of what the Psalms call 'a refuge and strength.' They will not remember what you said. They will remember that you stayed.",
      },
    ],
    talkAboutGod: [
      "Use the same short phrases every day. 'God made you. God loves you. God is with you.' Repetition is not laziness at this age. It is liturgy. The phrases become part of the child's inner architecture before they can analyze them.",
      "Point to creation, not abstraction. When your toddler touches grass, say 'God made this.' When they hear thunder, say 'God is big.' Theology at this age is sensory. It comes through fingers and ears and the smell of dinner, not through explanation.",
      "Pray out loud in front of them, even though they do not understand the words. 'Thank You, God, for this food. Thank You for our family.' They are learning that there is Someone their parent talks to who is not in the room. That mystery is enough for now.",
      "When they are afraid at night, do not explain away the fear. Say 'God is here in the dark with you' while you hold them. The holding is the proof.",
    ],
    mistakes: [
      {
        mistake: "Expecting comprehension instead of building association",
        why: "Parents read a children's Bible and expect the toddler to 'get it.' The toddler does not get it. They are not supposed to. What they are getting is the association: this book, this voice, this lap, this warmth -- all of it connected to God. That association matters more than comprehension at this stage.",
        instead:
          "Read the same simple Bible story every night for a week. Let the repetition do the work. The goal is not that they understand the story of Noah. The goal is that the word 'God' is wrapped in the experience of being held.",
      },
      {
        mistake: "Using God as a behavior management tool",
        why: "It is tempting to say 'God is watching you' or 'Jesus is sad when you hit.' This works in the short term because toddlers are wired for approval. But it builds a surveillance theology that will collapse under its own weight by adolescence. The child learns that God is a disappointed observer, not a present father.",
        instead:
          "Discipline without theologizing the correction. Say 'We do not hit because hitting hurts' -- not 'God does not like it when you hit.' Save God's name for moments of love and wonder, not punishment.",
      },
      {
        mistake: "Overcomplicating prayer",
        why: "Parents feel pressure to teach 'real' prayer. But a toddler who says 'Thank you, God, for trucks' has just prayed with more sincerity than most adult prayers. The instinct to correct or elevate their prayers teaches them that their words are not good enough for God.",
        instead:
          "Let them pray in their own words, even if those words are about their blanket or their dog. Affirm every attempt. 'That was a great prayer.' They are learning that God listens to them. That is the whole point.",
      },
    ],
    practice: {
      title: "The Bedtime Benediction",
      description:
        "Every night this week, after the last story and before you turn out the light, place your hand on your child's head and say the same three sentences: 'God made you. God loves you. God is with you tonight.' Do not vary it. Do not explain it. The repetition becomes a anchor they will carry in their body long after they leave your house. You are not teaching them theology. You are giving them a blessing -- the same one Aaron spoke over Israel in Numbers 6. And a blessing, unlike a lesson, does not require understanding to do its work.",
    },
  },
  {
    id: "preschool",
    label: "Preschool",
    range: "Ages 4--5",
    needs: [
      {
        title: "A God who is not afraid of their questions",
        description:
          "Preschoolers ask 'why' about everything, including God. 'Why did God make mosquitoes?' 'Where does God sleep?' These are not disruptions to your spiritual instruction. They are the beginning of it. A child who learns that their questions are welcome in the presence of God will still be asking questions at forty -- and that is the goal.",
      },
      {
        title: "Story over proposition",
        description:
          "The preschool brain thinks in narrative, not abstraction. 'God is sovereign' means nothing to a four-year-old. But 'David was a little boy and the giant was very big, and God was with David' -- that lands. Every theological truth you want them to hold can be carried by a story at this age. If you cannot find the story, the truth can wait.",
      },
      {
        title: "Moral imagination, not moral compliance",
        description:
          "Four-year-olds are beginning to understand right and wrong, but they learn it through imagination, not rules. When they pretend to be a doctor who helps the sick or a firefighter who rescues people, they are rehearsing the shape of a life oriented toward others. That imaginative play is moral formation. Protect it.",
      },
      {
        title: "A parent who admits they do not know",
        description:
          "When your preschooler asks where Grandma went after she died and you say 'I do not know exactly, but I know God is taking care of her,' you have just done something more important than giving an answer. You have modeled theological honesty. They need to see that faith and uncertainty can live in the same sentence.",
      },
    ],
    talkAboutGod: [
      "Answer their 'why' questions honestly, even when the honest answer is 'I do not know.' 'Why did God let the bird die?' Try: 'I think God is sad about that too. The world is not the way God wants it to be yet.' That is more theologically accurate than any tidy answer you could manufacture.",
      "Tell Bible stories with emotion, not just information. When David faces Goliath, let your voice get quiet. When Jonah is in the fish, make it dark and scary. Preschoolers learn theology through tone. A flat retelling of the Exodus is just a story. A retelling where your voice breaks when the Red Sea opens -- that is proclamation.",
      "Connect God to things they already care about. If your child loves animals: 'God made every one of those animals and knows each one by name.' If they love building: 'God is building something too -- a big family that includes you.' Theology at this age is translation, not instruction.",
      "Start a 'God sighting' practice. At dinner, ask: 'Where did you see God today?' The first few times they will stare at you. Then one night they will say 'I saw God when Ella shared her snack with me.' That is Christology at the preschool level, and it is exactly right.",
    ],
    mistakes: [
      {
        mistake: "Making God the answer to every fear without sitting in the fear first",
        why: "When a preschooler says 'I am scared of the dark,' the instinct is to say 'God is with you, so you do not need to be scared.' But this teaches them that faith eliminates fear, which is not true and will not hold. Jesus was afraid in Gethsemane. Fear and faith coexist.",
        instead:
          "First acknowledge the fear: 'The dark can be scary. I understand that.' Then, after the feeling is named and honored: 'And God is in the dark with you, even when you cannot see Him.' The order matters. Validation before theology.",
      },
      {
        mistake: "Turning every moment into a Bible lesson",
        why: "Some parents feel guilty if a day passes without explicit spiritual instruction. So every car ride becomes a lesson, every meal becomes a catechism. The child learns that faith is exhausting and omnipresent in the worst way -- not as a living reality but as a curriculum they cannot escape.",
        instead:
          "Let most moments be ordinary. Faith is not always spoken. Sometimes faith is a parent who plays with their child without an agenda, who laughs at a silly joke, who is simply present. The incarnation means God entered the ordinary. Let your parenting do the same.",
      },
      {
        mistake: "Presenting a God with no edges",
        why: "The instinct to protect preschoolers from anything difficult means some parents present a God who is only nice, only gentle, only smiling. But children need a God who is big enough to be a little frightening. A God who parts oceans and speaks from fire and raises the dead. If God is only gentle, God is not interesting. And a boring God will not survive elementary school.",
        instead:
          "Include the big, dramatic stories alongside the gentle ones. Tell them about the burning bush. Tell them about the storm Jesus calmed. Let them feel the bigness of God. A four-year-old who says 'God is really powerful' has just made a confession of faith.",
      },
    ],
    practice: {
      title: "The 'I Wonder' Jar",
      description:
        "Get a jar or a box. This week, every time your preschooler asks a question about God -- any question -- write it on a slip of paper and put it in the jar together. 'Why is the sky blue?' 'Does God have a dog?' 'Where was God before God?' Do not answer them in the moment. Just say 'That is a great wonder. Let us put it in the jar.' On Sunday, pull out one slip and talk about it together. You are teaching them that questions are not problems to solve but gifts to carry. You are building a home where curiosity about God is rewarded, not corrected. And some of the questions in that jar will be better than anything you hear in seminary.",
    },
  },
  {
    id: "elementary",
    label: "Elementary",
    range: "Ages 6--10",
    needs: [
      {
        title: "A faith that can handle their growing sense of justice",
        description:
          "Six-to-ten-year-olds develop a fierce sense of fairness. 'That is not fair' becomes a constant refrain. This is not selfishness. It is the image of God waking up in them. They need parents who take their moral outrage seriously and connect it to a God who is just -- not a God who smooths everything over.",
      },
      {
        title: "Belonging in a community larger than the family",
        description:
          "Elementary-age children are ready to see that faith is not a private family affair. They need to belong to a church community where other adults know their name, where they see people of different ages worshipping the same God. A child who only experiences faith at home will conclude that faith is something their parents invented.",
      },
      {
        title: "Ownership of spiritual practices",
        description:
          "By seven or eight, a child can begin to have their own prayer life -- not one performed for parents but one that belongs to them. They need permission to pray in their own way, read the Bible at their own pace, and ask questions that go beyond what Sunday school covers. The shift from 'our faith' to 'my faith' starts here.",
      },
      {
        title: "A theology of failure",
        description:
          "School introduces competition, grades, and social hierarchy. Children this age begin to experience real failure -- academic, social, athletic. They need to hear that God's love is not a grade and that failure is not the opposite of faithfulness. The gospel is not 'try harder.' The gospel is 'you are loved before you perform.'",
      },
    ],
    talkAboutGod: [
      "Move from 'God made everything' to 'God is doing something.' Elementary-age children are ready for the idea that God is active in the world -- that God cares about injustice, that God is working through people, that the Bible is not just ancient stories but a living word that speaks into their Tuesday afternoon.",
      "When they encounter suffering -- a classmate's parent dies, a friend is bullied, they see homelessness for the first time -- do not rush to explanation. Say 'This is not the way God wants things to be.' Then ask: 'What do you think we could do about it?' You are building a theology of lament and a theology of action in the same conversation.",
      "Let them read the Bible themselves -- not a children's paraphrase but an actual Bible with a reading level they can handle. When they stumble on something confusing or disturbing (and they will), treat it as an invitation, not a crisis. 'That is a hard part. Scholars have wrestled with that for thousands of years. What do you think it means?'",
      "Before bed, ask your child: 'What is one thing you wondered about today?' Then find a Bible story or a verse that touches that wonder. Not a lesson. A connection. The child who learns that Scripture speaks to their real questions will still open it at thirty.",
    ],
    mistakes: [
      {
        mistake: "Answering questions they are not asking",
        why: "Parents read articles about apologetics for kids and preemptively address doubts the child does not have. A seven-year-old who has not questioned the existence of God does not need a defense of theism. They need someone who will take their actual questions seriously -- questions about why their friend is mean, why Grandpa is sick, whether dogs go to heaven.",
        instead:
          "Listen to the question behind the question. When your child asks 'Why did God let my hamster die?' they are not asking about the problem of evil. They are asking 'Does God care about what I care about?' Answer that question. 'Yes. God cares about everything you care about, even your hamster.'",
      },
      {
        mistake: "Making church attendance the measure of spiritual health",
        why: "It is easy to equate 'my child sits quietly in the pew' with 'my child's faith is growing.' But compliance and faith are not the same thing. A child who fidgets through the sermon but asks a sharp question in the car afterward is more spiritually engaged than one who sits still and checks out.",
        instead:
          "After church, do not ask 'Did you behave?' Ask 'What did you hear that made you think?' or 'Was there anything you disagreed with?' Teach them that church is not a performance they attend but a community they participate in -- and participation includes questioning.",
      },
      {
        mistake: "Shielding them from the hard parts of Scripture",
        why: "Parents curate the Bible, keeping children in the safe zone of David and Goliath while avoiding the genocide in Joshua, the despair of Ecclesiastes, the violence of Judges. But elementary-age children can sense when they are being managed. And a sanitized Bible produces a faith that will shatter when it meets the real text.",
        instead:
          "When they encounter a hard passage, sit with it. 'This is a difficult part of the Bible. People who love God have argued about what it means for centuries. What bothers you about it?' You are teaching them that the Bible is honest about the world -- which is exactly what makes it trustworthy.",
      },
    ],
    practice: {
      title: "The Dinner Question",
      description:
        "This week, at one meal each day, ask your elementary-age child this question: 'What is one thing that happened today that you think God cares about?' It could be a fight on the playground, a good grade, a friend who was sad, or a beautiful sunset. Do not correct their answer. Do not theologize it. Just receive it. Then say: 'I think God cares about that too.' You are training them to see their ordinary life as the location of God's attention. And over time, the question changes how they see the day -- not as a sequence of events, but as a series of encounters with a God who is paying attention to the details.",
    },
  },
  {
    id: "tween",
    label: "Tween",
    range: "Ages 11--13",
    needs: [
      {
        title: "Permission to doubt without losing belonging",
        description:
          "The tween years bring the first real intellectual doubts. 'How do we know God is real?' 'Why do bad things happen?' These questions terrify parents because they sound like the beginning of the end. They are not. They are the beginning of an adult faith. But only if the child learns that doubt does not cancel their membership in the family of God.",
      },
      {
        title: "Adults outside the family who model faith",
        description:
          "Eleven-to-thirteen-year-olds are biologically wired to begin separating from parents. This is not rebellion. It is development. They need other adults -- a youth leader, a family friend, an uncle -- who demonstrate that faith is not just something Mom and Dad do. When three adults in their life independently love Jesus, that is harder to dismiss than when only their parents do.",
      },
      {
        title: "A faith that addresses the world they actually live in",
        description:
          "Tweens have phones, social media exposure, and awareness of global suffering. A faith that only addresses personal morality ('be nice, do not lie') is inadequate for a child who knows about school shootings, racism, and climate change. They need a theology big enough for the world they are inheriting.",
      },
      {
        title: "Emotional vocabulary rooted in Scripture",
        description:
          "The tween years are an emotional earthquake. Everything is intense, nothing makes sense, and they lack the language to describe what they feel. Give them the Psalms. The Psalms name rage, despair, loneliness, jealousy, and abandoned hope -- and direct all of it at God. A tween who learns to pray Psalm 13 ('How long, O Lord?') has a tool for the rest of their life.",
      },
    ],
    talkAboutGod: [
      "Stop lecturing. Start asking. 'What do you think happens after we die?' 'Do you think prayer actually works?' 'If you could ask God one question, what would it be?' These conversations require that you surrender control of the outcome. You are not catechizing. You are listening to a soul that is forming in real time.",
      "When they express doubt, resist the urge to fix it immediately. Say 'That is a real question. I have wrestled with that too.' Then tell them honestly where you landed -- and that it took years. Faith that has never been questioned is not faith. It is habit. Give them room to do the hard work.",
      "Introduce them to Christians who think. Give them a book by C.S. Lewis. Tell them about Dietrich Bonhoeffer, who died for his faith. Show them that Christianity is not intellectually embarrassing -- that serious people have believed seriously. Tweens are terrified of being foolish. Show them that faith is not foolishness.",
      "Talk about current events through a theological lens. When something unjust happens in the news, say 'What do you think God thinks about that?' Do not give them your answer first. Let them wrestle. Then engage. You are teaching them that faith has something to say about Monday morning, not just Sunday morning.",
    ],
    mistakes: [
      {
        mistake: "Treating doubt as defiance",
        why: "When a twelve-year-old says 'I do not know if I believe in God,' many parents panic. They increase church attendance, assign devotionals, or deliver a lecture about the importance of faith. But the child was not making a declaration of atheism. They were testing whether their family could handle their honesty. And if the answer is no, they will stop being honest.",
        instead:
          "Say 'Thank you for telling me that.' Let the silence sit. Then: 'I want you to know that your doubts do not scare me, and they do not scare God. Can we talk about what is making you wonder?' You have just made the most important move in their spiritual formation: you proved that honesty is safe.",
      },
      {
        mistake: "Competing with their peer group instead of equipping them for it",
        why: "Tweens care desperately about what their friends think. Parents sometimes try to make church 'cool' to compete -- flashy youth groups, pizza parties, relevance at all costs. But the child does not need church to be cool. They need church to be real. Cool expires. Real endures.",
        instead:
          "Acknowledge the pressure directly: 'I know it is hard to be the kid who goes to church. I know your friends might not get it.' Then give them language for why it matters to them -- not to you, to them. Help them articulate their own reasons, even if those reasons are still forming.",
      },
      {
        mistake: "Reducing faith to morality",
        why: "The tween years bring the sex talk, the substance talk, the screen talk. Parents sometimes make faith primarily about behavioral guardrails: 'Christians do not do X.' But if the child's entire understanding of faith is a list of prohibitions, they will abandon it the moment the prohibitions feel arbitrary -- which happens at approximately age fourteen.",
        instead:
          "Frame ethics inside a larger story. Not 'Christians do not lie' but 'We believe truth matters because God is truthful, and every lie we tell makes the world a little darker.' Not 'Christians do not get drunk' but 'Your body is a gift, and treating it with care is a way of saying thank you to the One who gave it.' The why matters more than the what.",
      },
    ],
    practice: {
      title: "The Weekly Walk",
      description:
        "Once this week, take your tween on a walk -- just the two of you, no phones, no agenda. Walk for at least twenty minutes. Do not bring up God, church, or morality. Talk about whatever they want to talk about: school, friends, a show they are watching, a game they are playing. Just listen. Then, near the end of the walk, ask one question: 'What is the hardest thing about being your age right now?' Listen to the answer without fixing it. Then say 'I am glad you told me that.' This walk is not about spiritual content. It is about relational infrastructure. Your tween will only bring you their spiritual questions if they trust that you will listen without an agenda. And trust is built in the ordinary, not the extraordinary.",
    },
  },
  {
    id: "teen",
    label: "Teen",
    range: "Ages 14--17",
    needs: [
      {
        title: "A faith they can own, even if it looks different from yours",
        description:
          "Teenagers are individuating. That is the job of adolescence. A teen who begins to question your denomination, your political theology, or your worship style is not losing their faith. They are finding it. The question is whether you will let them search, or whether you will demand they arrive at your coordinates. One produces adults who believe. The other produces adults who perform.",
      },
      {
        title: "Intellectual respect",
        description:
          "Teenagers can smell condescension at fifty paces. If you hand them answers that worked for you at forty and expect them to accept those answers at fifteen, you have lost the conversation. They need to be treated as thinkers -- given access to real arguments, hard questions, and the admission that some things in the faith are genuinely difficult to reconcile.",
      },
      {
        title: "A community that does not require performance",
        description:
          "Most teenagers have learned to perform by this age -- the right answers in youth group, the right posture at church, the right face at home. Underneath the performance, many are exhausted. They need at least one space where they can say 'I am not sure I believe this' and not be treated as a project to fix.",
      },
      {
        title: "Exposure to suffering that is not their own",
        description:
          "Teenagers are developmentally self-focused, which is normal. But they grow when their world expands beyond themselves. A mission trip where they serve (not tour), a relationship with an elderly church member, a conversation with someone whose life is radically different from theirs -- these experiences build the kind of empathy that makes faith livable.",
      },
    ],
    talkAboutGod: [
      "Ask 'What do you think?' before you tell them what you think. And mean it. If your teenager senses that the question is a trap -- that you are waiting for them to say the wrong thing so you can correct them -- they will give you the answer you want and keep their real thoughts to themselves. You will have compliance. You will not have their heart.",
      "When they challenge a belief you hold, do not defend it reflexively. Say 'Tell me more about why you see it that way.' If their argument has merit, say so. If you disagree, say why -- but as a conversation between two people who respect each other, not as a correction from authority to subordinate. They are learning how to think theologically. Let them practice.",
      "Share your own struggles with faith -- past and present. 'When I was your age, I wondered if prayer was just talking to the ceiling.' 'There was a season in my thirties when I almost walked away from church.' Your vulnerability gives them permission for theirs. A parent who has never doubted is not impressive to a teenager. A parent who doubted and stayed is.",
      "Connect their passions to God's purposes. If they care about justice, show them Amos and Micah. If they care about art, talk about how beauty is a reflection of God's character. If they care about science, talk about the long tradition of scientists who were people of deep faith. Do not fight their interests. Baptize them.",
    ],
    mistakes: [
      {
        mistake: "Making church attendance a battle",
        why: "The Sunday morning fight -- 'You are going and that is final' -- is the most common and most counterproductive conflict in Christian parenting. Every forced march to church teaches the teenager that faith is obligation, not invitation. They are counting the days until they can stop going, and when they turn eighteen, many of them do.",
        instead:
          "Have an honest conversation: 'I believe church matters, and here is why it matters to me. I want to understand what is making it hard for you.' If they need a break, let them take it -- with the agreement that you will keep talking about faith and they will give it another try in a month. The relationship matters more than the attendance record.",
      },
      {
        mistake: "Offering certainty when they need honesty",
        why: "Teenagers ask hard questions, and parents feel pressure to have airtight answers. 'How do we know Christianity is the right religion?' 'Why does God allow genocide?' If you respond with packaged certainty, your teenager will conclude either that you have not thought about it or that you are pretending. Neither builds trust.",
        instead:
          "Say 'I do not have a clean answer for that. What I have is a conviction that has survived the question.' Then tell them the story of how it survived. Testimony -- not argument -- is what holds teenagers. They do not need you to be omniscient. They need you to be honest about what you have staked your life on and why.",
      },
      {
        mistake: "Assuming silence means disengagement",
        why: "Teenagers talk less to their parents. This is normal and not a spiritual emergency. A sixteen-year-old who no longer shares every thought about God is not necessarily drifting. They may be processing internally. They may be thinking more deeply about faith than they ever have. Silence is not the same as absence.",
        instead:
          "Stay available without being invasive. Leave a book on their nightstand with a note: 'Thought of you when I read this.' Send them an article that touches something they care about. Let them see you praying, reading Scripture, struggling with your own faith. Presence speaks louder than interrogation. When they are ready to talk, they will know you are safe.",
      },
    ],
    practice: {
      title: "The Honest Letter",
      description:
        "This week, write your teenager a letter -- on paper, not a text. Tell them three things: what you believe about God and why, a time when your faith almost did not survive and what kept you, and what you hope for their relationship with God (not what you demand, what you hope). End with this: 'Your faith is yours. I will not manage it, manipulate it, or manufacture it for you. But I will be here -- for every question, every doubt, every season.' Give them the letter. Do not ask them to respond. Do not bring it up unless they do. The letter is a seed. Some seeds take years. You are playing a long game, and the long game requires the patience to plant without demanding immediate fruit.",
    },
  },
  {
    id: "young-adult",
    label: "Young Adult",
    range: "Ages 18+",
    needs: [
      {
        title: "A parent who releases control without releasing relationship",
        description:
          "Your child is an adult. That sentence is harder to live than to say. They may make choices about church, theology, relationships, and lifestyle that differ from yours. Your job is no longer to direct their faith. It is to remain a safe harbor they can return to -- not a checkpoint they must pass through.",
      },
      {
        title: "Honesty about the failures of the church",
        description:
          "Many young adults are leaving the church, and the reasons are not trivial: hypocrisy, abuse scandals, political captivity, racial injustice, hostility toward their LGBTQ friends. If you dismiss their concerns as 'the world's influence,' you have told them you value the institution more than their integrity. Take their critiques seriously. Many of them are prophetic.",
      },
      {
        title: "A faith modeled in suffering, not just in success",
        description:
          "Your young adult needs to see what faith looks like when your marriage is hard, when your parent dies, when your career stalls, when your body fails. Sunday-morning faith is easy to perform. Tuesday-afternoon faith -- the kind that holds when nothing is working -- is what they need to witness. Your suffering, handled with faith, is the most powerful sermon you will ever preach.",
      },
      {
        title: "Freedom to come back",
        description:
          "Some young adults will walk away from faith entirely. The parable of the prodigal son is not just about the son. It is about the father who watches the road. Your young adult needs to know that the door is always open, that their return will be met with a feast and not a lecture, and that the table was set for them even while they were gone.",
      },
    ],
    talkAboutGod: [
      "Ask permission before offering spiritual input. 'Can I share something I have been thinking about?' respects their autonomy in a way that unsolicited advice does not. They are more likely to listen if they have chosen to listen. The days of mandatory chapel are over.",
      "When they tell you they have stopped going to church, do not panic out loud. Ask: 'What happened?' There is almost always a story -- a hurt, a disillusionment, a question that was met with hostility instead of honesty. Hear the story first. If you respond with 'You need to find a church,' you have prioritized the institution over the person.",
      "Share what God is doing in your life right now -- not as instruction but as report. 'I read something this week that broke me open.' 'I prayed about that situation I told you about, and I do not have an answer, but I have peace.' This is witness, not curriculum. It is the most credible form of spiritual communication between adults.",
      "If they hold theological positions different from yours, engage with curiosity instead of correction. 'That is interesting. I have always thought about it differently. Tell me how you got there.' You may learn something. And even if you disagree, you have demonstrated that your love is not contingent on their agreement.",
    ],
    mistakes: [
      {
        mistake: "Treating their absence from church as a personal failure",
        why: "Many parents of young adults carry enormous guilt: 'Where did I go wrong?' But your child's faith is not a product you manufactured. It is a relationship they are negotiating with God on their own terms. Your guilt, when expressed, puts pressure on them to perform faith for your comfort -- which is the opposite of genuine belief.",
        instead:
          "Release the guilt. You planted seeds, watered them, and prayed over them. The harvest is not yours to control. Continue to live your faith with integrity, keep the relationship warm, and trust that God is not finished with their story. Some of the most powerful faith stories begin with a chapter of walking away.",
      },
      {
        mistake: "Weaponizing grandchildren",
        why: "When grandchildren arrive, some parents see an opportunity to 'get it right this time' -- insisting on baptism, church attendance, or specific moral instruction for the grandchildren in ways that override the young adult's autonomy. This breeds resentment and often accomplishes the opposite of what is intended.",
        instead:
          "Love your grandchildren lavishly. Tell them Bible stories if their parents allow it. Pray for them openly. But respect your adult child's right to raise their own children. Influence through love, not control. A grandparent who is a safe, joyful, faithful presence speaks louder than one who is a theological border guard.",
      },
      {
        mistake: "Giving up on the relationship because the theology diverges",
        why: "Some parents distance themselves from adult children whose beliefs have changed, as though the relationship was always conditional on theological agreement. The young adult receives the message clearly: you were loved for your compliance, not for yourself. This is the opposite of the gospel.",
        instead:
          "Stay close. Call, visit, show up for the things that matter to them. Your continued love in the face of theological difference is itself a sermon on the unconditional nature of grace. God does not withdraw when we wander. Neither should you. The table remains set. The door stays open. That is the job now.",
      },
    ],
    practice: {
      title: "The Phone Call with No Agenda",
      description:
        "This week, call your young adult child. Do not text -- call. When they answer, tell them why you are calling: 'I just wanted to hear your voice.' Ask about their life -- their work, their friends, what they are reading, what they are cooking, what made them laugh this week. Do not mention church. Do not mention God. Do not steer the conversation toward anything spiritual. Just be their parent. Be interested in the whole person, not just the spiritual category. If they bring up faith, follow their lead. If they do not, that is fine. The call itself is the ministry. You are telling them, without words, that your love is not an instrument of spiritual management. It is just love. And love, given freely and without agenda, has been doing the work of God since before anyone had a name for it.",
    },
  },
];

export default function ParentingGuide() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const group = AGE_GROUPS.find((g) => g.id === selectedId) || null;

  return (
    <Layout>
      <SEOMeta
        title="Parenting Stage Guide -- Age-Specific Theological Parenting Guidance"
        description="Practical, theologically grounded parenting guidance for every stage -- toddler through young adult. What your child needs, how to talk about God, common mistakes, and one practice to start this week."
        keywords="Christian parenting, parenting guide, faith and parenting, theological parenting, parenting toddlers, parenting teens, raising kids in faith"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Parenting Stage Guide",
          description:
            "Age-specific theological parenting guidance from toddler through young adult. Practical, specific, and grounded in real life.",
          url: "https://www.livewellbyjamesbell.co/tools/parenting-guide",
          applicationCategory: "EducationalApplication",
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
            }}
          >
            Parenting Stage{" "}
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
            }}
          >
            Select your child's age group. Get what they need, how to talk
            about God at this stage, the mistakes to avoid, and one practice
            to start this week.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "48px 32px", background: "var(--bone)" }}>
        <div className="wrap" style={{ maxWidth: "900px" }}>
          {/* Back button */}
          {selectedId && (
            <button
              onClick={() => setSelectedId(null)}
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
                marginBottom: "24px",
                opacity: 0.7,
              }}
            >
              <ArrowLeft size={16} />
              All Age Groups
            </button>
          )}

          {/* Age Group Selector */}
          {!selectedId && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "12px",
              }}
            >
              {AGE_GROUPS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedId(g.id)}
                  style={{
                    padding: "28px 16px",
                    background: "white",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    fontSize: "18px",
                    fontWeight: 600,
                    fontFamily: "var(--F)",
                    color: "var(--ink)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--mustard)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Users
                    size={20}
                    style={{
                      display: "block",
                      margin: "0 auto 10px",
                      opacity: 0.4,
                    }}
                  />
                  {g.label}
                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontFamily: "var(--U)",
                      fontWeight: 500,
                      color: "var(--ink-muted)",
                      marginTop: "6px",
                    }}
                  >
                    {g.range}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Age Group Detail */}
          {group && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
            >
              {/* Title card */}
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "40px 36px",
                  borderTop: "4px solid var(--mustard)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "12px",
                  }}
                >
                  {group.range.toUpperCase()}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 4vw, 40px)",
                    fontWeight: 400,
                    fontFamily: "var(--F)",
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  {group.label}
                </h2>
              </div>

              {/* What your child needs */}
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "36px",
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
                  WHAT YOUR CHILD NEEDS MOST RIGHT NOW
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  {group.needs.map((need, i) => (
                    <div
                      key={i}
                      style={{
                        paddingLeft: "20px",
                        borderLeft: "2px solid var(--bone-warm)",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          fontFamily: "var(--F)",
                          fontSize: "17px",
                          color: "var(--ink)",
                        }}
                      >
                        {need.title}
                      </span>
                      <p
                        style={{
                          fontFamily: "var(--B)",
                          fontSize: "15px",
                          color: "var(--ink-muted)",
                          marginTop: "6px",
                          lineHeight: 1.7,
                          margin: "6px 0 0",
                        }}
                      >
                        {need.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to talk about God */}
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "36px",
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
                  HOW TO TALK ABOUT GOD AT THIS AGE
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  {group.talkAboutGod.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "16px" }}>
                      <span
                        style={{
                          fontFamily: "var(--F)",
                          fontSize: "24px",
                          fontWeight: 400,
                          color: "var(--mustard)",
                          lineHeight: 1.2,
                          flexShrink: 0,
                          width: "28px",
                          textAlign: "center",
                        }}
                      >
                        {i + 1}
                      </span>
                      <p
                        style={{
                          fontSize: "16px",
                          lineHeight: 1.8,
                          color: "var(--ink)",
                          fontFamily: "var(--B)",
                          margin: 0,
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common mistakes */}
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "36px",
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
                  COMMON MISTAKES PARENTS MAKE AT THIS STAGE
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                  }}
                >
                  {group.mistakes.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        borderLeft: "3px solid var(--bone-warm)",
                        paddingLeft: "20px",
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: "var(--F)",
                          fontSize: "18px",
                          fontWeight: 500,
                          color: "var(--ink)",
                          margin: "0 0 8px",
                        }}
                      >
                        {i + 1}. {m.mistake}
                      </h4>
                      <p
                        style={{
                          fontSize: "15px",
                          lineHeight: 1.7,
                          color: "var(--ink-muted)",
                          fontFamily: "var(--B)",
                          margin: "0 0 12px",
                        }}
                      >
                        <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                          Why this happens:
                        </strong>{" "}
                        {m.why}
                      </p>
                      <p
                        style={{
                          fontSize: "15px",
                          lineHeight: 1.7,
                          color: "var(--ink)",
                          fontFamily: "var(--B)",
                          margin: 0,
                          background: "var(--bone)",
                          padding: "16px 20px",
                          borderRadius: "4px",
                        }}
                      >
                        <strong
                          style={{
                            color: "var(--mustard)",
                            fontWeight: 600,
                            fontFamily: "var(--U)",
                            fontSize: "11px",
                            letterSpacing: "0.1em",
                            display: "block",
                            marginBottom: "6px",
                          }}
                        >
                          WHAT TO DO INSTEAD
                        </strong>
                        {m.instead}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* One practice */}
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  padding: "36px",
                  borderLeft: "4px solid var(--mustard)",
                }}
              >
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "16px",
                  }}
                >
                  ONE PRACTICE TO START THIS WEEK
                </h3>
                <h4
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "22px",
                    fontWeight: 400,
                    color: "var(--ink)",
                    margin: "0 0 16px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {group.practice.title}
                </h4>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    color: "var(--ink)",
                    fontFamily: "var(--B)",
                    maxWidth: "68ch",
                    margin: 0,
                  }}
                >
                  {group.practice.description}
                </p>
              </div>

              {/* CTA */}
              <a
                href="/writing"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--charcoal)",
                  color: "var(--bone)",
                  borderRadius: "8px",
                  padding: "24px 32px",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
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
                    KEEP READING
                  </div>
                  <span
                    style={{
                      fontSize: "18px",
                      fontFamily: "var(--F)",
                      fontWeight: 400,
                      fontStyle: "italic",
                    }}
                  >
                    Essays on Faith, Parenting, and the Weight of Raising Souls
                  </span>
                </div>
                <ChevronRight
                  size={20}
                  style={{ opacity: 0.5, flexShrink: 0 }}
                />
              </a>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
