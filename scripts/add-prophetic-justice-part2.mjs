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
  // Race & Reconciliation (6 articles)
  {
    title: "When a Racially Diverse Congregation Requires More Than Diverse Faces on Stage",
    excerpt: "Diverse representation on a stage is not the same thing as a diverse community. The distinction matters, and the church has often conflated them.",
    pillar: "Prophetic Justice",
    readTime: 9,
  },
  {
    title: "The Long History of Theology Used to Justify Racial Hierarchy",
    excerpt: "The curse of Ham was not used as a justification for racial hierarchy in most of church history. It became that justification in the context of the Atlantic slave trade.",
    pillar: "Prophetic Justice",
    readTime: 9,
  },
  {
    title: "What the Beloved Community Requires That Polite Integration Does Not",
    excerpt: "The Beloved Community requires something more difficult than polite integration. It requires the person with more power to ask what the person with less power needs.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When Race Divides a Congregation and the Pastor Has to Lead Through It",
    excerpt: "The pastoral vocation does not provide an escape from prophetic responsibility. It intensifies it.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "The White Christian's Guide to Listening Before Speaking on Race",
    excerpt: "Listening before speaking does not require agreement. It requires sitting with someone else's experience long enough to understand what it actually is.",
    pillar: "Prophetic Justice",
    readTime: 9,
  },
  {
    title: "What the Church Looks Like When It Actually Lives Out Galatians 3:28",
    excerpt: "The church that lives out Galatians 3:28 is recognizable by its cost. It requires something of everyone.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },

  // Christian Nationalism (12 articles)
  {
    title: "What Christian Nationalism Is — and Why It Is a Theological Problem, Not Just a Political One",
    excerpt: "Christian Nationalism collapses the distinction between the Kingdom of God and a particular human nation. It asks the church to invest its eschatological hope in a political project.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "The Difference Between Patriotism and the Idolatry of Nation",
    excerpt: "Patriotism is a legitimate affection. You can love the place you are from without making it the object of ultimate allegiance. It becomes idolatrous when it demands the loyalty that belongs only to God.",
    pillar: "Prophetic Justice",
    readTime: 9,
  },
  {
    title: "When the Church's Political Loyalty Has Compromised Its Gospel Witness",
    excerpt: "The single most cited reason young people give for leaving the church is its perceived alignment with a political party.",
    pillar: "Prophetic Justice",
    readTime: 9,
  },
  {
    title: "What a Genuinely Post-Partisan Christianity Would Actually Look Like",
    excerpt: "Post-partisan does not mean apolitical. It means the church's political engagement is governed by its theological commitments rather than by its tribal loyalties.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "The History of Civil Religion in America and the Church's Complicity in It",
    excerpt: "Civil religion needs the church's moral legitimacy. The church has provided it, repeatedly, in exchange for cultural influence that has consistently cost it more than it gained.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When God and Country Have Been Collapsed Into a Single Loyalty",
    excerpt: "There is a moment in the collapse when the flag and the cross become interchangeable. That moment has arrived in some American Christian communities.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "What the Early Church's Relationship to the Roman Empire Teaches the Contemporary Church",
    excerpt: "The early church developed a theology of resident alienhood that the contemporary church would do well to recover.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Kingdom of God Is Not a Political Platform — Even a Conservative One",
    excerpt: "The Kingdom of God makes demands that no political platform has ever fully embraced. Not a conservative one. Not a progressive one.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When Evangelical Becomes a Political Label Rather Than a Theological One",
    excerpt: "Evangelical was a theological term before it was a political one. In polling data and journalistic shorthand, it has become a demographic category.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "What the Church Loses When It Binds the Gospel to Any Political Party",
    excerpt: "The first thing the church loses is its capacity to speak to the people on the other side. The gospel is addressed to all people.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Christian Voter's Dilemma and the Framework Most Sermons Avoid",
    excerpt: "No candidate and no party fully embodies the Kingdom of God. Every election presents a choice between options that are seriously deficient in different ways.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "When Political Fear Replaces Biblical Hope as the Congregation's Primary Motivation",
    excerpt: "You can identify which one is operating by asking a simple question: what is the primary emotion driving the community's engagement with public life?",
    pillar: "Prophetic Justice",
    readTime: 11,
  },

  // LGBTQ+ & Gender (15 articles)
  {
    title: "What the Church Owes the Gay Christian It Has Too Often Asked to Simply Leave",
    excerpt: "The church has not always asked gay Christians to leave with words. It has asked them to leave with silence.",
    pillar: "Prophetic Justice",
    readTime: 9,
  },
  {
    title: "The Difference Between Same-Sex Attraction and Same-Sex Behavior in the Theological Debate",
    excerpt: "The distinction matters, and collapsing it has caused serious pastoral harm.",
    pillar: "Prophetic Justice",
    readTime: 9,
  },
  {
    title: "When a Child Comes Out and the Parents Don't Know What Faithfulness Looks Like",
    excerpt: "The theological positions that seemed settled become suddenly more complicated when it becomes about their child.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "What a Genuinely Pastoral Response to the Transgender Person Requires",
    excerpt: "The person who presents as transgender is, first and before anything else, a person who bears the image of God.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "The Celibacy Option: What It Actually Asks and What the Church Owes Those Called to It",
    excerpt: "The church has not prepared people for celibacy as a genuine vocation with its own integrity and demands.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "What Side A and Side B Christians Both Get Right — and What Each Gets Wrong",
    excerpt: "Both sides are populated by people who love God, love gay Christians, and are trying to be faithful. The disagreement is real.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "When Love and Truth Are Treated as Opposites in the Sexuality Debate",
    excerpt: "This framing contradicts the New Testament's most basic claim about the nature of God. Love is what God is.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "The Person Who Left the Church Because They Felt They Had No Place in It",
    excerpt: "She left because the community did not know how to love her well. Not because it held the wrong theology.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "What the Complementarian and Egalitarian Debate Is Actually Arguing Over",
    excerpt: "Beneath the exegetical disputes is a more fundamental question: what is the relationship between the created order, the fall, and the new creation?",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "Women in Church Leadership: Reading the Hard Texts in Full Context",
    excerpt: "Both texts deserve more careful reading than they usually receive in either direction.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "What a Church That Neither Capitulates Nor Condemns Looks Like on LGBTQ+ Issues",
    excerpt: "The church that neither capitulates nor condemns holds the historic teaching with theological seriousness and holds the person with pastoral presence.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Difference Between a Church That Is Welcoming and One That Is Affirming",
    excerpt: "The distinction is real and the confusion between them has generated an enormous amount of unnecessary conflict.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When Gender Dysphoria Is in Your Family and the Church Has No Good Language for It",
    excerpt: "The parents need the church to have something to offer that is more useful than a position statement.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What the Historic Christian Tradition Has Said About Human Sexuality — and Why It Still Matters",
    excerpt: "The historic Christian teaching on sexuality is not a Victorian invention. It is a position with a coherent theological rationale.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Young Person Who Grew Up in the Church and Is Now Questioning Everything About Sexuality",
    excerpt: "What they needed was a church that had actually thought through what faithfulness looks like for a gay Christian.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },

  // Poverty & Wealth (10 articles)
  {
    title: "What the Gospels' Teaching on Money Requires That the Prosperity Gospel Cannot Deliver",
    excerpt: "Jesus talks about money more than he talks about prayer. Virtually none of it sounds like the prosperity gospel's account.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "The Difference Between Charity and Justice — and Why the Church Needs Both",
    excerpt: "Charity addresses the symptom. Justice addresses the cause. Both are necessary.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When Systemic Poverty Is Addressed as Individual Moral Failure",
    excerpt: "A framework that treats individual moral failure as the sufficient explanation for generational poverty is not honest engagement with the evidence.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "What the Gleaning Laws, the Jubilee, and the Tithe Have in Common",
    excerpt: "The Mosaic economic legislation is a coherent theological vision of economic life in which the poor have legal claims on the community's resources.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Wealth Gap and the Church That Has Often Baptized It",
    excerpt: "The church's response to the wealth gap has been to baptize it — to provide theological justification for why the current distribution reflects something other than structural failure.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "When the Congregation's Economic Diversity Requires More Than Mixed Seating",
    excerpt: "Economic diversity in a congregation requires shared power, not just shared space.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What a Theology of Enough Looks Like When Applied to the American Middle Class",
    excerpt: "The theology of enough is most uncomfortable when applied to the people doing the commending.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The Working Poor Who Are in Your Congregation and Cannot Say So",
    excerpt: "They work full-time and still cannot cover a $400 emergency without going into debt.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "What the Parable of Lazarus and the Rich Man Is Saying to a Comfortable Church",
    excerpt: "The judgment that follows is not for active cruelty. It is for passive comfort.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When Mission Trips Are Easier Than Local Economic Engagement",
    excerpt: "Local economic engagement requires something the mission trip does not: proximity without the containment of a scheduled departure.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },

  // Creation Care (10 articles)
  {
    title: "What 'Dominion' in Genesis 1 Actually Means — and What It Has Been Used to Justify",
    excerpt: "The dominion of Genesis 1:28 appears in the same verse as the Imago Dei. The connection is not accidental.",
    pillar: "Prophetic Justice",
    readTime: 9,
  },
  {
    title: "The Christian Case for Environmental Stewardship That Is Not a Progressive Capitulation",
    excerpt: "The Christian case for environmental stewardship is theologically conservative, not theologically progressive.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When Dispensational Eschatology Made the Evangelical Church Indifferent to Creation",
    excerpt: "The practical implication for environmental ethics has sometimes been stated explicitly: why invest in a world that is about to be destroyed?",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What a Resurrection Theology Demands of Our Relationship to the Physical World",
    excerpt: "If the physical is what God is redeeming, then the physical has a dignity and a future that cannot be dismissed.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "The Climate Conversation the Church Has Been Avoiding and Why It Cannot Anymore",
    excerpt: "The science of climate change is not in serious dispute among climate scientists. The church has largely avoided this conversation for a predictable reason.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What the Sabbath Year (Shemitah) Understood About the Land's Rights Before Productivity's",
    excerpt: "The Sabbath year required that the land of Israel lie fallow every seventh year. The land had a claim on rest.",
    pillar: "Prophetic Justice",
    readTime: 10,
  },
  {
    title: "When Environmental Concern Is Dismissed as Liberal Politics in the Conservative Church",
    excerpt: "The political capture works both ways. The conservative church that refuses to engage environmental concern has also allowed a political coalition to override a theological conviction.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What Romans 8's Groaning of Creation Has to Say to the Contemporary Ecological Crisis",
    excerpt: "Paul is giving the non-human creation a voice — not merely a backdrop status, but a participant in the cosmic story of fall and redemption.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "The New Creation Theology and What It Demands of Those Who Are Waiting for It",
    excerpt: "The new creation is not a replacement for the old creation. It is its redemption.",
    pillar: "Prophetic Justice",
    readTime: 11,
  },
  {
    title: "What Creation Care Looks Like in the Local Church When It Is Rooted in Theology, Not Trend",
    excerpt: "Creation care rooted in theology looks different. It begins with the question: what has God charged us with, and are we doing it?",
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
