/**
 * Pillar 3 — Biblical theology (/theology/biblical). How the whole Bible fits
 * as one story that climaxes in Christ: the storyline in acts, the canonical
 * themes traced start to finish, how the New Testament reads the Old, and a
 * biblical-theology overview of all 66 books. The contested frameworks
 * (covenant theology, dispensationalism, progressive covenantalism) live as a
 * doctrine page and are linked from here. Content:
 * /theology/biblical-theology-storyline.json, -themes.json, -nt-ot.json,
 * -books-ot.json, -books-nt.json.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { DOCTRINE_INDEX } from "@/lib/theology";

interface Act { id: string; act: string; title: string; range: string; summary: string; turning: string; pointsForward: string; }
interface Theme { name: string; oneLine: string; trace: string; fulfillment: string; keyTexts: string[]; }
interface Method { name: string; definition: string; example: string; }
interface NtOt { intro: string; methods: Method[]; closingNote: string; }
interface BookOverview { book: string; bigTheme: string; placeInStory: string; pointsToChrist: string; keyVerse: string; }

type Tab = "story" | "themes" | "ntot" | "books";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const cardStyle = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" } as const;

function Para({ text, color = "var(--ink-muted)" }: { text: string; color?: string }) {
  return (
    <>
      {text.split("\n\n").map((p, i) => (
        <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color, maxWidth: "68ch", marginBottom: "12px" }}>{p}</p>
      ))}
    </>
  );
}

export default function TheologyBiblical() {
  const [acts, setActs] = useState<Act[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [ntot, setNtot] = useState<NtOt | null>(null);
  const [booksOt, setBooksOt] = useState<BookOverview[]>([]);
  const [booksNt, setBooksNt] = useState<BookOverview[]>([]);
  const [tab, setTab] = useState<Tab>("story");
  const [openAct, setOpenAct] = useState<string | null>(null);
  const [openTheme, setOpenTheme] = useState<string | null>(null);
  const [openBook, setOpenBook] = useState<string | null>(null);

  useEffect(() => {
    const get = (f: string) => fetch(f, { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    get("/theology/biblical-theology-storyline.json").then((d) => { if (d?.acts) { setActs(d.acts); setOpenAct(d.acts[0]?.id ?? null); } });
    get("/theology/biblical-theology-themes.json").then((d) => d?.themes && setThemes(d.themes));
    get("/theology/biblical-theology-nt-ot.json").then((d) => d && setNtot(d));
    get("/theology/biblical-theology-books-ot.json").then((d) => d?.books && setBooksOt(d.books));
    get("/theology/biblical-theology-books-nt.json").then((d) => d?.books && setBooksNt(d.books));
  }, []);

  const frameworksReady = useMemo(() => DOCTRINE_INDEX.some((d) => d.slug === "covenant-frameworks" && d.ready), []);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "story", label: "The one story", count: acts.length },
    { id: "themes", label: "Canonical themes", count: themes.length },
    { id: "ntot", label: "How the NT reads the OT", count: ntot ? ntot.methods.length : 0 },
    { id: "books", label: "Book by book", count: booksOt.length + booksNt.length },
  ];

  const BookCard = ({ b }: { b: BookOverview }) => {
    const isOpen = openBook === b.book;
    return (
      <div style={{ ...cardStyle, overflow: "hidden" }}>
        <button type="button" onClick={() => setOpenBook(isOpen ? null : b.book)} aria-expanded={isOpen}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", padding: "14px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
          <span>
            <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)" }}>{b.book}</span>
            <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "13px", color: "var(--mustard-text)", marginTop: "2px" }}>{b.bigTheme}</span>
          </span>
          <ChevronDown size={16} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
        </button>
        {isOpen && (
          <div style={{ padding: "0 var(--s-4) 16px", borderTop: "1px solid var(--border)" }}>
            <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink)", margin: "14px 0 10px" }}><strong>In the story.</strong> {b.placeInStory}</p>
            <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)", marginBottom: "10px" }}><strong style={{ color: "var(--ink)" }}>Points to Christ.</strong> {b.pointsToChrist}</p>
            <p style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--mustard-text)", fontWeight: 600 }}>Key verse · {b.keyVerse}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <SEOMeta
        title="Biblical Theology — How the Whole Bible Fits"
        description="The Bible as one story that climaxes in Christ: the storyline in acts, the great themes traced from Genesis to Revelation, how the New Testament reads the Old, and a biblical-theology overview of every book."
        url="https://www.livewellbyjamesbell.co/theology/biblical"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Pillar Three
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "18ch" }}>
            One story, from the first page to the last.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            The Bible is not a box of disconnected lessons. It is one story, told over many centuries by many hands, that moves from a garden to a city and finds its center in Jesus. Here is the storyline, the threads that run all the way through, how the apostles read their Scriptures, and where every book sits in the whole.
          </p>
        </div>
      </section>

      {/* FRAMEWORKS CALLOUT */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) 0" }}>
        <div style={wrap}>
          {frameworksReady ? (
            <Link href="/theology/doctrine/covenant-frameworks" style={{ ...cardStyle, display: "block", textDecoration: "none", color: "inherit", borderLeft: "3px solid var(--mustard)", padding: "var(--s-4)" }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>The frameworks</div>
              <div style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 500, color: "var(--ink)", marginBottom: "8px" }}>How should the covenants fit together?</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "66ch", marginBottom: "10px" }}>
                Covenant theology, dispensationalism, and progressive covenantalism are three ways faithful Christians read the one story. They land differently on the place of Israel, the law, and the church. Worked out fairly in the six-step method.
              </p>
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>Compare the frameworks →</span>
            </Link>
          ) : null}
        </div>
      </section>

      {/* TABS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) 0" }}>
        <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {tabs.map((t) => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)}
              style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, padding: "10px 16px", borderRadius: "999px", cursor: "pointer",
                border: `1px solid ${tab === t.id ? "var(--mustard)" : "var(--border)"}`, background: tab === t.id ? "var(--bone-warm)" : "transparent", color: "var(--ink)" }}>
              {t.label}{t.count ? ` · ${t.count}` : ""}
            </button>
          ))}
        </div>
      </section>

      {/* THE STORY */}
      {tab === "story" && (
        <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
          <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "12px" }}>
            {acts.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading the story…</p>}
            {acts.map((a) => {
              const isOpen = openAct === a.id;
              return (
                <div key={a.id} style={{ ...cardStyle, borderTop: "2px solid var(--mustard)", overflow: "hidden" }}>
                  <button type="button" onClick={() => setOpenAct(isOpen ? null : a.id)} aria-expanded={isOpen}
                    style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", padding: "var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                    <span>
                      <span style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{a.act} · {a.range}</span>
                      <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 500, color: "var(--ink)", marginTop: "4px" }}>{a.title}</span>
                    </span>
                    <ChevronDown size={20} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", marginTop: "6px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
                      <div style={{ paddingTop: "16px" }}><Para text={a.summary} color="var(--ink)" /></div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "8px", paddingTop: "14px", borderTop: "1px solid var(--border)" }}>
                        <div style={{ flex: "1 1 240px" }}><div className="eyebrow" style={{ marginBottom: "4px" }}>The hinge</div><p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{a.turning}</p></div>
                        <div style={{ flex: "1 1 240px" }}><div className="eyebrow" style={{ marginBottom: "4px" }}>Leaning forward</div><p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{a.pointsForward}</p></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* THEMES */}
      {tab === "themes" && (
        <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
          <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "66ch", marginBottom: "8px", fontStyle: "italic" }}>
              Follow one thread from Genesis to Revelation and you will feel the whole Bible pull together. Each of these runs the length of the story and lands in Christ.
            </p>
            {themes.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
            {themes.map((t) => {
              const isOpen = openTheme === t.name;
              return (
                <div key={t.name} style={{ ...cardStyle, overflow: "hidden" }}>
                  <button type="button" onClick={() => setOpenTheme(isOpen ? null : t.name)} aria-expanded={isOpen}
                    style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", padding: "16px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                    <span>
                      <span style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)" }}>{t.name}</span>
                      <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", marginTop: "3px", maxWidth: "60ch" }}>{t.oneLine}</span>
                    </span>
                    <ChevronDown size={18} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", marginTop: "4px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
                      <div style={{ paddingTop: "16px" }}><Para text={t.trace} color="var(--ink)" /></div>
                      <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", background: "var(--bone-warm)", borderRadius: "var(--radius-sm)", padding: "12px 14px", marginTop: "8px" }}><strong>In Christ.</strong> {t.fulfillment}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
                        {t.keyTexts.map((k) => <span key={k} style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)", border: "1px solid var(--border)", borderRadius: "999px", padding: "4px 10px" }}>{k}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* NT READS OT */}
      {tab === "ntot" && (
        <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
          <div style={{ ...wrap }}>
            {!ntot && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
            {ntot && (
              <>
                <div style={{ marginBottom: "var(--s-4)" }}><Para text={ntot.intro} color="var(--ink)" /></div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {ntot.methods.map((m, i) => (
                    <div key={i} style={{ ...cardStyle, padding: "var(--s-4)", borderLeft: "3px solid var(--mustard)" }}>
                      <h3 style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px" }}>{m.name}</h3>
                      <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "8px" }}>{m.definition}</p>
                      <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)" }}><strong style={{ color: "var(--ink)" }}>For example.</strong> {m.example}</p>
                    </div>
                  ))}
                </div>
                {ntot.closingNote && (
                  <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", fontStyle: "italic", maxWidth: "66ch", marginTop: "var(--s-4)", borderLeft: "2px solid var(--mustard)", paddingLeft: "14px" }}>{ntot.closingNote}</p>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* BOOK BY BOOK */}
      {tab === "books" && (
        <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
          <div style={{ ...wrap }}>
            {booksOt.length + booksNt.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
            {[{ label: "The Old Testament", items: booksOt }, { label: "The New Testament", items: booksNt }].map(({ label, items }) => items.length > 0 && (
              <div key={label} style={{ marginBottom: "var(--s-5)" }}>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)", paddingBottom: "8px", borderBottom: "2px solid var(--mustard)" }}>{label}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "10px" }}>
                  {items.map((b) => <BookCard key={b.book} b={b} />)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER NAV */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--bone)" }}>
        <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/theology" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>All of Theological Depth</Link>
          <Link href="/theology/passage" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>Read a passage in context →</Link>
        </div>
      </section>
    </Layout>
  );
}
