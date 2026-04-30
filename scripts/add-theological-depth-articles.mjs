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
  // Who Is God — The Character and Attributes of God (10 articles)
  {
    title: "What the Holiness of God Actually Means — and Why It Is the Most Neglected Attribute",
    excerpt: "Holiness is the most fundamental fact about God. It is the recognition that you are not what you were designed to be.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Love of God in the New Testament: Gentler Than Wrath, Fiercer Than Sentiment",
    excerpt: "Agape is not primarily an emotion. It is love that acts regardless of the lovability of its object — love that persists through rejection.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Divine Providence Does Not Mean When It Is Used to Explain Every Outcome",
    excerpt: "The assertion of divine sovereignty is not itself a pastoral response to suffering. Providence claims that God is at work in all things toward redemption.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The God of the Old Testament and the God of the New: Are They the Same God?",
    excerpt: "The early church rejected Marcion's claim that they were different gods. The God of Abraham is the Father of Jesus Christ.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What It Means That God Is Good When the World Suggests Otherwise",
    excerpt: "The goodness of God is not a philosophical axiom. It is a pastoral claim that gets tested in hospitals and gravesides.",
    pillar: "Theological Depth",
    readTime: 12,
  },
  {
    title: "The Wrath of God: What It Is, What It Is Not, and Why the Church Needs to Preach It",
    excerpt: "The wrath of God is not emotional volatility. It is the fixed opposition of the divine character to all that damages creation.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When God Feels Distant and the Theology That Makes Sense of That",
    excerpt: "The experience of God's absence does not mean God is absent. It is a spiritual condition in which felt consolation evaporates.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What the Names of God Reveal About His Character",
    excerpt: "In the ancient Near East, a name was not a label but a disclosure — a revelation of nature, character, and identity.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Suffering of God: What Impassibility Really Claims and What It Doesn't",
    excerpt: "God is impassible in that he is not acted upon by external causes, but he genuinely loves and cares in ways that are real.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What the Doctrine of the Trinity Has to Do with Your Actual Daily Life",
    excerpt: "The Trinity is not a mathematical puzzle. It is a claim about God's inner life: that God is a community of self-giving love.",
    pillar: "Theological Depth",
    readTime: 11,
  },

  // The Bible — Authority, Reliability, Interpretation (12 articles)
  {
    title: "What Inerrancy Actually Claims — and What It Does Not",
    excerpt: "Inerrancy claims that the Bible, in its original manuscripts, is without error in all that it affirms — a more careful claim than it is often understood to be.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When the Bible Seems to Contradict Itself: A Pastoral Guide to the Hard Parts",
    excerpt: "Some apparent contradictions dissolve with basic exegetical attention. Others require reading genre correctly and understanding the text's own development.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "Why the Old Testament Belongs in the Christian Bible — and How",
    excerpt: "The Old Testament is primarily a story moving toward Jesus. Without it, the punchline of the gospel does not land.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "How to Read the Bible Without Missing What It Is Actually Saying",
    excerpt: "The most important question to bring to any biblical text is: what is this? What genre is it? What was the author trying to do?",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Manuscript Evidence Actually Shows About the Reliability of the New Testament",
    excerpt: "The New Testament is the most extensively documented text from the ancient world, with approximately 5,800 Greek manuscripts identified.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When Science and Genesis Seem to Be in Conflict",
    excerpt: "The conflict is mostly between a particular reading of Genesis and science — a reading that the text does not necessarily require.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Difference Between What a Text Meant and What It Means — and Why It Matters",
    excerpt: "Exegesis means drawing out what is in the text. Eisegesis means reading into the text what you brought to it.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What the Canon Is: How the Church Decided Which Books Belonged",
    excerpt: "The canon was determined through a process unfolded over centuries, driven by apostolicity, catholicity, and orthodoxy.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "Why Some Books Made It Into the Bible and Others Didn't",
    excerpt: "The books that were rejected were rejected primarily on apostolic and orthodox grounds. The process was neither arbitrary nor conspiracy-driven.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Historical-Critical Scholarship Offers the Honest Bible Reader",
    excerpt: "Historical criticism, used well, is an extraordinarily powerful tool for understanding what the texts are saying.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Bible and Violence: How to Engage the Texts That Trouble You",
    excerpt: "The violent texts are frequently cited reasons for rejecting Christianity and frequently ignored in Christian communities.",
    pillar: "Theological Depth",
    readTime: 12,
  },
  {
    title: "What Biblical Literacy Looks Like — and Why the Church Is Losing It",
    excerpt: "Only eleven percent of American churchgoers read their Bible every day. Biblical literacy requires sustained, unhurried engagement with the text.",
    pillar: "Theological Depth",
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
