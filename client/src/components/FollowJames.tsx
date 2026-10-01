/**
 * FollowJames — the one block that says where else James publishes.
 *
 * A reader who finishes something good should not have to hunt for the rest of
 * it. This gathers the newsletter, the books, and the social channels in one
 * place, in plain language about what each one actually gives you.
 *
 * It renders only channels with a real URL (see lib/channels.ts). A platform
 * James has mentioned but not yet linked simply does not appear — no dead
 * icons, no "coming soon".
 */
import { liveChannels } from "@/lib/channels";
import { EditorialIndex } from "@/components/editorial/EditorialIndex";

// The site's own surfaces first: everything written, the books, the things
// to use, and the way to work with James. A reader should be able to reach
// all of it from one block rather than hunting.
const SITE_DOORS = [
  { href: "/explore", title: "The Library", dek: "Everything in one place: essays, guides, studies, and every download, searchable." },
  { href: "/writing", title: "All the writing", dek: "Every essay, searchable, filed by subject." },
  { href: "/books", title: "The books", dek: "Three books, each written by hand." },
  { href: "/tools", title: "The tools", dek: "Assessments, study guides, guided reading paths, and the rest." },
  { href: "/downloads", title: "Downloads and PDFs", dek: "Every printable: leader guides and participant handouts. Free." },
  { href: "/work-with-james", title: "Work with James", dek: "Preaching, consulting, and coming alongside a church or a leader." },
];

export default function FollowJames({
  heading = "Where else to find James",
  blurb = "The writing does not only live here. Everything below is the same voice, in a different room.",
}: {
  heading?: string;
  blurb?: string;
}) {
  const channels = liveChannels();

  return (
    <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--charcoal-fg)" }}>
      <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
        <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>
          Follow the writing
        </div>
        <h2
          style={{
            fontFamily: "var(--F)",
            fontSize: "clamp(24px, 3.4vw, 34px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "8px",
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            fontFamily: "var(--B)",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "rgba(245,240,230,0.78)",
            maxWidth: "60ch",
            marginBottom: "var(--s-5)",
          }}
        >
          {blurb}
        </p>

        <div className="ed-split">
          <div>
            <p className="ed-split-label" style={{ color: "var(--mustard)" }}>On this site</p>
            <EditorialIndex tone="dark" columns={1} compact headingAs="span" label="On this site" items={SITE_DOORS} />
          </div>
          {channels.length > 0 && (
            <div>
              <p className="ed-split-label" style={{ color: "var(--mustard)" }}>Follow along</p>
              <EditorialIndex
                tone="dark"
                columns={1}
                compact
                headingAs="span"
                label="Where else James writes"
                items={channels.map((c) => ({ href: c.url, title: c.label, dek: c.blurb, external: true }))}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
