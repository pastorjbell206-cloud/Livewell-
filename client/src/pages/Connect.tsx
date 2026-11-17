/**
 * /connect: "Find James". The one page that gathers every way to read him
 * and reach him: Substack, Facebook, the newest essays here and their feed,
 * the contact form (with the way to real help beside it), speaking, the three
 * books, and the work that lives at its own address.
 *
 * James asked for this page back on 2026-11-17; it had been folded into
 * /about on 2026-10-12. Everything outside this site is a link. Nothing from
 * Facebook or Substack is imported or embedded, and a channel appears only
 * with a real address (lib/channels.ts). The church is named without a link
 * because the repo holds no verified web address for it.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import ContactForm, { CONTACT_EMAIL } from "@/components/ContactForm";
import CrisisNote from "@/components/CrisisNote";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { BOOK_SHELF } from "@/lib/bookShelf";
import { RSS_PATH, channelUrl, liveChannels } from "@/lib/channels";
import { newestEssays } from "@/lib/newestEssays";

const gutter = "clamp(16px, 4vw, var(--s-4))";
const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

function Band({
  id,
  title,
  tone = "bone",
  children,
}: {
  id: string;
  title: string;
  tone?: "bone" | "warm";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="cn-section"
      style={{ background: tone === "warm" ? "var(--bone-warm)" : "var(--bone)", padding: `var(--s-5) ${gutter}` }}
    >
      <div style={wrap} className="cn-band">
        <h2 id={`${id}-title`} className="cn-h2">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function Connect() {
  const substack = channelUrl("substack");
  const facebook = channelUrl("facebook");
  const newest = newestEssays(3);
  const elsewhere = liveChannels().filter((c) => c.id !== "substack" && c.id !== "facebook");

  return (
    <Layout>
      <SEOMeta
        title="Find James Bell: Substack, Facebook, Essays, and Contact"
        description="Every way to read James Bell and reach him, on one page: his Substack, his Facebook, the newest essays and their RSS feed, a contact form, speaking, and his three books."
        url="https://www.livewellbyjamesbell.co/connect"
      />

      <section aria-labelledby="connect-title" style={{ background: "var(--bone)", padding: `var(--s-6) ${gutter} var(--s-4)` }}>
        <div style={wrap}>
          <h1
            id="connect-title"
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(40px, 5.4vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              margin: "0 0 var(--s-2)",
            }}
          >
            Find James
          </h1>
          <p className="cn-lede">
            The essays and the books live on this site. New essays also go out by email through Substack, and James
            writes short notes on Facebook. This page gathers all of it, along with the ways to write to him.
          </p>
          <p className="cn-jump">
            <a href="#read">Read him</a>
            <a href="#write">Write to him</a>
            <a href="#invite">Invite him to speak</a>
            <a href="#books">His books</a>
          </p>
        </div>
      </section>

      {/* READ HIM: Substack, Facebook, the essays here. */}
      <Band id="read" title="Read him" tone="warm">
        <ul className="cn-rows">
          {substack && (
            <li className="cn-row">
              <h3 className="cn-h3">Substack</h3>
              <p className="cn-p">
                New essays by email. Leave your address here and finish on Substack, or read there first and decide
                later.
              </p>
              <NewsletterSignup variant="minimal" source="connect" />
              <p className="cn-actions">
                <a href={substack} target="_blank" rel="noopener noreferrer" className="cn-link">
                  Read on Substack
                </a>
              </p>
            </li>
          )}
          {facebook && (
            <li className="cn-row">
              <h3 className="cn-h3">Facebook</h3>
              <p className="cn-p">Short pastoral notes, most days.</p>
              <p className="cn-actions">
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="cn-link">
                  Follow on Facebook
                </a>
              </p>
            </li>
          )}
          <li className="cn-row">
            <h3 className="cn-h3">Essays on this site</h3>
            {newest.length > 0 && (
              <>
                <p className="cn-p">The newest on the shelf:</p>
                <ul className="cn-essays">
                  {newest.map((e) => (
                    <li key={e.slug}>
                      <Link href={`/writing/${e.slug}`} className="cn-essay">
                        {e.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p className="cn-actions">
              <Link href="/writing" className="cn-link">
                All essays
              </Link>
              <a href={RSS_PATH} className="cn-link">
                RSS feed
              </a>
            </p>
          </li>
        </ul>
      </Band>

      {/* WRITE TO HIM: the address, the form, and the way to real help. */}
      <Band id="write" title="Write to him">
        <div className="cn-write">
          <div>
            <p className="cn-p">
              A message sent here is saved for James to read. You can also email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="cn-link cn-link--inline">
                {CONTACT_EMAIL}
              </a>
              . He is in Fenton, Michigan.
            </p>
            <CrisisNote style={{ marginTop: "var(--s-3)", paddingTop: "var(--s-3)", borderTop: "1px solid var(--border)" }} />
          </div>
          <ContactForm idPrefix="connect" />
        </div>
      </Band>

      {/* INVITE HIM */}
      <Band id="invite" title="Invite him to speak" tone="warm">
        <p className="cn-p">
          James preaches and speaks at conferences, retreats, and churches. The speaking page has a form for asking
          about a date.
        </p>
        <p className="cn-actions">
          <Link href="/speaking" className="cn-link">
            Ask James to speak
          </Link>
          <Link href="/about" className="cn-link">
            Who James is
          </Link>
        </p>
      </Band>

      {/* HIS BOOKS: the three on the shelf (lib/bookShelf.ts). */}
      <Band id="books" title="His books">
        <ul className="cn-books">
          {BOOK_SHELF.map((b) => (
            <li key={b.slug}>
              <Link href={b.href} className="cn-book">
                <img src={b.thumb} alt="" width={150} height={240} loading="lazy" decoding="async" className="cn-book__cover" />
                <span className="cn-book__title">{b.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="cn-actions">
          <Link href="/books" className="cn-link">
            All three books
          </Link>
        </p>
      </Band>

      {/* ELSEWHERE: the church, named without a link, then the channels with
          a real address that are not already above. */}
      <Band id="elsewhere" title="Elsewhere" tone="warm">
        <p className="cn-p">James pastors First Baptist Church of Fenton, Michigan.</p>
        {elsewhere.length > 0 && (
          <ul className="cn-rows cn-rows--ruled">
            {elsewhere.map((c) => (
              <li key={c.id} className="cn-row">
                <h3 className="cn-h3">{c.label}</h3>
                <p className="cn-p">{c.blurb}</p>
                <p className="cn-actions">
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="cn-link">
                    Visit {c.label}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        )}
      </Band>

      <style>{CONNECT_CSS}</style>
    </Layout>
  );
}

const CONNECT_CSS = `
.cn-lede{font-family:var(--B);font-size:clamp(17px,1.4vw,19px);line-height:1.7;color:var(--ink-muted);max-width:62ch;margin:0 0 var(--s-2)}
.cn-jump{display:flex;flex-wrap:wrap;column-gap:24px;margin:0;font-family:var(--U);font-size:15px}
.cn-jump a,.cn-link{display:inline-flex;align-items:center;min-height:44px;color:var(--ink);font-weight:500;text-decoration:underline;text-decoration-color:var(--mustard);text-decoration-thickness:1px;text-underline-offset:4px;background-image:none}
.cn-link--inline{display:inline;min-height:0;overflow-wrap:anywhere}
.cn-section{scroll-margin-top:84px}
.cn-band{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2.4fr);gap:var(--s-3) var(--s-5);align-items:start}
.cn-h2{font-family:var(--F);font-weight:400;font-size:clamp(28px,3.2vw,38px);line-height:1.1;letter-spacing:-0.01em;color:var(--ink);margin:0}
.cn-h3{font-family:var(--F);font-weight:500;font-size:24px;line-height:1.2;color:var(--ink);margin:0 0 6px}
.cn-p{font-family:var(--B);font-size:17px;line-height:1.7;color:var(--ink-muted);max-width:60ch;margin:0 0 var(--s-2)}
.cn-rows{list-style:none;margin:0;padding:0}
.cn-row{border-top:1px solid var(--border);padding:var(--s-3) 0}
.cn-row:first-child{border-top:none;padding-top:0}
.cn-rows--ruled .cn-row:first-child{border-top:1px solid var(--border);padding-top:var(--s-3)}
.cn-row:last-child{padding-bottom:0}
.cn-actions{display:flex;flex-wrap:wrap;column-gap:24px;margin:6px 0 0;font-family:var(--U);font-size:15px}
.cn-essays{list-style:none;margin:0 0 var(--s-1);padding:0}
.cn-essay{display:flex;align-items:center;min-height:44px;padding:4px 0;font-family:var(--F);font-size:21px;line-height:1.25;color:var(--ink);text-decoration:none;background-image:none}
.cn-essay:hover,.cn-essay:focus-visible{text-decoration:underline;text-decoration-color:var(--mustard);text-decoration-thickness:1px;text-underline-offset:4px}
.cn-write{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:var(--s-4) var(--s-5);align-items:start}
.cn-books{list-style:none;margin:0 0 var(--s-2);padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--s-3)}
.cn-book{display:flex;flex-direction:column;gap:10px;text-decoration:none;color:var(--ink);background-image:none}
.cn-book__cover{width:130px;height:auto;border-radius:var(--radius-sm)}
.cn-book__title{font-family:var(--F);font-weight:500;font-size:20px;line-height:1.2;max-width:22ch}
.cn-book:hover .cn-book__title,.cn-book:focus-visible .cn-book__title{text-decoration:underline;text-decoration-color:var(--mustard);text-decoration-thickness:1px;text-underline-offset:4px}
@media (max-width:860px){
  .cn-band,.cn-write{grid-template-columns:minmax(0,1fr)}
  .cn-books{gap:var(--s-2)}
  .cn-book__cover{width:100%;max-width:130px}
  .cn-book__title{font-size:17px}
}
`;
