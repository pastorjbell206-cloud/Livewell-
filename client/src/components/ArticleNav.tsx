/**
 * ArticleNav — "Keep reading" two-up flow between essays.
 *
 * Real <a href> links (not button+navigate) so crawlers follow them. Prev is
 * the older essay, Next is the newer one; either side is omitted gracefully
 * when there's nothing there. This sits alongside (not instead of) Related.
 */
import { resolveTrack } from "@/lib/taxonomy";

export interface AdjacentPost {
  slug: string;
  title: string;
  pillar?: string | null;
}

interface ArticleNavProps {
  prev?: AdjacentPost | null;
  next?: AdjacentPost | null;
}

function kickerFor(pillar: string | null | undefined): string {
  return resolveTrack(pillar)?.kicker ?? "Essay";
}

function NavCard({
  post,
  direction,
}: {
  post: AdjacentPost;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <a
      href={`/writing/${post.slug}`}
      className={`article-nav__card article-nav__card--${direction}`}
    >
      <span className="article-nav__dir">
        {isPrev ? "← Previous essay" : "Next essay →"}
      </span>
      <span className="article-nav__kicker">{kickerFor(post.pillar)}</span>
      <span className="article-nav__title">{post.title}</span>
    </a>
  );
}

export function ArticleNav({ prev, next }: ArticleNavProps) {
  if (!prev && !next) return null;
  return (
    <nav className="article-nav" aria-label="More essays">
      {prev ? <NavCard post={prev} direction="prev" /> : <span />}
      {next ? <NavCard post={next} direction="next" /> : <span />}
    </nav>
  );
}

export default ArticleNav;
