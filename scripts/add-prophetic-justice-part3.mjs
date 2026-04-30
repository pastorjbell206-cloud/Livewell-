import { createPost } from "./server/db.ts";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const articles = [
  // Sexual Abuse, Power, and Institutional Accountability (10 articles)
  {
    title: "What the Abuse Crisis in the American Church Has Exposed About Institutional Idolatry",
    excerpt: "The abuse crisis has a common mechanism underneath its varied expressions. The primary mechanism is not primarily lust or predation, but institutional self-protection.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When Forgiveness Is Offered Before Accountability — and Why That Is Not the Gospel",
    excerpt: "Forgiveness offered before accountability is not grace. It is the use of grace language to protect the offender from consequences and to silence the survivor.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "The Survivor Who Was Asked to Reconcile Before Being Believed",
    excerpt: "The request to reconcile before being believed is not a pastoral response. It is an act of secondary harm.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "What Institutional Self-Protection Has Cost the Church's Witness on Abuse",
    excerpt: "Thousands of people who were abused in church contexts and then watched the institution protect itself have left the faith.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When Spiritual Authority Becomes Spiritual Abuse",
    excerpt: "Spiritual abuse occurs when authority is exercised for the benefit of the one who holds it rather than the people it was given to serve.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Church's Record on Sexual Abuse and the Theological Failures Behind the Silence",
    excerpt: "The silence had theology behind it. It was a set of theological convictions that produced the silence as a predictable outcome.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What a Genuinely Restorative Process for Abuse Requires — and What It Cannot Skip",
    excerpt: "Genuine restoration begins with truth. Not the institution's version of events, but an honest account of what happened.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What the Abuse Survivor Needs from the Church That the Church Rarely Provides",
    excerpt: "She needs to be believed. Before anything else. Before the investigation, before the process — she needs to hear: I believe you.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "The Difference Between a Church That Has a Policy on Abuse and One That Has a Culture Against It",
    excerpt: "A policy can be written in an afternoon. A culture takes years and requires leadership that models the values the culture is meant to embody.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "When the Denomination Protected Its Brand and the Survivors Paid the Cost",
    excerpt: "The brand being protected is not the gospel. It is the institution's public identity — the donor base, the denominational reputation, the pastor's platform.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },

  // The Social Justice Debate in the Church (10 articles)
  {
    title: "What 'Social Justice' Means — and Why the Debate About It Has Produced More Heat Than Light",
    excerpt: "Social justice is a contested term that means significantly different things to different people, and the failure to acknowledge that ambiguity is the primary reason the debate has been unproductive.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When the Fear of Social Justice Has Made the Church Afraid of the Hebrew Prophets",
    excerpt: "Something has gone wrong when the church is more comfortable with Paul's letters than with Amos.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Difference Between Gospel Reductionism and a Genuinely Whole Gospel",
    excerpt: "Gospel reductionism defines the gospel so narrowly that it applies only to the individual's vertical relationship with God, while treating social dimensions as secondary.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What the Social Gospel Got Wrong — and What It Was Rightly Concerned About",
    excerpt: "The Social Gospel's core intuition was correct: the gospel has something to say about the conditions of human life. Its theological execution had serious problems.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What the Lausanne Covenant Said About the Church's Social Responsibility — in 1974",
    excerpt: "The Lausanne Covenant expressed penitence for treating evangelism and social concern as mutually exclusive. The debate that has continued is about whether the church will act on what its leaders acknowledged.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Woke Church Debate and the Theological Questions Behind the Political Labels",
    excerpt: "Behind the label are genuine theological questions that deserve honest engagement about systemic analysis, racial injustice, and prophetic independence.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "When Justice Language Has Been Weaponized — from Both Directions",
    excerpt: "Justice language can be weaponized from both left and right. The answer is not to abandon justice language but to recover its theological grounding.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What a Genuinely Biblical Account of Justice Requires Beyond Conservative and Progressive Defaults",
    excerpt: "A genuinely biblical account of justice holds both the personal and structural lenses simultaneously, because the biblical account of sin holds both.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Church That Can Talk About Personal Sin but Not Structural Sin Has an Incomplete Anthropology",
    excerpt: "An anthropology that accounts for personal sin but not structural sin is incomplete. Human beings are embedded in communities shaped by structures and arrangements of power.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "Gospel Reductionism and the Social Dimensions of What Jesus Actually Announced",
    excerpt: "The gospel Jesus announces is not reducible to individual salvation. It is the announcement of a Jubilee with economic, physical, and liberation dimensions.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },

  // Deconstruction, Doubt, and Faith Crisis (15 articles)
  {
    title: "What Deconstruction Is — and What It Is Usually Responding To",
    excerpt: "Deconstruction describes the process of examining and questioning the theological beliefs and community structures a person was raised with, usually triggered by specific harm or encounter.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When Someone You Love Has Walked Away from the Faith",
    excerpt: "The grief is real. The temptation is to make their departure primarily about you. But the person who left is a full human being with their own history and reasons.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When Doubt Is Met with Defensiveness Instead of Genuine Engagement",
    excerpt: "The church that teaches people to hide their doubts produces people who perform certainty they do not have — which is not faith, it is religious theater.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "What the Person in the Middle of Deconstruction Actually Needs from the Church",
    excerpt: "What they need is the experience of being in a community that can hold their questions without collapsing, and someone who has walked a similar path.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "When Questions About the Bible Become Questions About God",
    excerpt: "The sequence from textual question to existential crisis is not inevitable. It is produced by the church's failure to equip people for honest engagement with hard Scripture.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Ex-Evangelical and What Their Story Is Telling the Institutions They Left",
    excerpt: "The ex-evangelical's story is data. The recurring features are not stories of isolated bad actors but of a system producing predictable outcomes.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What Genuine Faith Reconstruction Looks Like on the Other Side of Deconstruction",
    excerpt: "The reconstruction is not a return to where you were. It is the building of something that has been tested through honest engagement.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "When the Church's Response to Doubt Is Defensiveness Rather Than Invitation",
    excerpt: "The defensive response treats the question as an attack. The invitation response treats it as an opportunity to demonstrate faith's capacity to bear honest inquiry.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What the Intellectual Stumbling Blocks to Faith Are in 2026 — and How to Engage Them",
    excerpt: "The new weight belongs to moral objections about the church's record on race, abuse, and LGBTQ+ exclusion, not primarily cosmology or textual criticism.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Person Who Has Stayed in the Church While Holding Real Doubts — and the Courage That Requires",
    excerpt: "Staying is its own kind of courage. It is the daily choice to remain in the community whose failures you know, in the practice whose questions you have not resolved.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "When the Inherited Faith Cannot Account for What You Have Encountered",
    excerpt: "The discovery that the simple answers given in childhood do not hold up under honest examination is often the beginning of deconstruction.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "What Happens When a Community Can Hold Both Questions and Faith Without Requiring a Choice",
    excerpt: "The community that can hold both the questions and the faith without requiring the person to choose offers something rare and necessary.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "The Lament Psalms and the Theological Home of Those Who Doubt While Staying",
    excerpt: "The Psalms are the theological home of the person who stays while doubting, who practices faith as active decision rather than performance of certainty.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When Apologetics Are Not What the Deconstructing Person Actually Needs",
    excerpt: "Most deconstruction is not primarily an intellectual movement away from Christianity. It is primarily an emotional and relational movement away from a specific instantiation.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "What the Church Loses When It Treats Doubt as Disloyalty",
    excerpt: "The church that treats doubt as disloyalty has chosen institutional stability over the kind of faith that has actually reckoned with the questions.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },

  // Gun Violence and the Pro-Life Ethic (5 articles)
  {
    title: "When the Pro-Life Conviction Stops at Abortion and Shrugs at Mass Shootings",
    excerpt: "If the basis for the pro-life position is the Imago Dei, then that conviction does not expire when the threat comes from a firearm.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "When Mass Shootings Happen and the Church Has Nothing to Say",
    excerpt: "The silence that results from offering only prayers and saying nothing about the conditions that made it possible communicates that the gospel has nothing to say.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Second Amendment and the Kingdom of God: Why They Are Not the Same Claim",
    excerpt: "The Second Amendment is a constitutional provision. The Kingdom of God is an eschatological reality. They are not in competition, but they are not the same thing.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What the Church Owes the Community After a Shooting — and What Thoughts and Prayers Cannot Do",
    excerpt: "Thoughts and prayers are not nothing. They are also not sufficient. The community after a shooting needs presence and practical care sustained over time.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "When Self-Defense and Enemy Love Are Both in the New Testament and Both Need Addressing",
    excerpt: "The New Testament does not resolve the tension between self-defense and enemy love. It holds both and requires you to take both seriously.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
];

async function addArticles() {
  try {
    console.log(`Adding ${articles.length} articles...`);
    
    for (const article of articles) {
      await createPost({
        title: article.title,
        slug: generateSlug(article.title),
        body: article.excerpt,
        excerpt: article.excerpt,
        pillar: article.pillar,
        readTime: article.readTime.toString(),
      });
    }
    
    console.log(`✅ Successfully added ${articles.length} articles!`);
  } catch (error) {
    console.error("Error adding articles:", error);
    process.exit(1);
  }
}

addArticles();
