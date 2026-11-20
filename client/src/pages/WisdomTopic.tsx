/**
 * /wisdom/:id: what the Bible says about one subject. One page per topic of
 * the wisdom library (scripts/build-wisdom-index.mjs writes
 * client/public/wisdom/entry/<id>.json; this page loads only that file).
 *
 * Every topic shows its framing, its passages (each opening in place to the
 * paragraph it sits in, with links into the Study Bible), the world it was
 * written in, how the church has read it, and where to go next. A topic
 * written in full (client/public/wisdom/deep/<id>.json) adds: where each
 * passage stands, the "often misread" layer, what the whole Bible says,
 * where Christians differ, a question to sit with, a prayer from a psalm, and
 * its own next steps. A heavy subject (data/sensitive-pages.json) keeps Find
 * Help at the top, and a topic written in full carries the care lines word
 * for word from the Study Bible's plain notes.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Bookmark, BookmarkCheck, Search } from "lucide-react";
import Layout from "@/components/Layout";
import MoreOnThis from "@/components/MoreOnThis";
import { SEOMeta } from "@/components/SEOMeta";
import LoadFailed from "@/components/LoadFailed";
import { CrisisBlock } from "@/components/CrisisBlock";
import ScriptureNote from "@/components/ScriptureNote";
import InnerHead from "@/components/art/InnerHead";
import { ResultActions, ResultNext } from "@/components/tool-shell";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import { useFavorites } from "@/hooks/useFavorites";
import { fetchEntry, readSavedTopics, toggleSavedTopic, verseFavoriteId, SAVED_VERSES_KEY, chapterName, AREA_NAMES, type Entry, type EntryVerse } from "@/lib/wisdom";
import VerseCard from "./wisdom/VerseCard";
import "./wisdom/wisdom.css";

const NOT_ADVICE: Record<string, string> = {
  money: "This page is not financial or legal advice. For debts, bills and the choices in front of you, a nonprofit credit counselor or another qualified adviser can help you see your options.",
  law: "This page is not legal advice. For a legal question, talk to a lawyer.",
  medicine: "This page is not medical advice. If worry or sadness is taking your sleep, your appetite or your days, tell a doctor.",
};

function Jump({ entry }: { entry: Entry }) {
  const d = entry.deep;
  if (!d) return null;
  const items = [
    { id: "scripture", label: "Scripture" },
    ...(d.misread.length ? [{ id: "misread", label: "Often misread" }] : []),
    { id: "whole", label: "The whole Bible" },
    ...(d.differ ? [{ id: "differ", label: "Where Christians differ" }] : []),
    { id: "sit", label: "Sit with" },
    { id: "pray", label: "Pray" },
    { id: "next", label: "Next" },
  ];
  return (
    <nav className="wz-jump no-print" aria-label="On this page">
      {items.map((i) => (
        <a key={i.id} href={`#${i.id}`}>
          {i.label}
        </a>
      ))}
    </nav>
  );
}

export default function WisdomTopic() {
  const [, params] = useRoute("/wisdom/:id");
  const id = params?.id ?? "";
  const validId = /^[a-z0-9-]+$/.test(id);
  const [loaded, setLoaded] = useState<{ id: string; entry: Entry | "missing" } | null>(null);
  const entry: Entry | null | "missing" = !validId ? "missing" : loaded?.id === id ? loaded.entry : null;
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [savedTopics, setSavedTopics] = useState<string[]>(() => readSavedTopics());
  const [saveFailed, setSaveFailed] = useState(false);
  const verses = useFavorites(SAVED_VERSES_KEY);

  useEffect(() => {
    let stale = false;
    if (!validId) return;
    fetchEntry(id)
      .then((e) => {
        if (!stale) setLoaded({ id, entry: e });
      })
      .catch((err: unknown) => {
        if (stale) return;
        // No such topic: the file is missing (404), or the server answers with the app shell, which is not JSON.
        const msg = err instanceof Error ? err.message : "";
        if (err instanceof SyntaxError || /→ 404|unexpected shape/.test(msg)) setLoaded({ id, entry: "missing" });
        else setFailed(true);
      });
    return () => {
      stale = true;
    };
  }, [id, validId, nonce]);

  if (failed) {
    return (
      <Layout>
        <LoadFailed
          what="This page of the wisdom library"
          onRetry={() => {
            setFailed(false);
            setNonce((n) => n + 1);
          }}
          backHref="/tools/wisdom-finder"
          backLabel="Back to the Wisdom Finder"
        />
      </Layout>
    );
  }

  if (entry === "missing") {
    return (
      <Layout>
        <SEOMeta title="Topic not found" description="This wisdom topic doesn't exist." />
        <section className="wz-band" style={{ padding: "var(--s-7) var(--gutter)", textAlign: "center" }}>
          <div className="wz-col">
            <h1 className="wz-missing__title">No wisdom entry here</h1>
            <p className="wz-missing__line">That topic isn&rsquo;t one we cover. Tell the Wisdom Finder what you are facing, or browse every subject.</p>
            <div className="wz-missing__actions">
              <Link href="/tools/wisdom-finder" className="btn">
                Open the Wisdom Finder
              </Link>
              <Link href="/wisdom" className="btn btn--quiet">
                Browse all wisdom
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!entry) {
    return (
      <Layout>
        <div style={{ minHeight: "60vh" }} />
      </Layout>
    );
  }

  // "What the Bible Says About Anxiety and Worry"; a label that is already a
  // clause ("When You Are Afraid") keeps its own order. The prerender matches.
  const title = /^(When|Why)\b/.test(entry.label) ? `${entry.label}: What the Bible Says` : `What the Bible Says About ${entry.label}`;
  const description = entry.framing.length > 155 ? entry.framing.slice(0, 152).trimEnd() + "…" : entry.framing;
  const canonical = `https://www.livewellbyjamesbell.co/wisdom/${entry.id}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    about: entry.label,
    url: canonical,
    author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
    publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
    isPartOf: { "@type": "CollectionPage", name: "Wisdom for All of Life", url: "https://www.livewellbyjamesbell.co/wisdom" },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Wisdom", item: "https://www.livewellbyjamesbell.co/wisdom" },
      { "@type": "ListItem", position: 2, name: entry.label, item: canonical },
    ],
  };

  const d = entry.deep;
  const topicSaved = savedTopics.includes(entry.id);
  const toggleTopic = () => {
    const r = toggleSavedTopic(entry.id);
    setSavedTopics(r.list);
    if (!r.ok) setSaveFailed(true);
  };
  const toggleVerse = (v: EntryVerse) => {
    const fid = verseFavoriteId(v.ref);
    if (verses.isFavorite(fid)) verses.removeFavorite(fid);
    else verses.addFavorite({ id: fid, type: "verse", content: { ref: v.ref, text: v.text, topic: entry.label } });
  };
  const own = d?.next ?? [];
  const nextSteps = [...own, ...entry.links.filter((l) => !own.some((n) => n.href === l.href)).map((l) => ({ kind: "Reading", label: l.label, href: l.href }))];
  const area = AREA_NAMES[entry.area];

  return (
    <Layout>
      <SEOMeta title={title} description={description} keywords={entry.keywords.join(", ")} url={canonical} structuredData={[articleSchema, breadcrumbSchema]} />

      <div className="wz-page">
        <InnerHead path="/wisdom" title={entry.label} line={entry.framing}>
          <p className="wz-meta">
            {area && (
              <>
                <Link href={`/tools/wisdom-finder?area=${entry.area}`}>{area}</Link>
                {" · "}
              </>
            )}
            {entry.verses.length} passages{d ? ", each read in context" : ""}
          </p>
          <div className="wz-head-actions no-print">
            <button type="button" className="btn btn--quiet ts-actions__btn" onClick={toggleTopic} aria-pressed={topicSaved}>
              {topicSaved ? <BookmarkCheck size={16} strokeWidth={1.75} aria-hidden="true" /> : <Bookmark size={16} strokeWidth={1.75} aria-hidden="true" />}
              {topicSaved ? "Saved" : "Save this page"}
            </button>
            <Link href="/tools/wisdom-finder" className="btn btn--quiet ts-actions__btn">
              <Search size={16} strokeWidth={1.75} aria-hidden="true" /> Find another subject
            </Link>
          </div>
          {saveFailed && (
            <p className="ts-save-failed" role="status">
              {SAVE_FAILED}
            </p>
          )}
        </InnerHead>

        {/* A heavy subject keeps Find Help at the top; on the gravest the full block sits here. */}
        {entry.care && (
          <div className="wz-band wz-band--care">
            <div className="wz-col">{entry.care.lead ? <CrisisBlock topics={entry.care.topics} /> : <CrisisBlock variant="compact" topics={entry.care.topics} />}</div>
          </div>
        )}

        <div className="wz-band">
          <div className="wz-col">
            <Jump entry={entry} />
            <section id="scripture" className="wz-sec" aria-labelledby="scripture-h">
              <h2 id="scripture-h" className="wz-sec__title">
                What Scripture says
              </h2>
              <p className="wz-sec__lede">
                {d ? "Each passage, with who is speaking, to whom, and about what. Open any of them to read the paragraph around it." : "Open any passage to read the paragraph around it, from the Study Bible."}
              </p>
              <div className="wz-verses">
                {entry.verses.map((v) => (
                  <VerseCard key={v.ref} verse={v} saved={verses.isFavorite(verseFavoriteId(v.ref))} onToggleSave={toggleVerse} />
                ))}
              </div>
              <ScriptureNote rendering="bsb" />
            </section>

            {d && d.misread.length > 0 && (
              <section id="misread" className="wz-sec" aria-labelledby="misread-h">
                <h2 id="misread-h" className="wz-sec__title">
                  Often misread
                </h2>
                <p className="wz-sec__lede">{d.misread.length > 1 ? "Verses on this subject that are often taken out of their place, and what they say where they stand." : "A verse on this subject that is often taken out of its place, and what it says where it stands."}</p>
                {d.misread.map((m) => (
                  <article key={m.ref} className="wz-misread">
                    <blockquote className="wz-verse__quote">
                      <p className="wz-verse__text">{m.text}</p>
                      <cite className="wz-verse__ref">{m.ref}</cite>
                    </blockquote>
                    <div className="wz-misread__pair">
                      <div className="wz-misread__side">
                        <h3 className="wz-misread__h">How it is often taken</h3>
                        <p>{m.taken}</p>
                      </div>
                      <div className="wz-misread__side wz-misread__side--says">
                        <h3 className="wz-misread__h">What it says where it stands</h3>
                        <p>{m.says}</p>
                      </div>
                    </div>
                    <Link href={`/study/bible/${m.slug}/${m.chapter}#v${m.v1}`} className="wz-link">
                      Read {m.context ?? chapterName(m.ref)} in the Study Bible
                    </Link>
                  </article>
                ))}
              </section>
            )}

            {d && (
              <section id="whole" className="wz-sec" aria-labelledby="whole-h">
                <h2 id="whole-h" className="wz-sec__title">
                  What the whole Bible says
                </h2>
                <div className="wz-prose">
                  {d.whole.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <div className="wz-band wz-band--warm">
          <div className="wz-col">
            <section className="wz-lenses" aria-label="Background">
              <div className="wz-lens">
                <h2 className="wz-lens__title">The world it was written in</h2>
                <p>{entry.cultural}</p>
              </div>
              <div className="wz-lens">
                <h2 className="wz-lens__title">How the church has read it</h2>
                <p>{entry.historical}</p>
              </div>
              {!d && (
                <div className="wz-lens">
                  <h2 className="wz-lens__title">Living it now</h2>
                  <p>{entry.application}</p>
                </div>
              )}
            </section>
          </div>
        </div>

        {d && (
          <div className="wz-band">
            <div className="wz-col">
              {d.differ && (
                <section id="differ" className="wz-sec" aria-labelledby="differ-h">
                  <h2 id="differ-h" className="wz-sec__title">
                    Where Christians differ
                  </h2>
                  <p className="wz-differ__share">{d.differ.share}</p>
                  <div className="wz-differ">
                    {d.differ.views.map((v) => (
                      <div key={v.name} className="wz-differ__view">
                        <h3 className="wz-differ__name">{v.name}</h3>
                        <p>{v.body}</p>
                      </div>
                    ))}
                  </div>
                  {d.differ.after && <p className="wz-differ__after">{d.differ.after}</p>}
                </section>
              )}

              <section id="sit" className="wz-sec wz-sit" aria-labelledby="sit-h">
                <h2 id="sit-h" className="wz-sec__kicker">
                  A question to sit with
                </h2>
                <p className="wz-sit__q">{d.sit}</p>
              </section>

              <section id="pray" className="wz-sec" aria-labelledby="pray-h">
                <h2 id="pray-h" className="wz-sec__title">
                  Pray
                </h2>
                {d.prayer.lead && <p className="wz-sec__lede">{d.prayer.lead}</p>}
                <blockquote className="wz-prayer">
                  <p>{d.prayer.text}</p>
                  <cite>{d.prayer.ref}</cite>
                </blockquote>
              </section>

              {d.careLines.length > 0 && (
                <aside className="wz-care" aria-labelledby="care-h">
                  <h2 id="care-h" className="wz-care__title">
                    If this is heavy for you
                  </h2>
                  <p>{d.careLines.map((c) => c.text).join(" ")}</p>
                  <Link href="/help" className="wz-link">
                    Find Help
                  </Link>
                </aside>
              )}

              {d.notAdvice && <p className="wz-notadvice">{NOT_ADVICE[d.notAdvice]}</p>}
            </div>
          </div>
        )}

        <div className="wz-band">
          <div className="wz-col" id="next">
            <ResultNext steps={nextSteps} />
            {entry.related.length > 0 && (
              <section className="wz-sec no-print" aria-labelledby="close-h">
                <h2 id="close-h" className="wz-sec__kicker">
                  Close to this
                </h2>
                <ul className="wz-chips">
                  {entry.related.map((r) => (
                    <li key={r.id}>
                      <Link href={`/wisdom/${r.id}`} className="wz-chip">
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <ResultActions title={title} kind="Wisdom" summary={entry.framing} save={false} />
          </div>
        </div>

        {/* The abuse and assault lines also close the page, as they always have. */}
        {entry.care && !entry.care.lead && entry.care.topics.some((t) => t !== "suicide") && (
          <div className="wz-band">
            <div className="wz-col">
              <CrisisBlock topics={entry.care.topics} heading="If you need help now" />
            </div>
          </div>
        )}
      </div>
      <MoreOnThis href={`/wisdom/${id}`} />
    </Layout>
  );
}
