/**
 * /study/bible/story        The Story of the Bible: eleven acts, one story
 * /study/bible/story/:act   one act: what happens, the world behind it, what
 *                           to watch for, and every chapter to read, in order
 *
 * The acts come from the site's storyline (/theology/biblical-theology-
 * storyline.json); /bible/story.json adds dates, history, and the reading
 * path, which walks all 1,189 chapters once. Progress stays in this browser.
 */
import { useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { chapterHref, fetchBooks, type BibleBook } from "@/lib/bible";
import {
  fetchNotesIndex,
  fetchStory,
  fetchStoryline,
  flattenStory,
  paragraphs,
  readProgress,
  setRead,
  type NotesIndex,
  type Story,
  type StorylineAct,
} from "@/lib/bible-notes";
import { Band, Credits, H2, Hero, Lede, Prose, Status, card, kicker, quietLink, wrap } from "@/pages/study-bible/shared";
import { useLoad } from "@/pages/study-bible/shared";

type Data = { story: Story; storyline: StorylineAct[]; books: BibleBook[]; index: NotesIndex };

const loadAll = (): Promise<Data> =>
  Promise.all([fetchStory(), fetchStoryline(), fetchBooks(), fetchNotesIndex()]).then(([story, storyline, books, index]) => ({ story, storyline, books, index }));

export default function StudyBibleStory() {
  const [, actParams] = useRoute("/study/bible/story/:act");
  const { data, retry } = useLoad("story", loadAll);
  const [progress, setProgress] = useState(() => readProgress());
  const [saveFailed, setSaveFailed] = useState(false);

  const toggle = (key: string, read: boolean) => {
    if (!setRead(key, read)) setSaveFailed(true);
    setProgress(readProgress());
  };

  return (
    <Layout>
      {!actParams && (
        <SEOMeta
          title="The Story of the Bible, From Creation to New Creation"
          description="The whole Bible as one story in eleven acts, with the history behind each act and every chapter in the order it happened. Start here if you have never read the Bible."
          url="https://www.livewellbyjamesbell.co/study/bible/story"
        />
      )}
      {data === null ? (
        <div style={{ padding: "var(--s-6) var(--s-4)" }}>
          <LoadFailed what="The story of the Bible" onRetry={retry} backHref="/study/bible" backLabel="Back to the Study Bible" />
        </div>
      ) : data === undefined ? (
        <Status>Opening the story…</Status>
      ) : actParams ? (
        <ActPage data={data} actId={actParams.act} progress={progress} toggle={toggle} saveFailed={saveFailed} />
      ) : (
        <StoryIndex data={data} progress={progress} />
      )}
      <Credits />
    </Layout>
  );
}

function StoryIndex({ data, progress }: { data: Data; progress: Set<string> }) {
  const steps = useMemo(() => flattenStory(data.story), [data.story]);
  const nextUnread = steps.find((s) => !progress.has(`${s.slug}/${s.chapter}`)) ?? steps[0];
  const readCount = steps.filter((s) => progress.has(`${s.slug}/${s.chapter}`)).length;
  const bookName = (slug: string) => data.books.find((b) => b.slug === slug)?.name ?? slug;
  const [first, ...rest] = paragraphs(data.story.intro);

  return (
    <>
      <Hero eyebrow="The Study Bible" eyebrowHref="/study/bible" title="The Story of the Bible">
        <Lede>{first}</Lede>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginTop: "var(--s-4)" }}>
          <Link href={`${chapterHref(nextUnread.slug, nextUnread.chapter)}?path=story`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "46px", padding: "0 20px", background: "var(--ink)", color: "var(--bone)", borderRadius: "999px", textDecoration: "none", backgroundImage: "none", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600 }}>
            {readCount ? `Continue: ${bookName(nextUnread.slug)} ${nextUnread.chapter}` : "Start at the beginning"} <ArrowRight size={16} aria-hidden />
          </Link>
          {readCount > 0 && (
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>
              {readCount.toLocaleString()} of {steps.length.toLocaleString()} chapters read in this browser
            </span>
          )}
        </div>
      </Hero>
      {rest.length > 0 && (
        <Band>
          {rest.map((p, i) => <p key={i} style={{ maxWidth: "68ch", fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "var(--ink)", margin: "0 0 14px" }}>{p}</p>)}
        </Band>
      )}
      <Band tone="warm">
        <H2>Eleven acts, one story</H2>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "12px" }}>
          {data.story.acts.map((act) => {
            const line = data.storyline.find((s) => s.id === act.id);
            const keys = steps.filter((s) => s.act === act.id).map((s) => `${s.slug}/${s.chapter}`);
            const done = keys.filter((k) => progress.has(k)).length;
            return (
              <li key={act.id}>
                <Link href={`/study/bible/story/${act.id}`} style={{ ...card, display: "grid", gap: "6px", padding: "var(--s-4)", textDecoration: "none", backgroundImage: "none", color: "var(--ink)" }}>
                  <span style={kicker}>{line?.act} · {act.dates}</span>
                  <span style={{ fontFamily: "var(--F)", fontSize: "1.6rem", lineHeight: 1.15 }}>{line?.title ?? act.id}</span>
                  {line?.turning && <span style={{ fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.6, color: "var(--ink-muted)", maxWidth: "70ch" }}>{line.turning}</span>}
                  <span style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--U)", fontSize: "12.5px", color: "var(--ink-muted)" }}>
                    {line?.range} · {keys.length} chapter{keys.length === 1 ? "" : "s"}{done ? ` · ${done} read` : ""}
                  </span>
                  {done > 0 && (
                    <span aria-hidden style={{ display: "block", height: "3px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
                      <span style={{ display: "block", height: "100%", width: `${Math.round((done / keys.length) * 100)}%`, background: "var(--mustard)" }} />
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ol>
      </Band>
    </>
  );
}

function ActPage({ data, actId, progress, toggle, saveFailed }: { data: Data; actId: string; progress: Set<string>; toggle: (key: string, read: boolean) => void; saveFailed: boolean }) {
  const i = data.story.acts.findIndex((a) => a.id === actId);
  const act = data.story.acts[i];
  const line = data.storyline.find((s) => s.id === actId);
  if (!act) {
    return (
      <div style={{ ...wrap, padding: "var(--s-6) var(--s-4)" }}>
        <p style={{ fontFamily: "var(--B)" }}>That act isn't part of the story.</p>
        <Link href="/study/bible/story" style={quietLink}>The whole story</Link>
      </div>
    );
  }
  const prev = data.story.acts[i - 1];
  const next = data.story.acts[i + 1];
  const lineOf = (id: string) => data.storyline.find((s) => s.id === id);
  const bookOf = (slug: string) => data.books.find((b) => b.slug === slug);
  const total = act.path.reduce((n, r) => n + r.to - r.from + 1, 0);

  return (
    <>
      <SEOMeta
        title={`${line?.title ?? act.id}: ${line?.act ?? "The Story of the Bible"}`}
        description={line?.turning ?? act.watch.slice(0, 160)}
        url={`https://www.livewellbyjamesbell.co/study/bible/story/${act.id}`}
      />
      <Hero eyebrow={`The Story of the Bible · ${line?.act ?? ""}`} eyebrowHref="/study/bible/story" title={line?.title ?? act.id}>
        <p style={{ margin: "0 0 12px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)" }}>{act.dates} · {line?.range} · {total} chapter{total === 1 ? "" : "s"}</p>
        {line?.turning && <Lede>{line.turning}</Lede>}
      </Hero>

      <Band>
        <H2>What happens</H2>
        <Prose text={line?.summary} />
      </Band>
      <Band tone="warm">
        <H2>The world behind it</H2>
        <Prose text={act.world} />
      </Band>
      <Band>
        <H2>What to watch for</H2>
        <Prose text={act.watch} />
        {act.people.length > 0 && (
          <>
            <div style={{ ...kicker, margin: "var(--s-4) 0 10px" }}>Who you'll meet</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {act.people.map((p) => (
                <li key={p} style={{ padding: "6px 12px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink)" }}>{p}</li>
              ))}
            </ul>
          </>
        )}
        {line?.pointsForward && (
          <>
            <div style={{ ...kicker, margin: "var(--s-5) 0 10px" }}>Where it leads</div>
            <Prose text={line.pointsForward} />
          </>
        )}
      </Band>

      <Band tone="warm" id="read">
        <H2>Read it, chapter by chapter</H2>
        <p style={{ maxWidth: "68ch", margin: "0 0 var(--s-4)", fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>
          Every chapter opens with its study notes. Check a chapter off when you've read it; your place is kept in this browser.
        </p>
        {saveFailed && <p role="alert" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--alert)" }}>Couldn't save to this browser — your work here will not survive a reload.</p>}
        <div style={{ display: "grid", gap: "var(--s-4)" }}>
          {act.path.map((r) => {
            const book = bookOf(r.book);
            if (!book) return null;
            const label = r.from === 1 && r.to === book.chapters ? book.name : r.from === r.to ? `${book.name} ${r.from}` : `${book.name} ${r.from}–${r.to}`;
            return (
              <section key={`${r.book}${r.from}`} aria-label={label}>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "1.35rem", fontWeight: 500, margin: "0 0 8px" }}>
                  <Link href={`/study/bible/${book.slug}`} style={{ ...quietLink, textDecoration: "none" }}>{label}</Link>
                </h3>
                <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "6px" }}>
                  {Array.from({ length: r.to - r.from + 1 }, (_, k) => r.from + k).map((c) => {
                    const key = `${book.slug}/${c}`;
                    const read = progress.has(key);
                    const title = data.index.titles[book.slug]?.[c - 1];
                    return (
                      <li key={c} style={{ ...card, display: "flex", alignItems: "center", gap: "10px", padding: "6px 10px" }}>
                        <button type="button" aria-pressed={read} aria-label={`${read ? "Mark unread" : "Mark read"}: ${book.name} ${c}`} onClick={() => toggle(key, !read)} style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", borderRadius: "50%", border: read ? "1px solid var(--ink)" : "1px solid var(--border)", background: read ? "var(--ink)" : "transparent", color: "var(--bone)", cursor: "pointer" }}>
                          {read && <Check size={14} aria-hidden />}
                        </button>
                        <Link href={`${chapterHref(book.slug, c)}?path=story`} style={{ flex: 1, minWidth: 0, display: "block", padding: "4px 0", textDecoration: "none", backgroundImage: "none", color: "var(--ink)" }}>
                          <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600 }}>{book.name} {c}</span>
                          {title && <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.4, color: "var(--ink-muted)" }}>{title}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>
      </Band>

      <nav aria-label="Acts" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)", borderTop: "1px solid var(--border)" }}>
        <div style={{ ...wrap, display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
          {prev ? (
            <Link href={`/study/bible/story/${prev.id}`} style={{ ...quietLink, display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--U)", fontSize: "14px", textDecoration: "none" }}>
              <ArrowLeft size={16} aria-hidden /> {lineOf(prev.id)?.act}: {lineOf(prev.id)?.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/study/bible/story/${next.id}`} style={{ ...quietLink, display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--U)", fontSize: "14px", textDecoration: "none" }}>
              {lineOf(next.id)?.act}: {lineOf(next.id)?.title} <ArrowRight size={16} aria-hidden />
            </Link>
          ) : (
            <Link href="/study/bible/story" style={{ ...quietLink, fontFamily: "var(--U)", fontSize: "14px" }}>The whole story</Link>
          )}
        </div>
      </nav>
    </>
  );
}
