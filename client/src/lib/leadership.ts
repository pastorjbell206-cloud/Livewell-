/**
 * Configuration for the Leadership Formation section (/leadership). The home
 * for the working pastor and the lay leader: the inner life, leading people,
 * the work of ministry, preaching, administration, and the building and
 * rebuilding of churches. Long-form articles live as JSON in
 * client/public/leadership/articles/<slug>.json. Interactive tools are
 * stateless (localStorage only, no login). The team workspace at
 * /leadership/team is the one authenticated feature and lives separately.
 */

export interface Reading { title: string; author: string; }

/** A long-form leadership article. */
export interface LeadershipArticle {
  slug: string;
  title: string;
  subtitle: string;
  kicker: string;
  group: string;
  sections: { id: string; kicker: string; title: string; body: string }[];
  keyTexts?: string[];
  furtherReading?: Reading[];
}

export interface ArticleIndexEntry {
  slug: string;
  group: string;
  title: string;
  blurb: string;
}

export interface ToolLink {
  href: string;
  kicker: string;
  title: string;
  blurb: string;
}

export const LEADERSHIP_GROUPS = [
  "The Inner Life of the Leader",
  "Leading People",
  "The Work of Ministry",
  "Preaching and Teaching",
  "Administration and Rhythm",
  "Building and Rebuilding",
] as const;

