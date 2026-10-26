/**
 * HubGroup: one group on a hub page (/study, /resources). The group's name and
 * a sentence on the left, its links on the right, a hairline between groups, the same
 * grammar as a section of the essay shelf on /writing. Stacks on a phone.
 * Light or dark, to sit on a cream or a charcoal section. A page that uses it
 * renders <HubStyles /> once. A link marked `external` (another site, a
 * mailto) renders as a plain <a>; everything else is an in-app <Link>.
 */
import type { ReactNode } from "react";
import { Link } from "wouter";

export interface HubLink {
  label: string;
  href: string;
  /** One line under the label: what the reader will find. */
  note?: string;
  /** true → a plain <a> (another site or a mailto), not an in-app <Link>. */
  external?: boolean;
}

export function HubGroup({
  id,
  title,
  children,
  links,
  tone = "light",
}: {
  id: string;
  title: string;
  /** The left column under the title: a sentence or two, plain prose. */
  children?: ReactNode;
  links: HubLink[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const fg = dark ? "var(--charcoal-fg)" : "var(--ink)";
  const muted = dark ? "var(--charcoal-fg-muted)" : "var(--ink-muted)";
  const headingId = `hub-${id}`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={dark ? "hub-group hub-group--dark" : "hub-group"}
    >
      <div className="hub-group__head">
        <h2
          id={headingId}
          style={{
            fontFamily: "var(--F)",
            fontSize: "clamp(28px, 3.2vw, 36px)",
            fontWeight: 400,
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            color: fg,
            margin: "0 0 12px",
          }}
        >
          {title}
        </h2>
        {children && (
          <div style={{ fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.65, color: muted }}>{children}</div>
        )}
      </div>
      <ul className="hub-group__links">
        {links.map((l) => {
          const inner = (
            <>
              <span className="hub-link__label">{l.label}</span>
              {l.note && (
                <span className="hub-link__note" style={{ color: muted }}>
                  {l.note}
                </span>
              )}
            </>
          );
          return (
            <li key={l.href + l.label}>
              {l.external ? (
                <a
                  href={l.href}
                  className="hub-link"
                  style={{ color: fg }}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {inner}
                </a>
              ) : (
                <Link href={l.href} className="hub-link" style={{ color: fg }}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Render once per hub page, alongside its groups. */
export function HubStyles() {
  return <style>{HUB_CSS}</style>;
}

const HUB_CSS = `
.hub-group{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr);gap:var(--s-3) var(--s-5);padding:var(--s-5) 0}
.hub-group+.hub-group{border-top:1px solid var(--border)}
.hub-group--dark+.hub-group--dark{border-top-color:var(--charcoal-line)}
.hub-group__head{max-width:40ch}
.hub-group__links{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--s-3)}
.hub-link{display:block;text-decoration:none}
.hub-link__label{display:inline;font-family:var(--F);font-weight:500;font-size:23px;line-height:1.25;text-decoration:underline;text-decoration-color:transparent;text-decoration-thickness:1px;text-underline-offset:0.16em;transition:text-decoration-color var(--dur) var(--ease)}
.hub-link:hover .hub-link__label,.hub-link:focus-visible .hub-link__label{text-decoration-color:var(--mustard)}
.hub-link__note{display:block;font-family:var(--B);font-size:15px;line-height:1.6;margin-top:4px;max-width:58ch}
@media (max-width:760px){.hub-group{grid-template-columns:minmax(0,1fr)}}
`;
