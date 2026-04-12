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
  // End Times, Heaven, and What Comes Next (10 articles)
  {
    title: "What Heaven Actually Is — and Why the Clouds-and-Harps Version Misses the Point",
    excerpt: "Heaven is not the final destination in the New Testament. The final destination is the New Jerusalem descending to a renewed earth. The intermediate state is real; the resurrection is the point.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Rapture Question: What the Bible Says and What Has Been Read Into It",
    excerpt: "The pre-tribulation rapture is a nineteenth-century innovation, not a recognized position in early Christian eschatology. The primary proof text is 1 Thessalonians 4:16-17, but its interpretation is disputed.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Historic Premillennialism Believes That Left Behind Got Wrong",
    excerpt: "Historic premillennialism expects a literal thousand-year reign of Christ without the elaborate dispensational framework. It does not posit a secret rapture and resists the sharp separation of Israel and the church.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When Eschatology Shapes Ethics: How Your View of the End Affects How You Live Now",
    excerpt: "What you believe about how the story ends determines what you think the present moment is for. Pre-tribulation eschatology tends toward disinvestment from culture; amillennial and postmillennial traditions produce sustained engagement.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The New Creation: A Physical, Cosmic, Historical Hope for a Physical, Cosmic, Historical World",
    excerpt: "The new creation is not annihilation and replacement. It is the old creation transformed, liberated from decay, renewed and glorified. This hope demands engagement with creation, culture, and justice now.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Revelation Is Actually Doing When It Addresses a Persecuted First-Century Community",
    excerpt: "Revelation is not a code to be cracked but a vision to be inhabited. It equipped a persecuted community to endure, resist, and hope — not by giving a timeline but by giving a vision of the Lamb and the New Jerusalem.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When End-Times Anxiety Drives More Christian Behavior Than the Sermon on the Mount",
    excerpt: "The diagnostic question is not whether you believe in the Second Coming but which theological conviction is actually shaping your daily life. Apocalyptic anxiety produces reactive, self-protective postures.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Resurrection of the Body Actually Claims About the Future of This Physical Life",
    excerpt: "The resurrection of the body is materially specific. The body is not a temporary container but part of what you are permanently and eschatologically. Everything suffered and created in the body is not lost.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Second Coming and What Jesus Actually Said About When It Would Happen",
    excerpt: "Jesus said about that day or hour no one knows, not even the angels or the Son, but only the Father. Every person who has set a date has claimed to know something Jesus said he did not know.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What a Genuinely Biblical Hope for the Future Looks Like — and Why It Demands More of Us Now",
    excerpt: "The biblical hope is about arrival — the Kingdom in its fullness, the renewed creation, the New Jerusalem descending to earth. This hope refuses both escapism and utopianism, demanding faithful engagement now.",
    pillar: "Theological Depth",
    readTime: 11,
  },

  // Creation, Evolution, and Science (10 articles)
  {
    title: "What Genesis 1 Is Doing That a Modern Science Textbook Is Not",
    excerpt: "Genesis 1 is a theological polemic, not a science text. It makes radical counter-claims to ancient Near Eastern creation myths, demythologizing nature and establishing God's sovereignty over all creation.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Conflict Narrative Between Science and Religion and Why Historians Have Demolished It",
    excerpt: "The warfare thesis between science and religion has been substantially demolished by historians of science. The scientific revolution was carried out largely by Christians and enabled by a theology of creation.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Young Earth, Old Earth, and Evolutionary Creationism Actually Claim",
    excerpt: "Young Earth Creationism, Old Earth Creationism, and Evolutionary Creationism represent different positions on mechanisms and timescale. All share the conviction that God is Creator; disagreements are not about the gospel.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When a Child Comes Home from College Having Been Told Science Has Disproved God",
    excerpt: "Science describes mechanisms; it does not adjudicate whether mechanisms are all there is or sustained by a Creator. The student needs intellectual equipment and a community that welcomes honest questions.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What the Imago Dei Has to Say About Human Uniqueness in the Age of Evolutionary Biology",
    excerpt: "The Imago Dei can be understood functionally — as the calling to represent God in creation — in a way that fits well with evolutionary accounts without reducing human uniqueness.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Age of the Universe: What the Scientific Evidence Shows and What Faithfulness Requires",
    excerpt: "The scientific consensus on the age of the universe (13.8 billion years) and earth (4.5 billion years) comes from multiple independent lines of evidence. Faithfulness requires intellectual honesty, not defensive anxiety.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Evolution Requires and What It Does Not Require of Christian Theology",
    excerpt: "Evolution does not determine whether the mind is more than the brain or whether there is genuine moral truth. The questions remain genuinely open, and Christian tradition has resources for engaging them.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "When the Science-and-Faith Divide Has Driven People Out of the Church",
    excerpt: "Young adults leave the church partly due to perceived anti-intellectualism. Many love both Darwin and God but were not given theological resources to hold both together.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "What Francis Collins, John Polkinghorne, and Alister McGrath Offer the Curious Christian",
    excerpt: "Collins, Polkinghorne, and McGrath model that rigorous intellectual engagement and genuine Christian faith are not merely compatible but mutually illuminating.",
    pillar: "Theological Depth",
    readTime: 11,
  },
  {
    title: "The Doctrine of Creation and Why It Has Always Been About More Than Origins",
    excerpt: "The doctrine of creation is about the relationship between Creator and creation — grounding the goodness of the material world, the nature of human beings as creatures, and the eschatological renewal of all things.",
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
