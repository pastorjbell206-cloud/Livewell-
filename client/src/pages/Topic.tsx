/**
 * One topic page (/topics/:slug): one question with one assembled answer
 * across formats (MASTER-PLAN 4.3). Six parts, in order:
 *
 *   1. the question as H1, and a short answer drawn from the lead essay;
 *   2. Read this first: the essay, or the stand-in shown until it is public,
 *      with up to two more (on the politics page, the same test asked of both
 *      directions);
 *   3. what Scripture says, read in its world: each passage a link into the
 *      Study Bible, with the context guide where there is one;
 *   4. the church has been here before: one witness from church history;
 *   5. at the table: the family devotion for this question;
 *   6. use this: the plan, the study guide, the tools, the care pages.
 *
 * Not the folded subject hubs: a hub was a category with thin pages under it;
 * a topic page is one question, answered once, and exists only where no
 * single page on the site already answers it. Take it with you prints it.
 *
 * Verse references are links (VerseRef link mode): the page quotes no
 * Scripture of its own, and the essays it leads to quote the ESV.
 */
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PageHead } from "@/components/editorial/PageHead";
import { EditorialIndex, type IndexItem } from "@/components/editorial/EditorialIndex";
import { CrisisBlock } from "@/components/CrisisBlock";
import LoadFailed from "@/components/LoadFailed";
import { TakeItWithYou } from "@/components/TakeItWithYou";
import { RefText, VerseRef } from "@/components/VerseRef";
import { fetchJson } from "@/lib/fetch-json";
import { isEssayOverride, overrideMeta, overrideUrl, sectionHref, sectionBySlug } from "@/lib/shelf";
import { devotionHref, tableHref } from "@/lib/familyTable";
import { trackTopicLeadOpen } from "@/lib/telemetry";
import {
  TOPICS_INDEX_URL,
  essaySlug,
  isTopic,
  isTopicsIndex,
  kindLabel,
  leadOf,
  publicEssays,
  readingMinutes,
  topicFileUrl,
  topicHref,
  type Topic as TopicData,
  type TopicLink,
} from "@/lib/topics";

const SITE = "https://www.livewellbyjamesbell.co";

type State = { status: "loading" } | { status: "failed" } | { status: "missing" } | { status: "ready"; topic: TopicData };

/** The page's data: the index says whether the topic exists, then its own file. */
function useTopic(slug: string): { state: State; retry: () => void } {
  const [nonce, setNonce] = useState(0);
  const key = `${slug}#${nonce}`;
  const [state, setState] = useState<{ key: string; value: State }>({ key: "", value: { status: "loading" } });
  useEffect(() => {
    let live = true;
    const settle = (value: State) => live && setState({ key, value });
    // Both requests start together; the index decides "not here" before the page file is needed.
    const page = fetchJson(topicFileUrl(slug), isTopic);
    page.catch(() => {});
    fetchJson(TOPICS_INDEX_URL, isTopicsIndex)
      .then(async (index) => {
        if (!index.pages.some((p) => p.slug === slug)) return settle({ status: "missing" });
        settle({ status: "ready", topic: await page });
      })
      .catch(() => settle({ status: "failed" }));
    return () => {
      live = false;
    };
  }, [slug, key]);
  const retry = useCallback(() => setNonce((n) => n + 1), []);
  return { state: state.key === key ? state.value : { status: "loading" }, retry };
}

export default function Topic() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { state, retry } = useTopic(slug);

  if (state.status !== "ready") {
    return (
      <Layout>
        <section className="tp-page__body">
          <div className="tp-col">
            {state.status === "failed" ? (
              <LoadFailed what="This topic" onRetry={retry} backHref="/topics" backLabel="All topics" />
            ) : state.status === "missing" ? (
              <>
                <h1 className="tp-missing">That topic isn't here</h1>
                <p className="tp-text">
                  The address may be mistyped, or the page may have moved. <Link href="/topics">See all the topics</Link>.
                </p>
              </>
            ) : (
              <p role="status" className="tp-status">
                Loading…
              </p>
            )}
          </div>
        </section>
      </Layout>
    );
  }
  return <TopicView topic={state.topic} />;
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="tp-section" aria-labelledby={`tp-${id}`}>
      <h2 id={`tp-${id}`} className="tp-section__title">
        {title}
      </h2>
      {children}
    </section>
  );
}

const asItem = (l: TopicLink, kicker?: string): IndexItem => ({ href: l.href, title: l.label, dek: l.line ?? null, kicker: kicker ?? kindLabel(l.href) });

