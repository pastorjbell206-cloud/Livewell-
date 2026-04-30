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
  // Salvation, Hell, and Who Gets In (10 articles)
  {
    title: "What Salvation Actually Is — Beyond the Four Spiritual Laws",
    excerpt: "Salvation is not merely the resolution of a personal sin problem. It is the rescuing, restoring, reordering power of the Kingdom of God — cosmic in scope, including the redemption of all creation.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "Are There Other Ways to God? A Pastoral and Theological Response",
    excerpt: "The New Testament's exclusive claims are unambiguous. Yet the tradition has distinguished between different modes of access to Christ's saving work, acknowledging the complexity of God's justice.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Hell Is — and the Serious Theological Options on the Table",
    excerpt: "Hell has been preached with theatrical cruelty. The tradition offers three serious theological options: Eternal Conscious Torment, Annihilationism, and Christian Universalism.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When Someone You Love Died Without Faith and You Cannot Make Peace With What That Means",
    excerpt: "The grief of losing someone without explicit Christian faith is compounded by theological dread. The tradition offers not certainty but the character of the God who judges with mercy.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What 'Born Again' Means When You Read It in John 3's Context",
    excerpt: "Born again is not primarily about a second experience. It is about a different source for a new kind of life — the sovereign work of the Spirit, not human achievement.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Exclusivity of Christ and the Respect That Holds It Together",
    excerpt: "The exclusive claim about Jesus can be held together with genuine respect for people of other faiths. The model is authentic encounter, not contempt for alternatives.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Universalism Gets Right — and Where Its Logic Breaks Down",
    excerpt: "Universalism has serious theological pedigree and captures something real about God's character. But it struggles with the weight of human freedom and the seriousness of judgment.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When a Loved One's Deathbed Conversion Seems Too Convenient to Be Real",
    excerpt: "The discomfort with deathbed conversions often reflects an unconscious understanding of salvation as reward for effort. The gospel disrupts this assumption at its root.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What the Thief on the Cross Tells Us About the Minimal Requirements of Saving Faith",
    excerpt: "The thief had no baptism, no catechism, no good works. He had recognition of sin, recognition of Jesus, and a turning toward him. That was enough.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Age of Accountability and What the Bible Does — and Doesn't — Say About It",
    excerpt: "The phrase does not appear in Scripture, but the tradition has developed a pastoral inference: God does not hold morally responsible those who have not reached cognitive and moral maturity.",
    pillar: "Theological Depth",
    readTime: 11,
  },

  // The Holy Spirit and Spiritual Gifts (15 articles)
  {
    title: "What the Holy Spirit Actually Does Beyond the Emotional Experiences Associated with Him",
    excerpt: "The Spirit's work is cognitive, relational, and forensic — teaching, testifying, convicting. It is considerably broader than producing emotional states.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Cessationist and Continuationist Debate and Why the Honest Answer Is More Complex",
    excerpt: "The cessationist argument rests on inference, not explicit biblical warrant. The continuationist response is both exegetically and historically defensible.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When Speaking in Tongues Has Become the Marker of 'Real' Christianity",
    excerpt: "The doctrine of initial evidence — that tongues is necessary evidence of Spirit baptism — has no explicit biblical warrant and is less than 120 years old.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Healing Prayer Is and What It Is Not — a Pastoral Guide",
    excerpt: "Healing prayer is the bringing of specific physical need before God, with open hands. It is not a guarantee, and the absence of healing does not reflect insufficient faith.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Difference Between Being Filled with the Spirit and Feeling Spiritual",
    excerpt: "Spirit-filling is an ongoing reality — not a peak experience to be pursued but a sustained disposition. The evidence is communal, relational, and oriented toward others.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Pentecost Established That the Rest of Acts Unpacks",
    excerpt: "Pentecost established the reversal of the Old Testament's intermittent Spirit: the universal, permanent indwelling of every believer. Acts is the story of the Spirit as protagonist.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When the Charismatic and Reformed Traditions Have More to Learn from Each Other Than They Admit",
    excerpt: "The Charismatic tradition recovers the immediacy of the Spirit's presence. The Reformed tradition provides theological depth. Both need what the other offers.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "Discernment as Both Gift and Discipline — and Why Both Are Necessary",
    excerpt: "Discernment is both a gift distributed by the Spirit and a discipline developed through practice. The primary criterion is Christological; the long-term criterion is fruit.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Fruit of the Spirit as the Measure of Genuine Spiritual Health",
    excerpt: "Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control — this is what a person looks like when the Spirit has been at work in them.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What the Spirit's Work in Sanctification Looks Like in Ordinary Life",
    excerpt: "Sanctification is the slow, lifelong reorientation of the whole person toward Christ. The pace is organic. The goal is not perfection but increasing conformity to Christ.",
    pillar: "Theological Depth",
    readTime: 11,
  },

  // Additional articles from the document
  {
    title: "When the Gospel Claim Meets Cultural Resistance and How to Hold Both",
    excerpt: "The exclusive claim about Jesus can be held with genuine respect for other traditions. The model is authentic encounter and embodied witness, not contempt.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Doctrine of Hell as the Acknowledgment That Human Choices Have Ultimate Weight",
    excerpt: "Hell is not primarily a motivational tool for evangelism. It is the acknowledgment that human choices have ultimate weight and that some people choose separation from God.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What the Parable of the Workers in the Vineyard Says About Grace and Fairness",
    excerpt: "Grace is not proportional. It is not meant to be. The objection to its non-proportionality is the objection to grace itself.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "Salvation as Rescue Rather Than Transaction — What This Changes",
    excerpt: "Salvation is rescue — deliverance from a dangerous situation. This understanding transforms how we think about the gospel and its cosmic scope.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Spirit's Indwelling as the Foundation of All Christian Experience",
    excerpt: "The Spirit's indwelling is not an optional extra or a second blessing. It is the foundation of all Christian experience and the basis of the believer's identity.",
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
