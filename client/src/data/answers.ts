/**
 * The Answers hub data (/answers). Each entry is a real reader question whose
 * H2 is the query itself, answered in three tight paragraphs distilled from
 * the essay that carries the full argument, laddering short answer → essay →
 * book. The paragraphs are compressions of their source essays — no claim,
 * citation, or verse appears here that is not in the essay. Edit the answer
 * by editing its essay first; this layer only surfaces it.
 */
export interface Answer {
  /** URL anchor + FAQ identity — the question in kebab form. */
  slug: string;
  /** The reader's actual question, verbatim. Rendered as the H2. */
  question: string;
  /** Three paragraphs: direct answer → strongest ground → the weight it leaves. */
  paragraphs: string[];
  /** The essay that makes the argument in full. */
  essaySlug: string;
  essayTitle: string;
  /** The book that carries it the rest of the way. */
  bookTitle: string;
  bookHref: string;
}

export const ANSWERS: Answer[] = [
  {
    slug: "did-the-resurrection-actually-happen",
    question: "Did the resurrection actually happen?",
    paragraphs: [],
    essaySlug: "did-the-resurrection-happen",
    essayTitle: "Did the Resurrection Actually Happen?",
    bookTitle: "The Reliability of Scripture",
    bookHref: "/books/the-reliability-of-scripture",
  },
  {
    slug: "why-would-anyone-trust-the-bible",
    question: "Why would anyone trust the Bible?",
    paragraphs: [],
    essaySlug: "why-trust-the-bible",
    essayTitle: "Why Would Anyone Trust the Bible?",
    bookTitle: "The Reliability of Scripture",
    bookHref: "/books/the-reliability-of-scripture",
  },
  {
    slug: "if-god-is-good-why-suffering",
    question: "If God is good, why is there so much suffering?",
    paragraphs: [],
    essaySlug: "if-god-is-good-why-suffering",
    essayTitle: "If God Is Good, Why Is There So Much Suffering?",
    bookTitle: "Prayer in the Dark",
    bookHref: "/prayer-in-the-dark",
  },
  {
    slug: "what-if-christianity-is-wrong",
    question: "What if Christianity is wrong?",
    paragraphs: [],
    essaySlug: "what-if-we-are-wrong",
    essayTitle: "What If Christianity Is Wrong?",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
  {
    slug: "was-jesus-just-a-good-teacher",
    question: "Was Jesus just a good teacher?",
    paragraphs: [],
    essaySlug: "was-jesus-just-a-good-teacher",
    essayTitle: "Was Jesus Really Just a Good Teacher?",
    bookTitle: "The Scandal of the Cross",
    bookHref: "/the-scandal-of-the-cross",
  },
  {
    slug: "do-i-have-to-choose-between-faith-and-science",
    question: "Do I have to choose between faith and science?",
    paragraphs: [],
    essaySlug: "faith-and-science",
    essayTitle: "Do You Have to Choose Between Faith and Science?",
    bookTitle: "Born Again From Atheism",
    bookHref: "/born-again-from-atheism",
  },
  {
    slug: "is-it-okay-to-be-angry-at-god",
    question: "Is it okay to be angry at God?",
    paragraphs: [],
    essaySlug: "what-psalms-teach-about-anger-at-god",
    essayTitle: "Is It Okay to Be Angry at God?",
    bookTitle: "Prayer in the Dark",
    bookHref: "/prayer-in-the-dark",
  },
  {
    slug: "can-you-be-a-christian-without-church",
    question: "Can you be a Christian without going to church?",
    paragraphs: [],
    essaySlug: "can-you-be-a-christian-alone",
    essayTitle: "Can You Be a Christian on Your Own?",
    bookTitle: "The Body You Left",
    bookHref: "/the-body-you-left",
  },
  {
    slug: "done-with-church-but-not-jesus",
    question: "What if I'm done with church but not with Jesus?",
    paragraphs: [],
    essaySlug: "done-with-church-not-jesus",
    essayTitle: "What If You're Done With Church but Not With Jesus?",
    bookTitle: "The Body You Left",
    bookHref: "/the-body-you-left",
  },
  {
    slug: "what-happens-after-deconstruction",
    question: "What happens after you deconstruct your faith?",
    paragraphs: [],
    essaySlug: "deconstruction-without-reconstruction",
    essayTitle: "What Happens After You Deconstruct Your Faith?",
    bookTitle: "Faith After Deconstruction",
    bookHref: "/faith-after-deconstruction",
  },
  {
    slug: "how-can-god-be-three-and-one",
    question: "How can God be three and one?",
    paragraphs: [],
    essaySlug: "the-trinity-plainly",
    essayTitle: "How Can God Be Three and One?",
    bookTitle: "Why Not What",
    bookHref: "/why-not-what",
  },
  {
    slug: "should-a-christian-follow-a-political-party",
    question: "Should a Christian follow a political party?",
    paragraphs: [],
    essaySlug: "conscience-outsourced-to-party",
    essayTitle: "Should a Christian Follow a Political Party?",
    bookTitle: "When God Bless America Replaces Thy Kingdom Come",
    bookHref: "/books/when-god-bless-america",
  },
  {
    slug: "what-does-the-bible-say-about-money",
    question: "What does the Bible actually say about money?",
    paragraphs: [],
    essaySlug: "what-the-bible-says-about-money",
    essayTitle: "What the Bible Actually Says About Money",
    bookTitle: "Where Your Treasure Is",
    bookHref: "/where-your-treasure-is",
  },
  {
    slug: "what-does-the-bible-say-about-anxiety",
    question: "What does the Bible say about anxiety?",
    paragraphs: [],
    essaySlug: "what-jesus-said-about-worry-and-money",
    essayTitle: "What Jesus Said About Worry and Money",
    bookTitle: "Consider the Birds",
    bookHref: "/consider-the-birds",
  },
  {
    slug: "when-your-teenager-says-they-dont-believe",
    question: "What do I do when my teenager says they don't believe?",
    paragraphs: [],
    essaySlug: "teenager-losing-faith",
    essayTitle: "When Your Teenager Says They Don't Believe Anymore",
    bookTitle: "Raising Believers",
    bookHref: "/books/raising-believers",
  },
];