function TopicView({ topic }: { topic: TopicData }) {
  const lead = leadOf(topic);
  const also = publicEssays(topic.alsoEssays);
  const section = topic.section ? sectionBySlug(topic.section.slug) : null;
  const use: IndexItem[] = [
    ...(topic.use.plan ? [asItem(topic.use.plan)] : []),
    ...(topic.use.study ? [asItem(topic.use.study)] : []),
    ...topic.use.tools.map((t) => asItem(t, "Tool")),
    ...(topic.use.paths ?? []).map((t) => asItem(t)),
    ...(topic.care ?? []).map((t) => asItem(t)),
  ];
  const crisis = topic.sensitive ? Array.from(new Set((topic.care ?? []).flatMap((c) => c.crisis ?? []))) : [];

  return (
    <Layout>
      <SEOMeta title={topic.title} description={topic.description} url={`${SITE}${topicHref(topic.slug)}`} type="article" />
      <div className="tp-page">
        <PageHead
          eyebrow={
            <Link href="/topics" style={{ color: "inherit" }}>
              Topics
            </Link>
          }
          title={topic.title}
          width="var(--w-prose)"
        />
        <section className="tp-page__body">
          <div className="tp-col print-paper">
            <div className="tp-short">
              {topic.short.map((p, i) => (
                <p key={i}>
                  <RefText text={p} mode="link" />
                </p>
              ))}
            </div>
            <div className="no-print">
              <TakeItWithYou title={topic.title} kind="Topic" href={topicHref(topic.slug)} summary={topic.description} print />
            </div>

            <Section id="read" title="Read this first">
              {topic.section && section && (
                <p className="tp-text tp-companion">
                  This page is a companion to the essays in{" "}
                  <Link href={sectionHref(section)}>{topic.section.label}</Link>. {topic.section.line}
                </p>
              )}
              {lead && <Lead topic={topic.slug} link={lead.link} standIn={lead.standIn} />}
              {also.length > 0 && <EditorialIndex items={also.map((l) => asItem(l))} columns={1} compact label="More to read" />}
              {topic.bothWays && (
                <div className="tp-ways">
                  <h3 className="tp-ways__title">Asked of both sides</h3>
                  <ul className="tp-ways__list">
                    {(["right", "left"] as const).map((side) => {
                      const w = topic.bothWays![side];
                      return (
                        <li key={side}>
                          <p className="tp-ways__line">{w.line}</p>
                          <p className="tp-ways__links">
                            Read <Link href={w.essay.href}>{w.essay.label}</Link>, or follow the guided path{" "}
                            <Link href={w.path.href}>{w.path.label}</Link>.
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </Section>

            <Section id="scripture" title="What Scripture says, read in its world">
              <ul className="tp-verses">
                {topic.scripture.map((p) => (
                  <li key={p.ref}>
                    <p className="tp-verses__ref">
                      <VerseRef reference={p.ref} mode="link" />
                    </p>
                    <p className="tp-text">
                      <RefText text={p.line} mode="link" />
                    </p>
                    {p.context && (
                      <Link href={p.context.href} className="tp-more">
                        In its world: {p.context.label}
                        <span aria-hidden>→</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <p className="tp-note">Each reference opens the passage in the Study Bible.</p>
            </Section>

            <Section id="history" title="The church has been here before">
              <p className="tp-witness__name">{topic.witness.name}</p>
              <p className="tp-text">{topic.witness.line}</p>
              <Link href={topic.witness.href} className="tp-more">
                Read it in {topic.witness.label}
                <span aria-hidden>→</span>
              </Link>
            </Section>

            <Section id="table" title="At the table">
              <TableDevotion table={topic.table} />
            </Section>

            {(use.length > 0 || crisis.length > 0) && (
              <Section id="use" title="Use this">
                {use.length > 0 && <EditorialIndex items={use} columns={1} compact label="Use this" />}
                {crisis.length > 0 && <CrisisBlock variant="compact" topics={crisis} />}
              </Section>
            )}

            <nav className="tp-back no-print" aria-label="More topics">
              <Link href="/topics" className="tp-more">
                All topics
                <span aria-hidden>→</span>
              </Link>
            </nav>
          </div>
        </section>
      </div>
    </Layout>
  );
}

/** The one thing to read first: the essay with its minutes once public, or the stand-in. */
function Lead({ topic, link, standIn }: { topic: string; link: TopicLink; standIn: boolean }) {
  const slug = essaySlug(link.href);
  const rewritten = Boolean(slug && overrideMeta(slug));
  // A rewritten essay's minutes come from its own file, which the essay page reads too (same query key).
  const body = useQuery({
    queryKey: ["essay-rewrite", slug],
    queryFn: () => fetchJson(overrideUrl(slug ?? ""), isEssayOverride),
    enabled: rewritten,
    staleTime: Infinity,
  });
  const minutes = body.data ? readingMinutes(body.data.body) : null;
  return (
    <Link href={link.href} className="tp-lead" onClick={() => trackTopicLeadOpen(topic, link.href, standIn)}>
      <span className="ed-kicker">{kindLabel(link.href)}</span>
      <span className="tp-lead__title">{link.label}</span>
      {link.line && <span className="tp-lead__line">{link.line}</span>}
      {minutes && <span className="tp-lead__meta">{minutes} min read</span>}
    </Link>
  );
}

/** Tonight's devotion, or the devotion this page names, with the way into table mode. */
function TableDevotion({ table }: { table: TopicData["table"] }) {
  const tonight = table.devotion === "tonight";
  const page = tonight ? "/family/tonight" : devotionHref(table.devotion);
  const start = tonight ? "/family/tonight?mode=table" : tableHref(table.devotion);
  return (
    <>
      <p className="tp-witness__name">
        <Link href={page}>{table.label}</Link>
      </p>
      <p className="tp-text">{table.line}</p>
      <div className="tp-actions">
        <Link href={start} className="pg-action">
          Start at the table
        </Link>
        <Link href={page} className="pg-action pg-action--quiet">
          Read it first
        </Link>
      </div>
      {table.also?.map((l) => (
        <p key={l.href} className="tp-text tp-table-also">
          <Link href={l.href}>{l.label}</Link>
          {l.line ? `: ${l.line}` : ""}
        </p>
      ))}
    </>
  );
}
