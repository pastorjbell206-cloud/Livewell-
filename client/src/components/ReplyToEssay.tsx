/**
 * ReplyToEssay — the reply channel under every essay.
 *
 * The audit's own measure of success is "an email that argues with the
 * piece." This is the smallest honest way to invite one: two sentences in
 * James's register and a single link that opens the reader's mail client with
 * the essay's title as the subject and an empty body. No form, no server, no
 * tracking beyond the pageview. The copy and the address live in
 * client/src/data/reply.json so scripts/prerender-heads.mjs can render the
 * same block into the static essay HTML before the app mounts.
 */
import reply from "@/data/reply.json";

export const REPLY_EMAIL: string = reply.email;
export const REPLY_COPY: string = reply.copy;
export const REPLY_LINK: string = reply.link;

/** The mailto href: the reader's client opens with the essay title as subject. */
export function replyMailto(title: string): string {
  return `mailto:${REPLY_EMAIL}?subject=${encodeURIComponent(title)}`;
}

export function ReplyToEssay({ title }: { title: string }) {
  return (
    <aside
      aria-label="Reply to this essay"
      style={{ padding: "var(--s-5) var(--s-4)" }}
    >
      <div
        style={{
          maxWidth: "var(--w-prose)",
          margin: "0 auto",
          paddingTop: "var(--s-4)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--U)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--mustard-text)",
            marginBottom: "10px",
          }}
        >
          {reply.eyebrow}
        </div>
        <p
          style={{
            fontFamily: "var(--F)",
            fontSize: "20px",
            lineHeight: 1.5,
            color: "var(--ink)",
            maxWidth: "48ch",
            margin: "0 0 16px",
          }}
        >
          {REPLY_COPY}
        </p>
        <a
          href={replyMailto(title)}
          style={{
            fontFamily: "var(--U)",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--ink)",
            borderBottom: "1px solid var(--mustard)",
            paddingBottom: "2px",
            textDecoration: "none",
          }}
        >
          {REPLY_LINK}
        </a>
      </div>
    </aside>
  );
}

export default ReplyToEssay;
