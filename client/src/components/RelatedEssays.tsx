/**
 * RelatedEssays — a quiet "Keep reading" list of other essays, filed beside the
 * KeepReadingBook card so a reader leaves with both another essay and a book.
 *
 * The picks are STATIC and self-contained. Every slug below is a real /writing
 * essay verified against client/src/lib/pillar-assignments.ts (the filing
 * registry) — this component fetches nothing, so every link resolves and the
 * card never depends on the network settling. We resolve the current post to
 * its pillar id via pillarForPost, offer that pillar's cornerstones (minus
 * the current essay, de-duplicated), and top up from a cross-pillar cornerstone
 * set when a pillar is thin — so the reader always gets three to four.
 */
import { Link } from "wouter";
import { pillarForPost } from "@/lib/taxonomy";

interface PostLike {
  slug?: string | null;
  related?: { slug: string; title: string; deck?: string }[] | null;
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
    { slug: "what-christian-nationalism-is-and-is-not", title: "What Christian Nationalism Is and What It Is Not", blurb: "The phrase has become a weapon thrown in both directions, and almost nobody using it has stopped to ask what it actually names." },
    { slug: "the-flag-in-the-sanctuary", title: "Should Churches Have an American Flag in the Sanctuary?", blurb: "The flag beside the pulpit arrived through war and grief, not through a vote or a theology." },
    { slug: "two-kingdoms-faith-and-state", title: "What Does Render Unto Caesar Mean for Church and State?", blurb: "Jesus did not split life into two equal drawers, one for God and one for politics." },
    { slug: "sexual-abuse-crisis-in-the-church", title: "Sexual Abuse in the Church and How Churches Should Respond", blurb: "From Boston to the Southern Baptist Convention to the Church of England, the reports describe one pattern in opposite kinds of church: the crime, and then the institution protecting itself." },
  ],
  2: [
    { slug: "is-poverty-political-the-bibles-answer", title: "What Does the Bible Say About Poverty, and Is It Political?", blurb: "Scripture binds every Christian to the poor through the law, the prophets, Jesus and the apostles, but it hands no party a platform." },
  ],
  3: [
    { slug: "how-to-read-the-bible-without-making-it-say-what-you-want", title: "How to Read the Bible in Context, and Let It Read You", blurb: "Every reader brings something to the Bible, and its worst misreadings came from readers sure they brought nothing." },
    { slug: "what-the-gospel-actually-is", title: "What Is the Gospel? What the Good News Actually Means", blurb: "The gospel is not advice about how to be good, and it is not a reassurance that you already are." },
    { slug: "the-trinity-is-not-optional", title: "What Is the Trinity? Why Christians Believe God Is Three in One", blurb: "The Trinity is not arithmetic the councils laid on top of a simple faith." },
    { slug: "the-council-of-nicaea-what-was-decided-in-325", title: "The Council of Nicaea: What Was Actually Decided in 325", blurb: "Nicaea did not invent the divinity of Jesus or pick the books of the Bible." },
    { slug: "justice-not-political-theological", title: "Is Biblical Justice Political? What Scripture Means by Justice", blurb: "Biblical justice is rooted in God's own character and covenant, not in either party's platform." },
    { slug: "the-image-of-god-and-the-lie-of-race", title: "What Does the Bible Say About Race and Racial Reconciliation?", blurb: "Race as a ranking of human worth is a modern invention the church helped build, not a biblical category." },
  ],
  4: [
    { slug: "the-atheist-in-the-pulpit", title: "The Atheist in the Pulpit: What a Former Atheist Still Hears", blurb: "I didn't wander back to a faith I'd lost." },
    { slug: "excavation-not-demolition", title: "Excavation, Not Demolition", blurb: "Demolition and excavation use the same tools — the pry bar, the shovel, the refusal to respect a wall just because it is standing." },
    { slug: "christendom-is-ending", title: "What Is Christendom, and What Comes After It?", blurb: "Christendom was the settlement that made Christianity the default of Western life, from Constantine to the American Protestant consensus." },
    { slug: "the-end-of-home-field-advantage", title: "The End of Home-Field Advantage", blurb: "For fifteen centuries the church evangelized a culture that already half believed — the vocabulary pre-taught, the guilt pre-aimed, the God assumed." },
    { slug: "two-kingdoms-faith-and-state", title: "What Does Render Unto Caesar Mean for Church and State?", blurb: "Jesus did not split life into two equal drawers, one for God and one for politics." },
  ],
  5: [
    { slug: "how-to-lead-without-losing-your-soul", title: "How to Lead Without Losing Your Soul", blurb: "A man can gain a thriving church and lose the very soul that was supposed to lead it, and most of the practices we call leadership are how he does it." },
    { slug: "the-interior-life-of-the-pastor", title: "The Interior Life of the Pastor", blurb: "A pastor can handle the things of God all week and starve to death spiritually, because handling is not the same as eating." },
  ],
  6: [
    { slug: "the-machine-that-forms-you", title: "The Machine That Forms You", blurb: "Everyone is arguing about what the machines will do to our jobs, our schools, our elections." },
    { slug: "the-hour-that-forms-the-week", title: "The Hour That Forms the Week", blurb: "Every church has a liturgy, including the church that says it does not." },
    { slug: "covenant-vs-contract-what-marriage-is", title: "What Is Covenant Marriage? Why Marriage Is Not a Contract", blurb: "A contract protects two people from each other; a covenant binds them to each other before God." },
    { slug: "how-to-talk-kids-faith-doubt", title: "How to Raise Kids in the Faith When You Have Doubts Yourself", blurb: "Your children will not inherit your certainty." },
    { slug: "what-fatherhood-requires", title: "What Does the Bible Say About Fathers and the Father Wound?", blurb: "The word father is full before the church ever says it." },
    { slug: "what-the-sabbath-is-and-why-you-need-it", title: "What Is the Sabbath and Should Christians Keep It Today?", blurb: "The Sabbath was given twice, once to creatures and once to freed slaves, and Jesus claimed it rather than cancelled it." },
  ],
};