/** Article index. Full bodies live in client/public/leadership/articles/<slug>.json. */
export const LEADERSHIP_ARTICLES: ArticleIndexEntry[] = [
  // The Inner Life of the Leader
  { slug: "the-call", group: "The Inner Life of the Leader", title: "The Call and the Ambition", blurb: "How to tell a call from a hunger for significance, and why the difference decides everything that follows." },
  { slug: "character-over-gifting", group: "The Inner Life of the Leader", title: "Character Outlasts Gifting", blurb: "Gifting gets you the platform. Character decides whether you survive it. The thing no search committee can measure." },
  { slug: "the-leaders-burnout", group: "The Inner Life of the Leader", title: "The Tired Shepherd", blurb: "Burnout, rest, and the difference between laying your life down and letting it be taken. Sustainability as obedience." },
  { slug: "pride-and-the-platform", group: "The Inner Life of the Leader", title: "Pride and the Platform", blurb: "The slow corruption of the leader who is praised for a living, and the disciplines that keep the self from swelling." },
  { slug: "the-secret-life", group: "The Inner Life of the Leader", title: "The Life No One Sees", blurb: "The prayer, the marriage, the hidden hours. Why the unseen life is the only thing holding the seen one up." },

  // Leading People
  { slug: "the-elders", group: "Leading People", title: "The Office of Elder", blurb: "What the New Testament asks of an elder, how to identify one, and why plurality protects everyone, the pastor included." },
  { slug: "the-deacons", group: "Leading People", title: "The Office of Deacon", blurb: "The ministry of service that frees the word to go forward. What deacons are for, and the failure mode of both extremes." },
  { slug: "leading-staff", group: "Leading People", title: "Leading Paid Staff", blurb: "Hiring, firing, and leading people whose salary you sign. Where grace and accountability meet, and where they collide." },
  { slug: "ministry-teams", group: "Leading People", title: "Recruiting and Releasing Volunteers", blurb: "The whole church is the ministry. How to enlist, equip, and release people without using them up." },
  { slug: "handling-conflict", group: "Leading People", title: "When the Body Fights", blurb: "Conflict is not a sign the church is failing. Avoiding it is. Matthew 18, the antagonist, and the cost of peace at any price." },
  { slug: "raising-leaders", group: "Leading People", title: "Doing Yourself Out of a Job", blurb: "Delegation, succession, and the leader who cannot let go. Why the goal is multiplication, not indispensability." },

  // The Work of Ministry
  { slug: "the-ministry-of-presence", group: "The Work of Ministry", title: "The Ministry of Presence", blurb: "Visitation, the hospital room, the kitchen table. The unscalable, unglamorous work that is most of the job." },
  { slug: "pastoral-counseling", group: "The Work of Ministry", title: "Counseling and Its Limits", blurb: "The pastor as counselor, the difference between soul care and therapy, and the wisdom to know when to refer." },
  { slug: "the-funeral", group: "The Work of Ministry", title: "Standing at the Grave", blurb: "Officiating a funeral, preaching to the grieving, and telling the truth about death in the presence of hope." },
  { slug: "the-wedding", group: "The Work of Ministry", title: "Marrying People Well", blurb: "Premarital work, the ceremony, and refusing to let the wedding eclipse the marriage you are actually preparing." },
  { slug: "crisis-care", group: "The Work of Ministry", title: "When the Phone Rings at 2 a.m.", blurb: "The suicide, the accident, the diagnosis. Showing up to the worst day of someone's life without falling apart in it." },

  // Preaching and Teaching
  { slug: "sermon-prep", group: "Preaching and Teaching", title: "From the Text to the Sermon", blurb: "A working method for preparing a sermon that honors the text and lands on a Tuesday. The whole arc, week by week." },
  { slug: "using-illustrations", group: "Preaching and Teaching", title: "The Window and the Wall", blurb: "An illustration is a window, not decoration. How to find them, how to use them, and the kinds that betray the text." },
  { slug: "preaching-that-lands", group: "Preaching and Teaching", title: "Preaching That Lands", blurb: "Delivery, application, and the difference between a lecture about the Bible and a word from God to this room." },
  { slug: "the-preaching-calendar", group: "Preaching and Teaching", title: "Planning a Year of Preaching", blurb: "Series, seasons, and the long diet you are feeding a congregation. Why planning is not the enemy of the Spirit." },

  // Administration and Rhythm
  { slug: "the-leaders-calendar", group: "Administration and Rhythm", title: "The Tyranny of the Urgent", blurb: "Time, scheduling, and protecting the work only you can do from the noise of the work anyone could do." },
  { slug: "meetings-that-matter", group: "Administration and Rhythm", title: "Meetings That Are Not a Waste", blurb: "Why most church meetings are bad, what a good one does, and how to lead one that ends with a decision and not a fog." },
  { slug: "church-administration", group: "Administration and Rhythm", title: "The Systems Under the Soul", blurb: "Budgets, policies, and the unglamorous structures that either free ministry or slowly strangle it." },
  { slug: "money-and-the-church", group: "Administration and Rhythm", title: "Leading a Church With Money", blurb: "Budgets, generosity, transparency, and the pastor's complicated relationship with the offering plate." },

  // Building and Rebuilding
  { slug: "revitalization", group: "Building and Rebuilding", title: "Revitalizing a Dying Church", blurb: "The hard, slow, often thankless work of leading a declining church back to life, and the honest odds of it." },
  { slug: "church-planting", group: "Building and Rebuilding", title: "Planting a Church", blurb: "Counting the cost before you start, the first eighteen months, and the difference between a launch and a church." },
  { slug: "leading-change", group: "Building and Rebuilding", title: "Leading Change Without Splitting the Church", blurb: "How to move a congregation without running it over. The pace of change, the power of trust, and the patience it costs." },
];

