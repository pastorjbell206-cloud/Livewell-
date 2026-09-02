/**
 * SubstackSeriesNote — one sentence, once per essay, on the essays that are
 * part of the argument the Substack is serializing.
 *
 * Short-form register: direct, no exclamation point, no modal, no
 * interstitial. Renders null for essays outside the political, Scripture, and
 * after-Christendom material. The gate lives in lib/taxonomy.ts
 * (isSeriesEssay) — see the note there on why it is not simply "pillar id in
 * {1, 3, 6}": 59% of the library has no explicit pillar and would be missed,
 * including every essay on the politics and after-christendom tracks.
 *
 * Follows the KeepReadingBook / RelatedEssays pattern: takes the raw post and
 * resolves internally, so the page keeps no shared pillar state.
 */
import { ExternalLink } from "lucide-react";

import { isSeriesEssay } from "@/lib/taxonomy";
import { substackSubscribeUrl } from "@/lib/site";
import { SUBSTACK_SERIES_TITLE, SUBSTACK_SERIES_URL } from "@/lib/positioning";

interface PostLike {
  slug?: string | null;
  pillar?: string | null;
}

const linkStyle: React.CSSProperties = {
  color: "var(--ink)",
  textDecoration: "underline",
  textDecorationColor: "var(--mustard)",
  textUnderlineOffset: "3px",
};

export function SubstackSeriesNote({ post }: { post: PostLike }) {
  if (!isSeriesEssay(post)) return null;
  const subscribe = substackSubscribeUrl(undefined, "essay-series-note");

  return (
    <aside
      aria-label="On Substack"
      style={{
        maxWidth: "var(--w-prose)",
        margin: "0 auto",
        padding: "var(--s-4) var(--s-3) 0",
        borderTop: "1px solid var(--bone-muted)",
      }}
    >
      <p className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>
        On Substack
      </p>
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: "15px",
          lineHeight: 1.7,
          color: "var(--ink)",
          maxWidth: "62ch",
          margin: 0,
        }}
      >
        This essay is part of the argument <em>{SUBSTACK_SERIES_TITLE}</em> is making, in parts, on
        the Substack.{" "}
        <a href={SUBSTACK_SERIES_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>
          Read the first part
        </a>{" "}
        or{" "}
        <a href={subscribe} target="_blank" rel="noopener noreferrer" style={linkStyle}>
          subscribe
          <ExternalLink size={12} aria-hidden style={{ display: "inline", verticalAlign: "middle", marginLeft: "4px" }} />
        </a>
        .
      </p>
    </aside>
  );
}

export default SubstackSeriesNote;