const FALLBACK: RelatedItem[] = [
    { slug: "the-atheist-in-the-pulpit", title: "The Atheist in the Pulpit: What a Former Atheist Still Hears", blurb: "I didn't wander back to a faith I'd lost." },
    { slug: "how-to-read-the-bible-without-making-it-say-what-you-want", title: "How to Read the Bible in Context, and Let It Read You", blurb: "Every reader brings something to the Bible, and its worst misreadings came from readers sure they brought nothing." },
    { slug: "christendom-is-ending", title: "What Is Christendom, and What Comes After It?", blurb: "Christendom was the settlement that made Christianity the default of Western life, from Constantine to the American Protestant consensus." },
    { slug: "covenant-vs-contract-what-marriage-is", title: "What Is Covenant Marriage? Why Marriage Is Not a Contract", blurb: "A contract protects two people from each other; a covenant binds them to each other before God." },
];

/** Up to four other essays, current excluded, de-duped, topped up when thin. */
function pickRelated(post: PostLike): RelatedItem[] {
  // The static essay file carries three picks from the essay's own track,
  // computed at build time (scripts/build-public-essays.mjs). Those win; the
  // pillar cornerstones below are the fallback for database-only essays.
  const built = Array.isArray(post.related)
    ? post.related.filter(r => r && typeof r.slug === "string" && typeof r.title === "string" && r.slug !== post.slug)
    : [];
  if (built.length >= 3) return built.slice(0, 4).map(r => ({ slug: r.slug, title: r.title, blurb: r.deck ?? "" }));
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

export function RelatedEssays({ post, compact = false }: { post: PostLike; compact?: boolean }) {
  const items = pickRelated(post);
  if (items.length === 0) return null;

  return (
    <section
      aria-label="Keep reading"
      style={
        compact
          ? {
              // Inside the essay body: a quiet inset, not a full-bleed band.
              margin: "2.4em 0",
              padding: "20px 24px",
              background: "var(--bone-warm)",
              borderLeft: "2px solid var(--mustard)",
              borderRadius: "var(--radius-sm)",
              fontSize: "16px",
            }
          : {
              background: "var(--bone)",
              padding: "var(--s-6) var(--s-4)",
              borderTop: "1px solid var(--border)",
            }
      }
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