export const LEADERSHIP_TOOLS: ToolLink[] = [
  { href: "/leadership/team", kicker: "The workspace", title: "The Leadership Team", blurb: "A shared workspace for pastors, elders, deacons, and team leaders. Channels, posts, tasks, and announcements, all in one place. Requires sign-in." },
  { href: "/leadership/library", kicker: "The library", title: "The Leadership Library", blurb: "The whole corpus in one searchable place. Formation, leadership, preaching, and the careful handling of the text, by category." },
  { href: "/leadership/sermon-series", kicker: "Preaching", title: "The Sermon Series Library", blurb: "Series to preach straight through a book of the Bible, and topical series around a real question, each with a sermon-by-sermon breakdown." },
  { href: "/leadership/sermon-prep", kicker: "Preaching", title: "The Sermon Prep Workbench", blurb: "A guided workflow from the text to the pulpit, with the exegetical and homiletical questions worth answering at each stage. Saves to your browser." },
  { href: "/leadership/illustrations", kicker: "Preaching", title: "The Illustration Library", blurb: "A searchable bank of sermon illustrations, sorted by theme and text, each with the point it actually serves. Save the ones you want." },
  { href: "/leadership/meeting", kicker: "Administration", title: "The Meeting Builder", blurb: "Build an agenda that ends in decisions, not fog. Templates for elder meetings, staff meetings, and vision sessions." },
  { href: "/leadership/visitation", kicker: "Pastoral care", title: "The Visitation Tracker", blurb: "Keep track of who you have seen, who is waiting, and who is about to fall through the cracks. Stays on your device." },
  { href: "/leadership/assessment/elder-readiness", kicker: "Assessment", title: "Elder Readiness", blurb: "A searching, biblically grounded self-examination against the qualifications for the office. For discernment, not a scorecard." },
  { href: "/leadership/assessment/deacon-readiness", kicker: "Assessment", title: "Deacon Readiness", blurb: "The same honest examination for the ministry of service, against the New Testament's actual requirements." },
  { href: "/leadership/assessment/burnout", kicker: "Assessment", title: "The Burnout Check", blurb: "An honest read on where you are on the road to burnout, and what the warning lights are actually telling you." },
  { href: "/leadership/assessment/revitalization", kicker: "Assessment", title: "The Revitalization Diagnostic", blurb: "A clear-eyed read on the health of a declining church and the honest question of what it would take to turn it." },
  { href: "/leadership/assessment/planting-readiness", kicker: "Assessment", title: "Church Planting Readiness", blurb: "Counting the cost before you plant. A hard look at calling, capacity, support, and the family that goes with you." },
  { href: "/leadership/survey/church-health", kicker: "Survey", title: "The Church Health Survey", blurb: "An extensive, honest read across the marks of a healthy church, area by area, with feedback on where the work is. For a team to take together." },
  { href: "/leadership/survey/spiritual-gifts", kicker: "Survey", title: "The Spiritual Gifts Test", blurb: "A thorough inventory across the gifts named in Scripture, pointing you toward where you are wired to serve. The body confirms it in the using." },
  { href: "/leadership/survey/revitalization", kicker: "Survey", title: "The Revitalization Survey", blurb: "A detailed, dimension-by-dimension diagnosis of a declining church, naming honestly what is alive, what is dying, and what could turn." },
  { href: "/leadership/workflow/revitalization-plan", kicker: "Planner", title: "The Revitalization Planner", blurb: "A phased, written plan for leading a church back to life, from honest assessment to the first ninety days to the long work of trust." },
  { href: "/leadership/workflow/premarital", kicker: "Workflow", title: "Premarital Counseling", blurb: "A full multi-session premarital workflow: the questions that surface what a couple has not yet faced, session by session." },
  { href: "/leadership/workflow/discipleship", kicker: "Planner", title: "The Discipleship Pathway Planner", blurb: "Design the actual path a person walks from first visit to maturity and ministry in your church, stage by stage, with no gaps." },
  { href: "/leadership/service/wedding", kicker: "Service", title: "The Wedding Service Builder", blurb: "Assemble a wedding service from a library of elements, vows, and charges, each with sample texts to choose and adapt." },
  { href: "/leadership/service/funeral", kicker: "Service", title: "The Funeral Service Builder", blurb: "Build a funeral or memorial service that tells the truth about death in the presence of hope, element by element." },
  { href: "/leadership/governance", kicker: "Library", title: "Board Governance and Policy", blurb: "The policies a healthy church needs, each with why it matters and a plain starter template to copy and adapt. Bylaws, finance, safeguarding, and more." },
  { href: "/leadership/budget", kicker: "Calculator", title: "The Giving and Budget Calculator", blurb: "Allocate a church budget across categories and see the dollars land, with a healthy range on every line. A budget is a theology in numbers." },
  { href: "/leadership/decision-log", kicker: "Log", title: "The Benevolence and Decision Log", blurb: "A private record of benevolence requests and board decisions, kept entirely on your device. Remember what you decided, and why." },
  { href: "/leadership/before-you-post", kicker: "Examen", title: "Before You Post", blurb: "A short, searching examen for a leader with his thumb over the share button. Not a content filter. A heart filter." },
];

export const ASSESSMENT_SLUGS = [
  "elder-readiness",
  "deacon-readiness",
  "burnout",
  "revitalization",
  "planting-readiness",
] as const;
