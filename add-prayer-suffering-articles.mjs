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
  // Prayer — Does It Work and What Is It (6 articles)
  {
    title: "What Prayer Is If God Already Knows What We Need",
    excerpt: "Prayer is not primarily a communication strategy. It is a relationship. The God who knows what we need before we ask has not made prayer unnecessary. He has made it intimate.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When Prayer Doesn't Seem to Work — and What to Do With That",
    excerpt: "The New Testament does not promise that all prayers will be answered affirmatively. It promises that all prayers will be heard. The distinction is significant.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Lord's Prayer as a Theology of Prayer, Not Just a Formula",
    excerpt: "The Lord's Prayer is not intended as a magic formula to be repeated verbatim. It was intended as a pattern — a structural outline of what prayer should contain.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Unanswered Prayer Is Asking of the Person Who Prayed",
    excerpt: "Unanswered prayer asks whether you will keep the relationship with God when the relationship is not producing what you asked for. That is the test that strips prayer of every transactional element.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When Prayer Has Become a Spiritual Obligation Rather Than a Conversation",
    excerpt: "Prayer driven by guilt produces a specific kind of deadness. The transition from obligation to conversation begins with the honest acknowledgment that the prayer you have been performing is not working.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Difference Between Praying and Talking to Yourself",
    excerpt: "Prayer is not monologue dressed as dialogue. The person who has prayed and received specific answers across a lifetime is not constructing a theory. They are reporting an experience of relationship.",
    pillar: "Theological Depth",
    readTime: 11,
  },

  // Prayer Continued (4 articles)
  {
    title: "What the Psalms Teach About the Kind of Honesty God Can Handle",
    excerpt: "The Psalms were the prayer book of Israel for a thousand years. They have survived because they tell the truth about what it is actually like to be a human being addressing God.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When Intercessory Prayer Is the Only Thing Left to Do and You Are Not Sure It Is Enough",
    excerpt: "Intercessory prayer is not nothing. The combined intercession of the Trinity on behalf of the person for whom we pray is the full weight of divine love directed toward that person's situation.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Corporate Prayer Does That Private Prayer Cannot",
    excerpt: "The early church took corporate prayer seriously. The church that has largely abandoned the prayer meeting has not merely lost a spiritual discipline. It has lost a specific mode of encounter with God.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Prayer Life of Jesus and What It Reveals About the Nature of Prayer",
    excerpt: "Prayer is the expression of a relationship that exists at the most fundamental level of reality — the relationship of the Son to the Father, into which believers are adopted by the Spirit.",
    pillar: "Theological Depth",
    readTime: 11,
  },

  // Suffering, Evil, and Where God Is (8 articles)
  {
    title: "Why God Allows Suffering: The Honest Answer the Church Too Often Rushes Past",
    excerpt: "The honest answer is that we do not fully know. The church that rushes past this has served the theology at the expense of the person.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What the Problem of Evil Actually Is — and Why the Easy Answers Don't Hold",
    excerpt: "The problem of evil is a real problem. It has real answers — not perfect answers, but answers that are intellectually serious and pastorally honest.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When Bad Things Happen to Good People and Job's Friends Show Up",
    excerpt: "Job's friends represent bad pastoral theology. They sit with Job in silence, which is good. But when they speak, they apply a general principle to a particular case where the principle does not apply.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Difference Between God Causing Suffering and God Allowing It",
    excerpt: "The distinction matters pastorally: the person who has suffered a tragedy needs to know whether God did this to them. The answer is no. God permitted the conditions. God is present in it.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What the Cross Has to Say About a God Who Permits Suffering",
    excerpt: "The central claim of the New Testament is that the God who permits suffering entered it. He did not remain outside it. The divine response to suffering was not a theodicy but an incarnation.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When Natural Disaster Raises the Question: Where Was God?",
    excerpt: "The pastoral response is not a theological lecture. It is the community that shows up in the aftermath — that rebuilds, that cares, that demonstrates the love of God in physical terms.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What the Book of Lamentations Offers the Person Who Has Experienced Devastating Loss",
    excerpt: "Lamentations offers permission to grieve fully without rushing to resolution. Permission to hold onto God's faithfulness not as a denial of grief but as a companion to it.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Silence of God in the Psalms and What It Teaches Us to Expect",
    excerpt: "The Psalms teach us to expect that the silence will come. The appropriate response is not to pretend the silence is not real but to address it directly.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Suffering Produces in the Person Who Does Not Run from It",
    excerpt: "Suffering produces perseverance, character, and hope — but not automatically. It requires the person to not run from it, to remain in the difficult place and not abandon it.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When a Child Dies and the Theological Answers All Sound Hollow",
    excerpt: "Every theodicy applied to the death of a child sounds hollow. What the tradition offers is not an answer but the incarnation — the God who became a child and wept.",
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
