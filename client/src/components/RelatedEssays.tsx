/**
 * RelatedEssays — a quiet "Keep reading" list of other essays, filed beside the
 * KeepReadingBook card so a reader leaves with both another essay and a book.
 *
 * The picks are STATIC and self-contained. Every slug below is a real /writing
 * essay verified against client/src/lib/pillar-assignments.ts (the filing
 * registry) — this component fetches nothing, so every link resolves and the
 * card never depends on the network settling. We resolve the current post to
 * its six-pillar id via pillarForPost, offer that pillar's cornerstones (minus
 * the current essay, de-duplicated), and top up from a cross-pillar cornerstone
 * set when a pillar is thin — so the reader always gets three to four.
 */
import { Link } from "wouter";
import { pillarForPost } from "@/lib/taxonomy";

interface PostLike {
  slug?: string | null;
  pillar?: string | null;
}

interface RelatedItem {
  slug: string;
  title: string;
  /** One verified line lifted from the essay's own excerpt; may be empty. */
  blurb: string;
}

const CORNERSTONES: Record<number, RelatedItem[]> = {
  1: [
    { slug: "when-god-bless-america-replaces-thy-kingdom-come", title: "When God Bless America Replaces Thy Kingdom Come", blurb: "How Patriotism Became Our Practical Savior." },
    { slug: "what-christian-nationalism-is-and-is-not", title: "What Christian Nationalism Is and What It Is Not", blurb: "The phrase has become a weapon thrown in both directions, and almost nobody using it has stopped to ask what it actually names." },
    { slug: "flags-in-the-sanctuary", title: "Flags in the Sanctuary: A Theology of the Nation", blurb: "The flag stands on most American platforms because nobody put it there on purpose, and that is precisely the problem." },
    { slug: "whose-kingdom-jesus-and-political-power", title: "Whose Kingdom? Jesus and Political Power", blurb: "Jesus was offered every kingdom of the world by someone who actually had them to give, and what he did with the offer settles the question we keep reopening." },
    { slug: "why-poverty-political", title: "Why Poverty Is Political", blurb: "Poverty is not primarily a personal failure." },
    { slug: "silence-abuse-church", title: "The Silence About Abuse in the Church", blurb: "The church's institutional protection of abusers and silencing of victims is one of its most serious failures and most urgent moral crises." },
  ],
  2: [
    { slug: "justice-without-love-ideology", title: "Justice Without Love Is Ideology", blurb: "Justice pursued without love becomes ideology." },
    { slug: "is-poverty-political-the-bibles-answer", title: "Is Poverty Political? The Bible's Uncomfortable Answer", blurb: "The question assumes poverty is either a private misfortune or a partisan football, and the prophets refuse both with a word our politics has no translation for." },
  ],
  3: [
    { slug: "how-to-read-the-bible-without-making-it-say-what-you-want", title: "How to Read the Bible Without Making It Say What You Want", blurb: "Two sincere readers open the same page and find opposite gods." },
    { slug: "what-the-gospel-actually-is", title: "What the Gospel Actually Is", blurb: "The gospel is not advice about how to be good or how to feel loved." },
    { slug: "the-trinity-is-not-optional", title: "The Trinity Is Not Optional", blurb: "We treat the Trinity as the church's embarrassing arithmetic." },
    { slug: "the-council-of-nicaea-what-was-decided-in-325", title: "The Council of Nicaea: What Was Actually Decided in 325", blurb: "Nicaea did not invent the divinity of Jesus or pick the books of the Bible." },
    { slug: "what-is-biblical-justice-mishpat-and-tsedaqah", title: "What Is Biblical Justice? Mishpat and Tsedaqah", blurb: "Biblical justice is two Hebrew words held together, and the church keeps tearing them apart." },
    { slug: "the-image-of-god-and-the-lie-of-race", title: "The Image of God and the Lie of Race", blurb: "Race is a recent invention dressed up as an ancient fact, and the church helped sew the costume." },
  ],
  4: [
    { slug: "the-atheist-in-the-pulpit", title: "The Atheist in the Pulpit", blurb: "I was not a lapsed churchgoer who wandered back." },
    { slug: "excavation-not-demolition", title: "Excavation, Not Demolition", blurb: "Demolition and excavation use the same tools — the pry bar, the shovel, the refusal to respect a wall just because it is standing." },
    { slug: "christendom-is-ending-christianity-is-not", title: "Christendom Is Ending. Christianity Is Not.", blurb: "The arrangement that made Christianity the default religion of the West is dying, and many believers are grieving the wrong thing." },
    { slug: "the-end-of-home-field-advantage", title: "The End of Home-Field Advantage", blurb: "For fifteen centuries the church evangelized a culture that already half believed — the vocabulary pre-taught, the guilt pre-aimed, the God assumed." },
    { slug: "two-kingdoms-faith-and-state", title: "Two Kingdoms: How Christians Relate Faith and State", blurb: "The old teaching that there are two kingdoms has been used both to silence the church and to baptize the state, and it was meant to do neither." },
  ],
  5: [
    { slug: "why-pastors-quit-and-how-to-stay", title: "Why Pastors Quit (And How to Stay)", blurb: "" },
    { slug: "hidden-pain-successful-pastor", title: "The Hidden Pain of the Successful Pastor", blurb: "" },
    { slug: "loneliness-of-leadership", title: "The Loneliness of Leadership", blurb: "Leadership is isolating. The decisions you make affect people." },
    { slug: "how-to-lead-without-losing-your-soul", title: "How to Lead Without Losing Your Soul", blurb: "A man can gain a thriving church and lose the very soul that was supposed to lead it, and most of the practices we call leadership are how he does it." },
    { slug: "the-interior-life-of-the-pastor", title: "The Interior Life of the Pastor", blurb: "A pastor can handle the things of God all week and starve to death spiritually, because handling is not the same as eating." },
  ],
  6: [
    { slug: "the-machine-that-forms-you", title: "The Machine That Forms You", blurb: "Everyone is arguing about what the machines will do to our jobs, our schools, our elections." },
    { slug: "the-hour-that-forms-the-week", title: "The Hour That Forms the Week", blurb: "Every church has a liturgy, including the church that says it does not." },
    { slug: "covenant-vs-contract-what-marriage-is", title: "Covenant vs. Contract: What Marriage Actually Is", blurb: "A contract protects you from the person across the table, and a covenant binds you to them, which is why the modern wedding is a contract dressed in the language of a covenant it no longer believes." },
    { slug: "how-to-raise-children-in-the-faith", title: "How to Raise Children in the Faith Without Crushing Them", blurb: "The opposite of crushing a child into the faith is not letting them choose freely from a neutral distance, because there is no neutral distance, and the home is forming them whether you intend it or not." },
    { slug: "what-fatherhood-requires", title: "What Fatherhood Requires", blurb: "We have spent a generation telling fathers to be present, and presence is necessary and nowhere near sufficient, because a man can be in the room and still hand his children nothing." },
    { slug: "what-the-sabbath-is-and-why-you-need-it", title: "What the Sabbath Is and Why You Need It", blurb: "" },
  ],
};

const FALLBACK: RelatedItem[] = [
    { slug: "the-atheist-in-the-pulpit", title: "The Atheist in the Pulpit", blurb: "I was not a lapsed churchgoer who wandered back." },
    { slug: "how-to-read-the-bible-without-making-it-say-what-you-want", title: "How to Read the Bible Without Making It Say What You Want", blurb: "Two sincere readers open the same page and find opposite gods." },
    { slug: "when-god-bless-america-replaces-thy-kingdom-come", title: "When God Bless America Replaces Thy Kingdom Come", blurb: "How Patriotism Became Our Practical Savior." },
    { slug: "christendom-is-ending-christianity-is-not", title: "Christendom Is Ending. Christianity Is Not.", blurb: "The arrangement that made Christianity the default religion of the West is dying, and many believers are grieving the wrong thing." },
    { slug: "covenant-vs-contract-what-marriage-is", title: "Covenant vs. Contract: What Marriage Actually Is", blurb: "A contract protects you from the person across the table, and a covenant binds you to them, which is why the modern wedding is a contract dressed in the language of a covenant it no longer believes." },
    { slug: "why-pastors-quit-and-how-to-stay", title: "Why Pastors Quit (And How to Stay)", blurb: "" },
];

/** Up to four other essays, current excluded, de-duped, topped up when thin. */
function pickRelated(post: PostLike): RelatedItem[] {
  const current = (post.slug ?? "").trim();
  const pillarId = pillarForPost(post)?.id ?? 5;
  const seen = new Set<string>([current]);
  const out: RelatedItem[] = [];
  const take = (list: RelatedItem[]) => {
    for (const item of list) {
      if (out.length >= 4) break;
      if (!item.slug || seen.has(item.slug)) continue;
      seen.add(item.slug);
      out.push(item);
    }
  };
  take(CORNERSTONES[pillarId] ?? []);
  if (out.length < 3) take(FALLBACK);
  return out;
}

export function RelatedEssays({ post }: { post: PostLike }) {
  const items = pickRelated(post);
  if (items.length === 0) return null;

  return (
    <section
      style={{
        background: "var(--bone)",
        padding: "var(--s-6) var(--s-4)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "var(--U)",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--mustard-text)",
            marginBottom: "20px",
          }}
        >
          Keep reading · Another essay
        </div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {items.map((item, i) => (
            <li
              key={item.slug}
              style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}
            >
              <Link
                href={`/writing/${item.slug}`}
                style={{
                  display: "block",
                  padding: "18px 0",
                  textDecoration: "none",
                  color: "var(--ink)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--mustard-text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--ink)";
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--F)",
                    fontSize: "22px",
                    fontWeight: 500,
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                    color: "inherit",
                  }}
                >
                  {item.title}
                </span>
                {item.blurb && (
                  <span
                    style={{
                      display: "block",
                      marginTop: "6px",
                      fontFamily: "var(--B)",
                      fontSize: "15px",
                      lineHeight: 1.5,
                      color: "var(--ink-muted)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.blurb}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
